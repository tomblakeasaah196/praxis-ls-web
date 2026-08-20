import type { HomeCopy } from "./types";

/**
 * The English homepage, from doc/LANDING_PAGE_GUIDE.md §3 at praxis-ls@807fc1a.
 *
 * Verbatim (N1). English is the guide’s peer translation of the French, not its
 * parent — see BRAND_GLOSSARY_FR_EN.md §0 — so it is transcribed here exactly
 * as written and is not "tightened" to fit a layout. Where a string did not fit,
 * the layout moved.
 *
 * DRAFTED, not specified — flagged in HANDOFF.md § Draft copy:
 *   meta.description · coverage.* · pricing.heading/intro · standards.link ·
 *   roles.heading · tower.ledgerHeading · the section labels that exist only to
 *   give a landmark an accessible name.
 */
export const home: HomeCopy = {
  meta: {
    title: "Praxis LS — the OHADA-native ERP for logistics operators",
    description:
      "One system for your operation files, your warehouses, your fleet — and the accounting they all post to. Praxis LS runs the whole operation on a native OHADA/SYSCOHADA ledger.",
  },

  hero: {
    eyebrow: "OHADA-NATIVE ERP FOR LOGISTICS OPERATORS",
    h1: "One system for your operation files, your warehouses, your fleet — and the accounting they all post to.",
    sub: "Praxis LS runs the whole operation on a native OHADA/SYSCOHADA ledger. Every transit file, every delivery, every invoice posts itself. Month-end becomes a review, not a reconstruction.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "See how it works",
    screenshotAlt: "Placeholder for the operation file, 360° view, dark theme, English interface",
  },

  credibility: {
    lead: {
      before: "Live at ",
      strong: "Smart Logistics",
      after: ", Cameroon — an 84-table legacy system replaced end to end, accounting included.",
    },
    facts: ["OHADA · 17 member states", "70 modules", "One dedicated database per customer"],
  },

  problem: {
    heading: "You run the operation in one system and the accounts in another.",
    body: "The file closes in March. The entry is posted in June, by someone reading a spreadsheet and a WhatsApp thread. By the time the DSF is assembled, nobody can say which margin was real.",
  },

  spine: {
    heading: "Every operation posts itself.",
    body: "Praxis LS is not an operations tool with an accounting export. The ledger is the spine: a milestone, a disbursement, a delivery note and an invoice each carry their own posting rules, in SYSCOHADA, at the moment they happen. The chart of accounts, the tax engine, the journals and the statements are one system with the operation — not a monthly negotiation with it.",
    chain: [
      "Operation file",
      "milestone",
      "costing",
      "invoice",
      "journal entry",
      "general ledger",
      "DSF",
    ],
    diagramLabel:
      "The posting chain: operation file, milestone, costing, invoice, journal entry, general ledger, DSF.",
  },

  tower: {
    heading: "One file. From quotation to closed books.",
    body: "Quotation, transit order, customs, haulage, warehouse, delivery, invoice, settlement. One file carries all of it — with its documents, its costs, its margin and its postings attached. Open it in March or in three years: it says the same thing.",
    steps: [
      { label: "Quotation", ledger: "Quotation" },
      { label: "Transit order", ledger: "Transit order" },
      { label: "Customs", ledger: "Customs" },
      { label: "Haulage", ledger: "Haulage" },
      { label: "Warehouse", ledger: "Warehouse" },
      { label: "Delivery", ledger: "Delivery" },
      { label: "Invoice", ledger: "Invoice" },
      { label: "Settlement", ledger: "Settlement" },
    ],
    ledgerHeading: "General ledger",
    /* No figure. SYSCOHADA account codes and amounts are not in the source
       documents, and inventing one on the page that argues the ledger is
       trustworthy would be the worst possible place to do it (N12). */
    ledgerAmount: "—",
    diagramLabel:
      "One operation file advancing through its milestones, each one posting a line to the general ledger.",
    staticNotice: "Animation is off because your system asks for reduced motion.",
  },

  roles: {
    heading: "What each of you gets",
    tabs: [
      {
        id: "direction",
        label: "Direction",
        line: "See the whole company without asking anyone for a report.",
      },
      {
        id: "operations",
        label: "Operations",
        line: "Every file, every milestone, every exception, on one board.",
      },
      {
        id: "finance",
        label: "Finance",
        line: "A ledger you can defend to an auditor, line by line.",
      },
      {
        id: "it",
        label: "IT",
        line: "One database per customer. Your data, your credentials, your exit.",
      },
    ],
  },

  coverage: {
    heading: "What is covered",
    intro: "Thirteen module groups, one system, one database per customer.",
    figure: "70",
    figureLabel: "modules",
    groups: [
      { numeral: "I", name: "Dashboard & Workspace", line: "A home screen filtered by role." },
      {
        numeral: "II",
        name: "Master Data",
        line: "Entities, clients, suppliers, chart of accounts, currency and treasury.",
      },
      {
        numeral: "III",
        name: "HR",
        line: "Contracts, attendance, leave and payroll that posts itself.",
      },
      {
        numeral: "IV",
        name: "Sales & CRM",
        line: "Leads, proposals and the pipeline behind them.",
      },
      {
        numeral: "V",
        name: "Commercial & Pricing",
        line: "Margin and extra-charge simulators, before the file opens.",
      },
      {
        numeral: "VI",
        name: "Logistics Operations",
        line: "The operation file, transit orders, milestones, delivery notes.",
      },
      {
        numeral: "VII",
        name: "Warehouse",
        line: "Receiving, locations, inventory, dispatch, cycle counting.",
      },
      {
        numeral: "VIII",
        name: "Fleet",
        line: "Vehicles, compliance, maintenance, dispatch, fuel, drivers.",
      },
      {
        numeral: "IX",
        name: "Ops Costing",
        line: "Project costing, cost tracking and the régie d’avance.",
      },
      {
        numeral: "X",
        name: "Finance & Treasury",
        line: "Invoices, receivables, assets, journals, general ledger, DSF.",
      },
      {
        numeral: "XI",
        name: "Procurement",
        line: "Purchase requests, orders and the three-way match.",
      },
      {
        numeral: "XII",
        name: "Document Vault & Insights",
        line: "Ten-year retention, QR verification, reporting.",
      },
      {
        numeral: "XIII",
        name: "System & Security",
        line: "Access rights, sessions, the immutable ledger.",
      },
    ],
  },

  intelligence: {
    heading: "Intelligence inside the guardrails.",
    body: "The assistant drafts proposals, reads documents and takes dictation in French and English. Every action it proposes passes the same validation gate as a human’s, is checked against the same permissions, and lands in the same audit trail. Spend is metered per organisation and visible to you. Nothing posts to your ledger because a model was confident.",
  },

  trust: {
    heading: "We hold the code. You hold the data.",
    controls: [
      "A dedicated PostgreSQL database per customer — not a shared table with a tenant column",
      "An immutable ledger: entries are reversed, never edited",
      "Encrypted daily backups of every database",
      "Restore drills that are run and recorded, not assumed",
      "A central policy engine — permissions enforced server-side, not just hidden in the UI",
      "Ten-year document retention, with QR verification on issued documents",
    ],
    link: "See the full security posture",
  },

  deployment: {
    heading: "Your subdomain. Your logo. Your document numbering.",
    body: "Praxis LS runs at yourcompany.praxisls.com in your colours, your fonts and both languages. Your team installs it as an app. Your documents carry your branding. A live environment and a test environment come as standard, and the test one is wiped on a schedule so nobody confuses the two.",
    subdomainExample: "yourcompany.praxisls.com",
  },

  standards: {
    heading: "Which standard do you close in?",
    rows: [
      {
        standard: "OHADA / SYSCOHADA",
        status: "Live — 17 member states, DSF, liasse fiscale",
        state: "live",
      },
      { standard: "IFRS", status: "In development", state: "development" },
      { standard: "US GAAP", status: "Planned", state: "planned" },
    ],
    note: "We publish this table because you are entitled to know what we run today and what we are building. It is updated when the code is, not when the marketing is.",
    columnStandard: "Standard",
    columnStatus: "Status",
    link: "See the standards page",
  },

  pricing: {
    heading: "Priced by scale, not by module",
    intro:
      "Three tiers. An operator with four trucks needs Fleet and is small; a 200-person forwarder needs none of it. Module-gating charges the wrong people.",
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
    link: "See what each tier covers",
  },

  close: {
    heading: "Let’s look at your operation.",
    body: "Thirty minutes, your files, your questions. We’ll show you the ledger behind them.",
    cta: "Book a demo",
  },
};
