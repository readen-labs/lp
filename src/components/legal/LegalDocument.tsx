export type LegalSection = {
  title: string;
  body: string;
};

export type LegalDocumentProps = {
  title: string;
  draftNotice: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export const LegalDocument = ({
  title,
  draftNotice,
  lastUpdated,
  intro,
  sections,
}: LegalDocumentProps) => (
  <article className="mx-auto max-w-3xl px-5 py-16">
    <p className="mb-6 text-sm font-medium text-foreground/40">{draftNotice}</p>
    <h1 className="mb-2 font-serif text-4xl font-bold">{title}</h1>
    <p className="mb-10 text-sm text-foreground/40">{lastUpdated}</p>
    <p className="mb-8 leading-relaxed text-foreground/80">{intro}</p>
    {sections.map((section) => (
      <section key={section.title} className="mb-8">
        <h2 className="mb-3 font-serif text-xl font-semibold">{section.title}</h2>
        <p className="leading-relaxed text-foreground/80">{section.body}</p>
      </section>
    ))}
  </article>
);
