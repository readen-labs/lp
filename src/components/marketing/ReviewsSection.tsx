import { getTranslations } from 'next-intl/server';

import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';
import { StarRating } from '@/components/ui/StarRating';

const REVIEW_KEYS = [
  'placeholder1',
  'placeholder2',
  'placeholder3',
  'placeholder4',
  'placeholder5',
  'placeholder6',
] as const;

const REVIEW_CARD_RATING = 5;

export const ReviewsSection = async () => {
  const t = await getTranslations('reviews');
  const aggregateRating = Number.parseFloat(t('rating'));

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <EditorialHeader overline={t('overline')} title={t('title')} align="center" />
      </Reveal>

      <Reveal delay={100}>
        <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full bg-card px-6 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]">
          <span className="font-serif text-2xl font-bold tabular-nums">
            {t('rating')}
          </span>
          <StarRating
            rating={aggregateRating}
            label={t('ratingStars', { rating: t('rating') })}
          />
          <span className="text-sm text-foreground/50">{t('ratingLabel')}</span>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEW_KEYS.map((key, index) => (
          <Reveal key={key} delay={index * 80} scale>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-card p-7 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
              <blockquote className="font-serif text-[1.1rem] leading-relaxed text-foreground/85">
                “{t(key)}”
              </blockquote>
              <figcaption className="flex items-center justify-between">
                <span className="text-sm text-foreground/50">
                  {t('anonymous')}
                </span>
                <StarRating
                  rating={REVIEW_CARD_RATING}
                  starClassName="h-3.5 w-3.5"
                  label={t('ratingStars', { rating: String(REVIEW_CARD_RATING) })}
                />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
