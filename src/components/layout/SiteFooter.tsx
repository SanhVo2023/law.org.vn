import { Link } from '@/i18n/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { CATEGORIES, CONTACT_VN, CONTACT_EN, getEcosystemLinks } from '@/lib/site'
import { Ornament } from '@/components/ui/Ornament'
import { LEGAL_UPDATES, getTypeLabel } from '@/lib/updates'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

export async function SiteFooter() {
  const t = await getTranslations()
  const locale = await getLocale()
  const isEn = locale === 'en'
  const contact = isEn ? CONTACT_EN : CONTACT_VN
  const fallbackEcosystem = getEcosystemLinks(locale)

  // CMS-editable footer content (Payload `footer` global). Falls back to the
  // hardcoded constants/i18n when a field is empty or the DB is unreachable, so
  // the footer never breaks. Edit it in the admin under Globals → Footer.
  let g: Record<string, any> | null = null
  try {
    const payload = await getPayload()
    g = (await payload.findGlobal({ slug: 'footer', locale: locale as Locale, depth: 1 })) as Record<
      string,
      any
    >
  } catch {
    g = null
  }
  const cb = (g?.contactBlock ?? {}) as Record<string, any>
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : '')

  const disclaimer = str(g?.description) || t('footer.disclaimer')
  const orgName = str(cb.organizationName) || contact.shortName
  const addressLine = str(cb.address1) || contact.addressLine
  const addressLine2 = str(cb.address2)
  const email = str(cb.email) || contact.email
  const phoneOverride = str(cb.phone) // shared across locales; optional
  const copyright =
    str(g?.copyright) || `© ${new Date().getFullYear()} law.org.vn · ${contact.shortName}`
  const ecosystemLinks =
    Array.isArray(g?.ecosystemLinks) && g.ecosystemLinks.length
      ? g.ecosystemLinks
          .filter((l: any) => l?.href && l?.label)
          .map((l: any) => ({ href: l.href as string, label: l.label as string }))
      : fallbackEcosystem
  // Phone line: editable single override (split on · into tel links), else the
  // locale-specific constant array.
  const phoneItems = phoneOverride
    ? phoneOverride.split('·').map((s) => {
        const label = s.trim()
        return { label, tel: '+' + label.replace(/[^\d]/g, '') }
      })
    : contact.phones

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
              {disclaimer}
            </p>
          </section>

          <section className="md:col-span-3">
            <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              {isEn ? 'Topics' : 'Cụm chủ đề'}
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
              {LEGAL_UPDATES.slice(0, 4).map((u) => {
                const inner = (
                  <>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-gold-500)]">
                      {getTypeLabel(u.type, 'vi')} · {u.number}
                    </span>
                    <span className="block text-xs text-[var(--fg-muted)] line-clamp-2 leading-tight mt-1">{u.title.vi}</span>
                  </>
                )
                return (
                  <li key={u.id}>
                    {u.sourceUrl ? (
                      <a
                        href={u.sourceUrl}
                        target="_blank"
                        rel="noopener"
                        className="block text-[var(--fg)] hover:text-[var(--color-gold-500)] transition"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span className="block text-[var(--fg)]">{inner}</span>
                    )}
                  </li>
                )
              })}
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
              {ecosystemLinks.map((link) => (
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
            {orgName}
          </h4>
          <p className="mt-3 text-xs leading-relaxed text-[var(--fg-muted)] max-w-2xl">
            {contact.companyName}
          </p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-[var(--fg)] max-w-md">
            {addressLine}
            {addressLine2 ? (
              <>
                <br />
                {addressLine2}
              </>
            ) : null}
            <br />
            {phoneItems.map((p, i) => (
              <span key={p.tel || p.label}>
                <a href={`tel:${p.tel}`} className="text-[var(--fg-muted)] hover:text-[var(--fg)]">
                  {p.label}
                </a>
                {i < phoneItems.length - 1 ? <span className="mx-2 text-[var(--fg-muted)]">·</span> : null}
              </span>
            ))}
            <br />
            <a href={`mailto:${email}`} className="text-[var(--fg-muted)] hover:text-[var(--fg)]">
              {email}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 md:px-6 py-5 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] md:flex-row md:items-center md:justify-between">
          <span>{copyright}</span>
          <span>Edition 2026.04 · Last reviewed {new Date().toISOString().slice(0, 10)}</span>
        </div>
      </div>
    </footer>
  )
}
