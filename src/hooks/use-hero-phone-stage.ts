import { useRef, useState, useEffect } from 'react';

type ParallaxOffset = {
  x: number;
  y: number;
};

const INITIAL_OFFSET: ParallaxOffset = { x: 0, y: 0 };

export const useHeroPhoneStage = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<ParallaxOffset>(INITIAL_OFFSET);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) {
      return;
    }

    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) {
      return;
    }

    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const stage = stageRef.current;

        if (!stage) {
          return;
        }

        const rect = stage.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const strength = isMobile ? 0.55 : 1;

        setOffset({
          x: progress * 14 * strength,
          y: progress * -22 * strength,
        });
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [active]);

  return { stageRef, offset };
};
