import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import {
  baselineCountry,
  costCountries,
  costRoles,
  maxMonthlyUsd,
  savingPercent,
} from '@/data/cost-comparison';
import { formatUsd } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

/**
 * Tabular data, so it stays a real `<table>` and screen readers navigate it as
 * one. The figures are set in the title styles and the bars are hairline-thin:
 * the numbers carry the comparison, the bars only make it scannable.
 *
 * Savings are labelled in words as well as coloured, since colour alone must
 * never be the carrier of meaning.
 */
export function CostComparison() {
  const t = useTranslations('home.costComparison');
  const tCountries = useTranslations('taxonomies.countries');
  const locale = useLocale() as Locale;

  return (
    <Section tone="secondary" labelledBy="cost-title">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        id="cost-title"
      />

      <Reveal delay={100} className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">{t('tableCaption')}</caption>
          <thead>
            <tr className="border-b border-separator">
              <th scope="col" className="text-caption py-3 pr-6 text-label-tertiary">
                {t('roleColumn')}
              </th>
              {costCountries.map((country) => (
                <th
                  key={country}
                  scope="col"
                  className="text-caption py-3 pr-6 whitespace-nowrap text-label-tertiary"
                >
                  {tCountries(country)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costRoles.map((role) => (
              <tr key={role.id} className="border-b border-separator align-top">
                <th scope="row" className="text-subheadline py-6 pr-6 font-medium sm:w-64">
                  {t(`roles.${role.id}`)}
                </th>

                {costCountries.map((country) => {
                  const amount = role.monthlyUsd[country];
                  const saving = savingPercent(role, country);
                  const isBaseline = country === baselineCountry;

                  return (
                    <td key={country} className="py-6 pr-6">
                      <span
                        className={`text-title-3 block tabular-nums ${
                          isBaseline ? 'text-label-secondary' : 'text-label'
                        }`}
                      >
                        {formatUsd(amount, locale)}
                      </span>

                      {/* Scaled against the largest figure in the whole table,
                          so any row is comparable to any other. */}
                      <span
                        aria-hidden="true"
                        className="mt-2.5 block h-0.5 w-full max-w-32 overflow-hidden rounded-full bg-fill-secondary"
                      >
                        <span
                          className={`block h-full rounded-full ${
                            isBaseline ? 'bg-label-quaternary' : 'bg-accent'
                          }`}
                          style={{ width: `${(amount / maxMonthlyUsd) * 100}%` }}
                        />
                      </span>

                      {!isBaseline && saving > 0 ? (
                        <span className="text-caption mt-2.5 block text-positive tabular-nums">
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
      </Reveal>

      <Reveal delay={140}>
        <p className="text-footnote measure-wide mt-6 text-label-tertiary">
          {t('disclaimer')}
        </p>
      </Reveal>
    </Section>
  );
}
