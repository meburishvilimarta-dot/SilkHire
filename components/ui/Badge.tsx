import type { ReactNode } from 'react';

type Tone = 'neutral' | 'brand' | 'accent' | 'success' | 'muted';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-sunken text-ink-muted ring-line',
  brand: 'bg-brand-soft text-brand-ink ring-brand/15',
  accent: 'bg-accent-soft text-accent ring-accent/15',
  success: 'bg-success-soft text-success ring-success/15',
  muted: 'bg-transparent text-ink-subtle ring-line',
};

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
