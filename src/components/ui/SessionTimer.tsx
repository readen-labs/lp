'use client';

import { useEffect, useState } from 'react';

export type SessionTimerProps = {
  /** Elapsed seconds the clock starts from (server-rendered value). */
  initialSeconds: number;
  className?: string;
};

const TICK_MS = 1000;

/* A genuinely ticking session clock — the web stand-in for the SwiftUI timer
   Text in the app's Live Activity. Renders the initial value on the server so
   there's no hydration flash, then counts up client-side. */
export const SessionTimer = ({
  initialSeconds,
  className = '',
}: SessionTimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => setSeconds((current) => current + 1), TICK_MS);

    return () => clearInterval(id);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, '0');

  return (
    <span className={`tabular-nums ${className}`}>
      {minutes}:{remainder}
    </span>
  );
};
