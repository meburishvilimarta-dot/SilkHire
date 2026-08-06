import { z } from 'zod';
import { serviceCategories } from '@/data/taxonomies';
import { requiredInteger } from './common';

/**
 * Validation messages are *keys*, not sentences. Both the form and the route
 * handler share this schema, and only the form has a translator — so the
 * component resolves each key against `messages.forms.errors.*`.
 */

// Deliberately permissive: rejecting unusual-but-valid addresses costs more
// leads than letting a typo through, which the reply bounce catches anyway.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits, spaces and the usual separators. Georgian numbers are +995 XX XXX XXX.
const PHONE_PATTERN = /^[+]?[\d\s().-]{6,20}$/;

export const budgetRanges = [
  'under-2k',
  '2k-5k',
  '5k-10k',
  '10k-25k',
  'over-25k',
  'not-sure',
] as const;

export const startTimelines = [
  'immediately',
  'within-1-month',
  'within-3-months',
  'exploring',
] as const;

export const clientBriefSchema = z.object({
  name: z.string().trim().min(2, 'required').max(80, 'tooLong'),
  company: z.string().trim().min(2, 'required').max(120, 'tooLong'),
  email: z
    .string()
    .trim()
    .min(1, 'required')
    .max(160, 'tooLong')
    .refine((value) => EMAIL_PATTERN.test(value), 'invalidEmail'),
  phone: z
    .string()
    .trim()
    .min(1, 'required')
    .refine((value) => PHONE_PATTERN.test(value), 'invalidPhone'),
  serviceNeeded: z.enum(serviceCategories as unknown as [string, ...string[]], {
    message: 'required',
  }),
  roles: z.string().trim().min(2, 'required').max(200, 'tooLong'),
  headcount: requiredInteger({
    min: 1,
    max: 500,
    minMessage: 'minHeadcount',
    maxMessage: 'maxHeadcount',
  }),
  monthlyBudget: z.enum(budgetRanges, { message: 'required' }),
  startTimeline: z.enum(startTimelines, { message: 'required' }),
  description: z.string().trim().min(20, 'tooShortDescription').max(4000, 'tooLong'),
  // Not shown to users; a filled value means a bot walked the form.
  website: z.string().max(0, 'spam').optional(),
});

export type ClientBriefInput = z.input<typeof clientBriefSchema>;
export type ClientBriefValues = z.output<typeof clientBriefSchema>;
