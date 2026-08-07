'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

/**
 * Two buttons rather than a dropdown — there are only ever two locales, and a
 * radio group announces the current language without opening anything. The
 * active pill slides between them.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('localeSwitcher');
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const activeIndex = locales.indexOf(active);

  function switchTo(next: Locale) {
    if (next === active) return;
    // Read the query here rather than with `useSearchParams`, which would opt
    // every page that renders the header into dynamic rendering.
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
        'relative inline-flex rounded-md p-0.5 ring-1 ring-void-ink/15 ring-inset transition-opacity',
        isPending ? 'opacity-60' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-[5px] bg-void-ink/12 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
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
            className={`relative z-10 min-w-11 rounded-[5px] px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide transition-colors duration-200 ${
              isActive ? 'text-void-ink' : 'text-void-muted hover:text-void-ink'
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
