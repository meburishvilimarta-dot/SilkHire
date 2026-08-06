/**
 * Single source of truth for site-level constants. `NEXT_PUBLIC_SITE_URL`
 * must be an absolute origin in production — canonical URLs, hreflang tags,
 * the sitemap and the OG image all derive from it.
 */
export const siteConfig = {
  name: 'SilkHire',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://silkhire.ge').replace(/\/$/, ''),
  contactEmail: 'hello@silkhire.ge',
  phone: '+995 32 000 0000',
  address: {
    street: 'Rustaveli Ave 1',
    city: 'Tbilisi',
    country: 'Georgia',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/silkhire',
    facebook: 'https://www.facebook.com/silkhire',
  },
} as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
