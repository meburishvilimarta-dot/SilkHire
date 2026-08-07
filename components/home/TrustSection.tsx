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
 * Two columns on desktop: the argument stays pinned on the left while the five
 * checks scroll past it on the right. The heading is the thing being proved,
 * so it should still be on screen when the reader reaches check five.
 */
export function TrustSection() {
  const t = useTranslations('home.trust');

  return (
    <Section tone="sunken" labelledBy="trust-title">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            id="trust-title"
          />

          <Reveal delay={200}>
            <p className="mt-8 max-w-md border-l-2 border-accent/40 pl-5 text-sm leading-relaxed text-ink-muted">
              {t.rich('note', {
                aboutLink: (chunks) => (
                  <Link
                    href="/about"
                    className="font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </Reveal>
        </div>

        <ol className="relative">
          {/* The spine, running the full height of the list. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-line-strong"
          />

          {checks.map((check, index) => (
            <Reveal
              as="li"
              key={check}
              delay={index * 80}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-[0.6875rem] font-semibold text-accent ring-1 ring-line-strong tabular-nums"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="pt-0.5">
                <h3 className="text-display text-xl">{t(`checks.${check}.title`)}</h3>
                <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
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
