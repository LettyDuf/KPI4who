# Contrats et architecture - vue Lexique (chantier 21)

Document compagnon du chantier 21. Version v0.1, cadrage (jalon A), posée le 24/05/2026.

Ce document est la reference du chantier. En cas d'ecart entre lui et le code,
soit le code est corrige, soit le document est amende par une decision tracee
au journal (section 9). v0.1 fixe le cadrage ; plusieurs points restent en
arbitrage ouvert (section 8) et seront verrouilles au fil des jalons.


## 0. Objet

La vue *Lexique* est la 8e entree du bandeau du haut. Elle est aujourd'hui un
stub orphelin (classe `stub`, `aria-disabled`, clic sans effet) aux lignes 2369
et 2473 de `cadre-indicateurs.html`. Ce document definit ce qui la remplacera :
un referentiel pedagogique des termes employes dans l'outil.

Le Lexique n'est pas un index. C'est une page-type a part entiere, qui enseigne
le vocabulaire du pilotage de la performance : cadres, indicateurs, concepts,
anti-patterns. Chaque entree porte une definition canonique, un exemple concret,
l'anti-pattern associe quand il existe, et des renvois vers les termes voisins.


## 1. Cadrage

### 1.1 Origine

Le 08/05/2026, lors de l'activation des stubs *Cascade* et *Maturite* du
bandeau, Laetitia demande la meme chose pour *Lexique*. Constat : aucune
`vue-lexique` n'existe. Decision : ne pas improviser une liste alphabetique,
ouvrir un chantier dedie. Le chantier est reste en backlog jusqu'au 24/05/2026,
date de son ouverture effective.

### 1.2 Ambition retenue : exhaustive

Seance du 24/05/2026. Trois ambitions etaient sur la table (miroir des fiches /
lexique cure / referentiel pedagogique). L'option **exhaustive, referentiel
pedagogique** est retenue. Consequence : chaque entree est enrichie (exemple,
anti-pattern lie, renvois croises) et la page recoit une incarnation visuelle
complete. Chantier d'ampleur, decoupe en 7 jalons (section 7).

### 1.3 Etat des lieux du terrain

`cadre-indicateurs.html` (11 276 lignes) contient environ 190 balises
`<span class="term-def" data-def="...">`, les mots soulignes a infobulle, pour
**142 libelles distincts**. Trois constats pesent sur le chantier :

- **24 libelles ont des definitions divergentes** d'une fiche a l'autre.
  *Effet Goodhart* est defini de 9 facons, *Gemba* de 6, *Deming* de 4. Une
  partie de ces divergences est volontaire (la fiche contextualise le terme a
  son propos), une autre est de la derive.
- Quelques entrees **ne sont pas des termes** mais des fragments de citation
  (par exemple « Drucker, dans Managing for Results »).
- Les definitions vont de 147 a 589 caracteres, redigees a des epoques et avec
  des rigueurs inegales.

Une extraction automatique brute produirait donc un lexique incoherent. Le
jalon B (audit editorial) traite ce terrain.

### 1.4 Arbitrages verrouilles le 24/05/2026

**Source de verite : « Source + garde-fou ».** Le Lexique devient la reference
editoriale. Les fiches conservent leur attribut `data-def` actuel. Une sentinelle
verifie la coherence et signale les divergences pour revue, sans les empecher.
Raison du choix : une partie des 24 divergences est volontaire ; une source
unique reinjectee dans les fiches ecraserait ces contextualisations. Le
garde-fou laisse vivre la contextualisation et rend la derive visible.

**Taxonomie : 4 categories, structure plate.** La structure de stockage et de
balayage est une liste plate, alphabetique : ajouter une entree est une ligne,
sans decision de rangement, et la recherche directe est immediate. La categorie
est un simple attribut sur chaque entree, pas une arborescence ; elle alimente
un filtre pour la lecture thematique. Quatre valeurs : `cadre`, `indicateur`,
`concept`, `anti-pattern`. Les auteurs (Deming, Drucker, Goldratt) ne sont pas
des entrees : ils se tissent dans les definitions de concept.


## 2. Modele de donnees d'une entree

Chaque entree du Lexique est un objet fige (`Object.freeze`, recursivement,
patron `CM.FicheQuestion`). Champs :

