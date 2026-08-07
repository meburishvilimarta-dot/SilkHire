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
 * The dark beat in the middle of the page. It stays a real `<table>` — this is
 * tabular data and screen readers should navigate it as such — but the numbers
 * are set large in the display face and each cell carries a proportional bar.
 */
export function CostComparison() {
  const t = useTranslations('home.costComparison');
  const tCountries = useTranslations('taxonomies.countries');
  const locale = useLocale() as Locale;

  return (
    <Section tone="void" labelledBy="cost-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_0%,rgba(23,131,106,0.18),transparent_65%)]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          tone="dark"
          id="cost-title"
        />

        <Reveal delay={120} className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">{t('tableCaption')}</caption>
            <thead>
              <tr className="border-b border-void-line">
                <th scope="col" className="eyebrow py-4 pr-6 text-void-muted">
                  {t('roleColumn')}
                </th>
                {costCountries.map((country) => (
                  <th
                    key={country}
                    scope="col"
                    className={`eyebrow py-4 pr-6 whitespace-nowrap ${
                      country === baselineCountry ? 'text-void-muted' : 'text-accent-bright'
                    }`}
                  >
                    {tCountries(country)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {costRoles.map((role) => (
                <tr key={role.id} className="group border-b border-void-line/70 align-top">
                  <th
                    scope="row"
                    className="py-7 pr-6 text-[0.9375rem] leading-snug font-medium text-void-ink sm:w-64"
                  >
                    {t(`roles.${role.id}`)}
                  </th>

                  {costCountries.map((country) => {
                    const amount = role.monthlyUsd[country];
                    const saving = savingPercent(role, country);
                    const isBaseline = country === baselineCountry;

                    return (
                      <td key={country} className="py-7 pr-6">
                        <span
                          className={`text-display block text-2xl tabular-nums sm:text-[1.75rem] ${
                            isBaseline ? 'text-void-muted' : 'text-void-ink'
                          }`}
                        >
                          {formatUsd(amount, locale)}
                        </span>

                        {/* Bars are scaled against the largest figure in the
                            whole table, so any row is comparable to any other. */}
                        <span
                          aria-hidden="true"
                          className="mt-3 block h-[3px] w-full max-w-36 overflow-hidden rounded-full bg-void-ink/10"
                        >
                          <span
                            className={`block h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isBaseline
                                ? 'bg-void-muted/50'
                                : 'bg-gradient-to-r from-brand-bright to-accent'
                            }`}
                            style={{ width: `${(amount / maxMonthlyUsd) * 100}%` }}
                          />
                        </span>

                        {!isBaseline && saving > 0 ? (
                          <span className="mt-3 inline-flex items-center rounded-[5px] bg-accent/12 px-2 py-0.5 text-[0.6875rem] font-semibold text-accent-bright tabular-nums ring-1 ring-accent/20 ring-inset">
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

        <Reveal delay={180}>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-void-muted">
            {t('disclaimer')}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
