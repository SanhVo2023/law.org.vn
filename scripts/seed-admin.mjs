#!/usr/bin/env node
/* Create the first admin user on a freshly migrated Payload DB.
 * Uses POST /api/users/first-register (only works when there are zero users).
 * Idempotent — if a user already exists, prints a notice and exits 0.
 *
 * Usage: node scripts/seed-admin.mjs
 */
import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

async function main() {
  // Probe: are there already users?
  const probe = await fetch(`${SITE_URL}/api/users?limit=1`)
  if (probe.ok) {
    const data = await probe.json()
    if ((data.totalDocs ?? 0) > 0) {
      console.log(`[seed-admin] users already exist (count=${data.totalDocs}); skipping first-register.`)
      return
    }
  }

  const res = await fetch(`${SITE_URL}/api/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, role: 'admin' }),
  })
  if (!res.ok) {
    console.error(`[seed-admin] first-register failed: ${res.status} ${await res.text()}`)
    process.exit(1)
  }
  console.log(`[seed-admin] created first admin: ${EMAIL}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
