import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { CATEGORIES, ECOSYSTEM_LINKS } from '@/lib/site'
import { Ornament } from '@/components/ui/Ornament'
import { LEGAL_UPDATES, getTypeLabel } from '@/lib/updates'

export async function SiteFooter() {
  const t = await getTranslations()

  return (
    <footer className="mt-20 border-t border-[var(--rule)] bg-[var(--color-paper-deep)]/40 dark:bg-transparent no-print">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="py-2">
          <Ornament />
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <section className="md:col-span-4">
            <p className="font-heading text-2xl font-bold leading-tight">
              law<span className="text-[var(--color-gold-500)]">.</span>org<span className="text-[var(--color-gold-500)]">.</span>vn
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)] max-w-sm">
              {t('site.tagline')}
            </p>
            <p className="mt-5 text-xs leading-relaxed italic text-[var(--fg-muted)] max-w-sm">
              {t('footer.disclaimer')}
            </p>
          </section>

          <section className="md:col-span-3">
            <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              {t('nav.legalSystem').toLowerCase().includes('hệ') ? 'Cụm chủ đề' : 'Topics'}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-[var(--fg)] hover:text-[var(--color-gold-500)] transition">
                    {t(`nav.${c.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-3">
            <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              {t('nav.updates')}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL_UPDATES.slice(0, 4).map((u) => (
                <li key={u.id}>
                  <a href={u.sourceUrl} target="_blank" rel="noopener" className="block text-[var(--fg)] hover:text-[var(--color-gold-500)] transition">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-gold-500)]">
                      {getTypeLabel(u.type, 'vi')} · {u.number}
                    </span>
                    <span className="block text-xs text-[var(--fg-muted)] line-clamp-2 leading-tight mt-1">{u.title.vi}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[var(--rule)]">
                <Link href="/updates" className="text-xs uppercase tracking-[0.14em] text-[var(--color-gold-500)] hover:underline">
                  {t('nav.updates')} →
                </Link>
              </li>
            </ul>
          </section>

          <section className="md:col-span-2">
            <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              {t('footer.ecosystemTitle')}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ECOSYSTEM_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="text-[var(--fg-muted)] hover:text-[var(--color-gold-500)] transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--rule)]">
          <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--fg-muted)] font-semibold">
            Apolo Lawyers
          </h4>
          <address className="mt-3 not-italic text-sm leading-relaxed text-[var(--fg)] max-w-md">
            108 Trần Đình Xu, P. Nguyễn Cư Trinh, Q. 1<br />
            TP. Hồ Chí Minh, Việt Nam<br />
            <a href="tel:+84903419479" className="text-[var(--fg-muted)] hover:text-[var(--fg)]">+84 903 419 479</a>
            <span className="mx-2 text-[var(--fg-muted)]">·</span>
            <a href="mailto:contact@apolo.com.vn" className="text-[var(--fg-muted)] hover:text-[var(--fg)]">contact@apolo.com.vn</a>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 md:px-6 py-5 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} law.org.vn · Apolo Lawyers</span>
          <span>Edition 2026.04 · Last reviewed {new Date().toISOString().slice(0, 10)}</span>
        </div>
      </div>
    </footer>
  )
}
