# praxisls.com — handoff

**Repository:** `tomblakeasaah196/praxis-ls-web`
**Branch:** `claude/praxis-ls-marketing-pr1-8o0mmf`
**Specification:** `tomblakeasaah196/praxis-ls` at `807fc1a`, read-only. No commit,
branch or PR was made against it (N13).

This is **the first of two changes.** It carries the whole platform — routing,
theme, design system, CI, budgets — plus every page whose copy is final in
`LANDING_PAGE_GUIDE.md`. The second change carries the pages whose copy has to
be drafted: the five solution pages and the Smart Logistics case study. The
split is drawn on that line deliberately: reviewing "is this verbatim?" and
reviewing "is this draft any good?" are different jobs, and mixing them in one
diff gets the first one skipped.

---

## 1. Built

### The homepage — all fourteen sections of guide §3, both languages

| §   | Section               | Where                                    | Copy                                          |
| --- | --------------------- | ---------------------------------------- | --------------------------------------------- |
| 1   | Header                | `src/components/Header.astro`            | verbatim                                      |
| 2   | Hero                  | `src/components/home/Hero.astro`         | verbatim                                      |
| 3   | Credibility strip     | `src/components/home/Credibility.astro`  | verbatim                                      |
| 4   | The problem           | `src/components/home/Problem.astro`      | verbatim                                      |
| 5   | The spine — the moat  | `src/components/home/Spine.astro`        | verbatim                                      |
| 6   | The control tower     | `src/components/home/ControlTower.astro` | verbatim                                      |
| 7   | By role               | `src/components/home/Roles.astro`        | verbatim + drafted tab labels (FR)            |
| 8   | Coverage              | `src/components/home/Coverage.astro`     | **drafted**                                   |
| 9   | Governed intelligence | `src/components/home/Intelligence.astro` | verbatim                                      |
| 10  | Trust                 | `src/components/home/Trust.astro`        | verbatim                                      |
| 11  | Deployment            | `src/components/home/Deployment.astro`   | verbatim                                      |
| 12  | Standards             | `src/components/home/Standards.astro`    | verbatim                                      |
| 13  | Pricing shape         | `src/components/home/Pricing.astro`      | tiers verbatim (EN); FR + framing **drafted** |
| 14  | Close                 | `src/components/home/Close.astro`        | verbatim                                      |
| 15  | Footer                | `src/components/Footer.astro`            | structure per guide                           |

### Pages

