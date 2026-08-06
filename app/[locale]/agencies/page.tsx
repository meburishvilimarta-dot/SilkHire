import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { agencies } from '@/data/agencies';
import { AgencyDirectory } from '@/components/agencies/AgencyDirectory';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.agencies' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/agencies',
  });
}

export default async function AgenciesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'agencies' });
  const tMeta = await getTranslations({ locale, namespace: 'meta.agencies' });

  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {tMeta('description')}
          </p>
        </div>
      </div>

      {/* `useSearchParams` in the directory needs a Suspense boundary so the
          shell around it can still be prerendered. */}
      <Suspense fallback={<DirectorySkeleton />}>
        <AgencyDirectory allAgencies={agencies} />
      </Suspense>
    </>
  );
}

function DirectorySkeleton() {
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[16rem_1fr] lg:gap-14 lg:py-16">
      <div className="hidden lg:block">
        <div className="h-96 animate-pulse rounded-lg bg-surface-sunken" />
      </div>
      <ul className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="h-64 animate-pulse rounded-lg bg-surface-sunken"
            aria-hidden="true"
          />
        ))}
      </ul>
    </div>
  );
}
