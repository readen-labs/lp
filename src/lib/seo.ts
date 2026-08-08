import type { Metadata } from 'next';

import { routing, type Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';
import {
  SITE_URL,
  BRAND_NAME,
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  OG_LOCALE_MAP,
} from '@/constants/config';

type BuildMetadataParams = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  siteName?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

const ROBOTS_DIRECTIVES: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export const buildAlternateLanguages = (
  path: string,
): Record<string, string> => ({
  ...Object.fromEntries(
    routing.locales.map((locale) => [locale, buildLocalizedUrl(locale, path)]),
  ),
  'x-default': buildLocalizedUrl(routing.defaultLocale, path),
});

export const buildMetadata = ({
  locale,
  title,
  description,
  path,
  siteName = BRAND_NAME,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataParams): Metadata => {
  const url = buildLocalizedUrl(locale, path);

  const openGraphBase = {
    title,
    description,
    url,
    siteName,
    locale: OG_LOCALE_MAP[locale],
    alternateLocale: routing.locales
      .filter((item) => item !== locale)
      .map((item) => OG_LOCALE_MAP[item]),
  };

  const openGraph: Metadata['openGraph'] =
    ogType === 'article'
      ? {
          ...openGraphBase,
          type: 'article',
          publishedTime,
          modifiedTime,
          authors,
        }
      : { ...openGraphBase, type: 'website' };

  return {
    title,
    description,
    robots: ROBOTS_DIRECTIVES,
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path),
      types: {
        'application/rss+xml': buildLocalizedUrl(locale, '/rss.xml'),
      },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

export const buildOrganizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  email: CONTACT_EMAIL,
  sameAs: Object.values(SOCIAL_LINKS),
});

export const buildWebSiteJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BRAND_NAME,
  url: SITE_URL,
  inLanguage: locale,
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const buildSoftwareApplicationJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: BRAND_NAME,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'LifestyleApplication',
  inLanguage: locale,
  publisher: { '@id': `${SITE_URL}/#organization` },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

export const buildFaqJsonLd = (
  items: { question: string; answer: string }[],
  locale: Locale,
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: locale,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const buildBreadcrumbJsonLd = (
  items: { name: string; url: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildArticleJsonLd = (params: {
  title: string;
  description: string;
  date: string;
  url: string;
  locale: Locale;
  image?: string;
  modifiedDate?: string;
  authorName?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: params.title,
  description: params.description,
  datePublished: params.date,
  dateModified: params.modifiedDate ?? params.date,
  url: params.url,
  mainEntityOfPage: params.url,
  inLanguage: params.locale,
  ...(params.image ? { image: params.image } : {}),
  author: {
    '@type': 'Organization',
    name: params.authorName ?? BRAND_NAME,
    url: SITE_URL,
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
});
