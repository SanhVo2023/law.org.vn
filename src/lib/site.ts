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

export const ECOSYSTEM_LINKS = [
  { href: 'https://law.pro.vn', label: 'law.pro.vn', description: 'Legal commentary & analysis' },
  { href: 'https://apolo.com.vn', label: 'apolo.com.vn', description: 'Apolo Lawyers (VN)' },
  { href: 'https://apololawyers.com', label: 'apololawyers.com', description: 'Apolo Lawyers (EN)' },
]
