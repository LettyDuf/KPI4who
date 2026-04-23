# Document compagnon — chantier 10 : refonte architecture de navigation

*Document vivant. Deux zones : **figée** (invariants, contrats d'API stables) et **évolutive** (choix UX à trancher par mockup-preview). Chaque modification est commitée et consignée.*

Dernière mise à jour : 23 avril 2026 (fin d'après-midi) — **bifurcation en deux modes d'entrée** : *Choisir mes indicateurs* se scinde en deux onglets (*Par mes 4 axes* et *Par ma question*), nav à 8 entrées. Voir § 4.1 (invariants) et § 4.2 (points à trancher reformulés). Auparavant : *Cascade stratégique* réémerge (§ 4.5, nav à 7 entrées).

---

## 1. Pourquoi ce document

Le chantier 10 refond la topologie de navigation de `cadre-indicateurs.html`. L'outil se vit aujourd'hui comme **deux territoires mal reliés** (portes d'entrée d'un côté, onglets de l'app de l'autre) et la mission exige *« quatre outils complémentaires dans lesquels on entre par n'importe lequel, sans fil imposé »*. Ce document pose le contrat avant le code, dans la ligne du patron `doc-contrats-stepper-roles.md` qui a servi au 7.2a-code.

**Scope dans ce document :**

- les quatre portes (problème, cadre, niveau, maturité — cette dernière actuellement désactivée, affichée « Bientôt ») et leur place dans la nav ;
- les onglets de l'app (TDB, Choisir mes indicateurs, Maturité) — *Cascade stratégique* réémerge avec une mission claire (cf. § 4.5) : emplacement réservé en 10.1 (vue stub), contenu livré au chantier 11 ;
- la topologie des deux accueils (`#accueil` pyramide, `#accueil-portes` 4 tuiles) ;
- les règles de routage par hash URL (partage d'URL, deep-linking).

**Scope hors ce document :**

- le panier TDB (livré au chantier 9, contrat stable) ;
- la refonte interne des portes existantes (piloté par le chantier 7.2a-code) ;
- le contenu des fiches (orthogonal).

Le chantier 10 décide **où** et **comment** les portes s'intègrent dans la nav unifiée — il n'entre pas dans leur logique métier.

---

## 2. État actuel de la navigation

*Capture honnête de l'existant au 22/04/2026. Zone figée — cette section évolue si le code de base change, pas si on planifie.*

### 2.1 Topologie actuelle

L'outil présente cinq vues de premier niveau que l'utilisateur peut atteindre, plus un tiroir de fiche transversal.

| Vue | Élément DOM | Rôle actuel | Entrées | Sorties |
|---|---|---|---|---|
| Accueil pyramide | `#accueil` | Porte niveau déguisée en accueil | défaut au boot (sauf préférence), bascule depuis `#accueil-portes` | `CM.App.entrer(niveau, branche, domaine)` → app ; `#portes` → `#accueil-portes` |
| Accueil 4 portes | `#accueil-portes` | Écran d'entrée alternatif qui liste les quatre portes | bascule depuis `#accueil` | carte *niveau* → `#accueil` (pyramide) ; carte *problème* → `CM.VuePorteProbleme.ouvrir()` ; carte *cadre* → `CM.VuePorteCadre.ouvrir()` ; carte *maturité* → désactivée (`aria-disabled`, mention « Bientôt » — porte à venir, hors scope chantier 10) |
| Porte problème | `#porte-probleme` | Stepper 3 étapes niveau → problème → résultats | carte dédiée dans `#accueil-portes` | bouton *Accueil* → accueil courant ; étape résultats → ouverture fiche |
| Porte cadre | `#porte-cadre` | Stepper 3 étapes cadre → niveau → résultats | carte dédiée dans `#accueil-portes` | bouton *Accueil* → accueil courant ; étape résultats → ouverture fiche ; bloc *Cadres voisins* → pivot à étage constant |
| Porte niveau (stepper) | `#porte-niveau` | En construction — vise un parcours niveau → problème → cadre → résultats | carte dédiée dans `#accueil-portes` | idem portes précédentes (façade en cours) |
| App à 4 onglets | `#app` | TDB, Cascade, Choisir, Maturité — enclos sans lien vers les portes | `CM.App.entrer(...)` depuis la pyramide | bouton *← Accueil* → retour à l'accueil préféré |

### 2.2 Fonctions de navigation dans `CM.App`

Les façades publiques qui pilotent la nav, dans leur forme actuelle.

| Fonction | Rôle | Effet de bord |
|---|---|---|
| `basculerAccueil(mode)` | Bascule pyramide ↔ portes avec persistance | écrit `CM.Preferences.ecrire('accueil', mode)` |
| `afficherAccueil(mode)` | Bascule pyramide ↔ portes sans persistance | aucun — lecture seule de l'UI |
| `entrer(niveau, branche, domaine)` | Entre dans l'app depuis la pyramide | initialise `contexte`, vide `réponses`, bascule vers l'onglet TDB |
| `retourAccueil()` | Quitte l'app | réinitialise le contexte, remet le premier onglet actif, relit la préférence d'accueil |
| `changerVue(id, btn)` | Bascule d'onglet dans l'app | aucun — reclasse les `.onglet`, affiche la `.vue` cible |

Les portes exposent leurs propres façades (`CM.VuePorteProbleme.ouvrir`, `CM.VuePorteCadre.ouvrir`, `CM.VuePorteNiveau.ouvrir` à venir). Les cartes d'entrée dans `#accueil-portes` appellent directement ces façades.

### 2.3 Hash URL pris en charge

| Hash | Comportement actuel |
|---|---|
| `#fiche=<id>` | Ouvre le tiroir sur la fiche demandée, préserve la vue sous-jacente |
| `#pyramide` | Bascule l'accueil sur la pyramide (via `basculerAccueil`) |
| `#portes` | Bascule l'accueil sur les 4 portes (via `basculerAccueil`) |
| aucun | Respecte la préférence stockée (`pyramide` par défaut) |

**Ce qui n'existe pas aujourd'hui** : deep-linking vers un onglet (`#onglet=tdb`), vers une porte ouverte (`#porte=cadre&cadre=dora`), vers une étape de stepper. Conséquence : partager une URL avec un collègue n'est possible qu'au niveau *fiche* ou *accueil*.

### 2.4 Ancrages code (référence)

À consulter au démarrage de chaque sous-chantier 10.x, à recaler si des lignes bougent.

- Accueil pyramide : `cadre-indicateurs.html` ~L2150–2263
- Accueil 4 portes : ~L2353–2409
- En-têtes des trois portes : ~L2430 / ~L2461 / ~L2495
- App 4 onglets : ~L2509–2528
- Fonctions nav `CM.App` : ~L7566 (`basculerAccueil`) à ~L7660 (`_basculerVue`)
- Écoute `hashchange` et `#fiche=` : ~L6130 (router minimal)

---

## 3. Problèmes identifiés

*Zone figée — chaque problème est ici une raison d'être du chantier 10. Ajouter un problème après coup est une décision volontaire, consignée au commit.*

### 3.1 Le doublon *Choisir mes indicateurs* vs portes d'entrée

Aujourd'hui, l'onglet *Choisir mes indicateurs* (vue `#vue-questionnaire`) et les portes *Par mon problème* / *Par mon cadre* / *Par mon niveau* font un travail très proche — aider l'utilisateur à sélectionner des indicateurs pertinents — avec deux langages visuels différents et deux chemins disjoints.

**Contrainte de mission déjà posée.** `MISSION.md` décrit l'onglet *Choisir mes indicateurs* comme *« contenant les lentilles d'exploration du référentiel — par mon problème, par mon cadre de travail, par mon rôle »*. Autrement dit, la mission a tranché : **les portes sont des sous-lentilles de cet onglet, pas des chemins parallèles**. Ce qu'il reste à décider :

- Le sort du contenu actuel du *questionnaire* (vue `#vue-questionnaire`) — conservé comme quatrième lentille, fondu dans une porte existante, ou supprimé ?
- La façon dont *Choisir mes indicateurs* expose ses lentilles (tabs internes ? cards ? autre ?) — à trancher par mockup-preview.
- Le point d'ancrage visuel unique quand un utilisateur clique *Choisir mes indicateurs* dans la nav unifiée.

### 3.2 Deux accueils qui se masquent

Les vues `#accueil` (pyramide) et `#accueil-portes` (4 tuiles) prétendent chacune être l'accueil. La bascule entre elles est persistée, invisible à l'utilisateur, et fait que la pyramide — qui est en réalité la porte niveau — est souvent perçue comme *« l'écran de départ »*. Le contrat de cohérence (`project_contrat_coherence_portes.md` et `project_porte_niveau_statut`) a tranché : **la pyramide n'est plus l'accueil**, elle devient un rendu possible de la porte niveau stepper. Le chantier 10 doit acter cette décision dans la topologie — un seul accueil, les quatre portes à parité visuelle.

### 3.3 L'app est un enclos

Une fois dans `#app`, l'utilisateur ne peut revenir aux portes qu'en passant par l'accueil (bouton *← Accueil*). Pas de passerelle directe entre un onglet et une porte, pas de possibilité de garder le contexte en naviguant d'un outil à l'autre. La mission prescrit *« un cycle que l'on emprunte à son rythme »* — l'enclos actuel contredit cette ligne.

### 3.4 Pas de deep-linking au-delà de `#fiche=`

Partager une URL vers un parcours de porte en cours, vers un onglet, vers une maturité active est impossible. Conséquence pratique : le panier TDB n'est pas partageable autrement qu'en capture d'écran, une porte ouverte à mi-parcours non plus. À trancher : quel niveau de deep-linking est en scope du chantier 10 ?

### 3.5 Deux langages graphiques coexistent pour le même objet

Les portes et les onglets utilisent aujourd'hui des codes visuels différents — tailles, couleurs, traitement actif. La fusion au même étage impose un langage unique sur la nav ; la refonte doit éviter de créer une *chip de chip* (nav qui ressemble à une sous-nav dans l'app mais pas à l'accueil). Cohérence à tenir sur toutes les vues.

---

## 4. Modèle cible

*Zone évolutive — la topologie cible se stabilise après le preview fondateur (mockup 10.0). Les invariants ci-dessous ne se renégocient pas ; les points marqués **à trancher** sont ceux qui attendent un arbitrage par mockup.*

### 4.1 Invariants de topologie (déjà tranchés)

- **Une nav unifiée à un seul étage.** Portes et onglets cohabitent sous forme d'une nav persistante, visible partout sauf dans le tiroir de fiche. Plus de bascule pyramide/portes, plus d'enclos *app*.
- **Huit entrées de premier rang** : *Accueil · Mon tableau de bord · Par mes 4 axes · Par ma question · Cascade stratégique · La maturité ? · Lexique · À propos*. *Amendement 23/04/2026 — bifurcation en deux modes.* L'onglet unique *Choisir mes indicateurs* posé au 22/04 disparaît comme libellé : il se scinde en deux onglets distincts pour refléter deux modes d'entrée parallèles (cf. invariant suivant). L'entrée *Cascade stratégique* reste **réservée** dès 10.1 sous forme d'une vue stub (libellé « Bientôt » ou équivalent, cohérente avec le traitement actuel de la carte *Par ma maturité*) — son contenu arrive au chantier 11. La réservation précoce évite une refonte de nav ultérieure.
- **Deux modes d'entrée parallèles pour choisir ses indicateurs.** *Invariant fondateur posé le 23/04/2026.* Le choix des indicateurs s'opère par deux portes d'entrée non hiérarchisées, chacune avec sa grammaire :
  - *Par mes 4 axes* — mode **synthétique**. Les quatre lentilles existantes (problème, cadre, niveau, maturité) sous la coquille déjà posée en § 4.4. Vocabulaire de concepteur, taxonomie structurée. Pour la personne qui accepte d'entrer dans la grammaire de l'outil.
  - *Par ma question* — mode **fin**. Catalogue de questions métier formulées dans la langue du visiteur (*« comment défendre un ROI devant ma direction »*, *« quoi mesurer dans un flux »*, *« comment installer de l'amélioration continue »*, etc.). Vocabulaire utilisateur, grain fin. Pour la personne qui arrive avec un problème concret en tête sans vouloir d'abord choisir un angle d'analyse.
  - **Machinerie = mix**. Certaines questions fines sont des **raccourcis** vers l'une des 4 portes avec préconfiguration (niveau + école préchargés) ; d'autres ont leur **propre mini-stepper autonome** et retournent leurs recommandations sans passer par une porte. Le choix raccourci vs autonome se fait question par question, en fonction de ce qui sert le mieux le visiteur.
  - **Construction du catalogue = consultation de panels d'experts**. Gestion du changement, coach Lean, coach Agile, terrain des autres cadres, accompagnement en management. Doctrine déjà posée pour les définitions de métriques (`project_regle_definitions_metriques.md`), étendue ici au travail éditorial.
- **Portes = sous-lentilles de l'onglet *Choisir mes indicateurs*.** Cette hiérarchie est posée par `MISSION.md` — *« l'onglet contient les lentilles d'exploration : par mon problème, par mon cadre de travail, par mon rôle »*. Les portes ne sont pas des entrées parallèles à *Choisir*, elles en sont le contenu. **Quatre lentilles** composent le socle (problème, cadre, niveau, maturité — la dernière réactivée quand la porte *Par ma maturité* l'est aussi, cf. § 4.4 pour l'expansion future).
- **Un seul accueil, qui exprime la mission et ce que l'utilisateur va acquérir.** L'accueil ne liste plus des portes et ne déguise plus une porte — il présente l'outil à la personne qui arrive : sa raison d'être (*« la métrique est une lunette pour se questionner »*), les cinq prises de conscience, les scénarios types. Les portes et les onglets restent atteignables depuis la nav unifiée persistante. La rédaction et le design fin de cet accueil sont à travailler dans un chantier éditorial dédié (communication + UX-UI), hors scope 10 — mais la **place** de l'accueil dans la topologie se décide ici.
- **L'onglet *La maturité ?* mute.** La vue actuelle (audit du scorecard par maturité) est redondante avec ce que font les autres pages et disparaît. Le nouvel onglet devient la **page de transparence du référentiel sur la maturité** : il expose les définitions (débutant / intermédiaire / avancé) et accueillera à terme un **outil de diagnostic de maturité** (chantier éditorial dédié à ouvrir, hors scope 10). La porte *Par ma maturité* dans *Choisir mes indicateurs* reste une lentille distincte : elle aide à entrer dans le référentiel depuis un niveau de maturité donné (démarche prospective), tandis que l'onglet en explique la grille (démarche réflexive). Les deux cohabitent et se complètent. Le point d'interrogation dans le libellé est volontaire — il matérialise la posture socratique de l'outil : *l'onglet ne donne pas un verdict, il invite à enquêter*.
- **Marquage visuel de l'entrée active = fond pill indigo clair.** *Arbitrage 10.0 — preview fondateur du 23/04/2026.* L'onglet actif est marqué par un fond pill `--niv-1-clair` + texte `--niv-1` + `font-weight: 700`, geste en continuité directe avec le style déjà en place sur les onglets actuels de l'app. Variantes écartées : soulignement ambre (variante A, risque de détourner le token Lean/Gemba vers un rôle d'état UI), bold + barre accent orange (variante C, l'accent prend un rôle structurant qui peut le banaliser). Le risque *chip de chip* (§ 3.5) est contenu par la taille et la densité du pill, tenues identiques entre les entrées de la nav unifiée et les éventuelles tabs internes de *Choisir mes indicateurs*. Preview tracé : [`preview-10-actif-B-fond-pill-indigo.html`](./preview-10-actif-B-fond-pill-indigo.html), comparaison côte à côte : [`preview-10-comparaison-actif.html`](./preview-10-comparaison-actif.html).

### 4.2 Points à trancher en preview fondateur (mockup 10.0)

- **Comment exposer les quatre lentilles initiales dans l'onglet *Par mes 4 axes*.** *Reformulé le 23/04/2026 après bifurcation.* Tabs internes ? grille de cards ? stepper d'emblée ouvert sur la première lentille ? autre ? Le choix détermine la granularité de navigation visible au clic sur *Par mes 4 axes* dans la nav unifiée, **et la capacité de la coquille à absorber les lentilles futures** listées en § 4.4. Previews A/B/C déjà produits (`preview-10-lentilles-{A,B,C}.html`) — restent utilisables après recadrage du libellé d'onglet. À arbitrer après le catalogue de questions fines pour éviter de fixer *Par mes 4 axes* avant que la cohabitation avec *Par ma question* ne soit claire.
- **Comment exposer le mode fin dans l'onglet *Par ma question*.** *Ajouté le 23/04/2026.* Liste plate paginée ? catégories repliables ? moteur de recherche en tête ? carte mentale cliquable ? À concevoir une fois le catalogue de questions stabilisé. Le volume de questions (prévu : 25 à 50) conditionne fortement le choix d'UX.
- **Que devient l'actuel `vue-questionnaire` ?** Conservé ? fondu dans une porte existante ? supprimé ? **Fusionné avec la future *Cascade stratégique*** (chantier 11), qui reprend une forme voisine d'interrogation guidée ? Hypothèse nouvelle ouverte par la bifurcation : **absorbé dans *Par ma question*** si ses questions se retrouvent dans le catalogue. Un arbitrage **conjoint 10 / 11** reste souhaitable.
- **Comportement responsive de la nav.** Bandeau horizontal plein largeur ? repli en menu hamburger sous N px ? icônes-only sur un breakpoint intermédiaire ? Le passage à 8 entrées augmente la pression responsive par rapport aux 7 précédentes — à trancher conjointement avec le mockup.
- ~~**Marquage visuel de l'entrée active dans la nav.**~~ ✅ **Tranché le 23/04/2026 — variante B (fond pill indigo clair)** retenue. Voir § 4.1 *Invariants de topologie*, dernier point.

### 4.3 Points à trancher après 10.0 (dérivés)

- **Sort de la pyramide.** Supprimée ? réintégrée comme rendu de la première étape de la porte niveau (si l'audit UX le justifie) ? Décision conditionnée par l'arbitrage 10.0.
- **Deep-linking additif.** `#onglet=<id>`, `#porte=<id>`, état de parcours dans l'URL. Enrichissement du router, à inclure ou non selon la priorité retenue après 10.0.

### 4.4 Expansion future — lentilles à venir dans *Choisir mes indicateurs* (hors scope chantier 10)

La mission de *Choisir mes indicateurs* est d'être l'espace des **lentilles d'exploration** du référentiel. Les quatre lentilles initiales (problème, cadre, niveau, maturité) sont le socle, pas le plafond. D'autres angles d'entrée sont identifiés pour servir les cinq prises de conscience et la diversité des situations où l'utilisateur ouvre l'outil (*cf.* scénarios types de `MISSION.md`). Ces lentilles sont à ouvrir en chantiers éditoriaux dédiés, pas dans le chantier 10 :

- **Par le flux** — je veux piloter ce qui bloque, ce qui va trop lentement, la variabilité de mon throughput.
- **Par la communication** — je cherche ce qui rend visibles ou invisibles les échanges, les rituels, les boucles de feedback.
- **Par la visibilité** — je cherche ce qui rend visible la charge, le reste à faire, l'alignement inter-équipes.
- **Par ce que je veux améliorer** — formulation par verbe d'intention (réduire le retard, gagner en fiabilité, rendre compte, etc.), plus proche du langage managérial.

Ces lentilles ne sont pas une liste exhaustive — le jeu reste ouvert. Elles sont citées ici pour fixer une contrainte de conception du chantier 10 : **la coquille de *Choisir* doit être conçue pour s'enrichir**. Un chantier qui fige la charpente sans laisser la place à l'ajout de lentilles futures ne sert pas la mission.

### 4.5 Cascade stratégique — mission réémergente, emplacement réservé

*Changement de statut par rapport à `MISSION.md` version actuelle (*« statut actuel : en pause »*). L'onglet n'est plus en pause sans mission — il revient avec une intention claire. La mise à jour de `MISSION.md` se fait en parallèle du chantier 11.*

**Mission émergente (à consolider au chantier 11).** *Cascade stratégique* offre la seule vision que les autres pages ne donnent pas : une **vue d'ensemble des alignements inter-niveaux**. Là où les portes de *Choisir* produisent un effet tunnel assumé (on tire une sélection à partir d'un angle), *Cascade* fait l'inverse — elle donne à voir l'ensemble du paysage des indicateurs à toutes les strates (équipe, programme, portefeuille, entreprise) et permet de **révéler les alignements** : quelle métrique équipe nourrit quelle métrique programme, elle-même reliée à quel indicateur de direction.

**Interaction clé pressentie.** Un clic sur une métrique dans une colonne **colore** toutes les métriques alignées dans les autres colonnes et **grise** les autres. Un jeu de filtres (par cadre de travail, par axe, par domaine…) ajuste la lecture. Le dessin détaillé est à produire au chantier 11.

**Rapport avec `vue-questionnaire` actuel.** Le questionnaire actuel est une **candidate sérieuse à la fusion ou à l'absorption par *Cascade*** — sa mission est voisine (interroger pour faire émerger). L'arbitrage se prend à l'ouverture du chantier 11, idéalement conjointement avec le point § 4.2 du chantier 10.

**Scope chantier 10 pour Cascade.** Strictement minimal : **l'entrée *Cascade stratégique* existe dans la nav unifiée, elle pointe vers une vue stub** (page vide avec libellé « Bientôt » ou équivalent, cohérente avec le traitement aujourd'hui appliqué à la carte *Par ma maturité*). Aucune logique, aucune refonte interne, aucun contenu. Le chantier 11 prend le relais — et ce jour-là, la refonte de *Cascade* se fait *derrière* la place déjà réservée en nav, sans retoucher au reste.

---

## 5. Mapping de transition

*Zone évolutive — ce tableau se remplit après l'arbitrage fondateur. Une ligne par entrée de nav actuelle, colonne « sort » = conserver / fusionner / renommer / supprimer, colonne « cible » = élément dans le modèle cible, colonne « preview » = renvoi au mockup qui a tranché.*

À rédiger après le preview 10.0.

---

## 6. Contrats d'API

*Zone figée. Contrats **ciblés** : seules les façades que le chantier 10 va invoquer, réorienter ou exposer différemment sont documentées ici. Les autres façades publiques (helpers internes de stepper, composants de rendu, domaine métier) restent consultables dans le code et ne sont pas redocumentées.*

*Chaque contrat précise la **signature actuelle**, le **comportement à préserver** (ce qui ne doit pas bouger) et le **point d'évolution attendu** (ce qui va changer avec la refonte et comment).*

### 6.1 Façades de portes — `CM.VuePorte{Probleme,Cadre,Niveau}`

Les trois portes exposent la même façade, livrée par le patron `CM.Stepper` (contrat documenté en détail dans `doc-contrats-stepper-roles.md`). Le chantier 10 n'entre pas dans ces façades — il en change seulement les **points d'invocation** (qui les appelle, depuis où).

| Fonction | Signature | Comportement à préserver |
|---|---|---|
| `ouvrir()` | aucun argument | masque les accueils, affiche la porte à l'étape 1. Cette façade reste le point d'entrée unique de chaque porte. |
| `retourAccueil()` | aucun argument | masque la porte, réinitialise l'état interne, rebascule sur l'accueil courant (actuellement via `CM.App.afficherAccueil(mode préféré)`). |
| `setX(valeur)` | `X` selon l'étape (niveau/problème/cadre/rôle) | enregistre le choix à l'étape N, transite vers l'étape N+1. Les `onclick` générés dans le HTML pointent vers ces façades par nom — pattern `onclick="CM.VuePorteProbleme.setNiveau('...')"`. |
| `retourA(numEtape)` | `numEtape: number` | revient à l'étape demandée, efface les choix postérieurs. |
| `reset()` | aucun argument | repart de l'étape 1, choix vidés. |
| `pivoterVersCadre(cadreId)` *(porte cadre uniquement)* | `cadreId: string` | remplace le choix de l'étape 1 à étage constant sans effacer le choix du niveau. Primitive ajoutée en 7.2a-code.2. |

**Point d'évolution attendu pour le chantier 10.** La façade `retourAccueil()` de chaque porte délègue aujourd'hui à `CM.Stepper.retourAccueil()` qui *relit la préférence d'accueil et invoque `CM.App.afficherAccueil(mode)`*. La fusion portes + onglets supprime la bascule pyramide/portes — il faudra mettre à jour le comportement du retour accueil, sans changer la signature de la façade côté portes. Le code à modifier se trouve dans `CM.Stepper`, pas dans les trois portes.

### 6.2 Façades `CM.App` — navigation

Les fonctions de navigation de `CM.App` sont le **cœur du chantier 10**. Certaines disparaissent, d'autres changent de sémantique, d'autres restent stables.

| Fonction | Signature | Comportement à préserver | Point d'évolution |
|---|---|---|---|
| `basculerAccueil(mode)` | `mode: 'pyramide' \| 'portes'` | bascule entre les deux accueils, persiste la préférence | **supprimée par la refonte** (un seul accueil après fusion). |
| `afficherAccueil(mode)` | `mode: 'pyramide' \| 'portes'` | bascule sans persister (appelée depuis le retour d'une porte) | **supprimée par la refonte**, remplacée par un retour à la nav unifiée. |
| `entrer(niveau, branche, domaine, elClic?)` | niveau/branche/domaine : string ; elClic : HTMLElement optionnel | entre dans l'app depuis la pyramide, initialise le contexte métier, affiche l'onglet TDB | **réévaluée par la refonte** : aujourd'hui elle est appelée depuis la pyramide qui disparaît comme accueil — à déplacer ou à réintégrer comme callback de fin de parcours de la porte niveau. |
| `retourAccueil()` | aucun argument | quitte l'app, réinitialise le contexte, revient à l'accueil courant | **redéfinie par la refonte** : plus d'accueil séparé, la nav unifiée est toujours présente. La sémantique devient *« revenir à l'écran de départ »* au sens de la mission — à clarifier dans le mockup fondateur. |
| `changerVue(id, btn)` | `id: string`, `btn: HTMLElement` | bascule entre les onglets de l'app | **stable dans sa signature**. Peut évoluer sur le comportement visuel (marquage de l'onglet actif) selon arbitrage preview. |

### 6.3 Hash URL

| Hash | Comportement à préserver | Point d'évolution |
|---|---|---|
| `#fiche=<id>` | ouvre le tiroir sur la fiche, préserve la vue sous-jacente | **invariant strict** (cf. § 7.1). |
| `#pyramide` / `#portes` | bascule entre les deux accueils | **supprimés par la refonte** (plus de double accueil). Migration à prévoir : redirection silencieuse vers la nouvelle nav si un ancien lien est ouvert. |
| *(aucun)* | respecte la préférence stockée, accueil pyramide par défaut | **redéfini** : plus de préférence, comportement d'arrivée unique. |

**Ouvertures à trancher (preview fondateur).** Un deep-linking vers un onglet (`#onglet=tdb`) ou une porte (`#porte=cadre&cadre=dora&niveau=programme`) est additif sans casser l'existant — à inclure ou non selon l'arbitrage du chantier 10. L'ajout d'un hash ne change pas la signature des façades ci-dessus ; il enrichit le *router* (cf. § 6.5).

### 6.4 Contrats transverses préservés

*Pour mémoire — ces contrats ne sont pas touchés par le chantier 10 mais sont fréquemment invoqués par les vues qu'il restructure.*

- **`CM.Panier`** (chantier 9) — contrat stable documenté dans `doc-contrats-panier.md`. Les consommateurs (vue TDB, badge, futures intégrations) s'abonnent via le patron pub/sub.
- **`CM.Composants.htmlCarte` / `CM.Composants.ouvrirTiroir`** — point d'entrée unique pour l'ouverture de fiches. Invariant § 7.3.
- **`CM.Preferences.ecrire / lire`** — persistance URL hash + localStorage. Utilisée par `basculerAccueil` (à retirer) et par d'autres consommateurs (vue active, filtres) qui restent stables.
- **`CM.Composants.fermerTiroir`** — stable, invoquée depuis `#fond-tiroir` et le bouton de fermeture du tiroir.

### 6.5 Router — `hashchange`

Le routeur minimal actuel vit dans `CM.App.init` et prend en charge `#fiche=<id>`, `#pyramide`, `#portes` (cf. `cadre-indicateurs.html` ~L6130). Il est doublé d'un filet `hashchange` (fix `ac71465`) qui re-synchronise la vue sur tout changement d'URL, y compris ceux émis par la délégation globale de clic.

**Point d'évolution attendu.** La refonte ajoute probablement de nouveaux hashs (onglet, porte). Le routeur devient un cœur plus visible — à extraire comme module `CM.Router` si sa taille le justifie (règle boy-scout 3.2, à décider au fil du chantier). Signature de façade à poser *si* extraction : `CM.Router.naviguer(hash)`, `CM.Router.surChangement(cb)`.

---

## 7. Invariants à préserver

*Zone figée — liste des comportements qui ne bougent pas quelle que soit la refonte. Toute modification d'un invariant est une décision consciente, documentée au commit.*

### 7.1 URLs partageables

`#fiche=<id>` reste fonctionnel pendant et après la refonte. Une URL pointant une fiche ouverte continue d'ouvrir cette fiche, indépendamment de la vue sous-jacente. Tout élargissement du deep-linking (onglet, porte) est additif — il n'altère pas le comportement existant de `#fiche=`.

### 7.2 Pub/sub du panier

`CM.Panier` continue d'émettre ses événements vers ses abonnés (vue TDB, badge, futurs consommateurs). La refonte de la nav ne touche pas au contrat du panier — la vue TDB peut être déplacée, le panier reste identique. Tests : `tests-panier.html` doit rester vert après chaque commit du chantier 10 qui toucherait un consommateur du panier.

### 7.3 Iso-rendu des fiches

L'ouverture de fiche depuis n'importe quelle vue (porte, onglet, deep-link) produit exactement le même tiroir qu'aujourd'hui. `CM.Composants.htmlCarte` et `CM.Composants.ouvrirTiroir` restent les points d'entrée uniques. Aucune vue du chantier 10 ne re-dérive le HTML d'une fiche par elle-même.

### 7.4 Délégation globale des clics intra-fiche

Les liens intra-fiche cliquables (via la délégation globale posée dans `CM.App.init`) continuent de fonctionner depuis toutes les vues, y compris les nouvelles introduites par la refonte. Le filet `hashchange` (fix `ac71465`) reste en place — doublé si nécessaire pour les nouveaux hash.

### 7.5 Scroll en haut aux transitions

Le comportement `_scrollEnHaut` des portes stepper reste identique. La nav unifiée doit *soit* l'absorber comme comportement générique, *soit* le préserver à l'identique dans chaque consommateur. Pas de régression silencieuse.

### 7.6 Accessibilité déjà acquise

Rôles ARIA (`role="tablist"`, `aria-selected`, `aria-label`), focus visible, navigation clavier. Le chantier 10 conserve le niveau d'accessibilité atteint et le fait progresser quand l'occasion se présente. Ne pas régresser sur les attributs existants.

### 7.7 Tests de non-régression à relancer

À chaque commit du chantier 10 qui touche un module listé ci-dessous, relancer le harnais correspondant avant le commit suivant :

- `tests-panier.html` — toute modif touchant un consommateur du panier (vue TDB, badge, accès depuis nav) ;
- `tests-porte-niveau.html` — toute modif touchant `CM.VuePorteNiveau` ou sa place dans la nav ;
- contrôle visuel des deux autres portes (problème, cadre) à l'ouverture et sur un pivot complet — pas de harnais automatisé mais vérification systématique.

### 7.8 Alignement mission

Toute décision du chantier 10 doit pouvoir répondre à la question posée dans `MISSION.md` : *« Est-ce que cela sert l'une des cinq prises de conscience ? »*. Une décision qui fige la charpente sans servir une prise de conscience est à reformuler ou à laisser en pause.

---

## 8. Plan d'exécution

*Zone évolutive — la liste des sous-chantiers ci-dessous est une proposition initiale, à affiner au fil de l'avancement. Chaque sous-chantier est clos par un commit de backlog qui met à jour l'État courant. Critère de bascule entre deux sous-chantiers : tests de non-régression verts + commit atomique du sous-chantier précédent + alignement explicite avec Lætitia.*

### 8.1 Séquencement proposé

| # | Nom | Objectif | Livrable | Dépend de |
|---|---|---|---|---|
| **10.0** | Preview fondateur | Arbitrer les points § 4.2 (exposition des lentilles, sort du questionnaire, responsive, marquage actif) | 2 à 4 fichiers `preview-10-*.html` + arbitrage tracé dans § 5 du doc compagnon | rien |
| **10.1** | Socle nav unifiée | Créer le bandeau à **7 entrées** (dont *Cascade stratégique* en stub « Bientôt »), le router enrichi, sans toucher au contenu des onglets/portes existants. Iso-comportement des vues, nouvelle coquille de navigation. | `CM.Nav` (ou équivalent) + mise à jour DOM + routeur enrichi + **vue stub pour Cascade** (cf. § 4.5) | 10.0 |
| **10.2** | Migration accueil | Supprimer les deux accueils actuels (`#accueil`, `#accueil-portes`), redirection silencieuse de `#pyramide`/`#portes`, mettre en place l'écran *Accueil* dans sa nouvelle mission (expression de la mission de l'outil — squelette en place, rédaction et design fin hors scope 10, à travailler dans un chantier éditorial communication + UX-UI) | DOM accueil refait + migration hash + suppression `basculerAccueil` / `afficherAccueil` dans `CM.App` | 10.1 |
| **10.3** | Intégration portes dans *Choisir* | Les trois portes deviennent sous-lentilles de l'onglet *Choisir mes indicateurs*, selon le mode retenu en 10.0 | Refonte de `vue-questionnaire` + câblage portes | 10.2 |
| **10.4** | Deep-linking additif *(conditionnel)* | Ajouter les hash `#onglet=`, `#porte=` si retenus après 10.0 | Router enrichi + tests d'URLs partageables | 10.3 |
| **10.5** | Clôture et tests | Tests de non-régression complets, mise à jour backlog, archivage chantier 10 | Commit de clôture + État courant actualisé | 10.4 ou 10.3 |

### 8.2 Contraintes de livraison

- **1 modif = 1 commit atomique.** Chaque sous-chantier se décompose en plusieurs commits (comme 7.2a-code.2 avait livré 7 commits atomiques). Un commit change *l'architecture* ou *le comportement*, jamais les deux.
- **Iso-comportement par défaut.** Quand un commit change l'architecture (ex : introduction de `CM.Nav`), il ne doit pas produire de régression visible côté utilisateur. Quand un commit change le comportement (ex : suppression de la bascule d'accueil), il est identifié comme tel dans le message.
- **Tests verts en fin de chaque sous-chantier.** `tests-panier.html` et `tests-porte-niveau.html` relancés, contrôle visuel des portes problème et cadre.
- **Boy-scout sur les 8 règles.** Opportunités de refactor identifiées en passant (cf. mémoire `project_regles_refactoring_progressif`) — notamment extraction éventuelle de `CM.Router`, création de `CM.Html` si non encore faite.
- **Document compagnon tenu à jour.** Les sections § 4 et § 5 se remplissent au fil de l'avancement, § 8 se raffine à chaque clôture de sous-chantier.

### 8.3 Points d'arbitrage majeurs

Trois bascules explicites avec Lætitia avant de continuer :

1. **Après 10.0** — arbitrage sur les points § 4.2, consigné dans § 5 du doc compagnon. Pas de démarrage de 10.1 sans cet arbitrage.
2. **Avant 10.3** — confirmation du choix de refonte de *vue-questionnaire* (garder / fondre dans une porte / supprimer / **fusionner avec la future *Cascade stratégique* du chantier 11**) et du câblage portes retenu. L'arbitrage peut se faire conjointement avec l'ouverture du chantier 11 (cf. § 4.5).
3. **Avant 10.4** *(conditionnel)* — priorisation du deep-linking additif : est-ce que le chantier 10 porte ce scope ou le reporte à un chantier ultérieur ?

### 8.4 Prérequis à ne pas oublier

- **Appropriation de `MISSION.md`** — prérequis explicite du chantier 10 dans le backlog. Relu et intégré dans la rédaction du doc compagnon (§ 3.1, § 4, § 7.8).
- **Interaction avec 7.2a-code.3** — la porte niveau est en cours de construction via le stepper. Le chantier 10 n'interrompt pas 7.2a-code.3 : il intègre la porte niveau telle qu'elle sera livrée, dans la nav unifiée. Si 7.2a-code.3 livre avant 10.0, tant mieux ; sinon, le chantier 10 peut démarrer avec la porte niveau dans son état courant et absorber son évolution en 10.3.

---

## Journal du document

- 22/04/2026 soir — création du squelette (commit 1) : sections 1, 2, 3, 7.
- 22/04/2026 soir — commit 2 : section 6 rédigée en approche ciblée (façades portes, `CM.App` nav, hash URL, transverses préservés, router).
- 22/04/2026 soir — commit 3 : sections 4 (modèle cible — invariants de topologie + points à trancher en 10.0) et 8 (plan d'exécution — 6 sous-chantiers 10.0 à 10.5, contraintes de livraison, points d'arbitrage).
- 23/04/2026 — commit A : correction § 1 et § 2.1 — quatre portes dans `#accueil-portes` (dont *maturité* désactivée « Bientôt »). La mention *niveau-stepper → `#porte-niveau` (en cours 7.2a-code.3)* retirée de la colonne « Sorties » — cette carte n'existe pas dans `#accueil-portes` aujourd'hui (le DOM `#vue-porte-niveau` est atteint par une autre voie, et la porte niveau telle qu'elle apparaît sur l'accueil bascule simplement vers la pyramide).
- 23/04/2026 — commit B : § 4 Modèle cible enrichi. Quatre ajustements actés : (1) renommage *Maturité & Recommandations* → *La maturité ?* (choix éditorial avec point d'interrogation volontaire — posture socratique) ; (2) accueil assume sa mission d'expression (raison d'être + prises de conscience + scénarios) plutôt que de lister les portes ; (3) mutation de l'onglet *La maturité ?* — plus d'audit-scorecard, devient page de transparence sur la grille de maturité + accueillera un outil de diagnostic (chantier éditorial dédié à ouvrir, hors scope 10) ; (4) nouvelle § 4.4 *Expansion future des lentilles* (flux, communication, visibilité, par ce qu'on veut améliorer) — contrainte de conception pour la coquille de *Choisir* : elle doit être conçue pour s'enrichir.
- 23/04/2026 — commit C : *Cascade stratégique* réémerge. § 1 et § 4.1 passent à **sept entrées** de premier rang (Cascade insérée entre *Choisir* et *La maturité ?*). Nouvelle § 4.5 pose la mission de *Cascade* (vision globale des alignements inter-niveaux, click-to-highlight, filtres), son rapport avec `vue-questionnaire` actuel (candidate pour fusion au chantier 11), son scope chantier 10 (emplacement réservé en 10.1, vue stub « Bientôt »). § 4.2 enrichi (question sur `vue-questionnaire` inclut désormais la piste de fusion avec Cascade). § 8.1 ajusté — 10.1 livre aussi le stub Cascade, 10.2 met en place l'accueil dans sa nouvelle mission d'expression. § 8.3 enrichi (arbitrage conjoint 10.3 / 11).
- 23/04/2026 — arbitrage preview 10.0 point 4 : **variante B (fond pill indigo clair)** retenue pour le marquage visuel de l'onglet actif. Geste en continuité directe avec les onglets actuels de l'app. § 4.1 complété par un invariant *Marquage visuel de l'entrée active*, § 4.2 point 4 barré et basculé en tranché. Previews de référence : `preview-10-actif-B-fond-pill-indigo.html` et page de comparaison côte à côte `preview-10-comparaison-actif.html`. Trois questions § 4.2 restent ouvertes (exposition des lentilles, sort de `vue-questionnaire`, responsive).
- 23/04/2026 fin d'après-midi — **bifurcation en deux modes d'entrée**. Après livraison des previews lentilles A/B/C (`c3cebb8` cards / `be983f3` tabs / `e75d693` stepper ouvert / `6daa562` comparaison), Lætitia signale que ces previews fusionnent implicitement deux couches mentales distinctes : *intention du visiteur* (ce que je viens régler, dans ma langue) vs *lentille d'analyse* (comment l'outil me guide). Décision structurelle : l'onglet *Choisir mes indicateurs* se scinde en **deux onglets parallèles** — *Par mes 4 axes* (mode synthétique, les 4 portes existantes) et *Par ma question* (mode fin, catalogue de questions métier). Nav unifiée passe de 7 à **8 entrées**. Machinerie = **mix** (certaines questions fines sont des raccourcis vers les portes avec préconfiguration, d'autres ont leur propre mini-stepper autonome). Catalogue bâti par **consultation de panels d'experts nommés** (gestion du changement, coach Lean, coach Agile, terrain des autres cadres, accompagnement en management). Conséquence : § 4.1 amendé (invariant 7 → 8 entrées + nouveau point *Deux modes d'entrée parallèles*), § 4.2 reformulé (point 1 cadré sur *Par mes 4 axes* uniquement, nouveau point sur exposition du mode fin, point 2 enrichi avec piste d'absorption dans *Par ma question*, point 3 note la pression responsive accrue à 8 entrées). Previews lentilles A/B/C restent utilisables après recadrage du libellé d'onglet. Prochain livrable : premier jet du catalogue de questions fines (document de travail, non commité tant qu'on itère).
