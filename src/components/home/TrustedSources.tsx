interface TrustedSourcesProps {
  caption: string
  subcaption: string
  locale: 'vi' | 'en'
}

interface Source {
  short: string
  fullVi: string
  fullEn: string
  url: string
}

const SOURCES: Source[] = [
  {
    short: 'Quốc Hội',
    fullVi: 'Quốc Hội Việt Nam',
    fullEn: 'National Assembly',
    url: 'https://quochoi.vn',
  },
  {
    short: 'Chính phủ',
    fullVi: 'Cổng Thông tin Chính phủ',
    fullEn: 'Government Portal',
    url: 'https://chinhphu.vn',
  },
  {
    short: 'TANDTC',
    fullVi: 'Tòa án Nhân dân Tối cao',
    fullEn: 'Supreme People\'s Court',
    url: 'https://toaan.gov.vn',
  },
  {
    short: 'VKSNDTC',
    fullVi: 'Viện Kiểm sát Nhân dân Tối cao',
    fullEn: 'Supreme People\'s Procuracy',
    url: 'https://vksndtc.gov.vn',
  },
  {
    short: 'Bộ Tư pháp',
    fullVi: 'Bộ Tư pháp',
    fullEn: 'Ministry of Justice',
    url: 'https://moj.gov.vn',
  },
  {
    short: 'VBPL',
    fullVi: 'Cổng Văn bản Quy phạm Pháp luật',
    fullEn: 'Legal Documents Portal',
    url: 'https://vbpl.vn',
  },
  {
    short: 'TVPL',
    fullVi: 'Thư viện Pháp luật',
    fullEn: 'Law Library',
    url: 'https://thuvienphapluat.vn',
  },
  {
    short: 'VIAC',
    fullVi: 'Trung tâm Trọng tài Quốc tế Việt Nam',
    fullEn: 'Vietnam International Arbitration Centre',
    url: 'https://viac.vn',
  },
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

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-8">
          {SOURCES.map((s) => (
            <li key={s.short} className="flex flex-col items-center text-center">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition"
              >
                <div className="relative h-14 w-14 rounded-full border border-[var(--rule)] flex items-center justify-center bg-[var(--bg)] group-hover:border-[var(--color-gold-500)]/60 transition">
                  <span className="font-heading font-bold text-sm tracking-tight text-[var(--color-gold-500)]">
                    {s.short.split('').slice(0, 3).join('')}
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--fg-muted)] leading-tight">
                  {locale === 'vi' ? s.fullVi : s.fullEn}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
