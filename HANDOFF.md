# praxisls.com — handoff

**Repository:** `tomblakeasaah196/praxis-ls-web`
**Branch:** `claude/praxis-ls-marketing-pr2-c71kgj` — the second of two changes.
The first is `claude/praxis-ls-marketing-pr1-8o0mmf` (PR #2), **merged to `main`
while this was being written**, so this branch is cut from `main` rather than
from PR1's head; the two trees were identical at that point.
**Specification:** `tomblakeasaah196/praxis-ls` at `807fc1a`, read-only. No commit,
branch or PR was made against it (N13).

The first change carried the whole platform — routing, theme, design system, CI,
budgets — plus every page whose copy is final in `LANDING_PAGE_GUIDE.md`. **This
one carries the pages whose copy had to be drafted** — the five solution pages
and the Smart Logistics case study — and the two pieces of wiring that were
waiting on them: the coverage grid's outbound links and the Solutions menu. The
split is drawn on that line deliberately: reviewing "is this verbatim?" and
reviewing "is this draft any good?" are different jobs, and mixing them in one
diff gets the first one skipped.

> **Everything this change adds to a page is DRAFT COPY** — six pages, both
> languages, plus their meta descriptions, their navigation labels and their
> Open Graph cards. §7 lists it. Nothing in `LANDING_PAGE_GUIDE.md` specifies
> any of it beyond the slugs, and the case study is bounded by §3.3 and by
> nothing else.

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

### The six pages this change adds — all **DRAFT COPY**

| EN                                         | FR                                 | What is on it                                                                                                                                      |
| ------------------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/en/solutions/freight-forwarding-customs` | `/fr/solutions/transit-douane`     | The operation file end to end, seven things it carries, the posting chain quotation → journal entry, a control-tower screenshot.                   |
| `/en/solutions/warehouse`                  | `/fr/solutions/entrepot`           | Receiving → dispatch, six areas, the three-way match as the posting argument, a control-tower screenshot.                                          |
| `/en/solutions/fleet`                      | `/fr/solutions/flotte`             | Seven areas of the parc, fleet cost as an entry. No screenshot — a third capture of the same two surfaces would say nothing the first two did not. |
| `/en/solutions/finance-ohada`              | `/fr/solutions/comptabilite-ohada` | Eight areas from the chart of accounts to the immutable ledger, a general-ledger screenshot, an outlet to `/standards`.                            |
| `/en/solutions/platform-it`                | `/fr/solutions/plateforme-dsi`     | What IT asks before saying yes; the exit as a line on the pricing page; a general-ledger screenshot; an outlet to `/security`.                     |
| `/en/customers/smart-logistics`            | `/fr/references/smart-logistics`   | §3.3's sentence, the four facts inside it, and what will never be published. No quotation, no figure, no chart — see §3 OPEN.                      |

Each of the five solution pages has the same shape — what this area covers,
what it posts, the surface it posts through, where to go next — because the
argument is the same argument narrowed to one part of the business, and five
pages that each invent their own structure are five pages to redesign later.

`UNBUILT_ROUTES` is now empty. The set stays in `src/i18n/routes.ts`: it is
what let the slug map, the switcher, the sitemap and the link checker be
written once, before these pages existed, and be right when they arrived.

### Wiring that was waiting on those pages

- **The coverage grid links out** (guide §3.8, was D5). Thirteen groups, thirteen
  links, from one table keyed by the module map's Roman numeral
  (`src/content/coverage-links.ts`) so the two languages cannot point at
  different pages. A group with no mapping throws at build time.
- **"Solutions" is a menu** (guide §3.1, was D4) over the five pages — a
  disclosure, not an ARIA menu (D12). One sheet on mobile with the five listed
  inside it, no second layer of interaction. Keyboard: Tab reaches every link,
  Escape closes and returns focus, focus leaving closes, ArrowDown opens.
- **The credibility strip's customer name links to the case study.** The words
  are untouched; the link wraps the emphasised span the deck already stored
  separately (D15).
- **The footer** carries the five solution pages in its Product column and the
  case study under Company. Still four columns (guide §3.15).

### Screenshots and cards

- **All twelve screenshot placeholders are now on a page.** `operation-file`
  dark stays on the hero in both themes (D6); `control-tower` and
  `general-ledger` are theme-aware on the solution pages — both captures ship,
  CSS shows the one matching the reader's theme, both are lazy (D11).
- **Per-page Open Graph cards** for the six pages that earn one (guide §5),
  rendered by `scripts/render-assets.mjs` **from the built page** rather than
  from a second copy of the words (D14). `check:links` fails if a page names a
  card that is not there.

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

**D4 — "Product" in the header points at a homepage section. RESOLVED for
Solutions.** _Guide §3.1 vs §2._ The navigation is specified as five items, and
the URL map has no `/product` and no `/solutions` index — only
`/solutions/<slug>` children. **"Solutions" is now a menu over the five pages**
(see D12). "Product" still points at `#spine`, because there is still no
`/product` page in the URL map to point it at, and inventing one would be
inventing a page.

**D5 — RESOLVED. The coverage grid links out.** _Guide §3.8._ Thirteen groups,
each to the relevant solution page. Which page is a judgement call — thirteen
groups over five pages means several groups have no single obvious home — so it
is one reviewable table rather than thirteen decisions spread through two
language decks. See D13 and G8.

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

### Added by this change

**D11 — Screenshots below the fold ship both themes; the hero still ships one.**
_Guide §3.2 and §8 vs N9._ §8 asks for twelve captures — three screens × two
themes × two languages — and D6 uses only the dark ones because the hero is on
the critical path. On a solution page the screenshot is below the fold, so
`<Screenshot themeAware>` emits both captures for the reader's language and CSS
shows the one matching the theme. Both are `loading="lazy"` and the hidden one
is `display: none`, so it has no layout box, never intersects the viewport and
is never fetched — the reader downloads one image, and the light-theme reader
downloads the light one. The swap reads a custom property declared on `:root` in
`global.css` rather than a `html[data-theme]` rule inside the component: Astro
cannot scope a selector that targets `:root`, and that is exactly the bug §4
records. **When the real captures land, re-check `check:budget`** — two real
screenshots on one page is the case that decides whether AVIF/WebP derivatives
are needed.

**D12 — The Solutions menu is a disclosure, not an ARIA menu.** _Guide §3.1 ·
N10._ The APG `menu`/`menuitem` pattern takes links out of the tab order and
puts them on arrow keys. That is right for an application menu bar and wrong for
site navigation: it means a reader who knows how to Tab through a website
suddenly cannot, and it tells a screen reader that five pages are five commands.
What ships is a `<button aria-expanded>` that shows a list of ordinary links.
Tab reaches each one in document order, Escape closes and returns focus to the
button, focus leaving closes it, a click outside closes it, and ArrowDown opens
it and moves to the first link for anyone who expects that. On mobile the five
sit inside the single sheet under a heading — a menu inside a sheet is the
"dropdown on mobile" §3.1 rules out, and it would put two Escape targets on one
screen.

**D13 — Which solution page each module group links to is a judgement call, and
it is in one table.** _Guide §3.8 · README §4._ `src/content/coverage-links.ts`
maps the module map's thirteen Roman numerals onto the five pages. The three
worth arguing about: procurement (XI) points at the warehouse page, where the
three-way match is described at the point of receiving rather than the point of
payment; ops costing (IX) points at freight forwarding, because a débours is
incurred on a file; HR (III) points at finance, because the only thing the
homepage claims about payroll is that it posts itself. Keyed by numeral so the
French and English grids cannot drift apart, and so the mapping can be reviewed
against the module map without reading either language. See G8.

**D14 — The per-page Open Graph cards are rendered from the built pages.**
_Guide §5._ `scripts/render-assets.mjs` reads each page's eyebrow and `<h1>` out
of `dist/` and draws the card from them, so a card cannot come to say something
its page does not. The cost is an ordering rule — `npm run build` before
`npm run assets` — which the script enforces with an error rather than a stale
card. Six pages earn a card (the five solution pages and the case study, which
are the pages guide §5 points search traffic at and the ones a prospect
forwards); everything else keeps the site-wide card per language.

**D15 — The credibility strip's customer name is a link.** _Guide §3.3 · N1._
The case study needed an inbound link from the page that names the customer.
The copy deck already stores that sentence in three pieces so the emphasis can
move between languages, so the link wraps the emphasised span and no word
changes — `check:copy` still diffs the sentence byte for byte, and the link's
accessible name is exactly its visible text.

**D16 — The language banner is decided before first paint, not revealed after
it.** _N7 · N9._ It used to render with `hidden` and be un-hidden by its island.
That is a **0.105 CLS** on any page where the island runs after the first paint —
the banner is the first element in the body, so revealing it moves the whole
document down — and it is how `/fr/solutions/plateforme-dsi` came in at more
than twice the 0.05 budget the moment it existed. The decision now happens in
the inline head script that already decides the theme, expressed as
`data-lang-offer` on `<html>`; the island keeps the dismissal, which is a click
and cannot be anywhere else. Measured before and after in §4.

---

## 3. OPEN

Everything here is left blank in the build rather than guessed at (N12).

| #   | Question                                                                                                                                                                                                                                                                                                                                                                                             | Where it bites                                                                                                                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O1  | **The demo form's destination** — inbox, CRM, or calendar tool.                                                                                                                                                                                                                                                                                                                                      | `src/islands/demo-form.ts`, `DEMO_FORM_ENDPOINT` + `submitDemoRequest()`. One constant and one function body. Until then the form validates, collects, and reports honestly that nothing was sent. |
| O2  | **The response window to promise.** "Confirmation names a real response window and keeps it" (§4) — nobody has stated one, so the confirmation does not invent one.                                                                                                                                                                                                                                  | `pages.{en,fr}.ts` → `contact.success`.                                                                                                                                                            |
| O3  | **Every pricing figure.** No number appears on `/pricing` or anywhere else.                                                                                                                                                                                                                                                                                                                          | —                                                                                                                                                                                                  |
| O4  | **Anything about Smart Logistics beyond §3.3.** The case-study page now exists and carries §3.3 and nothing else: the sentence, the four facts inside it, and what will not be published. There is no field on that page for a quotation, a date, a volume or a figure — not an empty one, none — because a place to put a number is where a number gets invented (N12).                             | `customers.{en,fr}.ts`.                                                                                                                                                                            |
| O5  | **Team names, biographies, photographs, the registered address, registration details.** `/about` says plainly that they are not published yet.                                                                                                                                                                                                                                                       | `pages.{en,fr}.ts` → `about.openLine`.                                                                                                                                                             |
| O6  | **The status page URL.** Guide §3.15 puts a link to it in the footer baseline; no URL appears in any source document, so the link is absent.                                                                                                                                                                                                                                                         | `src/components/Footer.astro`.                                                                                                                                                                     |
| O7  | **The analytics choice.** Nothing is loaded. There is no third-party script on the site at all, and no cookie banner, because there is nothing to consent to yet.                                                                                                                                                                                                                                    | —                                                                                                                                                                                                  |
| O8  | **`PRAXIS-LS` or `Praxis LS` in prose.** Known open decision in `BRAND_GUIDELINES.md` §2, and §6 of the brief says explicitly not to resolve it. The table there is followed: the drawn wordmark is `PRAXIS-LS`, prose is `Praxis LS`. **Flagged, not resolved.**                                                                                                                                    | `src/components/Mark.astro`.                                                                                                                                                                       |
| O9  | **The mark and wordmark assets.** See D9. The current SVG is an interpretation of the written construction and must be replaced with the cut asset.                                                                                                                                                                                                                                                  | `src/components/Mark.astro`, `public/favicon.svg`.                                                                                                                                                 |
| O10 | **The certification roadmap line.** §3.10 asks for the roadmap "in a line"; which certifications, on what dates, is in no source document. The page states what IS known — that none is held today, and that this is where one will be stated with its scope and date.                                                                                                                               | `pages.{en,fr}.ts` → `security.certificationLine`.                                                                                                                                                 |
| O11 | **The legal pages.** Privacy and terms are stubs that say so. Placeholder terms are terms; placeholder privacy text is a statement about how data is handled.                                                                                                                                                                                                                                        | `pages.{en,fr}.ts`.                                                                                                                                                                                |
| O12 | **The ledger panel in the control tower carries no figures.** SYSCOHADA account codes and amounts are not in the source documents, and the section arguing the ledger is trustworthy is the worst place on the site to invent one. Each row shows its milestone and an em dash.                                                                                                                      | `home.{en,fr}.ts` → `tower.ledgerAmount`.                                                                                                                                                          |
| O13 | **The apex is not idle.** `praxisls.com` is in `PLATFORM_HOSTS` and the mail OAuth callback is designed to land on it (`LANDING_PAGE_GUIDE.md` §7). Whether it is live for OAuth today depends on what production sets for `MS_GRAPH_REDIRECT_URI` / `GOOGLE_REDIRECT_URI`. **Check that before repointing anything.** DNS and deployment are out of scope here; §5 records what this build assumes. | `public/_redirects`.                                                                                                                                                                               |
| O14 | **Smart Logistics' sector.** §3.3 says they consented to their name, their logo and **their sector** being published — and then does not say what the sector is. The page therefore does not name it. One sentence from whoever holds the consent closes this.                                                                                                                                       | `customers.{en,fr}.ts`.                                                                                                                                                                            |
| O15 | **Smart Logistics' logo.** Consented to, per §3.3, and not provided. The page carries no logo rather than a box where one should be.                                                                                                                                                                                                                                                                 | `customers.{en,fr}.ts`.                                                                                                                                                                            |
| O16 | **Written approval of the case-study page.** Guide §9's launch checklist requires it, and this page has not been through it. It was written to be approvable — every sentence is either §3.3 or a statement about what §3.3 withholds — but that is not the same as approved.                                                                                                                        | —                                                                                                                                                                                                  |
| O17 | **All of the drafted copy on the six new pages.** Listed page by page in §7. Nothing on any of them is specified by the guide beyond the slug.                                                                                                                                                                                                                                                       | `solutions.{en,fr}.ts`, `customers.{en,fr}.ts`.                                                                                                                                                    |
| O18 | **Whether the module-group → solution-page mapping is the one you want.** Thirteen groups, five pages, four of them defensible two ways. One table, D13, and G8 argues the guide should settle it.                                                                                                                                                                                                   | `src/content/coverage-links.ts`.                                                                                                                                                                   |

---

## 4. Measurements

All numbers below were **measured on this branch**, not estimated.

### Lighthouse — mobile, both languages

Lighthouse CI, `lighthouserc.cjs`, three runs per URL, medians reported.
Emulation is Lighthouse's standard mobile profile — 412×823 at DPR 1.75,
150 ms RTT, 1 638 Kbps, 4× CPU slowdown — which is the guide's "Slow 4G /
mid-range Android" (§6). Reports are uploaded as a CI artifact on every run.

| URL                                        | Perf | A11y | Best practices | SEO | FCP      | **LCP**      | CLS   | TBT  | Total weight |
| ------------------------------------------ | ---- | ---- | -------------- | --- | -------- | ------------ | ----- | ---- | ------------ |
| `/en/`                                     | 99   | 100  | 100            | 100 | 1 357 ms | **1 807 ms** | 0.010 | 0 ms | 173 KiB      |
| `/fr/`                                     | 99   | 100  | 100            | 100 | 1 359 ms | **1 809 ms** | 0.005 | 0 ms | 174 KiB      |
| `/en/solutions/freight-forwarding-customs` | 100  | 100  | 100            | 100 | 1 206 ms | **1 506 ms** | 0.017 | 0 ms | 144 KiB      |
| `/fr/solutions/transit-douane`             | 100  | 100  | 100            | 100 | 1 205 ms | **1 655 ms** | 0.000 | 0 ms | 144 KiB      |
| `/en/solutions/platform-it`                | 100  | 100  | 100            | 100 | 1 206 ms | **1 506 ms** | 0.000 | 0 ms | 144 KiB      |
| `/fr/solutions/plateforme-dsi`             | 100  | 100  | 100            | 100 | 1 206 ms | **1 506 ms** | 0.012 | 0 ms | 144 KiB      |
| `/en/customers/smart-logistics`            | 100  | 100  | 100            | 100 | 1 204 ms | **1 654 ms** | 0.000 | 0 ms | 143 KiB      |
| `/fr/references/smart-logistics`           | 100  | 100  | 100            | 100 | 1 205 ms | **1 655 ms** | 0.000 | 0 ms | 143 KiB      |
| `/en/contact`                              | 100  | 100  | 100            | 100 | 1 204 ms | **1 506 ms** | 0.000 | 0 ms | 144 KiB      |
| `/fr/contact`                              | 100  | 100  | 100            | 100 | 1 207 ms | **1 508 ms** | 0.000 | 0 ms | 144 KiB      |

Ten URLs, both languages, every page type this change adds. LCP lands on one of
three values — 1 506, 1 655, 1 807 — and never between them; that quantisation
is the subject of "LCP, measured five more ways" below, and it is the reason
the two French pages that read 1 655 above are not a French regression: the same
page reads 1 506 on another run.

CI asserts against six of these ten (`lighthouserc.cjs`): both homepages, the
heaviest solution page in each language, and both contact pages. Ten URLs at
three runs each is more than a CI job should spend before people start skipping
it; the other four were measured the same way for this table.

`/en/security`, measured on a single run during the first change for reference:
performance 100, FCP 1 204 ms, **LCP 1 504 ms**.

### Against the budgets in N9

| Budget                          | Target         | Measured                        |     |
| ------------------------------- | -------------- | ------------------------------- | --- |
| Lighthouse, all four categories | ≥ 95           | 99–100, both languages          | ✅  |
| CLS                             | < 0.05         | 0.000–0.010                     | ✅  |
| INP (TBT as the lab proxy)      | < 200 ms       | 0 ms                            | ✅  |
| JS shipped, compressed          | < 100 KB       | **2.8 KB** on the heaviest page | ✅  |
| Total page weight               | < 600 KB       | **188 KB** on the heaviest page | ✅  |
| LCP                             | **< 1 500 ms** | **1 506–1 809 ms**              | ❌  |

The page-weight number moved from 172 KiB to 188 KB because `check:budget`
counts every asset a page references, and a theme-aware screenshot references
two. **A reader downloads one.** Proved rather than assumed: driving the page
with a scroll and recording every request for `/screens/` returns
`general-ledger--dark--fr.png` under the dark theme and
`general-ledger--light--fr.png` under the light one, one file each time. The
budget check keeps counting both, because a checker that models lazy loading is
a checker that can be wrong in the reader's favour.

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

### LCP, measured five more ways — and what closed instead

**The brief for this change was: close the LCP gap if it can be closed without
trading away the display face or adding a heavy build dependency. It cannot,
and here is the evidence rather than the opinion.** The two candidates the first
change proposed have now been built and measured. Both move LCP by nothing.

Every row is three runs, median, same mobile profile, `/en/` and `/en/contact`:

| Variant                                                                                | `/en/` FCP   | `/en/` LCP   | `/en/contact` LCP |
| -------------------------------------------------------------------------------------- | ------------ | ------------ | ----------------- |
| **A — as shipped** (variable display face, 45.7 KB, preloaded)                         | 1 355 ms     | **1 808 ms** | 1 504 ms          |
| B — `fetchpriority="high"` on the font preload                                         | 1 357 ms     | 1 807 ms     | 1 506 ms          |
| C — display face as **two static instances** (400 + 600), preload the 600              | 1 508 ms     | 1 958 ms     | 1 355 ms          |
| C2 — display face as **one static instance** (600, 24.2 KB), everything display at 600 | 1 360 ms     | 1 810 ms     | 1 505 ms          |
| E — `font-display: optional` on the display face                                       | 1 355 ms     | 1 805 ms     | 1 655 ms          |
| G — all three faces instanced down to **81 KB of fonts** in total (from 132 KB)        | **1 207 ms** | 1 806 ms     | 1 506 ms          |

Read it row by row:

- **Candidate 1 — instance the display face — is retired.** C2 halves the file
  that paints every `<h1>` (45.7 KB → 24.2 KB) and LCP does not move: 1 810 ms
  against 1 808 ms. C, which ships the 400 weight as a second file so eyebrows
  keep their weight, makes the homepage **worse** by exactly one round trip —
  a seventh request against a six-connection HTTP/1.1 harness. The first change
  estimated this change at ~150 ms; measured, it is 2 ms, and it costs either a
  weight or a request.
- **Candidate 2 — `font-display: optional` — is retired too**, and it is the
  more interesting one. The reasoning was "LCP collapses onto FCP because the
  heading never repaints". E says 1 805 ms.
- **What did move, and what it says.** G cuts the _total_ font payload from
  132 KB to 81 KB by instancing all three families down to one weight each — a
  brand change nobody has approved, run purely as a measurement — and **FCP
  improves by a full 150 ms while LCP stays at 1 806 ms.**

The reason all three behave like that is visible in the trace. In the recorded
page load, `observedFirstContentfulPaint` and `observedLargestContentfulPaint`
are **the same instant** (148 ms): the `<h1>` paints once, and the font swap
never produces a second LCP candidate. Driving the same page in a real Chrome
under the same throttling over the DevTools protocol — 150 ms RTT, 1 638 Kbps,
4× CPU — gives one LCP candidate at **588 ms**, equal to FCP, with the display
face arriving at 914 ms and the other two at 1.3 s, changing nothing.

**So the 1.8 s is Lantern's simulation of the LCP element's dependency graph,
which includes the webfont request whatever `font-display` says and whatever the
paint actually did.** That is why the number lands on 1 506 / 1 655 / 1 807 and
never between them: it is FCP plus a whole number of round trips, and the levers
available in this repository move bytes, not round trips.

What follows from that, honestly stated:

1. **The pages are not slow.** The heading paints at first paint, on every page,
   in both languages, and CLS/TBT/JS/weight all sit well inside budget.
2. **The remaining gap is a transport and hosting question**, not a page one:
   fewer round trips means a warm HTTP/2 (or HTTP/3) connection and an edge
   close to Douala and Abidjan. Measuring that here is not possible honestly —
   serving `dist/` over local TLS + HTTP/2 made both numbers _worse_ (FCP
   1 651 ms, LCP 2 101 ms) because the handshake is real and the CDN is not.
   The apex plan in §5 is where this gets decided.
3. **Candidate 3 from the first change — splitting the homepage's critical CSS —
   is still untested**, and it is now the only one left. What G proves is that
   it would move FCP; what G also proves is that moving FCP by 150 ms moved LCP
   by 2 ms. Do it for the reader, not for the score.

Nothing from this investigation is shipped. The fonts, the preload and
`font-display: swap` are exactly as the first change left them.

### The CLS regression this change introduced, and removed

`/fr/solutions/plateforme-dsi` measured **CLS 0.106** on its first run — two of
three runs — against a 0.05 budget. It was not the page: it was the language
banner, which rendered `hidden` and was revealed by its island. On a page where
the island happens to run after the first paint, revealing the first element in
the body moves the whole document down. Every French page could do it; this one
did it reproducibly.

Fixed by deciding the banner in the same inline head script that decides the
theme, before first paint (D16).

| Page                           | Before              | After     |
| ------------------------------ | ------------------- | --------- |
| `/fr/solutions/plateforme-dsi` | 0.106 (2 of 3 runs) | **0.012** |

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
| `hreflang` + canonical correct on every page; one `<h1>`; `lang` per tree | `npm run check:links`  | **29 pages**, all internal links resolve, no page missing `fr`/`en`/`x-default`, and every Open Graph card a page names exists.         |
| No raw hex outside the vendored token file (N3)                           | `npm run check:hex`    | Clean. The check reads every `.astro`, `.css`, `.ts`, `.js`, `.svg` and `.json` in the repo.                                            |
| No font named outside the three permitted families (N5)                   | `npm run check:fonts`  | Clean, fallback stacks included — every stack ends in a bare generic keyword.                                                           |
| The vendored tokens are byte-identical to upstream (N2)                   | `npm run check:brand`  | `identical to praxis-ls (git show 807fc1a:packages/brand/tokens.css) ✓`                                                                 |
| JS and page-weight budgets                                                | `npm run check:budget` | 2.8 KB JS compressed, 188 KB heaviest page (counting both captures of every theme-aware screenshot; a reader fetches one).              |
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

**The Solutions menu was driven from the keyboard and the results recorded**,
because "keyboard-complete" is the kind of claim that is made and not checked
(`Escape` on a disclosure is the usual casualty). Driven with Playwright against
the built site, on the French tree:

| Step                         | Result                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| Tab from the top of the page | reaches the button in 6 stops                                      |
| Enter                        | opens, `aria-expanded="true"`                                      |
| Tab                          | lands on « Transit et dédouanement »                               |
| Escape                       | closes, focus back on the button                                   |
| ArrowDown                    | opens and moves to the first link                                  |
| Tab out of the menu          | closes                                                             |
| Click outside                | closes                                                             |
| On `/fr/solutions/flotte`    | button marked current, « Flotte » `aria-current`                   |
| Mobile (390 px): the sheet   | one sheet, 10 links, 5 of them solutions, **0 nested disclosures** |

**One real bug was found doing it, and it was the first change's, not this
one's.** Opening the mobile sheet from the keyboard leaves focus on the burger,
which is _outside_ the sheet — and the Escape handler was bound to the sheet, so
it never saw that reader's key. The reader most likely to press Escape was the
one it did not work for. The listener is now on the header, which contains both,
and the table row above is that case passing.

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

## 6. Screenshots and cards — the swap procedure

The twelve files in `public/screens/` are **placeholders and look like it**: a
flat panel at the capture script's exact geometry (1600×1000) in the theme's
dominant tones, with the filename and the word PLACEHOLDER on it. They draw no
interface — no toolbar, no table, no numbers — because a hand-drawn "product"
screenshot that ships is worse than an obvious placeholder.

**All twelve are now on a page**, which they were not after the first change:

| Screen           | Where                                                           | Themes shipped                 |
| ---------------- | --------------------------------------------------------------- | ------------------------------ |
| `operation-file` | The homepage hero, both languages                               | dark only (D6 — critical path) |
| `control-tower`  | `/solutions/freight-forwarding-customs`, `/solutions/warehouse` | dark **and** light (D11)       |
| `general-ledger` | `/solutions/finance-ohada`, `/solutions/platform-it`            | dark **and** light (D11)       |

The reader downloads one of each pair: the hidden one is `display: none`, has no
layout box, never intersects the viewport, and is therefore never fetched by a
lazy loader. Switching the theme fetches the other one at that moment.

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

**The Open Graph cards.** Fourteen now: two site-wide (one per language) and one
per language for each of the six pages that earn their own (D14). The per-page
cards are drawn from the **built** page's eyebrow and `<h1>`, so the order is
`npm run build` then `npm run assets`; the script errors rather than rendering a
stale card if `dist/` is missing. `npm run check:links` fails when a page names
a card that is not in `dist/og/`, which is the only guard that catches a card
nobody has looked at — no browser requests it and no reader sees it until it is
already in somebody's group chat.

---

## 7. Draft copy — every page and section awaiting approval

Everything in this list is **`DRAFT COPY — needs review`**. Nothing in it is
specified by `LANDING_PAGE_GUIDE.md`; it is drafted from the README module map,
the glossary and the homepage's voice.

| Where                                             | What is drafted                                                                                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage §8 (Coverage)                            | Heading, intro, and all thirteen group names + one-liners, both languages.                                                                                                                                                                                    |
| Homepage §13 (Pricing shape)                      | Heading, intro, and the French tier descriptions. EN tier text is verbatim.                                                                                                                                                                                   |
| Homepage §7 (By role)                             | The four **tab labels** in French. The four lines are verbatim in both languages.                                                                                                                                                                             |
| Homepage §12 outlet link                          | "See the standards page" / « Voir la page des normes ».                                                                                                                                                                                                       |
| Every `meta description`, both languages          | Written per page by hand, never generated (guide §5) — but not specified.                                                                                                                                                                                     |
| `/security`                                       | Intro, "The six controls" heading, the certification line, four FAQ entries. Heading and the six controls are verbatim.                                                                                                                                       |
| `/standards`                                      | Intro and the "How this table is kept" block. Table and note verbatim.                                                                                                                                                                                        |
| `/pricing`                                        | Intro, add-ons wording, the metered-AI block, the quotation block, four FAQ entries.                                                                                                                                                                          |
| `/about`                                          | The entire page.                                                                                                                                                                                                                                              |
| `/contact`                                        | Field labels, hints, error messages, the confirmation, the free-provider notice. Field NAMES are from §4.                                                                                                                                                     |
| `/legal/privacy`, `/legal/terms`                  | The stub text.                                                                                                                                                                                                                                                |
| Site chrome (`src/i18n/ui.ts`)                    | Footer column headings, the theme toggle's accessible names, the language banner's action and dismiss labels, the placeholder badge.                                                                                                                          |
| Open Graph card lines                             | Uses the verbatim eyebrow and H1 per language; layout is drafted.                                                                                                                                                                                             |
| **The five solution pages** (both languages)      | **Everything.** Meta title and description, eyebrow, H1, intro, the "what it covers" list, the posting argument and its chain, screenshot alt text, the closing line. The guide gives these pages their slugs and their SEO job (§5) and none of their words. |
| **`/customers/smart-logistics`** (both languages) | Everything except the lead sentence, which is §3.3 verbatim: the four facts drawn out of that sentence, the sanitisation paragraph, the line about what is absent, the close.                                                                                 |
| Solution navigation labels and blurbs             | The five labels and one-liners used by the header menu, the footer and each page's related-pages block (`navLabel`, `navBlurb`).                                                                                                                              |
| The module-group → solution-page mapping          | `src/content/coverage-links.ts`. Not copy, but a content decision that shows on the homepage. See O18 and G8.                                                                                                                                                 |

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

**G7 — Five pages cannot rank for five phrases, and the guide says they will.**
§5 lists _logiciel transitaire Cameroun_, _ERP OHADA_, _logiciel de
dédouanement_, _comptabilité SYSCOHADA_, _freight forwarding software Africa_
and then says "the five solution pages exist to rank for these". The pages are
written for those phrases — each one carries its phrases in the title, the H1
and the intro, in the language the phrase is typed in — and that is the part a
build can do. The part it cannot do is the rest of ranking: nobody links to a
five-page site, and §10 puts `/docs` and a changelog in the "next" pile. If
these phrases matter, the published-artefacts plan in §10 is not "next", it is
the same project. **Ship the pages, then commit to the cadence** — otherwise
five pages will be judged against a target they were never able to reach alone.

**G8 — §3.8 assumes every module group has an obvious solution page. Four of
them do not.** Thirteen groups over five pages: dashboard, HR, procurement,
document vault and system/security each have a defensible home on two different
pages, and the guide leaves the mapping to whoever writes the grid. D13 records
the calls I made and `coverage-links.ts` makes them reviewable in one screen,
but the guide should name the mapping — it is an information-architecture
decision about how a reader moves through the site, and it will otherwise be
re-litigated every time somebody edits the grid.

**G9 — The one-page-per-customer shape does not survive one customer.**
Decision 11 is "one named case study — Smart Logistics, sanitised", and §3.3
gives exactly one sentence about them. That produces a page which is honest,
short, and mostly about what it will not say. I think it is worth publishing —
`/customers/smart-logistics` is where a prospect who has heard the name goes,
and finding a page that says "here is what they let us publish, and here is what
they did not" is better than a 404 — but it is not a case study, and calling it
one in the navigation would be a promise the page does not keep. The label in
the footer is "Customers" / « Références » for that reason. **The fix is not
more words: it is fifteen minutes with Smart Logistics and something they are
happy to be quoted on** (O14–O16).
