export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://law.org.vn'

export const CATEGORIES = [
  { slug: 'legal-system', order: 1, nameKey: 'legalSystem' },
  { slug: 'court-system', order: 2, nameKey: 'courtSystem' },
  { slug: 'litigation', order: 3, nameKey: 'litigation' },
  { slug: 'rights', order: 4, nameKey: 'rights' },
  { slug: 'terminology', order: 5, nameKey: 'terminology' },
  { slug: 'faq', order: 6, nameKey: 'faq' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

// =========================================================================
// Apolo Lawyers — Official contact (post-2025 administrative-merger SSOT)
// Source of truth: CSV review row 9 (Mr Hien 2026-05-17). Verbatim.
// Notes:
//  - Full "Thành phố Hồ Chí Minh" form (no "TP." abbreviation)
//  - Three phones on both locales (main office + branch direct line + call center)
//  - East Saigon branch NOT surfaced on this site (deferred to parent brand site)
//  - Hotline removed from EN footer per the new spec
// =========================================================================

export const CONTACT_VN = {
  companyName:
    'Công ty Luật Apolo Lawyers, Là Tổ chức Hành nghề Luật sư thuộc Đoàn Luật sư Thành phố Hồ Chí Minh, trực thuộc Liên đoàn Luật sư Việt Nam',
  shortName: 'Công ty Luật Apolo Lawyers',
  addressLine: '108 Trần Đình Xu, Phường Cầu Ông Lãnh, Thành phố Hồ Chí Minh',
  phones: [
    { label: '(028) 66.701.709', tel: '+842866701709' },
    { label: '(028) 35.059.349', tel: '+842835059349' },
    { label: '0903.419.479', tel: '+84903419479' },
  ],
  email: 'contact@apolo.com.vn',
} as const

export const CONTACT_EN = {
  companyName:
    'APOLO LAWYERS - Solicitors & Litigators, a law practice organization affiliated with the Ho Chi Minh City Bar Association under the Vietnam Bar Federation',
  shortName: 'APOLO LAWYERS - Solicitors & Litigators',
  addressLine: '108 Tran Dinh Xu Street, Cau Ong Lanh Ward, Ho Chi Minh City, Vietnam',
  phones: [
    { label: '(+8428) 66.701.709', tel: '+842866701709' },
    { label: '(+8428) 35 059 349', tel: '+842835059349' },
    { label: '(+84) 903.419.479', tel: '+84903419479' },
  ],
  email: 'contact@apolo.com.vn',
} as const

// Parent brand link rule (Mr Hien 2026-05-11):
//   VN locale → apolo.com.vn  (NEVER apololawyers.com)
//   EN locale → apololawyers.com  (NEVER apolo.com.vn)
// Internal ecosystem cross-links (law.pro.vn, etc.) remain on both locales.
export interface EcosystemLink {
  href: string
  label: string
  description: string
}

const ECOSYSTEM_INTERNAL: EcosystemLink[] = [
  { href: 'https://law.pro.vn', label: 'law.pro.vn', description: 'Legal commentary & analysis' },
]

const ECOSYSTEM_PARENT_VN: EcosystemLink = {
  href: 'https://www.apolo.com.vn',
  label: 'apolo.com.vn',
  description: 'Apolo Lawyers (VN)',
}

const ECOSYSTEM_PARENT_EN: EcosystemLink = {
  href: 'https://www.apololawyers.com',
  label: 'apololawyers.com',
  description: 'Apolo Lawyers (EN)',
}

export function getEcosystemLinks(locale: 'vi' | 'en' | string): EcosystemLink[] {
  const parent = locale === 'en' ? ECOSYSTEM_PARENT_EN : ECOSYSTEM_PARENT_VN
  return [...ECOSYSTEM_INTERNAL, parent]
}
