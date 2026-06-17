#!/usr/bin/env node
/* RECOVERY: re-apply the authoritative article source (content/drafts/articles.json)
 * in place and publish it.
 *
 * Why: the main table held the correct, up-to-date content (e.g. "ba cấp" courts
 * per Luật 81/2025/QH15), but stale Payload *draft versions* still carried older
 * content ("bốn cấp"). A bulk publish promoted those stale drafts, regressing the
 * live articles. The source JSON is the source of truth, so we PATCH every existing
 * article's vi+en title/excerpt/content/toc from it and set status=published in a
 * single publish (no draft promotion). Idempotent: articles already correct are
 * rewritten with identical content.
 *
 * Only updates articles that ALREADY exist (never creates) so hidden/deprecated
 * docs are never resurrected. featuredImage / relatedArticles are left untouched
 * (PATCH only sends the fields below).
 *
 *   node scripts/recover-content.mjs
 *   node scripts/recover-content.mjs --dry-run
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { markdownToLexical, extractTocItems } from './markdown-to-lexical.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const draftsFile = path.resolve(__dirname, '..', 'content', 'drafts', 'articles.json')
const SITE = process.env.PUBLISH_SITE || 'http://localhost:3010'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PW = process.env.SEED_ADMIN_PASSWORD
const DRY = process.argv.includes('--dry-run')

if (!EMAIL || !PW) {
  console.error('Missing SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env')
  process.exit(1)
}

async function login() {
  const r = await fetch(`${SITE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PW }),
  })
  if (!r.ok) throw new Error(`login ${r.status}`)
  return (await r.json()).token
}

async function catMap(token) {
  const r = await fetch(`${SITE}/api/categories?limit=50`, { headers: { Authorization: `JWT ${token}` } })
  const map = {}
  for (const c of (await r.json()).docs) map[c.slug] = c.id
  return map
}

async function findBySlug(token, slug) {
  const r = await fetch(`${SITE}/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0`, {
    headers: { Authorization: `JWT ${token}` },
  })
  return (await r.json()).docs?.[0] ?? null
}

const toc = (md) => extractTocItems(md).map((t) => ({ label: t.label, anchor: t.anchor, level: t.level }))

const token = await login()
const cats = await catMap(token)
const drafts = JSON.parse(await fs.readFile(draftsFile, 'utf8'))
console.log(`Source: ${drafts.length} articles → ${SITE}${DRY ? '  (DRY RUN)' : ''}`)

let updated = 0,
  missing = 0,
  failed = 0
for (const d of drafts) {
  const existing = await findBySlug(token, d.slug)
  if (!existing) {
    missing++
    console.log(`  ? ${d.slug} — not found, skipping`)
    continue
  }
  if (DRY) {
    console.log(`  · would recover ${d.slug} (id ${existing.id}) → status=published`)
    continue
  }
  try {
    const viBody = {
      slug: d.slug,
      category: cats[d.category],
      status: 'published',
      publishedDate: d.publishedDate,
      updatedDate: d.updatedDate,
      title: d.vi.title,
      excerpt: d.vi.excerpt,
      content: markdownToLexical(d.vi.body),
      tocItems: toc(d.vi.body),
    }
    const rvi = await fetch(`${SITE}/api/articles/${existing.id}?locale=vi`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(viBody),
    })
    if (!rvi.ok) throw new Error(`vi ${rvi.status}: ${(await rvi.text()).slice(0, 140)}`)
    const enBody = {
      title: d.en.title,
      excerpt: d.en.excerpt,
      content: markdownToLexical(d.en.body),
      tocItems: toc(d.en.body),
    }
    const ren = await fetch(`${SITE}/api/articles/${existing.id}?locale=en`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(enBody),
    })
    if (!ren.ok) throw new Error(`en ${ren.status}: ${(await ren.text()).slice(0, 140)}`)
    updated++
    process.stdout.write(`  ↻ ${d.slug}\n`)
  } catch (e) {
    failed++
    console.log(`  ✗ ${d.slug}: ${e.message}`)
  }
  await new Promise((r) => setTimeout(r, 220))
}
console.log(`\nDone. recovered=${updated} missing=${missing} failed=${failed}`)
