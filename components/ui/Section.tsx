import type { ReactNode } from 'react';

type Tone = 'paper' | 'surface' | 'sunken' | 'void';

const tones: Record<Tone, string> = {
  paper: 'bg-paper',
  surface: 'bg-surface',
  sunken: 'bg-sunken',
  void: 'bg-void text-void-ink on-dark grain',
};

/**
 * Vertical rhythm for every page section. `labelledBy` should point at the id
 * of the section's own heading so the landmark is announced by name.
 */
export function Section({
  tone = 'paper',
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
      className={['py-18 sm:py-22 lg:py-28', tones[tone], className]
        .filter(Boolean)
        .join(' ')}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
