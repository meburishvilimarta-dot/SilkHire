import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { siteConfig } from '@/data/site';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { ClientBriefForm } from '@/components/forms/ClientBriefForm';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/contact',
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations('contact');

  const details = [
    {
      label: t('details.email'),
      value: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
    },
    {
      label: t('details.phone'),
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    },
    {
      label: t('details.address'),
      value: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`,
    },
    { label: t('details.hours'), value: t('details.hoursValue') },
  ];

  const options = [
    { key: 'client', href: '#brief' as const },
    { key: 'agency', href: '/for-agencies#apply' as const },
    { key: 'other', href: `mailto:${siteConfig.contactEmail}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section labelledBy="options-title">
        <SectionHeading title={t('options.title')} id="options-title" />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {options.map((option, index) => {
            const isExternal = option.href.startsWith('mailto:');
            const label = t(`options.${option.key}.cta`);

            return (
              <Reveal as="li" key={option.key} delay={index * 80}>
                <Card interactive className="flex h-full flex-col p-7 sm:p-8">
                  <h3 className="text-title-3">{t(`options.${option.key}.title`)}</h3>
                  <p className="text-callout mt-3 flex-1 text-label-secondary">
                    {t(`options.${option.key}.body`)}
                  </p>
                  {isExternal ? (
                    <a
                      href={option.href}
                      className="text-subheadline mt-7 inline-flex min-h-11 items-center gap-2 border-t border-separator pt-5 font-medium text-accent"
                    >
                      {label}
                      <Chevron />
                    </a>
                  ) : (
                    <Link
                      href={option.href}
                      className="text-subheadline mt-7 inline-flex min-h-11 items-center gap-2 border-t border-separator pt-5 font-medium text-accent"
                    >
                      {label}
                      <Chevron />
                    </Link>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="secondary" id="brief" labelledBy="brief-title" className="scroll-mt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              title={t('formTitle')}
              subtitle={t('formSubtitle')}
              id="brief-title"
            />
            <Reveal delay={120} className="mt-12">
              <ClientBriefForm />
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border border-separator bg-bg p-6">
              <h2 className="text-caption text-label-tertiary">{t('details.title')}</h2>
              <dl className="text-subheadline mt-4 space-y-4">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-footnote text-label-tertiary">{detail.label}</dt>
                    <dd className="mt-0.5 font-medium">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="inline-flex min-h-11 items-center text-accent transition-opacity duration-[--duration-fast] hover:opacity-70"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-footnote mt-6 border-t border-separator pt-5 text-label-tertiary">
                {t('details.response')}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:translate-x-0.5"
    >
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  );
}
