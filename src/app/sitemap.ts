import type { MetadataRoute } from 'next';

import { buildLocalizedUrl } from '@/lib/locale-path';
import { buildAlternateLanguages } from '@/lib/seo';
import { getAllBlogParams } from '@/lib/mdx';

import { routing } from '@/i18n/routing';

const STATIC_PATHS = ['', '/about', '/blog', '/terms', '/privacy'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: buildLocalizedUrl(locale, path),
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  const blogSlugs = [...new Set(getAllBlogParams().map(({ slug }) => slug))];

  for (const locale of routing.locales) {
    for (const slug of blogSlugs) {
      const path = `/blog/${slug}`;
      entries.push({
        url: buildLocalizedUrl(locale, path),
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  return entries;
}
