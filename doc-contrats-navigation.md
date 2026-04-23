# Document compagnon — chantier 10 : refonte architecture de navigation

*Document vivant. Deux zones : **figée** (invariants, contrats d'API stables) et **évolutive** (choix UX à trancher par mockup-preview). Chaque modification est commitée et consignée.*

Dernière mise à jour : 22 avril 2026 — soir (squelette initial).

---

## 1. Pourquoi ce document

Le chantier 10 refond la topologie de navigation de `cadre-indicateurs.html`. L'outil se vit aujourd'hui comme **deux territoires mal reliés** (portes d'entrée d'un côté, onglets de l'app de l'autre) et la mission exige *« quatre outils complémentaires dans lesquels on entre par n'importe lequel, sans fil imposé »*. Ce document pose le contrat avant le code, dans la ligne du patron `doc-contrats-stepper-roles.md` qui a servi au 7.2a-code.

**Scope dans ce document :**

- les trois portes (problème, cadre, niveau) et leur place dans la nav ;
- les onglets de l'app (TDB, Choisir mes indicateurs, Maturité) — Cascade stratégique en pause (chantier 11) ;
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
| Accueil 4 portes | `#accueil-portes` | Écran d'entrée alternatif qui liste les quatre portes | bascule depuis `#accueil` | carte *niveau* → `#accueil` ; carte *problème* → `#porte-probleme` ; carte *cadre* → `#porte-cadre` ; carte *niveau-stepper* → `#porte-niveau` (en cours 7.2a-code.3) |
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

*Zone évolutive — la topologie cible se stabilise après le preview fondateur (mockup 10.0). Le squelette ci-dessous pose seulement les invariants qu'on ne négocie pas.*

À rédiger en commit 3 (plan d'exécution) — initialement sous forme *« à trancher »*, à compléter au fil des mockups.

---

## 5. Mapping de transition

*Zone évolutive — ce tableau se remplit après l'arbitrage fondateur. Une ligne par entrée de nav actuelle, colonne « sort » = conserver / fusionner / renommer / supprimer, colonne « cible » = élément dans le modèle cible, colonne « preview » = renvoi au mockup qui a tranché.*

À rédiger après le preview 10.0.

---

## 6. Contrats d'API

*Zone figée — à rédiger en commit 2 sur base de l'état actuel du code. Les façades publiques `CM.App.*`, `CM.VuePorte*.ouvrir`, les hash URL reconnus sont documentés ici avec leur signature et leur comportement à préserver.*

À rédiger en commit 2.

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

*Zone évolutive — la liste des sous-chantiers s'affine au fil de l'avancement. Chaque sous-chantier est clos par un commit de backlog qui met à jour l'État courant.*

À rédiger en commit 3.

---

## Journal du document

- 22/04/2026 soir — création du squelette (commit 1) : sections 1, 2, 3, 7.
