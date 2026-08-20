#!/usr/bin/env node
/**
 * Renders the two kinds of image this site ships that are not photographs:
 * the screenshot PLACEHOLDERS and the Open Graph cards.
 *
 * ── The placeholders ────────────────────────────────────────────────────────
 * scripts/marketing/capture-screens.mjs in praxis-ls produces the real
 * screenshots by driving the running application against a seeded demo tenant.
 * It cannot run from this repository — it needs the app, the tenant and
 * credentials. The brief's instruction for that case is unambiguous: a
 * hand-drawn "product" screenshot that ships is worse than an obvious
 * placeholder.
 *
 * So each placeholder is a flat panel at the capture script's exact geometry
 * (1600×1000, its default CAPTURE_WIDTH × CAPTURE_HEIGHT) in the dominant tones
 * of the theme it stands for, carrying its own filename and the word
 * PLACEHOLDER. It draws no interface: no toolbar, no table, no numbers.
 * Nothing on it could be mistaken for the product, which is the entire point.
 *
 * Filenames match `${screen}--${theme}--${lang}.png` exactly — the pattern at
 * capture-screens.mjs:187 — so swapping in the real captures is a copy over the
 * top and no code changes at all.
 *
 * ── The Open Graph cards ────────────────────────────────────────────────────
 * One per language (guide §5: "a French preview card on a French page"), 1200×630.
 *
 * ── How ─────────────────────────────────────────────────────────────────────
 * Headless Chromium renders an HTML document to PNG. That keeps the repository
 * free of an image-generation dependency, and it means both kinds of image are
 * described in the same language as the rest of the site — including reading
 * their colours from the vendored brand tokens rather than carrying copies (N3).
 *
 * Run it with `npm run assets`. Outputs are committed, because a placeholder
 * that only exists after a build step is a placeholder a reviewer cannot see.
 */
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* Read the palette out of the vendored token file — the same parse the site
   uses at build time, kept here as a few lines rather than an import so this
   script can run without the TypeScript pipeline. */
const { readFileSync } = await import("node:fs");
/* Comments stripped first: the token file's header quotes the declaration
   "--brand-orange: var(--primary)" as an example of what NOT to write, and a
   naive match finds that sentence before the real value. */
const tokens = readFileSync(path.join(ROOT, "vendor/brand/tokens.css"), "utf8").replace(
  /\/\*[\s\S]*?\*\//g,
  "",
);
const value = (name, occurrence = 0) => {
  const all = [...tokens.matchAll(new RegExp(`--${name}\\s*:\\s*([^;]+);`, "g"))];
  const found = all[occurrence]?.[1]?.trim();
  if (!found) throw new Error(`vendor/brand/tokens.css has no --${name} (#${occurrence})`);
  return found;
};

const PALETTE = {
  orange: value("brand-orange"),
  slate: value("brand-slate"),
  carbon: value("brand-carbon"),
  onOrange: value("brand-on-orange"),
  light: {
    bg: value("brand-bg", 0),
    surface: value("brand-surface", 0),
    ink: value("brand-ink", 0),
    muted: value("brand-ink-muted", 0),
    inkOrange: value("brand-ink-orange", 0),
  },
  dark: {
    bg: value("brand-bg", 1),
    surface: value("brand-surface", 1),
    ink: value("brand-ink", 1),
    muted: value("brand-ink-muted", 1),
    inkOrange: value("brand-ink-orange", 1),
  },
};

/**
 * chrome-headless-shell FIRST, and not by preference.
 *
 * Full Chrome in the new headless mode opens a real window, so
 * `--window-size=1200,630` yields a 1200×543 viewport and pads the screenshot
 * back out to 1200×630 with background colour. Everything below roughly 540px
 * silently vanishes — which is exactly the kind of failure that ships, because
 * the file is the right size and looks plausible in a thumbnail. The shell
 * binary has no window chrome and gives the viewport you asked for.
 *
 * If only full Chrome is available the script still runs; the assertion at the
 * end of shoot() is what stops a truncated card from being committed.
 */
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
  "/usr/bin/chrome-headless-shell",
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error(
    "render-assets: no Chromium found. Set CHROME_PATH, or install one.\n" +
      "  The committed PNGs are the output of this script — you only need it to\n" +
      "  regenerate them.",
  );
  process.exit(1);
}

