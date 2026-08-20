/**
 * FAQPage JSON-LD, generated from the same array the page renders.
 *
 * The guide asks for FAQPage on /pricing and /security (§5). Building it from
 * the copy deck rather than writing it out separately is what stops the two
 * from disagreeing — and a JSON-LD block that says something the page does not
 * is a manual action waiting to happen, not a nice-to-have.
 */
import type { FaqEntry } from "~/content/page-types";

export function faqPageJsonLd(entries: readonly FaqEntry[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}
