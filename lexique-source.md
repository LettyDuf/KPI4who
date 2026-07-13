# Source du Lexique

Fichier source du Lexique (chantier 21). Matière éditoriale unique : le
générateur `outils/generer-lexique.js` (jalon D) la transformera en données pour
le module `CM.Lexique`. Aucune donnée du Lexique ne s'édite ailleurs que dans ce
fichier.

**Format d'une entrée.** Chaque entrée est un bloc ouvert par un titre de niveau
deux portant son `id` (slug technique, kebab-case sans accent). Les champs sont
des marqueurs en gras suivis de deux-points. La valeur d'un champ court tient
sur la ligne ; la valeur de `definition` et `exemple` peut courir sur plusieurs
paragraphes, jusqu'au marqueur de champ suivant. Champs : `terme` (libellé
affiché), `categorie` (cadre, indicateur, concept, anti-pattern ou auteur),
`definition`, `exemple`, `renvois` (ids séparés par des virgules), `origine`,
`antiPatternLie`, `ficheRef`. Seuls `terme`, `categorie` et `definition` sont
obligatoires. Un `renvois` peut pointer vers une entrée encore à rédiger tant
que le fichier n'est pas complet : la cohérence est vérifiée en fin de jalon B.

**Titres de niveau un.** Ils nomment les rayons et servent de repères de
lecture. Le générateur s'appuie sur le champ `categorie` de chaque entrée, pas
sur eux.

État de remplissage : rayon anti-patterns complet (jalon B.1) : 49 entrées ; rayon cadres et méthodes complet (jalon B.2) : 19 entrées. Rayons indicateurs, concepts et auteurs à venir (jalons B.3 à B.5).


# Anti-patterns et pièges de mesure

## acharnement-therapeutique

**terme** : acharnement thérapeutique

**categorie** : anti-pattern

**definition** :

Refus d'arrêter une initiative qui dérive gravement parce qu'elle est devenue trop visible, trop engageante pour son commanditaire, ou trop avancée pour qu'on accepte de la perdre. C'est le biais du coût irrécupérable : l'argent et l'effort déjà dépensés ne reviendront pas, quelle que soit la décision, donc ils ne devraient pas peser sur le choix de continuer ou d'arrêter.

Le Lean Portfolio Management pose la question qui tranche : si cette initiative se présentait aujourd'hui, la lancerait-on ? Si la réponse est non, ce qui a déjà été dépensé ne doit pas dicter la suite.

**exemple** :

Un projet en difficulté depuis un an est maintenu parce que « on a déjà trop investi pour s'arrêter maintenant ».

**renvois** : lpm


## adoption-de-facade

**terme** : adoption de façade

**categorie** : anti-pattern

**definition** :

Exécuter un nouveau geste seulement lorsqu'on est observé, puis revenir à l'ancienne pratique dès que l'attention se relâche. Le taux d'adoption mesuré monte, mais la pratique réelle ne change pas. C'est une réaction fréquente à une mesure vécue comme un contrôle plutôt que comme une aide.

**exemple** :

Une équipe applique la revue de code tant que le coach est présent, puis cesse une fois qu'il a quitté la salle.

**renvois** : adoption-declaree, mesure-du-declaratif


## adoption-declaree

**terme** : adoption déclarée

**categorie** : anti-pattern

**definition** :

Compter une équipe comme ayant adopté une pratique sur la foi d'une déclaration en comité, sans aucun constat de terrain. La couverture affichée progresse sans que la pratique soit réellement installée. L'adoption ne se déclare pas, elle s'observe.

**exemple** :

En comité de pilotage, huit équipes sur dix se disent passées à la nouvelle méthode ; aucune visite de terrain ne le vérifie.

**renvois** : adoption-de-facade, mesure-du-declaratif


## alignement-de-facade

**terme** : alignement de façade

**categorie** : anti-pattern

**definition** :

Rattacher après coup chaque objectif à la mission par un simple habillage de vocabulaire, au lieu de renoncer pour de bon à ceux qui ne la servent pas. L'alignement devient un exercice de réécriture, pas un exercice de choix.

**exemple** :

Un objectif d'équipe sans lien avec la stratégie est reformulé avec les mots de la mission pour cocher la case alignement.

**renvois** : rattachement-cosmetique


## capteur-en-dialecte-local

**terme** : capteur en dialecte local

**categorie** : anti-pattern

**definition** :

Chaque équipe conserve sa propre définition d'une mesure, illisible pour les autres. Les chiffres pris séparément ont du sens, mais ils ne s'agrègent plus au niveau du programme : on additionne des grandeurs qui ne désignent pas la même chose.

**exemple** :

Trois équipes mesurent toutes le « lead time », mais l'une compte à partir de l'idée, une autre du début du développement, la troisième de la mise en test.

**renvois** : capteur-pose-apres-coup


## capteur-pose-apres-coup

**terme** : capteur posé après coup

**categorie** : anti-pattern

**definition** :

Choisir l'indicateur de mesure une fois l'objectif déjà bien avancé, en retenant celui qui flatte le résultat obtenu. Le capteur perd sa fonction de témoin honnête : il ne mesure plus la réussite, il la met en scène.

**exemple** :

À la fin d'un trimestre, on retient comme indicateur de succès celui, parmi quatre candidats, qui affiche le meilleur chiffre.

**renvois** : capteur-en-dialecte-local


## cascade-unilaterale-descendante

**terme** : cascade unilatérale descendante

**categorie** : anti-pattern

**definition** :

L'objectif arrive déjà entièrement ficelé depuis le haut et devient une injonction. Le lien à la mission existe sur le papier, mais le collaborateur ne l'a pas construit : il ne se l'approprie pas, donc ne le porte pas vraiment. Une cascade vivante se discute dans les deux sens.

**exemple** :

Les objectifs annuels sont communiqués par note de service, sans aucun échange avec les équipes qui devront les tenir.

**renvois** : catchball


## cible-a-zero

**terme** : cible à zéro

**categorie** : anti-pattern

**definition** :

Fixer une cible à zéro pour un indicateur qui a besoin d'une fourchette saine. Un taux de rotation du personnel à zéro garantit un système sclérosé : aucun renouvellement de compétences, aucune mobilité, aucune énergie nouvelle. Pour beaucoup d'indicateurs, la bonne valeur n'est pas l'extrême mais une plage, variable selon le secteur.

**exemple** :

Une direction se fixe « zéro départ » comme objectif de fidélisation, et finit par retenir des personnes désengagées.

**renvois** : effet-porte-tournante-inverse


## classement-des-equipes

**terme** : classement des équipes

