import fs from 'fs';
import path from 'path';

import type { Locale } from '@/i18n/routing';

export type DiscoverBook = {
  id: string;
  isbn: string;
  title: string;
  cover: string | null;
  publishedAt: string | null;
  pages: number | null;
  synopsis: string | null;
  authors: string[];
};

export type DiscoverFigure = {
  slug: string;
  name: string;
  title: string | null;
  avatarUrl: string | null;
  bio: string | null;
  industries: string[];
  bookIds: string[];
  recommendationCount: number;
};

export type DiscoverFigureWithBooks = DiscoverFigure & {
  books: DiscoverBook[];
};

export type DiscoverIndustry = {
  name: string;
  slug: string;
  figureCount: number;
};

export type DiscoverFiguresPage = {
  figures: DiscoverFigure[];
  totalPages: number;
};

type DiscoverBio = {
  slug: string;
  en: string;
  es: string;
  pt: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'src/content/discover');

const readJson = <T>(fileName: string): T => {
  const filePath = path.join(CONTENT_DIR, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(raw) as T;
};

/* Module-scope memoization, not React's cache() — this data is static,
   checked-in build content, and cache() only dedupes within a single
   render. generateStaticParams renders each of the ~16k discover pages as
   its own render, so cache() would re-read and re-parse the 6.3MB
   books.json on every single one. */
const memoize = <T>(compute: () => T): (() => T) => {
  let value: T | undefined;
  let hasValue = false;

  return () => {
    if (!hasValue) {
      value = compute();
      hasValue = true;
    }

    return value as T;
  };
};

export const getAllFigures = memoize((): DiscoverFigure[] => {
  const { figures } = readJson<{ figures: DiscoverFigure[] }>('figures.json');

  return figures;
});

export const getAllBooks = memoize((): DiscoverBook[] => {
  const { books } = readJson<{ books: DiscoverBook[] }>('books.json');

  return books;
});

export const getAllIndustries = memoize((): DiscoverIndustry[] => {
  const { industries } = readJson<{ industries: DiscoverIndustry[] }>(
    'industries.json',
  );

  return industries;
});

const getBooksById = memoize((): Map<string, DiscoverBook> => {
  return new Map(getAllBooks().map((book) => [book.id, book]));
});

const getBiosBySlug = memoize((): Map<string, DiscoverBio> => {
  const filePath = path.join(CONTENT_DIR, 'bios.json');

  if (!fs.existsSync(filePath)) {
    return new Map();
  }

  const { bios } = readJson<{ bios: DiscoverBio[] }>('bios.json');

  return new Map(bios.map((bio) => [bio.slug, bio]));
});

const resolveBio = (
  slug: string,
  fallbackBio: string | null,
  locale: Locale,
): string | null => {
  const bio = getBiosBySlug().get(slug);

  if (!bio) {
    return fallbackBio;
  }

  return bio[locale] || bio.en || fallbackBio;
};

export const getFigure = (
  slug: string,
  locale: Locale,
): DiscoverFigureWithBooks | null => {
  const figure = getAllFigures().find((item) => item.slug === slug);

  if (!figure) {
    return null;
  }

  const booksById = getBooksById();
  const books = figure.bookIds
    .map((bookId) => booksById.get(bookId))
    .filter((book): book is DiscoverBook => Boolean(book));

  return {
    ...figure,
    bio: resolveBio(figure.slug, figure.bio, locale),
    books,
  };
};

export const getAllFigureSlugs = (): string[] =>
  getAllFigures().map((figure) => figure.slug);

export const getTopFigureSlugs = (limit: number): string[] =>
  [...getAllFigures()]
    .sort((a, b) => b.recommendationCount - a.recommendationCount)
    .slice(0, limit)
    .map((figure) => figure.slug);

export type DiscoverFigureBooksPage = {
  figure: DiscoverFigure;
  books: DiscoverBook[];
  totalBooks: number;
  totalPages: number;
};

const paginate = <T>(items: T[], pageNumber: number, pageSize: number): T[] => {
  const start = (pageNumber - 1) * pageSize;

  return items.slice(start, start + pageSize);
};

const totalPagesFor = (itemCount: number, pageSize: number): number =>
  Math.max(1, Math.ceil(itemCount / pageSize));

export const getTotalDiscoverPages = (pageSize: number): number =>
  totalPagesFor(getAllFigures().length, pageSize);

export const getFigureBooksPage = (
  slug: string,
  locale: Locale,
  pageNumber: number,
  pageSize: number,
): DiscoverFigureBooksPage | null => {
  const figureWithBooks = getFigure(slug, locale);

  if (!figureWithBooks) {
    return null;
  }

  const { books: allBooks, ...figure } = figureWithBooks;

  return {
    books: paginate(allBooks, pageNumber, pageSize),
    figure,
    totalBooks: allBooks.length,
    totalPages: totalPagesFor(allBooks.length, pageSize),
  };
};

export const getFiguresPage = (
  pageNumber: number,
  pageSize: number,
): DiscoverFiguresPage => {
  const figures = getAllFigures();

  return {
    figures: paginate(figures, pageNumber, pageSize),
    totalPages: totalPagesFor(figures.length, pageSize),
  };
};

export const getIndustryBySlug = (
  industrySlug: string,
): DiscoverIndustry | null =>
  getAllIndustries().find((industry) => industry.slug === industrySlug) ?? null;

export const getFiguresByIndustry = (
  industrySlug: string,
  pageNumber: number,
  pageSize: number,
): DiscoverFiguresPage | null => {
  const industry = getIndustryBySlug(industrySlug);

  if (!industry) {
    return null;
  }

  const figures = getAllFigures().filter((figure) =>
    figure.industries.includes(industry.name),
  );

  return {
    figures: paginate(figures, pageNumber, pageSize),
    totalPages: totalPagesFor(figures.length, pageSize),
  };
};

export const getBook = (id: string): DiscoverBook | null =>
  getBooksById().get(id) ?? null;

export const getAllBookIds = (): string[] =>
  getAllBooks().map((book) => book.id);

export const getBookRecommenders = (bookId: string): DiscoverFigure[] =>
  getAllFigures().filter((figure) => figure.bookIds.includes(bookId));

export const getFeaturedFigures = (slugs: string[]): DiscoverFigure[] => {
  const bySlug = new Map(
    getAllFigures().map((figure) => [figure.slug, figure]),
  );

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((figure): figure is DiscoverFigure => Boolean(figure));
};
