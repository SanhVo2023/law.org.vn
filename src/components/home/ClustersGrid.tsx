'use client'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { CLUSTER_GLYPHS } from './ClusterGlyphs'

export interface ClusterEntry {
  slug: string
  label: string
  description: string
  count: number
  image?: { src: string; alt?: string }
}

const EASE = [0.22, 1, 0.36, 1] as const

export function ClustersGrid({
  eyebrow,
  title,
  lead,
  clusters,
  entriesLabel,
}: {
  eyebrow: string
  title: string
  lead: string
  clusters: ClusterEntry[]
  entriesLabel: string
}) {
  const reduce = useReducedMotion()
  const container: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const card: Variants = reduce
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

  return (
    <Section width="wide" id="clusters">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {clusters.map((cluster, idx) => (
          <motion.div key={cluster.slug} variants={card}>
            <Link
              href={`/${cluster.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-500)]/40 hover:shadow-[var(--shadow-md)]"
            >
              {cluster.image && (
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={cluster.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {/* Navy duotone keeps the photography on-brand and the marks legible. */}
                  <div className="absolute inset-0 bg-[var(--color-navy-900)]/25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/75 via-[var(--color-navy-900)]/10 to-transparent" />
                  <span className="absolute left-4 top-3 font-mono text-[0.62rem] tabular-nums text-white/85">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {CLUSTER_GLYPHS[cluster.slug] && (
                    <div className="absolute bottom-3 right-3 h-9 w-9 text-[var(--color-gold-400)] drop-shadow">
                      {CLUSTER_GLYPHS[cluster.slug]}
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold leading-snug text-[var(--fg)] md:text-2xl">
                  {cluster.label}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {cluster.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--rule)] pt-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    {cluster.count} {entriesLabel}
                  </span>
                  <span className="text-[var(--color-gold-500)] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
