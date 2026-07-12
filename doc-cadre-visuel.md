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

### 6.1 Accueil unifié *Choisir mes indicateurs*

*Référence : commit `8589834`, fichier `mockup-accueil-unifie-chips.html` (v7). Doctrine consignée dans `project_accueil_unifie_v7.md`. Décision actée le 08/05/2026 nuit, à l'issue de 7 itérations de mockup-preview convergées (`2c56921` → `8589834`). Remplace l'ancien § 6.1 *Accueil 4 cartes* du 05/05/2026, dont la version 4-cartes-égales devient une étape historique du chantier 19. La conséquence collatérale est nominative : la décision D5 du chantier 10 (« pyramide en sursis ») se ferme effectivement — la pyramide disparaît du visible.*

**L'accueil est l'outil.** L'accueil n'est plus une page d'orientation qui invite l'utilisateur à choisir une porte. Il est le lieu unique du choix d'un indicateur. Aucune nouvelle vue ne s'ouvre depuis l'accueil — tout se joue dans la même page. Cette inversion répond à l'irritant utilisateur signalé le 08/05/2026 : *« je cherche à simplifier l'outil et ne pas générer des chemins cachés »*. Conséquence directe : les 3 vues détail des portes (problème, cadre, niveau) disparaissent comme pages séparées, leurs mécaniques sont absorbées dans la page unifiée.

Décisions structurantes :

- **Architecture verticale en 7 strates.** De haut en bas : (1) bandeau du haut à 6 entrées (cf. `doc-contrats-navigation.md` § 4.1) ; (2) **mission en composition « manifeste deux étages »** posée au-dessus du titre — étage 1 : trois verbes en capitales scandés par des slashes, ambré `--ambre` (`Choisir / Comprendre / Expliquer`) ; étage 2 : suite en serif Georgia italique blanc cassé `les indicateurs pertinents, du terrain à la stratégie.` — puis le titre `Choisir mes indicateurs` en h2 blanc cassé qui reste l'ancrage de l'action concrète ; (3) cartouche compagnon *Par ma question ▾* en haut, repliée par défaut, qui héberge l'index des fiches-questions ; (4) marqueur typographique *« — ou — »* qui sépare les deux modes d'entrée ; (5) bloc des 4 chips à combiner *Problème · Cadre · Niveau · Maturité* ; (6) cartouche compteur *N sur 89 indicateurs ▾*, repliée par défaut ; (7) liste filtrée en grille 2 colonnes, révélée par déploiement du compteur.
- **Mécanique des chips — accordéon en place.** Chaque chip s'ouvre en accordéon dans son emplacement (pas de modale, pas de panneau latéral) et révèle son sélecteur. Mono-sélection sur Niveau et Maturité (marqueurs ronds, comme un radio-bouton). Multi-sélection sur Problème et Cadre (marqueurs carrés, comme une case à cocher). À la sélection, la chip se referme en mode actif avec sa valeur visible : `✓ Niveau · Programme`. Recliquer dessus la rouvre pour modifier. Pas de limite haute sur le nombre de chips actives — l'utilisateur pilote son seuil de bruit.
- **Cartouches cliquables, repliés par défaut à l'arrivée.** Pas de mur de matière à l'ouverture. Chaque cartouche affiche un compteur live de son contenu, un chevron `▾`/`▴`, et un libellé d'action *Voir / Masquer*. La doctrine *« on regarde ensemble »* de l'axe 2 *artisanal sous discipline* tient même quand l'utilisateur n'a encore rien fait : il découvre l'outil par strates qu'il déplie à son rythme.
- **Format de fiche-card UNIQUE — `htmlCarte()` partout.** Le composant de fiche-card de la liste filtrée est strictement identique à celui des autres pages de l'outil (tableau de bord, lentilles antérieures). En-tête (icône colorée, type, nom, badge fiabilité), corps (pitch tronqué, meta fréquence/maturité, chip cadre), pied (boutons panier ✓ *en place* / 💡 *à envisager*, lien *Voir le détail →*). Bordure colorée selon la fiabilité (vert *Fiable* / orange *Précaution*). **Boutons panier disponibles dès l'accueil** — c'est ce qui rend l'accueil-outil opérationnel : l'utilisateur peut commencer à sélectionner ses indicateurs sans changer de page. Cohérent avec l'axe 6 *Standardisé sur les composants* poussé jusqu'à son terme.
- **Mintzberg sort du visible.** Pas de chip *Angle*, pas de pastille sur les fiches, pas de légende. La doctrine ne tient plus comme filtre — elle recouvrait les chips existantes (un *« angle humain »* recoupe à 80 % une *« question d'engagement d'équipe »*), elle imposait un naming forcé, elle parlait une langue de concepteur. L'attribut `axes: [...]` reste présent dans les fiches du référentiel mais cesse d'être consommé visuellement. Statut latent à arbitrer dans un chantier séparé (constat collatéral n°1 du chantier 23) : retrait pur, conservation, ou réintroduction sous une autre forme (page *Lecture Mintzberg* dédiée). Ne bloque rien.
- **Filet de niveau saturé en haut, conservé.** Cohérence avec la signature commune (§ 6.0). La page d'accueil unifiée porte le filet 4-couleurs (variante des pages plurielles), parce qu'elle convoque les 4 niveaux simultanément avant tout filtrage.
- **Crème en fond global, blanc franc dans la matière.** La page d'accueil est aérée par la marge crème ; les cartouches et la liste de fiches-cards reposent sur du blanc franc. Cohérent avec l'axe 3 *Dualité dense/aéré selon le rôle de la page* : accueil = orientation aérée, fiches = matière dense, mais la dualité s'exprime maintenant dans une seule page.
- **Citation Drucker en pied de page, conservée.** Voix située, axe 8. *« What gets measured gets managed »* tient sa fonction de mission silencieuse pour le visiteur qui descend la page.

