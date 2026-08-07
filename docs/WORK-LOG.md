# SilkHire — work log

What was built, what was decided and why, what was verified, and what is
deliberately still outstanding. Written as a handover: if you pick this up cold,
this file plus `README.md` should be enough.

- **Repo:** `meburishvilimarta-dot/SilkHire`
- **Branch:** `claude/silkhire-marketing-site-61j8bb` → PR
  [#1](https://github.com/meburishvilimarta-dot/SilkHire/pull/1) into `main`
- **Stack:** Next.js 16.3 (App Router) · React 19.2 · TypeScript 5.9 ·
  Tailwind CSS 4.3 · next-intl 4.13 · react-hook-form 7.84 · zod 4.4
- **Built on:** Node 22.22

Three commits, in order:

| Commit | What it is |
| --- | --- |
| `f4e9316` | Initial commit — `.gitignore` + a stub README, so the feature branch has a base to diff against |
| `1060e12` | Build the bilingual marketing site — 66 files, +9,226 |
| `78e650b` | Redesign around a single visual idea — 39 files, +2,270 / −1,031 |

---

## 1. The site as built

Everything requested in the brief, with nothing stubbed out.

### Pages

| Route | Contents |
| --- | --- |
| `/{locale}` | Hero, 3-step process, GE/IN/PH cost comparison, four service categories, vetting section |
| `/{locale}/agencies` | Directory with client-side filtering — country, service category, team size, English level, hourly rate |
| `/{locale}/agencies/[slug]` | Agency profile, one static page per agency per locale |
| `/{locale}/for-agencies` | Pitch page for Indian and Filipino agencies + application form |
| `/{locale}/how-it-works` | Six-step timeline and a seven-question FAQ |
| `/{locale}/about` | Positioning and business model |
| `/{locale}/contact` | Contact details + the client brief form |
| `/api/client-brief` · `/api/agency-application` | POST handlers — validate, drop honeypot submissions, log |
| `/sitemap.xml` · `/robots.txt` · `/opengraph-image` · `/icon.svg` | Metadata routes |

`locale` is `ka` (default) or `en`, always prefixed. `/` redirects to `/ka`.

### Data model

`types/agency.ts` defines `Agency`. The parts worth knowing:

- Every prose field is `Localized` — `{ ka, en }` — so a missing translation is
  a compile error, not a blank space on the page.
- `teamSizeBand` is derived from `teamSize` and is what the filter matches on.
  If the two drift apart the agency silently becomes unfindable, which is why
  `teamSizeToBand()` exists and why the README calls it out.
- `vetting.checks` lists only the checks actually completed; the profile page
  renders the rest as outstanding.
- Taxonomies (`data/taxonomies.ts`) hold **ids only**. Every label lives in
  `messages/{locale}.json` under `taxonomies.*`.

Seeded with **12 placeholder agencies** spread across both countries, all four
service categories and all four team-size bands, so every filter combination
has something to return.

### i18n

- `messages/ka.json` and `messages/en.json`, **377 keys each**, identical
  structure. No user-visible string exists in a `.tsx` file.
- Georgian renders in Noto Sans/Serif Georgian via `next/font/google`.
- Locale switching preserves both the path and the query string — verified with
  `/en/agencies?country=IN&rate=under-15` → `/ka/agencies?country=IN&rate=under-15`.

### Forms

Both use react-hook-form with zod schemas shared between the browser and the
route handler. Design points:

- **zod messages are translation keys, not sentences** (`'required'`,
  `'invalidEmail'`). The schemas also run server-side, where no translator
  exists; the form components resolve each key against `forms.errors.*` and
  fall back to a generic line, so a key can never leak into the UI.
- **Numeric fields validate as strings, then transform.** `z.coerce.number()`
  turns an empty field into `0`, which made a blank headcount report "at least
  one person" instead of "required". The shared helper in
  `lib/schemas/common.ts` accepts string *or* number, because the browser posts
  the *parsed* payload and the handler re-runs the same schema over it.
- Hidden honeypot fields (`website` / `fax`). A filled honeypot returns
  `{ ok: true }` and discards the submission, so a bot learns nothing.

### SEO

`lib/metadata.ts` builds per-page canonical URLs and hreflang alternates for
`ka-GE`, `en` and `x-default` (pointing at Georgian). The sitemap declares the
same alternates so crawlers see one page in two languages, not two pages.
`app/opengraph-image.tsx` renders a bilingual 1200×630 card with `next/og`.

---

## 2. The redesign

The second pass replaced the visual layer entirely while leaving content,
routes, i18n keys, filter logic, schemas and API handlers untouched.

### The concept

**One idea: a drawn route.** SilkHire connects two ends of a corridor, so a
line does the work everywhere — the logo mark, the hero graphic, the timeline
spine, the connector between the three home-page steps, the arc behind every
page masthead, the footer, and the deliberately *interrupted* route on the 404
and empty-results states.

**Frame.** Dark header and footer with warm paper between. Page mastheads are
dark too, so the home hero flows out of the header with no seam, and mid-page
dark beats (the cost table, closing CTAs) give the scroll a rhythm instead of
one flat tone.

**Colour.** Two hues and a neutral ramp, defined once in `@theme` — evergreen
for structure and action, ochre for emphasis. No third hue anywhere.

**Type.** Noto Serif Georgian for display against Noto Sans Georgian for UI.
This is the one genuinely constrained decision in the project: the two faces
are from a single superfamily on purpose, because both cut Mkhedruli **and**
ship a matching Latin. A fashionable Latin-only pairing (Instrument Serif +
Inter, say) would fall back to a system font on every Georgian heading — which
is most of the site.

### Motion

No animation library was added. `components/ui/Reveal.tsx` is a ~40-line
`IntersectionObserver` wrapper that unobserves each element once it appears.
Everything else is CSS keyframes; the hero arcs draw and travel using
`pathLength="1"`, which makes the dash arithmetic exact regardless of curve
length.

Two rules that must hold for anything added later:

1. **The hidden state lives in CSS under `.js`**, set by an inline script in
   the layout. With JavaScript off, every section renders visible rather than
   blank. Never hide content in React state that only a scroll can undo.
2. **Reduced motion resolves, it does not disable.** The media query sets
   reveals to their *end* state and clamps durations. Keyframe entrances use
   `animation: … both` so they also land on the end state rather than never
   running.

### Design system

`components/ui/` — `Button` (5 variants), `Card`, `Badge`, `Section`,
`SectionHeading`, `PageHero`, `CtaBanner`, `Reveal`. 29 component files in
total across `layout/`, `home/`, `agencies/`, `forms/` and `ui/`.

---

## 3. Bugs found and fixed

These came out of driving the built site, not from reading the diff.

| # | Bug | Fix |
| --- | --- | --- |
| 1 | `/opengraph-image` was redirected to `/ka/opengraph-image` and 404'd | It has no file extension, so the extension-based exclusion in `proxy.ts` missed it. Named explicitly, along with `robots.txt` and `sitemap.xml` |
| 2 | `/favicon.ico` returned **500** | It matched the `[locale]` segment, so `buildMetadata` was called with `"favicon.ico"` as the locale and threw. Guarded — unknown segments now 404 via the layout's `notFound()`. Added a real `app/icon.svg` |
| 3 | Directory results squeezed into a 17rem column | The filter rail used the `hidden` attribute, which carries `!important` in the reset; a hidden grid child still collapses its column. Switched to a class toggle |
| 4 | Agency form 422'd on every valid submission | The browser posts the *parsed* payload, and the handler re-ran a schema that by then expected strings. The numeric helper now accepts both |
| 5 | Custom checkboxes were unclickable by pointer | The input sat beside its label as a `peer`; visually hidden, it gets positioned away from the chip, so clicks landed on the container. Nesting the input inside the label makes the whole chip the hit target |
| 6 | Header broke at phone width | `hidden sm:inline-flex` passed *into* components whose base classes already set `inline-flex` lost on stylesheet order, so the CTA and locale switcher rendered at 390px and collided with the menu button. Wrapped in `<div className="hidden sm:block">` instead |
| 7 | Georgian hero pushed the CTAs off-screen | Georgian sets 2–3× wider than English. The `h1` is now `clamp()`-capped and card metadata is two columns rather than four |
| 8 | Hourly rates read `24 US$–38` | `Intl` renders USD as a trailing `US$` in `ka-GE`. Rate ranges use a bare `$`; monthly figures still use proper `Intl` currency |
| 9 | Mixed-script Georgian text | Some seeded copy contained Cyrillic `ут` inside Georgian words (`აутსორსინგ`). Swept both message files and the seed data; zero Cyrillic remains |

Items 5–9 were found during the redesign; 1–4 during the initial build.

---

## 4. Verification

Everything below was run against a production build in a real browser, not
inferred from the code.

**Functionality**

- Both forms submit end to end and show their success panel
- Empty submit announces "10 fields need attention" and focuses the first
  invalid field
- The agency form's inverted-rate cross-field rule fires and clears
- Filters work by pointer **and** by keyboard, and still write to the URL
  (12 → 6 results on a country filter)
- Locale switching preserves path and query
- `/`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg` all
  resolve; `/favicon.ico` and unknown paths 404 rather than 500

**Accessibility and resilience**

- Skip link is the first tab stop
- No-JS: every section renders (checked on `/how-it-works` and `/about`)
- Reduced motion: zero elements left hidden across three pages
- Zero horizontal overflow at 360px on all eight routes
- Mobile nav opens, closes on Escape, and locks the page behind it

**Build**

- `next build` clean; all 30+ locale routes prerender
- `tsc --noEmit` clean

---

## 5. Repository setup

The repo was empty when work started, so GitHub made the feature branch the
default. To get a reviewable PR:

1. Created `main` from an initial commit holding `.gitignore` and a stub README
2. Rebased the site onto it — the resulting tree was verified byte-identical to
   what had already been pushed, so only the history's shape changed
3. Force-pushed the feature branch with `--force-with-lease` and opened PR #1

**Still outstanding:** `claude/silkhire-marketing-site-61j8bb` is *still the
repo's default branch*. Switch the default to `main` in Settings → Branches —
that cannot be done from the CLI. Until then the PR looks like it merges into a
side branch, and anyone cloning lands on the feature branch.

---

## 6. Deployment

**Recommendation: Vercel.** Two things rule out a static host — `proxy.ts`
does locale negotiation at request time, and the two API routes need a Node
runtime. So `output: 'export'` is not an option. Everything else prerenders, so
you are really paying for a CDN plus a thin serverless layer.

**The catch:** Vercel's Hobby plan is personal, non-commercial use only.
SilkHire is a business, so it needs Pro (~$20/month per member — check current
pricing).

**If that cost matters:** Cloudflare Workers via `@opennextjs/cloudflare`
allows commercial use on its free tier, at the cost of some setup friction.
A €4–5/month VPS running `next start` behind Caddy is the floor, but you then
own uptime, certs and deploys.

**Deploy steps:** import the repo, set `NEXT_PUBLIC_SITE_URL` to the real
origin with no trailing slash (it is baked in at build time and every canonical
URL, hreflang tag, sitemap entry and OG image URL derives from it), point DNS,
set the production branch to `main` after merging.

---

## 7. Before this goes live

Three things would bite on day one:

1. **The forms go nowhere.** `app/api/*/route.ts` validates, logs to the server
   console and returns success. A real person filling in a brief would see
   "Thank you — we have got it" and you would never receive it. Wire up the
   email or CRM step first; the `TODO: PLUG IN THE FORM BACKEND HERE` blocks
   mark exactly where, and the README covers the options.
2. **The cost figures are placeholders** — and `robots.ts` allows indexing, so
   Google will index invented rates. Replace `data/cost-comparison.ts`.
   Percentages and bar widths are computed, so only the raw numbers change.
3. **Both handlers `console.info` submitter names, emails and phone numbers.**
   Fine for a stub, wrong once real traffic arrives.

Also worth knowing:

- The 12 agencies are invented, with `example.com` contact details throughout.
- `siteConfig` in `data/site.ts` carries placeholder phone, address and social
  URLs.
- Adding a **fifth service category** breaks the home page's 2×2 grid and needs
  edits in four places — see the README.
- When adding any component, check the **Georgian** rendering at 390px before
  calling it done. Several layouts here use two columns where four would be
  natural, for exactly that reason.
