# Audit d'uniformité des portes — trois portes, une grammaire commune ?

_Audit rapide livré le 21 avril 2026, après la clôture du chantier 7.6 (liens cliquables entre fiches). Pensé pour précéder et cadrer le chantier 7.2 (stepper générique)._

## Pourquoi cet audit

Trois portes permettent aujourd'hui d'entrer dans l'outil : *Par mon problème*, *Par mon cadre*, *Par mon niveau*. Elles ont été conçues à des moments différents du produit. Avant d'en unifier la mécanique technique dans un futur parcours générique, il faut savoir ce qui les rassemble, ce qui les distingue **à dessein**, et ce qui les distingue **par accident**. Cette distinction fait toute la différence : sans elle, la future factorisation technique risque de figer dans le marbre des divergences qui n'avaient simplement jamais été pensées.

L'audit répond donc à trois questions simples. Premièrement : y a-t-il aujourd'hui une grammaire commune entre les trois portes, ou trois grammaires parallèles ? Deuxièmement : les différences visibles sont-elles des choix légitimes liés à la nature de chaque porte, ou des accidents d'implémentation à corriger ? Troisièmement : quel contrat de cohérence doit être posé pour que le futur chantier de factorisation ne trahisse ni la logique métier des portes, ni le confort de l'utilisateur ?

## Méthode

Six questions posées à chaque porte, une lecture par porte, synthèse croisée. Langage volontairement accessible — les termes techniques sont systématiquement traduits ou accompagnés d'une courte explication en langage courant.

## Constat préalable — une porte a une forme fondamentalement différente des deux autres

Avant même de dérouler la grille, un constat saute aux yeux. La porte *Par mon problème* et la porte *Par mon cadre* fonctionnent en **parcours guidé en trois étapes** (on répond à une première question, puis à une deuxième, puis on voit les résultats — c'est ce que les développeurs appellent un *stepper*, un chemin balisé). La porte *Par mon niveau*, elle, fonctionne tout autrement : on clique directement sur une bande de la pyramide d'accueil et on arrive immédiatement dans une vue à quatre onglets (*Tableau de bord*, *Cascade*, *Questionnaire*, *Maturité*).

Autrement dit, aujourd'hui, il n'existe pas trois portes symétriques. Il existe **deux portes à parcours guidé** et **une porte-pyramide qui sert aussi d'accueil et débouche sur un espace d'exploration à quatre onglets**. Cette asymétrie est née de l'histoire du produit : la pyramide existait avant que le concept de *porte d'entrée* soit formalisé, et elle a été rebaptisée *Par mon niveau* a posteriori sans être retravaillée. C'est le premier élément de cadrage important pour le chantier 7.2.

## La grille — six familles, trois portes, un verdict par ligne

| Famille | Par mon problème | Par mon cadre | Par mon niveau | Verdict |
|---|---|---|---|---|
| 1. La question d'ouverture | Choisir un niveau de pilotage (4 étages) | Choisir un cadre méthodologique (7 familles d'école en accordéon) | Choisir un niveau de la pyramide (4 bandes dont la dernière éclatée en sous-domaines) | Différent à dessein (taxonomies propres à chaque porte) |
| 2. La navigation entre étapes | Parcours 3 étapes, chips cliquables pour revenir, scroll automatique vers le haut, bouton *retour accueil* dans le header | Parcours 3 étapes, mécanique identique à la porte problème (même code à 95 %) | Pas de parcours — on entre dans 4 onglets, retour via bouton dédié en haut | Différent à dessein sur porte niveau ; identique à dessein entre problème et cadre |
| 3. La forme des résultats | Titre *Indicateurs recommandés…* + grille + **conseil pédagogique** + **zone de délégation** (si pertinente) + bouton *Recommencer* | Titre *Indicateurs revendiqués par…* + grille + **bloc Cadres voisins** + bouton *Recommencer* — **pas de conseil pédagogique** | Quatre vues à onglets, chacune avec sa propre présentation (essentiels/complémentaires, cascade hiérarchique, questionnaire 3 questions, filtrage par maturité) | Divergences partiellement accidentelles |
| 4. Ce qui entoure les résultats | Conseil pédagogique systématique, zone de délégation quand des indicateurs pertinents relèvent d'un autre étage | Bloc *Cadres voisins* quand au moins deux cadres partagent des indicateurs. **Le conseil pédagogique manque.** | Sélecteur de maturité présent uniquement dans la vue *Maturité*, conseil pédagogique présent uniquement dans la vue *Questionnaire* | Deux divergences accidentelles à corriger |
| 5. L'ouverture d'une fiche | Cartes cliquables → tiroir latéral. Liens intra-fiche cliquables (chantier 7.6) avec deep-linking par URL | Identique à la porte problème | Identique | Uniforme |
| 6. La mémoire entre deux visites | Aucun état du parcours n'est sauvegardé. Un rechargement de page (F5) ramène à l'accueil en perdant le parcours en cours. Seul l'accueil (pyramide ou portes) est mémorisé | Idem | Idem, avec en plus la perte de la maturité sélectionnée et de l'onglet actif | Divergence accidentelle côté robustesse — les trois portes perdent le travail de l'utilisateur |

