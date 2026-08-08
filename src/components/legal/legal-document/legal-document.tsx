import type { LegalDocumentProps } from './legal-document.types';

export const LegalDocument = ({
  title,
  draftNotice,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) => (
  <article className="mx-auto max-w-3xl px-5 pt-14 pb-24 md:pt-20">
    <header>
      <h1 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-foreground/45">
        {lastUpdated} · {draftNotice}
      </p>
    </header>

    <p className="mt-8 leading-relaxed text-foreground/75">{intro}</p>

    {sections.map((section, index) => (
      <section key={section.title} className="mt-10">
        <h2 className="font-serif text-xl font-semibold tracking-tight">
          {index + 1}. {section.title}
        </h2>
        <p className="mt-3 leading-relaxed text-foreground/70">
          {section.body}
        </p>
      </section>
    ))}
  </article>
);
