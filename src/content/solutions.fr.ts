import type { SolutionsCopy } from "./page-types";

/**
 * Les cinq pages solutions, en français — la langue source de ce domaine
 * (BRAND_GLOSSARY_FR_EN.md §0).
 *
 * TEXTE PROVISOIRE. doc/LANDING_PAGE_GUIDE.md §2 donne les adresses de ces
 * pages et §5 leur donne un travail — se positionner sur « logiciel transitaire
 * Cameroun », « ERP OHADA », « logiciel de dédouanement », « comptabilité
 * SYSCOHADA » — mais aucun de leurs mots. Tout ce qui suit est rédigé à partir
 * de la carte des modules (README §4 de praxis-ls), du glossaire et de la voix
 * de la page d'accueil, et attend une relecture (HANDOFF.md § Draft copy).
 *
 * Ce que ces pages ne font pas : promettre un module qui n'est pas dans la
 * carte des modules. Le dédouanement, par exemple, est un jalon du dossier
 * — c'est ce que dit le guide §3.6 — et non un module de télédéclaration, donc
 * la page le décrit comme un jalon.
 *
 * Typographie : U+202F avant « : ; ! ? », guillemets avec espace insécable à
 * l'intérieur, capitales accentuées, phrases en casse normale (N8).
 */
