import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
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

export const DownloadCtaSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('download');
  const tFeatures = await getTranslations('features');
  const books = FEATURE_MOCK_BOOKS;

  return (
    <section
      id="download"
      className="scroll-mt-28 overflow-x-clip pt-20 pb-14 md:overflow-x-visible md:pt-32 md:pb-20"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        <Reveal>
          <h2
            className="display"
            style={{ fontSize: 'clamp(1.85rem, 6.5vw, 3.25rem)' }}
          >
            {t('title')}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 max-w-[34ch] text-pretty text-[1.05rem] leading-snug tracking-[-0.011em] text-foreground/55 md:mt-5 md:max-w-[38ch] md:text-[1.125rem] md:leading-snug">
            {t('body')}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-7 -mx-1 flex flex-nowrap items-center justify-center gap-1 sm:mx-0 sm:gap-3 md:mt-8 md:gap-3.5">
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
        </Reveal>
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
