import { Link } from '@/i18n/navigation';

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'glass' | 'ink';
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const BASE_CLASSES =
  'inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[transform,opacity,background-color] duration-300 hover:scale-[1.03] active:scale-[0.98]';

const VARIANT_CLASSES = {
  primary:
    'bg-primary text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.7)] hover:opacity-95',
  glass: 'glass-pill text-foreground',
  ink: 'bg-ink text-white dark:bg-white dark:text-black',
};

export const Button = ({
  children,
  href,
  variant = 'primary',
  external = false,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) => {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
