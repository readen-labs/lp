import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getAllBlogPosts } from '@/lib/mdx';
import { buildAlternateLanguages } from '@/lib/seo';
import { buildLocalizedUrl } from '@/utils/locale-path';

type StaticPathEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const STATIC_PATHS: StaticPathEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const { path, changeFrequency, priority } of STATIC_PATHS) {
      entries.push({
        url: buildLocalizedUrl(locale, path),
        changeFrequency,
        priority,
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  for (const locale of routing.locales) {
    for (const post of getAllBlogPosts(locale)) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: buildLocalizedUrl(locale, path),
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  return entries;
}
