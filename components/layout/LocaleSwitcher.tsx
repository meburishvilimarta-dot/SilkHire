'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

/**
 * A segmented control: two options, both visible, with the selection sliding
 * between them. Only two locales exist, so a dropdown would hide half the
 * choice behind a tap.
 *
 * Each segment is a real radio, so the control announces itself as a group and
 * works from the keyboard without any extra handling.
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
        'relative inline-flex rounded-full bg-fill p-0.5 transition-opacity',
        isPending ? 'opacity-60' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-bg shadow-raised transition-transform duration-[--duration-medium] ease-[--ease-emphasized]"
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
            className={`text-caption relative z-10 min-h-11 min-w-12 rounded-full px-3 transition-colors duration-[--duration-fast] ${
              isActive ? 'text-label' : 'text-label-secondary hover:text-label'
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
