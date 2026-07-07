import { Children, cloneElement, isValidElement } from 'react';

import { cn } from '@/lib/utils';

export type MarqueeProps = {
  children: React.ReactNode;
  durationS?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
};

const DEFAULT_DURATION_S = 60;

const DEFAULT_GAP = 20;

const withKeys = (children: React.ReactNode, suffix: string): React.ReactNode =>
  Children.map(children, (child, index) =>
    isValidElement(child) ? cloneElement(child, { key: `${suffix}-${index}` }) : child,
  );

export const Marquee = ({
  children,
  durationS = DEFAULT_DURATION_S,
  reverse = false,
  pauseOnHover = true,
  gap = DEFAULT_GAP,
  className = '',
}: MarqueeProps) => {
  const groupStyle: React.CSSProperties = { gap, paddingRight: gap };

  return (
    <div className={cn('marquee-mask overflow-hidden', className)}>
      <div
        className={cn('marquee-track flex w-max', pauseOnHover && 'marquee-pause-hover')}
        style={{
          ['--marquee-duration' as string]: `${durationS}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex items-stretch" style={groupStyle}>
          {withKeys(children, 'a')}
        </div>
        <div className="flex items-stretch" style={groupStyle} aria-hidden>
          {withKeys(children, 'b')}
        </div>
      </div>
    </div>
  );
};
