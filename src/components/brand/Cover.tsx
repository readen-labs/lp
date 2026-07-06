import Image from 'next/image';

import {
  COVER_ASPECT_RATIO,
  COVER_BORDER,
  COVER_PLACEHOLDER_BG,
  getCoverGlow,
  getCoverHeight,
  getCoverRadius,
  getCoverShadow,
} from '@/lib/constants/cover';

export type CoverProps = {
  src?: string;
  alt: string;
  width: number;
  glow?: boolean;
  priority?: boolean;
  textured?: boolean;
  idle?: boolean;
  idleDelay?: number;
  className?: string;
};

export const Cover = ({
  src,
  alt,
  width,
  glow = false,
  priority = false,
  textured = true,
  idle = true,
  idleDelay = 0,
  className = '',
}: CoverProps) => {
  const height = getCoverHeight(width);
  const radius = getCoverRadius(width);
  const shadow = glow
    ? `${getCoverShadow(width)}, ${getCoverGlow(width)}`
    : getCoverShadow(width);

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${idle ? 'cover-idle' : ''} ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: COVER_PLACEHOLDER_BG,
        boxShadow: shadow,
        aspectRatio: String(COVER_ASPECT_RATIO),
        ...(idle && idleDelay
          ? { ['--idle-delay' as string]: `${idleDelay}s` }
          : {}),
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${Math.ceil(width)}px`}
          className="object-cover"
          priority={priority}
        />
      ) : null}
      {textured ? (
        <Image
          src="/images/cover-texture.png"
          alt=""
          fill
          sizes={`${Math.ceil(width)}px`}
          className="pointer-events-none select-none"
          style={{ objectFit: 'fill' }}
          priority={false}
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          border: COVER_BORDER,
        }}
        aria-hidden
      />
      {idle ? <div className="cover-sheen" aria-hidden /> : null}
    </div>
  );
};
