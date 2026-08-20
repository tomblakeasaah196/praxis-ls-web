#!/usr/bin/env node
/**
 * N5 — self-host the three faces, latin + latin-ext only.
 *
 * @fontsource-variable ships one stylesheet per axis covering EVERY subset the
 * face has: cyrillic, greek, vietnamese, the lot. Importing it would declare
 * around twenty @font-face rules per family. They would not all download — the
 * unicode-range keeps a browser from fetching greek for a French page — but
 * they would all sit in the critical CSS, and the package would still have to
 * be resolved through Vite on every build.
 *
 * So the woff2 files this site actually needs are copied out of the package
 * into public/fonts/ and declared by hand in src/styles/fonts.css. The package
 * stays the source of truth (bump it and re-run) and the site ships six files
 * instead of sixty.
 *
 * Why latin-ext at all, when French fits inside latin: é à è ù ç â ê î ô û and
 * their capitals all live in U+0000-00FF, as do « and » and the narrow no-break
 * space. latin-ext is there for the OHADA member states whose place names reach
 * past it, and it costs nothing on a page that does not need it.
 *
 * Run by `predev` and `prebuild`. public/fonts/ is generated, not committed.
 */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "public", "fonts");

/** The axis stylesheet each family's variable weight file is published under. */
const FAMILIES = [
  { package: "@fontsource-variable/ibm-plex-sans", stem: "ibm-plex-sans" },
  { package: "@fontsource-variable/inter", stem: "inter" },
  { package: "@fontsource-variable/jetbrains-mono", stem: "jetbrains-mono" },
];

const SUBSETS = ["latin", "latin-ext"];

await mkdir(OUT, { recursive: true });

const manifest = [];
for (const family of FAMILIES) {
  const base = path.join(ROOT, "node_modules", family.package);
  const version = JSON.parse(await readFile(path.join(base, "package.json"), "utf8")).version;
  for (const subset of SUBSETS) {
    const file = `${family.stem}-${subset}-wght-normal.woff2`;
    await copyFile(path.join(base, "files", file), path.join(OUT, file));
    manifest.push({ package: family.package, version, file });
  }
}

await writeFile(
  path.join(OUT, "MANIFEST.json"),
  `${JSON.stringify({ generatedBy: "scripts/copy-fonts.mjs", files: manifest }, null, 2)}\n`,
);

console.log(`copy-fonts: ${manifest.length} woff2 files → public/fonts/`);
process.exit(0);
