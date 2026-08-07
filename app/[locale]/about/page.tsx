import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { toParagraphs } from '@/lib/format';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/ui/CtaBanner';

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
  const paragraphs = toParagraphs(t('story.body'));

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title={t('story.title')} id="story-title" />
          </div>

          <div className="max-w-2xl">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 80}>
                <p
                  className={
                    // The opening paragraph is set larger — it is the argument;
                    // the rest is the evidence.
                    index === 0
                      ? 'text-display mb-8 text-[1.625rem] leading-[1.45] text-ink sm:text-[1.875rem]'
                      : 'mb-6 text-[1.0625rem] leading-[1.85] text-ink-muted'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="principles-title">
        <SectionHeading title={t('principles.title')} id="principles-title" />

        <dl className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle} delay={index * 80}>
              <div className="border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="eyebrow block text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <dt className="text-display mt-4 text-[1.5rem]">
                  {t(`principles.items.${principle}.title`)}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {t(`principles.items.${principle}.body`)}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CtaBanner
        id="about-cta-title"
        title={t('cta.title')}
        body={t('cta.body')}
        buttonLabel={t('cta.button')}
        href="/contact"
      />
    </>
  );
}
