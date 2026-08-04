import type { BlogTagChipProps } from './blog-tag-chip.types';

export const BlogTagChip = ({ tag }: BlogTagChipProps) => (
  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-deep">
    {tag}
  </span>
);
