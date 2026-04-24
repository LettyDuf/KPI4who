# Inventaire des tags thématiques — Temps 1 : filtre sémantique

*Chantier 14, étape (b), tâche 2. Livrable du Temps 1 de la méthode C (hybride exhaustif). La suite — Temps 2 tagging des 84 fiches + Temps 3 analyse quantitative — s'enchaîne après validation de ce vocabulaire.*

---

## 1. Intention du champ `tagsThematiques`

Trois questions orthogonales doivent cohabiter sur une même fiche métrique :

| Système | Question | État |
|---|---|---|
| `tags` (7 familles de problèmes) | *« Quel problème cette métrique adresse-t-elle ? »* | Existe déjà dans `CM.IndicateursMeta` |
| `axes` (4 axes Mintzberg) | *« Quelle contribution managériale éclaire-t-elle ? »* | À ajouter en étape (b) |
| **`tagsThematiques`** (10-14 tags) | *« Quel phénomène organisationnel éclaire-t-elle ? »* | En cours de définition |

Les trois ne se recouvrent pas. Un problème c'est un symptôme visible. Un axe c'est un type de contribution managériale. Un phénomène c'est une dynamique organisationnelle sous-jacente — souvent traversant plusieurs problèmes et plusieurs axes.

Exemple : la métrique *Lead time d'un flow item* (`t5`) adresse un problème de *flux* (tag), éclaire la dimension *projet* et *humaine* (axes Mintzberg), et met en visibilité les phénomènes de *cadence* et *prévisibilité* (tagsThematiques).

---

## 2. Les 14 candidats — définitions-frontières

Pour chaque candidat, trois lignes :

- **Capture.** Ce que le tag attrape.
- **Frontière.** Ce qu'il **n'**attrape **pas**, avec désambiguation vis-à-vis des voisins sémantiques.
- **Fiche-ancre pressentie.** Type de métrique pour laquelle ce tag doit être le tag principal.

### 2.1 `transversalité`
- **Capture.** Capacité à collaborer au-delà des frontières — briser les silos, faire circuler l'information entre équipes/services, réduire le cloisonnement organisationnel.
- **Frontière.** N'est pas `feedback` (boucle d'apprentissage sur un output) ni `alignement` (partage d'intention sur une direction). Transversalité = rupture des silos et flux inter-équipes ; feedback = boucle ; alignement = contenu stratégique partagé. N'est pas non plus la communication managériale descendante (relève d'`alignement` ou d'`engagement` selon le cas).
- **Fiche-ancre pressentie.** Taux de handoffs inter-équipes, délai moyen d'obtention d'une information hors-équipe, nombre de dépendances croisées non résolues, qualité des interactions Team Topologies (stream-aligned ↔ enabling ↔ platform).
- **Héritage.** Skelton & Pais (Team Topologies), Conway (loi de Conway), Hoshin Kanri (catchball horizontal), Beyond Budgeting (décentralisation des décisions).

### 2.2 `prévisibilité`
- **Capture.** Capacité à anticiper un résultat — respect d'un engagement, écart entre promesse et livraison, fiabilité d'un délai.
- **Frontière.** N'est pas `variabilité` (qui est la mesure statistique de la dispersion). Prévisibilité = lecture business-side de la fiabilité. Variabilité = mesure technique interne. On peut avoir une variabilité forte mesurée sans chercher à la prévoir ; on peut prédire sans mesurer statistiquement.
- **Fiche-ancre pressentie.** Flow predictability, say/do ratio, respect des engagements de sprint, distribution de lead time pour Monte Carlo.
- **Héritage.** Daniel Vacanti (Actionable Agile Metrics), Don Reinertsen (Principles of Product Development Flow).

### 2.3 `engagement`
- **Capture.** Investissement subjectif des personnes — participation, initiative, énergie mise dans le travail.
- **Frontière.** N'est pas `autonomie` (qui est la capacité à décider — condition d'engagement mais distincte) ni `confiance` (fondation relationnelle, plus large). Engagement = l'investissement constaté ; autonomie = la permission de décider ; confiance = la fondation qui rend l'investissement possible.
- **Fiche-ancre pressentie.** eNPS, participation aux rétros, initiatives portées spontanément.
- **Héritage.** Management 3.0 (Appelo), engagement score Gallup.

