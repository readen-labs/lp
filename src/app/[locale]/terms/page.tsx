import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { LegalDocument } from '@/components/legal/legal-document';

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TermsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('termsTitle'),
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
    { title: t('terms.account'), body: t('terms.accountBody') },
    { title: t('terms.content'), body: t('terms.contentBody') },
    { title: t('terms.bookData'), body: t('terms.bookDataBody') },
    { title: t('terms.acceptable'), body: t('terms.acceptableBody') },
    { title: t('terms.termination'), body: t('terms.terminationBody') },
    { title: t('terms.liability'), body: t('terms.liabilityBody') },
    { title: t('terms.changes'), body: t('terms.changesBody') },
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
