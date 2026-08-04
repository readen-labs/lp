import { ImageResponse } from 'next/og';

import {
  BRAND_WHITE,
  BRAND_PRIMARY,
  BRAND_PRIMARY_LIGHT,
} from '@/constants/brand-colors';

export const size = { width: 32, height: 32 };

export const contentType = 'image/png';

/* The app icon mark: white book spines, one leaning, on the emerald tile. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 1.5,
        background: `linear-gradient(180deg, ${BRAND_PRIMARY_LIGHT} 0%, ${BRAND_PRIMARY} 100%)`,
        borderRadius: 7,
        padding: '0 4px 7px 4px',
      }}
    >
      <div
        style={{
          width: 4,
          height: 17,
          background: BRAND_WHITE,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 6,
          height: 14,
          background: BRAND_WHITE,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.5px 0',
        }}
      >
        <div
          style={{
            width: 3,
            height: 1.5,
            background: BRAND_PRIMARY,
            borderRadius: 1,
          }}
        />
        <div
          style={{
            width: 3,
            height: 1.5,
            background: BRAND_PRIMARY,
            borderRadius: 1,
          }}
        />
      </div>
      <div
        style={{
          width: 5,
          height: 20,
          background: BRAND_WHITE,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          width: 4.5,
          height: 17,
          background: BRAND_WHITE,
          borderRadius: 2,
          transform: 'rotate(8deg)',
          transformOrigin: 'bottom left',
        }}
      />
    </div>,
    { ...size },
  );
}
