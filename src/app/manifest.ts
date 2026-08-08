import type { MetadataRoute } from 'next';

import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { BRAND_NAME } from '@/constants/config';
import {
  BRAND_PRIMARY,
  BRAND_BACKGROUND_LIGHT,
} from '@/constants/brand-colors';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'meta',
  });

  return {
    name: BRAND_NAME,
    short_name: BRAND_NAME,
    description: t('siteDescription'),
    start_url: '/',
    display: 'standalone',
    background_color: BRAND_BACKGROUND_LIGHT,
    theme_color: BRAND_PRIMARY,
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
