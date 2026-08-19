import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Noto_Sans_Georgian } from 'next/font/google';

import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

/**
 * One family across the whole hierarchy.
 *
 * The font stack in `globals.css` puts the system UI font first, so Apple
 * devices render San Francisco — including SF Georgian, which covers Mkhedruli
 * and Mtavruli — with no download at all. This webfont is the layer behind it,
 * for the Windows and Android majority of this site's audience, where no
 * system font covers Georgian well.
 *
 * SF itself is deliberately not shipped: Apple licenses it for interfaces on
 * Apple platforms, not for redistribution from our own origin.
 */
const notoGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-georgian',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  // Two entries so the browser chrome matches the appearance the visitor is
  // actually in, rather than pinning one colour against the other palette.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      // Page-level titles slot in here, so no page repeats the brand name.
      template: `%s — ${siteConfig.name}`,
    },
    description: t('description'),
    applicationName: siteConfig.name,
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);

  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} className={notoGeorgian.variable}>
      <head>
        {/*
          Marks the document as scripted before first paint. Scroll-reveal
          hides elements only under `.js`, so with JavaScript off every
          section renders visible instead of blank.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-accent"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
