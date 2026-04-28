import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'law.org.vn',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short positioning line (e.g., "Vietnam Legal Knowledge Portal").',
      },
    },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'analyticsId',
      type: 'text',
      admin: {
        description: 'GA4 Measurement ID (optional).',
      },
    },
  ],
}
