# Contrats d'API — `CM.Panier`, `Depot`, adapters

> Document compagnon du chantier **9 — Vue panier personnel**. Pose les
> contrats d'API du service panier, de son port hexagonal et des adapters
> avant qu'on écrive la moindre ligne de code consommateur.
>
> Écrit en tranche **9.A.0**, avant 9.A.1 (socle code) et 9.A.2 (tests).
> À tenir à jour si un contrat évolue — ce document est la référence,
> le code doit s'y conformer.

---

## Préambule — pourquoi ce document

Le panier personnel est le cœur de la mission *Mon tableau de bord* (cf.
[`MISSION.md`](./MISSION.md)). Il vit d'abord en mémoire (v1, décision
22/04/2026), mais la persistance `localStorage` est une piste futur déjà
actée. Pour que la bascule d'adapter soit **une substitution, pas une
refonte**, on pose dès la v1 une architecture hexagonale :

- un **service domaine** qui porte la logique métier du panier ;
- un **port** `Depot` qui décrit comment le panier est stocké et relu ;
- un **adapter** `MemoireDepot` qui implémente le port en RAM.

Le risque classique de cette découpe est de redécouvrir en cours de
route qu'une API manque d'un point d'extension, ou qu'elle en a trop.
D'où ce document, qui fixe les surfaces avant qu'on commence à coder.

Les tranches suivantes (9.B à 9.G) consomment ces contrats sans les
modifier. Si l'une a besoin d'un point d'extension nouveau, la
convention est : mettre à jour ce document **dans le même commit** que
le code qui en profite.

---

## Vue d'ensemble — qui parle à qui

```
  ┌──────────────────────────────────────────────────┐
  │   VUES (9.B liste · 9.C icônes · 9.D tiroir · 9.E/F impression)
  │   Lecture et mutation via l'API publique du service.
  └─────────────────────┬────────────────────────────┘
                        │
                        ▼
  ┌──────────────────────────────────────────────────┐
  │   SERVICE DOMAINE — CM.Panier
  │   Logique métier : ajouter, retirer, basculer,
  │   validation à la frontière, notification d'abonnés.
  │   IGNORE comment les lignes sont stockées.
  └─────────────────────┬────────────────────────────┘
                        │ consomme l'interface
                        ▼
  ┌──────────────────────────────────────────────────┐
  │   PORT — Depot  (contrat, pas un objet JS)
  │   Décrit ce qu'un adapter doit savoir faire.
  └─────────────────────┬────────────────────────────┘
                        │ implémenté par
                        ▼
  ┌──────────────────────────────────────────────────┐
  │   ADAPTER — MemoireDepot (v1 livré)
  │   Stocke les lignes dans un objet JS en RAM.
  │   LocalStorageDepot (v2 piste) remplacera ici,
  │   sans toucher au service ni aux vues.
  └──────────────────────────────────────────────────┘
```

**Direction des dépendances.** Vues → Service → Port ← Adapter. Le
service ne connaît jamais l'adapter concret, seulement le contrat.

---

## Structure partagée — `LigneDuPanier`

Unité d'information manipulée de bout en bout.

```js
{
  ficheId:   "ti-o4",             // id de la fiche du référentiel, format
                                  // validé par REGEX_FICHE_ID (cf. plus bas)
  statut:    "en-place",          // "en-place" | "a-envisager" — fermé
  note:      "",                  // chaîne libre, "" par défaut
  ajouteeLe: 1745596800000        // timestamp ms à la PREMIÈRE mise au panier
}
```

### Règles de la structure

- **Unicité par `ficheId`.** Une fiche a au plus une ligne dans le
  panier à un instant donné. Deux statuts simultanés interdits.
- **`statut` fermé.** Seules `"en-place"` et `"a-envisager"` sont
  autorisées. Un paramètre hors de ce jeu est rejeté à la frontière.