## Les verdicts expliqués — langage simple

### Famille 1 — La question d'ouverture : différence voulue et saine

Chaque porte commence par une question différente parce que c'est sa raison d'être. Entrer *par son problème*, c'est dire *je sais quelle préoccupation me guide, guide-moi vers le bon étage de responsabilité*. Entrer *par son cadre*, c'est dire *mon équipe utilise Scrum ou DORA, montre-moi ce que ce cadre revendique*. Entrer *par son niveau*, c'est dire *je sais où je pilote, montre-moi ce que l'on regarde ici*. Ces trois entrées obéissent à trois grammaires mentales distinctes, et la mémoire du projet nomme déjà ce principe *taxonomies par porte*. Aucune correction à prévoir sur cette famille — au contraire, il faudra veiller à ce que la factorisation 7.2 ne dissolve pas cette identité propre à chaque porte.

### Famille 2 — La navigation entre étapes : double constat

Entre la porte *problème* et la porte *cadre*, la ressemblance est frappante. Les deux portes partagent environ quatre-vingt-quinze pour cent de leur code : même structure d'état, mêmes fonctions, même apparence des étapes, même comportement au scroll, même header, même bouton *recommencer*. C'est un excellent signe de cohérence — et c'est précisément ce qui rend la factorisation 7.2 à la fois possible et nécessaire. La duplication actuelle tient tant qu'elle n'a pas divergé ; dès qu'on modifiera l'une des deux portes sans l'autre, la cohérence se fissurera.

En face, la porte *niveau* n'a pas cette mécanique parce qu'elle n'a pas été pensée comme un parcours. Elle débouche directement sur un espace riche à quatre onglets. Cette différence est historiquement justifiée mais mérite une décision explicite pour le chantier 7.2 : veut-on que la porte *niveau* rejoigne le format parcours guidé (avec la pyramide qui redevient un simple accueil visuel), ou veut-on garder son caractère particulier de *porte qui ouvre un espace d'exploration* plutôt que *porte qui livre une sélection d'indicateurs* ?

### Famille 3 — La forme des résultats : un accident à corriger

