import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';
import { agencies } from '@/data/agencies';
import { formatNumber } from '@/lib/format';
import type { Locale } from '@/i18n/routing';
import { RouteGraphic } from './RouteGraphic';

/** Above the fold, so entrance motion runs on load rather than on scroll. */
function entrance(delay: number): React.CSSProperties {
  return {
    animation: `rise-in var(--duration-slow) var(--ease-emphasized) ${delay}ms both`,
  };
}

/**
 * The headline is the only element on the page set at display size, and it is
 * the only place the type scale is allowed to reach its ceiling. Everything
 * under it steps down through the named styles, so the hierarchy is legible in
 * the first second without any colour doing the work.
 */
export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as Locale;

  const stats = [
    { key: 'agencies', value: formatNumber(agencies.length, locale) },
    { key: 'countries', value: formatNumber(2, locale) },
    { key: 'timeToShortlist', value: formatNumber(5, locale) },
  ] as const;

  return (
    <section aria-labelledby="hero-title" className="hairline-bottom bg-bg">
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="text-overline text-accent" style={entrance(0)}>
              {t('eyebrow')}
            </p>

            <h1
              id="hero-title"
              className="text-display measure-wide mt-5"
              style={entrance(60)}
            >
              {t('title')}
            </h1>

            <p
              className="text-body-lead measure mt-6 text-label-secondary"
              style={entrance(120)}
            >
              {t('subtitle')}
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={entrance(180)}
            >
              <ButtonLink href="/contact" size="lg">
                {t('primaryCta')}
                <ButtonArrow />
              </ButtonLink>
              {/* Two options, same size and shape — style alone marks the
                  preferred one, which is what the HIG asks for. */}
              <ButtonLink href="/for-agencies" variant="bordered" size="lg">
                {t('secondaryCta')}
              </ButtonLink>
            </div>

            <dl
              className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-separator pt-8"
              style={entrance(240)}
            >
              {stats.map((stat) => (
                <div key={stat.key}>
                  <dt className="text-footnote text-label-tertiary">
                    {t(`stats.${stat.key}`)}
                  </dt>
                  <dd className="text-title-2 mt-1.5 tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hidden below lg: at phone width the graphic would compete with the
              headline for the only screenful the visitor gives us. */}
          <div className="hidden lg:block" style={entrance(200)}>
            <div className="mx-auto max-w-[30rem]">
              <RouteGraphic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
