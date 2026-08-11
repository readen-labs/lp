import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/reveal';
import { Cover } from '@/components/brand/cover';
import { EditorialHeader } from '@/components/brand/editorial-header';
import { DiscoverPagination } from '@/components/marketing/discover-pagination';
import {
  DISCOVER_BOOK_COVER_WIDTH,
  DISCOVER_FIGURE_HERO_AVATAR_SIZE,
} from '@/constants/discover';

import type { DiscoverFigureProfileProps } from './discover-figure-profile.types';

const REVEAL_DELAY_TITLE_MS = 80;

const REVEAL_DELAY_BIO_MS = 120;

export const DiscoverFigureProfile = ({
  figure,
  books,
  totalBooks,
  currentPage,
  totalPages,
  industrySlugByName,
  siteName,
  homeLabel,
  discoverLabel,
  breadcrumbLabel,
  booksOverline,
  booksTitle,
  backToDiscoverLabel,
  paginationPrevLabel,
  paginationNextLabel,
  paginationPageLabel,
}: DiscoverFigureProfileProps) => (
  <div>
    <article className="mx-auto max-w-3xl px-5 pt-14 pb-10">
      <nav
        aria-label={breadcrumbLabel}
        className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground/45"
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          {homeLabel}
        </Link>
        <span aria-hidden>/</span>
        <Link
          href="/discover"
          className="transition-colors hover:text-foreground"
        >
          {discoverLabel}
        </Link>
        <span aria-hidden>/</span>
        <span className="max-w-[16rem] truncate text-foreground/60">
          {figure.name}
        </span>
      </nav>

      <header className="mt-8 text-center">
        <Reveal>
          <Image
            src={figure.avatarUrl ?? ''}
            alt={figure.name}
            width={DISCOVER_FIGURE_HERO_AVATAR_SIZE}
            height={DISCOVER_FIGURE_HERO_AVATAR_SIZE}
            unoptimized
            className="mx-auto rounded-full bg-background"
          />
        </Reveal>
        <Reveal delay={REVEAL_DELAY_TITLE_MS}>
          <EditorialHeader
            overline={siteName}
            title={figure.name}
            align="center"
            headingLevel="h1"
          />
        </Reveal>
        {figure.title ? (
          <p className="mt-2 text-lg text-foreground/60">{figure.title}</p>
        ) : null}
        {figure.industries.length > 0 ? (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {figure.industries.map((industry) => {
              const industrySlug = industrySlugByName.get(industry);

              return industrySlug ? (
                <Link
                  key={industry}
                  href={`/discover/industry/${industrySlug}`}
                  className="rounded-full bg-card px-4 py-1.5 text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
                >
                  {industry}
                </Link>
              ) : null;
            })}
          </div>
        ) : null}
      </header>

      {figure.bio ? (
        <Reveal delay={REVEAL_DELAY_BIO_MS} className="mt-10">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-foreground/70">
            {figure.bio}
          </p>
        </Reveal>
      ) : null}
    </article>

    {totalBooks > 0 ? (
      <Reveal className="mt-4">
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <EditorialHeader
            overline={booksOverline}
            title={booksTitle}
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book) => (
              <a
                key={book.id}
                href={`https://openlibrary.org/isbn/${book.isbn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-transform duration-300 hover:scale-[1.04]"
              >
                <Cover
                  src={book.cover ?? undefined}
                  alt={book.title}
                  width={DISCOVER_BOOK_COVER_WIDTH}
                  glow
                />
              </a>
            ))}
          </div>
          <DiscoverPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/discover/${figure.slug}`}
            prevLabel={paginationPrevLabel}
            nextLabel={paginationNextLabel}
            pageLabel={paginationPageLabel}
          />
        </section>
      </Reveal>
    ) : null}

    <div className="mx-auto max-w-3xl px-5 pb-10 text-center">
      <Link
        href="/discover"
        className="text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
      >
        {backToDiscoverLabel}
      </Link>
    </div>
  </div>
);
