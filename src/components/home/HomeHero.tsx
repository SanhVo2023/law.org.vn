'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CornerMark } from '@/components/ui/Ornament'
import { images } from '@/lib/images'

interface HomeHeroProps {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  primaryHref: string
  secondaryHref: string
  draftLabel: string
  disclaimer: string
}

export function HomeHero(p: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <Image
        src={images.heroHome.src}
        alt={images.heroHome.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25 dark:opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/95 via-[var(--bg)]/90 to-[var(--bg)]/70" />
      <div className="absolute inset-0 hero-grid opacity-60" />
      <CornerMark className="absolute left-6 top-6 md:left-10 md:top-10" />
      <div aria-hidden className="absolute right-6 bottom-6 rotate-180 md:right-10 md:bottom-10">
        <CornerMark />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-8"
          >
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-[var(--fg)]">
              {p.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--fg-muted)]">
              {p.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={p.primaryHref}
                className="group inline-flex items-center gap-2.5 rounded-md bg-[var(--color-navy-700)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--color-navy-800)]"
              >
                {p.primaryCta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={p.secondaryHref}
                className="inline-flex items-center gap-2 border-b border-[var(--rule)] pb-1 text-sm uppercase tracking-[0.14em] text-[var(--fg-muted)] transition hover:border-[var(--color-gold-500)] hover:text-[var(--fg)]"
              >
                {p.secondaryCta}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-4 lg:border-l lg:border-[var(--rule)] lg:pl-8"
          >
            <span className="badge-draft">{p.draftLabel}</span>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
              {p.disclaimer}
            </p>
            <dl className="mt-6 space-y-3 text-xs font-mono uppercase tracking-[0.14em]">
              <div className="flex justify-between border-b border-[var(--rule)] pb-2">
                <dt className="text-[var(--fg-muted)]">Edition</dt>
                <dd className="text-[var(--fg)]">v. 2026.04</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--rule)] pb-2">
                <dt className="text-[var(--fg-muted)]">Languages</dt>
                <dd className="text-[var(--fg)]">vi · en</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--fg-muted)]">Entries</dt>
                <dd className="text-[var(--color-gold-500)]">100</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
