import { ImageResponse } from 'next/og';

import { BRAND_NAME } from '@/lib/config';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export const OG_IMAGE_CONTENT_TYPE = 'image/png';

const SPINES = [
  { width: 26, height: 120, lean: 0 },
  { width: 38, height: 98, lean: 0 },
  { width: 30, height: 138, lean: 0 },
  { width: 28, height: 118, lean: 8 },
];

export type OpenGraphImageContentProps = {
  tagline: string;
};

export const OpenGraphImageContent = ({
  tagline,
}: OpenGraphImageContentProps) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'radial-gradient(800px 400px at 50% -50px, rgba(16,185,129,0.14), transparent 70%), #f1f1f1',
      padding: 48,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 8,
        width: 240,
        height: 240,
        background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
        borderRadius: 54,
        paddingBottom: 46,
        boxShadow: '0 30px 60px -20px rgba(16,185,129,0.45)',
        marginBottom: 44,
      }}
    >
      {SPINES.map((spine, index) => (
        <div
          key={index}
          style={{
            width: spine.width,
            height: spine.height,
            background: '#ffffff',
            borderRadius: 12,
            transform: `rotate(${spine.lean}deg)`,
            transformOrigin: 'bottom left',
          }}
        />
      ))}
    </div>
    <div
      style={{
        fontSize: 84,
        fontWeight: 700,
        color: '#000',
        fontFamily: 'serif',
        letterSpacing: -2,
      }}
    >
      {BRAND_NAME}
    </div>
    <div style={{ fontSize: 30, color: 'rgba(0,0,0,0.55)', marginTop: 14 }}>
      {tagline}
    </div>
  </div>
);

export const createOpenGraphImage = (tagline: string) =>
  new ImageResponse(<OpenGraphImageContent tagline={tagline} />, {
    ...OG_IMAGE_SIZE,
  });
