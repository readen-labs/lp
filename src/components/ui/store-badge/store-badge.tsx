import { cn } from '@/utils/cn';

import type { StoreBadgeProps } from './store-badge.types';

const BADGE = {
  ios: {
    src: '/assets/apple-button.svg',
    darkSrc: '/assets/apple-button-dark.svg',
    width: 958,
    height: 320,
  },
  android: {
    src: '/assets/google-play-badge.svg',
    darkSrc: '/assets/google-play-badge-dark.svg',
    width: 1080,
    height: 320,
  },
} as const;

export const StoreBadge = ({
  store,
  href,
  eyebrow,
  label,
  className = '',
}: StoreBadgeProps) => {
  const badge = BADGE[store];
  const alt = `${eyebrow} ${label}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex h-[3.5rem] w-auto shrink-0 items-center justify-center sm:h-[3.65rem] md:h-[4.65rem] lg:h-[4.9rem]',
        className,
      )}
    >
      <picture className="block h-full w-auto">
        <source media="(prefers-color-scheme: dark)" srcSet={badge.darkSrc} />
        <img
          src={badge.src}
          alt={alt}
          width={badge.width}
          height={badge.height}
          className="block h-full w-auto max-w-none transition-opacity duration-300 hover:opacity-80"
          decoding="async"
        />
      </picture>
    </a>
  );
};
