import { useTranslations } from 'next-intl';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-[70vh] items-center bg-bg">
      <div className="container-page py-24 text-center">
        {/* The route, interrupted. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 220 70"
          fill="none"
          className="mx-auto h-14 w-48 text-label-quaternary"
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
        </svg>

        <p aria-hidden="true" className="text-overline mt-8 text-accent tabular-nums">
          404
        </p>
        <h1 className="text-title-1 mt-4">{t('title')}</h1>
        <p className="text-body measure mx-auto mt-4 text-label-secondary">{t('body')}</p>
        <ButtonLink href="/" size="lg" className="mt-9">
          {t('cta')}
          <ButtonArrow />
        </ButtonLink>
      </div>
    </div>
  );
}
