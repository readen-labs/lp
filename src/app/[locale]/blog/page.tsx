import { getTranslations, setRequestLocale } from 'next-intl/server';

import { BlogCoverPanel } from '@/components/blog/BlogCoverPanel';
import { BlogPostMeta } from '@/components/blog/BlogPostMeta';
import { BlogTagChip } from '@/components/blog/BlogTagChip';
import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';

import { Link } from '@/i18n/navigation';

import {
  BLOG_FEATURED_COVER_WIDTH,
  BLOG_LIST_COVER_WIDTH,
} from '@/lib/constants/blog';
import { getAllBlogPosts } from '@/lib/mdx';
import { buildMetadata } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

const FEATURED_TITLE_CLAMP = 'clamp(1.6rem, 3vw, 2.4rem)';

const LIST_REVEAL_STAGGER_MS = 100;

export const generateMetadata = async ({ params }: BlogPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: `${t('blogTitle')} · ${t('siteName')}`,
    description: t('siteDescription'),
    path: '/blog',
    siteName: t('siteName'),
  });
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const posts = getAllBlogPosts(locale as Locale);
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-24">
      <EditorialHeader
        overline={t('overline')}
        title={t('title')}
        headingLevel="h1"
      />

      {featured ? (
        <Reveal className="mt-14">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-card shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:grid-cols-2"
          >
            <BlogCoverPanel
              post={featured}
              coverWidth={BLOG_FEATURED_COVER_WIDTH}
              className="min-h-[260px] py-12"
            />
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-2">
                {featured.tags.map((tag) => (
                  <BlogTagChip key={tag} tag={tag} />
                ))}
              </div>
              <h2
                className="display"
                style={{ fontSize: FEATURED_TITLE_CLAMP }}
              >
                {featured.title}
              </h2>
              <p className="leading-relaxed text-foreground/60">
                {featured.description}
              </p>
              <div className="flex items-center justify-between">
                <BlogPostMeta
                  post={featured}
                  locale={locale}
                  minRead={t('minRead', { minutes: featured.readingMinutes })}
                />
                <span className="text-sm font-semibold text-primary-deep transition-transform duration-300 group-hover:translate-x-1">
                  {t('readMore')} →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * LIST_REVEAL_STAGGER_MS}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(0,0,0,0.35)]"
              >
                <BlogCoverPanel
                  post={post}
                  coverWidth={BLOG_LIST_COVER_WIDTH}
                  className="h-48"
                />
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <BlogTagChip key={tag} tag={tag} />
                    ))}
                  </div>
                  <h3 className="font-serif text-xl leading-snug font-semibold tracking-tight">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-foreground/60">
                    {post.description}
                  </p>
                  <div className="mt-auto">
                    <BlogPostMeta
                      post={post}
                      locale={locale}
                      minRead={t('minRead', { minutes: post.readingMinutes })}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}