| Champ | Type | Obligatoire | Role |
|---|---|---|---|
| `id` | chaine kebab-case | oui | Identifiant technique, jamais affiche. Sert aux renvois et au deep-link. |
| `terme` | chaine | oui | Libelle affiche. |
| `categorie` | `cadre` \| `indicateur` \| `concept` \| `anti-pattern` | oui | Categorie unique. Alimente le filtre. |
| `definition` | tableau de paragraphes | oui | Definition canonique. La reference editoriale du terme. |
| `exemple` | chaine (un paragraphe) | recommande | Exemple concret, de preference dans un contexte IT, produit ou DevOps. |
| `antiPatternLie` | `id` | optionnel | Pour une entree `cadre`, `indicateur` ou `concept` : l'entree `anti-pattern` associee (le piege classique du terme). |
| `renvois` | tableau d'`id` | optionnel | Termes voisins a consulter. |
| `origine` | chaine | optionnel | Auteur ou cadre fondateur (Drucker, Goldratt, NIST...) quand la mention est eclairante. |
| `ficheRef` | `id` de fiche du referentiel | optionnel | Pour une entree `indicateur` dont l'indicateur a deja une fiche complete au referentiel : lien vers cette fiche. |
| `mentionneeDans` | derive | non redige | Liste des fiches qui soulignent ce terme. Calcule par le generateur en scannant les `term-def` du HTML, jamais saisi a la main. |

`definition` est un tableau de paragraphes (et non une chaine unique), comme
les champs `description` du module `CM.FicheQuestion` : le rendu aere la
matiere, la source reste lisible. Doctrine editoriale heritee du chantier 26 :
**l'entree explique le concept, elle ne se contente pas de le nommer**. Pas de
jargon non glose, conventions chiffrees explicitees.


## 3. Architecture

L'architecture est hexagonale : la matiere editoriale ne connait pas
l'affichage, le coeur applicatif ne connait pas le DOM, les adaptateurs portent
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

### 3.2 Couche 1 : la matiere - `lexique-source.md`

Fichier markdown a la racine du projet. Source unique de la matiere du Lexique.
Chaque entree est un bloc structure (format precis a fixer en jalon B : titre
de niveau 3 pour le terme, champs etiquetes pour categorie, definition,
exemple, anti-pattern lie, renvois, origine). Aucune edition manuelle des
donnees ne se fait ailleurs que dans ce fichier.

### 3.3 Couche 2 : l'adaptateur de construction - `outils/generer-lexique.js`

Script Node zero-dependance (`require('fs')` et `require('path')` seulement),
patron de `outils/generer-tags-thematiques.js`. Il :

1. lit et valide `lexique-source.md` ;
2. scanne `cadre-indicateurs.html` pour relever les libelles `term-def` et
   construire le champ derive `mentionneeDans` de chaque entree ;
3. emet le catalogue JS fige ;
4. le reinjecte dans la zone balisee de `cadre-indicateurs.html`.

Bornes de la zone, format exact des commentaires marqueurs (patron
`CM.TAGS-THEMATIQUES-DATA`) :

```
/* CM.LEXIQUE-DATA:BEGIN ... */
/* CM.LEXIQUE-DATA:END */
```

Le generateur exige un marqueur BEGIN et un marqueur END uniques, sinon il
echoue. Codes de sortie alignes sur le patron projet : 0 succes, 1 source mal
formee, 2 regle metier violee, 3 marqueurs absents ou mal apparies, 4 erreur
d'entree-sortie.

### 3.4 Couche 3 : la zone balisee `CM.LEXIQUE-DATA`

Bloc de donnees JS dans `cadre-indicateurs.html`, encadre par les marqueurs
ci-dessus. Genere, jamais edite a la main. C'est la frontiere entre le
build-time et le runtime.

### 3.5 Couche 4 : le coeur - `CM.Lexique`

Module IIFE, patron `CM.FicheQuestion`, encadre par
`/* == CM.Lexique - BEGIN == */` et `/* == CM.Lexique - END == */`. CSS du
composant dans un `<style>` distinct adjacent. Trois parties :

- **Donnees** : `var LEXIQUE = Object.freeze({...})`, alimentees par la zone
  balisee.
- **Logique pure** : recherche plein texte, filtrage par categorie, tri
  alphabetique, resolution des renvois. Aucun acces DOM.
- **Rendu pur** : fonctions qui renvoient des chaines HTML (entree detaillee,
  liste, resultats de recherche). Aucun acces DOM.

