import { cn } from '@/lib/cn'

export function PullQuote({
  quote,
  attribution,
  className,
}: {
  quote: string
  attribution?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'my-12 mx-auto max-w-2xl border-y border-[var(--rule)] py-8 text-center',
        className,
      )}
    >
      <blockquote className="font-heading text-2xl md:text-3xl leading-snug italic text-[var(--fg)]">
        <span aria-hidden className="text-4xl text-[var(--color-gold-500)]/60 align-top">“</span>
        {quote}
        <span aria-hidden className="text-4xl text-[var(--color-gold-500)]/60 align-bottom">”</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
