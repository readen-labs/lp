import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/Reveal';

export const ManifestoSection = async () => {
  const t = await getTranslations('manifesto');

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
      <Reveal>
        <p className="mb-6 text-[0.8rem] font-semibold tracking-[0.14em] text-primary-deep uppercase">
          {t('overline')}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <p
          className="display mx-auto max-w-3xl"
          style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.4rem)' }}
        >
          {t('quote')}
        </p>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-7 text-lg text-foreground/50">{t('sub')}</p>
      </Reveal>
    </section>
  );
};
