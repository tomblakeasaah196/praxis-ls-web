#!/usr/bin/env node
/**
 * No unlayered `html`, `body` or `:root` rule may reach the shared stylesheet.
 *
 * WHY THIS EXISTS. Astro scopes a component's styles by adding an attribute
 * selector to the elements it renders — but `html`, `body` and `:root` cannot
 * carry that attribute, so selectors targeting them are emitted verbatim and
 * globally. Combined with `cssCodeSplit: false`, one page's `body { display:
 * grid }` lands in the stylesheet EVERY page loads, unlayered, where it beats
 * every rule in global.css's @layer cascade.
 *
 * The failure is silent and total: the site keeps building, every check keeps
 * passing, and the layout collapses to a centred column. It happened on this
 * branch; the root fallback page's styles are now inline (is:inline) so they
 * never enter the bundle, and this check makes sure nothing else does it.
 *
 * The one legitimate source of such rules is src/styles/global.css, and
 * everything in that file is inside an @layer. The bare-root fallback page is
 * the single documented exception: its rules are is:inline, so they live in
 * that one document and reach nothing else.
 *
 * Both delivery shapes are checked, because the site inlines its CSS: any
 * stylesheet under dist/_astro, and every inline <style> block in every built
 * page. Inlining makes a leak WORSE, not better — it copies the offending rule
 * into every document instead of one shared file.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const ASTRO_DIR = path.join(DIST, "_astro");

if (!existsSync(DIST)) {
  console.error("check-css: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

function walkHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkHtml(full));
    else if (full.endsWith(".html")) out.push(full);
  }
  return out;
}

/** name → css. Everything the browser will parse as a stylesheet. */
const sources = new Map();

if (existsSync(ASTRO_DIR)) {
  for (const file of readdirSync(ASTRO_DIR).filter((name) => name.endsWith(".css"))) {
    sources.set(`_astro/${file}`, readFileSync(path.join(ASTRO_DIR, file), "utf8"));
  }
}

for (const file of walkHtml(DIST)) {
  const page = `/${path
    .relative(DIST, file)
    .replace(/index\.html$/, "")
    .replace(/\\/g, "/")}`;
  /* The bare-root fallback owns its own body rules on purpose — they are
     is:inline and confined to that document. See src/pages/index.astro. */
  if (page === "/") continue;
  const html = readFileSync(file, "utf8");
  let index = 0;
  for (const match of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    index += 1;
    sources.set(`${page} <style ${index}>`, match[1] ?? "");
  }
}

const offences = [];

for (const [sheet, css] of sources) {
  /* Walk the stylesheet tracking @layer depth. Everything the site owns lives
     inside a layer; anything at depth zero that names a root element is the
     bug this check is here for. */
  let depth = 0;
  let layerDepth = 0;
  let selectorStart = 0;

  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    if (character === "{") {
      const selector = css.slice(selectorStart, index).trim();
      const isLayer = /@layer\b/.test(selector);
      const isAt = selector.startsWith("@");
      if (depth === 0 || (layerDepth === 0 && isAt)) {
        /* nothing to record for at-rules themselves */
      }
      if (isLayer) layerDepth += 1;
      depth += 1;
      if (!isAt && layerDepth === 0) {
        for (const part of selector.split(",")) {
          const trimmed = part.trim();
          if (/^(html|body|:root)\b/.test(trimmed)) {
            offences.push(`${sheet}: unlayered "${trimmed}" rule`);
          }
        }
      }
      selectorStart = index + 1;
    } else if (character === "}") {
      depth = Math.max(0, depth - 1);
      /* Closing a layer block. Tracking this exactly would need a stack; the
         approximation holds because layers here are never nested inside
         non-layer blocks. */
      if (layerDepth > 0 && depth < layerDepth) layerDepth = depth;
      selectorStart = index + 1;
    }
  }
}

if (offences.length > 0) {
  console.error("check-css: unlayered root-element rules in the shared stylesheet:\n");
  for (const offence of new Set(offences)) console.error(`  ${offence}`);
  console.error(
    "\n  A component's <style> cannot scope html/body/:root, so these apply to every\n" +
      "  page and outrank global.css's @layer cascade. Move them into\n" +
      "  src/styles/global.css inside a layer, or make the block is:inline.",
  );
  process.exit(1);
}

console.log(`check-css: ${sources.size} stylesheet(s), no unlayered html/body/:root rules ✓`);
