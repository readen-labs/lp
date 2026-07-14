import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { Cover } from '@/components/brand/Cover';
import { EditorialHeader } from '@/components/brand/EditorialHeader';
import { Reveal } from '@/components/ui/Reveal';

import { FEATURE_MOCK_BOOKS } from '@/lib/data/feature-mock-books';
import { DISCOVER_PEOPLE } from '@/lib/data/people';

const PILLARS = ['pillar1', 'pillar2', 'pillar3'] as const;

const VIGNETTE_COVER_WIDTH = 46;

const VIGNETTE_AVATAR_SIZE = 44;

const VIGNETTE_AVATAR_COUNT = 4;

/* "Your room" — a Do-Not-Disturb moon in a glass pill: the app's promise of
   quiet, drawn in its own liquid-glass language. */
const QuietVignette = () => (
  <span className="glass-pill flex h-14 w-14 items-center justify-center rounded-full">
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-foreground/70" aria-hidden>
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"
        fill="currentColor"
      />
    </svg>
  </span>
);

/* "Craft you feel" — a living cover (sway + sheen) standing on a miniature
   glass ledge, the product's signature detail at postage-stamp scale. */
const CraftVignette = () => (
  <span className="relative flex justify-center pb-1.5">
    <Cover
      src={FEATURE_MOCK_BOOKS.scan.cover}
      alt=""
      width={VIGNETTE_COVER_WIDTH}
    />
    <span
      className="shelf-glass absolute bottom-0 h-2.5 w-24 rounded-full"
      aria-hidden
    />
  </span>
);

/* "Readers worth trusting" — the curators, overlapping like a reading circle. */
const PeopleVignette = () => (
  <span className="flex -space-x-3">
    {DISCOVER_PEOPLE.slice(0, VIGNETTE_AVATAR_COUNT).map((person) => (
      <Image
        key={person.name}
        src={person.avatar}
        alt=""
        width={VIGNETTE_AVATAR_SIZE}
        height={VIGNETTE_AVATAR_SIZE}
        className="rounded-full bg-background ring-2 ring-card"
      />
    ))}
  </span>
);

const PILLAR_VIGNETTES: Record<(typeof PILLARS)[number], React.ReactNode> = {
  pillar1: <QuietVignette />,
  pillar2: <CraftVignette />,
  pillar3: <PeopleVignette />,
};

export const IdentitySection = async () => {
  const t = await getTranslations('identity');

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
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

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <Reveal key={pillar} delay={120 + index * 80} scale>
            <article className="identity-pillar flex h-full flex-col rounded-[1.75rem] bg-card p-8 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.28)]">
              <div
                className="flex h-28 items-center justify-center rounded-2xl bg-foreground/[0.03]"
                aria-hidden
              >
                {PILLAR_VIGNETTES[pillar]}
              </div>
              <p className="mt-6 font-serif text-sm font-bold text-primary-deep">
                0{index + 1}
              </p>
              <h3 className="font-serif mt-3 text-2xl font-semibold tracking-tight">
                {t(`${pillar}Title`)}
              </h3>
              <p className="mt-1 text-sm font-medium text-foreground/45">
                {t(`${pillar}Eyebrow`)}
              </p>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/65">
                {t(`${pillar}Body`)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
