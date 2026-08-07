import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge, CheckMark } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
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

  const facts = [
    { label: tDetail('teamSize'), value: t('team', { count: agency.teamSize }) },
    { label: tDetail('english'), value: tEnglish(agency.englishProficiency) },
    {
      // Just the number of hours — the label already names the city.
      label: tDetail('overlap'),
      value: tCommon('hours', { count: agency.overlapHoursWithTbilisi }),
    },
    {
      label: tDetail('rate'),
      value: t('rate', { range: formatRateRange(agency.hourlyRate, locale) }),
    },
  ];

  return (
    <Card as="li" interactive className="flex flex-col p-7 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-display text-[1.375rem] leading-tight">
            {/* Stretched link: the whole card is the hit area, but only the
                agency name is announced as the link text. */}
            <Link
              href={`/agencies/${agency.slug}`}
              className="before:absolute before:inset-0 before:z-20 before:rounded-lg before:content-['']"
            >
              {agency.name}
            </Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-ink-subtle">
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="h-3 w-3 shrink-0"
            >
              <path d="M6 10.5S9.5 7.6 9.5 5a3.5 3.5 0 1 0-7 0c0 2.6 3.5 5.5 3.5 5.5Z" />
              <circle cx="6" cy="5" r="1.2" />
            </svg>
            {agency.city}, {tCountries(agency.country)}
          </p>
        </div>

        <Badge tone={isVetted ? 'brand' : 'outline'}>
          {isVetted ? <CheckMark /> : null}
          {isVetted ? t('vetted') : t('pending')}
        </Badge>
      </div>

      <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
        {agency.summary[locale]}
      </p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {agency.categories.map((category) => (
          <li key={category}>
            <Badge tone="neutral">{tCategories(category)}</Badge>
          </li>
        ))}
      </ul>

      {/* Two columns at every width. Four does not survive Georgian labels,
          which run two to three times the length of their English twins. */}
      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[0.6875rem] tracking-wide text-ink-subtle uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1 text-[0.9375rem] font-medium tabular-nums">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
