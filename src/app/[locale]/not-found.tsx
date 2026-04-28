import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations()
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-gold-500)]">404</p>
      <h1 className="mt-3 font-heading text-4xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-4 text-[var(--fg-muted)]">{t('notFound.lead')}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[var(--color-navy-700)] text-white px-5 py-2.5 text-sm font-semibold"
      >
        {t('notFound.backHome')} →
      </Link>
    </section>
  )
}
