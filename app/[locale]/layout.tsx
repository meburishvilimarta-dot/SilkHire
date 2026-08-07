import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from 'next/font/google';

import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

/**
 * An editorial serif for display, its matching sans for everything else.
 *
 * The pairing is deliberately from the same superfamily: both cut Mkhedruli
 * properly *and* ship a matching Latin, so a Georgian page and an English one
 * share the same metrics. A fashionable Latin-only pairing would fall back to
 * a system font on every Georgian heading — which is most of the site.
 */
const serifGeorgian = Noto_Serif_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-serif-georgian',
});

const sansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans-georgian',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a100e',
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
    <html lang={locale} className={`${serifGeorgian.variable} ${sansGeorgian.variable}`}>
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
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-void"
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
