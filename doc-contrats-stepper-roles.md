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
| `Instance.remplacerChoix(indexEtape, valeur)` | `void` | Met à jour un choix **sans** transitionner ni effacer les choix postérieurs. Primitive bas-niveau pour le pivot à étage constant — cf. section dédiée ci-dessous. |
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

### Distinguer `setChoix` / `remplacerChoix` / `retourA`

Les trois primitives manipulent l'état de l'instance mais servent des
intentions utilisateur différentes. Les confondre produit des régressions
subtiles de parcours, d'où cette clarification.

| Primitive | Effet sur le choix cible | Effet sur `etat.etape` | Effet sur les choix postérieurs | Cas d'usage typique |
|---|---|---|---|---|
| `setChoix(n, v)` | met à jour `choix[n-1]` | `etat.etape = n + 1` (transition) | inchangés | Flux normal : l'utilisateur valide une étape, on passe à la suivante. |
| `remplacerChoix(n, v)` | met à jour `choix[n-1]` | inchangé | inchangés | Pivot à étage constant : l'utilisateur est sur les résultats et change un choix antérieur sans vouloir quitter les résultats. |
| `retourA(n)` | inchangé | `etat.etape = n` | effacés (`null`) pour les index ≥ n | L'utilisateur clique sur une chip d'étape antérieure pour rouvrir le choix. |

Exemple concret — **bloc « Cadres voisins »** de la porte cadre : l'utilisateur
est à l'étape 3 avec `(cadre=scrum, niveau=équipe)` et clique sur un cadre voisin.
L'intention est de recalculer les résultats pour `(cadre=kanban, niveau=équipe)`
**sans** revenir à l'étape 2. C'est exactement `remplacerChoix(1, 'kanban')`.
Si on avait appelé `setChoix(1, 'kanban')` l'utilisateur serait renvoyé à l'étape 2
(choix du niveau) — mauvais. Si on avait appelé `retourA(1)`, le choix du niveau
serait effacé — mauvais aussi.

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

## `CM.VuePorteNiveau` — à construire (7.2a-code.3)

### Raison d'être

