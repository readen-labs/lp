import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import { Lora } from 'next/font/google';
import { getLocale } from 'next-intl/server';

import { SITE_URL } from '@/lib/config';

import './globals.css';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
