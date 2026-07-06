import Image from 'next/image';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';

import { CATALOG_STATS, CONTACT_EMAIL } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: AboutPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: `${t('aboutTitle')} · ${t('siteName')}`,
    description: t('siteDescription'),
    path: '/about',
    siteName: t('siteName'),
  });
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const numbers = t('numbers', {
    books: CATALOG_STATS.books.toLocaleString(locale),
    people: CATALOG_STATS.people.toLocaleString(locale),
    recommendations: CATALOG_STATS.recommendations.toLocaleString(locale),
  });

  const values = [
    { title: t('value1Title'), body: t('value1') },
    { title: t('value2Title'), body: t('value2') },
    { title: t('value3Title'), body: t('value3') },
  ];

  return (
    <article className="mx-auto max-w-4xl px-5 pt-16 pb-24">
      <EditorialHeader
        overline={t('overline')}
        title={t('title')}
        size="hero"
        headingLevel="h1"
      />

      <Reveal className="mt-14">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
          <Image
            src="/images/library.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <section className="grid gap-8 md:grid-cols-[200px_1fr]">
          <h2 className="font-serif text-2xl font-bold">{t('storyTitle')}</h2>
          <p className="text-lg leading-relaxed text-foreground/75">
            {t('story')}
          </p>
        </section>
      </Reveal>

      <Reveal className="mt-20">
        <section>
          <h2 className="mb-8 font-serif text-2xl font-bold">
            {t('valuesTitle')}
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="rounded-2xl bg-card p-7 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]"
              >
                <p className="font-serif text-sm font-bold text-primary-deep">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-20">
        <section className="rounded-[2rem] bg-card px-8 py-10">
          <h2 className="mb-4 font-serif text-2xl font-bold">
            {t('numbersTitle')}
          </h2>
          <p className="font-serif text-xl leading-relaxed text-foreground/75">
            {numbers}
          </p>
        </section>
      </Reveal>

      <Reveal className="mt-20">
        <section className="grid gap-8 md:grid-cols-[200px_1fr]">
          <h2 className="font-serif text-2xl font-bold">{t('roadmapTitle')}</h2>
          <p className="text-lg leading-relaxed text-foreground/75">
            {t('roadmap')}
          </p>
        </section>
      </Reveal>

      <Reveal className="mt-20">
        <section className="grid gap-8 md:grid-cols-[200px_1fr]">
          <h2 className="font-serif text-2xl font-bold">{t('contactTitle')}</h2>
          <p className="text-lg leading-relaxed text-foreground/75">
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
    </article>
  );
}
