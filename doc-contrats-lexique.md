# Contrats et architecture - vue Lexique (chantier 21)

Document compagnon du chantier 21. Version v0.2, posée le 24/05/2026 (cadrage du
jalon A, affinée après le jalon B.0).

Ce document est la référence du chantier. En cas d'écart entre lui et le code,
soit le code est corrigé, soit le document est amendé par une décision tracée
au journal (section 9). Plusieurs points restent en arbitrage ouvert (section 8)
et seront verrouillés au fil des jalons.


## 0. Objet

La vue *Lexique* est la 8e entrée du bandeau du haut. Elle est aujourd'hui un
stub orphelin (classe `stub`, `aria-disabled`, clic sans effet) aux lignes 2369
et 2473 de `cadre-indicateurs.html`. Ce document définit ce qui la remplacera :
un référentiel pédagogique des termes employés dans l'outil.

Le Lexique n'est pas un index. C'est une page-type à part entière, qui enseigne
le vocabulaire du pilotage de la performance : cadres, indicateurs, concepts,
anti-patterns, auteurs et figures. Chaque entrée porte une définition canonique,
un exemple concret, l'anti-pattern associé quand il existe, et des renvois vers
les termes voisins.


## 1. Cadrage

### 1.1 Origine

Le 08/05/2026, lors de l'activation des stubs *Cascade* et *Maturité* du
bandeau, Lætitia demande la même chose pour *Lexique*. Constat : aucune
`vue-lexique` n'existe. Décision : ne pas improviser une liste alphabétique,
ouvrir un chantier dédié. Le chantier est resté en backlog jusqu'au 24/05/2026,
date de son ouverture effective.

### 1.2 Ambition retenue : exhaustive

Séance du 24/05/2026. Trois ambitions étaient sur la table (miroir des fiches /
lexique curé / référentiel pédagogique). L'option **exhaustive, référentiel
pédagogique** est retenue. Conséquence : chaque entrée est enrichie (exemple,
anti-pattern lié, renvois croisés) et la page reçoit une incarnation visuelle
complète. Chantier d'ampleur, découpé en 7 jalons (section 7).

### 1.3 État des lieux du terrain

`cadre-indicateurs.html` (11 276 lignes) contient environ 190 balises
`<span class="term-def" data-def="...">`, les mots soulignés à infobulle, pour
**142 libellés distincts**. Trois constats pèsent sur le chantier :

- **24 libellés ont des définitions divergentes** d'une fiche à l'autre.
  *Effet Goodhart* est défini de 9 façons, *Gemba* de 6, *Deming* de 4. Une
  partie de ces divergences est volontaire (la fiche contextualise le terme à
  son propos), une autre est de la dérive.
- Quelques entrées **ne sont pas des termes** mais des fragments de citation
  (par exemple « Drucker, dans Managing for Results »).
- Les définitions vont de 147 à 589 caractères, rédigées à des époques et avec
  des rigueurs inégales.

Une extraction automatique brute produirait donc un lexique incohérent. Le
jalon B (audit éditorial) traite ce terrain.

### 1.4 Arbitrages verrouillés

**Source de vérité : « Source + garde-fou »** (24/05/2026). Le Lexique devient
la référence éditoriale. Les fiches conservent leur attribut `data-def` actuel.
Une sentinelle vérifie la cohérence et signale les divergences pour revue, sans
les empêcher. Raison du choix : une partie des 24 divergences est volontaire ;
une source unique réinjectée dans les fiches écraserait ces contextualisations.
Le garde-fou laisse vivre la contextualisation et rend la dérive visible.

**Taxonomie : 5 catégories, structure plate** (24/05/2026). La structure de
stockage et de balayage est une liste plate, alphabétique : ajouter une entrée
est une ligne, sans décision de rangement, et la recherche directe est
immédiate. La catégorie est un simple attribut sur chaque entrée, pas une
arborescence ; elle alimente un filtre pour la lecture thématique. Cinq
valeurs : `cadre`, `indicateur`, `concept`, `anti-pattern`, `auteur`.