**categorie** : anti-pattern

**definition** :

Transformer un score comparé entre plusieurs équipes en palmarès. Les équipes classées en bas se braquent ou maquillent leurs réponses, et l'entraide entre équipes disparaît : aider une autre équipe revient alors à se desservir. La comparaison détruit ce qu'elle prétend stimuler.

**exemple** :

Le tableau de bord trimestriel classe les douze équipes de la première à la douzième place sur leur score de qualité.

**renvois** : scoring-nominatif-par-equipe, kpi-individuel


## concentration-cachee

**terme** : concentration cachée

**categorie** : anti-pattern

**definition** :

Deux ou trois fournisseurs en apparence distincts qui dépendent tous, en amont, du même sous-traitant critique. La diversification visible masque une concentration réelle du risque. Elle ne se détecte qu'en remontant la chaîne d'approvisionnement sur deux ou trois niveaux.

**exemple** :

Trois hébergeurs concurrents s'appuient en réalité sur le même opérateur de centre de données.

**renvois** : diversification-cosmetique


## confusion-entre-communication-et-comprehension

**terme** : confusion entre communication et compréhension

**categorie** : anti-pattern

**definition** :

Compter les messages envoyés ou la présence aux réunions comme une preuve que l'information est comprise. La conscience d'un changement se mesure par ce que les gens ont réellement compris et peuvent redire, pas par ce qu'on leur a diffusé. Diffuser n'est pas faire comprendre.

**exemple** :

Un plan de transformation est jugé connu de tous parce qu'un courriel a été adressé à l'ensemble du personnel.

**renvois** : mesure-du-declaratif


## cynisme-strategique

**terme** : cynisme stratégique

**categorie** : anti-pattern

**definition** :

État où les équipes cessent de croire les déclarations stratégiques, parce qu'elles ont appris par expérience que les arbitrages réels se jouent ailleurs. Le symptôme est net : les équipes ne consultent plus les documents de stratégie pour orienter leurs décisions, elles observent où vont les promotions, les budgets validés et le temps des dirigeants.

C'est un signal avancé d'érosion de la confiance dans l'organisation : la stratégie continue d'être publiée, mais elle a cessé d'orienter quoi que ce soit.

**exemple** :

Personne ne rouvre le document de stratégie ; chacun sait que ce qui compte vraiment se lit dans les budgets accordés.

**renvois** : pasteque-organisationnelle, reecriture-retrospective-de-la-strategie


## declassement-cosmetique

**terme** : déclassement cosmétique

**categorie** : anti-pattern

**definition** :

Un comité qui fait passer une initiative du rouge à l'orange sans rien changer au fond : ni le périmètre, ni le budget, ni le plan d'action. La métrique de statut s'améliore, la dérive réelle persiste. C'est un effet Goodhart caractéristique : on agit sur l'indicateur de couleur au lieu d'agir sur le problème qu'il signale.

**exemple** :

En revue de portefeuille, un projet en retard passe d'un statut rouge à orange parce que « orange, ça passe mieux auprès du comité de direction ».

**renvois** : effet-goodhart, diversification-cosmetique, rattachement-cosmetique


## decoupage-factice

**terme** : découpage factice

**categorie** : anti-pattern

**definition** :

Scinder une méga-initiative en deux ou trois sous-projets qui s'enchaînent mécaniquement et dépendent les uns des autres, pour qu'apparaissent au tableau plusieurs initiatives moyennes au lieu d'une seule grosse. Le chiffre de profil de risque s'améliore, le risque réel reste identique.

À distinguer du vrai fractionnement : celui-ci crée des options, car chaque tronçon livre une valeur autonome et la décision de continuer peut être réexaminée à chaque étape.

**exemple** :

Un programme de dix-huit mois est présenté comme trois projets de six mois qui, pris séparément, ne livrent rien d'utilisable.

**renvois** : effet-goodhart, splitting-d-initiatives, lpm


## definition-de-fini-ajustee-a-la-baisse

**terme** : définition de « fini » ajustée à la baisse

**categorie** : anti-pattern

**definition** :

Renégocier à la baisse, en fin de livraison, ce que « fini » veut dire, pour afficher un taux d'acceptation élevé. C'est un effet Goodhart classique : la métrique étant devenue l'objectif, on optimise l'indicateur au lieu d'élever réellement la qualité visée.

**exemple** :

À deux jours de la livraison, les critères d'acceptation jugés « secondaires » sont retirés de la définition de fini pour que le lot passe à 100 %.

**renvois** : effet-goodhart, relachement-des-criteres-d-acceptation


## deploy-theater

**terme** : deploy theater

**categorie** : anti-pattern

**definition** :

Multiplier les déploiements vides ou mineurs pour faire monter la fréquence de déploiement, sans aucun impact réel sur la valeur livrée. La métrique grimpe, le flux de valeur ne bouge pas.

**exemple** :

Une équipe découpe une mise en production en douze déploiements techniques sans contenu fonctionnel, pour améliorer son score de fréquence.

**renvois** : effet-goodhart, phantom-delivery

**origine** : vocabulaire Lean et DevOps.


## diversification-cosmetique

**terme** : diversification cosmétique

**categorie** : anti-pattern

**definition** :

Multiplier les petits fournisseurs secondaires pour faire baisser le pourcentage d'exposition au fournisseur principal, sans réduire réellement la dépendance. Le ratio s'améliore, la fragilité demeure.

**exemple** :

On ajoute trois fournisseurs marginaux pour faire passer le fournisseur dominant sous la barre des 50 %, alors qu'il reste indispensable.

**renvois** : concentration-cachee, declassement-cosmetique, rattachement-cosmetique


## effet-porte-tournante-inverse

**terme** : effet porte tournante inversé

**categorie** : anti-pattern

**definition** :

Un taux de rotation du personnel très faible obtenu par rétention malsaine (plafond de verre, peur, dépendance) plutôt que par engagement. Un taux à 2 % peut signaler que plus personne n'ose partir. C'est une alarme, pas un succès.

**exemple** :

Une direction se félicite d'un turnover quasi nul, alors que les entretiens révèlent que les gens restent faute de mieux.

**renvois** : cible-a-zero


## faux-precis

**terme** : faux précis

**categorie** : anti-pattern

**definition** :

Couvrir un objectif vague d'un chiffre arbitraire pour cocher la case « mesurable ». La précision est apparente : le nombre est net, mais l'objectif qu'il prétend mesurer reste flou.

**exemple** :

« Améliorer la satisfaction client de 7 % » est inscrit dans un plan, sans que personne ne sache d'où sort le chiffre 7 ni ce qu'on mesure exactement.

