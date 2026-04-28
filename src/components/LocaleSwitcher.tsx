'use client'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="inline-flex items-center gap-1 text-sm">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          aria-pressed={locale === code}
          className={
            'px-2 py-1 rounded transition uppercase tracking-wide ' +
            (locale === code
              ? 'text-[var(--fg)] font-semibold'
              : 'text-[var(--fg-muted)] hover:text-[var(--fg)]')
          }
        >
          {code}
        </button>
      ))}
    </div>
  )
}
