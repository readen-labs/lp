import { getTranslations, setRequestLocale } from 'next-intl/server';

import { DiscoverSection } from '@/components/marketing/DiscoverSection';
import { DownloadCtaSection } from '@/components/marketing/DownloadCtaSection';
import { ExperienceSection } from '@/components/marketing/ExperienceSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { HeroSection } from '@/components/marketing/HeroSection';
import { IdentitySection } from '@/components/marketing/IdentitySection';
import { LibrarySection } from '@/components/marketing/LibrarySection';
import { ManifestoSection } from '@/components/marketing/ManifestoSection';
import { MomentsSection } from '@/components/marketing/MomentsSection';
import { OnboardingSection } from '@/components/marketing/OnboardingSection';
import { ReviewsSection } from '@/components/marketing/ReviewsSection';
import { StorySection } from '@/components/marketing/StorySection';

import { buildMetadata, buildSoftwareApplicationJsonLd } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

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
      <ExperienceSection />
      <IdentitySection />
      <MomentsSection />
      <StorySection />
      <ManifestoSection />
      <LibrarySection />
      <FeaturesSection />
      <DiscoverSection />
      <ReviewsSection />
      <OnboardingSection />
      <DownloadCtaSection />
      <FaqSection />
    </>
  );
}
