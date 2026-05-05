# Cadre visuel et UX — Outil cadre-indicateurs

*Document compagnon. Posture stylistique de référence à laquelle toutes les pages de l'outil obéissent. Doctrine permanente, système évolutif — la doctrine est posée pour 5 à 10 ans et ne se renégocie pas à chaque chantier ; le système (composants, tokens, copies) évolue par refactoring progressif.*

---

## 1. Pourquoi ce document

Avant le chantier 10, la doctrine visuelle de l'outil restait diffuse — décisions ponctuelles consignées au fil des chantiers (token `--niv-1` pour le système de niveaux, désaturé Doux pour les axes Mintzberg, fond pill indigo pour l'entrée active de la nav, italique gris pour les rôles répétés). Cohérent dans le détail, mais sans ligne directrice qui dise *« voilà à quoi ressemble cet outil et pourquoi »*.

Au point de cadrage du chantier 10 (étape D2 + D4 — exposition des 4 lentilles dans *Par mes 4 axes* + responsive de la nav à 8 entrées), une question préalable est apparue : *l'accueil hérite du style du site, donc on ne peut pas le dessiner sans avoir cadré le reste*. D'où ce document — qui ne dessine rien encore, mais qui pose la **posture** vers laquelle tendent toutes les pages.

**Ordre de production retenu** :
1. **Étape A** — *posture stylistique globale* (ce document, sections 3 à 5).
2. **Étape B** — *incarnation sur les pages-types* (§ 6 ci-dessous, livrée le 05/05/2026).
3. **Étape C** — *retour au chantier 10* (D2, D4) à la lumière du cadre.

---

## 2. Méthode — comment cette posture a été produite

Consultation de **5 panels d'experts nommés** sur **8 axes de boussole**. Méthode calquée sur celle déjà éprouvée pour les définitions de métriques (cf. `project_regle_definitions_metriques.md`) — panels spécifiques au domaine, pas Lean+Agile par défaut.

**Panels convoqués** :

- **Panel 1 — Architecture de l'information** : Peter Morville & Louis Rosenfeld, Abby Covert, Indi Young, Donna Spencer.
- **Panel 2 — UX globale et moments-clés** : Steve Krug, Jakob Nielsen, Kathy Sierra, Alan Cooper.
- **Panel 3 — Pédagogie produit et explorables** : Bret Victor, Richard Saul Wurman, Edward Tufte, Mike Caulfield.
- **Panel 4 — Visual design et hiérarchie typographique** : Massimo Vignelli, Dieter Rams, Josef Müller-Brockmann, Erik Spiekermann.
- **Panel 5 — Design systems et scalabilité** : Brad Frost, Nathan Curtis, IBM Carbon / Material Design (école institutionnelle), Alla Kholmatova.

**Méthode** : pour chaque axe, restitution des positions par école (voix concentrée, pas paraphrase générique), puis verdict (convergence ou divergence) avec recommandation argumentée. Lætitia arbitre le positionnement final en validant ou en se déplaçant sur l'axe.

---

## 3. Les 8 axes de posture

| # | Axe | Position retenue |
|---|---|---|
| 1 | **Sobre ↔ Expressif** | Sobre — chaleur portée par la grille et la typographie |
| 2 | **Institutionnel ↔ Artisanal** | Artisanal sous discipline institutionnelle |
| 3 | **Dense ↔ Aéré** | Dualité contextuelle — orientation aérée, fiches denses |
| 4 | **Sérieux ↔ Ludique** | Sérieux et chaud — chaleur par la voix textuelle |
| 5 | **Statique ↔ Interactif** | Interactif signifiant — chaque clic produit un retour |
| 6 | **Standardisé ↔ Singulier** | Standardisé sur les composants, singulier sur la signature |
| 7 | **Permanent ↔ Évolutif** | Doctrine permanente, système évolutif |
| 8 | **Universel ↔ Situé** | Situé modéré — voix française, grammaire visuelle universelle |

---

## 4. Posture en une formule

