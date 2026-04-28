#!/usr/bin/env node
/* Seed the 8 cornerstone blog posts (vi + en) into Payload via REST.
 * Each post is created with vi locale first, then patched with en locale.
 *
 * Usage: node scripts/seed-blog-posts.mjs
 *   Requires SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD in .env
 *            and the dev server running on $NEXT_PUBLIC_SITE_URL (default http://localhost:3010).
 */
import 'dotenv/config'
import { SEED_POSTS } from './blog-content.mjs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010'
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD required in .env')
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

function paragraphsToLexical(paragraphs) {
  const children = paragraphs.map(([type, text]) => {
    if (type === 'h2' || type === 'h3') {
      return {
        type: 'heading',
        tag: type,
        version: 1,
        children: [{ type: 'text', text, version: 1, format: 0, mode: 'normal', style: '', detail: 0 }],
        direction: 'ltr',
        format: '',
        indent: 0,
      }
    }
    if (type === 'blockquote') {
      return {
        type: 'quote',
        version: 1,
        children: [
          {
            type: 'text',
            text,
            version: 1,
            format: 0,
            mode: 'normal',
            style: '',
            detail: 0,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      }
    }
    return {
      type: 'paragraph',
      version: 1,
      children: [{ type: 'text', text, version: 1, format: 0, mode: 'normal', style: '', detail: 0 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      textStyle: '',
    }
  })

  return {
    root: {
      type: 'root',
      version: 1,
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  }
}

async function findBySlug(token, slug) {
  const res = await fetch(
    `${SITE_URL}/api/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

async function createOrUpdateVi(token, post) {
  const existing = await findBySlug(token, post.slug)
  const body = {
    slug: post.slug,
    title: post.title.vi,
    excerpt: post.excerpt.vi,
    body: paragraphsToLexical(post.paragraphs.vi),
    category: post.category,
    publishedAt: post.publishedAt,
    author: post.author,
    status: 'draft',
  }

  const url = existing
    ? `${SITE_URL}/api/blog-posts/${existing.id}?locale=vi`
    : `${SITE_URL}/api/blog-posts?locale=vi`
  const method = existing ? 'PATCH' : 'POST'

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${method} ${post.slug} (vi) failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  return data.doc?.id ?? data.id ?? existing?.id
}

async function patchEn(token, id, post) {
  const body = {
    title: post.title.en,
    excerpt: post.excerpt.en,
    body: paragraphsToLexical(post.paragraphs.en),
  }
  const res = await fetch(`${SITE_URL}/api/blog-posts/${id}?locale=en`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PATCH ${post.slug} (en) failed: ${res.status} ${await res.text()}`)
}

async function main() {
  console.log(`[seed-blog] Logging in as ${ADMIN_EMAIL}…`)
  const token = await login()

  let ok = 0
  let failed = 0

  for (const post of SEED_POSTS) {
    try {
      const id = await createOrUpdateVi(token, post)
      await patchEn(token, id, post)
      ok++
      console.log(`[seed-blog] ✓ ${post.slug}`)
    } catch (err) {
      failed++
      console.error(`[seed-blog] ✗ ${post.slug}:`, err.message)
    }
  }

  console.log(`\n[seed-blog] Done — ${ok} ok, ${failed} failed (of ${SEED_POSTS.length})`)
  process.exit(failed === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
