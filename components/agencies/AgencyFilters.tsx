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
    <fieldset className="border-t border-line pt-6 pb-6 first:border-t-0 first:pt-0">
      <legend className="eyebrow mb-4 text-ink-subtle">{legend}</legend>
      {children}
    </fieldset>
  );
}

/**
 * Multi-select filters are checkboxes styled as chips: a real `<input>` under
 * a label, so keyboard and screen-reader behaviour is the browser's, with the
 * checked state carried by `peer-checked` styling rather than JavaScript.
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
    // The input lives *inside* its label rather than beside it as a `peer`.
    // A visually-hidden sibling gets positioned away from the chip, which
    // leaves its hit box somewhere the pointer never goes; nested, the whole
    // chip is the target and the checkbox stays a real focusable control.
    <label className="relative cursor-pointer rounded-md px-3 py-1.5 text-[0.8125rem] text-ink-muted ring-1 ring-line ring-inset transition-all duration-200 select-none hover:ring-line-strong has-[:checked]:bg-brand has-[:checked]:text-void-ink has-[:checked]:ring-brand has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-bright">
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
  'w-full appearance-none rounded-md bg-surface px-3.5 py-2.5 pr-9 text-sm text-ink ring-1 ring-line ring-inset transition-colors hover:ring-line-strong focus:ring-brand';

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%237e8983' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")";

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
        <h2 className="text-display text-lg">{t('heading')}</h2>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={() => onChange(emptyFilterState)}
            className="rounded-sm text-xs font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand"
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
