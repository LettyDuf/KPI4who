# Inventaire du Lexique - chantier 21, jalon B.0

Document de travail. Classe les 142 libellés `term-def` de `cadre-indicateurs.html`
dans les 4 catégories du Lexique, signale les non-termes, les fusions et les
divergences. Sert à valider la classification avec Lætitia avant la rédaction
des définitions canoniques (jalons B.1 à B.4).

Extraction : `outils/extraire-term-def.js`. Données brutes : `inventaire-term-def-brut.md`.


## Synthèse chiffrée

- 190 balises `term-def`, 142 libellés distincts, 24 libellés à définitions divergentes.
- Répartition proposée : 20 cadres, 20 indicateurs, 43 concepts, 49 anti-patterns, 10 non-termes à écarter.
- Après écart des non-termes et fusions, le Lexique compterait environ 124 entrées.

Légende : `(N)` occurrences ; `[div. N]` N définitions divergentes ; `[fusion]` à fusionner ; `[?]` classement à confirmer.


## 1. Cadres et méthodes (20 libellés)

- 5 fonctions du NIST CSF (1) : entrée canonique « NIST CSF »
- Actionable Agile Metrics (1)
- ADKAR (2) [div. 2]
- Balanced Scorecard (1)
- COSO ERM (2)
- COSO ERM appliqué au portefeuille (1) [fusion vers COSO ERM]
- Effortless Experience (1)
- FAIR (2) [div. 2]
- Flow Framework (1)
- Flow Metrics (1) : six métriques portefeuille SAFe v6
- ISO 31000 (2)
- ITIL Service Operation (1)
- LPM (2) [div. 2] : Lean Portfolio Management
- management par objectifs (1)
- Predictable Revenue (2) [div. 2]
- Sales Accélération Formula (2) [div. 2] : titre fautif, voir constat C3
- Sirius Décisions Demand Waterfall (1)
- SPIN Selling (2) [div. 2]
- Théorie des Contraintes (1)
- tradition Six Sigma (1) : entrée canonique « Six Sigma »


## 2. Indicateurs et métriques (20 libellés)

- BCP/DRP testé (1)
- CES (2) [div. 2] : Customer Effort Score
- churn à 3 mois (1) [fusion]
- churn à 3 mois post-signature (1) [fusion vers churn à 3 mois]
- coûts de qualité (1)
- demandes de changement (1)
- FCR (1) : First Contact Resolution
- initiatives mises en service (1)
- lead time (1)
- Lead Time produit (1)
- leads qualifiés par le marketing (MQL) (1)
- leads qualifiés par les ventes (SQL) (1)
- livraisons majeures (1)
- LTV par canal d'origine (1) : libellé à corriger, voir constat C1
- prise en charge réelle (1) : Time to Meaningful Response
- taux de conversion par étape (1)
- taux de réouverture (1)
- taux SQL vers Closed Won (1)
- Time to First Response (TTFR) (1)
- Time to Resolution (2) [div. 2]


## 3. Concepts (43 libellés)

- accord de qualification (1) : SLA marketing-ventes
- analyse de dépendances cachées (1)
- anti-patterns (3) [div. 3] : le terme méta lui-même
- batch size (2) [div. 2] [fusion vers Taille des lots]
- bus factor (1)
- catchball (1)
- classification de priorité (1) : classification ITIL des incidents
- cohorte (1)
- contact qualifié (1)
- cygne noir (2) [div. 2]
- Demand Waterfall local (1)
- distribution (scatterplot) (1)
- durée vue par le commanditaire (1)
- Effet Goodhart (9) [div. 9] [fusion : pivot de la famille Goodhart]
- effet Goodhart (3) [div. 3] [fusion vers Effet Goodhart]
- épics (1)
- feature flags (1)
- flow item (1) [fusion]
- flow items (2) [div. 2] [fusion vers flow item]
- Gemba (6) [div. 6]
- Goodhart (4) [div. 4] [fusion vers Effet Goodhart]
- Goodhart temporel (1) : variante, renvoi vers Effet Goodhart
- indicateur de diagnostic (1)
- loi de Little (2) [div. 2]
- loyauté Reichheld (1)
- muda (1)
- outcome (5) [div. 3] : entrée pivot de la famille outcome
- outcome amont (1) : famille outcome
- outcome relationnel (1) : famille outcome
- outcome retardé (1) : famille outcome
- outcome-racine (1) : famille outcome
- points de concentration critiques (1)
- quantification structurée (Hubbard) (1)
- rattachement administratif (1)
- regelée (1) [?] : phase de regel du modèle de Lewin, libellé à revoir
- règle des 94 % de Deming (3) [div. 3]
- réponse non-vide (1) : Meaningful Response
- self-control (1) : self-control de Drucker
- stratégie planifiée vs stratégie émergente (1)
- taille des lots (1) [fusion : entrée canonique « Taille des lots »]
- temps d'attente (1) : libellé à corriger, voir constat C1
- théories en usage vs théories adoptées (1)
- zone neutre (1) : zone neutre de Bridges


