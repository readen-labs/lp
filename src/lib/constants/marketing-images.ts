export const MARKETING_IMAGES = {
  heroLibrary: '/images/library.jpg',
  experience: '/images/library.jpg',
  momentMorning: '/images/reading-desk.jpg',
  momentEvening: '/images/reading-window.jpg',
  story: '/images/library.jpg',
  manifesto: '/images/reading-bookshelves.jpg',
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
  experience: { objectPosition: '50% 58%' },
  momentMorning: { objectPosition: '50% 45%' },
  momentEvening: { objectPosition: '55% 50%' },
  story: { objectPosition: '50% 50%' },
  manifesto: { objectPosition: '35% 50%' },
};
