# Contrats d'API — `CM.Roles` et `CM.Stepper`

> Document compagnon du chantier **7.2a-code**. Pose les contrats d'API
> des deux modules architecturaux centraux de la porte niveau, pour éviter
> la dérive d'implémentation entre les trois sous-chantiers (.1 livré, .2
> refacto des portes existantes, .3 nouvelle porte niveau).
>
> Écrit après 7.2a-code.1, avant 7.2a-code.2. À tenir à jour si un contrat
> évolue — ce document est la référence, le code doit s'y conformer.

## Préambule — pourquoi ce document

La porte *niveau* refondue (chantier 7.2) rejoint le parcours guidé
*niveau → problème → cadre → résultats*. Trois modules nouveaux ou refactorés
la servent :

- **`CM.Roles`** — source de données des 53 rôles, déjà livré en 7.2a-code.1.
- **`CM.Stepper`** — orchestrateur générique des parcours multi-étapes,
  à extraire en 7.2a-code.2 des portes problème et cadre existantes.
- **`CM.VuePorteNiveau`** — nouvelle vue qui consomme les deux précédents,
  à construire en 7.2a-code.3.

Les trois sous-chantiers sont scindés pour garder des livrables auditables.
Le risque classique de cette découpe est de redécouvrir en cours de route
qu'une API manque d'un point d'extension, ou qu'elle en a trop. D'où ce
document, qui fixe les surfaces avant qu'on commence à coder.

## `CM.Roles` — module livré (7.2a-code.1)

### Raison d'être

Expose l'inventaire éditorial des rôles. Ne touche ni au DOM, ni aux
autres modules. Consommé en lecture seule par la future porte niveau, et
potentiellement par le chantier 7.7 (deep-linking de parcours) pour
valider qu'un id de rôle est connu.

### API publique

| Signature | Retour | Comportement |
|---|---|---|
| `tousLesRoles()` | `Array<Role>` | Copie défensive de l'array complet. Chaque fiche est figée via `Object.freeze`. Tri : ordre de l'inventaire markdown (niveau par niveau, fiche par fiche). |
| `parNiveau(canon)` | `Array<Role>` | Filtre par niveau canonique (`équipe`, `programme`, `portefeuille`, `entreprise`). Retourne `[]` si le canon est inconnu. |
| `parId(id)` | `Role \| null` | Lookup stable. `null` si l'id n'existe pas. |
| `niveauxCanoniques()` | `Array<string>` | Ordre canonique `['équipe', 'programme', 'portefeuille', 'entreprise']`. |
| `libelleDeSurface(canon)` | `string` | Canon → libellé porte niveau (décision N1). `équipe → Opérationnel`, `programme → Tactique`, `portefeuille → Portefeuille`, `entreprise → Exécutif`. Retourne le canon tel quel si inconnu. |
| `axesValides()` | `Array<string>` | Whitelist des axes Mintzberg (décision D2) : `humaine`, `projet`, `méthodologique`, `stratégique`. |

### Forme d'une fiche `Role`

```js
{
  id:          "op-developpeur",      // chaîne stable, format /^(op|ta|po|ex)-[a-z0-9-]+$/
  niveau:      "équipe",               // canon interne, une des 4 valeurs
  titre:       "Développeur / Ingénieur logiciel",
  axes:        ["projet", "méthodologique"],  // 1 à 3 axes, frozen array
  source:      "Scrum Guide 2020 (*Developers*) ; IEEE SWEBOK ...",
  descriptif:  "Membre de l'équipe de réalisation, engagé sur un incrément ..."
}
```

La fiche est figée superficiellement : `Object.freeze` sur la fiche elle-même
et sur son array `axes`. Les chaînes, étant immutables en JavaScript, n'ont
pas besoin de traitement supplémentaire.

### Règles d'invariance

- Les ids sont stables. Une réécriture de titre en 7.2b **ne doit pas** toucher
  à l'id.
