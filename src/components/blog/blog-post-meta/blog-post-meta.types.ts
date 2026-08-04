import type { BlogPost } from '@/lib/mdx';

export type BlogPostMetaProps = {
  post: BlogPost;
  locale: string;
  minRead: string;
};
