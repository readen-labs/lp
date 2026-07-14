import { getTranslations } from 'next-intl/server';

import { Logo } from '@/components/brand/Logo';
import { SocialIconLink, type SocialNetwork } from '@/components/ui/SocialIcon';

import { Link } from '@/i18n/navigation';

import { CONTACT_EMAIL, SOCIAL_LINKS, STORE_LINKS } from '@/lib/config';

const SOCIAL_ORDER: SocialNetwork[] = [
  'linkedin',
  'instagram',
  'tiktok',
  'x',
  'youtube',
];

export const SiteFooter = async () => {
  const t = await getTranslations('footer');

  const columns = [
    {
      title: t('product'),
      links: [
        { label: t('downloadIos'), href: STORE_LINKS.ios, external: true },
        {
          label: t('downloadAndroid'),
          href: STORE_LINKS.android,
          external: true,
        },
        { label: t('faq'), href: '/#faq', external: false },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('about'), href: '/about', external: false },
        { label: t('blog'), href: '/blog', external: false },
        {
          label: t('support'),
          href: `mailto:${CONTACT_EMAIL}`,
          external: true,
        },
      ],
    },
    {
      title: t('legal'),
      links: [
        { label: t('terms'), href: '/terms', external: false },
        { label: t('privacy'), href: '/privacy', external: false },
      ],
    },
  ];

  return (
    <footer className="footer-ink relative mt-10 overflow-hidden text-foreground">
      <div className="mx-auto max-w-6xl px-5 pt-20 pb-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo markSize={34} />
            <p className="mt-5 max-w-xs leading-relaxed text-foreground/60">
              {t('tagline')}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {SOCIAL_ORDER.map((network) => (
                <SocialIconLink
                  key={network}
                  network={network}
                  href={SOCIAL_LINKS[network]}
                  label={t(`social.${network}`)}
                />
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold tracking-wide text-foreground/40 uppercase">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {column.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith('mailto:') ? undefined : '_blank'
                        }
                        rel="noopener noreferrer"
                        className="text-[0.95rem] text-foreground/60 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-foreground/60 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <p
          className="font-serif pointer-events-none mt-16 -mb-6 text-center text-[clamp(4rem,18vw,13rem)] leading-none font-bold tracking-tight text-foreground/[0.05] select-none"
          aria-hidden
        >
          Readen
        </p>

        <div className="mt-10 border-t border-foreground/10 pt-8">
          <p className="text-center text-sm text-foreground/40">
            {t('copyright')} {new Date().getFullYear()} · {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};
