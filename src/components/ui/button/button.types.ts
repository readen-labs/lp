export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'glass' | 'ink';
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};
