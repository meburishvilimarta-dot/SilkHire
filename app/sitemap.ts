import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';
import { locales } from '@/i18n/routing';
import { getAgencySlugs } from '@/data/agencies';

/** Locale-less paths. Every one is emitted once per locale. */
const staticPaths = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/agencies', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/for-agencies', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    ...staticPaths,
    ...getAgencySlugs().map((slug) => ({
      path: `/agencies/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return paths.flatMap((entry) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${entry.path}`),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      // Declaring the alternates here is what tells crawlers the two locale
      // URLs are the same page, matching the hreflang tags in the <head>.
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternate) => [
            alternate === 'ka' ? 'ka-GE' : alternate,
            absoluteUrl(`/${alternate}${entry.path}`),
          ]),
        ),
      },
    })),
  );
}
