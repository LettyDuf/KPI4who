# Inventaire éditorial des rôles — porte niveau

> Source éditoriale pour `CM.Roles` (chantier 7.2a-code). Premier niveau livré le 21/04/2026 pour calibration, trois autres niveaux à suivre après validation.

## Contrat de contenu

Chaque fiche rôle porte :

- **Titre** — libellé visible dans la cartouche. Qualificatif entre parenthèses si le rôle est répété à deux niveaux (règle R2).
- **Axes** — un à trois axes Mintzberg parmi `humaine`, `projet`, `méthodologique`, `stratégique`. Un rôle qui coche les quatre est mal défini (règle D2).
- **Source** — cadre de référence principal nommé (SAFe 6.0, Scrum Guide 2020, ASQ, IASSC, Cagan, PMBOK, BABOK, Google SRE, fonction publique QC/CA, Mintzberg, Jaques).
- **Descriptif orthodoxe** — toujours visible dans la cartouche. 1 à 2 phrases. Formulation conforme à la source, sans connotation.

> **Décision α (21/04/2026 soir).** Le champ *dérive du marché* est abandonné. Rationale : l'outil existe pour aiguiller vers les bonnes métriques, pas pour auditer la fiabilité des rôles. La posture filigrane Gemba reste portée ailleurs (définitions de métriques, anti-patterns nommés dans les fiches indicateurs). Voir `project_porte_niveau_doctrine_editoriale.md`.

## Règles d'écriture

- Pas de mot *senior*. Distinction par **périmètre** (mono-équipe / multi-équipes / portefeuille), pas par séniorité.
- PO = produit, jamais équipe. La distinction entre strates se fait par la taille du produit.
- Qualificatif entre parenthèses pour les rôles à cheval, pas en suffixe de métier.

---

## Opérationnel — strate équipe (horizon 1 jour à 1 an)

> Code interne `META.niveau = "équipe"`. Libellé de surface *Opérationnel*.

### 1. Développeur / Ingénieur logiciel

- **Axes** : projet, méthodologique
- **Source** : Scrum Guide 2020 (*Developers*) ; IEEE SWEBOK pour le socle d'ingénierie.
- **Descriptif orthodoxe** : Membre de l'équipe de réalisation, engagé sur un incrément livrable à chaque itération. Responsable de la qualité technique, des estimations, du respect des critères de « terminé », et de l'adaptation continue du plan de sprint.

### 2. Product Owner (produit mono-équipe)

- **Axes** : projet, stratégique
- **Source** : Scrum Guide 2020 (*Product Owner*) ; Marty Cagan *Inspired* pour la posture produit.
- **Descriptif orthodoxe** : Seul responsable de la valeur produite par l'équipe sur un produit dont le périmètre tient dans une équipe. Arbitre le backlog, ordonne les éléments selon la valeur, et porte la décision du *quoi* livrer.

### 3. Scrum Master (équipe)

- **Axes** : méthodologique, humaine
- **Source** : Scrum Guide 2020 (*Scrum Master*).
- **Descriptif orthodoxe** : Responsable de l'efficacité de l'équipe Scrum, coach sur les pratiques et lève les obstacles transverses. Ne dirige pas l'équipe hiérarchiquement et ne décide pas du contenu du backlog.

### 4. Tech Lead / Team Lead technique

- **Axes** : projet, méthodologique
- **Source** : pratique industrielle large (Google Engineering Practices, GitLab Handbook, ThoughtWorks) ; absent du Scrum Guide.
- **Descriptif orthodoxe** : Référent technique d'une équipe, garant de la cohérence d'architecture locale, du mentorat des développeurs, et des choix techniques non-triviaux. Contribue à la réalisation (ne se désengage pas du code).

### 5. Analyste métier / Business Analyst

- **Axes** : projet, méthodologique
- **Source** : BABOK v3 (IIBA).
- **Descriptif orthodoxe** : Modélise les besoins métier, facilite leur élicitation auprès des parties prenantes, assure la traçabilité entre objectifs business et exigences. Outille le PO et l'équipe, sans se substituer à la décision produit.

