import { getTranslations } from 'next-intl/server';

import { EditorialPhotoPanel } from '@/components/marketing/EditorialPhotoPanel';
import { Reveal } from '@/components/ui/Reveal';

import { MARKETING_IMAGES } from '@/lib/constants/marketing-images';

export const ManifestoSection = async () => {
  const t = await getTranslations('manifesto');

  return (
    <section className="relative min-h-[560px] overflow-hidden md:min-h-[640px]">
      <div className="absolute inset-0" aria-hidden>
        <EditorialPhotoPanel
          src={MARKETING_IMAGES.manifesto}
          alt=""
          cropKey="manifesto"
          scrim="dark"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/40" />
      </div>

      <div className="relative z-10 flex min-h-[560px] items-center px-5 py-28 md:min-h-[640px] md:py-36">
        <div className="mx-auto max-w-4xl text-center text-white md:text-left">
          <Reveal>
            <p className="mb-6 text-[0.8rem] font-semibold tracking-[0.16em] text-primary uppercase">
              {t('overline')}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p
              className="display mx-auto max-w-3xl text-white md:mx-0"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
            >
              {t('quote')}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:mx-0">
              {t('sub')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
