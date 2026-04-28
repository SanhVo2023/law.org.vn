import Image from 'next/image'
import { TRUSTED_SOURCE_CREST } from '@/lib/images'

interface TrustedSourcesProps {
  caption: string
  subcaption: string
  locale: 'vi' | 'en'
}

interface Source {
  id: string
  fullVi: string
  fullEn: string
  url: string
}

const SOURCES: Source[] = [
  {
    id: 'quoc-hoi',
    fullVi: 'Quốc Hội Việt Nam',
    fullEn: 'National Assembly',
    url: 'https://quochoi.vn',
  },
  {
    id: 'chinh-phu',
    fullVi: 'Cổng Thông tin Chính phủ',
    fullEn: 'Government Portal',
    url: 'https://chinhphu.vn',
  },
  {
    id: 'tandtc',
    fullVi: 'Tòa án Nhân dân Tối cao',
    fullEn: "Supreme People's Court",
    url: 'https://toaan.gov.vn',
  },
  {
    id: 'vksndtc',
    fullVi: 'Viện Kiểm sát Nhân dân Tối cao',
    fullEn: "Supreme People's Procuracy",
    url: 'https://vksndtc.gov.vn',
  },
  {
    id: 'bo-tu-phap',
    fullVi: 'Bộ Tư pháp',
    fullEn: 'Ministry of Justice',
    url: 'https://moj.gov.vn',
  },
  {
    id: 'vbpl',
    fullVi: 'Cổng Văn bản Quy phạm Pháp luật',
    fullEn: 'Legal Documents Portal',
    url: 'https://vbpl.vn',
  },
  {
    id: 'thuvienphapluat',
    fullVi: 'Thư viện Pháp luật',
    fullEn: 'Law Library',
    url: 'https://thuvienphapluat.vn',
  },
  {
    id: 'viac',
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

        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10">
          {SOURCES.map((s) => {
            const crest = TRUSTED_SOURCE_CREST[s.id]
            return (
              <li key={s.id} className="flex flex-col items-center text-center">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition"
                  aria-label={locale === 'vi' ? s.fullVi : s.fullEn}
                >
                  <div className="relative h-16 w-16 transition group-hover:scale-105">
                    {crest ? (
                      <Image
                        src={crest.src}
                        alt={crest.alt}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="h-full w-full rounded-full border border-[var(--rule)]" />
                    )}
                  </div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--fg-muted)] leading-tight">
                    {locale === 'vi' ? s.fullVi : s.fullEn}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
