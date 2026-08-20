import type { CaseStudyPage } from "./page-types";

/**
 * Smart Logistics, en français. Écrit à partir de doc/LANDING_PAGE_GUIDE.md
 * §3.3 et de rien d'autre.
 *
 * §3.3 est court : une phrase de production, un pays, un système hérité de
 * 84 tables remplacé de bout en bout, comptabilité comprise — et une clause de
 * consentement. Le brief §6 est explicite : « tout ce qui concerne Smart
 * Logistics au-delà du §3.3 » se consigne dans HANDOFF.md et la place reste
 * vide. C'est donc une page courte, et elle le restera tant que le client
 * n'aura pas relu et approuvé ce qu'on y ajoute (checklist du guide §9).
 *
 * Ce qui n'est PAS ici, et ne doit pas y arriver par inadvertance : un volume,
 * un chiffre d'affaires, un nom de client, une citation, une date de mise en
 * service, un logo. Aucun de ces éléments n'est dans le §3.3.
 */
export const caseStudy: CaseStudyPage = {
  meta: {
    title: "Smart Logistics, Cameroun — Praxis LS",
    description:
      "Smart Logistics, au Cameroun, a remplacé un système hérité de 84 tables de bout en bout, comptabilité comprise. Ce que nous publions de cette migration, et ce que nous ne publierons pas.",
  },
  eyebrow: "RÉFÉRENCE",
  heading: "Smart Logistics, Cameroun",
  lead: "En production chez Smart Logistics, Cameroun — un système hérité de 84 tables remplacé de bout en bout, comptabilité comprise.",
  factsHeading: "Ce que nous publions",
  facts: [
    {
      term: "En production",
      line: "Smart Logistics travaille sur Praxis LS aujourd’hui, au Cameroun.",
    },
    {
      term: "84 tables",
      line: "C’est la taille du système hérité qui a été remplacé.",
    },
    {
      term: "De bout en bout",
      line: "Le remplacement a porté sur l’ensemble, pas sur un module posé à côté de l’ancien.",
    },
    {
      term: "Comptabilité comprise",
      line: "La comptabilité faisait partie de la migration — c’est la partie que la plupart des remplacements laissent derrière eux.",
    },
  ],
  sanitisationHeading: "Ce que nous ne publierons pas",
  sanitisationBody:
    "Smart Logistics a consenti à être nommée avec une sanitisation : son nom, son logo, son secteur — pas de volumes d’exploitation, pas de chiffre d’affaires, pas de noms de clients. Cette page tient cet engagement. Ce qui est écrit plus haut décrit notre migration, qui nous appartient ; le reste appartient à Smart Logistics et ne sera publié que si elle décide de le publier.",
  emptyLine:
    "Il n’y a donc ni citation, ni graphique, ni chiffre sur cette page. Ce qui manque manque parce que personne ne l’a autorisé, et une étude de cas s’écrit avec le client, jamais à sa place.",
  closeHeading: "Regardons votre exploitation ensemble.",
  closeLine:
    "Trente minutes, vos dossiers, vos questions. Nous vous montrons le grand livre qui se trouve derrière.",
};
