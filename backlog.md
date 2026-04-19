# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **19 avril 2026** (revue t4 ✅ + greffe `CM.FicheViewModel` ✅ + 3 commits accents/préposition/conseil pédagogique + chantier 6.3 chips cadres ✅ + revue af-m3 ✅ + extraction `CM.Config.MESSAGES` ✅ + revue af-sc5 ✅ — toutes les fiches Affaires/FLUX sont désormais au standard 2026-04).

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
| t4 | Portefeuille / FLUX | Efficacité de flux (ratio temps actif / lead time) | ✅ | Usage en évaluation individuelle, optimisation locale, moyenne trompeuse, Goodhart, piloter sans Gemba — **révisée le 19/04/2026** (commit `bae57b0`, enrichissement `exemple_eq` avec usage constructif Gemba côté équipe ; panel Kersten / Vacanti / Goldratt + Deming / Gemba déjà présent) |
| af-c2 | Affaires / FLUX | Durée du cycle de vente | ✅ | Usage en évaluation individuelle, moyenne trompeuse, définition floue, biais du survivant, optimisation locale — **révisée le 18/04/2026** (commit `c9640e9`, panel Roberge / Rackham / Ross + Deming / Goodhart / Gemba) |
| af-m3 | Affaires / FLUX | Taux de conversion MQL → SQL | ✅ | Inflation MQL, abaissement silencieux des standards SQL, confusion output/outcome, désalignement accusatoire, moyenne trompeuse — **révisée le 19/04/2026** (commit `52ea2a1`, panel Sirius Decisions Demand Waterfall / Roberge / Kaplan & Norton + garde-fous Deming / Goodhart / Gemba) |
| af-sc5 | Affaires / FLUX | Délai de première réponse client | ✅ | Réponse vide pour cocher le SLA, moyenne globale trompeuse, pression individuelle sur agents, confusion TTFR / Time to Resolution, optimisation locale vs effort total (CES) — **révisée le 19/04/2026** (commit `5cdd889`, panel Dixon / Reichheld / ITIL + garde-fous Goodhart temporel / Deming / Gemba ; fiabilité descendue de 'fiable' à 'precaution') |

