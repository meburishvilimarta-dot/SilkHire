'use client';

import { useId, type ComponentProps } from 'react';
import {
  FieldShell,
  controlClasses,
  describedBy,
  ringFor,
} from './FieldShell';

interface TextFieldProps extends Omit<ComponentProps<'input'>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
}

export function TextField({
  label,
  hint,
  error,
  optional,
  optionalLabel,
  ...inputProps
}: TextFieldProps) {
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
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlClasses} ${ringFor(error)}`}
        {...inputProps}
      />
    </FieldShell>
  );
}
