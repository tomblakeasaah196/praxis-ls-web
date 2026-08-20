#!/usr/bin/env node
/**
 * The performance budgets from doc/LANDING_PAGE_GUIDE.md §6, measured on the
 * built output rather than asserted in a README.
 *
 *   JS shipped, compressed   under 100 KB
 *   Total page weight        under 600 KB
 *
 * "Page weight" here is the HTML plus every same-origin asset it references,
 * counted once — the bytes a reader on a Douala mobile connection actually
 * waits for. Fonts are counted at the LATIN subset only, because that is what a
 * French or English page downloads: latin-ext exists for place names past
 * U+00FF and does not load on any page this site currently ships.
 *
 * Compressed sizes are gzip. Real hosts serve brotli, which is smaller, so
 * every number this prints is pessimistic — which is the direction a budget
 * check should err in.
 *
 * Lighthouse's own numbers go in HANDOFF.md; this exists so the budget fails in
 * CI in the ten seconds after a dependency is added, not in the review after.
 */
import { gzipSync } from "node:zlib";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const JS_BUDGET = 100 * 1024;
const PAGE_BUDGET = 600 * 1024;

if (!existsSync(DIST)) {
  console.error("check-budget: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir, ext) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full, ext));
    else if (full.endsWith(ext)) out.push(full);
  }
  return out;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const gz = (buffer) => gzipSync(buffer, { level: 9 }).length;

/* ── JS, per page ───────────────────────────────────────────────────────────
   The budget is "JS shipped", which is a per-page quantity: a reader who opens
   /fr/tarifs downloads that page's scripts, not the whole site's.
   
   Astro inlines the islands here because they are small, so nearly all of this
   is inline <script type="module"> rather than files in _astro/. A checker that
   only weighed .js files would report zero and pass forever, which is the
   failure mode this comment exists to prevent. JSON-LD is data, not script, and
   is counted with the HTML instead. */
function pageScriptBytes(html, dir) {
  let bytes = 0;
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const attrs = match[1] ?? "";
    if (/type="application\/ld\+json"/.test(attrs)) continue;
    const src = /\bsrc="([^"]+)"/.exec(attrs)?.[1];
    if (src) {
      const file = src.startsWith("/") ? path.join(DIST, src) : path.join(dir, src);
      if (existsSync(file)) bytes += gz(readFileSync(file));
      continue;
    }
    const body = match[2] ?? "";
    if (body.trim() !== "") bytes += gz(Buffer.from(body));
  }
  return bytes;
}

let jsGzip = 0;
let jsPage = "";
let jsRaw = 0;
for (const page of walk(DIST, ".html")) {
  const html = readFileSync(page, "utf8");
  const bytes = pageScriptBytes(html, path.dirname(page));
  if (bytes > jsGzip) {
    jsGzip = bytes;
    jsPage = `/${path.relative(DIST, page).replace(/index\.html$/, "")}`;
    jsRaw = [...html.matchAll(/<script(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce(
      (total, match) => total + Buffer.byteLength(match[1] ?? ""),
      0,
    );
  }
}
const inlineGzip = 0;

/* ── Page weight ────────────────────────────────────────────────────────── */
const results = [];
for (const page of walk(DIST, ".html")) {
  const html = readFileSync(page, "utf8");
  const seen = new Set();
  let total = gz(Buffer.from(html));

  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const href = (match[1] ?? "").split("#")[0]?.split("?")[0] ?? "";
    if (!href || seen.has(href)) continue;
    if (/\.(xml|txt)$/.test(href)) continue; // sitemap and robots are not page weight
    seen.add(href);
    const asset = path.join(DIST, href);
    if (!existsSync(asset) || !statSync(asset).isFile()) continue;
    const bytes = readFileSync(asset);
    /* woff2 and png are already compressed; gzipping them again measures
       nothing a browser will ever do. */
    total += /\.(woff2?|png|jpg|avif|webp)$/.test(href) ? bytes.length : gz(bytes);
  }

  /* The preloaded display face is fetched on every page; the body and mono
     faces are fetched as soon as any text using them paints, which is
     immediately. Count all three latin subsets. */
  for (const face of [
    "ibm-plex-sans-latin-wght-normal.woff2",
    "inter-latin-wght-normal.woff2",
    "jetbrains-mono-latin-wght-normal.woff2",
  ]) {
    const file = path.join(DIST, "fonts", face);
    if (!seen.has(`/fonts/${face}`) && existsSync(file)) total += statSync(file).size;
  }

  results.push({ page: `/${path.relative(DIST, page).replace(/index\.html$/, "")}`, total });
}

results.sort((a, b) => b.total - a.total);
const heaviest = results[0];

console.log("check-budget:");
console.log(
  `  JS, compressed          ${kb(jsGzip + inlineGzip)}  (budget ${kb(JS_BUDGET)})  heaviest: ${jsPage}`,
);
console.log(`  JS, uncompressed        ${kb(jsRaw)}`);
console.log(
  `  heaviest page           ${kb(heaviest?.total ?? 0)}  (budget ${kb(PAGE_BUDGET)})  ${heaviest?.page ?? ""}`,
);
for (const result of results.slice(0, 5)) {
  console.log(`     ${result.page.padEnd(38)} ${kb(result.total)}`);
}

let failed = false;
if (jsGzip + inlineGzip > JS_BUDGET) {
  console.error(
    `\ncheck-budget: JS is over budget (${kb(jsGzip + inlineGzip)} > ${kb(JS_BUDGET)})`,
  );
  failed = true;
}
if ((heaviest?.total ?? 0) > PAGE_BUDGET) {
  console.error(`\ncheck-budget: ${heaviest?.page} is over the page budget`);
  failed = true;
}
process.exit(failed ? 1 : 0);
