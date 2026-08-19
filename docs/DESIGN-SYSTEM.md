# SilkHire design system

Built on the principles in Apple's Human Interface Guidelines — not on Apple's
branding, typefaces or iconography. What is borrowed is the **method**.

Everything lives in `app/globals.css` (tokens, text styles, materials) and
`components/ui/` (primitives). Nothing in this file is decorative: each rule
exists because a component would otherwise be assembled ad hoc at the call site.

**Sources** (all Apple, all read directly):
`developer.apple.com/design/human-interface-guidelines/` — typography, color,
materials, layout, motion, accessibility, buttons, dark-mode — and
`developer.apple.com/design/resources`.

---

## 1. Colour is semantic

Tokens are named for their **purpose**, never their appearance. This is the
single change that makes dark mode possible at all: a token called `--color-void`
cannot adapt, because in a light appearance it would have to stop being void.

| Role | Token | Use |
| --- | --- | --- |
| Backgrounds | `bg`, `bg-secondary`, `bg-tertiary` | Depth in the hierarchy |
| Control fills | `fill`, `fill-secondary` | The resting surface of a control |
| Text | `label`, `label-secondary`, `label-tertiary`, `label-quaternary` | Strongest to weakest |
| Rules | `separator`, `separator-opaque` | Hairlines |
| Action | `accent`, `accent-hover`, `accent-muted`, `on-accent` | Interactivity, and nothing else |
| Status | `positive`, `critical` (+ `-muted`) | Outcome |
| Material | `material-bar` | The translucent bar |

Every token has **three** values: light, dark (`prefers-color-scheme`), and
increased contrast (`prefers-contrast: more`), with a fourth combination for
dark + increased contrast.

> "Even if your app ships in a single appearance mode, provide both light and
> dark colors." — HIG, Color

Dark is **not** an inversion. Backgrounds lift off pure black in steps, labels
soften rather than going pure white, and the accent brightens — a mid-tone green
reads as mud on a dark surface.

**Measured contrast** (not estimated). HIG asks 4.5:1 up to 17pt, 3:1 at 18pt+
or bold; for custom colours in dark mode it suggests aiming at 7:1.

| | Light | Dark |
| --- | --- | --- |
| `label` on `bg` | 16.8:1 | 19.3:1 |
| `label-secondary` | 6.6:1 | 8.2:1 |
| `label-tertiary` | 5.5:1 | 7.3:1 |
| `accent` on `bg` | 6.2:1 | 11.9:1 |
| `on-accent` on the accent fill | 6.2:1 | 11.9:1 |
| `critical` on `bg` | 6.5:1 | 7.5:1 |

`label-quaternary` is below 4.5:1 by design and is for **decoration only** —
the hero graphic's rings, a disabled tick. Never body text.

Colour is never the sole carrier of meaning: the savings figures in the cost
table are labelled "vs Georgia", vetted badges carry a check glyph, and errors
carry an icon as well as a colour.

## 2. Type is a set of text styles

Each utility fixes size, weight, leading and tracking **together**. You pick
hierarchy by name; you never assemble it from a size plus a weight at the call
site.

> "A text style specifies a combination of font weight, point size, and leading
> values." — HIG, Typography

`text-display` · `text-title-1` · `text-title-2` · `text-title-3` ·
`text-headline` · `text-body` · `text-body-lead` · `text-callout` ·
`text-subheadline` · `text-footnote` · `text-caption` · `text-overline`

Notes on the scale:

- **Body is 17px**, the HIG default on iOS, not the usual web 16.
- **`headline` and `body` are the same size** — weight alone separates a heading
  from the text under it, which is how the HIG distinguishes them.
- Display and title sizes are **fluid** (`clamp`), so the scale holds together
  between a phone and a wide display without breakpoint overrides.
- **Tracking tightens as size grows** (−0.028em at display, +0.06em at
  overline), mirroring what the system font does automatically at every size.
- **No weight below 400.** "Avoid Ultralight, Thin, and Light font weights."
- `measure` (38rem) and `measure-wide` (46rem) cap the reading column.

### The typeface

One family across the whole hierarchy. The stack is:

```
-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Georgian',
var(--font-noto-georgian), 'Segoe UI', system-ui, sans-serif
```

Apple devices render San Francisco natively — including **SF Georgian**, which
Apple documents as supporting "modern Georgian, Mkhedruli, and Mtavruli
uppercase forms". Everyone else falls through to Noto Sans Georgian, loaded as a
webfont, because the Windows and Android majority of this site's audience has no
system font that covers Georgian well. Both are neutral grotesques, so the
substitution is not jarring.

