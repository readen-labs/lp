import type {
  MarketingImageCrop,
  MARKETING_IMAGE_CROPS,
} from '@/constants/marketing-images';

export type EditorialPhotoPanelProps = {
  src: string;
  alt: string;
  cropKey?: keyof typeof MARKETING_IMAGE_CROPS;
  crop?: MarketingImageCrop;
  priority?: boolean;
  className?: string;
  scrim?: 'light' | 'dark' | 'bottom' | 'none';
};
