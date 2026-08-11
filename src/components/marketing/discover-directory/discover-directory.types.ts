import type { DiscoverFigure, DiscoverIndustry } from '@/lib/figures';

export type DiscoverDirectoryProps = {
  overline: string;
  title: string;
  body?: string;
  figures: DiscoverFigure[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  industries: DiscoverIndustry[];
  activeIndustrySlug?: string;
  industryAllLabel: string;
  recommendationLabel: (count: number) => string;
  paginationPrevLabel: string;
  paginationNextLabel: string;
  paginationPageLabel: string;
};
