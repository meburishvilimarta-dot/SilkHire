import type { Locale } from '@/i18n/routing';
import type { HourlyRateRange } from '@/types/agency';

/** BCP 47 tags for Intl. Georgian is `ka-GE`. */
const intlLocale: Record<Locale, string> = {
  ka: 'ka-GE',
  en: 'en-GB',
};

export function formatUsd(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale]).format(value);
}

/**
 * `$24–38`. Deliberately a bare `$` rather than `Intl` currency formatting:
 * `ka-GE` renders USD as a trailing `US$`, which turns a range into the
 * unreadable `24 US$–38`.
 */
export function formatRateRange(rate: HourlyRateRange, locale: Locale): string {
  return `$${formatNumber(rate.minUsd, locale)}–${formatNumber(rate.maxUsd, locale)}`;
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: 'numeric',
    month: 'long',
  }).format(new Date(isoDate));
}

/** Splits seeded prose on blank lines into paragraphs. */
export function toParagraphs(text: string): string[] {
  return text.split('\n\n').map((paragraph) => paragraph.trim()).filter(Boolean);
}
