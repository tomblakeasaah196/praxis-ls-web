#!/usr/bin/env node
/**
 * N2 — the brand values are never forked.
 *
 * vendor/brand/tokens.css is a byte copy of packages/brand/tokens.css in
 * tomblakeasaah196/praxis-ls at the ref pinned in vendor/brand/UPSTREAM.json.
 * This check proves the copy has not drifted, in two independent ways:
 *
 *   1. LOCAL, always — the file's sha256 and its git blob id must match the
 *      pinned digests. This catches the failure that actually happens: someone
 *      edits a hex value in the vendored file because it was quicker than
 *      raising a PR upstream. It needs no network, so it runs on every commit
 *      and never goes yellow because GitHub was slow.
 *
 *   2. UPSTREAM, when upstream is reachable — the same file is read back from
 *      praxis-ls at the pinned ref and diffed byte for byte. This catches the
 *      other failure: a pin bumped without re-copying the file. Two sources are
 *      accepted, in order:
 *
 *        BRAND_UPSTREAM_PATH   a local clone of praxis-ls; the file is read
 *                              with `git show <ref>:<path>`, no network.
 *        BRAND_UPSTREAM_TOKEN  a token that can read the private praxis-ls
 *                              repository; the file is fetched from the API.
 *
 *      When neither is set the step reports SKIPPED and exits 0. praxis-ls is
 *      private, so a contributor without a cross-repo token cannot satisfy this
 *      leg — and a check that fails for a reason the contributor cannot fix is
 *      a check people learn to ignore. CI sets BRAND_UPSTREAM_TOKEN and gets
 *      the strict version; laptops get the local digests, which are the leg
 *      that catches real edits.
 *
 *      Note it is deliberately NOT wired to GITHUB_TOKEN. The token Actions
 *      injects is scoped to THIS repository and 401s against praxis-ls, so
 *      reading it here would turn every CI run red for a reason unrelated to
 *      the change.
 *
 * Bumping the pin is deliberately a two-line edit plus a fresh copy:
 *   curl -H "Authorization: Bearer $GITHUB_TOKEN" \
 *     -H "Accept: application/vnd.github.raw" \
 *     https://api.github.com/repos/<repo>/contents/<path>?ref=<newref> \
 *     > vendor/brand/tokens.css
 *   node scripts/check-brand-tokens.mjs --write-pin <newref>
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import process from "node:process";

const TOKENS = new URL("../vendor/brand/tokens.css", import.meta.url);
const PIN = new URL("../vendor/brand/UPSTREAM.json", import.meta.url);

const bytes = readFileSync(TOKENS);
const pin = JSON.parse(readFileSync(PIN, "utf8"));

const sha256 = createHash("sha256").update(bytes).digest("hex");
/** git's blob id — `sha1("blob <len>\0" + content)`. Lets the pin be checked
 *  against `git hash-object` output on the upstream side without a clone. */
const blob = createHash("sha1")
  .update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`), bytes]))
  .digest("hex");

const writePin = process.argv.indexOf("--write-pin");
if (writePin !== -1) {
  const ref = process.argv[writePin + 1];
  if (!ref) fail("--write-pin needs a commit sha");
  writeFileSync(PIN, `${JSON.stringify({ ...pin, ref, blob, sha256 }, null, 2)}\n`);
  console.log(`check-brand-tokens: pin rewritten to ${ref}`);
  process.exit(0);
}

function fail(message) {
  console.error(`check-brand-tokens: ${message}`);
  process.exit(1);
}

if (sha256 !== pin.sha256 || blob !== pin.blob) {
  fail(
    "vendor/brand/tokens.css does not match the pinned upstream copy.\n" +
      `  expected sha256 ${pin.sha256}\n` +
      `  actual   sha256 ${sha256}\n` +
      "  The brand values are owned by packages/brand in praxis-ls (N2).\n" +
      "  Change them THERE, then re-vendor and bump the pin in one commit.",
  );
}

if (!/^[0-9a-f]{40}$/.test(pin.ref)) {
  fail(`UPSTREAM.json ref must be a full 40-character commit sha, got "${pin.ref}"`);
}

console.log(
  `check-brand-tokens: local digests OK (sha256 ${sha256.slice(0, 12)}…, ref ${pin.ref.slice(0, 7)}).`,
);

const clone = process.env.BRAND_UPSTREAM_PATH ?? "";
const token = process.env.BRAND_UPSTREAM_TOKEN ?? "";

/** @type {{ bytes: Buffer, source: string } | null} */
let fetched = null;

if (clone) {
  fetched = {
    bytes: execFileSync("git", ["-C", clone, "show", `${pin.ref}:${pin.path}`], {
      maxBuffer: 8 * 1024 * 1024,
      encoding: "buffer",
    }),
    source: `${clone} (git show ${pin.ref.slice(0, 7)}:${pin.path})`,
  };
} else if (token) {
  const url = `https://api.github.com/repos/${pin.repository}/contents/${pin.path}?ref=${pin.ref}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.raw",
      "User-Agent": "praxis-ls-web-brand-check",
    },
  });
  if (!response.ok) {
    fail(
      `could not read ${pin.path} from ${pin.repository}@${pin.ref.slice(0, 7)} ` +
        `(HTTP ${response.status}). Either BRAND_UPSTREAM_TOKEN cannot read that ` +
        "repository, or the pinned commit no longer exists.",
    );
  }
  fetched = {
    bytes: Buffer.from(await response.arrayBuffer()),
    source: `${pin.repository}@${pin.ref.slice(0, 7)}:${pin.path}`,
  };
}

if (!fetched) {
  console.log(
    "check-brand-tokens: upstream diff SKIPPED — set BRAND_UPSTREAM_PATH (a local\n" +
      "  clone of praxis-ls) or BRAND_UPSTREAM_TOKEN to run it.",
  );
  process.exit(0);
}

const upstream = fetched.bytes;
if (!upstream.equals(bytes)) {
  try {
    writeFileSync("/tmp/upstream-tokens.css", upstream);
    console.error(
      execFileSync("diff", ["-u", "/tmp/upstream-tokens.css", "vendor/brand/tokens.css"], {
        encoding: "utf8",
      }),
    );
  } catch (error) {
    /* diff exits non-zero when files differ; the output above is the point. */
    if (error && typeof error === "object" && "stdout" in error)
      console.error(String(error.stdout));
  }
  fail(`vendor/brand/tokens.css differs from ${fetched.source}`);
}

console.log(`check-brand-tokens: identical to ${fetched.source} ✓`);
