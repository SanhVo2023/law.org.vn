import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPayload } from '@/lib/payload'
import { assertDb } from '@/lib/db-check'
import { CATEGORIES } from '@/lib/site'
import { formatEntryDate, draftLabel } from '@/lib/format'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { CLUSTER_HERO } from '@/lib/images'
import { CLUSTER_GLYPHS } from '@/components/home/ClusterGlyphs'
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

// One concise sentence per cluster. The global "reference only, not legal
// advice" caveat lives in the footer — not repeated per cluster.
const CLUSTER_INTROS: Record<string, { vi: string; en: string }> = {
  'legal-system': {
    vi: 'Hiến pháp, luật, bộ luật, nghị định và thông tư — và cách các nguồn luật này vận hành cùng nhau.',
    en: 'The Constitution, laws, codes, decrees and circulars — and how these sources of law work together.',
  },
  'court-system': {
    vi: 'Cơ cấu, thẩm quyền và vai trò của các cấp tòa án nhân dân theo Luật số 81/2025/QH15.',
    en: "The structure, jurisdiction and role of the people's courts under Law No. 81/2025/QH15.",
  },
  litigation: {
    vi: 'Thủ tục dân sự, hình sự, hành chính, lao động và thương mại — từ khởi kiện đến giám đốc thẩm.',
    en: 'Civil, criminal, administrative, labour and commercial procedure — from filing to supervisory review.',
  },
  rights: {
    vi: 'Quyền, nghĩa vụ và thủ tục pháp lý phổ biến của công dân theo pháp luật Việt Nam.',
    en: 'Common rights, obligations and legal procedures for citizens under Vietnamese law.',
  },
  terminology: {
    vi: 'Thuật ngữ pháp lý cốt lõi, kèm bản gốc tiếng Việt và phần dịch tiếng Anh.',
    en: 'Core legal terminology, with the original Vietnamese alongside the English rendering.',
  },
  faq: {
    vi: 'Câu hỏi pháp lý thường gặp, trả lời ngắn gọn và trực tiếp.',
    en: 'Frequently asked legal questions, answered briefly and directly.',
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

  assertDb()
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'articles',
    locale: locale as Locale,
    limit: 100,
    where: { 'category.slug': { equals: category } },
    sort: 'slug',
    depth: 1,
  })
  const articles: Array<any> = result.docs

  const totalCount = articles.length
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
            className="object-cover opacity-10 mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/95 via-[var(--bg)]/90 to-[var(--bg)]/75" />
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
            {CLUSTER_GLYPHS[category] && (
              <div className="hidden lg:block lg:col-span-3 justify-self-end">
                <div className="h-32 w-32 text-[var(--color-gold-500)] opacity-80">
                  {CLUSTER_GLYPHS[category]}
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
            <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] shadow-[var(--shadow-sm)]">
              {articles.map((a, idx) => (
                <Link
                  key={a.id}
                  href={`/${category}/${a.slug}`}
                  className="group bg-[var(--surface)] p-6 transition hover:bg-[var(--surface-deep)] md:p-7"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tabular-nums text-[var(--fg-subtle)]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold leading-snug text-[var(--fg)] md:text-xl">
                        {a.title}
                      </h3>
                      {a.excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-2">
                          {a.excerpt}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                        {a.status === 'draft' && <span className="badge-draft">{draftLabel(lng)}</span>}
                        {a.updatedDate && (
                          <span>
                            {lng === 'vi' ? 'Cập nhật ' : 'Updated '}
                            {formatEntryDate(a.updatedDate, lng)}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[var(--color-gold-500)] transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                {lng === 'vi' ? 'Tổng quan cụm' : 'Cluster overview'}
              </p>
              <dl className="mt-4 space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    {lng === 'vi' ? 'Mục' : 'Entries'}
                  </dt>
                  <dd className="tabular-nums text-[var(--fg)]">{totalCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    {lng === 'vi' ? 'Ngôn ngữ' : 'Languages'}
                  </dt>
                  <dd className="tabular-nums text-[var(--fg)]">vi · en</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                {lng === 'vi' ? 'Cụm khác' : 'Other clusters'}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {sisterClusters.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="flex items-center justify-between gap-2 text-[var(--fg)] transition hover:text-[var(--color-gold-500)]"
                    >
                      <span>{t(`nav.${c.nameKey}`)}</span>
                      <span className="text-[var(--fg-subtle)]">→</span>
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
