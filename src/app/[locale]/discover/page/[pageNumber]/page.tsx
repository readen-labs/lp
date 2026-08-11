import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { DISCOVER_PAGE_SIZE } from '@/constants/discover';
import { DiscoverDirectory } from '@/components/marketing/discover-directory';
import {
  getFiguresPage,
  getAllIndustries,
  getTotalDiscoverPages,
} from '@/lib/figures';

type DiscoverPaginatedPageProps = {
  params: Promise<{ locale: string; pageNumber: string }>;
};

export const generateStaticParams = () => {
  const totalPages = getTotalDiscoverPages(DISCOVER_PAGE_SIZE);
  const pageNumbers = Array.from({ length: totalPages - 1 }, (_, index) =>
    String(index + 2),
  );

  return routing.locales.flatMap((locale) =>
    pageNumbers.map((pageNumber) => ({ locale, pageNumber })),
  );
};

export const generateMetadata = async ({
  params,
}: DiscoverPaginatedPageProps) => {
  const { locale, pageNumber } = await params;
  const t = await getTranslations({ locale, namespace: 'discoverDirectory' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: `/discover/page/${pageNumber}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverPaginatedPage({
  params,
}: DiscoverPaginatedPageProps) {
  const { locale, pageNumber: pageNumberParam } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverDirectory');

  const pageNumber = Number(pageNumberParam);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const { figures, totalPages } = getFiguresPage(
    pageNumber,
    DISCOVER_PAGE_SIZE,
  );

  if (pageNumber > totalPages) {
    notFound();
  }

  const industries = getAllIndustries();

  return (
    <DiscoverDirectory
      overline={t('overline')}
      title={t('title')}
      body={t('body')}
      figures={figures}
      currentPage={pageNumber}
      totalPages={totalPages}
      basePath="/discover"
      industries={industries}
      industryAllLabel={t('industryAll')}
      recommendationLabel={(count) => t('recommendationCount', { count })}
      paginationPrevLabel={t('paginationPrev')}
      paginationNextLabel={t('paginationNext')}
      paginationPageLabel={t('paginationPageLabel', {
        page: pageNumber,
        total: totalPages,
      })}
    />
  );
}
