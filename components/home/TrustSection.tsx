import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import type { VettingCheck } from '@/types/agency';

const checks: readonly VettingCheck[] = [
  'legal-entity',
  'client-references',
  'english-interview',
  'security-review',
  'sample-work',
] as const;

/**
 * Two columns on desktop: the argument stays pinned while the five checks
 * scroll past it. The heading is the claim being proved, so it should still be
 * on screen when the reader reaches check five.
 */
export function TrustSection() {
  const t = useTranslations('home.trust');

  return (
    <Section labelledBy="trust-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            id="trust-title"
          />

          <Reveal delay={180}>
            <p className="text-footnote measure mt-8 text-label-tertiary">
              {t.rich('note', {
                aboutLink: (chunks) => (
                  <Link
                    href="/about"
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </Reveal>
        </div>

        <ol>
          {checks.map((check, index) => (
            <Reveal
              as="li"
              key={check}
              delay={index * 60}
              className="flex gap-5 border-b border-separator py-6 first:pt-0 last:border-0 sm:gap-7"
            >
              <span
                aria-hidden="true"
                className="text-caption mt-0.5 w-6 shrink-0 text-accent tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-headline">{t(`checks.${check}.title`)}</h3>
                <p className="text-callout measure-wide mt-2 text-label-secondary">
                  {t(`checks.${check}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