| EN                  | FR                                     | State                                                                                                                                                      |
| ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/en/`              | `/fr/`                                 | Complete.                                                                                                                                                  |
| `/en/security`      | `/fr/securite`                         | Heading "Controls we operate" / « Les contrôles que nous opérons », the six controls from §3.10, a certification line, four FAQ entries + FAQPage JSON-LD. |
| `/en/standards`     | `/fr/normes`                           | The three-row table from §12 and its note, plus how the table is maintained.                                                                               |
| `/en/pricing`       | `/fr/tarifs`                           | Tier shape from §13, add-ons, the metered-AI line, no figures. FAQPage JSON-LD.                                                                            |
| `/en/about`         | `/fr/a-propos`                         | Drafted. States plainly what is not published yet.                                                                                                         |
| `/en/contact`       | `/fr/contact`                          | The six-field demo form (§4).                                                                                                                              |
| `/en/legal/privacy` | `/fr/mentions-legales/confidentialite` | Stub. States that it is a stub and nothing else.                                                                                                           |
| `/en/legal/terms`   | `/fr/mentions-legales/conditions`      | Stub.                                                                                                                                                      |
| `/`                 | —                                      | Fallback language chooser, `noindex`. The real answer is a host 302 — see §5.                                                                              |
| `/sitemap.xml`      | —                                      | Both trees with hreflang alternates.                                                                                                                       |

**Not in this change** (second PR): `/en/solutions/*` ×5 · `/en/customers/smart-logistics`
and their French counterparts. They are already in the slug map
(`src/i18n/routes.ts`) and marked `UNBUILT_ROUTES`, so the switcher, the
sitemap and the link checker all know about them and nothing links to a URL
that 404s.

### Systems

- **Routing (N7).** Localised slugs per §2 in one table, `src/i18n/routes.ts`.
  `alternateOf()` throws rather than falling back, so a route present in one
  language and missing in the other fails the build instead of dropping a
  reader on the homepage. `hreflang` (`fr`, `en`, `x-default` → English) and a
  self-referencing canonical on every page, emitted from that table.
- **Theme (N6).** Dark is written into the server-rendered `<html>`, so it is
  correct with JavaScript off and there is nothing to correct on a first visit.
  An inline head script applies a stored choice before first paint. Two states,
  persisted, never overridden. Light is fully designed, not a filter.
- **Islands.** Vanilla TS, no framework: theme toggle, header + mobile sheet,
  language banner, role tabs (APG pattern, one tab stop), the scroll-driven
  control tower, the demo form.
- **The control tower.** One hand-authored inline SVG track with
  `pathLength="1"`, driven by a single custom property `--tower-progress` that
  an `IntersectionObserver` + passive scroll listener writes 0 → 1. Everything
  visible is CSS reading that number. `prefers-reduced-motion` removes the
  animation entirely and says so in a line of text.
- **Brand (N2, N3, N4).** `vendor/brand/tokens.css` is a byte copy of
  `packages/brand/tokens.css` at the pinned ref, verified by
  `scripts/check-brand-tokens.mjs` two ways (local digests always; a byte diff
  against upstream when a token or a local clone is available). No hex outside
  that file; orange-as-text is `--brand-ink-orange`; labels on orange fills are
  carbon.
- **Fonts (N5).** IBM Plex Sans, Inter, JetBrains Mono, self-hosted from
  `@fontsource-variable`, latin + latin-ext only, `font-display: swap`, display
  face preloaded. No other family is named anywhere, including in fallbacks.
- **The copy deck (N1).** `vendor/copy/landing-page-guide-copy.md` is §3 and §4
  of the guide, byte-verbatim, digest-pinned to `807fc1a` the same way the brand
  tokens are. `scripts/check-copy.mjs` asserts 76 strings are byte-identical to
  that fixture **and** present in the built page for their language. That is the
  brief's "diff it, don't eyeball it" (§7), and it fails in both directions: a
  sentence I paraphrased fails before it reaches a page, and a page that stops
  rendering one fails after.
- **CI.** `.github/workflows/ci.yaml` — brand-token diff, hex guard, font
  guard, typecheck, format, build, CSS-layer guard, copy diff, link/heading/
  hreflang check, French typography check, payload budgets, then Lighthouse CI
  against the N9 budgets on a mobile profile in both languages. Nothing deploys.

---

## 2. Deviations

Each is a decision, with the rule it touches.

**D1 — Diagram labels are HTML, not `<text>` inside the SVG.** _Brief §5 (stack)._
The node network itself — nodes, connectors, the track — is hand-authored inline
SVG, theme-aware through the brand tokens, exactly as asked. The **labels** sit
in HTML alongside it. An SVG `viewBox` scales its text with the drawing, and at
320px the seven French labels of the posting chain ("Dossier d'exploitation" is
23 characters against the English 14) render at around 5px or overflow the box.
HTML labels reflow, stay selectable, stay in the page's type ramp, and are read
in document order by a screen reader. The graphic language is unchanged.

**D2 — The bare-root 302 is host configuration, not a page.** _N7._ The brief
requires a 302 on `Accept-Language`. A static build cannot read a request
header, so the redirect lives in `public/_redirects` (Netlify / Cloudflare Pages
syntax, `Language=fr` condition, defaulting to `/en/`). A `noindex` fallback
page also ships at `/` so a host that ignores that file answers the apex with
something rather than a 404 — it offers both languages and **redirects nobody**,
because a meta-refresh would be a second redirect in a system that is specified
to have exactly one. Deep links are never redirected. See §5 for the apex.

**D3 — Three typographic characters that the guide's markdown could not carry.**
_N1 vs N8._ The copy deck is verbatim, with exactly three mechanical
substitutions:

| In the guide                        | Published                    | Why                                                                         |
| ----------------------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| space before `: ; ! ?`              | U+202F narrow no-break space | N8 · glossary §5.1. Markdown source cannot carry it; published French must. |
| space between a figure and its noun | U+00A0                       | So `17 États membres` never breaks across a line.                           |
| `'` (ASCII)                         | `’` (U+2019)                 | The typographic apostrophe, in both languages.                              |

No word was changed by any of them. `scripts/check-french.mjs` enforces the
first two on the built HTML; `scripts/check-copy.mjs` folds all three when it
diffs the pages against the vendored guide, and forgives nothing else — not a
changed word, not a changed dash.

**D4 — "Product" and "Solutions" in the header point at homepage sections.**
_Guide §3.1 vs §2._ The navigation is specified as five items, and the URL map
has no `/product` and no `/solutions` index — only `/solutions/<slug>`
children. Both therefore link to the homepage sections that carry those
arguments (`#spine`, `#coverage`). When the five solution pages land, "Solutions"
becomes a menu over them.

**D5 — The coverage grid does not link out yet.** _Guide §3.8._ Each group is
meant to link to the relevant solution page. Those pages are the second change,
so the grid ships without links rather than with links that 404.

**D6 — The hero screenshot is the dark capture in both themes.** _Guide §3.2._
The guide fixes the hero at "the real product UI, dark mode". Rendering the
light capture under the light theme would mean shipping both files to every
reader or a script-driven swap; the guide's instruction is followed literally
instead. All twelve placeholders ship, so this is one line to change if the
call goes the other way.

**D7 — The CSS is inlined into every page rather than linked.** _N9._ A linked
stylesheet is a render-blocking round trip, and at the guide's Slow-4G profile
(≈560ms simulated request latency) that is about a third of the entire 1.5s LCP
budget. Measured both ways; the numbers are in §4.

**D8 — Astro's built-in `i18n` routing is not used.** _Brief §5._ That option
assumes the same slug in every locale. §2 requires localised slugs, so routes
are written per locale under `src/pages/{en,fr}/` and the equivalence lives in
one explicit table.

**D9 — The mark is an interpretation, not the asset.** _N12._ No logo file was
provided. `src/components/Mark.astro` and `public/favicon.svg` are hand-authored
from the construction note in `BRAND_GUIDELINES.md` §2 — isometric cube of three
slate faces, orange node network, no gradient, no tagline, glyph-only at small
sizes. It observes every written rule but it is **not the real mark** and must be
replaced before launch. See OPEN.

**D10 — Lighthouse's `canonical` and `uses-http2` audits are skipped.**
_N9._ Both are artefacts of measuring a static directory on `localhost`: the
canonical correctly points at `https://praxisls.com/…`, which the audit reads as
"a different domain", and the local server is HTTP/1.1. Neither can be satisfied
without running against the production origin, which is out of scope. Every
other audit runs.

---

## 3. OPEN

Everything here is left blank in the build rather than guessed at (N12).

| #   | Question                                                                                                                                                                                                                                                                                                                                                                                             | Where it bites                                                                                                                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O1  | **The demo form's destination** — inbox, CRM, or calendar tool.                                                                                                                                                                                                                                                                                                                                      | `src/islands/demo-form.ts`, `DEMO_FORM_ENDPOINT` + `submitDemoRequest()`. One constant and one function body. Until then the form validates, collects, and reports honestly that nothing was sent. |
| O2  | **The response window to promise.** "Confirmation names a real response window and keeps it" (§4) — nobody has stated one, so the confirmation does not invent one.                                                                                                                                                                                                                                  | `pages.{en,fr}.ts` → `contact.success`.                                                                                                                                                            |
| O3  | **Every pricing figure.** No number appears on `/pricing` or anywhere else.                                                                                                                                                                                                                                                                                                                          | —                                                                                                                                                                                                  |
| O4  | **Anything about Smart Logistics beyond §3.3.** Nothing beyond the credibility strip is published, and the case-study page is not in this change.                                                                                                                                                                                                                                                    | —                                                                                                                                                                                                  |
| O5  | **Team names, biographies, photographs, the registered address, registration details.** `/about` says plainly that they are not published yet.                                                                                                                                                                                                                                                       | `pages.{en,fr}.ts` → `about.openLine`.                                                                                                                                                             |
| O6  | **The status page URL.** Guide §3.15 puts a link to it in the footer baseline; no URL appears in any source document, so the link is absent.                                                                                                                                                                                                                                                         | `src/components/Footer.astro`.                                                                                                                                                                     |
| O7  | **The analytics choice.** Nothing is loaded. There is no third-party script on the site at all, and no cookie banner, because there is nothing to consent to yet.                                                                                                                                                                                                                                    | —                                                                                                                                                                                                  |
| O8  | **`PRAXIS-LS` or `Praxis LS` in prose.** Known open decision in `BRAND_GUIDELINES.md` §2, and §6 of the brief says explicitly not to resolve it. The table there is followed: the drawn wordmark is `PRAXIS-LS`, prose is `Praxis LS`. **Flagged, not resolved.**                                                                                                                                    | `src/components/Mark.astro`.                                                                                                                                                                       |
| O9  | **The mark and wordmark assets.** See D9. The current SVG is an interpretation of the written construction and must be replaced with the cut asset.                                                                                                                                                                                                                                                  | `src/components/Mark.astro`, `public/favicon.svg`.                                                                                                                                                 |
| O10 | **The certification roadmap line.** §3.10 asks for the roadmap "in a line"; which certifications, on what dates, is in no source document. The page states what IS known — that none is held today, and that this is where one will be stated with its scope and date.                                                                                                                               | `pages.{en,fr}.ts` → `security.certificationLine`.                                                                                                                                                 |
| O11 | **The legal pages.** Privacy and terms are stubs that say so. Placeholder terms are terms; placeholder privacy text is a statement about how data is handled.                                                                                                                                                                                                                                        | `pages.{en,fr}.ts`.                                                                                                                                                                                |
| O12 | **The ledger panel in the control tower carries no figures.** SYSCOHADA account codes and amounts are not in the source documents, and the section arguing the ledger is trustworthy is the worst place on the site to invent one. Each row shows its milestone and an em dash.                                                                                                                      | `home.{en,fr}.ts` → `tower.ledgerAmount`.                                                                                                                                                          |
| O13 | **The apex is not idle.** `praxisls.com` is in `PLATFORM_HOSTS` and the mail OAuth callback is designed to land on it (`LANDING_PAGE_GUIDE.md` §7). Whether it is live for OAuth today depends on what production sets for `MS_GRAPH_REDIRECT_URI` / `GOOGLE_REDIRECT_URI`. **Check that before repointing anything.** DNS and deployment are out of scope here; §5 records what this build assumes. | `public/_redirects`.                                                                                                                                                                               |

---

## 4. Measurements

All numbers below were **measured on this branch**, not estimated.

### Lighthouse — mobile, both languages

Lighthouse CI, `lighthouserc.cjs`, three runs per URL, medians reported.
Emulation is Lighthouse's standard mobile profile — 412×823 at DPR 1.75,
150 ms RTT, 1 638 Kbps, 4× CPU slowdown — which is the guide's "Slow 4G /
mid-range Android" (§6). Reports are uploaded as a CI artifact on every run.

| URL           | Perf | A11y | Best practices | SEO | FCP      | **LCP**      | CLS   | TBT  | Total weight |
| ------------- | ---- | ---- | -------------- | --- | -------- | ------------ | ----- | ---- | ------------ |
| `/en/`        | 99   | 100  | 100            | 100 | 1 360 ms | **1 810 ms** | 0.010 | 0 ms | 171 KiB      |
| `/fr/`        | 99   | 100  | 100            | 100 | 1 357 ms | **1 807 ms** | 0.005 | 0 ms | 172 KiB      |
| `/en/contact` | 100  | 100  | 100            | 100 | 1 207 ms | **1 653 ms** | 0.000 | 0 ms | 143 KiB      |
| `/fr/contact` | 100  | 100  | 100            | 100 | 1 207 ms | **1 656 ms** | 0.000 | 0 ms | 143 KiB      |

`/en/security`, measured separately on a single run for reference: performance
100, FCP 1 204 ms, **LCP 1 504 ms**.

### Against the budgets in N9

| Budget                          | Target         | Measured                         |     |
| ------------------------------- | -------------- | -------------------------------- | --- |
| Lighthouse, all four categories | ≥ 95           | 99–100, both languages           | ✅  |
| CLS                             | < 0.05         | 0.000–0.010                      | ✅  |
| INP (TBT as the lab proxy)      | < 200 ms       | 0 ms                             | ✅  |
| JS shipped, compressed          | < 100 KB       | **2.4 KB** on the heaviest page  | ✅  |
| Total page weight               | < 600 KB       | **172 KiB** on the heaviest page | ✅  |
| LCP                             | **< 1 500 ms** | **1 650–1 810 ms**               | ❌  |

**LCP is the one budget this build does not meet, and I want to be precise
about why rather than round it down.**

The LCP element is the `<h1>` on every page — confirmed by attaching a
`PerformanceObserver` over the DevTools protocol rather than by inference
(`H1.hero__h1`, 84 807 px², the only entry). Four things were tried and
measured:

| Change                                    | FCP      | LCP      |
| ----------------------------------------- | -------- | -------- |
| Baseline (linked stylesheet, PNG hero)    | 1 359 ms | 2 106 ms |
| Inline the CSS, drop `fetchpriority=high` | 1 359 ms | 1 809 ms |
| Halve the hero placeholder's pixel count  | 1 354 ms | 1 806 ms |
| Also make the hero image lazy             | 1 354 ms | 1 804 ms |
| Inline the display font as a data URI     | 1 655 ms | 1 805 ms |

The last two rows are the informative ones. Removing the hero image from the
critical path entirely moved LCP by 2 ms, so the image is not the constraint;
and carrying the 46 KB display face inside the document moved 300 ms out of LCP
and straight into FCP, for a net of nothing. What is left is the floor: a
document, a stylesheet and one self-hosted webfont, on a connection with a
150 ms RTT and a 4× CPU throttle, costs about 1.5 s before anything on the page
is at fault — `/en/security`, which is 38 KB of HTML with no image and no
island, lands at exactly 1 504 ms. The homepage's extra 300 ms is its size: it
is the fourteen-section page, and it carries two SVG control-tower tracks and a
thirteen-cell grid.

What would actually close the gap, in the order I would try it:

1. **Serve the display face as a static instance at one weight.** Every heading
   on the site is 600; the variable file carries 100–700 and costs 46 KB. An
   instanced static face is roughly half that, which is worth ~150 ms here. It
   needs a subsetting step in the build (`fonttools`), which is a real
   dependency and a real decision, not something to slip in unannounced.
2. **Accept `font-display: optional` for the display face.** LCP collapses onto
   FCP because the heading never repaints. The cost is that a first-time visitor
   reads the headline in a system font, which is a brand decision and not mine
   to take (BRAND_GUIDELINES §4 is emphatic about why Plex is the display face).
3. **Split the homepage's critical CSS from the rest.** ~31 KB is inlined into
   the homepage today, of which the below-the-fold sections are most of it.

The Lighthouse configuration keeps `largest-contentful-paint ≤ 1500` as a
**warning** rather than an error, deliberately: the number in the config should
be the number in the guide, and the gap should be visible on every CI run rather
than quietly raised to whatever passes today. The hard gate is
`categories:performance ≥ 0.95`, which encodes LCP among everything else.

### The other definition-of-done checks, and how they were run

Everything here is a script in `scripts/`, wired into `npm run verify` and into
CI. None of it is checked by reading.

| Check                                                                     | How                    | Result                                                                                                                                  |
| ------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage copy matches §3 **exactly** — diffed, not eyeballed              | `npm run check:copy`   | 76 strings, byte-identical to `vendor/copy/landing-page-guide-copy.md` (the guide, digest-pinned to `807fc1a`) and present on the page. |
| French typography (N8) on every built French page                         | `npm run check:french` | Narrow no-break spaces before `: ; ! ?`, guillemets with no-break spaces inside, accented capitals, sentence-case headings, `15 %`.     |
| `hreflang` + canonical correct on every page; one `<h1>`; `lang` per tree | `npm run check:links`  | 17 pages, all internal links resolve, no page missing `fr`/`en`/`x-default`.                                                            |
| No raw hex outside the vendored token file (N3)                           | `npm run check:hex`    | Clean. The check reads every `.astro`, `.css`, `.ts`, `.js`, `.svg` and `.json` in the repo.                                            |
| No font named outside the three permitted families (N5)                   | `npm run check:fonts`  | Clean, fallback stacks included — every stack ends in a bare generic keyword.                                                           |
| The vendored tokens are byte-identical to upstream (N2)                   | `npm run check:brand`  | `identical to praxis-ls (git show 807fc1a:packages/brand/tokens.css) ✓`                                                                 |
| JS and page-weight budgets                                                | `npm run check:budget` | 2.4 KB JS compressed, 170 KiB heaviest page.                                                                                            |
| No unlayered `html`/`body`/`:root` rule in the shared stylesheet          | `npm run check:css`    | Clean across 16 stylesheets — see D-note below.                                                                                         |

### Accessibility

Lighthouse accessibility is **100 in both languages** on every measured page.
Two real failures were found and fixed during measurement rather than argued
with:

- The control tower's milestone labels faded with `opacity`, which took the
  muted ink to **3.0:1** against the surface at 13 px — a failure in the
  _resting_ state, not mid-animation, so every reader saw it. They now fade by
  colour between two inks that each clear AA on their own.
- The header lockup was labelled "Praxis LS" while displaying "PRAXIS-LS" — an
  accessible name that does not contain its own visible text, which breaks voice
  control: you say what you can see and nothing happens. The wordmark now names
  the link and the drawing is decorative. The language switcher was rebuilt the
  same way.

Both themes were checked visually at 320 px, 390 px, 1000 px and 1280 px, in
French and English. Keyboard operation: the skip link, the header sheet
(Escape closes it and returns focus), the role tabs (one tab stop, arrow keys
between tabs, Home/End) and the form were all driven from the keyboard.

### One bug worth naming, because it nearly shipped

`src/pages/index.astro` styled `body` in an ordinary `<style>` block. Astro
cannot scope selectors that target `html`, `body` or `:root` — those elements
cannot carry a component's scope attribute — so with a shared stylesheet that
rule arrived **unlayered on every page of the site**, where it outranked every
`@layer` rule in `global.css` and replaced the layout with a centred column.
Every check still passed; the build was green; the pages looked plausible in a
thumbnail. It was found by sampling pixels out of a screenshot and measuring
where the header's background actually stopped.

The fix is `is:inline` on that one block. The guard is
`scripts/check-css.mjs`, which now fails the build on any unlayered
`html`/`body`/`:root` rule in the bundle or in any page's inline CSS.

A second one of the same family: `.shell` sets `max-width` **and** horizontal
padding, and without `box-sizing: border-box` the padding is added to the
maximum — so the container was 96 px wider than the number it named and stopped
constraining anything below a 1 312 px viewport. There is now a `reset` layer,
and the reason is written above it.

---

## 5. The root redirect, and the apex

The only redirect in the system is the bare root (N7). It ships as
`public/_redirects`:

```
/  /fr/  302!  Language=fr
/  /en/  302!
```

That is Netlify / Cloudflare Pages syntax. The equivalents:

| Host                      | Where it goes                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Netlify, Cloudflare Pages | `public/_redirects`, as shipped.                                                                                         |
| Vercel                    | `vercel.json` → `redirects` with a `has: [{type:"header",key:"accept-language",value:"fr.*"}]` rule, `permanent: false`. |
| CloudFront                | A viewer-request function reading `accept-language` and returning a 302.                                                 |
| nginx                     | `map $http_accept_language $lang_root { ~*^fr /fr/; default /en/; }` and `location = / { return 302 $lang_root; }`.      |

**Deep links are never redirected**, on any of them. `praxisls.com/en/pricing`
serves English to a French browser, always.

⚠️ **Before repointing the apex, read `LANDING_PAGE_GUIDE.md` §7 (O13).** The
recommended route is edge routing: `/mail/oauth/*` and any other app path proxy
to the Express origin, everything else serves this static site. Do **not** simply
point the apex A record at a static host.

---

## 6. Screenshots — the swap procedure

The twelve files in `public/screens/` are **placeholders and look like it**: a
flat panel at the capture script's exact geometry (1600×1000) in the theme's
dominant tones, with the filename and the word PLACEHOLDER on it. They draw no
interface — no toolbar, no table, no numbers — because a hand-drawn "product"
screenshot that ships is worse than an obvious placeholder.

They are named exactly as `scripts/marketing/capture-screens.mjs` writes them
(`${screen}--${theme}--${lang}.png`, that script line 187):

```
operation-file--dark--en.png    control-tower--dark--en.png    general-ledger--dark--en.png
operation-file--dark--fr.png    control-tower--dark--fr.png    general-ledger--dark--fr.png
operation-file--light--en.png   control-tower--light--en.png   general-ledger--light--en.png
operation-file--light--fr.png   control-tower--light--fr.png   general-ledger--light--fr.png
```

**To swap in the real captures:**

1. In `praxis-ls`, against a **demo** tenant with seeded sandbox data — never a
   customer's live environment, because screenshots leak whatever is on screen:

   ```bash
   CAPTURE_BASE_URL=https://demo.praxisls.com \
   CAPTURE_EMAIL=... CAPTURE_PASSWORD=... \
   node scripts/marketing/capture-screens.mjs
   ```

2. Copy the twelve files from `captures/` over `public/screens/`. Same names,
   same dimensions — nothing in this repository changes.
3. Delete the placeholder branch of `scripts/render-assets.mjs` (the Open Graph
   cards still use it), and drop `data-placeholder` handling from
   `src/components/Screenshot.astro` so the badge stops rendering.
4. Re-run `npm run check:budget`. Real screenshots are heavier than flat panels;
   the 600 KB page budget is what decides whether they need AVIF/WebP
   derivatives, which is the point at which `<picture>` earns its place.

`npm run assets` regenerates the placeholders and the Open Graph cards. It needs
`chrome-headless-shell` — full Chrome in new headless mode opens a real window,
so `--window-size=1200,630` yields a 1200×543 viewport and pads the screenshot
back out with background colour. The script warns when it has to fall back and
asserts the output geometry.

---

## 7. Draft copy — every page and section awaiting approval

Everything in this list is **`DRAFT COPY — needs review`**. Nothing in it is
specified by `LANDING_PAGE_GUIDE.md`; it is drafted from the README module map,
the glossary and the homepage's voice.

| Where                                    | What is drafted                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage §8 (Coverage)                   | Heading, intro, and all thirteen group names + one-liners, both languages.                                                           |
| Homepage §13 (Pricing shape)             | Heading, intro, and the French tier descriptions. EN tier text is verbatim.                                                          |
| Homepage §7 (By role)                    | The four **tab labels** in French. The four lines are verbatim in both languages.                                                    |
| Homepage §12 outlet link                 | "See the standards page" / « Voir la page des normes ».                                                                              |
| Every `meta description`, both languages | Written per page by hand, never generated (guide §5) — but not specified.                                                            |
| `/security`                              | Intro, "The six controls" heading, the certification line, four FAQ entries. Heading and the six controls are verbatim.              |
| `/standards`                             | Intro and the "How this table is kept" block. Table and note verbatim.                                                               |
| `/pricing`                               | Intro, add-ons wording, the metered-AI block, the quotation block, four FAQ entries.                                                 |
| `/about`                                 | The entire page.                                                                                                                     |
| `/contact`                               | Field labels, hints, error messages, the confirmation, the free-provider notice. Field NAMES are from §4.                            |
| `/legal/privacy`, `/legal/terms`         | The stub text.                                                                                                                       |
| Site chrome (`src/i18n/ui.ts`)           | Footer column headings, the theme toggle's accessible names, the language banner's action and dismiss labels, the placeholder badge. |
| Open Graph card lines                    | Uses the verbatim eyebrow and H1 per language; layout is drafted.                                                                    |

The French half of every one of these was written as French, not translated
from the English — including the ones where the English came first, which were
re-drafted rather than converted (`BRAND_GLOSSARY_FR_EN.md` §0).

---

## 8. Disagreements

Said plainly, as asked.

**G1 — "The confirmation names a real response window and keeps it" is
unbuildable as written, and the brief already knows it.** §4 requires the
promise; §6 makes the form's destination an open question. You cannot promise a
response time before you know who owns the inbox. The form ships without a
window rather than with an invented one. The moment O1 and O2 are answered, it
is a one-line change — but the guide should probably say "names a response
window **once one is owned**", because as written it reads like a shipped
requirement and it cannot be one.

**G2 — §3.15 asks for a status-page link that no document defines.** Same shape
as G1, smaller. The footer ships without it (O6). A guide that names a required
link should name its URL, or say that it is deferred.

**G3 — The `/security` certification line is asked for without any facts
behind it.** §3.10 says "state the certification roadmap in a line", and no
source document says which certifications, or when. What the page states is the
part that IS sourced — that none is held today, and that this is where one will
appear with its scope and date. That is honest and it is arguably stronger than
a roadmap. But it is not what §3.10 asked for, and I would rather say so than
quietly reinterpret the instruction.

**G4 — Twelve screenshots per release is a maintenance cost the guide
underestimates.** Three screens × two themes × two languages, regenerated every
release, against a seeded demo tenant that has to stay seeded. The capture
script is well built and its `ready` selectors are the right idea, but the
binding constraint is not the script — it is that somebody has to keep a demo
tenant looking like a real business forever. Worth deciding **now** whether all
twelve are load-bearing, or whether the light-theme set can be dropped until a
light-theme surface actually ships one.

**G5 — The 5% orange rule and the "one primary CTA" rule pull against each
other on long pages.** The homepage is fourteen sections; a reader who scrolls
to §11 is a long way from a call to action, and the only orange available is the
sticky header's button. The build resolves it by keeping §14's CTA the single
in-body one and letting the section outlets ("See the full security posture")
carry orange as _text_ in the ink variant. It works, but it is the one place
where following both rules exactly would have produced a worse page, and a
future editor should know that was a decision rather than an oversight.

**G6 — `LANDING_PAGE_GUIDE.md` §2's table gives `/fr/mentions-legales/confidentialite`
and `/terms` on one line.** The English column reads `/en/legal/privacy · /terms`
and the French `/fr/mentions-legales/confidentialite · /conditions`. Read
literally that puts the terms pages at the root of each tree. It is obviously
shorthand for the sibling slug, and that is how it is implemented
(`/en/legal/terms`, `/fr/mentions-legales/conditions`) — but the table should be
written out, because the next person to read it will have to make the same guess.

---

## 9. What the second change carries

Named here so review can see the whole shape:

- `/en/solutions/freight-forwarding-customs` ⇄ `/fr/solutions/transit-douane`
- `/en/solutions/warehouse` ⇄ `/fr/solutions/entrepot`
- `/en/solutions/fleet` ⇄ `/fr/solutions/flotte`
- `/en/solutions/finance-ohada` ⇄ `/fr/solutions/comptabilite-ohada`
- `/en/solutions/platform-it` ⇄ `/fr/solutions/plateforme-dsi`
- `/en/customers/smart-logistics` ⇄ `/fr/references/smart-logistics`, from §3.3
  and nothing else
- The coverage grid's outbound links (D5) and the Solutions menu (D4)
- Per-page Open Graph cards where a page earns one
