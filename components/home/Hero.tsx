import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';
import { agencies } from '@/data/agencies';
import { formatNumber } from '@/lib/format';
import type { Locale } from '@/i18n/routing';
import { RouteGraphic } from './RouteGraphic';

/**
 * Above the fold, so entrance motion runs on load with CSS delays rather than
 * waiting on a scroll observer. `both` fill keeps the end state under reduced
 * motion, where the global rule clamps every duration to near zero.
 */
function entrance(delay: number): React.CSSProperties {
  return { animation: `rise-in 0.8s var(--ease-out-soft) ${delay}ms both` };
}

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as Locale;

  const stats = [
    { key: 'agencies', value: formatNumber(agencies.length, locale) },
    { key: 'countries', value: formatNumber(2, locale) },
    { key: 'timeToShortlist', value: formatNumber(5, locale) },
  ] as const;

  return (
    <section
      aria-labelledby="hero-title"
      // Flows straight out of the dark header — no seam between them.
      className="on-dark grain relative isolate overflow-hidden bg-void text-void-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_78%_18%,rgba(23,131,106,0.16),transparent_60%)]"
      />

      <div className="relative container-page pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-accent" style={entrance(0)}>
              <span aria-hidden="true" className="h-px w-7 bg-accent/50" />
              {t('eyebrow')}
            </p>

            <h1
              id="hero-title"
              // Fluid, and capped well below what the English would take.
              // Georgian sets two to three times wider, so a size tuned on
              // "Build your team abroad" pushes the Georgian CTAs off-screen.
              className="text-display mt-6 max-w-[15ch] text-[clamp(2.125rem,4.4vw,3.5rem)]"
              style={entrance(90)}
            >
              {t('title')}
            </h1>

            <p
              className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-void-muted"
              style={entrance(180)}
            >
              {t('subtitle')}
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={entrance(270)}
            >
              <ButtonLink href="/contact" variant="inverse" size="lg">
                {t('primaryCta')}
                <ButtonArrow />
              </ButtonLink>
              <ButtonLink href="/for-agencies" variant="quiet" size="lg">
                {t('secondaryCta')}
              </ButtonLink>
            </div>

            <dl
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-void-line pt-7 sm:gap-8"
              style={entrance(360)}
            >
              {stats.map((stat) => (
                // `flex-col-reverse` puts the figure above its label while
                // keeping the required dt-before-dd order in the DOM. The
                // reversed main axis runs upward, so `justify-end` packs each
                // group at the *top* — without it a label that wraps to two
                // lines shoves its figure out of line with the others.
                <div
                  key={stat.key}
                  className="flex flex-col-reverse justify-end gap-1.5"
                >
                  <dt className="text-[0.8125rem] leading-snug text-void-muted">
                    {t(`stats.${stat.key}`)}
                  </dt>
                  <dd className="text-display text-[2rem] tabular-nums sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hidden below lg: at phone width the graphic would compete with the
              headline for the only screenful the visitor gives us. */}
          <div className="hidden lg:block" style={entrance(320)}>
            <div className="animate-drift mx-auto max-w-[30rem]">
              <RouteGraphic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
