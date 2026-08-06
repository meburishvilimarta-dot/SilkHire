import { getRateBucket } from '@/data/taxonomies';
import {
  englishProficiencyOrder,
  type Agency,
  type CountryCode,
  type EnglishProficiency,
  type ServiceCategory,
  type TeamSizeBand,
} from '@/types/agency';

export interface AgencyFilterState {
  countries: CountryCode[];
  categories: ServiceCategory[];
  teamSizes: TeamSizeBand[];
  /** Minimum acceptable level; an agency at or above it matches. */
  minEnglish: EnglishProficiency | null;
  /** Rate bucket id from `data/taxonomies.ts`. */
  rateBucket: string | null;
}

export const emptyFilterState: AgencyFilterState = {
  countries: [],
  categories: [],
  teamSizes: [],
  minEnglish: null,
  rateBucket: null,
};

export function countActiveFilters(state: AgencyFilterState): number {
  return (
    state.countries.length +
    state.categories.length +
    state.teamSizes.length +
    (state.minEnglish ? 1 : 0) +
    (state.rateBucket ? 1 : 0)
  );
}

function matchesEnglish(agency: Agency, min: EnglishProficiency | null): boolean {
  if (!min) return true;
  return (
    englishProficiencyOrder.indexOf(agency.englishProficiency) >=
    englishProficiencyOrder.indexOf(min)
  );
}

function matchesRate(agency: Agency, bucketId: string | null): boolean {
  if (!bucketId) return true;
  const bucket = getRateBucket(bucketId);
  if (!bucket) return true;
  // Overlap, not containment: a $12–25/hr agency still belongs under a
  // "$15–25" filter, because part of its range sits inside the bucket.
  const bucketMax = bucket.maxUsd ?? Number.POSITIVE_INFINITY;
  return agency.hourlyRate.minUsd <= bucketMax && agency.hourlyRate.maxUsd >= bucket.minUsd;
}

export function filterAgencies(
  allAgencies: readonly Agency[],
  state: AgencyFilterState,
): Agency[] {
  return allAgencies.filter((agency) => {
    if (state.countries.length && !state.countries.includes(agency.country)) {
      return false;
    }
    if (
      state.categories.length &&
      !state.categories.some((category) => agency.categories.includes(category))
    ) {
      return false;
    }
    if (state.teamSizes.length && !state.teamSizes.includes(agency.teamSizeBand)) {
      return false;
    }
    if (!matchesEnglish(agency, state.minEnglish)) return false;
    if (!matchesRate(agency, state.rateBucket)) return false;
    return true;
  });
}

/* ---------- URL serialisation, so filtered results stay shareable ---------- */

const LIST_KEYS = {
  countries: 'country',
  categories: 'category',
  teamSizes: 'size',
} as const;

export function filterStateToSearchParams(state: AgencyFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.countries.length) params.set(LIST_KEYS.countries, state.countries.join(','));
  if (state.categories.length) params.set(LIST_KEYS.categories, state.categories.join(','));
  if (state.teamSizes.length) params.set(LIST_KEYS.teamSizes, state.teamSizes.join(','));
  if (state.minEnglish) params.set('english', state.minEnglish);
  if (state.rateBucket) params.set('rate', state.rateBucket);
  return params;
}

/** Values that are not part of the taxonomy are dropped rather than trusted. */
export function searchParamsToFilterState(
  params: URLSearchParams | ReadonlyURLSearchParamsLike,
): AgencyFilterState {
  const readList = <T extends string>(key: string, allowed: readonly T[]): T[] => {
    const raw = params.get(key);
    if (!raw) return [];
    return raw
      .split(',')
      .map((value) => value.trim())
      .filter((value): value is T => (allowed as readonly string[]).includes(value));
  };

  const english = params.get('english');
  const rate = params.get('rate');

  return {
    countries: readList<CountryCode>('country', ['IN', 'PH']),
    categories: readList<ServiceCategory>('category', [
      'customer-support',
      'software-development',
      'accounting-back-office',
      'digital-marketing',
    ]),
    teamSizes: readList<TeamSizeBand>('size', ['1-10', '11-50', '51-200', '200+']),
    minEnglish:
      english && (englishProficiencyOrder as readonly string[]).includes(english)
        ? (english as EnglishProficiency)
        : null,
    rateBucket: rate && getRateBucket(rate) ? rate : null,
  };
}

/** Structural type so `useSearchParams()` output can be passed in directly. */
interface ReadonlyURLSearchParamsLike {
  get(name: string): string | null;
}