**Ce qui sort par rapport à l'ancien § 6.1.**

- Le mockup *« v2 alt — sans pyramide »* (commit `958042d`) et son layout *4 cartes égales par niveau* sont **archivés comme étape de chantier 19**. La décision *« pas de pyramide »* y était déjà acquise — elle survit dans l'accueil unifié, simplement portée différemment (Mintzberg sort aussi, axe hiérarchique non privilégié visuellement, les 4 niveaux apparaissent comme une chip parmi 4).
- La signalétique *Équipes TI / Équipes Affaires* portée par la carte du niveau équipe disparaît comme rendu visuel d'accueil. Si elle doit revenir, ce sera sous une autre forme (chip secondaire, filtre interne à la chip *Niveau*) — à arbitrer si un usage le demande, pas dans 23.a.

**Ce qui reste de l'ancien § 6.1.**

- Le diagnostic *« la pyramide manquait de cohérence avec la grammaire visuelle »* reste vrai et continue de motiver son retrait.
- Les axes 1, 4, 6, 8 (sobre, sérieux pas mignon, standardisé sur les composants, voix située) demeurent les ancrages de l'incarnation visuelle de cette page.


**Mission au-dessus du titre — composition « manifeste deux étages ».**

Le bloc d'en-tête a été épuré le 08/05/2026 (commit `127f592`) en retirant trois éléments jugés techno-narcissiques ou redondants (surtitre `PAGE UNIFIÉE`, filet décoratif, sous-titre `Quatre lentilles à combiner`). La promesse était de réintroduire une mission dans un commit dédié. C'est fait le 09/05/2026 (commit `378634d`) après itération avec deux experts DA + UX writer (3 mockups, 6 variantes, validation Beta).

La phrase canonique est : *« Choisir, comprendre, expliquer : les indicateurs pertinents, du terrain à la stratégie. »*

Trois principes typographiques :

