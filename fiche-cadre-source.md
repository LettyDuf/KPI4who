# Source des fiches-cadres (chantier 28)

*Source de vérité éditoriale des fiches-cadres. Le générateur `outils/generer-fiches-cadres.js` transforme ce fichier en zone balisée `CM.FICHE-CADRE-DATA` de `cadre-indicateurs.html`. Ne jamais éditer la zone générée à la main.*

*Format d'une entrée : titre de niveau deux portant l'id, champs en marqueurs gras. Champs obligatoires : statut, origine, philosophie, panel, signatures (ids séparés par des virgules), lecture, antiPatterns, quandChoisir, quandSeMefier, allerPlusLoin. Le HTML léger est admis dans les champs éditoriaux (strong, span term-def, span traduction, a href interne). Schéma et contraintes : doc-contrats-fiche-cadre.md § 2 et § 3.*

## dora

**statut** : cadre

**origine** : Né du programme de recherche <span class="traduction">State of DevOps</span> (2014-2019) mené par Nicole Forsgren, Jez Humble et Gene Kim, et synthétisé dans <span class="traduction">Accelerate</span> (2018). C'est un cas rare dans le monde des cadres : quatre mesures issues d'une recherche quantitative sur des dizaines de milliers d'organisations, pas d'une méthode à vendre. DORA signifie <span class="traduction">DevOps Research and Assessment</span>, l'équipe de recherche devenue depuis un programme de Google Cloud.

**philosophie** : Le cadre tient dans une découverte contre-intuitive : la vitesse de livraison et la stabilité du service ne s'opposent pas. Les organisations les plus rapides sont aussi les plus stables, parce que livrer souvent oblige à livrer petit, et que livrer petit rend chaque changement moins risqué et plus facile à réparer.

Quatre mesures suffisent alors à caractériser un système de livraison : deux de <strong>débit</strong> (à quelle fréquence on livre, en combien de temps un changement arrive en production) et deux de <strong>stabilité</strong> (quelle part des changements échoue, en combien de temps on rétablit le service). Le reste, pratiques techniques, culture, architecture, se lit comme des causes de ces quatre effets.

**panel** : Nicole Forsgren, Jez Humble, Gene Kim (Accelerate, rapports State of DevOps) ; Ron Westrum pour le volet culture organisationnelle repris par la recherche.

**signatures** : o1, o2, o3, o4

**lecture** : Les quatre mesures se lisent ensemble, jamais isolément : c'est leur équilibre qui dit la santé du système. Une fréquence de déploiement qui monte pendant que le taux d'échec explose raconte une équipe qui force la cadence sans filet ; un temps de rétablissement excellent avec une fréquence famélique raconte un système qu'on ne touche plus par peur. La <a href="#fiche=x7">culture générative</a> mesurée par Westrum complète le tableau : la recherche la donne comme prédicteur des quatre autres.

**antiPatterns** : <span class="term-def" data-def="Comparaison inter-équipes : classer les équipes sur leurs métriques DORA alors que leurs contextes (legacy, criticité, dépendances) ne sont pas comparables. La recherche compare une équipe à elle-même dans le temps, jamais deux équipes entre elles.">comparaison inter-équipes</span>, <span class="term-def" data-def="Théâtre DORA : afficher les quatre métriques dans un tableau de bord sans changer aucune pratique de livraison. Les chiffres existent, le système qui les produit reste intact.">théâtre DORA</span>, et la poursuite du débit seul : optimiser fréquence et délai en fermant les yeux sur l'échec de changement et le rétablissement, c'est précisément la lecture partielle que le cadre existe pour empêcher.

**quandChoisir** : Excellent partout où une équipe livre du logiciel en continu et veut objectiver sa progression : c'est le point d'entrée le plus solide et le plus économe.

**quandSeMefier** : Déçoit hors du delivery : il ne dit rien de la valeur de ce qu'on livre (un train très fiable peut aller au mauvais endroit), rien du produit, rien des humains au-delà de la culture. Se complète nécessairement d'indicateurs de valeur et d'usage.

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

