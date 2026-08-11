import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { DISCOVER_PAGE_SIZE } from '@/constants/discover';
import { getFiguresPage, getAllIndustries } from '@/lib/figures';
import { DiscoverDirectory } from '@/components/marketing/discover-directory';

type DiscoverPageProps = {
  params: Promise<{ locale: string }>;
};

const CURRENT_PAGE = 1;

export const generateMetadata = async ({ params }: DiscoverPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'discoverDirectory' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/discover',
    siteName: meta('siteName'),
  });
};

export default async function DiscoverPage({ params }: DiscoverPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverDirectory');

  const { figures, totalPages } = getFiguresPage(
    CURRENT_PAGE,
    DISCOVER_PAGE_SIZE,
  );
  const industries = getAllIndustries();

  return (
    <DiscoverDirectory
      overline={t('overline')}
      title={t('title')}
      body={t('body')}
      figures={figures}
      currentPage={CURRENT_PAGE}
      totalPages={totalPages}
      basePath="/discover"
      industries={industries}
      industryAllLabel={t('industryAll')}
      recommendationLabel={(count) => t('recommendationCount', { count })}
      paginationPrevLabel={t('paginationPrev')}
      paginationNextLabel={t('paginationNext')}
      paginationPageLabel={t('paginationPageLabel', {
        page: CURRENT_PAGE,
        total: totalPages,
      })}
    />
  );
}
