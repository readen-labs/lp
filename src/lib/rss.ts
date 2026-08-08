import { getAllBlogPosts } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';

type BuildRssFeedParams = {
  locale: Locale;
  title: string;
  description: string;
};

const escapeXml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const buildRssFeed = ({
  locale,
  title,
  description,
}: BuildRssFeedParams): string => {
  const blogUrl = buildLocalizedUrl(locale, '/blog');
  const feedUrl = buildLocalizedUrl(locale, '/rss.xml');
  const posts = getAllBlogPosts(locale);

  const items = posts
    .map((post) => {
      const postUrl = buildLocalizedUrl(locale, `/blog/${post.slug}`);

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${postUrl}</link>`,
        `      <guid isPermaLink="true">${postUrl}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${blogUrl}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${locale}</language>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
};
