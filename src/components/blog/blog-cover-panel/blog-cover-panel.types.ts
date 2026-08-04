import type { BlogPost } from '@/lib/mdx';

export type BlogCoverPanelProps = {
  post: BlogPost;
  coverWidth: number;
  className?: string;
};
