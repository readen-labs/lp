import Image from 'next/image';
import {
  Children,
  cloneElement,
  isValidElement,
} from 'react';

import {
  COVER_GAP,
  DRIFT_DURATION_S,
  KNOB_INSET,
  KNOB_SIZE,
  SHELF_BAR_HEIGHT,
  SHELF_BAR_INSET,
  SHELF_OVERHANG,
  SHELF_RADIUS,
  SHELF_STAND_HEIGHT,
} from '@/lib/constants/shelf';

export type ShelfProps = {
  children: React.ReactNode;
  drift?: boolean;
  driftDuration?: number;
  className?: string;
};

const DRIFT_ROW_SUFFIX_A = 'drift-a';

const DRIFT_ROW_SUFFIX_B = 'drift-b';

const cloneChildrenWithKeys = (
  children: React.ReactNode,
  suffix: string,
): React.ReactNode =>
  Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    return cloneElement(child, { key: `${suffix}-${index}` });
  });

const Ledge = () => (
  <div
    className="shelf-glass pointer-events-none absolute bottom-0 z-10"
    style={{
      left: SHELF_BAR_INSET,
      right: SHELF_BAR_INSET,
      height: SHELF_BAR_HEIGHT,
      borderRadius: SHELF_RADIUS,
    }}
    aria-hidden
  >
    <Image
      src="/images/metal-knob.png"
      alt=""
      width={KNOB_SIZE}
      height={KNOB_SIZE}
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: KNOB_INSET }}
    />
    <Image
      src="/images/metal-knob.png"
      alt=""
      width={KNOB_SIZE}
      height={KNOB_SIZE}
      className="absolute top-1/2 -translate-y-1/2"
      style={{ right: KNOB_INSET }}
    />
  </div>
);

export const Shelf = ({
  children,
  drift = false,
  driftDuration = DRIFT_DURATION_S,
  className = '',
}: ShelfProps) => {
  const rowStyle: React.CSSProperties = {
    gap: COVER_GAP,
    paddingTop: SHELF_OVERHANG,
    paddingBottom: SHELF_STAND_HEIGHT,
  };

  return (
    <div className={`relative ${className}`}>
      {drift ? (
        <div className="overflow-hidden">
          <div
            className="shelf-drift flex w-max items-end"
            style={{
              ...rowStyle,
              paddingRight: COVER_GAP,
              ['--drift-duration' as string]: `${driftDuration}s`,
            }}
          >
            {cloneChildrenWithKeys(children, DRIFT_ROW_SUFFIX_A)}
            <div
              className="flex items-end"
              style={{ gap: COVER_GAP }}
              aria-hidden
            >
              {cloneChildrenWithKeys(children, DRIFT_ROW_SUFFIX_B)}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="no-scrollbar flex items-end overflow-x-auto"
          style={rowStyle}
        >
          {children}
        </div>
      )}
      <Ledge />
    </div>
  );
};
