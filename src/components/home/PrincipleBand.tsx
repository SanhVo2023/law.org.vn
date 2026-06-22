import { ParallaxImage } from '@/components/animation/ParallaxImage'
import { Container } from '@/components/ui/Container'
import { Star } from '@/components/icons/VietnamIcons'
import { images } from '@/lib/images'

interface PrincipleBandProps {
  eyebrow: string
  statement: string
  attribution: string
}

/**
 * Full-bleed image band with a parallax backdrop and one factual editorial
 * statement. Adds visual weight + motion between the text-dense sections while
 * staying institutional (no marketing slogan — it states how the corpus is built).
 */
export function PrincipleBand({ eyebrow, statement, attribution }: PrincipleBandProps) {
  return (
    <section className="relative isolate overflow-hidden border-y border-[var(--rule)] bg-[var(--color-navy-900)]">
      <ParallaxImage
        src={images.heroCourtStructure.src}
        alt=""
        fill
        intensity={50}
        sizes="100vw"
        className="absolute inset-0"
        /* scale(1.3) gives the parallax travel headroom so no gap shows at the extremes */
        style={{ objectFit: 'cover', transform: 'scale(1.3)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-900)]/92 via-[var(--color-navy-900)]/80 to-[var(--color-navy-900)]/65" />
      <div className="parchment-overlay absolute inset-0 opacity-40" />

      <Container width="wide" className="relative py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-400)]">
            <Star className="h-3.5 w-3.5" />
            {eyebrow}
          </p>
          <p className="mt-5 font-heading text-2xl font-semibold leading-snug text-white md:text-[2rem]">
            {statement}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">{attribution}</p>
        </div>
      </Container>
    </section>
  )
}
