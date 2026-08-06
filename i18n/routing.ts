import { defineRouting } from 'next-intl/routing';

export const locales = ['ka', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ka';

/**
 * `localePrefix: 'always'` means `/` redirects to `/ka` and every route is
 * reachable at exactly one URL per locale — which keeps hreflang honest and
 * avoids a duplicate-content pair for the default locale.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
