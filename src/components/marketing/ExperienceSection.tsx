import { getTranslations } from 'next-intl/server';

import { EditorialPhotoPanel } from '@/components/marketing/EditorialPhotoPanel';
import { Reveal } from '@/components/ui/Reveal';

import { MARKETING_IMAGES } from '@/lib/constants/marketing-images';

export const ExperienceSection = async () => {
  const t = await getTranslations('experience');

  return (
    <section className="relative min-h-[85vh] overflow-hidden md:min-h-[92vh]">
      <div className="absolute inset-0" aria-hidden>
        <EditorialPhotoPanel
          src={MARKETING_IMAGES.experience}
          alt=""
          cropKey="experience"
          scrim="bottom"
          priority
        />
      </div>

      <div className="relative z-10 flex min-h-[85vh] items-center justify-center px-5 py-32 md:min-h-[92vh] md:py-44">
        <div className="mx-auto max-w-4xl text-center text-white">
          <Reveal>
            <p className="mb-6 text-[0.8rem] font-semibold tracking-[0.16em] text-primary uppercase">
              {t('overline')}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="display mx-auto max-w-3xl text-white"
              style={{ fontSize: 'clamp(2.35rem, 6.5vw, 4.75rem)' }}
            >
              {t('title')}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/78 md:text-xl">
              {t('body')}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="display-italic mx-auto mt-8 max-w-lg text-xl text-white/55 md:text-2xl">
              {t('pullQuote')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