- **`note` est une chaîne.** `""` par défaut (pas de `null`,
  pas d'`undefined`). La voie rapide (9.C) n'écrit jamais la note ;
  seule la voie lente (9.D) la saisit ou la modifie.
- **`ajouteeLe` est stable.** Posé une fois à la première mise au
  panier. **Ne change pas** lors d'une bascule de statut ni d'une
  modification de note. Sert à afficher un ordre chronologique
  lisible dans la vue panier.
- **Ligne figée à la sortie.** Toute ligne retournée par le service
  est `Object.freeze`d — l'UI ne peut pas muter les lignes par effet
  de bord. Pour modifier, on passe par les méthodes du service.

### Validation à la frontière

```js
var REGEX_FICHE_ID = /^[a-z0-9-]{1,20}$/;
var STATUTS_VALIDES = ['en-place', 'a-envisager'];
var NOTE_MAX = 500;  // longueur maximale de la note (caractères)
```

Toute entrée hors de ces bornes est **rejetée sans effet de bord**, avec
un `console.warn` explicite. Mêmes trois règles de sécurité que
`CM.Hash` : regex stricte, aucun réinjection DOM, pas de confiance
aveugle. Le service ne fait jamais confiance à ce que lui envoient les
vues — c'est son rôle de garde-frontière.

---

## Port `Depot` — contrat d'un adapter de stockage

Le port n'est **pas un objet JS exposé**. C'est un contrat que tout
adapter doit honorer pour être utilisable par le service.

Un adapter est un objet qui fournit ces cinq méthodes :

| Signature | Retour | Comportement |
|---|---|---|
| `lister()` | `Array<LigneDuPanier>` | Copie défensive de toutes les lignes, ordre indifférent. Le service trie à la sortie. |
| `trouver(ficheId)` | `LigneDuPanier \| null` | Lookup par id. `null` si absente. |
| `poser(ligne)` | `void` | Upsert : remplace la ligne existante au même `ficheId`, ou l'insère. L'adapter considère `ligne` comme déjà validée. |
| `retirer(ficheId)` | `boolean` | `true` si une ligne a été retirée, `false` si absente. |
| `vider()` | `void` | Retire toutes les lignes. |

### Règles d'invariance du port

- Aucune méthode du port ne valide les entrées — la validation est
  déjà faite par le service. Principe : un port confie à l'adapter
  une tâche technique (stocker), pas une tâche métier (contrôler).
- Le port ne notifie pas les abonnés. La notification est la
  responsabilité du service, qui a la connaissance sémantique du
  changement (ajout vs bascule vs modif de note).
- Un adapter doit être **substituable à chaud** : `CM.Panier.utiliserDepot(autre)`
  remplace l'adapter sans perdre l'API publique. Cas d'usage :
  harness de tests qui injecte un `MemoireDepot` neuf à chaque
  scénario pour l'isolation.

---

## Adapter `CM.Panier.MemoireDepot` — v1 livrée

Implémentation triviale du port en mémoire vive. Un objet JS indexé par
`ficheId`, pas de persistance, pas d'effet de bord global.

### Forme d'instanciation

```js
var depot = CM.Panier.MemoireDepot();   // factory, pas constructeur
```

Chaque appel de la factory retourne un **adapter neuf** avec son propre
stockage. Cela rend le harness de tests propre : chaque scénario part
d'un dépôt vide, pas de fuite entre tests.

### Comportement

- Stockage : objet `{ [ficheId]: LigneDuPanier }` privé au scope de la
  factory (closure).
- `lister()` retourne une copie via `Object.values()` pour que le
  consommateur ne puisse pas muter la collection interne.
- `poser(ligne)` ne fige pas la ligne lui-même (la ligne arrive déjà
  figée du service). Il remplace simplement l'entrée indexée.
- `retirer(ficheId)` utilise `delete` sur la map interne.
- Aucune validation. Le service a validé avant.

### Piste futur — `LocalStorageDepot`

Même contrat, autre implémentation. Clé versionnée (`cm-panier-v1`)
pour gérer les changements de schéma futurs. L'ajout de cet adapter ne
touchera **ni le service, ni les vues** — seulement ce document
(nouvelle section) et le code de la factory.

---

## Service `CM.Panier` — API publique consommée par les vues

Le service est le **point d'entrée unique** pour les vues. Les vues
n'appellent jamais l'adapter directement.

### Surface d'API

| Signature | Retour | Comportement |
|---|---|---|
| `ajouter(ficheId, statut, note?)` | `ResultatMutation` | Pose la ligne si la fiche est absente. Si présente avec le **même** statut, ne fait rien (`action: 'inchange'`). Si présente avec un **autre** statut, bascule (équivalent à `basculer`). La note, si passée, écrase l'éventuelle note existante. |
| `retirer(ficheId)` | `ResultatMutation` | Retire la ligne. `action: 'retire'` si elle était là, `'absent'` sinon. |
| `basculer(ficheId, versStatut)` | `ResultatMutation` | Change le statut d'une ligne existante. Si la fiche est absente, crée la ligne avec ce statut et note `""`. Équivalent à `ajouter` avec note non touchée. |
| `modifierNote(ficheId, note)` | `ResultatMutation` | Met à jour la note seule. Si la fiche est absente, ne fait rien (`action: 'absent'`). |
| `statut(ficheId)` | `'en-place' \| 'a-envisager' \| null` | Statut courant, ou `null` si absente. Utile aux icônes de la voie rapide (9.C) pour savoir quel état afficher. |
| `trouver(ficheId)` | `LigneDuPanier \| null` | Ligne complète (figée) ou `null`. |
| `lister(options?)` | `Array<LigneDuPanier>` | Copie figée, triée par défaut par `ajouteeLe` croissant. Options : `{ statut?: 'en-place' \| 'a-envisager', tri?: 'ajout-asc' \| 'ajout-desc' \| 'fiche' }`. |
| `estVide()` | `boolean` | `true` si aucune ligne. Utilisé par 9.G (garde-fou `beforeunload`) et par l'état vide de la vue panier. |
| `taille()` | `number` | Nombre total de lignes, tous statuts confondus. |
| `reinitialiser()` | `ResultatMutation` | Vide le panier. `action: 'reinitialise'`, `lignesAvant: Array<LigneDuPanier>`. |
| `abonner(callback)` | `function` | Enregistre un observateur appelé à chaque mutation. Retourne une fonction `desabonner()` pour se retirer. |
| `utiliserDepot(adapter)` | `void` | Remplace l'adapter courant. Pour tests et futur branchement `LocalStorageDepot`. Ne notifie **pas** les abonnés (la substitution n'est pas un événement métier). |

