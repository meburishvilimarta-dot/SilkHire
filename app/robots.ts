import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Route handlers hold no crawlable content and accept POST only.
        disallow: '/api/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
