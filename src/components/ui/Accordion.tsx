'use client';

import { useId, useState } from 'react';

import {
  ACCORDION_CHEVRON_ROTATION_OPEN_DEG,
  ACCORDION_TRANSITION_MS,
} from '@/lib/constants/accordion';

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

export type AccordionProps = {
  items: AccordionItem[];
};

export const Accordion = ({ items }: AccordionProps) => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

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
              onClick={() => setOpenId(isOpen ? null : item.id)}
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