**SF is deliberately not shipped as a webfont.** Apple licenses it for
interfaces on Apple platforms, not for redistribution from our own origin.
Using the installed system font through `-apple-system` is a different thing
entirely, and is what the stack does.

## 3. Materials belong to the functional layer

The header — and only the header — uses `material-bar`: a translucent fill with
`backdrop-filter: saturate(180%) blur(20px)`, so content stays partly visible
as it scrolls beneath.

> "Don't use Liquid Glass in the content layer… Use Liquid Glass effects
> sparingly." — HIG, Materials

Cards, panels and sections in the content layer are **opaque**. The material
also appears only once the page has scrolled; at rest the bar sits flush with no
seam.

Three fallbacks, all required:

| Condition | Behaviour |
| --- | --- |
| `prefers-reduced-transparency: reduce` | Opaque, no blur |
| `prefers-contrast: more` | Opaque, no blur |
| No `backdrop-filter` support | Opaque |

Without them a 72%-opaque bar leaves content legible straight through it.

## 4. Geometry

Radius scale: `xs 6` · `sm 10` · `md 14` · `lg 20` · `xl 28` · `2xl 36`, plus
full for capsules.

- **Buttons are capsules.** "In general, prefer circular or capsule-shape
  buttons." All four variants share the same geometry and differ only in fill,
  because the HIG asks that the preferred option be marked by *style*, not size.
- **Cards are `lg` (20px).**
- **Nest concentrically.** An inner radius should be the outer radius minus the
  padding between them — a 20px card with 28px of padding takes a ~10px (`sm`)
  inner radius, not another 20.

Elevation is two steps (`shadow-raised`, `shadow-floating`) and both are
restrained. Depth here comes from the background step and the separator, not
from drop shadows.

## 5. Hit targets

**44px minimum** on everything pointable — `min-h-11` on buttons, nav links,
chips, form controls and footer links.

Two documented exceptions, both legitimate:

- **Inline links inside a sentence.** Making them 44px tall would wreck the
  paragraph; WCAG 2.5.8 exempts inline links in text for the same reason.
- **The honeypot input**, which is positioned off-screen and is not a target.

## 6. Motion

> "Add motion purposefully… Aim for brevity and precision." — HIG, Motion

Three durations (`fast 150ms`, `medium 260ms`, `slow 420ms`) and two easings.
Nothing runs longer than 500ms. There is one repeating animation on the entire
site — the travelling dash in the hero graphic — and it is decorative and
`aria-hidden`.

Two rules any new motion must follow:

1. **The hidden state lives in CSS under `.js`**, set by an inline script in the
   layout. With JavaScript off, every section renders visible rather than blank.
   Never hide content in React state that only a scroll can undo.
2. **Reduced motion resolves, it does not disable.** The media query sets
   reveals to their *end* state and clamps durations; a disabled reveal would
   leave content invisible forever. Keyframe entrances use `animation: … both`
   so they land on the end state when the duration is clamped to near zero.

## 7. Appearance follows the system

There is **no in-page theme switch**, deliberately.

> "Avoid offering an app-specific appearance setting… they may think your app is
> broken because it doesn't respond to their systemwide appearance choice."
> — HIG, Dark Mode

`color-scheme: light dark` on `html` so form controls and scrollbars follow too,
and two `theme-color` meta entries so the browser chrome matches.

---

## Gotchas worth knowing

These cost real time; they are not hypothetical.

- **`@theme` cannot be nested inside `@media` in Tailwind v4.** Appearance
  overrides must re-declare the custom properties on `:root`, which the
  generated utilities already reference through `var()`.
- **Write `backdrop-filter` unprefixed only.** Writing it alongside
  `-webkit-backdrop-filter` made the build's minifier deduplicate down to the
  prefixed form, which would have left Firefox with an unblurred, 72%-opaque
  bar. The build adds prefixes from its own browser targets.
- **Implicit grid tracks are sized `auto`**, i.e. `minmax(min-content,
  max-content)`, so a card whose min-content exceeds the viewport widens the
  whole page. Use `grid-cols-1` / `minmax(0,1fr)` explicitly, and `min-w-0` on
  items that hold long text.
- **`overflow-wrap: break-word` is set on `body`** because Georgian compounds
  are long and have no hyphenation dictionary in most browsers. Without it a
  single word paints outside its column and the document gains a horizontal
  scrollbar even though no element's *box* overflows — which makes the cause
  invisible to a bounding-box check.
- **Don't pass `hidden sm:block` into a component** whose base classes already
  set a display; which utility wins depends on stylesheet order, not attribute
  order. Wrap it instead.
- **Keep a custom checkbox's `<input>` inside its visible label**, not beside it
  as a `peer` — a visually-hidden sibling gets positioned away from the control
  and the hit box goes with it.
