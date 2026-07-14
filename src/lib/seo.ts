import type { Metadata } from 'next';

import { BRAND_NAME, OG_LOCALE_MAP } from '@/lib/config';
import { buildLocalizedUrl } from '@/lib/locale-path';

import { routing, type Locale } from '@/i18n/routing';

type BuildMetadataParams = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  siteName?: string;
};

export const buildAlternateLanguages = (path: string): Record<string, string> =>
  Object.fromEntries(
    routing.locales.map((locale) => [locale, buildLocalizedUrl(locale, path)]),
  );

export const buildMetadata = ({
  locale,
  title,
  description,
  path,
  siteName = BRAND_NAME,
}: BuildMetadataParams): Metadata => {
  const url = buildLocalizedUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: OG_LOCALE_MAP[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => OG_LOCALE_MAP[item]),
      type: 'website',
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

export const buildSoftwareApplicationJsonLd = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: BRAND_NAME,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'LifestyleApplication',
  inLanguage: locale,
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

export const buildArticleJsonLd = (params: {
  title: string;
  description: string;
  date: string;
  url: string;
  locale: Locale;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: params.title,
  description: params.description,
  datePublished: params.date,
  url: params.url,
  inLanguage: params.locale,
  author: {
    '@type': 'Organization',
    name: BRAND_NAME,
  },
});