**Un outil artisan-sérieux-chaud, sobre par discipline, interactif par mission, situé par voix.**

Lecture de la formule. *Artisan* — la voix dit *« je cherche avec toi »* (posture socratique de la mission), pas *« je sais »*. *Sérieux* — pas de blague, pas de clins d'œil graphiques. *Chaud* — la chaleur passe par la voix textuelle (formulations humaines, place pour celui qui se trompe, tooltips qui aident vraiment), pas par l'humour visuel. *Sobre par discipline* — la richesse vient de la matière et de la grille, jamais du décor. *Interactif par mission* — chaque clic est signifiant parce que l'outil enseigne par la manipulation, pas par le cours magistral. *Situé par voix* — voix française et références assumées (Drucker, Goldratt, Deming, Tufte), grammaire visuelle universelle pour ne pas hypothéquer une traduction future.

---

## 5. Implications opérationnelles axe par axe

*Lecture obligatoire avant tout dessin de page nouvelle ou tout refactoring d'existant. Les implications sont les conséquences directes des positions de la § 3 — une décision visuelle qui les contredit doit soit reposer la posture (§ 3), soit ne pas être prise.*

### 5.1 Sobre — discipline visuelle

- Palette restreinte. Au-delà du fonctionnel (sémantique des niveaux, des axes, des états), pas d'ajout chromatique décoratif.
- Pas d'effets gratuits (ombres travaillées, dégradés d'ambiance, animations de transition décoratives).
- Typographie économe : 2 graisses maximum par contexte de lecture. La hiérarchie passe par la taille et la graisse, pas par la couleur ou l'effet.
- Risque consigné : sobre sans rigueur = austère. La grille et la typographie portent la chaleur que le décor ne porte pas — leur soin est non-négociable.

### 5.2 Artisanal sous discipline institutionnelle — voix qui cherche, rigueur qui crédibilise

- Voix textuelle qui dit *« on regarde ensemble »* — formulations humaines, pas de jargon non explicité, pas de clauses comminatoires.
- Trace assumée du fait-main — l'outil ne se déguise pas en application industrielle anonyme. La signature visuelle peut porter cette trace (voir § 5.6 *Signature*).
- Rigueur visuelle non-négociable — le ton chaleureux ne dispense pas de la précision géométrique. Pas de pixel hors grille, pas d'écart typographique fortuit.
- Anti-pattern : l'artisanal ne doit pas glisser vers le *paysan* (codes vintage), le *vintage* (rétro mode), ou le *artisanat-marketing* (faux fait-main des marques). Trace de main = posture humble, pas esthétique de la rusticité.

### 5.3 Dualité dense/aéré — selon le rôle de la page

- **Pages d'orientation** (accueil, sélection d'angle, tableau de bord, *Par mes 4 axes*, *Par ma question*) → aérées. Espaces généreux, blocs respirent, lecture progressive. Krug et Wurman.
- **Pages de matière** (fiche d'indicateur enrichie, panel d'experts, anti-patterns, exemples détaillés) → denses bien tenues. Information abondante par cm² (Tufte), pagination réduite, mais grille rigoureuse pour que la densité reste lisible (Müller-Brockmann).
- L'unité de l'outil n'est pas tenue par une aération uniforme mais par la **grille commune** et la **typographie commune**. La densité varie ; la grammaire ne varie pas.
- Anti-pattern : une page d'orientation densifiée pour faire savant, ou une fiche matérialisée par tant de blanc qu'elle paraît pauvre.

### 5.4 Sérieux et chaud — chaleur par la voix, pas par l'humour visuel

- Pas de blague graphique, pas de pictogrammes mignons, pas d'illustrations ludiques.
- Mais des messages d'erreur qui contextualisent et n'humilient pas, des tooltips qui aident vraiment, des empty states qui orientent. Microcopy travaillée.
- La chaleur vient aussi de la **générosité dans le détail** — un tooltip plus long que strictement nécessaire si la pédagogie le demande, un alt sur les icônes, une définition glosée plutôt qu'un acronyme sec.
- Anti-pattern : ton institutionnel froid (juridique, comminatoire), ou à l'inverse ton de copain (familier, ironique).

