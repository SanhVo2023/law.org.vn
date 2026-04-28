#!/usr/bin/env node
/* Initialize Payload (which triggers postgres-adapter `push: true` schema sync).
 * Sidesteps the broken `npx payload migrate` CLI under Node 22 / Payload 3.81 / Next 16 by importing the Payload runtime directly.
 *
 * Usage: node --import tsx --env-file=.env scripts/init-schema.mjs
 */
import 'dotenv/config'
import { getPayload } from 'payload'

const config = (await import('../src/payload.config.ts')).default

console.log('[init-schema] booting Payload with config…')
const payload = await getPayload({ config })

// Smoke: read users count to confirm DB connectivity
const users = await payload.find({ collection: 'users', limit: 0 })
console.log(`[init-schema] users count = ${users.totalDocs}`)

console.log('[init-schema] schema push complete — exiting')
process.exit(0)
