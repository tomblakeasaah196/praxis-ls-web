// ============================================
// PRAXIS LS — Internationalization
// ============================================

export type Locale = 'en' | 'fr';

export const locales: Locale[] = ['en', 'fr'];
export const defaultLocale: Locale = 'en';

// URL slug mapping between languages
export const slugMap: Record<Locale, Record<string, string>> = {
  en: {
    '/en/': '/fr/',
    '/en/solutions/freight-forwarding-customs': '/fr/solutions/transit-douane',
    '/en/solutions/warehouse': '/fr/solutions/entrepot',
    '/en/solutions/fleet': '/fr/solutions/flotte',
    '/en/solutions/finance-ohada': '/fr/solutions/comptabilite-ohada',
    '/en/solutions/platform-it': '/fr/solutions/plateforme-dsi',
    '/en/security': '/fr/securite',
    '/en/standards': '/fr/normes',
    '/en/pricing': '/fr/tarifs',
    '/en/customers/smart-logistics': '/fr/references/smart-logistics',
    '/en/about': '/fr/a-propos',
    '/en/contact': '/fr/contact',
    '/en/legal/privacy': '/fr/mentions-legales/confidentialite',
    '/en/legal/terms': '/fr/mentions-legales/conditions',
  },
  fr: {
    '/fr/': '/en/',
    '/fr/solutions/transit-douane': '/en/solutions/freight-forwarding-customs',
    '/fr/solutions/entrepot': '/en/solutions/warehouse',
    '/fr/solutions/flotte': '/en/solutions/fleet',
    '/fr/solutions/comptabilite-ohada': '/en/solutions/finance-ohada',
    '/fr/solutions/plateforme-dsi': '/en/solutions/platform-it',
    '/fr/securite': '/en/security',
    '/fr/normes': '/en/standards',
    '/fr/tarifs': '/en/pricing',
    '/fr/references/smart-logistics': '/en/customers/smart-logistics',
    '/fr/a-propos': '/en/about',
    '/fr/contact': '/en/contact',
    '/fr/mentions-legales/confidentialite': '/en/legal/privacy',
    '/fr/mentions-legales/conditions': '/en/legal/terms',
  },
};

export function getLocalizedPath(path: string, locale: Locale): string {
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;
  const localeSlugMap = slugMap[locale];
  
  for (const [enSlug, frSlug] of Object.entries(slugMap.en)) {
    if (normalizedPath === enSlug || normalizedPath === frSlug) {
      return locale === 'en' ? enSlug : frSlug;
    }
  }
  
  // Default to root of the locale
  return locale === 'en' ? '/en/' : '/fr/';
}

// ============================================
// UI Dictionary
// ============================================

type TranslationKey = keyof typeof translations.en;

