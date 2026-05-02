# Matière de référence — `vue-questionnaire` actuel

*Document de sauvegarde produit le 02/05/2026 lors de l'arbitrage D1 du chantier 10. À reprendre lors du chantier éditorial **Catalogue de questions fines** (étape 3 du § 8.1bis de `doc-contrats-navigation.md`).*

---

## Pourquoi ce document

Le 02/05/2026, la décision D1 du chantier 10 a tranché le sort de l'onglet *Choisir mes indicateurs* actuel (`vue-questionnaire` dans le DOM) :

- **(c)** son code sera **supprimé** lors de la sous-étape 10.3 de l'exécution.
- **(a)** ses trois questions et douze options sont **sauvegardées ici** comme matière de référence pour le futur catalogue de *Par ma question*.

Ce document sert de pont entre l'ancien design et le nouveau. Quand le chantier éditorial *Par ma question* s'ouvrira (étape 3 du cadrage 10), les panels d'experts auront cette matière sous les yeux — non comme contrainte, mais comme point de départ critique.

---

## Constat éditorial sur le questionnaire actuel

Trois constats motivent la décision de supprimer le code tout en sauvegardant la matière.

**Q2 n'est pas exploitée par le code.** L'utilisateur répond à la question *« Quelle décision cherchez-vous à éclairer ? »* mais cette réponse ne change rien aux résultats. Le filtrage du référentiel se fait uniquement sur Q1 (objectif) et Q3 (niveau). C'est un signal de design inabouti — la question existe dans l'UI mais n'a pas trouvé sa place dans la logique métier.

**Le questionnaire fait un travail très proche de *Par mon problème*.** Q3 demande un niveau hiérarchique (les 4 mêmes que la pyramide) ; Q1 demande un objectif (proche de la première étape de *Par mon problème*). C'est exactement le doublon prioritaire identifié au § 3.1 du doc compagnon de navigation. La bifurcation 4 axes / question (23/04/2026) a tranché que le mode synthétique appartient aux portes — donc ce qui doublonne *Par mon problème* n'a pas sa place ailleurs.

**Les 3 questions sont rédigées en langage de concepteur.** *« Objectif principal »*, *« décision à éclairer »*, *« niveau hiérarchique »* — ces formulations relèvent du vocabulaire de la taxonomie, pas de celui du visiteur qui arrive avec un problème en tête. C'est précisément la grammaire que la bifurcation a allouée à *Par mes 4 axes*, **pas** à *Par ma question*.

Conclusion : la matière éditoriale est précieuse, le code actuel ne tient pas. La séparation en deux gestes (sauvegarde + suppression) sert la mission.

---

## Q1 — Objectif principal à piloter

*Cette question a un équivalent direct dans la première étape de la porte **Par mon problème**. Sa matière est déjà absorbée par cette porte, sans ré-écriture nécessaire pour le catalogue.*

| ID | Libellé | Description |
|---|---|---|
| `business`  | 📈 Résultats économiques     | Revenus, rentabilité, croissance |
| `livraison` | 🚀 Vitesse de livraison      | Délais, fréquence, flux de valeur |
| `qualite`   | 🎯 Qualité & stabilité       | Défauts, incidents, fiabilité |
| `humain`    | 👥 Comportements & engagement | Collaboration, pratiques, compétences |

**Matière exploitable pour le catalogue.** Aucune en propre — la porte *Par mon problème* couvre déjà cette dimension de manière plus aboutie.

---

## Q2 — Décision à éclairer

*Cette question est la matière la plus précieuse du questionnaire actuel. Elle ouvre quatre **décisions à prendre**, formulées en langage de management, qui se reformulent naturellement en questions fines pour **Par ma question**.*

| ID | Libellé | Description |
|---|---|---|
| `investir`  | 💰 Arbitrer les investissements | Prioriser entre initiatives |
| `ameliorer` | 🔄 Améliorer en continu          | Identifier et réduire les gaspillages |
| `aligner`   | 🎯 Aligner les équipes            | Coordonner vers un objectif commun |
| `piloter`   | 📊 Piloter au quotidien            | Suivre la progression et réagir |

**Matière exploitable pour le catalogue.** Quatre questions fines plausibles, à formuler par les panels d'experts selon le ton de *Par ma question* (langage utilisateur, registre conversationnel, première personne quand c'est utile) :

- *Comment arbitrer entre les initiatives qui se présentent ?* — entrée naturelle pour les indicateurs de valeur business (NPV, ROI, marge contributive), de progrès stratégique (OKR), de coût d'opportunité (WSJF, Cost of Delay).
- *Par où démarrer une démarche d'amélioration continue ?* — entrée pour les métriques de flux (lead time, throughput, WIP), de qualité (taux de défauts, FCR), de variabilité (capabilité de processus).
- *Comment aligner mes équipes vers un objectif commun ?* — entrée pour les OKR, les métriques de cascade Drucker (MBO), les indicateurs partagés inter-équipes (lead time end-to-end, NPS produit).
- *Quoi mettre dans mon pilotage hebdomadaire ?* — entrée pour les métriques opérationnelles à fréquence courte (throughput, lead time, change failure rate, MTTR).

Ces formulations sont des **points de départ critiques**, pas des prescriptions. Les panels d'experts décideront de la formulation finale, du nombre de questions à dériver, et du rattachement à des raccourcis vers les portes existantes ou à des mini-steppers autonomes (cf. § 4.1 invariant 3 du doc compagnon).

---

## Q3 — Niveau hiérarchique

*Cette question a un équivalent direct dans la porte **Par mon niveau** (et dans la première étape des autres portes stepper). Sa matière est déjà absorbée par ces portes.*

| ID | Libellé | Description |
|---|---|---|
| `strategique`  | 🏛 Stratégique  | Direction, horizon 1 à 3 ans |
| `tactique`     | 📊 Portefeuille | Arbitrage, horizon 3 à 12 mois |
| `programme`    | 🗂 Programme    | Coordination, horizon 1 à 6 mois |
| `operationnel` | ⚙️ Équipes      | Livraison, horizon hebdomadaire |

**Matière exploitable pour le catalogue.** Aucune en propre — les portes existantes couvrent déjà cette dimension. Note : la porte *Par mon niveau* a depuis livré une taxonomie plus riche (chantier 7.2a-code.3, mapping rôles → niveaux) qui dépasse les 4 niveaux ci-dessus.

---

## Synthèse pour le catalogue de *Par ma question*

Sur les 12 options des 3 questions actuelles, **seule la matière de Q2 est utilement transposable** vers le catalogue de questions fines. Les 4 décisions à éclairer (investir / améliorer / aligner / piloter) ouvrent 4 questions fines de bonne facture, à raffiner par les panels d'experts.

Q1 et Q3 sont déjà couvertes par les portes existantes et n'ont pas vocation à être ré-éditorialisées dans *Par ma question* — leur place est dans le mode synthétique *Par mes 4 axes*, pas dans le mode fin.

---

## Journal du document

- 02/05/2026 — création lors de l'arbitrage D1 du chantier 10. Matière sauvegardée avant la suppression de `vue-questionnaire` en 10.3.
