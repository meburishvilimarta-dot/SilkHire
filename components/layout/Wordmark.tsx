import { siteConfig } from '@/data/site';

/**
 * The route, reduced to a mark: two endpoints joined by an arc, with the
 * meeting point called out. Decorative — the name beside it carries meaning.
 */
export function RouteMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className={className ?? 'h-6 w-6'}
    >
      <path
        d="M3 21C8.5 21 8.5 7 14 7s5.5 14 11 14"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="14" cy="7" r="2.75" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={['flex items-center gap-2', className].filter(Boolean).join(' ')}>
      <RouteMark className="h-6 w-6 shrink-0 text-accent" />
      <span className="text-headline tracking-[-0.02em]">{siteConfig.name}</span>
    </span>
  );
}