La porte *problème* et la porte *cadre* livrent toutes deux une grille d'indicateurs recommandés. Jusque-là, tout est symétrique. Mais la porte *problème* accompagne sa grille d'un **conseil pédagogique** (du type *n'essayez pas de tout regarder, concentrez-vous sur un ou deux par axe*) et la porte *cadre* ne le fait pas. Or la fonction qui produit ce conseil existe déjà (`CM.Config.conseilPedagogiquePour`, introduite au chantier 6.2) et elle a été pensée pour accepter différents contextes. L'absence dans la porte cadre n'est pas un choix — elle n'a simplement jamais été ajoutée. C'est un micro-fix à commiter.

La porte *niveau*, elle, présente ses résultats sous quatre formes différentes selon l'onglet choisi. C'est voulu et enrichissant, mais cela crée une asymétrie : ce qui dans les deux autres portes s'appelle *mes indicateurs recommandés* se retrouve ici réparti entre plusieurs vues dont l'une (le *Questionnaire*) est en réalité un mini-parcours guidé caché dans un onglet. Cette complexité mérite d'être clarifiée au fil du temps — probablement en promouvant *Questionnaire* au rang de parcours à part entière, ou en l'absorbant dans le stepper générique 7.2.

### Famille 4 — Ce qui entoure les résultats : deux divergences à trancher

Premier constat : le **conseil pédagogique** est présent dans la porte problème et dans l'onglet questionnaire de la porte niveau, mais absent de la porte cadre. Accident, à corriger (voir micro-fixes).

Deuxième constat : le **filtre de maturité** (débutant / intermédiaire / avancé) n'existe que dans un onglet de la porte niveau. Les deux portes à parcours guidé n'offrent pas cette possibilité de calibrer les recommandations selon la maturité réelle de l'équipe. Or le backlog contient déjà, au chantier 7.1, une évolution *filtres globaux par cadre et par maturité* qui répond précisément à ce manque. Ce n'est donc pas un simple accident à corriger dans la journée — c'est une évolution structurante déjà cadrée dans le backlog. La bonne décision d'audit est de confirmer que 7.1 reste la bonne porte d'entrée pour cette divergence, pas un micro-fix à bâcler en parallèle.

Troisième constat, plus subtil : les deux portes à parcours guidé ont chacune leur bloc transversal spécifique (la *zone de délégation* pour la porte problème, le bloc *Cadres voisins* pour la porte cadre). Ces blocs sont **différents à dessein** — ils traduisent la logique propre de chaque porte. Il ne faut pas les uniformiser ; il faut seulement s'assurer que leur forme visuelle reste lisible dans le même registre graphique.

### Famille 5 — L'ouverture d'une fiche : uniforme et solide

Toutes les portes ouvrent la même fiche dans le même tiroir latéral. Les liens intra-fiche posés au chantier 7.6 bénéficient d'une interception globale (un seul bloc de code pour toutes les portes), complétée par un filet de sécurité sur les changements d'URL ajouté par le correctif `ac71465`. C'est la famille la plus saine du produit — aucun fix à prévoir.

### Famille 6 — La mémoire entre deux visites : un trou commun aux trois portes

Aucune des trois portes ne sauvegarde l'état du parcours en cours. Si l'utilisateur a choisi *niveau stratégique* puis *problème de flux*, et qu'il recharge la page par accident, il repart à zéro. Cette faiblesse est partagée — ce n'est donc pas un déséquilibre **entre** les portes mais une limitation **commune à toutes**. Elle mérite d'être soulevée comme item de backlog indépendant, avec deux pistes techniques distinctes : (a) mémorisation automatique dans le stockage local du navigateur, (b) mise à jour de l'URL pour permettre le partage d'un parcours (*j'envoie à mon collègue le lien vers ma porte cadre × niveau programme*). La deuxième piste est la plus intéressante stratégiquement — elle fait de chaque parcours un objet partageable.

## Micro-fixes à commiter — synthèse

Trois micro-fixes ressortent de l'audit. Le premier est clair et immédiat ; les deux autres demandent une décision préalable.