## 4. Anti-patterns et pièges de mesure (49 libellés)

- acharnement thérapeutique (1)
- adoption de façade (1)
- adoption déclarée (1)
- alignement de façade (1)
- capteur en dialecte local (1)
- capteur posé après coup (1)
- cascade unilatérale descendante (1)
- cible à zéro (1)
- classement des équipes (1)
- concentration cachée (1)
- confusion entre communication et compréhension (1)
- cynisme stratégique (1)
- déclassement cosmétique (1)
- découpage factice (1)
- définition de « fini » ajustée à la baisse (1)
- deploy theater (1)
- diversification cosmétique (1)
- effet porte tournante inversé (1)
- faux précis (1)
- glissement de la date de mise en service (1)
- KPI individuel (3) [div. 3]
- liste stratégique fourre-tout (1)
- mesure du déclaratif (1)
- mesure trop précoce (1)
- moyenne au lieu de médiane et P85 (1)
- moyenne trompeuse (1)
- objectifs gravés pour l'année (1) : libellé à corriger, voir constat C1
- optimisation locale (2) [div. 2]
- pastèque organisationnelle (1)
- phantom delivery (2) [div. 2]
- pilotage à la moyenne (1)
- pilote pris pour diffusion (1)
- point de contrôle déguisé (1)
- rassurance par la moyenne (1)
- rattachement cosmétique (1)
- réécriture rétrospective de la stratégie (1)
- régression traitée en faute (1)
- relâchement des critères d'acceptation (1) : libellé à corriger, voir constat C1
- requalification des demandes en « précisions » (1)
- requalifier les reprises (1)
- résultat clé décoratif (1)
- retour vu comme faute d'équipe (1) : libellé à corriger, voir constat C1
- revue d'alignement absorbée par la livraison (1) : libellé à corriger, voir constat C1
- scoring individuel (1)
- scoring nominatif par équipe (1)
- sondage nominatif (1)
- sous-comptage systématique des coûts cachés (1)
- splitting d'initiatives (1) : libellé à corriger, voir constat C1
- usage en évaluation individuelle ou par équipe (1)


## 5. Non-termes à écarter (10 libellés)

Ces libellés portent une balise `term-def` mais ne sont pas des termes de
glossaire. Huit sont des noms d'auteurs ou d'organisations (la décision du
24/05 exclut les auteurs des entrées : ils se tissent dans les définitions de
concept). Deux sont des fragments à rattacher à une entrée existante.

- Deming (4) [div. 4] : auteur. Les 4 définitions nourriront « règle des 94 % de Deming » et les concepts qualité.
- Dixon (2) [div. 2] : auteur (Matthew Dixon).
- Drucker, dans Managing for Results (1) : fragment de citation, pas un terme.
- Flyvbjerg (1) : auteur (Bent Flyvbjerg).
- Humble (1) : auteur (John W. Humble, MBO 1972).
- Knowledge et Ability (1) : phases d'ADKAR, à rattacher à l'entrée ADKAR.
- Lencioni (1) : auteur (Patrick Lencioni).
- Locke et Latham (1) : auteurs (théorie de fixation des objectifs).
- Reinforcement (1) : phase d'ADKAR, à rattacher à l'entrée ADKAR.
- Standish Group (1) : organisation (rapport CHAOS).

Conséquence à arbitrer : voir l'arbitrage A1 ci-dessous (tension avec l'invariant I1 de la sentinelle).


## 6. Fusions proposées

- **Famille Goodhart** : `Effet Goodhart`, `effet Goodhart`, `Goodhart` désignent le même concept (variantes de casse et de forme). Une seule entrée canonique « Effet Goodhart ». `Goodhart temporel` reste une entrée distincte (variante nommée), avec un renvoi.
- **Taille des lots** : `batch size` (anglicisme) et `taille des lots` fusionnent en une entrée « Taille des lots ».
- **churn à 3 mois** : `churn à 3 mois` et `churn à 3 mois post-signature` fusionnent.
- **COSO ERM** : `COSO ERM appliqué au portefeuille` est une contextualisation, fusionne dans « COSO ERM ».
- **flow item** : `flow item` et `flow items` fusionnent (singulier et pluriel).
- **Famille outcome** : `outcome` est l'entrée pivot ; `outcome amont`, `outcome relationnel`, `outcome retardé`, `outcome-racine` sont pédagogiquement distincts. Proposition : les garder comme entrées propres reliées par renvois plutôt que les fondre. À confirmer.
- **ADKAR** absorbe les fragments `Knowledge et Ability` et `Reinforcement`.

