import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { BlogTagChip } from '@/components/blog/BlogTagChip';
import { Cover } from '@/components/brand/Cover';

import {
  BLOG_COVER_PANEL_GRADIENT,
  BLOG_POST_COVER_WIDTH,
  BLOG_POST_MAX_WIDTH_CH,
} from '@/lib/constants/blog';
import { formatDate } from '@/lib/format-date';
import { getAllBlogParams, getBlogPost } from '@/lib/mdx';
import { renderMdx } from '@/lib/mdx-render';
import { buildLocalizedUrl } from '@/lib/locale-path';
import { buildArticleJsonLd, buildMetadata } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const POST_TITLE_CLAMP = 'clamp(2rem, 5vw, 3.25rem)';

export const generateStaticParams = () => getAllBlogParams();

export const generateMetadata = async ({ params }: BlogPostPageProps) => {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    return {};
  }

  const meta = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: `${post.title} · ${meta('siteName')}`,
    description: post.description,
    path: `/blog/${slug}`,
    siteName: meta('siteName'),
  });
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    notFound();
  }

  const url = buildLocalizedUrl(locale as Locale, `/blog/${slug}`);
  const content = await renderMdx(post.content);
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    date: post.date,
    url,
    locale: locale as Locale,
  });

  return (
    <article className="mx-auto max-w-3xl px-5 pt-14 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {post.tags.map((tag) => (
            <BlogTagChip key={tag} tag={tag} />
          ))}
        </div>
        <h1
          className="display mx-auto mt-6 max-w-2xl"
          style={{ fontSize: POST_TITLE_CLAMP }}
        >
          {post.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/60">
          {post.description}
        </p>
        <p className="mt-5 text-sm text-foreground/45">
          {formatDate(post.date, locale)} ·{' '}
          {t('minRead', { minutes: post.readingMinutes })}
        </p>
      </header>

      {post.cover ? (
        <div
          className={`mt-12 flex justify-center rounded-[2rem] ${BLOG_COVER_PANEL_GRADIENT} bg-card py-14 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)]`}
        >
          <Cover
            src={post.cover}
            alt={post.title}
            width={BLOG_POST_COVER_WIDTH}
          />
        </div>
      ) : null}

      <div
        className="mx-auto mt-14"
        style={{ maxWidth: `${BLOG_POST_MAX_WIDTH_CH}ch` }}
      >
        {content}
      </div>
    </article>
  );
}
