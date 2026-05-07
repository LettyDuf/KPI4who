# Catalogue de questions fines — doctrine et format

*Document compagnon. Doctrine du chantier éditorial **Catalogue de questions fines** (mode *Par ma question*). Décisions structurantes tranchées le 05/05/2026 ; le document s'enrichit au fil des séances de construction des questions.*

---

## 1. Mission du catalogue

Le mode *Par ma question* sert le visiteur qui arrive avec un problème concret en tête, formulé dans la langue de son métier, et qui ne veut pas entrer dans la grammaire de l'outil pour trouver les indicateurs qui l'aideront. Il complète le mode *Par mes 4 axes* sans s'y substituer.

Le catalogue lui propose un nombre **délibérément restreint** de questions courantes — formulées telles qu'un manager, un coach ou un dirigeant les pose à voix haute, pas telles que le concepteur de l'outil les classerait. Chaque question conduit le visiteur, en deux à quatre clics, à 3 indicateurs candidats avec leur intention d'usage.

**Le contrat tient sur deux exigences indissociables.**

- **Efficacité.** Le visiteur trouve ce qu'il cherche en moins de 10 minutes. Un visiteur perdu dans trop d'information ne revient pas.
- **Qualité actionnable.** Ce qu'il trouve doit être pertinent, lui faciliter la compréhension, l'utilité, la mise en œuvre. Un visiteur qui repart avec un conseil applicable a envie de revenir.

L'efficacité sans qualité fait quitter au premier doute. La qualité sans efficacité fait quitter avant de la voir.

**Ce que ce catalogue ne fait pas.** Il n'épuise pas les situations possibles — il sert 80 % des visiteurs efficacement et qualitativement, pas 100 %. Il n'est pas un test diagnostic — il propose, il n'évalue pas.

---

## 2. Trois invariants

Décisions actées le 05/05/2026, qui ne se renégocient pas sans nouveau mandat.

- **Aucun nommage de persona à l'entrée.** La question elle-même doit suffire à reconnaître qui parle, sans typage prescriptif. Argument : un visiteur typé *« coach »* attend des conseils de coach et ne se reconnaît pas dans une question pourtant pertinente pour lui ; un *« DSI »* idem. La question libellée en langage métier déjoue ces attentes restrictives.
- **Chaque question explicite les 2 à 4 écoles de pensée qu'elle convoque.** Comme les fiches métriques explicitent leurs anti-patterns. Affichage en pied de fiche, sous le bloc *Recommandation*, comme **référence patrimoniale**, jamais comme un choix à faire.
- **Machinerie mixte, question par question.** Certaines questions sont des **raccourcis** vers une porte existante avec préconfiguration ; d'autres ont un **questionnaire court autonome** (2 à 3 questions de cadrage) qui retourne directement les indicateurs. Le choix se fait au cas par cas, en fonction de ce qui sert le mieux le visiteur. La machinerie est annoncée dans le bandeau supérieur de chaque fiche.

---

## 3. Méthodologie de construction

Le catalogue se construit par **consultation de panels d'experts nommés**, doctrine déjà établie pour les définitions de métriques et étendue ici au travail éditorial.

Cinq panels convoqués (validés le 23/04/2026, confirmés le 05/05/2026) :

- **Gestion du changement** — Kotter, ADKAR, Bridges, Lewin, Satir.
- **Coach Lean** — Toyota Way, Lean Six Sigma, théorie des contraintes (Goldratt), Kata Coaching.
- **Coach Agile** — Scrum, Kanban / niveaux de vol, LeSS, Agile Fluency.
- **Terrain des autres cadres** — DORA / SPACE, BSC (Kaplan-Norton), OKR (Doerr), ITIL / ITSM, EFQM.
- **Accompagnement en management** — Drucker (MBO), Senge, Mintzberg, Argyris, Goldsmith, coach exécutif.

**Pourquoi.** Lætitia veut éviter que le catalogue soit un recyclage *Lean+Agile* par défaut. La diversité des panels garantit des angles qui parlent à la diversité des visiteurs (DSI, responsable transformation, chef de programme, dirigeant, coach…), sans avoir besoin de les nommer comme personas.

