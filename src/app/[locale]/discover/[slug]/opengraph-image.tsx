import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getFigure, getAllFigureSlugs } from '@/lib/figures';
import {
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
  createArticleOpenGraphImage,
} from '@/components/og/open-graph-image';

export const alt = 'Readen';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

type DiscoverFigureOpenGraphImageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = () => {
  const slugs = getAllFigureSlugs();

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
};

export default async function DiscoverFigureOpenGraphImage({
  params,
}: DiscoverFigureOpenGraphImageProps) {
  const { locale, slug } = await params;
  const figure = getFigure(slug, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'discoverDirectory' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return createArticleOpenGraphImage({
    title: figure?.name ?? tMeta('siteName'),
    overline: t('overline'),
  });
}
