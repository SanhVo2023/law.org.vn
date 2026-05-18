#!/usr/bin/env node
/* F-010: Sync category descriptions (and short-form .name) from
 * scripts/seed-categories.mjs CATEGORIES array into the DB. Direct Postgres —
 * no dev server needed. Run after editing the CATEGORIES array.
 *
 * Usage: node scripts/sync-category-descriptions.mjs              # dry run
 *        node scripts/sync-category-descriptions.mjs --apply       # UPDATE in place
 */
import 'dotenv/config'
import pg from 'pg'

const APPLY = process.argv.includes('--apply')

// Inline copy of CATEGORIES from seed-categories.mjs — duplicated here so this
// script remains a standalone read-only DB editor independent of REST.
const CATEGORIES = [
  {
    slug: 'legal-system',
    vi: { name: 'Hệ thống pháp luật', description: 'Hệ thống hóa các nguồn pháp luật Việt Nam, từ Hiến pháp đến luật, bộ luật, nghị định, thông tư và nghị quyết, cùng cách các văn bản này vận hành trong hệ thống pháp luật. Nội dung chỉ có giá trị tham khảo và cần đối chiếu với nguồn chính thức.' },
    en: { name: 'Legal System', description: 'An overview of Vietnamese legal sources, from the Constitution to laws, codes, decrees and circulars. For reference only; please verify against official sources in Vietnam.' },
  },
  {
    slug: 'court-system',
    vi: { name: 'Hệ thống tòa án', description: 'Tổng quan về hệ thống tòa án Việt Nam, cơ cấu tổ chức, thẩm quyền xét xử và vai trò của các cấp tòa án trong hoạt động tư pháp.' },
    en: { name: 'Court System', description: "An overview of Vietnam's court system, including its organizational structure, jurisdiction and the role of different court levels in judicial proceedings." },
  },
  {
    slug: 'litigation',
    vi: { name: 'Tố tụng', description: 'Tổng quan về tố tụng tại Tòa án và tố tụng trọng tài tại Việt Nam, bao gồm tố tụng dân sự, hình sự, hành chính, lao động, kinh doanh thương mại và các thủ tục xem xét lại bản án, quyết định theo quy định pháp luật.' },
    en: { name: 'Litigation', description: 'An overview of court and arbitration proceedings in Vietnam, including civil, criminal, administrative, labour, business and commercial proceedings, and procedures for reviewing judgments and decisions in accordance with law.' },
  },
  {
    slug: 'rights',
    vi: { name: 'Quyền công dân', description: 'Thông tin tham khảo về một số quyền, nghĩa vụ và thủ tục pháp lý phổ biến của công dân theo pháp luật Việt Nam.' },
    en: { name: 'Rights', description: 'Reference information on selected rights, obligations and common legal procedures for citizens under Vietnamese law.' },
  },
  {
    slug: 'terminology',
    vi: { name: 'Thuật ngữ pháp lý', description: 'Các thuật ngữ pháp lý chuyên ngành và từ vựng cốt lõi giúp người đọc tiếp cận văn bản pháp luật một cách chính xác hơn.' },
    en: { name: 'Legal Terminology', description: 'Specialized legal terminology and core vocabulary for a more accurate understanding of legal documents.' },
  },
  {
    slug: 'faq',
    vi: { name: 'Câu hỏi thường gặp', description: 'Các câu hỏi pháp lý thường gặp, được trình bày ngắn gọn, trực tiếp và không thay thế cho ý kiến tư vấn pháp lý trong từng trường hợp cụ thể.' },
    en: { name: 'FAQ', description: 'Frequently asked legal questions, answered briefly and directly, without replacing legal advice for any specific case.' },
  },
]

const c = new pg.Client({ connectionString: process.env.DATABASE_URI })
await c.connect()

let updated = 0
for (const cat of CATEGORIES) {
  const r = await c.query(`SELECT id FROM lov.categories WHERE slug = $1`, [cat.slug])
  if (r.rows.length === 0) {
    console.log(`  (skip — no row for ${cat.slug})`)
    continue
  }
  const parentId = r.rows[0].id
  for (const locale of ['vi', 'en']) {
    const data = cat[locale]
    console.log(
      `  ${APPLY ? '✓' : '·'} ${cat.slug} [${locale}] — ${data.description.slice(0, 60)}…`,
    )
    if (APPLY) {
      // Upsert into lov.categories_locales (one row per parent+locale)
      await c.query(
        `INSERT INTO lov.categories_locales (_parent_id, _locale, name, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (_parent_id, _locale) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description`,
        [parentId, locale, data.name, data.description],
      )
      updated += 1
    }
  }
}

console.log(`\n${APPLY ? 'APPLY' : 'DRY RUN'} complete · ${updated} rows touched`)
await c.end()
