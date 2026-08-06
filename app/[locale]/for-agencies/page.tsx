import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AgencyApplicationForm } from '@/components/forms/AgencyApplicationForm';

type PageProps = { params: Promise<{ locale: Locale }> };

const reasons = ['qualified', 'direct', 'market', 'short'] as const;
const processSteps = ['apply', 'verify', 'publish'] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.forAgencies' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/for-agencies',
  });
}

export default async function ForAgenciesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ForAgenciesContent />;
}

function ForAgenciesContent() {
  const t = useTranslations('forAgencies');
  // `requirements.items` is a JSON array in the message file rather than a
  // numbered set of keys, so it comes back through `t.raw`.
  const requirements = t.raw('requirements.items') as string[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section labelledBy="why-title">
        <SectionHeading title={t('why.title')} id="why-title" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="rounded-lg bg-surface p-7 ring-1 ring-line ring-inset"
            >
              <h3 className="text-base font-semibold tracking-tight">
                {t(`why.items.${reason}.title`)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {t(`why.items.${reason}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="process-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={t('process.title')} id="process-title" />
            <ol className="mt-8 space-y-6">
              {processSteps.map((step, index) => (
                <li key={step} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-ink tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {t(`process.steps.${step}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('requirements.title')}
            </h2>
            <ul className="mt-6 space-y-3">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3 text-sm leading-relaxed">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 h-4 w-4 shrink-0 text-brand"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  <span className="text-ink-muted">{requirement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg bg-surface-sunken p-6">
              <h3 className="text-sm font-semibold">{t('pricing.title')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t('pricing.body')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="apply" labelledBy="apply-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={t('formTitle')}
            subtitle={t('formSubtitle')}
            id="apply-title"
          />
          <div className="mt-10">
            <AgencyApplicationForm />
          </div>
        </div>
      </Section>
    </>
  );
}
