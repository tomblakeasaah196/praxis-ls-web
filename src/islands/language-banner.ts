/**
 * The cross-language suggestion (N7) — the half of it that needs an event
 * listener.
 *
 * The rules the guide is strict about, and what each one costs if broken:
 *
 *   - It is a BANNER, never a redirect. `/en/pricing` serves English to a
 *     French browser, always, because a redirected deep link is a link that
 *     cannot be shared.
 *   - DISMISSAL PERSISTS. A banner that comes back on every page is a banner
 *     the reader learns to route around, and it starts costing conversions.
 *   - It only appears when the browser's preferred language actually disagrees
 *     with the page. Showing it to everyone would train people to dismiss it.
 *
 * WHETHER IT APPEARS is decided by the inline script in BaseHead.astro, before
 * first paint, and expressed as `data-lang-offer` on <html>. It has to happen
 * there: this module runs after the first paint, and revealing the first
 * element in the body at that point moves the entire document down — 0.105 CLS
 * against a 0.05 budget, measured on /fr/solutions/plateforme-dsi before the
 * decision moved into the head.
 *
 * So what is left here is the dismissal, which is a click and therefore cannot
 * be anywhere else. The destination was rendered onto the banner by the build,
 * straight from the slug map: there is no path rewriting here, so there is no
 * way for this to land the reader on the homepage.
 */
const DISMISS_KEY = "praxis.lang-banner-dismissed";
const OFFER_ATTRIBUTE = "data-lang-offer";

export function mountLanguageBanner(root: ParentNode = document): void {
  const banner = root.querySelector<HTMLElement>("[data-lang-banner]");
  if (!banner) return;

  banner
    .querySelector<HTMLButtonElement>("[data-lang-banner-dismiss]")
    ?.addEventListener("click", () => {
      document.documentElement.removeAttribute(OFFER_ATTRIBUTE);
      try {
        localStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* Storage can be blocked outright. The banner is gone for this page
           view; it will be offered again on the next one, which is the right
           way round — the reader can always dismiss it again, and never seeing
           the other language tree is the worse failure. */
      }
    });
}
