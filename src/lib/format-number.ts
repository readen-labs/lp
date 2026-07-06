export const formatCompactNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale, { notation: 'compact' }).format(value);
