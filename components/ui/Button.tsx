import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

/**
 * Buttons are capsules, per the HIG's preference for rounded shapes, and never
 * shorter than 44px — the platform minimum hit target.
 *
 * Only `filled` carries the accent colour. The HIG asks for one or two
 * prominent buttons per view and for the preferred option to be distinguished
 * by *style*, not size, so every variant here shares the same geometry and
 * differs only in fill.
 */
type Variant = 'filled' | 'tinted' | 'bordered' | 'plain';
type Size = 'md' | 'lg';

const base = [
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium',
  'transition-[background-color,color,border-color,transform,opacity]',
  'duration-[--duration-fast] ease-[--ease-standard]',
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40',
].join(' ');

const variants: Record<Variant, string> = {
  filled: 'bg-accent text-on-accent hover:bg-accent-hover',
  tinted: 'bg-accent-muted text-accent hover:bg-accent/20',
  bordered:
    'border border-separator-opaque text-label hover:bg-fill hover:border-label-quaternary',
  plain: 'text-accent hover:bg-accent-muted',
};

/* min-h keeps the 44px floor even when the label is a single short word. */
const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2.5 text-callout',
  lg: 'min-h-[3.25rem] px-7 py-3.5 text-body',
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}

/** Trailing chevron that nudges on hover. Decorative — the label carries meaning. */
export function ButtonArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover/btn:translate-x-0.5"
    >
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Renders an anchor. Navigation only — never an action. */
export function ButtonLink({
  variant = 'filled',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={classesFor(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'filled',
  size = 'md',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
