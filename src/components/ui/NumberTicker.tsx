'use client';

import { useEffect, useRef, useState } from 'react';

export type NumberTickerProps = {
  value: number;
  locale?: string;
  durationMs?: number;
  decimals?: number;
  delayMs?: number;
  className?: string;
};

const DEFAULT_DURATION_MS = 1600;

const VIEW_THRESHOLD = 0.4;

const FINISH_BUFFER_MS = 120;

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

export const NumberTicker = ({
  value,
  locale,
  durationMs = DEFAULT_DURATION_MS,
  decimals = 0,
  delayMs = 0,
  className = '',
}: NumberTickerProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let frame = 0;
    let delayTimer = 0;
    let finishTimer = 0;

    const startAnimation = () => {
      setDisplay(0);
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / durationMs);
        setDisplay(easeOutCubic(progress) * value);

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
      finishTimer = window.setTimeout(
        () => setDisplay(value),
        durationMs + FINISH_BUFFER_MS,
      );
    };

    const scheduleAnimation = () => {
      if (document.visibilityState === 'hidden') {
        const onVisible = () => {
          if (document.visibilityState === 'visible') {
            document.removeEventListener('visibilitychange', onVisible);
            startAnimation();
          }
        };

        document.addEventListener('visibilitychange', onVisible);

        return () =>
          document.removeEventListener('visibilitychange', onVisible);
      }

      if (delayMs > 0) {
        delayTimer = window.setTimeout(startAnimation, delayMs);
      } else {
        startAnimation();
      }

      return undefined;
    };

    let removeVisibilityListener: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        removeVisibilityListener = scheduleAnimation();
      },
      { threshold: VIEW_THRESHOLD },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(delayTimer);
      window.clearTimeout(finishTimer);
      removeVisibilityListener?.();
    };
  }, [value, durationMs, delayMs]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(display)}
    </span>
  );
};
