import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';

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

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <Reveal as="li" key={step} delay={index * 80}>
            {/* The number is set in the accent at caption size rather than as a
                large graphic — it orders the steps without competing with the
                titles for attention. */}
            <p className="text-overline text-accent tabular-nums">
              {t(`steps.${step}.number`)}
            </p>
            <h3 className="text-title-3 mt-3">{t(`steps.${step}.title`)}</h3>
            <p className="text-callout mt-3 text-label-secondary">
              {t(`steps.${step}.body`)}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={140} className="mt-12">
        <ButtonLink href="/contact" size="lg">
          {t('cta')}
          <ButtonArrow />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
