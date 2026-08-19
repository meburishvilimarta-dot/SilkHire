# SilkHire

Bilingual (Georgian / English) marketing site for SilkHire — a directory that
connects businesses and individuals in Georgia with vetted outsourcing
agencies and freelancers in India and the Philippines.

Next.js App Router · TypeScript · Tailwind CSS v4 · next-intl · react-hook-form
+ zod. No database, no auth, no payments — every piece of content is a typed
file under `data/` and every string is a message under `messages/`.

## Running it

```bash
npm install
cp .env.example .env.local   # optional locally; required in production
npm run dev                  # http://localhost:3000 → redirects to /ka
```

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server                            |
| `npm run build`     | Production build (prerenders all 30+ locale routes) |
| `npm start`         | Serve the production build            |
| `npm run typecheck` | `tsc --noEmit`                        |

`NEXT_PUBLIC_SITE_URL` must be set to the real absolute origin in production.
Canonical URLs, hreflang alternates, `sitemap.xml` and the Open Graph image URL
all derive from it; leaving the default in place will publish wrong URLs.

## Routes

```
/                        → redirects to /ka
/{locale}                Home
/{locale}/agencies       Directory (client-side filtering, filters in the URL)
/{locale}/agencies/[slug] Agency profile — one static page per agency per locale
/{locale}/for-agencies   Pitch page + agency application form
/{locale}/how-it-works   Process and FAQ
/{locale}/about          Positioning and business model
/{locale}/contact        Contact details + client brief form
/api/client-brief        POST — client brief intake
/api/agency-application  POST — agency application intake
/sitemap.xml  /robots.txt  /opengraph-image
```

`locale` is `ka` (default) or `en`. Both are always prefixed, so every page has
exactly one URL per language and hreflang stays unambiguous.

## Project layout

```
app/
  [locale]/            All pages. This is also the root layout (html/body).
  api/                 Route handlers for the two forms.
  opengraph-image.tsx  Social card, rendered with next/og.
  sitemap.ts robots.ts globals.css
components/
  layout/  home/  agencies/  forms/  ui/
data/
  agencies.ts          The directory. 12 seeded placeholder entries.
  taxonomies.ts        Filter vocabularies — ids only, no labels.
  cost-comparison.ts   Placeholder monthly rates for the home page table.
  site.ts              Site URL, contact details.
i18n/                  next-intl routing, navigation and request config.
lib/
  filters.ts           Pure filter function + URL (de)serialisation.
  metadata.ts          buildMetadata() → canonical, hreflang, OG, Twitter.
  format.ts            Locale-aware currency, numbers, dates.
  schemas/             zod schemas, shared by the forms and the API routes.
messages/              ka.json and en.json. All copy lives here.
types/agency.ts        The Agency model.
proxy.ts               Locale negotiation (Next 16's name for middleware).
```

### Two rules worth keeping

1. **No copy in components.** Every user-visible string is a key in
   `messages/ka.json` and `messages/en.json`. If you find yourself typing a
   sentence inside a `.tsx` file, it belongs in the message files.
2. **Taxonomies are ids; labels are messages.** `data/taxonomies.ts` holds
   `'customer-support'`, never `"Customer support"`. Labels are looked up
   under `taxonomies.*` so a category renders correctly in both languages.

## Adding an agency to the directory

Everything lives in `data/agencies.ts`. Append an object to the `agencies`
array — TypeScript enforces the shape, and a missing `ka` or `en` string is a
compile error rather than a blank space on the page.

1. **Pick a slug.** Lowercase, hyphenated, derived from the name
   (`northgate-technologies`). This becomes the permanent URL. Once a profile
   is published, never re-slug it — you would break every inbound link.

2. **Write both languages.** `tagline`, `summary`, `description`,
   `specialties[]` and every `caseStudies[]` string are `{ ka, en }` pairs.
   Keep `summary` to one or two sentences (it is the directory card) and
   `description` to two to four paragraphs separated by blank lines — the
   detail page splits on `\n\n`.

3. **Keep the derived fields honest.**
   - `teamSizeBand` must agree with `teamSize`. Use `teamSizeToBand()` from
     `types/agency.ts` rather than eyeballing it — the filter matches on the
     band, so a mismatch makes the agency unfindable.
   - `hourlyRate.minUsd` ≤ `hourlyRate.maxUsd`.
   - `overlapHoursWithTbilisi` is working hours shared with a Tbilisi business
     day. India is typically 8, the Philippines typically 5.

4. **Record the vetting accurately.** `vetting.checks` lists only the checks
   actually completed; the profile renders the remaining ones as outstanding.
   Set `vetting.status` to `'pending'` until all five have passed. This is the
   whole promise of the directory — do not pre-fill it.

5. **Rebuild.** `generateStaticParams` picks the new slug up automatically and
   prerenders `/ka/agencies/<slug>` and `/en/agencies/<slug>`. The sitemap and
   the home-page counts update from the same array; nothing else to touch.

Adding a **new service category** is a wider change: add the id to
`ServiceCategory` in `types/agency.ts`, to `serviceCategories` in
`data/taxonomies.ts`, to the allow-list in `searchParamsToFilterState()` in
`lib/filters.ts`, and add `taxonomies.categories.*` plus
`taxonomies.categoryDescriptions.*` entries to both message files. The home
page renders one card per category, so a fifth breaks the 2×2 grid — adjust
`components/home/ServiceCards.tsx` if you add one.

### Cost comparison figures