La catégorie `auteur` a été ajoutée le 24/05/2026 après le jalon B.0 (voir
journal, section 9). Le cadrage initial excluait les auteurs. L'examen du
contenu réel des infobulles d'auteurs a montré qu'elles portent une leçon
pédagogique substantielle, pas une notice biographique : elles méritent une
entrée. Une entrée `auteur` porte donc l'apport de la figure, pas sa biographie.


## 2. Modèle de données d'une entrée

Chaque entrée du Lexique est un objet figé (`Object.freeze`, récursivement,
patron `CM.FicheQuestion`). Champs :

| Champ | Type | Obligatoire | Rôle |
|---|---|---|---|
| `id` | chaîne kebab-case | oui | Identifiant technique, jamais affiché. Sert aux renvois et au deep-link. |
| `terme` | chaîne | oui | Libellé affiché. |
| `categorie` | `cadre` \| `indicateur` \| `concept` \| `anti-pattern` \| `auteur` | oui | Catégorie unique. Alimente le filtre. |
| `definition` | tableau de paragraphes | oui | Définition canonique. La référence éditoriale du terme. Pour une entrée `auteur`, porte l'apport de la figure. |
| `exemple` | chaîne (un paragraphe) | recommandé | Exemple concret, de préférence dans un contexte IT, produit ou DevOps. |
| `antiPatternLie` | `id` | optionnel | Pour une entrée `cadre`, `indicateur` ou `concept` : l'entrée `anti-pattern` associée (le piège classique du terme). |
| `renvois` | tableau d'`id` | optionnel | Termes voisins à consulter. |
| `origine` | chaîne | optionnel | Auteur ou cadre fondateur (Drucker, Goldratt, NIST...) quand la mention est éclairante. |
| `ficheRef` | `id` de fiche du référentiel | optionnel | Pour une entrée `indicateur` dont l'indicateur a déjà une fiche complète au référentiel : lien vers cette fiche. |
| `mentionneeDans` | dérivé | non rédigé | Liste des fiches qui soulignent ce terme. Calculé par le générateur en scannant les `term-def` du HTML, jamais saisi à la main. |

`definition` est un tableau de paragraphes (et non une chaîne unique), comme
les champs `description` du module `CM.FicheQuestion` : le rendu aère la
matière, la source reste lisible. Doctrine éditoriale héritée du chantier 26 :
**l'entrée explique le concept, elle ne se contente pas de le nommer**. Pas de
jargon non glosé, conventions chiffrées explicitées.


## 3. Architecture

L'architecture est hexagonale : la matière éditoriale ne connaît pas
l'affichage, le cœur applicatif ne connaît pas le DOM, les adaptateurs portent
les effets de bord. Cinq couches.

### 3.1 Vue d'ensemble

```
  lexique-source.md            (1) matiere editoriale, source de verite
        |
        v
  outils/generer-lexique.js    (2) adaptateur de construction (build-time)
        |
        v
  zone balisee CM.LEXIQUE-DATA (3) donnees JS injectees dans le HTML
        |
        v
  CM.Lexique                   (4) coeur : donnees figees + logique + rendu purs
        |
        v
  CM.VueLexique                (5) adaptateur de sortie : DOM, hash, recherche

  outils/verifier-invariants-lexique.js   garde-fou, hors du flux runtime
```

### 3.2 Couche 1 : la matière - `lexique-source.md`

Fichier markdown à la racine du projet. Source unique de la matière du Lexique.
Le format d'une entrée est arrêté au jalon B.1 : un titre de niveau deux portant
l'`id`, puis des champs en marqueurs gras (`**terme**`, `**categorie**`,
`**definition**`, `**exemple**`, `**renvois**`, `**origine**`). La valeur de
`definition` et `exemple` peut courir sur plusieurs paragraphes. Aucune édition
manuelle des données ne se fait ailleurs que dans ce fichier.

