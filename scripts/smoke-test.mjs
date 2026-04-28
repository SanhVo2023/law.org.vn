#!/usr/bin/env node
/* Post-import smoke test: fetch 5 random articles via REST and verify they are stored as Lexical JSON (not markdown strings).
 * Usage: node scripts/smoke-test.mjs
 */
import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function main() {
  const res = await fetch(`${SITE_URL}/api/articles?limit=5&depth=0`)
  if (!res.ok) {
    console.error(`Fetch failed: ${res.status}`)
    process.exit(1)
  }
  const { docs } = await res.json()
  if (!docs || docs.length === 0) {
    console.error('No articles returned — import may not have run.')
    process.exit(1)
  }
  let ok = 0
  let bad = 0
  for (const doc of docs) {
    const isLexical =
      doc.content && typeof doc.content === 'object' && doc.content.root && Array.isArray(doc.content.root.children)
    if (isLexical) {
      ok += 1
      console.log(`  ✓ ${doc.slug}: Lexical JSON (${doc.content.root.children.length} blocks)`)
    } else {
      bad += 1
      console.log(`  ✗ ${doc.slug}: content is not Lexical JSON — got ${typeof doc.content}`)
    }
  }
  console.log(`\n[smoke-test] ${ok} ok, ${bad} bad`)
  process.exit(bad === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
