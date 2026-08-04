import { formatDate } from '@/utils/format-date';

import type { BlogPostMetaProps } from './blog-post-meta.types';

export const BlogPostMeta = ({ post, locale, minRead }: BlogPostMetaProps) => (
  <p className="text-sm text-foreground/45">
    {formatDate(post.date, locale)} · {minRead}
  </p>
);
