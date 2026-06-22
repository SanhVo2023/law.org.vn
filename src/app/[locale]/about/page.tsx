import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CATEGORIES } from '@/lib/site'
import { buildPageMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Ornament } from '@/components/ui/Ornament'
import { HistoryTimeline } from '@/components/home/HistoryTimeline'

type Params = Promise<{ locale: string }>

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return buildPageMetadata({
    title: t('nav.about'),
    description:
      locale === 'vi'
        ? 'law.org.vn là bộ tri thức pháp luật Việt Nam song ngữ, phi lợi nhuận — giải thích Hiến pháp, tòa án, tố tụng và quyền công dân để hiểu, không thay cho tư vấn pháp lý.'
        : 'law.org.vn is a bilingual, non-profit knowledge base of Vietnamese law — explaining the Constitution, courts, litigation and citizen rights to be understood, not as legal advice.',
    path: '/about',
    locale,
  })
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const lng = locale === 'en' ? 'en' : 'vi'

  const crumbs = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about') },
  ]

  const purpose =
    lng === 'vi'
      ? 'law.org.vn là bộ tri thức pháp luật Việt Nam — song ngữ, có hệ thống và phi lợi nhuận. Mục tiêu là giúp người đọc hiểu đúng Hiến pháp, hệ thống tòa án, tố tụng và quyền công dân. Đây là tài liệu tham khảo để hiểu, không thay cho ý kiến tư vấn pháp lý trong từng trường hợp cụ thể.'
      : 'law.org.vn is a knowledge base of Vietnamese law — bilingual, systematic, and non-profit. Its purpose is to help readers accurately understand the Constitution, the court system, litigation, and citizen rights. It is a reference for understanding, not a substitute for legal advice in any specific case.'

  const sources =
    lng === 'vi'
      ? 'Nội dung được biên soạn và đối chiếu với các nguồn chính thức của Nhà nước — gồm Cổng Thông tin điện tử Chính phủ, Quốc Hội, Tòa án nhân dân tối cao và Cổng Văn bản Quy phạm Pháp luật (vbpl.vn). Mỗi mục đều được rà soát và ghi rõ ngày cập nhật; tiêu đề văn bản được trích dẫn để hỗ trợ tra cứu.'
      : 'Content is compiled and cross-checked against official state sources — including the Government Portal, the National Assembly, the Supreme People’s Court, and the Legal Documents Portal (vbpl.vn). Every entry is reviewed and dated; instrument titles are cited to support look-up.'

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(
          crumbs.map((c) => ({
            name: c.label,
            path: locale === 'vi' ? c.href || '/about' : c.href ? `/en${c.href}` : '/en/about',
          })),
        )}
      />

      <Section spacing="tight" width="wide" className="border-b border-[var(--rule)]">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          <Eyebrow>{t('nav.about')}</Eyebrow>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.05] text-[var(--fg)] md:text-5xl">
            {lng === 'vi' ? 'Về law.org.vn' : 'About law.org.vn'}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--fg-muted)]">{purpose}</p>
        </div>
      </Section>

      <Section width="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{lng === 'vi' ? 'Nguồn & phương pháp' : 'Sources & method'}</Eyebrow>
            <p className="mt-4 max-w-[var(--measure)] text-base leading-relaxed text-[var(--fg-muted)]">
              {sources}
            </p>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>{lng === 'vi' ? 'Nội dung' : "What's inside"}</Eyebrow>
            <ul className="mt-4 divide-y divide-[var(--rule)] overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm transition hover:bg-[var(--surface-deep)]"
                  >
                    <span className="text-[var(--fg)]">{t(`nav.${c.nameKey}`)}</span>
                    <span className="text-[var(--color-gold-500)]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <HistoryTimeline
        locale={lng}
        labels={{
          eyebrow: lng === 'vi' ? 'Cột mốc lịch sử' : 'Historical milestones',
          title: t('timeline.title'),
          lead: t('timeline.lead'),
          scrollHint: t('timeline.scrollHint'),
        }}
      />

      <div className="py-12">
        <Ornament />
      </div>
    </>
  )
}
