'use client'
import { useEffect, useState } from 'react'

export interface TocItem {
  label: string
  anchor: string
  level: number
}

export function ArticleTOC({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    items.forEach((i) => {
      const el = document.getElementById(i.anchor)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label={title} className="sticky top-24 text-sm no-print">
      <h3 className="text-xs uppercase tracking-[0.14em] font-semibold text-[var(--fg-muted)] mb-3">
        {title}
      </h3>
      <ol className="space-y-2 border-l border-[var(--rule)]">
        {items.map((it) => (
          <li key={it.anchor} style={{ paddingLeft: `${(it.level - 2) * 0.75 + 0.9}rem` }}>
            <a
              href={`#${it.anchor}`}
              className={
                'block py-0.5 -ml-px border-l-2 transition ' +
                (active === it.anchor
                  ? 'border-[var(--color-gold-500)] text-[var(--fg)]'
                  : 'border-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]')
              }
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
