import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { truncateAtWordBoundary } from '@/utils/truncate-text';
import { DownloadCtaSection } from '@/components/marketing/download-cta-section';
import { DiscoverFigureProfile } from '@/components/marketing/discover-figure-profile';
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildProfilePageJsonLd,
} from '@/lib/seo';
import {
  DISCOVER_BIO_TRUNCATE_LENGTH,
  DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
} from '@/constants/discover';
import {
  getFigure,
  getAllIndustries,
  getAllFigureSlugs,
  getFigureBooksPage,
} from '@/lib/figures';

type DiscoverFigurePaginatedPageProps = {
  params: Promise<{ locale: string; slug: string; pageNumber: string }>;
};

export const generateStaticParams = () => {
  const paramsBySlug = getAllFigureSlugs().flatMap((slug) => {
    const totalPages =
      getFigureBooksPage(
        slug,
        routing.defaultLocale,
        1,
        DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
      )?.totalPages ?? 1;

    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      slug,
      pageNumber: String(index + 2),
    }));
  });

  return routing.locales.flatMap((locale) =>
    paramsBySlug.map((entry) => ({ locale, ...entry })),
  );
};

export const generateMetadata = async ({
  params,
}: DiscoverFigurePaginatedPageProps) => {
  const { locale, slug, pageNumber } = await params;
  const figure = getFigure(slug, locale as Locale);

  if (!figure) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'discoverFigure' });
  const meta = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('metaTitle', { name: figure.name }),
    description: t('metaDescription', {
      name: figure.name,
      count: figure.books.length,
      excerpt: truncateAtWordBoundary(
        figure.bio ?? '',
        DISCOVER_BIO_TRUNCATE_LENGTH,
      ),
    }),
    path: `/discover/${slug}/page/${pageNumber}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverFigurePaginatedPage({
  params,
}: DiscoverFigurePaginatedPageProps) {
  const { locale, slug, pageNumber: pageNumberParam } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverFigure');
  const tDirectory = await getTranslations('discoverDirectory');
  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');

  const pageNumber = Number(pageNumberParam);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const figureWithBooks = getFigure(slug, locale as Locale);
  const page = getFigureBooksPage(
    slug,
    locale as Locale,
    pageNumber,
    DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
  );

  if (!figureWithBooks || !page || pageNumber > page.totalPages) {
    notFound();
  }

  const url = buildLocalizedUrl(locale as Locale, `/discover/${slug}`);
  const industrySlugByName = new Map(
    getAllIndustries().map((industry) => [industry.name, industry.slug]),
  );

  const jsonLd = buildProfilePageJsonLd({
    name: figureWithBooks.name,
    jobTitle: figureWithBooks.title,
    description: figureWithBooks.bio,
    image: figureWithBooks.avatarUrl,
    url,
    locale: locale as Locale,
    books: figureWithBooks.books.map((book) => ({
      title: book.title,
      isbn: book.isbn,
      image: book.cover,
      authors: book.authors,
      pages: book.pages,
    })),
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: buildLocalizedUrl(locale as Locale, '/') },
    {
      name: tNav('discover'),
      url: buildLocalizedUrl(locale as Locale, '/discover'),
    },
    { name: figureWithBooks.name, url },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <DiscoverFigureProfile
        figure={page.figure}
        books={page.books}
        totalBooks={page.totalBooks}
        currentPage={pageNumber}
        totalPages={page.totalPages}
        industrySlugByName={industrySlugByName}
        siteName={tMeta('siteName')}
        homeLabel={tNav('home')}
        discoverLabel={tNav('discover')}
        breadcrumbLabel={t('breadcrumbLabel')}
        booksOverline={t('booksOverline', { name: page.figure.name })}
        booksTitle={t('booksTitle', {
          count: page.totalBooks,
          name: page.figure.name,
        })}
        backToDiscoverLabel={t('backToDiscover')}
        paginationPrevLabel={tDirectory('paginationPrev')}
        paginationNextLabel={tDirectory('paginationNext')}
        paginationPageLabel={tDirectory('paginationPageLabel', {
          page: pageNumber,
          total: page.totalPages,
        })}
      />

      <DownloadCtaSection />
    </div>
  );
}
