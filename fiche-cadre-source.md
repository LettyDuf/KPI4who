# Source des fiches-cadres (chantier 28)

*Source de vérité éditoriale des fiches-cadres. Le générateur `outils/generer-fiches-cadres.js` transforme ce fichier en zone balisée `CM.FICHE-CADRE-DATA` de `cadre-indicateurs.html`. Ne jamais éditer la zone générée à la main.*

*Format d'une entrée : titre de niveau deux portant l'id, champs en marqueurs gras. Champs obligatoires : statut, origine, philosophie, panel, signatures (ids séparés par des virgules), lecture, antiPatterns, quandChoisir, allerPlusLoin. Le HTML léger est admis dans les champs éditoriaux (strong, span term-def, span traduction, a href interne). Schéma et contraintes : doc-contrats-fiche-cadre.md § 2 et § 3.*

## dora

**statut** : cadre

**origine** : Né du programme de recherche <span class="traduction">State of DevOps</span> (2014-2019) mené par Nicole Forsgren, Jez Humble et Gene Kim, et synthétisé dans <span class="traduction">Accelerate</span> (2018). C'est un cas rare dans le monde des cadres : quatre mesures issues d'une recherche quantitative sur des dizaines de milliers d'organisations, pas d'une méthode à vendre. DORA signifie <span class="traduction">DevOps Research and Assessment</span>, l'équipe de recherche devenue depuis un programme de Google Cloud.

**philosophie** : Le cadre tient dans une découverte contre-intuitive : la vitesse de livraison et la stabilité du service ne s'opposent pas. Les organisations les plus rapides sont aussi les plus stables, parce que livrer souvent oblige à livrer petit, et que livrer petit rend chaque changement moins risqué et plus facile à réparer.

Quatre mesures suffisent alors à caractériser un système de livraison : deux de <strong>débit</strong> (à quelle fréquence on livre, en combien de temps un changement arrive en production) et deux de <strong>stabilité</strong> (quelle part des changements échoue, en combien de temps on rétablit le service). Le reste, pratiques techniques, culture, architecture, se lit comme des causes de ces quatre effets.

**panel** : Nicole Forsgren, Jez Humble, Gene Kim (Accelerate, rapports State of DevOps) ; Ron Westrum pour le volet culture organisationnelle repris par la recherche.

**signatures** : o1, o2, o3, o4

**lecture** : Les quatre mesures se lisent ensemble, jamais isolément : c'est leur équilibre qui dit la santé du système. Une fréquence de déploiement qui monte pendant que le taux d'échec explose raconte une équipe qui force la cadence sans filet ; un temps de rétablissement excellent avec une fréquence famélique raconte un système qu'on ne touche plus par peur. La <a href="#fiche=x7">culture générative</a> mesurée par Westrum complète le tableau : la recherche la donne comme prédicteur des quatre autres.

**antiPatterns** : <span class="term-def" data-def="Comparaison inter-équipes : classer les équipes sur leurs métriques DORA alors que leurs contextes (legacy, criticité, dépendances) ne sont pas comparables. La recherche compare une équipe à elle-même dans le temps, jamais deux équipes entre elles.">comparaison inter-équipes</span>, <span class="term-def" data-def="Théâtre DORA : afficher les quatre métriques dans un tableau de bord sans changer aucune pratique de livraison. Les chiffres existent, le système qui les produit reste intact.">théâtre DORA</span>, et la poursuite du débit seul : optimiser fréquence et délai en fermant les yeux sur l'échec de changement et le rétablissement, c'est précisément la lecture partielle que le cadre existe pour empêcher.

**quandChoisir** : Excellent partout où une équipe livre du logiciel en continu et veut objectiver sa progression : c'est le point d'entrée le plus solide et le plus économe. Déçoit hors du delivery : il ne dit rien de la valeur de ce qu'on livre (un train très fiable peut aller au mauvais endroit), rien du produit, rien des humains au-delà de la culture. Se complète nécessairement d'indicateurs de valeur et d'usage.

**allerPlusLoin** : Accelerate (Forsgren, Humble, Kim, 2018) ; les rapports annuels State of DevOps ; The DevOps Handbook (Kim, Humble, Debois, Willis).

## okr

**statut** : cadre

**origine** : Andy Grove invente la mécanique chez Intel dans les années 1970 (<span class="traduction">High Output Management</span>, 1983), en durcissant le management par objectifs de Drucker : des objectifs qualitatifs inspirants, des résultats clés mesurables, une cadence courte. John Doerr, ancien d'Intel, l'apporte à Google en 1999 et le popularise dans <span class="traduction">Measure What Matters</span> (2018). Christina Wodtke (<span class="traduction">Radical Focus</span>, 2016) en donne la version praticable par une seule équipe.

**philosophie** : Le cadre repose sur une conviction : ce qui tue l'exécution n'est pas le manque d'idées, c'est la dispersion. Un trimestre, un ou deux objectifs, trois à cinq résultats clés chacun : la contrainte de format est la méthode. L'objectif dit où l'on va et donne envie d'y aller ; les résultats clés disent comment on saura qu'on y est arrivé, chiffres à l'appui.

Deux traits le distinguent de la cascade classique : l'ambition assumée, un bon résultat clé ambitieux s'atteint à 60 ou 70 %, viser 100 % partout signale qu'on ne s'étire plus ; et la construction par dialogue, une moitié des OKR doit remonter des équipes, pas descendre de la direction. C'est ce qui sépare l'outil d'alignement de l'outil de contrôle.

**panel** : Andy Grove (High Output Management), John Doerr (Measure What Matters), Christina Wodtke (Radical Focus) ; Drucker en amont, pour la filiation avec le management par objectifs.

