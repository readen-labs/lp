import type { BlogPost } from '@/lib/mdx';

export type BlogPostCardProps = {
  post: BlogPost;
  locale: string;
  minRead: string;
};
