'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

/**
 * Two buttons rather than a select: there are only ever two locales, and a
 * radio-group pattern reads the current language out loud without opening
 * anything.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('localeSwitcher');
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active) return;
    // Read the query string here rather than with `useSearchParams`, which
    // would opt every page that renders the header into dynamic rendering.
    const search = typeof window === 'undefined' ? '' : window.location.search;
    startTransition(() => {
      router.replace(`${pathname}${search}`, { locale: next });
    });
  }

  return (
    <div
      role="radiogroup"
      aria-label={t('label')}
      className={[
        'inline-flex rounded-md bg-surface-sunken p-0.5 ring-1 ring-line ring-inset',
        isPending ? 'opacity-70' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {locales.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            role="radio"
            aria-checked={isActive}
            lang={locale}
            onClick={() => switchTo(locale)}
            className={`rounded-[5px] px-2.5 py-1 text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-surface text-ink shadow-sm'
                : 'text-ink-subtle hover:text-ink'
            }`}
          >
            <span aria-hidden="true">{t(locale === 'ka' ? 'kaShort' : 'enShort')}</span>
            <span className="sr-only">{t(locale)}</span>
          </button>
        );
      })}
    </div>
  );
}
