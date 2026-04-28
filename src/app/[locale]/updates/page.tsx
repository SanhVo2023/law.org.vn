import { setRequestLocale, getTranslations } from 'next-intl/server'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Ornament } from '@/components/ui/Ornament'
import { UpdatesList } from '@/components/updates/UpdatesList'
import { LEGAL_UPDATES } from '@/lib/updates'

type Params = Promise<{ locale: string }>

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return buildPageMetadata({
    title: t('updates.title'),
    description: t('updates.lead'),
    path: '/updates',
    locale,
  })
}

export default async function UpdatesPage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng: 'vi' | 'en' = locale === 'en' ? 'en' : 'vi'

  const crumbs = [{ label: t('nav.home'), href: '/' }, { label: t('nav.updates') }]
  const lastSync = new Date(
    LEGAL_UPDATES.reduce((acc, u) => (u.issuedDate > acc ? u.issuedDate : acc), '2000-01-01'),
  ).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path: locale === 'vi' ? c.href || '/updates' : c.href ? `/en${c.href}` : '/en/updates',
          })),
        )}
      />

      <section className="relative border-b border-[var(--rule)] section-paper">
        <div className="parchment-overlay absolute inset-0" />
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-10 pb-16 md:pt-12 md:pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-3xl">
            <Eyebrow withRules={false}>
              {lng === 'vi' ? 'Cập nhật pháp luật' : 'Legal updates'}
            </Eyebrow>
            <h1 className="mt-4 font-heading text-4xl md:text-6xl font-bold leading-[1.05]">
              {t('updates.title')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--fg-muted)]">
              {t('updates.lead')}
            </p>
            <p className="mt-3 text-sm text-[var(--fg-muted)] italic">
              {t('updates.attribution')}
            </p>
            <div aria-hidden className="mt-8 h-[2px] w-16 bg-[var(--color-gold-500)]" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              {t('updates.lastSync')} {lastSync}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <UpdatesList
          locale={lng}
          labels={{
            type: lng === 'vi' ? 'Loại văn bản' : 'Type',
            area: lng === 'vi' ? 'Lĩnh vực' : 'Area',
            issued: lng === 'vi' ? 'Ban hành' : 'Issued',
            issuingBody: lng === 'vi' ? 'Cơ quan ban hành' : 'Issuing body',
            sourceLabel: lng === 'vi' ? 'Đọc văn bản gốc' : 'Read official text',
            showing: lng === 'vi' ? 'Hiển thị' : 'Showing',
            of: lng === 'vi' ? '/' : 'of',
            none: lng === 'vi' ? 'Không có văn bản nào trùng bộ lọc.' : 'No instruments match the current filter.',
            disclaimer:
              lng === 'vi'
                ? 'Mỗi mục dưới đây là một văn bản pháp luật thật được công bố trên Cổng thông tin văn bản quy phạm pháp luật (vbpl.vn) và phản chiếu trên thuvienphapluat.vn. Tiêu đề được giữ nguyên văn — phần dịch tiếng Anh là dịch sát nghĩa của tiêu đề, không phải tóm tắt nội dung. Đọc văn bản gốc tại liên kết kèm theo trước khi áp dụng.'
                : 'Every entry below is a real legal instrument published on the official Vietnam normative-document portal (vbpl.vn) and mirrored on thuvienphapluat.vn. Vietnamese titles are verbatim — the English line is a direct translation of the title, not a content summary. Always read the official text via the link before applying.',
          }}
        />
      </section>

      <div className="py-8">
        <Ornament />
      </div>
    </>
  )
}
