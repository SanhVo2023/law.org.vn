#!/usr/bin/env node
/* One-shot: drop the lingering `glossary_terms_id` columns from Payload's relationship-tracking
 * tables in the lov schema. Drizzle was blocking on a "create vs rename" interactive prompt because
 * the old column survived the GlossaryTerms collection removal. Once dropped, init-schema.mjs runs
 * without the prompt and creates the new legal_updates_id column.
 */
import 'dotenv/config'
import pg from 'pg'

const { Client } = pg
const client = new Client({ connectionString: process.env.DATABASE_URI })
await client.connect()

const stmts = [
  `ALTER TABLE lov.payload_locked_documents_rels DROP COLUMN IF EXISTS glossary_terms_id`,
  `ALTER TABLE lov.articles_rels DROP COLUMN IF EXISTS glossary_terms_id`,
  `ALTER TABLE lov._articles_v_rels DROP COLUMN IF EXISTS glossary_terms_id`,
  `DROP TABLE IF EXISTS lov.glossary_terms_locales CASCADE`,
  `DROP TABLE IF EXISTS lov.glossary_terms_rels CASCADE`,
  `DROP TABLE IF EXISTS lov.glossary_terms CASCADE`,
  `DROP TYPE IF EXISTS lov.enum_glossary_terms_term_category CASCADE`,
]

for (const sql of stmts) {
  try {
    await client.query(sql)
    console.log('[ok]', sql)
  } catch (err) {
    console.log('[skip]', sql, '—', err.message)
  }
}

await client.end()
console.log('[drop-glossary-column] done')
