'use client';

import { useId } from 'react';

import { BRAND_NAME } from '@/lib/config';

export type LogoMarkProps = {
  size?: number;
  variant?: 'tile' | 'mono';
  className?: string;
};

export const LogoMark = ({
  size = 28,
  variant = 'tile',
  className = '',
}: LogoMarkProps) => {
  const uid = useId().replace(/:/g, '');
  const maskId = variant === 'tile' ? `rdn-mark-tile-${uid}` : `rdn-mark-mono-${uid}`;
  const gradientId = `rdn-tile-bg-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {variant === 'tile' ? (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="11" fill={`url(#${gradientId})`} />
        </>
      ) : null}
      <defs>
        <mask id={maskId}>
          <rect width="48" height="48" fill="black" />
          <rect x="7.5" y="12.5" width="6" height="25.5" rx="2.8" fill="white" />
          <rect x="15.6" y="17.4" width="8.4" height="20.6" rx="2.8" fill="white" />
          <rect x="25.9" y="9" width="6.8" height="29" rx="2.8" fill="white" />
          <rect
            x="33.6"
            y="13.4"
            width="6.4"
            height="25.4"
            rx="2.8"
            fill="white"
            transform="rotate(7 36.8 26.1)"
          />
          <rect x="17.7" y="20.5" width="4.4" height="2.1" rx="1.05" fill="black" />
          <rect x="17.7" y="32.9" width="4.4" height="2.1" rx="1.05" fill="black" />
        </mask>
      </defs>
      <rect
        width="48"
        height="48"
        fill={variant === 'tile' ? '#ffffff' : 'currentColor'}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
};

export type LogoProps = {
  markSize?: number;
  variant?: 'tile' | 'mono';
  wordmark?: boolean;
  className?: string;
};

const LOGO_WORDMARK_SIZE_RATIO = 0.78;

export const Logo = ({
  markSize = 28,
  variant = 'tile',
  wordmark = true,
  className = '',
}: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark size={markSize} variant={variant} />
    {wordmark ? (
      <span
        className="font-serif font-bold tracking-tight"
        style={{ fontSize: markSize * LOGO_WORDMARK_SIZE_RATIO }}
      >
        {BRAND_NAME}
      </span>
    ) : null}
  </span>
);
