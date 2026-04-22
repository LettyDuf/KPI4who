# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **22 avril 2026 — fin après-midi** (nettoyage de la dérive 7.8 : doublon du chantier 10 absorbé, points d'ancrage code transférés, trace historique préservée via `git log`).

---

## État courant (reprise rapide)

*Bloc lu en premier à chaque reprise de session. Mis à jour comme dernière action avant de fermer la conversation. Doit tenir en ~10 lignes.*

- **Événement majeur de la session** : clarification de mission du 22/04/2026 après-midi. Document de référence posé en [`MISSION.md`](./MISSION.md) (commit `d3bfaf9`) — cinq prises de conscience, posture socratique, charpente à 4 onglets complémentaires, livrable central = impression pour discussion. Trois chantiers ouverts en conséquence : **9** (vue panier personnel, refonte de *Mon tableau de bord*), **10** (bandeau de navigation persistant), **11** (refonte future de Cascade stratégique, en pause). Correctif rapide livré en passant : fix accès *Maturité & Recommandations* (typo `'maturité'` → `'maturite'` dans l'onclick) en commit `b08118e`. Nettoyage complémentaire en fin de journée : **dérive 7.8 absorbée** dans le chantier 10 (doublon ouvert le matin avant la clarification ; points d'ancrage code transférés, trace historique via `git log`).
- **Chantier actif — à arbitrer à la reprise** : deux options. **Option A** — poursuivre 7.2a-code.3 étape D (câblage tuile porte niveau), qui était le chantier actif avant la clarification. **Option B** — basculer sur le chantier 9 (panier), qui traduit directement la mission consignée. La mission ne rend pas D caduc, mais elle rend 9 plus central. Décision à prendre avec Lætitia.
- **Dernier SHA sur `main`** : `ad70988` — *docs(backlog): absorbe la dérive 7.8 dans le chantier 10*. Commits de la journée du 22/04 : `d3bfaf9` (MISSION.md), `b08118e` (fix Maturité), `4a1bd86` (chantier 9), `d133422` (chantiers 10 et 11), `06902d2` (État courant post-mission), `ad70988` (clean-up 7.8).
- **Rappel 7.2a-code.3 (si reprise en option A)** : étapes A/B.1/B.2/B.3/C.1/C.1-tests/C.2/C.3 livrées, reste D — câbler la tuile d'accueil « Par mon niveau » pour ouvrir la porte via `CM.VuePorteNiveau.demarrer()`. Commits C.3 : `fef6280` (feat) + `7d16cd7` (test harnais).
- **Fiches mémoire pertinentes** : `project_porte_niveau_roles`, `project_porte_niveau_doctrine_editoriale`, `project_7_2a_code_2_livre`, `project_document_compagnon_contrats`, `project_deux_systemes_canons_niveaux`. Pour le chantier 9 et au-delà : `MISSION.md` à la racine du projet devient la boussole de référence.
- **Blocages / questions ouvertes** : aucun bloquant technique. Arbitrage D vs 9 à trancher. Les questions résiduelles du chantier 9 (format d'impression, interaction d'ajout, persistance) seront traitées à son démarrage, pas avant.

