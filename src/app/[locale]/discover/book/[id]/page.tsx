import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { getBook, getBookRecommenders } from '@/lib/figures';
import { truncateAtWordBoundary } from '@/utils/truncate-text';
import { DISCOVER_BIO_TRUNCATE_LENGTH } from '@/constants/discover';
import { DownloadCtaSection } from '@/components/marketing/download-cta-section';
import { DiscoverBookProfile } from '@/components/marketing/discover-book-profile';
import {
  buildMetadata,
  buildBookJsonLd,
  buildPageBreadcrumbJsonLd,
} from '@/lib/seo';

type DiscoverBookPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

/* Book detail pages number in the tens of thousands (one per book x
   locale) and keep growing with every Supabase sync. Prerendering all of
   them blew past what the Vercel build/deploy pipeline can handle for a
   single site (build produced ~16k routes and the deploy step failed with
   "Maximum call stack size exceeded"). Render on demand instead — Next
   statically caches each page after its first visit — and let the sitemap
   keep driving crawlers to them. */
export const generateStaticParams = () => [];

export const generateMetadata = async ({ params }: DiscoverBookPageProps) => {
  const { locale, id } = await params;
  const book = getBook(id);

  if (!book) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'discoverBook' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  const author = book.authors.join(', ');

  return buildMetadata({
    locale: locale as Locale,
    title: t('metaTitle', { title: book.title }),
    description: t('metaDescription', {
      title: book.title,
      author,
      excerpt: truncateAtWordBoundary(
        book.synopsis ?? '',
        DISCOVER_BIO_TRUNCATE_LENGTH,
      ),
    }),
    path: `/discover/book/${id}`,
    siteName: meta('siteName'),
  });
};

export default async function DiscoverBookPage({
  params,
}: DiscoverBookPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('discoverBook');
  const tNav = await getTranslations('nav');

  const book = getBook(id);

  if (!book) {
    notFound();
  }

  const recommenders = getBookRecommenders(id);
  const url = buildLocalizedUrl(locale as Locale, `/discover/book/${id}`);

  const jsonLd = buildBookJsonLd({
    title: book.title,
    isbn: book.isbn,
    synopsis: book.synopsis,
    image: book.cover,
    url,
    locale: locale as Locale,
    authors: book.authors,
    pages: book.pages,
    recommenders: recommenders.map((figure) => ({
      name: figure.name,
      url: buildLocalizedUrl(locale as Locale, `/discover/${figure.slug}`),
    })),
  });

  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(
    locale as Locale,
    tNav('home'),
    [
      { name: tNav('discover'), path: '/discover' },
      { name: book.title, url },
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

      <DiscoverBookProfile
        book={book}
        recommenders={recommenders}
        homeLabel={tNav('home')}
        discoverLabel={tNav('discover')}
        breadcrumbLabel={t('breadcrumbLabel')}
        byAuthorLabel={
          book.authors.length > 0
            ? t('byAuthor', { author: book.authors.join(', ') })
            : null
        }
        recommendedByOverline={t('recommendedByOverline')}
        recommendedByTitle={t('recommendedByTitle', {
          count: recommenders.length,
        })}
        backToDiscoverLabel={t('backToDiscover')}
      />

      <DownloadCtaSection />
    </div>
  );
}
