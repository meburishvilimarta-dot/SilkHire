import { useTranslations } from 'next-intl';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="on-dark grain relative isolate flex min-h-[70vh] items-center overflow-hidden bg-void text-void-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(23,131,106,0.16),transparent_65%)]"
      />

      <div className="relative container-page py-24 text-center">
        {/* The route, interrupted. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 220 70"
          fill="none"
          className="mx-auto h-16 w-56 text-void-line"
        >
          <path
            d="M8 58C48 58 48 12 96 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M124 12c48 0 48 46 88 46"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 7"
          />
          <circle cx="8" cy="58" r="3.5" fill="currentColor" />
          <circle cx="212" cy="58" r="3.5" fill="currentColor" />
          <path
            d="M104 12h12"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p aria-hidden="true" className="eyebrow mt-10 text-accent tabular-nums">
          404
        </p>
        <h1 className="text-display mt-4 text-[2.5rem] sm:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-void-muted">
          {t('body')}
        </p>
        <ButtonLink href="/" variant="inverse" size="lg" className="mt-10">
          {t('cta')}
          <ButtonArrow />
        </ButtonLink>
      </div>
    </div>
  );
}
