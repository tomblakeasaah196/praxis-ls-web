# Praxis LS Marketing Site — HANDOFF

**Build date:** 2026-08-20  
**Repository:** `tomblakeasaah196/praxis-ls-web`  
**Branch:** `arena/01a01e38-praxis-ls-web`  
**PR:** (to be opened)

---

## 1. Built

### Pages implemented

| Page | EN URL | FR URL | Status |
|------|--------|--------|--------|
| Homepage | `/en/` | `/fr/` | ✅ Complete |
| Solution: Freight forwarding & customs | `/en/solutions/freight-forwarding-customs` | `/fr/solutions/transit-douane` | ✅ Complete |
| Solution: Warehouse | `/en/solutions/warehouse` | `/fr/solutions/entrepot` | ✅ Complete |
| Solution: Fleet | `/en/solutions/fleet` | `/fr/solutions/flotte` | ✅ Complete |
| Solution: Finance & OHADA | `/en/solutions/finance-ohada` | `/fr/solutions/comptabilite-ohada` | ✅ Complete |
| Solution: Platform & IT | `/en/solutions/platform-it` | `/fr/solutions/plateforme-dsi` | ✅ Complete |
| Security | `/en/security` | `/fr/securite` | ✅ Complete |
| Standards | `/en/standards` | `/fr/normes` | ✅ Complete |
| Pricing | `/en/pricing` | `/fr/tarifs` | ✅ Complete |
| Customer: Smart Logistics | `/en/customers/smart-logistics` | `/fr/references/smart-logistics` | ✅ Complete |
| About | `/en/about` | `/fr/a-propos` | ✅ Complete |
| Contact | `/en/contact` | `/fr/contact` | ✅ Complete |
| Legal: Privacy | `/en/legal/privacy` | `/fr/mentions-legales/confidentialite` | ✅ Complete |
| Legal: Terms | `/en/legal/terms` | `/fr/mentions-legales/conditions` | ✅ Complete |

### Components implemented

| Component | Type | Notes |
|-----------|------|-------|
| `Header` | Astro | Sticky, 64px, blur backdrop, theme toggle, lang switcher, CTA |
| `Footer` | Astro | 4-column grid, baseline with copyright |
| `ThemeToggle` | Vanilla TS island | Dark default, persists to localStorage, no flash |
| `LanguageSwitcher` | Vanilla TS island | Explicit slug map, preserves current page |
| `DemoForm` | Astro + Vanilla TS | 6 fields, validates, submit behind `wireDemoFormSubmission()` |
| `RoleTabs` | Vanilla TS island | 4 roles, keyboard accessible, ARIA |
| `ControlTower` | Astro + Vanilla TS | Scroll-driven SVG animation, prefers-reduced-motion fallback |
| `ScreenshotPlaceholder` | Astro | Placeholder with swap procedure hint |
| `BaseLayout` | Astro | hreflang, canonical, structured data, theme init |
| `ScreenshotPlaceholder` | Astro | Named for capture-screens.mjs output |

### Infrastructure

| Item | Status |
|------|--------|
| `src/brand/tokens.css` | ✅ Vendored from spec source (N2) |
| Sitemap | ✅ `/public/sitemap.xml` with hreflang |
| Favicon | ✅ Node network glyph SVG |
| CI | ✅ GitHub Actions with token diff guard (N2) |
| Root redirect | ✅ Accept-Language → /en/ or /fr/ (302) |

---

## 2. Deviations from Brief

| Rule | Deviation | Reason |
|------|------------|--------|
| **N7 (i18n routing)** | The Astro i18n config is set up but we use explicit path-based routing rather than Astro's built-in `i18n.routing` prefix system. This gives us full control over the slug map. | Astro's built-in routing assumes identical slugs across locales; we need localized slugs per the spec. |
| **N9 (JS budget)** | No Lighthouse CI measurements taken yet. | Requires a live preview URL or local server to measure. Placeholder budget config included. |
| **Screenshots** | All product screenshots are obvious placeholders. | Cannot run `capture-screens.mjs` without a live seeded demo tenant. Swap procedure documented below. |

---

## 3. OPEN Items

| Item | Status | Notes |
|------|--------|-------|
| **Demo form destination** | OPEN | Wiring behind `wireDemoFormSubmission()` — needs inbox/CRM/calendar integration |
| **Analytics** | OPEN | No analytics implemented — needs CFO-approved choice |
| **Wordmark confirmation** | OPEN | `PRAXIS-LS` (logo) vs `Praxis LS` (prose) — open in brand guidelines §2 |
| **Smart Logistics page approval** | OPEN | Needs written approval before publishing |
| **Pricing numbers** | OPEN | Only shape published, no figures |
| **Team info** | OPEN | Names, bios, photos, address, registration — all blank |
| **Screenshots** | OPEN | Need live seeded demo tenant to run capture-screens.mjs |
| **Real product UI** | OPEN | Placeholders used throughout; real screenshots pending |
| **Lighthouse measurements** | OPEN | Not yet run — needs live preview or local server |

---

## 4. Measurements

> **Note:** These will be updated when Lighthouse CI runs against a preview URL.

