# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **20 avril 2026** (livraison chantier 6.7a : bloc « Cadres voisins dans le référentiel » en pied de résultats de la porte *Par mon cadre*, calculé par co-occurrence pure sur `META.cadres`, seuil de 2 fiches partagées, exclusion de `generique`. Commit unique `6cdb0c4`. Le chantier 6.7 lui-même avait été livré plus tôt le même jour en cinq commits : `ccbd1e7` planification, `4842231` feat porte complète (référentiel FAMILLES + accordéon), `ce39360` description des cadres sous le libellé, `680f492`+`2988e07` fixes accents).

Légende : 🔴 priorité haute · 🟡 moyenne · 🟢 basse · ⚪ à décider · ✅ fait · ⏳ en cours

---

## 0. Chantiers majeurs livrés → archivés

Les grands chantiers livrés et stabilisés sont déplacés vers [`backlog-archive.md`](./backlog-archive.md) pour garder ce backlog focalisé sur le travail en cours.

Actuellement archivés : **Porte « Par mon problème » — v1** (2 questions → 3-5 indicateurs, parcours 3 étapes). Voir l'archive pour le détail des items et les commits de référence.

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

**Portée actuelle du standard 2026-04** — les fiches du tableau ci-dessus (axes DevOps, Programme, Portefeuille, Affaires/FLUX) + les fiches du chantier 3 (s6 à s10, t6, t7, p6, p7) nativement rédigées à ce standard. Prochaines fiches à reprendre : d'autres axes (Qualité, Humain, Risque, Sécurité, Données, Produit), à déclencher sur remontée d'incohérence ou de besoin terrain.

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
| `CM.DiagnosticCadre` | Logique métier « quels indicateurs pour ce cadre × ce niveau » — délègue les niveaux à `CM.DiagnosticProbleme` pour ne pas dupliquer le vocabulaire | ✅ créé (20/04/2026, commit `4842231`) |
| `CM.VuePorteCadre` | Vue stepper 1→2→3 du parcours par cadre (accordéon par famille en étape 1, bloc *Cadres voisins dans le référentiel* en pied de résultats) | ✅ créé (20/04/2026, commits `4842231` + `6cdb0c4`) |
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
| ~~6.2~~ | ~~Reformulation du conseil pédagogique (« 1-2 par axe, plusieurs axes » au lieu de « 1-2 au total »)~~ | 🟡 | ✅ Livré 19/04/2026 en deux commits : (1) `f7be58b` — variante 2 unifiée, une seule chaîne partagée entre les portes Par mon rôle et Par mon problème (qui n'en portait pas), introduction de `CM.Config.conseilPedagogiquePour(contexte)` comme façade stable (port hexagonal) ; (2) `38b9458` — aération typographique V3 : quatre paragraphes logiques (cadre / règle / méthode / aphorisme) avec aphorisme isolé par filet pointillé pour retrouver son rôle de chute Gemba. |
| 6.2+ | **Variante 3 — conseil adapté au contexte** | 🟢 | Évolution de 6.2 : produire une formulation qui nomme explicitement l'axe du problème ou de l'objectif choisi (ex : « pour un problème de flux, commencez par 1-2 métriques sur le cœur du problème, puis complétez sur un axe contextuel »). Façade déjà en place (`conseilPedagogiquePour(contexte)`) — il suffit d'enrichir cette fonction + maintenir un mapping problème→formulation. **Travail de présentation / lisibilité / placement à faire** : où afficher le conseil adapté ? plier/déplier ? deux paragraphes ou un seul ? Exige un nouveau mockup-preview. | ⏸ |
| 6.3 | Chips « cadres de travail » (DORA, Lean, Scrum…) visibles sur les cartes | 🟡 | La donnée META existe déjà sur 60+ fiches mais n'est jamais rendue — l'utilisateur ne voit pas à quel cadre méthodologique rattacher une métrique | ✅ (19/04/2026, commits `caf98ea` règle de filtrage + `0987af5` rendu sous le nom) |
| 6.4 | Module `CM.Panier` (ajout/retrait métriques vers une sélection personnalisée, persistance localStorage) | 🟡 | Socle du tableau de bord personnalisé multi-axes — permet de construire une sélection 3-5 métriques cohérentes | ⏸ |
| 6.5 | Vue « Mon tableau de bord » groupée par axe (3 statuts : active / veille / écartée) | 🟡 | Rend la sélection actionnable : distingue ce qu'on suit activement de ce qu'on garde en veille, avec raison d'écartement tracée | ⏸ |
| 6.5a | **Conseil holistique post-sélection panier** | 🟡 | Une fois la sélection faite, audit automatique de la cohérence : axes couverts, cadres représentés, niveaux hiérarchiques. Phrases-conseils (« il te manque l'axe humain », « tu as deux métriques DORA, pense à équilibrer avec une OKR »). Reporte le bloc « cadres complémentaires » de la porte Par mon problème vers le panier — plus pertinent ici, parce que l'utilisateur a fait un choix concret. | ⏸ |
| 6.5b | **Déclaration des métriques déjà en place (checkbox)** | 🟢 | Checkbox sur les fiches du catalogue : *« je l'ai déjà »*. Transforme l'outil en diagnostic d'un tableau de bord existant, pas seulement en aide à la création. Nouveau conseil exploitable : *« tu as déjà X et Y, ta complémentarité naturelle serait Z »*. | ⏸ |
| 6.6 | Export / import JSON du panier | 🟢 | Partage entre équipes, réutilisation d'un tableau de bord validé, sauvegarde hors navigateur | ⏸ |
| 6.7 | **Porte « Par mon cadre » (DORA, Scrum, Kanban, SAFe, Lean, OKR, MBO, BSC, ITIL, Générique)** | 🔴 | 3e porte d'entrée — pour l'utilisateur qui part d'un cadre méthodologique installé et cherche quelles métriques ce cadre recommande. Parcours 3 étapes (cadre → niveau → résultats), accordéon par famille d'école de pensée (7 familles, toutes fermées à l'arrivée). 10 cadres actifs + 10 cadres « à venir » en tuiles grisées (XP, EBM, TOC, Théorie des files d'attente, SPACE, Flow Metrics, Hoshin Kanri, COBIT, Cynefin, Wardley Maps). `generique` maintenu comme cadre sélectionnable sous la famille *Universel*. Conseil pédagogique générique v1 (variante par cadre = 6.2+). | ✅ (20/04/2026, cinq commits : `ccbd1e7` planification + `4842231` feat porte complète (référentiel FAMILLES + accordéon) + `ce39360` description des cadres sous le libellé + `680f492`+`2988e07` fixes accents) |
| 6.7a | **Cadres voisins dans le référentiel (co-occurrence pure)** | 🟡 | Bloc en pied de résultats de la porte cadre : *« Cadres voisins dans le référentiel »* (variante C — carte d'invitation validée après mockup-preview). Algorithme : fonction `CM.IndicateursMeta.cadresProchesDe(cadreId, { n, seuilMin, exclure })` qui compte la co-occurrence sur `META.cadres`. Paramètres par défaut : `n=2`, `seuilMin=2` (silence éditorial plutôt que bruit), `exclure=['generique']`. Tuiles cliquables qui pivotent vers le cadre voisin via `CM.VuePorteCadre.pivoterVersCadre` (préserve le niveau et l'étape 3, contrairement à `setCadre` qui relance le parcours). Affiché uniquement si `recos.length > 0`. Aucune table éditoriale séparée — principe source unique de vérité. | ✅ (20/04/2026, commit `6cdb0c4`) |
| 6.7b | **Enrichissement `familleInformelle` sur fiches generique-seul** | 🟢 | Ajouter une clé optionnelle `META[ficheId].familleInformelle` pour les fiches aujourd'hui tagguées `['generique']` seulement, afin que le calcul de co-occurrence puisse les rattacher à un cadre voisin sans les taguer formellement. Conçu comme extension non-invasive de l'algorithme : `cadresProchesDe` accepterait une nouvelle option `inclureFamilleInformelle: true`. Reporté selon décision MVP — à ouvrir seulement si un usage terrain révèle qu'on s'ampute de bonnes suggestions. | ⏸ |
| 6.7c | **Cas particulier `generique` — bloc dédié** | 🟡 | Si l'utilisateur entre par le cadre *Générique*, remplacer le bloc « Cadres voisins dans le référentiel » par un bloc différent : *« Ces cadres spécifiques éclairent les mêmes indicateurs »*. Inversion du sens éditorial — on ne propose pas des voisins au même niveau, on propose une montée en spécificité. Requiert une variante de `_htmlBlocVoisins` ou un paramètre `modeInvitation` et probablement de remonter le résultat sans exclure `generique` (mais ici le cadre source EST generique, donc la logique s'inverse naturellement). | ⏸ |
| 6.8 | Historique / snapshots temporels du panier | 🟢 | Suivre l'évolution de la sélection sur 6-12 mois au rythme de la maturité de l'équipe (ex : on surveille A et B au T1, puis C remplace B au T3) | ⏸ |

### 6.a Points d'ancrage code (pour reprise fluide)

Chaque item ci-dessous pointe précisément vers le code à toucher, pour qu'une reprise n'exige pas de refaire l'archéologie du fichier.

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| 6.2+ Variante 3 — conseil adapté au contexte | `CM.Config.conseilPedagogiquePour(contexte)` — la fonction existe déjà et ignore le contexte aujourd'hui | Enrichir cette unique fonction pour router vers une formulation spécifique selon `contexte.probleme` (porte Par mon problème) ou `contexte.objectif` (porte Par mon rôle). Mapping ~6-8 entrées. Les vues n'ont rien à changer. Avant : mockup-preview de lisibilité / placement (travail éditorial à faire). |
| 6.4 Module `CM.Panier` | Nouveau module à créer entre `CM.Preferences` et `CM.App` | API proposée : `Panier.ajouter(id, statut, raison?)` / `Panier.retirer(id)` / `Panier.changerStatut(id, statut)` / `Panier.tous()` / `Panier.parAxe()`. Persistance localStorage clé `cm-panier-v1` |
| 6.5 Vue Tableau de bord | Nouveau module `CM.VueTableauDeBord` + 5e vue dans l'accueil 4 portes | 3 statuts : `active` / `veille` / `ecartee`. Grouper par axe problème (flux, qualité, valeur, risque, humain…). Raisons d'écartement : liste fixe 6 items (voir 6.b) |
| 6.5a Conseil holistique post-sélection | Nouveau module `CM.ConseilSelection` (fonction pure) appelé depuis `CM.VueTableauDeBord` | Entrée : `Panier.tous()` + mapping axes/cadres/niveaux. Sortie : 2 à 4 phrases-conseils. Fonction pure, testable, sans effet de bord — respecte le port hexagonal. |
| 6.5b Checkbox « je l'ai déjà » | Ajout d'un champ `statut='deja-en-place'` dans `CM.Panier` + bouton dans `rendreFicheHtml` (panneau actuel) | Ne casse pas l'API panier existante (le statut s'ajoute à la liste `active` / `veille` / `ecartee`). Le conseil 6.5a exploite cette information pour produire des suggestions de complément. |
| 6.6 Export / import JSON | Bouton dans vue tableau de bord | Format : `{ version:"1", panier:[{id, statut, raison?, dateAjout}], cadres:[…] }`. Import avec validation `CM.Referentiel.chercher(id)` — les ids inconnus sont ignorés + warning |
| 6.7b Enrichissement `familleInformelle` | `CM.IndicateursMeta.META[ficheId].familleInformelle` (clé optionnelle) + option `inclureFamilleInformelle: true` dans `cadresProchesDe` | Extension non-invasive ; si l'option vaut `false` (défaut), le comportement actuel ne bouge pas. Si `true`, une fiche `['generique']` + `familleInformelle: 'lean'` compte comme un vote pour la paire (generique × lean) et pour les paires cachées entre autres cadres tagguant la même `familleInformelle`. À n'ouvrir que si l'usage terrain révèle un manque. |
| 6.7c Cas `generique` — bloc dédié | Variante de `_htmlBlocVoisins` ou paramètre `modeInvitation` | Quand `etat.cadre === 'generique'`, remplacer le titre *« Cadres voisins dans le référentiel »* par *« Ces cadres spécifiques éclairent les mêmes indicateurs »* et ajuster la phrase d'accompagnement. Comme le cadre source EST generique, l'exclusion `['generique']` est ici neutre (pas de self-match) et la liste retournée est précisément celle souhaitée : les cadres qui co-occurrent avec des fiches aussi tagguées generique. |
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

