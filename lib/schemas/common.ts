import { z } from 'zod';

/**
 * A required whole-number field backed by a text input.
 *
 * `z.coerce.number()` turns an empty string into `0`, which makes a blank
 * field report the range error ("at least one person") instead of "required".
 * Validating the string first and transforming afterwards keeps the input type
 * a string — which is what the DOM actually gives react-hook-form — and lets
 * each failure carry the message it should.
 *
 * As with the rest of the schemas, messages are translation keys.
 */
export function requiredInteger({
  min,
  max,
  minMessage = 'invalidNumber',
  maxMessage = 'invalidNumber',
}: {
  min: number;
  max: number;
  minMessage?: string;
  maxMessage?: string;
}) {
  return z
    .union([z.string(), z.number()], { message: 'required' })
    // Accepts a number as well as a string because the browser posts the
    // *parsed* payload, and the route handler re-runs this same schema over
    // it. Rejecting a number there would 422 every valid submission.
    .transform((value) => (typeof value === 'number' ? String(value) : value.trim()))
    .refine((value) => value.length > 0, 'required')
    .refine((value) => /^\d+$/.test(value), 'invalidNumber')
    .transform(Number)
    .refine((value) => value >= min, minMessage)
    .refine((value) => value <= max, maxMessage);
}
