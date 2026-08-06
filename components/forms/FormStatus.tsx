'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/data/site';

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Rendered in place of the form on success, and above it on failure. Both
 * carry `role="status"` so the outcome is announced rather than silently
 * swapped in.
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
      className="rounded-lg bg-success-soft p-8 ring-1 ring-success/20 ring-inset"
    >
      <h3 className="text-lg font-semibold tracking-tight text-success">{t('title')}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {t('body', { days: replyDays, email: siteConfig.contactEmail })}
      </p>
      <Button variant="secondary" onClick={onReset} className="mt-5">
        {t('again')}
      </Button>
    </div>
  );
}

export function FormError() {
  const t = useTranslations('forms.failure');

  return (
    <div
      role="alert"
      className="rounded-lg bg-danger-soft p-5 ring-1 ring-danger/20 ring-inset"
    >
      <h3 className="text-sm font-semibold text-danger">{t('title')}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
        {t('body', { email: siteConfig.contactEmail })}
      </p>
    </div>
  );
}

/**
 * Announced after a failed submit so a screen-reader user learns there are
 * errors without having to tab back through every field to find them.
 */
export function ErrorSummary({ count }: { count: number }) {
  const t = useTranslations('forms');
  if (count === 0) return null;

  return (
    <p
      role="alert"
      className="rounded-md bg-danger-soft px-4 py-3 text-sm font-medium text-danger"
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
      <input id={`hp-${name}`} type="text" tabIndex={-1} autoComplete="off" {...registration} />
    </div>
  );
}
