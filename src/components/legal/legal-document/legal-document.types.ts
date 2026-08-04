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
