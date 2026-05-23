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
| **I1** | (aucune) | `95 sur 95 indicateurs` | **95** | `s1` | — |
| **I2** | Niveau · Programme | `12 sur 95 indicateurs` | **12** | `p1, p2, p3, p4, p5` | — |
| **I3** | Cadre · DORA | `4 sur 95 indicateurs` | **4** | `o1, o2, o3, o4` | — |
| **I4** | Niveau · Programme **et** Cadre · DORA | `0 sur 95 indicateurs` | **0** | (vide) | « Aucun indicateur ne combine ces lentilles. » |
| **I5** | Niveau · Programme (= I2) | (cf. I2) | (cf. I2) | `p1, p2, p3, p4, p5` — fiabilité décroissante validée : `fiable, fiable, fiable, precaution, precaution` | — |
| **I6** | Niveau · Stratégique **et** Cadre · Scrum | `0 sur 95 indicateurs` | **0** | (vide) | « Aucun indicateur ne combine ces lentilles. » |

---

## Constats à fixer

### C1 — DORA × Programme = 0 est structurel, pas un creux

Les 4 fiches `o1` à `o4` (Fréquence de déploiement, Lead Time for Changes, Change Failure Rate, MTTR) ont toutes `niveau: 'operationnel'`. Aucune fiche du référentiel n'est à la fois `niveau: 'programme'` et taguée DORA. L'intersection vide observée en I4 est donc cohérente avec la doctrine — DORA est une lentille de delivery équipe / opérationnel, pas une lentille programme.

**Garde-fou.** Si dans une exécution future ce nombre passe à >0, c'est qu'on a tagué `programme` un indicateur DORA. C'est à interroger consciemment avant de le valider — soit le nouvel indicateur l'est légitimement (et le journal est mis à jour), soit le tag est un faux ami à corriger.

### C2 — Tri secondaire stable par ordre de déclaration

I5 valide non seulement la fiabilité décroissante (`fiable` avant `precaution`) mais aussi que l'ordre **secondaire** (entre fiches de même fiabilité) suit l'ordre de déclaration dans `CM.Referentiel.tous()`. Pour I2 / I5 : `p1, p2, p3` sont les trois `fiable` du segment Programme, dans l'ordre où elles apparaissent dans la zone balisée du référentiel ; `p4, p5` sont les deux premières `precaution`, même règle.

**Conséquence.** Toute insertion d'une nouvelle fiche `programme + fiable` entre `p3` et `p4` source (par déplacement dans le `.md` ou édition manuelle de la zone balisée) **changera** la valeur de I5. C'est une régression visuelle utilisateur (ordre de la grille). À traiter en commit explicite avec mise à jour du journal.

### C3 — Double libellé pour combinaison vide (oubli d'harmonisation) — ✅ RÉSOLU 09/05/2026

