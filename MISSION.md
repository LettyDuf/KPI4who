# Mission — *cadre-indicateurs*

Document de référence. Boussole de tout chantier à venir.

---

## Ce que l'outil cherche à provoquer

L'outil est une **aide à l'apprentissage et à la décision** pour poser la bonne métrique, au bon niveau, au bon moment.

Il accompagne une personne — manager, chef de programme, dirigeant, coach — qui cherche à y voir clair sur ce qu'elle mesure, ce qu'elle devrait mesurer, et surtout pourquoi.

> *La métrique n'est pas un objectif en soi. C'est une lunette pour se questionner sur les bonnes problématiques.*

Cette ligne est la colonne vertébrale de l'outil. Toute fonctionnalité qui la contredit est à retirer. Toute fonctionnalité qui la sert est à prioriser.

---

## Les cinq prises de conscience

L'outil vise à éveiller, dans l'ordre ou non, cinq formes de lucidité.

### 1. L'écart entre ce que je mesure et ce que je devrais regarder

Je prends conscience du décalage entre mon scorecard actuel et ce qui se regarde réellement à mon niveau hiérarchique.

### 2. La fiabilité de chaque métrique

Certaines métriques que je suis ne méritent pas ma confiance. D'autres, plus fiables ou complémentaires, existent — je peux les découvrir.

### 3. L'adaptation à la maturité de mon équipe

Une métrique juste dans l'absolu peut être toxique pour une équipe qui n'y est pas prête. Le niveau de maturité doit guider le choix.

### 4. La cohérence avec mon cadre de travail

Certaines métriques entrent en conflit avec le cadre que l'équipe a adopté. Velocity dans un système Kanban. KPI de productivité individuelle dans un système OKR. L'outil doit rendre ces conflits visibles.

### 5. La posture juste

Une métrique alerte. Elle n'impose pas. Elle n'est pas un verdict, c'est une invitation à enquêter.

> *Le chiffre alerte. Le terrain explique.*

---

## Posture : socratique, pas prescriptif

L'outil ne dit pas à la personne ce qu'elle doit mesurer.

Il l'aide à questionner son système actuel et à formuler ses propres choix. Les recommandations existent, mais elles sont toujours au service du diagnostic — jamais en substitut du jugement contextuel de la personne.

Un outil n'a pas le contexte. La personne, oui.

---

## Mode d'usage

On y revient. Ce n'est pas un outil qu'on consomme en une fois.

On l'ouvre à la prise de poste pour cadrer sa mesure. On y retourne au début d'un trimestre pour questionner son scorecard. On y revient quand une équipe s'épuise, pour voir ce qui manque à la visibilité. On y revient parce que la question *« qu'est-ce que je mesure, et pourquoi ? »* ne se pose jamais une seule fois.

---

## Scénarios types

Cinq situations vivantes qui ouvrent l'outil.

**Prise de poste.** Je prends un nouveau poste et on me dit d'accompagner mes équipes à être plus performantes. Dois-je garder les métriques que je comprends déjà, ou en chercher d'autres ?

**Transformation à accompagner.** Je dois accompagner une transformation. Je ne sais pas quoi faire mesurer aux différentes strates de mon client.

**Demande qui vient d'en haut.** Ma direction me demande un tableau de bord. Je ne sais pas quoi mettre dedans.

**Équipe qui s'épuise.** Mon équipe a trop de travail, on nous rajoute de la pression. Comment rendre visible ce qui bloque et la quantité réelle de travail ?

**Problème identifié, mesure absente.** J'identifie des problèmes mais je ne sais pas comment les mesurer — ni comment les rendre visibles à mon niveau.

Ces scénarios nourrissent les exemples d'accueil, les tuiles des portes, et les formulations pédagogiques de l'outil.

---

## Charpente à quatre onglets

Quatre outils complémentaires, dans lesquels on entre par n'importe lequel selon la situation. Pas de fil imposé, un cycle que l'on emprunte à son rythme.

### Mon tableau de bord

Voir ce qui est présent dans ma réalité actuelle — et ce que je devrais mesurer mais que je ne mesure pas. C'est le **miroir** de l'utilisateur. Il matérialise l'écart.

Cet onglet accueille le **panier personnel** : les métriques *en place* et les métriques *à envisager*. Son livrable final est une impression, faite pour être discutée avec ses collaborateurs.

### Choisir mes indicateurs

Trouver le bon indicateur qui saura m'aider. Cet onglet contient les **lentilles d'exploration** du référentiel — par mon problème, par mon cadre de travail, par mon rôle. Il vient **compléter ou affiner** le panier, sans jamais imposer.

### Maturité & Recommandations

Avec notre façon de fonctionner actuelle, quelle est la maturité de mon équipe — et quelles pistes d'amélioration par des métriques adaptées ? Cet onglet est l'**audit qualité** du scorecard : fiabilité des indicateurs, adéquation à la maturité, cohérence avec le cadre.

### Cascade stratégique

*Statut actuel : en pause.* La mission de cet onglet n'est plus claire dans le cadre posé ici. Il pourra être refondu plus tard si une mission alignée émerge. D'ici là, il reste accessible en lecture mais n'est pas exposé dans la navigation principale.

---

## Livrable central

Une liste en main, imprimable, qui regroupe les métriques déjà en place et celles envisagées — faite pour être discutée avec ses collaborateurs.

Pas d'export vers des formats étrangers. L'outil garde la main sur la forme, parce que la forme sert la lisibilité, et la lisibilité sert la conversation.

---

## Principes d'évolution

Tout chantier à venir doit pouvoir répondre à une seule question :

> *Est-ce que cela sert l'une des cinq prises de conscience ?*

Si la réponse est claire, le chantier s'engage. Si la réponse est floue, on la clarifie avant d'écrire une ligne de code. Si la réponse est non, le chantier attend.

La mission est stable. Les chantiers s'y plient.

### Garde-fou architectural

Depuis le chantier 14 (livré le 26/04/2026), le socle technique est **hexagonal** : la description des métriques (domaine) est isolée des chemins d'accès (portes, demain catalogue de questions) qui formulent des filtres et délèguent à `CM.RequeteMetriques.executer`. Tout nouveau chemin (porte, vue, question) doit respecter cette séparation : façade orthodoxe, sans accès direct au référentiel ni aux métadonnées. Voir `doc-contrats-chantier-14.md` §3.4 (architecture livrée) et §10.3 (signature `executer`).
