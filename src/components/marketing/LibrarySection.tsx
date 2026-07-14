import { getTranslations } from 'next-intl/server';

import { Cover } from '@/components/brand/Cover';
import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Shelf } from '@/components/brand/Shelf';
import { Reveal } from '@/components/ui/Reveal';

import {
  LIBRARY_SHELF_BOOK_COUNT,
  LIBRARY_SHELF_COVER_WIDTH,
  LIBRARY_SHELF_GAP,
} from '@/lib/constants/library';
import { SHELF_BOOKS } from '@/lib/data/shelf-books';

const REVEAL_DELAY_BODY_MS = 120;

const REVEAL_DELAY_POINTS_MS = 220;

const COVER_IDLE_STAGGER_S = 1.3;

/* The app's library tabs, rendered as a static segmented control with
   "Reading" active — same pill treatment as the Goals mock's period picker. */
const STATUS_TABS = ['statusWant', 'statusReading', 'statusRead'] as const;

const ACTIVE_STATUS: (typeof STATUS_TABS)[number] = 'statusReading';

type ValuePointProps = {
  index: number;
  text: string;
};

const ValuePoint = ({ index, text }: ValuePointProps) => (
  <li className="flex items-start gap-4">
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary-deep"
      aria-hidden
    >
      {index}
    </span>
    <p className="text-[1.05rem] leading-relaxed text-foreground/75">{text}</p>
  </li>
);

export const LibrarySection = async () => {
  const t = await getTranslations('library');
  const shelfBooks = SHELF_BOOKS.slice(0, LIBRARY_SHELF_BOOK_COUNT);

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
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
          <Reveal delay={REVEAL_DELAY_POINTS_MS}>
            <ul className="mt-8 flex flex-col gap-5">
              <ValuePoint index={1} text={t('point1')} />
              <ValuePoint index={2} text={t('point2')} />
              <ValuePoint index={3} text={t('point3')} />
            </ul>
          </Reveal>
        </div>

        <Reveal
          scale
          className="min-w-0 max-w-full overflow-hidden md:order-first"
        >
          <div className="mb-10 flex justify-center">
            <div
              className="flex w-full max-w-xs rounded-2xl bg-foreground/[0.06] p-1"
              aria-hidden
            >
              {STATUS_TABS.map((status) => (
                <span
                  key={status}
                  className={`flex-1 rounded-xl py-2 text-center text-sm ${
                    status === ACTIVE_STATUS
                      ? 'bg-card font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.12)]'
                      : 'font-medium text-foreground/45'
                  }`}
                >
                  {t(status)}
                </span>
              ))}
            </div>
          </div>
          <Shelf>
            <div
              className="flex w-full items-end justify-center"
              style={{ gap: LIBRARY_SHELF_GAP }}
            >
              {shelfBooks.map((book, index) => (
                <Cover
                  key={book.isbn}
                  src={book.cover}
                  alt={book.title}
                  width={LIBRARY_SHELF_COVER_WIDTH}
                  idleDelay={index * COVER_IDLE_STAGGER_S}
                />
              ))}
            </div>
          </Shelf>
        </Reveal>
      </div>
    </section>
  );
};
