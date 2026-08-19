import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Optional trailing content — a CTA row, stats, badges. */
  children?: ReactNode;
}

/** Above the fold, so entrance motion runs on load rather than on scroll. */
function entrance(delay: number): React.CSSProperties {
  return {
    animation: `rise-in var(--duration-slow) var(--ease-emphasized) ${delay}ms both`,
  };
}

/**
 * Shared masthead for the inner pages.
 *
 * Plain background, generous whitespace, one hairline at the bottom — the
 * hierarchy is carried entirely by the type scale rather than by a coloured
 * panel behind it.
 */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <header className="hairline-bottom bg-bg">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <p className="text-overline text-accent" style={entrance(0)}>
          {eyebrow}
        </p>
        <h1 className="text-display measure-wide mt-5" style={entrance(60)}>
          {title}
        </h1>
        <p
          className="text-body-lead measure-wide mt-6 text-label-secondary"
          style={entrance(120)}
        >
          {subtitle}
        </p>
        {children ? (
          <div className="mt-9" style={entrance(180)}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