- Le champ `niveau` reste toujours exprimé en canon, jamais en libellé.
  La conversion canon → libellé passe par `libelleDeSurface`.
- La whitelist des axes est fermée (décision D2, 21/04/2026). Toute envie
  d'ajouter un axe déclenche une décision explicite de doctrine, pas une
  simple modification silencieuse.

### Validation

Toutes les anomalies déclenchent un `console.warn` au premier appel — jamais
de `throw`. Le module est tolérant pour rester exploitable si l'inventaire
a un défaut éditorial ponctuel. Le script `tools/generer-roles.js` est
strict lui : il `exit 1` dès qu'une fiche ne respecte pas le contrat, donc
en pratique le HTML produit n'a pas d'anomalies.

## `CM.Stepper` — à extraire (7.2a-code.2)

### Raison d'être

Orchestrer un parcours multi-étapes générique : navigation entre étapes
(avant / arrière / recommencer), état `{ étape courante, choix cumulés }`,
rendu de la barre d'étapes, scroll automatique, bouton retour accueil.
Le module **ne connaît pas** la sémantique des étapes — chaque porte
injecte ses étapes sous forme de descripteurs.

### Invariant structurant — nombre variable d'étapes

Décision validée le 20/04/2026 : `CM.Stepper` doit accepter un **tableau
ordonné d'étapes de longueur arbitraire**. Ne jamais coder en dur 3
étapes. Raison : activer plus tard les chantiers 7.3 (type de décision
en 4e étape) et 7.4 (disponibilité des données en 5e étape) sans
retoucher le stepper — seulement en ajoutant un descripteur au tableau.

### Surface d'API publique

| Signature | Retour | Comportement |
|---|---|---|
| `creer(config)` | `Instance` | Instancie un parcours concret à partir d'une `config`. Plusieurs parcours peuvent coexister (une instance par porte). |
| `Instance.ouvrir()` | `void` | Affiche la première étape, scroll instantané au haut de la vue. |
| `Instance.retourAccueil()` | `void` | Quitte le parcours, restaure l'accueil de l'outil. |
| `Instance.retourA(indexEtape)` | `void` | Revient en arrière sur une étape déjà faite (chip cliquable). Efface tous les choix postérieurs. |
| `Instance.setChoix(indexEtape, valeur)` | `void` | Note le choix de l'utilisateur à une étape, transitionne automatiquement vers l'étape suivante ou vers les résultats. |
| `Instance.reset()` | `void` | Repart de l'étape 1 en effaçant tous les choix. Déclenché par le bouton *↻ Recommencer* en pied d'étape finale. |
| `Instance.etatCourant()` | `{ etape, choix }` | Lecture de l'état — utile pour le deep-linking de 7.7. |

### Forme de la `config`

```js
{
  // Étiquette de porte, affichée dans le header du parcours (bouton retour)
  etiquettePorte: "Par mon niveau",

  // Tableau ordonné des étapes. Longueur 3, 4, 5… selon la porte et les chantiers activés.
  etapes: [
    {
      cle:         "niveau",                // identifiant technique stable (pour URL et logs)
      titre:       "Mon niveau",             // libellé de la chip
      aide:        "...",                    // bloc pédagogique rendu au-dessus de la question
      rendreOptions: function(api) { ... }, // fonction qui rend le HTML de la grille d'options
      valider:     function(valeur) { ... }  // retourne true si le choix est conforme au schéma
    },
    // ... autres étapes
  ],

  // Callback appelé quand toutes les étapes sont validées — produit le HTML des résultats
  rendreResultats: function(choix) { return "..."; },

  // Optionnel : blocs transversaux sous les résultats (zéro, un ou plusieurs)
  blocsSousResultats: [
    function(choix) { return "..."; }  // ex : zone de délégation (porte problème), cadres voisins (porte cadre)
  ]
}
```

### Points d'extension respectant le contrat de cohérence

Le contrat de cohérence entre portes (`project_contrat_coherence_portes.md`)
autorise chaque porte à injecter :