API publique exposee par le `return {...}` du module : a minima `lister`,
`obtenir`, `rechercher`, `filtrerParCategorie`, `htmlEntree`, `htmlListe`.

### 3.6 Couche 5 : l'adaptateur de sortie - `CM.VueLexique`

Module IIFE orchestrateur, patron `CM.VueFicheQuestion`. Il tient l'etat UI
(terme de recherche courant, categorie filtree, entree ouverte), ecoute les
evenements (`hashchange`, clics, saisie dans le champ de recherche), et injecte
le HTML produit par `CM.Lexique` dans son conteneur DOM. Monte par un `init()`
appele apres `DOMContentLoaded`.

Conteneur DOM : une `<section id="vue-lexique" ... hidden>` ajoutee au HTML,
patron de `<section id="vue-fiche-question">`.

Routage : le projet n'a pas de table de routes centrale ; chaque vue pose son
propre couple `hashchange` + expression reguliere. Le Lexique ajoute le sien
(format d'URL en arbitrage, section 8).

Activation du bandeau : retirer `class="stub"` et `aria-disabled` des deux
entrees `data-entree="lexique"` (lignes 2369 et 2473), remplacer leur `onclick`
par l'ouverture de la vue. L'etat actif est gere par `marquerEntreeBandeau`.

### 3.7 Le garde-fou - `outils/verifier-invariants-lexique.js`

Sentinelle Node zero-dependance, patron de
`outils/verifier-invariants-fiche-question.js`. Hors du flux runtime, lancee a
la demande et en fin de jalon. Voir section 5.


## 4. Taxonomie et navigation

### 4.1 Les quatre categories

- **`cadre`** : cadres et methodes. Balanced Scorecard, ADKAR, COSO ERM, Flow
  Framework, NIST CSF, MBO...
- **`indicateur`** : indicateurs et metriques. FCR, CES, Flow Metrics, lead
  time, COPQ...
- **`concept`** : concepts et notions. Gemba, zone neutre, cygne noir, loi de
  Little...
- **`anti-pattern`** : anti-patterns et pieges de mesure. Effet Goodhart,
  optimisation locale, scoring individuel, deploy theater...

La categorie `anti-pattern` est distincte a dessein : le backlog reclamait un
« lexique central des anti-patterns », leur valeur pedagogique le justifie. Les
entrees `anti-pattern` conservent le double signal visuel du projet (`term-def`
violet plus surlignage ambre) la ou elles apparaissent dans les fiches.

### 4.2 Navigation de la page

- Liste alphabetique unique, tous termes confondus, comme ossature.
- Champ de recherche en tete : filtre plein texte sur le terme et la definition.
- Filtre par categorie : reduit la liste a une categorie.
- Chaque entree affiche, quand ils existent, son anti-pattern lie, ses renvois,
  et des liens retour vers les fiches qui mentionnent le terme (`mentionneeDans`).


## 5. La sentinelle de coherence

`outils/verifier-invariants-lexique.js` porte deux niveaux de controle,
conformement a l'arbitrage « Source + garde-fou » et a la doctrine projet
« sentinelle rouge = signal d'evolution, pas bug ».

**Niveau dur (invariants, sortie 1 si viole) :**

- I1 : tout libelle `term-def` present dans `cadre-indicateurs.html` a une
  entree correspondante au Lexique (comparaison normalisee sur la casse et les
  accents). Aucun mot souligne orphelin.
- I2 : les `id` du Lexique sont uniques.
- I3 : chaque `categorie` appartient aux quatre valeurs admises.
- I4 : chaque `renvois`, `antiPatternLie` et `ficheRef` pointe vers un `id`
  existant (entree du Lexique, ou fiche du referentiel pour `ficheRef`).
- I5 : `antiPatternLie` pointe bien vers une entree de categorie `anti-pattern`.

**Niveau souple (rapport de revue, sortie 0, affiche) :**

- Pour chaque `term-def` dont le `data-def` diverge de la `definition`
  canonique du Lexique, la sentinelle liste la divergence. C'est un rapport de
  revue, pas un echec : il signale ou la contextualisation d'une fiche s'ecarte
  de la reference, a la personne qui decidera si l'ecart est voulu.

Codes de sortie : 0 coherent, 1 invariant dur viole, 2 erreur d'extraction ou
d'entree-sortie.


## 6. Doctrine visuelle

La section 6 de `doc-cadre-visuel.md` (incarnation des pages-types, etape B)
**place explicitement le lexique hors de son perimetre** (section 6.4 :
« laisse au refactoring opportuniste »). Le chantier 21 leve cette mise de
cote : son jalon F ouvre l'incarnation visuelle du Lexique, l'« etape B3 »
annoncee de longue date au backlog.

Contraintes connues a ce stade : la grammaire commune de la section 6.0
(icones SVG line monochromes, jamais d'emoji ; citation patrimoniale en pied ;
grille et typographie communes) s'applique. En revanche le fond « papier creme
commun » de la section 6.0 a ete partiellement rendu caduc par le chantier 23
(bascule sur le degrade `--page-bg`) : ce point sera reconcilie au jalon F. Le
traitement visuel precis (matiere en blanc franc, ou cadre blanc intermediaire)
est un arbitrage ouvert, a trancher sur mockup-preview au jalon F.


## 7. Plan de jalons

| Jalon | Mandat | Etat |
|---|---|---|
| **A** | Cadrage. Ouverture au backlog, ce document compagnon v0.1. | en cours |
| **B** | Audit et source editoriale. Extraire les `term-def`, resoudre les 24 divergences, ecarter les non-termes, classer en 4 categories, rediger `lexique-source.md`. Decoupe par categorie (B.1 a B.4). Le jalon le plus lourd. | a faire |
| **C** | Enrichissement. Par entree : exemple concret, anti-pattern lie, renvois croises. Peut se mener categorie par categorie dans la foulee de B. | a faire |
| **D** | Generateur et integration. `outils/generer-lexique.js`, zone balisee `CM.LEXIQUE-DATA`, derivation automatique de `mentionneeDans`. | a faire |
| **E** | Module et vue. `CM.Lexique` (logique et rendu purs), `CM.VueLexique` (orchestrateur, recherche, filtres, routage hash), activation du stub du bandeau sur les deux bandeaux. | a faire |
| **F** | Incarnation visuelle, etape B3. Mockup-preview, arbitrage du traitement visuel, mise a jour de `doc-cadre-visuel.md`. | a faire |
| **G** | Sentinelle et tests. `outils/verifier-invariants-lexique.js`, harnais de tests, scenario de non-regression, smoke test interactif. | a faire |

Estimation grossiere : 25 a 35 heures sur 7 a 10 seances. A affiner apres le
jalon B, qui revelera le volume editorial reel.

Ordre des couches : la matiere (B, C) avant l'outillage (D), l'outillage avant
le module (E), le module avant son habillage (F), les tests en cloture (G). Pas
de big-bang : chaque jalon est livrable et verifiable seul.


## 8. Arbitrages ouverts

A trancher au fil des jalons, puis verrouilles ici.

1. **Format d'URL.** Proposition : `#lexique` pour la page, et un deep-link par
   terme `#lexique=<id>` pour permettre aux fiches de pointer vers une entree
   precise. A confirmer au jalon E.
2. **Categorie `indicateur` et doublon avec le referentiel.** Certains termes
   `indicateur` ont deja une fiche complete parmi les 104 fiches du referentiel.
   Proposition : une entree `indicateur` adossee a une fiche existante se limite
   a une glose courte plus le `ficheRef` ; le Lexique ne reexplique pas ce que
   le referentiel detaille. A confirmer au jalon B.
3. **Format de l'exemple.** Proposition : un seul exemple court par entree, et
   non un double exemple entreprise / equipe systematique, trop lourd sur ~130
   entrees. A confirmer au jalon C.
4. **Traitement visuel.** Matiere en blanc franc, ou cadre blanc intermediaire.
   Defere au mockup-preview du jalon F.
5. **Perimetre exact.** 142 libelles, moins les non-termes, plus d'eventuelles
   fusions. Volume estime entre 120 et 130 entrees. A figer au jalon B.


## 9. Journal du document

- **v0.1, 24/05/2026.** Creation, jalon A. Cadrage du chantier 21 : ambition
  exhaustive, arbitrages « Source + garde-fou » et « 4 categories plates »
  verrouilles, architecture hexagonale en 5 couches posee, modele de donnees
  d'une entree, sentinelle a deux niveaux, plan de jalons A-G.
