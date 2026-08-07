import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { serviceCategories } from '@/data/taxonomies';
import { agencies } from '@/data/agencies';

/** One line drawing per category. Decorative — the heading names the thing. */
const icons: Record<string, React.ReactNode> = {
  'customer-support': (
    <path d="M4 17v-4a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2M4 17a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2v2Zm16 0a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2v2Z" />
  ),
  'software-development': <path d="m9 8-5 4 5 4m6-8 5 4-5 4M13 5l-2 14" />,
  'accounting-back-office': (
    <path d="M6 3h12v18H6zM9 7h6M9 11h2m3 0h1M9 15h2m3 0h1M9 18h6" />
  ),
  'digital-marketing': (
    <path d="M4 10v4h3l6 4V6l-6 4H4Zm13-1a4 4 0 0 1 0 6m2.5-8.5a7 7 0 0 1 0 11" />
  ),
};

export function ServiceCards() {
  const t = useTranslations('home.services');
  const tCategories = useTranslations('taxonomies.categories');
  const tDescriptions = useTranslations('taxonomies.categoryDescriptions');

  return (
    <Section labelledBy="services-title">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        id="services-title"
      />

      <ul className="mt-16 grid gap-6 sm:grid-cols-2">
        {serviceCategories.map((category, index) => {
          const count = agencies.filter((agency) =>
            agency.categories.includes(category),
          ).length;

          return (
            <Reveal as="li" key={category} delay={index * 90}>
              <Card as="div" interactive className="h-full">
                <Link
                  href={{ pathname: '/agencies', query: { category } }}
                  className="flex h-full flex-col p-8 lg:p-10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-void-ink">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {icons[category]}
                    </svg>
                  </span>

                  <h3 className="text-display mt-7 text-2xl">{tCategories(category)}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {tDescriptions(category)}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-medium text-brand">
                    {t('cta')}
                    <span className="text-ink-subtle tabular-nums">({count})</span>
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
                  </span>
                </Link>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
