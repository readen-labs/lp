import { Cover } from '@/components/brand/cover';
import { NumberTicker } from '@/components/ui/number-ticker';

import type {
  ScanMockProps,
  GoalsMockProps,
  SessionMockProps,
} from './feature-mocks.types';

/* Whole-number mock values count up when the phone scrolls into view; mixed
   values (e.g. "1h 24m") render as-is. */
const INTEGER_PATTERN = /^\d+$/;

const MockNumber = ({ value, locale }: { value: string; locale: string }) =>
  INTEGER_PATTERN.test(value) ? (
    <NumberTicker value={Number(value)} locale={locale} />
  ) : (
    <>{value}</>
  );

export const ScanMock = ({ hint, coverSrc }: ScanMockProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-8 px-7">
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg viewBox="0 0 160 160" className="absolute inset-0" aria-hidden>
        <path
          d="M10 40V22a12 12 0 0 1 12-12h18M120 10h18a12 12 0 0 1 12 12v18M150 120v18a12 12 0 0 1-12 12h-18M40 150H22a12 12 0 0 1-12-12v-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="text-foreground/70"
        />
      </svg>
      <div className="flex gap-[3px]" aria-hidden>
        {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2].map((barWidth, index) => (
          <span
            key={index}
            className="h-16 rounded-[1px] bg-foreground/80"
            style={{ width: barWidth * 2 }}
          />
        ))}
      </div>
      <div className="scan-line absolute inset-x-4 top-1/2 h-0.5 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(16,185,129,0.6)]" />
    </div>
    <div className="cover-land">
      <Cover src={coverSrc} alt="" width={84} idle={false} />
    </div>
    <p className="text-center text-xs text-foreground/40">{hint}</p>
  </div>
);

export const SessionMock = ({
  coverSrc,
  bookTitle,
  bookAuthor,
  timer,
  pageProgress,
  endLabel,
  quote,
  quoteHighlight,
  quoteAuthor,
}: SessionMockProps) => {
  const highlightStart = quote.indexOf(quoteHighlight);
  const hasHighlight = highlightStart >= 0;
  const before = hasHighlight ? quote.slice(0, highlightStart) : quote;
  const after = hasHighlight
    ? quote.slice(highlightStart + quoteHighlight.length)
    : '';

  return (
    <div className="flex h-full flex-col px-5 pt-11 pb-4">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M14.5 6.5 9 12l5.5 5.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-current"
            aria-hidden
          >
            <path d="M8 5.5h2.5v13H8zM13.5 5.5H16v13h-2.5z" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-evenly">
        <Cover src={coverSrc} alt={bookTitle} width={86} glow idle={false} />

        <div className="text-center">
          <p className="font-serif text-[15px] font-bold tracking-tight">
            {bookTitle}
          </p>
          <p className="mt-0.5 text-xs text-foreground/50">{bookAuthor}</p>
        </div>

        <p className="text-[32px] leading-none font-bold tabular-nums">
          {timer}
        </p>

        <div className="w-full">
          <div className="relative h-1 w-full rounded-full bg-foreground/15">
            <div className="absolute inset-y-0 left-0 w-[57%] rounded-full bg-primary" />
            <span className="absolute top-1/2 left-[57%] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)]" />
          </div>
          <p className="mt-2 text-center text-[11px] text-foreground/60">
            {pageProgress}
          </p>
        </div>

        <div className="text-center">
          <p className="font-serif text-[11px] leading-relaxed italic text-foreground/70">
            {before}
            {hasHighlight ? (
              <span className="bg-primary/[0.18]">{quoteHighlight}</span>
            ) : null}
            {after}
          </p>
          <p className="mt-1 text-[10px] text-foreground/40">{quoteAuthor}</p>
        </div>
      </div>

      <div className="rounded-full bg-primary py-2.5 text-center text-xs font-semibold text-white">
        {endLabel}
      </div>
    </div>
  );
};

export const GoalsMock = ({
  overline,
  title,
  periods,
  range,
  heroHours,
  heroHoursUnit,
  cards,
  mostReadAuthor,
  authorName,
  authorCoverSrc,
  whatYouRead,
  subjects,
  locale,
}: GoalsMockProps) => (
  <div className="flex h-full flex-col gap-2.5 px-4 pt-11 pb-4">
    <div>
      <p className="text-[10px] text-foreground/40">{overline}</p>
      <p className="font-serif text-[22px] leading-tight font-bold tracking-tight">
        {title}
      </p>
    </div>

    <div className="flex rounded-xl bg-foreground/[0.06] p-0.5">
      {periods.map((period, index) => (
        <span
          key={period}
          className={`flex-1 rounded-[9px] py-1.5 text-center text-[11px] ${
            index === 0
              ? 'bg-card font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]'
              : 'font-medium text-foreground/40'
          }`}
        >
          {period}
        </span>
      ))}
    </div>

    <div>
      <p className="text-[10px] text-foreground/40">{range}</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="font-serif text-[40px] leading-none font-bold tracking-tight">
          <MockNumber value={heroHours} locale={locale} />
        </span>
        <span className="font-serif text-[15px] font-bold text-foreground/45">
          {heroHoursUnit}
        </span>
      </p>
    </div>

    <div className="grid grid-cols-2 gap-2">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl bg-card p-2.5">
          <p className="text-[8px] tracking-[0.05em] uppercase text-foreground/40">
            {card.label}
          </p>
          <p className="mt-1 font-serif text-[19px] leading-none font-bold tracking-tight">
            <MockNumber value={card.value} locale={locale} />
            {card.suffix ? (
              <span className="text-[11px] text-foreground/45">
                {' '}
                {card.suffix}
              </span>
            ) : null}
          </p>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-3 rounded-xl bg-card p-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-[8px] tracking-[0.05em] uppercase text-foreground/40">
          {mostReadAuthor}
        </p>
        <p className="mt-1 truncate font-serif text-[15px] font-bold tracking-tight">
          {authorName}
        </p>
      </div>
      <Cover src={authorCoverSrc} alt={authorName} width={26} idle={false} />
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-[8px] tracking-[0.05em] uppercase text-foreground/40">
        {whatYouRead}
      </p>
      {subjects.map((subject) => (
        <div key={subject.name}>
          <div className="flex items-baseline justify-between">
            <p className="text-[11px]">{subject.name}</p>
            <p className="text-[10px] text-foreground/45">{subject.percent}%</p>
          </div>
          <div className="mt-1 flex h-[3px] overflow-hidden rounded-full bg-foreground/15">
            <div
              className="rounded-full bg-primary"
              style={{ width: `${subject.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
