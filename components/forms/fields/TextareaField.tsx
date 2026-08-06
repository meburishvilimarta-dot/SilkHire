'use client';

import { useId, type ComponentProps } from 'react';
import { FieldShell, controlClasses, describedBy, ringFor } from './FieldShell';

interface TextareaFieldProps
  extends Omit<ComponentProps<'textarea'>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
}

export function TextareaField({
  label,
  hint,
  error,
  optional,
  optionalLabel,
  rows = 6,
  ...textareaProps
}: TextareaFieldProps) {
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
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlClasses} ${ringFor(error)} resize-y leading-relaxed`}
        {...textareaProps}
      />
    </FieldShell>
  );
}
