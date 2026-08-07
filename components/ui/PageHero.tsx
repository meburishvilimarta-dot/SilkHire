import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Optional trailing content — stats, badges, a CTA row. */
  children?: ReactNode;
}

function entrance(delay: number): React.CSSProperties {
  return { animation: `rise-in 0.7s var(--ease-out-soft) ${delay}ms both` };
}

/**
 * Shared masthead for the inner pages. Dark, like the header above it and the
 * footer below, so every page is framed the same way and the light content in
 * between reads as the document.
 */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <div className="on-dark grain relative isolate overflow-hidden bg-void text-void-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_82%_0%,rgba(23,131,106,0.16),transparent_62%)]"
      />
      {/* The route, passing behind the words. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-void-line"
      >
        <path
          d="M-40 300C260 300 300 90 640 90s360 210 640 210"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative container-page py-20 sm:py-24 lg:py-28">
        <p className="eyebrow flex items-center gap-3 text-accent" style={entrance(0)}>
          <span aria-hidden="true" className="h-px w-7 bg-accent/50" />
          {eyebrow}
        </p>
        <h1
          className="text-display mt-6 max-w-4xl text-[2.5rem] sm:text-5xl lg:text-[3.75rem]"
          style={entrance(80)}
        >
          {title}
        </h1>
        <p
          className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-void-muted sm:text-lg"
          style={entrance(160)}
        >
          {subtitle}
        </p>
        {children ? (
          <div style={entrance(240)} className="mt-10">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
