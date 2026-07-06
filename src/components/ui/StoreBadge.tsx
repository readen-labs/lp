export type StoreBadgeProps = {
  store: 'ios' | 'android';
  href: string;
  eyebrow: string;
  label: string;
  tone?: 'default' | 'onDark';
  className?: string;
};

const AppleGlyph = () => (
  <svg viewBox="0 0 384 512" className="h-5 w-5 fill-current" aria-hidden>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
    <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49zm3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5zM6.05 2.66l10.76 6.22-2.27 2.27z" />
  </svg>
);

const TONE_CLASS = {
  default: 'bg-black text-white dark:bg-white dark:text-black',
  onDark: 'bg-black text-white',
} as const;

export const StoreBadge = ({
  store,
  href,
  eyebrow,
  label,
  tone = 'default',
  className = '',
}: StoreBadgeProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex h-12 items-center gap-2.5 rounded-full py-2 pr-6 pl-5 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${TONE_CLASS[tone]} ${className}`}
  >
    {store === 'ios' ? <AppleGlyph /> : <PlayGlyph />}
    <span className="flex flex-col text-left leading-none">
      <span className="text-[0.58rem] tracking-wide opacity-65">{eyebrow}</span>
      <span className="mt-0.5 text-sm font-semibold tracking-tight">
        {label}
      </span>
    </span>
  </a>
);