**Fiches déjà revues au standard 2026-04** : o1 (Fréquence de déploiement), o2 (Lead Time), o3 (Change Failure Rate), o5 (MTTR), p5 (Débit d'initiatives livrées), **af-c2 (Durée du cycle de vente, 18/04/2026)**, **t4 (Efficacité de flux portefeuille, 19/04/2026)**, **af-m3 (Taux de conversion MQL → SQL, 19/04/2026)**, **af-sc5 (Délai de première réponse client, 19/04/2026)**, et les fiches du chantier 3 (s6 à s10, t6, t7, p6, p7) nativement rédigées à ce standard.

**🎯 Toutes les fiches Affaires/FLUX (af-c2, af-m3, af-sc5) sont désormais au standard 2026-04**, au même titre que les fiches DevOps (o1, o2, o3, o5), Programme (p5) et Portefeuille (t4). Les prochaines fiches à reprendre seront sur d'autres axes (Qualité, Humain, Risque, Sécurité, Données…) à mesure que des incohérences ou des besoins terrain remontent.

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
| `CM.FicheViewModel` | Adaptateur Référentiel → ViewModel pour la fiche | ✅ créé (19/04/2026, commit `a65db6a`) |

**Direction des dépendances** : App → Vues (VuePorteProbleme, etc.) → Composants → Domaine (IndicateursMeta, DiagnosticProbleme) → Referentiel → Config. Pas de cycle.

### 3.2 Jalons de convergence

| Jalon | État | Déclencheur opportuniste |
|---|---|---|
| `CM.Html.escape()` créé et utilisé partout | ☐ 🟡 | À la prochaine concaténation HTML touchée (ou dès qu'une saisie utilisateur / import CSV est ajouté) |
| Tous les mappings métier dans `CM.Config` | ☐ 🟡 | Quand je touche `CM.Composants` (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) |
| `ouvrirTiroir()` < 50 lignes | ✅ (11 lignes — 18/04/2026) | Réalisé en greffe sur la revue p5 — `rendreFicheHtml(ind)` extrait |
| Zéro style inline en JS | ☐ 🟢 | À chaque nouvelle chaîne HTML ajoutée |
| `CM.Referentiel.valider()` + console.warn au boot | ☐ 🟡 | Quand j'ajoute un nouveau champ ou type d'indicateur — noter que `CM.IndicateursMeta.valider()` existe déjà, pourrait servir de modèle |
| Module `CM.FicheViewModel` créé | ✅ (19/04/2026) | Livré en commit `a65db6a` — `rendreFicheHtml` devient pure orchestration, les mappings display (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) vivent dans le ViewModel. Identité HTML préservée sur 17 fiches (111 708 octets) |
| `ARCHITECTURE.md` (1 page) dans le dossier | ☐ 🟢 | Après la création de `CM.Html` et `CM.FicheViewModel` — recaler aussi la cible en incluant les 4 nouveaux modules ci-dessus |
| Décomposition de `rendreFicheHtml(ind)` en 11 sous-fonctions par section | ✅ (18/04/2026) | Livré en commit `006d12b` — identité HTML octet-à-octet préservée sur 16 fiches représentatives (`rendreEnteteFiche`, `rendreCadreLecture`, `rendreDefinition`, `rendreObjectif`, `rendreFrequence`, `rendreExemples`, `rendreVigilance`, `rendreAlternative`, `rendreContexteFiabilite`, `rendreContexteMaturite`, `rendreDomaine`) |

**Audit actuel (19/04/2026, après commits `006d12b` + `e4d7041` + accents `37244d2`/`da90504`/`949c169` + revue t4 `bae57b0` + greffe ViewModel `a65db6a`)** : périmètre plus large qu'annoncé dans la mémoire initiale. `rendreFicheHtml` décomposé en 11 sous-fonctions et désormais réduit à une pure orchestration (13 lignes, 0 dérivation). `CM.Html` ✅ et `CM.FicheViewModel` ✅ tous deux livrés. Plafond arbitraire levé sur les 2 portes. Nouvelle estimation : **8/10 clean code** (IIFE/namespace propres, fonctions courtes, dérivations isolées du rendu), **7/10 hexagonal-light** (Vues séparées, ViewModel séparé du rendu, Html utilitaire isolé). Cible à 3 itérations : **8,5/10 et 8/10**.

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

## 6. Évolutions porte « Par mon problème » — file d'attente

Chantier en pause le 18/04/2026 après l'item 6.1 : l'ossature est assainie (plafond retiré, tri fiabilité préservé, labels UI honnêtes), les items suivants sont documentés pour reprise ultérieure avec points d'ancrage code précis pour que la reprise soit immédiate.

| # | Évolution | Priorité | Valeur | État |
|---|---|---|---|---|
| 6.1 | Retrait du plafond arbitraire de 5 recommandations (2 portes + 2 labels UI) | 🔴 | Corrige un biais d'information invisible — 75-80 % de l'information était masquée sur les couples les plus denses (23 fiches visibles sur opé × qualité) | ✅ (18/04/2026, commit `e4d7041`) |
| ~~6.2~~ | ~~Reformulation du conseil pédagogique (« 1-2 par axe, plusieurs axes » au lieu de « 1-2 au total »)~~ | 🟡 | ✅ Livré 19/04/2026 (commit `f7be58b`) — variante 2 unifiée : une seule chaîne partagée entre les portes Par mon rôle et Par mon problème, qui n'en portait pas. Introduction de `CM.Config.conseilPedagogiquePour(contexte)` comme façade stable (port hexagonal) pour préparer la variante 3 future sans refactor des vues. |
| 6.2+ | **Variante 3 — conseil adapté au contexte** | 🟢 | Évolution de 6.2 : produire une formulation qui nomme explicitement l'axe du problème ou de l'objectif choisi (ex : « pour un problème de flux, commencez par 1-2 métriques sur le cœur du problème, puis complétez sur un axe contextuel »). Façade déjà en place (`conseilPedagogiquePour(contexte)`) — il suffit d'enrichir cette fonction + maintenir un mapping problème→formulation. **Travail de présentation / lisibilité / placement à faire** : où afficher le conseil adapté ? plier/déplier ? deux paragraphes ou un seul ? Exige un nouveau mockup-preview. | ⏸ |
| 6.3 | Chips « cadres de travail » (DORA, Lean, Scrum…) visibles sur les cartes | 🟡 | La donnée META existe déjà sur 60+ fiches mais n'est jamais rendue — l'utilisateur ne voit pas à quel cadre méthodologique rattacher une métrique | ✅ (19/04/2026, commits `caf98ea` règle de filtrage + `0987af5` rendu sous le nom) |
| 6.4 | Module `CM.Panier` (ajout/retrait métriques vers une sélection personnalisée, persistance localStorage) | 🟡 | Socle du tableau de bord personnalisé multi-axes — permet de construire une sélection 3-5 métriques cohérentes | ⏸ |
| 6.5 | Vue « Mon tableau de bord » groupée par axe (3 statuts : active / veille / écartée) | 🟡 | Rend la sélection actionnable : distingue ce qu'on suit activement de ce qu'on garde en veille, avec raison d'écartement tracée | ⏸ |
| 6.6 | Export / import JSON du panier | 🟢 | Partage entre équipes, réutilisation d'un tableau de bord validé, sauvegarde hors navigateur | ⏸ |
| 6.7 | Porte « Par mon cadre » (DORA, Scrum, Kanban, SAFe…) | 🟢 | 4e porte d'entrée — pour l'utilisateur qui part d'un cadre méthodologique installé et cherche quelles métriques ce cadre recommande | ⏸ |
| 6.8 | Historique / snapshots temporels du panier | 🟢 | Suivre l'évolution de la sélection sur 6-12 mois au rythme de la maturité de l'équipe (ex : on surveille A et B au T1, puis C remplace B au T3) | ⏸ |

### 6.a Points d'ancrage code (pour reprise fluide)

Chaque item ci-dessous pointe précisément vers le code à toucher, pour qu'une reprise n'exige pas de refaire l'archéologie du fichier.

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| ~~6.2 Conseil pédagogique reformulé~~ | ~~`CM.Config.MESSAGES.conseilPedagogique` + deux points d'appel~~ | ✅ Livré 19/04/2026 (commit `f7be58b`) — variante 2 : chaîne unifiée, façade `CM.Config.conseilPedagogiquePour(contexte)` introduite, appel ajouté dans `CM.VuePorteProbleme._etapeResultats` après la grille-cartes. Les vues ne référencent plus jamais `MESSAGES.conseilPedagogique` directement. |
| 6.2+ Variante 3 — conseil adapté au contexte | `CM.Config.conseilPedagogiquePour(contexte)` — la fonction existe déjà et ignore le contexte aujourd'hui | Enrichir cette unique fonction pour router vers une formulation spécifique selon `contexte.probleme` (porte Par mon problème) ou `contexte.objectif` (porte Par mon rôle). Mapping ~6-8 entrées. Les vues n'ont rien à changer. Avant : mockup-preview de lisibilité / placement (travail éditorial à faire). |
| ~~6.3 Chips cadres sur cartes~~ | ~~`CM.Composants.htmlCarte` (~ligne 3552) + lookup `CM.IndicateursMeta.META` (lignes 1953-2100) + vocabulaire `CADRES` déjà défini~~ | ✅ Livré 19/04/2026 (commits `caf98ea` règle métier + `0987af5` rendu + `bcd95f7` repositionnement final en pied de carte-corps). Nouvelle méthode `cadresAffichables` dans CM.IndicateursMeta (masque « generique » en présence d'un cadre spécifique) ; sous-fonction `rendreChipsCadres` dans CM.Composants. Décision UX validée après mockup-preview comparant 3 emplacements : pied de carte-corps, prolongement naturel de la zone méta (fréquence + maturité). |
| 6.4 Module `CM.Panier` | Nouveau module à créer entre `CM.Preferences` et `CM.App` | API proposée : `Panier.ajouter(id, statut, raison?)` / `Panier.retirer(id)` / `Panier.changerStatut(id, statut)` / `Panier.tous()` / `Panier.parAxe()`. Persistance localStorage clé `cm-panier-v1` |
| 6.5 Vue Tableau de bord | Nouveau module `CM.VueTableauDeBord` + 5e vue dans l'accueil 4 portes | 3 statuts : `active` / `veille` / `ecartee`. Grouper par axe problème (flux, qualité, valeur, risque, humain…). Raisons d'écartement : liste fixe 6 items (voir 6.b) |
| 6.6 Export / import JSON | Bouton dans vue tableau de bord | Format : `{ version:"1", panier:[{id, statut, raison?, dateAjout}], cadres:[…] }`. Import avec validation `CM.Referentiel.chercher(id)` — les ids inconnus sont ignorés + warning |
| 6.7 Porte « Par mon cadre » | Nouveau module `CM.VuePorteCadre` parallèle à `CM.VuePorteProbleme` | Parcours 2 étapes : choix cadre → filtre sur META.cadres. Données déjà présentes, pas de revue métier préalable |
| 6.8 Snapshots temporels | Extension `CM.Panier` | `Panier.snapshot(nom)` sauvegarde l'état courant avec timestamp, `Panier.comparer(nomA, nomB)` affiche le delta |

### 6.b Spécifications déjà validées (pour ne pas redécider)

**Raisons d'écartement (liste fixe, pas de champ libre)** — validé le 18/04/2026 :
1. Donnée absente
2. Maturité insuffisante
3. Redondante
4. Hors périmètre
5. Risque d'anti-pattern
6. Coût > valeur

**Principe « 3-5 maximum »** : focale **par axe** (1-2 sur l'humain, 1-2 sur la livraison, 1-2 sur l'alignement), pas un plafond global arbitraire. La cohérence entre axes compte plus que le total.

**Principe de non-plafonnement** : toute limite arbitraire imposée par le produit après filtrage explicite (niveau / problème / domaine) crée un biais d'information invisible. Le tri par fiabilité suffit à mettre en tête ce qui est le plus exploitable.

### 6.c Flexibilité architecturale — préparation à coût marginal

Pour garder la file d'attente 6.2-6.8 facile à reprendre, ces refactors **ne cassent rien aujourd'hui** et paveront le terrain :

| Préparation | Bénéfice à la reprise | Coût maintenant |
|---|---|---|
| ~~Extraire textes de conseil pédagogique vers `CM.Config.MESSAGES`~~ ✅ livré 19/04/2026 (commit `af216d4`) | 6.2 devient un changement de string, pas un changement structurel | ~15 lignes, 1 commit `refactor:` — **livré** (28 insertions / 2 suppressions) |
| Ajouter stub `CM.Panier = { ajouter: () => {}, tous: () => [] }` avec `TODO` | 6.4 démarre avec l'API déjà posée ; les vues qui référencent le panier ne cassent pas le jour où on l'active | ~20 lignes, 1 commit `chore:` |
| Créer `CM.Html.escape()` avant le premier usage utilisateur (panier + export JSON seront les premières entrées utilisateur) | 6.4-6.6 ont le garde-fou sécurité déjà présent — pas besoin d'un refactor urgent plus tard | ~10 lignes, règle 1 du refactoring |

⚠️ Ces préparations sont **optionnelles et différées** tant que Lætitia n'a pas redéclenché le chantier 6. Elles sont listées ici pour que le choix soit visible, pas imposé.

---

## Prochaine action recommandée

6.2 livré le 19/04/2026 (commit `f7be58b`). Les deux portes d'entrée partagent désormais un conseil pédagogique unifié qui porte la règle « 1 à 2 métriques par axe, sur 2 à 3 axes ». Trois pistes ouvertes pour la suite :

**Piste A — Chantier 6.7 : porte « Par mon cadre »** (🟢). 3e porte d'entrée (DORA, Lean Six Sigma, Drucker/MBO, OKR…). Ne dépend pas du Panier (6.4) ni du Tableau de bord (6.5). Calquée sur `CM.VuePorteProbleme`. Un mockup-preview pour l'ergonomie de sélection du cadre, un module `CM.VuePorteCadre` à créer. Coût estimé : une session moyenne (1-2 h). **C'est ma reco par défaut** : rend l'accueil plus complet (3 portes actives sur 4 prévues) avant d'attaquer l'infra panier/tableau.

**Piste B — Greffe architecturale opportuniste** (🟡) sur `CM.Composants` : migrer les mappings `NIVEAU_VERS_POSITION` et `FIABILITE_VERS_NIVEAU` vers `CM.Config` (Règle 2 du refactoring progressif). Session courte et technique, ~45 min.

**Piste C — Chantier 6.4 : stub `CM.Panier`** (🟢). Pose l'API côté module sans l'activer. 20 lignes, commit `chore:`. Permet aux vues futures (6.5, 6.7) de référencer le panier dès le premier jour sans casser. À faire si on prévoit d'enchaîner rapidement sur 6.5.

**Piste D — Chantier 6.2+ : variante 3 du conseil pédagogique** (🟢). Nécessite d'abord un travail éditorial (formulations par axe de problème / objectif) + un mockup-preview de lisibilité et placement. À faire quand l'envie de peaufiner la pédagogie se présente.

**Piste E — Ouvrir un axe de revue métier non encore audité** (🟢). Fiches Qualité, Humain, Risque, Sécurité, Données, Produit jamais systématiquement passées au standard 2026-04.

**État infra pour le chantier 6** : Règle 1 ✅, `CM.FicheViewModel` ✅, `CM.Config.MESSAGES` ✅, `CM.Config.conseilPedagogiquePour(contexte)` ✅ (façade prête pour 6.2+), stub `CM.Panier` pas encore posé.

**Ma recommandation** : piste A (porte Par mon cadre). La structure `VuePorteProbleme` fournit un gabarit éprouvé, les données `META.cadres` sont déjà présentes, et la valeur utilisateur est visible (3e entrée dans l'accueil). La piste B est un bon repli si tu préfères une session courte sans décision UX.
