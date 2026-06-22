'use client'
import { Link, usePathname } from '@/i18n/navigation'

export function HeaderNavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname()
  return (
    <>
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + '/')
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? 'page' : undefined}
            className={
              'text-xs uppercase tracking-[0.14em] transition ' +
              (active ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]')
            }
          >
            {l.label}
          </Link>
        )
      })}
    </>
  )
}
