/**
 * Reads the brand's colour values out of the vendored token file at BUILD time.
 *
 * Three places need a colour as a literal string rather than as a CSS variable:
 * `<meta name="theme-color">`, the Open Graph card renderer, and the screenshot
 * placeholder renderer. Typing the value into any of them would be exactly the
 * copy-the-hex failure packages/brand exists to end (N3), so the value is
 * parsed out of vendor/brand/tokens.css instead — the same file the CI guard
 * pins to upstream. Change the token upstream and these move with it.
 *
 * Build-time only. It reads from disk, so it must never be imported into a
 * client island.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Comments are stripped BEFORE anything is matched, and that is not tidiness.
 * The token file's own header contains the sentence "If you find yourself
 * wanting to write --brand-orange: var(--primary), you are on a tenant
 * surface" — a naive search for the declaration finds that prose first and
 * returns `var(--primary)` as the brand orange. It fails silently, in a colour.
 */
const TOKENS = readFileSync(
  fileURLToPath(new URL("../../vendor/brand/tokens.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * The value of a custom property, taken from the FIRST block that declares it.
 * tokens.css declares the light theme on `:root` and overrides it lower down
 * for dark, so "first" means "the light value" for the themed tokens and "the
 * only value" for the immutable ones — which is what every caller here wants
 * except the two that ask for a dark token by name.
 */
function token(name: string): string {
  const match = new RegExp(`--${name}\\s*:\\s*([^;]+);`).exec(TOKENS);
  if (!match?.[1]) {
    throw new Error(
      `vendor/brand/tokens.css does not declare --${name}. ` +
        "If the token was renamed upstream, re-vendor the file and fix the callers.",
    );
  }
  return assertResolved(name, match[1].trim());
}

/**
 * A token that still contains `var(...)` has not been read, it has been
 * mis-parsed — and the symptom is a wrong colour rather than an error, which is
 * the worst way for this to fail. Stop the build instead.
 */
function assertResolved(name: string, raw: string): string {
  if (raw.includes("var(")) {
    throw new Error(
      `--${name} parsed to "${raw}", which is a reference rather than a value. ` +
        "Check the comment-stripping above against the current tokens.css.",
    );
  }
  return raw;
}

/** The dark override of a themed token — the second declaration of the name. */
function darkToken(name: string): string {
  const all = [...TOKENS.matchAll(new RegExp(`--${name}\\s*:\\s*([^;]+);`, "g"))];
  const second = all[1]?.[1];
  if (!second) throw new Error(`vendor/brand/tokens.css has no dark override for --${name}.`);
  return assertResolved(name, second.trim());
}

export const brand = {
  orange: token("brand-orange"),
  slate: token("brand-slate"),
  carbon: token("brand-carbon"),
  onOrange: token("brand-on-orange"),
  slate100: token("brand-slate-100"),
  slate300: token("brand-slate-300"),
  slate700: token("brand-slate-700"),
  slate800: token("brand-slate-800"),
  slate900: token("brand-slate-900"),
  light: {
    bg: token("brand-bg"),
    surface: token("brand-surface"),
    ink: token("brand-ink"),
    inkMuted: token("brand-ink-muted"),
    inkOrange: token("brand-ink-orange"),
  },
  dark: {
    bg: darkToken("brand-bg"),
    surface: darkToken("brand-surface"),
    ink: darkToken("brand-ink"),
    inkMuted: darkToken("brand-ink-muted"),
    inkOrange: darkToken("brand-ink-orange"),
  },
} as const;
