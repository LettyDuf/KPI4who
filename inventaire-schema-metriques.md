# Inventaire du schéma d'étiquettes — `cadre-indicateurs.html`

Livrable de l'**étape (a)** du chantier 14 (refactor hexagonal du socle MVP 4 portes).
Document descriptif et prescriptif, aucun code touché.

Baseline : `4fc21bb` (ouverture chantier 14, tag `baseline-avant-hexagonal` sur `5655b03`).

---

## 1. Vue d'ensemble — trois zones de données disjointes

Le fichier embarque aujourd'hui **trois catalogues de données** qui communiquent, mais sont éditoriale­ment indépendants. Le refactor hexagonal s'appuiera sur cette séparation existante pour en faire un contrat propre.

1. **Fiches métriques** — `CM.Referentiel._indicateurs`, ~84 fiches, ajoutées par 14 appels à `CM.Referentiel.ajouter([…])` (lignes 4389 → 5465). C'est la **source de vérité** du référentiel.
2. **Tagging multi-axes des métriques** — `CM.IndicateursMeta` (lignes 3413 → 3764). Table séparée qui enrichit chaque fiche d'un `tags` (famille de problèmes) et d'un `cadres` (frameworks). Principe explicite : **open/closed** — les portes par problème, par cadre, par maturité filtrent ici, jamais dans la fiche.
3. **Catalogue des rôles** — `CM._rolesData` (lignes 3786 → 4211), **53 fiches** de rôles, consommé par `CM.Roles`. Chaque rôle porte un niveau et des axes Mintzberg. C'est le vocabulaire de la porte *Par mon niveau*, pas un type de donnée filtré.

Les vocabulaires d'affichage (couleurs, libellés, pédagogie, fiabilité, maturité) vivent dans `CM.Config` (lignes 2545 → 2728).
Les domaines et branches (sous-catégories du niveau équipe uniquement) vivent dans `CM.Domaine` (lignes 5472 → 5511).

> **Implication pour `CM.RequeteMetriques`** — le cœur hexagonal à extraire en (b) doit savoir joindre (1) et (2). Il ignore (3) — les rôles ne font pas partie du référentiel, ils sont un **producteur de filtre**. L'autre sens (enrichir les fiches avec un axe Mintzberg) est traité en section 5.

---

## 2. Champ par champ — schéma d'une fiche métrique

