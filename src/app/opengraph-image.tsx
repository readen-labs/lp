import {
  OG_IMAGE_SIZE,
  createOpenGraphImage,
  OG_IMAGE_CONTENT_TYPE,
} from '@/components/og/open-graph-image';

export const alt = 'Readen';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpenGraphImage() {
  return createOpenGraphImage('Curate the books that made you.');
}
