'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { useSiteHeader } from '@/hooks/use-site-header';

export const SiteHeader = () => {
  const t = useTranslations('nav');
  const { menuOpen, handleToggleMenu, handleCloseMenu } = useSiteHeader();

  const navLinks = [
    { href: '/#features', label: t('features') },
    { href: '/#discover', label: t('discover') },
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/[0.03] bg-background/30 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-3 px-4 md:h-23 md:gap-4 md:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="Readen"
        >
          <Logo markSize={28} />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-[0.95rem] font-medium text-foreground/55 transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 md:block">
          <Button href="/#download" variant="ink" className="h-12 px-6">
            {t('getApp')}
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <Button
            href="/#download"
            variant="ink"
            className="h-10 px-4 text-[0.8rem]"
          >
            {t('getApp')}
          </Button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('close') : t('menu')}
            onClick={handleToggleMenu}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              aria-hidden
            >
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-foreground/[0.03] px-4 py-3 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center rounded-xl px-1 text-[0.95rem] font-medium text-foreground/55 transition-colors hover:text-foreground"
                onClick={handleCloseMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};
