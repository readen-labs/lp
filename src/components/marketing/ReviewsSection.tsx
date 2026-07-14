import { getLocale, getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Marquee } from '@/components/ui/Marquee';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { Reveal } from '@/components/ui/Reveal';
import { StarRating } from '@/components/ui/StarRating';

const REVIEW_KEYS = [
  'review1',
  'review2',
  'review3',
  'review4',
  'review5',
  'review6',
] as const;

const REVIEW_CARD_RATING = 5;

const RATING_DECIMALS = 1;

export const ReviewsSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('reviews');
  const aggregateRating = Number.parseFloat(t('rating'));

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <EditorialHeader
            overline={t('overline')}
            title={t('title')}
            align="center"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-card px-6 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]">
            <span className="font-serif text-2xl font-bold tabular-nums">
              <NumberTicker
                value={aggregateRating}
                locale={locale}
                decimals={RATING_DECIMALS}
              />
            </span>
            <StarRating
              rating={aggregateRating}
              label={t('ratingStars', { rating: t('rating') })}
            />
            <span className="text-sm text-foreground/50">
              {t('ratingLabel')}
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={160} className="mt-14">
        <Marquee durationS={64} gap={20} pauseOnHover>
          {REVIEW_KEYS.map((key) => (
            <figure
              key={key}
              className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-2xl bg-card p-7 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] sm:w-[360px]"
            >
              <blockquote className="font-serif text-[1.1rem] leading-relaxed text-foreground/85">
                “{t(`${key}.quote`)}”
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground/75">
                    {t(`${key}.name`)}
                  </p>
                  <p className="truncate text-sm text-foreground/45">
                    {t(`${key}.context`)}
                  </p>
                </div>
                <StarRating
                  rating={REVIEW_CARD_RATING}
                  starClassName="h-3.5 w-3.5 shrink-0"
                  label={t('ratingStars', {
                    rating: String(REVIEW_CARD_RATING),
                  })}
                />
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
};
