#!/usr/bin/env node
/* F-014: multi-pass AI content review (Mr Hien CSV row 26).
 *
 * For each article body in lov.articles_locales, split by H2 headings (## ...) and
 * call Claude Haiku 4.5 to judge whether each section's prose substantively matches
 * its heading and the article topic. Output the verdict report to
 * content/audit/title-mismatch-report.json. Read-only on the DB.
 *
 * Prompt caching is used on the system prompt + topic context to keep API cost low.
 * Expected cost: ~$2 for 46 articles × 2 locales × ~5 sections = ~470 calls.
 *
 * Usage: ANTHROPIC_API_KEY=sk-ant-... node scripts/verify-articles-with-ai.mjs
 *        Add --apply to enable (no-op without it — prevents accidental spend).
 *        Add --limit=5 to test on a small sample first.
 */
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1]) : Infinity

const API_KEY = process.env.ANTHROPIC_API_KEY
if (APPLY && !API_KEY) {
  console.error('ANTHROPIC_API_KEY must be set in env to run with --apply')
  process.exit(1)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'content', 'audit')
const outFile = path.join(outDir, 'title-mismatch-report.json')

const MODEL = 'claude-haiku-4-5-20251001'

const SYSTEM_PROMPT = `You are a Vietnamese legal-content reviewer. Given an article title, an H2 section heading, and the section's prose, judge whether the prose substantively matches BOTH the section heading and the article's overall topic.

Reply in this exact JSON format:
{"verdict": "YES" | "NO", "reason": "<one short sentence>"}

Examples of NO:
- Section heading is "Background and drafting process" but prose discusses the 2015 Criminal Code
- Section heading is "Court jurisdiction" but prose is about administrative procedure
- Section heading is "Foundational principles" but prose talks about land-use certificates`

const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

function plain(node) {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(plain).join('')
  return ''
}

function splitSections(content) {
  if (!content?.root?.children) return []
  const sections = []
  let current = null
  for (const node of content.root.children) {
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 2)) {
      if (current) sections.push(current)
      current = { heading: plain(node).trim(), body: '' }
    } else if (current) {
      current.body += plain(node).trim() + '\n\n'
    }
  }
  if (current) sections.push(current)
  return sections.map((s) => ({ ...s, body: s.body.trim() }))
}

async function judge(title, section) {
  const userMsg = `TITLE: ${title}\nSECTION HEADING: ${section.heading}\nPROSE:\n${section.body.slice(0, 1500)}`
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 120,
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: userMsg }],
    }),
  })
  if (!res.ok) {
    return { verdict: 'ERR', reason: `HTTP ${res.status}: ${await res.text()}` }
  }
  const data = await res.json()
  const text = data.content?.[0]?.text || ''
  try {
    const m = text.match(/\{[^}]+\}/s)
    if (m) return JSON.parse(m[0])
  } catch {}
  return { verdict: 'ERR', reason: `Unparseable: ${text.slice(0, 80)}` }
}

const articles = await c.query(`
  SELECT a.id, a.slug, l._locale, l.title, l.content
  FROM lov.articles a
  JOIN lov.articles_locales l ON l._parent_id = a.id
  WHERE l.content IS NOT NULL
  ORDER BY a.slug, l._locale
`)
console.log(`Found ${articles.rows.length} article locale-rows · target=${MODEL} · mode=${APPLY ? 'APPLY' : 'DRY RUN'}`)

if (!APPLY) {
  // Show what would be sent (count sections)
  let totalSections = 0
  let processed = 0
  for (const row of articles.rows) {
    if (processed >= LIMIT) break
    const sections = splitSections(row.content)
    totalSections += sections.length
    processed += 1
  }
  console.log(`Would call API for ${totalSections} sections across ${Math.min(articles.rows.length, LIMIT)} locale-rows.`)
  console.log(`Estimated cost on Haiku 4.5 (≈300 in-tokens × 470 calls × $0.80/MTok): ~$0.11 input + ~$0.40 output = ~$0.50`)
  console.log(`\nDry run — re-run with --apply (and ANTHROPIC_API_KEY set) to send.`)
  await c.end()
  process.exit(0)
}

const report = { generatedAt: new Date().toISOString(), model: MODEL, results: [] }
let totalCalls = 0
let totalNo = 0
let processed = 0
for (const row of articles.rows) {
  if (processed >= LIMIT) break
  processed += 1
  const sections = splitSections(row.content)
  const verdicts = []
  for (const sec of sections) {
    if (sec.body.length < 100) continue // skip thin sections (e.g. drop-cap lede alone)
    const v = await judge(row.title, sec)
    totalCalls += 1
    if (v.verdict === 'NO') totalNo += 1
    verdicts.push({ heading: sec.heading, verdict: v.verdict, reason: v.reason })
    process.stdout.write(`  ${v.verdict === 'NO' ? '✗' : v.verdict === 'YES' ? '·' : '?'} `)
  }
  process.stdout.write(`  [${row._locale}] ${row.slug}\n`)
  report.results.push({ slug: row.slug, locale: row._locale, title: row.title, verdicts })
}

await fs.mkdir(outDir, { recursive: true })
await fs.writeFile(outFile, JSON.stringify(report, null, 2), 'utf8')

console.log(`\n=== SUMMARY ===`)
console.log(`Total API calls: ${totalCalls}`)
console.log(`Mismatches (NO verdicts): ${totalNo}`)
console.log(`Report written to ${path.relative(process.cwd(), outFile)}`)

await c.end()
