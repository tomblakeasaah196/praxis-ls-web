/**
 * The copy deck's shape.
 *
 * doc/LANDING_PAGE_GUIDE.md §3 is final copy in both languages (N1), so the
 * only honest way to hold it is as data: one module per language, both
 * satisfying this interface. TypeScript then enforces the launch-checklist item
 * that is otherwise checked by eye — "no English string on a French page" —
 * because a key missing from the French deck does not build.
 *
 * Nothing here is a template with interpolation. A sentence that has to be
 * assembled at runtime is a sentence that was translated word by word, which is
 * exactly what BRAND_GLOSSARY_FR_EN.md §0 says not to do. Where a line has an
 * emphasised span the deck stores the pieces, because the emphasis falls in a
 * different place in each language.
 */

/** A sentence with one emphasised span, stored in three pieces so the emphasis
 *  can sit where each language puts it. */
export interface EmphasisedLine {
  readonly before: string;
  readonly strong: string;
  readonly after: string;
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface RoleTab {
  readonly id: "direction" | "operations" | "finance" | "it";
  readonly label: string;
  readonly line: string;
}

export interface CoverageGroup {
  /** Roman numeral as it appears in the README module map, kept so the grid can
   *  be checked against the source without counting. */
  readonly numeral: string;
  readonly name: string;
  readonly line: string;
}

export interface StandardRow {
  readonly standard: string;
  readonly status: string;
  /** `live` is the only row that gets the orange treatment. */
  readonly state: "live" | "development" | "planned";
}

export interface PricingTier {
  readonly name: string;
  readonly covers: string;
}

export interface TowerStep {
  readonly label: string;
  readonly ledger: string;
}

export interface HomeCopy {
  readonly meta: PageMeta;

  readonly hero: {
    readonly eyebrow: string;
    readonly h1: string;
    readonly sub: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly screenshotAlt: string;
  };

  readonly credibility: {
    readonly lead: EmphasisedLine;
    readonly facts: readonly string[];
  };

  readonly problem: {
    readonly heading: string;
    readonly body: string;
  };

  readonly spine: {
    readonly heading: string;
    readonly body: string;
    readonly chain: readonly string[];
    readonly diagramLabel: string;
  };

  readonly tower: {
    readonly heading: string;
    readonly body: string;
    readonly steps: readonly TowerStep[];
    readonly ledgerHeading: string;
    readonly ledgerAmount: string;
    readonly diagramLabel: string;
    readonly staticNotice: string;
  };

  readonly roles: {
    readonly heading: string;
    readonly tabs: readonly RoleTab[];
  };

  readonly coverage: {
    readonly heading: string;
    readonly intro: string;
    readonly figure: string;
    readonly figureLabel: string;
    readonly groups: readonly CoverageGroup[];
  };

  readonly intelligence: {
    readonly heading: string;
    readonly body: string;
  };

  readonly trust: {
    readonly heading: string;
    readonly controls: readonly string[];
    readonly link: string;
  };

  readonly deployment: {
    readonly heading: string;
    readonly body: string;
    readonly subdomainExample: string;
  };

  readonly standards: {
    readonly heading: string;
    readonly rows: readonly StandardRow[];
    readonly note: string;
    readonly columnStandard: string;
    readonly columnStatus: string;
    readonly link: string;
  };

  readonly pricing: {
    readonly heading: string;
    readonly intro: string;
    readonly tiers: readonly PricingTier[];
    readonly link: string;
  };

  readonly close: {
    readonly heading: string;
    readonly body: string;
    readonly cta: string;
  };
}
