import type { CollectionConfig } from 'payload'

/* Curated digest of recent Vietnamese legal documents (laws/decrees/circulars/etc.).
 * Single-locale: titles are stored in Vietnamese (verbatim) + a literal English
 * translation field — no editorial summary. Source link is canonical thuvienphapluat.vn / vbpl.vn. */
export const LegalUpdates: CollectionConfig = {
  slug: 'legal-updates',
  admin: {
    useAsTitle: 'titleVi',
    defaultColumns: ['number', 'titleVi', 'type', 'issuedDate'],
    description:
      'Recent Vietnamese legal documents — verbatim from thuvienphapluat.vn / vbpl.vn. Do not paraphrase Vietnamese title; English title is title-only literal translation.',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-issuedDate',
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Document number, e.g. "103/2026/NĐ-CP"',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Luật (Law)', value: 'law' },
        { label: 'Bộ luật (Code)', value: 'code' },
        { label: 'Nghị định (Decree)', value: 'decree' },
        { label: 'Thông tư (Circular)', value: 'circular' },
        { label: 'Nghị quyết (Resolution)', value: 'resolution' },
        { label: 'Quyết định (Decision)', value: 'decision' },
        { label: 'Chỉ thị (Directive)', value: 'directive' },
        { label: 'Công văn (Official letter)', value: 'dispatch' },
        { label: 'Quy chuẩn / Tiêu chuẩn (Technical standard)', value: 'standard' },
        { label: 'Văn bản hợp nhất (Consolidated)', value: 'consolidation' },
        { label: 'Dự thảo (Draft)', value: 'draft' },
      ],
    },
    {
      name: 'area',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Đầu tư / Investment', value: 'investment' },
        { label: 'Giao thông / Transport', value: 'transport' },
        { label: 'Y tế / Health', value: 'health' },
        { label: 'Giáo dục / Education', value: 'education' },
        { label: 'Môi trường / Environment', value: 'environment' },
        { label: 'Hành chính / Administrative', value: 'admin' },
        { label: 'Sở hữu trí tuệ / IP', value: 'ip' },
        { label: 'Xây dựng / Construction', value: 'construction' },
        { label: 'Thương mại / Commerce', value: 'commerce' },
        { label: 'Bảo hiểm / Insurance', value: 'insurance' },
        { label: 'Công nghệ / Technology', value: 'it' },
        { label: 'Tài chính / Finance', value: 'finance' },
      ],
    },
    {
      name: 'issuedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'titleVi',
      type: 'text',
      required: true,
      admin: {
        description: 'Original Vietnamese title — verbatim from source. Do not paraphrase.',
      },
    },
    {
      name: 'titleEn',
      type: 'text',
      required: true,
      admin: {
        description: 'Direct English translation of the title only — not a content summary.',
      },
    },
    {
      name: 'issuingBodyVi',
      type: 'text',
      required: true,
      admin: { description: 'Issuing body in Vietnamese, e.g. "Chính phủ", "Bộ Y tế"' },
    },
    {
      name: 'issuingBodyEn',
      type: 'text',
      required: true,
      admin: { description: 'Issuing body in English, e.g. "Government", "Ministry of Health"' },
    },
    {
      name: 'sourceUrl',
      type: 'text',
      required: true,
      admin: {
        description:
          'Canonical link to the document on thuvienphapluat.vn or vbpl.vn — readers click here for the binding text.',
      },
    },
  ],
}
