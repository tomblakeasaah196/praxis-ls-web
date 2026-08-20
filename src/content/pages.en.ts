import type { PagesCopy } from "./page-types";
import { home } from "./home.en";

/**
 * The supporting pages, English.
 *
 * VERBATIM from doc/LANDING_PAGE_GUIDE.md (N1): /security’s six controls (§3.10,
 * reused from the homepage deck rather than retyped, so they cannot drift),
 * /standards' three rows and its note (§12), /pricing’s three tiers and add-ons
 * (§13).
 *
 * DRAFTED, and listed in HANDOFF.md § Draft copy: every intro, both FAQ sets,
 * all of /about, all of /contact’s chrome, and the two legal stubs. The guide
 * gives these pages their shape and their headings, not their prose.
 */
export const pages: PagesCopy = {
  security: {
    meta: {
      title: "Controls we operate — Praxis LS",
      description:
        "The security controls Praxis LS operates today: a dedicated database per customer, an immutable ledger, encrypted backups, recorded restore drills, server-side permissions and ten-year document retention.",
    },
    /* The heading is fixed by guide §3.10 and is deliberately not
       "Certifications", which we do not yet hold. */
    heading: "Controls we operate",
    intro:
      "This page lists what is running in the product today. Where a control is not in place, it is not on this page.",
    controlsHeading: "The six controls",
    controls: home.trust.controls,
    certificationHeading: "Certification",
    certificationLine:
      "We hold no third-party security certification today, and we do not describe controls as certified when they are not. This page is where a certification will be stated, with its scope and its date, once one exists.",
    faqHeading: "Questions we are asked",
    faq: [
      {
        question: "Where does our data live?",
        answer:
          "In a PostgreSQL database dedicated to your organisation — not a shared table with a tenant column. A live environment and a test environment come as standard, and the test one is wiped on a schedule.",
      },
      {
        question: "Can an entry be edited after it is posted?",
        answer:
          "No. The ledger is immutable: entries are reversed, never edited, and the reversal carries its own audit trail.",
      },
      {
        question: "Are backups tested?",
        answer:
          "Backups of every database are encrypted and taken daily, and restore drills are run and recorded rather than assumed.",
      },
      {
        question: "Are permissions enforced anywhere other than the interface?",
        answer:
          "A central policy engine enforces permissions server-side. Hiding a control in the interface is not access control, and we do not treat it as one.",
      },
    ],
  },

  standards: {
    meta: {
      title: "Standards — Praxis LS",
      description:
        "Which accounting standard Praxis LS closes in today, and what is being built. OHADA/SYSCOHADA is live across 17 member states, with DSF and liasse fiscale. IFRS is in development; US GAAP is planned.",
    },
    heading: "Which standard do you close in?",
    intro:
      "One table, three rows, and a promise about how it is maintained. It is the shortest page on this site and the one a DAF reads first.",
    rows: home.standards.rows,
    columnStandard: home.standards.columnStandard,
    columnStatus: home.standards.columnStatus,
    note: home.standards.note,
    updatedHeading: "How this table is kept",
    updatedLine:
      "The rows live in this site’s copy deck as data, in both languages side by side. Moving a standard from planned to live is a one-line edit in each language and nothing else moves — which is what makes the promise above keepable.",
  },

  pricing: {
    meta: {
      title: "Pricing — Praxis LS",
      description:
        "Three tiers by scale and commitment, not by module. Core, Operations and Enterprise, with add-ons for a customer-held database, data migration, extra environments and training. Price on request, quoted in XAF and EUR.",
    },
    heading: "Priced by scale, not by module",
    intro:
      "An operator with four trucks needs Fleet and is small; a 200-person forwarder needs none of it and is the larger deal. Charging by module charges the wrong people, so we do not.",
    tiers: [
      {
        name: "Core",
        covers: "Ledger, operation files, master data, invoicing, procurement. Everything posts.",
      },
      { name: "Operations", covers: "Core + warehouse, fleet, costing, portals." },
      {
        name: "Enterprise",
        covers: "Operations + multi-entity, customer-held database, SLA, migration.",
      },
    ],
    addOnsHeading: "Add-ons",
    addOns: [
      "Customer-held database credentials",
      "Data migration from your existing system",
      "Extra environments",
      "Training",
    ],
    aiHeading: "The assistant is in every tier",
    aiLine:
      "Baseline AI is included in every tier and metered per organisation. It is never an Enterprise gate — if it were, everything this site says about intelligence would be false for every Core customer, and this is the page where that gets checked.",
    quoteHeading: "The number",
    quoteLine:
      "Price on request, quoted in XAF and EUR. We publish the shape and not the figure: the shape is what tells you whether this is built for a company your size, and the figure depends on what you are migrating from.",
    faqHeading: "Questions we are asked",
    faq: [
      {
        question: "Is the price per module?",
        answer:
          "No. The tiers are by scale and commitment. Module-gating charges a four-truck operator for the thing they need most and charges a 200-person forwarder for nothing they use.",
      },
      {
        question: "Is the assistant an Enterprise feature?",
        answer:
          "No. Baseline AI is in every tier and metered per organisation, with the spend visible to you.",
      },
      {
        question: "Can we hold our own database credentials?",
        answer:
          "Yes, as an add-on. Every customer’s data already sits in its own database; direct credentialed access to administer it is a separate, priced offering.",
      },
      {
        question: "Which currency is a quotation in?",
        answer: "XAF and EUR.",
      },
    ],
    cta: "Book a demo",
  },

  about: {
    meta: {
      title: "About — Praxis LS",
      description:
        "Praxis LS is built by JBS Praxis LLC as the OHADA-native ERP for logistics operators: one system for operation files, warehouses, fleet and the accounting they all post to.",
    },
    heading: "The company behind the ledger",
    intro:
      "Praxis LS is built by JBS Praxis LLC. It is an ERP for logistics operators in the OHADA region, and its accounting core is the reason it exists rather than a module bolted to the side of it.",
    blocks: [
      {
        heading: "What we build",
        body: "One system for a logistics operator’s files, warehouses, fleet and accounting, on a native OHADA/SYSCOHADA ledger. Freight forwarding and customs, warehouse, fleet, costing, procurement, finance and treasury — seventy modules in thirteen groups, one database per customer.",
      },
      {
        heading: "Where it runs",
        body: "OHADA covers seventeen member states, and the accounting standard is identical across all of them. The first customer is in Cameroon; the product is not built for one country.",
      },
      {
        heading: "How we work",
        body: "We publish what is live and what is not — see the standards table. We publish the controls we operate rather than certifications we do not hold. Where a fact is not settled, this site leaves the space empty instead of filling it.",
      },
    ],
    openHeading: "What is not on this page yet",
    openLine:
      "Team names, biographies, photographs, the registered address and the company’s registration details are not published here yet. They are not in the documents this site was built from, and this site does not invent facts.",
  },

  contact: {
    meta: {
      title: "Book a demo — Praxis LS",
      description:
        "Thirty minutes, your files, your questions. Tell us what you are running today and we will show you the ledger behind your operation.",
    },
    heading: "Let’s look at your operation.",
    intro: "Thirty minutes, your files, your questions. We’ll show you the ledger behind them.",
    formHeading: "Book a demo",
    fields: {
      name: "Full name",
      email: "Work email",
      emailHint: "A company address helps us prepare the right examples.",
      company: "Company",
      country: "Country",
      countryHint: "Prefilled from your browser. Change it if it is wrong.",
      role: "Role",
      context: "What are you running today?",
      contextHint: "One line is plenty. This is the most useful field on the form.",
      optional: "optional",
    },
    roles: [
      { value: "dg", label: "DG" },
      { value: "operations", label: "Operations" },
      { value: "finance", label: "Finance" },
      { value: "it", label: "IT" },
      { value: "other", label: "Other" },
    ],
    submit: "Book a demo",
    submitting: "Sending…",
    errors: {
      required: "This field is required.",
      email: "Enter an email address, including the @.",
      summary: "Check the fields marked below.",
      notWired:
        "This form has no destination configured yet, so nothing was sent. That is a deliberate open question, not a fault — see HANDOFF.md.",
    },
    success: "Thank you. Your request has been recorded and someone will reply to you.",
    freeEmailNotice:
      "That looks like a personal address. You can send it as it is — a work address just helps us prepare.",
  },

  privacy: {
    meta: {
      title: "Privacy — Praxis LS",
      description:
        "The Praxis LS privacy notice. This page is a stub: the notice has not been drafted and no policy is stated here.",
    },
    heading: "Privacy",
    stubHeading: "This page is a stub",
    stubBody:
      "The privacy notice has not been written. Nothing is stated here, because a placeholder privacy notice is a statement about how data is handled and this one would not be true. It is listed as outstanding in HANDOFF.md.",
  },

  terms: {
    meta: {
      title: "Terms — Praxis LS",
      description:
        "The Praxis LS terms of use. This page is a stub: the terms have not been drafted and nothing is stated here.",
    },
    heading: "Terms",
    stubHeading: "This page is a stub",
    stubBody:
      "The terms of use have not been written. Nothing is stated here, because placeholder terms are terms. It is listed as outstanding in HANDOFF.md.",
  },
};
