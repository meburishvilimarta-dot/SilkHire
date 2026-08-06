import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Next 16 names this file `proxy.ts`; it is the same request-time hook that
 * used to live in `middleware.ts`. next-intl uses it to negotiate the locale
 * and to redirect `/` to the prefixed default, `/ka`.
 */
const handleI18nRouting = createMiddleware(routing);

/**
 * Paths that must never be locale-prefixed. `opengraph-image` is the one that
 * bites: it has no file extension, so an extension-based exclusion misses it
 * and the route gets redirected to `/ka/opengraph-image`, which is a 404.
 *
 * This runs inside the handler rather than relying only on `config.matcher`,
 * so the rule holds regardless of how the matcher regex is interpreted.
 */
const EXCLUDED = /^\/(api|_next|_vercel|opengraph-image|robots\.txt|sitemap\.xml|favicon\.ico)(\/|$)/;

export default function proxy(request: NextRequest) {
  if (EXCLUDED.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return handleI18nRouting(request);
}

export const config = {
  // Skip Next internals and anything that looks like a static file.
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
