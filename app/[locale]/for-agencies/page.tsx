import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { CheckMark } from '@/components/ui/Badge';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';
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
  const tCommon = useTranslations('common');
  // `requirements.items` is a JSON array in the message file rather than a
  // numbered set of keys, so it comes back through `t.raw`.
  const requirements = t.raw('requirements.items') as string[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <ButtonLink href="#apply" size="lg">
          {tCommon('listAgency')}
          <ButtonArrow />
        </ButtonLink>
      </PageHero>

      <Section labelledBy="why-title">
        <SectionHeading title={t('why.title')} id="why-title" />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason} delay={index * 80}>
              <Card className="h-full p-7 sm:p-8">
                <span aria-hidden="true" className="text-overline block text-accent tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-title-3 mt-4">{t(`why.items.${reason}.title`)}</h3>
                <p className="text-callout mt-3 text-label-secondary">
                  {t(`why.items.${reason}.body`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="secondary" labelledBy="process-title">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading title={t('process.title')} id="process-title" />

            <ol className="mt-10">
              {processSteps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step}
                  delay={index * 80}
                  className="flex gap-5 pb-8 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="text-caption flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-headline">{t(`process.steps.${step}.title`)}</h3>
                    <p className="text-callout mt-2 text-label-secondary">
                      {t(`process.steps.${step}.body`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <h2 className="text-title-2">{t('requirements.title')}</h2>
            </Reveal>

            <ul className="mt-7 space-y-4">
              {requirements.map((requirement, index) => (
                <Reveal
                  as="li"
                  key={requirement}
                  delay={index * 60}
                  className="text-subheadline flex gap-4 border-b border-separator pb-4"
                >
                  <CheckMark className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="text-label-secondary">{requirement}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={140}>
              <div className="mt-10 rounded-lg border border-separator bg-bg px-6 py-5">
                <h3 className="text-overline text-accent">{t('pricing.title')}</h3>
                <p className="text-callout mt-3 text-label-secondary">
                  {t('pricing.body')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="apply" labelledBy="apply-title" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={t('formTitle')}
            subtitle={t('formSubtitle')}
            id="apply-title"
            align="center"
          />
          <Reveal delay={120} className="mt-12">
            <div className="rounded-xl border border-separator bg-bg-secondary p-6 sm:p-10">
              <AgencyApplicationForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
