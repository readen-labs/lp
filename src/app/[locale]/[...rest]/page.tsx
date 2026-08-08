import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

type CatchAllPageProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export const generateMetadata = async ({
  params,
}: CatchAllPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('notFoundTitle'),
    robots: { index: false },
  };
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  notFound();
}
