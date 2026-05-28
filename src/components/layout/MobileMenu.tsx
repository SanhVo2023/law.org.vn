'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@/i18n/navigation'

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  topicsLabel: string
  topics: NavLink[]
  links: NavLink[]
}

/* Mobile navigation drawer (lg:hidden). The desktop <nav> is hidden below the
 * lg breakpoint; without this, mobile users had no way to reach Topics / Blog /
 * Updates / FAQ. Hamburger toggles a slide-down panel.
 *
 * The overlay is PORTALED to document.body: the <header> uses backdrop-blur,
 * which makes it the containing block for position:fixed descendants — without
 * the portal the "fixed inset-0" drawer would be clipped to the 64px header. */
export function MobileMenu({ topicsLabel, topics, links }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Lock body scroll while the drawer is open; close on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--fg)] hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.05] transition"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[var(--color-navy-900,#0d1526)]/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto border-l border-[var(--rule)] bg-[var(--bg)] shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-[var(--rule)] px-5">
              <span className="font-heading text-lg font-bold">
                law<span className="text-[var(--color-gold-500)]">.</span>org<span className="text-[var(--color-gold-500)]">.</span>vn
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--fg)] hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.05] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="px-5 py-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
                {topicsLabel}
              </p>
              <ul className="mt-3 space-y-1">
                {topics.map((it, idx) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.04]"
                    >
                      <span className="font-mono text-[0.62rem] text-[var(--fg-muted)]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[var(--fg)]">{it.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px bg-[var(--rule)]" />

              <ul className="space-y-1">
                {links.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm uppercase tracking-[0.12em] text-[var(--fg)] hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.04]"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
