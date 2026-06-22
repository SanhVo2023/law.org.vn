import { Link } from '@/i18n/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { CATEGORIES, CLUSTER_HINTS } from '@/lib/site'
import { TopicsMenu } from './TopicsMenu'
import { HeaderNavLinks } from './HeaderNavLinks'
import { MobileMenu } from './MobileMenu'
import { WavingFlag } from '@/components/home/WavingFlag'

export async function SiteHeader() {
  const t = await getTranslations()
  const locale = await getLocale()
  const lng = locale === 'en' ? 'en' : 'vi'

  const topics = CATEGORIES.map((c) => ({
    href: `/${c.slug}`,
    label: t(`nav.${c.nameKey}`),
    hint: CLUSTER_HINTS[c.slug]?.[lng],
  }))
  const topicsLabel = lng === 'vi' ? 'Cụm chủ đề' : 'Topics'
  const navLinks = [
    { href: '/blog', label: t('nav.blog') },
    { href: '/updates', label: t('nav.updates') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/about', label: t('nav.about') },
  ]

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <WavingFlag className="w-6 shrink-0" />
          <span className="font-heading text-xl font-bold tracking-tight">
            law<span className="text-[var(--color-gold-500)]">.</span>org<span className="text-[var(--color-gold-500)]">.</span>vn
          </span>
          <span className="hidden text-[0.62rem] uppercase tracking-[0.18em] text-[var(--fg-muted)] transition group-hover:text-[var(--color-gold-500)] md:inline">
            {t('site.tagline')}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          <TopicsMenu label={topicsLabel} items={topics} />
          <HeaderNavLinks links={navLinks} />
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <DarkModeToggle />
          <MobileMenu topicsLabel={topicsLabel} topics={topics} links={navLinks} />
        </div>
      </div>
    </header>
  )
}
