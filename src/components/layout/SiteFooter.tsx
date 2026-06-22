import { Link } from '@/i18n/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { CATEGORIES, CONTACT_VN, CONTACT_EN, getEcosystemLinks } from '@/lib/site'
import { Ornament } from '@/components/ui/Ornament'
import { LEGAL_UPDATES, getTypeLabel } from '@/lib/updates'
import { getPayload } from '@/lib/payload'
import type { Locale } from '@/i18n/routing'

// Small inline icons (gold via parent text color) — footer accents.
const ico = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}
const BookIcon = () => (
  <svg {...ico} width="13" height="13"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v15H5.5A1.5 1.5 0 0 0 4 20.5z" /><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v15h6.5a1.5 1.5 0 0 1 1.5 1.5z" /></svg>
)
const BellIcon = () => (
  <svg {...ico} width="13" height="13"><path d="M6 9a6 6 0 1 1 12 0c0 4.5 2 5.5 2 5.5H4S6 13.5 6 9Z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
)
const NetIcon = () => (
  <svg {...ico} width="13" height="13"><circle cx="6" cy="12" r="2.3" /><circle cx="18" cy="6" r="2.3" /><circle cx="18" cy="18" r="2.3" /><path d="M8 11l7.5-3.6M8 13l7.5 3.6" /></svg>
)
const PinIcon = () => (
  <svg {...ico} width="15" height="15"><path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z" /><circle cx="12" cy="11" r="2.2" /></svg>
)
const PhoneIcon = () => (
  <svg {...ico} width="15" height="15"><path d="M5 4h3.2l1.4 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.4V19a2 2 0 0 1-2.1 2A16 16 0 0 1 3.9 6.1 2 2 0 0 1 5 4Z" /></svg>
)
const MailIcon = () => (
  <svg {...ico} width="15" height="15"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7.5 8 5 8-5" /></svg>
)

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
  // Descriptor = the full legal name minus the org-name prefix, so the heading
  // and the line below don't repeat "Công ty Luật Apolo Lawyers" verbatim.
  const descriptor = contact.companyName.startsWith(orgName)
    ? contact.companyName.slice(orgName.length).replace(/^[\s,–—-]+/, '')
    : contact.companyName
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
    <footer className="no-print mt-20 border-t border-[var(--rule)] bg-[var(--surface-deep)]">
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
            <h4 className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              <BookIcon />
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
            <h4 className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              <BellIcon />
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
            <h4 className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
              <NetIcon />
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

        <div className="mt-14 pt-8 border-t border-[var(--rule)] grid gap-8 md:grid-cols-12 md:gap-12">
          {/* Identity — name once, then the affiliation descriptor (no repeat) */}
          <div className="md:col-span-5">
            <h4 className="font-heading text-base font-bold leading-snug text-[var(--fg)]">
              {orgName}
            </h4>
            {descriptor ? (
              <p className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)] max-w-sm">
                {descriptor}
              </p>
            ) : null}
          </div>

          {/* Contact details — each line led by a gold icon */}
          <address className="md:col-span-7 not-italic grid gap-3.5 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[var(--color-gold-500)] shrink-0">
                <PinIcon />
              </span>
              <span className="leading-relaxed text-[var(--fg)]">
                {addressLine}
                {addressLine2 ? (
                  <>
                    <br />
                    {addressLine2}
                  </>
                ) : null}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[var(--color-gold-500)] shrink-0">
                <PhoneIcon />
              </span>
              <span className="leading-relaxed">
                {phoneItems.map((p, i) => (
                  <span key={p.tel || p.label}>
                    {/* Number + its trailing separator stay glued (whitespace-nowrap)
                        so a single phone number never splits across two lines; the
                        break is only allowed at the space between numbers. */}
                    <span className="whitespace-nowrap">
                      <a href={`tel:${p.tel}`} className="text-[var(--fg)] hover:text-[var(--color-gold-500)] transition">
                        {p.label}
                      </a>
                      {i < phoneItems.length - 1 ? (
                        <span className="ml-1.5 text-[var(--fg-muted)]">·</span>
                      ) : null}
                    </span>
                    {i < phoneItems.length - 1 ? ' ' : null}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[var(--color-gold-500)] shrink-0">
                <MailIcon />
              </span>
              <a href={`mailto:${email}`} className="text-[var(--fg)] hover:text-[var(--color-gold-500)] transition">
                {email}
              </a>
            </div>
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
