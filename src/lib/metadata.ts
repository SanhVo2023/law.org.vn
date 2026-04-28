import type { Metadata } from 'next'
import { SITE_URL } from './site'
import type { Locale } from '@/i18n/routing'

interface PageMetadataInput {
  title: string
  description: string
  path: string
  locale: Locale | string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

const siteName = 'law.org.vn — Vietnam Legal Knowledge Portal'

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const localePath = locale === 'vi' ? canonicalPath : `/en${canonicalPath}`
  const url = `${SITE_URL}${localePath}`

  const alternateVi = `${SITE_URL}${canonicalPath}`
  const alternateEn = `${SITE_URL}/en${canonicalPath}`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        vi: alternateVi,
        en: alternateEn,
        'x-default': alternateVi,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  publishedDate,
  updatedDate,
  locale,
}: {
  title: string
  description: string
  path: string
  publishedDate?: string
  updatedDate?: string
  locale: Locale | string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: locale === 'vi' ? 'vi-VN' : 'en-US',
    datePublished: publishedDate,
    dateModified: updatedDate ?? publishedDate,
    url: `${SITE_URL}${path}`,
    publisher: {
      '@type': 'Organization',
      name: 'law.org.vn',
      url: SITE_URL,
    },
  }
}

export function buildFaqJsonLd(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}
