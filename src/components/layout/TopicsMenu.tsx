'use client'
import { useState, useRef, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/navigation'

export interface TopicItem {
  href: string
  label: string
  hint?: string
}

interface TopicsMenuProps {
  label: string
  items: TopicItem[]
}

export function TopicsMenu({ label, items }: TopicsMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const activeInMenu = items.some((it) => pathname === it.href || pathname.startsWith(it.href + '/'))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={
          'inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] transition ' +
          (open || activeInMenu ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]')
        }
      >
        {label}
        <span aria-hidden className={'text-[0.7em] transition ' + (open ? 'rotate-180' : '')}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-3 w-[24rem] overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-2 shadow-[var(--shadow-md)]"
        >
          <ul className="grid grid-cols-1">
            {items.map((it, idx) => {
              const active = pathname === it.href || pathname.startsWith(it.href + '/')
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={
                      'group flex items-start gap-3 rounded-lg px-3 py-2.5 transition ' +
                      (active ? 'bg-[var(--surface-deep)]' : 'hover:bg-[var(--surface-deep)]')
                    }
                  >
                    <span className="pt-0.5 font-mono text-[0.62rem] tabular-nums text-[var(--fg-subtle)]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-[var(--fg)]">{it.label}</span>
                      {it.hint && (
                        <span className="block text-xs text-[var(--fg-muted)]">{it.hint}</span>
                      )}
                    </span>
                    <span className="ml-auto pt-0.5 text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
