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

État de remplissage : rayon anti-patterns en cours (jalon B.1), premier lot de
douze entrées sur quarante-neuf.


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