**Comment.** Pour chaque question candidate, restitution des positions des écoles convoquées (voix concentrée, pas paraphrase générique), puis arbitrage de Lætitia sur la formulation finale, le rattachement à une porte existante ou la création d'un questionnaire autonome.

---

## 4. Format normalisé d'une fiche-question

Toutes les fiches du catalogue partagent la même structure. Deux variantes selon que la question contient ou non un terme-piège.

### 4.1 Structure commune

| Section | Rôle | Volumétrie cible |
|---|---|---|
| Question (titre) | Libellé visiteur, en langage métier | 1 phrase, 1.6 rem, font-weight 700 |
| Bandeau d'attente | Annonce ce qui attend le visiteur (durée + nature du parcours) | 1 phrase courte, fond indigo léger |
| Section principale | Variable selon la variante (questionnaire court OU double réponse) | 2 à 4 clics |
| Trois indicateurs candidats | Cards, niveau + nom bilingue + intention d'usage + lien vers fiche | **3 cards, jamais plus** |
| Lien sortant patrimonial | **Un seul** lien sortant sous le trio, vers une fiche cadre existante du référentiel (ex : *Voir tous les indicateurs canoniques de l'amélioration continue par école*) | 1 lien, jamais plus — facultatif si non pertinent |
| Bloc *Recommandation* | Conseil positif d'abord, anti-patterns nommés en seconde lecture | 1 paragraphe |
| Cross-link vers fiche-question liée | Lien vers une autre fiche-question du catalogue (ex : *Mes indicateurs reflètent-ils la réalité du terrain ?*) | 0 ou 1, italique discret |
| Pied — *Cette question s'appuie sur* | Écoles convoquées, italique discret, séparateur pointillé | 2 à 4 écoles |

**Règle stricte sur les 3 cards.** Jamais 4, jamais 2. La discipline *« proposer, pas étaler »* (chantier 16) tient ici par contrat. Le visiteur qui veut élargir passe par le **lien sortant patrimonial** (vers la fiche cadre), pas par une 4e card pliée. Ce lien est la seule porte d'extension acceptée au MVP.

**Cards à fiche absente — option mixte.** Si une fiche métrique cible n'existe pas encore dans le référentiel, la card reste **active** sur son nom et son intention d'usage (le concept est nommé, le visiteur apprend), mais le lien *Voir la fiche* est désactivé avec le libellé honnête *« Fiche en cours de constitution »*. La dette est ainsi rendue visible sans frustrer le visiteur.

### 4.2 Variante standard — questionnaire court autonome

Pour les questions sans terme-piège connu. Le visiteur arrive, répond à 2 questions de cadrage (orientées **diagnostic**, pas solution — voir § 6 *Posture DMAIC*), repart avec 3 indicateurs candidats.

Exemple rédigé éditorialement le 05/05/2026 (séance soir) : *« Par où démarrer une démarche d'amélioration continue ? »* — panel **Coach Lean** (Toyota Way, Lean Six Sigma, Théorie des contraintes, Kata coaching).

- Question 1 — *« D'où vient le besoin ? »* — orientation **symptôme**, 5 options : *Des délais imprévisibles · Des défauts qui se répètent · Une charge qui dérape · Un manque de visibilité · Une étape goulot connue*. Cette dernière option fait entrer Goldratt (TOC) sans pédagogie lourde.
- Question 2 — *« Où agir ? »* — orientation **périmètre**, 3 options : *Une équipe pilote · Un programme entier · Toute l'organisation*.
- Sortie : 3 indicateurs candidats. La conditionnalité du croisement Q1×Q2 obéit à la **doctrine du trio par niveau** détaillée en § 4.4.

### 4.3 Variante à reformulation — double réponse + raccourci vers porte

Pour les questions contenant un terme-piège (vélocité, ROI, NPS, etc. — voir § 5). Le visiteur arrive, voit deux réponses voisines en juxtaposition, choisit, est orienté vers la porte préconfigurée correspondante.

Exemple posé dans le mockup-preview : *« Comment améliorer la vélocité de mon équipe ? »*

- Section *Votre vrai sujet* : deux colonnes côte à côte.
  - Colonne gauche — *Ce que vous demandez* : le terme posé (vélocité), ses indicateurs propres, ses bons usages limités. Bouton *Garder ma question* (neutre).
  - Colonne droite — *Ce que vous cherchez peut-être* : le terme voisin (prévisibilité), ses indicateurs, son intérêt actionnable. Bouton *Basculer* (indigo plein, action probable).
- Bandeau d'orientation : indique explicitement vers quelle porte préconfigurée le visiteur sera dirigé selon son choix. Pas de surprise.

### 4.4 Doctrine du trio par niveau (variante standard)

**Décision actée le 05/05/2026 (séance soir).** Pour la variante standard, la conditionnalité du croisement Q1×Q2 obéit à deux règles distinctes :

- **Q1 (symptôme) → ordre des 3 cards.** Le trio reste le même, mais l'ordre s'adapte au symptôme dominant. Ex : *« étape goulot connue »* → Throughput remonte en card 1 (lecture TOC) ; *« défauts qui se répètent »* → First-pass yield remonte en card 1 (lecture LSS).
- **Q2 (périmètre) → trio par niveau.** Le trio lui-même change selon l'échelle, parce que la nature de la question change avec le niveau. *« Par où démarrer ? »*, pour une équipe, c'est instrumenter un terrain ; pour une organisation, c'est aligner les humains et installer la confiance qui rend le signalement sûr. Ce n'est pas la même démarche — donc pas le même trio.

**Pourquoi cette gradation.** Toyota Way pose deux piliers égaux — *Continuous Improvement* et *Respect for People*. Au niveau équipe, le pilier humain s'exprime par la routine quotidienne (PDCA, Kata) — il *est* la pratique, il ne se mesure pas par un indicateur séparé. Au niveau programme, l'humain devient *alignement des parties prenantes*. Au niveau stratégique, l'humain devient *changement et confiance* — la culture elle-même. Le trio doit refléter cette gradation, sinon le pilier humain est masqué.

**Risque évité.** Un trio uniforme à tous niveaux (ex : Lead time / First-pass yield / Throughput partout) reflète la lecture *flux-DORA* du Lean et masque le pilier humain au stratégique — précisément le travers que dénoncent Liker, Womack, Rother dans la transmission contemporaine du TPS. La doctrine du trio par niveau corrige ce biais.

**Mode opératoire éditorial.** Pour chaque fiche-question de variante standard, rédiger 3 trios distincts (équipe / programme / organisation), avec leurs intentions d'usage et leurs blocs *Recommandation* propres. Si certaines cards pointent vers des fiches métriques absentes du référentiel, appliquer l'option mixte (§ 4.1).

---

### 4.5 Palette de la fiche-question *(décision 20.1 close 06/05/2026)*

La palette des fiches-questions a été arbitrée le 06/05/2026 en **deux temps**. (i) Arbitrage initial sur **4 candidates côte à côte** (mockup `mockup-palette-fiche-question-comparatif.html`) : Sobre niveau (A), Vert profond éprouvé (B), Cuivre brûlé (C), Bleu de Prusse (D). Décision Lætitia : **B retenue**, D en réserve documentée. (ii) Audit visuel cross-niveaux le même jour (mockup `mockup-palette-fiche-question-niveaux.html`) : Lætitia constate à l'œil que B vert profond se confond avec **deux** niveaux (équipe + programme — deux teintes vertes), tandis que D bleu de Prusse ne se confond qu'avec **un** seul (stratégique). **Bascule décidée et exécutée** : palette **D bleu de Prusse `#1d3a5f`** adoptée, palette **B vert profond `#1f5945`** rétrogradée en réserve documentée. Le filet de sécurité doctrinal posé le matin (« si bascule, conserver les autres tokens — seul l'accent change ») a joué à la lettre : un seul commit token, aucun autre token modifié.

**Tokens actés** :

- `--accent-fiche-q : #1d3a5f` *(bleu de Prusse — registre marine institutionnel, ton calme et grave)* — porte les boutons primaires de la fiche-question, le bord et le titre du bloc *Recommandation*, le lien sortant patrimonial unique, le numéro de question rond, le surlignage des anti-patterns en double signal.
- `--accent-fiche-q-leger : rgba(29, 58, 95, 0.10)` — fond léger des options sélectionnées dans le questionnaire court.
- `--accent-fiche-q-trame : rgba(29, 58, 95, 0.10)` — fond du surlignage anti-pattern. *Réglage du 06/05/2026 (avant la bascule B → D) — opacité abaissée de 0.20 à 0.10 sur retour Lætitia (« surlignage trop fort dans le cadre Recommandation »). Décision tranchée sur mini-preview à 3 versions (`mini-preview-recommandation-anti-pattern.html`) ; version B (vert atténué) retenue. Le réglage d'opacité reste valable après la bascule sur le bleu de Prusse — le motif (respiration dans le cadre Recommandation) est indépendant de la teinte.*
- `--reco-fond : rgba(29, 58, 95, 0.05)` — fond très pâle du bloc *Recommandation*.
- `--reco-bord : #1d3a5f` — bord du bloc *Recommandation*.
- `--reco-titre : #1d3a5f` — titre *Recommandation*.

**Invariants préservés** : papier crème `#f6f1e1` en fond global, blanc franc `#ffffff` dans la matière (questionnaire, cards, recommandation), filet de niveau saturé en haut de fiche (turquoise `#6fa89e` pour équipe, vert `#7d9670` pour programme, orange `#c79373` pour tactique, violet `#5a4f7a` pour stratégique — tokens `--niv-*` partagés avec tout l'outil), indigo chrome `#4c1d95` pour le bandeau meta et les éléments de chrome global.

**Division du travail chromatique** *(point doctrinal)* — l'**indigo `#4c1d95`** reste le **chrome universel de l'outil** (term-def, bandeaux meta, boutons primaires globaux, navigation principale). Le **bleu de Prusse `#1d3a5f`** prend le rôle de **signature spécifique fiche-question**. Cohabitation propre : indigo violet clair-saturé vs bleu de Prusse foncé-désaturé, distinction par la teinte ET par la luminance.

**Réserve documentée — palette B, vert profond éprouvé `#1f5945`** (alternative chaude écartée). Initialement retenue le 06/05/2026 sur arbitrage des 4 candidates pour son registre forêt-bibliothèque (sémantique : croissance organique, sagesse calme). Écartée le même jour après audit visuel cross-niveaux : confondait perceptivement avec deux niveaux (équipe `#6fa89e` ET programme `#7d9670`). B reste consultable pour un futur usage qui n'aurait pas le contexte cross-niveaux (par exemple sur une page mono-niveau, ou si la palette des niveaux évolue). Mockups d'arbitrage : `mockup-palette-fiche-question-comparatif.html` (4 candidates) et `mockup-palette-fiche-question-niveaux.html` (cross-niveaux).

**Cuivre brûlé `#a14e1f` écarté** — trois raisons convergentes : (1) sémantique d'alerte qui contredit le bloc *Recommandation* positif ; (2) conflit chromatique structurel avec le niveau tactique (orange désaturé `#c79373`) ; (3) redondance avec le surlignage ambré déjà utilisé sur les anti-patterns des fiches d'indicateur (`project_fiches_double_signal_anti_patterns`).

**Trace doctrinale** : `doc-cadre-visuel.md` § 6.5 *Fiche-question (mode Par ma question)* — qui fait foi en cas de contradiction.

---

## 5. Mécanisme de reformulation

**Décision actée le 05/05/2026 : double réponse retenue** (et non redirection douce ni miroir socratique).

**Pourquoi la double réponse.**

- **Indicateurs visibles dans les deux cases** = pédagogie par mots-clés simultanés, pas par prose enveloppante.
- **Phrases courtes et franches** dans chaque colonne — la double réponse n'est pas plus longue à lire, elle est *différemment* lisible. On balaye, on ne lit pas linéairement.
- **Décision plus rapide à prendre** — par comparaison à l'œil, pas par effort de relecture (cf. mémoire `feedback_pedagogie_par_juxtaposition`).

**Anti-patterns écartés.**

- *Redirection douce* (encart *« vous cherchez peut-être plutôt »*) — risque paternaliste, suppose que la question voisine soit unique.
- *Miroir socratique* (3 reformulations à choisir avant la réponse) — friction explicite à l'entrée, contradiction avec la posture *« on regarde ensemble »*.

**Quand appliquer la double réponse.** Uniquement aux questions contenant un terme-piège identifié. Les autres questions (la majorité) suivent la variante standard. La distinction se fait à l'écriture de la question, pas dynamiquement.

**Termes-pièges connus à ce stade.**

- **Vélocité** → souvent posée à la place de *prévisibilité* ou de *délai bout à bout*.
- **ROI** (en programme) → souvent posé à la place de *valeur livrée*.
- **NPS** → parfois posé à la place de *rétention* ou *valeur vie client*.
- **Story points / points d'effort** → parfois posés à la place de *complexité maîtrisée* ou *prévisibilité*.

Liste à compléter par les panels d'experts au fur et à mesure de la rédaction.

---

## 6. Posture éditoriale

Règles d'écriture qui s'appliquent à toutes les fiches du catalogue. Cohérence avec le doc compagnon `doc-cadre-visuel.md`.

### 6.1 Posture DMAIC — diagnostic avant solution

Les questions de cadrage de la variante standard sont en mode **D**éfinir (le problème), pas en mode **A**méliorer (la solution).

- Question type *« D'où vient le besoin ? »* (diagnostic) — oui.
- Question type *« Quelle solution préférez-vous ? »* (solution) — non.

Cohérent avec la mission : le catalogue aide à **identifier les indicateurs**, donc à passer en phase *Mesurer*. Il ne saute pas l'étape *Définir*.

### 6.2 Voix directe et bienveillante

Libellés courts (3 à 6 mots quand c'est possible). Voix active à la 2e personne. Bienveillance par le mot juste, pas par la longueur (cf. mémoire `feedback_voix_directe_bienveillante`).

### 6.3 Anglicismes traduits ou évités

Voix française assumée. Pour les indicateurs canoniquement nommés en anglais, **modèle bilingue sur une ligne** : *« Délai bout à bout / Lead time »*, *« Débit / Throughput »*. Pour les autres anglicismes courants, traduction systématique : *questionnaire court* (pas *mini-stepper*), *truquage des points d'effort* (pas *gaming des story points*), etc. (cf. mémoire `feedback_anglicismes_eviter_traduire`).

### 6.4 Bloc *Recommandation* positif

Renversement de la rhétorique habituelle des blocs vigilance : la **solution arrive en premier**, le piège évité vient en seconde lecture comme conséquence du conseil.

- *« Pour bien faire, commencer par une équipe pilote — l'amélioration continue se construit pas à pas, jamais par déploiement big-bang. »*
- Pas : *« Attention au déploiement big-bang. À éviter. Préférer l'équipe pilote. »*

Anti-patterns conservés en double signal (term-def violet + surlignage ambré, cf. mémoire `project_fiches_double_signal_anti_patterns`).

### 6.5 Pédagogie par juxtaposition

Pour les variantes à reformulation, deux blocs courts côte à côte avec mots-clés et indicateurs visibles. Pas de prose explicative en place de la juxtaposition. La juxtaposition est *compression visuelle*, pas étalement.

---

## 7. Volumétrie cible

**8 à 12 questions au MVP.**

Discipline éditoriale du chantier 16 — *« proposer, pas étaler »*. Le marché ne manque pas de catalogues ; il manque d'outils qui obligent à choisir. Chaque question ajoutée au-delà du nécessaire augmente la surface de choix sans augmenter la valeur.

**Volumétrie par panel** — équilibre cible (à confirmer à la rédaction) :

- Gestion du changement — 1 à 2 questions
- Coach Lean — 2 à 3 questions
- Coach Agile — 2 à 3 questions
- Terrain des autres cadres — 2 à 3 questions
- Accompagnement en management — 1 à 2 questions

**Quatre questions candidates déjà identifiées** dans `matiere-questionnaire-pour-catalogue.md` (issues de Q2 du questionnaire actuel) :

- *Comment arbitrer entre les initiatives qui se présentent ?*
- *Par où démarrer une démarche d'amélioration continue ?*
- *Comment aligner mes équipes vers un objectif commun ?*
- *Quoi mettre dans mon pilotage hebdomadaire ?*

À raffiner et étoffer par les panels d'experts. Constituent le point de départ critique, pas la prescription finale.

---

## 8. Articulations avec autres chantiers

| Chantier | Articulation |
|---|---|
| **D3** *(chantier 10)* — exposition du mode fin *Par ma question* | Le catalogue est un **préalable** à D3 : on a besoin du contenu avant de dessiner l'écran qui l'expose. |
| **D4** *(chantier 10)* — responsive de la nav à 8 entrées | **Couplage avec la double réponse** : sur petit écran, les deux colonnes basculent en vertical. À arbitrer en D4 le seuil de bascule et la lisibilité de la seconde colonne. **Décision ouverte à reprendre en D4.** |
| **Chantier 16** *(discipline éditoriale)* — propose plutôt qu'étale | Cadre la volumétrie du catalogue (8-12 max au MVP). |
| **Chantier 19** *(cadre visuel)* — posture des 8 axes | Le format des fiches incarne la posture (papier crème, hiérarchie, voix française, sobriété). |
| **Porte *Par mon problème*** | Cible des **raccourcis** pour les fiches-questions à reformulation et pour certaines questions standards. Préconfiguration sur famille de problème + niveau. |
| **Porte *Par mon cadre*** | Cible possible de raccourcis pour les questions liées à un cadre méthodologique (LSS, Agile, OKR…). |
| **Porte *Par mon niveau*** | Cible possible pour les questions à dominante *qui décide* (cf. 53 fiches rôles préservées dans `inventaire-roles-porte-niveau.md`). |

---

## 9. Décisions ouvertes

| # | Décision | Statut | Pour quand |
|---|---|---|---|
| 1 | **Palette définitive du format-fiche-question** | ✅ close 06/05/2026 en deux temps — (i) palette B vert profond `#1f5945` retenue sur arbitrage des 4 candidates ; (ii) bascule sur **palette D bleu de Prusse `#1d3a5f`** le même jour après audit visuel cross-niveaux (B confondait avec 2 niveaux, D ne confond qu'avec 1). B en réserve documentée comme alternative chaude écartée. Cuivre écarté. Cf. § 4.5 ci-dessus + `doc-cadre-visuel.md` § 6.5 | — |
| 2 | **Liste exhaustive des termes-pièges** | ⏸ ouverte — 4 termes identifiés (vélocité, ROI, NPS, story points) | À étoffer par les panels d'experts au fil de la rédaction |
| 3 | **Volumétrie finale par panel** | ⏸ ouverte — fourchettes posées, à confirmer à la rédaction | À l'arrivée des questions candidates |
| 4 | **Seuil de bascule responsive de la double réponse** | ⏸ couplée à D4 (chantier 10) | Quand D4 sera arbitrée |
| 5 | **Rédaction des 8 à 12 questions MVP** | ⏸ ouverte — point de départ posé (4 questions de Q2). 1 fiche rédigée éditorialement le 05/05/2026 (*Par où démarrer une démarche d'amélioration continue ?*, panel Coach Lean) — mise en mockup à venir | Séances suivantes, panel par panel |
| 6 | **Trio alternatif (v2 du catalogue)** | ⏸ ouverte — décision MVP : un seul trio orthodoxe par croisement Q1×Q2. v2 envisage un *trio alternatif* étiqueté par sa posture (ex : angle KBI/comportement, angle TOC/contrainte) en complément. À tester sur 1-2 questions avant de généraliser | Après les premières fiches livrées, si le besoin se confirme |
| 7 | **Fiche-question méta — *Mes indicateurs reflètent-ils la réalité du terrain ?*** | ⏸ ouverte — fiche-question candidate identifiée 05/05/2026. Sujet : effet pastèque, triangulation déclaratif/objectif/humain. Panel pressenti : Drucker (MBO honnête) + Toyota Way (Gemba, Andon) + Edmondson (psychological safety) + DORA (data-driven). Sortie pressentie : trio anti-pastèque (un déclaratif, un objectif, un humain anonyme) | Chantier 20, à intégrer dans le calendrier MVP |
| 8 | **Mécanisme de cross-link entre fiches-questions** | ⏸ ouverte — principe acté 05/05/2026 : 0 ou 1 cross-link par fiche-question, sous le bloc Recommandation, italique discret. À matérialiser au moment où une seconde fiche-question liée est rédigée (ex : pastèque ↔ amélioration continue) | Quand 2 fiches-questions liées seront livrées |

---

## Journal du document

- **05/05/2026** — création du document. Mission posée, 3 invariants actés, méthodologie panels confirmée, format normalisé arbitré sur 2 variantes, mécanisme de reformulation tranché (double réponse), posture éditoriale (DMAIC, voix directe, bilingue, *Recommandation* positive). Mockups produits dans la séance : `mockup-reformulation-catalogue.html`, `mockup-format-fiche-question.html`. Décisions ouvertes : palette, termes-pièges, volumétrie par panel, responsive D4, rédaction des 8-12 questions MVP.
- **06/05/2026 (suite)** — réglage post-arbitrage 20.1 sur le surlignage anti-pattern. Lætitia note que le surlignage vert dans le cadre Recommandation de la v4.1 est trop fort. Mini-preview comparatif produit (`mini-preview-recommandation-anti-pattern.html`) avec 3 versions : A actuelle (vert saturé), B vert atténué, C doctrinale (indigo + ambré localisé). Décision : **version B retenue** — opacité du surlignage abaissée de 0.20 à 0.10. Précision § 4.5 sur le token `--accent-fiche-q-trame`. Commit mockup : `74a6a13`.
- **06/05/2026** — décision 20.1 *Palette définitive du format-fiche-question* close. Arbitrage sur 4 candidates côte à côte (`mockup-palette-fiche-question-comparatif.html` — Sobre niveau / Vert profond éprouvé / Cuivre brûlé / Bleu de Prusse) avec zoom de cohabitation indigo+accent. Décision Lætitia : palette B (vert profond `#1f5945`) retenue ; palette D (bleu de Prusse `#1d3a5f`) en réserve documentée. § 4.5 *Palette de la fiche-question* ajouté ; doctrine tracée dans `doc-cadre-visuel.md` § 6.5. Mémoire : `project_palette_fiche_question_actee.md`.
- **06/05/2026 (audit visuel)** — décision 20.1 révisée le même jour. Production d'un mockup cross-niveaux dédié (`mockup-palette-fiche-question-niveaux.html`, commit `b3d99fb`) : 4 niveaux × 2 palettes (B et D) côte à côte. Constat de Lætitia à l'œil : B vert profond se confond avec **deux** niveaux (équipe + programme), D bleu de Prusse ne se confond qu'avec **un** seul (stratégique). **Bascule actée** : palette **D `#1d3a5f`** adoptée comme signature fiche-question ; palette **B `#1f5945`** rétrogradée en réserve documentée comme alternative chaude écartée. Mise à jour cohérente § 4.5 (préambule, tokens, division du travail chromatique, réserve, décision #1 du tableau). Le filet de sécurité doctrinal posé le matin a joué à la lettre : un seul commit token, aucun autre token modifié. Mémoire `project_palette_fiche_question_actee.md` à mettre à jour.
- **05/05/2026 (séance soir)** — première fiche-question rédigée éditorialement : *Par où démarrer une démarche d'amélioration continue ?* (panel Coach Lean). Quatre décisions structurantes ajoutées au format normalisé : (1) règle stricte des 3 cards confirmée + lien sortant patrimonial unique comme seule porte d'extension MVP ; (2) mécanisme cards à fiche absente en option mixte ; (3) **doctrine du trio par niveau** (§ 4.4) — la conditionnalité Q2 change le trio lui-même, pas seulement le niveau des fiches ; (4) cross-link entre fiches-questions (0 ou 1). Trois nouvelles décisions ouvertes ajoutées (#6 trio alternatif v2 ; #7 fiche-question méta véracité/pastèque ; #8 mécanisme cross-link). Dette de référentiel identifiée : 4 fiches métriques à créer (First-pass yield × équipe ; Lead time × programme ; COPQ × stratégique ; Écart de vérité × stratégique) — inscrites dans le backlog.
