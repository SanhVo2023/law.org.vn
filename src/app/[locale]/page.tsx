import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import { assertDb } from '@/lib/db-check'
import { CATEGORIES } from '@/lib/site'
import type { Locale } from '@/i18n/routing'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { HomeHero } from '@/components/home/HomeHero'
import { ClustersGrid, type ClusterEntry } from '@/components/home/ClustersGrid'
import { FeaturedEntries, type FeaturedEntryItem } from '@/components/home/FeaturedEntries'
import { TrustedSources } from '@/components/home/TrustedSources'
import { RecentUpdatesTeaser } from '@/components/home/RecentUpdatesTeaser'
import { PrincipleBand } from '@/components/home/PrincipleBand'
import { SectionFadeUp } from '@/components/animation/SectionFadeUp'
import { Ornament } from '@/components/ui/Ornament'
import { CLUSTER_HERO, ARTICLE_IMAGE } from '@/lib/images'

type Params = Promise<{ locale: string }>

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return buildPageMetadata({
    title: t('site.name') + ' — ' + t('site.tagline'),
    description: t('home.heroLead'),
    path: '/',
    locale,
  })
}

const CLUSTER_DESCRIPTIONS: Record<string, { vi: string; en: string }> = {
  'legal-system': {
    vi: 'Hiến pháp, luật, bộ luật, nghị định, thông tư, nghị quyết — kiến trúc nguồn pháp luật Việt Nam.',
    en: 'Constitution, laws, codes, decrees, circulars, resolutions — the structural backbone of Vietnamese law.',
  },
  'court-system': {
    vi: 'Tòa án nhân dân tối cao, cấp tỉnh, khu vực và các tòa chuyên trách theo Luật số 81/2025/QH15.',
    en: "Supreme, provincial, regional and specialized people's courts under Law No. 81/2025/QH15.",
  },
  litigation: {
    vi: 'Tố tụng dân sự, hình sự, hành chính, lao động, thương mại — từ khởi kiện đến phúc thẩm, giám đốc thẩm.',
    en: 'Civil, criminal, administrative, labour, and commercial procedure — from filing through appeal and supervisory review.',
  },
  rights: {
    vi: 'Một số quyền, nghĩa vụ và thủ tục pháp lý phổ biến của công dân theo pháp luật Việt Nam.',
    en: 'Selected rights, obligations, and common legal procedures for citizens under Vietnamese law.',
  },
  terminology: {
    vi: 'Tám cụm thuật ngữ: dân sự, hình sự, doanh nghiệp, đất đai, hôn nhân gia đình, lao động, thương mại, hành chính.',
    en: 'Eight core terminology clusters: civil, criminal, corporate, land, family, labor, commercial, administrative.',
  },
  faq: {
    vi: 'Khi nào cần luật sư, chi phí khởi kiện, thời hiệu, tạm giữ, trợ giúp pháp lý, công chứng.',
    en: 'When to hire counsel, litigation costs, statutes of limitation, detention, legal aid, notarization.',
  },
}

const CLUSTER_COUNTS: Record<string, number> = {
  'legal-system': 10,
  'court-system': 5,
  litigation: 10,
  rights: 7,
  terminology: 8,
  faq: 6,
} // total 46 (down from 50 after Luật 81/2025/QH15 court restructure + freedom-of-expression removal)

