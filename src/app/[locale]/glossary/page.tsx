import { redirect } from 'next/navigation'

/* The dictionary-style glossary was removed in v3 in favour of /updates (Legal Updates).
 * Old links continue to work via this redirect. */
export default async function GlossaryRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/updates`)
}
