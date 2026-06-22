import { TRUSTED_SOURCE_EMBLEMS } from './TrustedSourceEmblems'
import { Section } from '@/components/ui/Section'

interface TrustedSourcesProps {
  caption: string
  subcaption: string
  locale: 'vi' | 'en'
}

interface Source {
  id: string
  fullVi: string
  fullEn: string
}

// Official institutions referenced by the encyclopedia. Non-clickable visual
// marks (no outbound links per Mr Hien 2026-05-19). Emblems are inline SVG —
// truly transparent, theme-adaptive gold.
const SOURCES: Source[] = [
  { id: 'quoc-hoi', fullVi: 'Quốc Hội Việt Nam', fullEn: 'National Assembly' },
  { id: 'chinh-phu', fullVi: 'Cổng Thông tin Chính phủ', fullEn: 'Government Portal' },
  { id: 'tandtc', fullVi: 'Tòa án Nhân dân Tối cao', fullEn: "Supreme People's Court" },
  { id: 'vksndtc', fullVi: 'Viện Kiểm sát Nhân dân Tối cao', fullEn: "Supreme People's Procuracy" },
  { id: 'bo-tu-phap', fullVi: 'Bộ Tư pháp', fullEn: 'Ministry of Justice' },
  { id: 'bo-cong-an', fullVi: 'Bộ Công an', fullEn: 'Ministry of Public Security' },
  { id: 'vbpl', fullVi: 'Cổng Văn bản Quy phạm Pháp luật', fullEn: 'Legal Documents Portal' },
  { id: 'viac', fullVi: 'Trung tâm Trọng tài Quốc tế Việt Nam', fullEn: 'Vietnam International Arbitration Centre' },
]

export function TrustedSources({ caption, subcaption, locale }: TrustedSourcesProps) {
  return (
    <Section tone="deep" bordered spacing="tight" width="wide">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--fg-muted)]">
          {caption}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{subcaption}</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
        {SOURCES.map((s) => {
          const label = locale === 'vi' ? s.fullVi : s.fullEn
          const emblem = TRUSTED_SOURCE_EMBLEMS[s.id]
          return (
            <li key={s.id} className="flex flex-col items-center text-center">
              <figure
                className="group flex flex-col items-center gap-3 opacity-85 transition hover:opacity-100"
                aria-label={label}
                title={label}
              >
                <div className="h-14 w-14 text-[var(--color-gold-500)] transition group-hover:scale-105">
                  {emblem ?? <div className="h-full w-full rounded-full border border-[var(--rule)]" />}
                </div>
                <figcaption className="font-mono text-[0.6rem] uppercase tracking-[0.14em] leading-tight text-[var(--fg-muted)]">
                  {label}
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
