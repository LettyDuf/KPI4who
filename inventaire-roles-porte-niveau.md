# Inventaire éditorial des rôles — porte niveau

> Source éditoriale pour `CM.Roles` (chantier 7.2a-code). Premier niveau livré le 21/04/2026 pour calibration, trois autres niveaux à suivre après validation.

## Contrat de contenu

Chaque fiche rôle porte :

- **Titre** — libellé visible dans la cartouche. Qualificatif entre parenthèses si le rôle est répété à deux niveaux (règle R2).
- **Axes** — un à trois axes Mintzberg parmi `humaine`, `projet`, `méthodologique`, `stratégique`. Un rôle qui coche les quatre est mal défini (règle D2).
- **Source** — cadre de référence principal nommé (SAFe 6.0, Scrum Guide 2020, ASQ, IASSC, Cagan, PMBOK, BABOK, Google SRE, fonction publique QC/CA, Mintzberg, Jaques).
- **Descriptif orthodoxe** — toujours visible dans la cartouche. 1 à 2 phrases. Formulation conforme à la source, sans connotation.

> **Décision α (21/04/2026 soir).** Le champ *dérive du marché* est abandonné. Rationale : l'outil existe pour aiguiller vers les bonnes métriques, pas pour auditer la fiabilité des rôles. La posture filigrane Gemba reste portée ailleurs (définitions de métriques, anti-patterns nommés dans les fiches indicateurs). Voir `project_porte_niveau_doctrine_editoriale.md`.

## Règles d'écriture

- Pas de mot *senior*. Distinction par **périmètre** (mono-équipe / multi-équipes / portefeuille), pas par séniorité.
- PO = produit, jamais équipe. La distinction entre strates se fait par la taille du produit.
- Qualificatif entre parenthèses pour les rôles à cheval, pas en suffixe de métier.

---

## Opérationnel — strate équipe (horizon 1 jour à 1 an)

> Code interne `META.niveau = "équipe"`. Libellé de surface *Opérationnel*.

### 1. Développeur / Ingénieur logiciel

- **Axes** : projet, méthodologique
- **Source** : Scrum Guide 2020 (*Developers*) ; IEEE SWEBOK pour le socle d'ingénierie.
- **Descriptif orthodoxe** : Membre de l'équipe de réalisation, engagé sur un incrément livrable à chaque itération. Responsable de la qualité technique, des estimations, du respect des critères de « terminé », et de l'adaptation continue du plan de sprint.

### 2. Product Owner (produit mono-équipe)

- **Axes** : projet, stratégique
- **Source** : Scrum Guide 2020 (*Product Owner*) ; Marty Cagan *Inspired* pour la posture produit.
- **Descriptif orthodoxe** : Seul responsable de la valeur produite par l'équipe sur un produit dont le périmètre tient dans une équipe. Arbitre le backlog, ordonne les éléments selon la valeur, et porte la décision du *quoi* livrer.

### 3. Scrum Master (équipe)

- **Axes** : méthodologique, humaine
- **Source** : Scrum Guide 2020 (*Scrum Master*).
- **Descriptif orthodoxe** : Responsable de l'efficacité de l'équipe Scrum, coach sur les pratiques et lève les obstacles transverses. Ne dirige pas l'équipe hiérarchiquement et ne décide pas du contenu du backlog.

### 4. Tech Lead / Team Lead technique

- **Axes** : projet, méthodologique
- **Source** : pratique industrielle large (Google Engineering Practices, GitLab Handbook, ThoughtWorks) ; absent du Scrum Guide.
- **Descriptif orthodoxe** : Référent technique d'une équipe, garant de la cohérence d'architecture locale, du mentorat des développeurs, et des choix techniques non-triviaux. Contribue à la réalisation (ne se désengage pas du code).

### 5. Analyste métier / Business Analyst

- **Axes** : projet, méthodologique
- **Source** : BABOK v3 (IIBA).
- **Descriptif orthodoxe** : Modélise les besoins métier, facilite leur élicitation auprès des parties prenantes, assure la traçabilité entre objectifs business et exigences. Outille le PO et l'équipe, sans se substituer à la décision produit.

### 6. Designer UX / UI

- **Axes** : projet, méthodologique
- **Source** : Don Norman *The Design of Everyday Things* ; IxDA ; Nielsen Norman Group.
- **Descriptif orthodoxe** : Conçoit l'expérience utilisateur, conduit la recherche et les tests d'utilisabilité, prototype et documente les patterns d'interaction. Intervient en continu, du problème à la validation terrain.

### 7. Ingénieur SRE / DevOps (équipe)

- **Axes** : projet, méthodologique
- **Source** : Google *Site Reliability Engineering* (Beyer et al., 2016) ; *The DevOps Handbook* (Kim, Humble).
- **Descriptif orthodoxe** : Co-responsable avec l'équipe de la fiabilité du service en production — automatisation du déploiement, instrumentation (SLI/SLO), réponse aux incidents. Partage les astreintes et la charge cognitive du run.

### 8. Testeur / Ingénieur qualité (QA)

- **Axes** : méthodologique, projet
- **Source** : ISTQB ; Scrum Guide 2020 (qualité = responsabilité collective des *Developers*).
- **Descriptif orthodoxe** : Conçoit la stratégie de test, automatise les scénarios à forte valeur, et pousse la qualité en amont (test-driven, contract testing). La qualité reste une responsabilité partagée de toute l'équipe.

### 9. Chef d'équipe (management de proximité)

- **Axes** : humaine
- **Source** : management classique (Drucker *The Practice of Management*) ; Mintzberg *Structure in Fives* (ligne hiérarchique).
- **Descriptif orthodoxe** : Manager hiérarchique direct des membres de l'équipe. Porte les décisions administratives (évaluation, développement, congés, arbitrages de charge), et soutient le développement professionnel des personnes.

### 10. Ceinture jaune (Yellow Belt)

- **Axes** : méthodologique
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge.
- **Descriptif orthodoxe** : Sensibilisé aux outils fondamentaux Lean Six Sigma (DMAIC, 5S, cartographie de flux), contribue à des chantiers d'amélioration simples dans son équipe. Formation typique de 1 à 2 jours, sans projet individuel formel.

### 11. Ceinture verte (Green Belt)

- **Axes** : méthodologique, projet
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge.
- **Descriptif orthodoxe** : Pilote des projets DMAIC de taille moyenne dans son périmètre métier, maîtrise les outils statistiques de base (Pareto, cartes de contrôle, capacité de processus). Formation typique de 40 à 80 heures assortie d'un projet d'amélioration réel, soutenu devant un jury.

### 12. Coordinateur de livraison

- **Axes** : projet
- **Source** : pratique industrielle (organisations matricielles) ; dérivé des notions PMI de coordination de programme appliquées à l'échelle d'une équipe.
- **Descriptif orthodoxe** : Orchestre les dépendances de livraison d'une équipe avec son environnement — autres équipes, intégration, mise en production. Lève les obstacles transverses sans se substituer au PO sur le *quoi*.

### 13. Ingénieur data (data engineer / analyste data)

- **Axes** : projet, méthodologique
- **Source** : pratique industrielle (DAMA-DMBOK pour la gouvernance, Fundamentals of Data Engineering de Reis & Housley).
- **Descriptif orthodoxe** : Construit et fiabilise les pipelines de données (data engineer) ou produit des analyses actionnables pour les décisions de l'équipe (analyste data). Intégré à l'équipe produit, contribue aux décisions par la donnée.

---

*Trois niveaux restants à produire après validation de la calibration Opérationnel : Tactique (programme), Portefeuille, Exécutif (entreprise).*
