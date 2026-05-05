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
| Trois indicateurs candidats | Cards, niveau + nom bilingue + intention d'usage + lien vers fiche | 3 cards, jamais plus |
| Bloc *Recommandation* | Conseil positif d'abord, anti-patterns nommés en seconde lecture | 1 paragraphe |
| Pied — *Cette question s'appuie sur* | Écoles convoquées, italique discret, séparateur pointillé | 2 à 4 écoles |

### 4.2 Variante standard — questionnaire court autonome

Pour les questions sans terme-piège connu. Le visiteur arrive, répond à 2 questions de cadrage (orientées **diagnostic**, pas solution — voir § 6 *Posture DMAIC*), repart avec 3 indicateurs candidats.

Exemple posé dans le mockup-preview : *« Par où démarrer une démarche d'amélioration continue ? »*

- Question 1 — *« D'où vient le besoin ? »* (orientation symptôme : *Des délais imprévisibles · Des défauts qui se répètent · Une charge qui dérape · Un manque de visibilité*).
- Question 2 — *« Où agir ? »* (orientation périmètre : *Une équipe pilote · Un programme entier · Toute l'organisation*).
- Sortie : 3 indicateurs candidats correspondant au croisement diagnostic × périmètre.

### 4.3 Variante à reformulation — double réponse + raccourci vers porte

Pour les questions contenant un terme-piège (vélocité, ROI, NPS, etc. — voir § 5). Le visiteur arrive, voit deux réponses voisines en juxtaposition, choisit, est orienté vers la porte préconfigurée correspondante.

Exemple posé dans le mockup-preview : *« Comment améliorer la vélocité de mon équipe ? »*

- Section *Votre vrai sujet* : deux colonnes côte à côte.
  - Colonne gauche — *Ce que vous demandez* : le terme posé (vélocité), ses indicateurs propres, ses bons usages limités. Bouton *Garder ma question* (neutre).
  - Colonne droite — *Ce que vous cherchez peut-être* : le terme voisin (prévisibilité), ses indicateurs, son intérêt actionnable. Bouton *Basculer* (indigo plein, action probable).
- Bandeau d'orientation : indique explicitement vers quelle porte préconfigurée le visiteur sera dirigé selon son choix. Pas de surprise.

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
| 1 | **Palette définitive du format-fiche-question** | ⏸ ouverte — tranche v3 du mockup contestée par Lætitia (couleurs « affreuses », fade, vieillot) | À reprendre en séance dédiée à la palette, possiblement avec d'autres questions de finition visuelle |
| 2 | **Liste exhaustive des termes-pièges** | ⏸ ouverte — 4 termes identifiés (vélocité, ROI, NPS, story points) | À étoffer par les panels d'experts au fil de la rédaction |
| 3 | **Volumétrie finale par panel** | ⏸ ouverte — fourchettes posées, à confirmer à la rédaction | À l'arrivée des questions candidates |
| 4 | **Seuil de bascule responsive de la double réponse** | ⏸ couplée à D4 (chantier 10) | Quand D4 sera arbitrée |
| 5 | **Rédaction des 8 à 12 questions MVP** | ⏸ ouverte — point de départ posé (4 questions de Q2) | Séances suivantes, panel par panel |

---

## Journal du document

- **05/05/2026** — création du document. Mission posée, 3 invariants actés, méthodologie panels confirmée, format normalisé arbitré sur 2 variantes, mécanisme de reformulation tranché (double réponse), posture éditoriale (DMAIC, voix directe, bilingue, *Recommandation* positive). Mockups produits dans la séance : `mockup-reformulation-catalogue.html`, `mockup-format-fiche-question.html`. Décisions ouvertes : palette, termes-pièges, volumétrie par panel, responsive D4, rédaction des 8-12 questions MVP.
