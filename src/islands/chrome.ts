/**
 * The two bits of header behaviour that need script: the rule that appears on
 * scroll, and the mobile sheet.
 *
 * The scroll listener is passive and does nothing but toggle one attribute —
 * layout and paint stay off the scroll thread, which is what keeps INP inside
 * the 200 ms budget on a mid-range Android (guide §6).
 */
export function mountHeader(root: ParentNode = document): void {
  const header = root.querySelector<HTMLElement>("[data-header]");
  if (!header) return;

  const setScrolled = () => {
    if (window.scrollY > 4) header.setAttribute("data-scrolled", "");
    else header.removeAttribute("data-scrolled");
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  const toggle = header.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const sheet = header.querySelector<HTMLElement>("[data-nav-sheet]");
  if (!toggle || !sheet) return;

  const setOpen = (open: boolean) => {
    sheet.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    const label = open ? toggle.dataset.closeLabel : toggle.dataset.openLabel;
    if (label) toggle.setAttribute("aria-label", label);
  };

  toggle.addEventListener("click", () => {
    setOpen(sheet.hidden);
  });

  /* Escape closes it and returns focus to the control that opened it —
     otherwise a keyboard reader is left inside a sheet that is no longer
     visible (N10). */
  sheet.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setOpen(false);
    toggle.focus();
  });

  /* A link inside the sheet points at a section of the page behind it; leaving
     the sheet open would cover the thing the reader just asked to see. */
  sheet.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  });

  /* Resizing past the breakpoint reveals the full nav; the sheet must not stay
     open underneath it. */
  const wide = window.matchMedia("(width >= 62rem)");
  wide.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
