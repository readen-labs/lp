import { Cover } from '@/components/brand/cover';
import { BLOG_COVER_PANEL_GRADIENT } from '@/constants/blog';

import type { BlogCoverPanelProps } from './blog-cover-panel.types';

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
