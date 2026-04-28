'use client'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionFadeUpProps {
  children: ReactNode
  delay?: number
  className?: string
  /** Distance the element travels up while fading in. Default 24px. */
  distance?: number
  /** Whether to wait until the element is in the viewport. Default true. */
  whenInView?: boolean
}

/* Wrapper that fades + lifts a section into view. Honours prefers-reduced-motion
 * (renders without animation). Use it on home/category sections to add subtle
 * editorial cadence between blocks without crossing into showy territory. */
export function SectionFadeUp({
  children,
  delay = 0,
  className,
  distance = 24,
  whenInView = true,
}: SectionFadeUpProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const initial = { opacity: 0, y: distance }
  const target = { opacity: 1, y: 0 }
  const transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay }

  if (whenInView) {
    return (
      <motion.div
        initial={initial}
        whileInView={target}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div initial={initial} animate={target} transition={transition} className={className}>
      {children}
    </motion.div>
  )
}
