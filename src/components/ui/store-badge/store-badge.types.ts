export type StoreBadgeProps = {
  store: 'ios' | 'android';
  href: string;
  eyebrow: string;
  label: string;
  tone?: 'default' | 'onDark';
  className?: string;
};
