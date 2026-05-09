# Journal des invariants — chantier 23.g (post-accueil unifié)

Valeurs de référence figées **après livraison du chantier 23.f** (refonte radicale en accueil unifié, retrait des 4 portes du chantier 7.2a et de la pyramide). Toute divergence observée plus tard dans une exécution de `scenario-non-regression.md` §11 = stop, diagnostic, rollback ou mise à jour explicite du journal.

**HEAD de référence** : `d03ccd0` (= tag `mvp-chantier-23-livre`, fin du chantier 23.f hors clôture docs).
**Date de capture** : 8 mai 2026.
**Méthode** : test interactif côté Lætitia (Safari, session privée), sonde JS console (cf. ci-dessous), résultats relevés en chat puis figés ici.

---

## Sonde utilisée

À copier-coller dans la console développeur, puis appeler `sonde()` après chaque manipulation de chips.

```js
function sonde() {
  const c = document.querySelector('.cartouche[data-cartouche="compteur"] .cartouche-libelle').innerText.replace(/\s+/g, ' ').trim();
  const cartes = [...document.querySelectorAll('#panneau-cartouche-compteur .carte-ind')];
  const ids = cartes.slice(0, 5).map(x => {
    const m = x.getAttribute('onclick').match(/'([^']+)'/);
    return m ? m[1] : '?';
  });
  const vide = document.querySelector('#panneau-cartouche-compteur .liste-fiches-vide');
  return { compteur: c, nb_cartes: cartes.length, premiers_ids: ids, message_vide: vide ? vide.innerText : null };
}
```

**Pré-requis d'exécution.** Être sur l'accueil unifié (entrée *Accueil* du bandeau active, `#accueil-portes` visible) et avoir déplié la cartouche compteur (clic dessus). Sinon la sonde renvoie `null is not an object` parce que la cartouche n'est pas dans le DOM rendu / dépliée.

---

## Tableau des invariants

| # | Lentilles actives | Compteur | nb_cartes | Premiers ids | Message vide |
|---|---|---:|---:|---|---|
| **I1** | (aucune) | `89 sur 89 indicateurs` | **89** | `s1` | — |
| **I2** | Niveau · Programme | `9 sur 89 indicateurs` | **9** | `p1, p2, p3, p4, p5` | — |
| **I3** | Cadre · DORA | `4 sur 89 indicateurs` | **4** | `o1, o2, o3, o4` | — |
| **I4** | Niveau · Programme **et** Cadre · DORA | `0 sur 89 indicateurs` | **0** | (vide) | « Aucune fiche ne correspond à cette combinaison d'axes. » |
| **I5** | Niveau · Programme (= I2) | (cf. I2) | (cf. I2) | `p1, p2, p3, p4, p5` — fiabilité décroissante validée : `fiable, fiable, fiable, precaution, precaution` | — |
| **I6** | Niveau · Stratégique **et** Cadre · Scrum | `0 sur 89 indicateurs` | **0** | (vide) | « Aucune fiche ne correspond à cette combinaison d'axes. » |

---

## Constats à fixer

### C1 — DORA × Programme = 0 est structurel, pas un creux

Les 4 fiches `o1` à `o4` (Fréquence de déploiement, Lead Time for Changes, Change Failure Rate, MTTR) ont toutes `niveau: 'operationnel'`. Aucune fiche du référentiel n'est à la fois `niveau: 'programme'` et taguée DORA. L'intersection vide observée en I4 est donc cohérente avec la doctrine — DORA est une lentille de delivery équipe / opérationnel, pas une lentille programme.

**Garde-fou.** Si dans une exécution future ce nombre passe à >0, c'est qu'on a tagué `programme` un indicateur DORA. C'est à interroger consciemment avant de le valider — soit le nouvel indicateur l'est légitimement (et le journal est mis à jour), soit le tag est un faux ami à corriger.

### C2 — Tri secondaire stable par ordre de déclaration

I5 valide non seulement la fiabilité décroissante (`fiable` avant `precaution`) mais aussi que l'ordre **secondaire** (entre fiches de même fiabilité) suit l'ordre de déclaration dans `CM.Referentiel.tous()`. Pour I2 / I5 : `p1, p2, p3` sont les trois `fiable` du segment Programme, dans l'ordre où elles apparaissent dans la zone balisée du référentiel ; `p4, p5` sont les deux premières `precaution`, même règle.

**Conséquence.** Toute insertion d'une nouvelle fiche `programme + fiable` entre `p3` et `p4` source (par déplacement dans le `.md` ou édition manuelle de la zone balisée) **changera** la valeur de I5. C'est une régression visuelle utilisateur (ordre de la grille). À traiter en commit explicite avec mise à jour du journal.

### C3 — Double libellé pour combinaison vide

Sur I4 et I6, deux phrasings cohabitent pour le même état (zéro résultat) :
- côté **compteur** (haut de l'accueil) : « Aucun indicateur ne combine ces lentilles. »
- côté **panneau** (en dessous, dans `#panneau-cartouche-compteur .liste-fiches-vide`) : « Aucune fiche ne correspond à cette combinaison d'axes. »

Deux registres lexicaux : *indicateur / fiche*, *combine / correspond*, *lentilles / axes*. À arbitrer dans un commit éditorial dédié — choix volontaire à confirmer (deux endroits, deux registres) ou harmonisation à effectuer.

---

## Notes méthodologiques

- Les valeurs ci-dessus sont valides **tant que** le contenu du référentiel ne change pas et que `CM.RequeteMetriques.executer` reste l'orchestrateur de filtre. Toute évolution de l'un ou de l'autre déclenche une recapture I1-I6 dans la même séance et un commit dédié.
- Le **libellé d'axes actifs** (« Lentilles actives — Niveau. » pour I2, « Lentilles actives — Cadre. » pour I3) ne nomme que **l'axe**, pas la valeur. C'est cohérent avec le code de `_libelleAxesActifs` dans `CM.AccueilUnifie`. Pas un invariant à figer ici, mais à garder en tête si on évolue le libellé un jour.
- I5 a été validé par croisement statique des fiches `p1` à `p5` du référentiel à la même date (cf. `git show d03ccd0:cadre-indicateurs.html` aux lignes ~6020 à ~6068). Pas de capture interactive supplémentaire requise tant que ces 5 fiches restent en tête de Niveau · Programme.