**renvois** : capteur-pose-apres-coup, resultat-cle-decoratif


## glissement-de-la-date-de-mise-en-service

**terme** : glissement de la date de mise en service

**categorie** : anti-pattern

**definition** :

Reporter la date officielle de mise en service jusqu'à stabilisation complète, de sorte que le compteur de reprises ne démarre jamais. On affiche un taux de reprise nul, au prix d'une mise en service fantôme qui ne reflète plus la réalité d'usage.

**exemple** :

Un produit est utilisé en production depuis un mois, mais sa date officielle de mise en service est sans cesse repoussée pour ne pas comptabiliser les correctifs.

**renvois** : phantom-delivery, requalifier-les-reprises


## kpi-individuel

**terme** : KPI individuel

**categorie** : anti-pattern

**definition** :

Indicateur utilisé pour évaluer la performance personnelle d'un collaborateur, ou d'un service pris isolément. Appliquer à un individu un indicateur qui mesure en réalité un système (cycle de vente, lead time, taux de défauts, délai de première réponse) crée un double problème.

Un problème statistique : selon Deming, l'essentiel de la variation d'un résultat vient du système, pas des personnes qui y travaillent. Et un problème éthique : la mesure devient un instrument de peur. Ces indicateurs se lisent au niveau du système qui les produit, jamais de la personne.

**exemple** :

Le délai de traitement des tickets est inscrit dans l'entretien annuel d'un agent, alors qu'il dépend surtout du volume entrant et de la qualité du tri en amont.

**renvois** : scoring-individuel, classement-des-equipes, effet-goodhart


## liste-strategique-fourre-tout

**terme** : liste stratégique fourre-tout

**categorie** : anti-pattern

**definition** :

Empiler les objectifs stratégiques pour ne mécontenter personne. La concentration disparaît : faute de choix, la cascade fait descendre vers le terrain une ambition impossible à tenir.

**exemple** :

Le plan stratégique annuel affiche vingt-trois priorités, toutes déclarées de premier rang.

**renvois** : alignement-de-facade


## mesure-du-declaratif

**terme** : mesure du déclaratif

**categorie** : anti-pattern

**definition** :

Prendre une réponse de sondage ou une affirmation en réunion pour une preuve d'adoption. L'adoption se constate par des actes observables sur le terrain, jamais par des déclarations.

**exemple** :

Une transformation est jugée « adoptée à 80 % » sur la foi d'un sondage interne, sans aucune observation de la pratique réelle.

**renvois** : adoption-declaree, confusion-entre-communication-et-comprehension


## mesure-trop-precoce

**terme** : mesure trop précoce

**categorie** : anti-pattern

**definition** :

Lire un indicateur d'ancrage juste après la fin d'un projet de changement. L'érosion d'un changement non ancré prend des mois : une mesure prise trop tôt rassure à tort, parce que la rechute n'a pas encore eu le temps de se produire.

**exemple** :

Trois semaines après la clôture d'un projet, on conclut que la nouvelle pratique tient, avant que la pression du quotidien ne l'ait éprouvée.

**renvois** : pilote-pris-pour-diffusion


## moyenne-au-lieu-de-mediane-et-p85

**terme** : moyenne au lieu de médiane et P85

**categorie** : anti-pattern

**definition** :

Résumer une distribution asymétrique par sa seule moyenne masque la réalité. Les délais de cycle suivent typiquement une loi très étalée, avec une longue traîne de cas lents. La médiane (la valeur du cas central) et le 85e percentile (la valeur sous laquelle tombent 85 % des cas) en disent beaucoup plus que la moyenne, qu'une poignée de cas extrêmes suffit à fausser.

**exemple** :

Un délai de livraison « moyen de 9 jours » recouvre une médiane à 4 jours et quelques dossiers à 60 jours qui tirent tout vers le haut.

**renvois** : moyenne-trompeuse, pilotage-a-la-moyenne, rassurance-par-la-moyenne

**origine** : vocabulaire de Daniel Vacanti, Actionable Agile Metrics.


## moyenne-trompeuse

**terme** : moyenne trompeuse

**categorie** : anti-pattern

**definition** :

Restituer un indicateur par une moyenne unique masque la distribution réelle. Une efficacité de flux à 30 % en moyenne peut recouvrir 20 % d'éléments à 60 %, faciles et bien outillés, et 80 % d'éléments à 22 %, bloqués dans des files d'attente. La décision à prendre n'est pas la même selon le cas : c'est la dispersion qu'il faut regarder, pas le point moyen.

**exemple** :

Un tableau de bord affiche « 30 % » sans montrer que la moitié des dossiers sont en réalité à l'arrêt.

**renvois** : moyenne-au-lieu-de-mediane-et-p85, pilotage-a-la-moyenne, rassurance-par-la-moyenne


## objectifs-graves-pour-l-annee

**terme** : objectifs gravés pour l'année

**categorie** : anti-pattern

**definition** :

Fixer les objectifs stratégiques en début d'année et ne plus jamais les rouvrir. Quand le contexte change, la cascade continue de faire descendre vers le terrain une ambition que les faits ont rendue fausse.

**exemple** :

Les objectifs votés en janvier restent le cap officiel en septembre, alors que le marché s'est retourné au printemps.

**renvois** : cascade-unilaterale-descendante


## optimisation-locale

**terme** : optimisation locale

**categorie** : anti-pattern

**definition** :

Investir de l'effort d'amélioration sur un segment qui n'est pas le goulot d'étranglement du système. Le débit global reste limité par le goulot : l'effort est gaspillé, et il peut même aggraver la situation en accumulant du stock en amont du goulot. La règle, chez Goldratt, est d'identifier le goulot avant d'optimiser quoi que ce soit.

Au niveau d'une organisation, le même piège prend une autre forme : chaque équipe atteint ses propres chiffres pendant que le programme, lui, n'avance pas.

**exemple** :

On accélère l'équipe de développement alors que le goulot réel est la validation juridique en aval ; le stock de fonctionnalités en attente ne fait que grossir.

**renvois** : theorie-des-contraintes, decoupage-factice

**origine** : Goldratt, Théorie des Contraintes.


## pasteque-organisationnelle

**terme** : pastèque organisationnelle

**categorie** : anti-pattern

**definition** :

