'use client';

import { useEffect, useRef } from 'react';

export type RevealProps = {
  children: React.ReactNode;
  /** Transition delay in ms, for staggering siblings. */
  delay?: number;
  /** Adds a slight scale-up to the entrance. */
  scale?: boolean;
  className?: string;
};

const THRESHOLD = 0.15;
const ROOT_MARGIN = '0px 0px -8% 0px';

export const Reveal = ({
  children,
  delay = 0,
  scale = false,
  className = '',
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${scale ? 'reveal-scale' : ''} ${className}`}
      style={
        delay
          ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
};
