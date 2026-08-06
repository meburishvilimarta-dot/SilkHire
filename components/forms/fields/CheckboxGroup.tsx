'use client';

import { useId } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  legend: string;
  hint?: string;
  error?: string;
  options: readonly CheckboxOption[];
  /**
   * Spread onto every input. Registering several checkboxes under one name
   * makes react-hook-form collect the checked values into an array.
   */
  registration: UseFormRegisterReturn;
}

/**
 * A fieldset of checkboxes that all share one form field name, so RHF
 * collects them into an array.
 */
export function CheckboxGroup({
  legend,
  hint,
  error,
  options,
  registration,
}: CheckboxGroupProps) {
  const uid = useId();
  const describedBy =
    [hint ? `${uid}-hint` : null, error ? `${uid}-error` : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      {hint ? (
        <p id={`${uid}-hint`} className="mt-1 text-xs text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2.5">
            <input
              id={`${uid}-${option.value}`}
              type="checkbox"
              value={option.value}
              aria-invalid={error ? true : undefined}
              className="h-4 w-4 shrink-0 rounded-sm accent-[var(--color-brand)]"
              {...registration}
            />
            <label
              htmlFor={`${uid}-${option.value}`}
              className="cursor-pointer text-sm text-ink-muted select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error ? (
        <p id={`${uid}-error`} className="mt-2 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
