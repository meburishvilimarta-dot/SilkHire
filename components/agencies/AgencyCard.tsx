import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/Badge';
import { formatRateRange } from '@/lib/format';
import type { Locale } from '@/i18n/routing';
import type { Agency } from '@/types/agency';

export function AgencyCard({ agency }: { agency: Agency }) {
  const t = useTranslations('agencies.card');
  const tCategories = useTranslations('taxonomies.categories');
  const tCountries = useTranslations('taxonomies.countries');
  const tEnglish = useTranslations('taxonomies.englishLevels');
  const tDetail = useTranslations('agencyDetail');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  const isVetted = agency.vetting.status === 'vetted';

  return (
    <li className="group relative flex flex-col rounded-lg bg-surface p-6 ring-1 ring-line transition-shadow ring-inset hover:shadow-md sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">
            {/* Stretched link: the whole card is the hit area, but only the
                agency name is announced as the link text. */}
            <Link
              href={`/agencies/${agency.slug}`}
              className="before:absolute before:inset-0 before:rounded-lg before:content-['']"
            >
              {agency.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-ink-subtle">
            {agency.city}, {tCountries(agency.country)}
          </p>
        </div>
        <Badge tone={isVetted ? 'brand' : 'muted'}>
          {isVetted ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="m2.5 6.2 2.3 2.3 4.7-5" />
            </svg>
          ) : null}
          {isVetted ? t('vetted') : t('pending')}
        </Badge>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        {agency.summary[locale]}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {agency.categories.map((category) => (
          <li key={category}>
            <Badge>{tCategories(category)}</Badge>
          </li>
        ))}
      </ul>

      {/* Two columns at every width. Four does not survive Georgian labels,
          which run two to three times the length of their English twins. */}
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4">
        {[
          { label: tDetail('teamSize'), value: t('team', { count: agency.teamSize }) },
          { label: tDetail('english'), value: tEnglish(agency.englishProficiency) },
          {
            // Just the number of hours — the label already says which city.
            label: tDetail('overlap'),
            value: tCommon('hours', { count: agency.overlapHoursWithTbilisi }),
          },
          {
            label: tDetail('rate'),
            value: t('rate', { range: formatRateRange(agency.hourlyRate, locale) }),
          },
        ].map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-ink-subtle">{item.label}</dt>
            <dd className="mt-0.5 text-sm font-medium tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
