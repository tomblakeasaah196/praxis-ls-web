/**
 * The three bits of header behaviour that need script: the rule that appears on
 * scroll, the mobile sheet, and the Solutions menu.
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

  mountSolutionsMenu(header);

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
     visible (N10).

     The listener is on the HEADER, not on the sheet. Opening the sheet from the
     keyboard leaves focus on the burger, which is outside the sheet, so a
     listener bound to the sheet never sees that reader's Escape — the one
     reader most likely to press it. The sheet's own links are inside the header
     too, so both cases arrive here. */
  header.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || sheet.hidden) return;
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

/**
 * The Solutions menu — a disclosure over five ordinary links.
 *
 * Deliberately NOT the APG menu/menuitem pattern. That pattern takes the links
 * out of the tab order and puts them on arrow keys, which is right for an
 * application menu bar and wrong for site navigation: it means a reader who
 * knows how to Tab through a website suddenly cannot, and it tells a screen
 * reader that five pages are five commands. What is here is a button that shows
 * a list. Tab reaches every link in document order; Escape closes and returns
 * focus to the button; moving focus out of the menu closes it, so a keyboard
 * reader never leaves an open panel behind them; a pointer click outside does
 * the same.
 *
 * Arrow keys are supported as an extra rather than as the only way in: Down on
 * the button opens the menu and moves to the first link, which is what someone
 * who has met this control elsewhere will try.
 */
function mountSolutionsMenu(header: HTMLElement): void {
  const root = header.querySelector<HTMLElement>("[data-menu-root]");
  const button = root?.querySelector<HTMLButtonElement>("[data-menu-button]");
  const menu = root?.querySelector<HTMLElement>("[data-menu]");
  if (!root || !button || !menu) return;

  const links = () => [...menu.querySelectorAll<HTMLAnchorElement>("a")];

  const setOpen = (open: boolean) => {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => setOpen(menu.hidden));

  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
    links()[0]?.focus();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || menu.hidden) return;
    setOpen(false);
    button.focus();
  });

  /* focusout fires before the new element has focus, so the check is against
     relatedTarget rather than document.activeElement. */
  root.addEventListener("focusout", (event) => {
    const next = event.relatedTarget;
    if (next instanceof Node && root.contains(next)) return;
    setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (menu.hidden) return;
    const target = event.target;
    if (target instanceof Node && root.contains(target)) return;
    setOpen(false);
  });
}
