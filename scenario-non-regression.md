# Scénario de non-régression — MVP 4 portes

Liste manuelle des clics à passer **avant** chaque étape du chantier 14 (refactor hexagonal), et **après** chaque commit d'étape. Si un scénario ne donne plus exactement le même résultat qu'avant, on arrête, on diagnostique, et on rollback à l'étape précédente si besoin.

**Règle d'or.** On ne déplace pas un test pour le faire passer. Si un scénario change, c'est qu'on a changé le comportement — ce qui est interdit sous le sceau *iso-comportement* du chantier 14.

**Méthode.** Ouvrir `cadre-indicateurs.html` dans un navigateur neuf (ou session privée pour ignorer le `localStorage`). Exécuter les scénarios dans l'ordre. Durée cible : ~10-12 minutes pour passer la liste complète, hors §10 (invariants pré-(c) à figer).

**Convention de notation.**

- `[ ]` = pas à exécuter et cocher.
- `⏸ skip` = pas gelé : décrit un comportement non livré aujourd'hui (chantier dédié au backlog). Ne pas exécuter, ne pas cocher.
- `✎ figer` = pas qui sert à *figer une valeur de référence* avant la bascule (étape (c)). À noter sur papier ou dans le journal d'étape.

---

## 1. Accueil et navigation de base

- [ ] **A1 — Accueil par défaut.** Ouverture directe → `#accueil` s'affiche avec la **pyramide à 4 étages** : Stratégique (Direction & Gouvernance) · Tactique (id `portefeuille` — Arbitrage & Allocation) · Programme & Projet · Équipes. Titre H1 « Par mon niveau », sous-titre « Ton attention est rare. Où la portes-tu ? ». **Aucun bandeau d'onglets n'est visible sur l'accueil** — la nav `<nav class="onglets">` est dans `#app`, masqué jusqu'à entrée par la pyramide ou par une porte.
- [ ] **A2 — Bascule vers les portes.** Lien de pied « Voir les 4 portes d'entrée → » → `#accueil-portes` s'affiche, `#accueil` masqué. Les 4 cartouches *Par mon niveau · Par mon problème · Par mon cadre · Par ma maturité* sont visibles. *Par ma maturité* affiche le badge « Bientôt » et reste désactivée au clic (`aria-disabled="true"`).
- [ ] **A3 — Bouton « À propos ».** Présent en haut à droite sur les deux écrans d'accueil → ouvre la modale `apropos-overlay`. Croix ferme la modale, `aria-hidden` redevient `true`.

> **Note A1/A3 — Pas de bandeau de 7 onglets sur l'accueil.** La cible « nav unifiée à 8 onglets » de la fiche mémoire `project_deux_modes_entree` est gelée derrière la livraison du chantier 14. Aucun bandeau d'accueil avec *Accueil / Tableau de bord / Cascade / Lexique / À propos / etc.* n'a jamais été codé.

---

## 2. Porte *Par mon problème*

- [ ] **B1 — Entrée.** Clic sur *Par mon problème* → vue `#vue-porte-probleme` étape 1. Les 4 niveaux affichés portent les libellés exacts du canon `CM.DiagnosticProbleme` : **Stratégique · Tactique · Programme / Projet · Opérationnel**.
- [ ] **B2 — Sélection niveau.** Clic sur *Programme / Projet* → étape 2 (choix du problème). La liste affichée est un sous-ensemble du vocabulaire fermé des 7 familles : *Délais & prévisibilité · Qualité & stabilité · Flux & goulots · Valeur & rentabilité · Engagement & humain · Alignement stratégique · Risque, sécurité & conformité*.
- [ ] **B3 — Sélection problème.** Clic sur *Délais & prévisibilité* → étape 3 (recommandations). Entre 1 et 5 fiches s'affichent (le nombre est volontairement faible — la matrice est éditoriale, pas exhaustive). Chaque fiche affiche titre + pastille fiabilité + clic ouvre le tiroir.
- [ ] **B4 — Ouverture fiche.** Clic sur une fiche → tiroir latéral s'ouvre avec le contenu des 11 sections (`rendreEnteteFiche`, `rendreCadreLecture`, …, `rendreDomaine`, `Gemba.htmlEncartFiche`). **Aucun bouton « Ajouter au panier » n'est rendu** — voir §6.
- [ ] **B5 — Pivot étape 2.** Depuis l'étape 3, clic sur le pas étape 2 dans le stepper → retour à l'étape 2 avec le niveau préservé.
- [ ] **B6 — Retour accueil.** Bouton « ← Accueil » dans le bandeau de la porte → retour à `#accueil-portes` (pas la pyramide). État de la porte non conservé au prochain clic d'entrée.

> **Note B3 — « Visibilité sur l'avancement ».** Cette formulation **n'existe pas** dans le catalogue actuel. La famille la plus proche est *Alignement stratégique* (visibilité descendante) ou *Délais & prévisibilité* (visibilité du flux). Item de backlog ouvert : enrichissement du catalogue.

---

## 3. Porte *Par mon cadre*

