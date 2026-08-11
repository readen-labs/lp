import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getAllBlogPosts } from '@/lib/mdx';
import { buildAlternateLanguages } from '@/lib/seo';
import { buildLocalizedUrl } from '@/utils/locale-path';
import {
  DISCOVER_PAGE_SIZE,
  DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
} from '@/constants/discover';
import {
  getAllBookIds,
  getAllIndustries,
  getAllFigureSlugs,
  getFigureBooksPage,
  getFiguresByIndustry,
  getTotalDiscoverPages,
} from '@/lib/figures';

type StaticPathEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const STATIC_PATHS: StaticPathEntry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/discover', changeFrequency: 'weekly', priority: 0.8 },
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

  for (const locale of routing.locales) {
    for (const slug of getAllFigureSlugs()) {
      const path = `/discover/${slug}`;
      entries.push({
        url: buildLocalizedUrl(locale, path),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });

      const figureBookPageCount =
        getFigureBooksPage(
          slug,
          routing.defaultLocale,
          1,
          DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
        )?.totalPages ?? 1;

      for (
        let pageNumber = 2;
        pageNumber <= figureBookPageCount;
        pageNumber++
      ) {
        const bookPagePath = `${path}/page/${pageNumber}`;
        entries.push({
          url: buildLocalizedUrl(locale, bookPagePath),
          changeFrequency: 'monthly',
          priority: 0.5,
          alternates: {
            languages: buildAlternateLanguages(bookPagePath),
          },
        });
      }
    }
  }

  for (const locale of routing.locales) {
    for (const id of getAllBookIds()) {
      const path = `/discover/book/${id}`;
      entries.push({
        url: buildLocalizedUrl(locale, path),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  const discoverPageCount = getTotalDiscoverPages(DISCOVER_PAGE_SIZE);

  for (const locale of routing.locales) {
    for (let pageNumber = 2; pageNumber <= discoverPageCount; pageNumber++) {
      const path = `/discover/page/${pageNumber}`;
      entries.push({
        url: buildLocalizedUrl(locale, path),
        changeFrequency: 'weekly',
        priority: 0.5,
        alternates: {
          languages: buildAlternateLanguages(path),
        },
      });
    }
  }

  for (const locale of routing.locales) {
    for (const industry of getAllIndustries()) {
      const basePath = `/discover/industry/${industry.slug}`;
      entries.push({
        url: buildLocalizedUrl(locale, basePath),
        changeFrequency: 'weekly',
        priority: 0.55,
        alternates: {
          languages: buildAlternateLanguages(basePath),
        },
      });

      const industryPageCount =
        getFiguresByIndustry(industry.slug, 1, DISCOVER_PAGE_SIZE)
          ?.totalPages ?? 1;

      for (let pageNumber = 2; pageNumber <= industryPageCount; pageNumber++) {
        const path = `${basePath}/page/${pageNumber}`;
        entries.push({
          url: buildLocalizedUrl(locale, path),
          changeFrequency: 'weekly',
          priority: 0.5,
          alternates: {
            languages: buildAlternateLanguages(path),
          },
        });
      }
    }
  }

  return entries;
}
