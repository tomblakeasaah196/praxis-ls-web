# praxisls.com

The public marketing site for Praxis LS. Astro 5, static output, TypeScript
strict, plain CSS over the brand tokens. Bilingual with localised slugs.

**Read [`HANDOFF.md`](./HANDOFF.md) first** — what is built, what deviates from
the brief and why, what is still open, and the measured numbers.

## The specification lives in another repository

Everything this site says comes from `tomblakeasaah196/praxis-ls` at commit
`807fc1a`, and is **read-only** from here:

| Path                          | What it is                                                 |
| ----------------------------- | ---------------------------------------------------------- |
| `doc/WEB_BUILD_BRIEF.md`      | The brief. Rules N1–N13 are what this repo is reviewed on. |
| `doc/LANDING_PAGE_GUIDE.md`   | The specification. §3 and §4 are the final copy deck.      |
| `doc/BRAND_GUIDELINES.md`     | The brand system.                                          |
| `doc/BRAND_GLOSSARY_FR_EN.md` | Every term in both languages, and the French style rules.  |
| `packages/brand/`             | The palette as code — vendored here, never forked.         |

This repository is separate from `praxis-ls` deliberately: that repository's CI
runs on every PR to `main` with no path filter, and its deploy workflow
SSH-deploys the production ERP when CI passes on `main`. A marketing copy fix
merged there would roll production.

## Getting started

```bash
npm ci
npm run dev        # http://localhost:4321/en/
```

`predev` and `prebuild` copy the three font faces out of `@fontsource-variable`
into `public/fonts/`. That directory is generated and is not committed.

## Commands

| Command                | What it does                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server.                                                                                                                            |
| `npm run build`        | Static build to `dist/`.                                                                                                               |
| `npm run verify`       | Everything CI runs, in the same order. Run this before pushing.                                                                        |
| `npm run check:brand`  | The vendored tokens are byte-identical to upstream at the pinned ref.                                                                  |
| `npm run check:hex`    | No raw hex outside `vendor/brand/tokens.css`.                                                                                          |
| `npm run check:fonts`  | Only IBM Plex Sans, Inter and JetBrains Mono are named.                                                                                |
| `npm run check:css`    | No unlayered `html`/`body`/`:root` rule reaches the shared stylesheet.                                                                 |
| `npm run check:links`  | Internal links resolve; one `h1`, canonical and hreflang on every page.                                                                |
| `npm run check:french` | French typography: narrow no-break spaces, guillemets, accented capitals.                                                              |
| `npm run check:budget` | JS and page-weight budgets.                                                                                                            |
| `npm run lighthouse`   | Lighthouse CI, mobile, both languages.                                                                                                 |
| `npm run assets`       | Regenerates the screenshot placeholders and the Open Graph cards. **Build first** — the per-page cards are drawn from the built pages. |

## Where things are

```layout
src/i18n/routes.ts        the slug map — the only thing that knows /en/pricing ⇄ /fr/tarifs
src/content/              the copy deck: one module per language, typed
src/components/home/      the fourteen homepage sections, in order
src/components/pages/     the supporting pages
src/islands/              vanilla-TS islands: theme, header, banner, tabs, tower, form
src/styles/global.css     the design system, in @layer, over the brand tokens
vendor/brand/tokens.css   the vendored palette, pinned to praxis-ls@807fc1a
```

## The rules that bite

- **Never edit `vendor/brand/tokens.css`.** Change the value upstream in
  `packages/brand`, then re-vendor and bump the pin in one commit.
- **No raw hex** outside that file. Everything reads `var(--brand-*)`.
- **Orange as text is `--brand-ink-orange`**; text on an orange fill is carbon.
- **The copy in `src/content/` is final** where the guide wrote it — the
  homepage deck and the supporting pages. If a string does not fit, move the
  layout. `solutions.{en,fr}.ts` and `customers.{en,fr}.ts` are **draft copy
  awaiting review** (HANDOFF.md §7); everything on the Smart Logistics page is
  bounded by `LANDING_PAGE_GUIDE.md` §3.3 and nothing else.
- **French is written as French**, not translated from the English (glossary
  §0), with U+202F before `: ; ! ?` and no-break spaces inside guillemets.
  `npm run check:french` enforces the mechanical half on the built HTML.
