import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { Reveal } from '@/components/ui/reveal';
import { CONTACT_EMAIL } from '@/constants/config';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { EditorialHeader } from '@/components/brand/editorial-header';

const PILLARS = ['pillar1', 'pillar2', 'pillar3'] as const;

const OPEN_ROLES = ['role1', 'role2'] as const;

const REVEAL_DELAY_INTRO_MS = 120;

const REVEAL_STAGGER_PILLAR_MS = 90;

const REVEAL_DELAY_CTA_BODY_MS = 100;

const REVEAL_DELAY_ROLES_MS = 160;

const REVEAL_DELAY_CTA_EMAIL_MS = 240;

const CTA_TITLE_CLAMP = 'clamp(1.85rem, 5vw, 2.75rem)';

const EMAIL_CLAMP = 'clamp(1.6rem, 10vw, 7.5rem)';

type CareersPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: CareersPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('careersTitle'),
    description: t('careersDescription'),
    path: '/careers',
  });
};

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('careers');
  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: buildLocalizedUrl(locale as Locale, '/') },
    {
      name: tMeta('careersTitle'),
      url: buildLocalizedUrl(locale as Locale, '/careers'),
    },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="hero-wash px-5 pt-16 pb-20 md:pt-24 md:pb-28">
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

      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <Reveal>
          <EditorialHeader
            overline={t('howOverline')}
            title={t('howTitle')}
            align="center"
          />
        </Reveal>

        <div className="mt-14">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar} delay={index * REVEAL_STAGGER_PILLAR_MS}>
              <article className="grid gap-3 border-t border-foreground/10 py-10 md:grid-cols-[120px_1fr] md:gap-10 md:py-12">
                <p className="font-serif text-2xl leading-none font-bold text-primary-deep">
                  0{index + 1}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-2xl font-semibold tracking-tight">
                      {t(`${pillar}Title`)}
                    </h3>
                    <p className="text-sm font-medium text-foreground/45">
                      {t(`${pillar}Eyebrow`)}
                    </p>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-foreground/65">
                    {t(`${pillar}Body`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pt-10 pb-28 text-center md:pt-16 md:pb-36">
        <Reveal>
          <h2 className="display" style={{ fontSize: CTA_TITLE_CLAMP }}>
            {t('ctaTitle')}
          </h2>
        </Reveal>
        <Reveal delay={REVEAL_DELAY_CTA_BODY_MS}>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-foreground/60">
            {t('ctaBody')}
          </p>
        </Reveal>

        <Reveal delay={REVEAL_DELAY_ROLES_MS}>
          <div className="mx-auto mt-10 flex max-w-md flex-col gap-6">
            {OPEN_ROLES.map((role) => (
              <div key={role}>
                <h3 className="font-serif text-lg font-semibold">
                  {t(`${role}Title`)}
                </h3>
                <p className="mt-1 text-foreground/60">{t(`${role}Body`)}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={REVEAL_DELAY_CTA_EMAIL_MS}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-serif mt-14 block leading-none font-bold tracking-tight transition-colors duration-300 hover:text-primary-deep"
            style={{ fontSize: EMAIL_CLAMP }}
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
