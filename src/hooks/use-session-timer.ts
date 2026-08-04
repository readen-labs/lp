import { useState, useEffect } from 'react';

const TICK_MS = 1000;

export const useSessionTimer = (initialSeconds: number): number => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => setSeconds((current) => current + 1), TICK_MS);

    return () => clearInterval(id);
  }, []);

  return seconds;
};
