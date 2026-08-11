export const truncateAtWordBoundary = (
  text: string,
  maxLength: number,
): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;

  return `${trimmed.trimEnd()}…`;
};
