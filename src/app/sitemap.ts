import type { MetadataRoute } from 'next'
import { SITE_URL, CATEGORIES } from '@/lib/site'
import { getPayload } from '@/lib/payload'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPaths = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: '/updates', changeFrequency: 'daily' as const, priority: 0.9 },
    ...CATEGORIES.map((c) => ({
      path: `/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((p) => [
    {
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: {
          vi: `${SITE_URL}${p.path}`,
          en: `${SITE_URL}/en${p.path}`,
        },
      },
    },
  ])

  // Dynamic: articles + glossary terms
  let dynamicEntries: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayload()

    const articles = await payload.find({
      collection: 'articles',
      locale: 'vi',
      limit: 1000,
      where: { status: { equals: 'published' } },
      depth: 1,
    })

    dynamicEntries = articles.docs.map((a: any) => {
      const catSlug = typeof a.category === 'object' ? a.category?.slug : a.category
      const path = `/${catSlug}/${a.slug}`
      return {
        url: `${SITE_URL}${path}`,
        lastModified: a.updatedDate ? new Date(a.updatedDate) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            vi: `${SITE_URL}${path}`,
            en: `${SITE_URL}/en${path}`,
          },
        },
      }
    })

    const blogPosts = await payload.find({
      collection: 'blog-posts',
      locale: 'vi',
      limit: 500,
      where: { status: { equals: 'published' } },
      depth: 0,
    })
    const blogEntries: MetadataRoute.Sitemap = blogPosts.docs.map((p: any) => {
      const path = `/blog/${p.slug}`
      return {
        url: `${SITE_URL}${path}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            vi: `${SITE_URL}${path}`,
            en: `${SITE_URL}/en${path}`,
          },
        },
      }
    })
    dynamicEntries = [...dynamicEntries, ...blogEntries]
  } catch {
    // Tolerate DB outage during build — at least static routes are in the sitemap.
    dynamicEntries = []
  }

  return [...staticEntries, ...dynamicEntries]
}
