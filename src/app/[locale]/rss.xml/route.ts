import { getTranslations } from 'next-intl/server';

import { buildRssFeed } from '@/lib/rss';
import { routing, type Locale } from '@/i18n/routing';

export const dynamic = 'force-static';

export const generateStaticParams = () =>
  routing.locales
    .filter((locale) => locale !== routing.defaultLocale)
    .map((locale) => ({ locale }));

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  const isSecondaryLocale =
    routing.locales.includes(locale as Locale) &&
    locale !== routing.defaultLocale;

  if (!isSecondaryLocale) {
    return new Response(null, { status: 404 });
  }

  const t = await getTranslations({ locale, namespace: 'meta' });

  const xml = buildRssFeed({
    locale: locale as Locale,
    title: `${t('siteName')} · ${t('blogTitle')}`,
    description: t('blogDescription'),
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
