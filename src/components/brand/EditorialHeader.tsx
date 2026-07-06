export type EditorialHeaderProps = {
  overline: string;
  title: string;
  size?: 'default' | 'hero';
  align?: 'left' | 'center';
  headingLevel?: 'h1' | 'h2';
};

const HERO_TITLE_CLAMP = 'clamp(2.75rem, 7vw, 5.25rem)';
const DEFAULT_TITLE_CLAMP = 'clamp(2rem, 4.5vw, 3.25rem)';

export const EditorialHeader = ({
  overline,
  title,
  size = 'default',
  align = 'left',
  headingLevel = 'h2',
}: EditorialHeaderProps) => {
  const titleSize = size === 'hero' ? HERO_TITLE_CLAMP : DEFAULT_TITLE_CLAMP;
  const centered = align === 'center';
  const Heading = headingLevel;

  return (
    <header className={centered ? 'text-center' : ''}>
      <p
        className={`mb-4 flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-primary-deep ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-6 bg-primary-deep/60" aria-hidden />
        {overline}
        {centered ? <span className="h-px w-6 bg-primary-deep/60" aria-hidden /> : null}
      </p>
      <Heading className="display" style={{ fontSize: titleSize }}>
        {title}
      </Heading>
    </header>
  );
};