Sur I4 et I6, deux phrasings cohabitaient pour le même état (zéro résultat) :
- côté **compteur** (haut de l'accueil) : « Aucun indicateur ne combine ces lentilles. »
- côté **panneau** (en dessous, dans `#panneau-cartouche-compteur .liste-fiches-vide`) : « Aucune fiche ne correspond à cette combinaison d'axes. »

Deux registres lexicaux divergeaient : *indicateur / fiche*, *combine / correspond*, *lentilles / axes*.

**Résolu le 09/05/2026** (commit `371a671`) — Option A retenue par Lætitia après juxtaposition de 3 options. Le panneau adopte mot pour mot le libellé du compteur : **« Aucun indicateur ne combine ces lentilles. »**. Trois raisons : (i) « indicateur » est le mot canonique côté utilisateur (le compteur global de l'accueil dit déjà « 89 indicateurs ») ; (ii) « lentilles » est le vocabulaire de l'accueil unifié (chantier 23.e/v7), « axes » renvoyait à l'ancienne porte « Par mes 4 axes » retirée au 23.f ; (iii) la voix directe et bienveillante préfère un libellé court, et le panneau hérite de la grammaire qui tourne déjà bien à côté. Commentaire CSS adjacent (`.accueil-unifie .liste-fiches-vide`) aligné dans le même commit. I4 et I6 ci-dessus mis à jour avec le libellé canonique unique.

---

## Notes méthodologiques

- Les valeurs ci-dessus sont valides **tant que** le contenu du référentiel ne change pas et que `CM.RequeteMetriques.executer` reste l'orchestrateur de filtre. Toute évolution de l'un ou de l'autre déclenche une recapture I1-I6 dans la même séance et un commit dédié.
- Le **libellé d'axes actifs** (« Lentilles actives — Niveau. » pour I2, « Lentilles actives — Cadre. » pour I3) ne nomme que **l'axe**, pas la valeur. C'est cohérent avec le code de `_libelleAxesActifs` dans `CM.AccueilUnifie`. Pas un invariant à figer ici, mais à garder en tête si on évolue le libellé un jour.
- I5 a été validé par croisement statique des fiches `p1` à `p5` du référentiel à la même date (cf. `git show d03ccd0:cadre-indicateurs.html` aux lignes ~6020 à ~6068). Pas de capture interactive supplémentaire requise tant que ces 5 fiches restent en tête de Niveau · Programme.

---

## Clôture chantier 23.g (09/05/2026)

Le chantier 23.g — *tests E2E + sentinelles + scénario de non-régression de l'accueil unifié* — est officiellement clos.

### Bilan livré

- **23.g-1** (`8f746e7`) — `scenario-non-regression.md` réécrit pour l'architecture post-23.f : §1-§10 actualisés (~38 pas exécutables), §11 invariants I1-I6 posés en structure.
- **23.g-2** (`6a3ba46`) — `journal-invariants-pre-c.md` retiré (60 l. caduques).
- **23.g-3** (`fab24ff`) — ce journal créé, 6 invariants figés sur HEAD = `d03ccd0`, 3 constats collatéraux fixés.
- **23.g-4** — tests automatisés `CM.AccueilUnifie`, livrés en 5 sous-commits :
  - `46d1221` — squelette du harnais section A + générateur (4 tests pilotes)
  - `56472ba` — section A complète (17 nouveaux tests, total 21 sur stubs)
  - `942733d` — marqueurs `BEGIN/END` autour de `CM.Referentiel` et `CM.IndicateursMeta`
  - `aa98e37` — marqueurs `CM.REFERENTIEL.DATA — BEGIN/END` autour des 15 blocs de données
  - `abfb3aa` — harnais section B (sentinelles I1-I6) + générateur 5-zones (9 tests sur référentiel réel)
- **Préalable C3 résolu** (`371a671`, hors chantier 23.g) — harmonisation des deux libellés vide sur la grammaire canonique du compteur. C3 marqué ✅ RÉSOLU dans ce journal.

### Couverture des invariants

| Invariant | Vérifié à la main (§ 11 scénario) | Vérifié automatiquement |
|---|---|---|
| I1 — total 89 fiches | ✅ | ✅ section B test I1 + cas adjacent A1 |
| I2 — Programme = 9, ids p1-p5 | ✅ | ✅ section B test I2 + cas adjacent A2 |
| I3 — DORA = 4, ids o1-o4 | ✅ | ✅ section B test I3 |
| I4 — Programme ∩ DORA = 0 | ✅ | ✅ section B test I4 + cas adjacent A3 |
| I5 — fiabilité décroissante | ✅ | ✅ section B test I5 |
| I6 — Stratégique ∩ Scrum = 0 | ✅ | ✅ section B test I6 |

Chaque sentinelle automatisée appelle directement `CM.RequeteMetriques.executer(filtre)` sur le référentiel réel inliné. Les cas adjacents A1-A3 valident en plus que la façade publique `CM.AccueilUnifie` (chips → libellés DOM) tombe sur les mêmes valeurs.

### Doctrine de maintenance

Quand une sentinelle passe au rouge, **ce n'est pas un bug à étouffer**. C'est un signal d'évolution du référentiel ou d'un module amont :

1. Ouvrir ce journal → identifier l'invariant qui a bougé.
2. Auditer la cause (ajout de fiche, retag d'un cadre, modification d'une clause de filtre).
3. Si l'évolution est légitime : mettre à jour la valeur figée dans le tableau ci-dessus, mettre à jour le test correspondant dans `tests-accueil-unifie-sentinelles.html`, recommit dédié au geste.
4. Si l'évolution est suspecte (ex. : un indicateur DORA tagué `programme` casse I4) : reverter et discuter avant.

### Outil compagnon

Avant un commit qui touche à `CM.AccueilUnifie`, `CM.Referentiel`, `CM.IndicateursMeta` ou `CM.RequeteMetriques`, lancer :

```
node outils/lancer-tests-accueil-unifie.js
```

Régénère les deux harnais et parse-check syntaxique. La validation comportementale reste manuelle dans Safari (doctrine zéro-dépendance, modules DOM-dépendants).

- **23/05/2026 — mini-chantier gestion du changement (constat n°10).** Six fiches ajoutées au référentiel (cadre Gestion du changement) : `cg-1` à `cg-3` au niveau opérationnel, `cg-4` à `cg-6` au niveau programme. **I1** passe de 89 à 95 (total). **I2** passe de 9 à 12 (Niveau Programme, `cg-4/5/6` sont `programme`). I3, I4, I6 inchangés en valeur, dénominateur réactualisé à 95. **I5 inchangé** : les six fiches `cg-*` sont déclarées en fin de `CM.Referentiel` (dernier bloc `ajouter`), donc la tête du segment Programme reste `p1, p2, p3, p4, p5`. Évolution légitime du référentiel, pas une régression — cf. doctrine sentinelle rouge.
