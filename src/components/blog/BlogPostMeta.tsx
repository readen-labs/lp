import { formatDate } from '@/lib/format-date';

import type { BlogPost } from '@/lib/mdx';

export type BlogPostMetaProps = {
  post: BlogPost;
  locale: string;
  minRead: string;
};

export const BlogPostMeta = ({ post, locale, minRead }: BlogPostMetaProps) => (
  <p className="text-sm text-foreground/45">
    {formatDate(post.date, locale)} · {minRead}
  </p>
);
