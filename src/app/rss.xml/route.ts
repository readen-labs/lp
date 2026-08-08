import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { buildRssFeed } from '@/lib/rss';

export const dynamic = 'force-static';

export async function GET() {
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const xml = buildRssFeed({
    locale,
    title: `${t('siteName')} · ${t('blogTitle')}`,
    description: t('blogDescription'),
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
