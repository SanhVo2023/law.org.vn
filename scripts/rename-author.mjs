#!/usr/bin/env node
/* F-003: rename byline "Apolo Editorial" → "Apolo Editorial Team" on existing blog posts.
 * Canonical author per Mr Hien (2026-05-11). On this site, articles have no author field
 * and Mr Hien is not credited anywhere — so this is a one-time string rename. */
import 'dotenv/config'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

const before = await c.query(
  `SELECT id, slug, author FROM lov.blog_posts WHERE author = 'Apolo Editorial' OR author IS NULL ORDER BY id`,
)
console.log(`Found ${before.rows.length} blog_posts to rename:`)
for (const r of before.rows) console.log(`  #${r.id} ${r.slug} — current="${r.author ?? '(null)'}"`)

if (APPLY) {
  const r = await c.query(
    `UPDATE lov.blog_posts SET author = 'Apolo Editorial Team' WHERE author = 'Apolo Editorial' OR author IS NULL`,
  )
  console.log(`\nUPDATED ${r.rowCount} rows.`)
  const after = await c.query(`SELECT DISTINCT author, COUNT(*) FROM lov.blog_posts GROUP BY author`)
  console.log('\nPost-update author distribution:')
  for (const r of after.rows) console.log(`  ${r.author}: ${r.count}`)
} else {
  console.log('\nDry run — re-run with --apply to UPDATE.')
}
await c.end()
