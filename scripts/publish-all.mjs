#!/usr/bin/env node
/* Flip every article + blog post from draft/review → published, through the
 * Payload REST API (NOT raw SQL — Payload must write the proper published
 * version since `versions.drafts` is enabled and fire the revalidation hooks).
 *
 * The custom `status` select field (draft | review | published) drives the
 * "Bản thảo" badges across the site; `_status` is already published (the docs
 * render publicly). A PATCH without `?draft=true` publishes a new version, so we
 * send only { status: 'published' } and let Payload merge the rest.
 *
 * Reads admin creds from .env. Run against a local `next start` on port 3010.
 *   node scripts/publish-all.mjs
 *   node scripts/publish-all.mjs --dry-run
 */
import 'dotenv/config'

const SITE = process.env.PUBLISH_SITE || 'http://localhost:3010'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PW = process.env.SEED_ADMIN_PASSWORD
const DRY = process.argv.includes('--dry-run')

// We publish ONLY docs that already have a published version — i.e. the ones the
// public site already serves (currently with a "draft" custom status, so they show
// a "Bản thảo" badge). Docs with no published version are deliberately hidden:
// the removed/sensitive `freedom-of-expression`, court docs superseded by the Law
// 81/2025 restructure (`district-/high-peoples-courts`, `peoples-procuracy`), and
// unpublished drafts (`commercial-arbitration`, `civil-judgment-enforcement`).
// Publishing those would SURFACE deprecated/sensitive content, so they stay drafts.
// The public (non-draft) listing already excludes them, so it is our allow-list.

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
  if (!r.ok) throw new Error(`login ${r.status}: ${(await r.text()).slice(0, 200)}`)
  return (await r.json()).token
}

async function listServed(token, coll) {
  // No `draft=true` → Payload returns only docs that already have a published
  // version (the ones the public site serves). Hidden draft-only docs are excluded.
  const r = await fetch(`${SITE}/api/${coll}?limit=500&depth=0`, {
    headers: { Authorization: `JWT ${token}` },
  })
  if (!r.ok) throw new Error(`list ${coll} ${r.status}`)
  return (await r.json()).docs ?? []
}

async function publish(token, coll, id) {
  // No ?draft=true → Payload saves this as the published version.
  const r = await fetch(`${SITE}/api/${coll}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ status: 'published' }),
  })
  if (!r.ok) throw new Error(`${r.status}: ${(await r.text()).slice(0, 160)}`)
}

const token = await login()
console.log(`Logged in as ${EMAIL} → ${SITE}${DRY ? '  (DRY RUN)' : ''}`)

for (const coll of ['articles', 'blog-posts']) {
  const served = await listServed(token, coll)
  const pending = served.filter((d) => d.status !== 'published')
  console.log(`\n${coll}: ${served.length} served (published version), ${pending.length} to publish`)
  let ok = 0,
    fail = 0
  for (const d of pending) {
    const label = d.slug || d.id
    if (DRY) {
      console.log(`  · would publish ${label} (status=${d.status})`)
      continue
    }
    try {
      await publish(token, coll, d.id)
      ok++
      process.stdout.write(`  + ${label}\n`)
    } catch (e) {
      fail++
      console.log(`  ✗ ${label}: ${e.message}`)
    }
    await new Promise((r) => setTimeout(r, 200)) // ease the max:2 pool
  }
  if (!DRY) console.log(`  ${coll}: published=${ok} failed=${fail}`)
}
console.log('\nDone.')
