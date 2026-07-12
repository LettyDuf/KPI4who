# Source des fiches-cadres — chantier 28

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
