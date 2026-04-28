'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image, { type ImageProps } from 'next/image'
import { useRef } from 'react'

interface ParallaxImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /** Maximum y offset in px applied as the section scrolls past. Default 80. */
  intensity?: number
}

/* Subtle parallax wrapper around next/image. The image translates `intensity` px
 * across the duration of the section being on screen. Honours reduced-motion. */
export function ParallaxImage({ intensity = 80, className, ...imgProps }: ParallaxImageProps) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [intensity * -1, intensity])

  if (reduce) {
    return (
      <div ref={wrapRef} className={className}>
        <Image {...imgProps} />
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, willChange: 'transform' }} className="absolute inset-0">
        <Image {...imgProps} />
      </motion.div>
    </div>
  )
}
