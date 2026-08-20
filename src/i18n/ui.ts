import type { Locale } from "./routes";

/**
 * The chrome — everything outside the copy deck: navigation, the toggle’s
 * accessible names, the footer, the form’s labels and errors.
 *
 * doc/LANDING_PAGE_GUIDE.md fixes the navigation labels and the CTA (§3.1) and
 * the form’s field names (§4). The rest is drafted against
 * BRAND_GLOSSARY_FR_EN.md §4, and is listed in HANDOFF.md § Draft copy.
 *
 * The French here follows the same two mechanical rules as the copy deck:
 * U+202F before « : ; ! ? », and no title case (glossary §5.3).
 */
export interface UiCopy {
  readonly skipToContent: string;
  readonly nav: {
    readonly label: string;
    readonly product: string;
    readonly solutions: string;
    readonly security: string;
    readonly pricing: string;
    readonly about: string;
    readonly openMenu: string;
    readonly closeMenu: string;
  };
  readonly cta: {
    readonly bookDemo: string;
  };
  readonly theme: {
    readonly label: string;
    readonly toLight: string;
    readonly toDark: string;
  };
  readonly language: {
    readonly label: string;
    /** The accessible name on the switch, naming the language being switched TO. */
    readonly switchTo: string;
    /** Shown to a reader whose browser asks for the other language. Written IN
     *  that other language — a French reader is offered French in French. */
    readonly bannerText: string;
    readonly bannerAction: string;
    readonly bannerDismiss: string;
  };
  readonly footer: {
    readonly label: string;
    readonly product: string;
    readonly company: string;
    readonly legal: string;
    readonly contact: string;
    readonly rights: string;
    readonly privacy: string;
    readonly terms: string;
    readonly standards: string;
    readonly security: string;
    readonly pricing: string;
    readonly about: string;
    readonly contactUs: string;
  };
  readonly placeholder: {
    readonly badge: string;
    readonly note: string;
  };
  readonly draftNotice: string;
}

export const UI: Record<Locale, UiCopy> = {
  en: {
    skipToContent: "Skip to content",
    nav: {
      label: "Primary",
      product: "Product",
      solutions: "Solutions",
      security: "Security",
      pricing: "Pricing",
      about: "About",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    cta: { bookDemo: "Book a demo" },
    theme: {
      label: "Theme",
      toLight: "Switch to the light theme",
      toDark: "Switch to the dark theme",
    },
    language: {
      label: "Language",
      switchTo: "Voir cette page en français",
      bannerText: "Cette page est disponible en français.",
      bannerAction: "Lire en français",
      bannerDismiss: "Fermer",
    },
    footer: {
      label: "Footer",
      product: "Product",
      company: "Company",
      legal: "Legal",
      contact: "Contact",
      rights: "© JBS Praxis LLC",
      privacy: "Privacy",
      terms: "Terms",
      standards: "Standards",
      security: "Security",
      pricing: "Pricing",
      about: "About",
      contactUs: "Contact us",
    },
    placeholder: {
      badge: "Placeholder",
      note: "Product screenshots are captured from the running application on each release. This image is a proportioned stand-in, not the product.",
    },
    draftNotice: "Draft copy — awaiting review.",
  },

  fr: {
    skipToContent: "Aller au contenu",
    nav: {
      label: "Principale",
      product: "Produit",
      solutions: "Solutions",
      security: "Sécurité",
      pricing: "Tarifs",
      about: "À propos",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    cta: { bookDemo: "Demander une démo" },
    theme: {
      label: "Thème",
      toLight: "Passer au thème clair",
      toDark: "Passer au thème sombre",
    },
    language: {
      label: "Langue",
      switchTo: "View this page in English",
      bannerText: "This page is available in English.",
      bannerAction: "Read in English",
      bannerDismiss: "Dismiss",
    },
    footer: {
      label: "Pied de page",
      product: "Produit",
      company: "Entreprise",
      legal: "Mentions légales",
      contact: "Contact",
      rights: "© JBS Praxis LLC",
      privacy: "Confidentialité",
      terms: "Conditions",
      standards: "Normes",
      security: "Sécurité",
      pricing: "Tarifs",
      about: "À propos",
      contactUs: "Nous contacter",
    },
    placeholder: {
      badge: "Image d’attente",
      note: "Les captures produit sont prises sur l’application en fonctionnement à chaque version. Cette image est un gabarit aux bonnes proportions, pas le produit.",
    },
    draftNotice: "Texte provisoire — en attente de relecture.",
  },
};
