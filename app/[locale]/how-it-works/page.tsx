import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/ui/CtaBanner';

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
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title={t('timeline.title')} id="timeline-title" />
          </div>

          <ol className="relative">
            {/* The route, running the length of the process. */}
            {timelineSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step}
                delay={index * 70}
                className="border-b border-separator py-7 first:pt-0 last:border-0"
              >
                <p className="text-overline text-accent">
                  {t(`timeline.steps.${step}.week`)}
                </p>
                <h3 className="text-title-3 mt-2.5">
                  {t(`timeline.steps.${step}.title`)}
                </h3>
                <p className="text-callout measure-wide mt-2.5 text-label-secondary">
                  {t(`timeline.steps.${step}.body`)}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Same two-column shape as the timeline above: the heading holds the
          left rail while the list runs down the right, so the section fills
          its width instead of stranding half the page. */}
      <Section tone="secondary" labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title={t('faq.title')} id="faq-title" />
          </div>

          <div className="max-w-3xl">
          {faqItems.map((item, index) => (
            <Reveal key={item} delay={index * 45}>
              <details className="group border-b border-separator first:border-t">
                <summary className="text-headline flex min-h-14 cursor-pointer list-none items-center justify-between gap-8 py-5 transition-colors marker:content-none hover:text-accent">
                  {t(`faq.items.${item}.question`)}
                  {/* A plus that becomes a minus — quieter than a rotating
                      chevron and reads unambiguously as open/closed. */}
                  <span
                    aria-hidden="true"
                    className="relative h-3.5 w-3.5 shrink-0 text-label-tertiary transition-colors group-hover:text-accent"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-[--duration-medium] ease-[--ease-emphasized] group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="text-callout measure-wide pb-6 text-label-secondary">
                  {t(`faq.items.${item}.answer`)}
                </p>
              </details>
            </Reveal>
          ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        id="how-cta-title"
        title={t('cta.title')}
        body={t('cta.body')}
        buttonLabel={t('cta.button')}
        href="/contact"
      />
    </>
  );
}
