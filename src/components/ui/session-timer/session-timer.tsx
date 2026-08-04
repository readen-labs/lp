'use client';

import { useSessionTimer } from '@/hooks/use-session-timer';

import type { SessionTimerProps } from './session-timer.types';

/* A genuinely ticking session clock — the web stand-in for the SwiftUI timer
   Text in the app's Live Activity. Renders the initial value on the server so
   there's no hydration flash, then counts up client-side. */
export const SessionTimer = ({
  initialSeconds,
  className = '',
}: SessionTimerProps) => {
  const seconds = useSessionTimer(initialSeconds);

  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, '0');

  return (
    <span className={`tabular-nums ${className}`}>
      {minutes}:{remainder}
    </span>
  );
};
