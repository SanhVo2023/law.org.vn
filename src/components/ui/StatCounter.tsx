'use client'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function StatCounter({
  value,
  suffix = '',
  label,
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.round(v).toString())

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.6,
        delay,
        ease: 'easeOut',
      })
      return () => controls.stop()
    }
  }, [isInView, value, delay, count])

  return (
    <div ref={ref} className="relative px-4 py-6 text-center md:py-8">
      <div className="font-heading text-4xl md:text-5xl font-bold text-[var(--fg)]">
        <motion.span>{display}</motion.span>
        {suffix && <span className="text-[var(--color-gold-500)]">{suffix}</span>}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">{label}</p>
    </div>
  )
}