---

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
| Audit WCAG AA des couleurs d'axes Mintzberg (cran 3 Doux) sur la porte niveau | 🟢 | À conduire **après livraison 7.2a-code.3**. Mesurer le contraste réel des quatre tokens `--axe-humaine:#5d7fa6`, `--axe-projet:#4f7e74`, `--axe-methodologique:#7d6b96`, `--axe-strategique:#917a55` sur le fond de cartouche, en corps de texte et en italique (`.role-qualificatif`). La doctrine actée le 21/04/2026 annonçait « limite AA » sans vérification formalisée — à instrumenter avec un contrast-checker avant mise en production durable. Ajuster les tokens d'un cran plus foncé si AA raté ; re-valider sur le preview `preview-porte-niveau-texte-tons-clairs.html`. ~30 min. |

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
| Factoriser `_htmlFamille` en `CM.Composants.htmlFamilleAccordeon(famille, idFacade)` | ☐ 🟢 | Piste identifiée pendant C.2 du chantier 7.2a-code.3 (commit `528f929`) : `CM.VuePorteNiveau._etapeCadre` duplique localement `_htmlFamille` de `CM.VuePorteCadre` pour pouvoir router les `onclick` vers `CM.VuePorteNiveau.setCadre` au lieu de `CM.VuePorteCadre.setCadre`. Refactor : extraire un helper `CM.Composants.htmlFamilleAccordeon(famille, idFacade)` paramétré par le nom de la façade appelante, et faire appeler ce helper depuis les deux vues. Déclencheur opportuniste : la prochaine retouche de l'une ou l'autre porte sur l'accordéon de familles. Tests de non-régression déjà prêts dans `tests-porte-niveau.html` (Suite 6) — ré-exécuter après refactor. |

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
| Recalage section `CM.Stepper` du document compagnon `doc-contrats-stepper-roles.md` | Dérive identifiée le 22/04/2026 en rédigeant 7.2a-code.3 étape A : la section décrit la config du stepper avec les champs `titre` / `aide` / `valider`, alors que l'implémentation réellement livrée en 7.2a-code.2 utilise `cle` / `defaut` / `valeur` / `rendreOptions` / `libelleResultats` / `idFacade` / `ids.*`. La section `CM.VuePorteNiveau` (commit `0e08f37`) utilise déjà les noms réels, donc la section 3 est la seule à recaler. Commit séparé `docs(7.2a-code): recaler la section CM.Stepper sur le code livré`, ~30 min, pur recalage documentaire, aucun code applicatif touché. | ⚪ 🟡 |

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
| 7.2a-inventaire | **Inventaire éditorial des rôles par niveau (prérequis de la phase code)** | 🟡 | *Ouvert le 21/04/2026 après l'arbitrage D2 du mockup-preview, **clos le 21/04/2026 soir**. Quatre niveaux livrés : Opérationnel (`cfa5b68`, 13 rôles), Tactique (`6dd1d30`, 14 rôles — recalé par `ae3233c`), Portefeuille (`fcd8a84`, 13 rôles), Exécutif (`5ab22b8`, 13 rôles). Total : 53 fiches.* Référentiel éditorial livré, source de vérité pour `CM.Roles` en 7.2a-code. Décisions actées : **D2** (quatre axes humaine / projet / méthodologique / stratégique, cumulables), **N1** (double-libellé), **R2** (rôle répété avec qualificatif si à cheval), **C2** (clic sur rôle), **α** (un seul champ *descriptif orthodoxe* par rôle — le champ *dérive du marché* est abandonné ; renverse la décision ρ1 prise plus tôt le 21/04/2026, voir `project_porte_niveau_doctrine_editoriale.md`). Règles éditoriales : pas de mot *senior*, PO reformulé par périmètre de produit. Panel consolidé : SAFe®, Scrum Guide 2020, Lean Six Sigma (Yellow/Green/Black/Master Black Belt + Champion + Sponsor), Cagan *Inspired* et *Empowered*, PMBOK / PMI, PRINCE2, TOGAF / Zachman / IASA, Business Agility Institute (Harbott, Sahota, Burrows), Drucker / Mintzberg / Jaques / Chandler / Collins, Kotler, Ulrich, DAMA DMBOK, NIST + ISO 27001, Goldsmith + Kets de Vries + ICF, MIT Sloan *CTO Handbook*, Gartner CIO Agenda, fonction publique québécoise et fédérale canadienne (classes 1 à 4 / EX-01 à EX-05 + sous-ministre en titre), écosystème coopératif et parapublic QC. Voir `project_porte_niveau_roles.md` et `project_porte_niveau_arbitrages_roles.md`. | ✅ |
| 7.2a-code | **Stepper générique + porte niveau en accordéon à 4 cartouches (architecture)** | 🟡 | *Scindé de l'ex-7.2 le 21/04/2026 après-midi. Re-scindé en trois sous-chantiers le 21/04/2026 soir pour garder des livrables auditables.* Volet **architecture**. Extraire un `CM.Stepper` générique qui accepte un tableau ordonné d'étapes (nombre variable, 3/4/5+ — exigence d'extensibilité validée le 20/04/2026 pour accueillir 7.3 et 7.4 sans réécriture). Porte *niveau* rejoint le parcours guidé avec ordre **niveau → problème → cadre → résultats** ; étape 1 sous forme d'accordéon à 4 cartouches (Opérationnel / Tactique / Portefeuille / Exécutif — libellés de surface, `META.niveau` interne inchangé). Chaque cartouche consomme `CM.Roles` (construit en 7.2a-inventaire). Clic sur le rôle = validation étape 1, état `{ niveau, role }` capturé. Prérequis : 7.2a-inventaire livré. | ⏳ |
| 7.2a-code.1 | **Module `CM.Roles` + générateur de données depuis l'inventaire** | 🟡 | *Livré le 21/04/2026 soir. Trois commits atomiques.* Ids stables posés sur les 53 fiches de l'inventaire (`0c0a7fe`). Module `CM.Roles` injecté dans `cadre-indicateurs.html` avec API de lecture seule (`tousLesRoles`, `parNiveau`, `parId`, `niveauxCanoniques`, `libelleDeSurface`, `axesValides`), fiches figées via `Object.freeze`, validation non-bloquante via `console.warn`. Générateur `tools/generer-roles.js` zéro-dépendance qui parse l'inventaire markdown et réécrit la zone balisée `CM._rolesData` (`f1612cd`). Document compagnon `doc-contrats-stepper-roles.md` qui fixe par écrit les contrats d'API `CM.Roles` et futur `CM.Stepper` pour éviter la dérive entre sous-chantiers (`c8a17a1`). | ✅ |
| 7.2a-code.2 | **Extraction `CM.Stepper` générique + refacto portes problème et cadre** | 🟡 | *Livré le 21/04/2026 nuit. Sept commits atomiques, iso-comportement strict.* Squelette `CM.Stepper` conforme au contrat compagnon (`be776d6`), délégation du bouton *↻ Recommencer* à `rendreResultats` pour préserver son inclusion dans `<div class="carte-etape">` (`6ad4809`), migration `CM.VuePorteProbleme` en façade au-dessus du stepper (`a2eba34`), primitive `remplacerChoix(indexEtape, valeur)` pour le pivot à étage constant (`6509fd0`), migration `CM.VuePorteCadre` (`b36f393`), mise à jour du contrat compagnon avec la nouvelle primitive et un tableau comparatif `setChoix / remplacerChoix / retourA` (`8346d46`), retrait du `domaine: null` redondant dans le ctx de la porte problème après audit montrant qu'il n'était pas un résidu mort (`eaa514c`). Les deux portes existantes (problème, cadre) ne portent plus que leur taxonomie propre et leur rédactionnel — le stepper est le seul responsable de l'état, navigation, scroll et rendu de la barre d'étapes. Nombre d'étapes variable respecté (prêt pour 7.3 et 7.4). | ✅ |
| 7.2a-code.3 | **Nouvelle porte niveau `CM.VuePorteNiveau` (accordéon 4 cartouches)** | 🟡 | Construire la vue qui consomme `CM.Roles` (.1) et `CM.Stepper` (.2). Accordéon à 4 cartouches (Opérationnel / Tactique / Portefeuille / Exécutif), toutes fermées à l'arrivée ; clic sur un rôle valide l'étape 1 avec `{ niveau, role }`. Parcours ensuite : niveau → problème → cadre → résultats. Mockup-preview obligatoire avant tranche UX finale. Prérequis : 7.2a-code.1 livré, 7.2a-code.2 livré. **Avancement** — étape A (contrat) livrée `0e08f37` ; B.1 (coquille DOM + CSS) `238d679` ; B.2 (squelette + stubs) `098bb33` ; B.3 (_etapeRole accordéon 4 cartouches + CSS cran 3 Doux) `215e9d6` ; **C.1 (_etapeProbleme filtré par niveau dérivé) `3e3f105`**. Reste : C.2 _etapeCadre, C.3 _etapeResultats, D câblage tuile d'accueil. | ⏳ |
| 7.2b | **Porte niveau — passe rédactionnelle de retour terrain** | 🟢 | *Scindé de l'ex-7.2 le 21/04/2026 après-midi, allégé le 21/04/2026 après arbitrage D2.* Volet **finition éditoriale post-livraison**. Après quelques semaines d'usage, passe de révision sur les rôles : ajouts manquants remontés par les utilisateurs, ajustements d'axes (un rôle mal classé), précisions de descriptifs. Prérequis : 7.2a-code livré et soumis à l'usage. | ⏸ |
| 7.3 | **Type de décision en 4e étape (mode expert)** | 🟢 | priorisation / investissement / arrêt d'initiative / amélioration continue. Vient directement du brief projet. Une métrique de diagnostic (MTTR, Change Failure Rate) ne sert pas la même décision qu'une métrique de priorisation stratégique (ROI, part de marché). Encodage sur les fiches : nouveau champ `META.decisions = [...]`. | ⏸ |
| 7.4 | **Disponibilité des données en 5e étape (mode expert)** | 🟢 | mesurable aujourd'hui / à instrumenter / absente. Filtre pragmatique pour éviter les recommandations impossibles à alimenter faute d'instrumentation. Allonge le parcours — à réserver au mode expert. | ⏸ |
| 7.5 | **Test A/B boîte modale vs panneau latéral pour les fiches** | 🟢 | Toggle persistant dans `CM.Preferences` (clé `cm-mode-fiche`, valeurs `panneau` / `modale`). Les deux implémentations coexistent le temps du test. Dette accessibilité à anticiper côté modale : focus trap, Escape, aria-modal, retour au scroll. | ⏸ |
| 7.6 | **Liens cliquables vers les métriques recommandées dans le panneau** | 🟡 | Rendre cliquables les noms de métriques dans les encarts « Alternative recommandée » (et plus largement les références croisées entre fiches). Ouvre la fiche cible sans retour à la liste. Haute valeur d'usage, faible coût, haute cohérence interne. | ✅ 20/04/2026 (`3afe40e`, `1d77ab4`) |
| 7.7 | **Persistance et partage des parcours en cours** | 🟢 | Aujourd'hui, F5 ramène à l'accueil et efface le parcours en cours sur les trois portes. Deux pistes : (a) mémoriser automatiquement l'étape et les choix dans le stockage local du navigateur, (b) encoder le parcours dans l'URL (`#porte=cadre&cadre=dora&niveau=programme`) pour permettre le partage à un collègue. La deuxième piste est la plus intéressante stratégiquement — elle transforme chaque parcours en objet partageable. Identifié lors de l'audit d'uniformité du 21/04/2026. | ⏸ |

### 7.a Points d'ancrage code

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| 7.1 Filtres cadre + maturité | Barre de filtres existante + nouveau module `CM.FiltresGlobaux` | Nouveau select « ma maturité d'équipe » persistant dans `CM.Preferences`. Filtrage appliqué dans `CM.Referentiel.filtrerParContexte` (point d'entrée unique déjà existant). |
| 7.2a Stepper générique + porte niveau | Nouveau module `CM.Stepper` (port hexagonal, ne connaît pas le métier des étapes) ; refonte `CM.VuePorteProbleme` et `CM.VuePorteCadre` pour consommer le stepper générique ; nouveau module `CM.VuePorteNiveau` qui remplace la pyramide-accueil + 4 onglets ; nouveau module `CM.Roles` pour le mapping rôle → niveau en dur ; accordéon réutilisable ou inspiré de celui de la porte cadre | `CM.Stepper` orchestre navigation, état, scroll, retour ; chaque étape fournit son schéma de question, rendu, règle de validation. Libellés de surface Opérationnel/Tactique/Portefeuille/Exécutif en vue ; `META.niveau` canonique inchangé dans le code (équipe/programme/portefeuille/entreprise). État étape 1 : `{ niveau, role }` — le niveau dérive du rôle cliqué. `CM.Roles` porte pour chaque rôle : titre, axes (D2), source, descriptif orthodoxe — pas de champ *dérive du marché* (décision α), pas de tooltip associé. Contrat de cohérence respecté : taxonomies propres à chaque porte préservées, seule la mécanique est factorisée. |
| 7.2b Rôles — passe rédactionnelle | `CM.Roles` enrichi (descriptifs travaillés, axes de responsabilité selon grille D, rôles à cheval avec qualificatif), éventuelle mémoire de doctrine éditoriale | Inventaire exhaustif ; arbitrages R2 documentés ; panel d'experts activé pour chaque rôle ambigu. |
| 7.3 Type de décision | Ajout champ `META.decisions` sur toutes les fiches + nouveau filtre dans le stepper | Encodage progressif : commencer par les fiches les plus récentes (standard 2026-04). |
| 7.4 Disponibilité données | Choix utilisateur stocké en `CM.Preferences`, aucun champ à ajouter aux fiches | Filtre côté UI uniquement (« je n'ai pas les données → écarter les fiches qui supposent une instrumentation non triviale »). Le critère de « non-trivialité » reste à définir. |
| 7.5 A/B modale / panneau | Nouveau module `CM.PanneauFiche` (API commune) avec deux implémentations : `CM.PanneauLateral` (actuel) et `CM.PanneauModal` (nouveau) | Abstraction à introduire **avant** de coder la modale, sinon on duplique la logique. Port hexagonal : `PanneauFiche.ouvrir(ind)` / `.fermer()`. |
| 7.6 Liens cliquables | `CM.Composants.rendreAlternative` (et éventuellement `rendreVigilance`) dans `rendreFicheHtml` | Remplacer la concaténation de texte par un `<a data-ind-id="...">` avec un handler qui appelle `CM.App.ouvrirFiche(id)`. Dépend de `CM.Html.escape()` (règle 1 du refactoring). |
| 7.7 Persistance / partage parcours | Extension de `CM.Preferences` (piste a) et/ou nouveau module `CM.PorteHash` similaire à `CM.Hash` mais orienté parcours (piste b) | Piste a : sérialiser `{ porte, etape, choix }` dans localStorage, restaurer au boot. Piste b : encoder `porte=cadre&cadre=dora&niveau=programme` dans l'URL, lecture au boot par un parseur dédié, mise à jour de l'URL à chaque changement d'étape via `history.replaceState`. Prudence XSS sur piste b : valider chaque champ contre sa whitelist (mêmes regex strictes que `CM.Hash`). |

---

## 8. Audit d'uniformité des portes — 21 avril 2026

Audit complet livré dans [`AUDIT-UNIFORMITE-PORTES.md`](./AUDIT-UNIFORMITE-PORTES.md). Contrat de cohérence consigné en mémoire (`project_contrat_coherence_portes.md`) pour être lu au démarrage du chantier 7.2.

**Bilan.** Les portes *problème* et *cadre* partagent déjà 95 % de leur mécanique (duplication saine, terrain propre pour 7.2). La porte *niveau* est structurellement différente (pyramide + 4 onglets, pas de stepper) — décision produit à trancher au démarrage du 7.2 : la faire rejoindre le parcours guidé ou préserver sa forme actuelle. Trois divergences voulues confirmées (taxonomies de première étape, blocs transversaux propres, format des résultats). Trois divergences accidentelles recensées, listées ci-dessous.

| # | Micro-fix | Priorité | Effort | État |
|---|---|---|---|---|
| AUDIT-F-1 | Ajouter l'appel à `CM.Config.conseilPedagogiquePour({ cadre, niveau })` dans `CM.VuePorteCadre._etapeResultats`, en miroir de ce que fait déjà la porte problème. Alignement éditorial. | 🟡 | ~30 min, une dizaine de lignes | ⏸ |
| AUDIT-F-2 | Absorbé par le chantier **7.1** : étendre le filtre maturité aux deux portes stepper, ou documenter qu'il reste spécifique à la vue *Maturité* de la pyramide. | 🟢 | à traiter dans 7.1 | ⏸ |
| AUDIT-F-3 | Absorbé par le nouvel item **7.7** : persistance et partage des parcours. | 🟢 | à traiter dans 7.7 | ⏸ |

---

## 9. Vue panier personnel — nouvelle mission de *Mon tableau de bord*

**Origine.** Clarification de mission du 22/04/2026, consignée dans [`MISSION.md`](./MISSION.md). Le chantier traduit les décisions de cette session en éléments d'implémentation.

**Mission du chantier.** Transformer l'onglet *Mon tableau de bord* en panier personnel qui matérialise l'écart entre *« ce que je mesure déjà »* et *« ce que j'envisage de mesurer »*. Livrable final : une impression que la personne emporte pour discuter son scorecard avec ses collaborateurs.

**Décisions fermes (actées).**

- **Un seul panier actif à la fois.** Pas de multi-panier en v1. Un bouton *réinitialiser* suffit pour repartir d'une feuille blanche.
- **Deux statuts par indicateur** : *en place* et *à envisager*. Pas d'état *« à retirer »* en v1 — la suppression se fait simplement en retirant l'indicateur du panier.
- **Saisie du panier par le référentiel (Chemin A).** L'utilisateur parcourt les fiches de l'outil et les marque *« en place »* ou *« à envisager »*. Pas de saisie libre d'indicateurs *« maison »*. Cela aligne l'utilisateur sur le vocabulaire de l'outil.
- **Recherche globale avec 1-2 filtres contextuels optionnels.** Permet de retrouver rapidement une fiche par son nom.
- **Vue imprimable : one-pager A4 minimaliste.** *Arbitrée le 22/04/2026 après mockup-preview côte à côte ([`preview-panier-impression.html`](./preview-panier-impression.html), commit `494a4b9`).* Une seule page qu'on tend en réunion : tableau *en place* + tableau *à envisager*, pastille fiabilité, chip niveau, bandeau terrain, trois questions à poser à l'équipe. Outil de conversation, pas document autonome. Rendu volontairement dense pour tenir sur une page sans respirer mal.
- **Sortie canonique : impression + export PDF du même rendu.** Le PDF est une copie fidèle du one-pager imprimable, pas une transposition vers un autre format. Il sert la personne qui ne peut pas imprimer physiquement ou qui veut envoyer le scorecard à un collègue. Pas d'export vers Excel, Word ou un format tiers — l'outil garde la main sur la forme parce que la forme sert la lisibilité, et la lisibilité sert la conversation.

**Questions résiduelles à trancher au démarrage.**

- Interaction d'ajout au panier : poignée *« ajouter »* sur la fiche du tiroir, ou case à cocher sur la liste, ou les deux ?
- Persistance : localStorage dans le navigateur (simple mais lié à la machine) ou rien (le panier vit le temps de la session) ? La persistance locale semble raisonnable en v1.

**Articulations.** La mission de cet onglet, telle qu'elle est posée dans `MISSION.md`, est *voir ce qui est présent dans ma réalité actuelle et ce que je devrais mesurer sans le mesurer*. Il devient le *miroir* de l'utilisateur. Il ne remplace pas la pyramide — il capitalise dessus : la pyramide sert désormais à explorer le référentiel pour y puiser, le panier est la sélection retenue.

**Pistes futures (nice-to-have, hors v1).**

- **Liens cliquables dans le PDF exporté.** Rendre chaque nom d'indicateur du PDF ouvrable d'un clic pour revenir sur la fiche correspondante dans l'outil en ligne. *Pas prioritaire en v1* : la barre de recherche globale du panier permet déjà de retrouver une fiche par son nom, ce qui couvre 90% du besoin. À rouvrir si un retour terrain montre que la friction de la recherche est un frein réel à la conversation. *Consigné le 22/04/2026 suite à l'arbitrage de la question 1.*

---

## 10. Bandeau de navigation persistant

**Origine.** Demande émise par Lætitia le 22/04/2026 au cours de la clarification de mission. Aujourd'hui, les 4 onglets (*Mon tableau de bord · Cascade · Choisir · Maturité*) ne sont visibles qu'**après** avoir quitté l'accueil (pyramide ou 4 portes). Sur les deux accueils, il n'y a aucun bandeau global : pas de point d'accès persistant au lexique, à l'À propos, ni aux autres onglets.

*Formulation initiale en 7.8 (matin du 22/04), absorbée ici l'après-midi après la clarification de mission : les trois manques listés alors — absence de pontage entre portes, retour difficile au tableau de bord, deux accueils qui se masquent — sont tous adressés par le bandeau persistant + l'unification de l'expérience posée dans `MISSION.md`. 7.8 retiré du backlog ; trace historique préservée via `git log` (commit `286763a`).*

**Mission du chantier.** Créer un bandeau de navigation **présent sur toutes les pages** de l'outil — accueils compris — qui donne un accès stable et prévisible aux fonctionnalités centrales.

**Contenu proposé (à valider au démarrage).**

Accueil · Mon tableau de bord · Choisir mes indicateurs · Maturité & Recommandations · Lexique · À propos.

Six entrées. *Cascade stratégique* n'apparaît pas dans cette v1, conformément à sa mise en pause (voir chantier 11). L'ordre reflète le fil narratif naturel de la charpente consignée dans `MISSION.md`, sans imposer ce fil — l'utilisateur reste libre d'entrer par n'importe quel onglet.

**Prérequis.** Chantier conditionné à l'appropriation de `MISSION.md`. Pas de dessin du bandeau tant que la mission n'est pas stabilisée — sinon on fige la charpente sur la structure actuelle.

**Questions à trancher au démarrage.**

- Remplace-t-il complètement la barre d'onglets actuelle (celle qui apparaît dans l'app après l'accueil), ou s'y superpose-t-il ?
- Comportement responsive : bandeau horizontal unique, ou bandeau repliable sur petit écran ?
- L'onglet actif doit-il être visuellement marqué dans le bandeau (feedback de position), et si oui avec quel traitement ?

**Articulations.** Ce chantier dialogue directement avec le chantier 9 (panier) : le bandeau est ce qui permet à l'utilisateur de naviguer entre *son panier* et *les lentilles pour l'enrichir* sans se perdre. Il est aussi conditionné au chantier 11 (refonte Cascade) : si Cascade revient dans une v2 avec une nouvelle mission, le bandeau devra l'accueillir.

**Points d'ancrage code (à recaler au démarrage).** En-tête des trois portes (lignes approximatives ~2134, ~2164, ~2199 dans `cadre-indicateurs.html`), en-tête de `#app` (~2227), bascule accueil `CM.App.basculerAccueil` / `afficherAccueil` (~6848 à ~6860), pieds des deux accueils (~1977 et ~2121). Topologie à repenser : trois portes + app-onglets + deux accueils = 5 vues distinctes où l'utilisateur peut se perdre. Questions connexes à trancher avec le bandeau : garder ou fusionner les deux accueils (pyramide `#accueil` vs 4 portes `#accueil-portes`) ; comportement du contrat de cohérence inter-portes (le bandeau doit rester identique sur toutes les vues, pas de divergence voulue ici).

---

## 11. Refonte *Cascade stratégique*

**Origine.** Clarification de mission du 22/04/2026. Lætitia a exprimé ne plus comprendre la mission de cet onglet dans le cadre posé.

**Statut actuel.** Onglet en pause. Il n'est plus exposé dans la navigation principale (cf. chantier 10). Le code reste en place et la vue reste techniquement accessible, mais elle ne fait plus partie du parcours utilisateur v1.

**Pourquoi la pause.** Dans sa forme actuelle, la vue empile les 4 niveaux avec leurs indicateurs en petites puces. C'est une cartographie dense qui fait doublon avec la pyramide, en version plus théorique. Aucune des cinq prises de conscience consignées dans `MISSION.md` ne la sert clairement.

**Option de refonte à explorer plus tard.** Donner à la vue une mission alignée avec la charpente — par exemple *« voir comment les indicateurs à mon niveau s'articulent avec ceux du niveau au-dessus et du niveau en-dessous »*. Cela servirait directement le principe Druckerien d'alignement vertical des objectifs (MBO) et la logique OKR de cascade. Mais il faut d'abord vérifier, à l'usage des autres onglets, qu'une telle vue manque réellement — plutôt que de la réinventer par inertie.

**Critère de réouverture.** Ce chantier ne s'engage que si un besoin utilisateur récurrent fait émerger le manque — pas par volonté de préserver l'existant.

---

## Prochaine action recommandée

Chantier **7.2a-code.3 en cours** (⏳). Commits livrés à la date du 22/04/2026 : A `0e08f37` (contrat d'API compagnon) · B.1 `238d679` (coquille DOM + CSS scope `#vue-porte-niveau`) · B.2 `098bb33` (squelette module + façade + stubs) · B.3 `215e9d6` (_etapeRole accordéon 4 cartouches + CSS cran 3 Doux pour axes Mintzberg) · **C.1 `3e3f105`** (_etapeProbleme filtré par niveau dérivé du rôle, introduit la table locale `ROLE_NIVEAU_VERS_DIAG` qui traduit les canons `CM.Roles` vers les canons historiques de `CM.DiagnosticProbleme`) · **C.1-tests `d4fed38`** (harnais `tests-porte-niveau.html`, 70 assertions vertes : 4 sanity + 4 doctrine N1 + 55 filtrage par rôle + 4 posture avec libellé de surface + 3 cas défensifs ; zéro intrusion dans le code de prod, adapter driver sur l'API publique). Invariant de dérivation respecté : le niveau n'est jamais un choix utilisateur dans la porte niveau, c'est une projection du rôle.

**Prochain commit : C.2 — `_etapeCadre(roleId, problemeId)`** — grille des cadres méthodologiques, filtrée par le couple (niveau dérivé × problème choisi). Iso-pattern avec `CM.VuePorteCadre` pour la grille en accordéon par famille d'école de pensée, mais décision éditoriale à trancher : affiche-t-on *toutes* les familles dès l'étape 3 (comme la porte cadre), ou ne montre-t-on que les cadres cohérents avec le couple (niveau × problème) déjà validé ? À arbitrer au démarrage de C.2.

**Puis C.3 — `_etapeResultats(roleId, problemeId, cadreId)`** — agrégation des recommandations, conseil pédagogique, zone de délégation le cas échéant. Enfin **D** — câblage de la tuile d'accueil (remplace la vue pyramide côté 4 portes).

### Historique — chantier 7.6 (réf. ci-dessous)

Chantier **7.6 livré** le 20/04/2026 (socle technique + 4 fiches de démonstration). Les noms de métriques cités dans les encarts *Alternative recommandée* et *Point de vigilance* sont cliquables : clic simple = ouverture dans le tiroir latéral, Cmd/Ctrl+clic = nouvel onglet (web-native). Deep linking activé via `CM.Hash` (port hexagonal). Commits socle : `3afe40e` (code + module) et `1d77ab4` (CSS + enrichissements éditoriaux).

Généralisation à l'ensemble du référentiel **achevée** le 21/04/2026. Les quatre lots sont livrés : **Lot A** (`422b0a3`), **Lot B** (`9846600`), **Lot C** (`31019e3`), **Lot D** (`fc17a60`). Total : 33 liens posés sur 25 champs éditoriaux, couvrant les axes Flux/DORA/livraison, Customer/Commerce, Support client/Qualité, Sécurité/Incident. Chantier 7.6 clos.

**Sécurité posée** (3 règles non-négociables documentées en tête du module `CM.Hash`) : regex stricte sur l'id, aucun réinjection dans le DOM, `rel="noopener noreferrer"` sur tout `target="_blank"` futur.

**Instruction à porter dans 7.2 quand il sera ouvert** (validée le 20/04/2026) : le futur `CM.Stepper` générique devra accepter **un nombre variable d'étapes** (tableau ordonné). But : pouvoir activer plus tard 7.3 (type de décision en 4e étape) ou 7.4 (disponibilité des données en 5e étape) sans réécrire le stepper, seulement en ajoutant une entrée dans la liste. Consigné dans la colonne *Évolution* du 7.2 et dans ses points d'ancrage code.

### Généralisation 7.6 — progression par lots éditoriaux

La généralisation de 7.6 (liens cliquables sur toutes les fiches) est découpée en lots thématiques de manière à préserver le contrôle éditorial à chaque palier. Inventaire initial : 20 paires (fiche, champ) × ~31 liens candidats, regroupés en 4 lots.

| Lot | Axe | Liens posés | État | Commit |
|---|---|---|---|---|
| A | Flux / DORA / livraison (cohérences internes o/x/p/t) | 17 liens sur 9 champs de 6 fiches | ✅ 21/04/2026 | `422b0a3` |
| B | Customer / Commerce (af-* entre elles) | 9 liens sur 9 champs de 6 fiches | ✅ 21/04/2026 | `9846600` |
| C | Support client / Qualité | 4 liens sur 4 champs de 3 fiches | ✅ 21/04/2026 | `31019e3` |
| D | Sécurité / Incident (arbitrage `s9.alt → MTTR` tranché vers ti-s2) | 3 liens sur 3 champs de 3 fiches | ✅ 21/04/2026 | `fc17a60` |

**Lot A livré** : 9 champs enrichis sur x1, x2, x3, p5, p7, t4 ; 17 liens vers o3, o4, o5, o6, o7, o8, o9, p4, p5, p6, s4. Une reformulation éditoriale ciblée sur `p5.alt` pour lever l'ambiguïté *OKR stratégique vs OKR d'équipe* — désormais les deux cibles sont nommées et liées, ce qui ferme l'anti-pattern du programme qui s'invente un OKR local déconnecté.

**Lot B livré** (21/04/2026, commit `9846600`) : 9 champs enrichis sur af-m1, af-m3, af-sc2, af-sc3, af-sc4, af-sc5 ; 9 liens vers af-c2 (×2), af-c3, af-sc1 (×3), af-sc3 (×2), af-sc4. Aucune reformulation éditoriale. **Deux patrons nouveaux actés avec Lætitia** : (a) extension aux champs `exemple_eq` / `exemple_ent` (pas uniquement `alt` / `risque`), (b) cibles non-révisées au standard 2026-04 autorisées — 7.6 ne contraint que la cohérence de la source. **Imbrication term-def** (3 liens af-sc5 vers af-sc3 / af-sc4) : `<a>` placé autour du `<span class="term-def">`, le clic ouvre la fiche, le survol garde le tooltip — à vérifier à l'œil lors du prochain audit visuel. **Arbitrages refusés** : `af-c2.alt → af-c1` (texte « par étape » vs fiche globale, lien fictif dans l'esprit Lot A `t4.alt → x1`) ; `af-m3.alt → af-c3` (même logique « LTV par canal » vs LTV globale).

