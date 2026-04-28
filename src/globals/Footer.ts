import type { GlobalConfig } from 'payload'

// MINIMAL footer per CLAUDE.md: footer contact only.
// No floating CTA, no forms, no phone-header, no Zalo.
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'One-paragraph site blurb shown in the footer.',
      },
    },
    {
      name: 'contactBlock',
      type: 'group',
      fields: [
        { name: 'organizationName', type: 'text', localized: true, defaultValue: 'Apolo Lawyers' },
        { name: 'address1', type: 'text', localized: true },
        { name: 'address2', type: 'text', localized: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'ecosystemLinks',
      type: 'array',
      labels: { singular: 'Ecosystem link', plural: 'Ecosystem links' },
      admin: {
        description: 'Internal-linking strategy: law.pro.vn (authority cascade), apolo.com.vn (brand VN), apololawyers.com (brand EN). DO NOT add practice-area conversion sites here.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
        { name: 'description', type: 'text', localized: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
    },
  ],
}
