'use client'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
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
  /** What this institution contributes to the encyclopedia — gives the icon meaning. */
  roleVi: string
  roleEn: string
}

// Official institutions referenced by the encyclopedia. Non-clickable visual
// marks (no outbound links per Mr Hien 2026-05-19). Emblems are inline SVG —
// truly transparent, theme-adaptive gold. Each carries a ROLE line so the icon
// communicates what kind of legal source it represents, not just decoration.
const SOURCES: Source[] = [
  { id: 'quoc-hoi', fullVi: 'Quốc Hội', fullEn: 'National Assembly', roleVi: 'Hiến pháp · luật', roleEn: 'Constitution · statutes' },
  { id: 'chinh-phu', fullVi: 'Chính phủ', fullEn: 'Government', roleVi: 'Nghị định · quyết định', roleEn: 'Decrees · decisions' },
  { id: 'tandtc', fullVi: 'Tòa án NDTC', fullEn: "Supreme People's Court", roleVi: 'Án lệ · hướng dẫn', roleEn: 'Case law · guidance' },
  { id: 'vksndtc', fullVi: 'Viện Kiểm sát NDTC', fullEn: "Supreme Procuracy", roleVi: 'Công tố · kiểm sát', roleEn: 'Prosecution · oversight' },
  { id: 'bo-tu-phap', fullVi: 'Bộ Tư pháp', fullEn: 'Ministry of Justice', roleVi: 'Thông tư · tư pháp', roleEn: 'Circulars · justice' },
  { id: 'bo-cong-an', fullVi: 'Bộ Công an', fullEn: 'Ministry of Public Security', roleVi: 'An ninh · cư trú', roleEn: 'Security · residence' },
  { id: 'vbpl', fullVi: 'Cổng VBPL', fullEn: 'Legal Documents Portal', roleVi: 'Tra cứu văn bản', roleEn: 'Document look-up' },
  { id: 'viac', fullVi: 'VIAC', fullEn: 'Arbitration Centre', roleVi: 'Trọng tài thương mại', roleEn: 'Commercial arbitration' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function TrustedSources({ caption, subcaption, locale }: TrustedSourcesProps) {
  const reduce = useReducedMotion()
  const container: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
  const item: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }

  return (
    <Section tone="deep" bordered width="wide">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--fg-muted)]">
          {caption}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{subcaption}</p>
      </div>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4"
      >
        {SOURCES.map((s) => {
          const name = locale === 'vi' ? s.fullVi : s.fullEn
          const role = locale === 'vi' ? s.roleVi : s.roleEn
          const emblem = TRUSTED_SOURCE_EMBLEMS[s.id]
          return (
            <motion.li key={s.id} variants={item} className="flex flex-col items-center text-center">
              <figure className="group flex flex-col items-center gap-3" aria-label={`${name} — ${role}`}>
                <div className="h-14 w-14 text-[var(--color-gold-500)] transition duration-300 group-hover:scale-105">
                  {emblem ?? <div className="h-full w-full rounded-full border border-[var(--rule)]" />}
                </div>
                <figcaption className="leading-tight">
                  <span className="block text-xs font-semibold text-[var(--fg)]">{name}</span>
                  <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
                    {role}
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}
