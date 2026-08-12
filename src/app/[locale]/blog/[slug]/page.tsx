import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { renderMdx } from '@/lib/mdx-render';
import type { Locale } from '@/i18n/routing';
import { Reveal } from '@/components/ui/reveal';
import { formatDate } from '@/utils/format-date';
import { Cover } from '@/components/brand/cover';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { BlogTagChip } from '@/components/blog/blog-tag-chip';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import { getBlogPost, getRelatedPosts, getAllBlogParams } from '@/lib/mdx';
import { DownloadCtaSection } from '@/components/marketing/download-cta-section';
import {
  BLOG_POST_COVER_WIDTH,
  BLOG_POST_MAX_WIDTH_CH,
} from '@/constants/blog';
import {
  buildMetadata,
  buildArticleJsonLd,
  buildPageBreadcrumbJsonLd,
} from '@/lib/seo';

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const POST_TITLE_CLAMP = 'clamp(2rem, 5vw, 3.25rem)';

const RELATED_POST_LIMIT = 2;

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
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    siteName: meta('siteName'),
    ogType: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [post.author ?? meta('siteName')],
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

  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');

  const url = buildLocalizedUrl(locale as Locale, `/blog/${slug}`);
  const content = await renderMdx(post.content);
  const author = post.author ?? tMeta('siteName');
  const related = getRelatedPosts(
    locale as Locale,
    slug,
    post.tags,
    RELATED_POST_LIMIT,
  );

  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    date: post.date,
    url,
    locale: locale as Locale,
    image: buildLocalizedUrl(locale as Locale, `/blog/${slug}/opengraph-image`),
    modifiedDate: post.updated,
    authorName: author,
  });
  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(
    locale as Locale,
    tNav('home'),
    [
      { name: tMeta('blogTitle'), path: '/blog' },
      { name: post.title, url },
    ],
  );

  return (
    <div>
      <article className="mx-auto max-w-3xl px-5 pt-14 pb-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <nav
          aria-label={t('breadcrumbLabel')}
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground/45"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            {tNav('home')}
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            {tMeta('blogTitle')}
          </Link>
          <span aria-hidden>/</span>
          <span className="max-w-[16rem] truncate text-foreground/60">
            {post.title}
          </span>
        </nav>

        <header className="mt-8 text-center">
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
            {t('byAuthor', { author })} · {formatDate(post.date, locale)} ·{' '}
            {t('minRead', { minutes: post.readingMinutes })}
          </p>
        </header>

        {post.cover ? (
          <div className="mt-12 flex justify-center">
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

        {related.length > 0 ? (
          <Reveal className="mt-20">
            <section>
              <h2 className="mb-8 flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-primary-deep">
                <span className="h-px w-6 bg-primary-deep/60" aria-hidden />
                {t('relatedTitle')}
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {related.map((relatedPost) => (
                  <BlogPostCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    locale={locale}
                    minRead={t('minRead', {
                      minutes: relatedPost.readingMinutes,
                    })}
                  />
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}
      </article>

      <DownloadCtaSection />
    </div>
  );
}
