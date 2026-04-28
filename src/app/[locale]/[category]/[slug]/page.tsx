import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import { CATEGORIES } from '@/lib/site'
import { SITE_URL } from '@/lib/site'
import {
  buildPageMetadata,
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
} from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArticleBody, extractTocFromLexical } from '@/components/ArticleBody'
import { ArticleTOC } from '@/components/ArticleTOC'
import { ScrollProgress } from '@/components/article/ScrollProgress'
import { PrintButton } from '@/components/article/PrintButton'
import { CitationBlock } from '@/components/article/CitationBlock'
import { UpdatedBadge } from '@/components/article/UpdatedBadge'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { ARTICLE_IMAGE, CLUSTER_HERO } from '@/lib/images'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'

type Params = Promise<{ locale: string; category: string; slug: string }>

export const revalidate = 3600

async function loadArticle(locale: string, category: string, slug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      limit: 1,
      where: {
        and: [
          { slug: { equals: slug } },
          { 'category.slug': { equals: category } },
        ],
      },
      depth: 2,
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
}

async function loadSiblings(locale: string, category: string, currentSlug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      limit: 6,
      where: {
        and: [
          { 'category.slug': { equals: category } },
          { slug: { not_equals: currentSlug } },
        ],
      },
      sort: 'slug',
      depth: 0,
    })
    return result.docs
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, category, slug } = await params
  const article = await loadArticle(locale, category, slug)
  if (!article) return {}
  return buildPageMetadata({
    title: (article as any).title,
    description: (article as any).excerpt || '',
    path: `/${category}/${slug}`,
    locale,
    type: 'article',
    publishedTime: (article as any).publishedDate,
    modifiedTime: (article as any).updatedDate,
  })
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale, category, slug } = await params
  setRequestLocale(locale)

  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const [article, siblings] = await Promise.all([
    loadArticle(locale, category, slug),
    loadSiblings(locale, category, slug),
  ])
  if (!article) notFound()

  const t = await getTranslations()
  const lng = locale === 'en' ? 'en' : 'vi'
  const categoryLabel = t(`nav.${cat.nameKey}`)
  const toc = extractTocFromLexical((article as any).content)

  const crumbs = [
    { label: t('nav.home'), href: '/' },
    { label: categoryLabel, href: `/${category}` },
    { label: (article as any).title },
  ]

  const isDraft = (article as any).status === 'draft'
  const isReview = (article as any).status === 'review'
  const publishedDate = (article as any).publishedDate
  const updatedDate = (article as any).updatedDate

  // Crude word count for reading-time
  const wordCount = JSON.stringify((article as any).content || '').match(/\w+/g)?.length ?? 0
  const readingMinutes = Math.max(1, Math.round(wordCount / 220))

  const articleUrl =
    locale === 'vi'
      ? `${SITE_URL}/${category}/${slug}`
      : `${SITE_URL}/en/${category}/${slug}`

  return (
    <>
      <ScrollProgress />

      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path: locale === 'vi'
              ? c.href || `/${category}/${slug}`
              : c.href ? `/en${c.href}` : `/en/${category}/${slug}`,
          })),
        )}
      />
      <JsonLd
        data={buildArticleJsonLd({
          title: (article as any).title,
          description: (article as any).excerpt || '',
          path: locale === 'vi' ? `/${category}/${slug}` : `/en/${category}/${slug}`,
          publishedDate,
          updatedDate,
          locale,
        })}
      />

      <section className="relative overflow-hidden border-b border-[var(--rule)] section-paper">
        {ARTICLE_IMAGE[slug] ? (
          <Image
            src={ARTICLE_IMAGE[slug].src}
            alt={ARTICLE_IMAGE[slug].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-12 dark:opacity-8"
          />
        ) : CLUSTER_HERO[category] ? (
          <Image
            src={CLUSTER_HERO[category].src}
            alt={CLUSTER_HERO[category].alt}
            fill
            sizes="100vw"
            className="object-cover opacity-10 dark:opacity-6"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/96 via-[var(--bg)]/90 to-[var(--bg)]/70" />
        <div className="parchment-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow withRules={false}>
              {lng === 'vi' ? 'Cụm' : 'Cluster'} · {categoryLabel}
            </Eyebrow>
            {(isDraft || isReview) && (
              <span className="badge-draft mt-3 ml-3 align-middle">
                {isDraft ? t('article.draftBadge') : t('article.reviewBadge')}
              </span>
            )}
            <h1 className="mt-4 font-heading text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08]">
              {(article as any).title}
            </h1>
            {(article as any).excerpt && (
              <p className="mt-5 max-w-3xl text-lg md:text-xl leading-relaxed text-[var(--fg-muted)]">
                {(article as any).excerpt}
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              <UpdatedBadge
                date={updatedDate || publishedDate}
                locale={locale}
                label={lng === 'vi' ? 'Rà soát' : 'Reviewed'}
              />
              <span className="rounded-full border border-[var(--rule)] px-2.5 py-1">
                ≈ {readingMinutes} {lng === 'vi' ? 'phút đọc' : 'min read'}
              </span>
              <PrintButton label={lng === 'vi' ? 'In trang' : 'Print'} />
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 xl:col-span-9">
          <ArticleBody content={(article as any).content} />

          <CitationBlock
            title={(article as any).title}
            url={articleUrl}
            publishedDate={publishedDate}
            updatedDate={updatedDate}
            locale={locale}
            labels={{
              citeAs: lng === 'vi' ? 'Trích dẫn mục này' : 'Cite this entry',
              plain: lng === 'vi' ? 'Phổ thông' : 'Plain',
              bibtex: 'BibTeX',
              copy: lng === 'vi' ? 'Sao chép' : 'Copy',
              copied: lng === 'vi' ? 'Đã sao chép' : 'Copied',
            }}
          />

          {siblings.length > 0 && (
            <section className="mt-12 border-t border-[var(--rule)] pt-10">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
                {lng === 'vi' ? 'Mục cùng cụm' : 'Sister entries'}
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {siblings.slice(0, 4).map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/${category}/${s.slug}`}
                    className="group block border border-[var(--rule)] p-5 transition hover:border-[var(--color-gold-500)]/50"
                  >
                    <p className="font-heading font-semibold leading-snug">{s.title}</p>
                    {s.excerpt && (
                      <p className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)] line-clamp-2">
                        {s.excerpt}
                      </p>
                    )}
                    <span className="mt-3 inline-block font-mono text-[0.6rem] uppercase tracking-wider text-[var(--color-gold-500)] opacity-60 group-hover:opacity-100">
                      {lng === 'vi' ? 'đọc tiếp' : 'continue'} →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 xl:col-span-3">
          <ArticleTOC items={toc} title={t('article.tocTitle')} />
        </aside>
      </article>

      <div className="py-10">
        <Ornament />
      </div>
    </>
  )
}
