# Choisir mes indicateurs

Outil d'aide à la décision pour choisir et comprendre les métriques de performance les plus pertinentes, en gestion d'entreprise comme en gestion d'équipe.

## L'outil en ligne

[lettyduf.github.io/KPI4who](https://lettyduf.github.io/KPI4who/)

L'application fonctionne directement dans le navigateur, sans installation ni inscription. Aucune donnée n'est transmise à un serveur, tout reste sur l'appareil qui consulte l'outil.

## À qui c'est destiné

Aux managers, chefs d'équipe et coachs qui doivent arbitrer des décisions de gestion sans toujours savoir si la métrique qu'ils regardent est la bonne. L'outil propose quatre portes d'entrée, selon la grammaire mentale du moment :

- par mon **niveau de responsabilité** (équipe, programme, portefeuille, organisation)
- par mon **problème** (goulot, qualité, engagement, conformité, etc.)
- par mon **cadre méthodologique** (Lean, DORA, OKR, etc.)
- par ma **question** (catalogue de questions terrain fines)

À chaque entrée, trois indicateurs pertinents sont proposés, contextualisés, expliqués, et accompagnés d'une vigilance sur les anti-patrons fréquents.

## Cadres de référence

L'outil synthétise et met en dialogue plusieurs corpus de pensée organisationnelle :

- **Lean Six Sigma** : flux, variabilité, capacité de processus, *Respect for People*
- **DORA** : métriques DevOps (lead time, deployment frequency, change failure rate, MTTR)
- **Management par objectifs (MBO)** de Peter Drucker
- **OKR** : Objectives and Key Results
- **Théories de Henry Mintzberg** : rôles managériaux et niveaux de décision
- **Modèles de conduite du changement** : ADKAR, Kotter, Bridges

Plus de cent fiches d'indicateurs, organisées par école de pensée et par axe de responsabilité, chacune accompagnée d'une note pédagogique et d'une vigilance sur les usages détournés (effet Goodhart, indicateurs pastèque, etc.).

## Architecture et craftsmanship

Application monofichier HTML et JavaScript, sans dépendance runtime. Architecture interne hexagonale (séparation référentiel, requêtes, vues), modules nommés `CM.*`. Quelques outils Node.js (`outils/`) servent à la génération de données et à l'exécution de tests automatisés. Voir les documents `doc-contrats-*.md` pour la documentation architecturale détaillée.

Les choix éditoriaux et architecturaux suivent une doctrine documentée : pas de jargon non glosé, terminologie française assumée, vocabulaire typographique soigné, séparation stricte matière éditoriale et code applicatif.

## Droits d'auteur et usage

© 2026 Lætitia Dufour. Tous droits réservés.

Cet outil n'est **pas distribué sous licence open source**. Le code, le référentiel et la documentation sont protégés par le droit d'auteur canadien. Pour les conditions précises et toute demande d'usage, de citation ou de partenariat, voir [COPYRIGHT.md](COPYRIGHT.md).

## Contact

Lætitia Dufour, [laetitia@veremme.org](mailto:laetitia@veremme.org)
