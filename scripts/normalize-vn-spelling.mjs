#!/usr/bin/env node
/* F-008: normalize Vietnamese spelling per Mr Hien CSV review rows 3-7.
 *   hoá → hóa,  toà → tòa,  hoà → hòa,  hòan → hoàn,  tòan → toàn
 *
 * IMPORTANT — word-boundary handling:
 * The 3-letter rules (toà/hoà/hoá) are PREFIXES of correctly-spelled compound words
 * (toàn, toại, hoàng, hoàn, hoán, hoài, hoành, …). A naive substring replacement
 * would break those compounds (e.g., toàn → tòan). To avoid that, the 3-letter rules
 * only fire when the match is NOT immediately followed by another Vietnamese letter.
 *
 * The 4-letter rules (hòan/tòan) are unambiguous since the correct forms (hoàn/toàn)
 * never embed them as substrings. They apply globally.
 *
 * CLEANUP RULES revert previous-pass breakage (a prior run of this script with a
 * substring-based 3-letter rule turned correctly-spelled compounds into nonwords).
 * Each cleanup rule maps a nonexistent Vietnamese form back to its correct compound.
 *
 * Two passes:
 *   1. Source files (TS/TSX/JSON/mjs/md) under the site folder.
 *   2. DB sweep: lov.articles_locales + lov.blog_posts_locales — titles, excerpts,
 *      content JSON; lov.categories_locales descriptions; lov.legal_updates title_vi.
 *
 * Usage: node scripts/normalize-vn-spelling.mjs              # dry run
 *        node scripts/normalize-vn-spelling.mjs --apply       # apply
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..')

// Vietnamese-letter character class. If the next character after a 3-letter
// match is one of these, we are inside a compound word and must NOT replace.
const VN_LETTER = 'a-zA-ZàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ'

/** CLEANUP RULES: reverse the breakage of a prior naive substring pass.
 *  Each LHS is a nonexistent Vietnamese form; RHS is the correct compound. */
const CLEANUP_RULES = [
  // Lowercase
  { re: /tòan/gu, to: 'toàn' },
  { re: /hòan/gu, to: 'hoàn' },
  { re: /hóan/gu, to: 'hoán' },
  { re: /hòai/gu, to: 'hoài' },
  { re: /tòai/gu, to: 'toài' },
  { re: /hòang/gu, to: 'hoàng' },
  { re: /hóang/gu, to: 'hoáng' },
  { re: /hòanh/gu, to: 'hoành' },
  { re: /hóanh/gu, to: 'hoánh' },
  { re: /tòanh/gu, to: 'toành' },
  { re: /hòat/gu, to: 'hoạt' },
  { re: /hóat/gu, to: 'hoát' },
  { re: /hòac/gu, to: 'hoặc' }, // hoặc has tone on ặ but if scrambled this rebuilds
  // Capitalized starts
  { re: /Tòan/gu, to: 'Toàn' },
  { re: /Hòan/gu, to: 'Hoàn' },
  { re: /Hóan/gu, to: 'Hoán' },
  { re: /Hòai/gu, to: 'Hoài' },
  { re: /Hòang/gu, to: 'Hoàng' },
  { re: /Hóang/gu, to: 'Hoáng' },
  { re: /Hòanh/gu, to: 'Hoành' },
  { re: /Hòat/gu, to: 'Hoạt' },
]

/** FORWARD RULES (with word-boundary):
 *  - 4-letter rules always apply (no compound conflict).
 *  - 3-letter rules use a negative lookahead to skip matches followed by a Vietnamese letter. */
const FORWARD_RULES = [
  // 4-letter: unambiguous
  { re: /hòan/gu, to: 'hoàn' },
  { re: /tòan/gu, to: 'toàn' },
  // 3-letter: only when followed by a non-VN-letter (or end of string)
  { re: new RegExp(`hoá(?![${VN_LETTER}])`, 'gu'), to: 'hóa' },
  { re: new RegExp(`Hoá(?![${VN_LETTER}])`, 'gu'), to: 'Hóa' },
  { re: new RegExp(`toà(?![${VN_LETTER}])`, 'gu'), to: 'tòa' },
  { re: new RegExp(`Toà(?![${VN_LETTER}])`, 'gu'), to: 'Tòa' },
  { re: new RegExp(`hoà(?![${VN_LETTER}])`, 'gu'), to: 'hòa' },
  { re: new RegExp(`Hoà(?![${VN_LETTER}])`, 'gu'), to: 'Hòa' },
]

