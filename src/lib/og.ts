/**
 * Which pages get their own Open Graph card, and what it is called.
 *
 * Guide §5 asks for OG/Twitter images per language — "a French preview card on
 * a French page". The site-wide card carries the hero's eyebrow and H1, which is
 * the right card for the homepage and for the pages a reader arrives at from
 * the homepage. It is the wrong card for a page somebody pastes into a group
 * chat on its own, and those are the six pages the guide points search traffic
 * at: the five solution pages exist to rank for the phrases in §5, and the case
 * study is the one link a prospect forwards.
 *
 * The cards are rendered by scripts/render-assets.mjs FROM THE BUILT PAGE —
 * its eyebrow and its H1 — so a card cannot come to say something the page does
 * not. `npm run check:links` fails if a page names a card that is not there.
 */
import type { Locale, RouteKey } from "~/i18n/routes";

export const OG_CARD_ROUTES = new Set<RouteKey>([
  "solutions/freight-forwarding-customs",
  "solutions/warehouse",
  "solutions/fleet",
  "solutions/finance-ohada",
  "solutions/platform-it",
  "customers/smart-logistics",
]);

/** `/og/solutions-warehouse--fr.png`, or the site-wide card. */
export function ogCardPath(route: RouteKey, locale: Locale): string {
  if (!OG_CARD_ROUTES.has(route)) return `/og/praxis-ls--${locale}.png`;
  return `/og/${route.replace(/\//g, "-")}--${locale}.png`;
}
