#!/usr/bin/env node
/* Seed the Payload `footer` global (vi + en) with the current canonical footer
 * content so editors see real values to edit in the CMS (Globals → Footer).
 * SiteFooter falls back to constants for any blank field, so this is optional —
 * it just pre-populates. Phone + ecosystem links are intentionally left blank:
 * the footer renders them per-locale (the vi→apolo.com.vn / en→apololawyers.com
 * cross-link rule can't be stored with a single shared href).
 *
 * Reads admin creds from .env. Run against a local `next start`. */
import 'dotenv/config'

const SITE = process.env.FOOTER_SEED_SITE || 'http://localhost:3010'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PW = process.env.SEED_ADMIN_PASSWORD

const VI = {
  description:
    'Thông tin trên website chỉ có giá trị tham khảo, không thay thế cho ý kiến tư vấn pháp lý và không làm phát sinh quan hệ tư vấn giữa luật sư và khách hàng.',
  contactBlock: {
    organizationName: 'Công ty Luật Apolo Lawyers',
    address1: '108 Trần Đình Xu, Phường Cầu Ông Lãnh, Thành phố Hồ Chí Minh',
    email: 'contact@apolo.com.vn',
  },
  copyright: '© 2026 law.org.vn · Công ty Luật Apolo Lawyers',
}
const EN = {
  description:
    'The information on this website is provided for reference purposes only, does not constitute legal advice, and does not create an attorney client relationship.',
  contactBlock: {
    organizationName: 'APOLO LAWYERS - Solicitors & Litigators',
    address1: '108 Tran Dinh Xu Street, Cau Ong Lanh Ward, Ho Chi Minh City, Vietnam',
    email: 'contact@apolo.com.vn',
  },
  copyright: '© 2026 law.org.vn · APOLO LAWYERS - Solicitors & Litigators',
}

const login = await fetch(`${SITE}/api/users/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: EMAIL, password: PW }),
})
if (!login.ok) { console.error('login failed', login.status); process.exit(1) }
const { token } = await login.json()

async function saveGlobal(locale, data) {
  const r = await fetch(`${SITE}/api/globals/footer?locale=${locale}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(data),
  })
  console.log(`  ${r.ok ? '✓' : '✗'} footer [${locale}] → ${r.status}${r.ok ? '' : ': ' + (await r.text()).slice(0, 200)}`)
}

await saveGlobal('vi', VI)
await saveGlobal('en', EN)
console.log('Footer global seeded.')
