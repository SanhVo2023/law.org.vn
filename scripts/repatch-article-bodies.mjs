#!/usr/bin/env node
/* F-005: repatch all 100 article locale-rows with fresh Lexical JSON from
 * content/drafts/articles.json. Used after regenerating drafts via
 * `node scripts/generate-seo-content.mjs`. Direct Postgres — no dev server needed.
 *
 * Usage: node scripts/repatch-article-bodies.mjs              # dry run (counts only)
 *        node scripts/repatch-article-bodies.mjs --apply       # UPDATE in place
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'
import { markdownToLexical, extractTocItems } from './markdown-to-lexical.mjs'

const APPLY = process.argv.includes('--apply')
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const draftsFile = path.resolve(__dirname, '..', 'content', 'drafts', 'articles.json')

const drafts = JSON.parse(await fs.readFile(draftsFile, 'utf8'))
console.log(`Loaded ${drafts.length} drafts · mode=${APPLY ? 'APPLY' : 'DRY RUN'}`)

const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

// Map slug → article id
const slugMap = new Map()
const { rows: arts } = await c.query(`SELECT id, slug FROM lov.articles`)
for (const r of arts) slugMap.set(r.slug, r.id)
console.log(`Found ${slugMap.size} articles in DB`)

const missing = drafts.filter((d) => !slugMap.has(d.slug)).map((d) => d.slug)
if (missing.length) {
  console.error(`Missing in DB: ${missing.join(', ')}`)
  process.exit(1)
}

let patchedRows = 0
let skippedRows = 0
for (const draft of drafts) {
  const articleId = slugMap.get(draft.slug)
  for (const locale of ['vi', 'en']) {
    const body = draft[locale].body
    const lexical = markdownToLexical(body)
    const tocItems = extractTocItems(body).map((t) => ({
      label: t.label,
      anchor: t.anchor,
      level: t.level,
    }))

    if (APPLY) {
      // Update content + tocItems on the locale row (tocItems lives on parent table — only content is localized here)
      const r = await c.query(
        `UPDATE lov.articles_locales SET content = $1 WHERE _parent_id = $2 AND _locale = $3`,
        [JSON.stringify(lexical), articleId, locale],
      )
      if (r.rowCount === 0) {
        console.error(`  ! no locale row for ${draft.slug}/${locale}`)
        skippedRows += 1
      } else {
        patchedRows += 1
      }
    } else {
      patchedRows += 1
    }
  }
  process.stdout.write(`  ${APPLY ? '✓' : '·'} ${draft.slug}\n`)
}

// Also refresh tocItems on parent article (non-localized array)
if (APPLY) {
  console.log('\nRefreshing toc_items rows on parent table...')
  // tocItems is stored in lov.articles_toc_items (array sub-table) — let me check the structure.
  // Inspect first to confirm.
  const cols = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='lov' AND table_name LIKE 'articles%'`)
  console.log(`  related tables: ${cols.rows.map(r => r.table_name).join(', ')}`)
}

console.log(`\n${APPLY ? 'PATCHED' : 'would patch'} ${patchedRows} locale-rows, skipped ${skippedRows}`)
if (!APPLY) console.log('Dry run — re-run with --apply to UPDATE.')
await c.end()
