import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { formatDate, formatRateRange, toParagraphs } from '@/lib/format';
import { agencies, getAgencyBySlug } from '@/data/agencies';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import type { Agency, VettingCheck } from '@/types/agency';

const allChecks: readonly VettingCheck[] = [
  'legal-entity',
  'client-references',
  'english-interview',
  'security-review',
  'sample-work',
] as const;

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

/** Every locale × every agency is known at build time, so all of it is static. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    agencies.map((agency) => ({ locale, slug: agency.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const agency = getAgencyBySlug(slug);
  if (!agency) return {};

  const t = await getTranslations({ locale, namespace: 'meta.agencyDetail' });
  const tCountries = await getTranslations({ locale, namespace: 'taxonomies.countries' });

  return buildMetadata({
    locale,
    title: agency.name,
    description: t('description', {
      name: agency.name,
      country: tCountries(agency.country),
      summary: agency.summary[locale],
    }),
    path: `/agencies/${agency.slug}`,
  });
}

export default async function AgencyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const agency = getAgencyBySlug(slug);
  if (!agency) notFound();

  return <AgencyDetail agency={agency} />;
}

function AgencyDetail({ agency }: { agency: Agency }) {
  const t = useTranslations('agencyDetail');
  const tCommon = useTranslations('common');
  const tCategories = useTranslations('taxonomies.categories');
  const tCountries = useTranslations('taxonomies.countries');
  const tEnglish = useTranslations('taxonomies.englishLevels');
  const tEngagement = useTranslations('taxonomies.engagementModels');
  const tChecks = useTranslations('taxonomies.vettingChecks');
  const tLanguages = useTranslations('taxonomies.languages');
  const tCard = useTranslations('agencies.card');
  const locale = useLocale() as Locale;

  const isVetted = agency.vetting.status === 'vetted';

  const facts: { label: string; value: string }[] = [
    { label: t('founded'), value: String(agency.foundedYear) },
    { label: t('teamSize'), value: tCard('team', { count: agency.teamSize }) },
    { label: t('location'), value: `${agency.city}, ${tCountries(agency.country)}` },
    { label: t('english'), value: tEnglish(agency.englishProficiency) },
    { label: t('rate'), value: tCard('rate', { range: formatRateRange(agency.hourlyRate, locale) }) },
    {
      label: t('minEngagement'),
      value: tCommon('months', { count: agency.minEngagementMonths }),
    },
    { label: t('timezone'), value: agency.timezone },
    {
      label: t('overlap'),
      value: t('overlapValue', { hours: agency.overlapHoursWithTbilisi }),
    },
    {
      label: t('languages'),
      value: agency.languages.map((code) => tLanguages(code)).join(', '),
    },
    {
      label: t('certifications'),
      value: agency.certifications.length
        ? agency.certifications.join(', ')
        : t('noCertifications'),
    },
  ];

  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="container-page py-10 sm:py-14">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M13 8H3m4-4-4 4 4 4" />
            </svg>
            {tCommon('backToAgencies')}
          </Link>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {agency.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
                {agency.tagline[locale]}
              </p>
            </div>
            <Badge tone={isVetted ? 'brand' : 'muted'}>
              {isVetted ? tCard('vetted') : tCard('pending')}
            </Badge>
          </div>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {agency.categories.map((category) => (
              <li key={category}>
                <Badge tone="neutral">{tCategories(category)}</Badge>
              </li>
            ))}
            {agency.engagementModels.map((model) => (
              <li key={model}>
                <Badge tone="muted">{tEngagement(model)}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:py-16">
        <div className="min-w-0">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-xl font-semibold tracking-tight">
              {t('about')}
            </h2>
            <div className="mt-4 space-y-4">
              {toParagraphs(agency.description[locale]).map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="specialties-heading" className="mt-12">
            <h2 id="specialties-heading" className="text-xl font-semibold tracking-tight">
              {t('specialties')}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {agency.specialties.map((specialty) => (
                <li
                  key={specialty.en}
                  className="flex items-start gap-2.5 text-sm text-ink-muted"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  {specialty[locale]}
                </li>
              ))}
            </ul>
          </section>

          {agency.caseStudies.length > 0 ? (
            <section aria-labelledby="cases-heading" className="mt-12">
              <h2 id="cases-heading" className="text-xl font-semibold tracking-tight">
                {t('caseStudies')}
              </h2>
              <ul className="mt-4 space-y-4">
                {agency.caseStudies.map((study) => (
                  <li
                    key={study.title.en}
                    className="rounded-lg bg-surface p-6 ring-1 ring-line ring-inset"
                  >
                    <h3 className="font-semibold tracking-tight">{study.title[locale]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {study.result[locale]}
                    </p>
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-3 text-xs">
                      <div className="flex gap-1.5">
                        <dt className="text-ink-subtle">{t('caseStudyIndustry')}:</dt>
                        <dd className="font-medium">{study.clientIndustry[locale]}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-ink-subtle">{t('caseStudyTeam')}:</dt>
                        <dd className="font-medium tabular-nums">
                          {tCard('team', { count: study.teamSize })}
                        </dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-ink-subtle">{t('caseStudyDuration')}:</dt>
                        <dd className="font-medium tabular-nums">
                          {tCommon('months', { count: study.durationMonths })}
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <section
            aria-labelledby="glance-heading"
            className="rounded-lg bg-surface p-6 ring-1 ring-line ring-inset"
          >
            <h2 id="glance-heading" className="text-sm font-semibold">
              {t('atAGlance')}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4">
                  <dt className="text-ink-subtle">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="vetting-heading"
            className="mt-5 rounded-lg bg-surface p-6 ring-1 ring-line ring-inset"
          >
            <h2 id="vetting-heading" className="text-sm font-semibold">
              {t('vetting')}
            </h2>
            <p className="mt-1 text-xs text-ink-subtle">
              {isVetted
                ? t('vettedOn', { date: formatDate(agency.vetting.verifiedOn, locale) })
                : t('pendingNote')}
            </p>
            <ul className="mt-4 space-y-2.5">
              {allChecks.map((check) => {
                const passed = agency.vetting.checks.includes(check);
                return (
                  <li key={check} className="flex items-start gap-2.5 text-sm">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        passed ? 'text-brand' : 'text-line-strong'
                      }`}
                    >
                      {passed ? <path d="m3.5 8.5 3 3 6-7" /> : <circle cx="8" cy="8" r="5" />}
                    </svg>
                    <span className={passed ? 'text-ink-muted' : 'text-ink-subtle'}>
                      {tChecks(check)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section
            aria-labelledby="cta-heading"
            className="mt-5 rounded-lg bg-brand p-6 text-white"
          >
            <h2 id="cta-heading" className="text-base font-semibold tracking-tight">
              {t('cta.title', { name: agency.name })}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{t('cta.body')}</p>
            <ButtonLink
              href="/contact"
              variant="inverse"
              className="mt-5 w-full"
            >
              {t('cta.button')}
            </ButtonLink>
          </section>
        </aside>
      </div>
    </article>
  );
}
