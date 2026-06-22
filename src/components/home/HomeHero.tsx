'use client'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { CornerMark } from '@/components/ui/Ornament'
import { Star } from '@/components/icons/VietnamIcons'
import { HeroEmblem } from './HeroEmblem'
import { images } from '@/lib/images'

export interface HeroStat {
  value: number
  label: string
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
  const reduce = useReducedMotion()
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-900)] text-white">
      {/* backdrop layers */}
      <Image
        src={images.heroHome.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.12] mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 72% 42%, rgba(218,37,29,0.28), transparent 55%)' }}
      />
      <div className="absolute inset-0 hero-grid opacity-40" />
      <CornerMark className="absolute left-5 top-5 text-[var(--color-gold-400)] md:left-9 md:top-9" />
      <div aria-hidden className="absolute right-5 bottom-5 rotate-180 text-[var(--color-gold-400)] md:right-9 md:bottom-9">
        <CornerMark />
      </div>

      <Container width="wide" className="relative py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text column */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            {[
              <p key="e" className="inline-flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-400)]">
                <Star className="h-3.5 w-3.5" />
                {p.eyebrow}
              </p>,
              <h1 key="h" className="mt-5 font-heading text-[2.6rem] font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {p.title}
              </h1>,
              <p key="l" className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                {p.lead}
              </p>,
              <div key="c" className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={p.primaryHref}
                  className="group inline-flex items-center gap-2.5 rounded-md bg-[var(--color-gold-500)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-navy-900)] shadow-lg transition hover:bg-[var(--color-gold-400)]"
                >
                  {p.primaryCta}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={p.secondaryHref}
                  className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm uppercase tracking-[0.12em] text-white/75 transition hover:border-[var(--color-gold-400)] hover:text-white"
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

            {/* stat strip */}
            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="mt-11 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-4"
            >
              {p.stats.map((s) => (
                <div key={s.label} className="bg-[var(--color-navy-900)]/50 px-4 py-5 text-center backdrop-blur">
                  <dd className="font-heading text-2xl font-bold tabular-nums text-[var(--color-gold-400)] md:text-3xl">
                    <Counter value={s.value} display={s.display} />
                  </dd>
                  <dt className="mt-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-white/55">{s.label}</dt>
                </div>
              ))}
            </motion.dl>

            <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/40">{p.edition}</p>
          </motion.div>

          {/* Emblem column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.86, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <HeroEmblem />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
