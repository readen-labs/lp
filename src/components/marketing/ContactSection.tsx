import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/Reveal';

import { CONTACT_EMAIL } from '@/lib/config';

export const ContactSection = async () => {
  const t = await getTranslations('contact');

  return (
    <section className="overflow-hidden px-5 py-28 md:py-40">
      <Reveal>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label={t('emailAria')}
          className="font-serif block text-center leading-none font-bold tracking-tight text-foreground/[0.14] transition-colors duration-300 hover:text-foreground/30"
          style={{ fontSize: 'clamp(1.75rem, 12vw, 12rem)' }}
        >
          {CONTACT_EMAIL}
        </a>
      </Reveal>
    </section>
  );
};
