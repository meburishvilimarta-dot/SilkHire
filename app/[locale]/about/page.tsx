import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { toParagraphs } from '@/lib/format';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

type PageProps = { params: Promise<{ locale: Locale }> };

const principles = ['paid', 'ranking', 'rejection', 'direct'] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });

  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/about',
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section labelledBy="story-title">
        <div className="max-w-3xl">
          <SectionHeading title={t('story.title')} id="story-title" />
          <div className="mt-6 space-y-5">
            {toParagraphs(t('story.body')).map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="principles-title">
        <SectionHeading title={t('principles.title')} id="principles-title" />
        <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle} className="border-t border-line pt-5">
              <dt className="text-base font-semibold tracking-tight">
                {t(`principles.items.${principle}.title`)}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(`principles.items.${principle}.body`)}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="about-cta-title">
        <div className="max-w-2xl">
          <h2
            id="about-cta-title"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {t('cta.title')}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">{t('cta.body')}</p>
          <ButtonLink href="/contact" size="lg" className="mt-7">
            {t('cta.button')}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
