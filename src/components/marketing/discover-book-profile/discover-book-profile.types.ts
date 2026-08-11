import type { DiscoverBook, DiscoverFigure } from '@/lib/figures';

export type DiscoverBookProfileProps = {
  book: DiscoverBook;
  recommenders: DiscoverFigure[];
  homeLabel: string;
  discoverLabel: string;
  breadcrumbLabel: string;
  byAuthorLabel: string | null;
  recommendedByOverline: string;
  recommendedByTitle: string;
  backToDiscoverLabel: string;
};
