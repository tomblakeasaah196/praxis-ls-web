import type { PagesCopy } from "./page-types";
import { home } from "./home.fr";

/**
 * The supporting pages, French — the source language for this domain.
 *
 * VERBATIM from doc/LANDING_PAGE_GUIDE.md (N1): the /securite heading
 * « Les contrôles que nous opérons » and the six controls (§3.10, reused from
 * the homepage deck so they cannot drift), /normes' three rows and its note
 * (§12), the tier names in §13.
 *
 * DRAFTED, and listed in HANDOFF.md § Draft copy: every intro, both FAQ sets,
 * all of /à-propos, all of /contact's chrome, the French tier descriptions and
 * the two legal stubs.
 *
 * Typography as in the homepage deck: U+202F before « : ; ! ? », guillemets
 * with a no-break space inside, accented capitals, sentence case (N8).
 */
export const pages: PagesCopy = {
  security: {
    meta: {
      title: "Les contrôles que nous opérons — Praxis LS",
      description:
        "Les contrôles de sécurité que Praxis LS opère aujourd’hui : une base de données dédiée par client, un journal inaltérable, des sauvegardes chiffrées, des tests de restauration consignés, des habilitations appliquées côté serveur et une conservation des documents sur dix ans.",
    },
    heading: "Les contrôles que nous opérons",
    intro:
      "Cette page liste ce qui fonctionne aujourd’hui dans le produit. Un contrôle qui n’est pas en place n’est pas sur cette page.",
    controlsHeading: "Les six contrôles",
    controls: home.trust.controls,
    certificationHeading: "Certification",
    certificationLine:
      "Nous ne détenons aujourd’hui aucune certification de sécurité délivrée par un tiers, et nous ne présentons pas comme certifiés des contrôles qui ne le sont pas. C’est ici qu’une certification sera indiquée, avec son périmètre et sa date, le jour où il y en aura une.",
    faqHeading: "Les questions qu’on nous pose",
    faq: [
      {
        question: "Où résident nos données ?",
        answer:
          "Dans une base PostgreSQL dédiée à votre organisation — pas une table partagée avec une colonne client. Un environnement de production et un environnement de test sont fournis d’office, et le second est purgé périodiquement.",
      },
      {
        question: "Une écriture peut-elle être modifiée après imputation ?",
        answer:
          "Non. Le journal est inaltérable : les écritures se contrepassent, elles ne se modifient pas, et la contrepassation porte sa propre piste d’audit.",
      },
      {
        question: "Les sauvegardes sont-elles testées ?",
        answer:
          "Les sauvegardes de chaque base sont chiffrées et quotidiennes, et les tests de restauration sont réellement exécutés et consignés, pas supposés.",
      },
      {
        question: "Les habilitations sont-elles appliquées ailleurs que dans l’interface ?",
        answer:
          "Un moteur d’habilitations central les applique côté serveur. Masquer un bouton dans l’interface n’est pas un contrôle d’accès, et nous ne le traitons pas comme tel.",
      },
    ],
  },

  standards: {
    meta: {
      title: "Normes — Praxis LS",
      description:
        "Selon quelle norme Praxis LS clôture aujourd’hui, et ce qui est en construction. OHADA/SYSCOHADA est en production dans les 17 États membres, avec la DSF et la liasse fiscale. IFRS est en cours de développement ; US GAAP est prévu.",
    },
    heading: "Selon quelle norme clôturez-vous ?",
    intro:
      "Un tableau, trois lignes, et un engagement sur la façon dont il est tenu. C’est la page la plus courte de ce site et celle qu’un DAF lit en premier.",
    rows: home.standards.rows,
    columnStandard: home.standards.columnStandard,
    columnStatus: home.standards.columnStatus,
    note: home.standards.note,
    updatedHeading: "Comment ce tableau est tenu",
    updatedLine:
      "Les lignes vivent dans le référentiel de textes de ce site, sous forme de données, les deux langues côte à côte. Faire passer une norme de « prévu » à « en production » est une modification d’une ligne dans chaque langue, et rien d’autre ne bouge — c’est ce qui rend l’engagement ci-dessus tenable.",
  },

  pricing: {
    meta: {
      title: "Tarifs — Praxis LS",
      description:
        "Trois niveaux selon la taille et l’engagement, pas selon les modules. Core, Operations et Enterprise, avec des options : base de données détenue par le client, migration des données, environnements supplémentaires, formation. Tarif sur demande, établi en XAF et en EUR.",
    },
    heading: "Tarifé selon la taille, pas selon les modules",
    intro:
      "Un exploitant de quatre camions a besoin de la flotte et reste petit ; un transitaire de 200 personnes n’en a aucun besoin et représente le plus gros dossier. Facturer par module fait payer les mauvaises entreprises, alors nous ne le faisons pas.",
    tiers: home.pricing.tiers,
    addOnsHeading: "Options",
    addOns: [
      "Accès à la base de données détenu par le client",
      "Migration des données depuis votre système actuel",
      "Environnements supplémentaires",
      "Formation",
    ],
    aiHeading: "L’assistant est présent dans tous les niveaux",
    aiLine:
      "L’intelligence de base est incluse dans chaque niveau et mesurée par organisation. Elle n’est jamais réservée à Enterprise : si elle l’était, tout ce que ce site dit de l’intelligence serait faux pour chaque client Core, et c’est précisément sur cette page qu’un acheteur le vérifie.",
    quoteHeading: "Le montant",
    quoteLine:
      "Tarif sur demande, établi en XAF et en EUR. Nous publions la structure et pas le chiffre : la structure vous dit si ce produit est fait pour une entreprise de votre taille, et le chiffre dépend de ce que vous quittez.",
    faqHeading: "Les questions qu’on nous pose",
    faq: [
      {
        question: "Le tarif est-il calculé par module ?",
        answer:
          "Non. Les niveaux dépendent de la taille et de l’engagement. Facturer par module fait payer à un exploitant de quatre camions ce dont il a le plus besoin, et fait payer à un transitaire de 200 personnes ce qu’il n’utilise pas.",
      },
      {
        question: "L’assistant est-il réservé au niveau Enterprise ?",
        answer:
          "Non. L’intelligence de base est présente dans chaque niveau et mesurée par organisation, la consommation vous étant visible.",
      },
      {
        question: "Pouvons-nous détenir nos propres accès à la base ?",
        answer:
          "Oui, en option. Les données de chaque client résident déjà dans leur propre base ; l’accès direct et authentifié pour l’administrer est une offre distincte et facturée.",
      },
      {
        question: "Dans quelle devise une offre est-elle établie ?",
        answer: "En XAF et en EUR.",
      },
    ],
    cta: "Demander une démo",
  },

  about: {
    meta: {
      title: "À propos — Praxis LS",
      description:
        "Praxis LS est développé par JBS Praxis LLC : l’ERP natif OHADA pour les opérateurs logistiques, un seul système pour les dossiers d’exploitation, les entrepôts, la flotte et la comptabilité où tout s’impute.",
    },
    heading: "L’entreprise derrière le grand livre",
    intro:
      "Praxis LS est développé par JBS Praxis LLC. C’est un ERP pour les opérateurs logistiques de la zone OHADA, et son cœur comptable est la raison de son existence, pas un module ajouté sur le côté.",
    blocks: [
      {
        heading: "Ce que nous construisons",
        body: "Un seul système pour les dossiers, les entrepôts, la flotte et la comptabilité d’un opérateur logistique, sur un grand livre nativement OHADA/SYSCOHADA. Transit et douane, entrepôt, flotte, chiffrage, achats, finance et trésorerie — soixante-dix modules en treize groupes, une base de données par client.",
      },
      {
        heading: "Où il fonctionne",
        body: "L’OHADA couvre dix-sept États membres, et la norme comptable y est identique. Le premier client est au Cameroun ; le produit n’est pas conçu pour un seul pays.",
      },
      {
        heading: "Comment nous travaillons",
        body: "Nous publions ce qui est en production et ce qui ne l’est pas — voir le tableau des normes. Nous publions les contrôles que nous opérons plutôt que des certifications que nous n’avons pas. Quand un fait n’est pas établi, ce site laisse la place vide au lieu de la remplir.",
      },
    ],
    openHeading: "Ce qui ne figure pas encore sur cette page",
    openLine:
      "Les noms de l’équipe, les biographies, les photographies, l’adresse du siège et les mentions d’immatriculation ne sont pas publiés ici. Ils ne figurent pas dans les documents à partir desquels ce site a été construit, et ce site n’invente pas de faits.",
  },

  contact: {
    meta: {
      title: "Demander une démo — Praxis LS",
      description:
        "Trente minutes, vos dossiers, vos questions. Dites-nous ce que vous exploitez aujourd’hui et nous vous montrons le grand livre qui se trouve derrière.",
    },
    heading: "Regardons votre exploitation ensemble.",
    intro:
      "Trente minutes, vos dossiers, vos questions. Nous vous montrons le grand livre qui se trouve derrière.",
    formHeading: "Demander une démo",
    fields: {
      name: "Nom et prénom",
      email: "Adresse professionnelle",
      emailHint: "Une adresse d’entreprise nous aide à préparer les bons exemples.",
      company: "Société",
      country: "Pays",
      countryHint: "Prérempli depuis votre navigateur. Corrigez-le si besoin.",
      role: "Fonction",
      context: "Qu’exploitez-vous aujourd’hui ?",
      contextHint: "Une ligne suffit. C’est le champ le plus utile du formulaire.",
      optional: "facultatif",
    },
    roles: [
      { value: "dg", label: "Direction générale" },
      { value: "operations", label: "Exploitation" },
      { value: "finance", label: "Finance" },
      { value: "it", label: "DSI" },
      { value: "other", label: "Autre" },
    ],
    submit: "Demander une démo",
    submitting: "Envoi en cours…",
    errors: {
      required: "Ce champ est obligatoire.",
      email: "Saisissez une adresse électronique, avec l’arobase.",
      summary: "Vérifiez les champs signalés ci-dessous.",
      notWired:
        "Ce formulaire n’a pas encore de destination configurée : rien n’a été envoyé. C’est une question ouverte assumée, pas une panne — voir HANDOFF.md.",
    },
    success: "Merci. Votre demande a été enregistrée et une réponse vous sera adressée.",
    freeEmailNotice:
      "Cette adresse semble personnelle. Vous pouvez l’envoyer telle quelle — une adresse professionnelle nous aide simplement à préparer l’échange.",
  },

  privacy: {
    meta: {
      title: "Confidentialité — Praxis LS",
      description:
        "La politique de confidentialité de Praxis LS. Cette page est une ébauche : le texte n’a pas été rédigé et aucune politique n’y est énoncée.",
    },
    heading: "Confidentialité",
    stubHeading: "Cette page est une ébauche",
    stubBody:
      "La politique de confidentialité n’a pas été rédigée. Rien n’est énoncé ici, parce qu’une politique de confidentialité provisoire reste une déclaration sur le traitement des données, et celle-ci serait fausse. Le point est ouvert dans HANDOFF.md.",
  },

  terms: {
    meta: {
      title: "Conditions — Praxis LS",
      description:
        "Les conditions d’utilisation de Praxis LS. Cette page est une ébauche : le texte n’a pas été rédigé et rien n’y est énoncé.",
    },
    heading: "Conditions",
    stubHeading: "Cette page est une ébauche",
    stubBody:
      "Les conditions d’utilisation n’ont pas été rédigées. Rien n’est énoncé ici, parce que des conditions provisoires restent des conditions. Le point est ouvert dans HANDOFF.md.",
  },
};
