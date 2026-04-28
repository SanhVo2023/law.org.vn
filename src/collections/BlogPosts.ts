import type { CollectionConfig } from 'payload'
import { makeRevalidateHook } from '@/lib/revalidate-hook'

/* Blog — recurring commentary, case analysis, practice updates, policy notes,
 * and compliance briefings. Distinct from `articles` (encyclopedia entries):
 * blog posts are dated, opinion-bearing, and refresh frequently for SEO.
 *
 * Bilingual via Payload localization. Drafts-first; SME flips to published. */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    description:
      'Editorial blog. Use for analysis, commentary, and SEO-driving updates — not for evergreen encyclopedia entries (those go in Articles).',
    group: 'Editorial',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-safe identifier (shared across locales)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'commentary',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Bình luận / Commentary', value: 'commentary' },
        { label: 'Phân tích vụ việc / Case analysis', value: 'case-analysis' },
        { label: 'Cập nhật thực tiễn / Practice update', value: 'practice-update' },
        { label: 'Chính sách / Policy', value: 'policy' },
        { label: 'Tuân thủ / Compliance', value: 'compliance' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: '1–2 sentence summary for cards, meta description, and OG preview.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Apolo Editorial',
      admin: {
        position: 'sidebar',
        description: 'Display author byline.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Under review', value: 'review' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readingTimeMin',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Auto-computed from body word count on save.',
        readOnly: true,
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
      admin: {
        description: 'Free-form tags for indexing (no taxonomy enforcement).',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      maxDepth: 1,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Compute reading time from body word count (across both locales — use whichever is longer).
        try {
          const bodyJson = JSON.stringify(data?.body ?? '')
          const words = bodyJson.match(/\w+/g)?.length ?? 0
          if (words > 0) {
            data.readingTimeMin = Math.max(1, Math.round(words / 220))
          }
        } catch {
          // ignore — keep prior value
        }
        return data
      },
    ],
    afterChange: [
      makeRevalidateHook({
        pathsFromDoc: (doc) => {
          const slug = typeof doc.slug === 'string' ? doc.slug : null
          if (!slug) return ['/blog', '/en/blog']
          return [
            '/blog',
            '/en/blog',
            `/blog/${slug}`,
            `/en/blog/${slug}`,
            '/blog/feed.xml',
            '/en/blog/feed.xml',
          ]
        },
      }),
    ],
  },
}