### 2.4 `goulots`
- **Capture.** Blocages de flux — une étape qui ralentit l'ensemble, un WIP qui s'empile, une ressource saturée.
- **Frontière.** N'est pas `cadence` (vitesse générale) ni `variabilité` (dispersion). Un goulot est un point local de blocage ; la cadence est un rythme global ; la variabilité est une dispersion statistique.
- **Fiche-ancre pressentie.** Taux d'occupation des ressources, temps d'attente par étape, WIP queue length, Theory of Constraints.
- **Héritage.** Goldratt (Theory of Constraints), Ohno (Toyota Production System).

### 2.5 `coûts cachés`
- **Capture.** Gaspillages passifs, inefficacités non imputées, dette invisible qui ronge la performance mais n'apparaît pas au P&L.
- **Frontière.** N'est pas `risque` (qui est prospectif — exposition à une dérive possible). Coûts cachés = déjà subis mais invisibles ; risque = anticipé mais pas encore matérialisé.
- **Fiche-ancre pressentie.** Temps de rework, temps de context switching, dette technique, coût des incidents récurrents, temps d'attente non déclaré.
- **Héritage.** Lean (7+1 gaspillages de Ohno), hidden costs of quality (Crosby), technical debt (Cunningham).

### 2.6 `compétences`
- **Capture.** Développement des savoir-faire — montée en compétence, diversité des skills, couverture d'expertise, continuité de l'expertise.
- **Frontière.** N'est pas `autonomie` (qui s'appuie sur les compétences mais concerne la permission de décider). On peut être compétent sans être autonome, et inversement.
- **Fiche-ancre pressentie.** Bus factor, indice de montée en compétence, taux de certification, couverture d'expertise par domaine.
- **Héritage.** Management 3.0 (compétences comme facteur d'énergie), learning organization (Senge).

### 2.7 `cadence`
- **Capture.** Rythme et régularité du flow — fréquence de livraison, périodicité des cycles, constance du tempo.
- **Frontière.** N'est pas `prévisibilité` (fiabilité) ni `goulots` (blocages ponctuels). La cadence peut être régulière sans être fiable (rythme constant, contenu variable), ou perturbée par un goulot ponctuel.
- **Fiche-ancre pressentie.** Deployment Frequency DORA, vélocité moyenne, fréquence des revues de portefeuille, rythme des incréments de programme.
- **Héritage.** SAFe (cadence ART), Scrum (sprint cadence), DORA.

### 2.8 `feedback`
- **Capture.** Boucle d'apprentissage — retour d'information, ajustement en conséquence, qualité du dispositif de mesure.
- **Frontière.** N'est pas `transversalité` (qui est la capacité à collaborer inter-équipes) ni `expérience client` (qui est un type de feedback, mais pas le seul). Feedback est la boucle d'apprentissage dans les deux sens ; transversalité est le décloisonnement ; expérience client est un input spécifique.
- **Fiche-ancre pressentie.** Qualité des rétros, cycles d'A/B testing, boucle customer discovery, fréquence de revue des hypothèses.
- **Héritage.** Lean Startup (Ries), Agile retrospectives, double boucle d'Argyris.

### 2.9 `risque`
- **Capture.** Exposition aux dérives — risque financier, sécurité, conformité, réputation, opérationnel.
- **Frontière.** N'est pas `coûts cachés` (dette passive déjà subie) ni `variabilité` (incertitude statistique). Risque = anticipation prospective d'une dérive ; coûts cachés = constat rétrospectif d'une inefficacité.
- **Fiche-ancre pressentie.** Maturité NIST, taux d'incident, respect SLA, exposition ERM, plans de remédiation.
- **Héritage.** COSO ERM, ISO 31000, Hubbard (How to Measure Anything), Taleb (black swan).

### 2.10 `autonomie`
- **Capture.** Capacité à décider seul — décentralisation des décisions, responsabilité déléguée, dépendances croisées réduites.
- **Frontière.** N'est pas `compétences` (savoir-faire) ni `confiance` (fondation relationnelle). L'autonomie est la permission de décider, distincte de la capacité technique de le faire et de la confiance qui rend la délégation possible.
- **Fiche-ancre pressentie.** Taux de décisions prises au niveau équipe, nombre de handoffs nécessaires, délai d'obtention d'un arbitrage.
- **Héritage.** Reinertsen (décentralisation), Management 3.0, Team Topologies (Skelton & Pais), Beyond Budgeting.

### 2.11 `confiance`
- **Capture.** Phénomène fondamental — capacité à s'en remettre à l'autre sans garantie. Couvre la confiance verticale (envers la direction, le management, la stratégie), la confiance horizontale / sécurité psychologique au sens d'Edmondson (permission de parler, d'échouer, de contredire au sein de l'équipe), la confiance institutionnelle (tenue des engagements, respect des règles du jeu) et la confiance client (promesse tenue, qualité perçue).
- **Frontière.** N'est pas `engagement` (énergie investie, conséquence possible d'un climat de confiance) ni `expérience client` (qui est un résultat perçu, dont la confiance client est une composante mais pas le tout). La confiance est la fondation relationnelle ; l'engagement est ce qu'elle rend possible ; l'expérience client est le résultat terminal.
- **Fiche-ancre pressentie.** Indice de confiance organisationnelle (s8), eNPS, Trust Index type Great Place to Work, taux de remontée de problèmes sans sanction, nombre de post-mortems blame-free, NPS côté client.
- **Héritage.** Amy Edmondson (The Fearless Organization, psychological safety comme forme horizontale), Patrick Lencioni (Five Dysfunctions — absence de confiance comme racine), Stephen Covey (The Speed of Trust), Deming (confiance dans le système).