- [ ] **C1 — Entrée.** Clic sur *Par mon cadre* → vue `#vue-porte-cadre` étape 1 (accordéon par école de pensée). Les 7 familles sont listées **toutes fermées à l'arrivée** : *Empirisme agile · Excellence opérationnelle · Observabilité du delivery · Pilotage par les objectifs · IT Service Management · Aide à la décision · Universel*. (Lean / Six Sigma est fusionné dans *Excellence opérationnelle*.)
- [ ] **C2 — Ouverture accordéon.** Clic sur une famille (ex : *Excellence opérationnelle*) → contenu déplié, cadres listés. Les autres familles restent fermées.
- [ ] **C3 — Sélection cadre.** Clic sur un cadre (ex : *DORA*) → étape 2 (choix du niveau). Les 4 niveaux affichés portent **le même canon que la porte problème** (délégation de `CM.DiagnosticCadre.niveauxTous` à `CM.DiagnosticProbleme.niveauxTous`) : **Stratégique · Tactique · Programme / Projet · Opérationnel**.
- [ ] **C4 — Sélection niveau.** Clic sur *Opérationnel* → étape 3 (résultats). Fiches du couple (cadre × niveau) affichées.
- [ ] **C5 — Cadres voisins.** En pied d'étape 3, le bloc *Cadres voisins dans le référentiel* propose 2-3 cadres connexes cliquables.
- [ ] **C6 — Pivot à étage constant.** Clic sur un cadre voisin → remplacement des résultats **sans** régression d'étape (on reste à l'étape 3, niveau préservé). Vérifie l'utilisation de la primitive `remplacerChoix` posée au chantier 7.2a-code.2.

---

## 4. Porte *Par mon niveau*

- [ ] **N1 — Entrée transitoire.** Clic sur *Par mon niveau* → l'application bascule vers `#accueil` (la pyramide à 4 étages). C'est le **comportement provisoire** posé par `onclick="CM.App.afficherAccueil('pyramide')"` en attendant la livraison du chantier 7.2a-code.3.

> ⏸ **skip — N2 / N3 / accordéon rôles / axes Mintzberg.** La transformation de cette porte en stepper accordéons à 4 cartouches Mintzberg (cf. fiches mémoire `project_porte_niveau_roles`, `project_porte_niveau_rendu_visuel`) est livrée côté code (`CM.Roles`, `CM.VuePorteNiveau` extraits aux chantiers 7.2a-code.1 et .2) mais **non câblée à la porte**. À ré-ouvrir au chantier 7.2a-code.3.

---

## 5. Porte *Par ma maturité*

- [ ] **M1 — Badge Bientôt.** La carte est visible avec badge « Bientôt » (`porte-statut bientot`). Clic ne déclenche aucune navigation, aucune erreur console.

---

## 6. Tableau de bord et panier

> ⏸ **skip — T1 / T2 / T3 / T4.** Le module `CM.Panier` est extrait, testé en isolation par `tests-panier.html`, mais **aucun bouton « Ajouter au panier » n'est rendu en UI**. Le tiroir de fiche, les cartes de recommandation et les listes de résultats ne contiennent pas de point d'entrée vers `CM.Panier.ajouter`. Seul `CM.App.retirerDuPanier` est câblé (vue *Mon tableau de bord*, ligne ~8212).
>
> Conséquence : la vue *Mon tableau de bord* affiche le résultat d'un panier vide tant que rien n'est ajouté programmatiquement. Pas de régression à tester ici aujourd'hui.

---

## 7. Lexique et onglets annexes

