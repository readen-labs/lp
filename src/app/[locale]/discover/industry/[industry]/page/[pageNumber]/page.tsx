import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { DISCOVER_PAGE_SIZE } from '@/constants/discover';
import { DiscoverDirectory } from '@/components/marketing/discover-directory';
import {
  getAllIndustries,
  getIndustryBySlug,
  getFiguresByIndustry,
} from '@/lib/figures';

type DiscoverIndustryPaginatedPageProps = {
  params: Promise<{ locale: string; industry: string; pageNumber: string }>;
};

export const generateStaticParams = () => {
  const industries = getAllIndustries();
  const paramsByLocale = industries.flatMap((industry) => {
    const result = getFiguresByIndustry(industry.slug, 1, DISCOVER_PAGE_SIZE);
    const totalPages = result?.totalPages ?? 1;

    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      industry: industry.slug,
      pageNumber: String(index + 2),
    }));
  });

  return routing.locales.flatMap((locale) =>
    paramsByLocale.map((entry) => ({ locale, ...entry })),
  );
};

export const generateMetadata = async ({
  params,
}: DiscoverIndustryPaginatedPageProps) => {
  const { locale, industry: industrySlug, pageNumber } = await params;
  const industry = getIndustryBySlug(industrySlug);

  if (!industry) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'discoverDirectory' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('industryMetaTitle', { industry: industry.name }),
    description: t('industryMetaDescription', {
      industry: industry.name,
      count: industry.figureCount,
    }),
    path: `/discover/industry/${industrySlug}/page/${pageNumber}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverIndustryPaginatedPage({
  params,
}: DiscoverIndustryPaginatedPageProps) {
  const {
    locale,
    industry: industrySlug,
    pageNumber: pageNumberParam,
  } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverDirectory');

  const pageNumber = Number(pageNumberParam);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const result = getFiguresByIndustry(
    industrySlug,
    pageNumber,
    DISCOVER_PAGE_SIZE,
  );
  const industry = getIndustryBySlug(industrySlug);

  if (!result || !industry || pageNumber > result.totalPages) {
    notFound();
  }

  const { figures, totalPages } = result;
  const industries = getAllIndustries();

  return (
    <DiscoverDirectory
      overline={t('overline')}
      title={t('industryTitle', { industry: industry.name })}
      figures={figures}
      currentPage={pageNumber}
      totalPages={totalPages}
      basePath={`/discover/industry/${industrySlug}`}
      industries={industries}
      activeIndustrySlug={industrySlug}
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
