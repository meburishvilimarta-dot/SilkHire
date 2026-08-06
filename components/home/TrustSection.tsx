import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Link } from '@/i18n/navigation';
import type { VettingCheck } from '@/types/agency';

const checks: readonly VettingCheck[] = [
  'legal-entity',
  'client-references',
  'english-interview',
  'security-review',
  'sample-work',
] as const;

export function TrustSection() {
  const t = useTranslations('home.trust');

  return (
    <Section tone="surface" labelledBy="trust-title">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        id="trust-title"
      />

      <ol className="mt-12 space-y-px overflow-hidden rounded-lg bg-line ring-1 ring-line">
        {checks.map((check, index) => (
          <li
            key={check}
            className="flex gap-5 bg-surface p-6 sm:gap-7 sm:p-7 lg:items-baseline"
          >
            <span
              aria-hidden="true"
              className="w-6 shrink-0 text-sm font-semibold tabular-nums text-accent"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="lg:flex lg:gap-8">
              <h3 className="text-base font-semibold tracking-tight lg:w-72 lg:shrink-0">
                {t(`checks.${check}.title`)}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted lg:mt-0">
                {t(`checks.${check}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
        {t.rich('note', {
          aboutLink: (chunks) => (
            <Link
              href="/about"
              className="font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </Section>
  );
}