### 2.12 `variabilité`
- **Capture.** Dispersion statistique — écart-type, amplitude, instabilité du signal, capabilité d'un processus.
- **Frontière.** N'est pas `prévisibilité` (lecture business). Variabilité est la mesure technique de la dispersion ; prévisibilité est la conséquence perçue côté engagement.
- **Fiche-ancre pressentie.** Écart-type du lead time, Cp/Cpk, carte de contrôle, stabilité d'un processus.
- **Héritage.** Six Sigma (Motorola), SPC (Shewhart, Deming).

### 2.13 `alignement`
- **Capture.** Partage d'intention — tous tirent dans le même sens, priorités comprises, stratégie relayée.
- **Frontière.** N'est pas `transversalité` (flux inter-équipes) ni `engagement` (investissement personnel). Alignement = contenu stratégique partagé verticalement ; transversalité = décloisonnement horizontal ; engagement = investissement. On peut être aligné sans être transversal, transversal sans engager.
- **Fiche-ancre pressentie.** Alignement OKR, cohérence des priorités portefeuille, compréhension de la vision, Strategy Deployment (Hoshin).
- **Héritage.** Drucker (MBO), Doerr (OKR), Hoshin Kanri.

### 2.14 `expérience client`
- **Capture.** Perception externe — satisfaction, loyauté, effort perçu, recommandation.
- **Frontière.** N'est pas `feedback` (boucle d'apprentissage interne, dont l'expérience client est un input possible). Expérience client = résultat chez l'utilisateur ; feedback = dispositif de retour.
- **Fiche-ancre pressentie.** NPS, CSAT, CES, Customer Health Score, Customer Effort Score.
- **Héritage.** Reichheld (Ultimate Question), Bain & Company, Service Design.

---

## 3. Test de non-redondance — paires à risque examinées

Sept paires sémantiquement proches ont été auditées explicitement. Pour chacune, la question posée : *« Y a-t-il une fiche que l'un capture et l'autre non, sans chevauchement systématique ? »*

| Paire | Verdict sémantique | Justification |
|---|---|---|
| `prévisibilité` ↔ `variabilité` | **Distincts, garder les deux** | Variabilité = mesure statistique interne. Prévisibilité = lecture business. Un écart-type des coûts matière est de la variabilité sans être de la prévisibilité. Un say/do ratio est de la prévisibilité sans mesure statistique explicite. |
| `cadence` ↔ `prévisibilité` | **Distincts, garder les deux** | Cadence = rythme. Prévisibilité = fiabilité. Sprint cadencé mais imprévisible : rythme constant + contenu variable. |
| `engagement` ↔ `confiance` ↔ `autonomie` | **Triade distincte, garder les trois** | Confiance = fondation relationnelle (verticale + horizontale + institutionnelle). Autonomie = permission de décider. Engagement = investissement constaté. La confiance rend l'autonomie soutenable et l'engagement possible — chacune peut manquer sans les autres. |
| `transversalité` ↔ `feedback` ↔ `alignement` | **Triade distincte, garder les trois** | Transversalité = décloisonnement inter-équipes. Feedback = boucle d'apprentissage sur un output. Alignement = contenu stratégique partagé. Décloisonnement horizontal ≠ dispositif de retour ≠ intention partagée verticale. |
| `coûts cachés` ↔ `risque` | **Distincts, garder les deux** | Coûts cachés = rétrospectif (déjà subi, invisible au P&L). Risque = prospectif (exposition anticipée à une dérive). |
| `feedback` ↔ `expérience client` | **Distincts, garder les deux** | Feedback est un dispositif interne d'apprentissage. Expérience client est un résultat chez l'utilisateur. Un NPS est un input possible du feedback, pas le feedback lui-même. |
| `compétences` ↔ `autonomie` | **Distincts, garder les deux** | Compétences = savoir-faire (peut exister sans autonomie : équipe très compétente mais micro-managée). Autonomie = permission de décider (peut exister sans compétences — contre-exemple rare mais pas nul : équipe autonome formellement mais pas formée). |

