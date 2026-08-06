import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/data/site';
import { Wordmark } from './Wordmark';

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
    <footer className="border-t border-line bg-surface-sunken">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t('tagline')}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-labelledby={`footer-${column.heading}`}>
              <h2
                id={`footer-${column.heading}`}
                className="text-xs font-semibold tracking-[0.12em] text-ink uppercase"
              >
                {t(column.heading)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.key}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {labelFor(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <p>
            {t('registered')}{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-ink-muted underline underline-offset-2 hover:text-ink"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
