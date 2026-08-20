/**
 * The four role tabs (guide §3.7), built to the APG tabs pattern.
 *
 * The part that is easy to get wrong and expensive to get wrong: the tab strip
 * is a single tab stop. Tab moves you into the active tab and then out to the
 * panel; the arrow keys move BETWEEN tabs. Four separate tab stops would make a
 * keyboard reader traverse every role to get past this section, on every page
 * load, forever.
 *
 * The markup renders with the first tab selected and every panel present, so
 * the section is complete and readable with no script at all — this only adds
 * the switching.
 */
export function mountRoleTabs(root: ParentNode = document): void {
  for (const group of root.querySelectorAll<HTMLElement>("[data-role-tabs]")) {
    const tabs = [...group.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const panels = [...group.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
    if (tabs.length === 0 || tabs.length !== panels.length) continue;

    const select = (index: number, moveFocus: boolean) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel, i) => {
        panel.hidden = i !== index;
      });
      if (moveFocus) tabs[index]?.focus();
    };

    select(0, false);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(index, false));
      tab.addEventListener("keydown", (event) => {
        const last = tabs.length - 1;
        let next: number | null = null;
        /* Home and End are part of the pattern, not a flourish: with four tabs
           they are how someone reaches the far end without counting. */
        if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
        else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = last;
        if (next === null) return;
        event.preventDefault();
        select(next, true);
      });
    });
  }
}
