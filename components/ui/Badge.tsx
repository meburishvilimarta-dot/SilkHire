import type { ReactNode } from 'react';

type Tone = 'neutral' | 'brand' | 'accent' | 'outline' | 'dark';

const tones: Record<Tone, string> = {
  neutral: 'bg-sunken text-ink-muted ring-line',
  brand: 'bg-brand-soft text-brand-deep ring-brand/15',
  accent: 'bg-accent-soft text-accent ring-accent/20',
  outline: 'bg-transparent text-ink-subtle ring-line-strong',
  dark: 'bg-void-ink/8 text-void-ink ring-void-ink/15',
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
      className={`inline-flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.02em] whitespace-nowrap ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Small check used inside vetted badges and specialty lists. */
export function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-3 w-3'}
    >
      <path d="m2.5 6.2 2.3 2.3 4.7-5" />
    </svg>
  );
}
