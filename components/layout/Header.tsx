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
] as const;

/**
 * The navigation bar is the site's functional layer: it floats above the
 * content on a translucent material so what is scrolling underneath stays
 * partly visible, which is what keeps a sense of place.
 *
 * The material only appears once the page has scrolled — at rest the bar sits
 * flush on the page with no seam. `material-bar` handles the fallbacks for
 * reduced transparency, increased contrast and browsers without
 * `backdrop-filter`.
 */
export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  // Close the panel on navigation — the route changes underneath it otherwise.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    // Lock the page behind the panel so it does not scroll underneath.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function isCurrent(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const showMaterial = isScrolled || isOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-[--duration-medium] ease-[--ease-standard] ${
        showMaterial ? 'material-bar hairline-bottom' : 'bg-bg'
      }`}
    >
      <div className="container-page">
        {/* Fixed 56px on mobile: the overlay below is offset by exactly that. */}
        <div className="flex h-14 items-center justify-between gap-6 lg:h-16">
          <Link
            href="/"
            className="-mx-2 flex h-11 shrink-0 items-center rounded-full px-2 transition-opacity duration-[--duration-fast] hover:opacity-70"
          >
            <Wordmark />
          </Link>

          <nav aria-label={t('primary')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const current = isCurrent(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                      className={`text-subheadline flex h-11 items-center rounded-full px-3.5 transition-colors duration-[--duration-fast] ${
                        current
                          ? 'font-medium text-label'
                          : 'text-label-secondary hover:text-label'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wrapped rather than given `hidden sm:inline-flex` directly: both
                components set a display in their own base classes, and which
                utility wins depends on stylesheet order, not attribute order. */}
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>
            <div className="hidden sm:block">
              <ButtonLink href="/contact">{tCommon('findTeam')}</ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-label transition-colors duration-[--duration-fast] hover:bg-fill lg:hidden"
            >
              <span className="sr-only">{isOpen ? t('closeMenu') : t('openMenu')}</span>
              {/* Two bars that cross into an X. */}
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-[--duration-medium] ease-[--ease-emphasized] ${
                    isOpen ? 'translate-y-1 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition-transform duration-[--duration-medium] ease-[--ease-emphasized] ${
                    isOpen ? '-translate-y-1 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Rendered only when open, so its links stay out of the tab order the
          rest of the time. Opaque rather than material: it covers the page
          entirely, so there is nothing behind it worth showing through. */}
      {isOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-bg lg:hidden"
        >
          <nav aria-label={t('primary')} className="container-page py-4">
            <ul className="flex flex-col">
              {[...navItems, { key: 'contact', href: '/contact' } as const].map(
                (item, index) => (
                  <li
                    key={item.key}
                    // `both` fill keeps the end state for reduced-motion users,
                    // whose animation duration is clamped to near zero.
                    style={{
                      animation: `rise-in var(--duration-medium) var(--ease-emphasized) ${index * 35}ms both`,
                    }}
                    className="border-b border-separator"
                  >
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className={`text-title-3 flex min-h-14 items-center transition-colors ${
                        isCurrent(item.href) ? 'text-label' : 'text-label-secondary'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 flex flex-col items-start gap-5">
              <ButtonLink href="/contact" size="lg" className="w-full">
                {tCommon('findTeam')}
              </ButtonLink>
              <div className="sm:hidden">
                <LocaleSwitcher />
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
