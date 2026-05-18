#!/usr/bin/env node
/* Seed the 6 category taxonomy records via the Payload REST API.
 * Requires a running dev server and an admin user. Credentials read from .env (dotenv).
 *
 * Usage: node scripts/seed-categories.mjs
 */
import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

const CATEGORIES = [
  {
    slug: 'legal-system',
    order: 1,
    vi: { name: 'Hệ thống pháp luật', description: 'Hệ thống hóa các nguồn pháp luật Việt Nam, từ Hiến pháp đến luật, bộ luật, nghị định, thông tư và nghị quyết, cùng cách các văn bản này vận hành trong hệ thống pháp luật. Nội dung chỉ có giá trị tham khảo và cần đối chiếu với nguồn chính thức.' },
    en: { name: 'Legal System', description: 'An overview of Vietnamese legal sources, from the Constitution to laws, codes, decrees and circulars. For reference only; please verify against official sources in Vietnam.' },
  },
  {
    slug: 'court-system',
    order: 2,
    vi: { name: 'Hệ thống tòa án', description: 'Tổng quan về hệ thống tòa án Việt Nam, cơ cấu tổ chức, thẩm quyền xét xử và vai trò của các cấp tòa án trong hoạt động tư pháp.' },
    en: { name: 'Court System', description: "An overview of Vietnam's court system, including its organizational structure, jurisdiction and the role of different court levels in judicial proceedings." },
  },
  {
    slug: 'litigation',
    order: 3,
    vi: { name: 'Tố tụng', description: 'Tổng quan về tố tụng tại Tòa án và tố tụng trọng tài tại Việt Nam, bao gồm tố tụng dân sự, hình sự, hành chính, lao động, kinh doanh thương mại và các thủ tục xem xét lại bản án, quyết định theo quy định pháp luật.' },
    en: { name: 'Litigation', description: 'An overview of court and arbitration proceedings in Vietnam, including civil, criminal, administrative, labour, business and commercial proceedings, and procedures for reviewing judgments and decisions in accordance with law.' },
  },
  {
    slug: 'rights',
    order: 4,
    vi: { name: 'Quyền công dân', description: 'Thông tin tham khảo về một số quyền, nghĩa vụ và thủ tục pháp lý phổ biến của công dân theo pháp luật Việt Nam.' },
    en: { name: 'Rights', description: 'Reference information on selected rights, obligations and common legal procedures for citizens under Vietnamese law.' },
  },
  {
    slug: 'terminology',
    order: 5,
    vi: { name: 'Thuật ngữ pháp lý', description: 'Các thuật ngữ pháp lý chuyên ngành và từ vựng cốt lõi giúp người đọc tiếp cận văn bản pháp luật một cách chính xác hơn.' },
    en: { name: 'Legal Terminology', description: 'Specialized legal terminology and core vocabulary for a more accurate understanding of legal documents.' },
  },
  {
    slug: 'faq',
    order: 6,
    vi: { name: 'Câu hỏi thường gặp', description: 'Các câu hỏi pháp lý thường gặp, được trình bày ngắn gọn, trực tiếp và không thay thế cho ý kiến tư vấn pháp lý trong từng trường hợp cụ thể.' },
    en: { name: 'FAQ', description: 'Frequently asked legal questions, answered briefly and directly, without replacing legal advice for any specific case.' },
  },
]

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  return data.token
}

async function findBySlug(token, slug) {
  const res = await fetch(
    `${SITE_URL}/api/categories?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

async function create(token, locale, body) {
  const res = await fetch(`${SITE_URL}/api/categories?locale=${locale}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Create failed for ${body.slug}: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

async function patch(token, id, locale, body) {
  const res = await fetch(`${SITE_URL}/api/categories/${id}?locale=${locale}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Patch failed for ${id}: ${res.status} ${await res.text()}`)
  }
  return res.json()
}

async function main() {
  console.log(`[seed-categories] authenticating as ${ADMIN_EMAIL}`)
  const token = await login()
  let created = 0
  let updated = 0

  for (const cat of CATEGORIES) {
    const existing = await findBySlug(token, cat.slug)
    if (existing) {
      await patch(token, existing.id, 'vi', { name: cat.vi.name, description: cat.vi.description })
      await patch(token, existing.id, 'en', { name: cat.en.name, description: cat.en.description })
      updated += 1
      console.log(`  ↻ ${cat.slug} (updated vi+en)`)
    } else {
      const doc = await create(token, 'vi', {
        slug: cat.slug,
        order: cat.order,
        name: cat.vi.name,
        description: cat.vi.description,
      })
      await patch(token, doc.doc?.id ?? doc.id, 'en', {
        name: cat.en.name,
        description: cat.en.description,
      })
      created += 1
      console.log(`  + ${cat.slug} (created vi+en)`)
    }
    await new Promise((r) => setTimeout(r, 200))
  }

  console.log(`[seed-categories] done. created=${created}, updated=${updated}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