### 3.3 Couche 2 : l'adaptateur de construction - `outils/generer-lexique.js`

Script Node zéro-dépendance (`require('fs')` et `require('path')` seulement),
patron de `outils/generer-tags-thematiques.js`. Il :

1. lit et valide `lexique-source.md` ;
2. scanne `cadre-indicateurs.html` pour relever les libellés `term-def` et
   construire le champ dérivé `mentionneeDans` de chaque entrée ;
3. émet le catalogue JS figé ;
4. le réinjecte dans la zone balisée de `cadre-indicateurs.html`.

Bornes de la zone, format exact des commentaires marqueurs (patron
`CM.TAGS-THEMATIQUES-DATA`) :

```
/* CM.LEXIQUE-DATA:BEGIN ... */
/* CM.LEXIQUE-DATA:END */
```

Le générateur exige un marqueur BEGIN et un marqueur END uniques, sinon il
échoue. Codes de sortie alignés sur le patron projet : 0 succès, 1 source mal
formée, 2 règle métier violée, 3 marqueurs absents ou mal appariés, 4 erreur
d'entrée-sortie.

### 3.4 Couche 3 : la zone balisée `CM.LEXIQUE-DATA`

Bloc de données JS dans `cadre-indicateurs.html`, encadré par les marqueurs
ci-dessus. Généré, jamais édité à la main. C'est la frontière entre le
build-time et le runtime.

### 3.5 Couche 4 : le cœur - `CM.Lexique`

Module IIFE, patron `CM.FicheQuestion`, encadré par
`/* == CM.Lexique - BEGIN == */` et `/* == CM.Lexique - END == */`. CSS du
composant dans un `<style>` distinct adjacent. Trois parties :

- **Données** : `var LEXIQUE = Object.freeze({...})`, alimentées par la zone
  balisée.
- **Logique pure** : recherche plein texte, filtrage par catégorie, tri
  alphabétique, résolution des renvois. Aucun accès DOM.
- **Rendu pur** : fonctions qui renvoient des chaînes HTML (entrée détaillée,
  liste, résultats de recherche). Aucun accès DOM.

API publique exposée par le `return {...}` du module : a minima `lister`,
`obtenir`, `rechercher`, `filtrerParCategorie`, `htmlEntree`, `htmlListe`.

### 3.6 Couche 5 : l'adaptateur de sortie - `CM.VueLexique`

Module IIFE orchestrateur, patron `CM.VueFicheQuestion`. Il tient l'état UI
(terme de recherche courant, catégorie filtrée, entrée ouverte), écoute les
événements (`hashchange`, clics, saisie dans le champ de recherche), et injecte
le HTML produit par `CM.Lexique` dans son conteneur DOM. Monté par un `init()`
appelé après `DOMContentLoaded`.

Conteneur DOM : une `<section id="vue-lexique" ... hidden>` ajoutée au HTML,
patron de `<section id="vue-fiche-question">`.

