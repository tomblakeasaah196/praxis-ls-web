/**
 * The slug map — one table, read by the language switcher, the hreflang tags,
 * the navigation, the sitemap and the link checker.
 *
 * doc/LANDING_PAGE_GUIDE.md §2 localises every slug, because a French URL that
 * reads `/fr/solutions/freight-forwarding` tells the reader the French is a
 * skin over an English site. That means `/en/pricing` and `/fr/tarifs` are the
 * same page under two names, and something has to know it. This is that
 * something, and it is the ONLY thing that knows it (N7).
 *
 * The rule the guide is emphatic about: **the switcher never falls back to the
 * homepage.** It cannot, here — `alternateOf()` takes a path and returns the
 * other language's path or throws. A route added in one language and forgotten
 * in the other is a build failure, not a reader silently deposited on `/fr/`.
 */

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

/** `x-default` points at English per LANDING_PAGE_GUIDE.md §2. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", fr: "FR" };

/** The `lang` attribute and the `hreflang` value. Regionless on purpose: the
 *  French is written for OHADA's seventeen member states, not for France. */
export const HTML_LANG: Record<Locale, string> = { en: "en", fr: "fr" };

/**
 * A page, identified by a key that never changes, with one slug per locale.
 *
 * `slug` is the path AFTER the locale prefix, without leading or trailing
 * slashes. The homepage is the empty string.
 */
export interface RouteEntry {
  readonly slug: Record<Locale, string>;
  /** Where this page sits in the site's shape — used by the sitemap's priority
   *  hint and by nothing else. Kept honest rather than tuned. */
  readonly section: "home" | "solutions" | "company" | "legal";
}

export const ROUTES = {
  home: { slug: { en: "", fr: "" }, section: "home" },

  "solutions/freight-forwarding-customs": {
    slug: { en: "solutions/freight-forwarding-customs", fr: "solutions/transit-douane" },
    section: "solutions",
  },
  "solutions/warehouse": {
    slug: { en: "solutions/warehouse", fr: "solutions/entrepot" },
    section: "solutions",
  },
  "solutions/fleet": {
    slug: { en: "solutions/fleet", fr: "solutions/flotte" },
    section: "solutions",
  },
  "solutions/finance-ohada": {
    slug: { en: "solutions/finance-ohada", fr: "solutions/comptabilite-ohada" },
    section: "solutions",
  },
  "solutions/platform-it": {
    slug: { en: "solutions/platform-it", fr: "solutions/plateforme-dsi" },
    section: "solutions",
  },

  security: { slug: { en: "security", fr: "securite" }, section: "company" },
  standards: { slug: { en: "standards", fr: "normes" }, section: "company" },
  pricing: { slug: { en: "pricing", fr: "tarifs" }, section: "company" },
  "customers/smart-logistics": {
    slug: { en: "customers/smart-logistics", fr: "references/smart-logistics" },
    section: "company",
  },
  about: { slug: { en: "about", fr: "a-propos" }, section: "company" },
  contact: { slug: { en: "contact", fr: "contact" }, section: "company" },

  "legal/privacy": {
    slug: { en: "legal/privacy", fr: "mentions-legales/confidentialite" },
    section: "legal",
  },
  "legal/terms": {
    slug: { en: "legal/terms", fr: "mentions-legales/conditions" },
    section: "legal",
  },
} as const satisfies Record<string, RouteEntry>;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/**
 * Which routes are BUILT in this repository right now.
 *
 * It is empty: every route in the map above has a page in both languages. The
 * set stays because it is the mechanism that let the slug map, the switcher and
 * the sitemap be written once, before the pages existed, and be correct when
 * they arrived — the five solution pages and the case study sat in here through
 * the first change and came out of it in the second, one entry at a time, as
 * each page landed. The next page to be planned before it is written goes in
 * here rather than into a comment.
 *
 * Anything listed here is left out of the sitemap and out of the footer, and
 * `npm run check:links` fails on any link to it.
 */
export const UNBUILT_ROUTES = new Set<RouteKey>([]);

export const BUILT_ROUTES: RouteKey[] = ROUTE_KEYS.filter((key) => !UNBUILT_ROUTES.has(key));

export function isBuilt(key: RouteKey): boolean {
  return !UNBUILT_ROUTES.has(key);
}

/** `/en/pricing`, `/fr/tarifs`, `/en/` — always absolute, always prefixed. */
export function href(key: RouteKey, locale: Locale): string {
  const slug = ROUTES[key].slug[locale];
  return slug === "" ? `/${locale}/` : `/${locale}/${slug}`;
}

/** The absolute URL, for canonical, hreflang, OG and the sitemap. */
export function absoluteHref(key: RouteKey, locale: Locale, site: URL | string): string {
  return new URL(href(key, locale), site).toString();
}

/**
 * The equivalent page in the other language.
 *
 * Throws rather than guessing. The guide's requirement is that the switcher
 * "must never dump the reader on the homepage"; the only way to guarantee that
 * is to make the absence of a mapping stop the build.
 */
export function alternateOf(key: RouteKey, locale: Locale): string {
  const entry = ROUTES[key];
  if (!entry) throw new Error(`No route registered under "${key}" — add it to ROUTES.`);
  const slug = entry.slug[locale];
  if (slug === undefined) {
    throw new Error(`Route "${key}" has no ${locale} slug. Localised slugs are required (N7).`);
  }
  return href(key, locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Reverse lookup, used by the link checker to prove every built URL is mapped. */
export function routeOfPath(pathname: string): { key: RouteKey; locale: Locale } | null {
  const normalised = pathname.replace(/\/+$/, "").replace(/^\/+/, "");
  const [maybeLocale, ...rest] = normalised.split("/");
  if (!maybeLocale || !LOCALES.includes(maybeLocale as Locale)) return null;
  const locale = maybeLocale as Locale;
  const slug = rest.join("/");
  for (const key of ROUTE_KEYS) {
    if (ROUTES[key].slug[locale] === slug) return { key, locale };
  }
  return null;
}
