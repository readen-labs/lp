import Image from 'next/image';

import { getLocale, getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { getFeaturedFigures } from '@/lib/figures';
import { CATALOG_STATS } from '@/constants/config';
import { DISCOVER_TEASER_SLUGS } from '@/data/people';
import { NumberTicker } from '@/components/ui/number-ticker';
import { EditorialHeader } from '@/components/brand/editorial-header';

const AVATAR_SIZE = 72;

const REVEAL_DELAY_BODY_MS = 120;

const REVEAL_DELAY_STATS_MS = 200;

const REVEAL_DELAY_CTA_MS = 280;

const REVEAL_STAGGER_MS = 70;

export const DiscoverSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('discover');

  const stats = [
    { value: CATALOG_STATS.books, label: t('statBooks') },
    { value: CATALOG_STATS.people, label: t('statPeople') },
    { value: CATALOG_STATS.recommendations, label: t('statRecommendations') },
  ];

  const figures = getFeaturedFigures(DISCOVER_TEASER_SLUGS);

  return (
    <section id="discover" className="scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <EditorialHeader overline={t('overline')} title={t('title')} />
            </Reveal>
            <Reveal delay={REVEAL_DELAY_BODY_MS}>
              <p className="mt-5 max-w-md text-lg text-foreground/60">
                {t('body')}
              </p>
            </Reveal>
            <Reveal delay={REVEAL_DELAY_STATS_MS}>
              <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-serif text-3xl font-semibold tabular-nums">
                      <NumberTicker value={stat.value} locale={locale} />
                      <span className="text-primary">+</span>
                    </dd>
                    <dd className="mt-1 text-sm text-foreground/50">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={REVEAL_DELAY_CTA_MS}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Button href="/#download" variant="ink">
                  {t('cta')}
                </Button>
                <Link
                  href="/discover"
                  className="text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
                >
                  {t('browseAll')}
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {figures.map((figure, index) => (
              <Reveal key={figure.slug} delay={index * REVEAL_STAGGER_MS} scale>
                <Link
                  href={`/discover/${figure.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-colors hover:bg-card/50"
                >
                  <Image
                    src={figure.avatarUrl ?? ''}
                    alt={figure.name}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    unoptimized
                    className="rounded-full bg-background"
                  />
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-serif font-semibold">
                      {figure.name}
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm text-foreground/50">
                      {figure.industries[0]}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
