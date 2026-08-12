import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { Reveal } from '@/components/ui/reveal';
import { NumberTicker } from '@/components/ui/number-ticker';
import { MARKETING_IMAGES } from '@/constants/marketing-images';
import { CATALOG_STATS, CONTACT_EMAIL } from '@/constants/config';
import { buildMetadata, buildPageBreadcrumbJsonLd } from '@/lib/seo';
import { EditorialHeader } from '@/components/brand/editorial-header';
import { DownloadCtaSection } from '@/components/marketing/download-cta-section';
import { EditorialPhotoPanel } from '@/components/marketing/editorial-photo-panel';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const REVEAL_DELAY_INTRO_MS = 120;

const REVEAL_DELAY_PHOTO_MS = 200;

const REVEAL_STAGGER_VALUE_MS = 80;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-primary-deep">
    <span className="h-px w-6 bg-primary-deep/60" aria-hidden />
    {children}
  </h2>
);

export const generateMetadata = async ({ params }: AboutPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    path: '/about',
    siteName: t('siteName'),
  });
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');
  const tDiscover = await getTranslations('discover');

  const values = [
    { title: t('value1Title'), body: t('value1') },
    { title: t('value2Title'), body: t('value2') },
    { title: t('value3Title'), body: t('value3') },
  ];

  const stats = [
    { value: CATALOG_STATS.books, label: tDiscover('statBooks') },
    { value: CATALOG_STATS.people, label: tDiscover('statPeople') },
    {
      value: CATALOG_STATS.recommendations,
      label: tDiscover('statRecommendations'),
    },
  ];

  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(
    locale as Locale,
    tNav('home'),
    [{ name: tMeta('aboutTitle'), path: '/about' }],
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="hero-wash px-5 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <EditorialHeader
              overline={t('overline')}
              title={t('title')}
              size="hero"
              align="center"
              headingLevel="h1"
            />
          </Reveal>
          <Reveal delay={REVEAL_DELAY_INTRO_MS}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground/60">
              {t('intro')}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5">
        <Reveal delay={REVEAL_DELAY_PHOTO_MS} scale>
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem]">
            <EditorialPhotoPanel
              src={MARKETING_IMAGES.heroLibrary}
              alt=""
              cropKey="heroLibrary"
              priority
            />
          </div>
        </Reveal>

        <Reveal className="mt-24 md:mt-32">
          <section className="mx-auto max-w-3xl">
            <SectionLabel>{t('storyTitle')}</SectionLabel>
            <p className="font-serif text-[1.4rem] leading-[1.65] tracking-tight text-foreground/85 md:text-[1.6rem]">
              {t('story')}
            </p>
          </section>
        </Reveal>

        <section className="mt-24 md:mt-32">
          <Reveal>
            <SectionLabel>{t('valuesTitle')}</SectionLabel>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * REVEAL_STAGGER_VALUE_MS}
                scale
              >
                <div className="flex h-full flex-col rounded-[1.75rem] bg-card p-8">
                  <p className="font-serif text-sm font-bold text-primary-deep">
                    0{index + 1}
                  </p>
                  <h3 className="font-serif mt-3 text-2xl font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-foreground/65">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-24 md:mt-32" scale>
          <section className="rounded-[2rem] bg-card px-8 py-10 md:px-12">
            <SectionLabel>{t('numbersTitle')}</SectionLabel>
            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-serif text-4xl font-semibold tabular-nums">
                    <NumberTicker value={stat.value} locale={locale} />
                    <span className="text-primary">+</span>
                  </dd>
                  <dd className="mt-1 text-sm text-foreground/50">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        <Reveal className="mt-24 pb-24 md:mt-32 md:pb-28">
          <section className="mx-auto max-w-3xl">
            <SectionLabel>{t('contactTitle')}</SectionLabel>
            <p className="text-lg leading-relaxed text-foreground/70">
              {t('contactIntro')}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary-deep underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </Reveal>
      </div>

      <DownloadCtaSection />
    </article>
  );
}
