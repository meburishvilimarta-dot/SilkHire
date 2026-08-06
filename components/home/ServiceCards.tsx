import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Link } from '@/i18n/navigation';
import { serviceCategories } from '@/data/taxonomies';
import { agencies } from '@/data/agencies';

/** One simple line drawing per category — decorative, hidden from AT. */
const icons: Record<string, React.ReactNode> = {
  'customer-support': (
    <path d="M4 17v-4a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2M4 17a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2v2Zm16 0a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2v2Z" />
  ),
  'software-development': <path d="m9 8-5 4 5 4m6-8 5 4-5 4M13 5l-2 14" />,
  'accounting-back-office': (
    <path d="M6 3h12v18H6zM9 7h6M9 11h2m3 0h1M9 15h2m3 0h1M9 18h6" />
  ),
  'digital-marketing': <path d="M4 10v4h3l6 4V6l-6 4H4Zm13-1a4 4 0 0 1 0 6m2.5-8.5a7 7 0 0 1 0 11" />,
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

      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {serviceCategories.map((category) => {
          const count = agencies.filter((agency) =>
            agency.categories.includes(category),
          ).length;

          return (
            <li key={category}>
              <Link
                href={{ pathname: '/agencies', query: { category } }}
                className="group flex h-full flex-col rounded-lg bg-surface p-7 ring-1 ring-line transition-shadow ring-inset hover:shadow-sm lg:p-8"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-brand"
                >
                  {icons[category]}
                </svg>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {tCategories(category)}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {tDescriptions(category)}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  {t('cta')}
                  <span className="tabular-nums text-ink-subtle">({count})</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M3 8h10m-4-4 4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
