import type { ReactNode } from 'react';

/**
 * The one card treatment on the site: a secondary-background surface, a
 * hairline, and a 20px radius.
 *
 * Cards live in the content layer, so they are opaque — the HIG reserves
 * translucent material for the functional layer floating above content. Depth
 * comes from the background step and the separator, not from a drop shadow;
 * `interactive` adds a restrained lift so that movement always means "this
 * does something".
 *
 * Nest concentrically: with 24px of padding the inner radius should be about
 * 8px (`rounded-xs`), not another 20.
 */
export function Card({
  as: Tag = 'div',
  interactive = false,
  className,
  children,
}: {
  as?: 'div' | 'li' | 'article';
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={[
        'group relative isolate rounded-lg bg-bg-secondary',
        'border border-separator',
        'transition-[transform,box-shadow,border-color] duration-[--duration-medium] ease-[--ease-standard]',
        interactive
          ? 'hover:-translate-y-0.5 hover:border-label-quaternary/40 hover:shadow-raised'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