// Three cornerstone entries — "start here" for a newcomer (one structural, one
// procedural, one rights). Trimmed from six to keep the homepage focused.
const FEATURED_SLUGS = ['constitution-2013', 'court-system-overview', 'constitutional-rights-overview']

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng = locale === 'en' ? 'en' : 'vi'

  assertDb()
  const payload = await getPayload()
  const featuredResult = await payload.find({
    collection: 'articles',
    locale: locale as Locale,
    limit: 6,
    where: { slug: { in: FEATURED_SLUGS } },
    depth: 1,
  })
  const featured: FeaturedEntryItem[] = featuredResult.docs.map((d: any) => {
    const cat = typeof d.category === 'object' ? d.category?.slug : d.category
    const catKey = (CATEGORIES.find((c) => c.slug === cat)?.nameKey ?? 'legalSystem') as string
    const img = ARTICLE_IMAGE[d.slug] ?? CLUSTER_HERO[cat]
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      cluster: cat,
      clusterLabel: t(`nav.${catKey}`),
      updatedDate: d.updatedDate,
      isDraft: d.status === 'draft',
      image: img ? { src: img.src, alt: img.alt } : undefined,
    }
  })
  featured.sort((a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug))

  const clusters: ClusterEntry[] = CATEGORIES.map((c) => {
    const img = CLUSTER_HERO[c.slug]
    return {
      slug: c.slug,
      label: t(`nav.${c.nameKey}`),
      description: CLUSTER_DESCRIPTIONS[c.slug][lng],
      count: CLUSTER_COUNTS[c.slug] ?? 0,
      image: img ? { src: img.src, alt: img.alt } : undefined,
    }
  })

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: t('site.name'), path: locale === 'vi' ? '/' : '/en' }])}
      />

      <HomeHero
        eyebrow={t('home.heroEyebrow')}
        title={t('home.heroTitle')}
        lead={t('home.heroLead')}
        primaryCta={t('home.exploreCta')}
        secondaryCta={t('home.glossaryCta')}
        primaryHref="/legal-system"
        secondaryHref="/updates"
        edition={lng === 'vi' ? 'Phiên bản 2026.04 · 46 mục đã rà soát' : 'Edition 2026.04 · 46 reviewed entries'}
        stats={[
          { value: 46, label: lng === 'vi' ? 'Mục' : 'Entries' },
          { value: 6, label: lng === 'vi' ? 'Cụm' : 'Clusters' },
          { value: 8, label: lng === 'vi' ? 'Lĩnh vực' : 'Areas' },
          { value: 2, display: 'vi · en', label: lng === 'vi' ? 'Ngôn ngữ' : 'Languages' },
        ]}
      />

      <ClustersGrid
        eyebrow={lng === 'vi' ? 'Khám phá' : 'Explore'}
        title={t('home.categoriesTitle')}
        lead={
          lng === 'vi'
            ? 'Sáu cụm cốt lõi, sắp xếp từ kiến trúc thượng tầng (Hiến pháp, luật) xuống thực tiễn (FAQ, thuật ngữ).'
            : 'Six core clusters, ordered from the top-down (Constitution, statutes) to the practical (FAQ, terminology).'
        }
        clusters={clusters}
        entriesLabel={lng === 'vi' ? 'mục' : 'entries'}
      />

      <FeaturedEntries
        eyebrow={lng === 'vi' ? 'Bắt đầu từ đây' : 'Start here'}
        title={t('home.featuredTitle')}
        lead={
          lng === 'vi'
            ? 'Ba mục nền tảng nếu bạn mới tiếp cận hệ thống pháp luật Việt Nam.'
            : "Three foundational entries if you're new to Vietnam's legal system."
        }
        entries={featured}
        locale={locale}
        emptyMessage={lng === 'vi' ? 'Đang chuẩn bị các mục đề xuất.' : 'Featured entries coming soon.'}
      />

      <SectionFadeUp>
        <RecentUpdatesTeaser
          locale={lng}
          labels={{
            eyebrow: t('recentUpdates.eyebrow'),
            title: t('recentUpdates.title'),
            lead: t('recentUpdates.lead'),
            viewAll: t('recentUpdates.viewAll'),
            issued: lng === 'vi' ? 'Ban hành' : 'Issued',
            issuingBody: lng === 'vi' ? 'Cơ quan ban hành' : 'Issuing body',
            commentary: lng === 'vi' ? 'Bình luận & phân tích pháp lý' : 'Legal commentary & analysis',
          }}
        />
      </SectionFadeUp>

      <PrincipleBand
        eyebrow={lng === 'vi' ? 'Nguyên tắc biên soạn' : 'Editorial principle'}
        statement={
          lng === 'vi'
            ? 'Mọi nội dung đều dựa trên văn bản pháp luật và nguồn chính thức của Nhà nước.'
            : 'Every entry is grounded in statutory text and official state sources.'
        }
        attribution={
          lng === 'vi'
            ? 'Mỗi mục được rà soát, dẫn chiếu điều luật và ghi rõ ngày cập nhật — để tra cứu và hiểu, không thay cho tư vấn pháp lý.'
            : 'Each entry is reviewed, cites the governing provisions, and is dated — for look-up and understanding, not as legal advice.'
        }
      />

      <TrustedSources
        caption={t('trustedSources.caption')}
        subcaption={t('trustedSources.subcaption')}
        locale={lng}
      />

      <div className="py-12">
        <Ornament />
      </div>
    </>
  )
}