const SCREENS = ["operation-file", "control-tower", "general-ledger"];
const THEMES = ["dark", "light"];
const LANGS = ["en", "fr"];

/* The word on the badge, per language. Everything else on a placeholder is a
   filename, which does not translate. */
const BADGE = { en: "PLACEHOLDER", fr: "IMAGE D’ATTENTE" };
const SUBTITLE = {
  en: "Not the product. Replace with the capture of the same name.",
  fr: "Ce n’est pas le produit. À remplacer par la capture du même nom.",
};

const OG = {
  en: {
    eyebrow: "OHADA-NATIVE ERP FOR LOGISTICS OPERATORS",
    line: "One system for your operation files, your warehouses, your fleet — and the accounting they all post to.",
  },
  fr: {
    eyebrow: "ERP NATIF OHADA POUR LES OPÉRATEURS LOGISTIQUES",
    line: "Un seul système pour vos dossiers d’exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s’impute.",
  },
};

const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

/** The node cluster, as SVG markup. The glyph, not the lockup. */
const glyph = (colour, size) => `
<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="${colour}" stroke-width="1.4">
    <path d="M16 16 16 6M16 16 24.7 11M16 16 24.7 21M16 16 16 26M16 16 7.3 21M16 16 7.3 11"/>
  </g>
  <g fill="${colour}">
    <circle cx="16" cy="6" r="2"/><circle cx="24.7" cy="11" r="2"/>
    <circle cx="24.7" cy="21" r="2"/><circle cx="16" cy="26" r="2"/>
    <circle cx="7.3" cy="21" r="2"/><circle cx="7.3" cy="11" r="2"/>
    <circle cx="16" cy="16" r="3.4"/>
  </g>
</svg>`;

function placeholderHtml({ screen, theme, lang }) {
  const t = PALETTE[theme];
  const file = `${screen}--${theme}--${lang}.png`;
  /* Diagonal hatching over a flat ground. It reads as "deliberately empty" at
     any size, including the thumbnail a reviewer sees first. */
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:800px;height:500px;background:${t.bg};
      font-family:system-ui,sans-serif;overflow:hidden}
    /* Coarse hatching, not fine. A 24px stripe put ~130 colour transitions
       across the image and pushed the PNG past 50 KB — on the hero that is
       50 KB competing with the display font for bandwidth on the critical
       path. At 64px it reads the same and compresses to a fraction. */
    .frame{position:absolute;inset:0;background:
      repeating-linear-gradient(135deg, ${t.surface} 0 32px, transparent 32px 64px);}
    .plate{position:absolute;inset:32px;border:2px dashed ${PALETTE.slate};border-radius:14px;
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;
      background:${t.bg}}
    .badge{display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:4px;
      background:${PALETTE.orange};color:${PALETTE.onOrange};
      font-size:17px;font-weight:700;letter-spacing:.12em}
    .file{font-family:ui-monospace,monospace;font-size:17px;color:${t.ink}}
    .sub{font-size:13px;color:${t.muted};max-width:60ch;text-align:center;line-height:1.5}
    .meta{position:absolute;left:32px;top:444px;display:flex;gap:13px;
      font-family:ui-monospace,monospace;font-size:11px;color:${PALETTE.slate}}
  </style></head><body>
    <div class="frame"></div>
    <div class="plate">
      ${glyph(PALETTE.orange, 42)}
      <div class="badge">${escape(BADGE[lang])}</div>
      <div class="file">${escape(file)}</div>
      <div class="sub">${escape(SUBTITLE[lang])}</div>
    </div>
    <div class="meta"><span>1600 × 1000</span><span>${escape(theme)}</span><span>${escape(lang)}</span></div>
  </body></html>`;
}

function ogHtml(lang) {
  const t = PALETTE.dark;
  const copy = OG[lang];
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    /* Absolute placement rather than flexbox: the card is a fixed 1200x630
       canvas, and pinning the three blocks to it means the French line — a
       quarter longer than the English — cannot push the footer off the bottom
       edge. */
    body{width:1200px;height:630px;background:${t.bg};color:${t.ink};
      font-family:system-ui,sans-serif;position:relative;overflow:hidden}
    .top{position:absolute;left:64px;top:56px}
    .middle{position:absolute;left:64px;right:64px;top:170px}
    .foot{position:absolute;left:64px;top:548px}
    .top{display:flex;align-items:center;gap:16px}
    .word{font-size:26px;font-weight:600;letter-spacing:.14em;color:${t.ink}}
    .eyebrow{font-size:18px;letter-spacing:.12em;color:${PALETTE.slate};margin-bottom:20px}
    .line{font-size:42px;line-height:1.14;letter-spacing:-.015em;font-weight:600;max-width:26ch}
    .rule{height:3px;background:${PALETTE.orange};width:110px;margin-top:26px}
    .foot{font-size:20px;color:${PALETTE.slate};font-family:ui-monospace,monospace}
  </style></head><body>
    <div class="top">${glyph(PALETTE.orange, 40)}<span class="word">PRAXIS-LS</span></div>
    <div class="middle">
      <div class="eyebrow">${escape(copy.eyebrow)}</div>
      <div class="line">${escape(copy.line)}</div>
      <div class="rule"></div>
    </div>
    <div class="foot">praxisls.com</div>
  </body></html>`;
}

