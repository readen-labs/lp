import { getTranslations } from 'next-intl/server';

import { LogoMark } from '@/components/brand/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { ShineBorder } from '@/components/ui/ShineBorder';
import { StoreBadge } from '@/components/ui/StoreBadge';

import { STORE_LINKS } from '@/lib/config';

const SHINE_DURATION_S = 16;

const SHINE_COLORS = [
  'rgba(255,255,255,0.35)',
  'rgba(52,211,153,0.85)',
  'rgba(255,255,255,0.5)',
];

export const DownloadCtaSection = async () => {
  const t = await getTranslations('download');

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal scale>
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <ShineBorder
            duration={SHINE_DURATION_S}
            shineColor={SHINE_COLORS}
            borderWidth={1}
          />
          <div className="cta-emerald relative px-6 py-20 text-center text-white md:px-16 md:py-24">
            <LogoMark
              size={520}
              variant="mono"
              className="pointer-events-none absolute -right-24 -bottom-40 opacity-[0.08]"
            />
            <div className="relative">
              <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
                {t('overline')}
              </p>
              <LogoMark
                size={64}
                variant="mono"
                className="mx-auto mt-6 text-white"
              />
              <h2
                className="display mx-auto mt-7 max-w-2xl"
                style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
              >
                {t('title')}
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-white/80">
                {t('body')}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <StoreBadge
                  store="ios"
                  href={STORE_LINKS.ios}
                  eyebrow={t('appStoreEyebrow')}
                  label={t('appStoreLabel')}
                  tone="onDark"
                />
                <StoreBadge
                  store="android"
                  href={STORE_LINKS.android}
                  eyebrow={t('playStoreEyebrow')}
                  label={t('playStoreLabel')}
                  tone="onDark"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
