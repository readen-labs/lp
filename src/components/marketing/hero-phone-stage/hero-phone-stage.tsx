'use client';

import { useHeroPhoneStage } from '@/hooks/use-hero-phone-stage';

import type { HeroPhoneStageProps } from './hero-phone-stage.types';

export const HeroPhoneStage = ({
  left,
  center,
  right,
}: HeroPhoneStageProps) => {
  const { stageRef, offset } = useHeroPhoneStage();

  return (
    <div
      ref={stageRef}
      className="hero-phone-stage relative mx-auto mt-12 h-140 w-full max-w-[48rem] overflow-x-clip sm:h-148 md:mt-16 md:h-[min(72vw,46rem)] md:max-w-[56rem] md:overflow-x-visible"
    >
      <div className="hero-phone hero-phone--left absolute top-[8%] left-1/2 z-0 w-59 min-w-59 origin-bottom -translate-x-[108%] sm:w-61 sm:min-w-61 sm:-translate-x-[110%] md:top-[6%] md:left-0 md:w-[34%] md:min-w-0 md:max-w-none md:translate-x-0">
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(${offset.x * -0.55}px, ${offset.y * 0.45}px, 0) rotate(-7deg)`,
          }}
        >
          {left}
        </div>
      </div>

      <div className="hero-phone hero-phone--center absolute top-0 left-1/2 z-10 w-66 min-w-66 -translate-x-1/2 sm:w-68 sm:min-w-68 md:w-[38%] md:min-w-0 md:max-w-none">
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(0, ${offset.y}px, 0)`,
          }}
        >
          {center}
        </div>
      </div>

      <div className="hero-phone hero-phone--right absolute top-[8%] left-1/2 z-0 w-59 min-w-59 origin-bottom translate-x-[8%] sm:w-61 sm:min-w-61 sm:translate-x-[10%] md:top-[6%] md:right-0 md:left-auto md:w-[34%] md:min-w-0 md:max-w-none md:translate-x-0">
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(${offset.x * 0.55}px, ${offset.y * 0.45}px, 0) rotate(7deg)`,
          }}
        >
          {right}
        </div>
      </div>
    </div>
  );
};
