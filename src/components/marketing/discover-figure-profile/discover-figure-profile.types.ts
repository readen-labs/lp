import type { DiscoverBook, DiscoverFigure } from '@/lib/figures';

export type DiscoverFigureProfileProps = {
  figure: DiscoverFigure;
  books: DiscoverBook[];
  totalBooks: number;
  currentPage: number;
  totalPages: number;
  industrySlugByName: Map<string, string>;
  siteName: string;
  homeLabel: string;
  discoverLabel: string;
  breadcrumbLabel: string;
  booksOverline: string;
  booksTitle: string;
  backToDiscoverLabel: string;
  paginationPrevLabel: string;
  paginationNextLabel: string;
  paginationPageLabel: string;
};