async function shoot(work, html, out, width, height) {
  const page = path.join(work, `${path.basename(out, ".png")}.html`);
  await writeFile(page, html, "utf8");
  const args = [
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${width},${height}`,
    `--screenshot=${out}`,
    `file://${page}`,
  ];
  /* headless_shell is already headless; full Chrome needs to be told. */
  if (!chrome.includes("headless_shell")) args.unshift("--headless");
  await run(chrome, args);

  /* Read the PNG header back. It catches the browser writing nothing, and it
     catches a geometry change — the two ways this script fails silently. */
  const header = readFileSync(out).subarray(16, 24);
  const actual = { width: header.readUInt32BE(0), height: header.readUInt32BE(4) };
  if (actual.width !== width || actual.height !== height) {
    throw new Error(
      `${path.basename(out)} rendered ${actual.width}×${actual.height}, expected ${width}×${height}`,
    );
  }
}

if (!chrome.includes("headless_shell")) {
  console.warn(
    `render-assets: using ${chrome}, which opens a real window in new headless mode.\n` +
      "  The bottom ~85px of every image will be background instead of content.\n" +
      "  Install chrome-headless-shell and re-run before committing the output.",
  );
}

const work = await mkdtemp(path.join(tmpdir(), "praxis-assets-"));
const screensDir = path.join(ROOT, "public", "screens");
const ogDir = path.join(ROOT, "public", "og");
await mkdir(screensDir, { recursive: true });
await mkdir(ogDir, { recursive: true });

let count = 0;
for (const screen of SCREENS) {
  for (const theme of THEMES) {
    for (const lang of LANGS) {
      const file = `${screen}--${theme}--${lang}.png`;
      /* Rendered at HALF the capture script's geometry: the same 16:10
         proportion, the same tones, a quarter of the pixels. A placeholder has
         no detail to lose, and the hero one sits on the critical path where
         50 KB of anti-aliased text competes with the display face for
         bandwidth. The <img> still declares 1600×1000, so the reserved box —
         and therefore CLS — is identical to the day the real captures land. */
      await shoot(
        work,
        placeholderHtml({ screen, theme, lang }),
        path.join(screensDir, file),
        800,
        500,
      );
      count += 1;
    }
  }
}

for (const lang of LANGS) {
  await shoot(work, ogHtml(lang), path.join(ogDir, `praxis-ls--${lang}.png`), 1200, 630);
  count += 1;
}

await rm(work, { recursive: true, force: true });
console.log(`render-assets: ${count} images written (12 placeholders, 2 Open Graph cards)`);