Effet des fusions sur le compte : environ 124 entrées après écart des 10 non-termes et de 8 doublons de fusion.


## 7. Divergences à résoudre (24 libellés)

24 libellés portent plusieurs définitions selon la fiche. La résolution (choisir
ou rédiger une définition canonique) se fait pendant les jalons B.1 à B.4.

Cas lourds : `Effet Goodhart` (9), `Gemba` (6), `Goodhart` (4), `Deming` (4),
`effet Goodhart` (3), `anti-patterns` (3), `KPI individuel` (3), `outcome` (3),
`règle des 94 % de Deming` (3).

Cas légers (2 définitions) : `ADKAR`, `batch size`, `CES`, `cygne noir`,
`Dixon`, `FAIR`, `flow items`, `loi de Little`, `LPM`, `optimisation locale`,
`phantom delivery`, `Predictable Revenue`, `Sales Accélération Formula`,
`SPIN Selling`, `Time to Resolution`.

Note : une partie de ces divergences disparaît par la fusion (section 6). La
famille Goodhart, une fois fusionnée, demande de réconcilier 16 variantes en une
définition canonique : c'est le plus gros morceau éditorial du jalon B.


## 8. Constats collatéraux

- **C1 : 7 libellés `term-def` contiennent un backslash parasite.** Dans le HTML,
  `LTV par canal d'origine`, `objectifs gravés pour l'année`, `relâchement des
  critères d'acceptation`, `retour vu comme faute d'équipe`, `revue d'alignement
  absorbée par la livraison`, `splitting d'initiatives` et `temps d'attente`
  s'écrivent avec `\'` au lieu de `'`. L'utilisateur voit un backslash dans le
  mot souligné. À corriger.
- **C2 : les attributs `data-def` contiennent des `\'` rendus littéralement.**
  L'infobulle s'affiche en CSS pur via `content: attr(data-def)`. Les `\'`
  hérités d'un échappement JavaScript apparaissent donc tels quels dans la
  bulle. Environ 159 balises concernées. À nettoyer, d'autant que le jalon B
  reprend cette matière comme source des définitions du Lexique.
- **C3 : « Sales Accélération Formula » est un titre fautif.** Le cadre de Mark
  Roberge s'intitule « The Sales Acceleration Formula » (sans accent). Le
  libellé mélange français et anglais de façon incorrecte.

C1, C2 et C3 ne sont pas hors sujet : le jalon B reprend les `term-def` comme
matière de base. La correction sera traitée dans le flux du jalon B.


## 9. Arbitrages pour Lætitia

- **A1 : sort des non-termes (tension avec la sentinelle).** L'invariant I1 du
  doc compagnon exige que tout `term-def` du HTML ait une entrée au Lexique. Or
  la décision « les auteurs ne sont pas des entrées » crée 10 libellés orphelins
  (section 5). Trois issues : (a) retirer la balise `term-def` de ces 10
  libellés dans le HTML ; (b) leur donner une entrée minimale au Lexique ;
  (c) doter la sentinelle d'une liste d'exclusions explicite. Recommandation :
  (a), parce qu'un nom d'auteur n'a pas vocation à porter une infobulle de
  glossaire, et que cela garde l'invariant I1 strict.
- **A2 : validation de la classification.** Les 142 libellés sont rangés en 4
  catégories ci-dessus. Quelques classements sont discutables et méritent un
  regard : `bus factor` (concept ou indicateur), `temps d'attente` (concept ou
  indicateur), `Flow Metrics` et `tradition Six Sigma` (cadre ou concept),
  `optimisation locale` (anti-pattern ou concept).
- **A3 : famille outcome.** Garder `outcome amont`, `outcome relationnel`,
  `outcome retardé`, `outcome-racine` comme entrées propres reliées par renvois,
  ou les fondre dans une seule entrée « outcome » ? Recommandation : entrées
  propres, elles portent chacune une nuance pédagogique distincte.


## 10. Prochain pas

Après validation de la classification et des arbitrages A1 à A3 : ouvrir les
jalons B.1 à B.4, une passe de rédaction par catégorie, pour produire
`lexique-source.md` (définitions canoniques, divergences résolues).
