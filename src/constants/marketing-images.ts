export const MARKETING_IMAGES = {
  heroLibrary: '/images/library.jpg',
} as const;

export type MarketingImageCrop = {
  objectPosition: string;
  scale?: number;
};

export const MARKETING_IMAGE_CROPS: Record<
  keyof typeof MARKETING_IMAGES,
  MarketingImageCrop
> = {
  heroLibrary: { objectPosition: '50% 42%' },
};
