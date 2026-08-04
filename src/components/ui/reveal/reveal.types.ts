export type RevealProps = {
  children: React.ReactNode;
  /** Transition delay in ms, for staggering siblings. */
  delay?: number;
  /** Adds a slight scale-up to the entrance. */
  scale?: boolean;
  className?: string;
};
