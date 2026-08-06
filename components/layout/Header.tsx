'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ButtonLink } from '@/components/ui/Button';
import { Wordmark } from './Wordmark';

const navItems = [
  { key: 'agencies', href: '/agencies' },
  { key: 'howItWorks', href: '/how-it-works' },
  { key: 'forAgencies', href: '/for-agencies' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the panel on navigation — the route changes underneath it otherwise.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="shrink-0 rounded-sm text-ink transition-opacity hover:opacity-80"
          >
            <Wordmark />
          </Link>

          <nav aria-label={t('primary')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      isCurrent(item.href)
                        ? 'font-medium text-ink'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher />
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              {tCommon('findTeam')}
            </ButtonLink>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink ring-1 ring-line ring-inset lg:hidden"
            >
              <span className="sr-only">{isOpen ? t('closeMenu') : t('openMenu')}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-5 w-5"
              >
                {isOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <nav
          id="mobile-menu"
          aria-label={t('primary')}
          className="border-t border-line bg-surface lg:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={`block border-b border-line/70 py-3.5 text-base ${
                    isCurrent(item.href) ? 'font-medium text-ink' : 'text-ink-muted'
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <ButtonLink href="/contact" size="lg" className="w-full">
                {tCommon('findTeam')}
              </ButtonLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
