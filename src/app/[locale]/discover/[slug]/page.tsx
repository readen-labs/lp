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
  buildProfilePageJsonLd,
  buildPageBreadcrumbJsonLd,
} from '@/lib/seo';
import {
  getFigure,
  getAllIndustries,
  getTopFigureSlugs,
  getFigureBooksPage,
} from '@/lib/figures';
import {
  DISCOVER_BIO_TRUNCATE_LENGTH,
  DISCOVER_STATIC_FIGURE_LIMIT,
  DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
} from '@/constants/discover';

type DiscoverFigurePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const CURRENT_PAGE = 1;

/* Figure count keeps growing with every Supabase sync (~1.7k and rising).
   Prerendering all of them x locale was part of what pushed this build to
   ~16k static routes and made the Vercel deploy step fail with "Maximum
   call stack size exceeded". Prebuild only the most-recommended figures
   for fast first paint / SEO; the rest render on demand and are cached
   after their first visit — see the matching change in
   discover/book/[id]/page.tsx and discover/[slug]/opengraph-image.tsx. */
export const generateStaticParams = () => {
  const slugs = getTopFigureSlugs(DISCOVER_STATIC_FIGURE_LIMIT);

  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
};

export const generateMetadata = async ({ params }: DiscoverFigurePageProps) => {
  const { locale, slug } = await params;
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
    path: `/discover/${slug}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverFigurePage({
  params,
}: DiscoverFigurePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverFigure');
  const tDirectory = await getTranslations('discoverDirectory');
  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');

  const figureWithBooks = getFigure(slug, locale as Locale);
  const page = getFigureBooksPage(
    slug,
    locale as Locale,
    CURRENT_PAGE,
    DISCOVER_FIGURE_BOOKS_PAGE_SIZE,
  );

  if (!figureWithBooks || !page) {
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

  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(
    locale as Locale,
    tNav('home'),
    [
      { name: tNav('discover'), path: '/discover' },
      { name: figureWithBooks.name, url },
    ],
  );

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
        currentPage={CURRENT_PAGE}
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
          page: CURRENT_PAGE,
          total: page.totalPages,
        })}
      />

      <DownloadCtaSection />
    </div>
  );
}
