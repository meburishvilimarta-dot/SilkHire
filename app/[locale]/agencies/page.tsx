import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { agencies } from '@/data/agencies';
import { AgencyDirectory } from '@/components/agencies/AgencyDirectory';
import { PageHero } from '@/components/ui/PageHero';

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
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <PageHero
        eyebrow={tNav('agencies')}
        title={t('title')}
        subtitle={tMeta('description')}
      />

      {/* `useSearchParams` in the directory needs a Suspense boundary so the
          shell around it can still be prerendered. */}
      <Suspense fallback={<DirectorySkeleton />}>
        <AgencyDirectory allAgencies={agencies} />
      </Suspense>
    </>
  );
}

/** Matches the real grid so nothing shifts when the results arrive. */
function DirectorySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="container-page grid grid-cols-1 gap-10 py-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16 lg:py-20"
    >
      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        {[9, 7, 8, 5, 5].map((rows, index) => (
          <div key={index} className="space-y-3">
            <div className="h-2.5 w-20 animate-pulse rounded-sm bg-bg-secondary" />
            <div
              className="animate-pulse rounded-sm bg-bg-secondary"
              style={{ height: `${rows * 0.4}rem` }}
            />
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="h-72 animate-pulse rounded-lg border border-separator bg-bg-secondary"
          />
        ))}
      </ul>
    </div>
  );
}
