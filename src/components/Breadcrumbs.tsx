import { Link } from '@/i18n/navigation'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--fg-muted)]">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[var(--fg)] transition">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-[var(--fg)]' : undefined}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden>›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
