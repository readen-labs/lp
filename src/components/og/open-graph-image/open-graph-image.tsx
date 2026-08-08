import { ImageResponse } from 'next/og';

import { loadOgFonts } from '@/lib/og-fonts';
import { BRAND_NAME } from '@/constants/config';
import {
  BRAND_BLACK,
  BRAND_WHITE,
  BRAND_PRIMARY,
  BRAND_PRIMARY_DEEP,
  BRAND_PRIMARY_LIGHT,
} from '@/constants/brand-colors';

import type {
  OpenGraphImageContentProps,
  OpenGraphArticleContentProps,
} from './open-graph-image.types';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export const OG_IMAGE_CONTENT_TYPE = 'image/png';

const OG_BACKGROUND =
  'radial-gradient(800px 400px at 50% -50px, rgba(16,185,129,0.14), transparent 70%), #f1f1f1';

const SPINES = [
  { width: 26, height: 120, lean: 0 },
  { width: 38, height: 98, lean: 0 },
  { width: 30, height: 138, lean: 0 },
  { width: 28, height: 118, lean: 8 },
];

const MARK_SCALE_SMALL = 0.4;

const BrandMark = ({ scale = 1 }: { scale?: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 8 * scale,
      width: 240 * scale,
      height: 240 * scale,
      background: `linear-gradient(180deg, ${BRAND_PRIMARY_LIGHT} 0%, ${BRAND_PRIMARY} 100%)`,
      borderRadius: 54 * scale,
      paddingBottom: 46 * scale,
      boxShadow: '0 30px 60px -20px rgba(16,185,129,0.45)',
    }}
  >
    {SPINES.map((spine, index) => (
      <div
        key={index}
        style={{
          width: spine.width * scale,
          height: spine.height * scale,
          background: BRAND_WHITE,
          borderRadius: 12 * scale,
          transform: `rotate(${spine.lean}deg)`,
          transformOrigin: 'bottom left',
        }}
      />
    ))}
  </div>
);

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
      background: OG_BACKGROUND,
      padding: 48,
      fontFamily: 'Lora',
    }}
  >
    <div style={{ display: 'flex', marginBottom: 44 }}>
      <BrandMark />
    </div>
    <div
      style={{
        fontSize: 84,
        fontWeight: 600,
        color: BRAND_BLACK,
        letterSpacing: -2,
      }}
    >
      {BRAND_NAME}
    </div>
    <div
      style={{
        fontSize: 30,
        fontWeight: 400,
        color: 'rgba(0,0,0,0.55)',
        marginTop: 14,
      }}
    >
      {tagline}
    </div>
  </div>
);

export const OpenGraphArticleContent = ({
  title,
  overline,
}: OpenGraphArticleContentProps) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: OG_BACKGROUND,
      padding: 72,
      fontFamily: 'Lora',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          width: 48,
          height: 2,
          background: 'rgba(5,150,105,0.6)',
        }}
      />
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: BRAND_PRIMARY_DEEP,
        }}
      >
        {overline}
      </div>
    </div>
    <div
      style={{
        fontSize: 64,
        fontWeight: 600,
        color: BRAND_BLACK,
        letterSpacing: -1.5,
        lineHeight: 1.12,
        maxWidth: 1000,
      }}
    >
      {title}
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <BrandMark scale={MARK_SCALE_SMALL} />
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          color: BRAND_BLACK,
          letterSpacing: -0.5,
        }}
      >
        {BRAND_NAME}
      </div>
    </div>
  </div>
);

export const createOpenGraphImage = async (tagline: string) =>
  new ImageResponse(<OpenGraphImageContent tagline={tagline} />, {
    ...OG_IMAGE_SIZE,
    fonts: await loadOgFonts(),
  });

export const createArticleOpenGraphImage = async ({
  title,
  overline,
}: OpenGraphArticleContentProps) =>
  new ImageResponse(
    <OpenGraphArticleContent title={title} overline={overline} />,
    {
      ...OG_IMAGE_SIZE,
      fonts: await loadOgFonts(),
    },
  );
