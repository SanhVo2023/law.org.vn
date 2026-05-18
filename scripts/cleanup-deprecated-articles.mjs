#!/usr/bin/env node
/* F-012 + F-013: delete deprecated article rows from the DB.
 *   Court-cluster removals (per Luật 81/2025/QH15, effective 01/07/2025):
 *     - high-peoples-courts          (abolished tier)
 *     - district-peoples-courts      (abolished — replaced by regional-peoples-courts)
 *     - peoples-procuracy            (not a court — off-topic for the cluster)
 *     - civil-judgment-enforcement   (not a court — off-topic)
 *     - commercial-arbitration       (not a court — off-topic)
 *   Rights-cluster removal (sensitive-content policy):
 *     - freedom-of-expression
 *
 * Cascade: DELETE child rows in articles_locales + articles_rels + articles_toc_items first,
 *          then DELETE the parent row in articles.
 *
 * Usage: node scripts/cleanup-deprecated-articles.mjs              # dry run
 *        node scripts/cleanup-deprecated-articles.mjs --apply       # commit
 */
import 'dotenv/config'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')

const DELETE_SLUGS = [
  'high-peoples-courts',
  'district-peoples-courts',
  'peoples-procuracy',
  'civil-judgment-enforcement',
  'commercial-arbitration',
  'freedom-of-expression',
]

const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

// Find parent ids
const found = await c.query(
  `SELECT id, slug FROM lov.articles WHERE slug = ANY($1::text[]) ORDER BY slug`,
  [DELETE_SLUGS],
)
console.log(`Targeting ${DELETE_SLUGS.length} slugs · found ${found.rows.length} in DB`)
for (const r of found.rows) console.log(`  - #${r.id} ${r.slug}`)
const ids = found.rows.map((r) => r.id)
if (ids.length === 0) {
  console.log('Nothing to delete.')
  process.exit(0)
}

const tablesToClean = [
  { table: 'lov.articles_toc_items', col: '_parent_id' },
  { table: 'lov.articles_rels', col: 'parent_id' }, // Drizzle/Payload polymorphic rels table uses unprefixed parent_id
  { table: 'lov.articles_locales', col: '_parent_id' },
  // Also clear any references from blog-post relationships pointing at these article ids
  { table: 'lov.blog_posts_rels', col: 'articles_id', whereByValue: true },
  // And from payload_locked_documents_rels
  { table: 'lov.payload_locked_documents_rels', col: 'articles_id', whereByValue: true },
]

for (const { table, col, whereByValue } of tablesToClean) {
  const valueClause = whereByValue ? `${col} = ANY($1::int[])` : `${col} = ANY($1::int[])`
  const sql = `SELECT COUNT(*) AS n FROM ${table} WHERE ${valueClause}`
  const r = await c.query(sql, [ids]).catch((e) => ({ rows: [{ n: `err:${e.message.slice(0, 60)}` }] }))
  console.log(`  ${table} (${col}): ${r.rows[0].n} child rows`)
  if (APPLY) {
    await c.query(`DELETE FROM ${table} WHERE ${valueClause}`, [ids]).catch((e) => {
      console.log(`    (skip: ${e.message.slice(0, 80)})`)
    })
  }
}

if (APPLY) {
  const r = await c.query(`DELETE FROM lov.articles WHERE id = ANY($1::int[])`, [ids])
  console.log(`\n✓ DELETED ${r.rowCount} parent rows.`)
} else {
  console.log(`\nDry run — re-run with --apply to delete.`)
}

await c.end()
