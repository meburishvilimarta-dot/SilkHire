import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/data/site';
import { isLocale, locales, type Locale } from '@/i18n/routing';

/** Maps our locale ids onto the hreflang values search engines expect. */
const hreflang: Record<Locale, string> = {
  ka: 'ka-GE',
  en: 'en',
};

interface BuildMetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  /** Locale-less path, e.g. `/agencies` or `''` for the home page. */
  path?: string;
  /**
   * Set when `title` already carries the brand name, so the layout's
   * `%s — SilkHire` template does not append it a second time.
   */
  absoluteTitle?: boolean;
}

/**
 * Produces canonical + hreflang alternates for a page in both locales, plus
 * Open Graph and Twitter cards. `x-default` points at the Georgian version,
 * since that is the default locale and the primary audience.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  // A request like `/favicon.ico` matches the `[locale]` segment, so this can
  // be called with something that is not a locale at all. Bail out quietly and
  // let the layout's `notFound()` turn it into a 404 rather than a 500.
  if (!isLocale(locale)) return {};

  const normalised = path && !path.startsWith('/') ? `/${path}` : path;

  const languages = Object.fromEntries([
    ...locales.map((l) => [hreflang[l], `/${l}${normalised}`]),
    ['x-default', `/ka${normalised}`],
  ]);

  // Social cards have no template applied to them, so they always need the
  // brand name spelled out.
  const socialTitle = absoluteTitle ? title : `${title} — ${siteConfig.name}`;

  return {
    // Repeated per page rather than relying on the layout alone, so relative
    // canonical and alternate URLs always resolve against the real origin.
    metadataBase: new URL(siteConfig.url),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `/${locale}${normalised}`,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url: absoluteUrl(`/${locale}${normalised}`),
      locale: hreflang[locale].replace('-', '_'),
      images: [
        {
          url: absoluteUrl('/opengraph-image'),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [absoluteUrl('/opengraph-image')],
    },
  };
}
