import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { agencies } from '@/data/agencies';
import { formatNumber } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale() as Locale;

  const stats = [
    { key: 'agencies', value: formatNumber(agencies.length, locale) },
    { key: 'countries', value: formatNumber(2, locale) },
    { key: 'timeToShortlist', value: formatNumber(5, locale) },
  ] as const;

  return (
    <section className="border-b border-line bg-surface" aria-labelledby="hero-title">
      <div className="container-page py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {t('eyebrow')}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            {t('title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {t('subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg">
              {t('primaryCta')}
            </ButtonLink>
            <ButtonLink href="/for-agencies" variant="secondary" size="lg">
              {t('secondaryCta')}
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8 sm:gap-10">
          {stats.map((stat) => (
            // `flex-col-reverse` puts the figure above its label while keeping
            // the required dt-before-dd order in the DOM.
            <div key={stat.key} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-ink-muted">{t(`stats.${stat.key}`)}</dt>
              <dd className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
