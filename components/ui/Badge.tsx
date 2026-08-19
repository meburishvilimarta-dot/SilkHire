import type { ReactNode } from 'react';

/**
 * Small status pill. Every tone pairs its colour with either a glyph or a
 * distinct label, because the HIG asks that colour never be the only carrier
 * of meaning.
 */
type Tone = 'neutral' | 'accent' | 'positive' | 'outline';

const tones: Record<Tone, string> = {
  neutral: 'bg-fill text-label-secondary',
  accent: 'bg-accent-muted text-accent',
  positive: 'bg-positive-muted text-positive',
  outline: 'border border-separator text-label-tertiary',
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
      className={`text-caption inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 whitespace-nowrap ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Check glyph used in vetted badges and specialty lists. */
export function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-3 w-3'}
    >
      <path d="m2.5 6.2 2.3 2.3 4.7-5" />
    </svg>
  );
}