Une fiche métrique est un objet littéral. Trois familles de champs, clairement distinguées dans le document mais **mélangées dans le code** (c'est un des écarts).

### 2.1 Champs filtrables (structurels)

Ces champs servent de critère à la sélection — ce sont les seuls qui intéressent directement `CM.RequeteMetriques`.

| Champ | Type | Vocabulaire | Obligatoire | Observation |
|---|---|---|---|---|
| `id` | string | — | oui | Identifiant stable ; préfixes `s-`, `t-`, `p-`, `o-`, `ti-d`, `ti-p`, `ti-o`, `ti-s`, `x-`, `af-c`, `af-m`, `af-f`, `af-r`, `af-op`, `af-sc`. Le préfixe suggère un niveau mais **ne colle pas systématiquement** (ex. `x3` est au niveau tactique). |
| `niveau` | enum 4 | `strategique \| tactique \| programme \| operationnel` | oui | Vocabulaire **interne** (niveauData). Distinct des vocabulaires de surface et des rôles — voir §3.1. |
| `branche` | enum 2 | `ti \| affaires` | non | Présent **uniquement** sur les fiches de niveau `operationnel`. |
| `domaine` | enum 10 | `dev`, `plateforme`, `ops-support`, `sécurité`, `commercial`, `marketing`, `finance`, `rh`, `operations`, `service-client` | non | Sous-catégorisation du niveau équipe. Présent uniquement si `branche` l'est. |
| `type` | enum 7 | `IGO \| ICP \| ICC \| ORC \| DORA \| FLUX \| II` | oui | Correspond au vocabulaire KGI/KPI/KBI/OKR/DevOps/Flux/KII — voir §3.2. |
| `roles` | array enum 5 | `direction`, `portefeuille`, `programme`, `chef-équipe`, `membre-équipe` | oui | **Tag grossier de strate**, pas les rôles fins du catalogue. Une fiche peut cibler plusieurs strates. |
| `prioritaire` | boolean | — | oui | Signal éditorial « métrique socle recommandée » ; pas une règle de filtrage, plutôt un ordonnanceur par défaut. |
| `fiabilite` | enum 3 | `fiable \| precaution \| risque` | oui | Gradation du risque d'instrumentalisation (Goodhart) — voir §3.4. |
| `maturite_min` | enum 3 | `debutant \| intermediaire \| avance` | oui | Maturité minimale de l'équipe/organisation pour utiliser la métrique sans se faire mal. |

### 2.2 Champs de présentation

| Champ | Type | Description |
|---|---|---|
| `icone` | string (emoji) | Pictogramme de la fiche, purement visuel. |
| `nom` | string | Titre de la fiche (affichage). |

### 2.3 Champs éditoriaux (contenu lu par l'utilisateur)

| Champ | Type | Description |
|---|---|---|
| `definition` | HTML | Ce que la métrique mesure, avec tooltips `term-def` et `strong`. |
| `objectif` | HTML | Usage stratégique/opérationnel de la métrique. |
| `frequence` | string | Rythme de mesure recommandé. |
| `exemple_ent` | HTML | Exemple au niveau entreprise. |
| `exemple_eq` | HTML | Exemple au niveau équipe. |
| `risque` | HTML | Anti-patterns à nommer explicitement (exigence éditoriale : 2 à 4 anti-patterns). |
| `alt` | HTML | Alternatives si la métrique n'est pas le bon choix (champ optionnel). |

### 2.4 Champs de tagging *externalisés* dans `CM.IndicateursMeta.META`

Rappel : ces deux champs ne vivent **pas** sur la fiche, mais dans un second canal. Filtrables au même titre que les champs §2.1.

| Champ externalisé | Type | Vocabulaire | Observation |
|---|---|---|---|
| `tags` | array enum 7 | `delais`, `qualite`, `flux`, `valeur`, `humain`, `alignement`, `risque` | Familles de problèmes que la métrique éclaire. Une métrique peut porter plusieurs tags. |
| `cadres` | array enum 10 | `dora`, `lean`, `okr`, `mbo`, `scrum`, `kanban`, `safe`, `itil`, `bsc`, `generique` | Frameworks qui revendiquent la métrique. `generique` est un fallback, masqué à l'affichage dès qu'un cadre spécifique est présent. |

---

## 3. Vocabulaires fermés — recensement exhaustif

### 3.1 Niveaux — **trois vocabulaires en cohabitation** (écart)

C'est le point le plus structurant de cet inventaire. La même notion de « niveau » porte trois vocabulaires dans trois zones du code :

| Zone | Valeur 1 | Valeur 2 | Valeur 3 | Valeur 4 |
|---|---|---|---|---|
| **Fiches métriques** (`ind.niveau`, valeur stockée) | `strategique` | `tactique` | `programme` | `operationnel` |
| **Routing / surface** (`CM.Config.NIVEAUX.id`) | `strategique` | `portefeuille` | `programme` | `equipes` |
| **Fiches rôles** (`role.niveau`) | `entreprise` | `portefeuille` | `programme` | `équipe` |

Les mappings sont connus :
- Fiches → surface : `tactique ↔ portefeuille`, `operationnel ↔ equipes` (voir `CM.Config.NIVEAUX.niveauData`).
- Rôles → surface : `entreprise ↔ strategique`, `équipe ↔ equipes` (implicite, porté par `CM.Roles`).

Impact : le cœur hexagonal doit recevoir une **seule** valeur canonique et traduire aux frontières. Cf. §5.1.

### 3.2 Types d'indicateurs (`type` — vocabulaire KGI/KPI/KBI/OKR/KII)

Depuis `CM.Config.TYPES_LIBELLES` :

| Code | Libellé | Correspondance |
|---|---|---|
| `IGO` | Indicateur Global d'Objectif | **KGI** (Drucker) |
| `ICP` | Indicateur Clé de Performance | **KPI** |
| `ICC` | Indicateur Clé de Comportement | **KBI** |
| `ORC` | Objectifs & Résultats Clés | **OKR** |
| `II`  | Indicateur d'Impact | **KII** |
| `DORA`| Performance DevOps | DORA (famille) |
| `FLUX`| Flux & Throughput | Lean / Kanban |

> **Constat éditorial.** Ce vocabulaire recouvre exactement la taxonomie que le projet a affichée comme centrale (KPI, KBI, KGI, OKR, KII, DORA). Aucun écart éditorial — la cohérence est déjà là.

### 3.3 Rôles (champ `roles` sur la fiche — vocabulaire fermé de 5)

| Valeur | Lecture |
|---|---|
| `direction` | Strate stratégique / comité de direction. |
| `portefeuille` | Strate d'arbitrage portefeuille / programme haut. |
| `programme` | Strate de pilotage programme. |
| `chef-équipe` | Management de proximité. |
| `membre-équipe` | Contributeur individuel. |

> Ce vocabulaire est **à gros grain**. Il ne distingue pas un CEO d'un CFO d'un CTO (tous `direction`), ni un Scrum Master d'un Tech Lead (tous `membre-équipe`). Voir §5.2 et §5.3.

### 3.4 Fiabilité (`fiabilite`)

| Valeur | Libellé | Signal éditorial |
|---|---|---|
| `fiable` | Fiable | Métrique objective, peu instrumentalisable. À privilégier. |
| `precaution` | À utiliser avec soin | Interprétation délicate, toujours contextualiser. |
| `risque` | Courant & risqué | Très répandue mais facilement instrumentalisée (Goodhart). |

### 3.5 Maturité minimale (`maturite_min`)

| Valeur | Libellé | Horizon |
|---|---|---|
| `debutant` | Équipe débutante | 0 – 12 mois |
| `intermediaire` | Équipe intermédiaire | 1 – 2 ans |
| `avance` | Équipe avancée | > 2 ans |

### 3.6 Branches et domaines (niveau équipe seulement)

| Branche | Libellé | Domaines |
|---|---|---|
| `ti` | Équipes TI | `dev`, `plateforme`, `ops-support`, `sécurité` |
| `affaires` | Équipes Affaires | `commercial`, `marketing`, `finance`, `rh`, `operations`, `service-client` |

### 3.7 Tags de problèmes (`CM.IndicateursMeta.TAGS` — vocabulaire fermé de 7)

`delais` · `qualite` · `flux` · `valeur` · `humain` · `alignement` · `risque`

Libellés affichés : Délais & prévisibilité, Qualité & stabilité, Flux & goulots, Valeur & rentabilité, Engagement & humain, Alignement stratégique, Risque sécurité & conformité.

### 3.8 Cadres méthodologiques (`CM.IndicateursMeta.CADRES` — 10 actifs + 10 à venir)

**Actifs (utilisés dans le tagging META)** :
`dora` · `lean` · `okr` · `mbo` · `scrum` · `kanban` · `safe` · `itil` · `bsc` · `generique`

**À venir (affichés grisés côté porte 3, jamais dans META)** :
`xp` · `ebm` · `toc` · `queues` · `space` · `flow` · `hoshin` · `cobit` · `cynefin` · `wardley`

### 3.9 Familles de cadres (`CM.IndicateursMeta.FAMILLES` — 7 écoles de pensée)

Regroupement académique des cadres pour désamorcer les batailles de chapelles :

| Famille | Libellé | Cadres membres (actifs) |
|---|---|---|
| `empirisme-agile` | Empirisme agile | `scrum`, `kanban`, `safe` |
| `excellence-op` | Excellence opérationnelle | `lean` |
| `observabilite` | Observabilité du delivery | `dora` |
| `objectifs` | Pilotage par les objectifs | `okr`, `mbo`, `bsc` |
| `itsm` | IT Service Management | `itil` |
| `decision` | Aide à la décision | *(aucun actif — cadres à venir)* |
| `universel` | Universel | `generique` |

### 3.10 Axes Mintzberg (catalogue des rôles uniquement — 4 valeurs cumulables)

Vocabulaire porté par `role.axes` dans `CM._rolesData`, whitelisté par `CM.Roles.axesValides()` :

`projet` · `méthodologique` · `humaine` · `stratégique`

> **Écart structurant** : cet axe **n'existe pas** sur les fiches métriques. Voir §5.3.

### 3.11 Niveaux côté rôles (`role.niveau` — 4 valeurs, vocabulaire distinct)

`entreprise` · `portefeuille` · `programme` · `équipe`

---

## 4. Inventaire fiche par fiche — 4 tables par niveau

Format de table : `id | nom court | type | fiabilité | tags (problèmes) | cadres`.

Les colonnes **axes proposés** et **socle/spécifique** (recommandations §5.3 et §5.4) sont volontairement absentes — elles seront remplies lors de l'étape de complétion éditoriale, avec relecture, pas en mode inventaire.

Totaux : **84 fiches** — 10 stratégiques, 8 portefeuille, 7 programme, 59 équipe.

### 4.1 Niveau stratégique (10 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| s1 | Croissance du chiffre d'affaires | IGO | fiable | valeur | bsc · generique |
| s2 | Indice de recommandation client (NPS) | ICP | precaution | valeur · qualite | generique |
| s3 | Résultat opérationnel brut (EBITDA) | IGO | fiable | valeur | bsc · generique |
| s4 | Objectifs stratégiques annuels (OKR) | ORC | precaution | alignement · valeur | okr · mbo |
| s5 | Part de marché | ICP | fiable | valeur · alignement | bsc · generique |
| s6 | Capacité d'absorption du changement (ADKAR) | ICP | precaution | humain · alignement | generique |
| s7 | Taux de rotation volontaire réfléchi | ICP | precaution | humain · risque | generique |
| s8 | Indice de confiance organisationnelle | ICP | precaution | humain · alignement | generique |
| s9 | Indice de maturité cybersécurité (NIST) | ICP | precaution | risque | generique |
| s10 | Exposition de concentration (dépendances critiques) | ICP | precaution | risque | generique |

### 4.2 Niveau portefeuille / tactique (8 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| t1 | Rendement du portefeuille d'initiatives (ROI) | ICP | precaution | valeur | safe · generique |
| t2 | Délai de commercialisation (Lead Time métier) | ICP | fiable | delais · valeur | lean · safe |
| t3 | Objectifs trimestriels de portefeuille | ORC | precaution | alignement | okr · mbo |
| t4 | Efficacité de flux du portefeuille | FLUX | precaution | flux | lean · kanban · safe |
| t5 | Taux de livraison dans les délais | ICP | precaution | delais | safe · generique |
| x3 | Taux d'occupation des ressources | ICP | risque | flux · humain | generique |
| t6 | Taux d'initiatives en dérive critique | ICP | precaution | risque | safe · generique |
| t7 | Profil de taille des initiatives actives | ICP | precaution | risque · flux | safe · lean · generique |

### 4.3 Niveau programme (7 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| p1 | Taux d'avancement des jalons | ICP | fiable | delais · alignement | safe · generique |
| p2 | Écart budget (Budget Variance) | ICP | fiable | valeur | safe · generique |
| p3 | Risques critiques ouverts | II | fiable | risque | safe · itil · generique |
| p4 | Satisfaction des parties prenantes | ICP | precaution | humain · alignement | safe · generique |
| p5 | Débit d'initiatives livrées (Programme Throughput) | FLUX | precaution | flux · valeur | lean · safe · kanban |
| p6 | Taux d'acceptation au premier passage | ICP | precaution | qualite · alignement | generique |
| p7 | Taux de reprise post-livraison | ICP | precaution | qualite · valeur | lean · generique |

### 4.4 Niveau équipe / opérationnel (59 fiches, décomposé par branche × domaine)

#### 4.4.1 TI / DORA — livraison logicielle (9 fiches, sans domaine explicite côté TI)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| o1 | Fréquence de déploiement | DORA | fiable | flux · delais | dora |
| o2 | Délai de livraison des changements (Lead Time for Changes) | DORA | fiable | delais · flux | dora · lean |
| o3 | Taux d'échec des changements (Change Failure Rate) | DORA | fiable | qualite · risque | dora |
| o5 | Durée de cycle (Cycle Time) | FLUX | fiable | flux · delais | lean · kanban · dora |
| o8 | Couverture de tests automatisés | ICC | precaution | qualite | lean · generique |
| o4 | Temps de rétablissement du service (MTTR) | DORA | fiable | qualite · risque | dora · itil |
| o6 | Débit d'équipe (Throughput) | FLUX | fiable | flux | lean · kanban · scrum |
| o7 | Encours de travail (WIP) | FLUX | fiable | flux | kanban · lean |
| o9 | Objectifs & Résultats Clés d'équipe (OKR) | ORC | precaution | alignement | okr · mbo |

> Ces fiches **ne portent pas** `branche` ni `domaine`. Elles s'affichent au niveau équipe sans sous-catégorisation — leurs métriques DORA/flux sont transverses à toute équipe logicielle.

#### 4.4.2 TI / Dev (4 fiches, branche=ti, domaine=dev)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| ti-d1 | Ratio de dette technique | ICC | precaution | qualite · risque | lean · generique |
| ti-d2 | Taux de complétion de sprint | ICP | precaution | delais · flux | scrum |
| ti-d3 | Taux de défauts échappés en production | DORA | fiable | qualite | dora · lean |
| ti-d4 | Délai de revue de code (PR Turnaround Time) | ICC | fiable | flux · delais | dora · lean |

#### 4.4.3 TI / Plateforme (5 fiches, branche=ti, domaine=plateforme)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| ti-p1 | Disponibilité du pipeline CI/CD | ICP | fiable | qualite · risque | dora · itil |
| ti-p2 | Durée moyenne de build | FLUX | fiable | flux · delais | dora · lean |
| ti-p3 | Taux de succès du pipeline | DORA | fiable | qualite · flux | dora |
| ti-p4 | Délai de provisionnement d'infrastructure | FLUX | fiable | delais · flux | dora · lean |
| ti-p5 | Taux d'adoption de l'Infrastructure-as-Code | ICC | fiable | qualite · risque | dora · generique |

#### 4.4.4 TI / Ops & Support (5 fiches, branche=ti, domaine=ops-support) + o4 (doublon partiel)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| ti-o1 | MTBF — Temps moyen entre pannes | ICP | fiable | qualite · risque | itil · generique |
| ti-o2 | Résolution au premier contact (FCR) | ICP | fiable | qualite · humain | itil · generique |
| ti-o3 | Conformité SLA (SLA Compliance Rate) | ICP | precaution | qualite · delais | itil · generique |
| ti-o4 | Taux de récurrence d'incidents | ICC | fiable | qualite · risque | itil · lean |
| ti-o5 | Coût moyen par ticket de support | ICP | precaution | valeur · flux | itil · lean |

> `o4` (MTTR) est dans la table 4.4.1 (DORA). Aucun doublon de `id`, juste une proximité thématique entre « MTTR DORA » (restauration applicative) et les métriques ITIL d'Ops (MTBF, SLA, FCR). À conserver distinct.

#### 4.4.5 TI / Sécurité (5 fiches, branche=ti, domaine=sécurité)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| ti-s1 | Délai de détection des incidents de sécurité (MTTD) | ICP | fiable | risque | itil · generique |
| ti-s2 | Temps de rétablissement sécurité (MTTR Sécurité) | DORA | fiable | risque · qualite | dora · itil |
| ti-s3 | Délai de remédiation des vulnérabilités (par sévérité) | ICP | fiable | risque | itil · generique |
| ti-s4 | Couverture des tests de sécurité | ICC | precaution | qualite · risque | lean · generique |
| ti-s5 | Score de conformité réglementaire (Compliance Score) | ICP | precaution | risque | generique |

#### 4.4.6 Agile générique (4 fiches, pas de branche — indicateurs de rituel Scrum)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| x1 | Vélocité (Velocity) | FLUX | risque | flux | scrum |
| x2 | Graphe de progression d'itération (Burndown Chart) | FLUX | precaution | delais · flux | scrum |
| x4 | Indice de bien-être de l'équipe (Team Health Check) | ICC | precaution | humain | scrum · generique |
| x5 | Nombre de fonctionnalités livrées (Feature Count) | ICP | risque | flux · valeur | scrum · generique |

> `x1`, `x2`, `x5` sont classés `risque` ou `precaution` — reflet direct du consensus Agile post-DORA sur l'instrumentalisation de ces métriques (vélocité et feature count notamment, cf. § Anti-patterns dans `risque` des fiches).

#### 4.4.7 Affaires / Commercial (5 fiches, branche=affaires, domaine=commercial)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-c1 | Taux de conversion | ICP | fiable | valeur | generique |
| af-c2 | Durée du cycle de vente | FLUX | precaution | delais · flux | lean · generique |
| af-c3 | Valeur vie client (LTV) | II | precaution | valeur | generique |
| af-c4 | Taux d'atteinte des quotas | ICP | precaution | valeur · alignement | mbo · generique |
| af-c5 | Couverture du pipeline commercial | ICP | precaution | flux · valeur | generique |

#### 4.4.8 Affaires / Marketing (5 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-m1 | Coût d'acquisition client (CAC) | ICP | fiable | valeur | generique |
| af-m2 | Coût par lead qualifié (CPL) | ICP | precaution | valeur | generique |
| af-m3 | Taux de conversion MQL → SQL | FLUX | precaution | flux · valeur | lean · generique |
| af-m4 | Retour sur investissement publicitaire (ROAS) | ICP | precaution | valeur | generique |
| af-m5 | Notoriété de marque (Brand Awareness) | II | precaution | valeur | generique |

#### 4.4.9 Affaires / Finance (4 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-f1 | Délai moyen de recouvrement (DSO) | ICP | fiable | delais · valeur | lean · generique |
| af-f2 | Précision des prévisions financières | ICP | fiable | qualite · valeur | generique |
| af-f3 | Délai de clôture comptable | FLUX | fiable | delais · flux | lean · generique |
| af-f4 | Taux de conformité réglementaire financière | ICP | fiable | risque | generique |

#### 4.4.10 Affaires / RH (4 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-r1 | Indice de recommandation employé (eNPS) | ICP | precaution | humain | generique |
| af-r2 | Délai de recrutement (Time to Fill) | FLUX | fiable | delais · flux | lean · generique |
| af-r3 | Taux de départ volontaire (Voluntary Turnover) | ICP | fiable | humain · risque | generique |
| af-r4 | Taux de complétion des formations | ICC | precaution | humain · qualite | generique |

#### 4.4.11 Affaires / Opérations métier (4 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-op1 | Efficacité globale des équipements (OEE) | ICP | fiable | flux · qualite | lean |
| af-op2 | DPMO et niveau sigma du processus | ICP | fiable | qualite | lean |
| af-op3 | Taux de livraison à temps (On-Time Delivery) | ICP | fiable | delais · qualite | lean |
| af-op4 | Taux de réduction des gaspillages (Waste Reduction Rate) | ICC | precaution | flux · valeur | lean |

#### 4.4.12 Affaires / Service Client (5 fiches)

| id | Nom | Type | Fiab. | Tags | Cadres |
|---|---|---|---|---|---|
| af-sc1 | Score de satisfaction client (CSAT) | ICP | fiable | qualite · humain | itil · generique |
| af-sc2 | Indice de recommandation client (NPS Service) | ICP | precaution | qualite · humain | itil · generique |
| af-sc3 | Score d'effort client (CES) | ICP | fiable | qualite · humain | lean · itil |
| af-sc4 | Résolution au premier contact — Service (FCR) | ICP | fiable | qualite · delais | itil · generique |
| af-sc5 | Délai de première réponse | FLUX | precaution | delais | itil · lean |

---

## 5. Écarts et recommandations

Le balayage remonte initialement six écarts (§5.1 à §5.6). La validation par Lætitia le 24/04/2026 ajoute deux blocs : §5.7 — six angles additionnels arbitrés (temporalité, source, seuils, relations, vue, anti-patterns) ; §5.8 — tags thématiques transverses (vocabulaire fermé 10-14 tags). Aucun de ces écarts n'est **bloquant** pour démarrer l'étape (b), mais plusieurs doivent être **nommés dans le contrat d'API** dès `CM.RequeteMetriques` pour ne pas les perpétuer.

### 5.1 Trois vocabulaires de niveaux en cohabitation

**Constat.** Même notion métier, trois valeurs différentes selon qu'on lit une fiche métrique (`tactique`), un élément de navigation (`portefeuille`) ou une fiche rôle (`portefeuille` également, mais `équipe` pour le bas et `entreprise` pour le haut). Voir §3.1.

**Pourquoi c'est un problème.** Dans `CM.Referentiel.filtrerParContexte`, un mapping ad hoc refait le pont (`'strategique': 'strategique', 'portefeuille': 'tactique', 'programme': 'programme'`). Tout nouveau consommateur devra réimplémenter ce mapping, ou en oublier une variante — dette technique garantie.

**Recommandation.** Poser **un seul vocabulaire canonique** pour `CM.RequeteMetriques` (choisir le plus explicite : probablement `strategique / portefeuille / programme / equipe`, qui est le vocabulaire surface + celui utilisé par les rôles pour deux valeurs sur quatre). Les adaptateurs (chemins) traduisent aux frontières. La traduction est **publiée** dans le document compagnon `doc-contrats-chantier-14.md`, pas dupliquée dans chaque consommateur.

### 5.2 Granularité grossière du champ `roles` sur les fiches

**Constat.** Le vocabulaire `roles` sur les fiches métriques (§3.3, 5 valeurs) est à gros grain. Il dit à quelle **strate** parle la métrique, pas à quel **rôle**. Tous les membres du COMEX sont `direction` ; tous les membres d'une équipe produit sont `membre-équipe`.

**Recommandation.** Conserver ce champ comme **filtre de strate rapide** (utile pour la porte *Par mon niveau* actuelle, qui est à gros grain) mais ne pas lui faire porter davantage. Le filtrage fin passera par les axes Mintzberg (§5.3), pas par une explosion de ce vocabulaire.

### 5.3 Absence d'étiquette d'axe Mintzberg sur les fiches métriques

**Constat.** Les rôles portent déjà 4 axes Mintzberg cumulables (`projet`, `méthodologique`, `humaine`, `stratégique`). Les fiches métriques, non. Conséquence directe : **un DAF et un CTO**, tous deux `direction` au niveau stratégique, reçoivent aujourd'hui la même liste — alors que leur contribution au système est radicalement différente.

**Recommandation.** Ajouter sur chaque fiche métrique un champ `axes` (array, vocabulaire fermé = `CM.Roles.axesValides()`). Règle éditoriale : une métrique est tagguée avec les axes auxquels elle parle directement (0 à 4). Une fiche avec 0 axe est une métrique **de socle** — voir §5.4. Une fiche avec 4 axes est suspecte : soit c'est une métrique véritablement socle (mettre 0), soit elle est sous-spécifiée.

**Impact architecture.** `CM.RequeteMetriques.executer(filtre)` accepte un `filtre.axes` (array) et fait un « au moins un axe en commun » avec la fiche (règle par défaut). La porte *Par mon niveau* interrogera ainsi : « pour le CTO, axes = [méthodologique, stratégique], donne-moi les métriques du niveau X qui portent au moins un de ces axes, plus les métriques de socle (axes vide) ».

### 5.4 Absence de distinction socle / spécifique par niveau

**Constat.** Le champ `prioritaire:true` est le seul signal éditorial actuel. Mais il est ambigu — il sert à la fois à dire « métrique essentielle » (lecture socle) et « métrique à afficher en premier » (lecture ordonnancement). Certaines fiches `prioritaire:true` sont évidemment des socles (s1 CA, s3 EBITDA, o1 Deployment Frequency) ; d'autres sont spécifiques à un axe (s9 cybersécurité = axe méthodologique uniquement).

**Recommandation.** Introduire un booléen explicite `socleDeNiveau:true|false`. Règle éditoriale :
- `socleDeNiveau:true` → métrique que **tous les rôles du niveau** doivent connaître (langue commune pour se parler).
- `socleDeNiveau:false` (valeur par défaut) → métrique spécifique à un ou plusieurs axes (§5.3).

Le couple `axes + socleDeNiveau` devient la matière du filtrage par rôle. `prioritaire` reste pour l'ordonnancement, sans confusion.

### 5.5 Polysémie du terme « axe »

**Constat.** Dans `CM.Config.MESSAGES.conseilPedagogique`, le conseil pédagogique écrit : « retenez 1 à 2 métriques par axe (flux, qualité, humain, alignement…) ». Ici, « axe » désigne les **TAGS** de problèmes. Côté rôles, « axes » désigne les **axes Mintzberg**. Deux notions différentes derrière le même mot.

**Recommandation éditoriale.** Garder le terme « axe » pour **une seule** des deux notions, reformuler l'autre. Proposition :
- Réserver **« axe »** aux axes Mintzberg (cohérent avec la littérature).
- Renommer la famille de problèmes « **famille de problèmes** » ou « **préoccupation** » dans les messages pédagogiques.

Ce renommage est **hors scope du chantier 14** (ça touche de l'éditorial, pas de l'architecture). À **consigner au backlog** comme suite éditoriale. Voir la règle « consigner les dérives hors scope » (mémoire `feedback_consigner_derives_hors_scope`).

### 5.6 Divergences de préfixe-id ↔ niveau

**Constat.** Les préfixes d'id **suggèrent** un niveau (`s-` stratégique, `t-` tactique/portefeuille, `p-` programme, `o-` opérationnel DORA, `ti-*` équipes TI, `af-*` équipes affaires, `x-` agile générique). Trois cas divergent :

- `x3` est au niveau **tactique** (portefeuille), dans le groupe « Taux d'occupation des ressources » — le préfixe `x` suggère équipe.
- `x1`, `x2`, `x4`, `x5` sont tous au niveau opérationnel — convention respectée.
- `o4` (MTTR) est dans la liste des indicateurs Ops (table 4.4.4) alors que son `id` est `o-` (DORA) — convention cohérente puisque MTTR est une métrique DORA qui s'affiche aussi en Ops.

**Recommandation.** Ne **pas** corriger les id (casserait les ancres `#fiche=ti-s2` utilisées dans les `alt` et les bookmarks). Documenter la règle : « le préfixe d'id est une **convention historique**, pas une étiquette filtrable — seul `ind.niveau` fait foi ». `CM.RequeteMetriques` ne lit jamais le préfixe de l'id.

### 5.7 Angles additionnels validés le 24/04/2026

Validation du périmètre de l'inventaire par Lætitia → 6 angles initialement non couverts ont été explicitement arbitrés. Les décisions ci-dessous complètent la matière à embarquer en (b).

**(a) Temporalité — à intégrer en (b).** Les fiches ne disent pas à quelle fréquence elles doivent être mesurées. Décision : ajouter un champ `frequenceMesure` (vocabulaire fermé, candidats : `continu / quotidien / hebdo / sprint / mensuel / trimestriel / annuel / ad-hoc`). Travail éditorial sur les 84 fiches à étaler, défaut possible `ad-hoc` en attendant l'audit éditorial.

**(b) Source des données — évolution future (backlog).** Les fiches ne disent pas d'où vient la donnée (CRM, ERP, Git, survey, humain). Décision : **ne pas** bloquer l'étape (b) là-dessus, consigner en évolution backlog. À traiter plus tard comme champ structuré quand on aura l'usage (ex. filtre « métriques automatisables » vs « métriques d'enquête »).