**Lot C livré** (21/04/2026, commit `31019e3`) : 4 champs enrichis sur 3 fiches (`ti-o2`, `ti-o4`, `o4`) ; 4 liens vers af-sc1, af-sc4, o4, ti-o4. **Deux croisements TI ↔ Affaires** (`ti-o2.exemple_eq → af-sc4` sur « FCR », `ti-o2.risque → af-sc1` sur « satisfaction ») et **deux cohérences internes TI** (`ti-o4.exemple_eq → o4` sur « rapidite », `o4.risque → ti-o4` sur « analyse post-incident »). **Ajustement éditorial vs backlog** : le backlog annonçait `ti-o2.risque ↔ af-sc4`, mais la lecture fine a montré que le mot-cible dans `ti-o2.risque` est « satisfaction » (= af-sc1) ; le lien vers af-sc4 a été reporté dans `ti-o2.exemple_eq` sur le mot « FCR », qui matérialise plus clairement le croisement TI ↔ Affaires sur la même métrique. Même logique de reformulation contextuelle que Lot A (`p5.alt`). Pas de reformulation éditoriale, pas d'imbrication term-def à gérer sur ce lot.

**Lot D livré** (21/04/2026, commit `fc17a60`) : 3 champs enrichis sur 3 fiches (`s9`, `ti-s2`, `ti-s5`) ; 3 liens vers ti-s2, ti-o4, s9. **Arbitrage MTTR tranché** — `s9.alt → ti-s2` (MTTR Sécurité), pas `o4` (MTTR DORA générique). Le texte de s9 dit littéralement *« MTTR sécurité »* (mot-clé collé au domaine), la fiche spécialisée l'emporte. **Règle doctrinale consolidée** — *quand deux MTTR (ou deux FCR, ou deux métriques du même nom) coexistent, le lien va vers le plus spécifique du domaine* ; même logique que le Lot C pour les deux FCR. **Trois niveaux hiérarchiques croisés** : stratégique → opérationnel (`s9.alt → ti-s2`), opérationnel → opérationnel (`ti-s2.risque → ti-o4` sur « cause profonde », qui boucle avec le Lot C `o4 ↔ ti-o4`), opérationnel → stratégique (`ti-s5.risque → s9` sur « efficacité réelle de la sécurité » qui ferme l'anti-pattern Goodhart *cocher la conformité et se croire sûr*). **Ajustement vs backlog** : ~2 candidats annoncés, 3 liens posés — le lien `ti-s5.risque → s9` s'est imposé à la lecture comme leçon pédagogique trop forte pour être ratée. Panel mobilisé pour l'arbitrage : NIST SP 800-61 (Incident Response), ITIL Security Management, DORA/Forsgren, Taleb (garde-fou cygne noir cyber).

