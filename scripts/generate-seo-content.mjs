#!/usr/bin/env node
/* Produce substantive markdown bodies for all 50 topics × 2 locales = 100 articles.
 * Each body is ~700-900 words with real prose, varied section templates, and a pull quote.
 * Output: content/drafts/articles.json — consumed by import-content.mjs.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOPICS } from './topics.mjs'
import {
  FRAMEWORK_REFS,
  DEFAULT_PULL_QUOTES,
  CATEGORY_FRAMES,
  SECTION_TEMPLATES,
  LEDE_TEMPLATES,
  SEE_ALSO,
  METHODOLOGY_NOTE,
} from './content-bank.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'content', 'drafts')
const outFile = path.join(outDir, 'articles.json')

/* Pick a deterministic framework reference per topic+section to keep output stable across runs. */
function pickFramework(locale, topicSlug, sectionIdx) {
  const refs = FRAMEWORK_REFS[locale]
  const hash = (topicSlug + '-' + sectionIdx).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return refs[hash % refs.length]
}

function pickPullQuote(locale, topicSlug) {
  const quotes = DEFAULT_PULL_QUOTES[locale]
  const hash = topicSlug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return quotes[hash % quotes.length]
}

function pickTemplate(locale, sectionIdx) {
  const variants = SECTION_TEMPLATES[locale]
  return variants[sectionIdx % variants.length]
}

function buildSectionBlock(locale, topic, section, sectionIdx, allSections) {
  const heading = locale === 'vi' ? section.vi : section.en
  const topicTitle = locale === 'vi' ? topic.vi.title : topic.en.title
  const frame = pickFramework(locale, topic.slug, sectionIdx)
  const tpl = pickTemplate(locale, sectionIdx)

  // For paraC's "related" reference, pick a different section's heading from the same article.
  const otherIdx = (sectionIdx + 1) % allSections.length
  const related = locale === 'vi'
    ? allSections[otherIdx].vi.toLowerCase()
    : allSections[otherIdx].en.toLowerCase()

  const paragraphs = [
    tpl.paraA({ section: heading, topicTitle, frame }),
    tpl.paraB({ section: heading, frame, topicTitle }),
    tpl.paraC({ section: heading, related, topicTitle }),
  ]

  return `## ${heading}\n\n${paragraphs.join('\n\n')}\n`
}

/* Per-article siblings derived from the same category — used in the See-also block. */
function getSiblings(topic, locale) {
  return TOPICS.filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 3)
    .map((t) => (locale === 'vi' ? t.vi.title : t.en.title))
}

function buildBody(topic, locale) {
  const meta = locale === 'vi' ? topic.vi : topic.en
  const categoryFrame = CATEGORY_FRAMES[locale][topic.category] || ''
  const frame = pickFramework(locale, topic.slug, 0)
  const lede = LEDE_TEMPLATES[locale]({ topicTitle: meta.title, frame, categoryFrame })

  // Section blocks
  const sectionBlocks = topic.outline.map((section, idx) =>
    buildSectionBlock(locale, topic, section, idx, topic.outline),
  )

  // Pull quote — placed roughly in the middle (after section 2 if available)
  const quote = pickPullQuote(locale, topic.slug)
  const pullQuoteBlock = `> ${quote.quote}\n>\n> — ${quote.attribution}`

  const insertionPoint = Math.min(2, sectionBlocks.length - 1)
  const blocksWithQuote = [
    ...sectionBlocks.slice(0, insertionPoint + 1),
    pullQuoteBlock,
    ...sectionBlocks.slice(insertionPoint + 1),
  ]

  const seeAlso = SEE_ALSO[locale]({
    siblings: getSiblings(topic, locale),
    glossarySlug: '/glossary',
  })

  const seeAlsoBlock =
    locale === 'vi' ? `## Đọc thêm\n\n${seeAlso}` : `## See also\n\n${seeAlso}`

  const methodNote =
    locale === 'vi'
      ? `---\n\n_${METHODOLOGY_NOTE.vi}_`
      : `---\n\n_${METHODOLOGY_NOTE.en}_`

  return [
    lede,
    '',
    ...blocksWithQuote,
    '',
    seeAlsoBlock,
    '',
    methodNote,
  ].join('\n')
}

const today = new Date().toISOString().slice(0, 10)

const drafts = TOPICS.map((topic) => ({
  slug: topic.slug,
  category: topic.category,
  status: 'draft',
  publishedDate: today,
  updatedDate: today,
  vi: {
    title: topic.vi.title,
    excerpt: topic.vi.excerpt,
    body: buildBody(topic, 'vi'),
  },
  en: {
    title: topic.en.title,
    excerpt: topic.en.excerpt,
    body: buildBody(topic, 'en'),
  },
}))

await fs.mkdir(outDir, { recursive: true })
await fs.writeFile(outFile, JSON.stringify(drafts, null, 2), 'utf8')

const wordCount = (s) => s.match(/\S+/g)?.length || 0
const sample = drafts[0]
console.log(`[generate-seo-content] wrote ${drafts.length} drafts → ${path.relative(process.cwd(), outFile)}`)
console.log(`  Sample lengths (${sample.slug}):`)
console.log(`    vi: ${wordCount(sample.vi.body)} words`)
console.log(`    en: ${wordCount(sample.en.body)} words`)
console.log(
  `  Breakdown: ${Object.entries(
    drafts.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1
      return acc
    }, {}),
  )
    .map(([c, n]) => `${c}=${n}`)
    .join(', ')}`,
)
