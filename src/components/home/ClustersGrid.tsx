import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'

export interface ClusterEntry {
  slug: string
  label: string
  description: string
  count: number
  glyph?: { src: string; alt: string }
}

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
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((cluster, idx) => (
          <Link
            key={cluster.slug}
            href={`/${cluster.slug}`}
            className="group relative bg-[var(--bg)] p-7 transition hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs text-[var(--fg-muted)]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {cluster.glyph && (
                <div className="relative h-10 w-10 opacity-80 transition group-hover:opacity-100 group-hover:scale-105">
                  <Image src={cluster.glyph.src} alt={cluster.glyph.alt} fill className="object-contain" />
                </div>
              )}
            </div>
            <h3 className="mt-5 font-heading text-xl md:text-2xl font-semibold leading-snug">
              {cluster.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{cluster.description}</p>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--rule)] pt-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                {cluster.count} {entriesLabel}
              </span>
              <span className="text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
