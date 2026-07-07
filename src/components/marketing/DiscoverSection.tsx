import Image from 'next/image';

import { getLocale, getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

import { NumberTicker } from '@/components/ui/NumberTicker';

import { CATALOG_STATS, STORE_LINKS } from '@/lib/config';
import { DISCOVER_PEOPLE } from '@/lib/data/people';

const AVATAR_SIZE = 56;

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

  return (
    <section className="py-24 md:py-32">
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
              <Button href={STORE_LINKS.ios} external className="mt-9">
                {t('cta')}
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {DISCOVER_PEOPLE.map((person, index) => (
              <Reveal key={person.name} delay={index * REVEAL_STAGGER_MS} scale>
                <div className="flex items-center gap-4 rounded-2xl bg-card px-5 py-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    className="rounded-full bg-background"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-serif font-semibold">
                      {person.name}
                    </p>
                    <p className="text-sm text-foreground/50">
                      {t(`roles.${person.role}`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
