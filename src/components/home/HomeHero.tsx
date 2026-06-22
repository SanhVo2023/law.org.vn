'use client'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Container } from '@/components/ui/Container'
import { CornerMark } from '@/components/ui/Ornament'
import { images } from '@/lib/images'

export interface HeroStat {
  value: number
  label: string
  /** Static display (e.g. "vi · en") instead of a counted number. */
  display?: string
}

interface HomeHeroProps {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  primaryHref: string
  secondaryHref: string
  edition: string
  stats: HeroStat[]
}

const EASE = [0.22, 1, 0.36, 1] as const

function Counter({ value, display }: { value: number; display?: string }) {
  const reduce = useReducedMotion()
  const count = useMotionValue(reduce ? value : 0)
  const text = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (display || reduce) return
    const controls = animate(count, value, { duration: 1.3, ease: 'easeOut' })
    return () => controls.stop()
  }, [count, value, display, reduce])

  if (display) return <span>{display}</span>
  return <motion.span>{text}</motion.span>
}

export function HomeHero(p: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <Image
        src={images.heroHome.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.14] mix-blend-multiply dark:opacity-[0.1] dark:mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)] via-[var(--bg)]/92 to-[var(--bg)]/80" />
      <div className="absolute inset-0 hero-grid opacity-50" />
      <CornerMark className="absolute left-5 top-5 md:left-9 md:top-9" />
      <div aria-hidden className="absolute right-5 bottom-5 rotate-180 md:right-9 md:bottom-9">
        <CornerMark />
      </div>

      <Container width="wide" className="relative py-20 md:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-3xl"
        >
          {[
            <Eyebrow key="e">{p.eyebrow}</Eyebrow>,
            <h1
              key="h"
              className="mt-5 font-heading text-[2.6rem] leading-[1.05] font-bold text-[var(--fg)] sm:text-5xl md:text-6xl"
            >
              {p.title}
            </h1>,
            <p key="l" className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--fg-muted)] md:text-xl">
              {p.lead}
            </p>,
            <div key="c" className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={p.primaryHref}
                className="group inline-flex items-center gap-2.5 rounded-md bg-[var(--color-navy-700)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[var(--shadow-sm)] transition hover:bg-[var(--color-navy-800)]"
              >
                {p.primaryCta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={p.secondaryHref}
                className="inline-flex items-center gap-2 border-b border-[var(--rule)] pb-1 text-sm uppercase tracking-[0.12em] text-[var(--fg-muted)] transition hover:border-[var(--color-gold-500)] hover:text-[var(--fg)]"
              >
                {p.secondaryCta}
              </Link>
            </div>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* Stat strip — the encyclopedia at a glance (folds in the old Stats section). */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4"
        >
          {p.stats.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-4 py-5 text-center">
              <dd className="font-heading text-2xl font-bold tabular-nums text-[var(--fg)] md:text-3xl">
                <Counter value={s.value} display={s.display} />
              </dd>
              <dt className="mt-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>

        <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
          {p.edition}
        </p>
      </Container>
    </section>
  )
}
