'use client';

import { useAccordion } from '@/hooks/use-accordion';
import {
  ACCORDION_TRANSITION_MS,
  ACCORDION_CHEVRON_ROTATION_OPEN_DEG,
} from '@/constants/accordion';

import type { AccordionProps } from './accordion.types';

export const Accordion = ({ items }: AccordionProps) => {
  const { baseId, openId, handleToggle } = useAccordion();

  return (
    <div className="divide-y divide-foreground/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div key={item.id}>
            <button
              id={buttonId}
              type="button"
              className="flex min-h-[44px] w-full items-center justify-between gap-4 py-4 text-left text-base font-medium"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleToggle(item.id)}
            >
              {item.question}
              <span
                className="shrink-0 text-foreground/40 transition-transform"
                style={{
                  transform: isOpen
                    ? `rotate(${ACCORDION_CHEVRON_ROTATION_OPEN_DEG}deg)`
                    : 'rotate(0deg)',
                  transitionDuration: `${ACCORDION_TRANSITION_MS}ms`,
                }}
                aria-hidden
              >
                ↓
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen ? true : undefined}
              className="grid transition-[grid-template-rows,opacity]"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
                transitionDuration: `${ACCORDION_TRANSITION_MS}ms`,
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 leading-relaxed text-foreground/80">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
