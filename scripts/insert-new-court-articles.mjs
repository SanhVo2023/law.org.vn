#!/usr/bin/env node
/* F-012: insert article rows for the 2 new court-system topics introduced by
 * Luật số 81/2025/QH15 (regional-peoples-courts + specialized-courts). The
 * subsequent repatch-article-bodies.mjs run will fill content + title fields.
 *
 * Usage: node scripts/insert-new-court-articles.mjs              # dry run
 *        node scripts/insert-new-court-articles.mjs --apply       # commit
 */
import 'dotenv/config'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')

const NEW_SLUGS = ['regional-peoples-courts', 'specialized-courts']
const TODAY = new Date().toISOString()

const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

// Find court-system category id
const catRes = await c.query(`SELECT id FROM lov.categories WHERE slug = 'court-system'`)
if (catRes.rows.length === 0) {
  console.error('court-system category not found')
  process.exit(1)
}
const courtCatId = catRes.rows[0].id
console.log(`court-system category_id = ${courtCatId}`)

for (const slug of NEW_SLUGS) {
  const exists = await c.query(`SELECT id FROM lov.articles WHERE slug = $1`, [slug])
  if (exists.rows.length > 0) {
    console.log(`  · ${slug}: already exists (#${exists.rows[0].id}) — skip`)
    continue
  }
  console.log(`  ${APPLY ? '+' : '·'} ${slug} (new)`)
  if (APPLY) {
    // Insert minimal article row
    const r = await c.query(
      `INSERT INTO lov.articles (slug, category_id, status, _status, published_date, updated_date, created_at, updated_at)
       VALUES ($1, $2, 'draft', 'draft', $3, $3, $3, $3)
       RETURNING id`,
      [slug, courtCatId, TODAY],
    )
    const id = r.rows[0].id
    // Insert minimal locale rows (title will be overwritten by repatch via UPDATE)
    for (const locale of ['vi', 'en']) {
      await c.query(
        `INSERT INTO lov.articles_locales (_parent_id, _locale, title)
         VALUES ($1, $2, $3)`,
        [id, locale, slug], // placeholder title; repatch may not touch title field
      )
    }
    console.log(`    → article #${id} created, 2 locale rows seeded`)
  }
}

await c.end()
console.log(`\n${APPLY ? 'APPLY' : 'DRY RUN'} complete.`)
