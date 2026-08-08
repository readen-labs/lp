import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { Marquee } from '@/components/ui/marquee';
import { StarRating } from '@/components/ui/star-rating';
import { NumberTicker } from '@/components/ui/number-ticker';
import { EditorialHeader } from '@/components/brand/editorial-header';

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
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <EditorialHeader
            overline={t('overline')}
            title={t('title')}
            align="center"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-card px-6 py-3">
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

      <div className="mt-14">
        <Marquee durationS={36} gap={20} pauseOnHover>
          {REVIEW_KEYS.map((key) => (
            <figure
              key={key}
              className="flex w-[300px] shrink-0 flex-col justify-between gap-6 rounded-2xl bg-card p-7 sm:w-[360px]"
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
      </div>
    </section>
  );
};
