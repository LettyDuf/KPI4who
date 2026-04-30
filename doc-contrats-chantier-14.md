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

### 3.4 Architecture livrée (post-chantier 14)

Section actée à la clôture de l'étape (d), 26/04/2026. Décrit ce qui est **vraiment en place** dans `cadre-indicateurs.html` après les étapes (a) → (d). Sert de référence pour le code, en complément de §3.1 (cible projetée à l'ouverture).

**Domaine isolé.** Les modules suivants forment le cœur, sans dépendance vers les chemins ni les vues :

- `CM.Config` (~ligne 2541) — référentiel des types, fiabilités, maturités, niveaux de surface.
- `CM.IndicateursMeta` (~ligne 3413) — métadonnées des fiches (tags, cadres, familles, tags thématiques, voisinage de cadres). Expose désormais aussi `rangFiabilite(ind)` — score numérique pour ordonner les fiches par qualité de mesure (mutualisé à l'étape (d), auparavant dupliqué dans trois modules consommateurs).
- `CM.Referentiel` (catalogue des fiches indicateurs).
- **`CM.RequeteMetriques`** (~ligne 3875) — API unique du domaine pour le filtrage. Signature `executer(filtre)` formalisée en §10.3. Tous les chemins passent par lui.

**Chemins (adaptateurs d'entrée).** Trois traducteurs orthodoxes formulent un filtre conforme à §10.3 et délèguent à `executer` :

- `CM.DiagnosticProbleme` (~ligne 5924) — porte *Par mon problème*. Méthodes : `niveauxTous`, `niveauInfo`, `problemesPourNiveau`, `problemeInfo`, `recommander`, `aDeleguerPour`. La méthode `delegationPour` et sa table interne `DELEGATION` ont été retirées à l'étape (d) (code mort, 0 usages).
- `CM.DiagnosticCadre` (~ligne 7066) — porte *Par mon cadre*. Méthodes : `niveauxTous`, `niveauInfo`, `cadreInfo`, `recommander`, `famillesAvecCadres`.
- `CM.Roles` (porte *Par mon niveau*) — l'aspect traducteur sélection→filtre vit en pratique dans `CM.VuePorteNiveau._etapeResultats` après le refactor (c.3) : un `executer({niveau, tags, cadres})` à trois axes natif.

**Vues (adaptateurs de sortie).** Quatre modules `CM.VuePorteX` rendent les fiches reçues :

- `CM.VuePorteProbleme` (~ligne 6820) — façade au-dessus de `CM.Stepper`.
- `CM.VuePorteCadre` (~ligne 7158) — contrôleur de la vue *Par mon cadre*.
- `CM.VuePorteNiveau` (~ligne 7463) — façade `CM.Stepper`. `_etapeResultats` formule directement le filtre 3-axes, sans passer par les traducteurs frères (héritage du calque strict (c.3)).
- `CM.VuePorteMaturite` — **emplacement réservé** (commentaire-balise architectural ~ligne 7982). Aucun module exécutable. Quand la porte sera instruite, suivra le patron des trois sœurs (cf. §c.4 et le commentaire-balise).

`CM.Composants` (~ligne 6216) et `CM.FicheViewModel` (~ligne 6127) restent les utilitaires de rendu HTML, partagés entre vues. Ne sont pas des chemins.

**Tri local toléré.** Conformément à §10.3, les vues qui souhaitent un tri par fiabilité l'appliquent localement après réception, via `CM.IndicateursMeta.rangFiabilite(ind)`. Trois sites d'appel : `CM.DiagnosticProbleme.recommander`, `CM.DiagnosticCadre.recommander`, `CM.VuePorteNiveau._etapeResultats`.

**Divergences avec §3.1 (cible projetée à l'ouverture).** Mineures, à acter pour l'historique :

- L'étape (a) parlait d'un module `CM.Roles` qui deviendrait traducteur. En pratique, le rôle de traducteur pour la porte niveau est assumé par `CM.VuePorteNiveau._etapeResultats` directement (la vue formule le filtre, le module `CM.Roles` reste un inventaire). Aucun impact fonctionnel — la doctrine traducteur orthodoxe est respectée.
- La porte *Par ma maturité* (c.4) reste un emplacement, pas un module. Acte documenté en §c.4.

**Tags d'étape posés** (chaîne complète, pour reconstruire l'historique) :

| Tag | Commit | Acte |
|---|---|---|
| `baseline-avant-hexagonal` | `5655b03` | Point de retour absolu, posé à l'ouverture du chantier. |
| `mvp-etape-a-schema-inventorie` | `1ba5112` | Inventaire du schéma d'étiquettes livré. |
| `mvp-etape-b-coeur-extrait` | `2a61336` | `CM.RequeteMetriques` extrait + tests verts. |
| `mvp-etape-c1-porte-probleme-migree` | `83d3bd2` | Porte *Par mon problème* migrée. |
| `mvp-etape-c2-porte-cadre-migree` | `894ab8a` | Porte *Par mon cadre* migrée. |
| `mvp-etape-c3-porte-niveau-migree` | `34366f3` | Porte *Par mon niveau* migrée (premier triplet à 3 axes). |
| `mvp-etape-c-portes-migrees` | `b17b776` | (c.4) actée, étape (c) globalement close. |
| `mvp-chantier-14-livre` | *(à poser après §9 et MISSION.md)* | Clôture finale du chantier. |

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

**(c.4) Porte *Par ma maturité* (emplacement).** La porte est aujourd'hui un **stub d'accueil** (`aria-disabled="true"` dans `cadre-indicateurs.html` ligne ~2391, sans `onclick`). Aucun module `CM.VuePorteMaturite` n'existe — l'emplacement est donc **propre par construction** : rien à supprimer, rien à migrer. (c.4) est validée comme **acte de documentation**, pas comme migration code.

*Acte posé* — un commentaire-balise architectural a été inséré dans `cadre-indicateurs.html` juste après `CM.VuePorteNiveau` (zone fin du module précédent, avant `CM.App`). Il matérialise l'emplacement futur et expose les contraintes ci-dessous au prochain qui scanne le code. L'objet du commentaire est purement signalétique — aucun JavaScript exécutable.

*Contrat futur de `CM.VuePorteMaturite`* (à respecter quand la porte sera instruite) :

- Façade orthodoxe vers `CM.RequeteMetriques.executer`, sur le patron strict des trois sœurs `CM.VuePorteProbleme` / `CM.VuePorteCadre` / `CM.VuePorteNiveau`.
- Aucun accès direct à `CM.Referentiel` ni à `CM.IndicateursMeta` (les passe-plats métadonnées d'affichage — `niveauInfo`, etc. — restent autorisés).
- Tri local par fiabilité toléré (§10.3, opération post-`executer` autorisée hors ouverture de contrat).
- Filtre type pressenti : `{niveau, maturiteMin}` — formulation **à arbitrer panel-on-demand** (Lean, modèles de maturité type CMMI / Lean Maturity Assessment, coaching Agile). Ne pas inventer de sémantique sans panel : c'est précisément le risque qu'évite la doctrine du chantier.

*Distinction structurante (à tenir)* — la porte *Par ma maturité* (prospective : « par où commencer ? ») et l'onglet *La maturité ?* (réflexif : « qu'est-ce que mon panier vaut ? ») sont **deux objets distincts**. Décision actée au chantier 10, cf. `project_chantier_10_decisions_ouverture` décision 1. L'onglet vit aujourd'hui sous l'id DOM `vue-maturite` / `contenu-maturite`, géré par `CM.App.changerVue('maturite')`. La future porte vivra dans son propre module `CM.VuePorteMaturite`, comme ses trois sœurs. Le commentaire-balise du HTML rappelle explicitement cette distinction pour parer toute confusion future.

**Tag dédié à (c.4)** : aucun — la (c.4) est absorbée dans la clôture globale de (c).

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

**Décision (24/04/2026, suite — tâche 3 de l'étape b ; vocabulaires alignés sur l'inventaire de l'étape a le 25/04/2026).** Le module `CM.RequeteMetriques` expose une et une seule fonction publique : `executer(filtre)`. Le présent §10.3 est la **source unique** du contrat pendant toute l'étape (b). Document texte uniquement — il précède l'écriture du code (commit 1 de l'étape b, cf. §4).

**Forme canonique du `filtre`.** Objet JavaScript dont toutes les clauses sont optionnelles. L'absence d'une clause = aucune contrainte sur cette dimension. Les vocabulaires fermés ci-dessous sont ceux **réellement portés par les fiches** (cf. `inventaire-schema-metriques.md` §3) — pas une terminologie de surface idéalisée.

```
filtre = {
  niveau?:           Array<NiveauId>,        // 'strategique' | 'tactique' | 'programme' | 'operationnel'
  branche?:          Array<BrancheId>,       // 'ti' | 'affaires' — pertinent uniquement sur les fiches niveau 'operationnel'
  domaine?:          Array<DomaineId>,       // 10 valeurs : 'dev', 'plateforme', 'ops-support', 'sécurité', 'commercial', 'marketing', 'finance', 'rh', 'operations', 'service-client'
  type?:             Array<TypeId>,          // 7 valeurs : 'IGO' | 'ICP' | 'ICC' | 'ORC' | 'DORA' | 'FLUX' | 'II' (terminologie française = KGI/KPI/KBI/OKR/DORA/Flux/KII)
  cadres?:           Array<CadreId>,         // 11 valeurs : 'dora', 'cd', 'space', 'lean', 'okr', 'scrum', 'kanban', 'safe', 'itil', 'securite', 'generique' (mise à jour 30/04/2026 — cf. journal §9)
  tags?:             Array<TagId>,           // 7 valeurs : 'valeur', 'qualite', 'flux', 'delais', 'humain', 'risque', 'alignement'
  tagsThematiques?:  Array<TagThematiqueId>, // 14 valeurs verrouillées en §10.2
  fiabiliteMin?:     FiabiliteId,            // 'fiable' | 'precaution' | 'risque' — seuil ordinal (cf. ci-dessous)
  maturiteMin?:      MaturiteId,             // 'debutant' | 'intermediaire' | 'avance' — seuil ordinal (cf. ci-dessous, sémantique inversée par rapport à fiabiliteMin)
  limite?:           number                  // entier strictement positif — capping de la liste retournée
}
```

**Sucre syntaxique `probleme`.** Les portes peuvent passer le raccourci `probleme: 'flux'` au lieu de `tags: ['flux']`. Le cœur convertit avant d'évaluer. C'est la seule abstraction syntaxique offerte — toutes les autres clauses sont nominales et explicites. La porte *Par mon problème* utilise ce raccourci côté traducteur ; la porte *Par ma question* (chantier 10) le fera également.

**Sémantique d'évaluation.**

- **Union intra-clause (OR).** `tags: ['flux', 'qualite']` retourne les fiches qui portent `flux` OU `qualite`.
- **Intersection inter-clauses (AND).** `{niveau: ['operationnel'], tags: ['flux']}` retourne les fiches niveau opérationnel ET portant le tag flux.
- **Seuil ordinal `fiabiliteMin`.** Ordre `fiable > precaution > risque` (du plus solide au plus instable). `fiabiliteMin: 'precaution'` retourne les fiches de fiabilité `fiable` ou `precaution` — c'est-à-dire « au moins aussi solide que precaution ». Sémantique « borne inférieure de qualité acceptable ».
- **Seuil ordinal `maturiteMin`.** Ordre `debutant < intermediaire < avance` (du moins exigeant au plus exigeant en prérequis côté équipe). `maturiteMin: 'intermediaire'` retourne les fiches dont le prérequis `maturite_min` est `debutant` ou `intermediaire` — c'est-à-dire « les fiches utilisables par une équipe dont la maturité est au plus `intermediaire` ». Sémantique « borne supérieure de prérequis acceptable ». **Note** : le sens du `Min` est inversé par rapport à `fiabiliteMin` parce que la donnée source `maturite_min` représente un prérequis (borne inférieure de maturité requise par la fiche), alors que `fiabilite` représente une qualité intrinsèque. Le nom `maturiteMin` reste cohérent avec la donnée source ; un alias `maturiteUtilisateurMax` pourrait être introduit ultérieurement si la confusion s'avère récurrente — décision laissée ouverte au chantier 17 ou plus tard.
- **`limite`.** Capping appliqué *après* filtrage et *après* application de l'ordre de retour (cf. ci-dessous). Aucun re-tri spécifique au capping.
- **Sémantique d'absence — distinction obligatoires/optionnels (révision 25/04/2026, ajout post-commit 3).** Tous les champs de fiche ne se comportent pas pareil quand ils sont absents :

  | Champ | Caractère | Comportement quand le champ est absent sur une fiche |
  |---|---|---|
  | `niveau`, `type` | **Obligatoires** | La fiche est exclue par toute clause portant sur ce champ — l'absence est un défaut. |
  | `fiabilite` (matché par `fiabiliteMin`), `maturite_min` (matché par `maturiteMin`) | **Obligatoires** | Idem — l'absence sur un seuil ordinal exclut. |
  | `branche`, `domaine` | **Optionnels** (cf. inventaire §3.2 et §3.3) | La fiche est **incluse par défaut** quand une clause porte sur ce champ. Filtrer par `domaine: ['dev']` n'élimine pas les fiches transverses sans domaine — elles restent pertinentes pour tout filtre. |

  **Pourquoi cette asymétrie.** Les champs obligatoires définissent la fiche (un indicateur sans niveau est mal formé). Les champs optionnels précisent un contexte (un indicateur sans domaine est *transverse* à tous les domaines, pas *défaillant*). La sémantique de filtrage doit refléter cette nature de la donnée — c'est ce qui permet aux portes (chantier 14 étape c) et aux futurs consommateurs (chantier 10, mode *Par ma question*) de filtrer par domaine sans faire disparaître les indicateurs transverses du flux. Aucun flag ni syntaxe spéciale n'est exposé : les clauses gardent leur forme canonique `Array<Valeur>`, c'est l'implémentation qui distingue obligatoires/optionnels.

  **Cas pratique d'éligibilité.** Une fiche `niveau:'operationnel'` sans `domaine` (ex : indicateur de flux générique applicable à toute équipe TI) reste visible sous `executer({niveau:['operationnel'], domaine:['dev']})`. Une fiche `niveau:'operationnel', domaine:'commercial'` est en revanche exclue (champ présent et non-matchant — sémantique stricte sur valeurs présentes).

**Contrat de retour.** `executer(filtre)` retourne une `Array<Fiche>`. L'ordre est celui de déclaration des fiches dans `CM.Referentiel.tous()` — éditorialement curé, stable, prévisible. Les vues qui souhaitent un autre tri trient localement après réception. Cet ordre est implicitement le contrat ; toute évolution (tri par score, par pertinence, par récence) sera un chantier séparé documenté ici.

**Comportements limites.**

| Cas | Comportement |
|---|---|
| `filtre = {}` ou `executer()` | Retourne **toutes les fiches** du référentiel, dans l'ordre de déclaration. Cohérent avec « pas de contrainte = pas de filtrage ». |
| Clause vide (`tags: []`) | **Ignorée** comme si la clause était absente. Pas de fausse contrainte. |
| Valeur inconnue dans une clause-set (typo, vocabulaire évolué) | **Exception explicite** `Error("CM.RequeteMetriques: valeur inconnue dans la clause 'tags' : 'flu'. Vocabulaire admis : valeur, qualite, flux, delais, humain, risque, alignement.")`. Bruyant > silencieux : les régressions de catalogue doivent être détectées immédiatement, pas avalées. |
| Valeur inconnue dans un seuil (`fiabiliteMin`, `maturiteMin`) | **Exception explicite**, même principe. |
| `limite` ≤ 0 ou non entière | **Exception explicite**. `limite: 0` est probablement une erreur de saisie, pas une demande légitime de liste vide. |
| Clause inconnue dans `filtre` (typo de nom de clé) | **Exception explicite** `Error("CM.RequeteMetriques: clause inconnue 'tagThematique' (vouliez-vous dire 'tagsThematiques' ?). Clauses admises : niveau, branche, domaine, type, cadres, tags, tagsThematiques, probleme, fiabiliteMin, maturiteMin, limite.")`. |

**Origine des valeurs comparées.**

- Clauses qui matchent contre les **champs obligatoires de la fiche** (`CM.Referentiel`) : `niveau` (vs `fiche.niveau`), `type` (vs `fiche.type`), `fiabiliteMin` (vs `fiche.fiabilite`), `maturiteMin` (vs `fiche.maturite_min`). L'absence du champ exclut la fiche du résultat dès que la clause est active.
- Clauses qui matchent contre les **champs optionnels de la fiche** (`CM.Referentiel`) : `branche` (vs `fiche.branche`), `domaine` (vs `fiche.domaine`). L'absence du champ **n'exclut pas** la fiche — voir « Sémantique d'absence » ci-dessus.
- Clauses qui matchent contre les **champs du tagging multi-axes** (`CM.IndicateursMeta.META[id]`) : `tags` (vs `META[id].tags`), `tagsThematiques` (vs `META[id].tagsThematiques`), `cadres` (vs `META[id].cadres`). Une fiche sans entrée dans `META[id]` retourne `[]` via les accesseurs `tagsDe / cadresDe / tagsThematiquesDe`, donc aucune valeur en commun avec un filtre actif → exclue. Cohérent avec le caractère obligatoire du tagging à la création d'une fiche.

Le module `CM.RequeteMetriques` compose donc deux sources de données ; il n'enrichit aucun champ, il ne fait que filtrer.

**Cohérence avec les décisions amont.**

- **§3.1 (architecture cible).** La forme initiale `{niveau?, cadre?, probleme?, maturite?, limite?}` annoncée en §3.1 est ici **étendue, normalisée et alignée sur les vocabulaires inventoriés** ; §3.1 pointe désormais vers ce §10.3 comme source unique.
- **§10.1 (seuils/paliers).** `reperes` reste un champ d'affichage non filtrant — il n'apparaît pas dans la signature.
- **§10.2 (vocabulaire fermé).** Les clauses `tags` et `tagsThematiques` consomment respectivement les vocabulaires fermés des 7 tags problèmes et des 14 tags thématiques. Toute valeur hors vocabulaire lève une exception (cf. ci-dessus).
- **Inventaire de l'étape (a)** (`inventaire-schema-metriques.md`). Les vocabulaires fermés `niveau`, `branche`, `domaine`, `type`, `fiabilite` et `maturite_min` sont ici la **transcription stricte** de §3.1 à §3.6 et §3.9 de l'inventaire. Toute valeur ajoutée à l'inventaire (ex. nouveau domaine, nouveau cadre) doit l'être ici simultanément.

**Statut éditorial du contrat.** Tout consommateur (porte, test, future porte question) qui voudrait une clause non listée ici doit (1) l'ouvrir comme évolution du §10.3 — donc valider une décision éditoriale documentée — puis (2) la consommer. Jamais l'inverse. Cf. fiche mémoire `project_document_compagnon_contrats` (le document est la référence, le code s'y conforme).

**Impact sur le code à venir (étape b, commits 1 à 3).**

- Commit 1 (squelette `CM.RequeteMetriques`) : valide la forme du `filtre` (validation stricte des clauses et des valeurs) et le contrat de retour. Aucun consommateur encore branché.
- Commit 2 (implémentation) : applique la sémantique union/intersection sur les axes existants (`niveau`, `branche`, `domaine`, `type`, `cadres`, `tags`, `tagsThematiques`, `fiabiliteMin`, `maturiteMin`, `limite`).
- Commit 3 (tests via patron générateur Node) : couvre tous les comportements limites du tableau ci-dessus + un panel de filtres représentatifs croisant 2 à 4 clauses.
- Aucune modification des consommateurs (`CM.DiagnosticProbleme`, `CM.DiagnosticCadre`, `CM.Roles`) avant l'étape (c).

## 9. Journal du chantier

- **23/04/2026 fin de journée** — ouverture du chantier. Commit atomique `chore(chantier-14): ouverture — baseline + scénario régression + procédure rollback` embarquant (1) tag git `baseline-avant-hexagonal` sur `5655b03`, (2) `scenario-non-regression.md` posé, (3) ce doc compagnon, (4) backlog mis à jour avec chantier 14 actif / chantier 10 gelé, (5) mémoire `project_chantier_14_ouverture.md` posée. Prochaine étape : (a) inventaire du schéma d'étiquettes.
- **24/04/2026 fin de journée — ouverture étape (b), tâche 1 tranchée.** Livraison du preview `preview-14b-seuils-paliers.html` (commit `21c76b2`). Arbitrage : **Option B retenue** — champ `reperes` optionnel sur les fiches à référentiel reconnu, structure flexible-normalisée, affichage collapsé par défaut. Décisions détaillées actées en §10.1 ci-dessus. Prochaines tâches de l'étape (b) : (2) arrêter le vocabulaire fermé des tags thématiques, (3) poser la signature `executer(filtre)`.
- **24/04/2026 (suite) — Temps 2 et Temps 3 de la tâche 2 (étape b).** Temps 2 : tagging exhaustif des 84 fiches (matrice 84×14 dans `inventaire-tags-thematiques.md` §6, commit `b474a20`). Temps 3 : analyse quantitative (taux d'usage, co-occurrences, orphelines → 0) et verrouillage du vocabulaire à 14 tags (§7 du même document + §10.2 ci-dessus, commit du présent acte). Application de la règle d'antériorité : 4 tags en zone basse/surveillance conservés (voir fiche mémoire `project_regle_tags_sous_seuil`). Entrée de backlog chantier 17 ouverte en anticipation (commit `021112b`). Prochaine tâche de l'étape (b) : (3) signature `executer(filtre)`.
- **25/04/2026 — Tâche 3 (étape b), alignement du contrat sur l'inventaire.** Avant d'attaquer le commit 1 du squelette `CM.RequeteMetriques`, audit de §10.3 contre la donnée réellement portée par les fiches (vérifiée par `grep` sur `cadre-indicateurs.html` et croisée avec `inventaire-schema-metriques.md` §3). **Quatre divergences corrigées en place dans §10.3** : (i) `niveau` aligné sur `'strategique' | 'tactique' | 'programme' | 'operationnel'` (terminologie interne, et non terminologie de surface équipe/portefeuille/entreprise) ; (ii) `type` aligné sur `'IGO' | 'ICP' | 'ICC' | 'ORC' | 'DORA' | 'FLUX' | 'II'` (terminologie française IGO/ICP/ICC/ORC/II + DORA/FLUX) ; (iii) `fiabilite` aligné sur `'fiable' | 'precaution' | 'risque'` (sans -ée) ; (iv) clause renommée `cadres` au pluriel et précision : matche contre `CM.IndicateursMeta.META[id].cadres`, pas contre la fiche elle-même. Ajout d'une clause `branche` (`'ti' | 'affaires'`) pour préserver la granularité affaires/TI. Suppression de la valeur `'affaires-operationnel'` qui était une fusion artificielle de `niveau:'operationnel'` × `branche:'affaires'`. Sémantique de `maturiteMin` clarifiée comme « borne supérieure de prérequis acceptable » (sens inversé par rapport à `fiabiliteMin`, parce que `fiche.maturite_min` est un prérequis et non une qualité). Application stricte des fiches mémoire `feedback_anti_invention_documents` et `feedback_verifier_avant_affirmer` : un contrat doit miroir le réel inventorié, pas une terminologie idéalisée. Prochaine tâche de l'étape (b) : commit 1 — squelette `CM.RequeteMetriques` avec validation stricte du filtre selon ce §10.3 corrigé.
- **25/04/2026 (suite) — Tâche 3 (étape b), commits 1 à 3 livrés. Étape (b) close.** Commit 1 (`63e76f2`) : squelette `CM.RequeteMetriques` avec validation stricte du filtre selon §10.3 — suggestion best-effort par distance de Levenshtein sur les noms de clauses inconnues, exception explicite sur toute valeur hors vocabulaire. Préalable `tagsThematiques` (`4c7e1b8`) : générateur Node `outils/generer-tags-thematiques.js` + injection des 84 entrées dans la zone `CM._tagsThematiquesData` de `cadre-indicateurs.html`. Commit 2 (`2c6aa61`) : sémantique union intra-clause / intersection inter-clauses, seuils ordinaux `fiabiliteMin` (borne inf de qualité) et `maturiteMin` (borne sup de prérequis, sens inversé), capping `limite` après filtrage sans re-tri, sucre `probleme` agglomérant en `tags` sans doublonner. **Commit 3 — tests automatisés** : marqueurs BEGIN/END posés autour de `CM.RequeteMetriques` (`29b7de2`, no-op runtime, patron `CM.Panier`), puis harnais `tests-requete-metriques.html` + générateur `outils/construire-tests-requete-metriques.js` (`31e59ac`, calque strict de `construire-tests-panier.js`). Le harnais monte `CM.Referentiel` et `CM.IndicateursMeta` en doubles de test (stubs in-memory) et exerce le module sur 12 fiches synthétiques couvrant tous les axes du filtre. **9 suites / 59 tests verts** en exécution headless via runner Node VM minimal. Couverture : Sanity, Comportements limites §10.3 (22 tests), Union OR, Intersection AND avec sémantique d'absence, Seuils ordinaux, Capping `limite`, Sucre `probleme`, Filtres croisés 2-4 clauses, Ordre de retour stable. **Tag `mvp-etape-b-coeur-extrait` posé sur `31e59ac`** = HEAD final fonctionnel de l'étape (b). Iso-comportement utilisateur strict — aucun consommateur n'appelle encore `executer`. Prochaine étape : (c) migration porte par porte vers `CM.RequeteMetriques`.
- **25/04/2026 (révision post-clôture étape b)** — Avant d'attaquer l'étape (c), audit du scenario de non-régression contre les invariants des 3 portes consommatrices a fait remonter une **divergence sémantique critique** entre `CM.DiagnosticProbleme._estPertinent` (sémantique actuelle : fiche sans `domaine` = incluse quand un domaine est filtré) et `CM.RequeteMetriques.executer` (sémantique stricte : fiche sans `domaine` = exclue). Trois options arbitrées (alignement A, extension de contrat B, post-filtre local C) — **option B raffinée retenue** parce qu'elle est la plus solide pour les évolutions futures (chantier 10 mode *Par ma question*, chantier 17 enrichissement du catalogue) et préserve l'orthodoxie hexagonale. Implémentation : §10.3 enrichi avec la distinction obligatoires/optionnels ; `executer` modifié pour traiter `branche` et `domaine` comme optionnels (inclusion par absence) ; tests-requete-metriques.html mis à jour (2 tests retournés + 4 ajoutés sur la nouvelle sémantique, 63 tests verts au total). Tag `mvp-etape-b-coeur-extrait` déplacé sur le nouveau HEAD. Commit unique pour la révision atomique. Aucun consommateur encore branché — risque runtime nul.

- **25/04/2026 (suite) — Étape (c.1) livrée. Porte *Par mon problème* migrée.** Deux commits atomiques branchant `CM.DiagnosticProbleme` sur `CM.RequeteMetriques.executer` (et plus rien d'autre). Commit 1 (`ee5361b`) : `recommander({niveau, probleme, domaine?})` devient une façade — formule `{niveau:[ctx.niveau], probleme:ctx.probleme, domaine?:[ctx.domaine] (si niveau opérationnel)}` et délègue à `executer`. Tri par fiabilité conservé localement (cf. §10.3 : « les vues qui souhaitent un autre tri trient localement »). Helper interne `_estPertinent` supprimé (devenu mort, sa logique vit dans `executer` après la révision pré-(c) sur la sémantique d'absence). Commit 2 (`83d3bd2`) : `aDeleguerPour({niveau, probleme})` devient une façade **orthodoxe** — formule `{niveau:<complément du niveau courant>, tags:[ctx.probleme]}` (union OR intra-clause × intersection AND inter-clauses) et délègue à `executer`. **Doctrine traducteur posée à (c.1)** : *un traducteur formule, il ne post-filtre pas.* La variante orthodoxe (calcul du complément côté traducteur) a été retenue contre la façade simple à post-filtre, pour que (c.2) et (c.3) héritent de la même règle sans débat. Validation interactive Safari côté Lætitia : I1 du `journal-invariants-pre-c.md` vert pile poil — 1 reco *Taux d'avancement des jalons* (ICP, Fiable, SAFe) + 6 délégation (2 TACTIQUE + 4 OPÉRATIONNEL). **Tag `mvp-etape-c1-porte-probleme-migree` posé sur `83d3bd2`**. Avec ce commit, `CM.DiagnosticProbleme` n'accède plus directement à `CM.Referentiel` ni à `CM.IndicateursMeta` — seul `executer` les compose. La porte niveau (`CM.VuePorteNiveau`, gelée derrière 14) bénéficie automatiquement de la bascule via son appel à `CM.DiagnosticProbleme.recommander` ligne 7856 — à retester au moment de sa dégel. Prochaine étape : (c.2) porte *Par mon cadre*, sentinelle I2.

- **26/04/2026 — Étape (c.2) livrée. Porte *Par mon cadre* migrée.** Commit unique atomique (`894ab8a`) branchant `CM.DiagnosticCadre` sur `CM.RequeteMetriques.executer`. `recommander({cadre, niveau})` devient une façade orthodoxe — formule `{niveau:[ctx.niveau], cadres:[ctx.cadre]}` et délègue à `executer`. Tri par fiabilité conservé localement (cf. §10.3, doctrine héritée de (c.1)). **Pas d'analogue à `aDeleguerPour`** côté porte cadre : la sémantique tient en une seule formulation, donc 1 commit au lieu de 2. **Hors périmètre (c.2)** : `CM.IndicateursMeta.cadresProchesDe` (bloc *Cadres voisins dans le référentiel*) reste un calcul de proximité entre cadres, pas du filtrage de fiches métriques — il continue d'utiliser directement `CM.IndicateursMeta`. **Doctrine traducteur confirmée à (c.2)** : la formulation `cadres: [ctx.cadre]` matche `META[id].cadres` côté cœur, sémantique stricte (fiche sans entrée META exclue) — identique à l'ancien `cadresDe(ind.id).indexOf(ctx.cadre) !== -1`, donc iso-comportement strict. Validation interactive Safari côté Lætitia : I2 du `journal-invariants-pre-c.md` vert pile poil — 13 fiches DORA × Opérationnel, *Fréquence de déploiement* en tête (DORA, Performance DevOps, Fiable). Bloc *Cadres voisins* toujours présent en pied de résultats. **Tag `mvp-etape-c2-porte-cadre-migree` posé sur `894ab8a`**. Avec ce commit, `CM.DiagnosticCadre` n'accède plus directement à `CM.Referentiel` ni à `CM.IndicateursMeta.cadresDe` — seul `executer` filtre. Les passe-plats vers `CM.IndicateursMeta` (`infoCadre`, `famillesOrdonnees`, `cadresParFamille`, `cadresAVenirParFamille`) restent : ils servent la structure d'accordéon de l'étape 1, pas la sélection de fiches. Note workflow : un cycle de retry a été nécessaire sur le commit (`.git/index.lock` recréé entre rm côté ordi et `git commit` côté sandbox) — résolu en commitant via `-F /tmp/msg.txt` sans `git status` intermédiaire. Prochaine étape : **(c.3) porte *Par mon niveau*** — coordination avec 7.2a-code.3 à trancher (dégel avant ou pendant ?), sentinelle à concevoir (I6 actuellement en skip, candidat I7+ à créer).

- **26/04/2026 (suite) — Étape (c.3) livrée. Porte *Par mon niveau* migrée.** Commit unique atomique (`34366f3`) refondant `CM.VuePorteNiveau._etapeResultats`. Avant : deux appels `recommander` (porte problème + porte cadre) suivis d'une intersection manuelle locale par id, préservant l'ordre de `recoProbleme` (déjà trié par fiabilité). Après : un appel unique `CM.RequeteMetriques.executer({niveau:[canonDiag], tags:[problemeId], cadres:[cadreId]})` — composition AND inter-clauses native du moteur. **Premier triplet à trois axes du chantier** (c.1 et c.2 jouaient sur deux). Tri par fiabilité conservé localement via un helper privé `_rangFiabilite` (+ table `_RANG_FIABILITE`) ajouté au module `CM.VuePorteNiveau`, calque strict des helpers identiques dans `CM.DiagnosticProbleme` et `CM.DiagnosticCadre`. **Découverte de cadrage en ouverture (c.3)** : la question doctrinale annoncée en §7.2 du présent doc (« dégeler 7.2a-code.3 *avant* ou *pendant* (c.3) ? ») est devenue sans objet à la lecture du code — la porte niveau est en réalité fonctionnelle (étapes B.1 à C.3 de 7.2a-code.3 livrées), seule l'étape D « câblage tuile d'accueil » reste gelée derrière 14 et ne participe pas à la mécanique de filtrage. **Sentinelle dédiée I7** (Développeur × Flux & goulots × DORA) ajoutée au `journal-invariants-pre-c.md` (commit `c2240b3`) — capture pré-bascule = 7 fiches, top 3 documenté avec cadre + fiabilité. Validation interactive Safari côté Lætitia post-bascule : I7 strictement identique (7 fiches, *Fréquence de déploiement* → *Délai de livraison des changements* → *Durée de cycle*). **Tag `mvp-etape-c3-porte-niveau-migree` posé sur `34366f3`**. **Découverte de séance hors scope 14** : audit factuel pyramide vs accordéon Opérationnel a remonté une zone aveugle structurelle (4 TI + 6 Affaires de la pyramide → 0 rôle Affaires individuel, 2/4 domaines TI lacunaires). Section §18 du backlog ouverte avec question doctrinale α/β + axe de réflexion *case à cocher / étape supplémentaire dans le parcours des portes* (4 pistes inventoriées). Préalable à l'étape D de 7.2a-code.3. Avec ce commit, `CM.VuePorteNiveau` n'accède plus directement à `CM.Referentiel` ni à `CM.IndicateursMeta` — seul `executer` compose. Les passe-plats `problemeInfo`, `cadreInfo`, `niveauInfo` restent (métadonnées d'affichage, pas filtrage de fiches). Reste pour clore (c) : **(c.4) emplacement *Par ma maturité*** — porte stub, pas de migration code, juste s'assurer que l'emplacement architectural est propre ; puis tag global `mvp-etape-c-portes-migrees`.
- **26/04/2026 (suite, fin de séance) — Étape (c.4) livrée. Étape (c) globalement close.** (c.4) actée comme **acte de documentation** — la porte *Par ma maturité* est un stub d'accueil sans module dédié, l'emplacement est propre par construction. Trois pièces livrées dans un commit unique : (i) commentaire-balise architectural inséré dans `cadre-indicateurs.html` après `CM.VuePorteNiveau` (signal explicite au prochain qui scanne : patron à suivre, distinction porte prospective vs onglet *La maturité ?* réflexif) ; (ii) §c.4 du présent doc enrichi du contrat futur de `CM.VuePorteMaturite` (façade orthodoxe vers `executer`, filtre type pressenti `{niveau, maturiteMin}` à arbitrer panel-on-demand) ; (iii) `backlog.md` rafraîchi (État courant + §14 + Prochaine action). **Tag global `mvp-etape-c-portes-migrees` posé** sur ce commit — clôture de (c). Iso-comportement strict (rien d'exécutable n'est touché). Reste l'étape **(d) — nettoyage et documentation finale**.
- **26/04/2026 (suite, étape d.1) — Retrait du code mort `delegationPour` + `DELEGATION`.** Commit `f75be8b`. Méthode publique `CM.DiagnosticProbleme.delegationPour` exposée mais jamais appelée (0 usages externes), table interne `DELEGATION` qui ne servait qu'à elle. Retrait propre : 21 lignes supprimées, 2 ajoutées (ajustement du `return` et du commentaire d'en-tête). Iso-comportement strict — aucun appelant impacté.
- **26/04/2026 (suite, étape d.2) — Mutualisation `rangFiabilite` dans `CM.IndicateursMeta`.** Commit `18f7ab8`. Le helper `_rangFiabilite` + sa table `_RANG_FIABILITE` étaient dupliqués à l'identique dans `CM.DiagnosticProbleme`, `CM.DiagnosticCadre` et `CM.VuePorteNiveau` — duplication directement issue du calque strict appliqué en (c.1)/(c.2)/(c.3). Centralisation dans `CM.IndicateursMeta` (domaine sémantique : la fiabilité est une propriété des fiches indicateurs). Trois sites d'appel substitués par `CM.IndicateursMeta.rangFiabilite(...)`. Iso-comportement strict (signature, sémantique et défense identiques). 16 ajouts / 31 suppressions. Note de propreté consignée : variable locale `rangFiabilite` dans `CM.RequeteMetriques.executer` (~ligne 4125) reste sans conflit (scope distinct), homonyme à signaler éventuellement en passe éditoriale ultérieure.
- **26/04/2026 (suite, étape d.3) — §3.4 « Architecture livrée » ajoutée au présent doc.** Acte ce qui est vraiment en place après (a) → (d). Pointe les divergences mineures avec §3.1 (cible projetée à l'ouverture). Source de vérité de l'architecture livrée par le chantier 14.

- **30/04/2026 — Régularisation post-audit 1.ter — vocabulaire `cadres` aligné.** Le chantier 1.ter (audit légitimité des 10 cadres × 85 fiches, clos le 30/04/2026) a fait évoluer `CADRES{}` côté code dans `cadre-indicateurs.html` (~ligne 4061) sans propager au présent §10.3 ni à `VOCAB.cadres` (~ligne 4538). Trois ajouts (`cd`, `space`, `securite` lors du commit `662682a`, famille `risque-securite` créée), deux retraits (`bsc` lors du commit `e4be33c`, `mbo` lors du commit `0af6545` — tous deux déplacés vers `CADRES_A_VENIR` faute de marqueurs signature). Constat collatéral n°6 ouvert le 30/04 : un appel `CM.RequeteMetriques.executer({cadres:['securite']})` levait `Error("CM.RequeteMetriques: ... Vocabulaire admis : dora, lean, okr, scrum, kanban, safe, itil, generique.")`. Chemin de bug runtime activable en deux clics depuis la porte *Par mon cadre* sur les 3 tuiles `Sécurité / Continuous Delivery / SPACE` — soit ~27 % de la porte. **Doctrine enfreinte, doctrine restaurée** : §10.3 reste la source unique, les deux endroits du code (`CADRES{}` et `VOCAB.cadres`) doivent être propagés simultanément à toute évolution. Encart pédagogique : la prochaine évolution de cadre passe par §10.3 d'abord, puis dans le même commit (ou commit immédiatement suivant) par `VOCAB.cadres` et `CADRES{}`. Régularisation livrée en deux commits atomiques (1 doc, 1 code). Test d'invariant `VOCAB.cadres ↔ CADRES{}` (qui aurait détecté la divergence) consigné comme dette préventive dans `backlog.md`.
