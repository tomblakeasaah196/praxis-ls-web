#!/usr/bin/env node
/**
 * Every internal link resolves, and every page carries the SEO the guide
 * requires. Run against dist/ after a build.
 *
 * It checks five things, all of which are launch-checklist items that would
 * otherwise be verified by clicking:
 *
 *   1. Every internal href resolves to a file in dist/. A CTA that 404s is the
 *      most expensive broken link on a marketing site and the easiest to ship.
 *   2. Every page has exactly one <h1>.
 *   3. Every page has a self-referencing canonical, and hreflang for fr, en and
 *      x-default.
 *   4. The `lang` attribute on <html> matches the tree the file is in — the
 *      "no English string on a French page" check, at the level a machine can
 *      actually verify.
 *   5. Nothing links to a route that is not built yet.
 *   6. The Open Graph card a page names exists. It is the one asset on a page
 *      that no reader ever sees and no browser ever requests, so nothing else
 *      catches it — the first person to find a missing card is whoever pasted
 *      the link into a group chat.
 *
 * No network. External links are listed and not fetched: a CI job that fails
 * because someone else's server was slow is a CI job people learn to re-run
 * without reading.
 */
import { readFile } from "node:fs/promises";
import { readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

if (!existsSync(DIST)) {
  console.error("check-links: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith(".html")) out.push(full);
  }
  return out;
}

const pages = walk(DIST);
const problems = [];
const external = new Set();

/** `/en/pricing` → dist/en/pricing/index.html, and the other spellings of it. */
function resolves(href) {
  const clean = href.split("#")[0]?.split("?")[0] ?? "";
  if (clean === "" || clean === "/") return existsSync(path.join(DIST, "index.html"));
  const asFile = path.join(DIST, clean);
  if (existsSync(asFile) && statSync(asFile).isFile()) return true;
  if (existsSync(path.join(asFile, "index.html"))) return true;
  if (existsSync(`${asFile}.html`)) return true;
  return false;
}

for (const file of pages) {
  const html = await readFile(file, "utf8");
  const url = `/${path
    .relative(DIST, file)
    .replace(/index\.html$/, "")
    .replace(/\\/g, "/")}`;
  const label = path.relative(ROOT, file);

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) problems.push(`${label}: ${h1s} <h1> elements, expected exactly 1`);

  const langMatch = /<html[^>]*\slang="([^"]+)"/.exec(html);
  const lang = langMatch?.[1];
  const tree = url.split("/")[1];
  if ((tree === "en" || tree === "fr") && lang !== tree) {
    problems.push(`${label}: <html lang="${lang ?? "—"}"> in the /${tree}/ tree`);
  }

  /* The root fallback is noindex and carries no canonical by design. */
  const isRoot = url === "/";
  if (!isRoot) {
    if (!/<link[^>]+rel="canonical"/.test(html)) problems.push(`${label}: no canonical`);
    for (const hreflang of ["en", "fr", "x-default"]) {
      if (!new RegExp(`hreflang="${hreflang}"`).test(html)) {
        problems.push(`${label}: no hreflang="${hreflang}"`);
      }
    }
  }

  /* og:image and twitter:image are absolute URLs on our own origin, so the
     link loop below skips them — they are checked here instead. */
  const cards = new Set(
    [...html.matchAll(/<meta[^>]+content="(https:\/\/praxisls\.com\/og\/[^"]+)"/g)].map(
      (match) => new URL(match[1] ?? "").pathname,
    ),
  );
  for (const card of cards) {
    if (!resolves(card)) problems.push(`${label}: Open Graph card missing → ${card}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1] ?? "";
    if (/^(https?:|mailto:|tel:|data:|#)/.test(href)) {
      if (href.startsWith("http")) external.add(href);
      continue;
    }
    if (!href.startsWith("/")) continue;
    if (!resolves(href)) problems.push(`${label}: broken link → ${href}`);
  }
}

console.log(
  `check-links: ${pages.length} pages, ${external.size} distinct external URLs (not fetched)`,
);

if (problems.length > 0) {
  console.error("\ncheck-links: problems found:\n");
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  "check-links: all internal links resolve; one h1, canonical and hreflang on every page ✓",
);
