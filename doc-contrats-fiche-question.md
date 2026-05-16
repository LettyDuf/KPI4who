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
        { id: 'leadTime', niveau: 'equipe', nom: 'Lead time', traduction: 'Délai bout à bout', intention: '...', ficheRef: 'o3' },
        { id: 'firstPassYield', niveau: 'equipe', nom: 'First-pass yield', traduction: 'Premier passage conforme', intention: '...', ficheRef: 'lss-1' },
        { id: 'throughput', niveau: 'equipe', nom: 'Throughput', traduction: 'Débit', intention: '...', ficheRef: 'o4' }
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
        description: 'paragraphe',
        indicateurs: ['Taux de remplissage du sprint', 'Capacité brûlée', 'Vélocité points'],
        destination: { libelle: 'Engagement & humain', porteCible: 'engagement' }
      },
      droite: {
        etiquette: 'Ce que tu cherches peut-être',
        titre: 'Pilotage par le flux',
        description: 'paragraphe',
        indicateurs: ['Lead time', 'Throughput', 'Prévisibilité'],
        destination: { libelle: 'Flux & goulots', porteCible: 'flux' }
      }
    },
    recommandation: 'paragraphe avec anti-patterns en span',
    crossLink: { fiche: '...', libelle: '...' }
  }
}
```

**Mécanique d'interaction.** Clic sur colonne entière (cf. v4.2 actée 07/05/2026) → redirection vers la porte préconfigurée correspondant à `destination.porteCible`. Pas de mécanique Q1×Q2.

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
        equipe:      { nom: 'Discours OKR équipe', intention: '...', ficheRef: 'p5' },
        programme:   { nom: 'Discours programme', intention: '...', ficheRef: 'p5' },
        strategique: { nom: 'Discours stratégique', intention: '...', ficheRef: 's11' }
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

---

## 6. Plan de migration

| Étape | Fiche | Niveau d'effort | Notes |
|---|---|---|---|
| Jalon B (PoC) | pastèque (§ 4.6) | 3-4h | Fiche la plus mûre, mécanique méta atypique — bonne preuve de robustesse. |
| Jalon C.1 | pilotage-hebdo (§ 4.3) | 2h | Seulement harmonisation visuelle (pas de Q1×Q2). |
| Jalon C.2 | amélioration-continue (§ 4.4) | 3h | Première vraie matière § 4.4 à câbler (déjà rédigée pour une cellule). |
| Jalon C.3 | résistance-transformation (§ 4.4) | 3h | Mécanique ADKAR comme grille pédagogique de Q1. |
| Jalon C.4 | cascade-objectifs (§ 4.4) | 3h | Famille Drucker fermée — terrain doctrinal le plus stable. |

**Ordre de migration justifié.** Pastèque en PoC parce qu'elle implémente la variante § 4.6 (la plus exigeante mécaniquement — matrice 3×3) ; si le PoC tient sur § 4.6, il tient *a fortiori* sur § 4.4 plus simple. Pilotage-hebdo après le PoC parce qu'elle apporte de la cohérence visuelle sans engager de logique nouvelle (§ 4.3 sans Q1×Q2). Les 3 fiches § 4.4 ensuite, dans l'ordre de maturité de la matière éditoriale (du plus simple au plus politique).

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

