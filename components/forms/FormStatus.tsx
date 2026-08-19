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
      style={{ animation: 'rise-in var(--duration-slow) var(--ease-emphasized) both' }}
      className="rounded-lg border border-separator bg-bg-secondary p-9 text-center sm:p-12"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive-muted text-positive">
        <CheckMark className="h-6 w-6" />
      </span>
      <h3 className="text-title-2 mt-6">{t('title')}</h3>
      <p className="text-callout measure mx-auto mt-3 text-label-secondary">
        {t('body', { days: replyDays, email: siteConfig.contactEmail })}
      </p>
      <Button variant="bordered" onClick={onReset} className="mt-7">
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
      className="rounded-sm border border-critical/30 bg-critical-muted px-5 py-4"
    >
      <h3 className="text-headline text-critical">{t('title')}</h3>
      <p className="text-subheadline mt-1.5 text-label-secondary">
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
      className="text-subheadline rounded-sm border border-critical/30 bg-critical-muted px-5 py-3.5 font-medium text-critical"
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
