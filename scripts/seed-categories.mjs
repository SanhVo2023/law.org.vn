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
    vi: { name: 'Hệ thống pháp luật', description: 'Hiến pháp, luật, bộ luật, nghị định, thông tư, nghị quyết — kiến trúc chuẩn mực pháp lý Việt Nam.' },
    en: { name: 'Legal System', description: 'Constitution, laws, codes, decrees, circulars, resolutions — the structural backbone of Vietnamese law.' },
  },
  {
    slug: 'court-system',
    order: 2,
    vi: { name: 'Hệ thống tòa án', description: 'Tòa án Nhân dân Tối cao, tòa cấp cao, tòa tỉnh, tòa huyện, Viện kiểm sát, thi hành án.' },
    en: { name: 'Court System', description: 'Supreme People\'s Court, high courts, provincial and district courts, procuracy, enforcement, arbitration.' },
  },
  {
    slug: 'litigation',
    order: 3,
    vi: { name: 'Tố tụng', description: 'Tố tụng dân sự, hình sự, hành chính, lao động — từ khởi kiện đến thi hành.' },
    en: { name: 'Litigation', description: 'Civil, criminal, administrative, and labor procedure — from filing through enforcement.' },
  },
  {
    slug: 'rights',
    order: 4,
    vi: { name: 'Quyền công dân', description: 'Quyền hiến định, sở hữu, lao động, tiêu dùng, khiếu nại tố cáo.' },
    en: { name: 'Rights', description: 'Constitutional rights, property, labor, consumer rights, complaint and denunciation.' },
  },
  {
    slug: 'terminology',
    order: 5,
    vi: { name: 'Thuật ngữ pháp lý', description: 'Tám cụm thuật ngữ cốt lõi: dân sự, hình sự, doanh nghiệp, đất đai, hôn nhân gia đình, lao động, thương mại, hành chính.' },
    en: { name: 'Legal Terminology', description: 'Eight core terminology clusters.' },
  },
  {
    slug: 'faq',
    order: 6,
    vi: { name: 'Câu hỏi thường gặp', description: 'Khi nào cần luật sư, chi phí khởi kiện, thời hiệu, tạm giữ, trợ giúp pháp lý, công chứng.' },
    en: { name: 'FAQ', description: 'When to hire counsel, litigation costs, statutes of limitation, detention, legal aid, notarization.' },
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
