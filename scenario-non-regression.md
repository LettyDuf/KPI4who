# Scénario de non-régression — MVP 4 portes

Liste manuelle des clics à passer **avant** chaque étape du chantier 14 (refactor hexagonal), et **après** chaque commit d'étape. Si un scénario ne donne plus exactement le même résultat qu'avant, on arrête, on diagnostique, et on rollback à l'étape précédente si besoin.

**Règle d'or.** On ne déplace pas un test pour le faire passer. Si un scénario change, c'est qu'on a changé le comportement — ce qui est interdit sous le sceau *iso-comportement* du chantier 14.

**Méthode.** Ouvrir `cadre-indicateurs.html` dans un navigateur neuf (ou session privée pour ignorer le localStorage). Exécuter les scénarios dans l'ordre, cocher chacun mentalement ou au crayon. Durée cible : ~10 minutes pour passer la liste complète.

---

## 1. Accueil et navigation de base

- [ ] **A1 — Accueil par défaut.** Ouverture directe → page d'accueil (`#accueil`) s'affiche. Le bandeau d'onglets est visible. Aucun onglet actif n'est marqué (on est avant le niveau onglet).
- [ ] **A2 — Accueil portes.** Depuis l'accueil, descendre jusqu'aux 4 portes d'entrée → les quatre cartouches *Par mon problème*, *Par mon cadre*, *Par mon niveau*, *Par ma maturité* sont visibles. *Par ma maturité* affiche bien le badge « Bientôt » et reste désactivée au clic.
- [ ] **A3 — Onglets principaux.** Le bandeau expose les 7 entrées actuelles : *Accueil*, *Mon tableau de bord*, *Choisir mes indicateurs*, *Cascade stratégique* (stub si stub), *La maturité ?*, *Lexique*, *À propos*. Clic sur chacun → la vue correspondante s'affiche sans erreur console.

---

## 2. Porte *Par mon problème*

- [ ] **B1 — Entrée.** Clic sur la carte *Par mon problème* → stepper étape 1 (niveau) affiché. Les 4 options niveau (opérationnel, programme, tactique, stratégique) sont cliquables.
- [ ] **B2 — Sélection niveau.** Clic sur *programme* → passage à l'étape 2 (choix du problème). La liste des problèmes propres au niveau programme s'affiche.
- [ ] **B3 — Sélection problème.** Clic sur un problème (ex : *visibilité sur l'avancement*) → passage à l'étape 3 (recommandations). Entre 2 et 5 fiches métriques sont proposées, chacune avec titre + fiabilité + bouton ouvrir.
- [ ] **B4 — Ouverture fiche.** Clic sur une fiche → tiroir latéral s'ouvre avec le contenu complet. Clic sur la croix → tiroir se ferme.
- [ ] **B5 — Pivot étape 2.** Depuis l'étape 3, cliquer sur un autre problème dans le résumé/rappel en tête → passage direct à l'étape 3 pour le nouveau problème sans repasser par l'étape 1.
- [ ] **B6 — Retour accueil.** Clic sur *Accueil* dans le bandeau → retour à l'accueil sans conservation de l'état de la porte (comportement actuel attendu).

## 3. Porte *Par mon cadre*

- [ ] **C1 — Entrée.** Clic sur la carte *Par mon cadre* → stepper étape 1 (accordéon par école de pensée) affiché. Les 7 familles sont listées, **toutes fermées à l'arrivée**.
- [ ] **C2 — Ouverture accordéon.** Clic sur une famille (ex : *Lean / Six Sigma*) → contenu de la famille apparaît avec les cadres disponibles. Les autres familles restent fermées.
- [ ] **C3 — Sélection cadre.** Clic sur un cadre (ex : *Lean Six Sigma*) → passage à l'étape 2 (choix du niveau). Les 4 niveaux (équipe, programme, portefeuille, entreprise) sont cliquables.
- [ ] **C4 — Sélection niveau.** Clic sur *équipe* → passage à l'étape 3 (résultats). Fiches métriques pertinentes pour *Lean Six Sigma × équipe* affichées.
- [ ] **C5 — Cadres voisins.** En pied de l'étape 3, le bloc *Cadres voisins dans le référentiel* propose 2-3 cadres connexes cliquables.
- [ ] **C6 — Pivot à étage constant.** Clic sur un cadre voisin → remplacement des résultats **sans** régression d'étape (on reste à l'étape 3, même niveau sélectionné).

