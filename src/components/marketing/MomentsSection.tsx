import { getTranslations } from 'next-intl/server';

import { EditorialPhotoPanel } from '@/components/marketing/EditorialPhotoPanel';
import { Reveal } from '@/components/ui/Reveal';

import { MARKETING_IMAGES } from '@/lib/constants/marketing-images';

const MOMENTS = ['moment1', 'moment2'] as const;

const MOMENT_IMAGE_KEY = {
  moment1: 'momentMorning',
  moment2: 'momentEvening',
} as const;

export const MomentsSection = async () => {
  const t = await getTranslations('moments');

  return (
    <section className="flex flex-col">
      {MOMENTS.map((moment, index) => {
        const flip = index % 2 === 1;
        const imageKey = MOMENT_IMAGE_KEY[moment];

        return (
          <div
            key={moment}
            className={`grid md:grid-cols-2 ${
              flip ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="relative min-h-[360px] md:min-h-[620px]">
              <EditorialPhotoPanel
                src={MARKETING_IMAGES[imageKey]}
                alt=""
                cropKey={imageKey}
                scrim="dark"
              />
            </div>

            <div className="flex min-h-[360px] items-center bg-card px-8 py-16 md:min-h-[620px] md:px-14 md:py-20">
              <Reveal delay={flip ? 0 : 120} className="max-w-md">
                <p className="text-[0.8rem] font-semibold tracking-[0.14em] text-primary-deep uppercase">
                  {t(`${moment}.overline`)}
                </p>
                <h2
                  className="display mt-5"
                  style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.85rem)' }}
                >
                  {t(`${moment}.title`)}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-foreground/65">
                  {t(`${moment}.body`)}
                </p>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
};
