import { Cover } from '@/components/brand/Cover';

import { BLOG_COVER_PANEL_GRADIENT } from '@/lib/constants/blog';
import type { BlogPost } from '@/lib/mdx';

export type BlogCoverPanelProps = {
  post: BlogPost;
  coverWidth: number;
  className?: string;
};

export const BlogCoverPanel = ({
  post,
  coverWidth,
  className = '',
}: BlogCoverPanelProps) => (
  <div
    className={`flex items-center justify-center ${BLOG_COVER_PANEL_GRADIENT} bg-background ${className}`}
  >
    {post.cover ? (
      <Cover src={post.cover} alt={post.title} width={coverWidth} />
    ) : null}
  </div>
);