## 4. Porte *Par mon niveau*

- [ ] **N1 — Entrée.** Clic sur la carte *Par mon niveau* → vue porte niveau affichée. Les 4 cartouches niveau (équipe, programme, portefeuille, entreprise) sont visibles avec double-libellé (N1) et rôles répétés (R2).
- [ ] **N2 — Ouverture accordéon rôles.** Clic sur un cartouche (ex : *portefeuille*) → expansion de l'accordéon, les rôles associés s'affichent avec leurs axes Mintzberg en texte coloré désaturé (cran 3 Doux).
- [ ] **N3 — Clic sur un rôle.** Clic sur un rôle (ex : *Directeur de portefeuille*) → la fiche rôle s'affiche (ou l'action prévue par la doctrine 7.2a-code.3).

## 5. Porte *Par ma maturité*

- [ ] **M1 — Badge Bientôt.** La carte *Par ma maturité* est visible avec badge *Bientôt* et reste inactive au clic. Aucune erreur console.

---

## 6. Tableau de bord et panier

- [ ] **T1 — Ajouter au panier depuis fiche.** Ouvrir une fiche depuis la porte *Par mon problème* → clic sur *Ajouter au tableau de bord* → toast de confirmation. Le badge du tableau de bord dans le bandeau s'incrémente.
- [ ] **T2 — Aller au tableau de bord.** Clic sur *Mon tableau de bord* dans le bandeau → la fiche ajoutée apparaît dans la liste.
- [ ] **T3 — Retirer du tableau de bord.** Clic sur le bouton *retirer* d'une fiche au tableau de bord → la fiche disparaît de la liste, le badge décrémente.
- [ ] **T4 — Panier depuis porte cadre.** Ouvrir une fiche depuis la porte *Par mon cadre* → clic sur *Ajouter au tableau de bord* → même comportement que T1. (Vérifie que le panier est indépendant de la porte d'entrée — cas central pour l'hexagonalisation.)

---

## 7. Lexique et onglets annexes

- [ ] **L1 — Lexique.** Clic sur *Lexique* → vue du lexique s'affiche avec les définitions accessibles.
- [ ] **L2 — À propos.** Clic sur *À propos* → vue s'affiche sans erreur.
- [ ] **L3 — La maturité ?** Clic sur *La maturité ?* → vue actuelle (après `ed51cf0`) s'affiche avec bloc cotation de fiabilité.

---

## 8. Deep-linking et transverses

- [ ] **D1 — Hash direct porte problème.** Charger `cadre-indicateurs.html#porte-probleme` en URL directe → la porte *Par mon problème* s'ouvre sur l'étape 1.
- [ ] **D2 — Hash direct porte cadre.** Charger `...#porte-cadre` → la porte *Par mon cadre* s'ouvre.
- [ ] **D3 — Hash direct porte niveau.** Charger `...#porte-niveau` → la vue porte niveau s'affiche.
- [ ] **D4 — Hash direct onglet.** Charger `...#app-tableau-de-bord` → l'onglet tableau de bord s'ouvre directement.

---

## 9. Console et santé technique

- [ ] **S1 — Console propre.** Aucune erreur rouge dans la console DevTools au chargement initial ni en naviguant.
- [ ] **S2 — Tests panier verts.** Ouvrir `tests-panier.html` → tous les tests verts.
- [ ] **S3 — Tests porte niveau verts.** Ouvrir `tests-porte-niveau.html` → tous les tests verts.

---

## Procédure avant/après une étape du chantier 14

**Avant une étape** (ex : avant d'extraire le noyau hexagonal) :

1. Passer la liste complète ci-dessus. Noter toute divergence par rapport à l'attendu.
2. Si tout est vert, poser un tag git `mvp-avant-etape-X` sur le commit courant avant de commencer.
3. Ouvrir un journal d'étape dans `doc-contrats-chantier-14.md`.

**Après chaque commit d'étape** :

1. Repasser la liste complète.
2. Si un scénario rouge, *stop* : pas de commit suivant. Soit on corrige sans quitter l'étape, soit on rollback.
3. Si tout vert, commit atomique avec message clair. Tag git `mvp-etape-X-Y` sur les jalons majeurs.

---

*Document évolutif. À enrichir si un bug est découvert en cours de chantier (nouveau scénario ajouté pour ne plus le rater). À ne pas élaguer sans décision explicite.*
