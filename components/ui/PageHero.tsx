interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** Shared masthead for the content pages, so they all start the same way. */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page py-14 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
