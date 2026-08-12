import type { OpenRoleCardProps } from './open-role-card.types';

export const OpenRoleCard = ({
  title,
  body,
  applyHref,
  applyLabel,
}: OpenRoleCardProps) => (
  <div className="flex flex-col gap-4 rounded-[1.75rem] bg-card p-8 text-left">
    <h3 className="font-serif text-xl font-semibold tracking-tight">{title}</h3>
    <p className="flex-1 leading-relaxed text-foreground/65">{body}</p>
    <a
      href={applyHref}
      className="mt-auto inline-flex h-10 w-fit items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
    >
      {applyLabel}
    </a>
  </div>
);
