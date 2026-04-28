import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import { CATEGORIES } from '@/lib/site'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { CLUSTER_HERO, CLUSTER_GLYPH } from '@/lib/images'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'

type Params = Promise<{ locale: string; category: string }>

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, category } = await params
  const t = await getTranslations({ locale })
  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) return {}
  const label = t(`nav.${cat.nameKey}`)
  return buildPageMetadata({
    title: label,
    description: locale === 'vi'
      ? `Các bài viết thuộc cụm ${label} trên law.org.vn.`
      : `Articles in the ${label} cluster on law.org.vn.`,
    path: `/${category}`,
    locale,
  })
}

const CLUSTER_INTROS: Record<string, { vi: string; en: string }> = {
  'legal-system': {
    vi: 'Cụm này lập bản đồ các nguồn pháp luật Việt Nam: từ Hiến pháp 2013 đến luật, bộ luật, nghị định, thông tư và nghị quyết — kèm cách chúng vận hành cùng nhau.',
    en: "This cluster maps Vietnam's sources of law — from the 2013 Constitution down through statutes, codes, decrees, circulars, and resolutions — and how they operate together.",
  },
  'court-system': {
    vi: 'Bốn cấp tòa, Viện kiểm sát, thi hành án dân sự và trọng tài thương mại — toàn bộ kiến trúc tài phán của Việt Nam.',
    en: "The four court tiers, the Procuracy, civil judgment enforcement, and commercial arbitration — the full architecture of Vietnam's adjudicative bodies.",
  },
  litigation: {
    vi: 'Quy trình tố tụng dân sự, hình sự, hành chính và lao động — từ khởi kiện và hòa giải đến phúc thẩm và giám đốc thẩm.',
    en: 'Civil, criminal, administrative, and labor procedure — from filing and mediation through appeal and supervisory review.',
  },
  rights: {
    vi: 'Các quyền hiến định và thực tiễn bảo đảm — từ quyền tự do biểu đạt đến quyền tài sản, lao động, người tiêu dùng và khiếu nại tố cáo.',
    en: 'Constitutional rights and how they are given practical effect — from freedom of expression through property, labor, consumer rights, and complaint procedures.',
  },
  terminology: {
    vi: 'Tám cụm thuật ngữ chuyên ngành — từ vựng cốt lõi giúp đọc văn bản pháp luật một cách chính xác.',
    en: 'Eight specialised terminology clusters — the core vocabulary needed to read Vietnamese legal texts precisely.',
  },
  faq: {
    vi: 'Sáu câu hỏi pháp lý phổ biến nhất — viết ngắn, trực tiếp, không thay thế tư vấn cá nhân.',
    en: 'Six of the most frequently-asked legal questions — short, direct, and not a substitute for individualised advice.',
  },
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale, category } = await params
  setRequestLocale(locale)

  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const t = await getTranslations()
  const lng = locale === 'en' ? 'en' : 'vi'
  const label = t(`nav.${cat.nameKey}`)
  const intro = CLUSTER_INTROS[category]?.[lng] ?? ''

  let articles: Array<any> = []
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      limit: 100,
      where: { 'category.slug': { equals: category } },
      sort: 'slug',
      depth: 1,
    })
    articles = result.docs
  } catch {
    articles = []
  }

  const totalCount = articles.length
  const draftCount = articles.filter((a) => a.status === 'draft').length

  const sisterClusters = CATEGORIES.filter((c) => c.slug !== category)

  const crumbs = [
    { label: t('nav.home'), href: '/' },
    { label },
  ]

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path: locale === 'vi' ? c.href || `/${category}` : c.href ? `/en${c.href}` : `/en/${category}`,
          })),
        )}
      />

      <section className="relative overflow-hidden border-b border-[var(--rule)] section-paper">
        {CLUSTER_HERO[category] && (
          <Image
            src={CLUSTER_HERO[category].src}
            alt={CLUSTER_HERO[category].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15 dark:opacity-10"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/95 via-[var(--bg)]/85 to-[var(--bg)]/55" />
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="parchment-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-16 md:pt-12 md:pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <Eyebrow withRules={false}>{lng === 'vi' ? `Cụm ${cat.order}` : `Cluster ${cat.order}`}</Eyebrow>
              <h1 className="mt-4 font-heading text-4xl md:text-6xl font-bold leading-[1.05]">{label}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--fg-muted)]">{intro}</p>
              <div aria-hidden className="mt-8 h-[2px] w-16 bg-[var(--color-gold-500)]" />
            </div>
            {CLUSTER_GLYPH[category] && (
              <div className="hidden lg:block lg:col-span-3 justify-self-end">
                <div className="relative h-32 w-32 opacity-80">
                  <Image
                    src={CLUSTER_GLYPH[category].src}
                    alt={CLUSTER_GLYPH[category].alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 xl:col-span-9">
          {articles.length === 0 ? (
            <div className="border border-[var(--rule)] p-10 text-center text-[var(--fg-muted)]">
              {lng === 'vi'
                ? 'Chưa có bài viết được công bố trong cụm này. Nội dung đang được thẩm định.'
                : 'No entries have been published in this cluster yet. Content is under review.'}
            </div>
          ) : (
            <div className="grid gap-px bg-[var(--rule)] border border-[var(--rule)] overflow-hidden rounded-lg">
              {articles.map((a, idx) => (
                <Link
                  key={a.id}
                  href={`/${category}/${a.slug}`}
                  className="group bg-[var(--bg)] p-6 md:p-7 transition hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[var(--fg-muted)] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg md:text-xl font-semibold leading-snug">
                        {a.title}
                      </h3>
                      {a.excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-2">
                          {a.excerpt}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                        {a.status === 'draft' && <span className="badge-draft">Draft</span>}
                        {a.updatedDate && (
                          <span>
                            {lng === 'vi' ? 'Cập nhật ' : 'Updated '}
                            {new Date(a.updatedDate).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-8">
            <div className="border border-[var(--rule)] p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-500)] font-semibold">
                {lng === 'vi' ? 'Tổng quan cụm' : 'Cluster overview'}
              </p>
              <dl className="mt-4 space-y-3 text-sm font-mono">
                <div className="flex justify-between">
                  <dt className="text-[var(--fg-muted)] uppercase tracking-wider text-xs">
                    {lng === 'vi' ? 'Mục' : 'Entries'}
                  </dt>
                  <dd className="text-[var(--fg)] tabular-nums">{totalCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--fg-muted)] uppercase tracking-wider text-xs">
                    {lng === 'vi' ? 'Bản thảo' : 'Drafts'}
                  </dt>
                  <dd className="text-[var(--color-gold-500)] tabular-nums">{draftCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--fg-muted)] uppercase tracking-wider text-xs">
                    {lng === 'vi' ? 'Ngôn ngữ' : 'Languages'}
                  </dt>
                  <dd className="text-[var(--fg)] tabular-nums">vi · en</dd>
                </div>
              </dl>
            </div>

            <div className="border border-[var(--rule)] p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-500)] font-semibold">
                {lng === 'vi' ? 'Cụm khác' : 'Other clusters'}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {sisterClusters.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="flex items-center justify-between gap-2 text-[var(--fg)] hover:text-[var(--color-gold-500)] transition"
                    >
                      <span>{t(`nav.${c.nameKey}`)}</span>
                      <span className="text-[var(--fg-muted)]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      <div className="py-10">
        <Ornament />
      </div>
    </>
  )
}