**quandChoisir** : Excellent quand l'organisation souffre de dispersion ou d'objectifs déconnectés de la stratégie, et qu'elle est prête à découpler objectifs et rémunération, condition non négociable.

**quandSeMefier** : Déçoit dans les contextes de production stable où l'essentiel du travail est récurrent : les OKR mesurent le changement, pas le fonctionnement courant ; les indicateurs de flux et de qualité couvrent ce terrain-là.

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

**quandChoisir** : Indispensable dès qu'une transformation demande à des personnes de travailler autrement : nouvel outil, nouvelle organisation, nouvelle pratique.

**quandSeMefier** : Déçoit comme cadre de pilotage permanent : ses indicateurs sont faits pour la traversée, pas pour le régime de croisière ; une fois le changement ancré, ils s'archivent, et les indicateurs de flux et de qualité reprennent la main.

**allerPlusLoin** : Leading Change (Kotter, 1995) ; Managing Transitions (Bridges, 1991) ; ADKAR (Hiatt, 2006).


## cd

**statut** : cadre

**origine** : Formalisé par Jez Humble et David Farley dans <span class="traduction">Continuous Delivery</span> (2010), dans le prolongement direct de l'intégration continue de Martin Fowler et Kent Beck. L'idée fondatrice : faire de la mise en production un non-événement, obtenu à la demande par un pipeline automatisé qui construit, teste et déploie chaque changement. Jez Humble est aussi coauteur de la recherche DORA, ce qui fait du Continuous Delivery le socle de pratiques dont DORA mesure les effets.

**philosophie** : Le cadre repose sur une conviction d'ingénierie : la fiabilité vient de la répétition automatisée, pas du soin manuel. Un déploiement rare et redouté concentre le risque ; un déploiement fréquent et automatisé le dissout, parce que chaque livraison est petite, testée de bout en bout et réversible.

D'où un principe de mesure : ce qui compte, c'est la santé du chemin qui mène le code en production, pas le volume de code écrit. Un pipeline rapide, stable et digne de confiance est le vrai actif ; les indicateurs regardent sa vitesse de retour, sa stabilité et sa capacité à attraper les défauts avant l'utilisateur.

**panel** : Jez Humble et David Farley (Continuous Delivery, 2010) ; Martin Fowler et Kent Beck pour l'intégration continue en amont ; filiation directe avec la recherche DORA, dont Humble est coauteur.

**signatures** : ti-p3, ti-p2, o8, ti-p5

**lecture** : Les quatre mesures décrivent la chaîne dans l'ordre où un changement la traverse. Le <a href="#fiche=ti-p3">taux de succès du pipeline</a> dit si la chaîne est fiable ; la <a href="#fiche=ti-p2">durée de build</a> dit si le retour est assez rapide pour rester utile ; la <a href="#fiche=o8">couverture de tests automatisés</a> dit si le filet attrape les défauts avant la production ; le <a href="#fiche=ti-p5">taux d'adoption de l'Infrastructure-as-Code</a> dit si l'environnement est reproductible. Aucune ne suffit seule : un pipeline rapide mais qui échoue une fois sur trois, ou vert mais sans vrais tests, donne une confiance trompeuse.

**antiPatterns** : <span class="term-def" data-def="Pipeline vert vide : afficher un taux de succès élevé en désactivant ou en supprimant les tests qui échouent. La chaîne passe au vert, le filet de sécurité a disparu.">pipeline vert vide</span>, <span class="term-def" data-def="Théâtre de la couverture : viser un pourcentage de couverture élevé avec des tests qui n'assertent rien de significatif. Le chiffre monte, la confiance qu'il est censé mesurer reste fausse.">théâtre de la couverture</span>, et la vitesse au détriment du filet : raccourcir les builds en retirant des étapes de test, c'est échanger la sécurité que le cadre existe pour construire contre une accélération illusoire.

**quandChoisir** : Excellent dès qu'une équipe livre du logiciel régulièrement et veut fiabiliser sa chaîne de livraison : c'est le socle technique concret sous les résultats que DORA mesure au niveau système.

