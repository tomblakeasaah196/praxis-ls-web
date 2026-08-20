#!/usr/bin/env node
/**
 * N5 — three families, named nowhere but the token file and the @font-face
 * block that self-hosts them.
 *
 * This is the marketing site's copy of the rule scripts/check-fonts.mjs
 * enforces inside praxis-ls: any family named outside the permitted library
 * fails the build, INCLUDING in a fallback stack. A stack that ends
 * `…, Helvetica, Arial, sans-serif` ships two families the site has no licence
 * to serve and no control over the metrics of; stacks end with a bare generic
 * keyword instead.
 */
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".astro", "lighthouse"]);
const EXTENSIONS = new Set([".astro", ".css", ".ts", ".js", ".mjs", ".html"]);

const PERMITTED = new Set([
  "ibm plex sans variable",
  "ibm plex sans",
  "inter variable",
  "inter",
  "jetbrains mono variable",
  "jetbrains mono",
]);

/** The CSS generic keywords. A stack may end with one of these and nothing else. */
const GENERIC = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
  "inherit",
  "initial",
  "unset",
  "revert",
  "revert-layer",
]);

const DECLARATION = /font-family\s*:\s*([^;}\n]+)/gi;

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
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(DECLARATION)) {
    const value = match[1] ?? "";
    if (value.includes("var(--brand-font")) continue;
    const line = source.slice(0, match.index).split("\n").length;
    for (const raw of value.split(",")) {
      const family = raw
        .trim()
        .replace(/^["']|["']$/g, "")
        .toLowerCase();
      if (!family || family.startsWith("var(")) continue;
      if (PERMITTED.has(family) || GENERIC.has(family)) continue;
      offences.push(`${relative}:${line}  "${family}"  (in the stack: ${value.trim()})`);
    }
  }
}

if (offences.length > 0) {
  console.error("check-fonts: font families named outside the permitted three (N5):\n");
  for (const offence of offences) console.error(`  ${offence}`);
  console.error("\n  Permitted: IBM Plex Sans · Inter · JetBrains Mono, plus a bare generic");
  console.error("  keyword to close the stack. Prefer var(--brand-font-*).");
  process.exit(1);
}

console.log("check-fonts: only IBM Plex Sans, Inter and JetBrains Mono are named ✓");
