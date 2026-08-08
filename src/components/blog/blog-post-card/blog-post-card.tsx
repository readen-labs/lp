import { Link } from '@/i18n/navigation';
import { BLOG_LIST_COVER_WIDTH } from '@/constants/blog';
import { BlogPostMeta } from '@/components/blog/blog-post-meta';
import { BlogCoverPanel } from '@/components/blog/blog-cover-panel';

import type { BlogPostCardProps } from './blog-post-card.types';

export const BlogPostCard = ({ post, locale, minRead }: BlogPostCardProps) => (
  <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
    <div className="overflow-hidden rounded-[1.5rem]">
      <BlogCoverPanel
        post={post}
        coverWidth={BLOG_LIST_COVER_WIDTH}
        className="h-60 transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <h3 className="font-serif mt-5 text-xl leading-snug font-semibold tracking-tight">
      {post.title}
    </h3>
    <div className="mt-2">
      <BlogPostMeta post={post} locale={locale} minRead={minRead} />
    </div>
  </Link>
);
