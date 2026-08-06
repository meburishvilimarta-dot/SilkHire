import type { CountryCode } from '@/types/agency';

/**
 * PLACEHOLDER NUMBERS — replace before launch.
 *
 * Fully-loaded monthly cost in USD for one mid-level person, including
 * agency margin. Georgia ('GE') is the local baseline the other two are
 * compared against. Role ids resolve to labels via
 * `messages/{locale}.json → costComparison.roles.*`.
 */

export type CostCountry = 'GE' | CountryCode;

export const costCountries: readonly CostCountry[] = ['GE', 'IN', 'PH'] as const;

export interface CostRole {
  id: string;
  monthlyUsd: Record<CostCountry, number>;
}

export const costRoles: readonly CostRole[] = [
  { id: 'support-agent', monthlyUsd: { GE: 900, IN: 620, PH: 700 } },
  { id: 'software-engineer', monthlyUsd: { GE: 3200, IN: 2400, PH: 2600 } },
  { id: 'bookkeeper', monthlyUsd: { GE: 1100, IN: 700, PH: 820 } },
  { id: 'marketing-specialist', monthlyUsd: { GE: 1400, IN: 950, PH: 1050 } },
] as const;

/** Reference point every row is compared against. */
export const baselineCountry: CostCountry = 'GE';

/** Whole-percent saving versus the Georgian baseline. Negative means dearer. */
export function savingPercent(role: CostRole, country: CostCountry): number {
  const baseline = role.monthlyUsd[baselineCountry];
  return Math.round(((baseline - role.monthlyUsd[country]) / baseline) * 100);
}

/** Largest figure across the table — used to scale the comparison bars. */
export const maxMonthlyUsd = Math.max(
  ...costRoles.flatMap((role) => Object.values(role.monthlyUsd)),
);
