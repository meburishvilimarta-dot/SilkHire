'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import {
  countries,
  englishLevels,
  rateBuckets,
  serviceCategories,
  teamSizeBands,
} from '@/data/taxonomies';
import {
  countActiveFilters,
  emptyFilterState,
  type AgencyFilterState,
} from '@/lib/filters';
import type {
  CountryCode,
  EnglishProficiency,
  ServiceCategory,
  TeamSizeBand,
} from '@/types/agency';

interface AgencyFiltersProps {
  state: AgencyFilterState;
  onChange: (next: AgencyFilterState) => void;
}

/** Adds or removes a value from a multi-select filter. */
function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FieldGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-separator pt-6 pb-6 first:border-t-0 first:pt-0">
      <legend className="text-caption mb-4 text-label-tertiary">{legend}</legend>
      {children}
    </fieldset>
  );
}

/**
 * Multi-select filters are capsule chips wrapping a real checkbox, so keyboard
 * and screen-reader behaviour is the browser's and the selected state is
 * carried by `has-[:checked]` rather than by JavaScript.
 */
function Chip({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    // The input lives *inside* its label rather than beside it as a `peer`: a
    // visually-hidden sibling gets positioned away from the chip, leaving its
    // hit box somewhere the pointer never goes. Nested, the whole capsule is
    // the target, and `min-h-11` keeps it at the 44px minimum.
    <label className="text-subheadline relative flex min-h-11 cursor-pointer items-center rounded-full bg-fill px-4 text-label-secondary transition-colors duration-[--duration-fast] select-none hover:bg-fill-secondary has-[:checked]:bg-accent has-[:checked]:text-on-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      {label}
    </label>
  );
}

const selectClasses =
  'text-subheadline min-h-11 w-full appearance-none rounded-sm border border-separator bg-bg px-3.5 pr-9 text-label transition-colors duration-[--duration-fast] hover:bg-fill';

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%238e8e93' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")";

export function AgencyFilters({ state, onChange }: AgencyFiltersProps) {
  const t = useTranslations('agencies.filters');
  const tCountries = useTranslations('taxonomies.countries');
  const tCategories = useTranslations('taxonomies.categories');
  const tTeamSizes = useTranslations('taxonomies.teamSizes');
  const tEnglish = useTranslations('taxonomies.englishLevels');
  const tRates = useTranslations('taxonomies.rateBuckets');
  const uid = useId();

  const activeCount = countActiveFilters(state);

  return (
    <div>
      {/* Hidden below lg: on mobile the disclosure button above already says
          "Filters", and a "Clear all" sits next to the result count. */}
      <div className="hidden items-center justify-between gap-3 pb-5 lg:flex">
        <h2 className="text-headline">{t('heading')}</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={() => onChange(emptyFilterState)}
            className="text-footnote rounded-full px-2 py-1 text-accent transition-opacity duration-[--duration-fast] hover:opacity-70"
          >
            {t('clear')}
          </button>
        ) : null}
      </div>

      <FieldGroup legend={t('country')}>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <Chip
              key={country}
              id={`${uid}-country-${country}`}
              label={tCountries(country)}
              checked={state.countries.includes(country)}
              onChange={() =>
                onChange({
                  ...state,
                  countries: toggle<CountryCode>(state.countries, country),
                })
              }
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup legend={t('category')}>
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((category) => (
            <Chip
              key={category}
              id={`${uid}-category-${category}`}
              label={tCategories(category)}
              checked={state.categories.includes(category)}
              onChange={() =>
                onChange({
                  ...state,
                  categories: toggle<ServiceCategory>(state.categories, category),
                })
              }
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup legend={t('teamSize')}>
        <div className="flex flex-wrap gap-2">
          {teamSizeBands.map((band) => (
            <Chip
              key={band}
              id={`${uid}-size-${band}`}
              label={tTeamSizes(band)}
              checked={state.teamSizes.includes(band)}
              onChange={() =>
                onChange({
                  ...state,
                  teamSizes: toggle<TeamSizeBand>(state.teamSizes, band),
                })
              }
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup legend={t('english')}>
        <label htmlFor={`${uid}-english`} className="sr-only">
          {t('english')}
        </label>
        <select
          id={`${uid}-english`}
          value={state.minEnglish ?? ''}
          onChange={(event) =>
            onChange({
              ...state,
              minEnglish: (event.target.value || null) as EnglishProficiency | null,
            })
          }
          className={selectClasses}
          style={{
            backgroundImage: chevron,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1rem',
          }}
        >
          <option value="">{t('anyEnglish')}</option>
          {englishLevels.map((level) => (
            <option key={level} value={level}>
              {tEnglish(level)}
            </option>
          ))}
        </select>
      </FieldGroup>

      <FieldGroup legend={t('rate')}>
        <label htmlFor={`${uid}-rate`} className="sr-only">
          {t('rate')}
        </label>
        <select
          id={`${uid}-rate`}
          value={state.rateBucket ?? ''}
          onChange={(event) =>
            onChange({ ...state, rateBucket: event.target.value || null })
          }
          className={selectClasses}
          style={{
            backgroundImage: chevron,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1rem',
          }}
        >
          <option value="">{t('anyRate')}</option>
          {rateBuckets.map((bucket) => (
            <option key={bucket.id} value={bucket.id}>
              {tRates(bucket.id)}
            </option>
          ))}
        </select>
      </FieldGroup>
    </div>
  );
}
