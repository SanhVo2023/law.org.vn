import { notFound } from 'next/navigation'
import Image from 'next/image'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import { assertDb } from '@/lib/db-check'
import {
  buildPageMetadata,
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
} from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ArticleBody } from '@/components/ArticleBody'
import { ScrollProgress } from '@/components/article/ScrollProgress'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import type { BlogCardItem } from '@/components/blog/BlogCard'
import { BLOG_IMAGE } from '@/lib/images'
import type { Locale } from '@/i18n/routing'

type Params = Promise<{ locale: string; slug: string }>

export const revalidate = 3600

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  commentary: 'blog.filterCommentary',
  'case-analysis': 'blog.filterCaseAnalysis',
  'practice-update': 'blog.filterPracticeUpdate',
  policy: 'blog.filterPolicy',
  compliance: 'blog.filterCompliance',
}

async function loadPost(locale: string, slug: string) {
  assertDb()
  const payload = await getPayload()
  const r = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    limit: 1,
    where: { slug: { equals: slug } },
    depth: 2,
  })
  return r.docs[0] ?? null
}

async function loadRelated(locale: string, category: string, currentSlug: string) {
  assertDb()
  const payload = await getPayload()
  const r = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    limit: 3,
    where: {
      and: [
        { category: { equals: category } },
        { slug: { not_equals: currentSlug } },
      ],
    },
    sort: '-publishedAt',
    depth: 1,
  })
  return r.docs
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params
  const post = await loadPost(locale, slug)
  if (!post) return {}
  return buildPageMetadata({
    title: (post as any).title,
    description: (post as any).excerpt || '',
    path: `/blog/${slug}`,
    locale,
    type: 'article',
    publishedTime: (post as any).publishedAt,
  })
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng: 'vi' | 'en' = locale === 'en' ? 'en' : 'vi'

  const post = await loadPost(locale, slug)
  if (!post) notFound()

  const p = post as any
  const categoryLabel = t(CATEGORY_LABEL_KEYS[p.category] ?? 'blog.filterCommentary')
  const isDraft = p.status === 'draft'
  const publishedAt = p.publishedAt
  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const crumbs = [
    { label: t('nav.home'), href: '/' },
    { label: t('blog.title'), href: '/blog' },
    { label: p.title },
  ]

  const fallbackBlog = BLOG_IMAGE[slug]
  const featured: { url: string; alt?: string | null } | null =
    p.featuredImage && typeof p.featuredImage === 'object' && p.featuredImage.url
      ? { url: p.featuredImage.url, alt: p.featuredImage.alt }
      : fallbackBlog
        ? { url: fallbackBlog.src, alt: fallbackBlog.alt }
        : null

  const relatedRaw = await loadRelated(locale, p.category, slug)
  const related: BlogCardItem[] = relatedRaw.map((d: any) => {
    const fallback = BLOG_IMAGE[d.slug as string]
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      category: d.category,
      categoryLabel: t(CATEGORY_LABEL_KEYS[d.category] ?? 'blog.filterCommentary'),
      publishedAt: d.publishedAt,
      readingTimeMin: d.readingTimeMin,
      featuredImage: fallback ? { url: fallback.src, alt: fallback.alt } : null,
    }
  })

  return (
    <>
      <ScrollProgress />

      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path:
              locale === 'vi'
                ? c.href || `/blog/${slug}`
                : c.href
                  ? `/en${c.href}`
                  : `/en/blog/${slug}`,
          })),
        )}
      />
      <JsonLd
        data={buildArticleJsonLd({
          title: p.title,
          description: p.excerpt || '',
          path: locale === 'vi' ? `/blog/${slug}` : `/en/blog/${slug}`,
          publishedDate: publishedAt,
          locale,
        })}
      />

      <section className="relative overflow-hidden border-b border-[var(--rule)] section-paper">
        {featured?.url && (
          <Image
            src={featured.url}
            alt={featured.alt ?? p.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15 dark:opacity-10"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/96 via-[var(--bg)]/90 to-[var(--bg)]/70" />
        <div className="parchment-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-12">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow withRules={false}>{categoryLabel}</Eyebrow>
            {isDraft && (
              <span className="badge-draft mt-3 ml-3 align-middle">
                {t('article.draftBadge')}
              </span>
            )}
            <h1 className="mt-4 font-heading text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08]">
              {p.title}
            </h1>
            {p.excerpt && (
              <p className="mt-5 max-w-3xl text-lg md:text-xl leading-relaxed text-[var(--fg-muted)]">
                {p.excerpt}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              {p.author && (
                <span>
                  {t('blog.byAuthor')} <span className="text-[var(--fg)]">{p.author}</span>
                </span>
              )}
              {dateStr && <span aria-hidden>·</span>}
              {dateStr && <span>{dateStr}</span>}
              {p.readingTimeMin ? (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    {p.readingTimeMin} {t('blog.readingMin')}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-16">
        <ArticleBody content={p.body} />

        <div className="mt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)] hover:text-[var(--color-gold-500)] transition"
          >
            ← {t('blog.title')}
          </Link>
        </div>

        <RelatedPosts posts={related} title={t('blog.relatedTitle')} locale={lng} />
      </article>

      <div className="py-10">
        <Ornament />
      </div>
    </>
  )
}
