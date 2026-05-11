#!/usr/bin/env node
/* F-001 article-body audit: strip non-govt link wrappers and "Nguồn:" / "Source:"
 * attribution paragraphs from every article + blog-post Lexical body. Also clears
 * legal_updates.source_url rows that don't match the govt allowlist.
 *
 * Govt allowlist (Mr Hien 2026-05-11): host matches *.gov.vn (any subdomain) OR vbpl.vn.
 * Internal ecosystem domains (law.org.vn, law.pro.vn, apolo.com.vn, apololawyers.com,
 * lawyer.id.vn, vothienhien.com, luatsutructuyen.net) are kept — they are not 3rd-party.
 *
 * On a non-allowlisted link node: replace the link node with its inline text children.
 * On an attribution paragraph: drop it. Match /^\s*(Nguồn|Source)\s*[:：]/i on the joined
 * plain text of leaf text nodes. We do NOT strip "Theo [X]" paragraphs — too risky.
 *
 * Runs directly against Postgres (no dev server needed).
 *
 * Usage: node scripts/audit-third-party-sources.mjs              # dry run
 *        node scripts/audit-third-party-sources.mjs --apply       # UPDATE in place
 */
import 'dotenv/config'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')

const INTERNAL_HOSTS = new Set([
  'law.org.vn',
  'www.law.org.vn',
  'law.pro.vn',
  'www.law.pro.vn',
  'apolo.com.vn',
  'www.apolo.com.vn',
  'apololawyers.com',
  'www.apololawyers.com',
  'lawyer.id.vn',
  'www.lawyer.id.vn',
  'vothienhien.com',
  'www.vothienhien.com',
  'luatsutructuyen.net',
  'www.luatsutructuyen.net',
])

function isGovOrInternal(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return true
  const url = rawUrl.trim()
  if (
    url.startsWith('/') ||
    url.startsWith('#') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  ) {
    return true
  }
  let host
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return false
  }
  if (INTERNAL_HOSTS.has(host)) return true
  if (host === 'vbpl.vn' || host.endsWith('.vbpl.vn')) return true
  if (host === 'gov.vn' || host.endsWith('.gov.vn')) return true
  return false
}

function plainTextOf(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(plainTextOf).join('')
  return ''
}

const ATTRIBUTION_RE = /^\s*(Nguồn|Source)\s*[:：]/i

function walkChildren(children, stats) {
  if (!Array.isArray(children)) return children
  const out = []
  for (const node of children) {
    if (!node || typeof node !== 'object') {
      out.push(node)
      continue
    }
    if (node.type === 'paragraph') {
      const text = plainTextOf(node)
      if (ATTRIBUTION_RE.test(text)) {
        stats.droppedParagraphs += 1
        continue
      }
    }
    const recursed = node.children ? walkChildren(node.children, stats) : node.children

    if (node.type === 'link') {
      const url = node.fields?.url ?? node.url
      if (!isGovOrInternal(url)) {
        stats.strippedLinks += 1
        const kids = Array.isArray(recursed) ? recursed : []
        for (const kid of kids) out.push(kid)
        continue
      }
    }

    out.push(node.children ? { ...node, children: recursed } : node)
  }
  return out
}

function auditContent(content, stats) {
  if (!content || typeof content !== 'object' || !content.root) {
    return { content, changed: false }
  }
  const before = { l: stats.strippedLinks, p: stats.droppedParagraphs }
  const newRoot = { ...content.root, children: walkChildren(content.root.children, stats) }
  const changed = stats.strippedLinks > before.l || stats.droppedParagraphs > before.p
  return { content: { ...content, root: newRoot }, changed }
}

const COLLECTIONS = [
  { table: 'lov.articles_locales', parentTable: 'lov.articles', field: 'content' },
  { table: 'lov.blog_posts_locales', parentTable: 'lov.blog_posts', field: 'body' },
]

;(async () => {
  console.log(`F-001 audit · mode=${APPLY ? 'APPLY' : 'DRY RUN'}`)
  const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
  await c.connect()

  const grand = { docs: 0, changed: 0, strippedLinks: 0, droppedParagraphs: 0 }

  for (const col of COLLECTIONS) {
    console.log(`\n=== ${col.table} ===`)
    const sql = `
      SELECT l.id AS locale_id, l._parent_id AS parent_id, l._locale, p.slug, l.${col.field} AS content
      FROM ${col.table} l
      JOIN ${col.parentTable} p ON p.id = l._parent_id
      ORDER BY l._parent_id, l._locale
    `
    const r = await c.query(sql)
    const totals = { docs: 0, changed: 0, strippedLinks: 0, droppedParagraphs: 0 }
    for (const row of r.rows) {
      totals.docs += 1
      if (!row.content) continue
      const stats = { strippedLinks: 0, droppedParagraphs: 0 }
      const { content: next, changed } = auditContent(row.content, stats)
      if (changed) {
        totals.changed += 1
        totals.strippedLinks += stats.strippedLinks
        totals.droppedParagraphs += stats.droppedParagraphs
        console.log(
          `    ✎ [${row._locale}] ${row.slug} — strippedLinks=${stats.strippedLinks} droppedParagraphs=${stats.droppedParagraphs}`,
        )
        if (APPLY) {
          await c.query(
            `UPDATE ${col.table} SET ${col.field} = $1 WHERE id = $2`,
            [JSON.stringify(next), row.locale_id],
          )
        }
      }
    }
    console.log(
      `  ${col.table}: ${totals.changed}/${totals.docs} locale-rows changed · ${totals.strippedLinks} links stripped · ${totals.droppedParagraphs} attribution paragraphs dropped`,
    )
    grand.docs += totals.docs
    grand.changed += totals.changed
    grand.strippedLinks += totals.strippedLinks
    grand.droppedParagraphs += totals.droppedParagraphs
  }

  // legal_updates.source_url sweep — clear non-govt URLs.
  console.log(`\n=== lov.legal_updates.source_url ===`)
  const lu = await c.query(`SELECT id, number, source_url FROM lov.legal_updates WHERE source_url IS NOT NULL AND source_url <> ''`)
  let luCleared = 0
  for (const row of lu.rows) {
    if (!isGovOrInternal(row.source_url)) {
      luCleared += 1
      console.log(`    ✂ ${row.number} → clearing ${row.source_url.slice(0, 80)}…`)
      if (APPLY) {
        await c.query(`UPDATE lov.legal_updates SET source_url = NULL WHERE id = $1`, [row.id])
      }
    }
  }
  console.log(`  legal_updates: ${luCleared}/${lu.rows.length} cleared`)

  console.log(`\n========================================`)
  console.log(
    `GRAND TOTAL: ${grand.changed}/${grand.docs} locale-rows changed · ${grand.strippedLinks} links stripped · ${grand.droppedParagraphs} attribution paragraphs dropped · ${luCleared} source_urls cleared`,
  )
  if (!APPLY) console.log('Dry run — re-run with --apply to UPDATE.')

  await c.end()
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
