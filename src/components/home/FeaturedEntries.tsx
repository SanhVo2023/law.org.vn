'use client'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { formatEntryDate, draftLabel } from '@/lib/format'

export interface FeaturedEntryItem {
  id: string | number
  slug: string
  title: string
  excerpt?: string
  cluster: string
  clusterLabel: string
  updatedDate?: string
  isDraft?: boolean
  image?: { src: string; alt?: string }
}

const EASE = [0.22, 1, 0.36, 1] as const

export function FeaturedEntries({
  eyebrow,
  title,
  lead,
  entries,
  locale,
  emptyMessage,
}: {
  eyebrow: string
  title: string
  lead: string
  entries: FeaturedEntryItem[]
  locale: string
  emptyMessage: string
}) {
  const reduce = useReducedMotion()
  const container: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const card: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

  return (
    <Section tone="deep" bordered width="wide">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      {entries.length === 0 ? (
        <p className="mt-12 text-center text-[var(--fg-muted)]">{emptyMessage}</p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {entries.slice(0, 3).map((e) => (
            <motion.div key={e.id} variants={card}>
              <Link
                href={`/${e.cluster}/${e.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-500)]/40 hover:shadow-[var(--shadow-md)]"
              >
                {e.image && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={e.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 360px, 90vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[var(--color-navy-900)]/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/70 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded bg-[var(--color-navy-700)]/95 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white">
                      {e.clusterLabel}
                    </span>
                    {e.isDraft && (
                      <span className="badge-draft absolute right-4 top-4 bg-[var(--bg)]/90">
                        {draftLabel(locale)}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-[var(--fg)] md:text-xl">
                    {e.title}
                  </h3>
                  {e.excerpt && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">
                      {e.excerpt}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--rule)] pt-4 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    <span>{formatEntryDate(e.updatedDate, locale)}</span>
                    <span className="text-[var(--color-gold-500)] transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Section>
  )
}
