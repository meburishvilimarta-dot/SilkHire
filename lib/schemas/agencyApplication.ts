import { z } from 'zod';
import { countries, englishLevels, serviceCategories } from '@/data/taxonomies';
import { requiredInteger } from './common';

/** See the note in `clientBrief.ts` — messages here are translation keys too. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/;

export const agencyApplicationSchema = z
  .object({
    agencyName: z.string().trim().min(2, 'required').max(120, 'tooLong'),
    contactName: z.string().trim().min(2, 'required').max(80, 'tooLong'),
    email: z
      .string()
      .trim()
      .min(1, 'required')
      .max(160, 'tooLong')
      .refine((value) => EMAIL_PATTERN.test(value), 'invalidEmail'),
    website: z
      .string()
      .trim()
      .min(1, 'required')
      .refine((value) => URL_PATTERN.test(value), 'invalidUrl'),
    country: z.enum(countries as unknown as [string, ...string[]], { message: 'required' }),
    city: z.string().trim().min(2, 'required').max(80, 'tooLong'),
    foundedYear: requiredInteger({
      min: 1950,
      max: new Date().getFullYear(),
      minMessage: 'invalidYear',
      maxMessage: 'invalidYear',
    }),
    teamSize: requiredInteger({ min: 1, max: 100_000 }),
    categories: z
      .array(z.enum(serviceCategories as unknown as [string, ...string[]]))
      .min(1, 'selectAtLeastOne'),
    englishProficiency: z.enum(englishLevels as unknown as [string, ...string[]], {
      message: 'required',
    }),
    hourlyRateMin: requiredInteger({ min: 1, max: 500 }),
    hourlyRateMax: requiredInteger({ min: 1, max: 500 }),
    description: z.string().trim().min(40, 'tooShortDescription').max(4000, 'tooLong'),
    references: z.string().trim().max(2000, 'tooLong').optional().or(z.literal('')),
    // Honeypot — see `clientBrief.ts`.
    fax: z.string().max(0, 'spam').optional(),
  })
  .refine((data) => data.hourlyRateMax >= data.hourlyRateMin, {
    message: 'rateRangeInverted',
    path: ['hourlyRateMax'],
  });

export type AgencyApplicationInput = z.input<typeof agencyApplicationSchema>;
export type AgencyApplicationValues = z.output<typeof agencyApplicationSchema>;
