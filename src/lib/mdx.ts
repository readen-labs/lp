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

export const getBlogPost = (locale: Locale, slug: string): BlogPost | null => {
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
    date: String(data.date ?? ''),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.ceil(stats.minutes),
    content,
  };
};

export const getAllBlogPosts = (locale: Locale): BlogPost[] => {
  return getBlogSlugs(locale)
    .map((slug) => getBlogPost(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