const ALL_RULES = [...CLEANUP_RULES, ...FORWARD_RULES]

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '.turbo', '.netlify'])
const SKIP_PATH_PREFIXES = ['content/drafts/'] // auto-regenerated downstream
const ALLOWED_EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.css'])

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    const rel = path.relative(SITE_ROOT, full).replace(/\\/g, '/')
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      if (SKIP_PATH_PREFIXES.some((p) => rel.startsWith(p.replace(/\/$/, '')))) continue
      await walk(full, files)
    } else if (e.isFile()) {
      if (SKIP_PATH_PREFIXES.some((p) => rel.startsWith(p))) continue
      if (ALLOWED_EXT.has(path.extname(full))) files.push(full)
    }
  }
  return files
}

async function processFile(p) {
  const text = await fs.readFile(p, 'utf8')
  let next = text
  const hits = []
  for (const { re, to } of ALL_RULES) {
    const matches = next.match(re)
    if (matches) {
      hits.push(`${re.source.replace(/\\/g, '').slice(0, 20)}→${to}: ${matches.length}`)
      next = next.replace(re, to)
    }
  }
  if (hits.length === 0) return null
  if (APPLY) await fs.writeFile(p, next, 'utf8')
  return { file: path.relative(SITE_ROOT, p), hits }
}

const files = await walk(SITE_ROOT)
console.log(`Scanned ${files.length} files · mode=${APPLY ? 'APPLY' : 'DRY RUN'}`)

let totalFiles = 0
for (const f of files) {
  if (f.endsWith('normalize-vn-spelling.mjs')) continue
  const r = await processFile(f)
  if (r) {
    totalFiles += 1
    console.log(`  ${APPLY ? '✓' : '·'} ${r.file} — ${r.hits.join(' · ')}`)
  }
}
console.log(`\nFiles touched: ${totalFiles}`)

// ─── DB sweep ──────────────────────────────────────────────────────────
console.log(`\n=== DB sweep ===`)
const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

const stringFieldTargets = [
  { table: 'lov.articles_locales', fields: ['title', 'excerpt', 'meta_title', 'meta_description'] },
  { table: 'lov.blog_posts_locales', fields: ['title', 'excerpt', 'meta_title', 'meta_description'] },
  { table: 'lov.legal_updates', fields: ['title_vi'] },
  { table: 'lov.categories_locales', fields: ['name', 'description'] },
]

async function applyRuleToStringField(table, field) {
  // Pull all rows that contain ANY of the target patterns, fix in JS, write back.
  // Easier than crafting SQL regex on every Vietnamese diacritic.
  const sel = await c.query(`SELECT id, ${field} AS v FROM ${table} WHERE ${field} IS NOT NULL`)
  let changed = 0
  for (const row of sel.rows) {
    if (typeof row.v !== 'string') continue
    let next = row.v
    let touched = false
    for (const { re, to } of ALL_RULES) {
      if (re.test(next)) {
        next = next.replace(re, to)
        touched = true
      }
    }
    if (touched && next !== row.v) {
      changed += 1
      if (APPLY) {
        await c.query(`UPDATE ${table} SET ${field} = $1 WHERE id = $2`, [next, row.id])
      }
    }
  }
  if (changed > 0) {
    console.log(`  ${APPLY ? '✓' : '·'} ${table}.${field}: ${changed} rows`)
  }
}

for (const { table, fields } of stringFieldTargets) {
  for (const field of fields) {
    try {
      await applyRuleToStringField(table, field)
    } catch (e) {
      console.log(`  (skip ${table}.${field}: ${e.message})`)
    }
  }
}

// JSONB content
const jsonbTargets = [
  { table: 'lov.articles_locales', field: 'content' },
  { table: 'lov.blog_posts_locales', field: 'body' },
]
for (const { table, field } of jsonbTargets) {
  const sel = await c.query(
    `SELECT id, ${field}::text AS v FROM ${table} WHERE _locale='vi' AND ${field} IS NOT NULL`,
  )
  let changed = 0
  for (const row of sel.rows) {
    if (typeof row.v !== 'string') continue
    let next = row.v
    let touched = false
    for (const { re, to } of ALL_RULES) {
      if (re.test(next)) {
        next = next.replace(re, to)
        touched = true
      }
    }
    if (touched && next !== row.v) {
      changed += 1
      if (APPLY) {
        await c.query(`UPDATE ${table} SET ${field} = $1::jsonb WHERE id = $2`, [next, row.id])
      }
    }
  }
  if (changed > 0) {
    console.log(`  ${APPLY ? '✓' : '·'} ${table}.${field} (jsonb, vi): ${changed} rows`)
  }
}

await c.end()
console.log(`\n${APPLY ? 'APPLY' : 'DRY RUN'} complete.`)
