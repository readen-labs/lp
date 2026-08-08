import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import { Reveal } from '@/components/ui/reveal';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import { EditorialHeader } from '@/components/brand/editorial-header';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

const LIST_REVEAL_STAGGER_MS = 80;

export const generateMetadata = async ({ params }: BlogPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('blogTitle'),
    description: t('blogDescription'),
    path: '/blog',
    siteName: t('siteName'),
  });
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const posts = getAllBlogPosts(locale as Locale);

  return (
    <div>
      <section className="hero-wash px-5 pt-16 pb-10 md:pt-20 md:pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <EditorialHeader
              overline={t('overline')}
              title={t('title')}
              align="center"
              headingLevel="h1"
            />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-28 md:pb-36">
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * LIST_REVEAL_STAGGER_MS}>
              <BlogPostCard
                post={post}
                locale={locale}
                minRead={t('minRead', { minutes: post.readingMinutes })}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
