'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

import type { Locale } from '@/i18n/routing';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
];

export const LocaleSwitcher = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1 text-xs text-foreground/40"
      role="group"
      aria-label={t('language')}
    >
      {LOCALES.map((item, index) => (
        <span key={item.code} className="flex items-center gap-1">
          {index > 0 ? <span aria-hidden>·</span> : null}
          <button
            type="button"
            className={`min-h-[44px] min-w-[28px] px-1 transition-colors ${
              locale === item.code
                ? 'font-semibold text-foreground'
                : 'hover:text-foreground/60'
            }`}
            onClick={() => router.replace(pathname, { locale: item.code })}
            aria-current={locale === item.code ? 'true' : undefined}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
};