Vue de la porte *Par mon niveau*. Troisième porte d'entrée de l'outil,
à côté des portes *Par mon problème* et *Par mon cadre*. Rejoint le
parcours guidé — mêmes mécaniques de stepper, barre d'étapes, scroll,
retour accueil, pivot à étage constant. Se distingue par sa
**taxonomie de première étape** (contrat de cohérence, cf. section
*Points d'extension* de `CM.Stepper`) : accordéon à 4 cartouches
(Opérationnel / Tactique / Portefeuille / Exécutif), chaque cartouche
énumérant les rôles de sa strate. Le clic sur un rôle vaut validation
de l'étape 1.

### Parcours et grain de choix

Trois étapes cumulées, résultats calculés à la fin :

| Étape | Clé stepper | Choix utilisateur | Dérivation |
|---|---|---|---|
| 1 | `role` | id de rôle (`op-…`, `ta-…`, `po-…`, `ex-…`) | `niveau = CM.Roles.parId(role).niveau` |
| 2 | `probleme` | id de problème parmi ceux légitimes au niveau dérivé | — |
| 3 | `cadre` | id de cadre parmi la grille de la porte cadre | — |
| — | (résultats) | — | `rendreResultats(choix)` produit les recos |

**Invariant de dérivation.** Le niveau n'est **pas** un choix séparé,
c'est une dérivation pure de l'id de rôle. Toute logique aval
(filtrage des problèmes à l'étape 2, construction du `ctx` des recos)
lit le niveau par `CM.Roles.parId(role).niveau`, jamais par une
variable dupliquée dans l'état du stepper. Conséquence : pas de
désynchronisation possible entre rôle et niveau, l'un des deux étant
la source de vérité, l'autre un calcul.

### Surface d'API publique (façade iso-pattern)

Même patron que les deux autres portes : IIFE + `_stepper` interne +
façade nommée qui délègue aux primitives du stepper. Conservée pour
la lisibilité des `onclick` HTML et la symétrie avec
`CM.VuePorteProbleme` (`setNiveau` / `setProbleme`) et
`CM.VuePorteCadre` (`setCadre` / `setNiveau`).

| Signature | Retour | Comportement |
|---|---|---|
| `ouvrir()` | `void` | Délègue à `_stepper.ouvrir()`. Affiche l'étape 1, accordéons fermés. |
| `retourAccueil()` | `void` | Délègue à `_stepper.retourAccueil()`. |
| `setRole(id)` | `void` | Façade vers `_stepper.setChoix(1, id)`. Cible des `onclick` générés dans la liste de rôles. |
| `setProbleme(id)` | `void` | Façade vers `_stepper.setChoix(2, id)`. |
| `setCadre(id)` | `void` | Façade vers `_stepper.setChoix(3, id)`. |
| `retourA(numEtape)` | `void` | Délègue à `_stepper.retourA(numEtape)`. |
| `reset()` | `void` | Délègue à `_stepper.reset()`. |

La primitive `_stepper.remplacerChoix(n, valeur)` reste disponible en
interne si une évolution future (pivot à étage constant sur un bloc
transversal, comme *Cadres voisins* dans la porte cadre) en a besoin ;
elle n'est pas exposée dans la façade publique à ce stade.

### Configuration du stepper (`CM.Stepper.creer`)

```js
var _stepper = CM.Stepper.creer({
  etiquettePorte: 'Par mon niveau',
  idFacade:       'CM.VuePorteNiveau',
  ids: {
    vue:     'vue-porte-niveau',
    stepper: 'porte-niveau-stepper',
    etapes:  'porte-niveau-etapes'
  },
  etapes: [
    {
      cle:           'role',
      defaut:        'Mon rôle',
      valeur:        _labelRole,              // ex. « Opérationnel — Développeur »
      rendreOptions: function() { return _etapeRole(); }
    },
    {
      cle:           'probleme',
      defaut:        'Mon problème',
      valeur:        _labelProbleme,
      rendreOptions: function(choix) { return _etapeProbleme(choix[0]); }
    },
    {
      cle:           'cadre',
      defaut:        'Mon cadre',
      valeur:        _labelCadre,
      rendreOptions: function(choix) { return _etapeCadre(choix[0], choix[1]); }
    }
  ],
  libelleResultats: 'Mes indicateurs',
  rendreResultats:  function(choix) { return _etapeResultats(choix[0], choix[1], choix[2]); }
});
```

Le patron suit la signature observée dans `CM.VuePorteProbleme` et
`CM.VuePorteCadre` : `idFacade` pour référencer la façade dans les
`onclick` générés par le stepper (bouton *↻ Recommencer*, chips de
navigation), `ids.*` pour les ancres DOM, `etapes[].valeur(choix)`
pour le libellé de chip après validation.

### Étape 1 — accordéon à 4 cartouches

Rendu produit par `_etapeRole()`. Aucun argument — la donnée est lue
sur `CM.Roles`, pas transportée dans l'état du stepper.

- Enveloppe `<div class="carte-etape">` avec `q-numero`, `q-texte`, `q-aide`, identique aux deux autres portes.
- Boucle sur `CM.Roles.niveauxCanoniques()` (retourne `['équipe', 'programme', 'portefeuille', 'entreprise']` dans cet ordre). Pour chaque canon, un `<details class="niv-accordeon niv-{code}">` où `{code}` vaut `op` / `ta` / `po` / `ex` selon la table interne du module.
- `<summary class="niv-titre">` avec libellé de surface via `CM.Roles.libelleDeSurface(canon)` + mention canon en micro-méta (`<span class="niv-titre-interne">équipe</span>`, etc.), conformément au double-libellé décidé en N1.
- **À l'arrivée, toutes les cartouches sont fermées** — aucune n'a l'attribut `open`. Principe : carte d'ensemble d'abord, ouverture ciblée ensuite. Décision validée pour la porte cadre (20/04/2026), appliquée à l'identique ici.
- Corps d'une cartouche = `<div class="niv-corps"><div class="roles-liste">` qui boucle sur `CM.Roles.parNiveau(canon)` pour générer un `<button class="role-btn" onclick="CM.VuePorteNiveau.setRole('…')">` par rôle.

Le chevron d'accordéon, l'animation d'ouverture et les états survol /
ouvert s'appuient sur l'élément `<details>` natif — accessible clavier
par défaut (Entrée / Espace sur le `<summary>`), pas de gestionnaire
custom à coder.

### Cartouche de rôle — typographie cran 3 Doux

Le patron de rendu d'un rôle découle directement du mockup
`preview-porte-niveau-texte-tons-clairs.html`, validé le 22/04/2026
(réf. commit `a9298ce`). Doctrine portée par
`project_porte_niveau_rendu_visuel.md` — à considérer comme source de
vérité en cas de divergence avec la présente section.

Squelette attendu pour chaque rôle :

```html
<button type="button" class="role-btn" onclick="CM.VuePorteNiveau.setRole('op-developpeur')">
  <div class="role-entete">
    <span class="role-titre">Développeur / Ingénieur logiciel</span>
  </div>
  <div class="role-descriptif">Membre de l'équipe de réalisation, engagé sur un incrément …</div>
  <div class="role-axes-meta">
    Axes&nbsp;:
    <span class="axe projet">projet</span>
    <span class="sep">·</span>
    <span class="axe methodologique">méthodologique</span>
  </div>
</button>
```

Pour un rôle dont le titre porte un qualificatif entre parenthèses
(`Product Manager (produit multi-équipes)`, `Scrum Master (équipe)`,
`Black Belt (Lean Six Sigma)`, …), la balise `.role-titre` enveloppe
deux segments :

```html
<span class="role-titre">
  Product Manager
  <span class="role-qualificatif">(produit multi-équipes)</span>
</span>
```

**Parsing du qualificatif.** Un regex `^(.+?)\s*\(([^)]+)\)\s*$`
appliqué au titre stocké détecte la forme. Si match, rendu en deux
segments (base + qualificatif italique grise). Sinon, rendu en un
segment. Le parsing est une **opération de rendu**, jamais une
modification des données : `CM._rolesData[i].titre` reste la chaîne
complète, conformément à l'invariant d'ids et de titres stables.

Le rendu est uniforme pour tous les parenthèses finaux, qu'il
s'agisse de la règle R2 stricte (rôle à cheval, `Product Owner
(produit mono-équipe)`) ou d'une précision non-R2 (abréviation,
discipline, synonyme). La distinction sémantique reste éditoriale,
portée par l'inventaire, pas matérialisée dans le HTML.

### Tokens CSS ajoutés au `:root`

Cran 3 Doux — limite AA WCAG (~4.5:1 à 12 px sur blanc). Ces tokens
sont les **seules** teintes d'axes autorisées dans l'outil. Toute
saturation supérieure passe par une décision de doctrine explicite,
jamais par une modification silencieuse.

```css
:root {
  --axe-humaine:        #5d7fa6;  /* bleu désaturé    */
  --axe-projet:         #4f7e74;  /* vert désaturé    */
  --axe-methodologique: #7d6b96;  /* violet désaturé  */
  --axe-strategique:    #917a55;  /* ambre désaturé   */
}

.axe                { font-weight: var(--fw-medium); white-space: nowrap; }
.axe.humaine        { color: var(--axe-humaine); }
.axe.projet         { color: var(--axe-projet); }
.axe.methodologique { color: var(--axe-methodologique); }
.axe.strategique    { color: var(--axe-strategique); }

.role-qualificatif {
  font-style:  italic;
  color:       var(--texte-tertiaire);
  font-weight: var(--fw-medium);
}

.sep { color: var(--texte-tertiaire); }
```

La classe CSS `.axe.methodologique` est **sans accent** pour rester
dans le jeu des sélecteurs ASCII usuels ; le libellé visible conserve
l'accent (`méthodologique`). Aucune couleur en dur dans le JS — toute
teinte passe par une variable CSS. Une évolution future (mode sombre,
redesign de charte) reste locale au bloc de tokens.

### Règles d'invariance

- **Dépendances déclarées.** `CM.VuePorteNiveau` consomme `CM.Roles`
  (rôles, libellés de surface, ordre canonique) et `CM.Stepper`
  (orchestration). L'étape 2 consomme
  `CM.DiagnosticProbleme.problemesPourNiveau(niveauCanon)` avec le
  niveau dérivé du rôle. L'étape 3 et le rendu des résultats
  consomment `CM.DiagnosticCadre` et `CM.DiagnosticProbleme` selon le
  patron déjà en place dans les deux autres portes.
- **Pas d'accès DOM au *parse time*.** L'instance stepper est
  construite à l'exécution de l'IIFE, mais aucun accès DOM n'a lieu
  avant le premier `ouvrir()`. Patron déjà respecté par les deux
  portes existantes, à préserver ici.
- **Libellés de surface ≠ canons internes.** L'étape 1 affiche les
  libellés de surface (*Opérationnel* / *Tactique* / *Portefeuille* /
  *Exécutif*) via `CM.Roles.libelleDeSurface`. Les canons internes
  (`équipe`, `programme`, `portefeuille`, `entreprise`) restent la
  seule valeur transportée dans les `ctx` de recommandation et les
  `META.niveau` des fiches indicateurs. Pas de fuite de canon dans
  les libellés, pas de fuite de libellé dans les données.
- **Accordéons fermés à l'arrivée.** Aucun `open` par défaut sur les
  quatre `<details>`. Préserve la lecture *carte d'ensemble avant
  ouverture ciblée*, symétrique à la porte cadre.
- **Qualificatif parsé côté rendu, pas côté données.** Le titre
  stocké dans `CM._rolesData` reste la forme éditoriale complète.
  Le parsing en segments base / qualificatif est une opération de
  rendu portée par `CM.VuePorteNiveau` (ou un helper interne
  `_htmlRole`). Conséquence : une réécriture éditoriale en 7.2b ne
  touche ni le parseur, ni la structure de données, ni les ids.
- **Contrat de cohérence entre portes respecté.** Taxonomie de
  première étape propre à la porte, aides pédagogiques libres, blocs
  transversaux sous les résultats au choix. Aucune de ces surfaces
  n'est imposée ni factorisée au niveau du stepper.

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
