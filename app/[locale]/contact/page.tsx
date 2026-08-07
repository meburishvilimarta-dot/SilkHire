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
                <Card interactive className="flex h-full flex-col p-8">
                  <h3 className="text-display text-[1.375rem]">
                    {t(`options.${option.key}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {t(`options.${option.key}.body`)}
                  </p>
                  {isExternal ? (
                    <a
                      href={option.href}
                      className="mt-7 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-medium text-brand"
                    >
                      {label}
                      <Chevron />
                    </a>
                  ) : (
                    <Link
                      href={option.href}
                      className="mt-7 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-medium text-brand"
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

      <Section tone="surface" id="brief" labelledBy="brief-title" className="scroll-mt-24">
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
            <div className="rounded-lg bg-sunken p-7">
              <h2 className="eyebrow text-ink-subtle">{t('details.title')}</h2>
              <dl className="mt-5 space-y-5 text-sm">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs text-ink-subtle">{detail.label}</dt>
                    <dd className="mt-1 font-medium">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="border-b border-ink/20 pb-0.5 transition-colors hover:border-brand hover:text-brand"
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
              <p className="mt-7 border-t border-line-strong/60 pt-5 text-xs leading-relaxed text-ink-subtle">
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
    >
      <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" />
    </svg>
  );
}
