import type { GlobalConfig } from 'payload'

// MINIMAL footer per CLAUDE.md: footer contact only.
// No floating CTA, no forms, no phone-header, no Zalo.
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Footer content shown site-wide. Localized fields (🌐) have separate Vietnamese / English values — switch locale top-right. Leave a field blank to fall back to the built-in default.',
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Disclaimer line',
      admin: {
        description:
          'The small italic legal disclaimer under the law.org.vn mark. Blank → built-in default.',
      },
    },
    {
      name: 'contactBlock',
      type: 'group',
      label: 'Contact block',
      fields: [
        {
          name: 'organizationName',
          type: 'text',
          localized: true,
          label: 'Organisation name (heading)',
          defaultValue: 'Apolo Lawyers',
          admin: { description: 'Bold heading above the address. Blank → built-in short name.' },
        },
        {
          name: 'address1',
          type: 'text',
          localized: true,
          label: 'Address',
          admin: { description: 'Street address line. Blank → official address from address.txt.' },
        },
        {
          name: 'address2',
          type: 'text',
          localized: true,
          label: 'Address line 2 (optional)',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone line (optional, shared)',
          admin: {
            description:
              'Optional override for the phone line, e.g. "(028) 66.701.709 · 0903.419.479". Separate numbers with " · ". Blank → the per-locale numbers from address.txt.',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: { description: 'Contact email. Blank → contact@apolo.com.vn.' },
        },
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
