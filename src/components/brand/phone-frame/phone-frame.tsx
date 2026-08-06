import { Iphone } from '@/components/ui/iphone';

import type { PhoneFrameProps } from './phone-frame.types';

const SIZE_CLASS = {
  md: 'w-[min(264px,100%)]',
  lg: 'w-[min(280px,100%)] md:w-[300px]',
  fill: 'w-full',
} as const;

/* Device frame for feature vignettes — Magic UI iPhone chrome wrapping the
   live React mocks so screens stay pixel-honest to the app. */
export const PhoneFrame = ({
  children,
  className = '',
  size = 'md',
}: PhoneFrameProps) => (
  <div
    className={`relative shrink-0 drop-shadow-[0_28px_70px_-24px_rgba(0,0,0,0.45)] ${SIZE_CLASS[size]} ${className}`}
  >
    <Iphone>{children}</Iphone>
  </div>
);
