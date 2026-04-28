'use client'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setDark(next)
  }

  if (dark === null) return <div aria-hidden className="h-9 w-9" />

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-[var(--rule)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition"
    >
      {dark ? '☾' : '☀'}
    </button>
  )
}
