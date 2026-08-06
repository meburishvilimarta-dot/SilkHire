import type {
  CountryCode,
  EnglishProficiency,
  ServiceCategory,
  TeamSizeBand,
} from '@/types/agency';

/**
 * Taxonomies hold ids only. Every human-readable label lives in
 * `messages/{locale}.json` under `taxonomies.*` and is looked up by id.
 */

export const serviceCategories: readonly ServiceCategory[] = [
  'customer-support',
  'software-development',
  'accounting-back-office',
  'digital-marketing',
] as const;

export const countries: readonly CountryCode[] = ['IN', 'PH'] as const;

export const teamSizeBands: readonly TeamSizeBand[] = [
  '1-10',
  '11-50',
  '51-200',
  '200+',
] as const;

export const englishLevels: readonly EnglishProficiency[] = [
  'conversational',
  'professional',
  'native-equivalent',
] as const;

/**
 * Rate filter buckets in USD/hour. `maxUsd: null` means "no upper bound".
 * An agency matches a bucket when its own rate range *overlaps* the bucket.
 */
export interface RateBucket {
  id: string;
  minUsd: number;
  maxUsd: number | null;
}

export const rateBuckets: readonly RateBucket[] = [
  { id: 'under-15', minUsd: 0, maxUsd: 15 },
  { id: '15-25', minUsd: 15, maxUsd: 25 },
  { id: '25-40', minUsd: 25, maxUsd: 40 },
  { id: 'over-40', minUsd: 40, maxUsd: null },
] as const;

export function getRateBucket(id: string): RateBucket | undefined {
  return rateBuckets.find((bucket) => bucket.id === id);
}
