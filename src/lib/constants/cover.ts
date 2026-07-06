/* Width/height ratio of every book cover — the goodbooks hardcover texture's
   intrinsic 329×494, shared by art, texture, and layout boxes exactly like
   the app (src/utils/constants.ts in the readen repo). */
export const COVER_ASPECT_RATIO = 329 / 494;

export const COVER_RADIUS_RATIO = 0.015;

export const COVER_RADIUS_MIN_PX = 2;

export const COVER_RADIUS_MAX_PX = 4;

export const COVER_PLACEHOLDER_BG = '#e8e8e8';

export const COVER_BORDER = '1px solid rgba(0,0,0,0.06)';

/* Real shadows converge to ambient gray, not black — matches the app. */
export const COVER_SHADOW_COLOR = 'rgba(138,138,138,0.2)';

export const COVER_GLOW_COLOR = 'rgba(16,185,129,0.28)';

export const COVER_SHADOW_OFFSET_Y_RATIO = 0.14;

export const COVER_SHADOW_BLUR_RATIO = 0.16;

export const COVER_SHADOW_SPREAD_RATIO = -0.08;

export const COVER_GLOW_BLUR_RATIO = 0.22;

export const COVER_GLOW_SPREAD_RATIO = 0.04;

export const getCoverRadius = (width: number): number =>
  Math.min(
    COVER_RADIUS_MAX_PX,
    Math.max(COVER_RADIUS_MIN_PX, width * COVER_RADIUS_RATIO),
  );

export const getCoverShadow = (width: number): string => {
  const offsetY = width * COVER_SHADOW_OFFSET_Y_RATIO;
  const blur = width * COVER_SHADOW_BLUR_RATIO;
  const spread = width * COVER_SHADOW_SPREAD_RATIO;

  return `0 ${offsetY}px ${blur}px ${spread}px ${COVER_SHADOW_COLOR}`;
};

export const getCoverGlow = (width: number): string => {
  const blur = width * COVER_GLOW_BLUR_RATIO;
  const spread = width * COVER_GLOW_SPREAD_RATIO;

  return `0 0 ${blur}px ${spread}px ${COVER_GLOW_COLOR}`;
};

export const getCoverHeight = (width: number): number =>
  Math.round(width / COVER_ASPECT_RATIO);