### 6. Designer UX / UI

- **Axes** : projet, méthodologique
- **Source** : Don Norman *The Design of Everyday Things* ; IxDA ; Nielsen Norman Group.
- **Descriptif orthodoxe** : Conçoit l'expérience utilisateur, conduit la recherche et les tests d'utilisabilité, prototype et documente les patterns d'interaction. Intervient en continu, du problème à la validation terrain.

### 7. Ingénieur SRE / DevOps (équipe)

- **Axes** : projet, méthodologique
- **Source** : Google *Site Reliability Engineering* (Beyer et al., 2016) ; *The DevOps Handbook* (Kim, Humble).
- **Descriptif orthodoxe** : Co-responsable avec l'équipe de la fiabilité du service en production — automatisation du déploiement, instrumentation (SLI/SLO), réponse aux incidents. Partage les astreintes et la charge cognitive du run.

### 8. Testeur / Ingénieur qualité (QA)

- **Axes** : méthodologique, projet
- **Source** : ISTQB ; Scrum Guide 2020 (qualité = responsabilité collective des *Developers*).
- **Descriptif orthodoxe** : Conçoit la stratégie de test, automatise les scénarios à forte valeur, et pousse la qualité en amont (test-driven, contract testing). La qualité reste une responsabilité partagée de toute l'équipe.

### 9. Chef d'équipe (management de proximité)

- **Axes** : humaine
- **Source** : management classique (Drucker *The Practice of Management*) ; Mintzberg *Structure in Fives* (ligne hiérarchique).
- **Descriptif orthodoxe** : Manager hiérarchique direct des membres de l'équipe. Porte les décisions administratives (évaluation, développement, congés, arbitrages de charge), et soutient le développement professionnel des personnes.

### 10. Ceinture jaune (Yellow Belt)

- **Axes** : méthodologique
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge.
- **Descriptif orthodoxe** : Sensibilisé aux outils fondamentaux Lean Six Sigma (DMAIC, 5S, cartographie de flux), contribue à des chantiers d'amélioration simples dans son équipe. Formation typique de 1 à 2 jours, sans projet individuel formel.

### 11. Ceinture verte (Green Belt)

- **Axes** : méthodologique, projet
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge.
- **Descriptif orthodoxe** : Pilote des projets DMAIC de taille moyenne dans son périmètre métier, maîtrise les outils statistiques de base (Pareto, cartes de contrôle, capacité de processus). Formation typique de 40 à 80 heures assortie d'un projet d'amélioration réel, soutenu devant un jury.

### 12. Coordinateur de livraison

- **Axes** : projet
- **Source** : pratique industrielle (organisations matricielles) ; dérivé des notions PMI de coordination de programme appliquées à l'échelle d'une équipe.
- **Descriptif orthodoxe** : Orchestre les dépendances de livraison d'une équipe avec son environnement — autres équipes, intégration, mise en production. Lève les obstacles transverses sans se substituer au PO sur le *quoi*.

### 13. Ingénieur data (data engineer / analyste data)

- **Axes** : projet, méthodologique
- **Source** : pratique industrielle (DAMA-DMBOK pour la gouvernance, Fundamentals of Data Engineering de Reis & Housley).
- **Descriptif orthodoxe** : Construit et fiabilise les pipelines de données (data engineer) ou produit des analyses actionnables pour les décisions de l'équipe (analyste data). Intégré à l'équipe produit, contribue aux décisions par la donnée.

---

## Tactique — strate programme (horizon 1 à 2 ans)

> Code interne `META.niveau = "programme"`. Libellé de surface *Tactique*.

### 1. Release Train Engineer (RTE)

- **Axes** : méthodologique, projet
- **Source** : SAFe 6.0 (*Release Train Engineer*).
- **Descriptif orthodoxe** : Chef d'orchestre d'un Agile Release Train, c'est-à-dire d'un ensemble d'équipes synchronisées (typiquement 5 à 12 équipes) qui livrent ensemble à un rythme trimestriel. Facilite la planification d'incréments de programme, lève les obstacles transverses entre équipes, assure la cadence et l'alignement avec les engagements de valeur.

