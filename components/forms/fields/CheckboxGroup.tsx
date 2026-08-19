'use client';

import { useId } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { CheckMark } from '@/components/ui/Badge';

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
 * Selectable tiles rather than bare checkboxes. The input stays a real
 * checkbox — visually hidden but focusable — so keyboard and screen-reader
 * behaviour is the browser's, and `peer-checked` carries the visual state.
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
    [hint ? `${uid}-hint` : null, error ? `${uid}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="text-subheadline font-medium text-label">{legend}</legend>
      {hint ? (
        <p id={`${uid}-hint`} className="text-footnote mt-1.5 text-label-tertiary">
          {hint}
        </p>
      ) : null}

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          // The input is nested inside its label so the whole tile is the hit
          // target and the checkbox cannot end up positioned away from it.
          // `has-[:checked]` styles the tile and its tick box together.
          <label
            key={option.value}
            className="text-subheadline relative flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border border-separator-opaque bg-bg px-3.5 py-3 text-label-secondary transition-colors duration-[--duration-fast] select-none hover:bg-fill has-[:checked]:border-accent has-[:checked]:bg-accent-muted has-[:checked]:text-label has-[:checked]:[&_span]:border-accent has-[:checked]:[&_span]:bg-accent has-[:checked]:[&_span]:text-on-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
          >
            <input
              id={`${uid}-${option.value}`}
              type="checkbox"
              value={option.value}
              aria-invalid={error ? true : undefined}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              {...registration}
            />
            <span
              aria-hidden="true"
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-separator-opaque bg-bg text-transparent transition-colors"
            >
              <CheckMark className="h-2.5 w-2.5" />
            </span>
            {option.label}
          </label>
        ))}
      </div>

      {error ? (
        <p id={`${uid}-error`} className="text-footnote mt-2.5 font-medium text-critical">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