**Conclusion du Temps 1.** Les 14 candidats tiennent debout sémantiquement. Aucune redondance flagrante ne justifie une élimination avant le Temps 2.

---

## 4. Tags à risque au Temps 2 (à surveiller empiriquement)

Certains tags passent le test sémantique mais ont une sémantique large ou très pointue. Le Temps 2 tranche empiriquement. Les critères quantitatifs posés : taux d'usage < 5 % → sort ; co-occurrence > 80 % avec un autre → fusion ou élimination du plus faible.

| Tag | Risque | Raison |
|---|---|---|
| `alignement` | Fourre-tout | Toute métrique stratégique peut être lue comme un indicateur d'alignement. Risque de suremploi qui dilue la sémantique. |
| `transversalité` | Fourre-tout potentiel | Sémantique plus ciblée que `communication` (décloisonnement inter-équipes) mais reste à surveiller contre `alignement` et `feedback`. Si < 4 fiches, sort. |
| `coûts cachés` | Sous-usage | Spécifique au vocabulaire Lean. Peu de fiches du catalogue actuel peuvent le nommer directement. À confirmer. |
| `confiance` | Fourre-tout potentiel | Tag élargi depuis `sécurité psychologique` (renommé le 24/04/2026). Couvre 4 facettes (verticale, horizontale, institutionnelle, client). À surveiller : si co-occurrence > 80 % avec `expérience client` sur les fiches client-facing, voir si splitter. |
| `variabilité` | Sous-usage | Spécifique Six Sigma. Le catalogue actuel est plus Agile/Lean que Six Sigma — test à faire. |
| `goulots` | Solide pressenti | Probablement bien couvert si le catalogue a des fiches de flux (Lead Time, WIP, occupation). |

---

## 5. Ce qu'il reste à faire (Temps 2 et 3)

**Temps 2 — tagging exhaustif des 84 fiches.** Chaque fiche reçoit 1 à 4 tags parmi les 14 ci-dessus. Livrable : matrice `fiches × tags` en markdown dans ce même fichier, section 6.

**Temps 3 — analyse quantitative.** Trois indicateurs chiffrés :

- Taux d'usage par tag (nombre de fiches taguées / 84).
- Matrice de co-occurrence (corrélation entre tags).
- Liste des fiches orphelines (sans tag).

Arbitrages finaux : tags sortants, tags à fusionner, vocabulaire final figé à 10-12 tags probablement.

**Tag de clôture de la tâche 2** : à poser sur le commit qui intègre le vocabulaire final dans `doc-contrats-chantier-14.md` §10.2.

---

## 6. Matrice de tagging (Temps 2)

**Livrable produit le 24/04/2026.** Chaque fiche du référentiel (84 au total) reçoit 1 à 4 tags parmi les 14 candidats définis en §2. Les tags sont marqués `x` dans les colonnes correspondantes. L'ordre suit exactement celui de l'inventaire schéma (§4 de `inventaire-schema-metriques.md`) — stratégique → portefeuille → programme → équipe, puis par branche/domaine — pour faciliter les croisements.

**Méthode.** Pour chaque fiche, sélection des tags les plus discriminants selon les définitions-frontières (§2). Les tags de premier niveau existants (`valeur`, `qualite`, `flux`, `delais`, `humain`, `risque`, `alignement` — champ `tags` de la fiche) n'ont **pas** été repris tels quels : ils capturent des *problèmes* alors que les 14 tags thématiques capturent des *thèmes transverses*. Les deux vocabulaires cohabitent (cf. §5.8 de `inventaire-schema-metriques.md`).

**Règle 1-4 respectée.** Aucune fiche orpheline, aucune au-delà de 4 tags. 160 assignations au total → moyenne 1,9 tag par fiche.

