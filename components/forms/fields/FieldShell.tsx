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
        className="flex items-baseline justify-between gap-3 text-[0.8125rem] font-medium text-ink"
      >
        {label}
        {optional ? (
          <span className="text-[0.6875rem] font-normal text-ink-subtle">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-danger"
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
 * Inputs sit on the sunken tone and lift to white on focus — the field you are
 * typing in is the only lit surface on the form.
 */
export const controlClasses =
  'w-full rounded-md bg-sunken/60 px-3.5 py-3 text-sm text-ink ring-1 ring-inset ' +
  'transition-[background-color,box-shadow,color] duration-200 placeholder:text-ink-subtle ' +
  'hover:bg-sunken focus:bg-surface focus:ring-2';

export function ringFor(error?: string) {
  return error ? 'ring-danger/60 focus:ring-danger' : 'ring-line focus:ring-brand';
}
