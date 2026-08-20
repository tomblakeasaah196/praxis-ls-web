// @ts-check
import { defineConfig } from "astro/config";

/**
 * praxisls.com — static, bilingual, no SPA framework.
 *
 * i18n is deliberately NOT delegated to Astro's `i18n` option. That option
 * assumes the same slug in every locale (`/en/pricing` ⇄ `/fr/pricing`), and
 * doc/LANDING_PAGE_GUIDE.md §2 requires localised slugs (`/fr/tarifs`). Routes
 * are therefore written out per locale under src/pages/{en,fr}/ and the
 * equivalence between them lives in ONE place, src/i18n/routes.ts, which the
 * switcher, the hreflang tags and the sitemap all read. There is no homepage
 * fallback anywhere in that path — an unmapped route is a build error.
 *
 * The single redirect in the system is the bare root (WEB_BUILD_BRIEF N7). It
 * is a host-level 302 on Accept-Language and lives in public/_redirects; a
 * static build cannot read a request header, so it cannot live here. See
 * HANDOFF.md § "The root redirect".
 */
export default defineConfig({
  site: "https://praxisls.com",
  output: "static",
  trailingSlash: "ignore",
  build: {
    /* Inline the CSS into every page rather than linking it.
     *
     * The budget that decides this is LCP under 1.5s on Slow 4G, where the
     * simulated request latency is around 560ms. A linked stylesheet is a
     * render-blocking round trip on top of the HTML's — worth roughly a third
     * of the entire LCP budget — and the sheet is small enough that carrying
     * it in the document costs less than fetching it. Measured both ways; the
     * numbers are in HANDOFF.md.
     */
    inlineStylesheets: "always",
    format: "directory",
  },
});
