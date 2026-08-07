import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'secondary' | 'inverse' | 'quiet' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

/**
 * Buttons are squared off to 6px, never pill-shaped, and lift by one pixel on
 * hover — the whole interaction vocabulary is small and consistent.
 */
const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
  'transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-void-ink shadow-[0_1px_2px_rgba(10,16,14,0.16)] hover:bg-brand-deep hover:shadow-[0_6px_20px_-6px_rgba(14,83,68,0.5)]',
  secondary:
    'bg-transparent text-ink ring-1 ring-line-strong ring-inset hover:bg-surface hover:ring-ink/25 hover:shadow-[0_6px_20px_-10px_rgba(12,20,17,0.4)]',
  inverse:
    'bg-paper text-ink hover:bg-white hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.55)]',
  quiet:
    'bg-transparent text-void-ink ring-1 ring-void-ink/25 ring-inset hover:bg-void-ink/8 hover:ring-void-ink/45',
  ghost:
    'text-brand underline decoration-brand/30 underline-offset-[6px] hover:decoration-brand hover:-translate-y-0',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-[0.8125rem]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.9375rem]',
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], variant === 'ghost' ? '' : sizes[size], className]
    .filter(Boolean)
    .join(' ');
}

/** The arrow that slides on hover. Decorative — the label carries the meaning. */
export function ButtonArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
    >
      <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" />
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
  variant = 'primary',
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
  variant = 'primary',
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
