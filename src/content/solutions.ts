/**
 * The five solution pages as one table: which id is which route, in which
 * order, in both languages.
 *
 * The header menu, the footer, the coverage grid and each page's
 * related-pages block all read this. A solution page therefore has exactly one
 * label per language and exactly one URL per language, and adding a sixth page
 * is one entry here plus its copy — not five files to remember.
 */
import type { Locale, RouteKey } from "~/i18n/routes";
import type { CaseStudyPage, SolutionsCopy } from "./page-types";
import { solutions as solutionsEn } from "./solutions.en";
import { solutions as solutionsFr } from "./solutions.fr";
import { caseStudy as caseStudyEn } from "./customers.en";
import { caseStudy as caseStudyFr } from "./customers.fr";

export type SolutionId = keyof SolutionsCopy;

export const SOLUTIONS: Record<Locale, SolutionsCopy> = { en: solutionsEn, fr: solutionsFr };

export const CASE_STUDY: Record<Locale, CaseStudyPage> = { en: caseStudyEn, fr: caseStudyFr };

/** The slugs are LANDING_PAGE_GUIDE.md §2's, localised, and they live in
 *  src/i18n/routes.ts. This is only which page is which. */
export const SOLUTION_ROUTE: Record<SolutionId, RouteKey> = {
  freight: "solutions/freight-forwarding-customs",
  warehouse: "solutions/warehouse",
  fleet: "solutions/fleet",
  finance: "solutions/finance-ohada",
  platform: "solutions/platform-it",
};

/** Menu order — the order WEB_BUILD_BRIEF.md §4 lists them in: freight
 *  forwarding & customs · warehouse · fleet · finance & OHADA · platform/IT. */
export const SOLUTION_ORDER: readonly SolutionId[] = [
  "freight",
  "warehouse",
  "fleet",
  "finance",
  "platform",
];

export function solutionNav(
  locale: Locale,
): { id: SolutionId; route: RouteKey; label: string; blurb: string }[] {
  return SOLUTION_ORDER.map((id) => ({
    id,
    route: SOLUTION_ROUTE[id],
    label: SOLUTIONS[locale][id].navLabel,
    blurb: SOLUTIONS[locale][id].navBlurb,
  }));
}
