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
 * `aria-describedby` so the hint and the error are both announced.
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
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {optional ? (
          <span className="ml-1.5 text-xs font-normal text-ink-subtle">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs leading-relaxed text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ') || undefined;
}

export const controlClasses =
  'w-full rounded-md bg-surface px-3 py-2.5 text-sm text-ink ring-1 ring-inset placeholder:text-ink-subtle';

export function ringFor(error?: string) {
  return error ? 'ring-danger' : 'ring-line-strong';
}