### 2. Coach en transformation

- **Axes** : méthodologique, humaine
- **Source** : ICAgile ICP-ENT (*Enterprise Coaching for Agility*), SAFe SPC (*SAFe Program Consultant*) ; Michael Sahota *Emerging Leadership* ; Kotter *Leading Change* pour la conduite du changement.
- **Descriptif orthodoxe** : Accompagne une organisation ou un programme dans un changement d'ampleur vers un mode de fonctionnement plus agile ou plus lean. Intervient auprès des managers intermédiaires, des équipes et des communautés de pratique, mobilise la conduite du changement et la dynamique systémique. Mission typique de un à trois ans, centrée sur la structure et la culture organisationnelles.

### 3. Product Manager (produit multi-équipes)

- **Axes** : stratégique, projet
- **Source** : Marty Cagan & Chris Jones *Empowered* ; SAFe 6.0 (*Product Manager*).
- **Descriptif orthodoxe** : Responsable de la valeur d'un produit dont le périmètre dépasse une seule équipe. Arbitre la vision, les priorités et les engagements stratégiques du produit, tient la cohérence du parcours utilisateur à travers les équipes contributrices. Distinct du Product Owner par l'ampleur du produit, jamais par la séniorité de la personne.

### 4. Business Owner

- **Axes** : stratégique, projet
- **Source** : SAFe 6.0 (*Business Owner*).
- **Descriptif orthodoxe** : Représentant des parties prenantes exécutives au sein d'un Agile Release Train. Porte la responsabilité business de la livraison du programme, valide les engagements de valeur à chaque incrément, sponsorise les arbitrages d'investissement et de périmètre.

### 5. Chef de programme

- **Axes** : projet, stratégique
- **Source** : PMBOK *Standard for Program Management* (PMI) ; *Managing Successful Programmes* (MSP / PRINCE2).
- **Descriptif orthodoxe** : Coordonne un ensemble de projets interdépendants qui concourent à un bénéfice stratégique commun pour l'organisation. Responsable de la feuille de route du programme, de l'allocation des ressources entre projets, des arbitrages de périmètre et du reporting aux instances de direction.

### 6. Chef de service / Responsable d'unité

- **Axes** : humaine, stratégique
- **Source** : Peter Drucker *The Practice of Management* ; Henry Mintzberg *Structure in Fives* (ligne hiérarchique intermédiaire) ; management classique.
- **Descriptif orthodoxe** : Manager hiérarchique d'une unité rassemblant plusieurs équipes ou plusieurs métiers. Porte les décisions d'organisation de son périmètre — effectifs, trajectoires individuelles, budget de fonctionnement — et assure l'alignement sur les orientations de la direction générale.

### 7. PMO (Project / Program Management Officer)

- **Axes** : méthodologique, projet
- **Source** : PMI *PMO Frameworks* ; Association for Project Management (APM) *Body of Knowledge*.
- **Descriptif orthodoxe** : Garant des méthodes, des standards et du reporting à l'échelle d'un portefeuille de projets ou d'un programme. Outille les chefs de projet et de programme, consolide les indicateurs de pilotage, veille à la cohérence des pratiques sans se substituer aux décisions opérationnelles.

### 8. Black Belt (Lean Six Sigma)

