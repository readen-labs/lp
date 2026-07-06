import { getTranslations } from 'next-intl/server';

import {
  createOpenGraphImage,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from '@/components/og/OpenGraphImage';

import { routing } from '@/i18n/routing';

export const alt = 'Readen';
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

type LocaleOpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export default async function LocaleOpenGraphImage({
  params,
}: LocaleOpenGraphImageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return createOpenGraphImage(t('ogTagline'));
}
