/**
 * The theme toggle. Two states, persisted, never overridden afterwards (N6).
 *
 * The choice is already applied by the inline script in BaseHead.astro before
 * first paint; all this island does is flip it and keep the button's accessible
 * name honest. That split is deliberate: the thing that must not be late is
 * inline and tiny, and the thing that can be late is a module.
 *
 * `aria-pressed` is wrong for this control — it is not a two-state "on/off" of
 * one thing, it is a switch between two named themes — so the button carries a
 * label that says what pressing it will DO, and it is re-labelled on every
 * change. A reader on a screen reader hears "Switch to the light theme", not
 * "theme, pressed".
 */
const STORAGE_KEY = "praxis.theme";

type Theme = "dark" | "light";

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function current(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function persist(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Storage blocked. The choice still holds for this page and this visit,
       which is better than refusing to switch at all. */
  }
}

function apply(button: HTMLButtonElement, theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  const next = theme === "dark" ? "toLight" : "toDark";
  const label = button.dataset[next];
  if (label) button.setAttribute("aria-label", label);
  button.dataset.theme = theme;
}

export function mountThemeToggle(root: ParentNode = document): void {
  const button = root.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!button) return;

  apply(button, current());

  button.addEventListener("click", () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    apply(button, next);
    persist(next);
  });

  /* A second tab may have changed it. Follow, but only to one of the two
     values this site writes — a stray key from another origin's script is not
     a theme. */
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || !isTheme(event.newValue)) return;
    apply(button, event.newValue);
  });
}