Routage : le projet n'a pas de table de routes centrale ; chaque vue pose son
propre couple `hashchange` + expression régulière. Le Lexique ajoute le sien
(format d'URL en arbitrage, section 8).

Activation du bandeau : retirer `class="stub"` et `aria-disabled` des deux
entrées `data-entree="lexique"` (lignes 2369 et 2473), remplacer leur `onclick`
par l'ouverture de la vue. L'état actif est géré par `marquerEntreeBandeau`.

### 3.7 Le garde-fou - `outils/verifier-invariants-lexique.js`

Sentinelle Node zéro-dépendance, patron de
`outils/verifier-invariants-fiche-question.js`. Hors du flux runtime, lancée à
la demande et en fin de jalon. Voir section 5.


## 4. Taxonomie et navigation

### 4.1 Les cinq catégories

- **`cadre`** : cadres et méthodes. Balanced Scorecard, ADKAR, COSO ERM, Flow
  Framework, NIST CSF, MBO...
- **`indicateur`** : indicateurs et métriques. FCR, CES, Flow Metrics, lead
  time, COPQ...
- **`concept`** : concepts et notions. Gemba, zone neutre, cygne noir, loi de
  Little...
- **`anti-pattern`** : anti-patterns et pièges de mesure. Effet Goodhart,
  optimisation locale, scoring individuel, deploy theater...
- **`auteur`** : auteurs et figures fondatrices. Deming, Drucker, Flyvbjerg,
  Lencioni... Une entrée `auteur` porte l'apport de la figure (sa leçon),
  pas une notice biographique.

La catégorie `anti-pattern` est distincte à dessein : le backlog réclamait un
« lexique central des anti-patterns », leur valeur pédagogique le justifie. Les
entrées `anti-pattern` conservent le double signal visuel du projet (`term-def`
violet plus surlignage ambré) là où elles apparaissent dans les fiches.

La catégorie `auteur` est bornée au jalon B : seuls les auteurs déjà porteurs
d'une balise `term-def` reçoivent une entrée (8 figures). Ouvrir une entrée
pour tout auteur cité ailleurs serait un enrichissement ultérieur.

### 4.2 Navigation de la page

- Liste alphabétique unique, tous termes confondus, comme ossature.
- Champ de recherche en tête : filtre plein texte sur le terme et la définition.
- Filtre par catégorie : réduit la liste à une catégorie.
- Chaque entrée affiche, quand ils existent, son anti-pattern lié, ses renvois,
  et des liens retour vers les fiches qui mentionnent le terme (`mentionneeDans`).


## 5. La sentinelle de cohérence

`outils/verifier-invariants-lexique.js` porte deux niveaux de contrôle,
conformément à l'arbitrage « Source + garde-fou » et à la doctrine projet
« sentinelle rouge = signal d'évolution, pas bug ».

**Niveau dur (invariants, sortie 1 si violé) :**

- I1 : tout libellé `term-def` présent dans `cadre-indicateurs.html` a une
  entrée correspondante au Lexique (comparaison normalisée sur la casse et les
  accents). Aucun mot souligné orphelin.
- I2 : les `id` du Lexique sont uniques.
- I3 : chaque `categorie` appartient aux cinq valeurs admises.
- I4 : chaque `renvois`, `antiPatternLie` et `ficheRef` pointe vers un `id`
  existant (entrée du Lexique, ou fiche du référentiel pour `ficheRef`).
- I5 : `antiPatternLie` pointe bien vers une entrée de catégorie `anti-pattern`.

**Niveau souple (rapport de revue, sortie 0, affiché) :**

- Pour chaque `term-def` dont le `data-def` diverge de la `definition`
  canonique du Lexique, la sentinelle liste la divergence. C'est un rapport de
  revue, pas un échec : il signale où la contextualisation d'une fiche s'écarte
  de la référence, à la personne qui décidera si l'écart est voulu.

Codes de sortie : 0 cohérent, 1 invariant dur violé, 2 erreur d'extraction ou
d'entrée-sortie.


## 6. Doctrine visuelle

La section 6 de `doc-cadre-visuel.md` (incarnation des pages-types, étape B)
**place explicitement le lexique hors de son périmètre** (section 6.4 :
« laissé au refactoring opportuniste »). Le chantier 21 lève cette mise de
côté : son jalon F ouvre l'incarnation visuelle du Lexique, l'« étape B3 »
annoncée de longue date au backlog.

Contraintes connues à ce stade : la grammaire commune de la section 6.0
(icônes SVG line monochromes, jamais d'emoji ; citation patrimoniale en pied ;
grille et typographie communes) s'applique. En revanche le fond « papier crème
commun » de la section 6.0 a été partiellement rendu caduc par le chantier 23
(bascule sur le dégradé `--page-bg`) : ce point sera réconcilié au jalon F. Le
traitement visuel précis (matière en blanc franc, ou cadre blanc intermédiaire)
est un arbitrage ouvert, à trancher sur mockup-preview au jalon F.


## 7. Plan de jalons

| Jalon | Mandat | État |
|---|---|---|
| **A** | Cadrage. Ouverture au backlog, ce document compagnon. | livré le 24/05/2026 |
| **B** | Audit et source éditoriale. Extraire les `term-def`, résoudre les 24 divergences, écarter les non-termes, classer en 5 catégories, rédiger `lexique-source.md`. Sous-jalon B.0 (inventaire) puis B.1 à B.5 (rédaction par catégorie). Le jalon le plus lourd. | en cours, B.0 livré le 24/05/2026 |
| **C** | Enrichissement. Par entrée : exemple concret, anti-pattern lié, renvois croisés. Peut se mener catégorie par catégorie dans la foulée de B. | à faire |
| **D** | Générateur et intégration. `outils/generer-lexique.js`, zone balisée `CM.LEXIQUE-DATA`, dérivation automatique de `mentionneeDans`. | à faire |
| **E** | Module et vue. `CM.Lexique` (logique et rendu purs), `CM.VueLexique` (orchestrateur, recherche, filtres, routage hash), activation du stub du bandeau sur les deux bandeaux. | à faire |
| **F** | Incarnation visuelle, étape B3. Mockup-preview, arbitrage du traitement visuel, mise à jour de `doc-cadre-visuel.md`. | à faire |
| **G** | Sentinelle et tests. `outils/verifier-invariants-lexique.js`, harnais de tests, scénario de non-régression, smoke test interactif. | à faire |

Estimation grossière : 25 à 35 heures sur 7 à 10 séances. À affiner après le
jalon B, qui révélera le volume éditorial réel.

Ordre des couches : la matière (B, C) avant l'outillage (D), l'outillage avant
le module (E), le module avant son habillage (F), les tests en clôture (G). Pas
de big-bang : chaque jalon est livrable et vérifiable seul.


## 8. Arbitrages ouverts

À trancher au fil des jalons, puis verrouillés ici.

1. **Format d'URL.** Proposition : `#lexique` pour la page, et un deep-link par
   terme `#lexique=<id>` pour permettre aux fiches de pointer vers une entrée
   précise. À confirmer au jalon E.
2. **Catégorie `indicateur` et doublon avec le référentiel.** Certains termes
   `indicateur` ont déjà une fiche complète parmi les 104 fiches du référentiel.
   Proposition : une entrée `indicateur` adossée à une fiche existante se limite
   à une glose courte plus le `ficheRef` ; le Lexique ne réexplique pas ce que
   le référentiel détaille. À confirmer au jalon B.
3. **Format de l'exemple.** Proposition : un seul exemple court par entrée, et
   non un double exemple entreprise / équipe systématique, trop lourd sur ~130
   entrées. À confirmer au jalon C.
4. **Traitement visuel.** Matière en blanc franc, ou cadre blanc intermédiaire.
   Déféré au mockup-preview du jalon F.
5. **Périmètre exact.** 142 libellés, moins les fusions. Volume estimé autour de
   134 entrées, dont 8 entrées `auteur`. À figer au jalon B.


## 9. Journal du document

- **v0.1, 24/05/2026.** Création, jalon A. Cadrage du chantier 21 : ambition
  exhaustive, arbitrages « Source + garde-fou » et « 4 catégories plates »
  verrouillés, architecture hexagonale en 5 couches posée, modèle de données
  d'une entrée, sentinelle à deux niveaux, plan de jalons A-G.
- **v0.2, 24/05/2026.** Après le jalon B.0 (inventaire des 142 libellés).
  L'examen du contenu réel des infobulles d'auteurs a montré qu'elles portent
  une leçon pédagogique, pas une notice biographique. Décision de Lætitia :
  donner une fiche à chaque auteur. La taxonomie passe de 4 à 5 catégories,
  ajout de `auteur` (8 entrées, bornées aux auteurs déjà porteurs d'un
  `term-def`). Sections 0, 1.4, 2, 4.1, 5 (I3), 7, 8 actualisées. La rédaction
  par catégorie passe de B.1-B.4 à B.1-B.5.