### Chantier 7.6 clos — bilan

Sur les quatre lots, 33 liens ont été posés sur 25 champs éditoriaux de 18 fiches, couvrant les quatre grands axes fonctionnels (Flux/DORA/livraison, Customer/Commerce, Support client/Qualité, Sécurité/Incident). Trois patrons doctrinaux ont émergé au fil des lots et forment désormais la grammaire interne de 7.6 : (a) *extension aux champs `exemple_eq`/`exemple_ent`* (acté Lot B), (b) *cibles non-révisées autorisées* — 7.6 ne contraint que la cohérence de la fiche source (acté Lot B), (c) *règle de spécificité* — quand deux métriques du même nom coexistent (FCR, MTTR…), le lien va vers la plus spécifique du domaine (acté Lots C et D). **Imbrication term-def** vérifiée en Lot B (af-sc5 vers af-sc3/af-sc4), pas rencontrée aux Lots C et D. **Audit visuel à conduire** lors du prochain passage terrain : lire toute fiche enrichie dans le tiroir latéral, cliquer chaque lien, vérifier que le survol des term-def imbriqués continue de déclencher le tooltip.

### Prochaine session — ordre à trancher

1. **7.2a-code.3 — Nouvelle porte niveau (`CM.VuePorteNiveau`)** (🟡). **Prérequis 7.2a-code.1 (`CM.Roles`) et 7.2a-code.2 (`CM.Stepper`) satisfaits.** Construction d'une porte qui rejoint le parcours guidé *niveau → problème → cadre → résultats*. Étape 1 en accordéon à 4 cartouches (double-libellé N1 `Opérationnel / Tactique / Portefeuille / Exécutif`), étape 2 rôle, étape 3 résultats. Taxonomie et rédactionnel propres à la porte, stepper et données rôles inchangés. Contrat d'API à respecter : `doc-contrats-stepper-roles.md`.
2. **AUDIT-F-1 — Conseil pédagogique dans la porte cadre** (🟡). Micro-fix opportuniste ressorti de l'audit du 21/04/2026. Session courte, effet éditorial direct. Intermède possible avant 7.2a-code.3, ou en parallèle.
3. **6.7b — Enrichissement `familleInformelle`** (🟢). À activer si l'usage terrain confirme qu'on s'ampute de bonnes suggestions en excluant `generique` du calcul de voisinage.
4. **6.7c — Cas particulier `generique`, bloc dédié** (🟡). Inversion éditoriale : *« Ces cadres spécifiques éclairent les mêmes indicateurs »*. Petit chantier cohérent à empiler sur 6.7a.
5. **7.7 — Persistance et partage des parcours** (🟢). Nouvel item ouvert lors de l'audit du 21/04/2026.
6. **Audit visuel 7.6** (🟢). Session courte de relecture terrain : ouvrir chaque fiche enrichie dans le tiroir, cliquer chaque lien, valider l'imbrication term-def.

### Pistes alternatives

- **Piste B — Greffe architecturale** (🟡) : migrer `NIVEAU_VERS_POSITION` et `FIABILITE_VERS_NIVEAU` vers `CM.Config` (Règle 2). Session courte, ~45 min.
- **Piste C — Scission `lean` en `lean` + `six-sigma`** (🟢) : chantier reporté lors de 6.7 ; demande une revue des `META.cadres` sur une trentaine de fiches.
- **Piste E — Revue métier d'un axe non audité** (🟢). Fiches Qualité, Humain, Risque, Sécurité, Données, Produit jamais systématiquement passées au standard 2026-04.
