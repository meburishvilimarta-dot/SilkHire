import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

type PageProps = { params: Promise<{ locale: Locale }> };

const timelineSteps = ['brief', 'match', 'meet', 'pilot', 'sign', 'after'] as const;
const faqItems = [
  'cost',
  'contract',
  'small',
  'language',
  'timezone',
  'quality',
  'data',
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.howItWorks' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/how-it-works',
  });
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HowItWorksContent />;
}

function HowItWorksContent() {
  const t = useTranslations('howItWorksPage');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section labelledBy="timeline-title">
        <SectionHeading title={t('timeline.title')} id="timeline-title" />

        <ol className="mt-10 max-w-3xl">
          {timelineSteps.map((step, index) => (
            <li key={step} className="flex gap-6 sm:gap-8">
              {/* The rule is the timeline spine; the last item stops it. */}
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                />
                {index < timelineSteps.length - 1 ? (
                  <span aria-hidden="true" className="w-px flex-1 bg-line" />
                ) : null}
              </div>
              <div className="pb-10">
                <p className="text-xs font-semibold tracking-[0.1em] text-accent uppercase">
                  {t(`timeline.steps.${step}.week`)}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {t(`timeline.steps.${step}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {t(`timeline.steps.${step}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" labelledBy="faq-title">
        <SectionHeading title={t('faq.title')} id="faq-title" />
        <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
          {faqItems.map((item) => (
            <details key={item} className="group py-5">
              <summary className="flex cursor-pointer items-start justify-between gap-6 text-base font-medium marker:content-none">
                {t(`faq.items.${item}.question`)}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 h-4 w-4 shrink-0 text-ink-subtle transition-transform group-open:rotate-180"
                >
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                {t(`faq.items.${item}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section labelledBy="how-cta-title">
        <div className="rounded-lg bg-brand px-8 py-12 text-white sm:px-12">
          <h2
            id="how-cta-title"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {t('cta.title')}
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-white/80">{t('cta.body')}</p>
          <ButtonLink
            href="/contact"
            variant="inverse"
            size="lg"
            className="mt-7"
          >
            {t('cta.button')}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
