import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p aria-hidden="true" className="text-sm font-semibold text-accent tabular-nums">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{t('body')}</p>
      <ButtonLink href="/" size="lg" className="mt-8">
        {t('cta')}
      </ButtonLink>
    </div>
  );
}
