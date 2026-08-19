'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { AgencyCard } from './AgencyCard';
import { AgencyFilters } from './AgencyFilters';
import { ButtonLink, Button, ButtonArrow } from '@/components/ui/Button';
import {
  countActiveFilters,
  emptyFilterState,
  filterAgencies,
  filterStateToSearchParams,
  searchParamsToFilterState,
} from '@/lib/filters';
import type { Agency } from '@/types/agency';

/**
 * Filtering happens entirely on the client over the seeded array — there is no
 * request to make. State lives in the URL so a filtered view can be shared,
 * bookmarked and reached with the back button.
 */
export function AgencyDirectory({ allAgencies }: { allAgencies: Agency[] }) {
  const t = useTranslations('agencies');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPanelOpen, setPanelOpen] = useState(false);

  const state = useMemo(() => searchParamsToFilterState(searchParams), [searchParams]);
  const results = useMemo(() => filterAgencies(allAgencies, state), [allAgencies, state]);

  const handleChange = useCallback(
    (next: typeof state) => {
      const params = filterStateToSearchParams(next).toString();
      // `scroll: false` keeps the reader's place in the list while they narrow.
      router.replace(params ? `${pathname}?${params}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const activeCount = countActiveFilters(state);

  return (
    <div className="container-page grid grid-cols-1 gap-10 py-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
      {/* Mobile: a disclosure above the results. Desktop: a persistent rail. */}
      <div className="lg:hidden">
        <Button
          variant="bordered"
          size="lg"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={isPanelOpen}
          aria-controls="filter-panel"
          className="w-full justify-between"
        >
          <span>{t('filters.toggle')}</span>
          {activeCount > 0 ? (
            <span className="text-caption rounded-full bg-accent px-2 py-0.5 text-on-accent tabular-nums">
              {activeCount}
            </span>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className={`h-4 w-4 transition-transform duration-[--duration-medium] ${
                isPanelOpen ? 'rotate-180' : ''
              }`}
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          )}
        </Button>
      </div>

      {/* Toggled with a class rather than the `hidden` attribute: `[hidden]`
          carries `!important` in the reset, and a hidden grid child still
          collapses its column, which would squeeze the results into 17rem. */}
      <div
        id="filter-panel"
        className={`rounded-lg border border-separator bg-bg-secondary p-6 lg:sticky lg:top-24 lg:block lg:self-start lg:border-0 lg:bg-transparent lg:p-0 ${
          isPanelOpen ? 'block' : 'hidden'
        }`}
      >
        <AgencyFilters state={state} onChange={handleChange} />
      </div>

      {/* `min-w-0`: without it a long unbroken Georgian word sets this grid
          track's min-content width and pushes the whole page sideways. */}
      <div className="min-w-0">
        {/* Announced politely so keyboard and screen-reader users learn the
            count changed without the focus moving. */}
        <p aria-live="polite" className="sr-only">
          {t('filters.resultsAnnouncement', { count: results.length })}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-separator pb-4">
          <p className="text-subheadline text-label-secondary" aria-hidden="true">
            {t('subtitle', { count: results.length })}
          </p>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => handleChange(emptyFilterState)}
              className="text-footnote min-h-11 text-accent transition-opacity duration-[--duration-fast] hover:opacity-70 lg:hidden"
            >
              {t('filters.clear')}
            </button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {results.map((agency) => (
              <AgencyCard key={agency.slug} agency={agency} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-lg border border-separator bg-bg-secondary px-8 py-16 text-center sm:py-20">
            {/* An empty route: the line, going nowhere. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 40"
              fill="none"
              className="mx-auto h-10 w-28 text-label-quaternary"
            >
              <path
                d="M4 32C28 32 28 8 60 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M60 8c32 0 32 24 56 24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 6"
              />
              <circle cx="4" cy="32" r="3" fill="currentColor" />
            </svg>

            <h2 className="text-title-3 mt-6">{t('empty.title')}</h2>
            <p className="text-callout measure mx-auto mt-3 text-label-secondary">
              {t('empty.body')}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="bordered" onClick={() => handleChange(emptyFilterState)}>
                {t('filters.clear')}
              </Button>
              <ButtonLink href="/contact">
                {t('empty.cta')}
                <ButtonArrow />
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
