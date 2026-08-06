import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  baselineCountry,
  costCountries,
  costRoles,
  maxMonthlyUsd,
  savingPercent,
} from '@/data/cost-comparison';
import { formatUsd } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

export function CostComparison() {
  const t = useTranslations('home.costComparison');
  const tCountries = useTranslations('taxonomies.countries');
  const locale = useLocale() as Locale;

  return (
    <Section tone="surface" labelledBy="cost-title">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        id="cost-title"
      />

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">{t('tableCaption')}</caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="py-3 pr-4 text-sm font-semibold">
                {t('roleColumn')}
              </th>
              {costCountries.map((country) => (
                <th
                  key={country}
                  scope="col"
                  className="py-3 pr-4 text-sm font-semibold whitespace-nowrap"
                >
                  {tCountries(country)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costRoles.map((role) => (
              <tr key={role.id} className="border-b border-line align-top">
                <th
                  scope="row"
                  className="py-5 pr-4 text-sm font-medium text-ink sm:w-64"
                >
                  {t(`roles.${role.id}`)}
                </th>
                {costCountries.map((country) => {
                  const amount = role.monthlyUsd[country];
                  const saving = savingPercent(role, country);
                  const isBaseline = country === baselineCountry;

                  return (
                    <td key={country} className="py-5 pr-4">
                      <span className="block text-base font-semibold tabular-nums">
                        {formatUsd(amount, locale)}
                      </span>
                      {/* Bar widths are proportional across the whole table,
                          so a row is comparable to every other row. */}
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-1.5 max-w-32 overflow-hidden rounded-full bg-surface-sunken"
                      >
                        <span
                          className={`block h-full rounded-full ${
                            isBaseline ? 'bg-ink-subtle' : 'bg-brand'
                          }`}
                          style={{ width: `${(amount / maxMonthlyUsd) * 100}%` }}
                        />
                      </span>
                      {!isBaseline && saving > 0 ? (
                        <span className="mt-2 block text-xs font-medium text-success tabular-nums">
                          −{saving}% {t('savingLabel')}
                        </span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-subtle">
        {t('disclaimer')}
      </p>
    </Section>
  );
}
