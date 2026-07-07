'use client';

import { cn } from '@/lib/utils';

export type ShineBorderProps = React.HTMLAttributes<HTMLDivElement> & {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
};

const DEFAULT_BORDER_WIDTH = 1;

const DEFAULT_DURATION_S = 14;

const DEFAULT_SHINE_COLOR = '#000000';

export const ShineBorder = ({
  borderWidth = DEFAULT_BORDER_WIDTH,
  duration = DEFAULT_DURATION_S,
  shineColor = DEFAULT_SHINE_COLOR,
  className,
  style,
  ...props
}: ShineBorderProps) => {
  const colors = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;

  return (
    <div
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 'var(--border-width)',
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine',
        className,
      )}
      aria-hidden
      {...props}
    />
  );
};
