import {
  createOpenGraphImage,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from '@/components/og/OpenGraphImage';

export const alt = 'Readen';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpenGraphImage() {
  return createOpenGraphImage('Curate the books that made you.');
}