Le **premier micro-fix** consiste à ajouter l'appel au conseil pédagogique dans la porte cadre, à l'étape des résultats, en alignement avec ce que fait déjà la porte problème. Effort estimé : une session courte (moins d'une heure), une poignée de lignes de code, identité visuelle parfaitement reproductible. C'est un geste opportuniste idéal, au sens *boy-scout* (laisser le camp un peu plus propre qu'en arrivant).

Le **deuxième micro-fix** relève en réalité du chantier 7.1 déjà prévu : apporter le filtre de maturité aux trois portes, ou à défaut clarifier que ce filtre reste spécifique à l'onglet *Maturité* de la porte niveau. Cette décision mérite un mockup-preview comparatif dans le cadre du 7.1 plutôt qu'une correction isolée.

Le **troisième micro-fix** consiste à permettre la persistance ou le partage du parcours en cours — soit par stockage local, soit par URL. C'est une évolution à part entière qui mérite un item backlog propre, plutôt qu'un correctif cosmétique. Je le propose comme item `7.7 — Persistance et partage des parcours`.

## Divergences voulues à documenter (pas à corriger)

Trois divergences ressortent comme légitimes et doivent être consignées explicitement, pour que la future factorisation 7.2 ne les efface pas par distraction.

Premièrement, la **taxonomie de la première étape** est propre à chaque porte. La porte problème commence par un niveau ; la porte cadre commence par un accordéon de sept familles d'école de pensée ; la porte niveau commence par une pyramide à quatre bandes dont la dernière s'éclate en dix sous-domaines. Ces trois formes différentes ne doivent pas être aplaties en un choix uniforme — elles traduisent la grammaire mentale de chaque porte.

Deuxièmement, le **bloc transversal sous les résultats** est spécifique à chaque porte. *Zone de délégation* pour la porte problème, *Cadres voisins* pour la porte cadre, rien de tel côté pyramide. Cette différenciation est une force : elle signifie que chaque porte fait un geste éditorial propre qui enrichit le sens des résultats. La factorisation 7.2 devra offrir un *point d'extension* permettant à chaque porte d'injecter son propre bloc, sans l'imposer.

Troisièmement, le **format des résultats** est intrinsèquement plus simple dans les deux portes guidées (une grille, un conseil, un bloc) que dans la porte niveau (quatre onglets). Si l'on souhaite que la porte niveau rejoigne un jour le format parcours guidé, c'est un choix produit à trancher sciemment, pas un effet secondaire du 7.2.

## Contrat de cohérence — pour le jour où le chantier 7.2 s'ouvre

Le chantier 7.2 devra extraire un *parcours guidé générique* (nom de code : `CM.Stepper`) capable d'accepter un nombre variable d'étapes. Pour que cette extraction ne trahisse ni les divergences voulues ni l'ergonomie actuelle, le contrat doit préciser trois choses.

**Ce que le parcours générique prend en charge** : la gestion de l'étape courante, la possibilité de revenir à une étape précédente en annulant les choix ultérieurs, le scroll automatique vers le haut à chaque transition (instantané à la première ouverture, doux aux transitions), le rendu visuel de la barre d'étapes (les *chips*) avec ses états *actif* / *fait* / *à venir*, le bouton *retour accueil* en header, le bouton *Recommencer* en pied d'étape finale.

**Ce que chaque porte injecte** : la taxonomie de chaque étape (les choix proposés), le schéma de la question posée à chaque étape, le rendu de la carte d'étape (question, aide, grille d'options), le calcul des résultats à l'étape finale (logique métier), un point d'extension pour ajouter un ou plusieurs blocs transversaux sous les résultats (délégation, cadres voisins, etc.), une étiquette de porte pour le header (*Par mon problème*, *Par mon cadre*, *Par mon niveau*).

**Ce qui reste explicitement non partagé** : le nombre d'étapes (trois aujourd'hui, probablement quatre ou cinq demain selon le chantier 7.3 ou 7.4), la taxonomie, les blocs transversaux, la logique de filtrage des indicateurs, le conseil pédagogique formulé selon le contexte.

Point d'ouverture pour la décision 7.2 : faut-il inclure la **porte niveau** dans ce parcours générique, ou préserver sa forme actuelle (pyramide-accueil débouchant sur quatre onglets) ? La réponse n'est pas évidente — garder la pyramide comme *accueil visuel* est probablement plus cohérent avec l'expérience actuelle de l'utilisateur, mais lui offrir **aussi** un parcours guidé (niveau → problème → cadre) ferait avancer la symétrie. Option hybride possible : conserver la pyramide comme accueil, et lui adjoindre une variante *parcours guidé* accessible depuis un bouton discret.

## Prochaine action recommandée

Ouvrir un mini-chantier `AUDIT-F-1` : le micro-fix du conseil pédagogique dans la porte cadre, en une session courte. Après quoi l'audit est complètement clos et le chantier 7.1 ou 7.2 peut s'ouvrir à plein régime.
