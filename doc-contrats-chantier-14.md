# Chantier 14 — Refactor hexagonal du socle MVP 4 portes

*Doc compagnon. Référence vivante du chantier — se complète au fil de l'avancement.*

---

## 1. Mission

Isoler la **description des métriques** (le domaine) des **chemins d'accès** (les portes, les questions, demain d'autres lentilles). Une métrique n'appartient à aucun chemin : elle existe dans le référentiel, elle est filtrée par des requêtes que les chemins formulent.

Deux raisons d'agir :

- **Maintenabilité.** Quand un libellé, un domaine ou un anti-pattern d'une métrique change, la modification se fait au seul endroit qui décrit la métrique. Aucun chemin ne réécrit sa description.
- **Évolution.** Ajouter un nouveau cadre, une nouvelle porte, un nouveau filtre, une nouvelle lentille n'oblige plus à toucher le cœur du référentiel. On écrit une nouvelle requête, on branche une nouvelle vue.

Vulgarisation : *la bibliothèque* garde les livres sur l'étagère centrale (le domaine). Les comptoirs (les portes) savent poser des requêtes à l'étagère — « dame-moi les métriques niveau équipe Lean qui traitent des problèmes de flux ». Les vitrines (les vues) présentent ce qu'on a reçu. Aucun comptoir ne range ses propres copies des livres. Aucune vitrine ne fabrique un livre à la volée.

---

## 2. Périmètre MVP — 4 portes existantes

Le MVP du chantier 14 est **iso-comportement visible** sur les quatre portes existantes (y compris celle encore en construction) :

- *Par mon problème* (`CM.DiagnosticProbleme` + `CM.VuePorteProbleme`) — livrée.
- *Par mon cadre* (`CM.DiagnosticCadre` + `CM.VuePorteCadre`) — livrée.
- *Par mon niveau* (`CM.Roles` + `CM.VuePorteNiveau`) — en construction (7.2a-code.3).
- *Par ma maturité* — stub « Bientôt ». Ne participe pas au MVP côté livraison mais le refactor doit laisser un emplacement propre pour sa future logique.

**Hors scope.**

- Les deux modes d'entrée parallèles (chantier 10 gelé). Le catalogue de questions fines n'est pas bâti dans ce chantier, mais l'architecture doit être prête à l'accueillir comme nouveaux consommateurs du référentiel.
- Toute évolution visible pour l'utilisateur (libellés, ordonnancements, nouvelles fiches). Le chantier 14 ne change rien que l'utilisateur perçoit.

---

## 3. Architecture cible

### 3.1 Trois zones

**Zone domaine (cœur).** Indépendante de tout, ne dépend d'aucun chemin d'accès ni de l'UI.

