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
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {options.map((option) => {
            const isExternal = option.href.startsWith('mailto:');
            const label = t(`options.${option.key}.cta`);

            return (
              <li
                key={option.key}
                className="flex flex-col rounded-lg bg-surface p-7 ring-1 ring-line ring-inset"
              >
                <h3 className="text-base font-semibold tracking-tight">
                  {t(`options.${option.key}.title`)}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {t(`options.${option.key}.body`)}
                </p>
                {isExternal ? (
                  <a
                    href={option.href}
                    className="mt-5 text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={option.href}
                    className="mt-5 text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="surface" id="brief" labelledBy="brief-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              title={t('formTitle')}
              subtitle={t('formSubtitle')}
              id="brief-title"
            />
            <div className="mt-10">
              <ClientBriefForm />
            </div>
          </div>

          <aside>
            <div className="rounded-lg bg-surface-sunken p-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold">{t('details.title')}</h2>
              <dl className="mt-4 space-y-4 text-sm">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs text-ink-subtle">{detail.label}</dt>
                    <dd className="mt-0.5 font-medium">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="underline underline-offset-4 hover:text-brand"
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
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-subtle">
                {t('details.response')}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