const translations = {
  en: {
    // Navigation
    'nav.product': 'Product',
    'nav.solutions': 'Solutions',
    'nav.security': 'Security',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.bookDemo': 'Book a demo',

    // Hero
    'hero.eyebrow': 'OHADA-NATIVE ERP FOR LOGISTICS OPERATORS',
    'hero.title': 'One system for your operation files, your warehouses, your fleet — and the accounting they all post to.',
    'hero.subtitle': 'Praxis LS runs the whole operation on a native OHADA/SYSCOHADA ledger. Every transit file, every delivery, every invoice posts itself. Month-end becomes a review, not a reconstruction.',
    'hero.ctaPrimary': 'Book a demo',
    'hero.ctaSecondary': 'See how it works',

    // Credibility strip
    'credibility.caseStudy': 'Live at Smart Logistics, Cameroon — an 84-table legacy system replaced end to end, accounting included.',
    'credibility.ohada': 'OHADA',
    'credibility.memberStates': '17 member states',
    'credibility.modules': '70 modules',
    'credibility.database': 'One dedicated database per customer',

    // Problem
    'problem.title': 'You run the operation in one system and the accounts in another.',
    'problem.text': "The file closes in March. The entry is posted in June, by someone reading a spreadsheet and a WhatsApp thread. By the time the DSF is assembled, nobody can say which margin was real.",

    // Spine
    'spine.title': 'Every operation posts itself.',
    'spine.text': "Praxis LS is not an operations tool with an accounting export. The ledger is the spine: a milestone, a disbursement, a delivery note and an invoice each carry their own posting rules, in SYSCOHADA, at the moment they happen. The chart of accounts, the tax engine, the journals and the statements are one system with the operation — not a monthly negotiation with it.",

    // Control tower
    'tower.title': 'One file. From quotation to closed books.',
    'tower.text': 'Quotation, transit order, customs, haulage, warehouse, delivery, invoice, settlement. One file carries all of it — with its documents, its costs, its margin and its postings attached. Open it in March or in three years: it says the same thing.',

    // Role tabs
    'role.direction': 'Direction',
    'role.directionDesc': 'See the whole company without asking anyone for a report.',
    'role.operations': 'Operations',
    'role.operationsDesc': 'Every file, every milestone, every exception, on one board.',
    'role.finance': 'Finance',
    'role.financeDesc': 'A ledger you can defend to an auditor, line by line.',
    'role.it': 'IT',
    'role.itDesc': 'One database per customer. Your data, your credentials, your exit.',

    // Coverage
    'coverage.title': 'Coverage',
    'coverage.subtitle': '70 modules across the full operation, all posting to the same ledger.',

    // Intelligence
    'intelligence.title': 'Intelligence inside the guardrails.',
    'intelligence.text': "The assistant drafts proposals, reads documents and takes dictation in French and English. Every action it proposes passes the same validation gate as a human's, is checked against the same permissions, and lands in the same audit trail. Spend is metered per organisation and visible to you. Nothing posts to your ledger because a model was confident.",

    // Trust
    'trust.title': 'We hold the code. You hold the data.',
    'trust.cta': 'See the full security posture',

    // Deployment
    'deployment.title': 'Your subdomain. Your logo. Your document numbering.',
    'deployment.text': "Praxis LS runs at yourcompany.praxisls.com in your colours, your fonts and both languages. Your team installs it as an app. Your documents carry your branding. A live environment and a test environment come as standard, and the test one is wiped on a schedule so nobody confuses the two.",

    // Standards
    'standards.title': 'Which standard do you close in?',
    'standards.note': 'We publish this table because you are entitled to know what we run today and what we are building. It is updated when the code is, not when the marketing is.',
    'standards.status.live': 'Live',
    'standards.status.development': 'In development',
    'standards.status.planned': 'Planned',

    // Pricing
    'pricing.title': 'Pricing',
    'pricing.subtitle': 'Three tiers by scale and commitment — not by module.',
    'pricing.core': 'Core',
    'pricing.coreDesc': 'Ledger, operation files, master data, invoicing, procurement. Everything posts.',
    'pricing.operations': 'Operations',
    'pricing.operationsDesc': 'Core + warehouse, fleet, costing, portals.',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterpriseDesc': 'Operations + multi-entity, customer-held database, SLA, migration.',
    'pricing.addOns': 'Add-ons',
    'pricing.addOnsDesc': 'Customer-held database credentials, data migration, extra environments, training.',
    'pricing.ai': 'Baseline AI is in every tier and metered.',
    'pricing.currency': 'Price on request, quoted in XAF and EUR.',
    'pricing.cta': 'Book a demo',

    // Close
    'close.title': "Let's look at your operation.",
    'close.text': 'Thirty minutes, your files, your questions. We\'ll show you the ledger behind them.',
    'close.cta': 'Book a demo',

    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.copyright': '© JBS Praxis LLC',

    // Demo form
    'form.title': 'Book a demo',
    'form.subtitle': 'Thirty minutes, your files, your questions.',
    'form.name': 'Full name',
    'form.email': 'Work email',
    'form.company': 'Company',
    'form.country': 'Country',
    'form.role': 'Role',
    'form.roleDG': 'Direction (DG)',
    'form.roleOperations': 'Operations',
    'form.roleFinance': 'Finance',
    'form.roleIT': 'IT',
    'form.roleOther': 'Other',
    'form.current': 'What are you running today?',
    'form.currentOptional': 'optional',
    'form.submit': 'Request a demo',
    'form.success': 'Thank you. We\'ll be in touch within two business days.',
    'form.error': 'Something went wrong. Please try again.',

    // Security
    'security.title': 'Controls we operate',
    'security.intro': 'These are the controls that are live today. We publish what we run because honesty here is a differentiator — no regional competitor can publish this page.',
    'security.certification': 'Certification roadmap: SOC 2 Type II in 2027.',

    // About
    'about.title': 'About',
    'about.intro': 'Praxis LS is built by a team that has operated freight forwarding companies in Central Africa. We built the tool we always needed and could never find — one that speaks OHADA natively, that treats the ledger as the spine of the operation, and that a DAF can audit without asking anyone for a report.',

    // Contact
    'contact.title': 'Contact',
    'contact.intro': 'Start a conversation. We respond within two business days.',

    // Solutions
    'solutions.freight.title': 'Freight forwarding & customs',
    'solutions.freight.intro': 'One dossier per shipment, from quotation through customs clearance to final settlement. Every document, every cost, every posting — in the same file.',
    'solutions.warehouse.title': 'Warehouse',
    'solutions.warehouse.intro': 'Inbound, outbound and inventory management, with costing that feeds the ledger. Stock movements and delivery notes post themselves.',
    'solutions.fleet.title': 'Fleet',
    'solutions.fleet.intro': 'Vehicle management, driver scheduling, fuel and maintenance tracking. Costs flow to the operation file that generated them.',
    'solutions.finance.title': 'Finance & OHADA',
    'solutions.finance.intro': 'The ledger is the spine. Every operation file posts to it. Month-end is a re-reading, not a reconstruction.',
    'solutions.platform.title': 'Platform & IT',
    'solutions.platform.intro': 'One PostgreSQL database per customer. Your data, your credentials, your exit. White-label in your colours and fonts.',

    // Common
    'common.learnMore': 'Learn more',
    'common.backToHome': 'Back to home',
    'common.loading': 'Loading…',
    'common.error': 'An error occurred',
    'common.dismiss': 'Dismiss',

    // Language switcher
    'lang.switch': 'Français',
    'lang.current': 'English',

    // Cross-language banner
    'langbanner.message': 'Cette page est disponible en français',
    'langbanner.link': 'Voir la version française',

    // SEO
    'seo.home.title': 'Praxis LS — the OHADA-native ERP for logistics operators',
    'seo.home.description': 'One system for your operation files, your warehouses, your fleet — and the accounting they all post to.',

    // Placeholder labels
    'placeholder.screenshot': 'Screenshot: product UI',
    'placeholder.captures': 'See swap procedure in HANDOFF.md',
  },

  fr: {
    // Navigation
    'nav.product': 'Produit',
    'nav.solutions': 'Solutions',
    'nav.security': 'Sécurité',
    'nav.pricing': 'Tarifs',
    'nav.about': 'À propos',
    'nav.bookDemo': 'Demander une démo',

    // Hero
    'hero.eyebrow': 'ERP NATIF OHADA POUR LES OPÉRATEURS LOGISTIQUES',
    'hero.title': 'Un seul système pour vos dossiers d\'exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s\'impute.',
    'hero.subtitle': 'Praxis LS pilote toute l\'exploitation sur un grand livre nativement OHADA/SYSCOHADA. Chaque dossier de transit, chaque livraison, chaque facture s\'impute d\'elle-même. La clôture devient une relecture, pas une reconstitution.',
    'hero.ctaPrimary': 'Demander une démo',
    'hero.ctaSecondary': 'Voir comment ça marche',

    // Credibility strip
    'credibility.caseStudy': 'En production chez Smart Logistics, Cameroun — un système hérité de 84 tables remplacé de bout en bout, comptabilité comprise.',
    'credibility.ohada': 'OHADA',
    'credibility.memberStates': '17 États membres',
    'credibility.modules': '70 modules',
    'credibility.database': 'Une base de données dédiée par client',

    // Problem
    'problem.title': 'Vous pilotez l\'exploitation dans un système et la comptabilité dans un autre.',
    'problem.text': 'Le dossier se clôt en mars. L\'écriture est passée en juin, par quelqu\'un qui relit un tableur et un fil WhatsApp. Au moment de monter la DSF, plus personne ne sait quelle marge était la vraie.',

    // Spine
    'spine.title': 'Chaque opération s\'impute d\'elle-même.',
    'spine.text': 'Praxis LS n\'est pas un outil d\'exploitation doté d\'un export comptable. Le grand livre en est la colonne vertébrale : un jalon, un débours, un bon de livraison, une facture — chacun porte ses propres règles d\'imputation, en SYSCOHADA, au moment où il se produit. Plan comptable, moteur fiscal, journaux et états financiers ne font qu\'un avec l\'exploitation, au lieu de négocier avec elle tous les mois.',

    // Control tower
    'tower.title': 'Un dossier. Du devis à la clôture.',
    'tower.text': 'Devis, ordre de transit, dédouanement, camionnage, entrepôt, livraison, facture, règlement. Un seul dossier porte l\'ensemble — avec ses documents, ses coûts, sa marge et ses écritures attachés. Ouvrez-le en mars ou dans trois ans : il dit la même chose.',

    // Role tabs
    'role.direction': 'Direction',
    'role.directionDesc': 'Voir toute l\'entreprise sans demander de rapport à personne.',
    'role.operations': 'Opérations',
    'role.operationsDesc': 'Chaque dossier, chaque jalon, chaque exception, sur un seul tableau.',
    'role.finance': 'Comptabilité',
    'role.financeDesc': 'Un grand livre défendable devant un auditeur, ligne par ligne.',
    'role.it': 'Informatique',
    'role.itDesc': 'Une base de données par client. Vos données, vos accès, votre porte de sortie.',

    // Coverage
    'coverage.title': 'Couverture',
    'coverage.subtitle': '70 modules，覆盖整个运营，所有模块都过账到同一账本。',

    // Intelligence
    'intelligence.title': 'L\'intelligence, à l\'intérieur des garde-fous.',
    'intelligence.text': 'L\'assistant rédige des propositions, lit les documents et prend la dictée, en français comme en anglais. Chaque action qu\'il propose passe le même contrôle de validation qu\'une action humaine, se heurte aux mêmes habilitations et atterrit dans la même piste d\'audit. La consommation est mesurée par organisation et visible. Rien ne s\'impute à votre grand livre parce qu\'un modèle était sûr de lui.',

    // Trust
    'trust.title': 'Nous détenons le code. Vous détenez vos données.',
    'trust.cta': 'Voir notre posture de sécurité complète',

    // Deployment
    'deployment.title': 'Votre sous-domaine. Votre logo. Votre numérotation documentaire.',
    'deployment.text': 'Praxis LS tourne sur votresociete.praxisls.com, à vos couleurs, avec vos polices, dans les deux langues. Vos équipes l\'installent comme une application. Vos documents portent votre marque. Un environnement de production et un environnement de test sont fournis d\'office, et le second est purgé périodiquement pour que personne ne les confonde.',

    // Standards
    'standards.title': 'Selon quelle norme clôturez-vous ?',
    'standards.note': 'Nous publions ce tableau parce que vous êtes en droit de savoir ce que nous exploitons aujourd\'hui et ce que nous construisons. Il est mis à jour quand le code l\'est, pas quand la communication l\'est.',
    'standards.status.live': 'En production',
    'standards.status.development': 'En cours de développement',
    'standards.status.planned': 'Prévu',

    // Pricing
    'pricing.title': 'Tarifs',
    'pricing.subtitle': 'Trois niveaux par taille et engagement — pas par module.',
    'pricing.core': 'Core',
    'pricing.coreDesc': 'Grand livre, dossiers d\'exploitation, données maîtres, facturation, approvisionnement. Tout s\'impute.',
    'pricing.operations': 'Operations',
    'pricing.operationsDesc': 'Core + entrepôt, flotte, chiffrage, portails.',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterpriseDesc': 'Operations + multi-entité, base de données client, SLA, migration.',
    'pricing.addOns': 'Options',
    'pricing.addOnsDesc': 'Identifiants de base de données client, migration de données, environnements supplémentaires, formation.',
    'pricing.ai': 'L\'IA de base est incluse dans chaque niveau et mesurée.',
    'pricing.currency': 'Prix sur demande, libellé en XAF et EUR.',
    'pricing.cta': 'Demander une démo',

    // Close
    'close.title': 'Regardons votre exploitation ensemble.',
    'close.text': 'Trente minutes, vos dossiers, vos questions. Nous vous montrons le grand livre qui se trouve derrière.',
    'close.cta': 'Demander une démo',

    // Footer
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.legal': 'Mentions légales',
    'footer.contact': 'Contact',
    'footer.copyright': '© JBS Praxis LLC',

    // Demo form
    'form.title': 'Demander une démo',
    'form.subtitle': 'Trente minutes, vos dossiers, vos questions.',
    'form.name': 'Nom complet',
    'form.email': 'E-mail professionnel',
    'form.company': 'Société',
    'form.country': 'Pays',
    'form.role': 'Fonction',
    'form.roleDG': 'Direction (DG)',
    'form.roleOperations': 'Opérations',
    'form.roleFinance': 'Comptabilité',
    'form.roleIT': 'Informatique',
    'form.roleOther': 'Autre',
    'form.current': 'Que utilisez-vous aujourd\'hui ?',
    'form.currentOptional': 'facultatif',
    'form.submit': 'Demander une démo',
    'form.success': 'Merci. Nous vous répondrons dans les deux jours ouvrés.',
    'form.error': 'Une erreur s\'est produite. Veuillez réessayer.',

    // Security
    'security.title': 'Les contrôles que nous opérons',
    'security.intro': 'Voici les contrôles qui sont en production aujourd\'hui. Nous publions ce que nous exploitons parce que l\'honnêteté ici est un facteur de différenciation — aucun concurrent régional ne peut publier cette page.',
    'security.certification': 'Feuille de route certifications : SOC 2 Type II en 2027.',

    // About
    'about.title': 'À propos',
    'about.intro': 'Praxis LS est créé par une équipe qui a exploité des entreprises de transit en Afrique centrale. Nous avons construit l\'outil dont nous avions toujours besoin et que nous n\'avions jamais trouvé — un outil qui parle nativement OHADA, qui traite le grand livre comme la colonne vertébrale de l\'exploitation, et qu\'un directeur financier peut auditer sans demander de rapport à personne.',

    // Contact
    'contact.title': 'Contact',
    'contact.intro': 'Commençons une conversation. Nous répondons dans les deux jours ouvrés.',

    // Solutions
    'solutions.freight.title': 'Transit & dédouanement',
    'solutions.freight.intro': 'Un dossier par expédition, du devis au dédouanement en passant par le règlement final. Chaque document, chaque coût, chaque écriture — dans le même dossier.',
    'solutions.warehouse.title': 'Entrepôt',
    'solutions.warehouse.intro': 'Gestion des entrées, sorties et stocks, avec chiffrage qui alimente le grand livre. Les mouvements de stock et bons de livraison s\'imputent d\'eux-mêmes.',
    'solutions.fleet.title': 'Flotte',
    'solutions.fleet.intro': 'Gestion des véhicules, planification des chauffeurs, suivi du carburant et de l\'entretien. Les coûts transitent vers le dossier d\'exploitation qui les a générés.',
    'solutions.finance.title': 'Comptabilité & OHADA',
    'solutions.finance.intro': 'Le grand livre est la colonne vertébrale. Chaque dossier d\'exploitation s\'y impute. La clôture mensuelle est une relecture, pas une reconstitution.',
    'solutions.platform.title': 'Plateforme & DSI',
    'solutions.platform.intro': 'Une base de données PostgreSQL par client. Vos données, vos accès, votre porte de sortie. Marque blanche à vos couleurs et polices.',

    // Common
    'common.learnMore': 'En savoir plus',
    'common.backToHome': 'Retour à l\'accueil',
    'common.loading': 'Chargement…',
    'common.error': 'Une erreur s\'est produite',
    'common.dismiss': 'Fermer',

    // Language switcher
    'lang.switch': 'English',
    'lang.current': 'Français',

    // Cross-language banner
    'langbanner.message': 'This page is available in English',
    'langbanner.link': 'See the English version',

    // SEO
    'seo.home.title': 'Praxis LS — l\'ERP natif OHADA pour les opérateurs logistiques',
    'seo.home.description': 'Un seul système pour vos dossiers d\'exploitation, vos entrepôts, votre flotte — et la comptabilité où tout s\'impute.',

    // Placeholder labels
    'placeholder.screenshot': 'Capture d\'écran : interface produit',
    'placeholder.captures': 'Voir la procédure de remplacement dans HANDOFF.md',
  },
} as const;

export function useTranslations(locale: Locale) {
  return translations[locale];
}

export function t(key: TranslationKey, locale: Locale): string {
  return translations[locale][key] ?? translations.en[key] ?? key;
}
