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

/**
 * Quiet by design. The footer is the least important thing on the page, so it
 * sits one background step down and uses the smallest text styles rather than
 * a colour reversal to separate itself.
 */
export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  // `applyToList` is footer-only copy; everything else reuses the nav labels.
  const labelFor = (key: string) => (key === 'applyToList' ? t(key) : tNav(key));

  return (
    <footer className="hairline-top mt-auto bg-bg-secondary">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8">
          <div className="max-w-xs">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2.5 rounded-full text-label"
            >
              <RouteMark className="h-6 w-6 text-accent" />
              <span className="text-headline tracking-[-0.02em]">{siteConfig.name}</span>
            </Link>
            <p className="text-subheadline mt-3 text-label-secondary">{t('tagline')}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-subheadline mt-5 inline-flex min-h-11 items-center text-accent transition-opacity duration-[--duration-fast] hover:opacity-70"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
              <h2
                id={`footer-${column.heading}`}
                className="text-caption text-label-tertiary"
              >
                {t(column.heading)}
              </h2>
              <ul className="mt-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.key}`}>
                    <Link
                      href={link.href}
                      className="text-subheadline flex min-h-11 items-center text-label-secondary transition-colors duration-[--duration-fast] hover:text-label"
                    >
                      {labelFor(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="text-footnote mt-14 flex flex-col gap-2 border-t border-separator pt-7 text-label-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <p>{t('registered')}</p>
        </div>
      </div>
    </footer>
  );
}
