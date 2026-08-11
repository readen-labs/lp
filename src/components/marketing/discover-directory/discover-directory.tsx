import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/reveal';
import { EditorialHeader } from '@/components/brand/editorial-header';
import { DiscoverPagination } from '@/components/marketing/discover-pagination';
import { DiscoverFigureCard } from '@/components/marketing/discover-figure-card';
import {
  DISCOVER_CARD_REVEAL_MAX_STEPS,
  DISCOVER_CARD_REVEAL_STAGGER_MS,
} from '@/constants/discover';

import type { DiscoverDirectoryProps } from './discover-directory.types';

const REVEAL_DELAY_BODY_MS = 80;

const chipClasses = (active: boolean): string =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    active
      ? 'bg-primary text-white'
      : 'bg-card text-foreground/60 hover:text-foreground'
  }`;

export const DiscoverDirectory = ({
  overline,
  title,
  body,
  figures,
  currentPage,
  totalPages,
  basePath,
  industries,
  activeIndustrySlug,
  industryAllLabel,
  recommendationLabel,
  paginationPrevLabel,
  paginationNextLabel,
  paginationPageLabel,
}: DiscoverDirectoryProps) => (
  <div>
    <section className="hero-wash px-5 pt-16 pb-10 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <EditorialHeader
            overline={overline}
            title={title}
            align="center"
            headingLevel="h1"
          />
        </Reveal>
        {body ? (
          <Reveal delay={REVEAL_DELAY_BODY_MS}>
            <p className="mt-5 text-lg text-foreground/60">{body}</p>
          </Reveal>
        ) : null}
      </div>
    </section>

    <div className="mx-auto max-w-6xl px-5 pb-28 md:pb-36">
      <nav
        aria-label={industryAllLabel}
        className="flex flex-wrap justify-center gap-2 pb-10"
      >
        <Link href="/discover" className={chipClasses(!activeIndustrySlug)}>
          {industryAllLabel}
        </Link>
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/discover/industry/${industry.slug}`}
            className={chipClasses(activeIndustrySlug === industry.slug)}
          >
            {industry.name}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {figures.map((figure, index) => (
          <Reveal
            key={figure.slug}
            delay={
              Math.min(index, DISCOVER_CARD_REVEAL_MAX_STEPS) *
              DISCOVER_CARD_REVEAL_STAGGER_MS
            }
            scale
          >
            <DiscoverFigureCard
              figure={figure}
              recommendationLabel={recommendationLabel(
                figure.recommendationCount,
              )}
            />
          </Reveal>
        ))}
      </div>

      <DiscoverPagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
        prevLabel={paginationPrevLabel}
        nextLabel={paginationNextLabel}
        pageLabel={paginationPageLabel}
      />
    </div>
  </div>
);