Une organisation verte dehors, rouge dedans. Les indicateurs de surface (déclarations stratégiques, scores d'engagement, communication interne) sont au vert ; les indicateurs de profondeur (allocations réelles de ressources, comportements observables, vécu des équipes) sont au rouge.

La pastèque organisationnelle est le résultat naturel d'un système d'indicateurs qui ne mesure jamais l'écart entre ce qui est déclaré et ce qui est exécuté.

**exemple** :

Tous les voyants du comité de direction sont au vert, pendant que le terrain accumule retards, désengagement et contournements.

**renvois** : cynisme-strategique, reecriture-retrospective-de-la-strategie, mesure-du-declaratif


## phantom-delivery

**terme** : phantom delivery

**categorie** : anti-pattern

**definition** :

Déclarer une initiative livrée alors qu'elle est en réalité derrière un drapeau de fonctionnalité (feature flag) dormant, en attente de validation utilisateur, ou tout simplement non adoptée. Cela permet de couper artificiellement la durée mesurée du délai de livraison : le chronomètre s'arrête, mais la valeur n'est pas arrivée à l'utilisateur.

**exemple** :

Une fonctionnalité est marquée « livrée » dans l'outil de suivi, alors que son drapeau d'activation n'a jamais été allumé en production.

**renvois** : deploy-theater, glissement-de-la-date-de-mise-en-service, effet-goodhart

**origine** : vocabulaire Lean et Flow Framework (Kersten).


## pilotage-a-la-moyenne

**terme** : pilotage à la moyenne

**categorie** : anti-pattern

**definition** :

Ne regarder que le score global d'un ensemble d'équipes et ignorer la dispersion. Une moyenne correcte peut masquer une équipe pivot en rejet total, qui décidera pourtant du sort du programme entier.

**exemple** :

Le score de transformation moyen est rassurant, mais l'équipe qui tient l'application centrale n'a, elle, rien adopté.

**renvois** : moyenne-trompeuse, rassurance-par-la-moyenne


## pilote-pris-pour-diffusion

**terme** : pilote pris pour diffusion

**categorie** : anti-pattern

**definition** :

Conclure qu'un changement a réussi parce que les équipes pilotes le pratiquent, alors que la grande majorité des équipes n'a rien changé. Le pilote prouve que la pratique est possible, pas qu'elle est diffusée.

**exemple** :

Deux équipes volontaires ont adopté la nouvelle méthode ; on annonce la transformation réussie pour les trente équipes de l'organisation.

**renvois** : mesure-trop-precoce, adoption-declaree


## point-de-controle-deguise

**terme** : point de contrôle déguisé

**categorie** : anti-pattern

**definition** :

Tenir le rendez-vous prévu autour des objectifs, mais en faire un examen descendant. La fréquence est respectée sur le papier ; le dialogue d'ajustement, où le collaborateur signale les obstacles et se pilote lui-même, n'a pas lieu.

**exemple** :

Le point mensuel sur les objectifs se résume à un contrôle d'avancement ligne par ligne, sans aucune place pour les difficultés rencontrées.

**renvois** : cascade-unilaterale-descendante


## rassurance-par-la-moyenne

**terme** : rassurance par la moyenne

**categorie** : anti-pattern

**definition** :

Communiquer un score global, par exemple 3,5 sur 5, sans le détail par fonction ou par segment. Un 3,5 peut cacher une fonction à 1,5 qui est précisément le point faible le plus exposé. Une chaîne ne vaut que ce que vaut son maillon le plus faible.

**exemple** :

Le score de maturité « 3,5 / 5 » est présenté au comité, sans dire que la sécurité, elle, est à 1,5.

**renvois** : moyenne-trompeuse, pilotage-a-la-moyenne, moyenne-au-lieu-de-mediane-et-p85


## rattachement-cosmetique

**terme** : rattachement cosmétique

**categorie** : anti-pattern

**definition** :

Relier après coup chaque objectif à la mission par un simple habillage de vocabulaire, sans rien changer au fond. Le taux d'objectifs « alignés » monte, la cascade reste fictive.

**exemple** :

Un objectif d'équipe inchangé est réécrit avec les mots de la stratégie pour apparaître rattaché à la mission.

**renvois** : alignement-de-facade, declassement-cosmetique, diversification-cosmetique


## reecriture-retrospective-de-la-strategie

**terme** : réécriture rétrospective de la stratégie

**categorie** : anti-pattern

**definition** :

Réécrire la stratégie après coup pour que ses déclarations collent à ce qui a réellement été exécuté. C'est une forme insidieuse d'effet Goodhart appliqué à la stratégie elle-même : au lieu d'aligner l'exécution sur la stratégie, on aligne la stratégie sur l'exécution.

L'écart entre les deux tombe à zéro, et l'organisation perd toute capacité de pilotage stratégique réel : plus rien ne tient lieu de cap.

**exemple** :

En fin d'année, le document de stratégie est discrètement reformulé pour que les projets effectivement menés apparaissent comme ce qui était prévu.

**renvois** : effet-goodhart, pasteque-organisationnelle, cynisme-strategique


## regression-traitee-en-faute

**terme** : régression traitée en faute

**categorie** : anti-pattern

**definition** :

Traiter chaque rechute d'un changement comme une erreur individuelle à sanctionner. Les gens cachent alors les régressions, l'indicateur d'ancrage devient aveugle, et le changement ne progresse plus parce qu'on ne voit plus où il décroche.

**exemple** :

Une équipe revenue à l'ancienne pratique est réprimandée ; les autres équipes apprennent à ne plus signaler leurs propres reculs.

**renvois** : retour-vu-comme-faute-d-equipe


## relachement-des-criteres-d-acceptation

**terme** : relâchement des critères d'acceptation

**categorie** : anti-pattern

**definition** :

Renégocier à la baisse la définition de « passe au premier coup » pour gonfler la mesure. Effet Goodhart classique : on abaisse les standards de revue au lieu d'améliorer la prévention en amont.

**exemple** :

Pour afficher un meilleur taux de conformité, on retire de la liste de contrôle les points qui échouaient le plus souvent.

**renvois** : effet-goodhart, definition-de-fini-ajustee-a-la-baisse


## requalification-des-demandes-en-precisions

**terme** : requalification des demandes en « précisions »

**categorie** : anti-pattern

**definition** :

Requalifier des demandes de changement en « précisions » ou « clarifications » pour qu'elles ne soient pas comptées dans la métrique. Effet Goodhart classique : le chiffre baisse, le phénomène réel ne change pas, il y a simplement moins de demandes déclarées.

**exemple** :

Une vraie évolution de périmètre est enregistrée comme « clarification du besoin », afin de ne pas alourdir le compteur de demandes de changement.

**renvois** : effet-goodhart, requalifier-les-reprises


## requalifier-les-reprises

**terme** : requalifier les reprises

**categorie** : anti-pattern

**definition** :

Déclarer un correctif majeur comme « évolution mineure » ou « support standard » pour qu'il sorte du comptage des reprises. Anti-pattern typique dès que la métrique de reprise devient un objectif imposé plutôt qu'un indicateur de santé.

**exemple** :

Une correction lourde après mise en service est classée « maintenance courante » pour ne pas faire grimper le taux de reprise.

**renvois** : requalification-des-demandes-en-precisions, glissement-de-la-date-de-mise-en-service


## resultat-cle-decoratif

**terme** : résultat clé décoratif

**categorie** : anti-pattern

**definition** :

Poser un résultat clé qui ne mesure pas vraiment l'objectif visé, juste pour cocher la case « mesurable ». La couverture en résultats clés monte, l'ambition réelle reste floue.

**exemple** :

Un objectif ambitieux est assorti d'un résultat clé du type « organiser quatre ateliers », qui mesure une activité, pas un effet.

**renvois** : faux-precis


## retour-vu-comme-faute-d-equipe

**terme** : retour vu comme faute d'équipe

**categorie** : anti-pattern

**definition** :

Traiter le retour en arrière d'une équipe comme un manquement, alors qu'il révèle presque toujours un défaut d'ancrage du programme lui-même. Sanctionner l'équipe revient à punir le messager d'un problème systémique.

**exemple** :

Une équipe qui abandonne la nouvelle pratique est pointée du doigt, sans qu'on se demande si le programme l'avait réellement outillée pour tenir.

**renvois** : regression-traitee-en-faute


## revue-d-alignement-absorbee-par-la-livraison

**terme** : revue d'alignement absorbée par la livraison

**categorie** : anti-pattern

**definition** :

Le temps prévu pour la revue d'alignement est mangé par le suivi des livrables. La cadence est respectée sur le papier, mais l'alignement n'est jamais réellement discuté : la réunion existe, son objet a disparu.

**exemple** :

La revue trimestrielle d'alignement se transforme chaque fois en revue d'avancement, faute de temps pour le reste.

**renvois** : point-de-controle-deguise


## scoring-individuel

**terme** : scoring individuel

**categorie** : anti-pattern

**definition** :

Appliquer un modèle de diagnostic comme une évaluation des personnes : qui est au niveau 3, qui est au niveau 5. Cela déforme un modèle conçu comme diagnostic systémique en simple fiche de notation individuelle. Le repère de Deming s'applique : l'essentiel des problèmes vient du système, pas des personnes.

**exemple** :

Le modèle ADKAR, prévu pour diagnostiquer où en est un changement, sert à noter chaque collaborateur individuellement.

**renvois** : kpi-individuel, classement-des-equipes


## scoring-nominatif-par-equipe

**terme** : scoring nominatif par équipe

**categorie** : anti-pattern

**definition** :

Publier les scores d'une enquête équipe par équipe, avec identification des responsables. Cela détruit instantanément la confiance : l'enquête se transforme en évaluation des managers, et plus personne ne répond sincèrement.

**exemple** :

Les résultats de l'enquête de climat sont diffusés avec, pour chaque équipe, le nom de son responsable en regard du score.

**renvois** : classement-des-equipes, sondage-nominatif


## sondage-nominatif

**terme** : sondage nominatif

**categorie** : anti-pattern

**definition** :

Associer les réponses d'un sondage à des noms. Cela détruit la sincérité de la mesure : les gens répondent ce qu'ils pensent attendu. Un sondage de perception (conscience d'un changement, désir d'y contribuer, climat) doit rester strictement anonyme pour mesurer quoi que ce soit de réel.

**exemple** :

Un questionnaire sur l'adhésion à la transformation demande le nom et l'équipe en première page.

**renvois** : scoring-nominatif-par-equipe, mesure-du-declaratif


## sous-comptage-systematique-des-couts-caches

**terme** : sous-comptage systématique des coûts cachés

**categorie** : anti-pattern

**definition** :

Ne jamais comptabiliser les coûts cachés de la non-qualité : retravail, attente, réunions de résolution, changements de contexte. Le coût de la non-qualité déclaré peut être trois à cinq fois inférieur au coût réel, selon Juran. Plus la culture qualité est immature, plus le sous-comptage est massif, et plus le problème reste invisible.

**exemple** :

Le coût d'un défaut est chiffré au seul correctif technique, en ignorant les heures d'analyse, les réunions et les reprises qu'il a déclenchées.

**renvois** : couts-de-qualite


## splitting-d-initiatives

**terme** : splitting d'initiatives

**categorie** : anti-pattern

**definition** :

Découper artificiellement une initiative en deux ou trois pour faire monter le chiffre du débit, c'est-à-dire le nombre d'initiatives livrées. Le piège est quasi garanti dès que le débit devient un objectif à atteindre au lieu d'un simple indicateur de santé du flux.

**exemple** :

Une initiative unique est scindée en trois lignes au tableau de suivi pour que l'équipe livre trois initiatives ce trimestre.

**renvois** : decoupage-factice, effet-goodhart


## usage-en-evaluation-individuelle-ou-par-equipe

**terme** : usage en évaluation individuelle ou par équipe

**categorie** : anti-pattern

**definition** :

Publier un indicateur de flux équipe par équipe, le comparer entre équipes, l'inclure dans une revue de performance. Cela reproduit le management par la peur : l'efficacité de flux d'une équipe est déterminée à plus de 90 % par des files d'attente et des décisions qu'elle ne contrôle pas. La rendre comptable de ce chiffre est statistiquement faux.

**exemple** :

L'efficacité de flux de chaque équipe est affichée dans la revue trimestrielle de performance, alors qu'elle dépend surtout des dépendances entre équipes.

**renvois** : kpi-individuel, classement-des-equipes


# Cadres et méthodes

## balanced-scorecard

**terme** : Balanced Scorecard

**categorie** : cadre

**definition** :

Tableau de bord stratégique qui équilibre quatre perspectives au lieu de piloter par les seuls résultats financiers : les finances, les clients, les processus internes, et l'apprentissage organisationnel. L'idée fondatrice est qu'un résultat financier arrive toujours en retard sur ses causes, et qu'on pilote mieux en surveillant aussi ce qui le produit.

Le cadre relie ces perspectives par une chaîne de cause à effet : des collaborateurs qui montent en compétence améliorent les processus, qui améliorent la satisfaction des clients, qui nourrit la performance financière. Chaque perspective porte quelques objectifs et leurs indicateurs, tous rattachés à la stratégie.

**exemple** :

Une entreprise qui ne suivait que son chiffre d'affaires ajoute trois perspectives : la fidélité de ses clients, le délai de ses processus clés, la rétention de ses talents. Elle découvre que sa croissance reposait sur une base client qui s'érodait, invisible dans les seuls chiffres du trimestre.

**origine** : Robert Kaplan et David Norton (Harvard Business Review, 1992).

**renvois** : management-par-objectifs, liste-strategique-fourre-tout

## management-par-objectifs

**terme** : management par objectifs (MBO)

**categorie** : cadre

**definition** :

Approche de direction où chaque contributeur connaît les objectifs de son unité et de l'entreprise, et fixe les siens en cohérence, plutôt que de recevoir des consignes. Un objectif n'a de valeur que rattaché à la mission de l'organisation.

Peter Drucker, qui l'a formulée, y ajoute une condition souvent oubliée : l'autocontrôle. L'objectif se construit avec celui qui le portera, pas contre lui, et il doit être revu, dans son avancement comme dans sa pertinence. Les OKR en sont une descendance directe.

**exemple** :

Une équipe reçoit chaque année des objectifs descendus par la direction, jamais rediscutés. En passant au MBO, elle les formule elle-même à partir de la mission et les réexamine chaque trimestre : deux d'entre eux, devenus caducs après un changement de marché, sont abandonnés à mi-année.

**origine** : Peter Drucker, The Practice of Management (1954).

**renvois** : balanced-scorecard, cascade-unilaterale-descendante

**antiPatternLie** : objectifs-graves-pour-l-annee

## theorie-des-contraintes

**terme** : Théorie des Contraintes

**categorie** : cadre

**definition** :

Principe de pilotage selon lequel un système est toujours limité par un maillon unique, son goulot, qui détermine le débit de l'ensemble. Tant qu'on n'agit pas sur ce goulot, améliorer n'importe quel autre maillon ne produit aucun gain de débit global, et peut même aggraver la situation en accumulant du stock devant lui.

Eliyahu Goldratt en tire une méthode en cinq étapes : identifier le goulot, l'exploiter au maximum, subordonner tout le reste à son rythme, l'élever si nécessaire, puis recommencer, car le goulot se déplace. La règle cardinale : chercher le goulot avant d'optimiser quoi que ce soit.

**exemple** :

Un programme veut accélérer sa livraison et investit dans l'outillage des équipes de développement. Le débit ne bouge pas : le vrai goulot était le comité d'arbitrage, qui ne se réunissait qu'une fois par trimestre. En le passant en rythme mensuel, le délai se compresse sans toucher aux équipes.

**origine** : Eliyahu Goldratt, The Goal (1984).

**renvois** : flow-framework, six-sigma

**antiPatternLie** : optimisation-locale

## six-sigma

**terme** : Six Sigma

**categorie** : cadre

**definition** :

Démarche de maîtrise de la qualité par la réduction de la variabilité des processus. Son nom vient de son objectif statistique : atteindre un niveau de défauts si bas qu'il tiendrait à six écarts-types de la moyenne, soit quelques défauts par million d'occasions.

Le cœur de la méthode est de traiter la variabilité comme l'ennemie : un processus régulier, même imparfait, est plus pilotable qu'un processus performant en moyenne mais imprévisible. Née chez Motorola dans les années 1980, la démarche s'est fondue avec le Lean pour donner le Lean Six Sigma, qui joint la maîtrise de la qualité à la fluidité du flux.

**exemple** :

Un service de support affiche un délai moyen satisfaisant, mais certains dossiers traînent des semaines. Plutôt que de viser une moyenne encore plus basse, l'équipe s'attaque à la variabilité : elle standardise les cas fréquents et réserve le sur-mesure aux cas rares. La moyenne bouge peu, la dispersion s'effondre, la satisfaction monte.

**origine** : Bill Smith, chez Motorola (années 1980).

**renvois** : theorie-des-contraintes

**antiPatternLie** : moyenne-trompeuse

## flow-framework

**terme** : Flow Framework

**categorie** : cadre

**definition** :

Cadre de pilotage d'un portefeuille produit par le flux de valeur plutôt que par projets, proposé par Mik Kersten. Il mesure directement, depuis les outils de livraison, quatre types de travail exclusifs qui circulent dans le système : les fonctionnalités, les défauts, la dette technique et le risque.

Sa conviction centrale : au niveau du portefeuille, la vitesse ne dépend presque pas de l'effort des équipes, mais de la structure des files d'attente entre elles. Un travail passe le plus clair de sa vie à attendre une décision ou une ressource, pas à être traité. Les métriques de flux servent donc à localiser les goulots de gouvernance, jamais à noter les équipes.

**exemple** :

Une direction annonce un trimestre « innovation ». La distribution du flux mesurée montre que la moitié de la capacité part en correction de défauts. La promesse n'était pas tenable sans traiter d'abord la source des défauts : l'arbitrage réel devient visible, opposable au discours.

**origine** : Mik Kersten, Project to Product (2018).

**renvois** : theorie-des-contraintes, actionable-agile-metrics

**antiPatternLie** : usage-en-evaluation-individuelle-ou-par-equipe

## adkar

**terme** : ADKAR

**categorie** : cadre

**definition** :

Modèle de conduite du changement au niveau de l'individu, structuré en cinq marches séquentielles qu'une personne gravit dans l'ordre pour changer durablement : la conscience du besoin de changer, le désir d'y contribuer, la connaissance du comment, la capacité à l'appliquer, et le renforcement qui ancre le nouveau comportement.

Sa logique : on ne décrète pas un changement, on le fait traverser à des personnes, une par une, et chacune bute sur une marche précise. Diagnostiquer laquelle indique où agir : une adhésion faible faute de conscience n'appelle pas la même réponse qu'une adhésion faible faute de capacité.

**exemple** :

Un nouvel outil est déployé, la formation est faite, mais l'adoption stagne. Le diagnostic ADKAR révèle que la marche bloquante n'est pas la connaissance mais le désir : personne n'a expliqué pourquoi l'ancien outil devait disparaître. La réponse n'est pas plus de formation, mais du sens.

**origine** : Jeff Hiatt, Prosci (2006).

**renvois** : mesure-du-declaratif

**antiPatternLie** : scoring-individuel

## coso-erm

**terme** : COSO ERM

**categorie** : cadre

**definition** :

Référentiel international de gestion des risques d'entreprise, publié par le Committee of Sponsoring Organizations of the Treadway Commission. Il structure la façon dont une organisation identifie, évalue et traite ses risques, en reliant le risque à la stratégie et à la performance plutôt qu'en le cantonnant à une fonction de contrôle.

Son apport de fond : le risque n'est pas seulement une menace à éviter, c'est une donnée d'arbitrage. Face à une concentration critique, une organisation peut l'accepter en documentant ses plans de continuité, la réduire en payant le coût de la diversification, ou la transférer par l'assurance ou le contrat.

**exemple** :

Un board découvre que trois clients pèsent la moitié de son chiffre d'affaires. Plutôt que de subir cette concentration, il l'objective : plan de continuité pour chacun, diversification progressive, clauses contractuelles qui amortissent une rupture. Le risque reste, mais il est piloté.

**origine** : Committee of Sponsoring Organizations of the Treadway Commission (COSO ERM, 2004, révisé 2017).

**renvois** : iso-31000

**antiPatternLie** : diversification-cosmetique

## nist-csf

**terme** : NIST CSF

**categorie** : cadre

**definition** :

Cadre de cybersécurité publié par le NIST américain, qui structure la sécurité d'une organisation en cinq fonctions à tenir ensemble : identifier ses actifs et ses risques, protéger ce qui compte, détecter les incidents, répondre quand ils surviennent, récupérer ensuite.

Son intérêt n'est pas d'imposer des outils mais de donner un langage commun pour mesurer une posture. Il déplace la question « sommes-nous conformes ? » vers « savons-nous voir vite et nous rétablir vite ? », car l'absence d'incident déclaré est plus souvent un défaut de détection qu'une preuve de sécurité.

**exemple** :

Une organisation certifiée sur le papier découvre, en se notant sur les cinq fonctions, qu'elle protège bien mais ne détecte presque pas : ses tableaux de bord sont verts parce qu'elle ne cherche pas les attaques. Le diagnostic réoriente l'investissement vers la détection et la réponse.

**origine** : National Institute of Standards and Technology (Cybersecurity Framework, 2014).

**renvois** : iso-31000, fair

**antiPatternLie** : rassurance-par-la-moyenne

## iso-31000

**terme** : ISO 31000

**categorie** : cadre

**definition** :

Norme internationale de management du risque. Elle ne prescrit pas de recette mais fournit des principes et un vocabulaire communs pour identifier, évaluer et traiter les risques dans toute organisation, quel que soit son secteur.

Sa logique rejoint celle des autres cadres de risque : un risque se pilote, il ne se subit pas. Une fois identifié et évalué, il peut être accepté, réduit, transféré ou évité, en connaissance de cause plutôt que par défaut.

**exemple** :

Deux équipes d'une même entreprise parlaient du risque avec des mots différents, rendant toute comparaison impossible. En adoptant le vocabulaire d'ISO 31000, elles hiérarchisent enfin leurs risques sur une échelle commune et arbitrent où mettre leurs moyens.

**origine** : Organisation internationale de normalisation (ISO 31000, 2009, révisée 2018).

**renvois** : coso-erm, fair, nist-csf

## fair

**terme** : FAIR

**categorie** : cadre

**definition** :

Méthode de quantification du risque, Factor Analysis of Information Risk, qui traduit un risque en termes financiers plutôt qu'en échelles floues « faible, moyen, élevé ». Elle décompose un risque en deux facteurs : la fréquence probable d'un événement et l'ampleur probable de ses pertes.

Son apport : rendre les risques comparables et arbitrables en monnaie. Un risque « élevé » sur une échelle de couleurs ne dit pas s'il faut y consacrer dix mille ou dix millions ; une perte annualisée estimée en euros, si.

**exemple** :

Un comité hésite entre deux investissements de sécurité. En estimant, via FAIR, la perte annualisée que chacun évite, il découvre que le projet perçu comme urgent réduit un risque à faible impact, tandis qu'un risque discret pesait dix fois plus. La priorité s'inverse.

**origine** : Jack Jones (Factor Analysis of Information Risk).

**renvois** : coso-erm, iso-31000, nist-csf

## flow-metrics

**terme** : Flow Metrics

**categorie** : cadre

**definition** :

Ensemble de métriques de flux au niveau du portefeuille, dérivé du Flow Framework de Mik Kersten et intégré par SAFe dans son corpus officiel : distribution, vélocité, temps et efficacité du flux, plus la charge et la prévisibilité.

Ces mesures partagent une règle de lecture héritée du Flow Framework : elles décrivent la santé d'un système de livraison, pas la performance des équipes qui l'exécutent. À l'échelle du portefeuille, la lenteur vient presque toujours des files d'attente entre équipes, pas de l'effort individuel.

**exemple** :

Un portefeuille SAFe adopte les Flow Metrics et constate une efficacité de flux de 15 % : le travail passe l'essentiel de sa vie à attendre. La conversation se déplace des équipes « trop lentes » vers les comités et validations qui créent les files.

**origine** : Mik Kersten (Flow Framework, 2018), intégré à SAFe v6.

**renvois** : flow-framework, actionable-agile-metrics, theorie-des-contraintes

**antiPatternLie** : usage-en-evaluation-individuelle-ou-par-equipe

## actionable-agile-metrics

**terme** : Actionable Agile Metrics

**categorie** : cadre

**definition** :

Approche de mesure du travail agile centrée sur les distributions plutôt que sur les moyennes, formulée par Daniel Vacanti. Son principe : une moyenne écrase l'information qui permet de décider ; ce qui compte, c'est la dispersion et les valeurs extrêmes.

Elle outille cette idée par des techniques concrètes : le nuage de points du délai de cycle, les percentiles, la simulation de Monte-Carlo pour prévoir sans engager de dates arbitraires. Vacanti résume : une moyenne n'a jamais fait prendre une bonne décision à personne.

**exemple** :

Une équipe promet « deux semaines en moyenne » et déçoit une fois sur trois. En lisant la distribution de ses délais, elle constate que 85 % des items sortent en trois semaines : elle s'engage désormais sur un délai tenu la plupart du temps, au lieu d'une moyenne trompeuse.

**origine** : Daniel Vacanti, Actionable Agile Metrics for Predictability (2015).

**renvois** : flow-framework, flow-metrics

**antiPatternLie** : moyenne-au-lieu-de-mediane-et-p85

## itil-service-operation

**terme** : ITIL Service Operation

**categorie** : cadre

**definition** :

Volet du référentiel ITIL consacré à l'exploitation des services informatiques au quotidien : traiter les incidents, gérer les problèmes récurrents, tenir les engagements de niveau de service. Il ne décrit pas comment construire un logiciel, mais comment le faire vivre dans la durée.

Sa conviction : la valeur d'un système ne se joue pas seulement à sa livraison, mais dans les mois et les années où il rend service. Un service qui tombe souvent, se rétablit lentement ou re-casse pour la même cause détruit la valeur qu'on a mise à le construire.

**exemple** :

Un support affiche un excellent délai de résolution, mais les mêmes pannes reviennent chaque mois. En suivant, comme le recommande ITIL, la récurrence des incidents et pas seulement leur vitesse de traitement, l'équipe s'attaque enfin aux causes profondes.

**origine** : Référentiel ITIL (IT Service Management).

**renvois** : theorie-des-contraintes

## lpm

**terme** : LPM (Lean Portfolio Management)

**categorie** : cadre

**definition** :

Approche de gestion de portefeuille qui applique les principes Lean au niveau où l'on décide quelles initiatives lancer, poursuivre ou arrêter. Elle traite le portefeuille comme un flux de paris à financer par incréments, pas comme une liste de projets validés une fois pour toutes.

Son geste le plus utile est une question de désinvestissement : si cette initiative se présentait aujourd'hui, la lancerait-on ? Si la réponse est non, ce qui a déjà été dépensé ne doit pas dicter la suite. C'est l'antidote au biais du coût irrécupérable.

**exemple** :

Un comité maintient depuis deux ans une initiative devenue coûteuse parce qu'on a déjà trop investi. En posant la question du LPM, il reconnaît qu'il ne la lancerait pas aujourd'hui, et redéploie le budget vers un pari plus prometteur.

**origine** : Scaled Agile (Lean Portfolio Management, SAFe).

**renvois** : theorie-des-contraintes

**antiPatternLie** : acharnement-therapeutique

## predictable-revenue

**terme** : Predictable Revenue

**categorie** : cadre

**definition** :

Méthode d'organisation de la vente qui vise à rendre le revenu prévisible en spécialisant les rôles commerciaux plutôt qu'en confiant tout le cycle à un seul vendeur. Elle sépare la prospection, la qualification, la conclusion et la fidélisation, chaque étape ayant son équipe et ses indicateurs.

Son idée directrice : un revenu régulier ne vient pas de héros commerciaux, mais d'un processus dont chaque maillon est mesurable et améliorable. La prévisibilité naît de la spécialisation et de la mesure de la conversion à chaque étape.

**exemple** :

Une équipe où chaque vendeur faisait tout, de la prospection à la signature, plafonnait faute de temps de prospection. En dédiant une équipe à la seule génération de rendez-vous qualifiés, elle stabilise son flux d'opportunités et rend ses prévisions fiables.

**origine** : Aaron Ross, Predictable Revenue (2011).

**renvois** : sirius-decisions-demand-waterfall, spin-selling

## sales-acceleration-formula

**terme** : Sales Acceleration Formula

**categorie** : cadre

**definition** :

Méthode de construction d'une organisation commerciale fondée sur les données et la reproductibilité, formulée par Mark Roberge chez HubSpot. Elle applique une logique d'ingénieur au recrutement, à la formation et à la génération de demande : définir ce qui marche, le mesurer, puis le répliquer.

Son pari : la performance commerciale n'est pas un art réservé à quelques talents, c'est un système que l'on peut concevoir, mesurer et faire monter en échelle, à condition de standardiser ce qui fonctionne au lieu de compter sur l'intuition.

**exemple** :

Une entreprise recrutait ses commerciaux au feeling, avec des résultats erratiques. En définissant, à la manière de Roberge, le profil corrélé au succès et un parcours de formation standardisé, elle rend la performance de ses recrues bien plus régulière.

**origine** : Mark Roberge, The Sales Acceleration Formula (2015).

**renvois** : predictable-revenue

## sirius-decisions-demand-waterfall

**terme** : SiriusDecisions Demand Waterfall

**categorie** : cadre

**definition** :

Modèle qui décrit la génération de demande commerciale comme un entonnoir en cascade, où les contacts descendent d'une étape à la suivante, de l'intérêt initial jusqu'à l'opportunité qualifiée puis à la vente. Chaque palier a un taux de conversion mesurable.

Son utilité est de rendre visible où se perd la demande : un entonnoir qui fuit à une étape précise indique où concentrer l'effort, plutôt que d'ajouter aveuglément du volume en haut. Il relie marketing et vente autour d'une même lecture chiffrée.

**exemple** :

Une équipe marketing générait toujours plus de contacts sans que les ventes augmentent. La cascade révèle que la fuite se situait au passage du marketing à la vente : les contacts n'étaient jamais rappelés à temps. Le problème n'était pas le volume mais un maillon, corrigé sans dépenser plus en haut.

**origine** : SiriusDecisions (Demand Waterfall).

**renvois** : predictable-revenue, theorie-des-contraintes

## spin-selling

**terme** : SPIN Selling

**categorie** : cadre

**definition** :

Méthode de vente consultative fondée sur une séquence de questions plutôt que sur un argumentaire : questions de Situation, de Problème, d'Implication, puis de bénéfice. Elle amène le client à formuler lui-même son besoin et la valeur d'une solution.

Son fondement est empirique : Neil Rackham l'a tirée de l'observation de milliers d'entretiens de vente réels. Sa découverte contre-intuitive : dans les ventes complexes, ce qui fait signer n'est pas de bien présenter le produit, mais de bien faire mesurer au client le coût de son problème.

**exemple** :

Un commercial qui déroulait les qualités de son produit peinait à conclure. En passant aux questions d'implication, il aide le client à chiffrer ce que son problème lui coûte chaque mois : la valeur de la solution devient évidente pour le client lui-même.

**origine** : Neil Rackham, SPIN Selling (1988).

**renvois** : effortless-experience, predictable-revenue

## effortless-experience

**terme** : Effortless Experience

**categorie** : cadre

**definition** :

Approche de l'expérience client qui renverse une idée reçue : ce qui fidélise n'est pas d'enchanter le client, c'est de lui épargner de l'effort. Matthew Dixon montre, données à l'appui, que réduire la difficulté d'une interaction prédit mieux la loyauté que la dépasser en enchantement.

D'où la métrique associée, le score d'effort client : plutôt que demander « êtes-vous satisfait ? », on demande « à quel point cela vous a-t-il demandé d'effort ? ». Un service sans friction retient mieux qu'un service spectaculaire mais laborieux.

**exemple** :

Un service client investissait dans des gestes commerciaux généreux mais faisait répéter trois fois leur problème aux clients. En mesurant l'effort plutôt que la seule satisfaction, il découvre que la friction, pas le manque de générosité, faisait fuir : simplifier le parcours retient plus que gâter.

**origine** : Matthew Dixon, The Effortless Experience (2013).

**renvois** : spin-selling

