import type { ReactNode } from 'react';

/**
 * Vertical rhythm for page sections.
 *
 * `tone` names the background's depth in the hierarchy, not its colour, so the
 * same component reads correctly in both appearances: `base` is the page,
 * `secondary` is a step up from it.
 */
type Tone = 'base' | 'secondary';

const tones: Record<Tone, string> = {
  base: 'bg-bg',
  secondary: 'bg-bg-secondary',
};

export function Section({
  tone = 'base',
  labelledBy,
  id,
  className,
  bleed = false,
  children,
}: {
  tone?: Tone;
  labelledBy?: string;
  id?: string;
  className?: string;
  /** Skip the inner container — for sections that manage their own width. */
  bleed?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={['py-20 sm:py-24 lg:py-28', tones[tone], className]
        .filter(Boolean)
        .join(' ')}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
