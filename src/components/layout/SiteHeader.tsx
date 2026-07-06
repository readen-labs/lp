'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';

import { Link } from '@/i18n/navigation';

import { STORE_LINKS } from '@/lib/config';

export const SiteHeader = () => {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/#faq', label: t('faq') },
  ] as const;

  return (
    <header className="fixed top-4 right-0 left-0 z-50 flex justify-center px-4">
      <nav
        className="glass-pill flex w-full max-w-4xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4"
        aria-label="Main"
      >
        <Link href="/" className="flex items-center" aria-label="Readen">
          <Logo markSize={30} />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Button href={STORE_LINKS.ios} external variant="ink">
            {t('getApp')}
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button href={STORE_LINKS.ios} external variant="ink">
            {t('getApp')}
          </Button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground/70"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('close') : t('menu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
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
        <div className="glass-pill absolute top-[4.25rem] right-4 left-4 rounded-3xl p-5 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center rounded-xl px-3 text-[0.95rem] font-medium text-foreground/80 transition-colors hover:bg-foreground/5"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-foreground/10 pt-4">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
