#!/usr/bin/env node
/**
 * N3 — no raw hex outside the vendored token file.
 *
 * Every colour on this site resolves through `var(--brand-*)`. A hex literal
 * anywhere else is the start of the drift that packages/brand exists to end:
 * the value is right on the day it is typed and wrong the day the brand moves.
 *
 * What counts as a violation is a 3-, 4-, 6- or 8-digit hex colour in any
 * source file. What does not:
 *
 *   - vendor/brand/tokens.css — the one file allowed to hold values (N3).
 *   - A `#` inside a URL fragment, an id selector or an SVG `url(#id)`, which
 *     are not colours. The pattern requires the hex to be delimited by
 *     punctuation that a colour is delimited by, and the id-shaped false
 *     positives are filtered by checking the character before the `#`.
 *
 * Hex inside a comment still fails. A commented-out colour is a colour someone
 * will uncomment.
 */
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ALLOWED = new Set([path.join("vendor", "brand", "tokens.css")]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".astro", "public", "lighthouse"]);
const EXTENSIONS = new Set([
  ".astro",
  ".css",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".svg",
  ".html",
]);

/** A hex colour, not an id or a URL fragment. */
const HEX = /(^|[^&\w])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".github") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      yield full;
    }
  }
}

const offences = [];
for await (const file of walk(ROOT)) {
  const relative = path.relative(ROOT, file);
  if (ALLOWED.has(relative)) continue;
  const source = readFileSync(file, "utf8");
  source.split("\n").forEach((line, index) => {
    for (const match of line.matchAll(HEX)) {
      /* `url(#gradient)` and `href="#anchor"` are references, not colours, but
         a three-letter id is indistinguishable from a shorthand colour by
         pattern alone. Require the hex to be followed by what closes a colour
         (punctuation or end of line) rather than by more identifier. */
      const after = line.slice(match.index + match[0].length);
      if (/^[-\w]/.test(after)) continue;
      offences.push(`${relative}:${index + 1}  ${line.trim()}`);
    }
  });
}

if (offences.length > 0) {
  console.error("check-no-raw-hex: raw hex colours outside vendor/brand/tokens.css (N3):\n");
  for (const offence of offences) console.error(`  ${offence}`);
  console.error("\n  Use var(--brand-*). If the token you need does not exist, it belongs");
  console.error("  in packages/brand upstream, not in this repository.");
  process.exit(1);
}

console.log("check-no-raw-hex: no raw hex outside vendor/brand/tokens.css ✓");
