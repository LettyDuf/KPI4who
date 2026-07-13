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


## scrum

**statut** : cadre

**origine** : Créé par Ken Schwaber et Jeff Sutherland au début des années 1990, formalisé dans le <span class="traduction">Scrum Guide</span> qu'ils maintiennent depuis. Scrum organise le travail en sprints courts, des cycles de quelques semaines au terme desquels un incrément utilisable est livré, inspecté et adapté. C'est le cadre agile le plus répandu ; ses mesures les plus connues, la vélocité et le burndown, sont nées de la pratique des équipes plus que du guide lui-même.

**philosophie** : Le cadre repose sur l'empirisme : on ne planifie pas tout d'avance, on avance par petits pas, on regarde le résultat réel et on ajuste. Trois piliers soutiennent cette boucle, la transparence, l'inspection et l'adaptation, et le sprint en est le battement.

D'où une nature très particulière de ses mesures : ce sont des aides à la planification de l'équipe, pas des indicateurs de performance. La vélocité sert à l'équipe pour estimer ce qu'elle peut raisonnablement prendre au prochain sprint, rien d'autre ; elle n'a de sens que pour l'équipe qui l'a produite.

**panel** : Ken Schwaber et Jeff Sutherland (Scrum Guide) ; l'organisation Scrum.org qu'ils ont essaimée pour le corpus et sa certification.

**signatures** : ti-d2, x1, x2

**lecture** : Les trois mesures éclairent la même boucle de sprint. Le <a href="#fiche=ti-d2">taux de complétion de sprint</a> dit si l'équipe tient ce qu'elle a planifié ; la <a href="#fiche=x1">vélocité</a> dit combien elle peut raisonnablement prendre la prochaine fois ; le <a href="#fiche=x2">graphe de progression (burndown)</a> montre en cours de sprint si la trajectoire tient. Elles se lisent ensemble et seulement au sein de l'équipe : comparer la vélocité de deux équipes n'a aucun sens, l'unité étant inventée par chacune.

**antiPatterns** : <span class="term-def" data-def="Vélocité comparée entre équipes : classer ou comparer des équipes sur leur vélocité. Le point de complexité est une unité inventée par chaque équipe, non standardisée ; comparer deux vélocités revient à comparer des monnaies sans taux de change.">vélocité comparée</span>, <span class="term-def" data-def="Vélocité-cible : demander à une équipe d'augmenter sa vélocité. La réponse mécanique est l'inflation des estimations, les mêmes tâches valant plus de points ; le chiffre monte, rien ne change (effet Goodhart).">vélocité-cible</span>, et le burndown de surveillance : transformer le graphe de sprint en outil de contrôle managérial plutôt qu'en signal d'auto-régulation de l'équipe.

**quandChoisir** : Excellent pour une équipe qui livre par itérations et veut une cadence d'inspection régulière et une base de prévisibilité : c'est le point d'entrée agile le plus éprouvé.

**quandSeMefier** : Déçoit dès qu'on sort ses mesures de l'équipe : vélocité et complétion de sprint ne sont ni des indicateurs de performance, ni comparables, ni des mesures de valeur (une équipe peut être très prévisible en livrant des choses inutiles). Elles ne disent rien de l'usage réel de ce qui est produit.

**allerPlusLoin** : Le Scrum Guide (Schwaber, Sutherland) ; Software in 30 Days (Schwaber, Sutherland).

## ebm

**statut** : cadre

