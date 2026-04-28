import { StatCounter } from '@/components/ui/StatCounter'

interface EncyclopediaStatsProps {
  labels: {
    entries: string
    clusters: string
    terminologyAreas: string
    languages: string
  }
}

export function EncyclopediaStats({ labels }: EncyclopediaStatsProps) {
  return (
    <section className="border-y border-[var(--rule)] section-paper">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--rule)]">
          <StatCounter value={100} label={labels.entries} />
          <StatCounter value={6} label={labels.clusters} delay={0.15} />
          <StatCounter value={8} label={labels.terminologyAreas} delay={0.3} />
          <StatCounter value={2} label={labels.languages} delay={0.45} />
        </div>
      </div>
    </section>
  )
}