**(c) Seuils / paliers — RÉSOLU (Option B retenue 24/04/2026).** Arbitrage fait après mockup `preview-14b-seuils-paliers.html` (commit `21c76b2`). Décision : champ optionnel `reperes` sur les fiches à référentiel reconnu, structure flexible (source + bandes + qualif enum), affichage collapsé par défaut, passage éditorial étalé sur étape (c). Détails en `doc-contrats-chantier-14.md` §10.1. Flag `observationPure` introduit pour exclure explicitement la gradation sur les métriques-observation (confiance, NPS interne, etc.).

**(d) Relations entre fiches — à combler (destination à préciser).** Pas de graphe de dépendance (X influence Y, Z décompose W). Décision : écart reconnu, à combler. Destination probable : (b) si la signature de `CM.RequeteMetriques` prévoit une propriété `lien:{type, cible}` ; sinon évolution ultérieure. À arbitrer en ouverture de (b) selon la charge.

**(e) Mode d'affichage par porte — c'est l'affaire de la vue, non du cœur.** Ordre, densité, regroupement d'affichage = responsabilité des adaptateurs de sortie (`CM.VuePorteX`). Décision : pas de champ dans le cœur. Chaque vue applique sa logique de présentation sur la liste reçue.

**(f) Anti-patterns / garde-fous — à structurer comme un champ typé.** La règle output/outcome + anti-patterns, aujourd'hui en prose libre dans les fiches, devient un champ structuré. Candidat : tableau d'objets `{nom, description, niveauAlerte}` ou similaire. Travail éditorial non-trivial (reprendre les fiches du chantier 1 « revue métier »). À intégrer en (b) avec passage éditorial étalé.

