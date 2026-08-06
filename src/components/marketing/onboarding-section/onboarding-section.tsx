import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { EditorialHeader } from '@/components/brand/editorial-header';

const STEPS = ['step1', 'step2', 'step3'] as const;

export const OnboardingSection = async () => {
  const t = await getTranslations('onboarding');

  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:py-40">
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
        />
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-foreground/60">
          {t('body')}
        </p>
      </Reveal>

      <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-12">
        {STEPS.map((step, index) => (
          <Reveal key={step} delay={index * 120}>
            <div className="relative">
              <p className="font-serif text-sm font-bold text-primary-deep">
                0{index + 1}
              </p>
              <h3 className="font-serif mt-4 text-2xl font-semibold tracking-tight">
                {t(step)}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/60">
                {t(`${step}Body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