1. **Mission au-dessus du titre, pas en dessous.** La mission cadre l'outil tout entier ; le titre `Choisir mes indicateurs` nomme l'action concrète à faire sur cette page. La hiérarchie verticale dit donc : *raison d'être → action proposée → mécaniques.*
2. **Deux étages typographiques contrastés.** Étage 1 sans-serif capitales ambré (registre signal, scande les trois verbes). Étage 2 serif Georgia italique blanc cassé 1.55 rem (registre éditorial, porte la phrase complète). Le mélange des deux familles est la signature visuelle de la mission, référence Pentagram. Le « : » de la phrase canonique est porté visuellement par les deux étages, donc ne figure pas dans le markup.
3. **Aucun caractère « IA-typé ».** Pas d'em dash `—`, pas d'en dash `–`, pas d'ellipsis Unicode `…`, pas de smart quote. Apostrophes droites, guillemets français `« »` pour les citations, slashes ASCII pour les scandages. Cette règle de propreté de caractères s'étendra au reste de l'app dans des passes suivantes.

Mockup d'arbitrage conservé : `mockup-mission-accueil.html` (v6 final).

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

### 6.3 Lentille *Par mes 4 axes* — absorbée dans l'accueil unifié

*Statut au 08/05/2026 : section sans objet comme page séparée. La lentille V3 *« filtre chips cumulables avec résultat dynamique »* tranchée le 04/05/2026 (D2, commit `31f7c1b`, fichier `mockup-lentille-etape-B.html`) survit comme **mécanique de l'accueil unifié** — c'est elle qui porte les 4 chips Problème · Cadre · Niveau · Maturité du § 6.1. La page séparée *Par mes 4 axes* disparaît, l'onglet du même nom sort du bandeau du haut (cf. `doc-contrats-navigation.md` § 4.1).*

**Ce qui survit de la décision D2 — chantier 23.a — décrit en § 6.1.**

- **Variante V3 retenue : filtre chips cumulables avec résultat dynamique.** L'argument structurant *« extensibilité — un nouvel axe coûte un chip de plus »* tient toujours. Le ramener depuis la lentille vers l'accueil unifié ne le déplace pas — au contraire, l'accueil-outil multiplie les bénéfices d'une mécanique de filtrage extensible.
- **Cohérence d'usage avec la porte *« Par mon problème »*.** Le pattern de chips cumulables vivait déjà sur cette porte. Avec la fusion porte → chip, le pattern devient natif à l'outil. Axe 6 *Standardisé sur les composants* poussé jusqu'à son terme.
- **Filet 4-couleurs en haut.** Conservé sur l'accueil unifié — la page convoque les 4 niveaux simultanément avant tout filtrage.
- **Manipulation directe, axe 5 *Interactif signifiant*.** Chaque clic produit un retour. Inspiration Tufte / Bret Victor maintenue.

**Ce qui meurt avec la lentille.**

