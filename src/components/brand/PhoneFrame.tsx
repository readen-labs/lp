export type PhoneFrameProps = {
  children: React.ReactNode;
  className?: string;
};

/* Minimal device frame for the feature vignettes — ink body, dynamic-island
   pill, screen inherits the theme background so mocks read as the real app. */
export const PhoneFrame = ({ children, className = '' }: PhoneFrameProps) => (
  <div
    className={`relative w-[264px] shrink-0 rounded-[2.6rem] bg-ink p-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/10 dark:ring-white/10 ${className}`}
  >
    <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-background">
      <div
        className="absolute top-2.5 left-1/2 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-ink"
        aria-hidden
      />
      {children}
    </div>
  </div>
);