**quandSeMefier** : Déçoit comme mesure de valeur : un pipeline parfait livre vite, mais ne dit rien de l'utilité de ce qu'il déploie. Hors du logiciel, ou pour un produit dont la contrainte est la découverte du besoin plutôt que la livraison, ses indicateurs tournent à vide ; les mesures de valeur et d'usage prennent le relais.

**allerPlusLoin** : Continuous Delivery (Humble, Farley, 2010) ; The DevOps Handbook (Kim, Humble, Debois, Willis) ; Accelerate (Forsgren, Humble, Kim, 2018).

## space

**statut** : cadre

**origine** : Proposé en 2021 par Nicole Forsgren, Margaret-Anne Storey, Chandra Maddila, Thomas Zimmermann, Brian Houck et Jenna Butler dans l'article <span class="traduction">The SPACE of Developer Productivity</span>. C'est une réponse directe à une dérive répandue : réduire la productivité des développeurs à une seule dimension, le plus souvent le volume de code ou de tickets. SPACE est l'acronyme de cinq dimensions à tenir ensemble : satisfaction et bien-être, performance, activité, communication et collaboration, efficacité et flux.

**philosophie** : Le cadre part d'un constat de recherche : la productivité d'un développeur n'est pas une grandeur unique et ne se lit jamais sur une seule métrique. La mesurer honnêtement demande de croiser plusieurs dimensions, dont au moins une qui échappe au comptage, comme la satisfaction.

D'où une règle de méthode : choisir ses indicateurs dans au moins deux ou trois dimensions différentes, et ne jamais utiliser une mesure d'activité isolée pour juger une personne. L'activité seule, en lignes de code ou en tickets, est précisément le piège que SPACE existe pour désamorcer.

**panel** : Nicole Forsgren, Margaret-Anne Storey, Chandra Maddila, Thomas Zimmermann, Brian Houck et Jenna Butler (The SPACE of Developer Productivity, 2021).

**signatures** : ti-d4, x4

**lecture** : Les deux indicateurs relèvent volontairement de dimensions différentes, c'est là tout le principe du cadre. Le <a href="#fiche=ti-d4">délai de revue de code</a> touche la communication et l'efficacité, la fluidité de la collaboration ; l'<a href="#fiche=x4">indice de bien-être de l'équipe</a> touche la satisfaction. Lus ensemble, ils disent à la fois si l'équipe collabore bien et si elle va bien ; l'un sans l'autre trompe, car une revue fluide dans une équipe épuisée n'est pas une bonne nouvelle durable.

**antiPatterns** : <span class="term-def" data-def="Métrique d'activité isolée : juger un développeur sur son seul volume d'activité (lignes de code, commits, tickets fermés). C'est la réduction même que SPACE existe pour empêcher ; l'activité ne dit rien de la valeur ni de la soutenabilité.">métrique d'activité isolée</span>, <span class="term-def" data-def="Usage individuel d'une mesure d'équipe : décliner les indicateurs SPACE au niveau de la personne pour l'évaluer. Le cadre éclaire un système de travail, il ne note pas des individus ; l'usage individuel réintroduit le management par la peur.">usage individuel</span>, et la dimension unique : choisir toutes ses métriques dans la même case, souvent l'activité, vide le cadre de son sens, qui est justement le croisement.

**quandChoisir** : Excellent pour parler de productivité de développement sans la caricaturer, et pour désamorcer les métriques de vanité comme le nombre de lignes ou de commits : il force à croiser plusieurs dimensions, dont le bien-être.

**quandSeMefier** : Déçoit qui cherche un tableau de bord clé en main : SPACE est un cadre de pensée, pas une liste d'indicateurs prêts à l'emploi, et plusieurs de ses dimensions se mesurent par enquête, pas par extraction automatique. Attention aussi à la tentation de l'agréger en un score unique, qui détruirait exactement la pluralité qu'il défend.

**allerPlusLoin** : The SPACE of Developer Productivity (Forsgren, Storey, Maddila, Zimmermann, Houck, Butler, 2021).

