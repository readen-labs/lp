import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { PhoneFrame } from '@/components/brand/phone-frame';
import { FEATURE_MOCK_BOOKS } from '@/data/feature-mock-books';
import { EditorialHeader } from '@/components/brand/editorial-header';
import {
  ScanMock,
  GoalsMock,
  SessionMock,
} from '@/components/marketing/feature-mocks';

import type { FeatureRowProps } from './features-section.types';

/*
  Rotina pattern: natural section height (no tall min-h runway), phone in
  normal flow, copy sticky at ~20vh so it holds briefly as you pass the row.
*/
const FeatureRow = ({
  index,
  overline,
  headline,
  body,
  mock,
  flip = false,
}: FeatureRowProps) => (
  <div
    className={`grid items-start gap-10 py-12 md:grid-cols-2 md:gap-20 md:py-20 ${
      flip ? 'md:[&>*:first-child]:order-2' : ''
    }`}
  >
    <div className="flex w-full justify-center overflow-x-clip">
      <PhoneFrame size="lg">{mock}</PhoneFrame>
    </div>

    <div className="md:sticky md:top-[20vh] md:self-start">
      <p className="mb-4 flex items-baseline gap-3 text-[0.8rem] font-semibold tracking-[0.14em] text-primary-deep uppercase">
        <span className="font-serif text-2xl font-semibold tracking-normal text-foreground/25 normal-case">
          0{index}
        </span>
        {overline}
      </p>
      <h3
        className="display"
        style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.6rem)' }}
      >
        {headline}
      </h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/60">
        {body}
      </p>
    </div>
  </div>
);

export const FeaturesSection = async () => {
  const locale = await getLocale();
  const t = await getTranslations('features');
  const books = FEATURE_MOCK_BOOKS;

  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-28 px-5 py-24 md:py-32"
    >
      <Reveal>
        <EditorialHeader
          overline={t('overline')}
          title={t('title')}
          align="center"
        />
      </Reveal>

      <div className="mt-14 flex flex-col md:mt-16">
        <FeatureRow
          index={1}
          overline={t('scan.title')}
          headline={t('scan.headline')}
          body={t('scan.body')}
          mock={<ScanMock hint={t('scan.hint')} coverSrc={books.scan.cover} />}
        />
        <FeatureRow
          index={2}
          overline={t('sessions.title')}
          headline={t('sessions.headline')}
          body={t('sessions.body')}
          flip
          mock={
            <SessionMock
              coverSrc={books.session.cover}
              bookTitle={t('mock.bookTitle')}
              bookAuthor={t('mock.bookAuthor')}
              timer={t('mock.timer')}
              pageProgress={t('mock.pageProgress')}
              endLabel={t('mock.end')}
              quote={t('mock.quote')}
              quoteHighlight={t('mock.quoteHighlight')}
              quoteAuthor={t('mock.quoteAuthor')}
            />
          }
        />
        <FeatureRow
          index={3}
          overline={t('goals.title')}
          headline={t('goals.headline')}
          body={t('goals.body')}
          mock={
            <GoalsMock
              overline={t('mock.reading')}
              title={t('goals.title')}
              periods={[t('mock.week'), t('mock.month'), t('mock.year')]}
              range={t('mock.thisWeek')}
              heroHours={t('mock.heroHours')}
              heroHoursUnit={t('mock.heroHoursUnit')}
              cards={[
                {
                  label: t('mock.booksFinished'),
                  value: t('mock.booksFinishedValue'),
                },
                {
                  label: t('mock.daysRead'),
                  value: t('mock.daysReadValue'),
                  suffix: t('mock.daysReadSuffix'),
                },
                {
                  label: t('mock.pagesRead'),
                  value: t('mock.pagesReadValue'),
                },
                {
                  label: t('mock.longestSitting'),
                  value: t('mock.longestSittingValue'),
                },
              ]}
              mostReadAuthor={t('mock.mostReadAuthor')}
              authorName={t('mock.authorName')}
              authorCoverSrc={books.author.cover}
              whatYouRead={t('mock.whatYouRead')}
              subjects={[
                { name: t('mock.subject1'), percent: 62 },
                { name: t('mock.subject2'), percent: 38 },
              ]}
              locale={locale}
            />
          }
        />
      </div>
    </section>
  );
};
