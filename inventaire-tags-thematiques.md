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

### 2.1 `communication`
- **Capture.** Flux d'information entre personnes ou équipes — clarté des annonces, temps de réponse, qualité des échanges.
- **Frontière.** N'est pas `feedback` (qui est un retour sur un output, orienté apprentissage) ni `alignement` (qui est partage d'intention). Communication = vecteur ; feedback = boucle ; alignement = contenu partagé.
- **Fiche-ancre pressentie.** Qualité des compte-rendus de comité, taux de remontée de problèmes, temps de réponse à une sollicitation inter-équipes.
- **Héritage.** Littérature gestion du changement (Kotter), communication managériale classique.

### 2.2 `prévisibilité`
- **Capture.** Capacité à anticiper un résultat — respect d'un engagement, écart entre promesse et livraison, fiabilité d'un délai.
- **Frontière.** N'est pas `variabilité` (qui est la mesure statistique de la dispersion). Prévisibilité = lecture business-side de la fiabilité. Variabilité = mesure technique interne. On peut avoir une variabilité forte mesurée sans chercher à la prévoir ; on peut prédire sans mesurer statistiquement.
- **Fiche-ancre pressentie.** Flow predictability, say/do ratio, respect des engagements de sprint, distribution de lead time pour Monte Carlo.
- **Héritage.** Daniel Vacanti (Actionable Agile Metrics), Don Reinertsen (Principles of Product Development Flow).

### 2.3 `engagement`
- **Capture.** Investissement subjectif des personnes — participation, initiative, énergie mise dans le travail.
- **Frontière.** N'est pas `autonomie` (qui est la capacité à décider — condition d'engagement mais distincte) ni `sécurité psychologique` (condition préalable). Engagement = l'investissement constaté ; autonomie = la permission de décider ; sécurité psy = la permission de parler.
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
- **Frontière.** N'est pas `communication` (plus large) ni `expérience client` (qui est un type de feedback, mais pas le seul). Feedback est la boucle d'apprentissage dans les deux sens ; communication est le vecteur général ; expérience client est un input spécifique.
- **Fiche-ancre pressentie.** Qualité des rétros, cycles d'A/B testing, boucle customer discovery, fréquence de revue des hypothèses.
- **Héritage.** Lean Startup (Ries), Agile retrospectives, double boucle d'Argyris.

### 2.9 `risque`
- **Capture.** Exposition aux dérives — risque financier, sécurité, conformité, réputation, opérationnel.
- **Frontière.** N'est pas `coûts cachés` (dette passive déjà subie) ni `variabilité` (incertitude statistique). Risque = anticipation prospective d'une dérive ; coûts cachés = constat rétrospectif d'une inefficacité.
- **Fiche-ancre pressentie.** Maturité NIST, taux d'incident, respect SLA, exposition ERM, plans de remédiation.
- **Héritage.** COSO ERM, ISO 31000, Hubbard (How to Measure Anything), Taleb (black swan).

### 2.10 `autonomie`
- **Capture.** Capacité à décider seul — décentralisation des décisions, responsabilité déléguée, dépendances croisées réduites.
- **Frontière.** N'est pas `compétences` (savoir-faire) ni `sécurité psychologique` (permission de parler). L'autonomie est la permission de décider, distincte de la capacité technique de le faire et de la permission d'exprimer un désaccord.
- **Fiche-ancre pressentie.** Taux de décisions prises au niveau équipe, nombre de handoffs nécessaires, délai d'obtention d'un arbitrage.
- **Héritage.** Reinertsen (décentralisation), Management 3.0, Team Topologies (Skelton & Pais), Beyond Budgeting.

### 2.11 `sécurité psychologique`
- **Capture.** Permission de parler, d'échouer, de contredire, de soulever un problème sans crainte de représailles.
- **Frontière.** N'est pas `engagement` (conséquence possible) ni `confiance` (plus large, inclut la direction). Sécurité psychologique est spécifique à la permission d'exprimer — la confiance englobe plus.
- **Fiche-ancre pressentie.** Taux de remontée de problèmes, nombre de post-mortems blame-free, permission à dire non.
- **Héritage.** Amy Edmondson (The Fearless Organization), Google Aristotle project.

### 2.12 `variabilité`
- **Capture.** Dispersion statistique — écart-type, amplitude, instabilité du signal, capabilité d'un processus.
- **Frontière.** N'est pas `prévisibilité` (lecture business). Variabilité est la mesure technique de la dispersion ; prévisibilité est la conséquence perçue côté engagement.
- **Fiche-ancre pressentie.** Écart-type du lead time, Cp/Cpk, carte de contrôle, stabilité d'un processus.
- **Héritage.** Six Sigma (Motorola), SPC (Shewhart, Deming).

### 2.13 `alignement`
- **Capture.** Partage d'intention — tous tirent dans le même sens, priorités comprises, stratégie relayée.
- **Frontière.** N'est pas `communication` (vecteur) ni `engagement` (investissement personnel). Alignement = contenu partagé ; communication = canal ; engagement = investissement. On peut communiquer sans aligner, aligner sans engager.
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
| `engagement` ↔ `sécurité psychologique` ↔ `autonomie` | **Triade distincte, garder les trois** | Sécurité psy = permission de parler. Autonomie = permission de décider. Engagement = investissement constaté. Une organisation peut avoir l'une sans les deux autres. |
| `communication` ↔ `feedback` ↔ `alignement` | **Triade distincte, garder les trois** | Communication = flux. Feedback = boucle. Alignement = contenu. Vecteur ≠ dispositif ≠ intention partagée. |
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
| `communication` | Fourre-tout | Très large, peut capturer par défaut des métriques qui relèvent plus précisément de `feedback` ou `alignement`. |
| `coûts cachés` | Sous-usage | Spécifique au vocabulaire Lean. Peu de fiches du catalogue actuel peuvent le nommer directement. À confirmer. |
| `sécurité psychologique` | Sous-usage | Très spécifique. Si moins de 3-4 fiches l'appellent en propre, sort. |
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

## 6. Matrice de tagging (à remplir au Temps 2)

*À produire après validation du vocabulaire par Lætitia.*
