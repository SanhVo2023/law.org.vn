import { getPayload } from '@/lib/payload'
import { assertDb } from '@/lib/db-check'
import { SITE_URL } from '@/lib/site'
import type { Locale } from '@/i18n/routing'

export const revalidate = 3600

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(_req: Request, ctx: { params: Promise<{ locale: string }> }) {
  const { locale } = await ctx.params
  assertDb()
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    limit: 30,
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 0,
  })

  const localePath = locale === 'vi' ? '' : '/en'
  const channelTitle =
    locale === 'vi' ? 'law.org.vn — Bài viết biên tập' : 'law.org.vn — Editorial blog'
  const channelDesc =
    locale === 'vi'
      ? 'Bình luận, phân tích và cập nhật pháp luật Việt Nam.'
      : 'Vietnamese legal commentary, analysis, and practice updates.'

  const items = result.docs
    .map((d: any) => {
      const url = `${SITE_URL}${localePath}/blog/${d.slug}`
      const pubDate = d.publishedAt
        ? new Date(d.publishedAt).toUTCString()
        : new Date().toUTCString()
      return `    <item>
      <title>${escape(d.title || '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${d.excerpt ? `<description>${escape(d.excerpt)}</description>` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(channelTitle)}</title>
    <link>${SITE_URL}${localePath}/blog</link>
    <description>${escape(channelDesc)}</description>
    <language>${locale === 'vi' ? 'vi-VN' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  })
}
