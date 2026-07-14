import { getTranslations } from 'next-intl/server';

import { Cover } from '@/components/brand/Cover';
import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SessionTimer } from '@/components/ui/SessionTimer';

import { FEATURE_MOCK_BOOKS } from '@/lib/data/feature-mock-books';

/* Every literal below mirrors src/widgets/*.tsx in the readen repo — sizes,
   weights, and the 184/320 session state — so the marketing mocks stay
   pixel-honest to what actually ships on the phone. */
const PROGRESS_PERCENT = 57;

const TIMER_START_SECONDS = 23 * 60 + 14;

const MEDIUM_COVER_WIDTH = 60;

const LARGE_COVER_WIDTH = 76;

const SMALL_COVER_WIDTH = 96;

const BANNER_COVER_WIDTH = 46;

const SMALL_COVER_TILT_DEG = -8;

const SMALL_COVER_DROP_PX = 56;

const LOCK_CLOCK_TIME = '9:41';

type ProgressBarProps = {
  onDark?: boolean;
  className?: string;
};

const ProgressBar = ({ onDark = false, className = '' }: ProgressBarProps) => (
  <div
    className={`h-1 w-full overflow-hidden rounded-full ${
      onDark ? 'bg-white/20' : 'bg-foreground/15'
    } ${className}`}
    aria-hidden
  >
    <div
      className="h-full rounded-full bg-primary"
      style={{ width: `${PROGRESS_PERCENT}%` }}
    />
  </div>
);

const BookGlyph = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden>
    <path d="M12 5.5C10.5 4 8.3 3.25 5.75 3.25c-1 0-1.95.12-2.75.34v13.9c.8-.22 1.75-.33 2.75-.33 2.55 0 4.75.74 6.25 2.25 1.5-1.5 3.7-2.25 6.25-2.25 1 0 1.95.11 2.75.33V3.6c-.8-.23-1.75-.35-2.75-.35C15.7 3.25 13.5 4 12 5.5z" />
  </svg>
);

/* Shared card chrome for the three Home Screen widgets — iOS corner radius,
   theme card surface, the soft lifted shadow the covers already use. */
const WidgetCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-[1.5rem] bg-card ring-1 ring-foreground/[0.06] shadow-[0_20px_48px_-24px_rgba(0,0,0,0.4)] ${className}`}
  >
    {children}
  </div>
);

type WidgetCopy = {
  continueCaption: string;
  bookTitle: string;
  bookAuthor: string;
  pageProgress: string;
  quote: string;
  quoteAuthor: string;
};

/* systemMedium: cover left, caption/title/author right, progress row pinned
   to the bottom edge. */
const MediumWidget = ({ copy }: { copy: WidgetCopy }) => (
  <WidgetCard className="flex w-full max-w-[340px] gap-3 p-3.5">
    <Cover
      src={FEATURE_MOCK_BOOKS.session.cover}
      alt=""
      width={MEDIUM_COVER_WIDTH}
      idle={false}
    />
    <div className="flex min-w-0 flex-1 flex-col">
      <p className="text-xs font-semibold text-primary">
        {copy.continueCaption}
      </p>
      <p className="mt-1 truncate font-serif text-[15px] font-bold tracking-tight">
        {copy.bookTitle}
      </p>
      <p className="mt-0.5 text-xs text-foreground/50">{copy.bookAuthor}</p>
      <div className="mt-auto flex items-center gap-2 pt-2">
        <ProgressBar className="flex-1" />
        <span className="text-xs font-semibold text-primary tabular-nums">
          {PROGRESS_PERCENT}%
        </span>
      </div>
    </div>
  </WidgetCard>
);

/* systemSmall: the stat leads — caption + big serif accent percent — and the
   cover tilts and bleeds off the clipped bottom edge, like a book on a desk. */
const SmallWidget = ({ copy }: { copy: WidgetCopy }) => (
  <WidgetCard className="relative h-[160px] w-[160px] shrink-0 overflow-hidden">
    <div className="relative z-10 flex flex-col items-center pt-6">
      <p className="text-[11px] font-semibold">{copy.continueCaption}</p>
      <p className="font-serif text-[32px] font-bold text-primary tabular-nums">
        {PROGRESS_PERCENT}%
      </p>
    </div>
    <div
      className="absolute left-1/2"
      style={{
        bottom: -SMALL_COVER_DROP_PX,
        transform: `translateX(-50%) rotate(${SMALL_COVER_TILT_DEG}deg)`,
      }}
    >
      <Cover
        src={FEATURE_MOCK_BOOKS.session.cover}
        alt=""
        width={SMALL_COVER_WIDTH}
        idle={false}
      />
    </div>
  </WidgetCard>
);

/* systemLarge: header block, progress + page footer, then the book-matched
   daily quote anchored to the bottom — two deliberate groups, like the app. */
const LargeWidget = ({ copy }: { copy: WidgetCopy }) => (
  <WidgetCard className="flex w-full max-w-[340px] flex-col p-4">
    <div className="flex gap-3.5">
      <Cover
        src={FEATURE_MOCK_BOOKS.session.cover}
        alt=""
        width={LARGE_COVER_WIDTH}
        idle={false}
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold text-primary">
          {copy.continueCaption}
        </p>
        <p className="mt-1 font-serif text-[17px] font-bold tracking-tight">
          {copy.bookTitle}
        </p>
        <p className="mt-0.5 text-xs text-foreground/50">{copy.bookAuthor}</p>
      </div>
    </div>

    <div className="mt-4">
      <ProgressBar />
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <span className="text-xs text-foreground/60">{copy.pageProgress}</span>
        <span className="text-xs font-semibold text-primary tabular-nums">
          {PROGRESS_PERCENT}%
        </span>
      </div>
    </div>

    <div className="mt-6 flex flex-col">
      <span
        className="font-serif text-[22px] leading-none font-bold text-primary"
        aria-hidden
      >
        “
      </span>
      <p className="mt-1 font-serif text-[15px] leading-relaxed italic text-foreground/60">
        {copy.quote}
      </p>
      <p className="mt-2 text-xs font-semibold text-primary">
        — {copy.quoteAuthor}
      </p>
    </div>
  </WidgetCard>
);

type LockScreenCopy = WidgetCopy & {
  sessionCaption: string;
  lockDate: string;
};

/* The Lock Screen stage: Dynamic Island up top (book glyph + live timer, the
   compact layout), serif clock, and the Live Activity banner pinned to the
   bottom — same hierarchy as ReadingSessionActivity's banner. The island and
   banner always draw on black, exactly like iOS. */
const LockScreen = ({ copy }: { copy: LockScreenCopy }) => (
  <div
    className="relative flex h-full min-h-[540px] w-full flex-col overflow-hidden rounded-[2.75rem] p-5 pt-4 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
    style={{
      background:
        'radial-gradient(30rem 22rem at 50% 118%, rgba(16,185,129,0.22), transparent 70%), linear-gradient(180deg, #08090a 0%, #050506 100%)',
    }}
  >
    <div className="mx-auto flex h-[34px] w-[190px] items-center justify-between rounded-full bg-black px-4 ring-1 ring-white/10">
      <BookGlyph className="h-4 w-4 text-primary" />
      <SessionTimer
        initialSeconds={TIMER_START_SECONDS}
        className="text-sm font-bold text-primary"
      />
    </div>

    <div className="mt-10 text-center">
      <p className="text-sm font-medium text-white/55">{copy.lockDate}</p>
      <p className="mt-1 font-serif text-[64px] leading-none font-semibold tracking-tight text-white">
        {LOCK_CLOCK_TIME}
      </p>
    </div>

    <div className="flex-1" aria-hidden />

    <div className="rounded-[1.6rem] bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur-xl">
      <div className="flex gap-3.5">
        <Cover
          src={FEATURE_MOCK_BOOKS.session.cover}
          alt=""
          width={BANNER_COVER_WIDTH}
          idle={false}
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <BookGlyph className="h-3 w-3 shrink-0 text-primary" />
            <span className="truncate text-xs font-semibold text-primary">
              {copy.sessionCaption}
            </span>
            <SessionTimer
              initialSeconds={TIMER_START_SECONDS}
              className="ml-auto text-[17px] leading-none font-bold text-primary"
            />
          </div>
          <p className="truncate font-serif text-[15px] font-bold tracking-tight text-white">
            {copy.bookTitle}
          </p>
          <ProgressBar onDark />
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate text-xs text-white/60">
              {copy.pageProgress}
            </span>
            <span className="text-xs font-semibold text-primary tabular-nums">
              {PROGRESS_PERCENT}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      className="mx-auto mt-4 h-1 w-28 rounded-full bg-white/30"
      aria-hidden
    />
  </div>
);

const POINTS = ['point1', 'point2', 'point3'] as const;

const POINT_ICONS: Record<(typeof POINTS)[number], React.ReactNode> = {
  /* Home Screen — rounded app grid. */
  point1: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path
        d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
        opacity="0.9"
      />
    </svg>
  ),
  /* Dynamic Island — the pill. */
  point2: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <rect x="3" y="8" width="18" height="8" rx="4" />
    </svg>
  ),
  /* Daily quote — quotation mark. */
  point3: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M5 6.5C6.9 6.5 8.5 8.1 8.5 10c0 3.6-2.2 6.3-5 7.5l-.8-1.6c1.6-.8 2.8-2 3.2-3.5A3.5 3.5 0 0 1 5 6.5zm9.5 0c1.9 0 3.5 1.6 3.5 3.5 0 3.6-2.2 6.3-5 7.5l-.8-1.6c1.6-.8 2.8-2 3.2-3.5a3.5 3.5 0 0 1-.9-5.9z" />
    </svg>
  ),
};

export const WidgetsSection = async () => {
  const t = await getTranslations('widgets');

  const copy: LockScreenCopy = {
    continueCaption: t('continueCaption'),
    sessionCaption: t('sessionCaption'),
    bookTitle: t('bookTitle'),
    bookAuthor: t('bookAuthor'),
    pageProgress: t('pageProgress'),
    quote: t('quote'),
    quoteAuthor: t('quoteAuthor'),
    lockDate: t('lockDate'),
  };

  return (
    <section className="overflow-hidden bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <EditorialHeader
            overline={t('overline')}
            title={t('title')}
            align="center"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-foreground/60">
            {t('body')}
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-stretch justify-center gap-6">
          <Reveal scale className="w-full max-w-[356px]">
            <LockScreen copy={copy} />
          </Reveal>

          <Reveal
            delay={120}
            scale
            className="flex w-full max-w-[340px] flex-col items-center justify-center gap-6"
          >
            <MediumWidget copy={copy} />
            <SmallWidget copy={copy} />
          </Reveal>

          <Reveal
            delay={220}
            scale
            className="flex w-full max-w-[340px] items-center"
          >
            <LargeWidget copy={copy} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {POINTS.map((point, index) => (
            <Reveal key={point} delay={index * 100}>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-deep"
                  aria-hidden
                >
                  {POINT_ICONS[point]}
                </span>
                <h3 className="font-serif mt-4 text-xl font-semibold tracking-tight">
                  {t(`${point}Title`)}
                </h3>
                <p className="mt-2 max-w-xs leading-relaxed text-foreground/60">
                  {t(`${point}Body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
