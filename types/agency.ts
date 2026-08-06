import type { Locale } from '@/i18n/routing';

/** Text authored in both locales. Directory content is bilingual like the UI. */
export type Localized = Record<Locale, string>;

export type CountryCode = 'IN' | 'PH';

export type ServiceCategory =
  | 'customer-support'
  | 'software-development'
  | 'accounting-back-office'
  | 'digital-marketing';

/** Filter band rather than a raw count, so the filter UI stays honest. */
export type TeamSizeBand = '1-10' | '11-50' | '51-200' | '200+';

/** CEFR simplified down to what a buyer actually decides on. */
export type EnglishProficiency =
  | 'conversational'
  | 'professional'
  | 'native-equivalent';

export type EngagementModel =
  | 'dedicated-team'
  | 'project-based'
  | 'staff-augmentation'
  | 'bpo-seat';

export type VettingCheck =
  | 'legal-entity'
  | 'client-references'
  | 'english-interview'
  | 'security-review'
  | 'sample-work';

export interface HourlyRateRange {
  /** USD, inclusive. Filtering compares overlap, not containment. */
  minUsd: number;
  maxUsd: number;
}

export interface CaseStudy {
  title: Localized;
  clientIndustry: Localized;
  result: Localized;
  teamSize: number;
  durationMonths: number;
}

export interface Agency {
  /** URL identifier. Locale-independent and stable — never re-slug a live entry. */
  slug: string;
  /** Proper noun, deliberately not localized. */
  name: string;
  tagline: Localized;
  /** One or two sentences, used on the directory card. */
  summary: Localized;
  /** Two to four paragraphs, split on `\n\n`, used on the detail page. */
  description: Localized;
  country: CountryCode;
  city: string;
  foundedYear: number;
  /** Exact headcount, shown on the card. */
  teamSize: number;
  /** Derived from `teamSize` at seed time; this is what the filter matches on. */
  teamSizeBand: TeamSizeBand;
  categories: ServiceCategory[];
  specialties: Localized[];
  hourlyRate: HourlyRateRange;
  englishProficiency: EnglishProficiency;
  /** ISO 639-1 codes beyond English. */
  languages: string[];
  /** IANA timezone. */
  timezone: string;
  /** Working hours shared with a Tbilisi business day — a real differentiator. */
  overlapHoursWithTbilisi: number;
  engagementModels: EngagementModel[];
  minEngagementMonths: number;
  certifications: string[];
  vetting: {
    status: 'vetted' | 'pending';
    /** ISO 8601 date. */
    verifiedOn: string;
    checks: VettingCheck[];
  };
  caseStudies: CaseStudy[];
  contact: {
    website: string;
    email: string;
  };
  logo?: {
    src: string;
    alt: Localized;
  };
}

/** Ordered weakest to strongest, so the English filter can match "at least". */
export const englishProficiencyOrder: readonly EnglishProficiency[] = [
  'conversational',
  'professional',
  'native-equivalent',
] as const;

export function teamSizeToBand(teamSize: number): TeamSizeBand {
  if (teamSize <= 10) return '1-10';
  if (teamSize <= 50) return '11-50';
  if (teamSize <= 200) return '51-200';
  return '200+';
}
