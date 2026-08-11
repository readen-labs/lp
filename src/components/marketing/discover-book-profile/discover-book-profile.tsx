import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/reveal';
import { Cover } from '@/components/brand/cover';
import type { DiscoverFigure } from '@/lib/figures';
import { EditorialHeader } from '@/components/brand/editorial-header';
import { DISCOVER_BOOK_HERO_COVER_WIDTH } from '@/constants/discover';
import { DiscoverFigureCard } from '@/components/marketing/discover-figure-card';

import type { DiscoverBookProfileProps } from './discover-book-profile.types';

const REVEAL_DELAY_TITLE_MS = 80;

const REVEAL_DELAY_SYNOPSIS_MS = 120;

const RECOMMENDER_LABEL_INDUSTRY_COUNT = 2;

const recommenderLabel = (figure: DiscoverFigure): string =>
  figure.industries.length > 0
    ? figure.industries.slice(0, RECOMMENDER_LABEL_INDUSTRY_COUNT).join(' · ')
    : (figure.title ?? '');

export const DiscoverBookProfile = ({
  book,
  recommenders,
  homeLabel,
  discoverLabel,
  breadcrumbLabel,
  byAuthorLabel,
  recommendedByOverline,
  recommendedByTitle,
  backToDiscoverLabel,
}: DiscoverBookProfileProps) => (
  <div>
    <article className="mx-auto max-w-4xl px-5 pt-14 pb-10">
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
          {book.title}
        </span>
      </nav>

      <div className="mt-10 grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
        <Reveal>
          <Cover
            src={book.cover ?? undefined}
            alt={book.title}
            width={DISCOVER_BOOK_HERO_COVER_WIDTH}
            glow
            className="mx-auto md:mx-0"
          />
        </Reveal>

        <div>
          <Reveal delay={REVEAL_DELAY_TITLE_MS}>
            <EditorialHeader
              overline={discoverLabel}
              title={book.title}
              headingLevel="h1"
            />
          </Reveal>
          {byAuthorLabel ? (
            <p className="mt-2 text-lg text-foreground/60">{byAuthorLabel}</p>
          ) : null}

          {book.synopsis ? (
            <Reveal delay={REVEAL_DELAY_SYNOPSIS_MS} className="mt-6">
              <p className="max-w-xl text-lg leading-relaxed text-foreground/70">
                {book.synopsis}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </article>

    {recommenders.length > 0 ? (
      <Reveal className="mt-4">
        <section className="mx-auto max-w-3xl px-5 pb-20">
          <EditorialHeader
            overline={recommendedByOverline}
            title={recommendedByTitle}
            align="center"
          />
          <div className="mt-10 grid gap-2 sm:grid-cols-2">
            {recommenders.map((figure) => (
              <DiscoverFigureCard
                key={figure.slug}
                figure={figure}
                recommendationLabel={recommenderLabel(figure)}
              />
            ))}
          </div>
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
