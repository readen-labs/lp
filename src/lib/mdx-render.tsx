import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

import { Cover } from '@/components/brand/Cover';

const mdxComponents = {
  Cover,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 mb-5 font-serif text-[1.6rem] font-bold tracking-tight"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-5 text-[1.05rem] leading-[1.8] text-foreground/80"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-5 list-disc space-y-2.5 pl-6 text-[1.05rem] leading-[1.8] text-foreground/80"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-primary-deep underline-offset-4 hover:underline"
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-5 border-l-2 border-primary/50 pl-5 font-serif text-lg italic text-foreground/70"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

type MdxContentProps = {
  components?: typeof mdxComponents;
};

type MdxComponent = React.ComponentType<MdxContentProps>;

const compiledCache = new Map<string, MdxComponent>();

export const renderMdx = async (source: string) => {
  let Content = compiledCache.get(source);

  if (!Content) {
    const compiled = await compile(source, { outputFormat: 'function-body' });
    const { default: CompiledContent } = await run(String(compiled), {
      ...runtime,
      baseUrl: import.meta.url,
    });

    Content = CompiledContent as MdxComponent;
    compiledCache.set(source, Content);
  }

  return <Content components={mdxComponents} />;
};
