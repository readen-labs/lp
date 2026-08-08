import { Lora } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { SITE_URL } from '@/constants/config';
import { routing, type Locale } from '@/i18n/routing';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { buildWebSiteJsonLd, buildOrganizationJsonLd } from '@/lib/seo';
import {
  BRAND_BACKGROUND_DARK,
  BRAND_BACKGROUND_LIGHT,
} from '@/constants/brand-colors';
import '@/app/globals.css';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND_BACKGROUND_LIGHT },
    { media: '(prefers-color-scheme: dark)', color: BRAND_BACKGROUND_DARK },
  ],
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s · ${t('siteName')}`,
      default: t('homeTitle'),
    },
    applicationName: t('siteName'),
    publisher: t('siteName'),
    alternates: {
      types: {
        'application/rss+xml': buildLocalizedUrl(locale as Locale, '/rss.xml'),
      },
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const organizationJsonLd = buildOrganizationJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <NextIntlClientProvider messages={{ nav: messages.nav }}>
          <SiteHeader />
          <main className="flex-1 pt-[4.5rem] md:pt-[5.75rem]">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
