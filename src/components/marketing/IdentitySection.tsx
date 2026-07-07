import { getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = ['pillar1', 'pillar2', 'pillar3'] as const;

export const IdentitySection = async () => {
  const t = await getTranslations('identity');

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
        />
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-foreground/60">
          {t('body')}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <Reveal key={pillar} delay={120 + index * 80} scale>
            <article className="identity-pillar flex h-full flex-col rounded-[1.75rem] bg-card p-8 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.28)]">
              <p className="font-serif text-sm font-bold text-primary-deep">
                0{index + 1}
              </p>
              <h3 className="font-serif mt-4 text-2xl font-semibold tracking-tight">
                {t(`${pillar}Title`)}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground/45">
                {t(`${pillar}Eyebrow`)}
              </p>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/65">
                {t(`${pillar}Body`)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
