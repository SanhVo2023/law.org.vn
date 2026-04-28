import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import { CATEGORIES } from '@/lib/site'
import type { Locale } from '@/i18n/routing'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { HomeHero } from '@/components/home/HomeHero'
import { EncyclopediaStats } from '@/components/home/EncyclopediaStats'
import { ClustersGrid, type ClusterEntry } from '@/components/home/ClustersGrid'
import { CLUSTER_GLYPH } from '@/lib/images'
import { FeaturedEntries, type FeaturedEntryItem } from '@/components/home/FeaturedEntries'
import { HowToUse } from '@/components/home/HowToUse'
import { Ornament } from '@/components/ui/Ornament'

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
    vi: 'Hiến pháp, luật, bộ luật, nghị định, thông tư, nghị quyết — kiến trúc chuẩn mực pháp lý Việt Nam.',
    en: "Constitution, laws, codes, decrees, circulars, resolutions — the structural backbone of Vietnamese law.",
  },
  'court-system': {
    vi: 'Tòa án Nhân dân Tối cao, tòa cấp cao, tòa tỉnh, tòa huyện, Viện kiểm sát, thi hành án.',
    en: "Supreme People's Court, high courts, provincial and district courts, procuracy, enforcement, arbitration.",
  },
  litigation: {
    vi: 'Tố tụng dân sự, hình sự, hành chính, lao động — từ khởi kiện đến thi hành.',
    en: 'Civil, criminal, administrative, and labor procedure — from filing through enforcement.',
  },
  rights: {
    vi: 'Quyền hiến định, sở hữu, lao động, tiêu dùng, khiếu nại tố cáo.',
    en: 'Constitutional rights, property, labor, consumer rights, complaint and denunciation.',
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
  'court-system': 8,
  litigation: 10,
  rights: 8,
  terminology: 8,
  faq: 6,
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng = locale === 'en' ? 'en' : 'vi'

  // Try to load 6 featured articles (cornerstone topics)
  const FEATURED_SLUGS = [
    'constitution-2013',
    'court-system-overview',
    'civil-procedure-overview',
    'constitutional-rights-overview',
    'when-to-hire-lawyer',
    'civil-procedure-terminology',
  ]
  let featured: FeaturedEntryItem[] = []
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      limit: 12,
      where: { slug: { in: FEATURED_SLUGS } },
      depth: 1,
    })
    featured = result.docs.map((d: any) => {
      const cat = typeof d.category === 'object' ? d.category?.slug : d.category
      const catKey = (CATEGORIES.find((c) => c.slug === cat)?.nameKey ?? 'legalSystem') as string
      return {
        id: d.id,
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt,
        cluster: cat,
        clusterLabel: t(`nav.${catKey}`),
        updatedDate: d.updatedDate,
        isDraft: d.status === 'draft',
      }
    })
    featured.sort((a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug))
  } catch {
    featured = []
  }

  const clusters: ClusterEntry[] = CATEGORIES.map((c) => {
    const glyph = CLUSTER_GLYPH[c.slug]
    return {
      slug: c.slug,
      label: t(`nav.${c.nameKey}`),
      description: CLUSTER_DESCRIPTIONS[c.slug][lng],
      count: CLUSTER_COUNTS[c.slug] ?? 0,
      glyph: glyph ? { src: glyph.src, alt: glyph.alt } : undefined,
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
        draftLabel={lng === 'vi' ? 'Phiên bản 1 · Bản thảo' : 'Edition 1 · Draft'}
        disclaimer={t('footer.disclaimer')}
      />

      <EncyclopediaStats
        labels={{
          entries: lng === 'vi' ? 'Mục tri thức' : 'Entries',
          clusters: lng === 'vi' ? 'Cụm chủ đề' : 'Clusters',
          terminologyAreas: lng === 'vi' ? 'Lĩnh vực thuật ngữ' : 'Terminology areas',
          languages: lng === 'vi' ? 'Ngôn ngữ' : 'Languages',
        }}
      />

      <ClustersGrid
        eyebrow={lng === 'vi' ? 'Bản đồ tri thức' : 'Knowledge map'}
        title={t('home.categoriesTitle')}
        lead={
          lng === 'vi'
            ? 'Sáu cụm tri thức cốt lõi, sắp xếp từ kiến trúc thượng tầng (Hiến pháp, luật) xuống thực tiễn (FAQ và thuật ngữ).'
            : 'Six core knowledge clusters, organised from the top-down (Constitution, statutes) to the practical (FAQ and terminology).'
        }
        clusters={clusters}
        entriesLabel={lng === 'vi' ? 'mục' : 'entries'}
      />

      <FeaturedEntries
        eyebrow={lng === 'vi' ? 'Mục đề xuất' : 'Featured'}
        title={t('home.featuredTitle')}
        lead={
          lng === 'vi'
            ? 'Sáu mục cốt lõi để khởi đầu nếu bạn mới đến với hệ thống pháp luật Việt Nam.'
            : "Six cornerstone entries to start with if you're new to Vietnam's legal system."
        }
        entries={featured}
        locale={locale}
        emptyMessage={
          lng === 'vi'
            ? 'Đang chuẩn bị các mục đề xuất.'
            : 'Featured entries coming soon.'
        }
      />

      <HowToUse
        eyebrow={lng === 'vi' ? 'Hướng dẫn sử dụng' : 'How to use'}
        title={lng === 'vi' ? 'Ba cách tiếp cận bộ tri thức này' : 'Three ways to use this encyclopedia'}
        lead={
          lng === 'vi'
            ? 'Bạn có thể đọc tuần tự, tra cứu thuật ngữ, hoặc trích dẫn cho công việc học thuật và tư vấn.'
            : 'Read sequentially, look up a term, or cite an entry for scholarly or advisory work.'
        }
        steps={
          lng === 'vi'
            ? [
                {
                  number: '01',
                  title: 'Duyệt theo cụm',
                  description:
                    'Bắt đầu từ một cụm tri thức, ví dụ "Hệ thống pháp luật" để hiểu cấu trúc nguồn luật, hoặc "Tố tụng" để hiểu quy trình.',
                },
                {
                  number: '02',
                  title: 'Tra cứu thuật ngữ',
                  description:
                    'Mục Tra cứu thuật ngữ liệt kê các thuật ngữ pháp lý theo tám lĩnh vực, kèm bản gốc tiếng Việt và phần dịch tiếng Anh.',
                },
                {
                  number: '03',
                  title: 'Trích dẫn',
                  description:
                    'Mỗi mục có khối Trích dẫn (định dạng phổ thông và BibTeX) để bạn dùng trong công việc học thuật hoặc tư vấn.',
                },
              ]
            : [
                {
                  number: '01',
                  title: 'Browse by cluster',
                  description:
                    'Start with a knowledge cluster — e.g., Legal System for source-of-law architecture, or Litigation for procedure.',
                },
                {
                  number: '02',
                  title: 'Look up a term',
                  description:
                    'The Glossary indexes legal terminology across eight areas, with original Vietnamese alongside the English rendering.',
                },
                {
                  number: '03',
                  title: 'Cite an entry',
                  description:
                    'Every entry includes a Citation block (plain and BibTeX) so you can reference it in scholarly or advisory work.',
                },
              ]
        }
      />

      <div className="py-12">
        <Ornament />
      </div>
    </>
  )
}
