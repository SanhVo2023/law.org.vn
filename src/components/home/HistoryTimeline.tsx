'use client'
import { useEffect, useRef } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'

interface Milestone {
  year: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
}

const MILESTONES: Milestone[] = [
  {
    year: '1946',
    titleVi: 'Hiến pháp đầu tiên',
    titleEn: 'First Constitution',
    descVi: 'Hiến pháp 1946 — văn bản nền tảng đầu tiên của nước Việt Nam Dân chủ Cộng hòa.',
    descEn: "The 1946 Constitution — the founding charter of the Democratic Republic of Vietnam.",
  },
  {
    year: '1959',
    titleVi: 'Hiến pháp thứ hai',
    titleEn: 'Second Constitution',
    descVi: 'Hiến pháp 1959 đặt nền móng cho mô hình kinh tế kế hoạch hóa và tổ chức nhà nước thống nhất.',
    descEn: 'The 1959 Constitution lays the basis for centrally-planned economy and unified state organisation.',
  },
  {
    year: '1980',
    titleVi: 'Sau thống nhất',
    titleEn: 'Post-reunification',
    descVi: 'Hiến pháp 1980 cho nước Cộng hòa Xã hội Chủ nghĩa Việt Nam vừa thống nhất.',
    descEn: 'The 1980 Constitution for the newly reunified Socialist Republic of Vietnam.',
  },
  {
    year: '1992',
    titleVi: 'Đổi Mới',
    titleEn: 'Đổi Mới reforms',
    descVi: 'Hiến pháp 1992 hợp pháp hóa cải cách thị trường và đầu tư nước ngoài.',
    descEn: 'The 1992 Constitution legitimises market reforms and foreign investment.',
  },
  {
    year: '2013',
    titleVi: 'Hiến pháp hiện hành',
    titleEn: 'Current Constitution',
    descVi: 'Hiến pháp 2013 — văn bản gốc của hệ thống pháp luật Việt Nam đương đại.',
    descEn: "The 2013 Constitution — the founding charter of contemporary Vietnamese law.",
  },
  {
    year: '2015',
    titleVi: 'Bộ luật Dân sự',
    titleEn: 'Civil Code',
    descVi: 'Bộ luật Dân sự 2015 hệ thống hóa luật hợp đồng, tài sản và thừa kế.',
    descEn: 'The 2015 Civil Code codifies contract, property, and succession law.',
  },
  {
    year: '2019',
    titleVi: 'Bộ luật Lao động',
    titleEn: 'Labor Code',
    descVi: 'Bộ luật Lao động 2019 cập nhật quan hệ lao động, hợp đồng và tranh chấp.',
    descEn: 'The 2019 Labor Code modernises employment relations, contracts, and dispute resolution.',
  },
  {
    year: '2026',
    titleVi: 'Bảo vệ Dữ liệu Cá nhân',
    titleEn: 'Personal Data Protection',
    descVi: 'Luật Bảo vệ Dữ liệu Cá nhân 2026 — khung pháp lý đầu tiên ngang tầm GDPR.',
    descEn: 'The 2026 Personal Data Protection Law — the first GDPR-equivalent framework.',
  },
]

interface HistoryTimelineProps {
  locale: 'vi' | 'en'
  labels: { eyebrow: string; title: string; lead: string; scrollHint: string }
}

export function HistoryTimeline({ locale, labels }: HistoryTimelineProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation: ← → arrows when scroller has focus
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') el.scrollBy({ left: 360, behavior: 'smooth' })
      else if (e.key === 'ArrowLeft') el.scrollBy({ left: -360, behavior: 'smooth' })
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [])

  return (
    <section className="border-y border-[var(--rule)] section-paper">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-20">
        <div className="max-w-3xl">
          <Eyebrow withRules={true}>{labels.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl font-bold leading-[1.08]">
            {labels.title}
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--fg-muted)]">
            {labels.lead}
          </p>
        </div>

        <div className="mt-12 relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[5.25rem] h-px bg-[var(--rule)]"
          />
          <div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[5.25rem] h-px bg-[var(--color-gold-500)]/40"
            style={{ background: 'repeating-linear-gradient(to right, var(--color-gold-500) 0 2px, transparent 2px 8px)' }}
          />

          <div
            ref={scrollerRef}
            tabIndex={0}
            className="overflow-x-auto scrollbar-thin pb-4 -mx-4 md:mx-0 px-4 md:px-0 focus:outline-none"
          >
            <ol className="flex gap-6 md:gap-8 min-w-full">
              {MILESTONES.map((m, idx) => (
                <li
                  key={m.year}
                  className="flex-shrink-0 w-[280px] md:w-[320px] relative"
                >
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--fg-muted)] mb-3">
                    {String(idx + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-gold-500)] leading-none mb-2">
                    {m.year}
                  </div>
                  <div className="relative h-6 mb-3 hidden md:block">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-gold-500)] ring-4 ring-[var(--bg)]" />
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold leading-snug">
                    {locale === 'vi' ? m.titleVi : m.titleEn}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {locale === 'vi' ? m.descVi : m.descEn}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--fg-muted)] md:hidden">
            ← {labels.scrollHint} →
          </p>
        </div>
      </div>
    </section>
  )
}
