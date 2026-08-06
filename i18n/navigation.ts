import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware replacements for next/link and the navigation hooks. Always
 * import `Link` from here rather than `next/link` so hrefs stay prefix-correct.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
