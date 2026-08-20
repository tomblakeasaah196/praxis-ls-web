#!/usr/bin/env node
/**
 * N8 — French typography, checked rather than assumed.
 *
 * BRAND_GLOSSARY_FR_EN.md §5 lists the rules that decide whether the French
 * reads native or reads translated. Most of them are mechanical, so they are
 * checked here, on the BUILT HTML of the /fr/ tree — not on the source, because
 * what ships is what a reader sees.
 *
 * What it enforces:
 *
 *   1. A narrow no-break space (U+202F) before « : ; ! ? ». An ordinary space
 *      there is the single most visible tell of English typesetting applied to
 *      French, and it is what markdown source unavoidably produces.
 *   2. Guillemets rather than straight or curly double quotes, with a no-break
 *      space inside each.
 *   3. Accented capitals. É È À Ç are mandatory; "Etats financiers" is the
 *      clearest signature of machine output there is. Checked as a word list
 *      because a general rule would need a dictionary.
 *   4. No title case in headings — French has none.
 *   5. Percentages as "15 %" with a no-break space, not "15%".
 *
 * What it does NOT enforce, and why: number formatting and dates. There is no
 * figure with a decimal and no date anywhere on the site yet, so a check for
 * them would be a check that has never once run. When the first one lands it
 * belongs here, and the rule is `1 250 000,50 XAF` and `20 août 2026`.
 *
 * Text inside <code>, <script>, <style> and mono spans is skipped: a hostname
 * is not French prose.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist", "fr");

const NARROW = "\u202f";
const NBSP = "\u00a0";

if (!existsSync(DIST)) {
  console.error("check-french: dist/fr does not exist. Run `npm run build` first.");
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

/** Visible prose only: tags, scripts, styles, code and JSON-LD removed. */
function prose(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<code[\s\S]*?<\/code>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ");
}

/** Headings, for the sentence-case rule. */
function headings(html) {
  return [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((match) =>
    (match[1] ?? "").replace(/<[^>]+>/g, "").trim(),
  );
}

/* Words whose accented capital is mandatory, paired with the unaccented
   spelling that must never appear. */
const ACCENT_TRAPS = [
  ["Etats", "États"],
  ["Ecriture", "Écriture"],
  ["Etat ", "État "],
  ["Evaluation", "Évaluation"],
  ["A propos", "À propos"],
  ["Ecritures", "Écritures"],
];

/* Short words that legitimately stay lowercase inside a French sentence-case
   heading; a heading is only flagged when a LONG word is capitalised mid-line,
   which is what title case actually looks like. */
const PROPER = new Set([
  "Praxis",
  "LS",
  "OHADA",
  "SYSCOHADA",
  "DSF",
  "IFRS",
  "GAAP",
  "US",
  "PostgreSQL",
  "QR",
  "Smart",
  "Logistics",
  "Cameroun",
  "TVA",
  "XAF",
  "EUR",
  "Core",
  "Operations",
  "Enterprise",
  "SLA",
  "DSI",
  "États",
  "WhatsApp",
]);

const problems = [];

for (const file of walk(DIST)) {
  const html = readFileSync(file, "utf8");
  const label = path.relative(ROOT, file);
  const text = prose(html);

  for (const match of text.matchAll(/[^\s\u202f\u00a0]([ ])([:;!?])/g)) {
    const at = Math.max(0, (match.index ?? 0) - 40);
    problems.push(
      `${label}: ordinary space before "${match[2]}" — needs U+202F\n      …${text.slice(at, (match.index ?? 0) + 20).trim()}…`,
    );
  }

  for (const match of text.matchAll(/[""]/g)) {
    const at = Math.max(0, (match.index ?? 0) - 40);
    problems.push(
      `${label}: double quote where guillemets belong\n      …${text.slice(at, (match.index ?? 0) + 20).trim()}…`,
    );
  }

  for (const match of text.matchAll(/«([^\u202f\u00a0])/g)) {
    problems.push(`${label}: « with no no-break space after it (before "${match[1]}")`);
  }
  for (const match of text.matchAll(/([^\u202f\u00a0])»/g)) {
    problems.push(`${label}: » with no no-break space before it (after "${match[1]}")`);
  }

  for (const [wrong, right] of ACCENT_TRAPS) {
    if (text.includes(wrong))
      problems.push(`${label}: "${wrong}" should be "${right}" (accented capitals are mandatory)`);
  }

  for (const match of text.matchAll(/\d ?%/g)) {
    const raw = match[0];
    if (!raw.includes(NBSP) && !raw.includes(NARROW)) {
      problems.push(`${label}: "${raw}" — a percentage takes a no-break space (15 %)`);
    }
  }

  for (const heading of headings(html)) {
    /* Sentence by sentence, not word by word. "Votre sous-domaine. Votre logo."
       is three sentences and three legitimate capitals; a heading is only
       title-cased if capitals appear MID-sentence. */
    const titleCased = heading
      .split(/(?<=[.!?\u202f:])\s+/)
      .flatMap((sentence) => sentence.split(/\s+/).filter(Boolean).slice(1))
      .filter((word) => /^[A-ZÀ-Ý][a-zà-ÿ]{3,}/.test(word) && !PROPER.has(word));
    if (titleCased.length >= 2) {
      problems.push(
        `${label}: heading looks title-cased — "${heading}" (${titleCased.join(", ")})`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error("check-french: French typography problems (N8 · glossary §5):\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("\n  These are the details that decide whether the French reads native.");
  process.exit(1);
}

console.log(
  "check-french: narrow no-break spaces, guillemets, accented capitals and sentence case ✓",
);
