#!/usr/bin/env node
/**
 * N1 — the copy is final, and this is the diff.
 *
 * WEB_BUILD_BRIEF §7: "Homepage copy matches §3 exactly — diff it, don't
 * eyeball it." A copy deck that is only checked by reading is a copy deck that
 * drifts, usually by one word, usually in the language the reviewer does not
 * speak.
 *
 * How it works, in three steps:
 *
 *   1. `vendor/copy/landing-page-guide-copy.md` is §3 and §4 of the guide,
 *      byte-verbatim from the pinned upstream ref, with a sha256 in
 *      vendor/copy/UPSTREAM.json. Editing it to make this check pass is
 *      therefore a visible act.
 *   2. Every string in EXPECTED below must appear in that fixture. This is the
 *      half that catches paraphrasing: a sentence I retyped from memory fails
 *      here before it ever reaches a page.
 *   3. Every string must then appear in the BUILT HTML of its language. This
 *      is the half that catches a page that stopped rendering it.
 *
 * NORMALISATION, and exactly what it forgives. Both sides are lower-cased for
 * nothing, but they are compared with whitespace collapsed and with U+202F and
 * U+00A0 folded to an ordinary space. That is the ONE difference between the
 * guide's markdown and the published French, and it is required by N8: the
 * guide writes `vertébrale : un jalon` because markdown source cannot carry a
 * narrow no-break space, and published French must. Nothing else is forgiven —
 * not a changed word, not a changed dash, not a changed apostrophe.
 */
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const FIXTURE = path.join(ROOT, "vendor", "copy", "landing-page-guide-copy.md");
const PIN = path.join(ROOT, "vendor", "copy", "UPSTREAM.json");

