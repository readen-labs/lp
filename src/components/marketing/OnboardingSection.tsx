import { getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = ['step1', 'step2', 'step3'] as const;

export const OnboardingSection = async () => {
  const t = await getTranslations('onboarding');

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <EditorialHeader overline={t('overline')} title={t('title')} align="center" />
      </Reveal>
      <Reveal delay={100}>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-foreground/60">
          {t('body')}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step} delay={index * 120} scale>
            <div className="relative h-full overflow-hidden rounded-2xl bg-card p-8 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
              <span
                className="font-serif pointer-events-none absolute -top-4 right-2 text-[7rem] leading-none font-bold text-foreground/[0.05]"
                aria-hidden
              >
                {index + 1}
              </span>
              <p className="font-serif text-sm font-bold text-primary-deep">
                0{index + 1}
              </p>
              <h3 className="font-serif mt-3 text-2xl font-semibold tracking-tight">
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
