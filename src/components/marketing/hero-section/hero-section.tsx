import { getLocale, getTranslations } from 'next-intl/server';

import { STORE_LINKS } from '@/constants/config';
import { StoreBadge } from '@/components/ui/store-badge';
import { PhoneFrame } from '@/components/brand/phone-frame';
import { FEATURE_MOCK_BOOKS } from '@/data/feature-mock-books';
import { HeroPhoneStage } from '@/components/marketing/hero-phone-stage';
import {
  ScanMock,
  GoalsMock,
  SessionMock,
} from '@/components/marketing/feature-mocks';

export const HeroSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('hero');
  const tFeatures = await getTranslations('features');
  const books = FEATURE_MOCK_BOOKS;

  return (
    <section className="hero-wash relative overflow-x-clip pt-8 pb-16 md:overflow-x-visible md:pt-14 md:pb-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        <h1
          className="display animate-rise max-w-2xl"
          style={
            {
              fontSize: 'clamp(1.85rem, 7vw, 3.5rem)',
              '--rise-delay': '0ms',
            } as React.CSSProperties
          }
        >
          {t.rich('title', {
            i: (chunks) => <em className="display-italic">{chunks}</em>,
          })}
        </h1>

        <p
          className="animate-rise mt-4 max-w-[28ch] text-pretty text-[1.05rem] leading-snug tracking-[-0.011em] text-foreground/55 sm:max-w-[32ch] md:mt-5 md:max-w-[34ch] md:text-[1.125rem] md:leading-snug"
          style={{ '--rise-delay': '90ms' } as React.CSSProperties}
        >
          {t.rich('tagline', {
            br: () => <br />,
          })}
        </p>

        <div
          className="animate-rise mt-7 -mx-1 flex flex-nowrap items-center justify-center gap-1 sm:mx-0 sm:gap-3 md:mt-8 md:gap-3.5"
          style={{ '--rise-delay': '160ms' } as React.CSSProperties}
        >
          <StoreBadge
            store="ios"
            href={STORE_LINKS.ios}
            eyebrow={t('appStoreEyebrow')}
            label={t('appStoreLabel')}
          />
          <StoreBadge
            store="android"
            href={STORE_LINKS.android}
            eyebrow={t('playStoreEyebrow')}
            label={t('playStoreLabel')}
          />
        </div>
      </div>

      <HeroPhoneStage
        left={
          <PhoneFrame size="fill">
            <ScanMock
              hint={tFeatures('scan.hint')}
              coverSrc={books.scan.cover}
            />
          </PhoneFrame>
        }
        center={
          <PhoneFrame size="fill">
            <SessionMock
              coverSrc={books.session.cover}
              bookTitle={tFeatures('mock.bookTitle')}
              bookAuthor={tFeatures('mock.bookAuthor')}
              timer={tFeatures('mock.timer')}
              pageProgress={tFeatures('mock.pageProgress')}
              endLabel={tFeatures('mock.end')}
              quote={tFeatures('mock.quote')}
              quoteHighlight={tFeatures('mock.quoteHighlight')}
              quoteAuthor={tFeatures('mock.quoteAuthor')}
            />
          </PhoneFrame>
        }
        right={
          <PhoneFrame size="fill">
            <GoalsMock
              overline={tFeatures('mock.reading')}
              title={tFeatures('goals.title')}
              periods={[
                tFeatures('mock.week'),
                tFeatures('mock.month'),
                tFeatures('mock.year'),
              ]}
              range={tFeatures('mock.thisWeek')}
              heroHours={tFeatures('mock.heroHours')}
              heroHoursUnit={tFeatures('mock.heroHoursUnit')}
              cards={[
                {
                  label: tFeatures('mock.booksFinished'),
                  value: tFeatures('mock.booksFinishedValue'),
                },
                {
                  label: tFeatures('mock.daysRead'),
                  value: tFeatures('mock.daysReadValue'),
                  suffix: tFeatures('mock.daysReadSuffix'),
                },
                {
                  label: tFeatures('mock.pagesRead'),
                  value: tFeatures('mock.pagesReadValue'),
                },
                {
                  label: tFeatures('mock.longestSitting'),
                  value: tFeatures('mock.longestSittingValue'),
                },
              ]}
              mostReadAuthor={tFeatures('mock.mostReadAuthor')}
              authorName={tFeatures('mock.authorName')}
              authorCoverSrc={books.author.cover}
              whatYouRead={tFeatures('mock.whatYouRead')}
              subjects={[
                { name: tFeatures('mock.subject1'), percent: 62 },
                { name: tFeatures('mock.subject2'), percent: 38 },
              ]}
              locale={locale}
            />
          </PhoneFrame>
        }
      />
    </section>
  );
};
