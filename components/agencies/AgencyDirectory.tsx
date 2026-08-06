'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { AgencyCard } from './AgencyCard';
import { AgencyFilters } from './AgencyFilters';
import { ButtonLink, Button } from '@/components/ui/Button';
import {
  countActiveFilters,
  emptyFilterState,
  filterAgencies,
  filterStateToSearchParams,
  searchParamsToFilterState,
} from '@/lib/filters';
import type { Agency } from '@/types/agency';

/**
 * Filtering happens entirely on the client over the seeded array — there is
 * no request to make. State lives in the URL so a filtered view can be
 * shared, bookmarked and reached with the back button.
 */
export function AgencyDirectory({ allAgencies }: { allAgencies: Agency[] }) {
  const t = useTranslations('agencies');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPanelOpen, setPanelOpen] = useState(false);

  const state = useMemo(
    () => searchParamsToFilterState(searchParams),
    [searchParams],
  );

  const results = useMemo(
    () => filterAgencies(allAgencies, state),
    [allAgencies, state],
  );

  const handleChange = useCallback(
    (next: typeof state) => {
      const params = filterStateToSearchParams(next).toString();
      // `scroll: false` keeps the reader's place in the list while they
      // narrow the filters.
      router.replace(params ? `${pathname}?${params}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const activeCount = countActiveFilters(state);

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[16rem_1fr] lg:gap-14 lg:py-16">
      {/* Mobile: a disclosure above the results. Desktop: a persistent rail. */}
      <div className="lg:hidden">
        <Button
          variant="secondary"
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={isPanelOpen}
          aria-controls="filter-panel"
          className="w-full justify-between"
        >
          <span>{t('filters.toggle')}</span>
          {activeCount > 0 ? (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </div>

      {/* Toggled with a class rather than the `hidden` attribute: `[hidden]`
          carries `!important` in the reset, and a hidden grid child still
          collapses its column, which would squeeze the results into 16rem. */}
      <div
        id="filter-panel"
        className={`rounded-lg bg-surface p-5 ring-1 ring-line ring-inset lg:sticky lg:top-24 lg:block lg:self-start lg:bg-transparent lg:p-0 lg:ring-0 ${
          isPanelOpen ? 'block' : 'hidden'
        }`}
      >
        <AgencyFilters state={state} onChange={handleChange} />
      </div>

      <div>
        {/* Politely announced so keyboard and screen-reader users learn the
            result count changed without the focus moving. */}
        <p aria-live="polite" className="sr-only">
          {t('filters.resultsAnnouncement', { count: results.length })}
        </p>
        <p className="text-sm text-ink-muted" aria-hidden="true">
          {t('subtitle', { count: results.length })}
        </p>

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-5 xl:grid-cols-2">
            {results.map((agency) => (
              <AgencyCard key={agency.slug} agency={agency} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-lg bg-surface p-8 text-center ring-1 ring-line ring-inset sm:p-12">
            <h2 className="text-lg font-semibold tracking-tight">{t('empty.title')}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              {t('empty.body')}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => handleChange(emptyFilterState)}>
                {t('filters.clear')}
              </Button>
              <ButtonLink href="/contact">{t('empty.cta')}</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