- Les **icônes line monochromes par axe Mintzberg** (une icône par chip d'axe) sortent du visible, puisque l'angle Mintzberg lui-même sort du visible (cf. § 6.1, *Mintzberg sort du visible*). L'attribut `axes: [...]` reste latent dans le code, statut à arbitrer en chantier séparé.
- Le **filet 4-couleurs signant la lentille** rejoint le filet de l'accueil unifié — il devient la signature de l'accueil-outil, plus celle d'une page intermédiaire.

**Pour la mémoire.** Cette section a tranché en mai 2026 le passage de la doctrine *V3 = page lentille séparée* à la doctrine *V3 = mécanique de l'accueil*. Le mockup-preview du 04/05 (`31f7c1b`) reste consultable comme étape intermédiaire du raisonnement ; le mockup de référence devient celui du 08/05 nuit (`8589834`).


### 6.4 Ce que le § 6 ne dit pas

Le périmètre de l'étape B couvre désormais **trois pages-types** : accueil unifié (§ 6.1), fiche d'indicateur (§ 6.2), fiche-question (§ 6.5). La lentille *Par mes 4 axes* a rejoint l'étape B le 04/05/2026 puis a été absorbée dans l'accueil unifié au chantier 23 (cf. § 6.3 neutralisé) ; sa mécanique V3 chips cumulables survit comme cœur de l'accueil. Les **trois portes *« Par mon problème »*, *« Par mon cadre »*, *« Par mon niveau »*** disparaissent comme pages séparées au chantier 23 — elles ne sont plus dans le périmètre de l'étape B parce qu'elles ne sont plus des pages. Les **autres pages-types restantes** (tableau de bord, cascade stratégique, lexique, à propos) sont laissées au **refactoring opportuniste**. Elles évolueront vers la posture incarnée ci-dessus au fil des chantiers qui les touchent, à la condition qu'aucun besoin terrain ne remonte une priorité plus pressante.

Cette économie est cohérente avec l'axe 7 *Système évolutif* : la doctrine est posée, le système suit par refactoring progressif, pas par refonte big-bang. Si un chantier ultérieur révèle qu'une page-type non couverte ici résiste à l'incarnation, le retour ne se fera pas en révision du § 6 mais en ouverture d'un nouveau chantier d'étape B (par exemple : *étape B² — incarnation du tableau de bord*) avec mockup côte à côte et décisions structurantes propres.

### 6.5 Fiche-question (mode *Par ma question*)

*Référence : décision 20.1 du chantier 20 close le 06/05/2026 en deux temps. (i) Arbitrage initial sur 4 candidates côte à côte (`mockup-palette-fiche-question-comparatif.html`) : variante **B — vert profond éprouvé `#1f5945`** retenue. (ii) Audit visuel cross-niveaux le même jour (`mockup-palette-fiche-question-niveaux.html`) : bascule sur **D — bleu de Prusse `#1d3a5f`**. Motif consigné : B confondait perceptivement avec deux niveaux (équipe + programme — deux teintes vertes), D ne confond qu'avec un seul (stratégique). La fiche-question est rédigée éditorialement dans `mockup-format-fiche-question.html` (v4.2, palette D).*

La fiche-question est une **page d'orientation manipulable** au sens du § 6.3 — sa mission : permettre à un visiteur arrivé avec une question concrète (formulée dans la langue de son métier) de repartir en deux minutes avec un trio de trois indicateurs candidats à son contexte. Le mécanisme conditionnel (Q1 réordonne les cards, Q2 change le trio par niveau, cf. doctrine du trio par niveau dans `doc-catalogue-questions-fines.md` § 4.4) en fait une page d'enseignement par la manipulation, pas d'orientation passive.

Décisions structurantes :

- **Accent secondaire propre aux fiches-questions — bleu de Prusse `#1d3a5f`.** Registre marine institutionnel, ton calme et grave. Sémantique : profondeur, sérieux, fiabilité. Cet accent porte le bloc *Recommandation* (cartouche bord+titre+fond léger), les boutons primaires propres à la fiche-question, le lien sortant patrimonial unique sous le trio, et les anti-patterns en double signal (souligné + fond léger). Cohérent avec « artisan-sérieux » de la § 4 — la chaleur passe par la voix, pas par cet accent.
- **Division du travail chromatique.** L'indigo `#4c1d95` reste le **chrome universel de l'outil** (term-def, bandeau meta, boutons primaires globaux, navigation). Le bleu de Prusse `#1d3a5f` prend le rôle de **signature spécifique fiche-question**. Les deux cohabitent sur la même fiche sans télescopage — l'indigo est violet-saturé clair, le bleu de Prusse est bleu-foncé désaturé, distinction par la teinte ET par la luminance.
- **Cuivre saturé écarté.** La candidate C (`#a14e1f`) a été écartée pour trois raisons convergentes — sémantique d'alerte qui contredit le bloc Recommandation positif ; conflit chromatique structurel avec le niveau tactique (orange désaturé `#c79373`) ; redondance avec le surlignage ambré déjà utilisé sur les anti-patterns des fiches d'indicateur (`project_fiches_double_signal_anti_patterns`).
- **B vert profond éprouvé `#1f5945` en réserve documentée — alternative chaude écartée.** Initialement retenue le 06/05/2026 sur arbitrage des 4 candidates côte à côte pour son registre forêt-bibliothèque (sémantique : croissance organique, sagesse calme). Écartée le même jour après audit visuel cross-niveaux : confondait perceptivement avec deux niveaux (équipe `#6fa89e` turquoise désaturé ET programme `#7d9670` vert désaturé). La doctrine du filet de sécurité posée le 06/05 a joué : la bascule s'est faite token par token, sans toucher au reste. B reste consultable pour un futur usage qui n'aurait pas le contexte cross-niveaux (par ex. sur une page mono-niveau).
- **Filet de niveau saturé en haut conservé.** Cohérence avec la signature commune (§ 6.0). Le niveau du trio dominant (équipe / programme / tactique / stratégique) est lisible dès le couronnement.
- **Crème en fond global, blanc franc dans la matière.** Page d'orientation aérée — la fiche elle-même est encadrée en blanc, le crème respire en marge. Rupture nette avec la dérive sépia que la v3 portait (palette ambre/brun/dorée écartée le 06/05 sur diagnostic « affreuse, fade, vieillot » ; cohérent avec § 5.2 qui écarte le glissement vintage).
- **Pied écoles en référence patrimoniale, jamais comme choix.** Voix située, axe 8. Les écoles convoquées (par ex. *Toyota Way · Lean Six Sigma · TOC · Kata coaching* pour la première fiche-question rédigée) sont nommées en italique, pas typées comme filtres.

---

## 7. Conventions de tenue du document

- **Zone évolutive** : §§ 3 à 5 sont la doctrine — modifier seulement par un chantier explicite de révision de doctrine, jamais en passant. § 6 a été constituée le 05/05/2026 puis enrichie le 06/05/2026 (§ 6.5 fiche-question — décision 20.1 close en deux temps : palette B initialement retenue, puis bascule sur D bleu de Prusse après audit visuel cross-niveaux le même jour), et fait foi sur l'incarnation des 4 pages-types couvertes.
- **Journal du document** : toute modification de § 3 à § 5 doit être tracée dans le journal de fin de document avec la date, le motif et le commit de référence.
- **Ce document fait foi** quand un autre document compagnon ou un commit produit une décision visuelle. En cas de contradiction, ce document tranche jusqu'à révision explicite.

---

## Journal du document

- 04/05/2026 — création du document. Posture initiale établie sur 8 axes après consultation des 5 panels d'experts. Validation Lætitia : axes 1 à 8 validés tels que recommandés par les panels (aucun déplacement). Étape B (incarnation pages-types) à venir dans les séances suivantes.
- 05/05/2026 — § 6 *Incarnation sur les pages-types* renseignée à partir des trois mockups-preview produits le 04/05 (`958042d` accueil v2, `e821662` fiche t4, `31f7c1b` lentille V3) et de la décision D2 (`64c8249`). Décision Lætitia du 05/05 : pas de pyramide en accueil — ferme de fait la décision D5 du chantier 10. Étape B close ; étape C (retour au chantier 10 — D3, D4, D6) ouverte.
- 06/05/2026 — § 6.5 *Fiche-question (mode Par ma question)* ajoutée à partir du mockup `mockup-palette-fiche-question-comparatif.html` (4 candidates côte à côte : Sobre niveau / Vert profond éprouvé / Cuivre brûlé / Bleu de Prusse). Décision Lætitia : palette B (vert profond `#1f5945`) retenue ; D (bleu de Prusse `#1d3a5f`) en réserve documentée. Décision 20.1 du chantier 20 close. Mise à jour cohérente du § 6.4 (3 → 4 pages-types) et du § 7.
- 06/05/2026 (audit visuel) — § 6.5 révisée après production d'un mockup cross-niveaux dédié (`mockup-palette-fiche-question-niveaux.html`, commit `b3d99fb`). Constat de Lætitia à l'œil : B vert profond se confondait avec **deux** niveaux (équipe + programme, deux teintes vertes), D bleu de Prusse ne se confond qu'avec **un** seul (stratégique). Bascule décidée et exécutée le même jour : **D bleu de Prusse `#1d3a5f` adoptée comme signature fiche-question, B vert profond `#1f5945` rétrogradée en réserve documentée**. La doctrine du filet de sécurité posée le matin (« si bascule, conserver les autres tokens — seul l'accent change ») a joué à la lettre : un seul commit token, aucune modification d'autre token. Décision 20.1 close en deux temps.
- 08/05/2026 (chantier 23.a, ouverture refonte radicale accueil) — § 6.1 *Accueil* réécrit en *Accueil unifié Choisir mes indicateurs* (commit `f5d5b66`). L'ancienne doctrine *4 cartes égales sans pyramide* du 05/05/2026 est remplacée par la doctrine v7 actée à l'issue de 7 itérations de mockup-preview convergées (`8589834`). Architecture verticale en 7 strates, mécanique chips accordéon, format de fiche-card unique, Mintzberg sort du visible, *« l'accueil est l'outil »*.
- 08/05/2026 (chantier 23.a, suite) — § 6.3 *Lentille Par mes 4 axes* neutralisée (commit `9f39aad`) : la lentille comme page séparée disparaît, sa mécanique V3 chips cumulables (D2 du 04/05/2026, commit `31f7c1b`) survit comme cœur de l'accueil unifié. § 6.4 *Ce que le § 6 ne dit pas* actualisé (commit `60bc923`) : les 3 portes Par mon problème / Par mon cadre / Par mon niveau sortent du périmètre étape B (elles meurent comme pages séparées). Périmètre étape B clarifié : 3 pages-types (accueil unifié, fiche d'indicateur, fiche-question).

