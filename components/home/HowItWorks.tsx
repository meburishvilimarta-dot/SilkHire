import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

const steps = ['brief', 'shortlist', 'start'] as const;

export function HowItWorks() {
  const t = useTranslations('home.howItWorks');

  return (
    <Section labelledBy="how-it-works-title">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        id="how-it-works-title"
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-line ring-1 ring-line md:grid-cols-3">
        {steps.map((step) => (
          <li key={step} className="bg-surface p-7 lg:p-8">
            <span
              aria-hidden="true"
              className="block text-sm font-semibold tabular-nums text-accent"
            >
              {t(`steps.${step}.number`)}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {t(`steps.${step}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {t(`steps.${step}.body`)}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <ButtonLink href="/contact" size="lg">
          {t('cta')}
        </ButtonLink>
      </div>
    </Section>
  );
}
