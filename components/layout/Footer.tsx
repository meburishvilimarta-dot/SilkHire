import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/data/site';
import { RouteMark } from './Wordmark';

const columns = [
  {
    heading: 'forClients',
    links: [
      { key: 'agencies', href: '/agencies' },
      { key: 'howItWorks', href: '/how-it-works' },
      { key: 'contact', href: '/contact' },
    ],
  },
  {
    heading: 'forAgencies',
    links: [
      { key: 'forAgencies', href: '/for-agencies' },
      { key: 'applyToList', href: '/for-agencies#apply' },
    ],
  },
  {
    heading: 'company',
    links: [
      { key: 'about', href: '/about' },
      { key: 'contact', href: '/contact' },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  // `applyToList` is footer-only copy; everything else reuses the nav labels.
  const labelFor = (key: string) => (key === 'applyToList' ? t(key) : tNav(key));

  return (
    <footer className="on-dark grain relative overflow-hidden bg-void text-void-ink">
      {/* The route, one last time: an arc leaving the page. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full text-void-line"
      >
        <path
          d="M-50 170C250 170 250 30 600 30s350 140 650 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative container-page pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-10">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 rounded-sm">
              <RouteMark className="h-9 w-9 text-accent" />
              <span className="text-display text-2xl font-semibold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-void-muted">
              {t('tagline')}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="group mt-6 inline-flex items-center gap-2 text-sm text-void-ink"
            >
              <span className="border-b border-void-ink/25 pb-0.5 transition-colors group-hover:border-accent">
                {siteConfig.contactEmail}
              </span>
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
              <h2 id={`footer-${column.heading}`} className="eyebrow text-void-muted">
                {t(column.heading)}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.key}`}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] text-void-ink/75 transition-colors hover:text-void-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-0 bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3"
                      />
                      {labelFor(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-void-line pt-7 text-xs text-void-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <p>{t('registered')}</p>
        </div>
      </div>
    </footer>
  );
}
