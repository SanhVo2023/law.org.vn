/* Shared display formatters for listing cards / meta chips.
 *
 * Why this exists: Vietnamese `toLocaleDateString('vi-VN', { month: 'short' })`
 * renders months as "thg 4", which the uppercase mono styling used on cards and
 * meta chips turns into an ugly, code-looking "THG 4". For a legal / encyclopedia
 * audience the standard, unambiguous Vietnamese form is numeric dd/MM/yyyy (or
 * MM/yyyy without a day). English keeps the clean worded "Apr 2026" short form.
 * Long-form prose dates (full article headers) deliberately keep `month: 'long'`
 * elsewhere — that reads naturally and is not the case this helper replaces. */
export function formatEntryDate(
  date: string | Date | null | undefined,
  locale: string,
  opts: { withDay?: boolean } = {},
): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const withDay = opts.withDay ?? false
  if (locale === 'vi') {
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    if (!withDay) return `${mm}/${yyyy}`
    const dd = String(d.getDate()).padStart(2, '0')
    return `${dd}/${mm}/${yyyy}`
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    ...(withDay ? { day: 'numeric' } : {}),
  })
}

/* Compact draft label for listing cards. The article / blog detail pages use the
 * fuller `article.draftBadge` message ("Bản thảo AI — chờ thẩm định"); cards have
 * no room for that. Localised so a Vietnamese page never shows the bare English
 * word "Draft". */
export function draftLabel(locale: string): string {
  return locale === 'vi' ? 'Bản thảo' : 'Draft'
}
