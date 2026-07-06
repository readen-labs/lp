import { getTranslations, setRequestLocale } from 'next-intl/server';

import { LegalDocument } from '@/components/legal/LegalDocument';

import { buildMetadata } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TermsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: `${t('termsTitle')} · ${t('siteName')}`,
    description: t('siteDescription'),
    path: '/terms',
    siteName: t('siteName'),
  });
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');

  const sections = [
    { title: t('terms.use'), body: t('terms.useBody') },
    { title: t('terms.content'), body: t('terms.contentBody') },
    { title: t('terms.termination'), body: t('terms.terminationBody') },
    { title: t('terms.liability'), body: t('terms.liabilityBody') },
    { title: t('terms.contact'), body: t('terms.contactBody') },
  ];

  return (
    <LegalDocument
      title={t('terms.title')}
      draftNotice={t('termsDraft')}
      lastUpdated={t('lastUpdated')}
      intro={t('terms.intro')}
      sections={sections}
    />
  );
}
