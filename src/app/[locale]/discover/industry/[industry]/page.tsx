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

type DiscoverIndustryPageProps = {
  params: Promise<{ locale: string; industry: string }>;
};

const CURRENT_PAGE = 1;

export const generateStaticParams = () => {
  const industries = getAllIndustries();

  return routing.locales.flatMap((locale) =>
    industries.map((industry) => ({ locale, industry: industry.slug })),
  );
};

export const generateMetadata = async ({
  params,
}: DiscoverIndustryPageProps) => {
  const { locale, industry: industrySlug } = await params;
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
    path: `/discover/industry/${industrySlug}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverIndustryPage({
  params,
}: DiscoverIndustryPageProps) {
  const { locale, industry: industrySlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverDirectory');

  const result = getFiguresByIndustry(
    industrySlug,
    CURRENT_PAGE,
    DISCOVER_PAGE_SIZE,
  );

  if (!result) {
    notFound();
  }

  const industry = getIndustryBySlug(industrySlug);

  if (!industry) {
    notFound();
  }

  const { figures, totalPages } = result;
  const industries = getAllIndustries();

  return (
    <DiscoverDirectory
      overline={t('overline')}
      title={t('industryTitle', { industry: industry.name })}
      figures={figures}
      currentPage={CURRENT_PAGE}
      totalPages={totalPages}
      basePath={`/discover/industry/${industrySlug}`}
      industries={industries}
      activeIndustrySlug={industrySlug}
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
