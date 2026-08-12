import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { routing, type Locale } from '@/i18n/routing';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  cover?: string;
  tags: string[];
  readingMinutes: number;
  content: string;
  locale: Locale;
};

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

export const getBlogSlugs = (locale: Locale): string[] => {
  const localeDir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
};

const toIsoDate = (value: unknown): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value ? String(value) : '';
};

/* Module-scope memoization, not React's cache() — this content is static,
   checked-in MDX, and cache() only dedupes within a single render, not
   across the separate renders generateStaticParams produces per page. */
const memoize = <Args extends unknown[], T>(
  compute: (...args: Args) => T,
): ((...args: Args) => T) => {
  const store = new Map<string, T>();

  return (...args: Args) => {
    const key = JSON.stringify(args);

    if (!store.has(key)) {
      store.set(key, compute(...args));
    }

    return store.get(key) as T;
  };
};

export const getBlogPost = memoize(
  (locale: Locale, slug: string): BlogPost | null => {
    const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      locale,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      date: toIsoDate(data.date),
      updated: data.updated ? toIsoDate(data.updated) : undefined,
      author: data.author ? String(data.author) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingMinutes: Math.ceil(stats.minutes),
      content,
    };
  },
);

export const getAllBlogPosts = memoize((locale: Locale): BlogPost[] => {
  return getBlogSlugs(locale)
    .map((slug) => getBlogPost(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getRelatedPosts = (
  locale: Locale,
  slug: string,
  tags: string[],
  limit: number,
): BlogPost[] => {
  const others = getAllBlogPosts(locale).filter((post) => post.slug !== slug);

  const sharesTag = (post: BlogPost) =>
    post.tags.some((tag) => tags.includes(tag));

  return [
    ...others.filter(sharesTag),
    ...others.filter((p) => !sharesTag(p)),
  ].slice(0, limit);
};

export const getAllBlogParams = (): { locale: Locale; slug: string }[] => {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of getBlogSlugs(locale)) {
      params.push({ locale, slug });
    }
  }

  return params;
};
