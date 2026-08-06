import type { ReactNode } from 'react';

type Tone = 'paper' | 'surface' | 'sunken' | 'brand';

const tones: Record<Tone, string> = {
  paper: '',
  surface: 'bg-surface',
  sunken: 'bg-surface-sunken',
  brand: 'bg-brand text-white',
};

/**
 * Consistent vertical rhythm between page sections. `labelledBy` should point
 * at the id of the section's own heading so screen readers announce it.
 */
export function Section({
  tone = 'paper',
  labelledBy,
  id,
  className,
  children,
}: {
  tone?: Tone;
  labelledBy?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        'border-t border-line py-16 first:border-t-0 sm:py-20 lg:py-24',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
