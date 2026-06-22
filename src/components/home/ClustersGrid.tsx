import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { CLUSTER_GLYPHS } from './ClusterGlyphs'

export interface ClusterEntry {
  slug: string
  label: string
  description: string
  count: number
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
    <Section width="wide" id="clusters">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((cluster, idx) => (
          <Link
            key={cluster.slug}
            href={`/${cluster.slug}`}
            className="group relative flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-500)]/40 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs tabular-nums text-[var(--fg-subtle)]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {CLUSTER_GLYPHS[cluster.slug] && (
                <div className="h-10 w-10 text-[var(--color-gold-500)] opacity-80 transition group-hover:opacity-100">
                  {CLUSTER_GLYPHS[cluster.slug]}
                </div>
              )}
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-[var(--fg)] md:text-2xl">
              {cluster.label}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
              {cluster.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--rule)] pt-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                {cluster.count} {entriesLabel}
              </span>
              <span className="text-[var(--color-gold-500)] transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
