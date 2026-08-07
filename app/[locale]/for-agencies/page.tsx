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
        <ButtonLink href="#apply" variant="inverse" size="lg">
          {tCommon('listAgency')}
          <ButtonArrow />
        </ButtonLink>
      </PageHero>

      <Section labelledBy="why-title">
        <SectionHeading title={t('why.title')} id="why-title" />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason} delay={index * 80}>
              <Card interactive className="h-full p-8">
                <span
                  aria-hidden="true"
                  className="eyebrow block text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-display mt-4 text-[1.5rem]">
                  {t(`why.items.${reason}.title`)}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {t(`why.items.${reason}.body`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="process-title">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading title={t('process.title')} id="process-title" />

            <ol className="relative mt-10">
              <span
                aria-hidden="true"
                className="absolute top-4 bottom-10 left-[15px] w-px bg-line-strong"
              />
              {processSteps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step}
                  delay={index * 80}
                  className="relative flex gap-6 pb-9 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-void-ink tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-display text-xl">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {t(`process.steps.${step}.body`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <h2 className="text-display text-[1.75rem] sm:text-[2rem]">
                {t('requirements.title')}
              </h2>
            </Reveal>

            <ul className="mt-7 space-y-4">
              {requirements.map((requirement, index) => (
                <Reveal
                  as="li"
                  key={requirement}
                  delay={index * 60}
                  className="flex gap-4 border-b border-line pb-4 text-[0.9375rem] leading-relaxed"
                >
                  <CheckMark className="mt-1.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  <span className="text-ink-muted">{requirement}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={140}>
              <div className="mt-10 border-l-2 border-accent/40 bg-accent-soft/50 px-6 py-5">
                <h3 className="eyebrow text-accent">{t('pricing.title')}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
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
          <Reveal delay={120} className="mt-14">
            <div className="rounded-xl bg-surface p-7 ring-1 ring-line ring-inset sm:p-10">
              <AgencyApplicationForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
