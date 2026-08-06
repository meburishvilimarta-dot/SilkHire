import { siteConfig } from '@/data/site';

/**
 * Typographic wordmark with a single drawn mark — two threads meeting, for
 * the two ends of the route. Decorative, so it is hidden from assistive tech;
 * the name beside it carries the meaning.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={['flex items-center gap-2.5', className].filter(Boolean).join(' ')}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6 shrink-0 text-brand"
      >
        <path
          d="M3 18c4.5 0 4.5-12 9-12s4.5 12 9 12"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <circle cx="12" cy="6" r="2.1" fill="currentColor" />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </span>
  );
}
