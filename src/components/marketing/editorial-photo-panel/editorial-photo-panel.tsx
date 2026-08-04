import Image from 'next/image';

import { MARKETING_IMAGE_CROPS } from '@/constants/marketing-images';

import type { EditorialPhotoPanelProps } from './editorial-photo-panel.types';

const PHOTO_WIDTH = 1920;

const PHOTO_HEIGHT = 1280;

const SCRIM_CLASS = {
  light: 'bg-black/25',
  dark: 'bg-black/45',
  bottom: 'bg-gradient-to-t from-black/75 via-black/20 to-black/30',
  none: '',
} as const;

export const EditorialPhotoPanel = ({
  src,
  alt,
  cropKey,
  crop,
  priority = false,
  className = '',
  scrim = 'none',
}: EditorialPhotoPanelProps) => {
  const resolvedCrop =
    crop ??
    (cropKey ? MARKETING_IMAGE_CROPS[cropKey] : { objectPosition: '50% 50%' });

  return (
    <div className={`relative size-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={PHOTO_WIDTH}
        height={PHOTO_HEIGHT}
        priority={priority}
        sizes="100vw"
        className="size-full object-cover"
        style={{
          objectPosition: resolvedCrop.objectPosition,
          transform: resolvedCrop.scale
            ? `scale(${resolvedCrop.scale})`
            : undefined,
        }}
      />
      {scrim !== 'none' ? (
        <div className={`absolute inset-0 ${SCRIM_CLASS[scrim]}`} aria-hidden />
      ) : null}
    </div>
  );
};
