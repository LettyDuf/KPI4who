# DECISIONS

Format : contexte, choix, alternative écartée. Les décisions antérieures sont tracées dans les `doc-contrats-*.md` et l'historique git ; ce fichier commence le 17/11/2026.

## D1 : Filet qualité léger, sans refonte
- Contexte : 17/11/2026, Lætitia veut une garantie automatique de qualité pour tous ses outils. KPI4who est un fichier HTML unique (`cadre-indicateurs.html`, environ 12 500 lignes) sans outillage de construction ; ses tests et vérificateurs existaient (`outils/`) mais rien ne les lançait avant publication. Le premier passage a d'ailleurs trouvé une divergence : `vigilance` ajouté au vocabulaire de fiabilité dans le code le 12/07/2026 (commit 5ac13ad), absent du contrat §10.3 de `doc-contrats-chantier-14.md` ; le contrat est mis à jour. Le harnais `tests-accueil-unifie.html` n'était plus à jour avec le code ; il est régénéré.
- Choix (validé par Lætitia, « filet léger ») : `outils/verifier-tout.js` lance tous les contrôles existants et échoue si un seul échoue ; le workflow « Qualité et publication » l'exécute sur chaque pull request et chaque envoi sur main, vérifie que les harnais committés sont à jour, et ne publie sur Pages que si tout est vert (suppose de basculer la source Pages sur « GitHub Actions »).
- Alternative écartée pour l'instant : découper le fichier en modules domaine, contenu et interface, pour permettre un vrai test d'architecture hexagonale comme dans les autres outils Gesto. Gros chantier, à reconsidérer si KPI4who continue d'évoluer.
- Limites connues : pas de test automatique d'architecture ; les harnais d'interface (`tests-accueil-unifie*.html`, `tests-panier.html`) restent à ouvrir dans un navigateur pour le comportement.
