import { ImageResponse } from 'next/og';

import {
  BRAND_WHITE,
  BRAND_PRIMARY,
  BRAND_PRIMARY_LIGHT,
} from '@/constants/brand-colors';

export const size = { width: 180, height: 180 };

export const contentType = 'image/png';

/* The app icon mark at Apple touch-icon size — full-bleed emerald tile with
   white book spines; iOS applies its own corner mask. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 8,
        background: `linear-gradient(180deg, ${BRAND_PRIMARY_LIGHT} 0%, ${BRAND_PRIMARY} 100%)`,
        padding: '0 22px 39px 22px',
      }}
    >
      <div
        style={{
          width: 22,
          height: 96,
          background: BRAND_WHITE,
          borderRadius: 11,
        }}
      />
      <div
        style={{
          width: 34,
          height: 79,
          background: BRAND_WHITE,
          borderRadius: 11,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 0',
        }}
      >
        <div
          style={{
            width: 17,
            height: 8,
            background: BRAND_PRIMARY,
            borderRadius: 5,
          }}
        />
        <div
          style={{
            width: 17,
            height: 8,
            background: BRAND_PRIMARY,
            borderRadius: 5,
          }}
        />
      </div>
      <div
        style={{
          width: 28,
          height: 112,
          background: BRAND_WHITE,
          borderRadius: 11,
        }}
      />
      <div
        style={{
          width: 25,
          height: 96,
          background: BRAND_WHITE,
          borderRadius: 11,
          transform: 'rotate(8deg)',
          transformOrigin: 'bottom left',
        }}
      />
    </div>,
    { ...size },
  );
}