**signatures** : s4, p14, s18, o9

**lecture** : La chaîne se lit de haut en bas et retour : les <a href="#fiche=s4">OKR stratégiques</a> donnent le cap, l'<a href="#fiche=p14">OKR de programme relié</a> vérifie que chaque étage contribue nommément à l'étage au-dessus, les <a href="#fiche=o9">OKR d'équipe</a> ancrent le tout dans le travail réel. La <a href="#fiche=s18">santé du système OKR</a> surveille l'ensemble : si tout s'atteint à 100 %, le dispositif s'est endormi. Aucun de ces indicateurs ne se lit seul : un étage parfait dans une chaîne cassée ne produit rien.

**antiPatterns** : <span class="term-def" data-def="OKR-évaluation : lier l'atteinte des OKR à la prime ou à l'évaluation individuelle. La conséquence est mécanique : chacun négocie des objectifs qu'il sait déjà atteindre, l'ambition disparaît. Doerr en fait la première règle : découpler OKR et rémunération.">OKR-évaluation</span>, <span class="term-def" data-def="Cascade mécanique : découper les OKR du haut en sous-OKR imposés sans conversation. La lettre est parfaite, l'engagement est mort ; la moitié des OKR doit remonter du terrain.">cascade mécanique</span>, <span class="term-def" data-def="OKR-liste de courses : transformer les résultats clés en liste de tâches à livrer (sortir la fonctionnalité X) plutôt qu'en résultats mesurables (réduire le délai de Y %). On retombe dans le pilotage à l'output.">OKR-liste de courses</span>, et l'inflation : dix objectifs par trimestre, c'est zéro priorité.

**quandChoisir** : Excellent quand l'organisation souffre de dispersion ou d'objectifs déconnectés de la stratégie, et qu'elle est prête à découpler objectifs et rémunération, condition non négociable. Déçoit dans les contextes de production stable où l'essentiel du travail est récurrent : les OKR mesurent le changement, pas le fonctionnement courant ; les indicateurs de flux et de qualité couvrent ce terrain-là.

**allerPlusLoin** : Measure What Matters (Doerr, 2018) ; High Output Management (Grove, 1983) ; Radical Focus (Wodtke, 2016).

## change

**statut** : cadre

**origine** : Quatre lignées convergentes. Kurt Lewin pose le modèle fondateur en 1947 : dégel, changement, regel. William Bridges (<span class="traduction">Managing Transitions</span>, 1991) distingue le changement, l'événement, de la transition, le chemin psychologique. John Kotter (<span class="traduction">Leading Change</span>, 1995) donne la mécanique organisationnelle en huit étapes. Le modèle ADKAR de Prosci (Hiatt, 2006) descend à l'individu : cinq marches séquentielles, conscience, désir, connaissance, capacité, ancrage.

**philosophie** : Le cadre part d'un constat têtu : les transformations n'échouent presque jamais sur la technique, elles échouent sur l'humain. On ne décrète pas un changement, on le fait traverser à des personnes, une par une, et chacune avance à sa vitesse sur ses propres marches.

D'où une conviction de mesure : les indicateurs utiles regardent l'adhésion, l'adoption et l'ancrage, pas l'avancement du projet. Un déploiement à 100 % avec une adoption à 30 % est un échec qui se prend pour un succès. Et une conviction de lecture : la résistance n'est pas de la mauvaise volonté, c'est une information sur des obstacles réels qu'il faut entendre.

**panel** : Lewin, Kotter, ADKAR / Prosci (Hiatt), Bridges : le panel des fiches cg-* du référentiel.

**signatures** : cg-1, cg-2, cg-3, s6

**lecture** : Les trois premières signatures suivent les marches dans l'ordre : le <a href="#fiche=cg-1">score de conscience et de désir</a> dit si le terrain est prêt avant d'investir, le <a href="#fiche=cg-2">taux d'adoption des nouveaux comportements</a> dit si le geste passe dans le quotidien, la <a href="#fiche=cg-3">fréquence des régressions</a> dit si le changement tient quand l'attention se relâche. La <a href="#fiche=s6">capacité d'absorption du changement</a> se lit en surplomb : combien de changements l'organisation peut-elle encaisser de front. Lire une marche isolément fait rater le diagnostic : une adoption faible avec un désir fort n'appelle pas la même réponse qu'une adoption faible avec un désir éteint.

**antiPatterns** : <span class="term-def" data-def="Pilotage au déploiement : mesurer l'avancement technique (sites migrés, comptes créés, formations dispensées) et le prendre pour de l'adoption. Le projet est vert, le changement n'a pas eu lieu.">pilotage au déploiement</span>, <span class="term-def" data-def="Communication comptée comme conscience : compter les courriels envoyés et les réunions tenues comme preuve que les gens ont compris. La conscience se mesure côté récepteur, jamais côté émetteur.">communication comptée comme conscience</span>, <span class="term-def" data-def="Résistance pathologisée : traiter tout signal de résistance comme un problème de personnes à corriger. La résistance est une donnée de diagnostic ; la faire taire supprime le capteur, pas la cause.">résistance pathologisée</span>.

**quandChoisir** : Indispensable dès qu'une transformation demande à des personnes de travailler autrement : nouvel outil, nouvelle organisation, nouvelle pratique. Déçoit comme cadre de pilotage permanent : ses indicateurs sont faits pour la traversée, pas pour le régime de croisière ; une fois le changement ancré, ils s'archivent, et les indicateurs de flux et de qualité reprennent la main.

**allerPlusLoin** : Leading Change (Kotter, 1995) ; Managing Transitions (Bridges, 1991) ; ADKAR (Hiatt, 2006).
