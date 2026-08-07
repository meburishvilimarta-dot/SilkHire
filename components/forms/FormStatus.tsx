'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { CheckMark } from '@/components/ui/Badge';
import { siteConfig } from '@/data/site';

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Replaces the form on success. `role="status"` so the outcome is announced
 * rather than silently swapped in.
 */
export function FormSuccess({
  replyDays,
  onReset,
}: {
  replyDays: number;
  onReset: () => void;
}) {
  const t = useTranslations('forms.success');

  return (
    <div
      role="status"
      style={{ animation: 'rise-in 0.6s var(--ease-out-soft) both' }}
      className="rounded-lg bg-surface p-9 text-center ring-1 ring-line ring-inset sm:p-12"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand">
        <CheckMark className="h-6 w-6" />
      </span>
      <h3 className="text-display mt-6 text-2xl">{t('title')}</h3>
      <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
        {t('body', { days: replyDays, email: siteConfig.contactEmail })}
      </p>
      <Button variant="secondary" onClick={onReset} className="mt-7">
        {t('again')}
      </Button>
    </div>
  );
}

/** Sits above the form when the request itself failed. */
export function FormError() {
  const t = useTranslations('forms.failure');

  return (
    <div
      role="alert"
      className="rounded-md border-l-2 border-danger bg-danger-soft px-5 py-4"
    >
      <h3 className="text-sm font-semibold text-danger">{t('title')}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        {t('body', { email: siteConfig.contactEmail })}
      </p>
    </div>
  );
}

/**
 * Announced after a failed submit, so a screen-reader user learns there are
 * errors without tabbing through every field to find them.
 */
export function ErrorSummary({ count }: { count: number }) {
  const t = useTranslations('forms');
  if (count === 0) return null;

  return (
    <p
      role="alert"
      className="rounded-md border-l-2 border-danger bg-danger-soft px-5 py-3.5 text-sm font-medium text-danger"
    >
      {t('errorSummaryTitle', { count })}
    </p>
  );
}

/** Hidden bait field. Real people never see it; bots fill everything. */
export function Honeypot({
  name,
  registration,
}: {
  name: string;
  registration: Record<string, unknown>;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={`hp-${name}`}>Leave this field empty</label>
      <input
        id={`hp-${name}`}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...registration}
      />
    </div>
  );
}

/** Spinner shown inside the submit button while the request is in flight. */
export function SubmitSpinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 animate-spin"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