### 5.5 Interactif signifiant — chaque clic produit un retour

- Toute action utilisateur produit un retour visible et signifiant. Pas d'état intermédiaire muet.
- Manipulation directe préférée à la modale et à la confirmation systématique — l'utilisateur teste, voit le résultat, défait si besoin.
- L'interactivité enseigne (Bret Victor, Sierra) : un clic sur une métrique éclaire des fiches voisines, un filtre montre comment il restreint le résultat. Pas d'animation décorative.
- Anti-pattern : interactivité décorative (animation de bienvenue, transitions appuyées sans valeur informative), ou à l'inverse pages purement statiques où l'utilisateur lit sans manipuler.

### 5.6 Standardisé sur les composants, singulier sur la signature

- **Composants** suivent les patterns marché reconnaissables sans friction : cards, accordéons, tabs, navs horizontales, fiches en tiroir, tooltips au survol, recherche en haut, marquage d'état actif par fond pill. L'utilisateur reconnaît, ne mémorise pas. Krug, Nielsen, Frost, Curtis.
- **Signature visuelle** propre à l'outil : palette (tokens `--niv-*` pour les niveaux, désaturé Doux pour les axes Mintzberg, indigo `--niv-1` pour l'entrée active, sémantique de la fiabilité), choix typographique, mise en scène pédagogique des fiches (ce qu'on mesure / ce qu'on prétend mesurer / panel d'experts / anti-patterns), structure de la doctrine textuelle.
- Test d'application : un visiteur arrive — au premier coup d'œil il sait qu'il est dans un outil web professionnel sérieux (composants reconnaissables) ; au deuxième coup d'œil, il sait que c'est *celui-ci* et pas un autre (signature reconnue après quelques secondes de lecture).

### 5.7 Doctrine permanente, système évolutif

- La **doctrine** (sections 3 à 5 de ce document) est posée pour 5 à 10 ans. Elle ne se renégocie pas à chaque chantier — un chantier qui veut s'écarter d'un axe doit ouvrir explicitement la révision de la doctrine, motivée et tracée.
- Le **système** (composants, tokens, copies, fiches) évolue par refactoring progressif (déjà ancré dans le projet — *« cible architecturale + 8 règles opportunistes »*, cf. mémoire `project_regles_refactoring_progressif.md`). Pas de big-bang.
- Conséquence pratique : un commit qui touche à un composant peut le faire évoluer librement pourvu qu'il respecte la doctrine. Un commit qui veut introduire une couleur, un effet, un pattern qui contredit la doctrine doit motiver l'écart.

### 5.8 Situé modéré — voix française, grammaire visuelle universelle

- **Voix textuelle française assumée**. Références assumées (Drucker, Goldratt, Deming, Tufte, Kaplan-Norton, Reichheld, Roberge, etc. — patrimoine déjà présent dans les fiches). Vocabulaire métier français standard. Pas de globish.
- **Grammaire visuelle universelle**. Typographie, grille, palette, hiérarchies — neutres culturellement. Une traduction future ne nécessitera pas de refonte visuelle.
- Anti-pattern : idiosyncrasies françaises invasives (jeux de mots intraduisibles, tics culturels qui bloquent un visiteur non-français même francophone, par exemple un Belge ou un Québécois).

---

## 6. Incarnation sur les pages-types — étape B

*Cette section consigne les décisions d'incarnation prises lors de l'étape B (séances des 04 et 05/05/2026), à partir des trois mockups-preview produits côte à côte. Elle ne décrit pas exhaustivement les pages — elle nomme les **décisions structurantes** prises sur chacune, ancrées sur les axes de la § 3. Le détail visuel se lit dans les mockups référencés ; la doctrine se lit ici.*

### 6.0 Posture commune aux 3 pages-types

Avant d'entrer dans les pages, ce que les trois incarnations partagent — et qui constitue la grammaire visuelle de l'outil. Le détail varie selon le rôle de chaque page (orientation aérée pour l'accueil et la lentille, matière dense pour la fiche), mais la grammaire ne varie pas.

- **Papier crème** comme fond commun. Chaleur portée par le fond, pas par les composants. Rupture nette avec le bleu nuit / glassmorphism / emojis de l'accueil hérité.
- **Filet de niveau saturé en haut** comme couronnement de chaque page. Signature visible au premier coup d'œil, qui dit *« cet outil pense en niveaux »* sans avoir à le lire. Variantes : un seul filet pour les pages monoculaires (accueil, fiche), un filet 4-couleurs pour les pages plurielles (lentille).
- **Icônes SVG line monochromes** partout. Différenciation des rôles, pas hiérarchie de tailles ; sobriété, pas pictogrammes mignons. Remplacent systématiquement les emojis hérités.
- **Citations patrimoniales en pied de page**, voix située. Drucker à l'accueil, Goldratt en pied de fiche, citations Tufte / Bret Victor sur la lentille — la voix française et les références assumées de l'axe 8 incarnées sans bruit.
- **Grille et typographie communes**, jamais renégociées d'une page à l'autre. C'est ce qui tient l'unité de l'outil malgré les variations de densité.

### 6.1 Accueil

*Référence : commit `958042d`, fichier `mockup-accueil-etape-B.html`. Variante retenue : **« v2 alt — sans pyramide »**. Décision pyramide tranchée par Lætitia le 05/05/2026.*

L'accueil est une page d'orientation pure. Sa mission : permettre à un visiteur de comprendre en 10 secondes que cet outil pense en niveaux et de choisir lequel le concerne. Tout le reste (la pédagogie sur la cascade, l'invitation à manipuler, le patrimoine doctrinal) se déplie sur les pages suivantes.

Décisions structurantes :

- **Pas de pyramide en accueil.** Quatre cartes égales pour les quatre niveaux. Deux raisons combinées : **(a)** la pyramide dénotait dans le style avec le reste de l'outil — sa silhouette graphique manquait de cohérence avec la grammaire visuelle qui s'est stabilisée par ailleurs (papier crème, filet de niveau, icônes line, sobriété typographique) ; **(b)** la pyramide donnait une emphase visuelle exclusive à l'**axe hiérarchique** (équipe → entreprise) alors que l'outil a depuis ouvert d'autres axes de lecture tout aussi pertinents — *Par mon problème*, *Par mon cadre*, *Par mes 4 axes Mintzberg*, *Par ma maturité*. Les exposer tous comme égaux suppose que l'accueil n'en privilégie aucun visuellement. La différenciation entre cartes passe par l'icône et la palette de niveau, pas par la largeur ou la hauteur. Conséquence collatérale : ferme de fait la décision D5 du chantier 10 (« pyramide en sursis »).
- **Différenciation TI / Affaires préservée au niveau Équipes.** Le retrait de la pyramide ne fait pas disparaître la signalétique que la pyramide portait : la distinction *Équipes TI* / *Équipes Affaires* est conservée dans la carte du niveau *équipe*, par un mini-split visible — puces de couleur (turquoise pour TI, orange pour Affaires) et icônes différenciantes (chevrons code pour TI, façade pour Affaires). Cohérent avec l'axe 6 *Singularité de la signature* — la dichotomie TI/Affaires est une signature de l'outil, elle change de support sans disparaître.
- **Icônes SVG line monochromes par niveau** (boussole, balance, réseau, chevrons, façade). Différenciation par rôle, pas par hiérarchie. Pas d'emoji ni de pictogramme illustratif — incarnation directe des axes 1 *sobre* et 4 *sérieux pas mignon*.
- **Filet de niveau saturé en haut, bords des cartes amincis.** La signature de niveau passe par le filet horizontal, pas par un encadrement vertical lourd. Bords amincis pour éviter l'effet *poster* — l'accueil reste un atterrissage, pas un manifeste.
- **Papier crème en fond, chrome rehaussé.** Rupture assumée avec l'accueil hérité (bleu nuit / glassmorphism). La chaleur vient du fond crème ; le chrome (légèrement rehaussé par rapport à v1) tient la lisibilité sans faire industriel.
- **Citation Drucker en pied de page.** Voix située, axe 8. Pose la mission de l'outil sans avoir à la formuler en titre — *« What gets measured gets managed »* fait office de mission silencieuse pour le visiteur qui descend.

### 6.2 Fiche d'indicateur

*Référence : commit `e821662`, fichier `mockup-fiche-etape-B.html`. Page-test : fiche t4* Efficacité de flux du portefeuille *(type FLUX, niveau tactique, fiabilité précaution, maturité avancé).*

La fiche est une **page de matière** au sens de l'axe 3 *Dense ↔ Aéré*. Elle existe pour qu'un utilisateur arrive avec une question précise (*« qu'est-ce que je mesure réellement avec cet indicateur, à quelles conditions, et que dois-je éviter ? »*) et reparte avec la réponse. La densité n'est pas un défaut, c'est la mission.

Le mockup-test sur la fiche t4 confirme que la fiche existante tient déjà la posture sur trois axes (1 sobre, 3 densité, 7 permanent) — la posture confirme plus qu'elle ne déplace. Les décisions ci-dessous sont donc des **déplacements ciblés**, pas une refonte.

Décisions structurantes :

- **Densité confirmée comme posture, pas corrigée.** Pas d'aération supplémentaire. La fiche d'indicateur est volontairement dense (Tufte) ; l'aération est tenue par la grille et la typographie, pas par l'espace blanc.
- **Couronnement de niveau : filet 4px en haut de la fiche entière.** Cohérence avec la signature commune (§ 6.0). Le niveau de la fiche est lisible dès le couronnement, sans avoir à chercher la chip *niveau* dans la matière.
- **Chip type harmonisé sur la couleur sémantique du type.** Pour la fiche FLUX, chip orange (token `--accent` du type). Conséquence : la chip de niveau (violet figé `#4c1d95`) et la chip de type ne sont plus de la même couleur — elles sont au contraire signifiantes l'une à côté de l'autre. Cohérence chromatique sémantique, pas décorative.
- **SVG line à la place des emojis** dans tous les champs structurés (titre, exemples, fréquence, alt). Cohérent avec la signature commune. Anti-pattern évité : la fiche actuelle utilisait des emojis pour ponctuer ses sections, ce qui contredit l'axe 4 *sérieux pas mignon*.
- **Bloc vigilance — double signal sur les anti-patterns.** Les noms d'anti-patterns reçoivent simultanément le `term-def` violet (signal sémantique : c'est un terme qu'on peut survoler) et un surlignage ambré (signal pragmatique : ne fais pas ça). Règle déjà actée le 04/05, ici élevée au statut de doctrine d'incarnation pour toutes les fiches futures.
- **Citation Goldratt en pied de fiche.** Voix située, axe 8. La fiche d'indicateur portant souvent sur le flux, Goldratt vient en cohérence interne avec la matière de la page.

### 6.3 Lentille *Par mes 4 axes*

*Références : commit `31f7c1b`, fichier `mockup-lentille-etape-B.html` (3 variantes V1/V2/V3) ; décision D2 commit `64c8249` (V3 retenue).*

La lentille est une page d'**orientation manipulable**. Sa mission : permettre à un utilisateur d'explorer le référentiel selon les quatre axes Mintzberg (et, à terme, selon les lentilles futures du § 4.4 — flux, communication, visibilité, intention) en cumulant des angles. Particularité : la lentille n'existe pas encore en code — pas de côte à côte avant/après. Les décisions sont donc structurantes au sens fort : elles fixent ce qu'on construira.

Décisions structurantes :

- **Variante V3 retenue : filtre chips cumulables avec résultat dynamique.** L'utilisateur active des chips correspondant aux axes qui le concernent ; le résultat (liste filtrée d'indicateurs) se met à jour en dessous au fur et à mesure. Manipulation directe, axe 5 *Interactif signifiant*. Inspiration Tufte / Bret Victor — chaque clic produit un retour immédiat et signifiant. Anti-pattern évité (V2) : le stepper séquentiel forçait un parcours imposé, friction à l'entrée incompatible avec la posture *« on regarde ensemble »* de l'axe 2.
- **Argument structurant retenu pour V3 : extensibilité.** Un nouvel axe (les lentilles futures du § 4.4) coûte un chip supplémentaire en V3, contre une refonte de layout en V1 (grille 2×2) ou V2 (stepper). Décision prise au nom de l'axe 7 *Doctrine permanente, système évolutif*.
- **Cohérence d'usage avec la porte *« Par mon problème »*.** Le pattern de chips cumulables est déjà en place sur cette porte — V3 le réutilise plutôt que d'inventer un mécanisme propre. Axe 6 *Standardisé sur les composants*.
- **Filet 4-couleurs en haut signant la page-lentille.** Variante de la signature commune (§ 6.0). Le filet à 4 couleurs porte visuellement le fait que la lentille convoque les 4 axes Mintzberg simultanément.
- **Icônes line monochromes par axe Mintzberg.** Une icône par chip d'axe, ligne, monochrome. Différenciation par forme, pas par couleur saturée — la couleur reste portée par le filet et par le système des niveaux.
- **Couplage D2+D4 relâché.** Conséquence collatérale notable : le passage en V3 absorbe largement la pression responsive postulée pour D4 (les chips wrapent naturellement). D4 reste à arbitrer, mais sur ses propres mérites — plus comme préalable à D2.

### 6.4 Ce que le § 6 ne dit pas

Le périmètre de l'étape B couvre trois pages-types : accueil, fiche d'indicateur, lentille. Les **autres pages-types** (tableau de bord, cascade stratégique, lexique, à propos, et les portes *« Par mon problème »*, *« Par mon cadre »*, *« Par mon niveau »* hors lentille) sont laissées au **refactoring opportuniste**. Elles évolueront vers la posture incarnée ci-dessus au fil des chantiers qui les touchent, à la condition qu'aucun besoin terrain ne remonte une priorité plus pressante.

Cette économie est cohérente avec l'axe 7 *Système évolutif* : la doctrine est posée, le système suit par refactoring progressif, pas par refonte big-bang. Si un chantier ultérieur révèle qu'une page-type non couverte ici résiste à l'incarnation, le retour ne se fera pas en révision du § 6 mais en ouverture d'un nouveau chantier d'étape B (par exemple : *étape B² — incarnation du tableau de bord*) avec mockup côte à côte et décisions structurantes propres.

---

## 7. Conventions de tenue du document

- **Zone évolutive** : §§ 3 à 5 sont la doctrine — modifier seulement par un chantier explicite de révision de doctrine, jamais en passant. § 6 a été constituée le 05/05/2026 et fait foi sur l'incarnation des 3 pages-types couvertes.
- **Journal du document** : toute modification de § 3 à § 5 doit être tracée dans le journal de fin de document avec la date, le motif et le commit de référence.
- **Ce document fait foi** quand un autre document compagnon ou un commit produit une décision visuelle. En cas de contradiction, ce document tranche jusqu'à révision explicite.

---

## Journal du document

- 04/05/2026 — création du document. Posture initiale établie sur 8 axes après consultation des 5 panels d'experts. Validation Lætitia : axes 1 à 8 validés tels que recommandés par les panels (aucun déplacement). Étape B (incarnation pages-types) à venir dans les séances suivantes.
- 05/05/2026 — § 6 *Incarnation sur les pages-types* renseignée à partir des trois mockups-preview produits le 04/05 (`958042d` accueil v2, `e821662` fiche t4, `31f7c1b` lentille V3) et de la décision D2 (`64c8249`). Décision Lætitia du 05/05 : pas de pyramide en accueil — ferme de fait la décision D5 du chantier 10. Étape B close ; étape C (retour au chantier 10 — D3, D4, D6) ouverte.