- [ ] **L1 — Nav réelle après entrée.** Entrer par la pyramide (clic sur *Niveau Équipes*) → la nav `<nav class="onglets">` apparaît avec **4 onglets seulement** : *Mon tableau de bord · Cascade stratégique · Choisir mes indicateurs · Maturité & Recommandations*. **Pas d'onglet *Lexique*, pas d'onglet *À propos*, pas d'onglet *La maturité ?* séparé.**
- [ ] **L2 — À propos.** Bouton flottant en haut-droite (sur l'accueil et dans `#app`) → ouvre la modale.
- [ ] **L3 — Bouton « ← Accueil ».** À droite du bandeau dans `#app` → retour à l'accueil.

> ⏸ **skip — Lexique en onglet, *La maturité ?* en onglet, intégration sur le bandeau d'accueil.** Cible du chantier 10 *Deux modes d'entrée parallèles* (cf. `project_deux_modes_entree`), gelée derrière la livraison du chantier 14.

---

## 8. Deep-linking et transverses

- [ ] **D1 — Hash `#portes`.** `cadre-indicateurs.html#portes` au chargement → `#accueil-portes` est affiché directement (pas la pyramide). Implémenté par `CM.Preferences.HASH_VERS_PREFERENCE`.
- [ ] **D2 — Hash `#pyramide`.** `cadre-indicateurs.html#pyramide` au chargement → `#accueil` (la pyramide) est affiché. Comportement par défaut quand aucun hash n'est présent.
- [ ] **D3 — Hash `#fiche=<id>`.** `cadre-indicateurs.html#fiche=p5` au chargement → le tiroir s'ouvre directement sur la fiche `p5` (chantier 7.6). Le hash est mis à jour quand on ouvre/ferme une fiche.

> ⏸ **skip — `#porte-probleme`, `#porte-cadre`, `#porte-niveau`, `#app-tableau-de-bord`.** Ces hashes ne sont pas implémentés dans `HASH_VERS_PREFERENCE`. À ouvrir au backlog si besoin produit.

---

## 9. Console et santé technique

- [ ] **S1 — Console propre.** Aucune erreur rouge dans la console DevTools au chargement initial ni en navigant entre les portes / la pyramide / les onglets.
- [ ] **S2 — Tests panier verts.** Ouvrir `tests-panier.html` → tous les tests verts.
- [ ] **S3 — Tests porte niveau verts.** Ouvrir `tests-porte-niveau.html` → tous les tests verts.
- [ ] **S4 — Tests requête métriques verts.** Ouvrir `tests-requete-metriques.html` → tous les tests verts (cible : ce que le harnais annonce dans son rapport — voir bloc État courant du backlog pour la valeur de référence).

---

## 10. Invariants pré-(c) — valeurs à figer avant la bascule

> Ces pas sont à exécuter **une fois** (ou lors d'une mise à jour majeure du catalogue) pour figer des valeurs de référence. Après la bascule de chaque porte sur `CM.RequeteMetriques.executer` à l'étape (c), repasser ces mêmes pas et confronter les valeurs : iso-comportement strict.

- ✎ **I1 — Premier id et nombre total — porte problème, couple (Programme / Projet × Délais & prévisibilité).** Exécuter B1 → B2 (*Programme / Projet*) → B3 (*Délais & prévisibilité*). Noter : (a) l'**identifiant de la première fiche affichée** (ex : `p2`), (b) le **nombre total de fiches** dans la sortie. Ce sont les références d'iso-comportement pour la migration de la porte problème.
- ✎ **I2 — Premier id et nombre total — porte cadre, couple (DORA × Opérationnel).** Exécuter C1 → C2 (*Observabilité du delivery*) → C3 (*DORA*) → C4 (*Opérationnel*). Noter id de la première fiche et nombre total.
- ✎ **I3 — Tri par fiabilité — vérification visuelle.** Sur la sortie I1 puis I2, vérifier que l'**ordre des fiches** suit la fiabilité décroissante (`fiable` avant `precaution` avant `prudence`). Si plusieurs fiches partagent la même fiabilité, l'ordre secondaire doit être stable d'une exécution à l'autre — figer cet ordre dans le journal d'étape.
- ✎ **I4 — Triplet vide — message éditorial.** Choisir un couple que la matrice ne couvre pas (ex : *Stratégique × Flux & goulots* qui est volontairement creux selon `MAPPING_REROUTAGE` ligne 82 de `CM.DiagnosticProbleme`). Vérifier qu'un **message éditorial** s'affiche (pas de liste vide silencieuse, pas d'erreur console). **Copier le texte exact** du message dans le journal — c'est lui qui doit être préservé après bascule.
- ✎ **I5 — Capping `limite` — porte cadre.** Choisir un cadre densément peuplé (ex : *Universel* × *Opérationnel*). Compter les fiches affichées vs le total potentiel dans le référentiel pour ce cadre. Si un capping éditorial est appliqué, **figer la valeur du plafond observé**.
- ⏸ ✎ **I6 — Intersection rôle × problème × cadre — porte niveau.** Skip aujourd'hui (porte non rebranchée). À activer dans le scenario de l'étape (c.3) ou (c.4) quand `CM.VuePorteNiveau` consommera `CM.RequeteMetriques`.

---

## Procédure avant/après une étape du chantier 14

**Avant une étape** (ex : avant la migration d'une porte vers `CM.RequeteMetriques`) :

1. Passer §1 → §9 en intégralité. Toute divergence par rapport à l'attendu = stop, diagnostic.
2. Si on n'a pas encore figé §10, le faire maintenant et reporter les valeurs dans `doc-contrats-chantier-14.md` (journal d'étape).
3. Si tout est vert et §10 est figé, poser un tag git `mvp-avant-etape-X` sur le commit courant.

**Après chaque commit d'étape** :

1. Repasser §1 → §9 + repasser §10 et **comparer chaque valeur figée**.
2. Si un scénario rouge ou une valeur diverge : *stop*. Pas de commit suivant. Soit on corrige sans quitter l'étape, soit on rollback (`baseline-avant-hexagonal` = `5655b03`).
3. Si tout vert et toutes valeurs identiques, commit atomique avec message clair. Tag git `mvp-etape-X-Y` sur les jalons majeurs.

---

*Document évolutif. À enrichir si un bug est découvert en cours de chantier (nouveau scénario ajouté pour ne plus le rater). À ne pas élaguer sans décision explicite. Toute mise à jour doit refléter l'**état réel du code**, pas une cible non livrée — sinon le scenario ne valide plus l'iso-comportement.*
