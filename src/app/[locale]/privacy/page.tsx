import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { LegalDocument } from '@/components/legal/legal-document';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: PrivacyPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('privacyTitle'),
    description: t('siteDescription'),
    path: '/privacy',
    siteName: t('siteName'),
  });
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');

  const sections = [
    { title: t('privacy.collect'), body: t('privacy.collectBody') },
    { title: t('privacy.notCollect'), body: t('privacy.notCollectBody') },
    { title: t('privacy.use'), body: t('privacy.useBody') },
    { title: t('privacy.storage'), body: t('privacy.storageBody') },
    { title: t('privacy.thirdParty'), body: t('privacy.thirdPartyBody') },
    { title: t('privacy.rights'), body: t('privacy.rightsBody') },
    { title: t('privacy.changes'), body: t('privacy.changesBody') },
    { title: t('privacy.contact'), body: t('privacy.contactBody') },
  ];

  return (
    <LegalDocument
      title={t('privacy.title')}
      draftNotice={t('privacyDraft')}
      lastUpdated={t('lastUpdated')}
      intro={t('privacy.intro')}
      sections={sections}
    />
  );
}
