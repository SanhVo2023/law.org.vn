import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getPayload } from '@/lib/payload'
import { assertDb } from '@/lib/db-check'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { BlogList } from '@/components/blog/BlogList'
import type { BlogCardItem } from '@/components/blog/BlogCard'
import { BLOG_IMAGE } from '@/lib/images'
import type { Locale } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'

type Params = Promise<{ locale: string }>

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return buildPageMetadata({
    title: t('blog.title'),
    description: t('blog.lead'),
    path: '/blog',
    locale,
  })
}

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  commentary: 'blog.filterCommentary',
  'case-analysis': 'blog.filterCaseAnalysis',
  'practice-update': 'blog.filterPracticeUpdate',
  policy: 'blog.filterPolicy',
  compliance: 'blog.filterCompliance',
}

export default async function BlogIndexPage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng: 'vi' | 'en' = locale === 'en' ? 'en' : 'vi'

  assertDb()
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    limit: 60,
    sort: '-publishedAt',
    depth: 1,
  })

  const posts: BlogCardItem[] = result.docs.map((d: any) => {
    const fallback = BLOG_IMAGE[d.slug as string]
    const featuredImage =
      d.featuredImage && typeof d.featuredImage === 'object' && d.featuredImage.url
        ? { url: d.featuredImage.url as string, alt: (d.featuredImage.alt ?? null) as string | null }
        : fallback
          ? { url: fallback.src, alt: fallback.alt }
          : null
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      category: d.category,
      categoryLabel: t(CATEGORY_LABEL_KEYS[d.category] ?? 'blog.filterCommentary'),
      publishedAt: d.publishedAt,
      readingTimeMin: d.readingTimeMin,
      author: d.author,
      isDraft: d.status === 'draft',
      featuredImage,
    }
  })

  const crumbs = [{ label: t('nav.home'), href: '/' }, { label: t('blog.title') }]

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path: locale === 'vi' ? c.href || '/blog' : c.href ? `/en${c.href}` : '/en/blog',
          })),
        )}
      />

      <section className="relative border-b border-[var(--rule)] section-paper overflow-hidden">
        <div className="parchment-overlay absolute inset-0" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-16 md:pt-12 md:pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-3xl">
            <Eyebrow withRules={false}>{lng === 'vi' ? 'Biên tập' : 'Editorial'}</Eyebrow>
            <h1 className="mt-4 font-heading text-4xl md:text-6xl font-bold leading-[1.05]">
              {t('blog.title')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--fg-muted)]">
              {t('blog.lead')}
            </p>
            <div aria-hidden className="mt-8 h-[2px] w-16 bg-[var(--color-gold-500)]" />
            <p className="mt-6">
              <Link
                href="/blog/feed.xml"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)] hover:text-[var(--color-gold-500)] transition"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12a7 7 0 0 1 7 7M5 5a14 14 0 0 1 14 14M6 18a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
                {t('blog.rssFeed')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <BlogList
          posts={posts}
          locale={lng}
          labels={{
            filterAll: t('blog.filterAll'),
            filterCommentary: t('blog.filterCommentary'),
            filterCaseAnalysis: t('blog.filterCaseAnalysis'),
            filterPracticeUpdate: t('blog.filterPracticeUpdate'),
            filterPolicy: t('blog.filterPolicy'),
            filterCompliance: t('blog.filterCompliance'),
            readingMin: t('blog.readingMin'),
            noResults: t('blog.noResults'),
          }}
        />
      </section>

      <div className="py-10">
        <Ornament />
      </div>
    </>
  )
}
