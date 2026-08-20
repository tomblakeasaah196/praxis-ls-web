import type { HomeCopy } from "./types";

/**
 * The French homepage, from doc/LANDING_PAGE_GUIDE.md §3 at praxis-ls@807fc1a.
 *
 * French is the SOURCE language for this domain (BRAND_GLOSSARY_FR_EN.md §0),
 * so this file is the original and home.en.ts is its peer. Verbatim (N1), with
 * exactly two mechanical additions the guide's markdown could not carry:
 *
 *   - U+202F, the narrow no-break space, before « : ; ! ? » (N8 · glossary §5.1).
 *     The guide writes an ordinary space there because markdown source does;
 *     published French does not.
 *   - U+00A0 between a figure and the noun it counts — 17 États membres — so a
 *     line break never separates them.
 *
 * Neither changes a word. Both are logged in HANDOFF.md § Deviations.
 *
 * DRAFTED, not specified — flagged in HANDOFF.md § Draft copy:
 *   meta.description · coverage.* · pricing.heading/intro/tiers · the four tab
 *   labels · standards.link · the section labels that name a landmark.
 */
export const home: HomeCopy = {
  meta: {
    title: "Praxis LS — l’ERP natif OHADA pour les opérateurs logistiques",
    description:
      "Un seul système pour vos dossiers d’exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s’impute. Praxis LS pilote toute l’exploitation sur un grand livre nativement OHADA/SYSCOHADA.",
  },

  hero: {
    eyebrow: "ERP NATIF OHADA POUR LES OPÉRATEURS LOGISTIQUES",
    h1: "Un seul système pour vos dossiers d’exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s’impute.",
    sub: "Praxis LS pilote toute l’exploitation sur un grand livre nativement OHADA/SYSCOHADA. Chaque dossier de transit, chaque livraison, chaque facture s’impute d’elle-même. La clôture devient une relecture, pas une reconstitution.",
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir comment ça marche",
    screenshotAlt:
      "Image d’attente du dossier d’exploitation, vue 360°, thème sombre, interface en français",
  },

  credibility: {
    lead: {
      before: "En production chez ",
      strong: "Smart Logistics",
      after:
        ", Cameroun — un système hérité de 84 tables remplacé de bout en bout, comptabilité comprise.",
    },
    facts: ["OHADA · 17 États membres", "70 modules", "Une base de données dédiée par client"],
  },

  problem: {
    heading: "Vous pilotez l’exploitation dans un système et la comptabilité dans un autre.",
    body: "Le dossier se clôture en mars. L’écriture est passée en juin, par quelqu’un qui relit un tableur et un fil WhatsApp. Au moment de monter la DSF, plus personne ne sait quelle marge était la vraie.",
  },

  spine: {
    heading: "Chaque opération s’impute d’elle-même.",
    body: "Praxis LS n’est pas un outil d’exploitation doté d’un export comptable. Le grand livre en est la colonne vertébrale : un jalon, un débours, un bon de livraison, une facture — chacun porte ses propres règles d’imputation, en SYSCOHADA, au moment où il se produit. Plan comptable, moteur fiscal, journaux et états financiers ne font qu’un avec l’exploitation, au lieu de négocier avec elle tous les mois.",
    chain: [
      "Dossier d’exploitation",
      "jalon",
      "chiffrage",
      "facture",
      "écriture",
      "grand livre",
      "DSF",
    ],
    diagramLabel:
      "La chaîne d’imputation : dossier d’exploitation, jalon, chiffrage, facture, écriture, grand livre, DSF.",
  },

  tower: {
    heading: "Un dossier. Du devis à la clôture.",
    body: "Devis, ordre de transit, dédouanement, camionnage, entrepôt, livraison, facture, règlement. Un seul dossier porte l’ensemble — avec ses documents, ses coûts, sa marge et ses écritures attachés. Ouvrez-le en mars ou dans trois ans : il dit la même chose.",
    steps: [
      { label: "Devis", ledger: "Devis" },
      { label: "Ordre de transit", ledger: "Ordre de transit" },
      { label: "Dédouanement", ledger: "Dédouanement" },
      { label: "Camionnage", ledger: "Camionnage" },
      { label: "Entrepôt", ledger: "Entrepôt" },
      { label: "Livraison", ledger: "Livraison" },
      { label: "Facture", ledger: "Facture" },
      { label: "Règlement", ledger: "Règlement" },
    ],
    ledgerHeading: "Grand livre",
    /* Aucun montant. Les numéros de comptes SYSCOHADA et les montants ne
       figurent pas dans les documents sources, et les inventer sur la page qui
       défend la fiabilité du grand livre serait le pire endroit pour le faire
       (N12). */
    ledgerAmount: "—",
    diagramLabel:
      "Un dossier d’exploitation avance de jalon en jalon, chacun imputant une ligne au grand livre.",
    staticNotice: "L’animation est désactivée : votre système demande un mouvement réduit.",
  },

  roles: {
    heading: "Ce que chacun y trouve",
    tabs: [
      {
        id: "direction",
        label: "Direction",
        line: "Voir toute l’entreprise sans demander de rapport à personne.",
      },
      {
        id: "operations",
        label: "Exploitation",
        line: "Chaque dossier, chaque jalon, chaque exception, sur un seul tableau.",
      },
      {
        id: "finance",
        label: "Finance",
        line: "Un grand livre défendable devant un auditeur, ligne par ligne.",
      },
      {
        id: "it",
        label: "DSI",
        line: "Une base de données par client. Vos données, vos accès, votre porte de sortie.",
      },
    ],
  },

  coverage: {
    heading: "Le périmètre couvert",
    intro: "Treize groupes de modules, un seul système, une base de données par client.",
    figure: "70",
    figureLabel: "modules",
    groups: [
      {
        numeral: "I",
        name: "Tableau de bord et espace de travail",
        line: "Un écran d’accueil filtré par rôle.",
      },
      {
        numeral: "II",
        name: "Données de référence",
        line: "Entités, clients, fournisseurs, plan comptable, devises et trésorerie.",
      },
      {
        numeral: "III",
        name: "Ressources humaines",
        line: "Contrats, présences, congés et une paie qui s’impute d’elle-même.",
      },
      {
        numeral: "IV",
        name: "Commercial et CRM",
        line: "Pistes, propositions et le pipeline qui les porte.",
      },
      {
        numeral: "V",
        name: "Chiffrage commercial",
        line: "Simulateurs de marge et de frais annexes, avant l’ouverture du dossier.",
      },
      {
        numeral: "VI",
        name: "Exploitation logistique",
        line: "Le dossier d’exploitation, les ordres de transit, les jalons, les bons de livraison.",
      },
      {
        numeral: "VII",
        name: "Entrepôt",
        line: "Réception, emplacements, stock, expédition, inventaire tournant.",
      },
      {
        numeral: "VIII",
        name: "Flotte",
        line: "Véhicules, conformité, entretien, affectation, carburant, chauffeurs.",
      },
      {
        numeral: "IX",
        name: "Coûts d’exploitation",
        line: "Chiffrage de dossier, suivi des coûts et régie d’avance.",
      },
      {
        numeral: "X",
        name: "Finance et trésorerie",
        line: "Factures, créances, immobilisations, journaux, grand livre, DSF.",
      },
      {
        numeral: "XI",
        name: "Achats",
        line: "Demandes d’achat, bons de commande et rapprochement à trois voies.",
      },
      {
        numeral: "XII",
        name: "Coffre documentaire",
        line: "Conservation sur dix ans, vérification QR, reporting.",
      },
      {
        numeral: "XIII",
        name: "Système et sécurité",
        line: "Habilitations, sessions, journal inaltérable.",
      },
    ],
  },

  intelligence: {
    heading: "L’intelligence, à l’intérieur des garde-fous.",
    body: "L’assistant rédige des propositions, lit les documents et prend la dictée, en français comme en anglais. Chaque action qu’il propose passe le même contrôle de validation qu’une action humaine, se heurte aux mêmes habilitations et atterrit dans la même piste d’audit. La consommation est mesurée par organisation et visible. Rien ne s’impute à votre grand livre parce qu’un modèle était sûr de lui.",
  },

  trust: {
    heading: "Nous détenons le code. Vous détenez vos données.",
    controls: [
      "Une base PostgreSQL dédiée par client — pas une table partagée avec une colonne client",
      "Un journal inaltérable : les écritures se contrepassent, elles ne se modifient pas",
      "Sauvegardes chiffrées quotidiennes de chaque base",
      "Des tests de restauration réellement exécutés et consignés",
      "Un moteur d’habilitations central — appliqué côté serveur, pas seulement masqué dans l’interface",
      "Conservation des documents sur dix ans, avec vérification QR sur les documents émis",
    ],
    link: "Voir notre posture de sécurité complète",
  },

  deployment: {
    heading: "Votre sous-domaine. Votre logo. Votre numérotation documentaire.",
    body: "Praxis LS tourne sur votresociete.praxisls.com, à vos couleurs, avec vos polices, dans les deux langues. Vos équipes l’installent comme une application. Vos documents portent votre marque. Un environnement de production et un environnement de test sont fournis d’office, et le second est purgé périodiquement pour que personne ne les confonde.",
    subdomainExample: "votresociete.praxisls.com",
  },

  standards: {
    heading: "Selon quelle norme clôturez-vous ?",
    rows: [
      {
        standard: "OHADA / SYSCOHADA",
        status: "En production — 17 États membres, DSF, liasse fiscale",
        state: "live",
      },
      { standard: "IFRS", status: "En cours de développement", state: "development" },
      { standard: "US GAAP", status: "Prévu", state: "planned" },
    ],
    note: "Nous publions ce tableau parce que vous êtes en droit de savoir ce que nous exploitons aujourd’hui et ce que nous construisons. Il est mis à jour quand le code l’est, pas quand la communication l’est.",
    columnStandard: "Norme",
    columnStatus: "Statut",
    link: "Voir la page des normes",
  },

  pricing: {
    heading: "Tarifé selon la taille, pas selon les modules",
    intro:
      "Trois niveaux. Un exploitant de quatre camions a besoin de la flotte et reste petit ; un transitaire de 200 personnes n’en a aucun besoin. Facturer par module fait payer les mauvaises entreprises.",
    tiers: [
      {
        name: "Core",
        covers:
          "Grand livre, dossiers d’exploitation, données de référence, facturation, achats. Tout s’impute.",
      },
      { name: "Operations", covers: "Core + entrepôt, flotte, chiffrage, portails." },
      {
        name: "Enterprise",
        covers:
          "Operations + multi-entités, base de données détenue par le client, SLA, migration.",
      },
    ],
    link: "Voir ce que couvre chaque niveau",
  },

  close: {
    heading: "Regardons votre exploitation ensemble.",
    body: "Trente minutes, vos dossiers, vos questions. Nous vous montrons le grand livre qui se trouve derrière.",
    cta: "Demander une démo",
  },
};
