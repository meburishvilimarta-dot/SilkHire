import type { ReactNode } from 'react';

/**
 * The one card treatment used site-wide: a hairline border, a whisper of
 * elevation, and on hover a lift plus a single ochre rule drawn along the top
 * edge — the route line again, at component scale.
 *
 * `interactive` adds the hover behaviour; static cards stay flat so that
 * movement always means "this does something".
 */
export function Card({
  as: Tag = 'div',
  interactive = false,
  tone = 'light',
  className,
  children,
}: {
  as?: 'div' | 'li' | 'article';
  interactive?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}) {
  const isDark = tone === 'dark';

  return (
    <Tag
      className={[
        'group relative isolate overflow-hidden rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isDark
          ? 'bg-void-raised ring-1 ring-void-line ring-inset'
          : 'bg-surface ring-1 ring-line ring-inset',
        interactive
          ? isDark
            ? 'hover:-translate-y-1 hover:ring-void-ink/20 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.75)]'
            : 'hover:-translate-y-1 hover:ring-line-strong hover:shadow-[0_24px_50px_-28px_rgba(12,20,17,0.35)]'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {interactive ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-accent to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
      ) : null}
      {children}
    </Tag>
  );
}
