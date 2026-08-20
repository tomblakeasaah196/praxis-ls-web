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
