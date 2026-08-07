'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { ButtonLink, ButtonArrow } from '@/components/ui/Button';
import { Wordmark } from './Wordmark';

const navItems = [
  { key: 'agencies', href: '/agencies' },
  { key: 'howItWorks', href: '/how-it-works' },
  { key: 'forAgencies', href: '/for-agencies' },
  { key: 'about', href: '/about' },
] as const;

/**
 * The header is dark on every page. It frames the site consistently, flows
 * straight into the dark hero on the home page, and gives the light pages a
 * firm top edge instead of floating.
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
      setScrolled(window.scrollY > 12);
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
    // Lock the page behind the mobile panel so it does not scroll underneath.
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

  return (
    <header
      className={`on-dark sticky top-0 z-50 bg-void text-void-ink transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_1px_0_var(--color-void-line),0_12px_32px_-24px_rgba(0,0,0,0.9)]' : ''
      }`}
    >
      <div className="container-page">
        <div
          // Fixed 4rem on mobile: the overlay below is offset by exactly that,
          // and a height that changed on scroll would leave a gap or a clip.
          className={`flex h-16 items-center justify-between gap-6 transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? 'lg:h-16' : 'lg:h-[5.25rem]'
          }`}
        >
          <Link
            href="/"
            className="shrink-0 rounded-sm transition-opacity duration-200 hover:opacity-85"
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
                      className={`group relative block px-3.5 py-2 text-[0.875rem] transition-colors duration-200 ${
                        current ? 'text-void-ink' : 'text-void-muted hover:text-void-ink'
                      }`}
                    >
                      {t(item.key)}
                      {/* Underline grows from the centre on hover, and stays
                          put on the current page. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 bottom-1 h-px origin-center bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Wrapped rather than given `hidden sm:inline-flex` directly:
                both components set `inline-flex` in their own base classes, and
                which of the two display utilities wins depends on stylesheet
                order, not on the order they appear in the attribute. */}
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>
            <div className="hidden sm:block">
              <ButtonLink href="/contact" variant="inverse">
                {tCommon('findTeam')}
                <ButtonArrow />
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-void-ink/15 ring-inset transition-colors hover:bg-void-ink/8 lg:hidden"
            >
              <span className="sr-only">{isOpen ? t('closeMenu') : t('openMenu')}</span>
              {/* Two bars that cross into an X — cheaper and calmer than
                  swapping icons. */}
              <span aria-hidden="true" className="relative block h-3 w-4.5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'translate-y-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel. Rendered only when open so its links stay out of the
          tab order the rest of the time. */}
      {isOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-void-line bg-void lg:hidden"
        >
          <nav aria-label={t('primary')} className="container-page py-6">
            <ul className="flex flex-col">
              {[...navItems, { key: 'contact', href: '/contact' } as const].map(
                (item, index) => (
                  <li
                    key={item.key}
                    // `both` fill means reduced-motion users, whose animation
                    // duration is clamped to ~0, still land on the end state.
                    style={{
                      animation: `rise-in 0.45s var(--ease-out-soft) ${index * 45}ms both`,
                    }}
                    className="border-b border-void-line/70"
                  >
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className={`text-display flex items-baseline gap-3 py-4 text-2xl transition-colors ${
                        isCurrent(item.href) ? 'text-void-ink' : 'text-void-muted'
                      }`}
                    >
                      <span aria-hidden="true" className="eyebrow text-accent/70">
                        0{index + 1}
                      </span>
                      {t(item.key)}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 flex flex-col gap-4">
              <ButtonLink href="/contact" variant="inverse" size="lg" className="w-full">
                {tCommon('findTeam')}
                <ButtonArrow />
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
