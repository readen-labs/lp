import { getTranslations, setRequestLocale } from 'next-intl/server';

import { LegalDocument } from '@/components/legal/LegalDocument';

import { buildMetadata } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: PrivacyPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: `${t('privacyTitle')} · ${t('siteName')}`,
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
    { title: t('privacy.use'), body: t('privacy.useBody') },
    { title: t('privacy.thirdParty'), body: t('privacy.thirdPartyBody') },
    { title: t('privacy.delete'), body: t('privacy.deleteBody') },
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