### 5.8 Tags thématiques transverses — à intégrer en (b)

**Constat.** Les TAGS actuels (`CM.IndicateursMeta`, 7 familles de problèmes) disent *« quel problème la métrique adresse-t-elle »*. Ils ne disent pas *« quel phénomène organisationnel elle éclaire »*. Exemples de phénomènes mal couverts aujourd'hui : communication, prévisibilité, engagement, goulots, coûts cachés, compétences.

**Recommandation.** Ajouter un champ `tagsThematiques` (array, vocabulaire fermé de **10 à 14 tags**) sur chaque fiche. Système orthogonal aux trois déjà en place :
- TAGS (7 familles de problèmes) → *« quel problème ? »*
- axes Mintzberg §5.3 → *« quelle contribution managériale ? »*
- tagsThematiques → *« quel phénomène ? »*

**Candidats proposés** (24/04/2026, à tailler en ouverture de (b)) : communication, prévisibilité, engagement, goulots, coûts cachés, compétences, cadence, feedback, risque, autonomie, sécurité psychologique, variabilité, alignement, expérience client.

**Impact architecture.** `CM.RequeteMetriques.executer(filtre)` accepte un `filtre.tagsThematiques` (array) et fait un « au moins un tag en commun » avec la fiche. Vocabulaire fermé défini dans `CM.Config.TAGS_THEMATIQUES` ou équivalent, miroir du design des axes Mintzberg. Travail éditorial sur les 84 fiches à étaler.

