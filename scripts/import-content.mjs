#!/usr/bin/env node
/* Import the 100 SEO article drafts (50 topics × vi+en) into Payload via REST.
 *
 * Steps per article:
 *   1. POST /api/articles?locale=vi (creates the record with VI title/excerpt/content)
 *   2. PATCH /api/articles/{id}?locale=en (fills the EN locale variant)
 *
 * Markdown bodies are converted to Lexical JSON via markdown-to-lexical.mjs.
 * Relationships (category) are resolved from the pre-seeded Categories collection.
 *
 * Usage: node scripts/import-content.mjs
 *   Requires: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD in .env
 *             and scripts/seed-categories.mjs already run.
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { markdownToLexical, extractTocItems } from './markdown-to-lexical.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const draftsFile = path.resolve(__dirname, '..', 'content', 'drafts', 'articles.json')

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.token
}

async function loadCategoryMap(token) {
  const res = await fetch(`${SITE_URL}/api/categories?limit=50`, {
    headers: { Authorization: `JWT ${token}` },
  })
  if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`)
  const data = await res.json()
  const map = {}
  for (const c of data.docs) map[c.slug] = c.id
  return map
}

async function findArticleBySlug(token, slug) {
  const res = await fetch(
    `${SITE_URL}/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

function tocFromMarkdown(md) {
  return extractTocItems(md).map((t) => ({
    label: t.label,
    anchor: t.anchor,
    level: t.level,
  }))
}

async function createOrUpdate(token, draft, categoryId) {
  const existing = await findArticleBySlug(token, draft.slug)

  const viBody = {
    slug: draft.slug,
    category: categoryId,
    status: draft.status,
    publishedDate: draft.publishedDate,
    updatedDate: draft.updatedDate,
    title: draft.vi.title,
    excerpt: draft.vi.excerpt,
    content: markdownToLexical(draft.vi.body),
    tocItems: tocFromMarkdown(draft.vi.body),
  }

  const enBody = {
    title: draft.en.title,
    excerpt: draft.en.excerpt,
    content: markdownToLexical(draft.en.body),
    tocItems: tocFromMarkdown(draft.en.body),
  }

  let id
  if (existing) {
    const patchVi = await fetch(`${SITE_URL}/api/articles/${existing.id}?locale=vi`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(viBody),
    })
    if (!patchVi.ok) throw new Error(`Patch vi ${draft.slug}: ${patchVi.status} ${await patchVi.text()}`)
    id = existing.id
  } else {
    const post = await fetch(`${SITE_URL}/api/articles?locale=vi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(viBody),
    })
    if (!post.ok) throw new Error(`Post vi ${draft.slug}: ${post.status} ${await post.text()}`)
    const doc = await post.json()
    id = doc.doc?.id ?? doc.id
  }

  const patchEn = await fetch(`${SITE_URL}/api/articles/${id}?locale=en`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(enBody),
  })
  if (!patchEn.ok) throw new Error(`Patch en ${draft.slug}: ${patchEn.status} ${await patchEn.text()}`)

  return { id, existed: Boolean(existing) }
}

async function main() {
  const drafts = JSON.parse(await fs.readFile(draftsFile, 'utf8'))
  console.log(`[import-content] ${drafts.length} drafts found`)

  const token = await login()
  const catMap = await loadCategoryMap(token)
  const missingCats = drafts.filter((d) => !catMap[d.category]).map((d) => d.category)
  if (missingCats.length) {
    console.error(`Missing categories for slugs: ${[...new Set(missingCats)].join(', ')}`)
    console.error('Run `node scripts/seed-categories.mjs` first.')
    process.exit(1)
  }

  let created = 0
  let updated = 0
  let failed = 0

  for (const [idx, draft] of drafts.entries()) {
    try {
      const { existed } = await createOrUpdate(token, draft, catMap[draft.category])
      if (existed) updated += 1
      else created += 1
      process.stdout.write(
        `  [${String(idx + 1).padStart(3)}/${drafts.length}] ${existed ? '↻' : '+'} ${draft.slug}\n`,
      )
    } catch (e) {
      failed += 1
      console.error(`  [${idx + 1}] ✗ ${draft.slug}: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`[import-content] done. created=${created}, updated=${updated}, failed=${failed}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
