#!/usr/bin/env node
/* Register the existing R2 site images (image-assets.json) as Payload Media docs
 * so they appear in the CMS Media library. Re-uploads each image's bytes through
 * Payload's media API (robust normal-upload flow → stores a copy at the bucket
 * root + generates thumbnail/card/hero/og sizes). Idempotent: skips a filename
 * that already exists in Media.
 *
 * Reads admin creds from .env. Run against a local `next start` (no 4.5MB body
 * limit). Media docs land in the shared DB + R2, so they show on Vercel too.
 *
 * Usage: node scripts/import-images-to-media.mjs            # all
 *        node scripts/import-images-to-media.mjs --limit=3   # test a few
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = process.env.MEDIA_IMPORT_SITE || 'http://localhost:3010'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PW = process.env.SEED_ADMIN_PASSWORD
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const manifest = JSON.parse(
  await fs.readFile(path.resolve(__dirname, '..', 'image-assets.json'), 'utf8'),
)
const imgs = (Array.isArray(manifest) ? manifest : manifest.images || manifest.assets || [])
  .filter((a) => a.result_url)

async function login() {
  const r = await fetch(`${SITE}/api/users/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PW }),
  })
  if (!r.ok) throw new Error(`login ${r.status}`)
  return (await r.json()).token
}

async function existing(token, filename) {
  const r = await fetch(
    `${SITE}/api/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  ).then((x) => x.json())
  return r.docs?.[0] ?? null
}

const token = await login()
console.log(`Importing up to ${Math.min(imgs.length, LIMIT)} of ${imgs.length} images → ${SITE}`)

let created = 0, skipped = 0, failed = 0, n = 0
for (const a of imgs) {
  if (n >= LIMIT) break
  n++
  const filename = a.result_url.split('/').pop()
  const alt = a.name || a.id || filename
  try {
    if (await existing(token, filename)) { skipped++; process.stdout.write(`  · ${filename} (exists)\n`); continue }
    const bytes = Buffer.from(await (await fetch(a.result_url)).arrayBuffer())
    const fd = new FormData()
    fd.append('_payload', JSON.stringify({ alt }))
    fd.append('file', new Blob([bytes], { type: 'image/webp' }), filename)
    const up = await fetch(`${SITE}/api/media?locale=vi`, {
      method: 'POST', headers: { Authorization: `JWT ${token}` }, body: fd,
    })
    if (!up.ok) { failed++; console.log(`  ✗ ${filename}: ${up.status} ${(await up.text()).slice(0, 160)}`); continue }
    const doc = (await up.json()).doc
    // mirror alt to the en locale (alt is required per-locale)
    await fetch(`${SITE}/api/media/${doc.id}?locale=en`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify({ alt }),
    })
    created++
    process.stdout.write(`  + ${filename} → ${doc.url}\n`)
  } catch (e) {
    failed++; console.log(`  ✗ ${filename}: ${e.message}`)
  }
  await new Promise((r) => setTimeout(r, 150))
}
console.log(`\nDone. created=${created} skipped=${skipped} failed=${failed}`)
