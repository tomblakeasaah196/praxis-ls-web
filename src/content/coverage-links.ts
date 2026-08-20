/**
 * Which solution page each of the thirteen module groups links to (guide §3.8:
 * "group name, one line, link to the relevant solution page").
 *
 * Keyed by the Roman numeral of praxis-ls README §4, which both language decks
 * already carry — so the two languages cannot drift apart on where a cell
 * points, and the mapping can be checked against the module map without
 * reading French.
 *
 * Judgement calls worth naming, because they are the ones a reviewer will
 * question: procurement (XI) points at the warehouse page, where the three-way
 * match is described at the point of receiving rather than at the point of
 * payment; ops costing (IX) points at freight forwarding, because a débours is
 * incurred on a file; HR (III) points at finance, because the only thing the
 * homepage claims about payroll is that it posts itself.
 */
import type { SolutionId } from "./solutions";

export const COVERAGE_SOLUTION: Record<string, SolutionId> = {
  I: "platform",
  II: "finance",
  III: "finance",
  IV: "freight",
  V: "freight",
  VI: "freight",
  VII: "warehouse",
  VIII: "fleet",
  IX: "freight",
  X: "finance",
  XI: "warehouse",
  XII: "platform",
  XIII: "platform",
};
