import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CostComparison } from '@/components/home/CostComparison';
import { ServiceCards } from '@/components/home/ServiceCards';
import { TrustSection } from '@/components/home/TrustSection';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '',
    // The home title already reads "SilkHire — …".
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HowItWorks />
      <CostComparison />
      <ServiceCards />
      <TrustSection />
    </>
  );
}
