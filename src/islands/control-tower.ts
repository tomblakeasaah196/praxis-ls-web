/**
 * The one number the control tower's stylesheet reads.
 *
 * `--tower-progress` runs 0 → 1 as the section crosses the viewport. Everything
 * visible — the connector drawing itself in, the nodes lighting, the ledger
 * lines arriving — is CSS reading that property, so this file has no knowledge
 * of any of it and cannot fall out of step with the design.
 *
 * Three things keep it cheap enough for the INP budget (guide §6):
 *
 *   - IntersectionObserver decides WHETHER to listen. Scrolling the rest of a
 *     long page costs nothing at all.
 *   - The scroll handler is passive and does no work beyond storing a number;
 *     the write happens in a requestAnimationFrame, once per frame at most.
 *   - It writes one custom property on one element. No class toggling, no
 *     querying, no layout reads inside the frame beyond a single
 *     getBoundingClientRect.
 *
 * Reduced motion is not a slower version of this: the section is left at its
 * completed state, the listener is never attached, and the notice that explains
 * why is revealed (N10).
 */
export function mountControlTower(root: ParentNode = document): void {
  const section = root.querySelector<HTMLElement>("[data-tower]");
  if (!section) return;

  const notice = section.querySelector<HTMLElement>("[data-tower-notice]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const staticFallback = () => {
    section.style.setProperty("--tower-progress", "1");
    if (notice) notice.hidden = false;
  };

  if (reduced.matches) {
    staticFallback();
    return;
  }

  let frame = 0;
  let listening = false;

  const write = () => {
    frame = 0;
    const rect = section.getBoundingClientRect();
    /* Progress is measured over the span from "the section's top reaches 75% of
       the viewport" to "its bottom reaches 25%". Anchoring to the section
       rather than to the document means it behaves the same whether the reader
       arrives by scrolling, by a hash link or by restoring a scroll position. */
    const start = window.innerHeight * 0.75;
    const end = window.innerHeight * 0.25;
    const travelled = start - rect.top;
    const distance = rect.height + (start - end);
    const progress = distance > 0 ? travelled / distance : 1;
    section.style.setProperty("--tower-progress", String(Math.min(1, Math.max(0, progress))));
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(write);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", schedule, { passive: true });
          window.addEventListener("resize", schedule, { passive: true });
          schedule();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", schedule);
          window.removeEventListener("resize", schedule);
        }
      }
    },
    { rootMargin: "20% 0px 20% 0px" },
  );

  section.style.setProperty("--tower-progress", "0");
  observer.observe(section);

  /* A reader can turn reduced motion on mid-visit. Honour it immediately
     rather than at the next navigation. */
  reduced.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    staticFallback();
  });
}
