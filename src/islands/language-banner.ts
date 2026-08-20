/**
 * The cross-language suggestion (N7).
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
 * The destination is rendered onto the banner by the build, straight from the
 * slug map. There is no path rewriting here, so there is no way for this to
 * land the reader on the homepage.
 */
const DISMISS_KEY = "praxis.lang-banner-dismissed";

function prefersOtherLanguage(pageLang: string, otherLang: string): boolean {
  const preferred = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);

  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    if (base === pageLang) return false;
    if (base === otherLang) return true;
  }
  return false;
}

export function mountLanguageBanner(root: ParentNode = document): void {
  const banner = root.querySelector<HTMLElement>("[data-lang-banner]");
  if (!banner) return;

  const pageLang = document.documentElement.lang.toLowerCase().split("-")[0] ?? "en";
  const otherLang = (banner.dataset.langBannerLang ?? "").toLowerCase().split("-")[0] ?? "";
  if (!otherLang) return;

  try {
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
  } catch {
    /* Storage blocked: show it once per page rather than never. The reader can
       still dismiss it; it simply will not be remembered. */
  }

  if (!prefersOtherLanguage(pageLang, otherLang)) return;

  banner.hidden = false;

  banner
    .querySelector<HTMLButtonElement>("[data-lang-banner-dismiss]")
    ?.addEventListener("click", () => {
      banner.hidden = true;
      try {
        localStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* See above. */
      }
    });
}
