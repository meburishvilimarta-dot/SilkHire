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

      <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {/* The route again: one line threading the three steps together. */}
        <span
          aria-hidden="true"
          className="absolute top-3 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent md:block"
        />

        {steps.map((step, index) => (
          <Reveal as="li" key={step} delay={index * 110} className="relative">
            <span
              aria-hidden="true"
              className="relative z-10 block h-6 w-6 rounded-full border border-line-strong bg-paper"
            >
              <span className="absolute inset-[7px] rounded-full bg-accent" />
            </span>

            <p className="eyebrow mt-6 text-accent tabular-nums">
              {t(`steps.${step}.number`)}
            </p>
            <h3 className="text-display mt-3 text-2xl sm:text-[1.75rem]">
              {t(`steps.${step}.title`)}
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
              {t(`steps.${step}.body`)}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={160} className="mt-14">
        <ButtonLink href="/contact" size="lg">
          {t('cta')}
          <ButtonArrow />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
