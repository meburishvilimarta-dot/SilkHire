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

function FieldGroup({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-xs font-semibold tracking-[0.1em] text-ink uppercase">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function CheckboxRow({
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
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded-sm border-line-strong text-brand accent-[var(--color-brand)]"
      />
      <label htmlFor={id} className="cursor-pointer text-sm text-ink-muted select-none">
        {label}
      </label>
    </div>
  );
}

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
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold">{t('heading')}</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={() => onChange(emptyFilterState)}
            className="rounded-sm text-xs font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
          >
            {t('clear')}
          </button>
        ) : null}
      </div>

      <div className="mt-4">
        <FieldGroup legend={t('country')}>
          <div className="space-y-2.5">
            {countries.map((country) => (
              <CheckboxRow
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
          <div className="space-y-2.5">
            {serviceCategories.map((category) => (
              <CheckboxRow
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
          <div className="space-y-2.5">
            {teamSizeBands.map((band) => (
              <CheckboxRow
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
            className="w-full rounded-md border-0 bg-surface px-3 py-2 text-sm text-ink ring-1 ring-line-strong ring-inset"
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
            className="w-full rounded-md border-0 bg-surface px-3 py-2 text-sm text-ink ring-1 ring-line-strong ring-inset"
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
    </div>
  );
}
