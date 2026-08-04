import { SITE_URL } from '@/constants/config';
import { routing, type Locale } from '@/i18n/routing';

export const getLocalePathPrefix = (locale: Locale): string =>
  locale === routing.defaultLocale ? '' : `/${locale}`;

export const buildLocalizedPath = (locale: Locale, path: string): string =>
  `${getLocalePathPrefix(locale)}${path}`;

export const buildLocalizedUrl = (locale: Locale, path: string): string =>
  `${SITE_URL}${buildLocalizedPath(locale, path)}`;