- **Axes** : méthodologique, projet
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge (niveau *Black Belt*).
- **Descriptif orthodoxe** : Pilote des projets DMAIC transverses de grande ampleur, sur des problèmes complexes qui dépassent une seule équipe. Maîtrise les outils statistiques avancés (plans d'expérience, analyse de capabilité de processus), mentore les Green Belts et intervient pour le compte de plusieurs unités. Formation typique de 160 heures assortie de deux projets d'amélioration réels.

### 9. Champion Lean Six Sigma

- **Axes** : stratégique, humaine
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge (rôle *Champion*).
- **Descriptif orthodoxe** : Sponsor exécutif d'un portefeuille de projets Lean Six Sigma dans son périmètre. Sélectionne les chantiers d'amélioration prioritaires, alloue les ressources, lève les obstacles politiques, porte la visibilité des résultats auprès du comité de direction. Formation courte ciblée sur les enjeux de sponsorship.

### 10. Value Stream Manager

- **Axes** : méthodologique, projet, stratégique
- **Source** : Mike Rother & John Shook *Learning to See* ; Jeffrey Liker *The Toyota Way* ; Mike Rother *Toyota Kata*.
- **Descriptif orthodoxe** : Responsable d'une chaîne de valeur complète, du besoin client à sa satisfaction. Analyse le flux de bout en bout (cartographie VSM), identifie gaspillages et goulots, pilote des chantiers d'amélioration continue qui touchent plusieurs équipes ou fonctions. Posture typique aussi bien en industrie qu'en services.

### 11. Architecte de solution

- **Axes** : projet, méthodologique, stratégique
- **Source** : TOGAF 9.2 (*Solution Architect*) ; SAFe 6.0 (*Solution Architect*).
- **Descriptif orthodoxe** : Conçoit et garantit l'architecture d'une solution business de bout en bout, depuis les besoins fonctionnels jusqu'aux choix technologiques structurants. La solution traverse typiquement plusieurs systèmes applicatifs et plusieurs équipes. Dialogue étroit avec le chef de programme et le product manager pour arbitrer les compromis coût / délai / qualité structurelle.

### 12. Architecte fonctionnel / organique

- **Axes** : projet, méthodologique
- **Source** : Urbanisation du SI — Christophe Longépé *Le projet d'urbanisation du SI* ; Club Urba-EA. BABOK v3 (IIBA) pour le volet fonctionnel.
- **Descriptif orthodoxe** : Modélise les processus métier et leur traduction en capacités SI (volet *fonctionnel*), puis décompose le SI ou un bloc applicatif en composants, interfaces et flux techniques (volet *organique*). Certaines organisations distinguent nettement les deux rôles, d'autres les fusionnent en un seul architecte. Tradition francophone de l'urbanisation du SI, encore vivante dans le secteur public et les grandes DSI.

### 13. Head of Data / Responsable données

- **Axes** : stratégique, méthodologique
- **Source** : DAMA-DMBOK (*Data Governance Council*) ; Thomas Davenport *Competing on Analytics*.
- **Descriptif orthodoxe** : Porte la stratégie d'exploitation et de gouvernance des données à l'échelle d'un programme ou d'une direction métier. Définit les usages prioritaires, arbitre entre gouvernance, qualité et vélocité, outille les équipes data en standards et en plateforme. Interface avec les métiers sur la valeur attendue et avec la DSI sur la capacité technique.

### 14. Directeur (fonction publique QC / CA)

- **Axes** : humaine, stratégique
- **Source** : Gouvernement du Québec — classification des cadres supérieurs, classe 3 ; gouvernement fédéral canadien — groupe *Executive*, niveaux EX-01 et EX-02.
- **Descriptif orthodoxe** : Strate de gestion intermédiaire dans l'appareil d'État québécois ou fédéral canadien. Pilote une direction qui rassemble plusieurs services, porte les engagements du ministère sur son périmètre, et rend compte à un directeur général ou à un sous-ministre adjoint selon la taille du ministère. Horizon de pilotage annuel à biennal.

---

## Portefeuille — strate portefeuille (horizon 2 à 5 ans)

> Code interne `META.niveau = "portefeuille"`. Libellé de surface *Portefeuille*.

### 1. Lean Portfolio Manager (LPM)

- **Axes** : stratégique, méthodologique
- **Source** : SAFe 6.0 (*Lean Portfolio Management*).
- **Descriptif orthodoxe** : Responsable de la gestion Lean d'un portefeuille de valeur dans une organisation à l'échelle. Pilote l'investissement par chaînes de valeur, déploie le Lean Budgets, arbitre les Epics de portefeuille et tient la cadence de revue stratégique. Triade d'animation avec l'Enterprise Architect et le Business Owner de portefeuille.

### 2. Solution Train Engineer (STE)

- **Axes** : méthodologique, projet
- **Source** : SAFe 6.0 (*Solution Train Engineer*).
- **Descriptif orthodoxe** : Chef d'orchestre d'un *Solution Train*, c'est-à-dire d'un ensemble de plusieurs Agile Release Trains qui collaborent à la livraison d'une solution complexe (typiquement 50 à 125 personnes). Facilite la synchronisation inter-trains, la planification des incréments de solution et la levée des obstacles transverses à l'échelle de la solution. Équivalent du RTE d'un cran au-dessus.

### 3. Portfolio Manager

- **Axes** : stratégique, projet
- **Source** : PMI *Standard for Portfolio Management* (4e édition).
- **Descriptif orthodoxe** : Gestionnaire d'un portefeuille de projets, de programmes et d'initiatives opérationnelles qui concourent aux objectifs stratégiques de l'organisation. Arbitre la composition du portefeuille (sélection, priorisation, équilibrage), suit la performance agrégée et pilote les réallocations en cours d'exercice. Travaille en étroite relation avec les sponsors exécutifs et le bureau de gouvernance.

### 4. VP Product / Chief Product Officer (multi-produits)

- **Axes** : stratégique, projet
- **Source** : Marty Cagan & Chris Jones *Empowered* ; Ben Horowitz *The Hard Thing About Hard Things*.
- **Descriptif orthodoxe** : Responsable d'un portefeuille de produits dans une ligne métier ou une filiale. Anime une équipe de Product Managers, arbitre la cohérence de l'offre, porte la vision produit à l'échelle du portefeuille et interagit directement avec le comité de direction. Distinct du Chief Product Officer de groupe (strate exécutive) par l'étendue de la ligne couverte, jamais par la séniorité de la personne.

### 5. Architecte d'entreprise

- **Axes** : stratégique, méthodologique
- **Source** : TOGAF 9.2 (*Enterprise Architect*) ; SAFe 6.0 (*Enterprise Architect*) ; Zachman Framework.
- **Descriptif orthodoxe** : Garant de la cohérence architecturale de l'entreprise — architecture métier, applicative, de données, technologique. Définit les principes structurants, anime la trajectoire d'urbanisation à moyen terme, arbitre les choix technologiques qui engagent plusieurs domaines. Travaille avec les Architectes de solution pour ancrer les principes dans les livraisons concrètes.

### 6. Master Black Belt (MBB)

- **Axes** : méthodologique, humaine, stratégique
- **Source** : ASQ / IASSC Lean Six Sigma Body of Knowledge (niveau *Master Black Belt*).
- **Descriptif orthodoxe** : Expert de plus haut niveau technique et pédagogique dans le déploiement Lean Six Sigma d'une organisation. Définit la stratégie d'amélioration continue, forme et mentore les Black Belts, pilote les chantiers de transformation les plus complexes. Porte la cohérence méthodologique à l'échelle de l'entreprise et conseille les Champions et le comité de direction.

### 7. Coach Agile stratégique / Business Agility Coach

- **Axes** : méthodologique, stratégique, humaine
- **Source** : Michael Sahota *Emerging Leadership* ; Karim Harbott *The 6 Enablers of Business Agility* ; Business Agility Institute (*Domains of Business Agility*) ; Mike Burrows *Agendashift*.
- **Descriptif orthodoxe** : Accompagne le comité de direction et la structure organisationnelle dans une évolution vers l'agilité d'affaires. Intervient sur les leviers structurels — stratégie, culture, leadership, architecture organisationnelle, modèle de financement — avec un horizon de trois à cinq ans. Posture *évolutionnaire* distincte de la posture *transitionnelle* du Coach en transformation tactique : ne déploie pas un cadre méthodologique, conçoit le chemin adapté au contexte.

### 8. Directeur de portefeuille (EPMO)

- **Axes** : méthodologique, stratégique
- **Source** : PMI *Enterprise PMO Frameworks* ; Association for Project Management (APM) *Directing Change*.
- **Descriptif orthodoxe** : Responsable du bureau de pilotage de portefeuille à l'échelle de l'entreprise (*Enterprise Project Management Office*). Définit les standards de gouvernance, consolide le reporting exécutif, instruit les dossiers d'investissement pour le comité stratégique, et arbitre les ressources transverses. Distinct du PMO Tactique par son horizon et son interlocuteur — il rend compte au comité de direction, pas à un chef de programme.

### 9. Directeur de transformation (CxT)

- **Axes** : stratégique, humaine, méthodologique
- **Source** : John Kotter *Leading Change* ; McKinsey *The CTO's role in transformation* ; Prosci ADKAR.
- **Descriptif orthodoxe** : Porte une transformation structurelle de l'organisation — modèle opérationnel, digital, culturel — sur un horizon pluriannuel. Oriente les chantiers majeurs, coordonne les directions métiers et transverses, rend compte au comité de direction. Rôle souvent temporaire (trois à cinq ans) qui s'éteint une fois les nouveaux modes de fonctionnement ancrés.

### 10. Directeur général de Business Unit / Directeur de domaine métier

- **Axes** : humaine, stratégique
- **Source** : Peter Drucker *The Practice of Management* (management par objectifs) ; Henry Mintzberg *Structure in Fives* (ligne hiérarchique haute) ; Alfred Chandler *Strategy and Structure*.
- **Descriptif orthodoxe** : Pilote une filiale, une business unit ou un domaine métier d'une grande organisation. Deux variantes courantes : le *Directeur général de Business Unit* porte un compte de résultat autonome sur un marché donné ; le *Directeur de domaine métier* pilote une fonction transverse (Marketing, Logistique, Opérations) dans une structure matricielle. Dans les deux cas, horizon pluriannuel, arbitrage budget et feuille de route, animation d'une équipe de direction propre.

### 11. Directeur principal (secteur coopératif / parapublic QC)

- **Axes** : humaine, stratégique
- **Source** : Classifications internes des grandes coopératives financières québécoises (Mouvement Desjardins, SSQ, La Capitale) et de certaines sociétés d'État du Québec (Caisse de dépôt et placement, Hydro-Québec).
- **Descriptif orthodoxe** : Strate de cadre supérieur spécifique à l'écosystème coopératif et parapublic québécois, située entre le Directeur et le Vice-président. Pilote un regroupement de directions ou un pôle stratégique transverse, rapporte à un vice-président et participe aux comités stratégiques. Horizon de pilotage pluriannuel, portée d'arbitrage qui dépasse une direction unique.

### 12. Directeur général (fonction publique QC / CA)

- **Axes** : stratégique, humaine
- **Source** : Gouvernement du Québec — classification des cadres supérieurs, classe 2 ; gouvernement fédéral canadien — groupe *Executive*, niveau EX-03.
- **Descriptif orthodoxe** : Pilote une direction générale rassemblant plusieurs directions, au sein d'un secteur ministériel. Rattaché à un sous-ministre adjoint, porte les orientations stratégiques d'un pan du ministère, anime une équipe de directeurs et rend compte devant les instances de gouvernance publique. Horizon pluriannuel, arbitrage des priorités et des ressources du périmètre.

### 13. Sous-ministre adjoint (SMA / ADM)

- **Axes** : stratégique, humaine
- **Source** : Gouvernement du Québec — classification des cadres supérieurs, classe 1 ; gouvernement fédéral canadien — groupe *Executive*, niveaux EX-04 et EX-05 (*Assistant Deputy Minister*).
- **Descriptif orthodoxe** : Pilote un secteur ministériel — ensemble de directions générales — sous l'autorité d'un sous-ministre. Traduit les orientations gouvernementales en programmes et en politiques publiques, rend des arbitrages structurants et porte la représentation institutionnelle du secteur devant les instances de gouvernance. Horizon pluriannuel à mandat politique, strate charnière entre l'appareil administratif et l'autorité politique.

---

*Un niveau restant à produire : Exécutif (entreprise).*
