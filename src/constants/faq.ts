export const FAQ_ITEM_KEYS = [
  'what',
  'platforms',
  'free',
  'scan',
  'data',
  'account',
  'offline',
  'delete',
  'recommendations',
  'contact',
] as const;

export type FaqItemKey = (typeof FAQ_ITEM_KEYS)[number];
