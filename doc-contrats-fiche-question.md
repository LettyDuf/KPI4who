# Document compagnon — Chantier 26
# Contrat de données et API du module `CM.FicheQuestion`

*Version v0.1 — ouvert le 16/05/2026 (séance d'ouverture chantier 26, jalon A).*

> **Statut.** Document de cadrage du jalon A. Sert de référence pour la conception du module et de la donnée. Le code à produire lors du jalon B s'y conforme — pas l'inverse. Toute évolution doctrinale passe d'abord par ce document. Cohérent avec la mémoire `project_document_compagnon_contrats.md`.

---

## 0. Pourquoi ce document

Le chantier 26 fait basculer les 5 fiches-questions terrain depuis des mockups HTML autonomes (doctrine 07/05/2026) vers une architecture intégrée à `cadre-indicateurs.html`. Cette bascule demande de figer **avant le code** : (a) un schéma de données unifié décrivant ce qu'est une fiche-question, (b) une API publique pour le module domaine `CM.FicheQuestion`, (c) les conventions visuelles applicables. Le code du jalon B sera produit pour respecter ce contrat.

Ce document ne décrit pas la matière éditoriale (les ~36 cellules à rédiger) — il décrit la **forme** dans laquelle cette matière vivra une fois intégrée. La matière elle-même est extraite des mockups existants et rédigée au jalon C.

---

## 1. Périmètre

**Dans le périmètre.**

- Schéma de données pour les 3 variantes de fiche-question identifiées dans `doc-catalogue-questions-fines.md` : § 4.2/§ 4.4 (standard, trio par niveau), § 4.3 (à reformulation, double réponse), § 4.6 (méta, trio à 3 axes invariants).
- API du module `CM.FicheQuestion` (port domaine + adapter vue + générateur de données).
- Plan de migration des 5 fiches existantes.
- Conventions visuelles applicables (renvoi vers `doc-cadre-visuel.md` § 6.0 et § 6.5).

**Hors périmètre.**

- Aucune nouvelle fiche-question. MVP fermé à 5 fiches.
- Pas de mécanique d'ajout au panier *visible* dans le chantier 26. **Mais point d'extension prévu** dans le contrat (cf. § 4 — paramètre `optionsRendu.avecActionsPanier` désactivé par défaut, branchable plus tard sans modifier le module domaine).
- Pas de refonte du moteur de filtrage ni du référentiel.

---

## 2. Cartographie des 5 fiches existantes

| Fiche | Variante doctrinale | Q1 (options) | Q2 (options) | Cellules de matière |
|---|---|---|---|---|
| pastèque | § 4.6 méta | 3 signaux | 3 niveaux | 9 cellules (3 axes × 3 niveaux) |
| amélioration-continue | § 4.4 standard | 5 symptômes | 3 niveaux | 9 cellules (3 cards × 3 niveaux) |
| résistance-transformation | § 4.4 standard | 5 phases ADKAR | 3 niveaux | 9 cellules (3 cards × 3 niveaux) |
| cascade-objectifs | § 4.4 standard | 5 ruptures | 3 niveaux | 9 cellules (3 cards × 3 niveaux) |
| pilotage-hebdo | § 4.3 reformulation | n/a | n/a | 0 cellule — 2 colonnes statiques |

**Total : ~36 cellules à rédiger** (réparties sur 4 fiches actives ; pilotage-hebdo n'a pas de mécanique Q1×Q2). Certaines cellules sont déjà écrites dans les mockups actuels — chaque mockup a au moins un croisement gelé. L'inventaire fin des cellules manquantes se fait fiche par fiche au jalon C.

**Implication.** Sur les 5 fiches, **4 reçoivent une mécanique d'activation** au sens du mandat du 16/05/2026 ; **1 reçoit uniquement l'harmonisation visuelle** (pilotage-hebdo, § 4.3, dont la mécanique est déjà active — colonne cliquable, libellé de destination en pied, raccourci vers porte).

---

## 3. Schéma de données unifié

### 3.1 Conventions communes

Une fiche-question est décrite par un **objet JavaScript figé** (`Object.freeze`) avec les clés suivantes, communes à toutes les variantes :

```js
{
  id:            'pasteque' | 'pilotage-hebdo' | 'amelioration-continue' | ...,
  variante:      '§4.2-§4.4' | '§4.3' | '§4.6',
  question:      'libellé visiteur, en langage métier',
  bandeauAttente: 'annonce courte du parcours',
  panel:         'Coach Lean' | 'Coach Agile' | ... ,
  ecoles:        ['Toyota Way', 'TOC', ...],
  citationPied:  'phrase canonique du pied de fiche',
  blocs:         { ... } // variantes selon § 3.2 / § 3.3 / § 3.4
}
```

Le format source de référence est **JavaScript figé** (pas JSON) pour deux raisons : (a) cohérence avec `CM.Referentiel` et `CM.IndicateursMeta` qui sont déjà des objets gelés dans le code, (b) commentaires inline possibles, plus lisibles à la relecture éditoriale qu'un JSON. Un générateur Node.js (`outils/construire-fiches-questions.js`, patron éprouvé) peut produire la zone balisée du HTML à partir d'une source markdown si la rédaction éditoriale le demande au jalon C.

### 3.2 Variante standard § 4.2/§ 4.4 — trio par niveau

```js
{
  ...communs,
  variante: '§4.2-§4.4',
  blocs: {
    q1: {
      libelle: 'D\'où vient le besoin ?',
      orientation: 'symptome',
      options: [
        { id: 'goulot', libelle: 'Une étape goulot connue', cardEnTete: 'throughput' },
        { id: 'defauts', libelle: 'Des défauts qui se répètent', cardEnTete: 'firstPassYield' },
        ...
      ]
    },
    q2: {
      libelle: 'Où agir ?',
      orientation: 'perimetre',
      options: [
        { id: 'equipe', libelle: 'Une équipe pilote', niveau: 'equipe' },
        { id: 'programme', libelle: 'Un programme entier', niveau: 'programme' },
        { id: 'organisation', libelle: 'Toute l\'organisation', niveau: 'strategique' }
      ]
    },
    trios: {
      equipe: [
        { id: 'leadTime',       niveau: 'equipe', intention: 'paragraphe rédigé pour la triangulation', ficheRef: 'o3' },
        { id: 'firstPassYield', niveau: 'equipe', intention: '...', ficheRef: 'lss-1' },
        { id: 'throughput',     niveau: 'equipe', intention: '...', ficheRef: 'o4' }
      ],
      programme: [ ... 3 cards ... ],
      strategique: [ ... 3 cards ... ]
    },
    liensSortantsParNiveau: {
      equipe:      { fiche: 'amelioration-continue-cadre', libelle: 'Voir tous les indicateurs canoniques de l\'amélioration continue' },
      programme:   { fiche: 'amelioration-continue-cadre', libelle: '...' },
      strategique: { fiche: 'amelioration-continue-cadre', libelle: '...' }
    },
    recommandationParNiveau: {
      equipe:      'paragraphe rédigé',
      programme:   'paragraphe rédigé',
      strategique: 'paragraphe rédigé'
    },
    crossLink: { fiche: 'pasteque', libelle: 'Mes indicateurs reflètent-ils la réalité du terrain ?' }
  }
}
```

**Mécanique d'interaction.**

- Q1 → réordonne le trio actif (trio défini par Q2) en plaçant en tête la card désignée par `cardEnTete`.
- Q2 → change le trio actif (sélection de `trios.equipe` / `trios.programme` / `trios.strategique`).
- Le bloc recommandation et le lien sortant patrimonial s'adaptent au niveau (Q2).

### 3.3 Variante à reformulation § 4.3

```js
{
  ...communs,
  variante: '§4.3',
  blocs: {
    sectionTitre: 'Ton vrai sujet',
    introDoubleResponse: 'phrase d\'introduction',
    colonnes: {
      gauche: {
        etiquette: 'Ce que tu demandes',
        titre: 'Reporting d\'occupation',
        description: ['paragraphe 1', 'paragraphe 2'],   // chaîne OU tableau
        indicateurs: 'Capacité utilisée · vélocité par sprint · points engagés vs consommés · ...',
        destination: { libelle: 'Engagement & humain', ficheQCible: 'CADRES_A_VENIR' }
      },
      droite: {
        etiquette: 'Ce que tu cherches peut-être',
        titre: 'Pilotage par le flux',
        description: ['paragraphe 1', 'paragraphe 2'],
        indicateurs: 'Débit / Throughput · Lead time · WIP · ...',
        destination: { libelle: 'Flux & goulots', ficheQCible: 'amelioration-continue' }
      }
    },
    recommandation: ['paragraphe 1', 'paragraphe 2'],   // chaîne OU tableau
    ecoles: ['paragraphe 1', 'paragraphe 2', '...'],    // chaîne OU tableau
    crossLink: { fiche: '...', libelle: '...' }
  }
}
```

**Mécanique d'interaction.** Clic sur colonne entière (cf. v4.2 actée 07/05/2026) → redirection vers la fiche-question voisine désignée par `destination.ficheQCible`. Pas de mécanique Q1×Q2.

*Vocabulaire — actualisation v0.5 (chantier 26 jalon C.1).* Le champ `porteCible` des versions antérieures (v0.1 à v0.4) a été renommé `ficheQCible` au moment de l'intégration, après le retrait des portes en chantier 23.f. Cohérent avec la convention de nommage `ficheRef` du domaine. Les valeurs sont désormais des ids de fiches-questions du catalogue, ou le marqueur explicite `'CADRES_A_VENIR'` quand aucune voisine n'est candidate.

*Trois cas à l'exécution (option C actée en ouverture C.1) :*

- `ficheQCible = 'CADRES_A_VENIR'` → mode dégradé honnête, pas de `href`, attribut `aria-disabled="true"`, suffixe *(fiche en cours de constitution)* en pied de colonne.
- `ficheQCible` présent dans le catalogue → lien actif `#fiche-q=...`.
- `ficheQCible` inconnu du catalogue (cas où la voisine est déclarée mais pas encore migrée) → mode dégradé honnête (idem `CADRES_A_VENIR`), permet de prédéclarer une voisine qui s'activera automatiquement quand elle sera ajoutée au catalogue. Exemple : `pilotage-hebdo.colonnes.droite.destination.ficheQCible = 'amelioration-continue'` rend en mode dégradé en C.1 et bascule en lien actif au moment où C.2 migre `amelioration-continue` au catalogue.

*Champs texte en paragraphes — actualisation v0.6 (chantier 26 jalon C.1, smoke test friction 1).* Les champs `description` (des colonnes), `recommandation` et `ecoles` acceptent désormais **soit une chaîne unique, soit un tableau de paragraphes**. Le helper `_normaliserParagraphes(valeur)` du module renvoie toujours un tableau ; le rendu produit un `<p>` par entrée. Le passage en tableau est ce qui rend la fiche aérée (friction « page difficile à lire »). Rétro-compatible : une fiche encore au format chaîne fonctionne sans modification.

*Doctrine éditoriale v0.6 — la fiche explique, elle n'affirme pas.* Le smoke test C.1 a relevé que la fiche `pilotage-hebdo` **affirmait** sans **expliquer** (« posture d'audit interne, peu actionnable » — sans dire pourquoi). Règle posée, applicable à toutes les fiches-questions, en particulier aux §4.4 des jalons C.2 à C.4 : chaque jugement porté sur une posture ou un indicateur doit être accompagné de sa raison causale, formulée pour un lecteur non technique. Cohérent avec la mémoire `feedback_redaction_pedagogique_fiches.md`. Corollaire de balisage : un `<span class="anti-pattern">` ne s'applique qu'à un **travers** ; un principe explicatif (ex : la loi de Little) n'est jamais surligné comme anti-pattern, et tout terme savant est glosé au premier emploi.

### 3.4 Variante méta § 4.6 — trio à 3 axes invariants

```js
{
  ...communs,
  variante: '§4.6',
  blocs: {
    q1: {
      libelle: 'Quel signal t\'a alerté ?',
      orientation: 'signal',
      options: [
        { id: 'malaise', libelle: 'Le malaise se vit sur le terrain mais ne se mesure pas', axeEnTete: 'humain' },
        { id: 'chiffresEcart', libelle: 'Les chiffres affichés ne correspondent pas aux faits observés', axeEnTete: 'objectif' },
        { id: 'prioritesDecouple', libelle: 'Les priorités nommées ne s\'appliquent pas dans les arbitrages réels', axeEnTete: 'declaratif' }
      ]
    },
    q2: {
      libelle: 'Où trianguler ?',
      orientation: 'niveau',
      options: [
        { id: 'equipe', libelle: 'Une équipe', niveau: 'equipe' },
        { id: 'programme', libelle: 'Un programme entier', niveau: 'programme' },
        { id: 'organisation', libelle: 'Toute l\'organisation', niveau: 'strategique' }
      ]
    },
    axes: [
      { id: 'declaratif', nom: 'Déclaratif', sousTitre: 'Ce qu\'on dit' },
      { id: 'objectif',   nom: 'Objectif',   sousTitre: 'Ce qu\'on observe' },
      { id: 'humain',     nom: 'Humain anonyme', sousTitre: 'Ce qu\'on vit' }
    ],
    matrice: {
      declaratif: {
        equipe:      { intention: 'paragraphe rédigé pour la triangulation', ficheRef: 'CADRES_A_VENIR' },
        programme:   { intention: '...',                                      ficheRef: 'CADRES_A_VENIR' },
        strategique: { intention: '...',                                      ficheRef: 's4' }
      },
      objectif: { equipe: {...}, programme: {...}, strategique: {...} },
      humain:   { equipe: {...}, programme: {...}, strategique: {...} }
    },
    recommandationParNiveau: { ... },
    liensSortantsParNiveau:  { ... },
    crossLink: { fiche: 'amelioration-continue', libelle: '...' }
  }
}
```

**Mécanique d'interaction.**

- Q1 → réordonne les 3 axes en plaçant en tête l'axe désigné par `axeEnTete`.
- Q2 → change le contenu de chaque card (sélection de `matrice[axe][niveau]`).

### 3.5 Doctrine D3 — séparation matière éditoriale / source canonique

*Doctrine actée le 16/05/2026 (séance reprise sous-chantier 26.h), suite à un constat éditorial sur la matrice pastèque.*

**Constat de départ.** La matrice de la fiche pastèque portait initialement un champ `nom` rédigé pour la triangulation (ex : *« Engagement de sprint vs livré »*) et un champ `traduction` patrimonial (ex : *« / Sprint Commitment vs Delivery »*). Audit factuel sur les 9 cellules :

- 6 cellules : le `nom` rédigé était la version courte du nom canonique de la fiche pointée par `ficheRef` dans `CM.Referentiel` (ex : *« Premier passage conforme »* pour `lss-1` qui s'appelle *« Premier passage conforme (First-Pass Yield) »*) — pure abréviation, donc duplication.
- 2 cellules : le `nom` rédigé n'était pas une métrique canonique mais un **dispositif d'observation** (comparaison entre 2 mesures, ex : *« Engagement de sprint vs livré »*) qui n'a pas d'équivalent 1:1 dans le référentiel. Le `ficheRef` pointait par défaut vers une métrique voisine, créant une discordance.
- 1 cellule : `ficheRef` honnêtement en `CADRES_A_VENIR`.

**Doctrine retenue (D3).**

1. **La matrice ne porte plus de `nom` ni de `traduction`.** Source unique de vérité du nom canonique = `CM.Referentiel`. Élimine la duplication éditoriale et la possibilité de divergence avec la fiche cible.
2. **La matrice ne porte que `ficheRef` + `intention` (+ option `mentionAbsent` pour les cellules dégradées).**
3. **`ficheRef` doit pointer rigoureusement vers une métrique canonique du référentiel**, ou bien expliciter `CADRES_A_VENIR` quand la métrique n'existe pas encore. **Les dispositifs d'observation ne sont pas des métriques** — ils basculent en `CADRES_A_VENIR` jusqu'à ce que la métrique canonique correspondante soit créée dans `CM.Referentiel`.
4. **Le rendu (`_htmlCard`) résout le nom + meta riche en interrogeant `CM.Referentiel.obtenir(ficheRef)`** quand `ficheRef !== 'CADRES_A_VENIR'`. Mode dégradé honnête sinon.

**Conséquence schéma — cellule de matrice § 4.6 :**

```js
matrice[axe][niveau] = {
  intention: 'paragraphe rédigé pour la triangulation',
  ficheRef:  'p5' | 'CADRES_A_VENIR'
}
```

**Conséquence schéma — card de trio § 4.4 :**

```js
trios[niveau][i] = {
  id:        'identifiantLocal',
  niveau:    'equipe' | 'programme' | 'strategique',
  intention: 'paragraphe rédigé',
  ficheRef:  'lss-1' | 'CADRES_A_VENIR'
}
```

Les champs `nom`, `traduction` qui figuraient dans les versions précédentes sont retirés. Cohérent avec la doctrine du *traducteur orthodoxe* (mémoire `project_doctrine_traducteur_orthodoxe.md`) : un module formule, il ne duplique pas.

### 3.6 Doctrine du mot « pastèque » dans le produit

*Doctrine actée le 16/05/2026, suite à constat de Lætitia : le mot « pastèque » désigne, dans la métaphore Kersten (*Project to Product*, 2018), l'effet pervers à débusquer (vert dehors, rouge dedans), pas l'opération positive. L'opération positive, c'est la triangulation déclaratif/objectif/humain.*

**Trois niveaux d'usage du mot dans le produit :**

| Niveau | Où | Doctrine |
|---|---|---|
| 1. **Texte visible utilisateur** (intentions, recommandations, libellés de zone, bandeau d'attente) | À **bannir** — l'utilisateur n'a pas à rencontrer un mot qui désigne un travers comme étiquette positive |
| 2. **Référence patrimoniale érudite** (bloc *« Cette question s'appuie sur »*, citations d'auteurs) | À **garder** — Kersten cité par son nom et sa métaphore d'origine dans le pied, c'est de la doctrine |
| 3. **Identifiant technique** (`id: 'pasteque'`, route `#fiche-q=pasteque`, nom de fichier `mockup-fiche-question-pasteque.html`) | À **garder** pour l'instant — interne, pas de bénéfice à renommer maintenant. Consigné comme dette technique latente. |

Application au sous-chantier 26.h : audit éditorial des 9 intentions + 3 recommandations + bandeauAttente + panel — toute occurrence du mot au niveau 1 a été retirée. Le pied *« Cette question s'appuie sur »* reste tel quel (niveau 2).

---

## 4. API du module `CM.FicheQuestion`

Patron : `CM.AccueilUnifie` / `CM.Referentiel` (modules existants, voir `cadre-indicateurs.html`).

```js
CM.FicheQuestion = (function() {
  'use strict';

  // ─── Catalogue (chargé une fois au boot, gelé) ───────────────
  var CATALOGUE = Object.freeze({
    pasteque:               Object.freeze({ ... cf. § 3.4 ... }),
    'pilotage-hebdo':       Object.freeze({ ... cf. § 3.3 ... }),
    'amelioration-continue': Object.freeze({ ... cf. § 3.2 ... }),
    'resistance-transformation': Object.freeze({ ... }),
    'cascade-objectifs':    Object.freeze({ ... })
  });

  // ─── API publique ──────────────────────────────────────────
  return {
    /* Liste les ids des fiches du catalogue, dans l'ordre canonique. */
    listerIds: function() { ... },

    /* Renvoie l'objet figé d'une fiche. Throws si id inconnu. */
    obtenir: function(id) { ... },

    /* Calcule l'état de présentation à partir des choix Q1 et Q2.
       - Variante §4.2-§4.4 : retourne { trio: [card1, card2, card3], reco, lienSortant, crossLink }
         où trio est le tableau réordonné selon Q1 et sélectionné selon Q2.
       - Variante §4.6      : retourne { axes: [axe1, axe2, axe3], contenuParAxe: {...}, reco, lienSortant, crossLink }
         où axes est le tableau réordonné selon Q1 et contenuParAxe vient de matrice[axe][niveau].
       - Variante §4.3      : retourne { colonnes, reco, crossLink } (pas de Q1/Q2).
     */
    composer: function(id, choixQ1, choixQ2) { ... },

    /* Rendu HTML — adapter vue. Pure fonction de l'état composé.
       Pas d'écriture DOM directe — renvoie une chaîne, le consommateur
       insère via innerHTML dans le conteneur prévu. Cohérent avec
       le traducteur orthodoxe (project_doctrine_traducteur_orthodoxe.md).

       optionsRendu (optionnel, objet figé) — hook d'extension. Aujourd'hui
       inutilisé (rendu standard). Drapeaux possibles à activer plus tard :
         - avecActionsPanier (bool) : ajoute un bouton « Ajouter au tableau
           de bord » sur chaque card du trio. Le délégué onAjouterAuPanier
           (fonction injectée par le consommateur) reçoit (ficheRef, statut)
           et appelle CM.Panier.ajouter ; le module domaine n'importe pas
           CM.Panier (inversion de dépendance préservée).
       Au chantier 26, optionsRendu est absent ou avecActionsPanier=false
       par défaut. Le futur chantier branchera simplement le drapeau. */
    htmlFiche: function(id, choixQ1, choixQ2, optionsRendu) { ... }
  };
})();
```

**Notes architecturales.**

- **Séparation domaine / vue.** `composer` est pure et testable sans DOM (patron des sentinelles). `htmlFiche` est la couche adapter, elle compose le HTML à partir de l'état.
- **État utilisateur côté appelant.** Le module ne tient pas d'état utilisateur. Le composant qui consomme le module (vue accueil ou route dédiée) garde les choix Q1/Q2 dans son propre état et appelle `composer` à chaque mutation.
- **Point d'extension vers `CM.Panier` prévu.** *(Décision actée le 16/05/2026 fin de jalon A, sur retour Lætitia.)* Le mandat du chantier 26 n'inclut pas l'ajout au panier depuis une fiche-question, mais le contrat **réserve une hook** pour qu'un chantier ultérieur puisse l'activer sans toucher au module domaine. Concrètement : la fonction `htmlFiche` accepte un paramètre optionnel `optionsRendu` (objet figé) qui peut porter un drapeau `avecActionsPanier: true`. Quand ce drapeau est vrai, chaque card du trio reçoit un bouton *« Ajouter au tableau de bord »* qui appelle `CM.Panier.ajouter(ficheRef, statut)` via un délégué `onAjouterAuPanier` injecté par le consommateur (le module domaine n'importe pas `CM.Panier`, l'inversion de dépendance reste propre). Au chantier 26, `optionsRendu` est absent ou `avecActionsPanier: false` par défaut — le rendu actuel ne change pas. Le futur chantier branchera simplement le drapeau et le délégué.

---

## 5. Conventions visuelles applicables

*Référence canonique : `doc-cadre-visuel.md` § 6.0 (commune aux 3 pages-types) et § 6.5 (fiche-question). En cas de contradiction avec le présent document, c'est `doc-cadre-visuel.md` qui fait foi.*

**Tokens chromatiques** *(actés décision 20.1, 06/05/2026)* :

- `--accent-fiche-q : #1d3a5f` — bleu de Prusse, signature spécifique fiche-question. Porte : boutons primaires de la fiche, bord et titre du bloc *Recommandation*, lien sortant patrimonial unique, numéro de question rond, surlignage des anti-patterns en double signal.
- `--accent-fiche-q-leger : rgba(29, 58, 95, 0.10)` — fond des options sélectionnées dans le questionnaire.
- `--reco-fond : rgba(29, 58, 95, 0.05)`, `--reco-bord : #1d3a5f`, `--reco-titre : #1d3a5f`.
- **Indigo `#4c1d95` reste le chrome universel** (term-def, bandeau meta, navigation, boutons primaires globaux). **Ne pas le confondre** avec l'accent fiche-question.

**Composants communs (§ 6.0)** :

- Papier crème `#f6f1e1` en fond global, blanc franc dans la matière.
- Filet de niveau saturé en haut, en signature visible.
- Icônes SVG line monochromes, jamais d'emojis (sauf signature éditoriale du pied de mockup, si elle est conservée).
- Citations patrimoniales en pied, voix située (axe 8).

**Mécanique d'interaction (axe 5 *Interactif signifiant*)** : chaque clic produit un retour visible et signifiant. L'activation niveau 3 du chantier 26 est l'incarnation la plus pure de cet axe.

**Composition d'une fiche § 4.2/§ 4.4** (résumé § 4.1 du catalogue) :

1. Question (titre h2 ou h3).
2. Bandeau d'attente (1 phrase, fond indigo léger).
3. Section principale = bloc *Cadrage* avec Q1 numéro 1 + Q2 numéro 2, séparées par pointillés.
4. Trio de 3 cards.
5. Lien sortant patrimonial unique.
6. Bloc *Recommandation* (cartouche bord+titre+fond léger en bleu de Prusse).
7. Cross-link vers fiche-question liée (italique).
8. Pied — écoles convoquées en italique.

**Composition d'une card de trio** *(actée après 3 smoke tests, sous-chantier 26.h, 16/05/2026)*. Chaque card de trio est composée de **3 strates verticales** :

1. **Card d'accueil canonique** au sommet — identique à celle de l'accueil, réutilisée via `CM.Composants.htmlCarte(fiche, null, true, false)`. `prioritaire=true` active le contour coloré selon fiabilité (vert/orange/rouge). Le pied panier (coche + ampoule + *« Voir le détail »*) est actif d'office. En mode dégradé `CADRES_A_VENIR`, un bloc *« Métrique en cours de constitution »* (bordure pointillée + fond gris très léger) prend sa place.
2. **Pied-info** au milieu — ligne discrète en majuscules, rang en `<strong>` bleu de Prusse : *« Carte 1 : par où commencer · Axe X · Niveau Y »*. Le signal *« par où commencer »* est porté par ce libellé, pas par un chrome visuel.
3. **Zone Intention** en bas — séparée par une bordure pointillée. Libellé *« INTENTION »* en surtitre + paragraphe rédigé non italique.

**Uniformité des hauteurs**. Le grid `.fiche-q-indicateurs` utilise `display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto auto; grid-auto-flow: column`. Chaque `.fiche-q-card-wrapper` utilise `display: contents` pour transmettre ses 3 enfants (card, pied-info, zone-intention) directement au grid. Résultat : les 3 cards d'accueil sont strictement uniformes en hauteur (row 1 = max), idem les 3 pied-info (row 2), idem les 3 zones Intention (row 3) — peu importe la longueur du contenu d'une colonne donnée. Solution choisie après échec de tentatives `flex: 1` + `height: 100%` qui ne convergent pas à cause des longueurs hétérogènes des intentions.

**Aucun chrome coloré autour des cards.** Décision F4 v2 après 3 smoke tests : un chrome bleu de Prusse en haut et en bas (proposition initiale du jalon B) écrasait visuellement la card d'accueil et créait une dissymétrie avec le reste du site. La signature pastèque (rang/axe/niveau/intention) vit en pied de card sans envahir le visuel.

---

## 6. Plan de migration

| Étape | Fiche | Niveau d'effort | Notes |
|---|---|---|---|
| Jalon B (PoC) | pastèque (§ 4.6) | 3-4h | Fiche la plus mûre, mécanique méta atypique — bonne preuve de robustesse. |
| **Jalon C.1** ✅ | **pilotage-hebdo (§ 4.3)** | **~2h** | **✅ LIVRÉ le 2026-05-20 (chantier 26 jalon C.1) sur 4 commits atomiques `c36f2ca` (données) → `168920f` (composer §4.3) → `0b48633` (htmlFiche §4.3) → `e402694` (CSS double colonne).** Vocabulaire actualisé : `porteCible` (caduc depuis 23.f) renommé `ficheQCible`. Option C actée pour le clic colonne : voisine prédéclarée + bascule auto en mode dégradé honnête tant que la fiche cible n'est pas au catalogue. Cibles : gauche `CADRES_A_VENIR` (pas de voisine candidate sur Engagement & humain), droite `amelioration-continue` (active au C.2). Smoke test interactif Lætitia + tag de clôture `mvp-chantier-c1-livre` à poser au C.1.7. |
| Jalon C.2 | amélioration-continue (§ 4.4) | 3h | Première vraie matière § 4.4 à câbler (déjà rédigée pour une cellule). |
| Jalon C.3 | résistance-transformation (§ 4.4) | 3h | Mécanique ADKAR comme grille pédagogique de Q1. |
| Jalon C.4 | cascade-objectifs (§ 4.4) | 3h | Famille Drucker fermée — terrain doctrinal le plus stable. |
| **Sous-chantier 26.h** ✅ | **(refonte transverse)** | **~6h** | **Harmonisation des cards de trio avec la card d'accueil canonique. ✅ LIVRÉ le 16/05/2026 (séance reprise) sur 7 commits successifs `348d146` → `48c35e5`. Doctrine D3 (§ 3.5) + Doctrine du mot pastèque (§ 3.6) appliquées. Composition retenue (option F4 v2 après 3 smoke tests Lætitia) : card d'accueil canonique pure + pied-info discret (rang · axe · niveau) + zone Intention séparée. Aucun chrome coloré autour des cards. Uniformité des hauteurs via grid 3×3 (`grid-auto-flow: column`, `display: contents` sur le wrapper). Pied panier activé. Contour fiabilité (vert/orange/rouge) restauré comme à l'accueil. Bouton retour rendu visible (fond blanc franc + bordure bleu de Prusse). Tag de clôture : `mvp-chantier-26h-livre` sur `48c35e5`.** |

**Ordre de migration justifié.** Pastèque en PoC parce qu'elle implémente la variante § 4.6 (la plus exigeante mécaniquement — matrice 3×3) ; si le PoC tient sur § 4.6, il tient *a fortiori* sur § 4.4 plus simple. Pilotage-hebdo après le PoC parce qu'elle apporte de la cohérence visuelle sans engager de logique nouvelle (§ 4.3 sans Q1×Q2). Les 3 fiches § 4.4 ensuite, dans l'ordre de maturité de la matière éditoriale (du plus simple au plus politique). **Le sous-chantier 26.h s'insère entre jalon B et C.1** parce qu'il refond l'API du rendu des cards de trio — il bénéficie immédiatement à la pastèque déjà livrée et conditionne le rendu des fiches § 4.4 à venir (C.2, C.3, C.4). C.1 (pilotage-hebdo, § 4.3, double colonne sans trio) n'est pas affecté par cette refonte.

---

## 7. Tests et sentinelles

Patron : `tests-accueil-unifie.html` + `tests-accueil-unifie-sentinelles.html` (chantier 23.g, 30 assertions automatisées).

**Tests unitaires sur stubs** (jalon B, étendus aux jalons C) :

- `composer('pasteque', 'malaise', 'equipe')` → ordre des axes : Humain, Déclaratif, Objectif ; contenu de l'axe Humain = matrice.humain.equipe.
- `composer('pasteque', 'chiffresEcart', 'strategique')` → Humain.strategique en card 1.
- `composer('amelioration-continue', 'goulot', 'programme')` → trio[programme] réordonné avec throughput en card 1.
- Tests d'invariance : pour une variante § 4.6, les 3 axes sont toujours présents dans le résultat, jamais 2, jamais 4.

**Sentinelles d'invariants** (jalon E) :

- I1 — Toute fiche du catalogue déclare une `variante` valide (`§4.2-§4.4`, `§4.3`, `§4.6`).
- I2 — Toute card de trio (§ 4.4) ou cellule de matrice (§ 4.6) a un `ficheRef` qui soit existe dans `CM.Referentiel`, soit pointe explicitement vers `CADRES_A_VENIR` (signalement honnête).
- I3 — Toute option Q1 d'une fiche § 4.4 a un `cardEnTete` qui correspond à un id de card du trio.
- I4 — Toute option Q1 d'une fiche § 4.6 a un `axeEnTete` qui correspond à un id d'axe.
- I5 — Aucune fiche ne mélange variantes (§ 4.6 cohabitant avec § 4.4 dans la même fiche).

---

## Journal du document

- **2026-05-16 — v0.1 (séance d'ouverture chantier 26, jalon A).** Cadrage initial. Schéma de données pour les 3 variantes, API de `CM.FicheQuestion`, conventions visuelles renvoyées vers `doc-cadre-visuel.md` § 6.5, plan de migration, sentinelles d'invariants.
- **2026-05-16 — v0.2 (fin de jalon A, retour Lætitia).** Trois arbitrages tranchés : (a) format source JavaScript figé retenu pour cohérence projet, (b) point d'extension vers `CM.Panier` *prévu* via `optionsRendu.avecActionsPanier` + délégué `onAjouterAuPanier` (inversion de dépendance préservée), (c) ordre de migration confirmé (pastèque d'abord).
- **2026-05-16 — v0.3 (reprise séance, sous-chantier 26.h).** Constat éditorial sur la matrice pastèque : `nom` et `traduction` portés par la matrice étaient soit redondants avec `CM.Referentiel` (6 cellules), soit des dispositifs d'observation sans équivalent canonique (2 cellules). Trois doctrines posées : **D3 (§ 3.5)** — la matrice ne porte plus que `intention` + `ficheRef`, source unique de vérité = `CM.Referentiel`, dispositifs d'observation basculent en `CADRES_A_VENIR` ; **Doctrine du mot pastèque (§ 3.6)** — banni des libellés visibles utilisateur (niveau 1), conservé en référence érudite (niveau 2) et en identifiant technique (niveau 3) ; **Pied panier activé** dans les cards de fiche-question via `optionsRendu.avecActionsPanier=true` (sortie de l'attente MVP, hook préparé en v0.2). Le sous-chantier 26.h s'insère entre jalon B et C.1 et refond `_htmlCard` pour lire les attributs riches depuis le référentiel (icone, type, fiabilité, fréquence, maturité, cadres, panier) tout en conservant la signature pastèque (rang, axe, niveau, intention) en chrome autour de la card d'accueil canonique. Schémas § 3.2 et § 3.4 mis à jour : `nom` et `traduction` retirés.
- **2026-05-16 — v0.4 (clôture sous-chantier 26.h).** Composition de la card de trio actée après 3 smoke tests Lætitia successifs (7 frictions traitées au total) : **(1)** chrome bleu de Prusse autour des cards (proposition initiale) écrasait visuellement la card d'accueil → retiré complètement ; **(2)** mot anglais *« Card »* francisé en *« Carte »* ; **(3)** bouton retour rendu visible (fond blanc franc + bordure bleu de Prusse + SVG flèche line) ; **(4)** composition finale F4 v2 — card d'accueil canonique pure + pied-info discret + zone Intention séparée par bordure pointillée ; **(5)** mise en avant `.tete` (bordure bleu) retirée à cause du conflit avec border-color inline du contour fiabilité — le signal *« par où commencer »* reste porté par le libellé du pied-info ; **(6)** `prioritaire=true` passé à `CM.Composants.htmlCarte` → contour coloré selon fiabilité (vert/orange/rouge), comme à l'accueil ; **(7)** uniformité des hauteurs résolue par grid 3×3 piloté par `.fiche-q-indicateurs` (`grid-auto-flow: column`, `display: contents` sur le wrapper). Section § 5 enrichie d'un bloc *« Composition d'une card de trio »* qui pose les 3 strates et la mécanique grid. Section § 6 marque le sous-chantier comme ✅ livré sur le tag `mvp-chantier-26h-livre`.

- **2026-05-20 — v0.6 (smoke test C.1, friction 1 — fluidité et profondeur).** Smoke test interactif Lætitia sur la fiche `pilotage-hebdo` intégrée. Deux frictions : (a) *« page difficile à lire, trop de lecture »* ; (b) *« explications trop faibles »* (la fiche affirme sans expliquer). Traitement : panel UX convoqué (Krug, Tufte, Bringhurst), trois mockups-preview produits puis un Hybride enrichi validé. **Schéma § 3.3 actualisé** : `description`, `recommandation`, `ecoles` acceptent une chaîne ou un tableau de paragraphes (helper `_normaliserParagraphes`, rendu `<p>` par entrée — rétro-compatible). **Doctrine éditoriale v0.6 posée** : la fiche explique le pourquoi, elle n'affirme pas — applicable aux fiches §4.4 des jalons C.2 à C.4. **Correction de balisage** : la loi de Little, principe explicatif, retirée du `<span class="anti-pattern">` où le mockup d'origine l'avait placée à tort, puis glosée. Rétroport en 4 commits atomiques : `c3523d9` (rendu multi-paragraphes JS + CSS), `4865a3a` (données enrichies), doc compagnon v0.6, État courant. Note : le module `CM.FicheQuestion` n'utilise pas d'espaces insécables (typographie française incomplète, aligné sur la pastèque) — dette consignée au backlog.
- **2026-05-20 — v0.5 (jalon C.1 livré, en attente smoke test).** Migration de la fiche `pilotage-hebdo` (variante § 4.3) du mockup autonome vers le catalogue intégré. Quatre commits atomiques (`c36f2ca` → `e402694`) couvrant données + domaine + vue + CSS. Le module `CM.FicheQuestion.composer()` reconnaît la variante § 4.3 (pure fonction sans Q1/Q2, retourne `{ variante, colonnes, recommandation, crossLink, ecoles, citationPied, ... }`). Le module `htmlFiche()` produit une composition fidèle au mockup v3 du 07/05/2026 : filet niveau, bandeau d'attente, section *Ton vrai sujet* avec double colonne cliquable, recommandation, cross-link, écoles convoquées, citation patrimoniale en pied. **Trois doctrines documentées :** (i) vocabulaire `porteCible` (caduc depuis 23.f) renommé `ficheQCible` — schéma § 3.3 et mécanique d'interaction mis à jour ; (ii) option C actée pour le clic colonne — voisine prédéclarée par `ficheQCible`, le rendu détecte automatiquement si la voisine est au catalogue (lien actif) ou pas (mode dégradé honnête avec suffixe *« (fiche en cours de constitution) »*) ; (iii) anglicismes patrimoniaux dans `<span class="traduction">` pour Throughput / Lead time / Change failure rate (forme FR / EN attestée patrimoniale, cohérent avec la mémoire `feedback_champ_traduction_reserve_signatures.md` : ces termes sont des signatures patrimoniales canoniques). Doctrine B rétrospective appliquée aux em dashes du mockup d'origine (matière née avant 16/05). Smoke test interactif Lætitia reporté au C.1.7.

