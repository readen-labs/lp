export type ProgressBarProps = {
  onDark?: boolean;
  className?: string;
};

export type WidgetCopy = {
  continueCaption: string;
  bookTitle: string;
  bookAuthor: string;
  pageProgress: string;
  quote: string;
  quoteAuthor: string;
};

export type LockScreenCopy = WidgetCopy & {
  sessionCaption: string;
  lockDate: string;
};
