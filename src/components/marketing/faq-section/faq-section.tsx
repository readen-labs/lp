import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { FAQ_ITEM_KEYS } from '@/constants/faq';
import { Accordion } from '@/components/ui/accordion';
import { EditorialHeader } from '@/components/brand/editorial-header';

const REVEAL_DELAY_ACCORDION_MS = 120;

export const FaqSection = async () => {
  const t = await getTranslations('faq');

  const items = FAQ_ITEM_KEYS.map((key) => ({
    id: key,
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`),
  }));

  return (
    <section
      id="faq"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 pt-16 pb-28 md:pt-20 md:pb-40"
    >
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
        />
      </Reveal>

      <Reveal delay={REVEAL_DELAY_ACCORDION_MS}>
        <div className="mt-12 rounded-2xl bg-card px-7 py-2">
          <Accordion items={items} />
        </div>
      </Reveal>
    </section>
  );
};