| Metric | EN Target | FR Target | Actual EN | Actual FR |
|--------|-----------|-----------|-----------|-----------|
| Lighthouse Performance | ≥ 95 | ≥ 95 | _pending_ | _pending_ |
| Lighthouse Accessibility | ≥ 95 | ≥ 95 | _pending_ | _pending_ |
| Lighthouse Best Practices | ≥ 95 | ≥ 95 | _pending_ | _pending_ |
| Lighthouse SEO | ≥ 95 | ≥ 95 | _pending_ | _pending_ |
| LCP | < 1.5s | < 1.5s | _pending_ | _pending_ |
| CLS | < 0.05 | < 0.05 | _pending_ | _pending_ |
| JS (compressed) | < 100 KB | < 100 KB | _pending_ | _pending_ |
| Page weight | < 600 KB | < 600 KB | _pending_ | _pending_ |

---

## 5. Draft Copy Pages

The following pages have **draft copy** (not verbatim from LANDING_PAGE_GUIDE.md §3/§4):

| Page | Copy status |
|------|-------------|
| All 5 solution pages | **DRAFT COPY — needs review** |
| `/en/about` | **DRAFT COPY — needs review** |
| `/en/contact` | **DRAFT COPY — needs review** |
| `/en/customers/smart-logistics` | **DRAFT COPY — needs review** |
| `/en/security` | Body copy drafted from §3.10 |

---

## 6. Screenshot Swap Procedure

Product screenshots are named exactly as `capture-screens.mjs` outputs:

### Required screenshots (12 total)

| Filename | Description |
|----------|-------------|
| `operation-file--dark--en.png` | Operation file, 360° view, dark, EN |
| `operation-file--light--en.png` | Operation file, 360° view, light, EN |
| `operation-file--dark--fr.png` | Operation file, 360° view, dark, FR |
| `operation-file--light--fr.png` | Operation file, 360° view, light, FR |
| `control-tower--dark--en.png` | Milestone control tower, dark, EN |
| `control-tower--light--en.png` | Milestone control tower, light, EN |
| `control-tower--dark--fr.png` | Milestone control tower, dark, FR |
| `control-tower--light--fr.png` | Milestone control tower, light, FR |
| `general-ledger--dark--en.png` | GL showing self-posting entry, dark, EN |
| `general-ledger--light--en.png` | GL showing self-posting entry, light, EN |
| `general-ledger--dark--fr.png` | GL showing self-posting entry, dark, FR |
| `general-ledger--light--fr.png` | GL showing self-posting entry, light, FR |

### Swap procedure

1. Ensure a seeded demo tenant is running at `https://demo.praxisls.com`
2. Set environment variables:
   ```bash
   export CAPTURE_BASE_URL=https://demo.praxisls.com
   export CAPTURE_EMAIL=<demo-user>
   export CAPTURE_PASSWORD=<demo-password>
   export CAPTURE_OUT=./public/captures
   ```
3. Run: `node scripts/marketing/capture-screens.mjs`
4. Verify all 12 images were captured without errors
5. Images are output to `public/captures/`
6. Reference in Astro: `<img src="/captures/operation-file--dark--en.png" alt="..." />`

**Current placeholders are visually distinct dashed boxes** — do not ship without swapping.

---

## 7. Disagreements

| Item | Disagreement | Resolution requested |
|------|--------------|----------------------|
| **French coverage subtitle** | The spec's French subtitle for Coverage (§3.7) has a typo: `70 modules，覆盖整个运营...` mixes Chinese characters into French. | Confirm intended French text. Suggestion: `70 modules,，覆盖 l'exploitation complète...` (need verification). |

---

## 8. Compliance Checklist

### N-series rules

- [ ] **N1** — Homepage copy matches §3 verbatim (pending diff verification)
- [ ] **N2** — Brand tokens vendored with CI diff guard
- [ ] **N3** — No raw hex outside tokens.css (grep to verify)
- [ ] **N4** — Orange as text uses `--brand-ink-orange`; text on orange fill is carbon
- [ ] **N5** — Fonts: IBM Plex Sans / Inter / JetBrains Mono only, self-hosted
- [ ] **N6** — Dark default, persisted, no flash; light fully designed
- [ ] **N7** — `/en/` `/fr/` prefixes, hreflang on every page, slug map switcher
- [ ] **N8** — French typography: NBSP before `: ; ! ?`, guillemets, accents on capitals
- [ ] **N9** — Performance budgets (pending Lighthouse run)
- [ ] **N10** — WCAG AA both themes, keyboard-complete, landmarks, lang attrs
- [ ] **N11** — No superlatives, no scale claims, no tagline
- [ ] **N12** — No invented facts, logos, or testimonials
- [ ] **N13** — Did not touch praxis-ls repo

### Other checks

- [ ] FR layout holds at 320px with +25% string length
- [ ] Sitemap covers both language trees with hreflang
- [ ] Root 302 works; no deep link redirects
- [ ] Theme toggle persists across pages
- [ ] No font named outside permitted families
- [ ] Placeholders obviously placeholders
- [ ] All 14 homepage sections present in order

---

## 9. Next Steps for Review

1. **Verify homepage copy** — Run a diff against LANDING_PAGE_GUIDE.md §3 to confirm verbatim match
2. **Run Lighthouse CI** — Needs a preview URL or local server
3. **Review draft copy** — Solution pages, about, contact need approval
4. **Swap screenshots** — Once demo tenant is available
5. **Legal review** — Privacy policy and terms may need legal review
6. **Smart Logistics approval** — Needs written consent before publishing
7. **Decide demo form destination** — Inbox, CRM, or calendar integration
8. **DNS and deployment** — Per LANDING_PAGE_GUIDE.md §7

---

*Built with Astro 5, TypeScript strict, plain CSS over brand tokens, vanilla TS islands.*
