import { getTranslations } from 'next-intl/server';

import { Cover } from '@/components/brand/Cover';
import { Shelf } from '@/components/brand/Shelf';
import { StoreBadge } from '@/components/ui/StoreBadge';

import { STORE_LINKS } from '@/lib/config';
import { SHELF_BOOKS } from '@/lib/data/shelf-books';

const HERO_COVER_WIDTH = 128;
const PRIORITY_COVERS = 6;

export const HeroSection = async () => {
  const t = await getTranslations('hero');

  return (
    <section className="hero-wash relative -mt-20 overflow-hidden pt-40 pb-20 md:pt-48">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <p
          className="glass-pill animate-rise mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.8rem] font-medium text-foreground/70"
          style={{ '--rise-delay': '0ms' } as React.CSSProperties}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          {t('overline')}
        </p>

        <h1
          className="display animate-rise mx-auto mt-6 max-w-4xl"
          style={
            {
              fontSize: 'clamp(2.9rem, 8vw, 6rem)',
              '--rise-delay': '90ms',
            } as React.CSSProperties
          }
        >
          {t('title')}
        </h1>

        <p
          className="animate-rise mx-auto mt-6 max-w-xl text-lg text-foreground/60"
          style={{ '--rise-delay': '180ms' } as React.CSSProperties}
        >
          {t('tagline')}
        </p>

        <div
          className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ '--rise-delay': '270ms' } as React.CSSProperties}
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

      <div
        className="animate-rise relative mx-auto mt-16 max-w-6xl px-4 md:mt-20"
        style={{ '--rise-delay': '380ms' } as React.CSSProperties}
      >
        <Shelf drift>
          {SHELF_BOOKS.map((book, index) => (
            <Cover
              key={book.isbn}
              src={book.cover}
              alt={book.title}
              width={HERO_COVER_WIDTH}
              priority={index < PRIORITY_COVERS}
            />
          ))}
        </Shelf>
      </div>
    </section>
  );
};