---

## 6. Matière pour l'étape (b) — signature pressentie de `CM.RequeteMetriques`

L'API unique à extraire est `executer(filtre)`. Le filtre est un objet aux propriétés toutes optionnelles — chaque propriété absente signifie « pas de contrainte sur ce critère ». La fonction renvoie une liste de fiches métriques ordonnées (ordre par défaut : prioritaire d'abord, puis fiabilité décroissante, puis id).

Propriétés attendues du filtre, listées par ordre de besoin observé dans les 4 portes actuelles :

| Propriété | Type | Origine | Portes consommatrices (auj.) |
|---|---|---|---|
| `niveau` | enum 4 (canon unifié §5.1) | Toutes les portes | problème, cadre, niveau, maturité |
| `tags` | array enum 7 | `META.tags` | problème |
| `cadres` | array enum 10 | `META.cadres` | cadre |
| `fiabiliteMin` | enum 3 | fiche | cadre (affichage par fiabilité décroissante) |
| `maturiteMax` | enum 3 | fiche | maturité (stub) |
| `branche` | enum 2 | fiche | niveau (quand niveau = équipe) |
| `domaine` | enum 10 | fiche | niveau (quand niveau = équipe) |
| `axes` | array enum 4 | **à ajouter** §5.3 | niveau (futur) |
| `socleInclus` | boolean (défaut true) | **à ajouter** §5.4 | niveau (futur) |
| `roles` | array enum 5 | fiche | niveau (aujourd'hui, à gros grain — complément aux `axes`) |

Règles de composition :
- `niveau` + `branche` + `domaine` → filtrage structurel (conjonction AND).
- `tags` + `cadres` + `axes` → filtrage d'intention (au moins un en commun, OR intra-critère, AND inter-critère).
- `fiabiliteMin` + `maturiteMax` → bornes qualitatives (AND).
- `socleInclus:true` fait remonter les métriques de socle même si elles ne matchent pas `axes`.

Exigence non-fonctionnelle à tenir dans `executer` :
- Zéro DOM, zéro état, 100 % testable — même posture que `CM.DiagnosticProbleme` aujourd'hui.
- Idempotence : deux appels avec le même filtre renvoient la même liste dans le même ordre.
- Ignorance du préfixe d'id (§5.6).
- Source unique de vérité : lire `CM.Referentiel.tous()` et `CM.IndicateursMeta.pour(id)` ; **ne pas** dupliquer ni caher les données.

---

## 7. Validation et suite

Ce document est à relire avec trois questions de validation :

1. **Le périmètre est-il juste ?** J'ai inventorié fiches métriques + tagging META + catalogue des rôles. J'ai **écarté** les vues (`VuePorte*`), les composants (`CM.Composants`), le panier (`CM.Panier`) et la préférences (`CM.Preferences`) — pas du domaine, adaptateurs ou outillage. À confirmer.

2. **Les recommandations §5 sont-elles actionnables dès (b), ou certaines glissent au backlog ?** Proposition : §5.1, §5.3, §5.4, §5.6 dans le contrat d'API `CM.RequeteMetriques` (nomment des champs et règles). §5.2 (garder le champ grossier) et §5.5 (polysémie éditoriale) au backlog, hors chantier 14.

3. **Y a-t-il un écart que j'ai manqué ?** Champs qui existent dans le code et que je n'ai pas recensés, vocabulaires fermés que j'aurais oublié d'énumérer, conventions implicites que j'aurais pris pour acquises.

Une fois validé, tag de clôture de l'étape (a) : `mvp-etape-a-schema-inventorie`.