### Légende des colonnes

| Abbr. | Tag thématique |
|---|---|
| tra | transversalité |
| pré | prévisibilité |
| eng | engagement |
| gou | goulots |
| cch | coûts cachés |
| com | compétences |
| cad | cadence |
| fdb | feedback |
| ris | risque |
| aut | autonomie |
| cnf | confiance |
| var | variabilité |
| ali | alignement |
| cx  | expérience client |

### Matrice 84 × 14

| id | nom court | tra | pré | eng | gou | cch | com | cad | fdb | ris | aut | cnf | var | ali | cx |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| s1 | Croissance CA |  |  |  |  |  |  |  |  |  |  |  |  | x |  |
| s2 | NPS |  |  |  |  |  |  |  | x |  |  |  |  |  | x |
| s3 | EBITDA |  |  |  |  |  |  |  |  |  |  |  |  | x |  |
| s4 | OKR stratégiques |  |  | x |  |  |  |  |  |  |  |  |  | x |  |
| s5 | Part de marché |  |  |  |  |  |  |  |  |  |  |  |  | x | x |
| s6 | ADKAR |  |  | x |  |  | x |  |  |  |  | x |  |  |  |
| s7 | Rotation volontaire |  |  | x |  |  |  |  |  |  |  | x |  |  |  |
| s8 | Confiance organisationnelle |  |  | x |  |  |  |  |  |  |  | x |  |  |  |
| s9 | Maturité cyber NIST |  |  |  |  |  | x |  |  | x |  |  |  |  |  |
| s10 | Exposition concentration |  |  |  |  |  |  |  |  | x |  |  |  |  |  |
| t1 | ROI portefeuille |  |  |  |  |  |  |  |  |  |  |  |  | x |  |
| t2 | Lead time métier |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| t3 | OKR trimestriels |  |  |  |  |  |  |  |  |  |  |  |  | x |  |
| t4 | Efficacité flux portefeuille | x |  |  | x |  |  |  |  |  |  |  |  |  |  |
| t5 | Livraison dans délais |  | x |  |  |  |  |  |  |  |  |  |  |  |  |
| x3 | Taux occupation ressources |  |  | x | x |  |  |  |  |  |  |  |  |  |  |
| t6 | Initiatives en dérive |  | x |  |  |  |  |  |  | x |  |  |  |  |  |
| t7 | Profil taille initiatives |  |  |  | x |  |  |  |  | x |  |  |  |  |  |
| p1 | Avancement jalons |  | x |  |  |  |  |  |  |  |  |  |  | x |  |
| p2 | Écart budget |  | x |  |  |  |  |  |  | x |  |  |  |  |  |
| p3 | Risques critiques ouverts |  |  |  |  |  |  |  |  | x |  |  |  |  |  |
| p4 | Satisfaction parties prenantes |  |  |  |  |  |  |  |  |  |  | x |  | x |  |
| p5 | Throughput programme |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| p6 | Acceptation 1er passage |  |  |  |  |  |  |  | x |  |  |  | x |  |  |
| p7 | Reprise post-livraison |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| o1 | Fréquence déploiement |  |  |  |  |  |  | x |  |  | x |  |  |  |  |
| o2 | Lead time for changes |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| o3 | Change failure rate |  |  |  |  |  |  |  | x |  |  |  | x |  |  |
| o5 | Cycle time |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| o8 | Couverture tests auto |  |  |  |  |  | x |  | x |  |  |  |  |  |  |
| o4 | MTTR |  |  |  |  |  |  |  | x | x |  |  |  |  |  |
| o6 | Throughput équipe |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| o7 | WIP |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| o9 | OKR équipe |  |  | x |  |  |  |  |  |  |  |  |  | x |  |
| ti-d1 | Dette technique |  |  |  |  | x |  |  |  | x |  |  |  |  |  |
| ti-d2 | Complétion sprint |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| ti-d3 | Défauts échappés prod |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| ti-d4 | PR Turnaround | x |  |  | x |  |  | x |  |  |  |  |  |  |  |
| ti-p1 | Dispo pipeline CI/CD |  |  |  |  |  |  | x |  | x |  |  |  |  |  |
| ti-p2 | Durée build |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| ti-p3 | Taux succès pipeline |  | x |  |  |  |  |  | x |  |  |  |  |  |  |
| ti-p4 | Provisionnement infra |  |  |  | x |  |  | x |  |  | x |  |  |  |  |
| ti-p5 | Adoption IaC |  |  |  |  |  | x |  |  | x |  |  |  |  |  |
| ti-o1 | MTBF |  |  |  |  |  |  |  |  | x |  |  | x |  |  |
| ti-o2 | FCR ops |  |  |  |  |  | x |  |  |  |  |  |  |  | x |
| ti-o3 | Conformité SLA |  | x |  |  |  |  |  |  |  |  |  |  |  | x |
| ti-o4 | Récurrence incidents |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| ti-o5 | Coût par ticket |  |  |  | x | x |  |  |  |  |  |  |  |  |  |
| ti-s1 | MTTD sécurité |  |  |  |  |  |  |  | x | x |  |  |  |  |  |
| ti-s2 | MTTR sécurité |  |  |  |  |  |  |  | x | x |  |  |  |  |  |
| ti-s3 | Remédiation vulnérabilités |  |  |  |  |  |  | x |  | x |  |  |  |  |  |
| ti-s4 | Couverture tests sécurité |  |  |  |  |  | x |  |  | x |  |  |  |  |  |
| ti-s5 | Conformité réglementaire |  |  |  |  |  |  |  |  | x |  |  |  |  |  |
| x1 | Vélocité |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| x2 | Burndown |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| x4 | Team health check |  |  | x |  |  |  |  |  |  |  | x |  |  |  |
| x5 | Feature count |  |  |  |  |  |  | x |  |  |  |  |  |  |  |
| af-c1 | Taux conversion |  |  |  |  |  |  |  | x |  |  |  |  |  | x |
| af-c2 | Cycle vente |  |  |  | x |  |  | x |  |  |  |  |  |  |  |
| af-c3 | LTV |  |  |  |  |  |  |  |  |  |  | x |  |  | x |
| af-c4 | Atteinte quotas |  | x | x |  |  |  |  |  |  |  |  |  |  |  |
| af-c5 | Couverture pipeline |  | x |  |  |  |  |  |  | x |  |  |  |  |  |
| af-m1 | CAC |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| af-m2 | CPL |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| af-m3 | MQL → SQL | x |  |  | x |  |  |  | x |  |  |  |  |  |  |
| af-m4 | ROAS |  |  |  |  |  |  |  | x |  |  |  |  |  |  |
| af-m5 | Brand awareness |  |  |  |  |  |  |  |  |  |  |  |  |  | x |
| af-f1 | DSO |  |  |  |  |  |  | x |  | x |  |  |  |  |  |
| af-f2 | Précision prévisions |  | x |  |  |  |  |  |  |  |  |  | x |  |  |
| af-f3 | Délai clôture comptable |  | x |  |  |  |  | x |  |  |  |  |  |  |  |
| af-f4 | Conformité réglementaire fin |  |  |  |  |  |  |  |  | x |  |  |  |  |  |
| af-r1 | eNPS |  |  | x |  |  |  |  | x |  |  |  |  |  |  |
| af-r2 | Time to fill |  |  |  |  |  |  | x |  | x |  |  |  |  |  |
| af-r3 | Turnover volontaire |  |  | x |  |  |  |  |  |  |  | x |  |  |  |
| af-r4 | Complétion formations |  |  | x |  |  | x |  |  |  |  |  |  |  |  |
| af-op1 | OEE |  |  |  | x |  |  |  |  |  |  |  | x |  |  |
| af-op2 | DPMO sigma |  |  |  |  |  |  |  | x |  |  |  | x |  |  |
| af-op3 | On-time delivery |  | x |  |  |  |  |  |  |  |  |  |  |  | x |
| af-op4 | Waste reduction |  |  |  |  | x |  |  | x |  |  |  |  |  |  |
| af-sc1 | CSAT |  |  |  |  |  |  |  | x |  |  |  |  |  | x |
| af-sc2 | NPS service |  |  |  |  |  |  |  | x |  |  |  |  |  | x |
| af-sc3 | CES |  |  |  |  |  |  |  | x |  |  |  |  |  | x |
| af-sc4 | FCR service |  |  |  |  |  | x |  |  |  |  |  |  |  | x |
| af-sc5 | Délai 1re réponse |  |  |  |  |  |  | x |  |  |  |  |  |  | x |

**Note.** Le Temps 3 (analyse quantitative : taux d'usage, co-occurrences, orphelines, arbitrages sortie/fusion) s'appuie sur cette matrice pour figer le vocabulaire final (cible 10-12 tags). À produire dans la foulée, en §7.
