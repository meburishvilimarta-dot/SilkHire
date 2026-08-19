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
    <Card as="li" interactive className="flex flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-title-3">
            {/* Stretched link: the whole card is the hit area, but only the
                agency name is announced as the link text. */}
            <Link
              href={`/agencies/${agency.slug}`}
              className="before:absolute before:inset-0 before:z-20 before:rounded-lg before:content-['']"
            >
              {agency.name}
            </Link>
          </h3>
          <p className="text-footnote mt-1 text-label-tertiary">
            {agency.city}, {tCountries(agency.country)}
          </p>
        </div>

        <Badge tone={isVetted ? 'positive' : 'outline'}>
          {isVetted ? <CheckMark /> : null}
          {isVetted ? t('vetted') : t('pending')}
        </Badge>
      </div>

      <p className="text-callout mt-4 flex-1 text-label-secondary">
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
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-separator pt-5">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-caption text-label-tertiary">{fact.label}</dt>
            <dd className="text-subheadline mt-0.5 font-medium tabular-nums">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