- Sa **taxonomie de première étape** — niveaux pour problème, familles
  d'école pour cadre, accordéon de rôles pour niveau. Propre à la porte,
  jamais imposée par le stepper.
- Ses **aides pédagogiques** — contenu rédactionnel libre par étape.
- Ses **blocs transversaux sous les résultats** — zone de délégation,
  cadres voisins, etc. Zéro, un ou plusieurs, au choix de la porte.
- Son **conseil pédagogique** — appelable depuis `rendreResultats` via
  `CM.Config.conseilPedagogiquePour(ctx)`.

Le stepper ne porte lui-même **aucune** de ces décisions. Il orchestre
navigation, état, scroll, retour.

### Règles d'invariance

- Le stepper ne dépend d'**aucun** autre module CM.* (sauf éventuellement
  `CM.Html.escape` pour sécuriser le rendu de chaînes utilisateur — à
  inclure dans la refacto si besoin).
- Aucune donnée métier ne vit dans le stepper : ni rôles, ni cadres, ni
  indicateurs. Les descripteurs d'étapes fournissent tout.
- La logique de scroll est uniforme : smooth sur transition d'étape,
  instant à l'ouverture initiale. Invariant déjà observé dans les deux
  portes existantes, à préserver dans la refacto.

## Zone de données `CM._rolesData`

### Emplacement dans `cadre-indicateurs.html`

Entre les balises :

```
/* CM.ROLES-DATA:BEGIN — généré par tools/generer-roles.js, ne pas éditer à la main */
...
/* CM.ROLES-DATA:END */
```

### Rituel de régénération

1. Éditer `inventaire-roles-porte-niveau.md` (ajout, suppression, modification
   d'une fiche — ou d'un champ sur une fiche existante).
2. Lancer `node tools/generer-roles.js` depuis la racine du projet.
3. Vérifier le message de sortie : `OK — N rôles injectés` avec la
   répartition par niveau.
4. Commit des deux fichiers (`inventaire-roles-porte-niveau.md` et
   `cadre-indicateurs.html`) dans le même commit.

### Validations automatiques du script

- Nombre total de fiches = 53 (échec si différent — signal d'un défaut
  de parsing ou d'une suppression involontaire).
- Aucun id dupliqué.
- Chaque id respecte `/^(op|ta|po|ex)-[a-z0-9-]+$/`.
- Chaque fiche a entre 1 et 3 axes, tous dans la whitelist.
- Chaque fiche a titre, source, descriptif non vides.

Toute violation sort le script en code d'erreur 1, sans toucher au HTML.

## Invariants architecturaux consolidés (7.2a-code)

Ces points, distillés des mémoires projet, doivent être respectés par
toute l'implémentation des trois sous-chantiers :

- **Taxonomies par porte préservées.** Le stepper factorise la mécanique,
  pas la grammaire de chaque porte. Problème a ses niveaux, cadre a ses
  familles d'école, niveau a son accordéon de rôles.
- **Nombre d'étapes variable.** Tout code qui suppose exactement 3 étapes
  est un bug latent. 3 aujourd'hui, potentiellement 5 avec 7.3 + 7.4.
- **Libellés de surface ≠ canons internes.** `META.niveau` reste en canon
  dans le code (`équipe`, `programme`, `portefeuille`, `entreprise`). Les
  libellés (`Opérationnel`, `Tactique`, `Portefeuille`, `Exécutif`) ne
  vivent qu'en surface, jamais dans les données ni dans la logique.
- **Ids de rôles stables.** Un titre peut être réécrit en 7.2b sans que
  son id change. Toute fonctionnalité future qui mémorise un choix de
  rôle (7.7 deep-linking, localStorage, …) utilise l'id, jamais le titre.
- **Pas de big-bang.** La refacto de `CM.VuePorteProbleme` et
  `CM.VuePorteCadre` en 7.2a-code.2 se fait à iso-comportement visible
  utilisateur. Les deux portes doivent continuer de marcher après chaque
  commit intermédiaire.
