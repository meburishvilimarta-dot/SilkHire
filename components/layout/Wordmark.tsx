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
      className={className ?? 'h-7 w-7'}
    >
      <path
        d="M3 21C8.5 21 8.5 7 14 7s5.5 14 11 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-90"
      />
      <circle cx="14" cy="7" r="2.6" fill="currentColor" />
      <circle cx="3" cy="21" r="1.5" fill="currentColor" className="opacity-45" />
      <circle cx="25" cy="21" r="1.5" fill="currentColor" className="opacity-45" />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = 'dark',
}: {
  className?: string;
  /** `dark` means "sitting on a dark ground". */
  tone?: 'dark' | 'light';
}) {
  return (
    <span className={['flex items-center gap-2.5', className].filter(Boolean).join(' ')}>
      <RouteMark
        className={`h-7 w-7 shrink-0 transition-colors duration-300 ${
          tone === 'dark' ? 'text-accent' : 'text-brand'
        }`}
      />
      <span className="text-display text-[1.1875rem] font-semibold tracking-[-0.01em]">
        {siteConfig.name}
      </span>
    </span>
  );
}
