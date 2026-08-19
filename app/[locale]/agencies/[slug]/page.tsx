import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { formatDate, formatRateRange, toParagraphs } from '@/lib/format';
import { agencies, getAgencyBySlug } from '@/data/agencies';
import { Badge, CheckMark } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';
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

  /** The three figures a buyer scans for first, pulled out of the fact list. */
  const headline = [
    { label: t('rate'), value: formatRateRange(agency.hourlyRate, locale) },
    { label: t('teamSize'), value: tCard('team', { count: agency.teamSize }) },
    {
      label: t('overlap'),
      value: tCommon('hours', { count: agency.overlapHoursWithTbilisi }),
    },
  ];

  const facts: { label: string; value: string }[] = [
    { label: t('founded'), value: String(agency.foundedYear) },
    { label: t('location'), value: `${agency.city}, ${tCountries(agency.country)}` },
    { label: t('english'), value: tEnglish(agency.englishProficiency) },
    {
      label: t('minEngagement'),
      value: tCommon('months', { count: agency.minEngagementMonths }),
    },
    { label: t('timezone'), value: agency.timezone },
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
      <header className="hairline-bottom bg-bg">
        <div className="container-page py-12 sm:py-16">
          <Link
            href="/agencies"
            className="text-subheadline group inline-flex min-h-11 items-center gap-2 text-accent transition-opacity duration-[--duration-fast] hover:opacity-70"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] group-hover:-translate-x-0.5"
            >
              <path d="M13 8H3m4-4-4 4 4 4" />
            </svg>
            {tCommon('backToAgencies')}
          </Link>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-x-10 gap-y-4">
            <div className="measure-wide">
              <h1 className="text-display">{agency.name}</h1>
              <p className="text-body-lead mt-4 text-label-secondary">
                {agency.tagline[locale]}
              </p>
            </div>
            <Badge tone={isVetted ? 'positive' : 'outline'}>
              {isVetted ? <CheckMark /> : null}
              {isVetted ? tCard('vetted') : tCard('pending')}
            </Badge>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {agency.categories.map((category) => (
              <li key={category}>
                <Badge>{tCategories(category)}</Badge>
              </li>
            ))}
            {agency.engagementModels.map((model) => (
              <li key={model}>
                <Badge tone="outline">{tEngagement(model)}</Badge>
              </li>
            ))}
          </ul>

          {/* The three numbers, set large and directly under the name. */}
          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-6 border-t border-separator pt-7 sm:grid-cols-3 sm:gap-10">
            {headline.map((item) => (
              <div key={item.label}>
                <dt className="text-footnote text-label-tertiary">{item.label}</dt>
                <dd className="text-title-2 mt-1.5 tabular-nums">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-page grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <Reveal as="section" className="scroll-mt-28">
            <h2 className="text-overline text-accent">{t('about')}</h2>
            <div className="mt-6 space-y-5">
              {toParagraphs(agency.description[locale]).map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'text-body-lead measure-wide'
                      : 'text-body measure-wide text-label-secondary'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-16">
            <h2 className="text-overline text-accent">{t('specialties')}</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {agency.specialties.map((specialty) => (
                <li
                  key={specialty.en}
                  className="text-subheadline flex items-start gap-3 border-b border-separator pb-3 text-label-secondary"
                >
                  <CheckMark className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                  {specialty[locale]}
                </li>
              ))}
            </ul>
          </Reveal>

          {agency.caseStudies.length > 0 ? (
            <section className="mt-16">
              <h2 className="text-overline text-accent">{t('caseStudies')}</h2>
              <ul className="mt-6 space-y-5">
                {agency.caseStudies.map((study, index) => (
                  <Reveal as="li" key={study.title.en} delay={index * 90}>
                    <Card className="p-6 sm:p-7">
                      <h3 className="text-title-3">{study.title[locale]}</h3>
                      <p className="text-callout mt-3 text-label-secondary">
                        {study.result[locale]}
                      </p>
                      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-separator pt-4">
                        {[
                          {
                            label: t('caseStudyIndustry'),
                            value: study.clientIndustry[locale],
                          },
                          {
                            label: t('caseStudyTeam'),
                            value: tCard('team', { count: study.teamSize }),
                          },
                          {
                            label: t('caseStudyDuration'),
                            value: tCommon('months', { count: study.durationMonths }),
                          },
                        ].map((item) => (
                          <div key={item.label}>
                            <dt className="text-caption text-label-tertiary">
                              {item.label}
                            </dt>
                            <dd className="text-footnote mt-1 font-medium">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </Card>
                  </Reveal>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <section
            aria-labelledby="glance-heading"
            className="rounded-lg border border-separator bg-bg-secondary p-6"
          >
            <h2 id="glance-heading" className="text-caption text-label-tertiary">
              {t('atAGlance')}
            </h2>
            <dl className="text-subheadline mt-4 space-y-3.5">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between gap-5 border-b border-separator pb-3.5 last:border-0 last:pb-0"
                >
                  <dt className="text-label-tertiary">{fact.label}</dt>
                  <dd className="text-right font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="vetting-heading"
            className="mt-5 rounded-lg border border-separator bg-bg-secondary p-6"
          >
            <h2 id="vetting-heading" className="text-caption text-accent">
              {t('vetting')}
            </h2>
            <p className="text-footnote mt-2 text-label-secondary">
              {isVetted
                ? t('vettedOn', { date: formatDate(agency.vetting.verifiedOn, locale) })
                : t('pendingNote')}
            </p>
            <ul className="text-subheadline mt-4 space-y-3">
              {allChecks.map((check) => {
                const passed = agency.vetting.checks.includes(check);
                return (
                  <li key={check} className="flex items-start gap-3">
                    {passed ? (
                      <CheckMark className="mt-1 h-3.5 w-3.5 shrink-0 text-positive" />
                    ) : (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-label-quaternary"
                      >
                        <circle cx="6" cy="6" r="4" strokeDasharray="2 2" />
                      </svg>
                    )}
                    <span className={passed ? 'text-label' : 'text-label-tertiary'}>
                      {tChecks(check)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section
            aria-labelledby="cta-heading"
            className="mt-5 rounded-lg border border-separator bg-bg-secondary p-6"
          >
            <h2 id="cta-heading" className="text-headline">
              {t('cta.title', { name: agency.name })}
            </h2>
            <p className="text-subheadline mt-2 text-label-secondary">{t('cta.body')}</p>
            <ButtonLink href="/contact" className="mt-5 w-full">
              {t('cta.button')}
              <ButtonArrow />
            </ButtonLink>
          </section>
        </aside>
      </div>
    </article>
  );
}
