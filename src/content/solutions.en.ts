import type { SolutionsCopy } from "./page-types";

/**
 * The five solution pages, English — written as its own document, not as a
 * mirror of the French (BRAND_GLOSSARY_FR_EN.md §0). The French was drafted
 * first and the English says the same things in the order English says them;
 * where a sentence would only work as a translation it was cut.
 *
 * DRAFT COPY, listed in HANDOFF.md § Draft copy.
 *
 * Three French terms stay French here on purpose — liasse fiscale, régie
 * d'avance, débours (glossary §6). There is no English equivalent a reader in
 * this market would recognise, and using the French signals that we know the
 * domain.
 */
export const solutions: SolutionsCopy = {
  freight: {
    meta: {
      title: "Freight forwarding and customs software — Praxis LS",
      description:
        "Freight forwarding software for operators in Africa: the operation file from quotation through customs clearance, haulage and delivery to the invoice — and the SYSCOHADA entry each milestone posts.",
    },
    navLabel: "Freight forwarding & customs",
    navBlurb: "The file, from quotation to settlement.",
    eyebrow: "FREIGHT FORWARDING AND CUSTOMS",
    heading: "Freight forwarding and customs, on a ledger that closes itself.",
    intro:
      "Praxis LS carries the operation file end to end: quotation, transit order, customs, haulage, warehouse, delivery, invoice, settlement. One file carries all of it — with its documents, its costs, its margin and its postings attached.",
    coversHeading: "What the file carries",
    covers: [
      {
        name: "Operation file",
        line: "One file per job, opened at the quotation and closed at settlement.",
      },
      {
        name: "Transit orders",
        line: "The customer’s instruction becomes the file itself, not an attachment beside it.",
      },
      {
        name: "Milestones",
        line: "Every file, every milestone, every exception, on one board.",
      },
      {
        name: "Delivery notes",
        line: "Issued from the file and kept with it, alongside the rest of the paperwork.",
      },
      {
        name: "Débours and régie d’avance",
        line: "Advances made on the customer’s behalf are tracked where they are incurred.",
      },
      {
        name: "Costing and margin",
        line: "Margin and extra-charge simulators, before the file is opened.",
      },
      {
        name: "Invoicing",
        line: "Proforma invoice, final invoice, receivables — raised from the file.",
      },
    ],
    postingHeading: "The entry does not wait for the file to close.",
    postingBody:
      "A milestone, a disbursement, a delivery note and an invoice each carry their own posting rules, in SYSCOHADA, at the moment they happen. There is no month-end accounting export, because there is nothing left to export — the entry was posted when the thing happened, in the journal it belonged in.",
    chainLabel: "One transit file, end to end",
    chain: [
      "Quotation",
      "Transit order",
      "Customs",
      "Haulage",
      "Delivery",
      "Invoice",
      "Journal entry",
    ],
    screenshot: {
      screen: "control-tower",
      alt: "Milestone tracking for one operation file in Praxis LS.",
    },
    relatedHeading: "The other areas",
    closeHeading: "Let’s look at one of your files.",
    closeLine: "Thirty minutes, your files, your questions.",
  },

  warehouse: {
    meta: {
      title: "Warehouse management software (WMS) — Praxis LS",
      description:
        "Receiving, locations, inventory, dispatch and cycle counting in the system that already holds your files, your customers and your ledger — with the three-way match where the goods are received.",
    },
    navLabel: "Warehouse",
    navBlurb: "From goods received to dispatch.",
    eyebrow: "WAREHOUSE",
    heading: "The warehouse, from goods received to dispatch.",
    intro:
      "Receiving, locations, inventory, dispatch, cycle counting, equipment. The warehouse is not a separate system to be reconciled later: it shares the files, the customers and the ledger with the rest of the operation.",
    coversHeading: "What the warehouse covers",
    covers: [
      { name: "Receiving", line: "Goods arriving, and the goods received note that records them." },
      {
        name: "Space and locations",
        line: "Where a thing is, so that finding it is not somebody’s memory.",
      },
      { name: "Inventory", line: "What is in stock, what is reserved, what is available." },
      {
        name: "Dispatch",
        line: "Outbound, its preparation, and the documents that travel with it.",
      },
      {
        name: "Cycle counting",
        line: "Regular counts instead of an annual shutdown of the warehouse.",
      },
      { name: "Equipment", line: "The warehouse’s own equipment and its upkeep." },
    ],
    postingHeading: "Receiving meets the order and the invoice.",
    postingBody:
      "A goods received note is matched against the purchase order and the supplier invoice — the three-way match happens in the same system as the receiving, not in a spreadsheet that reads all three afterwards. Whatever ends in an entry carries one.",
    chainLabel: "One receipt, end to end",
    chain: [
      "Purchase order",
      "Receiving",
      "Goods received note",
      "Three-way match",
      "Supplier invoice",
      "Journal entry",
    ],
    screenshot: {
      screen: "control-tower",
      alt: "Warehouse movements tracked in Praxis LS.",
    },
    relatedHeading: "The other areas",
    closeHeading: "Let’s look at your warehouse.",
    closeLine: "Thirty minutes, your flows, your questions.",
  },

  fleet: {
    meta: {
      title: "Fleet management software — Praxis LS",
      description:
        "Vehicles, compliance and renewals, maintenance, dispatch, fuel, drivers and incidents — tracked in the system that already carries the files, the costs and the ledger.",
    },
    navLabel: "Fleet",
    navBlurb: "Vehicles, renewals, running costs.",
    eyebrow: "FLEET",
    heading: "The fleet, its renewals and its costs, in the system that carries the files.",
    intro:
      "Vehicles, compliance and renewals, maintenance, dispatch, fuel, drivers, incidents. A fleet is run well when you know what it costs, and you know what it costs when its spending lives where everything else does.",
    coversHeading: "What the fleet covers",
    covers: [
      { name: "Vehicle registry", line: "The fleet, vehicle by vehicle, with its paperwork." },
      {
        name: "Compliance and renewals",
        line: "Renewals that remind you before the vehicle is off the road, not after.",
      },
      { name: "Maintenance", line: "Scheduled upkeep and repairs, with what each one cost." },
      { name: "Dispatch", line: "Which vehicle is out, on which file, with which driver." },
      { name: "Fuel", line: "Fuel tracked per vehicle." },
      { name: "Drivers", line: "Drivers, their documents and their assignments." },
      {
        name: "Incidents",
        line: "What happens on the road, recorded where it will be found again.",
      },
    ],
    postingHeading: "A fleet cost is an entry, not a spreadsheet row.",
    postingBody:
      "Fuel, maintenance, a repair after an incident: these are costs, and a cost posts. They are captured where they are incurred, with the vehicle and the assignment that explain them, and they turn up in cost tracking and in the general ledger alike.",
    chainLabel: "One fleet cost, end to end",
    chain: ["Vehicle", "Dispatch", "Fuel or maintenance", "Operating cost", "Journal entry"],
    relatedHeading: "The other areas",
    closeHeading: "Let’s look at your fleet.",
    closeLine: "Thirty minutes, your vehicles, your questions.",
  },

  finance: {
    meta: {
      title: "OHADA ERP and SYSCOHADA accounting — Praxis LS",
      description:
        "A natively OHADA ERP: the SYSCOHADA chart of accounts, journals, general ledger, trial balance, financial statements, DSF and liasse fiscale. The operation posts to it as it happens, across 17 member states.",
    },
    navLabel: "Finance & OHADA",
    navBlurb: "SYSCOHADA, DSF, liasse fiscale.",
    eyebrow: "FINANCE AND OHADA",
    heading: "SYSCOHADA accounting that is never reconstructed.",
    intro:
      "The chart of accounts, the tax engine, the journals and the statements are one system with the operation — not a monthly negotiation with it. Month-end becomes a review, not a reconstruction.",
    coversHeading: "What finance covers",
    covers: [
      {
        name: "Chart of accounts",
        line: "The SYSCOHADA chart of accounts, and yours on top of it.",
      },
      { name: "Journals and ledger", line: "The journals, the general ledger, the trial balance." },
      {
        name: "Financial statements",
        line: "Statements, the DSF (Déclaration Statistique et Fiscale) and the liasse fiscale.",
      },
      { name: "Tax", line: "VAT and withholding tax, by the entity’s tax jurisdiction." },
      {
        name: "Receivables and payables",
        line: "Customer receivables, supplier payables, chasing.",
      },
      {
        name: "Fixed assets",
        line: "Fixed assets and their depreciation, calculated and posted.",
      },
      { name: "Treasury and currency", line: "Treasury, currencies and the rates between them." },
      {
        name: "Immutable ledger",
        line: "Entries are reversed, never edited.",
      },
    ],
    postingHeading: "Nothing is posted in June for a file that closed in March.",
    postingBody:
      "An operation carries its own posting rules. When it happens, the entry is made, in the journal it belonged in, with the document that justifies it attached. What an auditor asks for — the paper behind the line — is one click from the line, not in a box in a store room.",
    chainLabel: "One entry, end to end",
    chain: [
      "Operation",
      "Posting rule",
      "Journal entry",
      "Journal",
      "General ledger",
      "Financial statements",
      "DSF",
    ],
    screenshot: {
      screen: "general-ledger",
      alt: "The general ledger in Praxis LS, showing an entry an operation posted itself.",
    },
    outLink: { label: "Which standard do you close in?", route: "standards" },
    relatedHeading: "The other areas",
    closeHeading: "Let’s look at your close.",
    closeLine: "Thirty minutes, your accounts, your questions.",
  },

  platform: {
    meta: {
      title: "Platform, data and operations — Praxis LS",
      description:
        "A dedicated PostgreSQL database per customer, two environments, permissions enforced server-side, an immutable ledger and ten-year document retention. What IT wants to know before saying yes.",
    },
    navLabel: "Platform & IT",
    navBlurb: "One database per customer, your access.",
    eyebrow: "PLATFORM AND IT",
    heading: "One database per customer. Your data, your credentials, your exit.",
    intro:
      "Praxis LS runs at your subdomain, in your colours, in both languages, with a live environment and a test environment as standard. What IT looks at first is not the screen: it is where the data lives and how it comes back out.",
    coversHeading: "What IT needs to know",
    covers: [
      {
        name: "Dedicated database",
        line: "A PostgreSQL database per customer — not a shared table with a tenant column.",
      },
      {
        name: "Two environments",
        line: "Live and test as standard, the test one wiped on a schedule so nobody confuses them.",
      },
      {
        name: "Permissions",
        line: "A central policy engine, enforced server-side, not just hidden in the UI.",
      },
      { name: "Sessions", line: "Sessions and access, visible and revocable." },
      { name: "Audit trail", line: "An immutable ledger: what was done, by whom, when." },
      {
        name: "Document vault",
        line: "Ten-year retention, with QR verification on issued documents.",
      },
      {
        name: "Backups",
        line: "Encrypted daily backups, and restore drills that are run and recorded.",
      },
      {
        name: "White-label",
        line: "Your subdomain, your logo, your document numbering.",
      },
    ],
    postingHeading: "Your exit is part of the arrangement.",
    postingBody:
      "The credentials to your database can be held by you: it is a line on the pricing page, not a favour to be negotiated on the day you leave. A dedicated database per customer is what makes that sentence keepable — there is nobody else’s data tangled up in yours.",
    chainLabel: "What surrounds your data",
    chain: [
      "Organisation",
      "Dedicated database",
      "Permissions",
      "Audit trail",
      "Encrypted backup",
      "Restore drill",
    ],
    screenshot: {
      screen: "general-ledger",
      alt: "An entry and its audit trail in Praxis LS.",
    },
    outLink: { label: "See the full security posture", route: "security" },
    relatedHeading: "The other areas",
    closeHeading: "Let’s look at your architecture.",
    closeLine: "Thirty minutes, your constraints, your questions.",
  },
};
