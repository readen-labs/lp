import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { DISCOVER_FIGURE_AVATAR_SIZE } from '@/constants/discover';

import type { DiscoverFigureCardProps } from './discover-figure-card.types';

export const DiscoverFigureCard = ({
  figure,
  recommendationLabel,
}: DiscoverFigureCardProps) => (
  <Link
    href={`/discover/${figure.slug}`}
    className="group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:bg-card/50"
  >
    <Image
      src={figure.avatarUrl ?? ''}
      alt={figure.name}
      width={DISCOVER_FIGURE_AVATAR_SIZE}
      height={DISCOVER_FIGURE_AVATAR_SIZE}
      unoptimized
      className="shrink-0 rounded-full bg-background"
    />
    <div className="min-w-0">
      <p className="line-clamp-2 font-serif font-semibold">{figure.name}</p>
      <p className="line-clamp-1 text-sm text-foreground/50">
        {recommendationLabel}
      </p>
    </div>
  </Link>
);
