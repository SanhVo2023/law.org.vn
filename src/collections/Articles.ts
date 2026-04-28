import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
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
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: '1–2 sentence summary used in cards, meta description, and OG preview.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'updatedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'When the legal content was last reviewed for accuracy.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft (AI)', value: 'draft' },
        { label: 'Under SME review', value: 'review' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxDepth: 1,
    },
{
      name: 'tocItems',
      type: 'array',
      localized: true,
      admin: {
        description: 'Pre-computed table of contents (label + anchor). Populated by import script; editors may edit.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'anchor', type: 'text', required: true },
        { name: 'level', type: 'number', defaultValue: 2 },
      ],
    },
  ],
}
