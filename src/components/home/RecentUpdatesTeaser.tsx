import { Link } from '@/i18n/navigation'
import { LEGAL_UPDATES, getTypeLabel } from '@/lib/updates'
import { Eyebrow } from '@/components/ui/Eyebrow'

interface RecentUpdatesTeaserProps {
  locale: 'vi' | 'en'
  labels: {
    eyebrow: string
    title: string
    lead: string
    viewAll: string
    issued: string
    issuingBody: string
  }
}

export function RecentUpdatesTeaser({ locale, labels }: RecentUpdatesTeaserProps) {
  const top5 = [...LEGAL_UPDATES]
    .sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1))
    .slice(0, 5)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-20">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Eyebrow withRules={true}>{labels.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold leading-[1.1]">
            {labels.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--fg-muted)]">{labels.lead}</p>
          <Link
            href="/updates"
            className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-navy-700)] dark:text-[var(--color-gold-500)] border-b border-current pb-1 hover:text-[var(--color-gold-500)] transition"
          >
            {labels.viewAll}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="lg:col-span-8">
          <ol className="grid gap-px overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--rule)]">
            {top5.map((u, idx) => (
              <li key={u.id} className="bg-[var(--bg)]">
                <a
                  href={u.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 md:p-6 transition hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.03]"
                >
                  <span className="font-mono text-xs text-[var(--fg-muted)] tabular-nums pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[var(--color-navy-700)] px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-white">
                        {getTypeLabel(u.type, locale)}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-gold-500)]">
                        {u.number}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                        {formatDate(u.issuedDate)}
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-base md:text-lg font-semibold leading-snug line-clamp-2">
                      {u.title[locale]}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100 pt-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
