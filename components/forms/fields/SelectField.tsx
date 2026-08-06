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
        // `defaultValue=""` on the form keeps this placeholder selected until
        // the user picks something, so zod sees an empty value and complains.
        className={`${controlClasses} ${ringFor(error)} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%235a6068' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
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
