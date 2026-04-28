'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.4 })

  return (
    <motion.div
      aria-hidden
      className="no-print fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--color-gold-500)]"
      style={{ scaleX: x }}
    />
  )
}
