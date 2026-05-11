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
// Source: workspace-root address.txt (Mr Hien 2026-05-11). Verbatim.
// VN block renders on VI locale. EN block renders on EN locale.
// East Saigon branch is EN-locale only per Mr Hien.
// =========================================================================

export const CONTACT_VN = {
  companyName:
    'Công ty Luật Apolo Lawyers, thuộc Đoàn Luật sư TP. Hồ Chí Minh, trực thuộc Liên đoàn Luật sư Việt Nam',
  shortName: 'Công ty Luật Apolo Lawyers',
  addressLine: '108 Trần Đình Xu, Phường Cầu Ông Lãnh, TP. Hồ Chí Minh',
  phones: [
    { label: '(028) 66.701.709', tel: '+842866701709' },
    { label: '0908.043.086', tel: '+84908043086' },
  ],
  callCenter: { label: '0903.419.479', tel: '+84903419479' },
  email: 'contact@apolo.com.vn',
} as const

export const CONTACT_EN = {
  companyName:
    'APOLO LAWYERS - Solicitors & Litigators, a law practice organization belonging to the Ho Chi Minh City Bar Association, under the Vietnam Bar Federation',
  shortName: 'APOLO LAWYERS - Solicitors & Litigators',
  addressLine: '108 Tran Dinh Xu Street, Cau Ong Lanh Ward, Ho Chi Minh City, Vietnam',
  phones: [
    { label: '(+8428) 66.701.709', tel: '+842866701709' },
    { label: '(+84) 908.043.086', tel: '+84908043086' },
  ],
  hotline: { label: '(+84) 903.600.347', tel: '+84903600347' },
  callCenter: { label: '(+84) 903.419.479', tel: '+84903419479' },
  email: 'contact@apolo.com.vn',
  branch: {
    name: 'EAST SAI GON BRANCH - APOLO LAWYERS LAWFIRM',
    addressLine:
      '9th/F, Tower K&M Building, 33 Ung Van Khiem Street, Thanh My Tay Ward, Ho Chi Minh City, Vietnam',
    phones: [
      { label: '(+8428) 35.059.349', tel: '+842835059349' },
      { label: '(+84) 908.097.068', tel: '+84908097068' },
    ],
    hotline: { label: '(+84) 979.48.98.79', tel: '+84979489879' },
  },
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
