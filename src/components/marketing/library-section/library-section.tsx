import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { Cover } from '@/components/brand/cover';
import { Shelf } from '@/components/brand/shelf';
import { SHELF_BOOKS } from '@/data/shelf-books';
import { EditorialHeader } from '@/components/brand/editorial-header';
import {
  LIBRARY_SHELF_GAP,
  LIBRARY_SHELF_BOOK_COUNT,
  LIBRARY_SHELF_COVER_WIDTH,
} from '@/constants/library';

const REVEAL_DELAY_BODY_MS = 120;

const COVER_IDLE_STAGGER_S = 1.3;

/* The app's library tabs, rendered as a static segmented control with
   "Reading" active — same pill treatment as the Goals mock's period picker. */
const STATUS_TABS = ['statusWant', 'statusReading', 'statusRead'] as const;

const ACTIVE_STATUS: (typeof STATUS_TABS)[number] = 'statusReading';

export const LibrarySection = async () => {
  const t = await getTranslations('library');
  const shelfBooks = SHELF_BOOKS.slice(0, LIBRARY_SHELF_BOOK_COUNT);

  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:py-40">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <Reveal>
            <EditorialHeader overline={t('overline')} title={t('title')} />
          </Reveal>
          <Reveal delay={REVEAL_DELAY_BODY_MS}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/60">
              {t('body')}
            </p>
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
