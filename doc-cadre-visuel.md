# Cadre visuel et UX — Outil cadre-indicateurs

*Document compagnon. Posture stylistique de référence à laquelle toutes les pages de l'outil obéissent. Doctrine permanente, système évolutif — la doctrine est posée pour 5 à 10 ans et ne se renégocie pas à chaque chantier ; le système (composants, tokens, copies) évolue par refactoring progressif.*

---

## 1. Pourquoi ce document

Avant le chantier 10, la doctrine visuelle de l'outil restait diffuse — décisions ponctuelles consignées au fil des chantiers (token `--niv-1` pour le système de niveaux, désaturé Doux pour les axes Mintzberg, fond pill indigo pour l'entrée active de la nav, italique gris pour les rôles répétés). Cohérent dans le détail, mais sans ligne directrice qui dise *« voilà à quoi ressemble cet outil et pourquoi »*.

Au point de cadrage du chantier 10 (étape D2 + D4 — exposition des 4 lentilles dans *Par mes 4 axes* + responsive de la nav à 8 entrées), une question préalable est apparue : *l'accueil hérite du style du site, donc on ne peut pas le dessiner sans avoir cadré le reste*. D'où ce document — qui ne dessine rien encore, mais qui pose la **posture** vers laquelle tendent toutes les pages.

**Ordre de production retenu** :
1. **Étape A** — *posture stylistique globale* (ce document, sections 3 à 5).
2. **Étape B** — *incarnation sur les pages-types* (section 6 ci-dessous, à compléter).
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

## 6. Incarnation sur les pages-types — étape B (à compléter)

*Section réservée. Sera renseignée au cours de l'étape B (cf. § 1). Périmètre prévu : 3 pages-types principales — accueil, fiche d'indicateur, lentille interne de *Par mes 4 axes*. Les autres pages-types (tableau de bord, cascade stratégique, lexique, à propos) sont laissées au refactoring opportuniste sauf besoin terrain remonté.*

---

## 7. Conventions de tenue du document

- **Zone évolutive** : §§ 3 à 5 sont la doctrine — modifier seulement par un chantier explicite de révision de doctrine, jamais en passant. § 6 est en cours de constitution.
- **Journal du document** : toute modification de § 3 à § 5 doit être tracée dans le journal de fin de document avec la date, le motif et le commit de référence.
- **Ce document fait foi** quand un autre document compagnon ou un commit produit une décision visuelle. En cas de contradiction, ce document tranche jusqu'à révision explicite.

---

## Journal du document

- 04/05/2026 — création du document. Posture initiale établie sur 8 axes après consultation des 5 panels d'experts. Validation Lætitia : axes 1 à 8 validés tels que recommandés par les panels (aucun déplacement). Étape B (incarnation pages-types) à venir dans les séances suivantes.
