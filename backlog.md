# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **18 avril 2026** (mise à jour documentaire — ajout section 0 « Porte Par mon problème », recalage section 3 sur l'état réel des modules CM.*, requalification de l'outil d'aide à la décision, noms des fiches af-* renseignés).

Légende : 🔴 priorité haute · 🟡 moyenne · 🟢 basse · ⚪ à décider · ✅ fait · ⏳ en cours

---

## 0. Porte « Par mon problème » — v1 livrée

Une première version de l'outil d'aide à la décision a été livrée en session précédente, sous la forme d'un **parcours en 3 étapes accessible depuis l'accueil 4 portes** : (1) je décris mon problème ressenti → (2) je choisis mon niveau de pilotage → (3) je reçois 3 à 5 indicateurs recommandés, triés par fiabilité décroissante.

| Item | État | Commits de référence |
|---|---|---|
| Squelette accueil 4 portes (conteneur DOM + styles) | ✅ | `a9c4851`, `3cb168f` |
| Bascule pyramide ↔ 4 portes au démarrage (pilotée par `CM.Preferences`) | ✅ | `af40025`, `01f8c86`, `34bd1ba` |
| Matrice de pertinence niveau × problème (anti-micromanagement) — `CM.DiagnosticProbleme` | ✅ | `c5834d3` |
| Vue stepper 1→2→3 — `CM.VuePorteProbleme` | ✅ | `d39355b` |
| Activation de la porte depuis l'accueil 4 portes | ✅ | `cbeda6b` |
| Tri des recommandations par fiabilité décroissante | ✅ | `601fd30` |
| Descriptions des problèmes accessibles aux non-experts | ✅ | `af00449` |
| Message pédagogique sur les paires niveau × problème vides | ✅ | `c6d4bdd` |
| Scroll vers le haut du parcours après chaque étape | ✅ | `23b7b7e` |
| Bouton « À propos » accessible depuis les 4 portes | ✅ | `5f5b882` |

**Distinction avec le brief projet.** Le brief évoquait un « outil d'aide à la décision (questionnaire 10-15 questions → 3-5 métriques suggérées) ». La v1 actuelle est une version **plus simple et plus frugale** : 2 questions (problème ressenti + niveau de pilotage) → 3-5 indicateurs. Elle couvre le cas d'usage prioritaire (utilisateur en autonomie, diagnostic rapide) et reste un excellent socle. Une v2 enrichie (voir section 4 ci-dessous) pourra ajouter des questions sur le contexte, la maturité, les contraintes culturelles si le besoin s'en confirme sur le terrain.

---

## 1. Revue métier des fiches (cohérence output/outcome + anti-patterns)

Règle appliquée : chaque fiche doit distinguer **ce qu'elle mesure** (output) de **ce qu'elle prétend mesurer** (outcome), et nommer explicitement 2 à 4 anti-patterns connus. Panel d'experts **spécifique à l'axe** (pas Lean + Agile par défaut), avec garde-fous transversaux Deming / Goodhart / Hubbard-Taleb / Gemba.

