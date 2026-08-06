import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { FaqSection } from '@/components/marketing/faq-section';
import { HeroSection } from '@/components/marketing/hero-section';
import { LibrarySection } from '@/components/marketing/library-section';
import { ReviewsSection } from '@/components/marketing/reviews-section';
import { WidgetsSection } from '@/components/marketing/widgets-section';
import { DiscoverSection } from '@/components/marketing/discover-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { buildMetadata, buildSoftwareApplicationJsonLd } from '@/lib/seo';
import { OnboardingSection } from '@/components/marketing/onboarding-section';
import { DownloadCtaSection } from '@/components/marketing/download-cta-section';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('homeTitle'),
    description: t('siteDescription'),
    path: '/',
    siteName: t('siteName'),
  });
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = buildSoftwareApplicationJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <LibrarySection />
      <WidgetsSection />
      <DiscoverSection />
      <ReviewsSection />
      <OnboardingSection />
      <DownloadCtaSection />
      <FaqSection />
    </>
  );
}
