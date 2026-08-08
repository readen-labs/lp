import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { getBlogPost, getAllBlogParams } from '@/lib/mdx';
import {
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
  createArticleOpenGraphImage,
} from '@/components/og/open-graph-image';

export const alt = 'Readen';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

type BlogPostOpenGraphImageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = () => getAllBlogParams();

export default async function BlogPostOpenGraphImage({
  params,
}: BlogPostOpenGraphImageProps) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return createArticleOpenGraphImage({
    title: post?.title ?? tMeta('siteName'),
    overline: t('overline'),
  });
}