| Fiche | Niveau / Type | Sujet | État | Anti-patterns à nommer |
|---|---|---|---|---|
| p5 | Programme / FLUX | Débit d'initiatives livrées | ✅ | Splitting, phantom delivery, confusion output/outcome, comparaison inter-programmes — **révisée le 18/04/2026** |
| t4 | Portefeuille / FLUX | Efficacité de flux (ratio temps actif / lead time) | 🔴 | Usage en évaluation individuelle, optimisation locale, moyenne trompeuse |
| af-c2 | Affaires / FLUX | Durée du cycle de vente | 🟡 | À identifier lors de la revue (pression descendante sur l'équipe commerciale, Goodhart sur la rapidité au détriment de la qualité de qualification) |
| af-m3 | Affaires / FLUX | Taux de conversion MQL → SQL | 🟡 | À identifier lors de la revue (inflation de MQL pour cocher la case, désalignement marketing/ventes en mode accusatoire) |
| af-sc5 | Affaires / FLUX | Délai de première réponse client | 🟡 | À identifier lors de la revue (réponse vide pour cocher le SLA, pression sur agents, Goodhart temporel) |

**Fiches déjà revues au standard 2026-04** : o1 (Fréquence de déploiement), o2 (Lead Time), o3 (Change Failure Rate), o5 (MTTR), p5 (Débit d'initiatives livrées), et les fiches du chantier 3 (s6 à s10, t6, t7, p6, p7) nativement rédigées à ce standard.

---

## 2. UX à vérifier (harmonisation visuelle)

Principes récemment posés : **ambre** = pédagogie Lean/Gemba, **violet** = typologie formelle, **indigo** = Niveau hiérarchique, **teal** = Maturité, **sémantique vert/ambre/rouge** = Fiabilité uniquement, **couleur domaine** = pastille domaine uniquement.

| Item | État | Action |
|---|---|---|
| Libellés des types d'indicateurs (chips et légende) | ✅ (18/04/2026) | Refonte : DORA→Performance DevOps, FLUX→Flux & Throughput (Lean), accents corrigés sur Clé/Résultats |
| Accents typographiques sur les noms de fiches | ✅ (18/04/2026) | 18 fiches corrigées (échec, délai, sécurité, rétablissement, clôture, etc.) |
| Lisibilité de l'encart Terrain en page d'accueil (`.gemba-band`) | 🟡 | Vérifier contraste sur fond indigo après les changements `.fi-gemba` |
| Échelle typographique (ratio 1.25) dans filtres, barre de recherche | 🟢 | Audit visuel à faire |
| Cohérence grammaire visuelle (pastilles niveau / maturité / fiabilité) hors fiche | 🟢 | Vérifier listes, vignettes, pictos d'accueil |
| Largeur du tiroir sur mobile / tablette | 🟢 | `max-width: 96vw` posé, à retester sur écran < 700 px |
| Grille cartes — breakpoint trop conservateur | ✅ (18/04/2026) | minmax 252→215 px, bascule 1 colonne 640→520 px. 2 colonnes dès 520 px viewport |
| Audit visuel de la porte « Par mon problème » sur mobile / tablette | 🟡 | Vérifier stepper 1→2→3 sur < 600 px, contraste des cartes de recommandation |

---

## 3. Refactoring progressif (greffé sur les corrections fonctionnelles)

À appliquer **en même temps** qu'une modification fonctionnelle, pas en phases isolées.

### 3.1 Cible architecturale mise à jour (avril 2026)

Le périmètre des modules `CM.*` s'est étoffé avec la livraison de la porte « Par mon problème ». La cible architecturale initiale (8 modules) est ici recalée sur le **périmètre réel** :

| Module | Rôle | État |
|---|---|---|
| `CM.Config` | Données pures, mappings métier, constantes | ✅ existe |
| `CM.Composants` | Fonctions de rendu HTML (cartes, encarts, fiches) | ✅ existe (à dégraisser) |
| `CM.Referentiel` | Catalogue des indicateurs (data + `ajouter` / `tous` / `chercher` / `filtrerParContexte`) | ✅ existe |
| `CM.IndicateursMeta` | Tagging multi-axes (tags problèmes × cadres de travail) — socle de la porte problème | ✅ existe (ajouté en session précédente) |
| `CM.DiagnosticProbleme` | Matrice niveau × problème → sélection d'indicateurs pertinents | ✅ existe (ajouté en session précédente) |
| `CM.VuePorteProbleme` | Vue stepper 1→2→3 du parcours par problème | ✅ existe (ajouté en session précédente) |
| `CM.Preferences` | Persistance URL hash + localStorage (vue active, filtres, porte courante) | ✅ existe (ajouté en session précédente) |
| `CM.App` | Orchestration, événements, état global | ✅ existe |
| `CM.Apropos` / `CM.Gemba` | Contenu pédagogique | ✅ existent |
| `CM.Html` | Utilitaires HTML (escape, bloc, attr) | ☐ à créer (Règle 1) |
| `CM.FicheViewModel` | Adaptateur Référentiel → ViewModel pour la fiche | ☐ à créer (Règle 3) |

**Direction des dépendances** : App → Vues (VuePorteProbleme, etc.) → Composants → Domaine (IndicateursMeta, DiagnosticProbleme) → Referentiel → Config. Pas de cycle.

### 3.2 Jalons de convergence

| Jalon | État | Déclencheur opportuniste |
|---|---|---|
| `CM.Html.escape()` créé et utilisé partout | ☐ 🟡 | À la prochaine concaténation HTML touchée (ou dès qu'une saisie utilisateur / import CSV est ajouté) |
| Tous les mappings métier dans `CM.Config` | ☐ 🟡 | Quand je touche `CM.Composants` (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) |
| `ouvrirTiroir()` < 50 lignes | ✅ (11 lignes — 18/04/2026) | Réalisé en greffe sur la revue p5 — `rendreFicheHtml(ind)` extrait |
| Zéro style inline en JS | ☐ 🟢 | À chaque nouvelle chaîne HTML ajoutée |
| `CM.Referentiel.valider()` + console.warn au boot | ☐ 🟡 | Quand j'ajoute un nouveau champ ou type d'indicateur — noter que `CM.IndicateursMeta.valider()` existe déjà, pourrait servir de modèle |
| Module `CM.FicheViewModel` créé | ☐ 🟡 | Juste après la décomposition de `rendreFicheHtml` en sous-fonctions de section |
| `ARCHITECTURE.md` (1 page) dans le dossier | ☐ 🟢 | Après la création de `CM.Html` et `CM.FicheViewModel` — recaler aussi la cible en incluant les 4 nouveaux modules ci-dessus |
| Décomposition de `rendreFicheHtml(ind)` (138 lignes monobloc) | ☐ 🔴 | Greffe prévue sur la revue t4 — par section (header, cadre, exemples, vigilance, contexte) |

**Audit actuel (18/04/2026)** : périmètre plus large qu'annoncé dans la mémoire initiale (4 modules ajoutés non prévus dans la cible d'origine). Nouvelle estimation : **7/10 clean code** (structure IIFE/namespace respectée sur les nouveaux modules), **5/10 hexagonal-light** (Vues séparées des Composants, mais `rendreFicheHtml` reste à décomposer et `CM.Html` reste à créer). Cible à 5 itérations : **8/10 et 7/10**.

---

## 4. Évolutions produit envisagées (non priorisées)

| Évolution | Valeur attendue | État |
|---|---|---|
| Version condensée / aide-mémoire imprimable (1 page) | Support d'atelier, d'onboarding manager | ⚪ |
| Export d'un sous-ensemble d'indicateurs filtré (CSV ou markdown) | Partage avec une équipe ciblée | ⚪ |
| Mode « facilitation atelier » (typo +20 %, pastilles agrandies, fond sombre) | Projection en salle, lisibilité 6 m | ⚪ |
| **Outil d'aide à la décision — v2 enrichie** (questionnaire multi-critères 10-15 questions : contexte, maturité, contraintes culturelles, rôle) | Aller plus loin que la v1 (problème × niveau) si besoin terrain confirmé | ⚪ 🟡 |
| Visualisation des liens KGI → KPI → KBI entre niveaux | Montrer la traçabilité stratégie → exécution | ⚪ |
| Mode sombre | Confort de lecture prolongée | ⚪ 🟢 |
| Impression PDF propre d'une fiche | Partage hors outil | ⚪ 🟢 |
| Mémorisation de la dernière vue ouverte (porte + filtres) au-delà de la session | Confort d'usage quotidien — socle `CM.Preferences` prêt | ⚪ 🟢 |

---

## 5. Dette documentaire

| Item | Pourquoi | État |
|---|---|---|
| Lexique central des anti-patterns (deploy theater, Goodhart, splitting, phantom delivery, local optimum, déclassement cosmétique, acharnement thérapeutique, découpage factice, rassurance par la moyenne, diversification cosmétique, concentration cachée, bus factor…) | Aujourd'hui dispersé dans les `term-def` des fiches — valeur pédagogique forte à l'agréger | ⚪ 🟡 |
| Note « Comment lire une fiche » (Niveau / Maturité / Fiabilité / Terrain) | Accessibilité pour un nouveau lecteur | ⚪ 🟢 |
| Pied de page avec date de dernière révision et numéro de version | Traçabilité | ⚪ 🟢 |
| `ARCHITECTURE.md` (1 page) — voir jalon section 3.2 | Ancrage pour une relecture externe / onboarding contributeur | ⚪ 🟢 |

---

## Prochaine action recommandée

**t4 — Efficacité de flux portefeuille**. Panel spécifique à l'axe flux au niveau portefeuille : Goldratt (TOC — la flow efficiency équipe par équipe est une optimisation locale, seul compte le débit du système global), Vacanti (la moyenne masque la distribution — scatterplot obligatoire), Kersten (flow efficiency au niveau *flow items*, pas au niveau personne), Deming en garde-fou (94 % = système, toute lecture individuelle est statistiquement fausse).

**Greffe opportuniste** prévue : décomposer `rendreFicheHtml(ind)` (138 lignes monobloc) en sous-fonctions par section (`rendreEnteteFiche`, `rendreCadreMethodo`, `rendreExemples`, `rendreVigilance`, `rendreContexte`). Premier pas vers le module `CM.FicheViewModel`.

**Note méthode** : la Règle 1 (`CM.Html.escape`) reste différée tant qu'aucune donnée externe n'entre dans le pipeline. À déclencher si on ajoute une importation CSV, une saisie utilisateur, ou une lecture de URL hash non validée.
