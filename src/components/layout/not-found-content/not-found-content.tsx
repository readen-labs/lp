import { Button } from '@/components/ui/button';
import { Cover } from '@/components/brand/cover';

import type { NotFoundContentProps } from './not-found-content.types';

export const NotFoundContent = ({
  title,
  body,
  homeLabel,
}: NotFoundContentProps) => (
  <section className="mx-auto flex max-w-lg flex-col items-center px-5 py-32 text-center">
    <div className="mb-8">
      <Cover alt="" width={120} idle={false} />
    </div>
    <h1 className="mb-4 font-serif text-3xl font-bold">{title}</h1>
    <p className="mb-8 text-foreground/60">{body}</p>
    <Button href="/">{homeLabel}</Button>
  </section>
);
