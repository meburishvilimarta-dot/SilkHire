import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

/** `inverse` is for buttons sitting on a brand-coloured panel. */
type Variant = 'primary' | 'secondary' | 'inverse' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover',
  secondary:
    'bg-surface text-ink ring-1 ring-line-strong ring-inset hover:bg-surface-sunken',
  inverse: 'bg-white text-brand-ink hover:bg-white/90',
  ghost: 'text-brand underline underline-offset-4 hover:text-brand-hover',
};

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

function classesFor(variant: Variant, size: Size, className?: string) {
  const sizeClass = variant === 'ghost' ? '' : sizes[size];
  return [base, variants[variant], sizeClass, className].filter(Boolean).join(' ');
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Renders an anchor. Use for navigation — never for actions. */
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
