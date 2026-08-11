import { Link } from '@/i18n/navigation';

import type { DiscoverPaginationProps } from './discover-pagination.types';

const pageHref = (basePath: string, page: number): string =>
  page === 1 ? basePath : `${basePath}/page/${page}`;

export const DiscoverPagination = ({
  currentPage,
  totalPages,
  basePath,
  prevLabel,
  nextLabel,
  pageLabel,
}: DiscoverPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label={pageLabel}
      className="mt-14 flex items-center justify-center gap-6"
    >
      {hasPrev ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
        >
          {prevLabel}
        </Link>
      ) : (
        <span className="text-sm font-semibold text-foreground/25">
          {prevLabel}
        </span>
      )}
      <span className="text-sm text-foreground/50">{pageLabel}</span>
      {hasNext ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
        >
          {nextLabel}
        </Link>
      ) : (
        <span className="text-sm font-semibold text-foreground/25">
          {nextLabel}
        </span>
      )}
    </nav>
  );
};