**origine** : Formalisé par Scrum.org, l'organisation de Ken Schwaber, dans le guide <span class="traduction">Evidence-Based Management</span>. Sa cible : aider les organisations à piloter par la valeur et les résultats plutôt que par le volume produit. EBM structure la mesure autour de quatre domaines de valeur, dont la valeur actuelle (ce que le produit apporte aujourd'hui) et la valeur non réalisée (l'écart qui reste à combler).

**philosophie** : Le cadre part d'un renversement : mesurer ce qui sort d'une organisation, en fonctionnalités livrées, ne dit pas ce qui sert. Une équipe peut produire beaucoup sans rien changer pour ses bénéficiaires. EBM demande donc de mesurer la valeur réellement délivrée et l'usage réel, pas l'activité.

D'où une conviction : les décisions se prennent sur des preuves de résultat, pas sur des promesses de production. Ce que le produit change dans la vie des utilisateurs, et l'écart qui reste, priment sur le décompte de ce qui a été construit.

**panel** : Scrum.org (guide Evidence-Based Management), dans la filiation de Ken Schwaber ; même famille d'idées que la lignée « résultats plutôt que production » portée par Josh Seiden.

**signatures** : ebm-1, ebm-2

**lecture** : Les deux mesures forment un couple présent et futur. L'<a href="#fiche=ebm-1">usage réel par fonctionnalité</a> dit ce que le produit apporte aujourd'hui, en confrontant l'utilisation effective aux attentes qui ont justifié sa construction ; l'<a href="#fiche=ebm-2">écart de satisfaction (valeur non réalisée)</a> dit ce qu'il reste à combler entre l'expérience souhaitée et l'expérience offerte. Livrer beaucoup, avec un usage en hausse, sans réduire l'écart qui compte, signale un effort mal dirigé.

**antiPatterns** : <span class="term-def" data-def="Piloter à l'output : mesurer et célébrer le volume livré (fonctionnalités, story points) comme si c'était de la valeur. EBM existe précisément pour rompre avec ce réflexe : ce qui sort n'est pas ce qui sert.">pilotage à la production</span>, <span class="term-def" data-def="Angle mort de la valeur non réalisée : ne suivre que la valeur actuelle, ce qui marche déjà, et perdre de vue l'écart qui reste. Une organisation aveugle à sa valeur non réalisée croit avoir réussi alors qu'elle a cessé de progresser vers ce qui compte.">angle mort de la valeur non réalisée</span>, et la mesure de valeur sans donnée d'usage réelle, qui ramène subrepticement au déclaratif.

**quandChoisir** : Excellent pour faire basculer une organisation de la production vers le résultat, et pour donner au niveau stratégique un contrepoids aux chiffres de volume.

**quandSeMefier** : Déçoit sans données d'usage et de satisfaction réelles à alimenter : c'est un cadre de mesure de la valeur, pas de la livraison, et il suppose une instrumentation (télémétrie, enquêtes) souvent absente. Il se complète d'indicateurs de flux et de qualité qui, eux, disent comment on produit.

**allerPlusLoin** : Evidence-Based Management Guide (Scrum.org) ; Outcomes over Output (Josh Seiden).

## kanban

**statut** : cadre

**origine** : Formalisé pour le travail intellectuel par David J. Anderson dans <span class="traduction">Kanban</span> (2010), en héritage direct du système Toyota et du Lean. Le principe : visualiser le flux de travail, limiter le nombre de tâches en cours et piloter le système par ce flux plutôt que par des dates. Daniel Vacanti en a prolongé la mesure par les distributions ; la loi de Little (John Little) en fournit le socle mathématique.

**philosophie** : Le cadre repose sur une loi simple et contre-intuitive : commencer moins pour finir plus. Trop de tâches ouvertes en même temps ralentit tout, par les changements de contexte et les files d'attente ; limiter l'encours fluidifie le débit.

D'où des mesures reliées entre elles : l'encours, la durée de cycle et le débit sont liés par la loi de Little et se pilotent ensemble. On ne fixe pas de dates, on rend le flux prévisible.

**panel** : David J. Anderson (Kanban, 2010) ; Daniel Vacanti (Actionable Agile Metrics) pour la mesure en distribution ; la loi de Little (John Little) en socle ; racines Lean et système Toyota (Ohno).

**signatures** : o7, o5, o6, p9

**lecture** : Les quatre mesures décrivent un même flux, reliées par la loi de Little. L'<a href="#fiche=o7">encours de travail (WIP)</a> est le levier : le limiter fait baisser la <a href="#fiche=o5">durée de cycle</a>, le temps qu'un item passe en cours, et stabilise le <a href="#fiche=o6">débit d'équipe</a>, ce qui franchit la ligne d'arrivée par période. Le <a href="#fiche=p9">délai bout-en-bout</a> donne la vue côté client, temps d'attente compris. On les lit en distribution, pas en moyenne, et jamais comme une note individuelle.

**antiPatterns** : <span class="term-def" data-def="Tableau sans limite d'encours : poser un tableau visuel mais ne jamais limiter le nombre de tâches en cours. C'est retirer au Kanban sa seule pratique agissante ; le tableau devient un décor, le flux ne s'améliore pas.">tableau sans limite d'encours</span>, <span class="term-def" data-def="Débit-cible individuel : fixer un nombre d'items à produire par personne. Le débit est une propriété du système, pas de l'individu ; en faire une cible personnelle pousse à découper artificiellement les tâches (effet Goodhart) et détruit la coopération.">débit-cible individuel</span>, et l'optimisation locale d'un poste qui n'est pas le goulot, sans effet sur le débit global (Goldratt).

**quandChoisir** : Excellent pour un flux de travail continu, en support, exploitation, maintenance ou évolutif, où l'on veut de la prévisibilité sans s'enfermer dans des dates ni des itérations fixes.

**quandSeMefier** : Déçoit comme mesure de valeur : un débit élevé d'items sans intérêt reste du gaspillage rapide. Ses chiffres ne valent que si la limite d'encours est réellement tenue ; sans cette discipline, durée de cycle et débit ne mesurent que le bruit d'un système engorgé.

**allerPlusLoin** : Kanban (David J. Anderson, 2010) ; Actionable Agile Metrics for Predictability (Vacanti) ; The Principles of Product Development Flow (Reinertsen).

## safe

**statut** : cadre

**origine** : Créé par Dean Leffingwell, le <span class="traduction">Scaled Agile Framework</span> (SAFe, 2011) applique les principes Lean-Agile à l'échelle de l'entreprise, quand des dizaines d'équipes doivent se coordonner. Il organise le travail en incréments de programme planifiés ensemble et structure trois à quatre niveaux, de l'équipe au portefeuille. Sa version 6 a intégré les métriques de flux du Flow Framework.

**philosophie** : Le cadre part d'un problème d'échelle : les pratiques agiles d'une équipe ne se transposent pas mécaniquement à cent. Il faut une cadence et une synchronisation communes pour aligner beaucoup d'équipes sans les figer, et une gouvernance de portefeuille qui arbitre les grands paris.

D'où des mesures orientées prévisibilité et risque aux niveaux programme et portefeuille : tient-on ce qu'on a promis, où sont les dérives, quelle prise de risque agrégée le portefeuille porte-t-il.

**panel** : Dean Leffingwell et Scaled Agile, Inc. (corpus SAFe) ; le Standish Group pour l'empirie sur la taille des initiatives ; filiation Lean-Agile et Flow Framework (Kersten), intégré en version 6.

**signatures** : p10, p1, t6, t7

**lecture** : Les quatre mesures se lisent aux niveaux programme et portefeuille. La <a href="#fiche=p10">feuille de route engagée vs réalisée</a> dit si le programme tient ses promesses ; le <a href="#fiche=p1">taux d'avancement des jalons</a> dit s'il progresse selon le plan ; le <a href="#fiche=t6">taux d'initiatives en dérive critique</a> déclenche l'arbitrage sur celles qui décrochent ; le <a href="#fiche=t7">profil de taille des initiatives</a> montre la prise de risque agrégée, les grandes initiatives échouant statistiquement plus souvent (Standish Group). Ensemble, elles pilotent la tenue des engagements à grande échelle.

**antiPatterns** : <span class="term-def" data-def="Théâtre SAFe : dérouler les rituels et les niveaux du cadre (planification d'incrément, cérémonies, rôles) sans l'agilité qu'ils sont censés porter. La forme est respectée, la capacité d'adaptation reste nulle ; le cadre devient une bureaucratie de plus.">théâtre SAFe</span>, <span class="term-def" data-def="Imposition descendante : déployer SAFe par le haut comme un standard obligatoire, sans adhésion des équipes. Le cadre prescrit beaucoup ; imposé sans dialogue, il produit de la conformité de façade, pas de l'engagement.">imposition descendante</span>, et la métrique de conformité : suivre l'application des rituels plutôt que les résultats, ce qui récompense la forme au lieu de la valeur.

**quandChoisir** : Excellent pour une grande organisation qui doit coordonner de nombreuses équipes sur une cadence partagée et arbitrer un portefeuille d'initiatives lourdes.

**quandSeMefier** : Déçoit à petite échelle et là où l'agilité vient de l'autonomie : SAFe est lourd, prescriptif, et sa richesse même peut se figer en bureaucratie. Plusieurs critiques y voient un retour du pilotage descendant sous un vocabulaire agile ; ses indicateurs perdent tout sens s'ils mesurent la conformité au cadre plutôt que la valeur livrée.

**allerPlusLoin** : Le corpus SAFe (Scaled Agile) ; Agile Software Requirements (Leffingwell) ; Project to Product (Kersten) pour le volet flux.


## lean

**statut** : cadre

**origine** : Deux traditions fondues en une. Le Lean naît du <span class="traduction">système de production Toyota</span> (Taiichi Ohno, après-guerre) : produire au plus juste, éliminer le gaspillage, améliorer en continu, avec un respect égal pour les personnes qui font le travail. Le Six Sigma naît chez Motorola dans les années 1980 : réduire la variabilité des processus par la statistique jusqu'à un niveau de défauts quasi nul. Le Lean Six Sigma les combine, vitesse du flux et maîtrise de la qualité.

**philosophie** : Le cadre repose sur deux convictions jumelles. La première, côté flux : la valeur avance quand on traque le gaspillage, l'attente et la reprise, pas quand on pousse les gens à aller plus vite. La seconde, côté qualité : ce qui coûte cher n'est pas de bien faire, c'est de mal faire et de devoir corriger ensuite ; la variabilité est l'ennemie.

D'où une double mesure : on regarde à la fois la fluidité (combien de temps un travail met à traverser, combien passe du premier coup) et la variabilité (combien de défauts, à quel coût). Et une règle de Deming en surplomb : la grande majorité des défauts vient du système, pas des personnes.

**panel** : Taiichi Ohno (système de production Toyota) ; W. Edwards Deming (variation, qualité, causes systémiques) ; la tradition Six Sigma née chez Motorola dans les années 1980.

**signatures** : lss-1, af-op2, o5, s11, lss-2

**lecture** : Les cinq mesures tiennent les deux pôles du cadre. Côté qualité : le <a href="#fiche=lss-1">premier passage conforme</a> dit ce qui passe sans retouche, le <a href="#fiche=af-op2">niveau sigma (DPMO)</a> mesure la variabilité du processus, le <a href="#fiche=s11">coût de la non-qualité</a> en donne le prix. Côté flux et culture : la <a href="#fiche=o5">durée de cycle</a> dit la fluidité, le <a href="#fiche=lss-2">taux de signalement volontaire (andon)</a> dit si l'équipe ose arrêter la chaîne pour signaler un problème, cœur du pilier humain de Toyota. Un flux rapide qui cache ses défauts, ou une qualité obtenue par la peur d'arrêter, trahit le cadre.

**antiPatterns** : <span class="term-def" data-def="Lean tourné contre les personnes : traiter les opérateurs comme le gaspillage à éliminer, une réduction d'effectifs présentée comme du Lean. C'est la trahison la plus courante du système Toyota, dont le second pilier est le respect des personnes.">Lean contre les personnes</span>, <span class="term-def" data-def="Optimisation locale : améliorer un poste qui n'est pas le goulot. Le débit global reste inchangé, l'effort est gaspillé, du stock s'accumule avant le goulot (Goldratt).">optimisation locale</span>, et la qualité obtenue par la peur : faire monter les chiffres en punissant ceux qui signalent des problèmes, ce qui tue l'andon et donc l'amélioration.

**quandChoisir** : Excellent pour un processus répétable dont on veut réduire les délais et les défauts en même temps : c'est le cadre le plus outillé pour relier vitesse et qualité, en production comme dans les services.

**quandSeMefier** : Déçoit pour un travail de découverte ou de création, non répétable, où la variabilité est la matière première et non l'ennemie : appliquer la réduction de variabilité à de la recherche ou du design étouffe l'exploration. Et mal compris, son vocabulaire de gaspillage se retourne trop facilement contre les personnes.

**allerPlusLoin** : Le Système de production Toyota (Ohno) ; Lean Thinking (Womack, Jones) ; Out of the Crisis (Deming).

## mbo

**statut** : cadre

**origine** : Formulé par Peter Drucker dans <span class="traduction">The Practice of Management</span> (1954). La direction par objectifs propose que chaque contributeur connaisse les objectifs de son unité et de l'entreprise, et fixe les siens en cohérence, plutôt que de recevoir des consignes. L'idée a essaimé dans tout le management d'après-guerre ; les OKR en sont une descendance directe.

**philosophie** : Le cadre part d'une idée de Drucker : on ne dirige pas des gens, on dirige vers des objectifs, et un objectif n'a de valeur que rattaché à la mission de l'organisation. Mesurer ce qui compte suppose donc d'abord de savoir ce qui compte, c'est-à-dire de relier chaque objectif à la raison d'être.

D'où une exigence double : les objectifs doivent être clairs et mesurables, et ils doivent être revus, dans leur avancement comme dans leur pertinence. Drucker parle de direction par objectifs et autocontrôle : l'objectif se construit avec celui qui le portera, pas contre lui.

**panel** : Peter Drucker (The Practice of Management, 1954), qui formule la direction par objectifs et l'autocontrôle ; filiation directe vers les OKR de John Doerr.

**signatures** : mbo-1, mbo-2, mbo-3, mbo-9

**lecture** : Les quatre mesures suivent la chaîne de la direction par objectifs. La <a href="#fiche=mbo-1">part des objectifs rattachés à la mission</a> vérifie l'ancrage, cœur de Drucker ; la <a href="#fiche=mbo-2">clarté et mesurabilité des objectifs</a> vérifie qu'ils sont pilotables ; la <a href="#fiche=mbo-3">fréquence des points objectifs manager-collaborateur</a> vérifie l'autocontrôle par le dialogue ; la <a href="#fiche=mbo-9">régularité du réexamen stratégique</a> vérifie qu'on interroge les objectifs eux-mêmes, pas seulement leur avancement. Un objectif mesurable mais détaché de la mission, ou jamais réexaminé, manque l'essentiel.

**antiPatterns** : <span class="term-def" data-def="Objectifs déconnectés de la mission : fixer des objectifs mesurables mais sans lien explicite avec la raison d'être de l'organisation. On pilote alors une activité qui tourne sans servir ; Drucker en fait la faute première.">objectifs hors mission</span>, <span class="term-def" data-def="Objectif imposé sans dialogue : descendre les objectifs par le haut sans construction avec ceux qui les portent. Drucker y voit l'inverse de l'autocontrôle : l'engagement meurt, il reste de la conformité.">objectif imposé</span>, et le pilotage de l'avancement sans réexamen de la pertinence : suivre si on atteint les objectifs sans jamais demander s'ils sont encore les bons.

**quandChoisir** : Excellent pour aligner une organisation sur sa mission et donner du sens aux objectifs individuels : c'est le socle historique dont les OKR et bien des systèmes d'objectifs descendent.

**quandSeMefier** : Déçoit s'il devient un rituel administratif de fixation annuelle figée : mal pratiqué, il produit des objectifs posés en début d'année et jamais revus, ou des cascades imposées sans dialogue. Il mesure l'alignement et la clarté, pas la valeur livrée ni la qualité d'exécution.

**allerPlusLoin** : The Practice of Management (Drucker, 1954) ; Measure What Matters (Doerr) pour la descendance OKR.

## meta

**statut** : cadre

**origine** : Ce cadre ne vient pas d'un auteur unique mais d'une préoccupation partagée : gouverner le système de mesure lui-même. Peter Drucker rappelait de mesurer ce qui compte ; Douglas Hubbard (<span class="traduction">How to Measure Anything</span>) a montré que presque tout est mesurable, et à quel coût ; Jerry Muller (<span class="traduction">The Tyranny of Metrics</span>) a documenté les ravages des indicateurs mal employés ; W. Edwards Deming et Donald Wheeler ont posé les bases d'une lecture statistique saine des chiffres.

**philosophie** : Le cadre part d'un constat : une organisation accumule des indicateurs comme elle accumule des objets, sans jamais se demander s'ils servent, s'ils sont lus, s'ils nuisent. La mesure a un coût, une date de péremption et un pouvoir de déformer les comportements (effet Goodhart). Elle mérite donc d'être pilotée comme n'importe quel actif.

D'où une mesure au second degré : au lieu de mesurer le travail, on mesure la qualité du dispositif de mesure. Couvre-t-il les décisions importantes ? Les indicateurs sont-ils réellement utilisés ? Sait-on retirer ceux qui dérivent ?

**panel** : Peter Drucker (mesurer ce qui compte) ; Douglas Hubbard (How to Measure Anything) ; Jerry Muller (The Tyranny of Metrics) ; W. Edwards Deming et Donald Wheeler pour la lecture statistique.

**signatures** : gm-1, gm-2, gm-7

**lecture** : Les trois mesures interrogent le dispositif de bout en bout. La <a href="#fiche=gm-1">couverture du système de mesure</a> demande si les décisions qui comptent sont éclairées par au moins un indicateur ; le <a href="#fiche=gm-2">taux d'usage réel des indicateurs</a> demande si ces indicateurs pèsent vraiment dans les décisions ou dorment dans un tableau de bord ; les <a href="#fiche=gm-7">indicateurs corrigés ou retirés après dérive</a> demandent si l'organisation sait désarmer un indicateur devenu pervers. Ensemble : mesure-t-on ce qu'il faut, s'en sert-on, sait-on s'en défaire.

**antiPatterns** : <span class="term-def" data-def="Prolifération d'indicateurs : accumuler les mesures sans jamais en retirer. Le tableau de bord gonfle, l'attention se dilue, plus personne ne sait lesquels comptent ; mesurer beaucoup n'est pas mesurer bien.">prolifération d'indicateurs</span>, <span class="term-def" data-def="Tableau de bord de vanité : afficher des indicateurs qui rassurent mais n'orientent aucune décision. Ils occupent l'espace et le temps de lecture sans jamais changer une action.">tableau de bord de vanité</span>, et l'aveuglement à l'effet Goodhart : conserver un indicateur devenu une cible manipulée sans jamais constater qu'il a cessé de dire le réel.

**quandChoisir** : Excellent pour une organisation déjà riche en indicateurs qui veut faire le tri, réduire le bruit et se prémunir des effets pervers : c'est le cadre qui met de l'ordre dans les autres.

**quandSeMefier** : Déçoit là où il n'y a presque rien à gouverner : une équipe qui débute sa démarche de mesure a besoin de premiers indicateurs utiles, pas d'une méta-couche qui la surveille. Mal dosé, il ajoute lui-même de la mesure là où il prétend en retirer.

**allerPlusLoin** : How to Measure Anything (Hubbard) ; The Tyranny of Metrics (Muller) ; The Practice of Management (Drucker).