## Décision du 12/07/2026 — resémantisation du statut « précaution »

Origine : smoke test de Lætitia sur la pastèque (backlog 29.2). Le signal orange « ⚠️ Precaution », multiplié par trois cards, installait « tout est douteux » avant toute lecture ; le signal visuel va plus vite que le texte.

Décision (mockup-signal-fiabilite.html, option B2 vert clair retenue après test de collision avec la card « Fiable ») :

- Le statut se nomme désormais « Sous conditions » (icône 🤝). Il dit une mesure positive à adopter dans de bonnes conditions, pas une alerte.
- Badge vert clair `#ddebd9`, texte vert profond `#2f5d33`, contour de card assorti au badge (demande explicite de Lætitia).
- Les pastilles compactes (panier, one-pager) et le liseré de la note « Lire la fiabilité » utilisent le vert profond `#2f5d33`, la teinte claire n'étant pas lisible à 7 px.
- « Fiable » (vert plein) et « Courant & risque » (rouge) sont inchangés.

Écarté : option C (signal en pied de card, jugée à la fois encore alarmiste et pas assez visible) ; option D (refonte en « exigence de lecture », trop transverse) ; bleu clair (collision avec la couleur d'identité et de navigation).

## Décision du 12/07/2026 (suite) — mission visible sur l'accueil (29.6)

Constat : la mission manifeste en deux étages (09/05/2026) donne le ton mais pas l'usage ; le visiteur ne sait pas ce que le site va faire pour lui (recoupe la famille valeur / parcours du test utilisateur n°1).

Décision (mockups `mockup-mission-visible.html` puis `mockup-accueil-mission-pleine-page.html`, mix B+C variante 2 retenu) :

- La phrase serif « les indicateurs pertinents, du terrain à la stratégie. » passe au bleu ciel `#9fd4ff` (token `--mission-suite`, équivalent `#1565c0` sur le thème neutre clair).
- Une phrase d'usage permanente sous le manifeste : « Un guide pour choisir 3 à 5 indicateurs adaptés à ta réalité, comprendre ce qu'ils disent vraiment, et savoir l'expliquer à ton équipe ou à ta direction. » Le « 3 à 5 » est doctrinal, pas décoratif.
- Un bloc « Comment ça marche » repliable (details natif) : trois pas qui reprennent les verbes du manifeste (Choisis / Comprends / Explique). Ouvert tant que le visiteur ne l'a pas replié une première fois, repli persisté (clé `mission-cmt-etat`), réouvrable à tout moment.
- Écarté : tout-visible en permanence (trois strates redondantes avant le premier cartouche), ambre plein et crème doré pour la suite (le bleu ciel validé sur mockup pleine page).

Même séance : les cartouches « questions terrain » et « compteur » sont désormais ouvertes à l'arrivée (29.7).
