'use client';

import { useNumberTicker } from '@/hooks/use-number-ticker';

import type { NumberTickerProps } from './number-ticker.types';

const DEFAULT_DURATION_MS = 1600;

export const NumberTicker = ({
  value,
  locale,
  durationMs = DEFAULT_DURATION_MS,
  decimals = 0,
  delayMs = 0,
  className = '',
}: NumberTickerProps) => {
  const { ref, display } = useNumberTicker(value, durationMs, delayMs);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(display)}
    </span>
  );
};