`data/cost-comparison.ts` holds **placeholder numbers** — fully-loaded monthly
cost per role for Georgia, India and the Philippines. Replace them before
launch. Savings percentages and bar widths are computed, so you only edit the
raw figures. Role labels live under `home.costComparison.roles.*` in the
message files.

## Where to plug in the form backend

Both forms POST JSON to a route handler that validates against the same zod
schema the browser used, then **logs and returns `{ ok: true }`**. Nothing is
stored or sent anywhere yet.

| Form                | Component                                | Route handler                     |
| ------------------- | ---------------------------------------- | --------------------------------- |
| Client brief        | `components/forms/ClientBriefForm.tsx`   | `app/api/client-brief/route.ts`   |
| Agency application  | `components/forms/AgencyApplicationForm.tsx` | `app/api/agency-application/route.ts` |

Each handler carries a clearly marked `TODO: PLUG IN THE FORM BACKEND HERE`
block, placed after validation and after the honeypot check, which is exactly
where the submission should leave the application. Common choices:

- **Email** — Resend, Postmark or SendGrid, keyed from `process.env`.
- **CRM** — HubSpot, Pipedrive, Attio, or a generic `CRM_WEBHOOK_URL`.
- **Spreadsheet or Slack** — a Sheets append or an incoming webhook is a
  perfectly reasonable first version.

Three things to get right when you wire it up:

- `await` the call and return a **502** if it fails. The forms show their error
  state on any non-2xx response; returning 200 on a failed send would tell the
  user their brief arrived when it did not.
- **Stop logging the payload.** Both handlers currently `console.info` a subset
  of fields, which is fine for a stub and wrong once real submissions arrive —
  these contain names, emails and phone numbers.
- Point the two routes at **different destinations**. Client briefs belong in
  the sales pipeline; agency applications belong in the vetting queue.

Adding or renaming a field means editing the zod schema in `lib/schemas/`, the
form component, and the `forms.*.fields.*` keys in both message files. The
schema is the single source of truth for validation on both sides.

### How validation messages work

zod messages in `lib/schemas/` are **translation keys** (`'required'`,
`'invalidEmail'`), not sentences — the schemas run on the server too, where no
translator exists. The form components resolve each key against
`forms.errors.*` and fall back to `forms.errors.generic` for anything
unrecognised, so a missing key never leaks into the UI.

Both forms carry a hidden honeypot field (`website` / `fax`). A filled honeypot
returns `{ ok: true }` and discards the submission, so a bot learns nothing.

## Design system

Built on the principles in Apple's Human Interface Guidelines — semantic colour
with light/dark/increased-contrast values, named text styles, materials confined
to the functional layer, capsule controls at a 44px minimum, and brief motion.
Tokens and utilities live in `app/globals.css`; primitives in `components/ui/`.

**Read `docs/DESIGN-SYSTEM.md` before changing any visual code.** It carries the
measured contrast ratios, the type scale, the material fallbacks, and a list of
gotchas that cost real time (`@theme` cannot nest inside `@media`; implicit grid
tracks cannot shrink; `backdrop-filter` must be written unprefixed).

Three rules that matter most day to day:

1. **Never hard-code a colour or a size.** Use a semantic token
   (`text-label-secondary`, `bg-bg-secondary`, `border-separator`) and a named
   text style (`text-title-2`, `text-callout`). If you are reaching for
   `text-[0.9375rem]`, the scale is missing a step — add it there, not inline.
2. **Every colour must work in both appearances.** The site follows the system
   setting and has no in-page theme switch. Check dark before you ship.
3. **44px minimum on anything pointable.** The only exceptions are inline links
   inside a sentence and the off-screen honeypot.

## i18n

- `i18n/routing.ts` — locales, default, prefix strategy.
- `i18n/navigation.ts` — **always import `Link` from here**, not from
  `next/link`, or hrefs lose their locale prefix.
- `messages/{locale}.json` — both files must have identical key structure.
- Georgian renders in **SF Georgian** on Apple devices via the system font
  stack, and in **Noto Sans Georgian** (loaded via `next/font/google`)
  everywhere else. See `docs/DESIGN-SYSTEM.md` for why SF is not self-hosted.

Georgian runs roughly two to three times longer than the equivalent English.
When you add a component, check the Georgian rendering at 390px before calling
it done — several layouts here use two columns rather than four for exactly
this reason.

## SEO

`lib/metadata.ts` builds per-page metadata: canonical, hreflang alternates for
`ka-GE`, `en` and `x-default` (pointing at Georgian), plus Open Graph and
Twitter cards. Pass `absoluteTitle: true` when the title already contains the
brand name, otherwise the layout template appends it.

`app/opengraph-image.tsx` renders one shared 1200×630 card carrying both
languages. It fetches the Georgian font at build time and degrades to a
Latin-only card if that fetch fails, so a network blip cannot break the build.

`proxy.ts` excludes `/opengraph-image`, `/robots.txt` and `/sitemap.xml` from
locale routing. Without that, `/opengraph-image` — which has no file extension
— gets redirected to `/ka/opengraph-image` and 404s.

## Accessibility

Semantic landmarks throughout, a skip link, one visible focus ring defined once
in `globals.css` (never removed), `aria-current` on the active nav item, live
regions announcing the filtered result count and form outcomes, labelled form
controls with `aria-describedby` wiring for hints and errors, and alt text or
`aria-hidden` on every image and icon. Decorative SVGs are hidden; meaningful
ones are labelled.
