import { getLocale, getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

import { buildFaqJsonLd } from '@/lib/seo';

import type { Locale } from '@/i18n/routing';

const FAQ_ITEM_KEYS = [
  'what',
  'platforms',
  'free',
  'scan',
  'data',
  'account',
  'offline',
  'delete',
  'recommendations',
  'contact',
] as const;

const REVEAL_DELAY_ACCORDION_MS = 120;

export const FaqSection = async () => {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('faq');

  const items = FAQ_ITEM_KEYS.map((key) => ({
    id: key,
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`),
  }));

  const jsonLd = buildFaqJsonLd(
    items.map((item) => ({ question: item.question, answer: item.answer })),
    locale,
  );

  return (
    <section
      id="faq"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 md:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
        />
      </Reveal>

      <Reveal delay={REVEAL_DELAY_ACCORDION_MS}>
        <div className="mt-12 rounded-2xl bg-card px-7 py-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
          <Accordion items={items} />
        </div>
      </Reveal>
    </section>
  );
};
