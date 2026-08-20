import type { CaseStudyPage } from "./page-types";

/**
 * Smart Logistics, English. Written from doc/LANDING_PAGE_GUIDE.md §3.3 and
 * nothing else — see customers.fr.ts for the reasoning, which is the same in
 * both languages and was written there first.
 */
export const caseStudy: CaseStudyPage = {
  meta: {
    title: "Smart Logistics, Cameroon — Praxis LS",
    description:
      "Smart Logistics, in Cameroon, replaced an 84-table legacy system end to end, accounting included. What we publish about that migration, and what we will not.",
  },
  eyebrow: "CUSTOMER",
  heading: "Smart Logistics, Cameroon",
  lead: "Live at Smart Logistics, Cameroon — an 84-table legacy system replaced end to end, accounting included.",
  factsHeading: "What we publish",
  facts: [
    {
      term: "Live",
      line: "Smart Logistics runs on Praxis LS today, in Cameroon.",
    },
    {
      term: "84 tables",
      line: "That is the size of the legacy system that was replaced.",
    },
    {
      term: "End to end",
      line: "The replacement covered the whole system, not one module set down beside the old one.",
    },
    {
      term: "Accounting included",
      line: "The accounts came with it — the part most replacements leave behind.",
    },
  ],
  sanitisationHeading: "What we will not publish",
  sanitisationBody:
    "Smart Logistics consented to be named with light sanitisation: their name, their logo, their sector — no operational volumes, no revenue, no client names. This page keeps to that. What is written above describes our migration, which is ours to tell; the rest belongs to Smart Logistics and will be published only if they decide to publish it.",
  emptyLine:
    "So there is no quotation, no chart and no figure on this page. What is missing is missing because nobody has cleared it, and a case study is written with the customer, never on their behalf.",
  closeHeading: "Let’s look at your operation.",
  closeLine: "Thirty minutes, your files, your questions. We’ll show you the ledger behind them.",
};
