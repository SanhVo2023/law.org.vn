'use client'
import { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

interface TopicsMenuProps {
  label: string
  items: { href: string; label: string }[]
}

export function TopicsMenu({ label, items }: TopicsMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 uppercase tracking-[0.14em] text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition"
      >
        {label}
        <span aria-hidden className={'transition ' + (open ? 'rotate-180' : '')}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-2 w-72 rounded-md border border-[var(--rule)] bg-[var(--bg)] shadow-xl shadow-[var(--color-navy-700)]/10"
        >
          <ul className="py-2">
            {items.map((it, idx) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 px-4 py-2.5 text-sm hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[0.62rem] text-[var(--fg-muted)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[var(--fg)]">{it.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
