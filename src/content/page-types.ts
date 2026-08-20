/**
 * The supporting pages' copy, typed the same way the homepage is: one module
 * per language, both satisfying these interfaces, so a missing French string is
 * a build failure rather than an English sentence on a French page.
 *
 * Where the guide specifies the words — /security's heading and its six
 * controls, /standards' table and note, /pricing's tier shape — they are
 * verbatim (N1). Everything else on these pages is DRAFTED and listed in
 * HANDOFF.md § Draft copy.
 */
import type { PageMeta, PricingTier, StandardRow } from "./types";

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export interface SecurityPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly intro: string;
  readonly controlsHeading: string;
  readonly controls: readonly string[];
  readonly certificationHeading: string;
  readonly certificationLine: string;
  readonly faqHeading: string;
  readonly faq: readonly FaqEntry[];
}

export interface StandardsPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly intro: string;
  readonly rows: readonly StandardRow[];
  readonly columnStandard: string;
  readonly columnStatus: string;
  readonly note: string;
  readonly updatedHeading: string;
  readonly updatedLine: string;
}

export interface PricingPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly intro: string;
  readonly tiers: readonly PricingTier[];
  readonly addOnsHeading: string;
  readonly addOns: readonly string[];
  readonly aiHeading: string;
  readonly aiLine: string;
  readonly quoteHeading: string;
  readonly quoteLine: string;
  readonly faqHeading: string;
  readonly faq: readonly FaqEntry[];
  readonly cta: string;
}

export interface AboutPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly intro: string;
  readonly blocks: readonly { readonly heading: string; readonly body: string }[];
  readonly openHeading: string;
  readonly openLine: string;
}

export interface ContactPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly intro: string;
  readonly formHeading: string;
  readonly fields: {
    readonly name: string;
    readonly email: string;
    readonly emailHint: string;
    readonly company: string;
    readonly country: string;
    readonly countryHint: string;
    readonly role: string;
    readonly context: string;
    readonly contextHint: string;
    readonly optional: string;
  };
  readonly roles: readonly { readonly value: string; readonly label: string }[];
  readonly submit: string;
  readonly submitting: string;
  readonly errors: {
    readonly required: string;
    readonly email: string;
    readonly summary: string;
    readonly notWired: string;
  };
  readonly success: string;
  readonly freeEmailNotice: string;
}

export interface LegalPage {
  readonly meta: PageMeta;
  readonly heading: string;
  readonly stubHeading: string;
  readonly stubBody: string;
}

export interface PagesCopy {
  readonly security: SecurityPage;
  readonly standards: StandardsPage;
  readonly pricing: PricingPage;
  readonly about: AboutPage;
  readonly contact: ContactPage;
  readonly privacy: LegalPage;
  readonly terms: LegalPage;
}

/**
 * The five solution pages (guide §2 and §5) and the one case study (§3.3).
 *
 * These carry DRAFT COPY. The guide gives them their slugs and the job they do
 * — "the five solution pages exist to rank for these phrases" (§5) — and gives
 * none of their words. Every string in solutions.{en,fr}.ts and
 * customers.{en,fr}.ts is drafted from the module map in praxis-ls README §4,
 * BRAND_GLOSSARY_FR_EN.md and the homepage's voice, and is listed in
 * HANDOFF.md § Draft copy as needing review.
 */
export interface SolutionCapability {
  readonly name: string;
  readonly line: string;
}

export interface SolutionPage {
  readonly meta: PageMeta;
  /** Short label, used by the header menu, the footer and the related-pages
   *  block. One table, so a page cannot be called two things. */
  readonly navLabel: string;
  /** One line under the label in the header menu. */
  readonly navBlurb: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly intro: string;
  readonly coversHeading: string;
  readonly covers: readonly SolutionCapability[];
  readonly postingHeading: string;
  readonly postingBody: string;
  readonly chainLabel: string;
  readonly chain: readonly string[];
  /** Absent on the pages where a third screenshot of the same surface would
   *  say nothing the first two did not. */
  readonly screenshot?:
    { readonly screen: "control-tower" | "general-ledger"; readonly alt: string } | undefined;
  readonly outLink?:
    { readonly label: string; readonly route: "security" | "standards" } | undefined;
  readonly relatedHeading: string;
  readonly closeHeading: string;
  readonly closeLine: string;
}

export interface SolutionsCopy {
  readonly freight: SolutionPage;
  readonly warehouse: SolutionPage;
  readonly fleet: SolutionPage;
  readonly finance: SolutionPage;
  readonly platform: SolutionPage;
}

/**
 * The case study. Built from LANDING_PAGE_GUIDE.md §3.3 and nothing else.
 *
 * `lead` is the credibility strip's sentence, verbatim in both languages. Every
 * other field says either something §3.3 states or something about what §3.3
 * withholds — there is no field here for a volume, a figure, a date or a quote,
 * because the page has nowhere to put one and that is deliberate (N12, brief §6).
 */
export interface CaseStudyPage {
  readonly meta: PageMeta;
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly factsHeading: string;
  readonly facts: readonly { readonly term: string; readonly line: string }[];
  readonly sanitisationHeading: string;
  readonly sanitisationBody: string;
  readonly emptyLine: string;
  readonly closeHeading: string;
  readonly closeLine: string;
}
