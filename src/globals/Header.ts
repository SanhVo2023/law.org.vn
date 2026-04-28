import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      localized: true,
      defaultValue: 'law.org.vn',
    },
    {
      name: 'navigation',
      type: 'array',
      labels: { singular: 'Nav item', plural: 'Navigation' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true, admin: { description: 'Relative path, e.g. /legal-system' } },
      ],
    },
  ],
}
