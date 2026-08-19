import type { ReactNode } from 'react';

export interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
  children: ReactNode;
}

/**
 * Wraps every control in the same label / hint / error structure and wires up
 * `aria-describedby` so both the hint and the error are announced.
 */
export function FieldShell({
  id,
  label,
  hint,
  error,
  optional,
  optionalLabel,
  children,
}: FieldShellProps) {
  return (
    <div className="group/field">
      <label
        htmlFor={id}
        className="text-subheadline flex items-baseline justify-between gap-3 font-medium text-label"
      >
        {label}
        {optional ? (
          <span className="text-caption font-normal text-label-tertiary">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-footnote mt-1.5 text-label-tertiary">
          {hint}
        </p>
      ) : null}
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          className="text-footnote mt-2 flex items-center gap-1.5 font-medium text-critical"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="h-3 w-3 shrink-0"
          >
            <circle cx="6" cy="6" r="4.6" />
            <path d="M6 3.6v2.8M6 8.3v.1" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, hint?: string, error?: string) {
  return (
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined
  );
}

/**
 * Fields are rounded rectangles on the page background with a hairline border,
 * 44px tall at minimum. The border darkens on focus rather than the fill
 * changing, so the field does not appear to move as you tab through the form.
 */
export const controlClasses =
  'text-body min-h-11 w-full rounded-sm border bg-bg px-3.5 py-3 text-label ' +
  'transition-[border-color,background-color] duration-[--duration-fast] ' +
  'placeholder:text-label-quaternary hover:bg-fill focus:bg-bg';

export function ringFor(error?: string) {
  return error
    ? 'border-critical focus:border-critical'
    : 'border-separator-opaque focus:border-accent';
}