- `CM.Referentiel` — catalogue des indicateurs (données + accès bas niveau `tous` / `parId` / `chercher`).
- `CM.IndicateursMeta` — tagging multi-axes (tags problèmes × cadres × niveaux). Socle déjà en place.
- `CM.Config` — mappings métier purs.
- *(à créer)* `CM.RequeteMetriques` — API unique que tous les chemins appellent. Signature publique : `CM.RequeteMetriques.executer(filtre)` qui renvoie une liste de fiches métriques ordonnées. **Forme canonique du `filtre` et contrat de retour : §10.3** (source unique pendant l'étape b).

**Zone chemins (adaptateurs d'entrée).** Chaque porte est un consommateur du domaine. Elle traduit la sélection utilisateur en un `filtre` à soumettre à `CM.RequeteMetriques`.

- `CM.DiagnosticProbleme` — aujourd'hui dérive elle-même ses propres métriques. Cible : devient un *traducteur* qui formule un filtre et appelle `CM.RequeteMetriques`.
- `CM.DiagnosticCadre` — même chose.
- `CM.Roles` (porte niveau) — même chose, quand la porte sera livrée.
- *(future)* `CM.DiagnosticMaturite` — s'ajoutera sans toucher le domaine.

**Zone vues (adaptateurs de sortie).** Les vues rendent les fiches reçues.

- `CM.VuePorteProbleme`, `CM.VuePorteCadre`, `CM.VuePorteNiveau` — réception des résultats, pas de logique métier.
- `CM.Composants` — rendu HTML des fiches. Déjà isolé. Aucun changement significatif attendu.

### 3.2 Flux de dépendances

```
Vues (VuePorteX) → Chemins (DiagnosticX) → RequeteMetriques → Referentiel + IndicateursMeta + Config
```

Une seule règle : les flèches ne remontent pas. Un module du cœur ne connaît jamais un module des chemins ou des vues. Un chemin ne connaît jamais une vue.

### 3.3 Panier et transverses

`CM.Panier` reste tel qu'il est. Il n'appartient ni aux chemins ni au domaine — c'est un agrégat utilisateur qui référence des métriques par leur identifiant. Aucune modification attendue par ce chantier.

`CM.App` reste l'orchestrateur : événements globaux, routing hash, délégation de clics. Le chantier peut l'alléger en extrayant des sous-modules (`CM.Router` notamment, listé en Règle 1 du refactoring progressif) — mais seulement en greffe opportuniste, pas comme objectif.

---

## 4. Plan d'attaque

Quatre étapes. Chacune peut embarquer plusieurs commits atomiques. Validation explicite de Lætitia pour basculer d'une étape à la suivante.

### Étape (a) — Inventaire du schéma d'étiquettes

*Durée estimée : 1 session. Livrable : document texte uniquement, pas de code.*

Lire l'existant dans `cadre-indicateurs.html` (ou plutôt les sources markdown du générateur, si le chantier outillage est passé par là) pour recenser, fiche par fiche, ce qu'elle porte :

- niveau (équipe / programme / portefeuille / entreprise / affaires-opérationnel)
- cadre / école (Lean, Six Sigma, DORA, Scrum, etc.)
- axe (FLUX, QUALITÉ, HUMAIN, RISQUE, FINANCE, etc.)
- type (KPI / KBI / KGI / KII / OKR / métrique DORA / indicateur Lean Six Sigma)
- domaine (DevOps, Affaires, Portefeuille, Programme, etc.)
- maturité d'usage (applicable à partir de quel stade)
- fiabilité (Fiable / Précaution / Risquée)
- problèmes adressés (tags issus de `CM.IndicateursMeta`)

Livrable : `inventaire-schema-metriques.md` qui documente **le schéma réel** tel qu'il existe dans le code (pas un idéal). C'est la vérité-terrain sur laquelle se construit l'API de `CM.RequeteMetriques`.

**Critère de clôture (a).** Lætitia a vu le schéma et a validé. Au besoin, amendements éditoriaux ou clarifications sur tel ou tel champ avant la suite.

**Tag git à la clôture.** `mvp-etape-a-schema-inventorie`.

### Étape (b) — Extraction du cœur `CM.RequeteMetriques`

*Durée estimée : 2 à 3 sessions. Livrable : code + tests.*

Créer le module `CM.RequeteMetriques` **à côté** de l'existant. Il expose `executer(filtre)` et délègue à `CM.Referentiel` + `CM.IndicateursMeta` pour composer le résultat. Les trois diagnostics existants (`CM.DiagnosticProbleme`, `CM.DiagnosticCadre`, `CM.Roles`) continuent de fonctionner sans y toucher — ils ne passent pas encore par `CM.RequeteMetriques`.

Cette étape *vit* côté code sans rien changer de visible. On vérifie par tests unitaires que `CM.RequeteMetriques.executer(filtre)` renvoie, pour un panel de filtres représentatifs, les mêmes listes que ce que produisent aujourd'hui les diagnostics pour les mêmes contextes.

**Commits atomiques attendus.**

1. Création du squelette `CM.RequeteMetriques` + structure du `filtre`.
2. Implémentation `executer` sur tous les axes documentés au §10.3, en composant `CM.Referentiel` (champs de fiche : `niveau`, `domaine`, `type`, `cadre`, `fiabiliteMin`, `maturiteMin`) et `CM.IndicateursMeta` (clauses `tags` et `tagsThematiques`).
3. Tests unitaires de `CM.RequeteMetriques` — fichier `tests-requete-metriques.html` généré via le patron Node.js existant.
4. Greffe opportuniste éventuelle (ex : extraction `CM.Config` si opportunité).

**Critère de clôture (b).** Tests unitaires verts. Aucune régression sur les scénarios de `scenario-non-regression.md` (qui n'est pas impacté, puisque les diagnostics n'ont pas changé).

**Tag git à la clôture.** `mvp-etape-b-coeur-extrait`.

### Étape (c) — Migration des portes vers `CM.RequeteMetriques`

*Durée estimée : 4 sessions (une par porte, plus marge). Livrable : code + tests de régression.*

Chaque porte migre indépendamment des autres. Sous-étape (c.N) = *porte N passe par `CM.RequeteMetriques`*.

**(c.1) Porte *Par mon problème***. Reformuler `CM.DiagnosticProbleme` : l'action de déterminer les métriques passe par un appel à `CM.RequeteMetriques.executer({niveau: ['equipe'], probleme: 'flux'})` (forme conforme à §10.3 — clauses-set toujours en array, sucre `probleme` accepté) au lieu de la dérivation locale. Scenario non-régression passé en entier avant / après. Tag `mvp-etape-c1-porte-probleme-migree`.

**(c.2) Porte *Par mon cadre***. Même chose. `CM.DiagnosticCadre.executer({niveau: ['portefeuille'], cadre: ['dora']})` (clauses-set en array, conformément à §10.3). Tag `mvp-etape-c2-porte-cadre-migree`.

**(c.3) Porte *Par mon niveau***. Même chose. Migration à faire en coordination avec 7.2a-code.3 qui est encore en cours — il peut être naturel de finir 7.2a-code.3 *après* que le cœur est posé, pour que la porte niveau naisse directement hexagonale. Tag `mvp-etape-c3-porte-niveau-migree`.

**(c.4) Porte *Par ma maturité* (emplacement).** La porte est stub, donc rien à migrer. On s'assure simplement que l'emplacement propre est prêt dans l'architecture. Pas de tag dédié — clôture de (c).

**Critère de clôture (c).** Scenario non-régression vert. Aucune régression visuelle / comportementale. Tests unitaires `CM.RequeteMetriques` toujours verts. Tests `tests-panier.html` et `tests-porte-niveau.html` toujours verts.

**Tag git à la clôture globale (c).** `mvp-etape-c-portes-migrees`.

### Étape (d) — Nettoyage et documentation finale

*Durée estimée : 1 session. Livrable : code nettoyé + doc finale.*

- Retirer le code mort des anciens chemins (s'il en reste après les migrations).
- Documenter dans ce doc compagnon l'architecture finale telle qu'elle a vraiment été livrée.
- Mettre à jour `MISSION.md` pour refléter le socle hexagonal (sans ouvrir le chantier éditorial Mission).
- Re-rafraîchir `backlog.md` et les mémoires pertinentes.

**Critère de clôture (d).** Ce doc est la source de vérité de l'architecture.

**Tag git à la clôture globale (d).** `mvp-chantier-14-livre`.

---

## 5. Procédure de versionnement et de rollback

Contrainte du chantier explicitement écrite noir sur blanc — pas juste un savoir-faire implicite.

### 5.1 Tag `baseline-avant-hexagonal`

Posé sur le commit **`5655b03`** à l'ouverture du chantier 14. C'est le **point de retour absolu** si tout échoue. `git reset --hard baseline-avant-hexagonal` ramène à l'état d'avant le chantier.

### 5.2 Tags d'étape

À chaque clôture d'étape (a, b, c.1, c.2, c.3, c, d), poser un tag git selon la nomenclature `mvp-etape-X-description`. Ces tags permettent un rollback ciblé — on revient à la fin de telle étape sans perdre les étapes antérieures.

### 5.3 Principe « pas de suppression avant validation »

Le refactor progressif dit : **le nouveau code coexiste avec l'ancien jusqu'à validation**. Concrètement :

- À l'étape (b), `CM.RequeteMetriques` est créé *à côté* de l'existant. Rien n'est supprimé.
- À chaque sous-étape (c.N), la porte N bascule. L'ancien chemin local est conservé commenté (ou juste remplacé par l'appel au nouveau — à arbitrer au cas par cas). Jamais supprimé.
- L'étape (d) est la seule qui supprime explicitement, et seulement après que toutes les étapes (c) sont validées.

Cette discipline permet à tout moment un rollback propre sans perte.

### 5.4 Vérification systématique de la sync miroir

Après chaque commit critique (fin d'étape, en particulier), **vérification obligatoire** que le commit a bien été miroité dans le `.git/` du mount. Procédure détaillée dans la mémoire `project_git_metriques.md`. En cas d'échec partiel du miroir (nouveau dir `objects/xx/` non créé), refaire manuellement la copie pour le dir concerné.

### 5.5 Trois options de rollback

**Inspection sans rollback** — `git diff <tag-étape>..HEAD` pour comprendre ce qui a changé depuis une étape donnée sans rien toucher.

**Rollback contrôlé par revert** — `git revert <commit>` crée un nouveau commit qui annule le précédent. Préserve l'historique, pas destructif. À privilégier si un seul commit pose problème.

**Rollback full** — `git reset --hard <tag>` ramène la branche au tag choisi. Destructif (perd les commits intermédiaires). À réserver aux situations où plusieurs commits sont à annuler en bloc et où on est certain de ne pas vouloir les garder.

### 5.6 Mot-clé de rollback entre nous

Convention pour faciliter le dialogue : Lætitia peut dire **« rollback à l'étape X »** et je déclenche la procédure `git reset --hard mvp-etape-X` (ou revert si plus prudent), avec explicitation écrite avant de toucher le repo. Aucun rollback n'est appliqué sans confirmation explicite de sa part.

---

## 6. Doctrine panels d'experts — convocation à la demande

Les panels d'experts nommés dans la mémoire `project_deux_modes_entree.md` (gestion du changement, coach Lean, coach Agile, terrain des autres cadres, accompagnement en management) sont convoqués **seulement quand ils ont une valeur ajoutée réelle** pour le chantier 14.

Le chantier 14 est par essence technique (isolation de couches, API unique, tests de non-régression). Il ne mobilise pas spontanément les panels éditoriaux. Mais si à une étape donnée un arbitrage touche :

- le **schéma d'étiquettes** d'une métrique (ex : « faut-il distinguer la maturité de mise en œuvre de la maturité de l'équipe ? ») → panel pertinent (Lean / Agile).
- une **règle métier** portée par une porte (ex : « faut-il cumuler les axes Mintzberg sur une recommandation cadre ? ») → panel pertinent selon le sujet.

Dans ces cas, Lætitia décide explicitement de convoquer tel ou tel panel. Pas par défaut, pas pour se rassurer.

---

## 7. Articulations avec le reste du projet

### 7.1 Chantier 10 — gelé à `5655b03`

Les décisions du chantier 10 (8 onglets, bifurcation *Par mes 4 axes* / *Par ma question*, catalogue de questions, machinerie mix) **ne sont pas annulées**. Elles sont en pause. Après livraison du MVP hexagonal (chantier 14 clos), la reprise du chantier 10 sera facilitée : la construction du mode *Par ma question* se fera comme un nouveau consommateur de `CM.RequeteMetriques`, pas comme une duplication du référentiel.

### 7.2 Chantier 7.2a-code.3 — porte niveau en cours

La porte niveau est livrée partiellement (étape 1 accordéon rôles). Deux stratégies possibles :

- **Option α** : finir 7.2a-code.3 avant d'attaquer (b), puis migrer la porte niveau telle quelle en (c.3).
- **Option β** : figer 7.2a-code.3 à son état courant, attaquer (b), et terminer 7.2a-code.3 directement en version hexagonale.

Arbitrage à faire avec Lætitia quand on arrive au point de bascule. Option β semble plus cohérente mais elle allonge légèrement la durée de (c).

### 7.3 Chantiers 12 et 13 — pas d'interaction directe

Le chantier 12 (Transparence cotations → Lexique) et le chantier 13 (Outil de diagnostic de maturité) se greffent ultérieurement sur une architecture propre. Pas d'interférence avec 14.

---

## 8. Ce que le chantier 14 **ne** fait **pas**

- Il ne change rien de visible pour l'utilisateur. Zéro nouveau libellé, zéro nouveau comportement, zéro nouvelle fiche.
- Il ne crée pas les modes d'entrée parallèles (chantier 10 gelé).
- Il ne refond pas le panier.
- Il ne refond pas la nav.
- Il ne fait pas de revue éditoriale de fiches.
- Il ne rouvre pas `MISSION.md`.

Garde-fou pour moi : si je me retrouve à toucher une fiche pour une autre raison que l'hexagonalisation, *stop* — je consigne la dérive dans le backlog comme ligne à reprendre plus tard, je ne la traite pas en greffe.

---

---

## 10. Décisions éditoriales structurelles (étape b)

Décisions prises en ouverture de l'étape (b), suite aux mockup-previews livrés. Chaque décision est référencée par le commit qui l'acte.

### 10.1 Seuils / paliers — Option B retenue

**Décision (24/04/2026).** Les fiches peuvent porter un champ optionnel `reperes`, réservé aux métriques dont un référentiel reconnu publie des bandes. Les fiches sans référentiel légitime n'en portent aucun. Référence de l'arbitrage : `preview-14b-seuils-paliers.html` (commit `21c76b2`).

**Critère d'éligibilité (applicable fiche par fiche au passage éditorial).** Une fiche devient éligible si et seulement si les trois conditions sont réunies :

1. Un référentiel **public et nommé** publie des bandes pour cette métrique (DORA State of DevOps, NIST CSF, Bain/Reichheld pour NPS, ITIL, OWASP, etc.).
2. Les bandes sont **descriptives** — ce que l'industrie observe — jamais **prescriptives** (« il faut atteindre »).
3. La fiche ne porte pas le flag `observationPure` (à introduire) qui exclut explicitement toute gradation. Cas typiques : confiance organisationnelle (`s8`), NPS interne nominatif, métriques où la cible est toujours contextuelle.

**Volume attendu.** Entre 10 et 15 fiches éligibles sur les 84 du catalogue. Candidats pressentis : DORA ×4 (`o1` à `o4`), NIST ×1 (`s9`), ITIL/Ops ×3-4 (SLA, MTTR, disponibilité pipeline), NPS/CSAT/eNPS ×3-4, éventuellement disponibilité ×1-2. Liste exacte figée au passage éditorial, pas ici.

**Structure du champ.**

```
reperes: {
  source:    "DORA State of DevOps 2024",   // obligatoire
  sourceUrl: "https://...",                  // optionnel
  unite:     "/semaine",                     // pour l'affichage
  bandes: [
    { nom: "Elite",   seuil: "plusieurs/jour",   qualif: "excellent" },
    { nom: "Haute",   seuil: "1/jour à 1/sem",   qualif: "bon" },
    { nom: "Moyenne", seuil: "1/sem à 1/mois",   qualif: "moyen" },
    { nom: "Basse",   seuil: "< 1/mois",         qualif: "faible" }
  ]
}
```

- `source` (obligatoire) nomme le référentiel qui publie les bandes.
- `sourceUrl` (optionnel) renvoie au document de référence.
- `unite` (optionnel) pour l'affichage côté vue.
- `bandes[]` est un tableau de 3 à 5 éléments. Chaque bande a : `nom` (libellé spécifique au référentiel — « Elite », « Niveau 5 », « Promoteurs »), `seuil` (valeur ou intervalle sous forme de chaîne — la donnée n'est pas typée, la sémantique vit dans le libellé), `qualif` (enum fermé : `excellent` | `bon` | `moyen` | `faible` | `alerte` — pilote la couleur d'affichage, indépendamment du libellé de source).

**Principe flexible côté donnée, normalisé côté vue.** Les référentiels sont hétérogènes (DORA en 4 bandes, NIST en 5, NPS en 3). La structure accepte cette hétérogénéité. Le composant d'affichage normalise à 3-5 bandes max : regroupe si plus, étire si moins. L'utilisateur voit toujours un rendu homogène quelle que soit la source.

**Comportement d'affichage.** Collapsé par défaut. Toggle sobre « Voir les repères industriels » placé **après** la section anti-patterns, **avant** la section alternatives. Jamais en tête de fiche, jamais en premier signal visuel.

**Règle d'or anti-Goodhart.** Le repère n'est jamais la première chose vue. L'utilisateur doit d'abord lire l'intention, les exemples, les anti-patterns. Les repères sont un tutorat — un deuxième temps pédagogique, pas le contenu principal. Collapsé par défaut protège la lecture naïve contre la fixation réflexive sur un chiffre.

**Impact sur `CM.RequeteMetriques`.** Aucun. `reperes` est un champ d'affichage, non filtrant. La signature `executer(filtre)` ne connaît pas cette notion — voir §10.3 pour le contrat complet.

**Flag `observationPure`.** Nouveau champ booléen optionnel sur la fiche. Défaut : `false`. Quand `true`, la fiche refuse explicitement toute gradation (ni `reperes` côté catalogue, ni paliers côté panier si Option C émergeait un jour). À poser fiche par fiche sur les métriques-observation lors du passage éditorial — estimation : ~5 à 10 fiches (`s8`, certaines fiches humaines, certaines fiches ICP stratégiques).

**Passage éditorial.** Travail étalé sur étape (c). À programmer dans le backlog. Ne bloque pas l'étape (b) — la structure du champ est arrêtée, la saisie des valeurs se fait en temps éditorial.


### 10.2 Vocabulaire fermé des tags thématiques — 14 libellés

**Décision (24/04/2026, Temps 3).** Le vocabulaire des tags thématiques du champ `CM.IndicateursMeta.META[id].tagsThematiques` est arrêté à **14 libellés**. La cible initiale "10-12 tags" annoncée en Temps 1 a été révisée à 14 au titre de la règle d'arbitrage nuancée (cf. fiche mémoire `project_regle_tags_sous_seuil`).

**Liste exhaustive** :

1. `transversalité` — décloisonnement inter-équipes
2. `prévisibilité` — fiabilité des engagements vs réalisations
3. `engagement` — investissement personnel constaté
4. `goulots` — contraintes identifiées dans le flux
5. `coûts cachés` — gaspillages et rework rétrospectifs
6. `compétences` — savoir-faire et maîtrise
7. `cadence` — rythme de livraison
8. `feedback` — boucle d'apprentissage sur un output
9. `risque` — exposition prospective à une dérive
10. `autonomie` — permission de décider
11. `confiance` — fondation relationnelle (verticale, horizontale, institutionnelle, client)
12. `variabilité` — mesure statistique interne (Six Sigma)
13. `alignement` — contenu stratégique partagé verticalement
14. `expérience client` — perception externe

**Référent éditorial** : définitions-frontières en §2 de `inventaire-tags-thematiques.md`. Tests de non-redondance en §3. Matrice d'assignation des 84 fiches en §6. Analyse quantitative et arbitrages en §7.

**Règle de fermeture.** Ce vocabulaire est **fermé** — toute nouvelle fiche ajoutée au catalogue doit être taguée exclusivement dans ces 14 libellés. Aucun tag nouveau n'est accepté au fil de l'eau. Toute évolution (ajout, retrait, renommage) est un chantier séparé, jamais une révision silencieuse.

**Cohabitation avec le champ `tags` existant.** Les deux vocabulaires cohabitent, intentionnellement :
- `tags` (vocabulaire de 7 valeurs : `valeur`, `qualite`, `flux`, `delais`, `humain`, `risque`, `alignement`) capture les *problèmes adressés* — c'est le vocabulaire d'entrée de la porte *Par mon problème*.
- `tagsThematiques` (14 valeurs ci-dessus) capture les *thèmes transverses* — c'est un vocabulaire d'analyse et d'agrégation, appelé à structurer la vue mosaïque et la future porte *Par ma question*.

**Impact sur `CM.RequeteMetriques`.** Le filtre accepte une clause `tagsThematiques: [...]` en plus de la clause `tags: [...]` existante. Sémantique par défaut : union intra-clause (OR), intersection inter-clauses (AND). Signature complète formalisée en §10.3.

**Tags sous-seuil conservés** (3,6 % et 2,4 %) : `transversalité` et `autonomie`. Test d'antériorité réussi en §7.5 — Team Topologies et Management 3.0 les porteront densément une fois injectés au catalogue (chantier 17 post-14). Gardés comme *signaux de lacune du catalogue*, pas comme thèmes mineurs.


### 10.3 Signature `executer(filtre)` — contrat d'API du cœur

**Décision (24/04/2026, suite — tâche 3 de l'étape b).** Le module `CM.RequeteMetriques` expose une et une seule fonction publique : `executer(filtre)`. Le présent §10.3 est la **source unique** du contrat pendant toute l'étape (b). Document texte uniquement — il précède l'écriture du code (commit 1 de l'étape b, cf. §4).

**Forme canonique du `filtre`.** Objet JavaScript dont toutes les clauses sont optionnelles. L'absence d'une clause = aucune contrainte sur cette dimension.

```
filtre = {
  niveau?:           Array<NiveauId>,        // 'equipe' | 'programme' | 'portefeuille' | 'entreprise' | 'affaires-operationnel'
  domaine?:          Array<DomaineId>,       // ex. 'devops', 'affaires', 'portefeuille', 'programme'…
  type?:             Array<TypeId>,          // 'kpi' | 'kbi' | 'kgi' | 'kii' | 'okr' | 'dora' | 'lean-six-sigma'
  cadre?:            Array<CadreId>,         // ex. 'lean', 'six-sigma', 'dora', 'scrum'…
  tags?:             Array<TagId>,           // 7 valeurs : 'valeur', 'qualite', 'flux', 'delais', 'humain', 'risque', 'alignement'
  tagsThematiques?:  Array<TagThematiqueId>, // 14 valeurs verrouillées en §10.2
  fiabiliteMin?:     FiabiliteId,            // 'fiable' | 'precaution' | 'risquee' — seuil ordinal
  maturiteMin?:      MaturiteId,             // seuil ordinal sur l'échelle de maturité (cf. inventaire-schema-metriques.md)
  limite?:           number                  // entier strictement positif — capping de la liste retournée
}
```

**Sucre syntaxique `probleme`.** Les portes peuvent passer le raccourci `probleme: 'flux'` au lieu de `tags: ['flux']`. Le cœur convertit avant d'évaluer. C'est la seule abstraction syntaxique offerte — toutes les autres clauses sont nominales et explicites. La porte *Par mon problème* utilise ce raccourci côté traducteur ; la porte *Par ma question* (chantier 10) le fera également.

**Sémantique d'évaluation.**

- **Union intra-clause (OR).** `tags: ['flux', 'qualite']` retourne les fiches qui portent `flux` OU `qualite`.
- **Intersection inter-clauses (AND).** `{niveau: ['equipe'], tags: ['flux']}` retourne les fiches niveau équipe ET portant le tag flux.
- **Seuils ordinaux.** `fiabiliteMin: 'precaution'` retourne les fiches de fiabilité `fiable` ou `precaution` (pas `risquee`). `maturiteMin: 'X'` même logique sur l'échelle de maturité.
- **`limite`.** Capping appliqué *après* filtrage et *après* application de l'ordre de retour (cf. ci-dessous). Aucun re-tri spécifique au capping.

**Contrat de retour.** `executer(filtre)` retourne une `Array<Fiche>`. L'ordre est celui de déclaration des fiches dans `CM.Referentiel.tous()` — éditorialement curé, stable, prévisible. Les vues qui souhaitent un autre tri trient localement après réception. Cet ordre est implicitement le contrat ; toute évolution (tri par score, par pertinence, par récence) sera un chantier séparé documenté ici.

**Comportements limites.**

| Cas | Comportement |
|---|---|
| `filtre = {}` ou `executer()` | Retourne **toutes les fiches** du référentiel, dans l'ordre de déclaration. Cohérent avec « pas de contrainte = pas de filtrage ». |
| Clause vide (`tags: []`) | **Ignorée** comme si la clause était absente. Pas de fausse contrainte. |
| Valeur inconnue dans une clause-set (typo, vocabulaire évolué) | **Exception explicite** `Error("CM.RequeteMetriques: valeur inconnue dans la clause 'tags' : 'flu'. Vocabulaire admis : valeur, qualite, flux, delais, humain, risque, alignement.")`. Bruyant > silencieux : les régressions de catalogue doivent être détectées immédiatement, pas avalées. |
| Valeur inconnue dans un seuil (`fiabiliteMin`, `maturiteMin`) | **Exception explicite**, même principe. |
| `limite` ≤ 0 ou non entière | **Exception explicite**. `limite: 0` est probablement une erreur de saisie, pas une demande légitime de liste vide. |
| Clause inconnue dans `filtre` (typo de nom de clé) | **Exception explicite** `Error("CM.RequeteMetriques: clause inconnue 'tagThematique' (vouliez-vous dire 'tagsThematiques' ?). Clauses admises : niveau, domaine, type, cadre, tags, tagsThematiques, probleme, fiabiliteMin, maturiteMin, limite.")`. |

**Origine des valeurs comparées.** Les clauses `tags` et `tagsThematiques` matchent contre les champs de même nom dans `CM.IndicateursMeta.META[id]`. Les autres clauses (`niveau`, `domaine`, `type`, `cadre`, `fiabiliteMin`, `maturiteMin`) matchent contre les champs de même nom **dans la fiche elle-même** (`CM.Referentiel`). Le module `CM.RequeteMetriques` compose donc deux sources de données ; il n'enrichit aucun champ, il ne fait que filtrer.

**Cohérence avec les décisions amont.**

- **§3.1 (architecture cible).** La forme initiale `{niveau?, cadre?, probleme?, maturite?, limite?}` annoncée en §3.1 est ici **étendue et normalisée** ; §3.1 pointe désormais vers ce §10.3 comme source unique.
- **§10.1 (seuils/paliers).** `reperes` reste un champ d'affichage non filtrant — il n'apparaît pas dans la signature.
- **§10.2 (vocabulaire fermé).** Les clauses `tags` et `tagsThematiques` consomment respectivement les vocabulaires fermés des 7 tags problèmes et des 14 tags thématiques. Toute valeur hors vocabulaire lève une exception (cf. ci-dessus).

**Statut éditorial du contrat.** Tout consommateur (porte, test, future porte question) qui voudrait une clause non listée ici doit (1) l'ouvrir comme évolution du §10.3 — donc valider une décision éditoriale documentée — puis (2) la consommer. Jamais l'inverse. Cf. fiche mémoire `project_document_compagnon_contrats` (le document est la référence, le code s'y conforme).

**Impact sur le code à venir (étape b, commits 1 à 3).**

- Commit 1 (squelette `CM.RequeteMetriques`) : valide la forme du `filtre` (validation stricte des clauses et des valeurs) et le contrat de retour. Aucun consommateur encore branché.
- Commit 2 (implémentation) : applique la sémantique union/intersection sur les axes existants (`niveau`, `domaine`, `type`, `cadre`, `tags`, `tagsThematiques`, `fiabiliteMin`, `maturiteMin`, `limite`).
- Commit 3 (tests via patron générateur Node) : couvre tous les comportements limites du tableau ci-dessus + un panel de filtres représentatifs croisant 2 à 4 clauses.
- Aucune modification des consommateurs (`CM.DiagnosticProbleme`, `CM.DiagnosticCadre`, `CM.Roles`) avant l'étape (c).

---

## 9. Journal du chantier

- **23/04/2026 fin de journée** — ouverture du chantier. Commit atomique `chore(chantier-14): ouverture — baseline + scénario régression + procédure rollback` embarquant (1) tag git `baseline-avant-hexagonal` sur `5655b03`, (2) `scenario-non-regression.md` posé, (3) ce doc compagnon, (4) backlog mis à jour avec chantier 14 actif / chantier 10 gelé, (5) mémoire `project_chantier_14_ouverture.md` posée. Prochaine étape : (a) inventaire du schéma d'étiquettes.
- **24/04/2026 fin de journée — ouverture étape (b), tâche 1 tranchée.** Livraison du preview `preview-14b-seuils-paliers.html` (commit `21c76b2`). Arbitrage : **Option B retenue** — champ `reperes` optionnel sur les fiches à référentiel reconnu, structure flexible-normalisée, affichage collapsé par défaut. Décisions détaillées actées en §10.1 ci-dessus. Prochaines tâches de l'étape (b) : (2) arrêter le vocabulaire fermé des tags thématiques, (3) poser la signature `executer(filtre)`.
- **24/04/2026 (suite) — Temps 2 et Temps 3 de la tâche 2 (étape b).** Temps 2 : tagging exhaustif des 84 fiches (matrice 84×14 dans `inventaire-tags-thematiques.md` §6, commit `b474a20`). Temps 3 : analyse quantitative (taux d'usage, co-occurrences, orphelines → 0) et verrouillage du vocabulaire à 14 tags (§7 du même document + §10.2 ci-dessus, commit du présent acte). Application de la règle d'antériorité : 4 tags en zone basse/surveillance conservés (voir fiche mémoire `project_regle_tags_sous_seuil`). Entrée de backlog chantier 17 ouverte en anticipation (commit `021112b`). Prochaine tâche de l'étape (b) : (3) signature `executer(filtre)`.
