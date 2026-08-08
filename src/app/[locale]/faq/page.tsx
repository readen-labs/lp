import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { FAQ_ITEM_KEYS } from '@/constants/faq';
import { CONTACT_EMAIL } from '@/constants/config';
import { Accordion } from '@/components/ui/accordion';
import { buildLocalizedUrl } from '@/utils/locale-path';
import { EditorialHeader } from '@/components/brand/editorial-header';
import {
  buildMetadata,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo';

const REVEAL_DELAY_INTRO_MS = 100;

const REVEAL_DELAY_ACCORDION_MS = 180;

const REVEAL_DELAY_CTA_MS = 240;

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: FaqPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildMetadata({
    locale: locale as Locale,
    title: t('faqTitle'),
    description: t('faqDescription'),
    path: '/faq',
  });
};

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('faq');
  const tNav = await getTranslations('nav');
  const tMeta = await getTranslations('meta');

  const items = FAQ_ITEM_KEYS.map((key) => ({
    id: key,
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`),
  }));

  const faqJsonLd = buildFaqJsonLd(
    items.map((item) => ({ question: item.question, answer: item.answer })),
    locale as Locale,
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: buildLocalizedUrl(locale as Locale, '/') },
    {
      name: tMeta('faqTitle'),
      url: buildLocalizedUrl(locale as Locale, '/faq'),
    },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 pb-28 md:pt-20 md:pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
          headingLevel="h1"
        />
      </Reveal>

      <Reveal delay={REVEAL_DELAY_INTRO_MS}>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-foreground/60">
          {t('intro')}
        </p>
      </Reveal>

      <Reveal delay={REVEAL_DELAY_ACCORDION_MS}>
        <div className="mt-12 rounded-2xl bg-card px-7 py-2">
          <Accordion items={items} />
        </div>
      </Reveal>

      <Reveal delay={REVEAL_DELAY_CTA_MS}>
        <div className="mt-16 rounded-[2rem] bg-card px-8 py-10 text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-foreground/60">
            {t('ctaBody')}
          </p>
          <div className="mt-7 flex justify-center">
            <Button href={`mailto:${CONTACT_EMAIL}`} external>
              {t('ctaButton')}
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