## flow

**statut** : cadre

**origine** : Créé par Mik Kersten dans <span class="traduction">Project to Product</span> (2018). Le constat de départ : les organisations pilotent encore par projets (budget, échéance, périmètre) alors que la valeur logicielle se crée en flux continu de produits. Kersten propose de mesurer ce flux directement depuis les outils de delivery, à l'échelle du portefeuille, à travers quatre types de travail exclusifs : fonctionnalités, défauts, dette technique, risque.

**philosophie** : Le cadre repose sur un déplacement du regard : au niveau portefeuille, la vitesse ne dépend presque pas de l'effort des équipes, mais de la structure des files d'attente entre elles. Un <span class="traduction">flow item</span>, l'unité de travail vue du portefeuille, passe le plus clair de sa vie à attendre une décision, une validation ou une ressource rare, pas à être traité.

D'où une conviction de mesure héritée de la Théorie des Contraintes de Goldratt : le goulot d'un portefeuille est presque toujours une file de gouvernance, pas une équipe lente. Les métriques de flux servent à localiser ce goulot et à le rendre discutable, jamais à noter les exécutants.

**panel** : Mik Kersten (Project to Product, 2018) ; Daniel Vacanti (Actionable Agile Metrics) pour la lecture en distribution ; Eliyahu Goldratt (Théorie des Contraintes) en amont. Le corpus rappelle que SAFe v6 a intégré ces métriques de flux dans son référentiel officiel.

**signatures** : fl-1, p5, t4

**lecture** : Les trois mesures composent le tableau de flux du portefeuille. La <a href="#fiche=fl-1">distribution du flux</a> dit sur quoi part réellement la capacité (fonctionnalités, défauts, dette, risque) ; le <a href="#fiche=p5">débit d'initiatives livrées</a>, la vélocité de flux, dit combien le portefeuille produit ; l'<a href="#fiche=t4">efficacité de flux</a> dit quelle part du temps est du traitement plutôt que de l'attente. La distribution révèle les arbitrages réels, la vélocité le rythme, l'efficacité les files qui le brident. Toutes se lisent en distribution, jamais en moyenne unique (Vacanti), et jamais comme une note d'équipe.

**antiPatterns** : <span class="term-def" data-def="Usage en évaluation d'équipe : publier et comparer l'efficacité de flux ou la distribution entre équipes. L'efficacité d'une équipe est déterminée à plus de 90 % par des files qu'elle ne contrôle pas (Deming) ; l'en rendre comptable reproduit le management par la peur.">usage en évaluation d'équipe</span>, <span class="term-def" data-def="Distribution-cible : fixer un pourcentage de fonctionnalités à atteindre. La distribution du flux est un outil d'arbitrage conscient, pas une cible ; en faire un objectif pousse à requalifier les tickets (effet Goodhart) sans rien changer au réel.">distribution-cible</span>, <span class="term-def" data-def="Moyenne trompeuse : restituer l'efficacité de flux en moyenne unique masque la distribution réelle. Un portefeuille à 30 % de moyenne peut mêler des items faciles à 60 % et des items bloqués à 10 %, qui n'appellent pas la même décision.">moyenne trompeuse</span>, et l'optimisation locale : améliorer un segment qui n'est pas le goulot ne produit aucun gain de débit global (Goldratt).

**quandChoisir** : Excellent pour piloter un portefeuille produit et diagnostiquer la gouvernance : il rend visibles les files d'attente structurelles et les arbitrages réels, là où les indicateurs d'équipe ne voient rien.

**quandSeMefier** : Déçoit à l'échelle d'une seule équipe : c'est un cadre de portefeuille, ses mesures perdent leur sens et deviennent injustes si on les décline en indicateurs d'équipe. Il demande aussi une donnée de flux propre, un typage honnête des items et des temps d'attente déclarés ; sans cette hygiène, les chiffres flattent au lieu d'alerter.

**allerPlusLoin** : Project to Product (Kersten, 2018) ; Actionable Agile Metrics for Predictability (Vacanti) ; The Goal (Goldratt).
