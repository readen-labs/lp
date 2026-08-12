import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { truncateAtWordBoundary } from '@/utils/truncate-text';
import { DISCOVER_BIO_TRUNCATE_LENGTH } from '@/constants/discover';
import { getBook, getAllBookIds, getBookRecommenders } from '@/lib/figures';
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

export const generateStaticParams = () => {
  const ids = getAllBookIds();

  return routing.locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
};

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
