export type ScanMockProps = {
  hint: string;
  coverSrc: string;
};

export type SessionMockProps = {
  coverSrc: string;
  bookTitle: string;
  bookAuthor: string;
  timer: string;
  pageProgress: string;
  endLabel: string;
  quote: string;
  quoteHighlight: string;
  quoteAuthor: string;
};

export type GoalsMockCard = {
  label: string;
  value: string;
  suffix?: string;
};

export type GoalsMockSubject = {
  name: string;
  percent: number;
};

export type GoalsMockProps = {
  overline: string;
  title: string;
  periods: [string, string, string];
  range: string;
  heroHours: string;
  heroHoursUnit: string;
  cards: GoalsMockCard[];
  mostReadAuthor: string;
  authorName: string;
  authorCoverSrc: string;
  whatYouRead: string;
  subjects: GoalsMockSubject[];
  locale: string;
};
