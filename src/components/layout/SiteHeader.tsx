import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { CATEGORIES } from '@/lib/site'
import { TopicsMenu } from './TopicsMenu'

export async function SiteHeader() {
  const t = await getTranslations()

  const topics = CATEGORIES.map((c) => ({
    href: `/${c.slug}`,
    label: t(`nav.${c.nameKey}`),
  }))

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg)]/90 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-heading text-xl font-bold tracking-tight">
            law<span className="text-[var(--color-gold-500)]">.</span>org<span className="text-[var(--color-gold-500)]">.</span>vn
          </span>
          <span className="hidden md:inline text-[0.62rem] uppercase tracking-[0.18em] text-[var(--fg-muted)] group-hover:text-[var(--color-gold-500)] transition">
            {t('site.tagline')}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          <TopicsMenu label={`${t('nav.legalSystem').split(' ')[0] === 'Hệ' ? 'Cụm chủ đề' : 'Topics'}`} items={topics} />
          <Link
            href="/updates"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition uppercase tracking-[0.14em] text-xs"
          >
            {t('nav.updates')}
          </Link>
          <Link
            href="/faq"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition uppercase tracking-[0.14em] text-xs"
          >
            {t('nav.faq')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