**Principe « source unique de vérité » pour les cadres complémentaires (6.7a)** — validé le 20/04/2026. Les affinités entre cadres ne sont PAS une donnée à stocker dans une seconde table éditoriale : elles sont un *calcul dérivé* des tags `META.cadres` existants. Conséquences : ajouter un nouveau cadre demande uniquement une ligne dans `CADRES` + le tagguer progressivement sur les fiches pertinentes ; les affinités émergent automatiquement. Si un cadre paraît isolé alors qu'il ne devrait pas l'être, c'est un signal que les fiches sont sous-tagguées — le remède est d'enrichir META, pas de créer une couche décorative.

**Principe « generique reste sélectionnable »** — validé le 20/04/2026. La tuile « Indicateur générique » reste un choix accessible depuis la grille de la porte cadre. Elle désigne l'ensemble des fiches non rattachées à un cadre méthodologique spécifique — bac à sable utile, éventuellement porte d'entrée pour un utilisateur sans cadre installé. Le futur bloc 6.7c (*« Ces cadres spécifiques éclairent les mêmes indicateurs »*) proposera une inversion éditoriale quand l'utilisateur entre par `generique`, pour orienter vers les cadres spécifiques pertinents plutôt que vers des voisins de même niveau.

**Principe « accordéon par école de pensée » (v1, remplace la grille à plat)** — pivot décidé le 20/04/2026 pendant le chantier 6.7, après mockup-preview. La v1 initialement prévue (grille à plat 10 tuiles) a été remplacée par un accordéon `<details>/<summary>` natif regroupant les cadres par **7 familles d'école de pensée** : Empirisme agile · Excellence opérationnelle · Observabilité du delivery · Pilotage par les objectifs · IT Service Management · Aide à la décision · Universel. Toutes les familles sont fermées à l'arrivée (carte d'ensemble puis ouverture ciblée). Taxonomie académique volontairement préférée au vernaculaire (Agile, Lean) pour désamorcer les batailles puristes. Les tuiles « à venir » grisées matérialisent l'intention produit (10 cadres annoncés, non branchés à META).

**Principe « taxonomies par porte » — validé le 20/04/2026.** Chaque porte d'entrée appelle une taxonomie différente alignée sur la grammaire mentale de l'utilisateur à ce point d'entrée : porte problème → taxonomie *par promesse utilisateur*, porte niveau → taxonomie *par dimension du pilotage*, porte cadre → taxonomie *par école de pensée académique*. Ne jamais importer mécaniquement la taxonomie d'une porte vers une autre sans revérifier la grammaire locale.

### 6.c Flexibilité architecturale — préparation à coût marginal

Pour garder la file d'attente 6.2-6.8 facile à reprendre, ces refactors **ne cassent rien aujourd'hui** et paveront le terrain :

| Préparation | Bénéfice à la reprise | Coût maintenant |
|---|---|---|
| Ajouter stub `CM.Panier = { ajouter: () => {}, tous: () => [] }` avec `TODO` | 6.4 démarre avec l'API déjà posée ; les vues qui référencent le panier ne cassent pas le jour où on l'active | ~20 lignes, 1 commit `chore:` |
| Créer `CM.Html.escape()` avant le premier usage utilisateur (panier + export JSON seront les premières entrées utilisateur) | 6.4-6.6 ont le garde-fou sécurité déjà présent — pas besoin d'un refactor urgent plus tard | ~10 lignes, règle 1 du refactoring |

⚠️ Ces préparations sont **optionnelles et différées** tant que Lætitia n'a pas redéclenché le chantier 6. Elles sont listées ici pour que le choix soit visible, pas imposé.

---

## 7. Évolutions transversales (cross-portes)

Chantiers ouverts le 20/04/2026 dans le prolongement de la planification de la porte « Par mon cadre ». Ils touchent plusieurs portes à la fois et ne peuvent être imputés au seul chantier 6.

| # | Évolution | Priorité | Valeur | État |
|---|---|---|---|---|
| 7.1 | **Filtres globaux par cadre et par maturité de l'équipe** | 🟡 | Nouvelle déclaration utilisateur sur la maturité de son équipe (débutant / structuré / mature). Le filtre se propage à toutes les portes et masque les fiches dont la maturité requise dépasse le seuil. Évite la recommandation de métriques inaccessibles à l'équipe réelle. Peut aussi accueillir le **regroupement par famille pédagogique** de la grille de cadres (option utilisateur plutôt que structure imposée). | ⏸ |
| 7.2 | **Stepper générique extensible — de 3 à 4+ étapes selon les portes** | 🟡 | Porte *Par mon problème* : problème → niveau → cadre. Porte *Par mon cadre* : cadre → niveau → problème. Porte *Par mon niveau* (pyramide) : niveau → problème → cadre. Outil anti-surcharge — certaines combinaisons actuelles ramènent 20+ métriques, l'utilisateur se perd. Une 3e étape réduit naturellement vers 3-5 et chaque porte conserve sa *première question* alignée sur son axe d'entrée. **Exigence d'extensibilité validée le 20/04/2026** : le futur `CM.Stepper` doit accepter un **nombre variable d'étapes** (tableau ordonné de questions) pour qu'on puisse passer à 4 étapes (ajout 7.3 type de décision) ou 5 étapes (ajout 7.4 disponibilité données) sans réécrire le stepper — seulement en ajoutant une entrée dans la liste. Signature pressentie : `CM.Stepper.construire({ etapes: [...], contexteInitial, onTerminer })`. | ⏸ |
| 7.3 | **Type de décision en 4e étape (mode expert)** | 🟢 | priorisation / investissement / arrêt d'initiative / amélioration continue. Vient directement du brief projet. Une métrique de diagnostic (MTTR, Change Failure Rate) ne sert pas la même décision qu'une métrique de priorisation stratégique (ROI, part de marché). Encodage sur les fiches : nouveau champ `META.decisions = [...]`. | ⏸ |
| 7.4 | **Disponibilité des données en 5e étape (mode expert)** | 🟢 | mesurable aujourd'hui / à instrumenter / absente. Filtre pragmatique pour éviter les recommandations impossibles à alimenter faute d'instrumentation. Allonge le parcours — à réserver au mode expert. | ⏸ |
| 7.5 | **Test A/B boîte modale vs panneau latéral pour les fiches** | 🟢 | Toggle persistant dans `CM.Preferences` (clé `cm-mode-fiche`, valeurs `panneau` / `modale`). Les deux implémentations coexistent le temps du test. Dette accessibilité à anticiper côté modale : focus trap, Escape, aria-modal, retour au scroll. | ⏸ |
| 7.6 | **Liens cliquables vers les métriques recommandées dans le panneau** | 🟡 | Rendre cliquables les noms de métriques dans les encarts « Alternative recommandée » (et plus largement les références croisées entre fiches). Ouvre la fiche cible sans retour à la liste. Haute valeur d'usage, faible coût, haute cohérence interne. | ⏸ |

### 7.a Points d'ancrage code

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| 7.1 Filtres cadre + maturité | Barre de filtres existante + nouveau module `CM.FiltresGlobaux` | Nouveau select « ma maturité d'équipe » persistant dans `CM.Preferences`. Filtrage appliqué dans `CM.Referentiel.filtrerParContexte` (point d'entrée unique déjà existant). |
| 7.2 Stepper générique extensible | `CM.VuePorteProbleme._etapeResultats` (à scinder en `_etape3_cadre` + `_etapeResultats`), `CM.VuePorteCadre` déjà en 3 étapes, et `CM.App.afficherAccueil('pyramide')` à envelopper dans un stepper | Extraire un `CM.Stepper` générique qui accepte un tableau ordonné d'étapes et pilote la navigation. **Contrainte d'extensibilité** : la signature doit accepter un nombre d'étapes variable (3, 4, 5…) pour accueillir 7.3 et 7.4 sans changement structurel. Chaque étape fournit son schéma de question + rendu + règle de validation ; le stepper orchestre navigation, état, scroll, retour. Port hexagonal : le stepper ne connaît pas le métier des étapes, seulement leur contrat. |
| 7.3 Type de décision | Ajout champ `META.decisions` sur toutes les fiches + nouveau filtre dans le stepper | Encodage progressif : commencer par les fiches les plus récentes (standard 2026-04). |
| 7.4 Disponibilité données | Choix utilisateur stocké en `CM.Preferences`, aucun champ à ajouter aux fiches | Filtre côté UI uniquement (« je n'ai pas les données → écarter les fiches qui supposent une instrumentation non triviale »). Le critère de « non-trivialité » reste à définir. |
| 7.5 A/B modale / panneau | Nouveau module `CM.PanneauFiche` (API commune) avec deux implémentations : `CM.PanneauLateral` (actuel) et `CM.PanneauModal` (nouveau) | Abstraction à introduire **avant** de coder la modale, sinon on duplique la logique. Port hexagonal : `PanneauFiche.ouvrir(ind)` / `.fermer()`. |
| 7.6 Liens cliquables | `CM.Composants.rendreAlternative` (et éventuellement `rendreVigilance`) dans `rendreFicheHtml` | Remplacer la concaténation de texte par un `<a data-ind-id="...">` avec un handler qui appelle `CM.App.ouvrirFiche(id)`. Dépend de `CM.Html.escape()` (règle 1 du refactoring). |

---

## Prochaine action recommandée

Chantiers 6.7 et 6.7a **livrés** le 20/04/2026. Le bloc *Cadres voisins dans le référentiel* est actif en pied de résultats de la porte cadre, avec pivot préservant le niveau et l'étape 3 (commit `6cdb0c4`).

### Prochaine session — chantier validé

**7.6 — Liens cliquables vers les métriques citées** (🟡), dans les encarts *Alternative recommandée* et *Vigilance*. Haute valeur d'usage, faible coût. Dépend légèrement de la règle 1 (`CM.Html.escape()`) — décision à prendre au début du chantier : sécuriser à la même passe ou découpler.

**Instruction à porter dans 7.2 quand il sera ouvert** (validée le 20/04/2026) : le futur `CM.Stepper` générique devra accepter **un nombre variable d'étapes** (tableau ordonné). But : pouvoir activer plus tard 7.3 (type de décision en 4e étape) ou 7.4 (disponibilité des données en 5e étape) sans réécrire le stepper, seulement en ajoutant une entrée dans la liste. Consigné dans la colonne *Évolution* du 7.2 et dans ses points d'ancrage code.

### File d'attente après 7.6 — ordre à trancher en fin de chantier 7.6

1. **6.7b — Enrichissement `familleInformelle`** (🟢). À activer si l'usage terrain confirme qu'on s'ampute de bonnes suggestions en excluant `generique` du calcul de voisinage.
2. **6.7c — Cas particulier `generique`, bloc dédié** (🟡). Inversion éditoriale : *« Ces cadres spécifiques éclairent les mêmes indicateurs »*. Petit chantier cohérent à empiler sur 6.7a.
3. **7.2 — Stepper générique extensible** (🟡). Chantier structurant, à coupler avec la symétrisation des portes *problème* et *niveau*.

### Pistes alternatives si Lætitia préfère pivoter avant 7.6

- **Piste B — Greffe architecturale** (🟡) : migrer `NIVEAU_VERS_POSITION` et `FIABILITE_VERS_NIVEAU` vers `CM.Config` (Règle 2). Session courte, ~45 min.
- **Piste C — Scission `lean` en `lean` + `six-sigma`** (🟢) : chantier reporté lors de 6.7 ; demande une revue des `META.cadres` sur une trentaine de fiches.
- **Piste E — Revue métier d'un axe non audité** (🟢). Fiches Qualité, Humain, Risque, Sécurité, Données, Produit jamais systématiquement passées au standard 2026-04.
