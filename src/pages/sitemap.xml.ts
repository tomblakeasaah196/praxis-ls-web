/**
 * One sitemap, both language trees, with hreflang alternates on every URL
 * (guide §5).
 *
 * Generated from the slug map rather than from the file system: the file system
 * knows that /fr/tarifs exists, but only the map knows it is the same page as
 * /en/pricing, and the alternates are the half of this file that does any work.
 *
 * Routes that are not built yet are left out. A sitemap that advertises a URL
 * which 404s is worse than a smaller sitemap — it is a crawl budget spent on
 * nothing and an error in Search Console every week until it is fixed.
 */
import type { APIRoute } from "astro";
import { BUILT_ROUTES, HTML_LANG, LOCALES, ROUTES, absoluteHref } from "~/i18n/routes";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://praxisls.com");

  const urls = BUILT_ROUTES.flatMap((key) =>
    LOCALES.map((locale) => {
      const alternates = LOCALES.map(
        (other) =>
          `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[other]}" href="${absoluteHref(key, other, origin)}"/>`,
      ).join("\n");
      return [
        "  <url>",
        `    <loc>${absoluteHref(key, locale, origin)}</loc>`,
        alternates,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteHref(key, "en", origin)}"/>`,
        `    <priority>${ROUTES[key].section === "home" ? "1.0" : ROUTES[key].section === "legal" ? "0.3" : "0.8"}</priority>`,
        "  </url>",
      ].join("\n");
    }),
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
