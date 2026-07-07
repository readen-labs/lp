import { getTranslations } from 'next-intl/server';

import { EditorialPhotoPanel } from '@/components/marketing/EditorialPhotoPanel';
import { Reveal } from '@/components/ui/Reveal';

import { MARKETING_IMAGES } from '@/lib/constants/marketing-images';

export const StorySection = async () => {
  const t = await getTranslations('story');

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
        <EditorialPhotoPanel
          src={MARKETING_IMAGES.story}
          alt=""
          cropKey="story"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5">
        <Reveal>
          <p className="text-center text-[0.8rem] font-semibold tracking-[0.14em] text-primary-deep uppercase">
            {t('overline')}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <figure className="story-quote mt-10 rounded-[2rem] bg-card px-8 py-12 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)] md:px-14 md:py-16">
            <blockquote className="font-serif text-[clamp(1.35rem,3vw,2rem)] leading-[1.45] text-foreground/88">
              “{t('quote')}”
            </blockquote>
            <figcaption className="mt-8 flex flex-col gap-1 border-t border-foreground/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-serif text-lg font-semibold tracking-tight">
                  {t('name')}
                </p>
                <p className="text-sm text-foreground/50">{t('context')}</p>
              </div>
              <p className="text-sm font-medium text-primary-deep">{t('label')}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};