export const solutions: SolutionsCopy = {
  freight: {
    meta: {
      title: "Logiciel de transit et de dédouanement — Praxis LS",
      description:
        "Le logiciel des transitaires au Cameroun et dans les 17 États membres de l’OHADA : dossier d’exploitation, dédouanement, camionnage, débours, facturation — et l’écriture comptable qui suit chaque jalon.",
    },
    navLabel: "Transit et dédouanement",
    navBlurb: "Le dossier, du devis au règlement.",
    eyebrow: "TRANSIT ET DÉDOUANEMENT",
    heading: "Un logiciel de transit et de dédouanement, sur un grand livre OHADA.",
    intro:
      "Praxis LS tient le dossier d’exploitation de bout en bout : devis, ordre de transit, dédouanement, camionnage, entrepôt, livraison, facture, règlement. Un seul dossier porte l’ensemble, avec ses documents, ses coûts, sa marge et ses écritures attachés.",
    coversHeading: "Ce que le dossier porte",
    covers: [
      {
        name: "Dossier d’exploitation",
        line: "Un dossier par opération, ouvert au devis et refermé au règlement.",
      },
      {
        name: "Ordres de transit",
        line: "L’instruction du client devient le dossier lui-même, pas une pièce jointe à côté.",
      },
      {
        name: "Jalons",
        line: "Chaque dossier, chaque jalon, chaque exception, sur un seul tableau.",
      },
      {
        name: "Bons de livraison",
        line: "Émis depuis le dossier, ils y restent attachés avec le reste des pièces.",
      },
      {
        name: "Débours et régie d’avance",
        line: "Les avances engagées pour le compte du client sont suivies là où elles sont engagées.",
      },
      {
        name: "Chiffrage et marge",
        line: "Simulateur de marge et de frais annexes, avant l’ouverture du dossier.",
      },
      {
        name: "Facturation",
        line: "Facture proforma, facture définitive, créances clients — depuis le dossier.",
      },
    ],
    postingHeading: "L’écriture n’attend pas la fin du dossier.",
    postingBody:
      "Un jalon, un débours, un bon de livraison, une facture : chacun porte ses propres règles d’imputation, en SYSCOHADA, au moment où il se produit. Il n’y a pas d’export comptable à la fin du mois, parce qu’il n’y a rien à exporter — l’écriture est déjà passée, dans le journal où elle devait aller.",
    chainLabel: "Le parcours d’un dossier de transit",
    chain: [
      "Devis",
      "Ordre de transit",
      "Dédouanement",
      "Camionnage",
      "Livraison",
      "Facture",
      "Écriture comptable",
    ],
    screenshot: {
      screen: "control-tower",
      alt: "Le suivi des jalons d’un dossier dans Praxis LS.",
    },
    relatedHeading: "Les autres périmètres",
    closeHeading: "Regardons un de vos dossiers.",
    closeLine: "Trente minutes, vos dossiers, vos questions.",
  },

  warehouse: {
    meta: {
      title: "Logiciel d’entrepôt (WMS) — Praxis LS",
      description:
        "Réception, emplacements, stock, expédition, inventaire tournant. L’entrepôt partage les dossiers, les clients et le grand livre du reste de l’exploitation, et le rapprochement à trois voies se fait au même endroit que la réception.",
    },
    navLabel: "Entrepôt",
    navBlurb: "De la réception à l’expédition.",
    eyebrow: "ENTREPÔT",
    heading: "L’entrepôt, du bon de réception à l’expédition.",
    intro:
      "Réception, emplacements, stock, expédition, inventaire tournant, équipements. L’entrepôt n’est pas un système à part qu’il faudra réconcilier : il partage les dossiers, les clients et le grand livre du reste de l’exploitation.",
    coversHeading: "Ce que couvre l’entrepôt",
    covers: [
      {
        name: "Réception",
        line: "L’arrivée de la marchandise et le bon de réception qui la constate.",
      },
      {
        name: "Emplacements",
        line: "L’espace et les emplacements, pour savoir où se trouve ce que vous gardez.",
      },
      { name: "Stock", line: "Le stock, ce qui est réservé, ce qui est disponible." },
      { name: "Expédition", line: "La sortie, sa préparation et les documents qui la suivent." },
      {
        name: "Inventaire tournant",
        line: "Des comptages réguliers plutôt qu’un arrêt annuel de l’entrepôt.",
      },
      { name: "Équipements", line: "Les engins de l’entrepôt et leur suivi." },
    ],
    postingHeading: "La réception rencontre la commande et la facture.",
    postingBody:
      "Un bon de réception se rapproche du bon de commande et de la facture fournisseur — le rapprochement à trois voies se fait dans le même système que la réception elle-même, pas dans un tableur qui relit les trois après coup. Ce qui se termine par une écriture la porte.",
    chainLabel: "Le parcours d’une réception",
    chain: [
      "Bon de commande",
      "Réception",
      "Bon de réception",
      "Rapprochement à trois voies",
      "Facture fournisseur",
      "Écriture comptable",
    ],
    screenshot: {
      screen: "control-tower",
      alt: "Le suivi des mouvements d’entrepôt dans Praxis LS.",
    },
    relatedHeading: "Les autres périmètres",
    closeHeading: "Regardons votre entrepôt.",
    closeLine: "Trente minutes, vos flux, vos questions.",
  },

  fleet: {
    meta: {
      title: "Gestion de flotte et de parc automobile — Praxis LS",
      description:
        "Véhicules, conformité et renouvellements, entretien, affectation, carburant, chauffeurs, incidents. Le parc est suivi dans le système qui porte déjà les dossiers, les coûts et le grand livre.",
    },
    navLabel: "Flotte",
    navBlurb: "Le parc, ses échéances, ses coûts.",
    eyebrow: "FLOTTE",
    heading: "Le parc, ses échéances et ses coûts, dans le système qui porte les dossiers.",
    intro:
      "Véhicules, conformité et renouvellements, entretien, affectation, carburant, chauffeurs, incidents. Un parc se gère bien quand on sait ce qu’il coûte, et on sait ce qu’il coûte quand ses dépenses vivent au même endroit que le reste.",
    coversHeading: "Ce que couvre le parc",
    covers: [
      {
        name: "Registre des véhicules",
        line: "Le parc automobile, véhicule par véhicule, avec ses pièces.",
      },
      {
        name: "Conformité et échéances",
        line: "Les renouvellements qui se rappellent à vous avant l’immobilisation, pas après.",
      },
      { name: "Entretien", line: "L’entretien programmé et les réparations, avec leur coût." },
      {
        name: "Affectation des véhicules",
        line: "Qui roule, pour quel dossier, avec quel chauffeur.",
      },
      { name: "Carburant", line: "Le suivi du carburant, par véhicule." },
      { name: "Chauffeurs", line: "Les chauffeurs, leurs pièces et leurs affectations." },
      { name: "Incidents", line: "Ce qui arrive sur la route, consigné là où on le retrouvera." },
    ],
    postingHeading: "Une dépense de parc est une écriture, pas une ligne de tableur.",
    postingBody:
      "Le carburant, l’entretien, une réparation après un incident : ce sont des dépenses, et une dépense s’impute. Elles sont saisies là où elles sont engagées, avec le véhicule et l’affectation qui les expliquent, et elles se retrouvent dans le suivi des coûts d’exploitation comme dans le grand livre.",
    chainLabel: "Le parcours d’une dépense de parc",
    chain: [
      "Véhicule",
      "Affectation",
      "Carburant ou entretien",
      "Coût d’exploitation",
      "Écriture comptable",
    ],
    relatedHeading: "Les autres périmètres",
    closeHeading: "Regardons votre parc.",
    closeLine: "Trente minutes, vos véhicules, vos questions.",
  },

  finance: {
    meta: {
      title: "ERP OHADA et comptabilité SYSCOHADA — Praxis LS",
      description:
        "Un ERP nativement OHADA : plan comptable SYSCOHADA, journaux, grand livre, balance générale, états financiers, DSF et liasse fiscale. L’exploitation s’y impute au moment où elle se produit, dans les 17 États membres.",
    },
    navLabel: "Comptabilité OHADA",
    navBlurb: "SYSCOHADA, DSF, liasse fiscale.",
    eyebrow: "COMPTABILITÉ ET OHADA",
    heading: "Une comptabilité SYSCOHADA qui ne se reconstitue pas.",
    intro:
      "Plan comptable, moteur fiscal, journaux et états financiers ne font qu’un avec l’exploitation, au lieu de négocier avec elle tous les mois. La clôture devient une relecture, pas une reconstitution.",
    coversHeading: "Ce que couvre la comptabilité",
    covers: [
      { name: "Plan comptable", line: "Le plan comptable SYSCOHADA, et le vôtre par-dessus." },
      {
        name: "Journaux et grand livre",
        line: "Les journaux, le grand livre, la balance générale.",
      },
      {
        name: "États financiers",
        line: "Les états financiers, la DSF (déclaration statistique et fiscale) et la liasse fiscale.",
      },
      { name: "Fiscalité", line: "TVA et retenue à la source, selon la juridiction de l’entité." },
      { name: "Créances et dettes", line: "Créances clients, dettes fournisseurs, relances." },
      {
        name: "Immobilisations",
        line: "Les immobilisations et leurs amortissements, calculés et imputés.",
      },
      { name: "Trésorerie et devises", line: "La trésorerie, les devises et leur conversion." },
      {
        name: "Journal inaltérable",
        line: "Les écritures se contrepassent, elles ne se modifient pas.",
      },
    ],
    postingHeading: "Rien ne s’impute en juin pour un dossier clos en mars.",
    postingBody:
      "Une opération porte ses règles d’imputation. Quand elle se produit, l’écriture est passée, dans le journal où elle devait aller, avec la pièce qui la justifie attachée. Ce qu’un auditeur demande — la pièce derrière la ligne — est à un clic de la ligne, et non dans une boîte d’archives.",
    chainLabel: "Le parcours d’une écriture",
    chain: [
      "Opération",
      "Règle d’imputation",
      "Écriture comptable",
      "Journal",
      "Grand livre",
      "États financiers",
      "DSF",
    ],
    screenshot: {
      screen: "general-ledger",
      alt: "Le grand livre dans Praxis LS, avec une écriture passée par une opération.",
    },
    outLink: { label: "Selon quelle norme clôturez-vous ?", route: "standards" },
    relatedHeading: "Les autres périmètres",
    closeHeading: "Regardons votre clôture.",
    closeLine: "Trente minutes, vos comptes, vos questions.",
  },

  platform: {
    meta: {
      title: "Plateforme, données et exploitation — Praxis LS",
      description:
        "Une base PostgreSQL dédiée par client, deux environnements, des habilitations appliquées côté serveur, un journal inaltérable et une conservation des documents sur dix ans. Ce que la DSI doit savoir avant de dire oui.",
    },
    navLabel: "Plateforme et DSI",
    navBlurb: "Une base par client, vos accès.",
    eyebrow: "PLATEFORME ET DSI",
    heading: "Une base de données par client. Vos données, vos accès, votre porte de sortie.",
    intro:
      "Praxis LS tourne sur votre sous-domaine, à vos couleurs, dans les deux langues, avec un environnement de production et un environnement de test fournis d’office. Ce que la DSI regarde en premier n’est pas l’écran : c’est où vivent les données et comment on en sort.",
    coversHeading: "Ce que la DSI doit savoir",
    covers: [
      {
        name: "Base de données dédiée",
        line: "Une base PostgreSQL par client — pas une table partagée avec une colonne client.",
      },
      {
        name: "Deux environnements",
        line: "Production et test d’office, le second purgé périodiquement pour qu’on ne les confonde pas.",
      },
      {
        name: "Habilitations",
        line: "Un moteur central, appliqué côté serveur, pas seulement masqué dans l’interface.",
      },
      { name: "Sessions", line: "Les sessions et les accès, visibles et révocables." },
      {
        name: "Piste d’audit",
        line: "Un journal inaltérable : ce qui a été fait, par qui, quand.",
      },
      {
        name: "Coffre documentaire",
        line: "Conservation sur dix ans et vérification QR sur les documents émis.",
      },
      {
        name: "Sauvegardes",
        line: "Sauvegardes chiffrées quotidiennes et tests de restauration consignés.",
      },
      {
        name: "Marque blanche",
        line: "Votre sous-domaine, votre logo, votre numérotation documentaire.",
      },
    ],
    postingHeading: "Votre porte de sortie fait partie du contrat.",
    postingBody:
      "Les identifiants de votre base de données peuvent vous être remis : c’est une option de la grille tarifaire, pas une faveur à négocier le jour où vous partez. Une base dédiée par client, c’est aussi ce qui rend cette phrase tenable — il n’y a pas les données d’un autre à démêler des vôtres.",
    chainLabel: "Ce qui entoure vos données",
    chain: [
      "Organisation",
      "Base dédiée",
      "Habilitations",
      "Piste d’audit",
      "Sauvegarde chiffrée",
      "Test de restauration",
    ],
    screenshot: {
      screen: "general-ledger",
      alt: "Une écriture et sa piste d’audit dans Praxis LS.",
    },
    outLink: { label: "Voir notre posture de sécurité complète", route: "security" },
    relatedHeading: "Les autres périmètres",
    closeHeading: "Regardons votre architecture.",
    closeLine: "Trente minutes, vos contraintes, vos questions.",
  },
};
