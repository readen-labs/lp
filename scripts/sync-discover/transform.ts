import { slugify } from './slugify';
import type { DiscoverRawData } from './queries';

type DiscoverBookOutput = {
  id: string;
  isbn: string;
  title: string;
  cover: string | null;
  publishedAt: string | null;
  pages: number | null;
  synopsis: string | null;
  authors: string[];
};

type DiscoverFigureOutput = {
  slug: string;
  name: string;
  title: string | null;
  avatarUrl: string | null;
  bio: string | null;
  industries: string[];
  bookIds: string[];
  recommendationCount: number;
};

type DiscoverIndustryOutput = {
  name: string;
  slug: string;
  figureCount: number;
};

type DiscoverSnapshot = {
  figures: DiscoverFigureOutput[];
  books: DiscoverBookOutput[];
  industries: DiscoverIndustryOutput[];
};

const groupBy = <T, K>(items: T[], keyOf: (item: T) => K): Map<K, T[]> => {
  const grouped = new Map<K, T[]>();

  for (const item of items) {
    const key = keyOf(item);
    const bucket = grouped.get(key);

    if (bucket) {
      bucket.push(item);
    } else {
      grouped.set(key, [item]);
    }
  }

  return grouped;
};

const transformDiscoverData = (raw: DiscoverRawData): DiscoverSnapshot => {
  const authorNameById = new Map(
    raw.authors.map((author) => [author.id, author.name]),
  );
  const industryNameById = new Map(
    raw.industries.map((industry) => [industry.id, industry.name]),
  );
  const bookById = new Map(raw.books.map((book) => [book.id, book]));

  const authorIdsByBookId = groupBy(raw.bookAuthors, (row) => row.book_id);
  const industryIdsByFigureId = groupBy(
    raw.figureIndustries,
    (row) => row.figure_id,
  );
  const bookRowsByFigureId = groupBy(raw.bookFigures, (row) => row.figure_id);

  const referencedBookIds = new Set(raw.bookFigures.map((row) => row.book_id));

  const books: DiscoverBookOutput[] = [...referencedBookIds]
    .map((bookId) => bookById.get(bookId))
    .filter((book): book is NonNullable<typeof book> => Boolean(book))
    .map((book) => ({
      authors: (authorIdsByBookId.get(book.id) ?? [])
        .map((row) => authorNameById.get(row.author_id))
        .filter((name): name is string => Boolean(name)),
      cover: book.cover,
      id: book.id,
      isbn: book.isbn,
      pages: book.pages,
      publishedAt: book.published_at,
      synopsis: book.synopsis,
      title: book.title,
    }));

  const bookTitleById = new Map(books.map((book) => [book.id, book.title]));

  const industryFigureCounts = new Map<string, number>();

  const figures: DiscoverFigureOutput[] = raw.figures
    .map((figure) => {
      const bookIds = (bookRowsByFigureId.get(figure.id) ?? [])
        .map((row) => row.book_id)
        .filter((bookId) => referencedBookIds.has(bookId))
        .sort((a, b) =>
          (bookTitleById.get(a) ?? '').localeCompare(
            bookTitleById.get(b) ?? '',
          ),
        );

      const industries = (industryIdsByFigureId.get(figure.id) ?? [])
        .map((row) => industryNameById.get(row.industry_id))
        .filter((name): name is string => Boolean(name));

      for (const industry of industries) {
        industryFigureCounts.set(
          industry,
          (industryFigureCounts.get(industry) ?? 0) + 1,
        );
      }

      return {
        avatarUrl: figure.avatar_url,
        bio: figure.bio,
        bookIds,
        industries,
        name: figure.name,
        recommendationCount: bookIds.length,
        slug: figure.slug,
        title: figure.title,
      };
    })
    .filter((figure) => figure.bookIds.length > 0)
    .sort(
      (a, b) =>
        b.recommendationCount - a.recommendationCount ||
        a.name.localeCompare(b.name),
    );

  const industries: DiscoverIndustryOutput[] = raw.industries
    .map((industry) => ({
      figureCount: industryFigureCounts.get(industry.name) ?? 0,
      name: industry.name,
      slug: slugify(industry.name),
    }))
    .filter((industry) => industry.figureCount > 0)
    .sort(
      (a, b) => b.figureCount - a.figureCount || a.name.localeCompare(b.name),
    );

  return { books, figures, industries };
};

export type {
  DiscoverBookOutput,
  DiscoverFigureOutput,
  DiscoverIndustryOutput,
  DiscoverSnapshot,
};
export { transformDiscoverData };
