'use client';

import { useId, type ComponentProps } from 'react';
import { FieldShell, controlClasses, describedBy, ringFor } from './FieldShell';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<ComponentProps<'select'>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
  placeholder: string;
  options: readonly SelectOption[];
}

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%237e8983' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")";

export function SelectField({
  label,
  hint,
  error,
  optional,
  optionalLabel,
  placeholder,
  options,
  ...selectProps
}: SelectFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      optionalLabel={optionalLabel}
    >
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        // The form sets `defaultValue: ''`, so this placeholder stays selected
        // until the user picks something and zod sees an empty value.
        className={`${controlClasses} ${ringFor(error)} appearance-none pr-10`}
        style={{
          backgroundImage: chevron,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.875rem center',
          backgroundSize: '1rem',
        }}
        {...selectProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
