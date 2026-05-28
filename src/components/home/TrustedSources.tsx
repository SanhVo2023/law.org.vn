import { TRUSTED_SOURCE_EMBLEMS } from './TrustedSourceEmblems'

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
    <section className="border-y border-[var(--rule)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-gold-500)] font-semibold">
            {caption}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{subcaption}</p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10">
          {SOURCES.map((s) => {
            const label = locale === 'vi' ? s.fullVi : s.fullEn
            const emblem = TRUSTED_SOURCE_EMBLEMS[s.id]
            return (
              <li key={s.id} className="flex flex-col items-center text-center">
                <figure
                  className="group flex flex-col items-center gap-3 opacity-70 transition hover:opacity-100"
                  aria-label={label}
                  title={label}
                >
                  <div className="h-16 w-16 text-[var(--color-gold-500)] transition group-hover:scale-105">
                    {emblem ?? <div className="h-full w-full rounded-full border border-[var(--rule)]" />}
                  </div>
                  <figcaption className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--fg-muted)] leading-tight">
                    {label}
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