if (!existsSync(DIST)) {
  console.error("check-copy: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const raw = readFileSync(FIXTURE, "utf8");
const pin = JSON.parse(readFileSync(PIN, "utf8"));

/* The header comment is this repository's; the extract below it is upstream's,
   and that is what the digest covers. */
const extract = raw.slice(raw.indexOf("-->") + 4).replace(/^\n+/, "");
const digest = createHash("sha256").update(extract).digest("hex");
if (digest !== pin.sha256) {
  console.error(
    "check-copy: vendor/copy/landing-page-guide-copy.md has been edited.\n" +
      `  expected sha256 ${pin.sha256}\n  actual   sha256 ${digest}\n` +
      "  This file is the guide, vendored. The copy is final (N1) — if the guide\n" +
      "  changed, re-vendor it and bump the pin in the same commit.",
  );
  process.exit(1);
}

/**
 * Collapse whitespace, fold the no-break spaces N8 requires, and fold the
 * apostrophe.
 *
 * The guide's markdown carries the ASCII apostrophe because markdown source
 * does; published copy carries U+2019, in both languages. That is the same
 * class of difference as the narrow no-break space — typesetting, not wording —
 * and it is the only other thing this comparison forgives.
 */
function normalise(text) {
  return (
    text
      .replace(/[  ]/g, " ")
      /* Entities first: decoding after the fold would put U+2019 back. */
      .replace(/&#39;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** Markdown emphasis and blockquote markers are formatting, not copy. */
const fixture = normalise(extract.replace(/\*\*/g, "").replace(/^>\s?/gm, "").replace(/`/g, ""));

function pageText(relative) {
  const file = path.join(DIST, relative, "index.html");
  if (!existsSync(file)) {
    console.error(`check-copy: ${relative} was not built.`);
    process.exit(1);
  }
  /* Tags are removed WITHOUT inserting a space. `Live at
     <strong>Smart Logistics</strong>, Cameroon` is one sentence, and replacing
     the tags with spaces turns it into "Smart Logistics , Cameroon" — a
     difference that is invisible on the page and fails a byte comparison. Every
     string checked here sits inside a single block, so running blocks together
     costs nothing. */
  return normalise(
    readFileSync(file, "utf8")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, ""),
  );
}

/**
 * The copy that must survive verbatim, section by section. Not every string in
 * the guide — the ones whose loss or alteration would be a defect: every
 * heading, every body paragraph, both CTAs, all six controls, all four role
 * lines, all three standards rows.
 */
const EXPECTED = {
  en: [
    // §2 hero
    "OHADA-NATIVE ERP FOR LOGISTICS OPERATORS",
    "One system for your operation files, your warehouses, your fleet — and the accounting they all post to.",
    "Praxis LS runs the whole operation on a native OHADA/SYSCOHADA ledger. Every transit file, every delivery, every invoice posts itself. Month-end becomes a review, not a reconstruction.",
    "Book a demo",
    "See how it works",
    // §3 credibility
    "Live at Smart Logistics, Cameroon — an 84-table legacy system replaced end to end, accounting included.",
    "OHADA · 17 member states",
    "70 modules",
    "One dedicated database per customer",
    // §4 problem
    "You run the operation in one system and the accounts in another.",
    "The file closes in March. The entry is posted in June, by someone reading a spreadsheet and a WhatsApp thread. By the time the DSF is assembled, nobody can say which margin was real.",
    // §5 spine
    "Every operation posts itself.",
    "Praxis LS is not an operations tool with an accounting export. The ledger is the spine: a milestone, a disbursement, a delivery note and an invoice each carry their own posting rules, in SYSCOHADA, at the moment they happen. The chart of accounts, the tax engine, the journals and the statements are one system with the operation — not a monthly negotiation with it.",
    // §6 control tower
    "One file. From quotation to closed books.",
    "Quotation, transit order, customs, haulage, warehouse, delivery, invoice, settlement. One file carries all of it — with its documents, its costs, its margin and its postings attached. Open it in March or in three years: it says the same thing.",
    // §7 roles
    "See the whole company without asking anyone for a report.",
    "Every file, every milestone, every exception, on one board.",
    "A ledger you can defend to an auditor, line by line.",
    "One database per customer. Your data, your credentials, your exit.",
    // §9 intelligence
    "Intelligence inside the guardrails.",
    "The assistant drafts proposals, reads documents and takes dictation in French and English. Every action it proposes passes the same validation gate as a human's, is checked against the same permissions, and lands in the same audit trail. Spend is metered per organisation and visible to you. Nothing posts to your ledger because a model was confident.",
    // §10 trust
    "We hold the code. You hold the data.",
    "A dedicated PostgreSQL database per customer — not a shared table with a tenant column",
    "An immutable ledger: entries are reversed, never edited",
    "Encrypted daily backups of every database",
    "Restore drills that are run and recorded, not assumed",
    "A central policy engine — permissions enforced server-side, not just hidden in the UI",
    "Ten-year document retention, with QR verification on issued documents",
    "See the full security posture",
    // §11 deployment
    "Your subdomain. Your logo. Your document numbering.",
    "Praxis LS runs at yourcompany.praxisls.com in your colours, your fonts and both languages. Your team installs it as an app. Your documents carry your branding. A live environment and a test environment come as standard, and the test one is wiped on a schedule so nobody confuses the two.",
    // §12 standards
    "Which standard do you close in?",
    "Live — 17 member states, DSF, liasse fiscale",
    "In development",
    "Planned",
    "We publish this table because you are entitled to know what we run today and what we are building. It is updated when the code is, not when the marketing is.",
    // §14 close
    "Let's look at your operation.",
    "Thirty minutes, your files, your questions. We'll show you the ledger behind them.",
  ],
  fr: [
    "ERP NATIF OHADA POUR LES OPÉRATEURS LOGISTIQUES",
    "Un seul système pour vos dossiers d’exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s’impute.",
    "Praxis LS pilote toute l’exploitation sur un grand livre nativement OHADA/SYSCOHADA. Chaque dossier de transit, chaque livraison, chaque facture s’impute d’elle-même. La clôture devient une relecture, pas une reconstitution.",
    "Demander une démo",
    "Voir comment ça marche",
    "En production chez Smart Logistics, Cameroun — un système hérité de 84 tables remplacé de bout en bout, comptabilité comprise.",
    "OHADA · 17 États membres",
    "70 modules",
    "Une base de données dédiée par client",
    "Vous pilotez l’exploitation dans un système et la comptabilité dans un autre.",
    "Le dossier se clôture en mars. L’écriture est passée en juin, par quelqu’un qui relit un tableur et un fil WhatsApp. Au moment de monter la DSF, plus personne ne sait quelle marge était la vraie.",
    "Chaque opération s’impute d’elle-même.",
    "Praxis LS n’est pas un outil d’exploitation doté d’un export comptable. Le grand livre en est la colonne vertébrale : un jalon, un débours, un bon de livraison, une facture — chacun porte ses propres règles d’imputation, en SYSCOHADA, au moment où il se produit. Plan comptable, moteur fiscal, journaux et états financiers ne font qu’un avec l’exploitation, au lieu de négocier avec elle tous les mois.",
    "Un dossier. Du devis à la clôture.",
    "Devis, ordre de transit, dédouanement, camionnage, entrepôt, livraison, facture, règlement. Un seul dossier porte l’ensemble — avec ses documents, ses coûts, sa marge et ses écritures attachés. Ouvrez-le en mars ou dans trois ans : il dit la même chose.",
    "Voir toute l’entreprise sans demander de rapport à personne.",
    "Chaque dossier, chaque jalon, chaque exception, sur un seul tableau.",
    "Un grand livre défendable devant un auditeur, ligne par ligne.",
    "Une base de données par client. Vos données, vos accès, votre porte de sortie.",
    "L’intelligence, à l’intérieur des garde-fous.",
    "L’assistant rédige des propositions, lit les documents et prend la dictée, en français comme en anglais. Chaque action qu’il propose passe le même contrôle de validation qu’une action humaine, se heurte aux mêmes habilitations et atterrit dans la même piste d’audit. La consommation est mesurée par organisation et visible. Rien ne s’impute à votre grand livre parce qu’un modèle était sûr de lui.",
    "Nous détenons le code. Vous détenez vos données.",
    "Une base PostgreSQL dédiée par client — pas une table partagée avec une colonne client",
    "Un journal inaltérable : les écritures se contrepassent, elles ne se modifient pas",
    "Sauvegardes chiffrées quotidiennes de chaque base",
    "Des tests de restauration réellement exécutés et consignés",
    "Un moteur d’habilitations central — appliqué côté serveur, pas seulement masqué dans l’interface",
    "Conservation des documents sur dix ans, avec vérification QR sur les documents émis",
    "Voir notre posture de sécurité complète",
    "Votre sous-domaine. Votre logo. Votre numérotation documentaire.",
    "Praxis LS tourne sur votresociete.praxisls.com, à vos couleurs, avec vos polices, dans les deux langues. Vos équipes l’installent comme une application. Vos documents portent votre marque. Un environnement de production et un environnement de test sont fournis d’office, et le second est purgé périodiquement pour que personne ne les confonde.",
    "Selon quelle norme clôturez-vous ?",
    "En production — 17 États membres, DSF, liasse fiscale",
    "En cours de développement",
    "Prévu",
    "Nous publions ce tableau parce que vous êtes en droit de savoir ce que nous exploitons aujourd’hui et ce que nous construisons. Il est mis à jour quand le code l’est, pas quand la communication l’est.",
    "Regardons votre exploitation ensemble.",
    "Trente minutes, vos dossiers, vos questions. Nous vous montrons le grand livre qui se trouve derrière.",
  ],
};

const problems = [];
let checked = 0;

for (const [locale, strings] of Object.entries(EXPECTED)) {
  const page = pageText(locale);
  for (const string of strings) {
    const needle = normalise(string);
    checked += 1;
    if (!fixture.includes(needle)) {
      problems.push(`NOT IN THE GUIDE (${locale}): ${needle.slice(0, 90)}…`);
      continue;
    }
    if (!page.includes(needle)) {
      problems.push(`NOT ON /${locale}/: ${needle.slice(0, 90)}…`);
    }
  }
}

if (problems.length > 0) {
  console.error("check-copy: the homepage does not match the guide (N1):\n");
  for (const problem of problems) console.error(`  ${problem}`);
  console.error("\n  The copy is final. If a string will not fit, change the layout.");
  process.exit(1);
}

console.log(
  `check-copy: ${checked} strings, byte-identical to the vendored guide and present on the page ✓`,
);