### Forme d'un `ResultatMutation`

```js
{
  action:     "ajoute",          // ajoute | bascule | inchange | retire |
                                 // absent  | modifie-note | reinitialise
  ligneAvant: null,              // null si n'existait pas, sinon ligne figée
  ligneApres: { ... }            // null si retirée/réinitialisée, sinon ligne figée
}
```

Les retours riches ont deux usages :

1. **UI contextuelle** : afficher un feedback fidèle (« ajoutée »,
   « basculée d'À envisager vers En place », « note mise à jour »).
2. **Tests** : vérifier la sémantique sans inspecter l'état interne.

Pour `reinitialiser()`, on expose `lignesAvant: Array<LigneDuPanier>`
au lieu de `ligneAvant` (pluriel). Permet à l'UI d'afficher une
confirmation comme « Panier vidé (12 fiches retirées) ».

### Notification des abonnés

```js
var desabonner = CM.Panier.abonner(function(resultat) {
  // Appelé après chaque mutation. resultat a la forme ResultatMutation.
  rafraichirLaVueDuPanier();
});

// Plus tard, quand la vue se démonte :
desabonner();
```

Pattern simple pub/sub. Les abonnés sont stockés dans un array interne
au service. Les exceptions levées par un callback sont capturées et
loggées via `console.error` — elles ne doivent pas casser les autres
abonnés ni la mutation en cours.

### Règles d'invariance du service

- **Validation systématique à l'entrée.** `ficheId`, `statut`, `note`
  vérifiés avant toute lecture/écriture sur le depot. Paramètre
  invalide → aucun effet de bord, `console.warn`, retour `action:
  'invalide'`.
- **Immuabilité des sorties.** Toute `LigneDuPanier` retournée est
  `Object.freeze`d. L'UI ne peut pas muter les lignes par effet de bord.
- **Idempotence déclarée.** `ajouter` avec même (ficheId, statut, note)
  retourne `action: 'inchange'`, pas `action: 'ajoute'`. Les
  consommateurs peuvent s'y fier.
- **Notification après mutation réussie uniquement.** Pas de
  notification si `action: 'inchange'`, `'absent'` ou `'invalide'`.
- **`ajouteeLe` stable.** Jamais écrasé après la première pose.
  Rupture de cette règle = régression majeure.

---

## Points d'extension autorisés (évolutions futures)

Ce que ce contrat permet **sans réécriture** :

- Ajouter un nouvel adapter (`LocalStorageDepot`, `IndexedDBDepot`,
  `SessionStorageDepot`, adapter de test avec spy). Il suffit qu'il
  respecte le port.
- Ajouter un champ optionnel à `LigneDuPanier` (ex: `couleurContexte`,
  `derniereModif`). À condition qu'il ait une valeur par défaut et
  qu'aucune invariance existante ne soit cassée.
- Ajouter une méthode de lecture au service (ex: `listerParNiveau`,
  `compterParStatut`). Addition non-cassante.
- Étendre `ResultatMutation.action` avec de nouvelles valeurs. Les
  consommateurs qui ne les connaissent pas tombent dans leur défaut.

Ce que ce contrat **interdit** sans négociation explicite :

- Retirer une méthode de l'API publique du service.
- Changer le type de retour d'une méthode existante.
- Ajouter un statut au-delà des deux canoniques sans acter une
  décision produit écrite (rupture de la règle *deux signaux suffisent*).
- Muter l'état du panier depuis une vue sans passer par le service.
- Stocker dans l'adapter une structure qui ne soit pas sérialisable
  (pour que `LocalStorageDepot` puisse sérialiser sans surprise).

---

## Invariants architecturaux consolidés

Distillés des fiches mémoire et des règles de refactoring progressif.

1. **Le port est un contrat, pas un objet.** Ne pas créer `CM.Panier.Depot`
   comme un objet global : le nom est documentaire. Un adapter
   implémente le contrat.
2. **Une `LigneDuPanier` n'existe qu'au travers du service.** Les vues
   ne construisent jamais une ligne manuellement — elles appellent
   `ajouter` / `basculer` / etc.
3. **L'ordre d'affichage appartient au service.** Le tri est fait
   par `lister({tri})`, pas par l'adapter, pas par la vue.
4. **Validation à la frontière côté service.** L'adapter ne valide pas.
   La vue ne valide pas. Seul le service contrôle.
5. **Immuabilité stricte à la sortie.** Toute ligne retournée est figée.
6. **Notification = mutation réussie.** Les abonnés voient la vérité
   du panier après chaque vrai changement, jamais avant.
7. **Nommage français à la surface.** Méthodes publiques du service en
   français. Helpers techniques internes peuvent rester en anglais
   (`freeze`, `keys`, `values`). Règle 7 du refactoring progressif.
8. **Exemple par commentaire.** Chaque méthode publique ouvre sur un
   `// Exemple:` court. Règle 8 du refactoring progressif.
9. **Pas de fuite DOM dans le service.** Le service ne connaît pas
   `document`, `window`, ni aucune API DOM. Il est testable en pur JS.
   Les vues seules touchent au DOM.
10. **Sécurité : regex stricte sur `ficheId`.** Mêmes règles que
    `CM.Hash`. Aucun `ficheId` non validé ne passe la frontière du
    service.

---

## Ce qui n'est **pas** dans ce contrat (et pourquoi)

- **Le rendu HTML.** Il appartient aux vues (9.B à 9.F). Ce document
  décrit uniquement la donnée et sa mutation.
- **La stratégie de persistance.** C'est une décision produit portée
  par le backlog (session éphémère v1). Le contrat permet les deux.
- **Le workflow d'ajout d'une fiche.** Les voies rapide/lente (9.C/9.D)
  appellent toutes les deux `CM.Panier.ajouter` ou `basculer`. La
  différence ergonomique n'a pas de trace dans l'API.
- **L'export PDF.** Consomme la sortie de `lister()` comme la vue
  imprimable. Aucune API dédiée prévue.

---

## Régénérer le harnais de tests

Ajouté en tranche **9.A.3** suite à la découverte que le patron iframe
(charger `cadre-indicateurs.html` dans un iframe caché, accéder à
`iframe.contentWindow.CM.Panier`) est bloqué par Chrome moderne en
`file://` — chaque fichier local a une origine `null` distincte, ce
que la politique de même-origine interprète comme cross-origin.

La réponse est de **déplacer le code testé dans la même page que le
harnais**, plutôt que de le charger à côté. Pour éviter la duplication,
le code reste écrit une seule fois dans `cadre-indicateurs.html`, et un
générateur Node recopie le bloc dans `tests-panier.html` à la demande.

**Règle d'or :** après toute modification de `CM.Panier` dans
`cadre-indicateurs.html`, lancer :

```
node outils/construire-tests-panier.js
```

Le générateur :

1. Lit `cadre-indicateurs.html`.
2. Extrait le bloc `CM.Panier` entre les marqueurs JS
   `/* ══ CM.Panier — BEGIN ══ */` et `/* ══ CM.Panier — END ══ */`.
3. Lit `tests-panier.html`, trouve la zone balisée
   `<!-- CM.PANIER-INJECTION-BEGIN -->` / `<!-- CM.PANIER-INJECTION-END -->`.
4. Remplace le contenu de la zone par le bloc extrait, enveloppé dans
   un `<script>` avec un prélude `window.CM = window.CM || {};` pour
   permettre au bloc de poser `CM.Panier`.
5. Réécrit `tests-panier.html`.

Le harnais s'exécute ensuite dans la même origine que le code — plus de
blocage cross-origin. Le contrat reste inchangé pour le reste du monde :
les vues continuent d'importer `CM.Panier` via `cadre-indicateurs.html`,
seul le harnais passe par l'inlining.

**Si le générateur crie** (marqueurs manquants, erreur d'E/S), il sort
en code ≠ 0 avec un message descriptif sur `stderr`. Ne jamais éditer
la zone d'injection à la main : toute modif serait écrasée à la
prochaine régénération.

---

*Rédigé en tranche 9.A.0. Relu par Lætitia avant engagement du code.
Section « Régénérer le harnais de tests » ajoutée en tranche 9.A.3.*
