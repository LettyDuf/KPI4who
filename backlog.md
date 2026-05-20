# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **9 mai 2026 (séance reprise close — chantier 23.g livré bout en bout, tag `mvp-chantier-23g-livre` posé sur `ed52a23`, 12 commits cumulés `371a671` → `ed52a23` + 1 commit doc final)** — Le chantier 23.g (tests E2E + sentinelles + scénario de non-régression) est ouvert avec deux sous-commits éditoriaux : `8f746e7` réécrit `scenario-non-regression.md` pour l'architecture post-23.f (140 l. nouvelles, 131 l. caduques retirées — §1-§10 actualisés, §11 invariants I1-I6 posés en structure pour l'accueil unifié, valeurs de référence à figer en 23.g-3) ; `6a3ba46` supprime `journal-invariants-pre-c.md` (60 l. caduques — décrivait les invariants des 4 portes 14 retirées au chantier 23.f, cohérent avec l'option C). Reste à faire : 23.g-3 sentinelles d'invariants (smoke test interactif côté Lætitia pour capturer les vrais nombres) et 23.g-4 tests automatisés `CM.AccueilUnifie` (pattern `tests-requete-metriques.html`). **Précédent — 8 mai 2026 (séance soir close — chantier 23.f livré bout en bout, suppression du legacy d'architecture, 11 commits `8e5a9b6` → `d03ccd0`)** — Onze sous-commits atomiques retirent les 4 portes orphelines (vue-porte-probleme/cadre/niveau, vue-par-question), la pyramide d'accueil, l'orchestrateur générique CM.Stepper, le module CM.DiagnosticCadre devenu orphelin, et démantèlent le toggle pyramide ↔ portes. Détail : `8e5a9b6` (23.f-1 vue-porte-probleme −497 l.) ; `f2ccfcc` (23.f-2 vue-porte-cadre −653 l.) ; `8a70e81` (23.f-3 vue-porte-niveau + DiagnosticCadre orphelin après chute 2 consommateurs −892 l.) ; `abfa3e1` (23.f-4 vue-par-question −251 l.) ; `b6fe19a` (23.f-5 pyramide + fonction CM.App.entrer + garde-fou défensif _montrerAccueil −252 l.) ; `1b6adcb` (23.f-6 CM.Stepper orphelin + 3 fichiers compagnons option C : tests-porte-niveau.html, outils/construire-tests-porte-niveau.js, doc-contrats-stepper-roles.md −7914 l. au total dont 329 dans HTML) ; `e6eced1` (23.f-7.1 sélecteur CSS partagé `#vue-par-question, #vue-porte-*, #app.actif` réduit à `#app.actif` −8 l.) ; `37a2a20` (23.f-7.2 demanderRetourAccueil simplifié −19 l.) ; `7963402` (23.f-7.3 démantèlement complet du toggle accueil : basculerAccueil supprimée, afficherAccueil/_montrerAccueil sans paramètre, mapping CM.Preferences `'pyramide'` retiré) ; `475c067` (23.f-7.4 9 commentaires textuels reformulés pour ne plus citer de modules inexistants) ; `d03ccd0` (23.f-7.5 doc-contrats-chantier-14.md allégé option C : préambule §0 « Statut post-23.f » + §3.4 réécrite + §2/§4-§9 marquées *(archive)*). **Doctrine d'ordre appliquée** : un module pivot tombe **après** tous ses consommateurs (CM.DiagnosticCadre déplacé de 23.f-2 à 23.f-3 après cartographie, CM.Stepper en 23.f-6 après les 3 façades). **Bilan quantitatif** : `cadre-indicateurs.html` passé de 12 110 à 9 176 lignes (-24 %), 3 fichiers compagnons retirés (~7585 l.). **Smoke test interactif Lætitia validé** fin de séance. **Mémoires** : `project_accueil_unifie_v7.md` actualisée (passage de « ce qui meurt » à « ce qui est mort »), nouvelle mémoire `project_chantier_23f_livre.md` posée, MEMORY.md indexé. **Précédent — 8 mai 2026 (séance nuit close — chantier 23.e livré bout en bout, accueil unifié visible et utilisable, 7 commits `03eae05` → `127f592`)** — Le panneau de la cartouche compteur affiche désormais les fiches filtrées en grille 2 colonnes (`htmlCarte` réutilisé tel quel, ordre canonique du référentiel respecté, doctrine traducteur orthodoxe préservée — `03eae05`). **Six fixes UX issus du test interactif côté Lætitia** : **23.e-fix2** retire le lien orphelin *« Comment lire une fiche indicateur ? »* (stub posé en 23.b/c, jamais câblé — `e1dd34b`) ; **23.e-fix1** élargit l'accueil unifié de 740px à 920px pour lisibilité des cartes 2 colonnes — ~412px par carte au lieu de ~322px, titres complets, définition à 3 lignes ; arbitrage tranché côté preview HTML autonome `mockup-23e-largeur.html` entre 880px (option A) et 920px (option B « généreux »), option B retenue (`a6dda4f`) ; **23.e-fix4** supprime la « ligne bleue » entre cartouche compteur dépliée et panneau — fusion des 2 blocs CSS `.accueil-unifie .liste-fiches` qui se piétinaient en cascade (`margin-top:-1rem` du bloc box écrasé par `margin-top:0.4rem` du bloc grille) (`8b67d07`) ; **23.e-fix3** couleur explicite `color: var(--texte)` sur `.carte-nom` — texte rendu mais invisible (blanc sur blanc) parce que le composant héritait de la couleur blanche transmise par le contexte bleu nuit de l'accueil ; le composant est désormais blindé contre tout contexte parent à couleur héritée non foncée (`a4fffc9`) ; **23.e-fix5** compteur d'indices live sur *Mon tableau de bord* — libellé devient « Mon tableau de bord (N) » dès qu'au moins un indicateur est au panier, mis à jour à chaque mutation via l'abonnement existant à `CM.Panier.abonner`, span vide quand panier vide (discrétion) ; 6 spans synchronisés en une passe sur les 6 bandeaux (`0173f20`) ; **23.e-fix6** épure le bloc d'en-tête — option B retenue par Lætitia : retire le surtitre « PAGE UNIFIÉE » (techno-narcissique, redondant avec l'unique page) et le sous-titre « Quatre lentilles à combiner. » (redondant avec les 4 chips visibles juste en dessous) + le filet ornemental qui n'a plus de fonction de séparation. Reste un h2 seul, épuré. Note projet pour la suite : *« on ajoutera la mission par la suite »* — un commit dédié réintroduira un élément de contexte/mission au-dessus du h2 (`127f592`). **Deux points reportés volontairement** : (i) friction 7 garde-fou `beforeunload` qui se déclenche au clic sur une fiche-question (panier non vide) — 4 options identifiées (target="_blank", modale interne, garde-fou conditionnel, LocalStorageDepot), Lætitia tranchera en commit dédié ; (ii) ré-câblage de la « mission » dans l'en-tête épuré, même remarque. **Mockup-preview produit** : `mockup-23e-largeur.html` (740/880/920 côte à côte avec les mêmes 2 cartes DORA pour comparaison stricte), conservé pour traçabilité de la décision. **7 commits sur cette séance nuit.** Précédent — **8 mai 2026 (séance soir close — chantier 23.d livré, accueil unifié interactif bout en bout — 7 commits `5ebb0d7` → `696e589`)** — Quatre sous-chantiers + un fix UX, dans l'ordre : mockup-preview α (lien sortant) vs β (index inline) (`5ebb0d7`) ; mockup β finalisé après arbitrage Lætitia — emojis du référentiel + sans sous-titres (`bd29219`) ; **23.d-0** correction de la coquille `5 → 6 questions terrain` dans le squelette HTML (`655376a`) ; **23.d-1** cliquabilité des deux cartouches — délégation de clic, abonnement `surChangementCartouche`, synchro DOM aria/classe/libellé/chevron, panneaux dépliables `data-cartouche-panneau` repérés par id (`f5cd431`) ; **23.d-2** compteur live N branché au traducteur orthodoxe `CM.RequeteMetriques.executer` — état chips → filtre canonique (niveau/maturiteMin/tags/cadres), libellé `.axes-actifs` français naturel pour 0/1/2/3+ lentilles actives, total absolu mis en cache au montage (`a6ad178`) ; **23.d-3** index inline des 6 fiches-questions dans le panneau de la cartouche question — set d'emojis validé (🍉 📅 🔄 🚧 🪜 🪞), liens vers les mockups HTML autonomes existants, CSS scopé `.accueil-unifie .panneau-cartouche .liste-questions-inline` (`14162ee`) ; **23.d-fix1** largeur de `.accueil-unifie` rendue stable — bug remonté par Lætitia au test interactif : `#accueil-portes` est `flex column align-items:center`, donc l'enfant prenait la largeur intrinsèque du contenu le plus large (chips multi-actives, panneau déplié), ce qui faisait varier la largeur perçue à chaque déploiement ; fix `width:100%` borné par `max-width:740px` (`696e589`). Arbitrage tranché : Q1 89 vs 75 indicateurs → option (i) — on assume les 89 du référentiel réel, le `75` du mockup et de la doctrine v7 était un placeholder ; `doc-cadre-visuel.md § 6.1` et la mémoire `project_accueil_unifie_v7.md` mises à jour. **7 commits sur cette séance soir.** Précédent — **8 mai 2026 (séance nuit close — étape 1 du MVP global v1 livrée + étape 1.bis bandeau du haut livrée + bug porte niveau corrigé — 9 commits `d51c0ae` → `8430a0b`)** — Trois livraisons enchaînées dans la même séance. (i) **Étape 1 du MVP global v1 close** : défaut accueil basculé sur les portes (`d51c0ae`), 5e porte *Par ma question* avec vue d'index minimaliste des 6 fiches-questions livrée (`1566f63`), layout 2x2 + 5e tuile sur 2 colonnes acté après preview B (`366f647`). (ii) **6 mockups de fiches-questions nettoyés** des annotations de chantier (`5afe198`) — option B retenue : `.titre-mockup` et `.note-pedagogique` retirés, l'aphorisme du `.pied-mockup` conservé pour signature éditoriale. Doctrine *autonome = source unique* matérialisée par la disparition du métalangage de production. (iii) **Étape 1.bis livrée en avance — bandeau du haut à 8 entrées** présent sur les 6 vues de premier rang : accueil portes (`5d2a1c1`), vue par question (`5d2a1c1`), vues détail des 3 portes problème/cadre/niveau (`5c72263`), `<div id="app">` Mon tableau de bord et onglets internes (`c658a53`). 8 entrées exactement comme prescrit dans `doc-contrats-navigation.md` § 4.1 (23/04/2026) : *Accueil · Mon tableau de bord · Par mes 4 axes · Par ma question · Cascade stratégique · La maturité ? · Lexique · À propos*. Wiring détaillé : Accueil/Mon tableau de bord/Par ma question/À propos fonctionnels ; Par mes 4 axes actif sur les 3 vues détail (mais stub sur les autres écrans) ; Cascade/Maturité/Lexique stubs (orphelins assumés tant que le chantier 10 reste verrouillé par MISSION.md). Doublons retirés en pied de l'accueil portes (Lexique des termes + bouton À propos flottant) et de l'en-tête de l'app (logo + bouton ← Accueil). Nouveau dispatcher `CM.App.demanderRetourAccueil()` : détecte la vue active par !el.hidden et délègue au `retourAccueil()` du module concerné. État actif marqué fond pill `--niv-1-clair` (variante B retenue 23/04/2026 chantier 10). (iv) **Bug porte par mon niveau corrigé** (`8430a0b`) — câblage historique `CM.App.afficherAccueil('pyramide')` remplacé par `CM.VuePorteNiveau.ouvrir()` : la porte ouvre maintenant son stepper rôle → problème → cadre, comme ses 3 sœurs. La pyramide reste accessible uniquement via le lien de pied (en sursis). (v) **Friction consignée § 10 backlog** (`8ddc85f`) — redondance pyramide ↔ choix du niveau dans la porte par mon niveau remontée par Lætitia, à traiter avec la disparition de la pyramide au chantier 10. **9 commits sur la séance**. Précédent — **7 mai 2026 (séance nuit close — MVP chantier 20.5 clos à 6/8-12 fiches + vision MVP global v1 actée — 2 commits `0958edd` `4fd8ebf`)** — Deux décisions stratégiques. (i) **MVP chantier 20.5 clos à 6/8-12 fiches**, option A retenue, sous-cible doctrinale assumée, garde-fou 16.2 anti-encyclopédie a tranché. (ii) **Vision MVP global v1 actée** : page d'accueil 3 portes + lien vers les 6 fiches-questions + bandeau du haut fonctionnel avec tableau de bord + impression. Effort estimé 10-13h sur 3-4 séances. Ordre de bataille retenu : (1) activer accueil 3 portes par défaut (~1h, gain visible rapide), (2) résorber dette T1 chantier 9 (câbler voies d'ajout au panier, ~4-6h), (3) créer 5e porte *Par ma question* en option β (vue intégrée qui héberge index riche des 6 fiches-questions, ~4h), (4) tests de bout en bout + finitions impression (~2h). Détail : arbitrage entre 3 options pour le panel non couvert *Terrain des autres cadres* — (A) clore le MVP à 6 fiches, (B) une fiche transversale BSC/OKR/ITIL, (C) une fiche transversale + une fiche ITIL résilience opérationnelle. Option B initialement préférée par moi puis révisée à froid : élargissement du panel à Chaos Engineering (Rosenthal/Jones/Cockcroft) sans mandat formel, cible utilisateur DSI/SRE minoritaire, dette de référentiel divergente. **Décision : option A retenue.** Place gardée pour un angle terrain qui remontera nommément. Aucun nouveau commit de mockup ; commit unique de doctrine sur le backlog. **Précédent — 7 mai 2026 (séance soir — 4<sup>e</sup>, 5<sup>e</sup> et 6<sup>e</sup> fiches MVP livrées, doctrine § 4.4 généralisée + famille Drucker fermée)** — Détail : (i) **4<sup>e</sup> fiche-question MVP** : *« Par où démarrer une démarche d'amélioration continue ? »* (chantier 20.5, panel Coach Lean) — autonomisation d'une matière éditoriale rédigée le 05/05 (commit `fd2f66d`) qui vivait dans le mockup format. Doctrine *autonome = source unique, mockup-format pointe* actée. (ii) **Mockup-format scène 1 → miroir didactique** — pointeur vers la fiche autonome, juxtaposition § 4.4 / § 4.3 conservée. (iii) **Cross-link réciproque pasteque ↔ amélioration continue** désormais effectif des deux côtés. (iv) **5<sup>e</sup> fiche-question MVP** : *« Pourquoi ma transformation résiste ? »* (chantier 20.5, panel Gestion du changement — Kotter / ADKAR / Bridges / Lewin). **Premier test § 4.4 hors couloir Lean-Agile-Drucker — concluant** : la mécanique tient sans modification structurelle. ADKAR utilisé comme grille pédagogique de Q1 (5 options qui glosent les 5 phases A/D/K/Ability/R). Trio par niveau cartographique : Mental — Conscience et désir / Comportement — Connaissance et capacité / Durabilité — Renforcement. (v) **Revue Lætitia déclenche 2 corrections** : Q2 *« équipe pilote »* → *« équipe en transformation »* (v2, copier-coller fautif depuis amélio continue) ; sigles ADKAR + anglicismes nettoyés des cards (v3, voix française du projet). (vi) **Décision 20.5** : 3/8-12 → 5/8-12, 4 panels couverts. (vii) **Nouvelle dette de référentiel** : 3 fiches métriques absentes (score conscience-désir, taux d'adoption, fréquence régressions) + fiche cadre *Gestion du changement* à créer (constat collatéral n°10 du chantier 1.ter, désormais directement motivé). Mockups : `mockup-fiche-question-amelioration-continue.html` (457 lignes) · `mockup-fiche-question-resistance-transformation.html` (489 lignes). **8 commits sur cette séance soir** — `9eaf704` `613f46f` `f5cf068` `6b39cad` `07aa693` `6ad97bf` (clôture intermédiaire `01796ee`) puis `2f4f179` (6<sup>e</sup> fiche MVP, prolongation après revue de Lætitia : *« Comment cascader des objectifs jusqu'au terrain ? »*, panel Coach exécutif Drucker MBO orthodoxe — Drucker / Locke & Latham / Humble — variante § 4.4, **famille Drucker fermée** côté méta (pasteque) et côté mécanique de cascade (cette fiche). Trio cartographique Alignement / Capteurs / Dialogue. Lien sortant désactivé vers la fiche cadre MBO en `CADRES_A_VENIR`).

Précédent — **7 mai 2026 (séance journée — 2 fiches-questions livrées, 3 itérations chacune, 4 doctrines bougées)** — (i) **2<sup>e</sup> fiche-question MVP livrée** : *« Mes indicateurs reflètent-ils la réalité du terrain ? »* (chantier 20.7, fiche pastèque), variante méta. **Doctrine § 4.6 *Trio à 3 axes invariants* inaugurée** comme mécanique-sœur de § 4.4. (ii) **Décisions 20.7 et 20.8 closes** — cross-link réciproque effectif entre les fiches-questions livrées. (iii) **3<sup>e</sup> fiche-question MVP livrée** : *« Quoi mettre dans mon pilotage hebdomadaire ? »* (chantier 20.5, panel Coach Agile), **première matérialisation autonome de la variante § 4.3 (à reformulation)** hors mockup format. (iv) **Nouvelle dette de référentiel** sur la fiche pastèque : 2 fiches déclaratives + 1 fiche cadre patrimoniale *triangulation*. **15 commits** : `f5fb2df` `9baa152` `b2798cf` `cec66e0` `97eb530` `ffba1ae` `b8de41b` `cb1248c` `528d08f` `8367a9c` `6e278bd` `798c4be` `85c9f5f` `010987a` `80160fb` `985e3c0` (clôture `388cae2`).

Précédent — **6 mai 2026 (séance journée — palette + dette de référentiel close)** — (i) décision 20.1 *Palette définitive* close en deux temps : palette **D bleu de Prusse `#1d3a5f`** retenue après audit visuel cross-niveaux (B vert profond rétrogradée en réserve, motif : confusion à 2 niveaux). Doctrine actualisée `doc-cadre-visuel.md` § 6.5 et `doc-catalogue-questions-fines.md` § 4.5. Mockup format en v4.2. (ii) **Dette de référentiel close** : 4 fiches métriques manquantes créées (`lss-1` First-pass yield × équipe, `p9` Lead time × programme, `s11` COPQ × stratégique, `s12` Écart de vérité × stratégique) sur patron éditorial enrichi. Nouveau préfixe `lss-*` introduit pour les indicateurs Lean Six Sigma orthodoxes. Lien Premier passage conforme réactivé dans la fiche-question. (iii) Nouvelle dette détectée : filets niveau équipe/tactique sous-AA comme composants graphiques. **20 commits au total** sur la séance.

---

## État courant (reprise rapide)

*Bloc lu en premier à chaque reprise de session. Mis à jour comme dernière action avant de fermer la conversation. Doit tenir en ~10 lignes.*

- **Événement majeur de la séance 16/05/2026 (2 commits `ceef5f7` `ddb6b74`) — chantier 26 ouvert, jalon A bouclé** : ouverture du **chantier 26 — Intégration et activation niveau 3 des fiches-questions** (`ceef5f7`) suivie de la livraison du **document compagnon `doc-contrats-fiche-question.md` v0.1** (`ddb6b74`, 335 lignes). Cadrage acté avec Lætitia : bascule des 5 mockups autonomes vers une architecture intégrée (module `CM.FicheQuestion`, patron `CM.AccueilUnifie` / `CM.Referentiel`), activation niveau 3 (chaque clic recompose le trio, ~36 cellules à rédiger au total répartis sur 4 fiches actives + 1 fiche § 4.3 seulement harmonisée), harmonisation visuelle sur `doc-cadre-visuel.md` § 6.0 et § 6.5. **Découpage en 5 jalons** (A cadrage / B PoC pastèque / C migration 4 autres / D câblage final + retrait mockups / E tests E2E + smoke test). Effort estimé 20-25h sur 5-7 séances. **Jalon B livré bout en bout dans la même séance (3 commits code initial + 3 commits correction doctrinale post-smoke).** Code initial : `c4c58f4` tokens CSS, `9b9f201` module CM.FicheQuestion + catalogue pastèque § 4.6 + CSS du composant 657 l., `bad48ed` vue + route hash + délégation de clic 163 l. **Trois fixes doctrinaux après remontée Lætitia sur captures** : `df78a85` (1er fix doctrines éditoriales — anglicismes steering→comité de pilotage / rework→retravail / Roadmap→Feuille de route / board→comité de direction / logs→journaux d'exécution / manager→responsable + 5 em dashes éditoriaux substitués selon doctrine B + classe body crème pour fond pleine fenêtre), `11f3c39` (2e fix après nouvelle capture — fond ambre des options non actives retiré + tous em dashes structurels substitués 'Card 1 : par où commencer' etc., enseignement : doctrine B est rétrospective, pas prospective), `75148cb` (3e fix après capture finale — fond crème retiré complètement, harmonisation sur le gradient --page-bg du reste du site, doctrine § 6.0 'papier crème commun' obsolétée par le basculement du chantier 23). **Nouvelle mémoire posée** : `feedback_caracteres_ia_types_nouvelles_redactions.md` — règle stricte pour toute matière nouvellement rédigée à partir du 16/05/2026 (em dashes / en dashes / ellipsis / smart quotes interdits dès le 1er jet), indexée dans MEMORY.md. Module testable depuis console (18/18 tests fonctionnels Node verts) et fonctionnel dans Safari à `cadre-indicateurs.html#fiche-q=pasteque` (smoke test interactif validé 6/6 pas après détour explicatif sur l'URL — le lien d'accueil pointe encore vers l'ancien mockup statique, bascule prévue au jalon D). Matrice 3 axes × 3 niveaux = 9 cellules rédigées (1 cellule explicitement CADRES_A_VENIR pour humain × programme — constat collatéral à porter au catalogue). Hook panier `optionsRendu.avecActionsPanier` posé, désactivé par défaut. Doc compagnon `doc-contrats-fiche-question.md` v0.2 livré (commit `001e56d`). Doctrine 07/05/2026 *« autonome = source unique »* à archiver au jalon D avec sa raison d'être historique. **Tag `baseline-avant-chantier-26` à poser AVANT le jalon B** (premier commit de code). **Re-smoke test fixes 09/05 validé bout en bout** en ouverture de séance — perception « cadres bandeau du haut différents par paires » explicable par longueur des libellés (Accueil/Lexique 7 lettres, Mon tableau de bord/Cascade stratégique 16-18 lettres), statu quo conservé. **Friction beforeunload** : Lætitia rappelle qu'on avait déjà tranché pour le MVP — doctrine session éphémère actée 22/04/2026 (`MemoireDepot` + `beforeunload`, `LocalStorageDepot` post-MVP). Mon recommandation initiale d'option D était hors-MVP, retirée.
- **Événement majeur de la séance 13-15/05/2026 (4 commits `6d23bd5` → `5760306`) — chantier 1.quater LIVRÉ BOUT EN BOUT (I.a + I.b)** : dette typographique du référentiel éteinte. **Origine** : reprise du 13/05 a détecté ~383 modifs non committées sur `cadre-indicateurs.html`, issues d'une session précédente interrompue qui avait commencé à attaquer le chantier (I) listé en « prochaine action recommandée » de la séance précédente. Le diff combinait deux opérations entrelacées de qualité éditoriale très différente (ré-accentuation systémique + substitution mécanique des em dash en deux-points). Revert du diff puis scission de l'item (I) en (I.a) accents et (I.b) em dash dans le backlog (commit doc `6d23bd5`, § 1.quater ouverte le 13/05). **(I.a) clos en 2 commits le 13/05** : `d811336` (403 ré-accentuations sûres + 79 cas `a → à` confirmés préposition par audit contextuel heuristique) + `cb7e59f` (15 ré-accentuations sur homographes, validés un par un par juxtaposition de contexte). Total : 418 ré-accentuations appliquées. **(I.b) clos en 1 commit le 15/05** : `5760306` (282 substitutions contextuelles d'em dash + 69 conservations légitimes selon doctrine B). Méthode itérative en 3 passes d'heuristique (v1 → v2 → v3) avec 5 fonctions rhétoriques distinguées (Traduction, Précision, Adversatif, Annonce, Explicitation) et 2 règles correctives ajoutées en v3 (A : em dash dans parenthèse → virgule plutôt que point ; B : paires d'em dash en incise encadrée → traitement homogène par conservation). Doctrine B « conserver les usages typographiques légitimes » retenue par Lætitia plutôt que A « bannir tous les em dash » (la règle du 09/05 « aucun caractère IA-typé » s'applique à la mission de l'accueil, pas mécaniquement au référentiel — le tiret cadratin a une vraie tradition typographique française à condition de distinguer ses fonctions rhétoriques). Sentinelles vertes après chaque commit code (vocabulaires alignés + 63/63 tests requete-metriques).
- **Événement majeur de la séance prolongée (8-9/05/2026, 39 commits `8e5a9b6` → `89ffeab`)** : **chantier 23.f livré bout en bout (11 commits) + chantier 23.g LIVRÉ BOUT EN BOUT (3 sous-commits doc 23.g-1/-2/-3 + 1 commit C3 + 7 commits 23.g-4 — outil compagnon + scenario + journal mis à jour). Tag `mvp-chantier-23g-livre` posé sur `ed52a23`.** **23.f** a retiré le legacy d'architecture rendu orphelin par l'accueil unifié : 4 portes (vue-porte-probleme/cadre/niveau, vue-par-question), pyramide, CM.Stepper, CM.DiagnosticCadre, toggle pyramide ↔ portes. `cadre-indicateurs.html` passé de 12 110 à 9 176 lignes (-24 %), plus 3 fichiers compagnons retirés. Voir mémoire `project_chantier_23f_livre.md` pour le détail. **23.g-1** (`8f746e7`) réécrit `scenario-non-regression.md` pour l'architecture post-23.f : §1-§10 actualisés (~38 pas exécutables), §11 invariants I1-I6 posés en structure. **23.g-2** (`6a3ba46`) supprime `journal-invariants-pre-c.md` (60 l. caduques). **23.g-3** (`fab24ff`) crée `journal-invariants-23g.md` figeant les 6 invariants relevés sur HEAD = `d03ccd0` (= tag `mvp-chantier-23-livre`, posé en ouverture de séance 09/05) : 89 fiches au total, Programme = 9 / DORA = 4 / Programme×DORA = 0 (structurel). 3 constats collatéraux fixés en marge du journal (C1 garde-fou DORA×Programme, C2 tri secondaire stable par ordre source, C3 double libellé pour combinaison vide). **Préalable C3 résolu** (`371a671`, 09/05/2026) : le panneau adopte mot pour mot le libellé du compteur — *« Aucun indicateur ne combine ces lentilles. »* (option A retenue par Lætitia après juxtaposition de 3 options ; raisons : « indicateur » est le mot canonique côté utilisateur, « lentilles » est le vocabulaire de l'accueil unifié, voix directe et bienveillante). Commentaire CSS adjacent aligné. Journal `journal-invariants-23g.md` mis à jour : I4 et I6 réactualisés avec le libellé canonique unique, section C3 marquée ✅ RÉSOLU. **Reprise séance 09/05/2026 — point reporté n°3 fermé (`35bbc61`)** : le bloc CSS mort `.porte-statut` / `.porte-statut.bientot` (15 lignes orphelines depuis le retrait de la porte maturité en 23.f) a été retiré de `cadre-indicateurs.html`. Aucun usage HTML/JS résiduel. **Reprise séance 09/05/2026 — point reporté n°2 fermé (`378634d` + `58a5dca`)** : la mission promise dans `127f592` a été réintroduite dans l'accueil unifié, composition « manifeste deux étages » validée Beta du `mockup-mission-accueil.html` v6 après itération avec 2 experts DA + UX writer (3 mockups, 6 variantes). Phrase canonique : *« Choisir, comprendre, expliquer : les indicateurs pertinents, du terrain à la stratégie. »* Étage 1 : verbes capitales scandés par slashes en ambré `--ambre`. Étage 2 : suite serif Georgia italique blanc cassé 1.55 rem. Doctrine § 6.1 strate 2 du `doc-cadre-visuel.md` mise à jour dans le même mouvement (note de doctrine sur la mission ajoutée). Aucun caractère « IA-typé » (em dash, en dash, ellipsis, smart quotes) — règle qui s'étendra au reste de l'app dans des passes suivantes. **Reprise séance 09/05/2026 — chantier 22 livré bout en bout (4 commits ABCD : `26a27b6` postures, `230db2a` conseil pédagogique, `aa8d9d5` messages d'action, `ff83d5c` 8 mockups)** : 42 corrections de tutoiement sur 9 fichiers (cadre-indicateurs.html + 8 mockups doctrinaux), espaces insécables U+00A0 préservés, citations patrimoniales et `term-def` exclus, ~15 occurrences confirmées hors périmètre dans les `risque:` des fiches (citations d'usages pervers). **Spin-off du chantier 22** : ouverture du **chantier 25 « Audit des zones inactives »** (`fec3ca2`) suite au repérage de `_rendreQuestionnaire()` (VUE 3 legacy non reliée au bandeau actuel) — méthode d'audit en 4 étapes posée, cas connus listés, articulation avec 23.f précisée. **Smoke test interactif Lætitia 09/05/2026 — 2 fixes immédiats** : (a) **`a4659c8`** harmonisation de la largeur d'accueil 920 → 1240 px (alignement sur `.contenu` des autres vues, dette post-23.e jamais croisée) ; (b) **`0950fba`** retrait de l'entrée parasite « Scène 1 — Dans le mockup-format » dans l'index des fiches-questions + correction du compteur en dur 6 → 5 questions terrain (bug d'inclusion 23.d-3, pointait vers le mockup de référence doctrinal au lieu d'une vraie fiche-question). **Smoke test interactif suite — 4 commits supplémentaires** : (c) **`2270e52`** accent à *« clés »* ajouté dans la fiche p1 (jalons) ; (d) **`8e996e5`** grille `.liste-fiches` passée de 2 à 3 colonnes (harmonisation avec page maturité) ; (e) **`f20ba63`** tri par proximité de maturité dans `CM.AccueilUnifie` (solution intermédiaire pour la chip Maturité, garde la sémantique cumulative mais classe par distance ordinale au filtre, alternative au re-tagging massif des 89 fiches) ; (f) **`89ffeab`** revert de l'estompage des fiches éloignées (opacité 0.72 testée puis retirée — n'apportait rien à l'usage selon le smoke test, le tri suffit).
- **Chantier 23 — état d'avancement** : 23.a ✅ · 23.b ✅ · 23.c ✅ · 23.d ✅ · 23.e ✅ · 23.f ✅ · **23.g ✅ LIVRÉ** (23.g-1 ✅ · 23.g-2 ✅ · 23.g-3 ✅ · 23.g-4.1 ✅ · 23.g-4.2 ✅ section A 21/21 · 23.g-4.3 ✅ section B 9/9 · 23.g-4.4 ✅ outil compagnon + scenario §11 + journal clos · tag `mvp-chantier-23g-livre`).
- **Chantiers ouverts cumulés** : 21 (vue Lexique) · 13.bis (chips cumulables maturité) · ~~22 ✅ livré (harmonisation tutoiement, 4 commits ABCD le 09/05/2026)~~ · ~~23 ✅ livré (refonte radicale accueil — clos sur ed52a23, tag mvp-chantier-23g-livre)~~ · 24 (URLs partageables des filtres, en attente trigger) · **25 (audit zones inactives — ouvert le 09/05/2026 suite à repérage en chantier 22)** · *Constat collatéral n°1 latent — sort de l'attribut `axes:[…]` Mintzberg* · *Constat collatéral n°2 latent — audit vocabulaire de l'accueil*.
- **Points reportés cumulés (à reprendre en commits dédiés)** :
  1. **Friction garde-fou beforeunload** sur clic fiche-question (depuis 23.e) — Safari demande « Voulez-vous vraiment quitter cette page ? » dès que le panier n'est pas vide. Quatre options identifiées. Lætitia tranchera.
- **État de l'outil après clôture séance 13-15/05/2026 (`5760306`)** : quatre commits supplémentaires depuis `89ffeab` — (n) scission backlog § 1.quater (`6d23bd5`), (o) 403 ré-accentuations sûres + 79 cas `a → à` (`d811336`), (p) 15 ré-accentuations sur homographes (`cb7e59f`), (q) 282 substitutions contextuelles d'em dash + 69 conservations légitimes (`5760306`). Cumulé sur la séance 8-9/05 : treize changements depuis `ed52a23` — treize changements depuis `ed52a23` — (a) retrait CSS mort `.porte-statut` (`35bbc61`), (b) mission « manifeste deux étages » (`378634d`, +41 lignes), (c) doctrine § 6.1 strate 2 (`58a5dca`, +15 lignes doc-cadre-visuel.md), (d) tutoiement 4 postures par rôle (`26a27b6`), (e) tutoiement conseil pédagogique (`230db2a`), (f) tutoiement 2 messages d'action (`aa8d9d5`), (g) tutoiement 8 mockups doctrinaux (`ff83d5c`, 29 remplacements), (h) harmonisation largeur accueil 920 → 1240 px (`a4659c8`), (i) retrait entrée parasite + compteur 6 → 5 (`0950fba`), (j) accent à *« clés »* fiche p1 (`2270e52`), (k) grille `.liste-fiches` 2 → 3 colonnes (`8e996e5`), (l) tri par proximité de maturité (`f20ba63`), (m) revert estompage des fiches éloignées (`89ffeab`). Smoke test interactif Lætitia effectué 09/05/2026 : 2 frictions remontées et corrigées en 2 fixes immédiats (`a4659c8` largeur 1240, `0950fba` entrée parasite). Re-smoke test à faire après ces 2 fixes pour confirmer harmonisation visuelle entre l'accueil et les autres vues, et compteur « 5 questions terrain ». Les invariants I1-I6 du `journal-invariants-23g.md` restent valides (aucune modification du référentiel ni du moteur de filtrage).
- **Mockups produits cette séance prolongée** : aucun. **Outillage de tests automatisés produit en 23.g-4** : 2 harnais HTML autonomes + 3 outils Node zéro-dépendance, ~5 000 l. cumulées :
  - `tests-accueil-unifie.html` (1457 l. — 21 tests unitaires sur stubs en 6 sous-sections A.0-A.6) + générateur `outils/construire-tests-accueil-unifie.js` (170 l.)
  - `tests-accueil-unifie-sentinelles.html` (3070 l. dont 2640 injectées : 5 zones de `cadre-indicateurs.html` — CM.Referentiel + CM.IndicateursMeta + 15 blocs de données + CM.RequeteMetriques + CM.AccueilUnifie) + générateur 5-zones `outils/construire-tests-accueil-unifie-sentinelles.js` (~210 l.) — 9 sentinelles I1-I6 + A1-A3
  - Outil compagnon CLI `outils/lancer-tests-accueil-unifie.js` (~150 l., régénération + parse-check, doctrine zéro-dépendance préservée)
  - Smoke-tests Lætitia validés : 21/21 + 9/9 verts.
- **Mémoires actualisées en clôture séance soir 8/05** : `project_accueil_unifie_v7.md` + nouvelle mémoire `project_chantier_23f_livre.md` + MEMORY.md indexé. Pas de mise à jour mémoire post 23.g-1/-2/-3 (rien de doctrinal nouveau ; les 3 constats C1-C3 vivent dans le journal du chantier).
- **Workflow git sandbox** : pattern `mv .git/index.lock` toujours actif (à étendre à `.git/HEAD.lock` si besoin — observé sur le commit du journal 23.g-3). ~14 paires `.git/*.lock.tmp` accumulées sur la séance 8-9/05 + ~7 nouvelles paires `.git/*.lock.tmp.13mai-*` et `.git/*.lock.tmp.15mai-*` sur la séance 13-15/05, s'ajoutent aux ~44 paires des séances précédentes. Plus ~10 fichiers `.todelete-23*` (backups + fichiers retirés via mv côté sandbox).
- **Séance 16/05/2026 (reprise après clôture `75148cb`) — fix harmonisation largeur fiche-question (1 commit `c69524d`)** : friction remontée par Lætitia à la reprise — la fiche-question fait 880px, le reste du site 1240px (mêmes 360px de dissonance que le fix `a4659c8` du 09/05 sur l'accueil). Arbitrage UX-UI mené sur preview HTML autonome `mockup-largeur-fiche-question.html` (4 options δ/α/β/γ juxtaposées sur la matière pastèque, traits violets verticaux pour la référence 1240px). **Option α retenue** : 1240px plein, alignement strict. Modifications : `.fiche-q` et `.fiche-q-retour` passés de 880 à 1240px. Tag de retour `baseline-avant-c1-fiche-q` posé sur `68dbd99` avant le fix.
- **Séance 16/05/2026 (reprise même jour) — sous-chantier 26.h LIVRÉ BOUT EN BOUT (8 commits `348d146` → `5d5dae3`)** : sur question Lætitia *« pourquoi les fiches de trio devraient-elles être différentes des cards d'accueil ? »*, ouverture d'un sous-chantier transverse d'harmonisation des cards de trio avec la card d'accueil canonique. Audit éditorial des 9 cellules de la matrice pastèque : **2 cellules portent un dispositif d'observation, pas une métrique canonique** — declaratif × équipe (« Engagement de sprint vs livré ») et declaratif × programme (« Feuille de route engagée vs réalisée »). **Trois doctrines posées dans le doc compagnon v0.3 puis v0.4** : (D3) la matrice ne porte plus que `intention` + `ficheRef`, source unique de vérité du nom canonique = `CM.Referentiel` ; (Mot pastèque) banni des libellés visibles (niveau 1), conservé en référence érudite Kersten dans le pied (niveau 2), id technique conservé (niveau 3) ; (Pied panier) activé d'office dans les cards de fiche-question via `prioritaire=true`. **Bascule de 2 cellules en CADRES_A_VENIR** (declaratif × équipe, declaratif × programme). **Composition finale F4 v2 actée après 3 smoke tests Lætitia successifs** (7 frictions cumulées traitées) : card d'accueil canonique pure au sommet (contour fiabilité vert/orange/rouge), pied-info discret rang · axe · niveau, zone Intention séparée par bordure pointillée. Aucun chrome coloré autour. **Uniformité des hauteurs résolue par grid 3×3** piloté par `.fiche-q-indicateurs` (`grid-auto-flow: column`, `display: contents` sur le wrapper) — les 3 cards d'indices sont strictement uniformes en hauteur, idem pied-info et intentions. **Bouton retour** rendu visible (fond blanc franc + bordure bleu de Prusse + SVG flèche-gauche line). **Mockups archivés** en `.todelete-26h`. Tag de clôture **`mvp-chantier-26h-livre` à poser sur `48c35e5`**.
- **Séance 2026-05-20 — jalon C.1 LIVRÉ (5 commits `c36f2ca` → `05298e9`, smoke test à venir au C.1.7)** : migration de la fiche `pilotage-hebdo` (variante § 4.3 reformulation) du mockup autonome vers le catalogue intégré `CM.FicheQuestion`. **Cinq commits atomiques** : `c36f2ca` (C.1.1 données — bloc Object.freeze ajouté au CATALOGUE, doctrine B rétrospective sur em dashes, anglicismes patrimoniaux Throughput/Lead time/Change failure rate via `<span class="traduction">`), `168920f` (C.1.2 domaine — `composer()` dispatche désormais §4.3 vers `_composerReformulation()`, pure fonction sans Q1/Q2, test fonctionnel node 19 assertions vertes), `0b48633` (C.1.3 vue — `htmlFiche()` dispatche §4.3 vers `_htmlReformulation()`, double colonne cliquable avec helper `_ficheQExisteAuCatalogue` pour bascule auto active/dégradé, mention *(fiche en cours de constitution)* en mode dégradé), `e402694` (C.1.4 CSS — bloc spécifique double colonne ajouté en fin du `<style>` du module, classes `.fiche-q-double-reponse`, `.fiche-q-colonnes`, `.fiche-q-col-rep[-gauche|-droite|-en-attente]`, bordures top --niv-tactique/--niv-equipe, citation patrimoniale en pied), `05298e9` (C.1.5 doc compagnon v0.5 — § 3.3 schéma actualisé `porteCible`→`ficheQCible`, mécanique d'interaction documentée avec 3 cas d'exécution, § 6 ligne C.1 marquée ✅ LIVRÉ, journal entrée v0.5). **Trois arbitrages actés en ouverture C.1, tous documentés** : (1) option C pour le clic colonne (voisine prédéclarée + bascule auto en mode dégradé tant que la voisine n'est pas au catalogue) ; (2) doctrine B rétrospective pour les em dashes du mockup d'origine (matière née avant le 16/05) ; (3) anglicismes patrimoniaux conservés dans `<span class="traduction">`. **Décision de vocabulaire prise en ouverture** : `porteCible` (caduc depuis le retrait des portes en 23.f) renommé `ficheQCible`, cohérent avec `ficheRef` du domaine. **Cibles des deux colonnes** : gauche `CADRES_A_VENIR` (pas de voisine candidate sur Engagement & humain), droite `amelioration-continue` (voisine logique, le rendu reste en mode dégradé honnête tant que C.2 ne l'a pas migrée). **Smoke test interactif Lætitia reporté au C.1.7**, suivi de l'éventuelle pose du tag `mvp-chantier-c1-livre`.
- **Séance 2026-05-20 (suite) — smoke test C.1, friction 1 traitée (4 commits `c3523d9` → e72ccb2 + 1)** : ouverture du smoke test interactif de la fiche `pilotage-hebdo` intégrée. Deux frictions remontées par Lætitia : (a) *« page difficile à lire, trop de lecture »* ; (b) *« explications trop faibles »* (la fiche affirme sans expliquer en quoi l'audit interne complique la décision). **Traitement** : panel UX convoqué (Krug scannabilité, Tufte data-ink ratio, Bringhurst rythme typographique) ; trois mockups-preview produits (`mockup-fluidite-fiche-q-43.html` : options A référence / B Krug-Tufte / C Bringhurst) ; Lætitia tranche pour un hybride B+C ; mockup `mockup-fluidite-fiche-q-43-hybride.html` produit puis enrichi (explications causales ajoutées) et validé. **Note de méthode (à ne pas reproduire)** : le 1er jet du mockup avait repris la palette crème du mockup d'origine 07/05 — incohérent avec le thème bleu du site (bascule 08/05). Corrigé en v2, palette officielle `--page-bg`. Rappel doctrine `project_doctrine_fond_fiche.md`. **Rétroport en 4 commits atomiques** : `c3523d9` (rendu §4.3 multi-paragraphes — helper `_normaliserParagraphes` rétro-compatible chaîne/tableau, JS + CSS d'aération), `4865a3a` (matière enrichie — `description`/`recommandation`/`ecoles` en tableaux de paragraphes, explications causales, loi de Little sortie du span anti-pattern et glosée, WIP traduit, em dashes substitués), `e72ccb2` (doc compagnon v0.6 — schéma § 3.3 actualisé + doctrine éditoriale *« la fiche explique, elle n'affirme pas »* applicable aux fiches §4.4 C.2-C.4), + ce commit (État courant + section collatérale 26.c1.coll). **Tests** : harnais node, 12 assertions vertes, non-régression §4.6 confirmée à chaque commit. **Re-smoke test visuel validé par Lætitia le 20/05/2026** — l'aération et la profondeur des explications conviennent. Jalon C.1 clos sur le tag `mvp-chantier-c1-livre`, mockups de travail archivés en `.todelete-c1`.
- **Séance 2026-05-20 (suite) — jalon C.2 LIVRÉ ET CLOS (4 commits `e2ab39c` → `db5dbc4` + clôture)** : migration de la fiche `amelioration-continue` (variante § 4.4 standard, trio par niveau). **C.2.a cadrage** : trois trios distincts sur trois axes stables vitesse / qualité / capacité — équipe `o5·lss-1·o6`, programme `p9·p7·p5`, organisation `s12·s11·s6` ; cartographie du référentiel via agent Explore ; mapping Q1 (5 symptômes → 3 axes) ; l'option 2 du trio organisation (`s11·s6·s4`) consignée comme fiche-question candidate post-MVP (`026bf36`, item backlog 26.c2.coll.1). **C.2.b rédaction** : 9 intentions + 3 recommandations, panel Lean (Toyota Way, Lean Six Sigma, TOC, Kata), doctrine v0.6 (la fiche explique le pourquoi), validées par Lætitia. **C.2.c portage** en 3 commits : `e2ab39c` (données — bloc `amelioration-continue` au catalogue, em dashes substitués), `01bc994` (`composer()` étendu — `_composerStandard` + helper `_trouverAxe`, 16 assertions node), `76dff14` (`htmlFiche()` étendu — `_htmlMeta` généralisé en `_htmlTrioParNiveau` partagé §4.4/§4.6 sans duplication, paramétré par `titreSectionTrio`, 19 assertions node). **C.2.d** : doc compagnon v0.7 (`db5dbc4` — schéma § 3.2 actualisé sur l'implémentation réelle, journal réordonné v0.5/v0.6), smoke test interactif Lætitia validé sans friction, État courant. Fiche naviguable à `cadre-indicateurs.html#fiche-q=amelioration-continue`. **Tag `mvp-chantier-c2-livre`.**
- **Prochaine action recommandée** : **jalon C.2 CLOS** — smoke test validé sans friction, tag `mvp-chantier-c2-livre` posé. **Prochaine étape : C.3 — migration de `resistance-transformation` (variante § 4.4 standard)**. Effort estimé ~3h. Même patron technique que C.2 (`_composerStandard` + `_htmlTrioParNiveau` sont en place, plus rien à étendre côté moteur) : il reste le cadrage éditorial (trios par niveau), la rédaction (9 intentions + 3 recommandations, panel gestion du changement) et le portage en commits données / doc / backlog. La mécanique ADKAR sert de grille pédagogique aux options Q1 (cf. doc compagnon § 6). Appliquer la doctrine éditoriale v0.6. Puis C.4 `cascade-objectifs` (famille Drucker), dernier jalon § 4.4. **Demande différée de Lætitia (séance 20/05)** : rendre cliquables les noms d'indicateurs dans les pieds de colonne § 4.3 (Throughput, Lead time, etc.) vers les fiches du référentiel — à traiter APRÈS C.3 et C.4. Trois options identifiées (statu quo / quelques noms canoniques / tous les noms en tableau d'objets). **Autres chantiers ouverts cumulés** : (II) Option A tableau de bord (~30-45 min), **21 (vue Lexique)**, **13.bis (chips cumulables maturité)**, **24 (URLs partageables)**, **25 (audit zones inactives)**, **26.c1.coll.1 (dette NBSP module fiche-question)**, **26.c2.coll.1 (fiche-question candidate « pilotage stratégique », post-MVP)**. **Friction beforeunload** : réglée doctrinalement (MVP éphémère). Aucun blocage actif sur l'outil. Tag de point de retour courant : `mvp-chantier-c2-livre`.
- **Blocages / questions ouvertes** : aucun.


## 0. Chantiers majeurs livrés → archivés

Les grands chantiers livrés et stabilisés sont déplacés vers [`backlog-archive.md`](./backlog-archive.md) pour garder ce backlog focalisé sur le travail en cours.

Actuellement archivés : **Porte « Par mon problème » — v1** (2 questions → 3-5 indicateurs, parcours 3 étapes). Voir l'archive pour le détail des items et les commits de référence.

---

## 1. Revue métier des fiches (cohérence output/outcome + anti-patterns)

Règle appliquée : chaque fiche doit distinguer **ce qu'elle mesure** (output) de **ce qu'elle prétend mesurer** (outcome), et nommer explicitement 2 à 4 anti-patterns connus. Panel d'experts **spécifique à l'axe** (pas Lean + Agile par défaut), avec garde-fous transversaux Deming / Goodhart / Hubbard-Taleb / Gemba.

| Fiche | Niveau / Type | Sujet | État | Anti-patterns à nommer |
|---|---|---|---|---|
| p5 | Programme / FLUX | Débit d'initiatives livrées | ✅ | Splitting, phantom delivery, confusion output/outcome, comparaison inter-programmes — **révisée le 18/04/2026** |
| t4 | Portefeuille / FLUX | Efficacité de flux (ratio temps actif / lead time) | ✅ | Usage en évaluation individuelle, optimisation locale, moyenne trompeuse, Goodhart, piloter sans Gemba — **révisée le 19/04/2026** (commit `bae57b0`, enrichissement `exemple_eq` avec usage constructif Gemba côté équipe ; panel Kersten / Vacanti / Goldratt + Deming / Gemba déjà présent) |
| af-c2 | Affaires / FLUX | Durée du cycle de vente | ✅ | Usage en évaluation individuelle, moyenne trompeuse, définition floue, biais du survivant, optimisation locale — **révisée le 18/04/2026** (commit `c9640e9`, panel Roberge / Rackham / Ross + Deming / Goodhart / Gemba) |
| af-m3 | Affaires / FLUX | Taux de conversion MQL → SQL | ✅ | Inflation MQL, abaissement silencieux des standards SQL, confusion output/outcome, désalignement accusatoire, moyenne trompeuse — **révisée le 19/04/2026** (commit `52ea2a1`, panel Sirius Decisions Demand Waterfall / Roberge / Kaplan & Norton + garde-fous Deming / Goodhart / Gemba) |
| af-sc5 | Affaires / FLUX | Délai de première réponse client | ✅ | Réponse vide pour cocher le SLA, moyenne globale trompeuse, pression individuelle sur agents, confusion TTFR / Time to Resolution, optimisation locale vs effort total (CES) — **révisée le 19/04/2026** (commit `5cdd889`, panel Dixon / Reichheld / ITIL + garde-fous Goodhart temporel / Deming / Gemba ; fiabilité descendue de 'fiable' à 'precaution') |

**Portée actuelle du standard 2026-04** — les fiches du tableau ci-dessus (axes DevOps, Programme, Portefeuille, Affaires/FLUX) + les fiches du chantier 3 (s6 à s10, t6, t7, p6, p7) nativement rédigées à ce standard. Prochaines fiches à reprendre : d'autres axes (Qualité, Humain, Risque, Sécurité, Données, Produit), à déclencher sur remontée d'incohérence ou de besoin terrain.

### 1.bis Dette éditoriale — acronymes secs dans le texte affiché *(post-6.9, ouverte le 27/04/2026)*

**Origine.** Lors du chantier 6.9 (densification de la matrice problèmes × niveaux), Lætitia a signalé sur la fiche `p8` que les acronymes non explicités (« CR ») n'avaient « aucun sens pour l'utilisateur ». Vérification systématique en suivant : la règle s'applique à une trentaine d'autres fiches du référentiel.

**Constat.** Diagnostic mené par parsing automatique des champs `definition / objectif / exemple_ent / exemple_eq / risque / alt` des 137 fiches, en retirant les attributs HTML pour ne garder que le texte affiché. Acronymes détectés (non exhaustif, à filtrer ensuite par pertinence) :

- *Stratégique/Tactique* : ADKAR (s6), NIST CSF / COSO ERM / ISO 31000 / FAIR (s9, s10), LPM (t6, t7), DORA (t2), ROI (t1)
- *Programme* : CRM (p5)
- *Opérationnel TI* : DORA (o1, o2), FCR (ti-o2), MTTD / SIEM (ti-s1), SAST / DAST (ti-s4), RGPD / SOC2 / PCI-DSS (ti-s5), KR (o6), ORC (x5)
- *Opérationnel Affaires* (volume principal) : LTV / CAC (af-c3, af-m1, af-m3), MQL / CPL / SEO (af-m2, af-m3), ROAS (af-m4), DSO (af-f1), ESG (af-f4), OEE (af-op1), DPMO / DMAIC (af-op2), VSM (af-op4), CSAT / CES / NPS / FCR / TTFR (af-sc1 à sc5), PME / SPIN / BANT / AE (af-c2, af-m3, af-m5)

**Règle à appliquer** (consignée dans `feedback_redaction_fiches_referentiel.md`) : pas d'acronyme non défini en circulation libre dans le texte. Soit définir au premier usage dans un `<span class="term-def">`, soit remplacer par la version française pleine. Cas limites légitimes : devises (EUR), normes nommées par leur préfixe ISO en parenthèse, acronymes vraiment passés en langage courant (CRM, SEO, ROI à la limite).

**Découpage proposé** : passe par axe (Stratégique → Tactique → Programme → Opérationnel TI → Opérationnel Affaires), 1 commit par axe. Estimation : 3-4 sessions courtes selon la profondeur de redéfinition (un acronyme comme COSO ERM ou ADKAR demande une définition pédagogique courte mais juste, pas un simple développement du sigle).

**Avancement par axe** *(maj 30/04/2026)* :

| Axe | État | Commit | Note |
|---|---|---|---|
| Stratégique | ✅ clos | `ba690cb` | Audit corrigé : **1 phrase** à traiter sur `s9` champ `objectif` (`COSO ERM` + `ISO 31000` ajoutés en term-def, définitions reprises mot-à-mot de `s10` pour cohérence cross-fiches). Le reste de l'axe (`s6` ADKAR, `s9` NIST CSF + FAIR, `s10` complet) était déjà couvert. **Le diagnostic initial du backlog surévaluait la dette d'un facteur ~4 sur cet axe.** |
| Tactique | 🔴 à faire | — | LPM (t6, t7), DORA (t2), ROI (t1) — à auditer avec la méthode corrigée. ROI à priori passe en langage courant, à confirmer. |
| Programme | 🟡 à filtrer | — | CRM (p5) — probable faux positif (CRM listé comme « cas limite langage courant » dans la règle). Audit rapide à faire. |
| Opérationnel TI | 🔴 à faire | — | Voir constat. |
| Opérationnel Affaires | 🔴 à faire | — | Voir constat. Volume principal de la dette résiduelle. |

**Méthode d'audit corrigée** *(actée 30/04/2026 sur axe Stratégique)*. Pour chaque acronyme, repérer la **première occurrence visible hors attribut `data-def="..."`** dans le corps de la fiche, puis vérifier si cette occurrence tombe à l'intérieur d'un `<span class="term-def">`. Le diagnostic initial comptait toutes les occurrences brutes sans cette distinction et donnait une fausse impression de volume. Le script Python utilisé est trivial (regex + check d'inclusion), à reprendre tel quel pour les axes suivants.

**Ne pas confondre** avec la dette « ids techniques en clair » (p5, p6, p7, o1) qui a été éteinte le 27/04/2026 dans le commit `b4b327a` après la même remontée Lætitia. Cette sous-dette acronymes est ce qui reste.

### 1.ter Audit légitimité des tags `cadres` *(ouverte le 30/04/2026)*

**Origine.** Lors de la séance du 30/04/2026, Lætitia a signalé que des fiches taggées `safe` ne semblaient pas relever du corpus SAFe. Audit factuel mené sur les 11 fiches `safe` : 4 légitimes (mention LPM ou PI Planning), 3 ambiguës (concept partagé avec Lean ou Predictability Measure non explicité), 4 abusives (corpus PMI/EVM/risk management générique, parfois contraires à la doctrine SAFe). **Diagnostic de la dérive** : tags posés par contiguïté de niveau (« niveau Tactique → SAFe par habitude ») plutôt que par appui doctrinal. Décision : auditer **tous** les tags de cadres avec une méthode standardisée.

**Périmètre quantifié.** 10 cadres définis dans `CADRES_META`, 85 fiches mappées (sur 85 fiches au total — *chiffrage rectifié le 01/05/2026, voir constat n°1*), 144 occurrences de tags `cadres`.

**Méthode d'audit standardisée** (à appliquer cadre par cadre) :

1. Fixer 4 à 8 **marqueurs lexicaux signature** du corpus officiel.
2. Fixer les **métriques signature** du corpus officiel.
3. Pour chaque fiche taggée du cadre : croiser contenu × marqueurs × métriques signature.
4. Classer en **✅ légitime** (marqueur ou métrique signature présent), **🟡 ambigu** (concept partagé avec un autre cadre ou implicite sans appui textuel), **❌ abusif** (rien dans le corpus, voire contraire à la doctrine).
5. Présenter le tableau à Lætitia **avant tout commit**.
6. 1 commit code (corrections appliquées) + 1 commit doc (clôture du cadre dans le chantier).

**Avancement par cadre** *(maj 30/04/2026)* :

| # | Cadre | Fiches | État | Commits | Note |
|---|---|---|---|---|---|
| 1 | `safe` | 11 | ✅ clos | `a3f9871` `e81b179` | **5 conservées** (t6, t7, p1, p5 légitimes ; t4 enrichi avec mention Flow Metrics SAFe v6) — **6 retirées** (t1, t2, t5, p2, p3, p4 sans appui doctrinal). 1 commit refactor META + 1 commit doc enrichissement t4. |
| 2 | `lean` | 29 | ✅ clos | `c082a4c` | **14 conservées** (Lead Time, Throughput, Cycle Time, WIP, OEE, DPMO, Flow Efficiency, On-Time Delivery, Réduction gaspillages, Escaped Defects, Délai clôture comptable, Taux de reprise, Lead Time for Changes — toutes signature canonique Lean ou Six Sigma). **15 retirées** : 9 sans appui doctrinal (af-r2, af-sc3, o8, ti-d1, ti-d4, ti-o5, ti-p2, ti-p4, ti-s4 — DevOps/HR/CES) + 6 ambiguës où le tag était garde-fou transversal et non appui doctrinal sur le sujet (t7 portfolio Standish ; af-c2 cycle de vente ; af-f1 DSO ; af-m3 MQL→SQL ; af-sc5 TTFR ; ti-o4 récurrence incidents). **Constat collatéral** : 5 fiches retirées de `lean` sont DevOps pur (o8, ti-d1, ti-d4, ti-p2, ti-p4, ti-s4) — à statuer dans l'audit `dora`. |
| 3 | `itil` | 16 | ✅ clos | `3bcbe6c` | **10 conservées** (FCR Service & TI, TTFR, MTTR DORA, MTBF, Conformité SLA, Récurrence incidents, Coût ticket, Disponibilité pipeline, MTTR sécurité — toutes signature ITIL Service Operation / Availability / Problem Mgmt). **6 retirées** : p3 (Risk Mgmt PMI/COSO, pas ITIL) ; af-sc1 CSAT, af-sc2 NPS, af-sc3 CES (signature CX Reichheld/Dixon, pas ITIL — ITIL utilisateur secondaire) ; ti-s1 MTTD sécurité, ti-s3 délai remédiation vulnérabilités (signature SOC/NIST CSF, pas ITIL). Cas af-sc3 : `generique` ajouté pour ne pas la laisser sans cadre. |
| 4 | `dora` | 13 | ✅ clos | `662682a` `d1491a7` | **4 conservées** (les 4 keys : Deployment Frequency, Lead Time for Changes, Change Failure Rate, MTTR — corpus DORA strict). **9 retirées** : sujets adjacents DevOps/CI/SRE non-keys (o5 Cycle Time, ti-d3 Escaped Defects, ti-d4 PR Turnaround, ti-p1 Dispo pipeline, ti-p2 Build, ti-p3 Pipeline Success, ti-p4 Provisionnement, ti-p5 IaC, ti-s2 MTTR Sécurité). **13 fiches retaggées** avec cadres signature (cd pour 6, securite pour 4, space pour 1, lean/kanban pour 2 déjà). **Extension taxonomie : 3 cadres ajoutés** (`securite`, `cd`, `space`) + nouvelle famille `risque-securite` (8 familles au total). Dette ≈ 69 % du tag DORA — la plus haute du chantier (corpus le plus strict). |
| 5 | `scrum` | 6 | ✅ clos | `b8dbfde` | **1 conservée** (ti-d2 Sprint Completion — Sprint cœur du Scrum Guide). **5 retirées** (o6 Throughput Kanban/Lean ; x1 Velocity hors Scrum Guide officiel ; x2 Burndown retiré du Scrum Guide en 2011 ; x4 Team Health Check origine Spotify ; x5 Feature Count sans appui doctrinal). x1 et x2 retaggées `generique` pour éviter l'orphelinat. **Dette ≈ 83%** — la plus haute du chantier 1.ter. Diagnostic : Scrum Guide volontairement minimaliste sur les métriques, donc tag par culture historique = faux signal massif. Voir constat collatéral n°8. |
| 6 | `kanban` | 5 | ✅ clos | `a4438d8` | **3 conservées** (o5 Cycle Time, o6 Throughput, o7 WIP — toutes équipe, marqueurs Anderson/Vacanti : scatterplot, médiane + 85e percentile, WIP limit, mention « cartes Kanban » et « fondamental du Kanban »). **2 retirées** (t4 Flow Efficiency portefeuille, p5 Throughput programme) — corpus Flow Framework (Kersten) / SAFe / Lean, pas Kanban Method. **Dette ≈ 40%.** Diagnostic : tag posé par contiguïté sur les niveaux portefeuille/programme où Kanban Method n'opère pas par défaut. Cadre **non orphelin** (rupture avec pattern BSC/MBO). |
| 7 | `mbo` | 4 | ✅ clos | `0af6545` | **0 conservée — 4 retirées** (s4, t3, o9, af-c4). 3 fiches OKR (s4, t3, o9) double-taggées MBO par généalogie historique : aucun marqueur Drucker propre, anti-pattern rémunération variable explicité = **inverse doctrinal** de MBO. af-c4 (quotas commerciaux) cas Drucker classique mais sans marqueur lexical propre — ❌ par cohérence stricte du chantier. **Dette 100%.** Cadre orphelin → déplacé vers `CADRES_A_VENIR` (option 1 cohérente avec BSC). Description enrichie pour réintégration future. |
| 8 | `bsc` | 3 | ✅ clos | `e4be33c` | **0 conservée — 3 retirées** (s1 CA, s3 EBITDA, s5 Part de marché) : aucun marqueur signature BSC (4 perspectives, strategy map, lead/lag, Kaplan/Norton). Tag posé par contiguïté « Stratégique → BSC par habitude » alors que la BSC s'oppose précisément à la mono-vision financière. **Dette 100%.** Cadre orphelin après retrait → déplacé vers `CADRES_A_VENIR` (constat collatéral n°5 adressé). |
| 9 | `okr` | 3 | ✅ clos | — *(doc seule)* | **3 conservées, dette zéro** : s4, t3, o9 — toutes signature OKR (structure Objective + 2-4 KR mesurables, cadence trimestrielle/annuelle, co-construction, anti-pattern rémunération variable explicité). Cadre **propre** : ces 3 fiches sont nées OKR (tag posé en même temps que la fiche, pas par contiguïté). Aucun commit code. Voir constat collatéral n°4. |
| 10 | `generique` | 58→42 | ✅ clos | `7fc5460` | **Doctrine d'exclusivité actée** : `generique` jamais combiné avec un cadre signature (description CADRES{} mise à jour). **Pop1 (15 fiches multi-taggées)** : `generique` retiré (mécanique). **Pop2 (43 fiches en `generique` seul)** : 1 réintégration s9 → `securite` (adresse partiellement constat n°1). 42 fiches restent `generique` légitimement (cadres signature absents de la taxonomie : sales, marketing, RH, finance, change management, etc.). Voir constats n°9 (cadre `cx` manquant) et n°10 (5 pistes de cadres futurs). |

**Constat collatéral n°2** *(remonté lors de l'audit cadre `itil` le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commit `662682a`). Le cadre `securite` (label « Sécurité (NIST CSF / ISO 27035) ») a été ajouté à `CADRES_META`, dans la nouvelle famille `risque-securite`. 4 fiches retaggées : ti-s1 MTTD, ti-s2 MTTR Sécurité, ti-s3 Délai remédiation vulnérabilités, ti-s4 Couverture tests sécurité. Reste à statuer : la fiche `s9` (Indice de maturité cybersécurité) n'est pas mappée dans `CADRES_META` — relève du constat collatéral n°1 (52 fiches hors taxonomie), à reprendre dans un item dédié.

**Constat collatéral n°3** *(remonté lors de l'audit cadre `dora` le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commit `662682a`). La taxonomie ne contenait pas de cadre dédié au pilotage du **pipeline de livraison continue** (Continuous Delivery, Humble & Farley) ni au **cadre de productivité ingénierie** (SPACE, Forsgren et al. 2021). Conséquence : 6 métriques DevOps/CI-CD étaient taggées DORA par contiguïté alors qu'elles ne sont pas des 4 keys. Le cadre `cd` (Continuous Delivery) et `space` (SPACE) ont été ajoutés à `CADRES_META`, famille `observabilite`. 7 fiches retaggées : ti-p1 Dispo pipeline, ti-p2 Build, ti-p3 Pipeline Success, ti-p4 Provisionnement, ti-p5 IaC, o8 Couverture tests automatisés (cd) ; ti-d4 PR Turnaround (space). Note : `space` était déjà préparé dans `CADRES_A_VENIR` — déplacé vers `CADRES`.

**Constat collatéral n°4** — **✅ ADRESSÉ le 01/05/2026** (commit `c4adfd1`). Trois champs de la fiche t3 densifiés en cohérence éditoriale avec s4 et o9 : (1) `definition` — ajout du mot **« ambitieux »** + explication accessible de la convention 0,7 (« si on en atteint environ 70 % en fin de trimestre, c'est qu'elle était bien calibrée — ni trop facile, ni hors d'atteinte »), sans jargon stretch / sandbagging / hors-sol ; (2) `exemple_ent` — cible affichée 60 % explicitement signalée comme volontairement haute, avec illustration « 42 % en fin de trimestre est déjà un succès » ; (3) `risque` — enrichi avec l'anti-pattern OKR le plus documenté (rémunération variable / évaluation individuelle qui détruisent la dynamique d'apprentissage), explicitement partagé avec s4 et o9. Rédaction vulgarisée — l'outil étant aussi un support d'apprentissage, pas seulement un référentiel de spécialiste. Sentinelles `verifier-coherence-vocabulaire.js` (9 vocabulaires alignés) et `lancer-tests-requete-metriques.js` (63/63 verts) exécutées sans régression.

**Constat collatéral n°5** *(remonté lors de l'audit cadre `bsc` le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commit `e4be33c`). Après retrait des 3 tags `bsc` abusifs, le cadre devenait orphelin (0 fiche taggée). Option 1 retenue : déplacement de `bsc` de `CADRES` vers `CADRES_A_VENIR` (cohérent avec le précédent `space`). Description enrichie pour le futur : « Kaplan & Norton (1996). Pilotage équilibré sur 4 perspectives : financière, client, processus internes, apprentissage & croissance. Liens cause-effet, strategy map. ». Réintégration le jour où une fiche signature BSC sera créée.

**Constat collatéral n°6** *(remonté lors de l'audit cadre `bsc` le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commits `c14d979` doc + `d6ecd5f` code). **Bug runtime confirmé**, activable en deux clics depuis la porte *Par mon cadre* sur les tuiles Sécurité / Continuous Delivery / SPACE — `CM.RequeteMetriques.executer({cadres:['securite']})` levait `Error("Vocabulaire admis : dora, lean, okr, scrum, kanban, safe, itil, generique.")`. Surface impactée : ~27 % de la porte cadre. Cause racine : commit `662682a` a ajouté les 3 cadres à `CADRES{}` mais a oublié `VOCAB.cadres` ; en plus, `§10.3` du doc compagnon contenait encore `bsc` et `mbo` (déplacés en `CADRES_A_VENIR` sans propagation doc). Régularisation orthodoxe en 2 commits atomiques : (1) `c14d979` met §10.3 à 11 valeurs alignées (`dora, cd, space, lean, okr, scrum, kanban, safe, itil, securite, generique`) + entrée journal §9 documentant l'incident de gouvernance ; (2) `d6ecd5f` aligne `VOCAB.cadres` sur §10.3 corrigé. Iso-comportement sur les 8 cadres préexistants. **Dérive hors scope consignée** (constat collatéral n°11 ci-dessous) : `tests-requete-metriques.html` ligne 208 duplique son propre VOCAB.cadres avec les 10 valeurs périmées (incluant `mbo` et `bsc`) — le harnais a perdu son rôle de gardien.

**Constat collatéral n°7** *(remonté lors de l'audit cadre `mbo` le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commit `0af6545`). Après retrait des 4 tags `mbo` abusifs, cadre orphelin (0 fiche taggée). Option 1 retenue (cohérence avec BSC) : déplacement de `mbo` de `CADRES` vers `CADRES_A_VENIR`. Description enrichie : « Management By Objectives — Drucker (1954). Cascade descendante d'objectifs, dialogue manager-collaborateur, self-control, alignement individuel ↔ organisationnel. Lien assumé à l'évaluation individuelle (à la différence des OKR). ». Réintégration le jour où une fiche signature MBO sera créée (ex. entretien annuel d'objectifs, cascade d'objectifs descendante).

**Constat collatéral n°8** *(remonté lors de l'audit cadre `scrum` le 30/04/2026, à statuer hors 1.ter)*. Sur 137 fiches du référentiel, **une seule** porte un marqueur signature Scrum (ti-d2 Sprint Completion). Aucune fiche n'évoque le Sprint Goal qualitatif, la Definition of Done comme qualité d'Increment, le Product Goal, ni les rôles Scrum (Scrum Master, Product Owner, Developers). Le Scrum Guide est donc **sur-représenté en tag** (avant audit : 6 fiches taggées) mais **sous-représenté en fiches signature** (1 fiche). Pistes de fiches Scrum signature à créer : « Atteinte du Sprint Goal » (engagement qualitatif sur l'objectif, ≠ taux de complétion qui mesure les tâches), « Adhérence à la Definition of Done » (qualité d'Increment), « Time to Market d'un Increment ». À reprendre dans une session future de densification du référentiel.

**Constat collatéral n°9** — **✅ ADRESSÉ le 01/05/2026** (commits `e679a7e` doc + `82cd815` code). Cadre `cx` (Customer Experience) ajouté à la taxonomie avec corpus officiel à trois sources : Reichheld (NPS, *The Ultimate Question*, 1996/2003 ; eNPS extension employés), Dixon (CES, *The Effortless Experience*, 2013), Hayes (CSAT). Métriques signature documentées : NPS, eNPS, CSAT, CES. Création concomitante d'une **nouvelle famille `experience`** (label « Expérience client », teinte `#e65100`, fond `#fff3e0`, position dans `ORDRE_FAMILLES` entre `objectifs` et `itsm`). La famille `objectifs` a été écartée comme alternative — elle abrite des cadres de cascade stratégique (OKR, MBO, BSC, Hoshin), pas d'orientation client. Audit-flash du référentiel : **5 retags** `generique` → `cx` (s2, af-sc1, af-sc2, af-sc3, af-r1) + **1 multi-tag** `itil` → `itil + cx` (af-sc5 TTFR — la fiche revendique elle-même « Cadres mobilisés : Effortless Experience (Dixon), The Ultimate Question (Reichheld) ») + **9 faux positifs écartés** (matches sur le mot français « ces »). Doctrine §10.3 = source unique respectée — ordre orthodoxe doc → code. Sentinelles `verifier-coherence-vocabulaire.js` (9 vocabulaires alignés) et `lancer-tests-requete-metriques.js` (63/63 verts) exécutées sans régression.

**Constat collatéral n°10** *(remonté lors de l'audit-éclair `generique` le 30/04/2026, à statuer hors 1.ter)*. **Cinq pistes de cadres signature manquants** dans la taxonomie, identifiées en parcourant les 43 fiches `generique` seul. Aucun n'est créé maintenant — décision produit hors 1.ter :
- **`change-management`** (ADKAR Prosci / Kotter) — concernerait s6 (Capacité d'absorption du changement), potentiellement af-r4 (taux de complétion formations).
- **`sales`** (Roberge / Rackham SPIN / Ross / Sirius Decisions) — concernerait af-c1 à af-c5, af-m3 (déjà identifiés au chantier 1 comme corpus Roberge).
- **`pmi-evm`** (PMI PMBOK / EVM Earned Value) — concernerait p2 (Budget Variance), p3 (Risques critiques), p4 (Satisfaction parties prenantes). Note : p3 a déjà été retirée d'`itil` lors de l'audit ITIL avec mention « Risk Mgmt PMI/COSO ».
- **`grc-compliance`** (Governance, Risk, Compliance — ISO 19600, COSO IC) — concernerait ti-s5 (Score de conformité réglementaire), af-f4 (Conformité réglementaire financière). Note : ti-s5 et af-f4 mentionnent ISO 27001/SOC2/PCI-DSS/RGPD — corpus distinct de `securite` (qui est centré détection/réponse).
- **`hr-analytics`** (corpus RH analytique — pas de doctrine unifiée mais marqueurs : SHRM, AIHR) — concernerait s7 (Rotation volontaire), af-r2 (Time to Fill), af-r3 (Voluntary Turnover).

**Constat collatéral n°11** *(remonté en clôturant le constat n°6 le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commit `73c2017`). Diagnostic affiné en cours d'investigation : le VOCAB du harnais **n'était pas écrit en dur**, il est en réalité injecté par `outils/construire-tests-requete-metriques.js` qui recopie le bloc `CM.RequeteMetriques` de `cadre-indicateurs.html` entre les marqueurs `CM.REQUETE-METRIQUES-INJECTION-BEGIN/END`. La cause racine du décalage était l'oubli de ré-exécuter le générateur après le commit `d6ecd5f`. Régularisation mécanique : `node outils/construire-tests-requete-metriques.js` → diff = stricte propagation du commit prod (3 ajouts / 2 suppressions). **Vérification d'iso-comportement** : 63 tests verts en exécution headless via runner Node VM minimal (extraction des `<script>` + `vm.createContext` avec mock DOM minimal — script ad-hoc non versionné, à reconsidérer si l'on veut un runner pérenne pour CI). Constat clos sans dette résiduelle, sauf le n°12 ci-dessous qui reste ouvert.

**Constat collatéral n°12** *(remonté en clôturant le constat n°6 le 30/04/2026)* — **✅ ADRESSÉ le 30/04/2026** (commits `de27adc` runner + `a8e960c` vérificateur). Deux outils livrés en variante équilibrée :

- `outils/lancer-tests-requete-metriques.js` (`de27adc`) — runner Node headless qui exécute les 63 tests du harnais en CLI. Promotion du script ad-hoc bricolé pendant le constat n°11. Mock DOM minimal (~140 lignes), zéro dépendance. Exit 0/1/2.
- `outils/verifier-coherence-vocabulaire.js` (`a8e960c`) — sentinelle qui vérifie 9 vocabulaires entre 3 sources. **Invariant fort** sur `cadres` (VOCAB.cadres ⇔ Object.keys(CADRES) ⇔ §10.3.cadres). **Invariant simple** sur les 8 autres (niveau, branche, domaine, type, tags, tagsThematiques, fiabilite, maturite : code ⇔ doc). Mécanique : extraction par regex + `vm.runInContext` (plus robuste qu'un parser maison), parsing du commentaire de §10.3 avec filtre stylistique (coupure au tiret cadratin pour ignorer les mots quotés en explication), §10.2 parsé séparément pour `tagsThematiques`. Test fonctionnel : exit 0 sur l'état HEAD courant. **Test négatif validé manuellement** par injection éphémère (retrait de 'securite' dans VOCAB.cadres) — exit 1 avec rapport identifiant exactement la valeur manquante.

**Usage attendu** : à lancer manuellement avant tout commit qui touche à un vocabulaire (VOCAB, CADRES, §10.3, §10.2) ou au harnais. Pas de pre-commit hook automatique pour le moment — à reconsidérer si l'usage manuel s'avère insuffisant.

**Hors scope retenu** : runtime check au boot de l'app (variante exhaustive écartée — coût en code mort en prod pour une garantie marginale, le build catch déjà tout). Test d'antériorité sur `inventaire-schema-metriques.md` §3 (le doc compagnon §10.3 est documenté comme transcription stricte de §3, donc la chaîne s'arrête à §10.3).

**Synthèse globale du chantier 1.ter** *(clos le 30/04/2026)*

10 cadres audités, **dette globale ≈ 56 %** (~80 corrections sur ~144 occurrences) :

| Cadre | Dette | Avant | Après | Pattern |
|---|---|---|---|---|
| `okr` | 0 % | 3 | 3 | Cadre **propre** (fiches nées OKR) |
| `itil` | 38 % | 16 | 10 | Confusion ITIL/CX |
| `kanban` | 40 % | 5 | 3 | Tags portefeuille/programme abusifs |
| `lean` | 52 % | 29 | 14 | Garde-fou transversal mal compris |
| `safe` | 55 % | 11 | 5 | Contiguïté niveau Tactique |
| `dora` | 69 % | 13 | 4 | Métriques DevOps non-keys |
| `scrum` | **83 %** | 6 | 1 | Culture historique vs Scrum Guide minimaliste |
| `bsc` | **100 %** | 3 | 0 → CADRES_A_VENIR | Cadre orphelin |
| `mbo` | **100 %** | 4 | 0 → CADRES_A_VENIR | Cadre orphelin |
| `generique` | — | 58 | 42 | Pop1 nettoyée + 1 retag s9 |

**Extension de taxonomie** : 3 cadres ajoutés (`securite`, `cd`, `space`) + nouvelle famille `risque-securite`. 2 cadres déplacés vers `CADRES_A_VENIR` (`bsc`, `mbo`). **Doctrine d'exclusivité de `generique` actée** (description CADRES{} mise à jour).

**Apprentissages méthodologiques majeurs** :
1. Diagnostic « par parsing brut » sans tester l'inclusion dans un span term-def gonfle artificiellement la dette éditoriale (1.bis Stratégique : facteur ~4).
2. Tagger un cadre par contiguïté de niveau (« Tactique → SAFe ») sans appui doctrinal produit du faux signal massif. Règle permanente : **pas de tag de cadre sans marqueur lexical OU métrique signature documentée du corpus officiel**.

**Constats collatéraux ouverts à statuer** : n°8 (pauvreté du corpus Scrum dans le référentiel), n°10 (5 pistes cadres : change-mgmt, sales, pmi-evm, grc-compliance, hr-analytics). *[n°1, n°4 et n°9 clos le 01/05/2026 ; n°6 clos le 01/05/2026 ; n°2, n°3, n°11, n°12 clos antérieurement]*

**Constat collatéral n°1** — **✅ CLOS le 01/05/2026** (commits `9501a9a` rectif chiffrage + présente clôture).

**Synthèse de clôture.** Le constat tel que formulé (« 51 à 52 fiches hors `CADRES_META` ») reposait sur un chiffrage faux (137 fiches au total) hérité d'une étape ancienne de planification. Vérification Python sur le référentiel actuel : 85 fiches au total, toutes mappées dans META, **0 fiche hors taxonomie**. Le constat n°1 est donc sans matière d'audit. **La matière éditoriale légitime qu'il enveloppait — les 42 fiches en `generique` seul — est entièrement transférée vers les constats n°9 (cadre `cx` manquant) et n°10 (5 pistes : change-mgmt, sales, pmi-evm, grc-compliance, hr-analytics)**, qui sont les vrais véhicules pour décider quelles fiches méritent un cadre signature à cataloguer. **Côté UX**, la porte « Par mon cadre » expose déjà la tuile « Indicateur générique » via la famille « Universel » (CADRES.generique.famille = 'universel', famille incluse dans ORDRE_FAMILLES) — l'utilisateur peut atteindre les 42 fiches par cette voie ; pas d'ajustement UX retenu (décision Lætitia 01/05/2026).

**Constat collatéral n°1** *(historique, conservé pour traçabilité)*.

**⚠️ Chiffrage rectifié le 01/05/2026.** Vérification Python sur `cadre-indicateurs.html` : le référentiel contient **85 fiches**, toutes mappées dans `META` — **0 fiche hors taxonomie**. Le chiffre « 137 fiches au total » utilisé en ouverture du chantier 1.ter était hérité d'une étape ancienne de planification, sans correspondance avec le référentiel actuel. La matière restante du n°1 n'est donc pas un audit de fiches non mappées (il n'y en a pas), mais une décision de politique éditoriale sur les **42 fiches en `generique` seul**, recoupant directement les constats n°9 et n°10.

*Texte d'origine, conservé pour traçabilité* : « Le référentiel contient **137 fiches** mais seules **85 sont mappées** dans `CADRES_META`. **52 fiches sont donc hors taxonomie cadres**. **✅ Adressé pour s9** (Indice de maturité cybersécurité) lors de l'audit-éclair generique : retag `generique` → `securite` (commit `7fc5460`), s9 reste dans META — la fiche cybersécurité signature est désormais correctement classée. **Reste à statuer** sur les 51 autres fiches non mappées : faut-il les mapper systématiquement ? Faut-il poser `generique` par défaut sur celles qui n'ont aucun cadre signature ? Faut-il que la porte « Par mon cadre » signale explicitement les fiches non rattachées ? »


### 1.quater Audit typographique du référentiel — accents + em dash *(ouverte le 13/05/2026)*

**Origine.** Reprise de séance du 13/05/2026. Le `cadre-indicateurs.html` portait ~383 modifs non committées, vraisemblablement issues d'une session précédente interrompue qui avait commencé à attaquer le chantier (I) listé dans la « prochaine action recommandée » du bloc État courant. Le diff combinait deux opérations entrelacées de qualité éditoriale très différente. Décision Lætitia : revert du diff (état HTML revenu à `74ade4f`) + scission de l'item (I) en deux chantiers distincts dans le backlog, parce que les deux travaux n'ont pas la même nature.

**(I.a) Audit accents** — dette ASCII résiduelle sur les fiches anciennes du référentiel. Exemples relevés en diff : `a` → `à`, `Evaluer` → `Évaluer`, `recurrents` → `récurrents`, `cles` → `clés`, `croitre` → `croître`, `marche` → `marché`, `independamment` → `indépendamment`, `degradation` → `dégradation`, `depassements` → `dépassements`. Travail mécanique. **Trois options à arbitrer en ouverture du chantier** :

- (A) **Agent autonome** qui parcourt tous les champs texte du référentiel et applique une table de substitutions complète, en un commit unique. Risque : faux positifs sur des mots correctement orthographiés homonymes (`a` verbe vs `à` préposition, par exemple).
- (B) **Audit séquentiel par Claude** avec table de remplacements proposée à Lætitia mot par mot, validation explicite avant application. Plus lent mais sans risque.
- (C) **Lots boy scout** sur les fiches visibles à chaque session, le reste reporté indéfiniment.

**(I.b) Audit em dash** — 204 occurrences de `—` repérées dans les chaînes des champs `definition`, `objectif`, `frequence`, `exemple_*`, `risque`, `alt`. **Le 13/05/2026, la substitution mécanique `—` → `:` testée dans le diff de la session précédente a été jugée inadaptée**. Diagnostic : le `—` porte au moins trois fonctions distinctes dans le référentiel actuel, qu'un seul signe de remplacement ne couvre pas.

- *Incise encadrée par deux `—`* (équivalent typographique des parenthèses étendues) : substitution par deux `:` rend la phrase ambiguë. Exemple détecté : *« Score agrégé de confiance à trois niveaux — dans la direction, dans le management de proximité, dans les pairs — mesuré par enquête… »* → la substitution produit *« à trois niveaux : dans la direction, …, dans les pairs : mesuré par enquête »* avec deux fonctions différentes du même signe dans la même phrase.
- *Em dash après un `:` existant* : la substitution crée une cascade `: … :` peu lisible. Exemple détecté : *« Objectif : Devenir la référence européenne… — RC1 : 10 000… »* → trois `:` dans une phrase.
- *Em dash d'explicitation adversative* : le `:` ne porte pas la même valeur. Exemple détecté : *« Décision board : investir en priorité… — pas dans un énième programme »* → la nuance d'opposition disparaît.

Chantier à reprendre cas par cas, après livraison de (I.a). Méthode à définir au moment de l'ouverture : table de classification des 204 occurrences par fonction (incise / adversatif / explicitation / séparateur simple), puis substitution adaptée par catégorie (parenthèses, deux-points, virgules selon le cas). Lien possible avec le chantier 19 (cadre visuel) qui pose la doctrine typographique de l'outil.

**Ne pas confondre** avec la dette « caractères IA-typés » (em dash, en dash, ellipsis, smart quotes) écartée systématiquement de la mission de l'accueil unifié lors de la séance du 09/05/2026 — la mission n'utilise aucun de ces caractères. La présente sous-section 1.quater traite spécifiquement les `—` déjà présents dans le corpus des fiches du référentiel, dont la valeur rhétorique est variable selon le contexte.


---

## 2. UX à vérifier (harmonisation visuelle)

Principes récemment posés : **ambre** = pédagogie Lean/Gemba, **violet** = typologie formelle, **indigo** = Niveau hiérarchique, **teal** = Maturité, **sémantique vert/ambre/rouge** = Fiabilité uniquement, **couleur domaine** = pastille domaine uniquement.

| Item | État | Action |
|---|---|---|
| Libellés des types d'indicateurs (chips et légende) | ✅ (18/04/2026) | Refonte : DORA→Performance DevOps, FLUX→Flux & Throughput (Lean), accents corrigés sur Clé/Résultats |
| Accents typographiques sur les noms de fiches | ✅ (18/04/2026) | 18 fiches corrigées (échec, délai, sécurité, rétablissement, clôture, etc.) |
| Lisibilité de l'encart Terrain en page d'accueil (`.gemba-band`) | 🟡 | Vérifier contraste sur fond indigo après les changements `.fi-gemba` |
| Échelle typographique (ratio 1.25) dans filtres, barre de recherche | 🟢 | Audit visuel à faire |
| Cohérence grammaire visuelle (pastilles niveau / maturité / fiabilité) hors fiche | 🟢 | Vérifier listes, vignettes, pictos d'accueil |
| Largeur du tiroir sur mobile / tablette | 🟢 | `max-width: 96vw` posé, à retester sur écran < 700 px |
| Grille cartes — breakpoint trop conservateur | ✅ (18/04/2026) | minmax 252→215 px, bascule 1 colonne 640→520 px. 2 colonnes dès 520 px viewport |
| Audit visuel de la porte « Par mon problème » sur mobile / tablette | 🟡 | Vérifier stepper 1→2→3 sur < 600 px, contraste des cartes de recommandation |
| Audit WCAG AA des couleurs d'axes Mintzberg (cran 3 Doux) sur la porte niveau | 🟢 | À conduire **après livraison 7.2a-code.3**. Mesurer le contraste réel des quatre tokens `--axe-humaine:#5d7fa6`, `--axe-projet:#4f7e74`, `--axe-methodologique:#7d6b96`, `--axe-strategique:#917a55` sur le fond de cartouche, en corps de texte et en italique (`.role-qualificatif`). La doctrine actée le 21/04/2026 annonçait « limite AA » sans vérification formalisée — à instrumenter avec un contrast-checker avant mise en production durable. Ajuster les tokens d'un cran plus foncé si AA raté ; re-valider sur le preview `preview-porte-niveau-texte-tons-clairs.html`. ~30 min. |
| **Dette filets de niveau sous-AA (composants graphiques)** | 🟡 | Détectée le 06/05/2026 par l'audit AA mené sur le chantier 20.1. Les filets de niveau (4 px en couronnement de fiche, porteurs d'information sur le niveau du trio dominant) sous-passent le seuil 3:1 WCAG SC 1.4.11 sur les fonds blanc et crème : **équipe `#6fa89e` à 2.70:1** sur blanc et 2.39:1 sur crème ; **tactique `#c79373` à 2.68:1** sur blanc ; **programme `#7d9670` limite** (3.25 sur blanc, 2.87 sur crème) ; stratégique `#5a4f7a` ✅ (7.41 sur blanc). Sujet **indépendant du chantier 20** (la palette signature fiche-question a été ajustée), mais détecté par lui. Trois pistes : (i) foncer les tokens d'un cran (cohérent avec « cran 3 Doux » → cran 4) ; (ii) accepter la dette en l'absence de réglementation contraignante (crème ne pose pas de risque légal direct) ; (iii) doubler le filet d'un sous-trait textuel « Niveau X » non chromatique pour conformité par redondance. Mesures complètes dans le commit `cb5a353`. ~1 h pour piste (i) avec re-validation sur les 4 pages-types. |

---

## 3. Refactoring progressif (greffé sur les corrections fonctionnelles)

À appliquer **en même temps** qu'une modification fonctionnelle, pas en phases isolées.

### 3.1 Cible architecturale mise à jour (avril 2026)

Le périmètre des modules `CM.*` s'est étoffé avec la livraison de la porte « Par mon problème ». La cible architecturale initiale (8 modules) est ici recalée sur le **périmètre réel** :

| Module | Rôle | État |
|---|---|---|
| `CM.Config` | Données pures, mappings métier, constantes | ✅ existe |
| `CM.Composants` | Fonctions de rendu HTML (cartes, encarts, fiches) | ✅ existe (à dégraisser) |
| `CM.Referentiel` | Catalogue des indicateurs (data + `ajouter` / `tous` / `chercher` / `filtrerParContexte`) | ✅ existe |
| `CM.IndicateursMeta` | Tagging multi-axes (tags problèmes × cadres de travail) — socle de la porte problème | ✅ existe (ajouté en session précédente) |
| `CM.DiagnosticProbleme` | Matrice niveau × problème → sélection d'indicateurs pertinents | ✅ existe (ajouté en session précédente) |
| `CM.VuePorteProbleme` | Vue stepper 1→2→3 du parcours par problème | ✅ existe (ajouté en session précédente) |
| `CM.Preferences` | Persistance URL hash + localStorage (vue active, filtres, porte courante) | ✅ existe (ajouté en session précédente) |
| `CM.DiagnosticCadre` | Logique métier « quels indicateurs pour ce cadre × ce niveau » — délègue les niveaux à `CM.DiagnosticProbleme` pour ne pas dupliquer le vocabulaire | ✅ créé (20/04/2026, commit `4842231`) |
| `CM.VuePorteCadre` | Vue stepper 1→2→3 du parcours par cadre (accordéon par famille en étape 1, bloc *Cadres voisins dans le référentiel* en pied de résultats) | ✅ créé (20/04/2026, commits `4842231` + `6cdb0c4`) |
| `CM.App` | Orchestration, événements, état global | ✅ existe |
| `CM.Apropos` / `CM.Gemba` | Contenu pédagogique | ✅ existent |
| `CM.Html` | Utilitaires HTML (escape, bloc, attr) | ☐ à créer (Règle 1) |
| `CM.FicheViewModel` | Adaptateur Référentiel → ViewModel pour la fiche | ✅ créé (19/04/2026, commit `a65db6a`) |

**Direction des dépendances** : App → Vues (VuePorteProbleme, etc.) → Composants → Domaine (IndicateursMeta, DiagnosticProbleme) → Referentiel → Config. Pas de cycle.

### 3.2 Jalons de convergence

| Jalon | État | Déclencheur opportuniste |
|---|---|---|
| `CM.Html.escape()` créé et utilisé partout | ☐ 🟡 | À la prochaine concaténation HTML touchée (ou dès qu'une saisie utilisateur / import CSV est ajouté) |
| Tous les mappings métier dans `CM.Config` | ☐ 🟡 | Quand je touche `CM.Composants` (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) |
| `ouvrirTiroir()` < 50 lignes | ✅ (11 lignes — 18/04/2026) | Réalisé en greffe sur la revue p5 — `rendreFicheHtml(ind)` extrait |
| Zéro style inline en JS | ☐ 🟢 | À chaque nouvelle chaîne HTML ajoutée |
| `CM.Referentiel.valider()` + console.warn au boot | ☐ 🟡 | Quand j'ajoute un nouveau champ ou type d'indicateur — noter que `CM.IndicateursMeta.valider()` existe déjà, pourrait servir de modèle |
| Module `CM.FicheViewModel` créé | ✅ (19/04/2026) | Livré en commit `a65db6a` — `rendreFicheHtml` devient pure orchestration, les mappings display (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) vivent dans le ViewModel. Identité HTML préservée sur 17 fiches (111 708 octets) |
| `ARCHITECTURE.md` (1 page) dans le dossier | ☐ 🟢 | Après la création de `CM.Html` et `CM.FicheViewModel` — recaler aussi la cible en incluant les 4 nouveaux modules ci-dessus |
| Décomposition de `rendreFicheHtml(ind)` en 11 sous-fonctions par section | ✅ (18/04/2026) | Livré en commit `006d12b` — identité HTML octet-à-octet préservée sur 16 fiches représentatives (`rendreEnteteFiche`, `rendreCadreLecture`, `rendreDefinition`, `rendreObjectif`, `rendreFrequence`, `rendreExemples`, `rendreVigilance`, `rendreAlternative`, `rendreContexteFiabilite`, `rendreContexteMaturite`, `rendreDomaine`) |
| Factoriser `_htmlFamille` en `CM.Composants.htmlFamilleAccordeon(famille, idFacade)` | ☐ 🟢 | Piste identifiée pendant C.2 du chantier 7.2a-code.3 (commit `528f929`) : `CM.VuePorteNiveau._etapeCadre` duplique localement `_htmlFamille` de `CM.VuePorteCadre` pour pouvoir router les `onclick` vers `CM.VuePorteNiveau.setCadre` au lieu de `CM.VuePorteCadre.setCadre`. Refactor : extraire un helper `CM.Composants.htmlFamilleAccordeon(famille, idFacade)` paramétré par le nom de la façade appelante, et faire appeler ce helper depuis les deux vues. Déclencheur opportuniste : la prochaine retouche de l'une ou l'autre porte sur l'accordéon de familles. Tests de non-régression déjà prêts dans `tests-porte-niveau.html` (Suite 6) — ré-exécuter après refactor. |

**Audit actuel (19/04/2026, après commits `006d12b` + `e4d7041` + accents `37244d2`/`da90504`/`949c169` + revue t4 `bae57b0` + greffe ViewModel `a65db6a`)** : périmètre plus large qu'annoncé dans la mémoire initiale. `rendreFicheHtml` décomposé en 11 sous-fonctions et désormais réduit à une pure orchestration (13 lignes, 0 dérivation). `CM.Html` ✅ et `CM.FicheViewModel` ✅ tous deux livrés. Plafond arbitraire levé sur les 2 portes. Nouvelle estimation : **8/10 clean code** (IIFE/namespace propres, fonctions courtes, dérivations isolées du rendu), **7/10 hexagonal-light** (Vues séparées, ViewModel séparé du rendu, Html utilitaire isolé). Cible à 3 itérations : **8,5/10 et 8/10**.

---

## 4. Évolutions produit envisagées (non priorisées)

| Évolution | Valeur attendue | État |
|---|---|---|
| Version condensée / aide-mémoire imprimable (1 page) | Support d'atelier, d'onboarding manager | ⚪ |
| Export d'un sous-ensemble d'indicateurs filtré (CSV ou markdown) | Partage avec une équipe ciblée | ⚪ |
| Mode « facilitation atelier » (typo +20 %, pastilles agrandies, fond sombre) | Projection en salle, lisibilité 6 m | ⚪ |
| **Outil d'aide à la décision — v2 enrichie** (questionnaire multi-critères 10-15 questions : contexte, maturité, contraintes culturelles, rôle) | Aller plus loin que la v1 (problème × niveau) si besoin terrain confirmé | ⚪ 🟡 |
| Visualisation des liens KGI → KPI → KBI entre niveaux | Montrer la traçabilité stratégie → exécution | ⚪ |
| Mode sombre | Confort de lecture prolongée | ⚪ 🟢 |
| Impression PDF propre d'une fiche | Partage hors outil | ⚪ 🟢 |
| Mémorisation de la dernière vue ouverte (porte + filtres) au-delà de la session | Confort d'usage quotidien — socle `CM.Preferences` prêt | ⚪ 🟢 |

---

## 5. Dette documentaire

| Item | Pourquoi | État |
|---|---|---|
| Lexique central des anti-patterns (deploy theater, Goodhart, splitting, phantom delivery, local optimum, déclassement cosmétique, acharnement thérapeutique, découpage factice, rassurance par la moyenne, diversification cosmétique, concentration cachée, bus factor…) | Aujourd'hui dispersé dans les `term-def` des fiches — valeur pédagogique forte à l'agréger | ⚪ 🟡 |
| Note « Comment lire une fiche » (Niveau / Maturité / Fiabilité / Terrain) | Accessibilité pour un nouveau lecteur | ⚪ 🟢 |
| Pied de page avec date de dernière révision et numéro de version | Traçabilité | ⚪ 🟢 |
| `ARCHITECTURE.md` (1 page) — voir jalon section 3.2 | Ancrage pour une relecture externe / onboarding contributeur | ⚪ 🟢 |
| Recalage section `CM.Stepper` du document compagnon `doc-contrats-stepper-roles.md` | Dérive identifiée le 22/04/2026 en rédigeant 7.2a-code.3 étape A : la section décrit la config du stepper avec les champs `titre` / `aide` / `valider`, alors que l'implémentation réellement livrée en 7.2a-code.2 utilise `cle` / `defaut` / `valeur` / `rendreOptions` / `libelleResultats` / `idFacade` / `ids.*`. La section `CM.VuePorteNiveau` (commit `0e08f37`) utilise déjà les noms réels, donc la section 3 est la seule à recaler. Commit séparé `docs(7.2a-code): recaler la section CM.Stepper sur le code livré`, ~30 min, pur recalage documentaire, aucun code applicatif touché. | ⚪ 🟡 |

---

## 6. Évolutions porte « Par mon problème » — file d'attente

Chantier en pause le 18/04/2026 après l'item 6.1 : l'ossature est assainie (plafond retiré, tri fiabilité préservé, labels UI honnêtes), les items suivants sont documentés pour reprise ultérieure avec points d'ancrage code précis pour que la reprise soit immédiate.

| # | Évolution | Priorité | Valeur | État |
|---|---|---|---|---|
| 6.1 | Retrait du plafond arbitraire de 5 recommandations (2 portes + 2 labels UI) | 🔴 | Corrige un biais d'information invisible — 75-80 % de l'information était masquée sur les couples les plus denses (23 fiches visibles sur opé × qualité) | ✅ (18/04/2026, commit `e4d7041`) |
| ~~6.2~~ | ~~Reformulation du conseil pédagogique (« 1-2 par axe, plusieurs axes » au lieu de « 1-2 au total »)~~ | 🟡 | ✅ Livré 19/04/2026 en deux commits : (1) `f7be58b` — variante 2 unifiée, une seule chaîne partagée entre les portes Par mon rôle et Par mon problème (qui n'en portait pas), introduction de `CM.Config.conseilPedagogiquePour(contexte)` comme façade stable (port hexagonal) ; (2) `38b9458` — aération typographique V3 : quatre paragraphes logiques (cadre / règle / méthode / aphorisme) avec aphorisme isolé par filet pointillé pour retrouver son rôle de chute Gemba. |
| 6.2+ | **Variante 3 — conseil adapté au contexte** | 🟢 | Évolution de 6.2 : produire une formulation qui nomme explicitement l'axe du problème ou de l'objectif choisi (ex : « pour un problème de flux, commencez par 1-2 métriques sur le cœur du problème, puis complétez sur un axe contextuel »). Façade déjà en place (`conseilPedagogiquePour(contexte)`) — il suffit d'enrichir cette fonction + maintenir un mapping problème→formulation. **Travail de présentation / lisibilité / placement à faire** : où afficher le conseil adapté ? plier/déplier ? deux paragraphes ou un seul ? Exige un nouveau mockup-preview. | ⏸ |
| 6.3 | Chips « cadres de travail » (DORA, Lean, Scrum…) visibles sur les cartes | 🟡 | La donnée META existe déjà sur 60+ fiches mais n'est jamais rendue — l'utilisateur ne voit pas à quel cadre méthodologique rattacher une métrique | ✅ (19/04/2026, commits `caf98ea` règle de filtrage + `0987af5` rendu sous le nom) |
| 6.4 | Module `CM.Panier` (ajout/retrait métriques vers une sélection personnalisée, persistance localStorage) | 🟡 | Socle du tableau de bord personnalisé multi-axes — permet de construire une sélection 3-5 métriques cohérentes | ⏸ |
| 6.5 | Vue « Mon tableau de bord » groupée par axe (3 statuts : active / veille / écartée) | 🟡 | Rend la sélection actionnable : distingue ce qu'on suit activement de ce qu'on garde en veille, avec raison d'écartement tracée | ⏸ |
| 6.5a | **Conseil holistique post-sélection panier** | 🟡 | Une fois la sélection faite, audit automatique de la cohérence : axes couverts, cadres représentés, niveaux hiérarchiques. Phrases-conseils (« il te manque l'axe humain », « tu as deux métriques DORA, pense à équilibrer avec une OKR »). Reporte le bloc « cadres complémentaires » de la porte Par mon problème vers le panier — plus pertinent ici, parce que l'utilisateur a fait un choix concret. | ⏸ |
| 6.5b | **Déclaration des métriques déjà en place (checkbox)** | 🟢 | Checkbox sur les fiches du catalogue : *« je l'ai déjà »*. Transforme l'outil en diagnostic d'un tableau de bord existant, pas seulement en aide à la création. Nouveau conseil exploitable : *« tu as déjà X et Y, ta complémentarité naturelle serait Z »*. | ⏸ |
| 6.6 | Export / import JSON du panier | 🟢 | Partage entre équipes, réutilisation d'un tableau de bord validé, sauvegarde hors navigateur | ⏸ |
| 6.7 | **Porte « Par mon cadre » (DORA, Scrum, Kanban, SAFe, Lean, OKR, MBO, BSC, ITIL, Générique)** | 🔴 | 3e porte d'entrée — pour l'utilisateur qui part d'un cadre méthodologique installé et cherche quelles métriques ce cadre recommande. Parcours 3 étapes (cadre → niveau → résultats), accordéon par famille d'école de pensée (7 familles, toutes fermées à l'arrivée). 10 cadres actifs + 10 cadres « à venir » en tuiles grisées (XP, EBM, TOC, Théorie des files d'attente, SPACE, Flow Metrics, Hoshin Kanri, COBIT, Cynefin, Wardley Maps). `generique` maintenu comme cadre sélectionnable sous la famille *Universel*. Conseil pédagogique générique v1 (variante par cadre = 6.2+). | ✅ (20/04/2026, cinq commits : `ccbd1e7` planification + `4842231` feat porte complète (référentiel FAMILLES + accordéon) + `ce39360` description des cadres sous le libellé + `680f492`+`2988e07` fixes accents) |
| 6.7a | **Cadres voisins dans le référentiel (co-occurrence pure)** | 🟡 | Bloc en pied de résultats de la porte cadre : *« Cadres voisins dans le référentiel »* (variante C — carte d'invitation validée après mockup-preview). Algorithme : fonction `CM.IndicateursMeta.cadresProchesDe(cadreId, { n, seuilMin, exclure })` qui compte la co-occurrence sur `META.cadres`. Paramètres par défaut : `n=2`, `seuilMin=2` (silence éditorial plutôt que bruit), `exclure=['generique']`. Tuiles cliquables qui pivotent vers le cadre voisin via `CM.VuePorteCadre.pivoterVersCadre` (préserve le niveau et l'étape 3, contrairement à `setCadre` qui relance le parcours). Affiché uniquement si `recos.length > 0`. Aucune table éditoriale séparée — principe source unique de vérité. | ✅ (20/04/2026, commit `6cdb0c4`) |
| 6.7b | **Enrichissement `familleInformelle` sur fiches generique-seul** | 🟢 | Ajouter une clé optionnelle `META[ficheId].familleInformelle` pour les fiches aujourd'hui tagguées `['generique']` seulement, afin que le calcul de co-occurrence puisse les rattacher à un cadre voisin sans les taguer formellement. Conçu comme extension non-invasive de l'algorithme : `cadresProchesDe` accepterait une nouvelle option `inclureFamilleInformelle: true`. Reporté selon décision MVP — à ouvrir seulement si un usage terrain révèle qu'on s'ampute de bonnes suggestions. | ⏸ |
| 6.7c | **Cas particulier `generique` — bloc dédié** | 🟡 | Si l'utilisateur entre par le cadre *Générique*, remplacer le bloc « Cadres voisins dans le référentiel » par un bloc différent : *« Ces cadres spécifiques éclairent les mêmes indicateurs »*. Inversion du sens éditorial — on ne propose pas des voisins au même niveau, on propose une montée en spécificité. Requiert une variante de `_htmlBlocVoisins` ou un paramètre `modeInvitation` et probablement de remonter le résultat sans exclure `generique` (mais ici le cadre source EST generique, donc la logique s'inverse naturellement). | ⏸ |
| 6.8 | Historique / snapshots temporels du panier | 🟢 | Suivre l'évolution de la sélection sur 6-12 mois au rythme de la maturité de l'équipe (ex : on surveille A et B au T1, puis C remplace B au T3) | ⏸ |
| 6.9 | **Catalogue des problèmes — enrichissement + densification de la matrice** *(post-14)* | 🟡 | Origine : test interactif du 25/04/2026, remontée Lætitia *« je n'ai pas le problème "visibilité sur l'avancement" »*. Constats : (a) le vocabulaire fermé `CM.DiagnosticProbleme.TAGS` ne contient que 7 familles (Délais & prévisibilité · Qualité & stabilité · Flux & goulots · Valeur & rentabilité · Engagement & humain · Alignement stratégique · Risque, sécurité & conformité) et n'expose pas explicitement la **visibilité / transparence**, qui est aujourd'hui répartie entre *Alignement stratégique* (visibilité descendante) et *Délais & prévisibilité* (visibilité du flux) ; (b) plusieurs couples (niveau × problème) renvoient seulement 1-3 fiches en sortie d'étape 3 — la matrice éditoriale est creuse sur certaines combinaisons. Action : envisager un 8e tag *Visibilité & transparence* (en respectant la fermeture du vocabulaire — décision éditoriale, pas extension silencieuse), recenser les fiches qui le porteraient déjà implicitement, densifier les couples pauvres soit en re-tagguant des fiches existantes soit en explicitant un message éditorial *« couple volontairement creux : voici pourquoi »*. Gel jusqu'à livraison du chantier 14 (discipline 16.4). | ⏸ |

### 6.a Points d'ancrage code (pour reprise fluide)

Chaque item ci-dessous pointe précisément vers le code à toucher, pour qu'une reprise n'exige pas de refaire l'archéologie du fichier.

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| 6.2+ Variante 3 — conseil adapté au contexte | `CM.Config.conseilPedagogiquePour(contexte)` — la fonction existe déjà et ignore le contexte aujourd'hui | Enrichir cette unique fonction pour router vers une formulation spécifique selon `contexte.probleme` (porte Par mon problème) ou `contexte.objectif` (porte Par mon rôle). Mapping ~6-8 entrées. Les vues n'ont rien à changer. Avant : mockup-preview de lisibilité / placement (travail éditorial à faire). |
| 6.4 Module `CM.Panier` | Nouveau module à créer entre `CM.Preferences` et `CM.App` | API proposée : `Panier.ajouter(id, statut, raison?)` / `Panier.retirer(id)` / `Panier.changerStatut(id, statut)` / `Panier.tous()` / `Panier.parAxe()`. Persistance localStorage clé `cm-panier-v1` |
| 6.5 Vue Tableau de bord | Nouveau module `CM.VueTableauDeBord` + 5e vue dans l'accueil 4 portes | 3 statuts : `active` / `veille` / `ecartee`. Grouper par axe problème (flux, qualité, valeur, risque, humain…). Raisons d'écartement : liste fixe 6 items (voir 6.b) |
| 6.5a Conseil holistique post-sélection | Nouveau module `CM.ConseilSelection` (fonction pure) appelé depuis `CM.VueTableauDeBord` | Entrée : `Panier.tous()` + mapping axes/cadres/niveaux. Sortie : 2 à 4 phrases-conseils. Fonction pure, testable, sans effet de bord — respecte le port hexagonal. |
| 6.5b Checkbox « je l'ai déjà » | Ajout d'un champ `statut='deja-en-place'` dans `CM.Panier` + bouton dans `rendreFicheHtml` (panneau actuel) | Ne casse pas l'API panier existante (le statut s'ajoute à la liste `active` / `veille` / `ecartee`). Le conseil 6.5a exploite cette information pour produire des suggestions de complément. |
| 6.6 Export / import JSON | Bouton dans vue tableau de bord | Format : `{ version:"1", panier:[{id, statut, raison?, dateAjout}], cadres:[…] }`. Import avec validation `CM.Referentiel.chercher(id)` — les ids inconnus sont ignorés + warning |
| 6.7b Enrichissement `familleInformelle` | `CM.IndicateursMeta.META[ficheId].familleInformelle` (clé optionnelle) + option `inclureFamilleInformelle: true` dans `cadresProchesDe` | Extension non-invasive ; si l'option vaut `false` (défaut), le comportement actuel ne bouge pas. Si `true`, une fiche `['generique']` + `familleInformelle: 'lean'` compte comme un vote pour la paire (generique × lean) et pour les paires cachées entre autres cadres tagguant la même `familleInformelle`. À n'ouvrir que si l'usage terrain révèle un manque. |
| 6.7c Cas `generique` — bloc dédié | Variante de `_htmlBlocVoisins` ou paramètre `modeInvitation` | Quand `etat.cadre === 'generique'`, remplacer le titre *« Cadres voisins dans le référentiel »* par *« Ces cadres spécifiques éclairent les mêmes indicateurs »* et ajuster la phrase d'accompagnement. Comme le cadre source EST generique, l'exclusion `['generique']` est ici neutre (pas de self-match) et la liste retournée est précisément celle souhaitée : les cadres qui co-occurrent avec des fiches aussi tagguées generique. |
| 6.8 Snapshots temporels | Extension `CM.Panier` | `Panier.snapshot(nom)` sauvegarde l'état courant avec timestamp, `Panier.comparer(nomA, nomB)` affiche le delta |

### 6.b Spécifications déjà validées (pour ne pas redécider)

**Raisons d'écartement (liste fixe, pas de champ libre)** — validé le 18/04/2026 :
1. Donnée absente
2. Maturité insuffisante
3. Redondante
4. Hors périmètre
5. Risque d'anti-pattern
6. Coût > valeur

**Principe « 3-5 maximum »** : focale **par axe** (1-2 sur l'humain, 1-2 sur la livraison, 1-2 sur l'alignement), pas un plafond global arbitraire. La cohérence entre axes compte plus que le total.

**Principe de non-plafonnement** : toute limite arbitraire imposée par le produit après filtrage explicite (niveau / problème / domaine) crée un biais d'information invisible. Le tri par fiabilité suffit à mettre en tête ce qui est le plus exploitable.

**Principe « source unique de vérité » pour les cadres complémentaires (6.7a)** — validé le 20/04/2026. Les affinités entre cadres ne sont PAS une donnée à stocker dans une seconde table éditoriale : elles sont un *calcul dérivé* des tags `META.cadres` existants. Conséquences : ajouter un nouveau cadre demande uniquement une ligne dans `CADRES` + le tagguer progressivement sur les fiches pertinentes ; les affinités émergent automatiquement. Si un cadre paraît isolé alors qu'il ne devrait pas l'être, c'est un signal que les fiches sont sous-tagguées — le remède est d'enrichir META, pas de créer une couche décorative.

**Principe « generique reste sélectionnable »** — validé le 20/04/2026. La tuile « Indicateur générique » reste un choix accessible depuis la grille de la porte cadre. Elle désigne l'ensemble des fiches non rattachées à un cadre méthodologique spécifique — bac à sable utile, éventuellement porte d'entrée pour un utilisateur sans cadre installé. Le futur bloc 6.7c (*« Ces cadres spécifiques éclairent les mêmes indicateurs »*) proposera une inversion éditoriale quand l'utilisateur entre par `generique`, pour orienter vers les cadres spécifiques pertinents plutôt que vers des voisins de même niveau.

**Principe « accordéon par école de pensée » (v1, remplace la grille à plat)** — pivot décidé le 20/04/2026 pendant le chantier 6.7, après mockup-preview. La v1 initialement prévue (grille à plat 10 tuiles) a été remplacée par un accordéon `<details>/<summary>` natif regroupant les cadres par **7 familles d'école de pensée** : Empirisme agile · Excellence opérationnelle · Observabilité du delivery · Pilotage par les objectifs · IT Service Management · Aide à la décision · Universel. Toutes les familles sont fermées à l'arrivée (carte d'ensemble puis ouverture ciblée). Taxonomie académique volontairement préférée au vernaculaire (Agile, Lean) pour désamorcer les batailles puristes. Les tuiles « à venir » grisées matérialisent l'intention produit (10 cadres annoncés, non branchés à META).

**Principe « taxonomies par porte » — validé le 20/04/2026.** Chaque porte d'entrée appelle une taxonomie différente alignée sur la grammaire mentale de l'utilisateur à ce point d'entrée : porte problème → taxonomie *par promesse utilisateur*, porte niveau → taxonomie *par dimension du pilotage*, porte cadre → taxonomie *par école de pensée académique*. Ne jamais importer mécaniquement la taxonomie d'une porte vers une autre sans revérifier la grammaire locale.

### 6.c Flexibilité architecturale — préparation à coût marginal

Pour garder la file d'attente 6.2-6.8 facile à reprendre, ces refactors **ne cassent rien aujourd'hui** et paveront le terrain :

| Préparation | Bénéfice à la reprise | Coût maintenant |
|---|---|---|
| Ajouter stub `CM.Panier = { ajouter: () => {}, tous: () => [] }` avec `TODO` | 6.4 démarre avec l'API déjà posée ; les vues qui référencent le panier ne cassent pas le jour où on l'active | ~20 lignes, 1 commit `chore:` |
| Créer `CM.Html.escape()` avant le premier usage utilisateur (panier + export JSON seront les premières entrées utilisateur) | 6.4-6.6 ont le garde-fou sécurité déjà présent — pas besoin d'un refactor urgent plus tard | ~10 lignes, règle 1 du refactoring |

⚠️ Ces préparations sont **optionnelles et différées** tant que Lætitia n'a pas redéclenché le chantier 6. Elles sont listées ici pour que le choix soit visible, pas imposé.

### 6.d Diagnostic de creux éditorial — extension de l'item 6.9

*Mesuré le 25/04/2026 par croisement automatique `niveau` × `META.tags` sur les 137 fiches du référentiel. Documenté ici pour cadrer précisément l'item 6.9 quand le chantier reprendra.*

**Distribution du tagging.** 84 fiches sur 137 portent au moins un tag problème dans `META.tags`. Les 53 fiches restantes se décomposent en : **39 fiches du canon Roles** (équipe / portefeuille / entreprise — fiches de description de rôles, non destinées à apparaître dans la porte problème par construction) et **14 fiches au niveau `programme` mais sans tag** — toutes des fiches rôles `ta-*` (architecte, black-belt, chef-programme, RTE, value-stream-manager, etc.). Conclusion : **aucun bug de tagging à corriger sur les 53 fiches sans tag** — leur absence est normale, elles décrivent des rôles, pas des indicateurs.

**Le vrai creux est dans la matrice canonique.** Sur les 28 cellules (4 niveaux DiagnosticProbleme × 7 problèmes) :

| Niveau | Délais | Qualité | Flux | Valeur | Humain | Alignement | Risque |
|---|---:|---:|---:|---:|---:|---:|---:|
| **Stratégique** | **0** | 1 | **0** | 5 | 3 | 4 | 3 |
| **Tactique** | 2 | **0** | 3 | 2 | 1 | 1 | 2 |
| **Programme** | 1 | 2 | 1 | 3 | 1 | 3 | 1 |
| **Opérationnel** | 16 | 23 | 21 | 14 | 8 | 2 | 14 |

**Couples critiques** :

- **3 cellules à 0 fiche** : *Stratégique × Délais*, *Stratégique × Flux*, *Tactique × Qualité*. L'utilisateur ne peut pas atteindre ces couples (la `MATRICE_PERTINENCE` les exclut de l'étape 2 — voir lignes 70-75 de `CM.DiagnosticProbleme`), donc pas de message « vide » à gérer en UI. Mais c'est un signal éditorial : la matrice de pertinence **dit qu'on devrait pouvoir piloter ces couples** alors que le référentiel ne les couvre pas. Décision à prendre : (a) populer ces couples par re-tagging ou nouvelle fiche, ou (b) retirer ces couples de la `MATRICE_PERTINENCE` parce qu'éditorialement non pertinents.
- **5 cellules à 1 ou 2 fiches** (côté niveaux supérieurs uniquement) : *Programme × Délais* = 1, *Programme × Flux* = 1, *Programme × Humain* = 1, *Programme × Risque* = 1, *Tactique × Délais* = 2. Ces couples affichent à l'utilisateur une recommandation indigente — c'est exactement ce que la remontée du 25/04/2026 a révélé sur Programme × Délais (1 fiche, *Taux d'avancement des jalons*). Action : densifier par re-tagging de fiches existantes dont le tag problème actuel est trop restrictif.

**Disproportion verticale.** Le niveau Opérationnel concentre 98 occurrences de tags problèmes ; les 3 niveaux supérieurs cumulent 50 occurrences. La porte problème est donc structurellement **plus utile en bas qu'en haut** — ce qui est l'inverse de la promesse de l'outil pour les directions et portefeuilles.

**Cadrage de l'item 6.9 mis à jour** :

1. *Densification du tagging existant* — re-passer les 84 fiches déjà tagguées et compléter `META.tags` quand un problème secondaire est porté de fait par la fiche mais pas déclaré. Priorité : niveaux Programme et Tactique. Estimation : 2-3 sessions.
2. *Décision sur les 3 couples à 0* — soit ajout de fiches, soit retrait des couples de la `MATRICE_PERTINENCE`. Tranchage éditorial préalable.
3. *Ajout éventuel d'un 8e tag « Visibilité & transparence »* — si la décision (1) ne couvre pas la promesse manquante, envisager l'enrichissement du vocabulaire fermé. À traiter en dernier, parce qu'un tag de plus n'aide pas si les fiches existantes ne sont pas correctement tagguées.

Tout reste gelé derrière la livraison du chantier 14 (discipline 16.4).

---

## 7. Évolutions transversales (cross-portes)

Chantiers ouverts le 20/04/2026 dans le prolongement de la planification de la porte « Par mon cadre ». Ils touchent plusieurs portes à la fois et ne peuvent être imputés au seul chantier 6.

| # | Évolution | Priorité | Valeur | État |
|---|---|---|---|---|
| 7.1 | **Filtres globaux par cadre et par maturité de l'équipe** | 🟡 | Nouvelle déclaration utilisateur sur la maturité de son équipe (débutant / structuré / mature). Le filtre se propage à toutes les portes et masque les fiches dont la maturité requise dépasse le seuil. Évite la recommandation de métriques inaccessibles à l'équipe réelle. Peut aussi accueillir le **regroupement par famille pédagogique** de la grille de cadres (option utilisateur plutôt que structure imposée). | ⏸ |
| 7.2a-inventaire | **Inventaire éditorial des rôles par niveau (prérequis de la phase code)** | 🟡 | *Ouvert le 21/04/2026 après l'arbitrage D2 du mockup-preview, **clos le 21/04/2026 soir**. Quatre niveaux livrés : Opérationnel (`cfa5b68`, 13 rôles), Tactique (`6dd1d30`, 14 rôles — recalé par `ae3233c`), Portefeuille (`fcd8a84`, 13 rôles), Exécutif (`5ab22b8`, 13 rôles). Total : 53 fiches.* Référentiel éditorial livré, source de vérité pour `CM.Roles` en 7.2a-code. Décisions actées : **D2** (quatre axes humaine / projet / méthodologique / stratégique, cumulables), **N1** (double-libellé), **R2** (rôle répété avec qualificatif si à cheval), **C2** (clic sur rôle), **α** (un seul champ *descriptif orthodoxe* par rôle — le champ *dérive du marché* est abandonné ; renverse la décision ρ1 prise plus tôt le 21/04/2026, voir `project_porte_niveau_doctrine_editoriale.md`). Règles éditoriales : pas de mot *senior*, PO reformulé par périmètre de produit. Panel consolidé : SAFe®, Scrum Guide 2020, Lean Six Sigma (Yellow/Green/Black/Master Black Belt + Champion + Sponsor), Cagan *Inspired* et *Empowered*, PMBOK / PMI, PRINCE2, TOGAF / Zachman / IASA, Business Agility Institute (Harbott, Sahota, Burrows), Drucker / Mintzberg / Jaques / Chandler / Collins, Kotler, Ulrich, DAMA DMBOK, NIST + ISO 27001, Goldsmith + Kets de Vries + ICF, MIT Sloan *CTO Handbook*, Gartner CIO Agenda, fonction publique québécoise et fédérale canadienne (classes 1 à 4 / EX-01 à EX-05 + sous-ministre en titre), écosystème coopératif et parapublic QC. Voir `project_porte_niveau_roles.md` et `project_porte_niveau_arbitrages_roles.md`. | ✅ |
| 7.2a-code | **Stepper générique + porte niveau en accordéon à 4 cartouches (architecture)** | 🟡 | *Scindé de l'ex-7.2 le 21/04/2026 après-midi. Re-scindé en trois sous-chantiers le 21/04/2026 soir pour garder des livrables auditables.* Volet **architecture**. Extraire un `CM.Stepper` générique qui accepte un tableau ordonné d'étapes (nombre variable, 3/4/5+ — exigence d'extensibilité validée le 20/04/2026 pour accueillir 7.3 et 7.4 sans réécriture). Porte *niveau* rejoint le parcours guidé avec ordre **niveau → problème → cadre → résultats** ; étape 1 sous forme d'accordéon à 4 cartouches (Opérationnel / Tactique / Portefeuille / Exécutif — libellés de surface, `META.niveau` interne inchangé). Chaque cartouche consomme `CM.Roles` (construit en 7.2a-inventaire). Clic sur le rôle = validation étape 1, état `{ niveau, role }` capturé. Prérequis : 7.2a-inventaire livré. | ⏳ |
| 7.2a-code.1 | **Module `CM.Roles` + générateur de données depuis l'inventaire** | 🟡 | *Livré le 21/04/2026 soir. Trois commits atomiques.* Ids stables posés sur les 53 fiches de l'inventaire (`0c0a7fe`). Module `CM.Roles` injecté dans `cadre-indicateurs.html` avec API de lecture seule (`tousLesRoles`, `parNiveau`, `parId`, `niveauxCanoniques`, `libelleDeSurface`, `axesValides`), fiches figées via `Object.freeze`, validation non-bloquante via `console.warn`. Générateur `tools/generer-roles.js` zéro-dépendance qui parse l'inventaire markdown et réécrit la zone balisée `CM._rolesData` (`f1612cd`). Document compagnon `doc-contrats-stepper-roles.md` qui fixe par écrit les contrats d'API `CM.Roles` et futur `CM.Stepper` pour éviter la dérive entre sous-chantiers (`c8a17a1`). | ✅ |
| 7.2a-code.2 | **Extraction `CM.Stepper` générique + refacto portes problème et cadre** | 🟡 | *Livré le 21/04/2026 nuit. Sept commits atomiques, iso-comportement strict.* Squelette `CM.Stepper` conforme au contrat compagnon (`be776d6`), délégation du bouton *↻ Recommencer* à `rendreResultats` pour préserver son inclusion dans `<div class="carte-etape">` (`6ad4809`), migration `CM.VuePorteProbleme` en façade au-dessus du stepper (`a2eba34`), primitive `remplacerChoix(indexEtape, valeur)` pour le pivot à étage constant (`6509fd0`), migration `CM.VuePorteCadre` (`b36f393`), mise à jour du contrat compagnon avec la nouvelle primitive et un tableau comparatif `setChoix / remplacerChoix / retourA` (`8346d46`), retrait du `domaine: null` redondant dans le ctx de la porte problème après audit montrant qu'il n'était pas un résidu mort (`eaa514c`). Les deux portes existantes (problème, cadre) ne portent plus que leur taxonomie propre et leur rédactionnel — le stepper est le seul responsable de l'état, navigation, scroll et rendu de la barre d'étapes. Nombre d'étapes variable respecté (prêt pour 7.3 et 7.4). | ✅ |
| 7.2a-code.3 | **Nouvelle porte niveau `CM.VuePorteNiveau` (accordéon 4 cartouches)** | 🟡 | Construire la vue qui consomme `CM.Roles` (.1) et `CM.Stepper` (.2). Accordéon à 4 cartouches (Opérationnel / Tactique / Portefeuille / Exécutif), toutes fermées à l'arrivée ; clic sur un rôle valide l'étape 1 avec `{ niveau, role }`. Parcours ensuite : niveau → problème → cadre → résultats. Mockup-preview obligatoire avant tranche UX finale. Prérequis : 7.2a-code.1 livré, 7.2a-code.2 livré. **Avancement** — étape A (contrat) livrée `0e08f37` ; B.1 (coquille DOM + CSS) `238d679` ; B.2 (squelette + stubs) `098bb33` ; B.3 (_etapeRole accordéon 4 cartouches + CSS cran 3 Doux) `215e9d6` ; **C.1 (_etapeProbleme filtré par niveau dérivé) `3e3f105`**. Reste : C.2 _etapeCadre, C.3 _etapeResultats, D câblage tuile d'accueil. | ⏳ |
| 7.2b | **Porte niveau — passe rédactionnelle de retour terrain** | 🟢 | *Scindé de l'ex-7.2 le 21/04/2026 après-midi, allégé le 21/04/2026 après arbitrage D2.* Volet **finition éditoriale post-livraison**. Après quelques semaines d'usage, passe de révision sur les rôles : ajouts manquants remontés par les utilisateurs, ajustements d'axes (un rôle mal classé), précisions de descriptifs. Prérequis : 7.2a-code livré et soumis à l'usage. | ⏸ |
| 7.3 | **Type de décision en 4e étape (mode expert)** | 🟢 | priorisation / investissement / arrêt d'initiative / amélioration continue. Vient directement du brief projet. Une métrique de diagnostic (MTTR, Change Failure Rate) ne sert pas la même décision qu'une métrique de priorisation stratégique (ROI, part de marché). Encodage sur les fiches : nouveau champ `META.decisions = [...]`. | ⏸ |
| 7.4 | **Disponibilité des données en 5e étape (mode expert)** | 🟢 | mesurable aujourd'hui / à instrumenter / absente. Filtre pragmatique pour éviter les recommandations impossibles à alimenter faute d'instrumentation. Allonge le parcours — à réserver au mode expert. | ⏸ |
| 7.5 | **Test A/B boîte modale vs panneau latéral pour les fiches** | 🟢 | Toggle persistant dans `CM.Preferences` (clé `cm-mode-fiche`, valeurs `panneau` / `modale`). Les deux implémentations coexistent le temps du test. Dette accessibilité à anticiper côté modale : focus trap, Escape, aria-modal, retour au scroll. | ⏸ |
| 7.6 | **Liens cliquables vers les métriques recommandées dans le panneau** | 🟡 | Rendre cliquables les noms de métriques dans les encarts « Alternative recommandée » (et plus largement les références croisées entre fiches). Ouvre la fiche cible sans retour à la liste. Haute valeur d'usage, faible coût, haute cohérence interne. | ✅ 20/04/2026 (`3afe40e`, `1d77ab4`) |
| 7.7 | **Persistance et partage des parcours en cours** | 🟢 | Aujourd'hui, F5 ramène à l'accueil et efface le parcours en cours sur les trois portes. Deux pistes : (a) mémoriser automatiquement l'étape et les choix dans le stockage local du navigateur, (b) encoder le parcours dans l'URL (`#porte=cadre&cadre=dora&niveau=programme`) pour permettre le partage à un collègue. La deuxième piste est la plus intéressante stratégiquement — elle transforme chaque parcours en objet partageable. Identifié lors de l'audit d'uniformité du 21/04/2026. | ⏸ |

### 7.a Points d'ancrage code

| Item | Fichier / ligne | Nature de l'intervention |
|---|---|---|
| 7.1 Filtres cadre + maturité | Barre de filtres existante + nouveau module `CM.FiltresGlobaux` | Nouveau select « ma maturité d'équipe » persistant dans `CM.Preferences`. Filtrage appliqué dans `CM.Referentiel.filtrerParContexte` (point d'entrée unique déjà existant). |
| 7.2a Stepper générique + porte niveau | Nouveau module `CM.Stepper` (port hexagonal, ne connaît pas le métier des étapes) ; refonte `CM.VuePorteProbleme` et `CM.VuePorteCadre` pour consommer le stepper générique ; nouveau module `CM.VuePorteNiveau` qui remplace la pyramide-accueil + 4 onglets ; nouveau module `CM.Roles` pour le mapping rôle → niveau en dur ; accordéon réutilisable ou inspiré de celui de la porte cadre | `CM.Stepper` orchestre navigation, état, scroll, retour ; chaque étape fournit son schéma de question, rendu, règle de validation. Libellés de surface Opérationnel/Tactique/Portefeuille/Exécutif en vue ; `META.niveau` canonique inchangé dans le code (équipe/programme/portefeuille/entreprise). État étape 1 : `{ niveau, role }` — le niveau dérive du rôle cliqué. `CM.Roles` porte pour chaque rôle : titre, axes (D2), source, descriptif orthodoxe — pas de champ *dérive du marché* (décision α), pas de tooltip associé. Contrat de cohérence respecté : taxonomies propres à chaque porte préservées, seule la mécanique est factorisée. |
| 7.2b Rôles — passe rédactionnelle | `CM.Roles` enrichi (descriptifs travaillés, axes de responsabilité selon grille D, rôles à cheval avec qualificatif), éventuelle mémoire de doctrine éditoriale | Inventaire exhaustif ; arbitrages R2 documentés ; panel d'experts activé pour chaque rôle ambigu. |
| 7.3 Type de décision | Ajout champ `META.decisions` sur toutes les fiches + nouveau filtre dans le stepper | Encodage progressif : commencer par les fiches les plus récentes (standard 2026-04). |
| 7.4 Disponibilité données | Choix utilisateur stocké en `CM.Preferences`, aucun champ à ajouter aux fiches | Filtre côté UI uniquement (« je n'ai pas les données → écarter les fiches qui supposent une instrumentation non triviale »). Le critère de « non-trivialité » reste à définir. |
| 7.5 A/B modale / panneau | Nouveau module `CM.PanneauFiche` (API commune) avec deux implémentations : `CM.PanneauLateral` (actuel) et `CM.PanneauModal` (nouveau) | Abstraction à introduire **avant** de coder la modale, sinon on duplique la logique. Port hexagonal : `PanneauFiche.ouvrir(ind)` / `.fermer()`. |
| 7.6 Liens cliquables | `CM.Composants.rendreAlternative` (et éventuellement `rendreVigilance`) dans `rendreFicheHtml` | Remplacer la concaténation de texte par un `<a data-ind-id="...">` avec un handler qui appelle `CM.App.ouvrirFiche(id)`. Dépend de `CM.Html.escape()` (règle 1 du refactoring). |
| 7.7 Persistance / partage parcours | Extension de `CM.Preferences` (piste a) et/ou nouveau module `CM.PorteHash` similaire à `CM.Hash` mais orienté parcours (piste b) | Piste a : sérialiser `{ porte, etape, choix }` dans localStorage, restaurer au boot. Piste b : encoder `porte=cadre&cadre=dora&niveau=programme` dans l'URL, lecture au boot par un parseur dédié, mise à jour de l'URL à chaque changement d'étape via `history.replaceState`. Prudence XSS sur piste b : valider chaque champ contre sa whitelist (mêmes regex strictes que `CM.Hash`). |

---

## 8. Audit d'uniformité des portes — 21 avril 2026

Audit complet livré dans [`AUDIT-UNIFORMITE-PORTES.md`](./AUDIT-UNIFORMITE-PORTES.md). Contrat de cohérence consigné en mémoire (`project_contrat_coherence_portes.md`) pour être lu au démarrage du chantier 7.2.

**Bilan.** Les portes *problème* et *cadre* partagent déjà 95 % de leur mécanique (duplication saine, terrain propre pour 7.2). La porte *niveau* est structurellement différente (pyramide + 4 onglets, pas de stepper) — décision produit à trancher au démarrage du 7.2 : la faire rejoindre le parcours guidé ou préserver sa forme actuelle. Trois divergences voulues confirmées (taxonomies de première étape, blocs transversaux propres, format des résultats). Trois divergences accidentelles recensées, listées ci-dessous.

| # | Micro-fix | Priorité | Effort | État |
|---|---|---|---|---|
| AUDIT-F-1 | Ajouter l'appel à `CM.Config.conseilPedagogiquePour({ cadre, niveau })` dans `CM.VuePorteCadre._etapeResultats`, en miroir de ce que fait déjà la porte problème. Alignement éditorial. | 🟡 | ~30 min, une dizaine de lignes | ⏸ |
| AUDIT-F-2 | Absorbé par le chantier **7.1** : étendre le filtre maturité aux deux portes stepper, ou documenter qu'il reste spécifique à la vue *Maturité* de la pyramide. | 🟢 | à traiter dans 7.1 | ⏸ |
| AUDIT-F-3 | Absorbé par le nouvel item **7.7** : persistance et partage des parcours. | 🟢 | à traiter dans 7.7 | ⏸ |

---

## 9. Vue panier personnel — nouvelle mission de *Mon tableau de bord*

> **⚠️ Statut au 25/04/2026 — moteur extrait, UI non câblée (dette T1).**
>
> Audit conjoint mené suite remontée Lætitia (test interactif sur HEAD `2a61336`) : *« je n'ai pas le bouton ajouter à mon panier qui apparaît, je ne peux rien ajouter à mon tableau de bord ».*
>
> État réel du code : `CM.Panier` est extrait à la ligne ~3043 de `cadre-indicateurs.html` et expose `ajouter / retirer / tous` ; `tests-panier.html` valide le moteur en isolation. **Mais aucun appelant en UI n'invoque `CM.Panier.ajouter`** — seule `CM.App.retirerDuPanier` est câblée (ligne ~8246, vue *Mon tableau de bord*). Conséquences : la voie rapide *icônes nues coche + ampoule rayonnante* sur les fiches du référentiel (arbitrage 9.B du 22/04/2026, mockup-preview `0cc8a49`) et la voie lente *zone d'ajout dans le tiroir* ne sont **pas implémentées**.
>
> Le scenario de non-régression a été aligné en conséquence : §6 (T1-T4) marqués ⏸ skip jusqu'à câblage. Aucune régression à tester ici aujourd'hui.
>
> Ce chantier est donc **en cadrage clos, en livraison non démarrée**. Gel maintenu derrière le chantier 14 (discipline 16.4 — pas de chantiers cumulés). Reprise = câbler les deux voies sur les vues existantes (porte problème, porte cadre, tiroir de fiche), consommer `CM.Panier.ajouter`, sans toucher au moteur ni à l'API.

**Origine.** Clarification de mission du 22/04/2026, consignée dans [`MISSION.md`](./MISSION.md). Le chantier traduit les décisions de cette session en éléments d'implémentation.

**Mission du chantier.** Transformer l'onglet *Mon tableau de bord* en panier personnel qui matérialise l'écart entre *« ce que je mesure déjà »* et *« ce que j'envisage de mesurer »*. Livrable final : une impression que la personne emporte pour discuter son scorecard avec ses collaborateurs.

**Décisions fermes (actées).**

- **Un seul panier actif à la fois.** Pas de multi-panier en v1. Un bouton *réinitialiser* suffit pour repartir d'une feuille blanche.
- **Deux statuts par indicateur** : *en place* et *à envisager*. Pas d'état *« à retirer »* en v1 — la suppression se fait simplement en retirant l'indicateur du panier.
- **Saisie du panier par le référentiel (Chemin A).** L'utilisateur parcourt les fiches de l'outil et les marque *« en place »* ou *« à envisager »*. Pas de saisie libre d'indicateurs *« maison »*. Cela aligne l'utilisateur sur le vocabulaire de l'outil.
- **Recherche globale avec 1-2 filtres contextuels optionnels.** Permet de retrouver rapidement une fiche par son nom.
- **Vue imprimable : one-pager A4 minimaliste.** *Arbitrée le 22/04/2026 après mockup-preview côte à côte ([`preview-panier-impression.html`](./preview-panier-impression.html), commit `494a4b9`).* Une seule page qu'on tend en réunion : tableau *en place* + tableau *à envisager*, pastille fiabilité, chip niveau, bandeau terrain, trois questions à poser à l'équipe. Outil de conversation, pas document autonome. Rendu volontairement dense pour tenir sur une page sans respirer mal.
- **Sortie canonique : impression + export PDF du même rendu.** Le PDF est une copie fidèle du one-pager imprimable, pas une transposition vers un autre format. Il sert la personne qui ne peut pas imprimer physiquement ou qui veut envoyer le scorecard à un collègue. Pas d'export vers Excel, Word ou un format tiers — l'outil garde la main sur la forme parce que la forme sert la lisibilité, et la lisibilité sert la conversation.
- **Persistance : session éphémère en v1.** *Arbitrée le 22/04/2026.* Le panier vit dans un objet JS en mémoire et disparaît au F5 ou à la fermeture de l'onglet. Aligne avec la posture socratique de `MISSION.md` : chaque visite est un exercice rituel, l'occasion de reposer la question *« qu'est-ce que je mesure, et pourquoi ? »*. Garde-fou à coder quand même : confirmation `beforeunload` si le panier n'est pas vide — empêche le F5 accidentel punitif sans transformer la session en persistance déguisée. Architecture préparatoire en revanche : port hexagonal `CM.Panier.Depot` posé dès v1 avec une implémentation `MemoireDepot`, pour que l'ajout d'un futur `LocalStorageDepot` (voir *Pistes futures*) soit une bascule d'adapter, pas une refonte.
- **Interaction d'ajout au panier : hybride A+icônes nues.** *Arbitrée le 22/04/2026 après six itérations de mockup-preview.* Deux voies d'ajout complémentaires. **Voie rapide sur la liste** : deux icônes nues (sans cadre de bouton) sur chaque fiche du référentiel — une **coche** à gauche pour *« en place »*, une **ampoule rayonnante** à droite pour *« à envisager »*. Icônes 22 px, cercle teinté au survol pour l'affordance. Un clic pose le statut, re-clic retire, clic sur l'autre icône bascule entre statuts. **Voie lente dans la fiche ouverte** : zone d'ajout complète qui permet de justifier le choix et d'ajouter une note de contexte au moment de la mise au panier. Descriptions synthétiques (une phrase) dans la liste, descriptions longues réservées à la fiche ouverte. Tons chromatiques discrets (vert et ambre désaturés) pour la fiche active, couleur d'icône pour l'état actif — pas de chip textuelle redondante à côté du titre (cf. règle *deux signaux suffisent*). *Historique des mockups* : `9dd2ef5` (A/B/C initial), `02f52d3` (option E deux icônes), `e2ae1bf` (A+E vs cases conventionnelles), `41a0cf8` (ampoule vs engrenage), `33586e4` (ampoule rayonnante), `0cc8a49` (icône agrandie vs icône nue).

**Questions résiduelles à trancher au démarrage.**

*Aucune en attente. Le cadrage du chantier 9 est clos. Les trois arbitrages majeurs (vue imprimable, persistance, interaction d'ajout) sont tous actés en Décisions fermes. Le code peut démarrer.*

**Tranche 9.E — précisions de cadrage du 26/04/2026 (impression web).**

Au moment de démarrer le code de la tranche 9.E (vue imprimable web, antérieure à la clôture 9.F du 27/04/2026), trois zones du mockup `preview-panier-impression.html` se sont avérées sous-spécifiées et ont fait l'objet d'arbitrages explicites avant écriture de code.

- **En-tête du one-pager : titre fixe + date du jour, pas de zone auteur/rôle/niveau.** *Arbitrée le 26/04/2026.* Le mockup affichait un bloc meta fictif (« Marie Dubois · Directrice Produit · Niveau programme »). Décision : on supprime ce bloc. L'en-tête réel se réduit au titre *« Mon scorecard »*, au sous-titre, et à la date du jour calculée à l'impression. Justification : cohérent avec la posture *« outil de conversation »* — le scorecard est l'objet, pas l'auteur. Pas de saisie, pas de stockage de profil, zero friction.
- **Colonne « Pourquoi je la suis / Ce qu'elle éclairerait » : note utilisateur stricte (voie lente).** *Arbitrée le 26/04/2026.* La cellule est nourrie exclusivement par le champ `note` saisi via la voie lente du tiroir de fiche (chantier 9.D). Si la note est vide, la cellule est vide — pas de placeholder, pas de fallback sur la définition de la fiche. Justification : fidèle à la voix de la personne qui a saisi le scorecard. Une cellule vide invite naturellement à compléter avant la réunion, sans intrusion typographique.
- **Bandeau terrain et trois questions à poser à l'équipe : option A retenue — texte fixe rédactionnel.** *Arbitrée le 26/04/2026 après mockup-preview côte à côte ([`preview-panier-impression-bandeau.html`](./preview-panier-impression-bandeau.html), commit `a1be292`).* Bandeau-aphorisme universel : *« Le chiffre alerte. Le terrain explique. Aucune métrique n'est un verdict — chacune est une invitation à questionner ce qui se joue vraiment dans mes équipes. »* Trois questions génériques fixes valables pour tout scorecard (« lequel n'a jamais déclenché d'action », « que voyons-nous sans le mesurer », « si je n'avais qu'un seul »). Aucune saisie, aucun champ éditable, aucun JS supplémentaire. Justification : posture éditoriale assumée, simplicité d'implémentation, unicité du message. Vigilance acceptée : les questions doivent rester vraies pour 100 % des scorecards. Si feedback terrain montre que la conversation appelle des questions sur-mesure, on rouvre en 9.E.bis (option B du mockup) plutôt qu'on n'anticipe le besoin.

**Tranche 9.B.4 — recherche globale dans la vue panier (rouverte 26/04/2026).**

Audit de reprise mené le 26/04/2026 après livraison du chantier 9.C : la **décision ferme « Recherche globale avec 1-2 filtres contextuels optionnels »** (cadrage 22/04) n'a jamais été codée. Les tranches livrées le 22/04 soir s'arrêtent à 9.B.0 → 9.B.3 (squelette + état vide + chips + bouton réinitialiser). Indice révélateur : la prose des *Pistes futures* sur les liens cliquables PDF s'appuie sur cette recherche supposée acquise (*« la barre de recherche globale du panier permet déjà de retrouver une fiche par son nom »*) — la dette se voit en miroir.

Arbitrages 26/04/2026 : (a) option A retenue contre report en piste future — coder 9.B.4 maintenant. (b) Sur mockup-preview côte à côte ([`preview-panier-recherche.html`](./preview-panier-recherche.html), commit `00fb711`), **option B retenue** — input + chips filtres Type et Niveau peuplés dynamiquement (un chip n'apparaît que si au moins une fiche du panier porte ce type ou ce niveau). Choix d'estompage des fiches non-correspondantes (au lieu de masquage) pour garder la conscience du panier complet. Aucun changement attendu sur `CM.Panier` — la recherche est un filtre côté vue qui consomme `CM.Panier.lister()` existant. Architecture cible : module pur `CM.PanierRecherche.filtrer({lignes, referentiel, requete}) → {resultats, comptesType, comptesNiveau}`, sans dépendance DOM ni couplage à `CM.Panier` (séparation des préoccupations — la recherche est un comportement de vue, pas un comportement métier du panier).

**Tranche 9.F — clôture du 27/04/2026 (libellé bouton « 🖨 Imprimer / PDF »).**

À l'ouverture de la tranche, arbitrage de périmètre : la décision ferme du chantier 9 disait *« Sortie canonique : impression + export PDF du même rendu. Le PDF est une copie fidèle du one-pager imprimable, pas une transposition vers un autre format. »* Sur macOS, l'aperçu système ouvert par `window.print()` propose nativement *Enregistrer en PDF* dans le menu déroulant « PDF » en bas à gauche — ce qui satisfait déjà la décision sans coder un export PDF interne. Un export interne (jsPDF / html2pdf) ajouterait une dépendance externe et un risque de drift visuel pour reproduire ce qui existe déjà nativement, contrevenant à la doctrine zéro-dépendance.

Décision retenue : clore 9.F en rendant la double fonction du bouton 🖨 explicite à l'écran, sans toucher au moteur d'impression. Mockup-preview en trois variantes côte à côte ([`preview-bouton-imprimer.html`](./preview-bouton-imprimer.html)) — tooltip enrichi seul, sous-libellé sous le bouton, libellé combiné. **Variante C retenue** : le bouton affiche directement « 🖨 Imprimer / PDF », `aria-label` mis à jour pour les lecteurs d'écran (« Imprimer ou enregistrer en PDF le tableau de bord »), `title` ajouté pour l'astuce (« Cmd+P puis « Enregistrer en PDF » dans le menu PDF de l'aperçu »).

Implémentation : 1 commit code (`e8649e9`) — 3 lignes modifiées dans `_htmlPanierHeader()` du module `CM.Composants`. Tag `mvp-9f-libelle-pdf` posé. Aucune dépendance ajoutée, aucun changement CSS, aucun changement de mise en page.

*Apprentissage du jour* : sur une option « clore sans code, juste micro-mention pédagogique », ne pas placer la mention dans le rendu imprimable lui-même (paradoxe : un PDF qui dit comment l'enregistrer en PDF). La mention doit vivre à l'écran, attachée au déclencheur.

**Clôture du chantier 9.** Avec la tranche 9.F close, le chantier 9 est entièrement livré : 9.A (squelette panier), 9.B.0-3 (TDB grille miroir), 9.B.4 (recherche globale), 9.C (voie rapide icônes), 9.D (voie lente tiroir), 9.E (vue imprimable web), 9.G (garde-fou `beforeunload`), 9.F (libellé bouton). Reste la dette technique listée ci-dessous (refonte de `tests-porte-niveau.html`).

**Dette technique identifiée en cours de chantier (hors scope, à refondre après 9).**

- **`tests-porte-niveau.html` KO** — ✅ **ÉTEINTE le 27/04/2026** (tag `mvp-dette-tests-porte-niveau-eteinte` sur `bc3042d`). Découvert le 22/04/2026 en livrant le harnais de `CM.Panier`. Le patron de test *« iframe caché qui charge cadre-indicateurs.html + accès à `contentWindow.CM` »* ne fonctionnait pas en Chrome moderne sur `file://` (origine `null` distincte). Refonte livrée : (a) marqueurs `ZONE-TESTS-PORTE-NIVEAU BEGIN/END` posés sur 5953 lignes de prod (22 modules CM.*, de Config à PanierImpression) ; (b) générateur Node `outils/construire-tests-porte-niveau.js` (clone du patron panier, avec fusion multi-`<script>` → mégascript) ; (c) harnais refondu hors-iframe (`var W = window` comme alias historique pour ne pas toucher au corps des 9 suites). Test interactif validé par Lætitia : 9 suites au vert, aucune régression du chantier 14.

**Articulations.** La mission de cet onglet, telle qu'elle est posée dans `MISSION.md`, est *voir ce qui est présent dans ma réalité actuelle et ce que je devrais mesurer sans le mesurer*. Il devient le *miroir* de l'utilisateur. Il ne remplace pas la pyramide — il capitalise dessus : la pyramide sert désormais à explorer le référentiel pour y puiser, le panier est la sélection retenue.

**Pistes futures (nice-to-have, hors v1).**

- **Liens cliquables dans le PDF exporté.** Rendre chaque nom d'indicateur du PDF ouvrable d'un clic pour revenir sur la fiche correspondante dans l'outil en ligne. *Pas prioritaire en v1* : la barre de recherche globale du panier permet déjà de retrouver une fiche par son nom, ce qui couvre 90% du besoin. À rouvrir si un retour terrain montre que la friction de la recherche est un frein réel à la conversation. *Consigné le 22/04/2026 suite à l'arbitrage de la question 1.*
- **Persistance du panier par localStorage (éventuelle v2).** Le panier survit à F5, à la fermeture de l'onglet, au redémarrage du navigateur. Branche d'adapter : nouveau `CM.Panier.LocalStorageDepot` qui remplace le `MemoireDepot` v1 via l'interface `Depot` déjà posée. Clé versionnée (`cm-panier-v1`) dès le début pour gérer proprement les futurs changements de schéma. *Pas prioritaire en v1* : la décision produit v1 est la session éphémère, dont la friction de F5 sert l'exercice rituel de repose-toi-la-question. À rouvrir si retour terrain montre que refaire le panier à chaque visite est un frein plus grand que l'exercice de relecture qu'il provoque. *Consigné le 22/04/2026 suite à l'arbitrage de la persistance.*
- **Clic-glisser pour rebasculer une fiche entre les deux colonnes.** Dans la vue panier (`Mon tableau de bord`, tranche 9.B), permettre à l'utilisateur de faire glisser une fiche d'*En place* vers *À envisager* (et inverse) en drag-and-drop natif. Consomme `CM.Panier.basculer(ficheId, versStatut)` — aucun changement de contrat. *Pas prioritaire en v1* : la voie lente du tiroir (9.D) permet déjà de basculer via un contrôle explicite, et la suppression + ré-ajout via la voie rapide couvre le reste. La valeur ajoutée du drag vient surtout du plaisir ergonomique — à instrumenter si des retours terrain montrent que la bascule est une action fréquente, pas rare. Contraintes techniques à anticiper : gestion clavier (a11y), feedback visuel pendant le drag, comportement sur mobile (long-press). *Consigné le 22/04/2026 à l'arbitrage 9.B.0 — une icône `×` retirer suffit par ligne en v1, le drag est remis à plus tard.*

---

## 10. Refonte architecture de navigation — fusion portes + onglets *(⏸ EN ATTENTE depuis le 04/05/2026 — bloqué par chantier 19 cadre visuel)*

*Titre historique : « Bandeau de navigation persistant ». Requalifié le 22/04/2026 soir suite à la clarification structurante pendant le test 9.B.1 — le chantier dépasse le simple bandeau, il revoit la topologie de la navigation.*

**Statut au 04/05/2026 : en attente du chantier 19 — Cadre visuel et UX.** *Reprise du 02/05/2026 actée — D1 tranchée. Au point d'attaquer D2+D4, question préalable apparue : l'accueil hérite du style du site, on ne peut pas dessiner sans cadre. Bifurcation sur le chantier 19 (`doc-cadre-visuel.md`, commit `6e79f0c`). D2+D4 reprendront en étape C du chantier 19.* Toutes les décisions du chantier 10 sont conservées. D1 close. Tag git `baseline-avant-hexagonal` posé sur `5655b03` — point de retour absolu reste valide.

**Origine.** Demande émise par Lætitia le 22/04/2026 au cours de la clarification de mission, **aiguisée le même jour en soirée** pendant le test visuel de 9.B.1 : l'outil se vit comme **deux territoires mal reliés** — d'un côté les portes (pyramide, niveau, problème, cadre) qui communiquent entre elles mais dont la seule sortie est un *Accueil* qui remet à zéro ; de l'autre l'app (les onglets : TDB, Choisir, Maturité) qui, une fois atteinte, est un enclos sans passerelle retour vers les portes. En prime, **des chemins jumeaux avec des dynamiques graphiques différentes** donnent l'impression de deux produits cousus ensemble — notamment *Choisir mes indicateurs* (onglet) et *Par mon problème* (porte) qui explorent le même référentiel avec des langages visuels différents.

*Formulation initiale en 7.8 (matin du 22/04), absorbée ici l'après-midi après la clarification de mission : les trois manques listés alors — absence de pontage entre portes, retour difficile au tableau de bord, deux accueils qui se masquent — sont tous adressés par la refonte posée ici. 7.8 retiré du backlog ; trace historique préservée via `git log` (commit `286763a`).*

**Mission du chantier.** Refondre la topologie de navigation pour que **portes et onglets cohabitent au même étage** — accessibles depuis partout, sans enclos. Ramener l'outil à ce que prescrit `MISSION.md` : *« quatre outils complémentaires, dans lesquels on entre par n'importe lequel selon la situation. Pas de fil imposé, un cycle que l'on emprunte à son rythme. »*

**Arbitrages structurants — 22/04/2026 soir.**

- **Fusion, pas juxtaposition.** Les portes et les onglets sont au **même étage** de la navigation — pas un bandeau qui énumère « Accueil · Mon tableau de bord · Choisir · Maturité · Lexique · À propos » en laissant les portes dans un monde séparé. La nav unifiée doit inclure les portes comme entrées de premier rang, au même titre que les onglets.
- **Doublon prioritaire à traiter : *Choisir mes indicateurs* vs porte *Par mon problème*.** Ce sont aujourd'hui deux chemins qui font un travail très proche (aider l'utilisateur à choisir des indicateurs) avec des langages graphiques différents. Le chantier doit **trancher** : fusion ? spécialisation assumée (chacun pour un usage distinct, clairement nommé) ? suppression d'un des deux ? C'est la décision fondatrice du chantier — toutes les autres en découlent.
- **Timing.** Chantier **engagé après clôture de 9.B** (boucle 9.B.2 + 9.B.3 d'abord). Le panier est le bon moment pour stabiliser l'architecture de navigation parce qu'il est l'artéfact qui doit pouvoir être alimenté **depuis n'importe quelle porte et n'importe quel onglet** — sans panier, la refonte aurait moins de prise.

**Contenu proposé (à valider au démarrage).**

Accueil · Mon tableau de bord · Choisir mes indicateurs · Cascade stratégique · La maturité ? · Lexique · À propos.

**Sept entrées.** Arbitrages du 23/04/2026 consignés dans le doc compagnon `doc-contrats-navigation.md` : (a) *Cascade stratégique* **réémerge** dans la v1 — le chantier 11 est absorbé ici, sa mission sera clarifiée à l'occasion du chantier 10 ; (b) *Maturité & Recommandations* est **renommé *La maturité ?*** — article défini + point d'interrogation = posture socratique, cohérente avec `MISSION.md`. L'ordre reflète le fil narratif naturel de la charpente, sans imposer ce fil — l'utilisateur reste libre d'entrer par n'importe quel onglet.

**Tâches de clôture du chantier 10.** Rafraîchir `MISSION.md` (renommer section *Maturité & Recommandations* → *La maturité ?* ; retirer la mention *en pause* de *Cascade stratégique* ; clarifier la mission cible de Cascade si elle s'est décantée pendant le chantier).

**Prérequis.** Chantier conditionné à l'appropriation de `MISSION.md`. Pas de dessin du bandeau tant que la mission n'est pas stabilisée — sinon on fige la charpente sur la structure actuelle.

**Questions à trancher au démarrage.**

- Remplace-t-il complètement la barre d'onglets actuelle (celle qui apparaît dans l'app après l'accueil), ou s'y superpose-t-il ?
- Comportement responsive : bandeau horizontal unique, ou bandeau repliable sur petit écran ?
- L'onglet actif doit-il être visuellement marqué dans le bandeau (feedback de position), et si oui avec quel traitement ?
- *(ajouté 24/04/2026 — analyse d'expert)* **Nommage explicite des personas à l'entrée ?** Quatre profils cibles identifiés : coach en transformation, DSI / responsable transformation, chef de programme, dirigeant. Faut-il les **nommer** à l'entrée pour que chaque visiteur se reconnaisse immédiatement (*« je suis coach, je cherche à cadrer un CoDir »*), ou laisser l'outil agnostique et faire porter la reconnaissance par la taxonomie des modes (*Par mes 4 axes* / *Par ma question*) ? Arbitrage à faire en ouverture du chantier 10 reprise. Impact potentiel sur le dessin de l'accueil et sur la charte éditoriale des questions fines du mode *Par ma question*.
- *(ajouté 24/04/2026 — analyse d'expert)* **Mécanisme de reformulation dans le mode *Par ma question* ?** Un visiteur novice croit souvent chercher la mauvaise métrique (vélocité au lieu de lead time, NPS au lieu de rétention). L'outil doit-il proposer une **reformulation** avant de répondre, et sous quelle forme : redirection douce (*« votre question ressemble à celle-ci, souhaitez-vous basculer ? »*), double réponse (*« voici ce que vous demandez, voici ce que vous cherchez probablement »*), ou question miroir socratique (*« avant de répondre, est-ce bien la vélocité que vous cherchez ou la prévisibilité ? »*) ? À cadrer au moment de construire le catalogue de questions fines. Dialogue directement avec la posture *La maturité ?* (article défini + point d'interrogation = posture socratique).

**Articulations.** Ce chantier dialogue directement avec le chantier 9 (panier) : le bandeau est ce qui permet à l'utilisateur de naviguer entre *son panier* et *les lentilles pour l'enrichir* sans se perdre. Il est aussi conditionné au chantier 11 (refonte Cascade) : si Cascade revient dans une v2 avec une nouvelle mission, le bandeau devra l'accueillir.

**Friction confirmée par l'usage — chemin laborieux vers *Mon tableau de bord*.** Remontée Lætitia 26/04/2026 lors du test interactif de la voie rapide 9.C (commit `72d9ba7`) : *« le chemin pour accéder à mon tableau de bord est un peu laborieux, car il faut passer par la pyramide »*. Constat précis : depuis n'importe quelle porte (Par mon problème / Par mon cadre / Par mon niveau), pour aller vérifier l'état du panier dans *Mon tableau de bord*, l'utilisateur doit revenir à l'accueil legacy `#accueil` (pyramide) puis cliquer sur l'onglet TDB. Trois étapes (sortir / revenir / entrer) pour une consultation qui devrait être à un clic. C'est exactement la friction que la fusion portes + onglets au même étage est censée résoudre — preuve par l'usage que la refonte est pertinente.

**Friction confirmée par l'usage — redondance pyramide ↔ choix du niveau dans la porte *Par mon niveau*.** Remontée Lætitia 07/05/2026 séance nuit lors de la livraison du bandeau du haut (commit `5c72263`) : *« la page de pyramide est redondante avec la suite de la porte par mon niveau. On va d'abord sur la pyramide pour choisir son niveau puis on arrive sur la page où en troisième choix on doit redéfinir son niveau hiérarchique. »* Constat précis : la pyramide est entrée par sélection d'un niveau (équipe / programme / portefeuille / entreprise), puis l'app interne (vue *Choisir mes indicateurs*) ou la porte *Par mon niveau* relance la même question dans son propre flux. Double saisie sans valeur ajoutée. Cohérent avec la décision déjà actée de faire disparaître la pyramide au chantier 10 (cf. § 4.1 *doc-contrats-navigation.md* — *« Plus de bascule pyramide/portes »*) — à traiter en même temps que le sort de la pyramide.

**Points d'ancrage code (à recaler au démarrage).** En-tête des trois portes (lignes approximatives ~2134, ~2164, ~2199 dans `cadre-indicateurs.html`), en-tête de `#app` (~2227), bascule accueil `CM.App.basculerAccueil` / `afficherAccueil` (~6848 à ~6860), pieds des deux accueils (~1977 et ~2121). Topologie à repenser : trois portes + app-onglets + deux accueils = 5 vues distinctes où l'utilisateur peut se perdre. Questions connexes à trancher avec le bandeau : garder ou fusionner les deux accueils (pyramide `#accueil` vs 4 portes `#accueil-portes`) ; comportement du contrat de cohérence inter-portes (le bandeau doit rester identique sur toutes les vues, pas de divergence voulue ici).

---

## 11. Refonte *Cascade stratégique* — absorbé par le chantier 10

**Origine.** Clarification de mission du 22/04/2026. Lætitia avait exprimé ne plus comprendre la mission de cet onglet dans le cadre posé.

**Statut actuel (23/04/2026).** *Cascade stratégique* **réémerge** dans la v1 de la navigation (7 entrées — cf. chantier 10). Le chantier 11 tel qu'initialement formulé — *refonte avec nouvelle mission posée séparément* — est donc **absorbé par le chantier 10** : la mission de Cascade sera clarifiée au fil du chantier 10 (doc compagnon + previews + éventuelle refonte ciblée si un besoin utilisateur émerge à l'occasion).

**Option de refonte déjà identifiée (trace historique).** Donner à la vue une mission alignée avec la charpente — par exemple *« voir comment les indicateurs à mon niveau s'articulent avec ceux du niveau au-dessus et du niveau en-dessous »*. Cela servirait directement le principe Druckerien d'alignement vertical des objectifs (MBO) et la logique OKR de cascade. Piste à re-tester à l'usage pendant le chantier 10.

**Critère de refonte active.** Le chantier 10 décide — à la lumière des previews et des retours — s'il faut refondre Cascade ou simplement la rétablir telle quelle dans la nav. Un chantier dédié de refonte ne se rouvre que si un besoin utilisateur récurrent fait émerger le manque.

---

## 12. Chantier éditorial — Transparence des cotations *Fiable / Précaution / Risquée*

**Origine.** Session du 23/04/2026 — diagnostic de la vue Maturité, suite au fix d'affichage (`ed51cf0`). Le bloc *Cotation fiabilité des métriques* est déjà présent dans la vue (labels *Fiable — employer librement*, *Précaution — employer avec réserve*, *Risquées — employer avec vigilance*) mais les définitions restent courtes. L'utilisateur doit pouvoir comprendre *pourquoi* telle métrique est cotée *Risquée* sans fouiller le code — et ces définitions doivent être réutilisables hors de la seule vue Maturité.

**Mission.**
- **Enrichir** les définitions des trois cotations : rédaction courte et parlante de ce que chaque niveau signifie, critères d'attribution, 1-2 exemples concrets par niveau.
- **Migrer** ces définitions dans le **Lexique** (référentiel partagé, accessible depuis toutes les portes et l'onglet *La maturité ?*) pour éviter de les dupliquer.
- **Préparer** l'onglet *La maturité ?* à s'appuyer sur le Lexique plutôt que sur des définitions locales — l'onglet devient un miroir éditorial alimenté par le Lexique, pas une page autonome.

**Articulations.** Tranche éditoriale pure — peut être engagée en parallèle du chantier 10 (refonte navigation). Elle est un **pré-requis du chantier 13** (outil de diagnostic de maturité) qui capitalisera sur ces définitions.

**Priorité : 🟡 moyenne.** À engager à la clôture du chantier 10.

---

## 13. Outil de diagnostic de maturité — pour l'onglet *La maturité ?*

**Origine.** Session du 23/04/2026 — arbitrage sur le renommage et la mutation de l'onglet *La maturité ?* (article défini + point d'interrogation = posture de recherche). Lætitia a consigné l'intention de proposer plus tard un outil de diagnostic, d'où la posture socratique du nom.

**Mission.** Concevoir un outil qui permet à un utilisateur de **situer la maturité** de son équipe (ou de son domaine) sur les dimensions pertinentes, et d'en déduire **une poignée de métriques à engager en premier**. Cet outil alimente l'onglet *La maturité ?* et prolonge la porte *Par ma maturité* (lentille prospective) en un diagnostic interactif.

**Prises de conscience visées** (cf. `MISSION.md`) : *« je ne savais pas que je mesurais trop »*, *« je ne savais pas que je pouvais mesurer avec peu »*, *« je ne savais pas que je n'étais pas mature »*.

**Cadres de référence à mobiliser** (à confirmer au cadrage) : CMMI (niveaux 1-5), Capability Maturity Model DevOps (Accelerate / DORA), modèles d'échelle agile (Nexus, LeSS, SAFe — en contraste), Lean Maturity Assessment. Panel d'experts à convoquer lors du cadrage, pas par défaut.

**Pré-requis.** Chantier 12 (Transparence des cotations) livré avant — les définitions *Fiable / Précaution / Risquée* sont un matériau d'entrée de cet outil.

**Priorité : 🟢 basse en phase de cadrage.** Gros chantier à décomposer en tranches (cadrage mission → squelette diagnostic → intégration à l'onglet *La maturité ?*). À reporter après stabilisation du chantier 10 et livraison du chantier 12.

### 13.bis Sémantique des filtres maturité — vers le cumulatif par sélection multiple *(📋 ouverte le 08/05/2026)*

**Origine.** Le 08/05/2026, sur retour Lætitia, la sémantique des filtres maturité du `_rendreMaturite()` est basculée de **cumulative** (`<=`) à **propre au niveau** (`==`) — variante β (cf. arbitrage à 3 voies α / β / γ proposé en chat). Le filtre actif affiche désormais les indicateurs dont `maturite_min` est exactement le niveau sélectionné. Lætitia consigne explicitement l'éventualité de revenir au cumulatif **à la demande de l'utilisateur**, en transformant les boutons-onglets *Équipe débutante / intermédiaire / avancée* en **chips cumulables** (sélection multiple) — pattern V3 du chantier 19 déjà éprouvé sur la lentille *Par mes 4 axes*.

**Sémantique cible (à terme).** Les 3 chips Débutant ⊕ Intermédiaire ⊕ Avancé deviennent cumulables ; l'utilisateur active 1, 2 ou 3 chips. Le résultat affiche les indicateurs dont `maturite_min` appartient à l'ensemble des chips actives. Cumulatif explicitement opt-in, plutôt qu'imposé par défaut. Cohérent avec la doctrine d'extensibilité du § 4.4 du cadre visuel (chips wrapent naturellement, posture interactive directe).

**Articulations.** Articulé avec chantier 19 (cadre visuel — pattern V3 chips) et chantier 13 (outil de diagnostic). Pas de pré-requis bloquant.

**Priorité : 🟢 basse.** À ouvrir quand un besoin terrain remontera explicitement le manque de cumulatif (par ex. *« je veux voir TOUT ce qu'une équipe avancée peut suivre, pas seulement ce qui est propre à l'avancé »*). Tant qu'aucun signal terrain ne pointe le manque, β tient.

---

## 14. Refactor hexagonal du socle MVP 4 portes *(⏳ ACTIF depuis le 23/04/2026)*

*Chantier technique. Doc compagnon dédié : [`doc-contrats-chantier-14.md`](./doc-contrats-chantier-14.md) (vérité de référence). Cet encart en est un résumé.*

**Mission.** Isoler la **description des métriques** (le domaine) des **chemins d'accès** (les portes, demain les questions). Une métrique n'appartient à aucun chemin — elle existe dans le référentiel, elle est filtrée par des requêtes que les chemins formulent. Raisons d'agir : (a) **maintenabilité** (un libellé change au seul endroit où la métrique est décrite), (b) **évolution** (ajouter une nouvelle porte, un nouveau cadre, une nouvelle question ne force plus à toucher le cœur du référentiel).

**Périmètre MVP.** Les **4 portes existantes** (*Par mon problème* livrée, *Par mon cadre* livrée, *Par mon niveau* en cours 7.2a-code.3, *Par ma maturité* stub). **Iso-comportement visible** — l'utilisateur ne perçoit strictement rien de nouveau. Hors scope : chantier 10 (gelé), catalogue de questions fines, modes d'entrée parallèles, refonte panier, refonte nav, revue éditoriale des fiches.

**Architecture cible.** Trois zones : (a) **domaine** isolé — `CM.Referentiel`, `CM.IndicateursMeta`, `CM.Config`, `CM.RequeteMetriques` (à créer, API unique `executer(filtre)`) ; (b) **chemins** (adaptateurs d'entrée) — `CM.DiagnosticProbleme`, `CM.DiagnosticCadre`, `CM.Roles` qui deviennent des traducteurs sélection-utilisateur → filtre → appel au cœur ; (c) **vues** (adaptateurs de sortie) — `CM.VuePorteX` et `CM.Composants` qui rendent les fiches reçues. Flux `Vues → Chemins → Requete → Referentiel + Meta + Config`, aucune flèche ne remonte.

**Plan d'attaque — 4 étapes.**

| # | Étape | Livrable | Durée estimée | Tag de clôture |
|---|---|---|---|---|
| **(a)** | Inventaire du schéma d'étiquettes | `inventaire-schema-metriques.md` (texte uniquement, pas de code) | 1 session | `mvp-etape-a-schema-inventorie` |
| **(b)** | Extraction du cœur `CM.RequeteMetriques` (coexiste avec l'ancien) | Module + tests unitaires `tests-requete-metriques.html` | 2-3 sessions | `mvp-etape-b-coeur-extrait` |
| **(c)** | Migration des 3 portes livrées vers `CM.RequeteMetriques` | Porte par porte, scénario non-régression vert à chaque bascule | 4 sessions | `mvp-etape-c-portes-migrees` |
| **(d)** | Nettoyage + doc finale | Code mort retiré, doc compagnon finalisé, `MISSION.md` rafraîchi | 1 session | `mvp-chantier-14-livre` |

**Avancement au 26 avril 2026.** Étapes (a), (b), (c.1), (c.2), (c.3), (c.4) livrées. **Étape (c) globalement close** — la migration des 4 portes vers `CM.RequeteMetriques.executer` est actée. (c.4) a été validée comme **acte de documentation** : porte *Par ma maturité* stub d'accueil sans module dédié, emplacement propre par construction, commentaire-balise architectural inséré dans `cadre-indicateurs.html` après `CM.VuePorteNiveau`, contrat futur de `CM.VuePorteMaturite` posé en §c.4 du doc compagnon. **Tag `mvp-etape-c-portes-migrees`** posé sur ce commit. Prochaine étape : **(d) — nettoyage et documentation finale**.

**Avancement au 26 avril 2026, fin de séance — chantier livré.** Étape (d) close en trois commits : (d.1) retrait code mort `delegationPour` + `DELEGATION` (`f75be8b`, 21 lignes) ; (d.2) mutualisation `rangFiabilite` dans `CM.IndicateursMeta` (`18f7ab8`, helper dupliqué 3 fois → 1 seul site) ; (d.3) doc compagnon §3.4 « Architecture livrée » + garde-fou architectural dans `MISSION.md` + backlog rafraîchi (commit du présent rafraîchissement). **Tag final `mvp-chantier-14-livre` posé**. Le doc compagnon est désormais la source de vérité de l'architecture livrée. Le chantier 10 (gelé à `5655b03`) peut reprendre.


**Deltas de schéma à intégrer en (b)** (identifiés à l'étape (a), validés 24/04/2026) :

*Architecture du cœur (obligatoires avant premier consommateur)*
- Ajout d'un champ `axes` sur les fiches (tableau de 0 à 4 axes Mintzberg parmi `projet`, `methodologique`, `humaine`, `strategique`) — miroir de ce qui existe déjà sur les rôles dans `CM._rolesData`. Permet de filtrer *« quelle contribution managériale la métrique éclaire-t-elle »*. Travail éditorial sur les 84 fiches à étaler, défaut possible = tableau vide (= métrique de socle, voir ligne suivante).
- Ajout d'un booléen `socleDeNiveau` sur les fiches — distingue les métriques de socle (que tout rôle d'un niveau doit consulter) des métriques spécifiques (filtrables par axe/rôle). Répond à *« dans un même niveau, des rôles différents consultent-ils des métriques différentes ? »*.
- Réconciliation des **trois vocabulaires de niveaux** qui cohabitent aujourd'hui (`niveau` de fiches vs `niveauData` de `CM.Config` vs `niveau` de `CM._rolesData`) — vocabulaire unique projeté à l'entrée de `CM.RequeteMetriques.executer(filtre)`. Canon pressenti : `strategique / portefeuille / programme / equipe`.

*Enrichissements éditoriaux (à intégrer en (b), passage éditorial étalé)*
- Ajout d'un champ `tagsThematiques` sur les fiches — **vocabulaire fermé de 10 à 14 tags transverses** (lentilles de phénomène organisationnel), orthogonal aux 7 familles de problèmes (`TAGS` dans `CM.IndicateursMeta`) et aux 4 axes Mintzberg. Vocabulaire à arrêter en ouverture de (b). Candidats proposés (à tailler) : communication, prévisibilité, engagement, goulots, coûts cachés, compétences, cadence, feedback, risque, autonomie, sécurité psychologique, variabilité, alignement, expérience client.
- Ajout d'un champ `frequenceMesure` sur les fiches — vocabulaire fermé : `continu / quotidien / hebdo / sprint / mensuel / trimestriel / annuel / ad-hoc`. Défaut possible `ad-hoc` en attendant audit éditorial.
- Restructuration des **anti-patterns** en champ typé — aujourd'hui en prose libre dans les fiches du chantier 1, à passer en tableau d'objets `{nom, description, niveauAlerte}` ou équivalent.
- Ajout d'un champ `reperes` sur les fiches éligibles (~10 à 15 fiches — DORA ×4, NIST ×1, NPS/CSAT/eNPS ×3-4, ITIL/Ops ×3-4). Critère d'éligibilité : référentiel public et nommé qui publie des bandes descriptives (pas prescriptives). Structure `{source, sourceUrl?, unite?, bandes:[{nom, seuil, qualif}]}` avec `qualif` enum fermé (`excellent`/`bon`/`moyen`/`faible`/`alerte`). Passage éditorial étalé sur étape (c).
- Ajout d'un flag booléen `observationPure` sur les fiches-observation (~5 à 10 fiches : `s8`, certaines fiches humaines et ICP). Défaut `false`. Quand `true`, exclut toute gradation (ni `reperes` côté catalogue, ni paliers côté panier si Option C émergeait).

*Ouverts, à arbitrer en ouverture de (b)*
- ~~**Seuils / paliers**~~ — **RÉSOLU 24/04/2026, Option B retenue** (commit `21c76b2`). Champ `reperes` optionnel sur fiches à référentiel reconnu, structure flexible `{source, unite, bandes:[{nom, seuil, qualif}]}`, collapsé par défaut. Flag `observationPure` pour exclure la gradation. Détails : `doc-contrats-chantier-14.md` §10.1.
- **Relations entre fiches** (graphe X→Y, Z ⊂ W) : écart reconnu comme réel. Destination (b) si charge soutenable — propriété `lien:{type, cible}` dans la signature. Sinon glisse en évolution.

*Corrections ponctuelles au fil de (b)*
- Corrections id↔niveau ponctuelles (préfixes `x3`, `o4` divergents du niveau réel) — à traiter en passage éditorial. Pas de renommage d'id (casserait les ancres `#fiche=...`), seulement documentation de la règle « le préfixe d'id est une convention historique, pas une étiquette filtrable ».

*Évolutions futures (hors (b), consignées ici pour ne pas être perdues)*
- **Source des données** (CRM, ERP, Git, survey, humain) — champ structuré à concevoir quand l'usage émergera (ex. filtre « métriques automatisables » vs « métriques d'enquête »).
- **Renommage éditorial du mot « axe »** en double sémantique (Mintzberg vs familles de problèmes §5.5 de l'inventaire) — passe éditoriale séparée.

*Hors scope du cœur (non pas un delta, mais une clarification architecturale)*
- Le **mode d'affichage par porte** (ordre, densité, regroupement d'affichage) est l'affaire des **vues** (adaptateurs de sortie `CM.VuePorteX`), pas du cœur. `CM.RequeteMetriques` renvoie une liste ordonnée ; chaque vue applique sa logique de présentation.

**Procédure versionnement / rollback** (inscrite en contrainte du chantier, pas en savoir-faire implicite) : tag `baseline-avant-hexagonal` sur `5655b03` = point de retour absolu ; tags d'étape à chaque clôture ; principe *pas de suppression avant validation* (le nouveau coexiste avec l'ancien jusqu'à validation) ; vérification systématique de la sync miroir après commit critique ; trois options de rollback (inspection `git diff <tag>..HEAD`, revert contrôlé, reset --hard dernier recours) ; mot-clé entre nous : **« rollback à l'étape X »** déclenche la procédure après confirmation explicite.

**Doctrine panels d'experts.** Convocation **à la demande**, pas par défaut — le chantier est essentiellement technique. Si un arbitrage précis demande un panel (ex : schéma d'étiquettes qui croise Lean et Agile), on convoque ce panel-là, pas un panel rituel.

**Articulations.** Chantier 10 gelé reprend après livraison 14. Chantier 7.2a-code.3 (porte niveau en cours) : option α (finir avant (b)) ou option β (migrer directement en hexagonal en (c.3)), arbitrage à la bascule. Chantiers 12 et 13 non impactés.

**Acte d'ouverture livré** (23/04/2026 fin de journée) : commit atomique `chore(chantier-14): ouverture — baseline + scénario régression + procédure rollback` embarquant tag `baseline-avant-hexagonal`, `scenario-non-regression.md`, `doc-contrats-chantier-14.md`, mise à jour `doc-contrats-navigation.md`, mise à jour `backlog.md`, mémoire `project_chantier_14_ouverture.md`.

**Prochaine étape** : lancer **(a) inventaire du schéma d'étiquettes**. Ne rien toucher au code tant que le schéma n'est pas validé par Lætitia.

---

## 15. Accompagnement post-choix — tenir les indicateurs vivants

**Origine.** Session du 24/04/2026 — analyse d'expert sur la pertinence et l'utilité de l'outil. Diagnostic posé : choisir les bons indicateurs est 30 % du problème ; les faire *vivre* (ritualisation, interprétation collective, détection de dérive, ajustement trimestriel) est 70 %. Le brief mentionne « comment l'interpréter », mais l'outil n'a pas encore de traitement fort du *post-choix*. Sans ce volet, l'outil reste un instrument d'arbitrage ponctuel — il ne travaille pas la durée.

**Mission.** Compléter l'outil d'un volet *après-choix* qui transforme un panier validé en pratique vivante sur 12-24 mois. Trois axes pressentis, à cadrer en ouverture :

- **Ritualisation.** Pour chaque métrique du panier, suggérer un rythme de revue (continu / hebdo / sprint / mensuel / trimestriel / ad-hoc — réutilise le champ `frequenceMesure` prévu au chantier 14) et une **question-guide** de la revue (*« qu'a appris cette métrique ce mois-ci ? son interprétation a-t-elle changé ? »*). Format court attendu : 10 minutes par métrique, cadre réflexif, pas tableau de bord.
- **Détection de dérive.** Liste fermée de signaux observables indiquant qu'une métrique se fait *gamer* (Goodhart), se ramollit (conformité cosmétique) ou devient donnée rituelle morte. Candidats pressentis : stabilisation suspecte à la cible, découplage de l'outcome perçu, migration du conflit vers une métrique voisine, rejet systématique des valeurs extrêmes, cadence de revue qui s'espace. Chaque signal nommé avec le remède associé.
- **Règle de retrait.** Critères pour sortir une métrique du panier : apprentissage stabilisé, dérive confirmée, équipe ayant changé de problème focal, changement de maturité. Le retrait ne signale pas l'échec : il signale que la métrique a fait son travail. Bouton *retirer avec raison* dans la vue panier, raison versée au Lexique comme matériau doctrinal.

**Panels d'experts à convoquer au cadrage.** Deming (PDCA, *profound knowledge*), Seddon (Vanguard method, *failure demand*), Goldratt (TOC, focalisation), Taleb (anti-fragilité, cygne noir), Senge (boucles de rétroaction, archétypes systémiques). À nommer précisément, pas par défaut.

**Articulations.** Exploite le socle panier v1 (chantier 9) et le Lexique enrichi (chantier 12). Nourrit aussi l'outil de diagnostic de maturité (chantier 13) qui a besoin d'indicateurs pour nommer ses paliers. S'appuie sur la discipline **16.1 parcours court** : le volet post-choix ne doit pas alourdir le parcours de *sélection*, il s'active seulement sur un panier existant.

**Non-objectifs explicites.** Pas d'automatisation de la collecte (l'outil ne branche pas d'API métier). Pas de dashboard temps réel. Pas d'alertes push. L'outil reste un miroir réflexif, pas un moniteur.

**Priorité : 🟢 basse — à cadrer en profondeur.** Chantier potentiellement de même envergure que 12 + 13 réunis. À décomposer en tranches : (i) éditorial — nommer les anti-patterns post-choix et les critères de retrait dans le Lexique ; (ii) produit — où ces signaux s'affichent (fiche métrique ? vue panier ? nouveau volet *Ma pratique* ?). Ouvert après livraison du chantier 14 et de la boucle 9.B au minimum.

**Points d'ancrage code (à recaler au cadrage).** Extension `CM.Panier` (ajout `frequenceRevue` et `derniereRevue` par entrée, port `CM.Panier.PratiqueDepot`). Nouveau module `CM.ConseilPostChoix` (fonction pure : panier + contexte → liste de signaux de dérive à surveiller). Éventuel nouvel onglet ou sous-vue du panier — arbitrage UX à l'ouverture.

---

## 16. Garde-fous doctrinaux de non-dérive — disciplines permanentes

**Origine.** Session du 24/04/2026 — analyse d'expert sur les risques structurels de l'outil au stade actuel (84 fiches, 4 portes, 2 modes d'entrée prévus, 8 onglets pressentis). Trois risques nommés : encyclopédisme, paradoxe du choix, surface de décision qui dépasse la décidabilité.

**Nature de cette section.** Ce n'est **pas un chantier avec livrable daté** — c'est une **grille permanente d'évaluation** à appliquer à chaque arbitrage de chantier futur. Consignée ici, elle a le statut d'invariant auquel on revient quand on hésite, pas de *todo* à rayer. Elle ne se clôt jamais ; elle se met à jour si une quatrième discipline émerge de l'expérience terrain.

### 16.1 Parcours court comme juge de paix

**Règle.** Un visiteur motivé doit ressortir en **7 à 10 minutes** avec **3 métriques candidates** et une intention d'action — quel que soit le mode d'entrée emprunté (*Par mes 4 axes*, *Par ma question*, ou accès direct à une porte). Si une modification enrichit le catalogue ou densifie une porte au point de casser ce test, l'ajout est refusé ou amputé, pas amendé à la marge.

**Pourquoi.** La richesse éditoriale n'est utile que si la décidabilité suit. Un outil qui *affiche* beaucoup sans permettre de *sortir avec peu* glisse vers la bibliothèque — et rate sa mission.

**Comment appliquer.** À chaque clôture de chantier de priorité ≥ 🟡, rejouer le parcours court sur les portes vivantes (problème, cadre, niveau, maturité). Si une porte dépasse le plafond, ouvrir immédiatement une ligne 🔴 de *simplification* au backlog — avant tout autre chantier d'extension. Le test est un *smoke test* permanent, pas une cérémonie annuelle.

### 16.2 Anti-encyclopédie — le manque utilisateur nommé

**Règle.** Chaque nouvelle fiche, chaque nouvelle porte, chaque nouveau cadre doit être justifiée par un **manque utilisateur nommé** — pas par une tentation d'exhaustivité doctrinale. Formule attendue en ouverture : *« sans cette fiche, un visiteur de profil X reste bloqué devant Y »*. Si la formule n'existe pas, l'ajout est reporté jusqu'à ce qu'un manque terrain l'exprime.

**Pourquoi.** Le marché ne manque pas de catalogues ; il manque d'outils qui obligent à choisir. Chaque addition non-justifiée augmente la surface de choix sans augmenter la valeur — elle dégrade la décidabilité silencieusement.

**Comment appliquer.** En ouverture de chaque chantier d'ajout éditorial ou de porte, inscrire la ligne *manque utilisateur* en tête du mandat. Le panel d'experts convoqué doit valider que le manque est réel, pas doctrinal. Règle dialogue avec la doctrine *panels à la demande* du chantier 14.

### 16.3 Contrainte volontaire dans le parcours

**Règle.** L'outil doit être son propre contre-poison au paradoxe du choix. Par défaut : on propose peu, on élimine, on force une hiérarchie. Concrètement : pas de liste de 20 candidats en premier rendu, pas d'égalitarisme visuel, pas d'option « tout voir » en premier clic. L'exhaustivité est accessible en secondaire, pas offerte d'emblée.

**Pourquoi.** Sans contrainte volontaire, le rendu *étale* au lieu de *proposer*. L'utilisateur part avec l'impression d'avoir reçu une documentation, pas une décision de candidat.

**Comment appliquer.** À chaque rendu de résultats (porte, mode *Par ma question*, panier, tableau de bord), audit en bas de spec : *est-ce qu'on propose ou est-ce qu'on étale ?* Un rendu qui étale est retravaillé pour porter un angle, ou pour laisser le visiteur demander explicitement l'exhaustivité.

### 16.4 Posture d'ouverture de chantier

Ces trois disciplines forment un **triptyque à relire en ouverture** de chaque nouveau chantier éditorial ou produit, pas en fin de parcours. Le coût de les respecter est marginal en ouverture, massif après coup.

**Rituel proposé.** À l'ouverture d'un chantier ≥ 🟡, rédiger un court encart *16.1 / 16.2 / 16.3* qui répond aux trois disciplines. Trois phrases suffisent. Si l'une des trois bute, c'est un signal — souvent le chantier doit être re-cadré ou re-priorisé.

**Priorité : 🟡 moyenne — permanent.** Ne se clôt jamais. S'enrichit par retour d'expérience.

---

## 17. Enrichissement du catalogue — cadres qui portent les tags sous-seuil *(📋 post-14)*

**Déclenchement.** Après livraison du MVP hexagonal (chantier 14 clos, tag `mvp-chantier-14-livre`). Chantier gelé tant que 14 n'est pas livré (discipline 16.4 — ne pas cumuler les chantiers actifs).

**Origine.** Le Temps 2 du chantier 14 (24/04/2026, commit `b474a20`) a tagué les 84 fiches avec les 14 tags thématiques. Il remonte quatre tags en zone basse : `transversalité` (3 fiches, 3,6 %), `autonomie` (2 fiches, 2,4 %), `variabilité` (6 fiches, 7,1 %), `confiance` (7 fiches, 8,3 %). Les deux premiers passent sous le seuil 5 %.

**Doctrine d'arbitrage verrouillée** (cf. fiche mémoire `project_regle_tags_sous_seuil`) : un tag sous-seuil est **gardé** si au moins un cadre reconnu non encore catalogué porte structurellement le thème. C'est un *signal de lacune du catalogue*, pas un défaut du vocabulaire. Sinon, sortie argumentée.

**Test d'antériorité appliqué aux 4 tags concernés** :

| Tag | Taux | Cadre(s) porteur(s) identifié(s) | Verdict |
|---|---|---|---|
| `transversalité` | 3,6 % | Team Topologies · Value Stream Management · Lean Portfolio | Gardé |
| `autonomie` | 2,4 % | Team Topologies · Management 3.0 · Sociocratie/Holacratie | Gardé |
| `variabilité` | 7,1 % | Six Sigma avancé (Cp/Cpk, SPC, DMAIC Measure) | Surveillance |
| `confiance` | 8,3 % | ADKAR/Prosci détaillé · Psychological Safety (Edmondson) | Surveillance |

**Cadres prioritaires pressentis** — à reconfirmer au moment de l'ouverture du chantier :

- **Team Topologies** (Skelton & Pais, 2019) — ~5 fiches : Team Cognitive Load, Team API freshness, Interaction Mode Stability, Stream-aligned ratio, Dependency Lead Time, Platform Thinness/NPS. Porte `autonomie` + `transversalité`.
- **Management 3.0** (Appelo) — ~6 fiches : Delegation Level, Moving Motivators Satisfaction Gap, Happiness Index, Kudo frequency / Merit Money, Celebration Grid (Experiment Cadence + Learning Ratio), Competency Matrix (Bus Factor + Coverage Gaps). Porte `autonomie` + `engagement` + `confiance`.
- **Value Stream Management** (Flow Framework, Kersten) — ~4 fiches : Flow Velocity, Flow Efficiency, Flow Distribution, Flow Load. Porte `transversalité` + `goulots`.
- **Six Sigma avancé** — ~3 fiches : Cp/Cpk par processus critique, SPC Control Chart Stability, DMAIC Measure Baseline. Porte `variabilité`.
- **ADKAR / Prosci détaillé** — ~5 fiches : Awareness Index, Desire Score, Knowledge Gap, Ability Readiness, Reinforcement Sustainability. Porte `engagement` + `compétences` + `confiance`.

**Ordre pressenti** : Team Topologies > Management 3.0 > VSM > ADKAR détaillé > Six Sigma avancé. Raisonnement : gain le plus visible d'abord sur les deux tags les plus pauvres.

**Exigence qualité par fiche ajoutée** : fiabilité explicite (fiable / precaution / risque), source citée (livre + page ou matériel officiel), positionnement dans le catalogue (niveau + branche + domaine), tags de problèmes (champ `tags` — §5.8 inventaire schéma), tags thématiques (§2 de `inventaire-tags-thematiques.md`).

**Règle conservatrice.** Le chantier 17 n'est pas « refaire le vocabulaire » — le vocabulaire est figé au Temps 3 du chantier 14. Le chantier 17 augmente la **densité d'usage** de chaque tag existant. Si un nouvel axe thématique émerge de cette injection, il est traité comme un chantier séparé 18+, pas comme une révision silencieuse du vocabulaire.

**Priorité : 🟡 moyenne.** Dépendance dure : MVP chantier 14 livré. Temps estimé : 2-3 sessions par cadre, soit ~10-15 sessions pour les 5 cadres prioritaires.

---

## 18. Couverture du catalogue de rôles — zone aveugle Affaires + TI sécurité/exploitation *(📋 post-14)*

**Déclenchement.** Après livraison du MVP hexagonal (chantier 14 clos, tag `mvp-chantier-14-livre`). Préalable nécessaire à l'étape D de 7.2a-code.3 (« câblage tuile d'accueil — remplace pyramide »), qui ne peut pas être livrée tant que la cartouche Opérationnel ne couvre pas toutes les portes que la pyramide ouvre aujourd'hui.

**Origine.** Audit factuel du 26/04/2026 — comparaison entre la pyramide (`<div class="pyramide">` lignes 2160-2256) et l'accordéon de la porte niveau (cartouche **Opérationnel**, 13 rôles dans `inventaire-roles-porte-niveau.md` §1).

**Constat — couverture asymétrique au niveau Opérationnel.**

La pyramide expose **10 portes d'entrée** au niveau Équipes : 4 domaines TI (Développement, Plateforme & DevOps, Operations & Support, Sécurité) + 6 domaines Affaires (Commercial, Marketing, Finance, RH, Operations métier, Service client).

L'accordéon Opérationnel propose 13 rôles, fortement biaisés Agile/Lean/IT (Scrum Guide, SAFe, LSS, BABOK, ASQ, DAMA, Google SRE…) :

| Domaine pyramide | Rôles accordéon couvrants | Manque |
|---|---|---|
| TI / Développement | Développeur, Tech Lead, QA, BA, Designer UX/UI, Coordinateur de livraison, Ingénieur data, PO mono-équipe | — |
| TI / Plateforme & DevOps | SRE / DevOps | — |
| TI / Operations & Support | *(rien)* | Ingénieur exploitation, Technicien support N1/N2/N3, Administrateur système / réseau |
| TI / Sécurité | *(rien)* | Analyste SOC, Pentester, Ingénieur sécurité applicative |
| Affaires / Commercial | *(rien)* | Account Manager, Sales rep, Sales engineer |
| Affaires / Marketing | *(rien)* | Chargé marketing, Brand manager, Growth analyst |
| Affaires / Finance | *(rien)* | Comptable, Contrôleur de gestion |
| Affaires / RH | *(rien)* | Chargé RH, Recruteur, Spécialiste talent |
| Affaires / Operations métier | *(rien)* | Responsable production, Logisticien, Acheteur |
| Affaires / Service client | *(rien)* | Conseiller clientèle, Agent support, CSM |

Rôles transverses qui n'ancrent pas un métier spécifique : *Scrum Master*, *Yellow / Green Belt*, *Chef d'équipe* (descriptif neutre). Ils ne suffisent pas à reconnaître un Account Manager ou une Chargée RH.

**Note** — aux strates **Tactique** et **Portefeuille**, la branche Affaires réapparaît (Chef de service, Business Owner, Champion LSS, Director métier, VP Product, Directeur de business unit, Directeur de domaine métier). Le trou est circonscrit à la strate Opérationnelle.

**Question doctrinale ouverte.**

La porte « Par mon niveau / Quel est mon rôle ? » veut-elle être :

- **(α) universelle** — couvrir l'éventail de la pyramide (4 TI + 6 Affaires + transverses), ce qui suppose d'enrichir le catalogue d'une vingtaine de rôles métier individuels, et
- **(β) délibérément Lean‑Agile/IT** — assumer le périmètre actuel comme un choix éditorial, et conserver la pyramide comme deuxième porte (contradictoire avec l'intention « remplace pyramide » consignée dans le code ligne 7457).

Le choix entre (α) et (β) conditionne tout le reste du chantier.

**Axe de réflexion — mécanique côté parcours.**

Indépendamment de l'élargissement du catalogue, **serait-il pertinent d'ajouter une case à cocher ou une étape supplémentaire dans le processus des portes** pour qualifier la branche (TI / Affaires) ou le domaine (parmi les 10) ? Plusieurs pistes à explorer au moment de l'ouverture du chantier :

- **Étape 0 *Branche*** avant le rôle — cocher *TI* ou *Affaires* pour pré-filtrer la liste des rôles affichés dans l'accordéon, et alléger la lecture quand le catalogue sera dense (~30-35 rôles à terme côté Opérationnel si (α) est retenu).
- **Case à cocher *Domaine*** sur la fiche rôle — le rôle reste la donnée principale, mais l'utilisateur précise son domaine (parmi les 10) pour affiner le `ctx` envoyé à `CM.RequeteMetriques.executer` (clauses `branche` + `domaine`, déjà supportées par le contrat §10.3 du chantier 14).
- **Sous-cartouches dans Opérationnel** — l'accordéon affiche d'abord *TI* / *Affaires* / *Transverse*, puis les rôles à l'intérieur de chacune. Préserve la lisibilité sans imposer une étape supplémentaire dans le stepper.
- **Statu quo enrichi** — pas de nouvelle étape, on liste tous les rôles à plat dans la cartouche Opérationnel et on assume une liste longue à scroller.

Chaque option a des conséquences sur la mécanique du stepper (nombre d'étapes variable, déjà prévu §3.2 doc-contrats-stepper-roles), sur la grammaire mentale de l'utilisateur (combien de décisions avant d'avoir des résultats ?), et sur la fidélité au contrat de cohérence entre portes (`project_contrat_coherence_portes.md`). Décision à instruire avec preview-mockup au moment de l'ouverture du chantier 18.

**Hors scope chantier 14.** Le chantier 14 est iso-comportement strict — il ne touche ni au catalogue de rôles ni à la mécanique du stepper. Cette zone aveugle est consignée ici comme item à part, à instruire après la livraison de 14.

**Priorité : 🟡 moyenne.** Dépendance dure : MVP chantier 14 livré + arbitrage doctrinal (α / β) + arbitrage mécanique (étape supplémentaire ou non). Temps estimé selon scénario : (α) ~8-12 sessions (rédaction des fiches + tests anti-doublons) + 2-3 sessions de mécanique stepper si une étape est ajoutée ; (β) 1-2 sessions pour formaliser la doctrine de cohabitation pyramide + porte rôle.

---

## 19. Cadre visuel et UX — Posture stylistique de référence *(▶ ACTIF depuis le 04/05/2026)*

**Origine.** Au point de cadrage du chantier 10 (étape D2 + D4 — exposition des 4 lentilles dans *Par mes 4 axes* + responsive de la nav à 8 entrées), une question préalable est apparue : *l'accueil hérite du style du site, donc on ne peut pas le dessiner sans avoir cadré le reste*. La doctrine visuelle de l'outil restait diffuse — décisions ponctuelles cohérentes (token `--niv-1`, désaturé Doux pour Mintzberg, fond pill indigo, italique gris) mais sans ligne directrice qui dise *« voilà à quoi ressemble cet outil et pourquoi »*. Lætitia a souhaité convoquer des panels d'experts dans les domaines pertinents pour offrir la meilleure expérience utilisateur et le meilleur visuel pour cet outil.

**Mission du chantier.** Poser une posture stylistique de référence à laquelle toutes les pages de l'outil obéissent. Doctrine permanente, système évolutif. Document compagnon : `doc-cadre-visuel.md`.

**Méthode.** Consultation de **5 panels d'experts nommés** sur **8 axes de boussole**. Patron éprouvé sur les définitions de métriques (`project_regle_definitions_metriques.md`) — panels spécifiques au domaine, pas génériques.

| # | Panel | Auteurs / écoles |
|---|---|---|
| 1 | Architecture de l'information | Morville & Rosenfeld, Abby Covert, Indi Young, Donna Spencer |
| 2 | UX globale et moments-clés | Steve Krug, Jakob Nielsen, Kathy Sierra, Alan Cooper |
| 3 | Pédagogie produit et explorables | Bret Victor, Richard Saul Wurman, Edward Tufte, Mike Caulfield |
| 4 | Visual design et hiérarchie typographique | Vignelli, Rams, Müller-Brockmann, Spiekermann |
| 5 | Design systems et scalabilité | Brad Frost, Nathan Curtis, Carbon/Material, Kholmatova |

**Étapes.**

- ✅ **Étape A — Posture stylistique globale.** Closes le 04/05/2026 (commit `6e79f0c`). 8 axes positionnés tels que recommandés par les panels (aucun déplacement de Lætitia). Posture en une formule : *« un outil artisan-sérieux-chaud, sobre par discipline, interactif par mission, situé par voix »*. Doc `doc-cadre-visuel.md` créé.
- 🟡 **Étape B — Incarnation sur 3 pages-types.** À venir. Périmètre : accueil, fiche d'indicateur, lentille interne de *Par mes 4 axes*. Les autres pages-types (TDB, Cascade, Lexique, À propos) sont laissées au refactoring opportuniste sauf besoin terrain remonté.
- ⏳ **Étape C — Retour au chantier 10 (D2, D4).** Reprise des arbitrages D2+D4 du chantier 10 à la lumière du cadre visuel posé en A et B.

**Articulations.**

- **Bloque temporairement le chantier 10** (D2+D4 attendent l'étape C).
- **Sert de référence pour tous les chantiers visuels suivants** (refonte accueil, refonte fiches enrichies, accompagnement post-choix, etc.).
- **En cas de contradiction** entre `doc-cadre-visuel.md` et un autre doc compagnon (`doc-contrats-navigation.md`, etc.), le cadre visuel tranche jusqu'à révision explicite (cf. § 7 du doc).

**Posture retenue — résumé**.

| # | Axe | Position |
|---|---|---|
| 1 | Sobre ↔ Expressif | Sobre — chaleur portée par la grille et la typographie |
| 2 | Institutionnel ↔ Artisanal | Artisanal sous discipline institutionnelle |
| 3 | Dense ↔ Aéré | Dualité contextuelle — orientation aérée, fiches denses |
| 4 | Sérieux ↔ Ludique | Sérieux et chaud — chaleur par la voix textuelle |
| 5 | Statique ↔ Interactif | Interactif signifiant — chaque clic produit un retour |
| 6 | Standardisé ↔ Singulier | Standardisé sur les composants, singulier sur la signature |
| 7 | Permanent ↔ Évolutif | Doctrine permanente, système évolutif |
| 8 | Universel ↔ Situé | Situé modéré — voix française, grammaire visuelle universelle |

---

## Prochaine action recommandée

**Chantier 19 — cadre visuel et UX — ÉTAPE A CLOSE le 04/05/2026 (commit `6e79f0c`).** Posture en 8 axes établie après consultation des 5 panels d'experts. Doc `doc-cadre-visuel.md` créé. **Chantier 10 mis en attente** — D2+D4 reprendront en étape C du chantier 19.

**Prochaine action recommandée** : enchaîner sur l'**étape B du chantier 19 — incarnation de la posture sur 3 pages-types** (accueil, fiche d'indicateur, lentille interne *Par mes 4 axes*). Une fois B livrée, étape C reprend D2+D4 du chantier 10. Alternatives possibles si l'énergie va ailleurs : **chantier 18** (zone aveugle catalogue rôles), ou **item 6.9** (matrice niveau × tags). Voir aussi en sommeil : chantiers 9 (panier UI), 12, 13, 15, 16, 17.

**Discipline rappelée.** Tag `baseline-avant-hexagonal` = point de retour absolu. Mot-clé « rollback à l'étape X » entre nous si besoin. Aucun rollback appliqué sans confirmation explicite.

*Chantiers en sommeil* : **7.2a-code.3 C.2 / C.3** (porte niveau — étapes cadre et résultats), la dette **`tests-porte-niveau.html`** à refondre sur le patron générateur Node, **chantier 10** (gelé), **chantier 12** (Transparence cotations → Lexique), **chantier 13** (outil de diagnostic de maturité), **chantier 15** (Accompagnement post-choix, ouvert 24/04/2026), **chantier 16** (Garde-fous doctrinaux — grille permanente, ouvert 24/04/2026).

### Historique — chantier 7.6 (réf. ci-dessous)

Chantier **7.6 livré** le 20/04/2026 (socle technique + 4 fiches de démonstration). Les noms de métriques cités dans les encarts *Alternative recommandée* et *Point de vigilance* sont cliquables : clic simple = ouverture dans le tiroir latéral, Cmd/Ctrl+clic = nouvel onglet (web-native). Deep linking activé via `CM.Hash` (port hexagonal). Commits socle : `3afe40e` (code + module) et `1d77ab4` (CSS + enrichissements éditoriaux).

Généralisation à l'ensemble du référentiel **achevée** le 21/04/2026. Les quatre lots sont livrés : **Lot A** (`422b0a3`), **Lot B** (`9846600`), **Lot C** (`31019e3`), **Lot D** (`fc17a60`). Total : 33 liens posés sur 25 champs éditoriaux, couvrant les axes Flux/DORA/livraison, Customer/Commerce, Support client/Qualité, Sécurité/Incident. Chantier 7.6 clos.

**Sécurité posée** (3 règles non-négociables documentées en tête du module `CM.Hash`) : regex stricte sur l'id, aucun réinjection dans le DOM, `rel="noopener noreferrer"` sur tout `target="_blank"` futur.

**Instruction à porter dans 7.2 quand il sera ouvert** (validée le 20/04/2026) : le futur `CM.Stepper` générique devra accepter **un nombre variable d'étapes** (tableau ordonné). But : pouvoir activer plus tard 7.3 (type de décision en 4e étape) ou 7.4 (disponibilité des données en 5e étape) sans réécrire le stepper, seulement en ajoutant une entrée dans la liste. Consigné dans la colonne *Évolution* du 7.2 et dans ses points d'ancrage code.

### Généralisation 7.6 — progression par lots éditoriaux

La généralisation de 7.6 (liens cliquables sur toutes les fiches) est découpée en lots thématiques de manière à préserver le contrôle éditorial à chaque palier. Inventaire initial : 20 paires (fiche, champ) × ~31 liens candidats, regroupés en 4 lots.

| Lot | Axe | Liens posés | État | Commit |
|---|---|---|---|---|
| A | Flux / DORA / livraison (cohérences internes o/x/p/t) | 17 liens sur 9 champs de 6 fiches | ✅ 21/04/2026 | `422b0a3` |
| B | Customer / Commerce (af-* entre elles) | 9 liens sur 9 champs de 6 fiches | ✅ 21/04/2026 | `9846600` |
| C | Support client / Qualité | 4 liens sur 4 champs de 3 fiches | ✅ 21/04/2026 | `31019e3` |
| D | Sécurité / Incident (arbitrage `s9.alt → MTTR` tranché vers ti-s2) | 3 liens sur 3 champs de 3 fiches | ✅ 21/04/2026 | `fc17a60` |

**Lot A livré** : 9 champs enrichis sur x1, x2, x3, p5, p7, t4 ; 17 liens vers o3, o4, o5, o6, o7, o8, o9, p4, p5, p6, s4. Une reformulation éditoriale ciblée sur `p5.alt` pour lever l'ambiguïté *OKR stratégique vs OKR d'équipe* — désormais les deux cibles sont nommées et liées, ce qui ferme l'anti-pattern du programme qui s'invente un OKR local déconnecté.

**Lot B livré** (21/04/2026, commit `9846600`) : 9 champs enrichis sur af-m1, af-m3, af-sc2, af-sc3, af-sc4, af-sc5 ; 9 liens vers af-c2 (×2), af-c3, af-sc1 (×3), af-sc3 (×2), af-sc4. Aucune reformulation éditoriale. **Deux patrons nouveaux actés avec Lætitia** : (a) extension aux champs `exemple_eq` / `exemple_ent` (pas uniquement `alt` / `risque`), (b) cibles non-révisées au standard 2026-04 autorisées — 7.6 ne contraint que la cohérence de la source. **Imbrication term-def** (3 liens af-sc5 vers af-sc3 / af-sc4) : `<a>` placé autour du `<span class="term-def">`, le clic ouvre la fiche, le survol garde le tooltip — à vérifier à l'œil lors du prochain audit visuel. **Arbitrages refusés** : `af-c2.alt → af-c1` (texte « par étape » vs fiche globale, lien fictif dans l'esprit Lot A `t4.alt → x1`) ; `af-m3.alt → af-c3` (même logique « LTV par canal » vs LTV globale).

**Lot C livré** (21/04/2026, commit `31019e3`) : 4 champs enrichis sur 3 fiches (`ti-o2`, `ti-o4`, `o4`) ; 4 liens vers af-sc1, af-sc4, o4, ti-o4. **Deux croisements TI ↔ Affaires** (`ti-o2.exemple_eq → af-sc4` sur « FCR », `ti-o2.risque → af-sc1` sur « satisfaction ») et **deux cohérences internes TI** (`ti-o4.exemple_eq → o4` sur « rapidite », `o4.risque → ti-o4` sur « analyse post-incident »). **Ajustement éditorial vs backlog** : le backlog annonçait `ti-o2.risque ↔ af-sc4`, mais la lecture fine a montré que le mot-cible dans `ti-o2.risque` est « satisfaction » (= af-sc1) ; le lien vers af-sc4 a été reporté dans `ti-o2.exemple_eq` sur le mot « FCR », qui matérialise plus clairement le croisement TI ↔ Affaires sur la même métrique. Même logique de reformulation contextuelle que Lot A (`p5.alt`). Pas de reformulation éditoriale, pas d'imbrication term-def à gérer sur ce lot.

**Lot D livré** (21/04/2026, commit `fc17a60`) : 3 champs enrichis sur 3 fiches (`s9`, `ti-s2`, `ti-s5`) ; 3 liens vers ti-s2, ti-o4, s9. **Arbitrage MTTR tranché** — `s9.alt → ti-s2` (MTTR Sécurité), pas `o4` (MTTR DORA générique). Le texte de s9 dit littéralement *« MTTR sécurité »* (mot-clé collé au domaine), la fiche spécialisée l'emporte. **Règle doctrinale consolidée** — *quand deux MTTR (ou deux FCR, ou deux métriques du même nom) coexistent, le lien va vers le plus spécifique du domaine* ; même logique que le Lot C pour les deux FCR. **Trois niveaux hiérarchiques croisés** : stratégique → opérationnel (`s9.alt → ti-s2`), opérationnel → opérationnel (`ti-s2.risque → ti-o4` sur « cause profonde », qui boucle avec le Lot C `o4 ↔ ti-o4`), opérationnel → stratégique (`ti-s5.risque → s9` sur « efficacité réelle de la sécurité » qui ferme l'anti-pattern Goodhart *cocher la conformité et se croire sûr*). **Ajustement vs backlog** : ~2 candidats annoncés, 3 liens posés — le lien `ti-s5.risque → s9` s'est imposé à la lecture comme leçon pédagogique trop forte pour être ratée. Panel mobilisé pour l'arbitrage : NIST SP 800-61 (Incident Response), ITIL Security Management, DORA/Forsgren, Taleb (garde-fou cygne noir cyber).

### Chantier 7.6 clos — bilan

Sur les quatre lots, 33 liens ont été posés sur 25 champs éditoriaux de 18 fiches, couvrant les quatre grands axes fonctionnels (Flux/DORA/livraison, Customer/Commerce, Support client/Qualité, Sécurité/Incident). Trois patrons doctrinaux ont émergé au fil des lots et forment désormais la grammaire interne de 7.6 : (a) *extension aux champs `exemple_eq`/`exemple_ent`* (acté Lot B), (b) *cibles non-révisées autorisées* — 7.6 ne contraint que la cohérence de la fiche source (acté Lot B), (c) *règle de spécificité* — quand deux métriques du même nom coexistent (FCR, MTTR…), le lien va vers la plus spécifique du domaine (acté Lots C et D). **Imbrication term-def** vérifiée en Lot B (af-sc5 vers af-sc3/af-sc4), pas rencontrée aux Lots C et D. **Audit visuel à conduire** lors du prochain passage terrain : lire toute fiche enrichie dans le tiroir latéral, cliquer chaque lien, vérifier que le survol des term-def imbriqués continue de déclencher le tooltip.

### Prochaine session — ordre à trancher

1. **7.2a-code.3 — Nouvelle porte niveau (`CM.VuePorteNiveau`)** (🟡). **Prérequis 7.2a-code.1 (`CM.Roles`) et 7.2a-code.2 (`CM.Stepper`) satisfaits.** Construction d'une porte qui rejoint le parcours guidé *niveau → problème → cadre → résultats*. Étape 1 en accordéon à 4 cartouches (double-libellé N1 `Opérationnel / Tactique / Portefeuille / Exécutif`), étape 2 rôle, étape 3 résultats. Taxonomie et rédactionnel propres à la porte, stepper et données rôles inchangés. Contrat d'API à respecter : `doc-contrats-stepper-roles.md`.
2. **AUDIT-F-1 — Conseil pédagogique dans la porte cadre** (🟡). Micro-fix opportuniste ressorti de l'audit du 21/04/2026. Session courte, effet éditorial direct. Intermède possible avant 7.2a-code.3, ou en parallèle.
3. **6.7b — Enrichissement `familleInformelle`** (🟢). À activer si l'usage terrain confirme qu'on s'ampute de bonnes suggestions en excluant `generique` du calcul de voisinage.
4. **6.7c — Cas particulier `generique`, bloc dédié** (🟡). Inversion éditoriale : *« Ces cadres spécifiques éclairent les mêmes indicateurs »*. Petit chantier cohérent à empiler sur 6.7a.
5. **7.7 — Persistance et partage des parcours** (🟢). Nouvel item ouvert lors de l'audit du 21/04/2026.
6. **Audit visuel 7.6** (🟢). Session courte de relecture terrain : ouvrir chaque fiche enrichie dans le tiroir, cliquer chaque lien, valider l'imbrication term-def.

### Pistes alternatives

- **Piste B — Greffe architecturale** (🟡) : migrer `NIVEAU_VERS_POSITION` et `FIABILITE_VERS_NIVEAU` vers `CM.Config` (Règle 2). Session courte, ~45 min.
- **Piste C — Scission `lean` en `lean` + `six-sigma`** (🟢) : chantier reporté lors de 6.7 ; demande une revue des `META.cadres` sur une trentaine de fiches.
- **Piste E — Revue métier d'un axe non audité** (🟢). Fiches Qualité, Humain, Risque, Sécurité, Données, Produit jamais systématiquement passées au standard 2026-04.

---

## 20. Catalogue de questions fines — chantier éditorial *(▶ ACTIF depuis le 05/05/2026)*

**Origine.** Mode *Par ma question* prévu dès la bifurcation du 23/04/2026 (`project_deux_modes_entree.md`). Catalogue à construire par panels d'experts nommés. Préalable à D3 du chantier 10 (exposition du mode fin).

**Mission.** Servir le visiteur qui arrive avec un problème concret en tête, formulé dans la langue de son métier. Le catalogue propose 8 à 12 questions courantes (au MVP), formulées telles qu'elles se posent à voix haute, qui conduisent en 2 à 4 clics à 3 indicateurs candidats avec leur intention d'usage. Doctrine et format : `doc-catalogue-questions-fines.md`.

**Décisions structurantes tranchées le 05/05/2026 (séance journée).**

- **Aucun nommage de persona à l'entrée** — la question elle-même reconnaît qui parle, sans typage.
- **Mécanisme de reformulation : double réponse** — pour les questions à terme-piège (vélocité, ROI, NPS, story points), juxtaposition de deux colonnes côte à côte avec mots-clés et indicateurs visibles. Décision contre-intuitive (j'avais arbitré pour la redirection douce) : la pédagogie par juxtaposition rend la décision plus rapide à prendre, pas plus longue (cf. mémoire `feedback_pedagogie_par_juxtaposition`).
- **Format normalisé en 2 variantes** — *standard* (questionnaire court autonome de 2 questions de cadrage en mode diagnostic, pas solution) ou *à reformulation* (double réponse + raccourci vers porte préconfigurée).
- **Posture éditoriale** — voix directe et bienveillante (libellés courts 3-6 mots), bilingue sur une ligne pour les indicateurs (*Délai bout à bout / Lead time*), bloc *Recommandation* positif (solution d'abord, anti-pattern ensuite), DMAIC (questions de cadrage en mode *Définir le problème*).
- **Écoles convoquées** — explicitées en pied de chaque fiche, comme référence patrimoniale (jamais comme choix à faire).

**Décisions structurantes tranchées le 05/05/2026 (séance soir — rédaction de la première fiche-question).**

- **Règle stricte des 3 cards confirmée + lien sortant patrimonial unique** — jamais 4 cards. Le visiteur qui veut élargir passe par un lien sortant unique vers une fiche cadre du référentiel (ex : *Voir tous les indicateurs canoniques de l'amélioration continue par école*). Seule porte d'extension acceptée au MVP. Discipline *« proposer, pas étaler »* du chantier 16 ainsi tenue.
- **Mécanisme cards à fiche absente — option mixte** — si une fiche métrique cible n'existe pas, la card reste active sur son nom et son intention d'usage (le concept est nommé), mais le lien *Voir la fiche* est désactivé avec le libellé honnête *« Fiche en cours de constitution »*. La dette est rendue visible sans frustrer le visiteur.
- **Doctrine du trio par niveau** *(§ 4.4 du doc compagnon)* — la conditionnalité Q1 change l'**ordre** des cards (selon le symptôme), Q2 change le **trio lui-même** (selon l'échelle). Justification : le pilier *Respect for People* du TPS s'exprime différemment selon le niveau (routine kata en équipe, alignement parties prenantes en programme, confiance et culture en stratégique). Un trio uniforme à tous niveaux masque cette gradation et reflète la lecture *flux-DORA* réductrice.
- **Cross-link entre fiches-questions** — 0 ou 1 lien italique discret sous le bloc *Recommandation*, vers une fiche-question liée. Sera activé quand une seconde fiche-question liée sera rédigée.

**Mockups produits le 05/05/2026.**

- `mockup-reformulation-catalogue.html` — comparaison des 3 traitements (redirection douce / double réponse / miroir socratique) puis des 2 finalistes (a vs b). Décision : (b) double réponse retenue.
- `mockup-format-fiche-question.html` — format normalisé en 2 variantes (standard + reformulation). v3 livrée avec voix resserrée, palette à 3 plans, bilingue sur une ligne, bloc *Recommandation* positif.

**Décisions ouvertes** *(à reprendre dans les séances suivantes)*.

| # | Décision | Statut |
|---|---|---|
| 20.1 | **Palette définitive du format-fiche-question** | ✅ close 06/05/2026 — palette **B (vert profond éprouvé `#1f5945`)** retenue ; **D (bleu de Prusse `#1d3a5f`)** en réserve documentée ; cuivre écarté. Commits `72a7451` (cadre-visuel § 6.5), `f4f7dac` (catalogue § 4.5), `26f5ccc` (mockup format v4), `63b62f1` (mockup comparatif — trace d'arbitrage) |
| 20.2 | **Liste exhaustive des termes-pièges** | ⏸ 4 identifiés (vélocité, ROI, NPS, story points) ; à étoffer par les panels |
| 20.3 | **Volumétrie finale par panel** | ⏸ fourchettes posées dans le doc compagnon ; à confirmer à la rédaction |
| 20.4 | **Seuil de bascule responsive de la double réponse** | ⏸ couplée à D4 du chantier 10 |
| 20.5 | **Rédaction des 8 à 12 questions MVP** | ✅ **MVP CLOS à 6/8-12 fiches** le 07/05/2026 (séance nuit) — option A retenue : sous-cible doctrinale assumée plutôt que forcer un panel sans manque utilisateur nommé. Fiches livrées : (1) *Par où démarrer une démarche d'amélioration continue ?* (Coach Lean) ; (2) *Mes indicateurs reflètent-ils la réalité du terrain ?* (Drucker méta, § 4.6) ; (3) *Comment mesurer l'occupation hebdomadaire de mon équipe ?* (Coach Agile, § 4.3) ; (4) reprise autonome de (1) ; (5) *Pourquoi ma transformation résiste ?* (Gestion du changement) ; (6) *Comment cascader des objectifs jusqu'au terrain ?* (Coach exécutif Drucker MBO). Panels couverts : Coach Lean, Drucker méta, Coach Agile reformulation, Gestion du changement, Coach exécutif Drucker MBO. **Panel non couvert** : *Terrain des autres cadres* (DORA/SPACE, BSC, OKR Doerr, ITIL/ITSM, EFQM) — assumé, place gardée pour un manque utilisateur futur. Arbitrage tracé dans le bloc État courant. |
| 20.6 | **Trio alternatif (v2 du catalogue)** | ⏸ ouverte — décision MVP : un seul trio orthodoxe par croisement Q1×Q2. v2 envisage un *trio alternatif* étiqueté par sa posture (angle KBI/comportement, angle TOC/contrainte) en complément. À tester sur 1-2 questions avant de généraliser, après les premières fiches livrées |
| 20.7 | **Fiche-question méta — *Mes indicateurs reflètent-ils la réalité du terrain ?*** | ✅ close 07/05/2026 — fiche rédigée éditorialement et mockup livré (`mockup-fiche-question-pasteque.html`, commit `f5fb2df`). Variante méta inaugurée — doctrine § 4.6 du doc-catalogue *Trio à 3 axes invariants* (mécanique-sœur de § 4.4). Q1 = signal d'alerte (4 options) → ordre des cards ; Q2 = niveau (3 options) → contenu des cards. Matrice 9 cards (3 axes invariants × 3 niveaux), 7 cibles existantes (`s4` / `lss-1` / `p9` / `s11` / `x4` / `p4` / `s12`), 2 fiches en cours de constitution (déclaratifs équipe + programme — dette éloquente). Panel : Drucker / Toyota Way / Edmondson / DORA-SPACE. Cross-link réciproque activé avec 20.8 |
| 20.8 | **Mécanisme de cross-link entre fiches-questions** | ✅ close 07/05/2026 — les deux fiches-questions liées se citent réciproquement. Pasteque → amélioration continue (commit `f5fb2df`) ; amélioration continue → pasteque (commit `b2798cf`). Format technique acté : `<div class="cross-link">Question liée — <a href="#question=...">…</a></div>`, italique discret sous Recommandation |

**Dette de référentiel identifiée le 05/05/2026 (séance soir).** Quatre fiches métriques manquantes pour servir le trio par niveau de la première fiche-question. Inscrites en dette à créer.

**Nouvelle dette de référentiel détectée le 07/05/2026 (sur fiche pastèque 20.7).** Les axes *Déclaratif* aux niveaux équipe et programme n'ont pas de fiche cible dans le référentiel — option mixte appliquée (concept nommé, lien désactivé). La dette est rendue **pédagogiquement éloquente** dans la fiche pastèque elle-même : le référentiel n'a pas encore d'instrument frontal pour l'auto-déclaration locale, qui est pourtant le terrain où la pastèque pousse. Inscrites en dette à créer.

| Fiche manquante | Niveau | Origine | Priorité |
|---|---|---|---|
| **« Done » auto-déclaré en sprint review** × équipe | operationnel | Fiche-question pastèque (20.7) — axe Déclaratif × équipe | Moyenne (couvre l'axe Déclaratif équipe ; concept Edmondson/Argyris) |
| **RAG status programme déclaré par le PM** × programme | programme | Fiche-question pastèque (20.7) — axe Déclaratif × programme | Moyenne (couvre l'axe Déclaratif programme ; signal *passages directs Vert → Rouge*) |
| **Fiche cadre — triangulation déclaratif / objectif / humain** | transversal | Fiche-question pastèque (20.7) — lien sortant patrimonial | Moyenne (lien sortant patrimonial actuellement vide ; à constituer pour fermer le bouclage MVP) |


| Fiche manquante | Niveau | Origine | Priorité |
|---|---|---|---|
| **First-pass yield / Premier passage conforme** × équipe | operationnel | *Par où démarrer une démarche d'amélioration continue ?* — trio équipe pilote | Haute (couverture du trio orthodoxe niveau équipe) |
| **Lead time × programme** | programme | *Par où démarrer une démarche d'amélioration continue ?* — trio programme entier | Haute (substitution provisoire possible avec t2 *Délai de commercialisation* tactique) |
| **Coût de la non-qualité — COPQ** × stratégique | strategique | *Par où démarrer une démarche d'amélioration continue ?* — trio toute l'organisation | Haute (capte la dimension impact économique du trio stratégique) |
| ~~**Écart de vérité (déclaratif vs objectif)** × stratégique~~ | ~~strategique~~ | ~~Fiche-question méta *Mes indicateurs reflètent-ils la réalité du terrain ?* (20.7)~~ | ✅ livrée le 06/05/2026 (commit `2afa2ac`) → fiche `s12` ; consommée par la fiche pastèque (20.7) le 07/05/2026 |

**Première fiche-question rédigée éditorialement le 05/05/2026 (séance soir).** *« Par où démarrer une démarche d'amélioration continue ? »* — panel Coach Lean (Toyota Way, Lean Six Sigma, Théorie des contraintes, Kata coaching). Variante standard. Q1 (5 options : *délais imprévisibles · défauts qui se répètent · charge qui dérape · manque de visibilité · étape goulot connue*) pilote l'ordre des cards. Q2 (3 options : *équipe pilote · programme entier · toute l'organisation*) pilote le trio par niveau. 9 intentions d'usage rédigées (3 trios × 3 cards). 3 variantes du bloc *Recommandation* rédigées. Pied écoles, bandeau d'attente, lien sortant patrimonial vers la fiche cadre Lean. **Mise en mockup à venir** — couleurs en attente de la clôture de 20.1.

**Articulations.** Préalable à D3 du chantier 10 (exposition du mode fin). Couplé à D4 (responsive de la double réponse). Articulé avec chantier 16 (discipline éditoriale — 8-12 questions max au MVP) et chantier 19 (posture visuelle — incarne les 8 axes).

**Prochaine action recommandée.** La première fiche-question est rédigée éditorialement (20.5 partiellement entamée). Trois pistes possibles pour la suite : (a) **clore la palette 20.1** en séance dédiée, préalable à la mise en mockup des fiches rédigées ; (b) **rédiger une seconde fiche-question candidate** d'un autre panel pour valider la portabilité de la doctrine du trio par niveau (ex : *Comment arbitrer entre les initiatives qui se présentent ?*, panel Terrain des autres cadres) ; (c) **créer les 4 fiches métriques manquantes** du référentiel pour rendre la première fiche-question entièrement vivante. Choix à arbitrer en ouverture de la prochaine séance.


## 21. Vue *Lexique* — chantier à ouvrir *(📋 ouverte le 08/05/2026)*

**Origine.** Le 08/05/2026, lors de l'activation des stubs *Cascade stratégique* et *Maturité* dans le bandeau du haut, Lætitia demande la même chose pour *Lexique*. Constat code : aucune `vue-lexique` ni `_rendreLexique()` n'existe — c'est un stub orphelin partout (6 occurrences dans les bandeaux). Décision Lætitia : option (A) — laisser le stub jusqu'à un chantier dédié, plutôt qu'improviser une vue minimaliste.

**Pourquoi un chantier dédié.** Un lexique digne de ce nom mérite plus qu'une liste alphabétique improvisée :
- **Source des termes** : extraire automatiquement les `<span class="term-def">` du fichier ? composer un référentiel séparé ? les deux ?
- **Définitions** : les définitions actuelles vivent en attribut `data-def` des term-def ; sont-elles toutes rédigées avec la même rigueur ? un audit éditorial préalable s'impose.
- **Recherche** : champ de recherche en tête, ancres de retour vers les fiches du référentiel qui mentionnent le terme.
- **Doctrine visuelle** : posture du § 6 du cadre visuel à incarner sur cette page-type non encore couverte (« étape B³ — incarnation du lexique »).
- **Connexion à la voie hybride** : la page sera-t-elle pure matière en blanc franc, ou aura-t-elle un cadre blanc intermédiaire comme la vue *Par ma question* ?

**Stub conservé en attendant.** L'entrée *Lexique* du bandeau reste en stub (opacité 0.45, cursor default, click sans effet) — non joignable.

**Articulations.** Articulé avec chantier 19 (cadre visuel — étape B³ à ouvrir), chantier 1.bis (audit acronymes), et la doctrine `feedback_audit_acronymes_methode`. Pas de dépendance bloquante en amont, peut s'ouvrir dès qu'une séance s'y prête.

**Prochaine action recommandée.** Aucune dans l'immédiat — le chantier reste en backlog tant que la priorité va aux remédiations de la voie hybride et au catalogue de questions fines (chantier 20).


## 22. Harmonisation au tutoiement de l'ensemble de l'outil *(✅ livré le 09/05/2026)*

**Origine.** Le 08/05/2026, Lætitia signale que la navigation et les textes de l'outil interpellent l'utilisateur de manières incohérentes : tutoiement par endroits, vouvoiement à d'autres, formulations impersonnelles ailleurs. Décision : **harmoniser sur le tutoiement** pour incarner la posture d'un *outil d'apprentissage* — proximité avec l'utilisateur, ton de coach, posture de compagnon plutôt que de service institutionnel.

**Doctrine.** Le tutoiement est cohérent avec la posture *artisanal sous discipline institutionnelle* du cadre visuel § 5.2 (la voix qui cherche, qui invite à la manipulation directe, à la Tufte/Bret Victor). Le vouvoiement crée une distance institutionnelle qui contredit cette posture.

**Périmètre.**
- **Textes éditoriaux** : intros de portes (« Choisissez la cartouche... » → « Choisis... »), questionnaires, encarts pédagogiques, messages d'état (« Votre tableau de bord... » → « Ton tableau de bord... » — déjà fait sur le bandeau vide ce soir).
- **Boutons et libellés** : les actions formulées à l'impératif vouvoyé (« Réinitialisez ») passent au tutoiement (« Réinitialise »). Les libellés courts (« Réinitialiser », « Imprimer ») ne sont pas concernés (forme infinitive neutre).
- **Hover, alt, aria-label** : tous les attributs textuels qui s'adressent à l'utilisateur.
- **Modale À propos, lexique futur, écrans d'erreur** : tous concernés.

**Hors périmètre.**
- **Citations patrimoniales** (Drucker, Goldratt, Vacanti, Tufte) — voix d'auteur préservée telle quelle.
- **Définitions** (`term-def`) — voix encyclopédique impersonnelle préservée.
- **Métadonnées techniques** (commentaires de code, doctrine de doc) — sans interpellation utilisateur.

**Méthode.**
- Audit grep sur les pronoms `vous`, `votre`, `vos` dans `cadre-indicateurs.html` et les mockups `mockup-*.html`.
- Audit grep sur les verbes à la 2e personne du pluriel impératif (`-ez`) qui ciblent l'utilisateur.
- Refonte par grappes thématiques (porte par porte, modale par modale) — pas un seul commit massif.
- Vérification cas par cas : certains textes peuvent être reformulés en impersonnel quand le tutoiement crée une lourdeur (« il suffit de cliquer sur... »).

**Articulations.** Articulé avec chantier 19 (cadre visuel — la voix située de l'axe 8 § 5.8). À conduire de manière progressive, opportunistement sur chaque page touchée par d'autres chantiers (boy scout). Pas de dépendance bloquante en amont.

**Première amorce.** Tableau de bord vide + message d'impression vide (commit 4b40682 du 08/05/2026) — exemple de ce qui doit suivre dans toutes les autres zones.

**Bilan de clôture (09/05/2026).** Chantier livré en 4 commits atomiques : **26a27b6** (grappe A : 4 postures par rôle de la porte niveau, 6 remplacements), **230db2a** (grappe B : conseil pédagogique des listes filtrées, 5 remplacements sur la chaîne `MESSAGES.conseilPedagogique`), **aa8d9d5** (grappe C : 2 messages d'action — confirmation `reinitialiserPanier` + suggestion `validerNomDeClause`), **ff83d5c** (grappe D : 8 mockups doctrinaux, 29 remplacements). Total : **42 corrections** sur 9 fichiers, dans le respect des espaces insécables U+00A0 (typographie française) et de la règle hors-périmètre (citations patrimoniales et `term-def` préservés). Les ~15 occurrences `vous`/`votre`/`vos` dans les `risque:` des fiches d'indicateurs ont été confirmées hors périmètre (citations d'usages pervers entre guillemets, voix encyclopédique). **Spin-off.** Chantier 25 ouvert (« Audit des zones inactives ») suite au repérage de `_rendreQuestionnaire()` (VUE 3) encore appelée mais inaccessible depuis le bandeau actuel. Le tutoiement n'a pas été appliqué à cette zone : si confirmée orpheline en 25, elle sera retirée avec son bloc.

## 23. Refonte radicale de l'accueil — page unifiée *Choisir mes indicateurs* *(📋 ouverte le 08/05/2026 nuit)*

**Origine.** Séance du 08/05/2026 nuit. Lætitia rouvre la question des « 4 axes » disparus du bandeau, puis pose ses irritants utilisateurs : effet tunnel des portes, redondance entre portes, aversion pour les chemins obscurs. Conclusion stratégique : *« je cherche à simplifier l'outil et ne pas générer des chemins cachés. La page d'accueil devient de plus en plus centrale. »* Sept itérations de mockup-preview convergent vers une **page unifiée *Choisir mes indicateurs* qui remplace l'accueil 5 portes** et absorbe la fonction des 3 vues détail (problème, cadre, niveau). Forme stable validée : v7 (commit `8589834`), mockup `mockup-accueil-unifie-chips.html`.

**Doctrine actée** *(consignée dans la mémoire `project_accueil_unifie_v7.md`)*.

- **L'accueil est l'outil.** Aucune nouvelle vue ne s'ouvre depuis l'accueil — tout se joue dans la même page.
- **Architecture verticale** (de haut en bas) : bandeau (8 entrées, inchangé) ; en-tête centré *Page unifiée · Choisir mes indicateurs · Quatre lentilles à combiner* ; cartouche compagnon *5 questions terrain ▾* (en haut, parce que la matière courte reste visible quand l'autre se déploie) ; marqueur *« — ou — »* ; bloc des 4 chips *Problème · Cadre · Niveau · Maturité* ; cartouche compteur *N sur 75 indicateurs ▾* ; liste filtrée en grille 2 colonnes.
- **Mécanique des chips** : accordéon en place, mono-sélection (Niveau, Maturité, marqueurs ronds) ou multi-sélection (Problème, Cadre, marqueurs carrés). À la sélection, la chip se referme en mode actif (`✓ Niveau · Programme`). Recliquer = rouvrir.
- **Cartouches cliquables** : repliés à l'arrivée, compteur live, chevron `▾`/`▴`, libellé d'action *Voir / Masquer*. Pas de limite haute sur le nombre de chips actives.
- **Format de fiche-card UNIQUE** identique sur l'accueil et sur le reste du site (`htmlCarte()` ligne 7412). Boutons panier ✓ / 💡 disponibles dès l'accueil — c'est ce qui rend l'accueil-outil opérationnel.
- **Mintzberg sort du visible** (chip *Angle* écartée, pastilles écartées, légende écartée). Sa critique : recouvrement avec les chips, naming forcé, hors langage utilisateur. L'attribut `axes:[...]` reste latent dans le code — voir constat collatéral n°1.

**Sous-chantiers** *(ordonnés, à exécuter dans cet ordre)*.

| Étape | Mandat | État | Note |
|---|---|---|---|
| 23.a | Consigne en doctrine — `doc-cadre-visuel.md` § accueil unifié + `doc-contrats-navigation.md` § fin des 3 portes + suppression de la pyramide | ✅ **clos le 08/05/2026** (7 commits `f5d5b66` → `e500d3f`) | 7 commits atomiques. Voir détail au § État courant. |
| 23.b | Page unifiée — structure HTML + en-tête + cartouche *Par ma question* + 4 chips + cartouche compteur, sans encore brancher la mécanique | ✅ **clos le 08/05/2026 (séance jour)** | Squelette statique livré. |
| 23.c | Mécanique chips — accordéon en place, sélecteurs mono/multi par axe | ✅ **clos le 08/05/2026 (séance jour)** | S'appuie sur le traducteur orthodoxe du chantier 14. |
| 23.d | Cartouches cliquables — repliable/dépliable, compteur live | ✅ **clos le 08/05/2026 (séance soir)** (7 commits `5ebb0d7` → `696e589`) | Sous-chantiers 23.d-0 à 23.d-3 + fix1 largeur stable. État persisté en localStorage. |
| 23.e | Liste filtrée en grille 2 colonnes — réutilisation directe de `htmlCarte()` | ✅ **clos le 08/05/2026 (séance nuit)** (7 commits `03eae05` → `127f592`) | Feature + 6 fixes UX issus du test interactif. Friction 7 (garde-fou beforeunload) et mission de l'en-tête reportées en commits dédiés. |
| 23.f | Suppression du code orphelin — `vue-porte-probleme`, `vue-porte-cadre`, `vue-porte-niveau`, pyramide, orchestrateur stepper du chantier 14 | 🔴 à faire | Le **traducteur orthodoxe reste** (c'est lui qui formule le filtre). Doctrine `project_doctrine_traducteur_orthodoxe.md` préservée. |
| 23.g | Tests E2E + sentinelles + scénario de non-régression | 🔴 à faire | Vérifier qu'aucun lien externe au projet ne pointait vers les vues supprimées. |

**Estimation très grossière** : 15-25 h sur 4-6 séances.

**Mockup de référence** : `mockup-accueil-unifie-chips.html` v7 (commit `8589834`). 3 panneaux côte à côte (initial / chip ouverte / 2 chips actives + liste filtrée 2 colonnes).

**Constat collatéral n°1** *(remonté à la séance du 08/05/2026 nuit)*. L'attribut `axes: [...]` (Mintzberg : projet / stratégique / humaine / méthodologique) reste dans le code des 75 fiches mais n'est plus utilisé visuellement après cette refonte. Statut à arbitrer dans un chantier séparé : **(a)** retrait pur (nettoyage du référentiel) ; **(b)** conservation latente (au cas où une fonction future le réactiverait) ; **(c)** réintroduction sous une autre forme (page *Lecture Mintzberg* dédiée, accessible depuis le bandeau). Pas urgent — ne bloque pas le chantier 23. À ouvrir ultérieurement.

**Constat collatéral n°2** *(remonté à la séance du 08/05/2026 jour, lors du débogage 23.c)*. Le vocabulaire de l'accueil unifié comporte des termes techniques d'experts qui contredisent l'ambition novice de la page. Lætitia signale en particulier que *« Flux »* est du lexique Lean (Toyota Production System, Goldratt, Reinertsen) et que sa présence dans la chip *Problème* oriente déjà l'utilisateur sans qu'il le sache. Suspectés à auditer également : *« Alignement stratégique »* (technique gestion), *« Maturité »* (jargon RH), *« Cadre »* (jargon méthodologique). Lætitia réfléchit aussi à un 8e axe *Dépendances* (relations entre équipes / tâches) qui couvre une part de ce que *Flux* couvre aujourd'hui mais sous un angle plus universel. Décision 08/05/2026 : **on laisse tel quel pour l'instant** — pas un bloquant pour le MVP global v1. À reprendre plus tard, soit dans un chantier 25 *« relibellage problèmes en langage utilisateur »* (renomme la présentation sans toucher au tag interne), soit dans un chantier *« audit vocabulaire de l'accueil »* plus large. Pas urgent.

**Décisions enchaînées** *(historique des 7 itérations de mockup pour traçabilité)*.

- v1 (2c56921) — mécanique chips en 3 états (initial / Niveau ouverte / 2 actives).
- v2 (626e00e) — cartouche compteur cliquable (replié par défaut, chevron ▾/▴, libellé d'action).
- v3 (3ec7826) — suppression des toggles *Par une porte / En croisant les axes / + futur mode* (redondants), ajout du cartouche *Par ma question* sur l'accueil (anti-chemin obscur).
- v4 (8947260) — inversion des blocs (cartouche question au-dessus des chips), ajout d'une 5e chip *Angle* (Mintzberg variante α).
- v5 (7032aae) — sortie de la chip *Angle* après esprit critique, Mintzberg conservé en pastille sur fiche.
- v6 (e2079e3) — fiche-card riche fidèle à `htmlCarte()` (bordure fiabilité, type, badge, pitch, fréquence, maturité, chip cadre, panier).
- v7 (8589834) — retrait complet de Mintzberg + grille 2 colonnes pour la liste filtrée.

**Doctrines amendées par cette refonte.**
- `feedback_taxonomie_par_porte.md` — hérité du modèle 4 portes ; à amender pour acter que la taxonomie ne dépend plus de la porte mais de l'axe (chip).
- `project_contrat_coherence_portes.md` — devient sans objet une fois les 3 portes supprimées.
- `project_pyramide_en_sursis.md` — la pyramide disparaît effectivement.
- `project_porte_niveau_*.md` (statut, rôles, doctrine éditoriale, arbitrages, rendu visuel) — la porte niveau disparaît, le chantier 7.2 conservé pour son investissement éditorial qui peut nourrir la chip *Niveau* ou la page *Cascade*.
- `project_chantier_14_ouverture.md` — l'orchestrateur stepper meurt, le traducteur reste (cf. 23.f).

---

## 24. URLs partageables des filtres d'accueil *(📋 ouverte le 08/05/2026 lors du chantier 23.a)*

**Origine.** Au chantier 23.a, arbitrage entre trois portées du contrat `CM.AccueilUnifie` (modeste / équilibrée / exhaustive). La portée **exhaustive** ajoutait la persistance hash URL des filtres d'accueil — `outil.html#niveau=programme&cadre=dora` — qui apporte une **vraie valeur utilisateur** : URLs partageables (atelier, lien Slack), bouton *Précédent* du navigateur fonctionnel, bookmarks d'états de filtre, état restauré au F5. **Décision actée le 08/05/2026** : reporter au chantier 24 — la portée équilibrée du chantier 23 prépare le terrain (pub/sub `surChangementFiltre` en place) mais n'implémente pas le hash. Motif : tant qu'il n'y a pas d'usage de partage avéré, ne pas anticiper. Le chantier 24 s'ouvre le jour où un cas concret remontera (atelier qui en a besoin, lien envoyé à un collègue qui doit recliquer).

**Périmètre.**

- **Convention de hash** : `#niveau=programme&cadre=dora&probleme=flux,qualite&maturite=avance` (multi-sélection séparée par virgule sur Problème et Cadre, mono-sélection valeur unique sur Niveau et Maturité).
- **Sérialisation** : à chaque appel de `appliquerFiltre()`, mettre à jour l'URL en silencieux (sans déclencher `hashchange`).
- **Désérialisation** : au chargement, parser le hash et restaurer l'état des chips ; gérer les cas limites (cadre orthographié `dora` mais valeur réelle `DORA` dans le référentiel ; valeur inexistante ; mélange invalide) sans casser.
- **Compatibilité** : ne pas casser l'invariant strict `#fiche=<id>` (cf. doc-contrats-navigation § 7.1). Les deux types de hash doivent cohabiter — un lien `#fiche=t4&niveau=programme` ouvre la fiche t4 sur fond d'accueil filtré niveau Programme.
- **Précédent navigateur** : pousser un nouvel état dans l'historique à chaque changement de filtre (geste mesuré ; pas tous les micro-changements).
- **Reset** : un bouton *Réinitialiser* dans l'URL (`#reset`) ou un appel à `reinitialiserChips()` qui efface le hash.

**Effort estimé** : 4-6h sur 1-2 séances.

**Trigger d'ouverture** : remontée d'un cas concret de partage. Exemples : (i) Lætitia prépare un atelier *« indicateurs DORA pour équipe Programme »* et veut un lien à coller dans la slide ; (ii) un collègue demande *« quels indicateurs tu suggères pour ce contexte ? »* et Lætitia veut envoyer un lien ; (iii) une demande explicite d'un utilisateur tiers en atelier.

**Dépendance** : aucune. Le pub/sub posé en 23.a fournit le hook pour brancher la sérialisation. Le chantier 24 ne nécessite pas que les chantiers 23.b à 23.g soient terminés — il peut s'enchaîner après 23.c (mécanique chips fonctionnelle) à condition que 23.b et 23.c soient livrés.



## 25. Audit des zones inactives — code orphelin post-23.f *(📋 ouverte le 09/05/2026, repérée pendant le chantier 22)*

**Origine.** Pendant la cartographie du chantier 22 (harmonisation tutoiement), repérage de la fonction `_rendreQuestionnaire()` (VUE 3 du module questionnaire, ~80 lignes JS + ~30 lignes éditoriales lignes 8730-8820 + variable `QUESTIONS`) : encore appelée par `_rendreToutesLesVues()`, mais **pas reliée au bandeau de navigation actuel** (6 entrées : Accueil / Tableau de bord / Cascade / Maturité ? / Lexique / À propos). Donc rendue mais inatteignable depuis l'UI. Code orphelin probable, hérité de l'ancien outil pré-23.f.

**Doctrine.** Le chantier 23.f a déjà retiré 4 portes + pyramide + Stepper + DiagnosticCadre, soit ~2 934 lignes. Le présent chantier prolonge la même logique de nettoyage : **toute zone de code rendue mais inatteignable depuis le bandeau de nav actuel doit être identifiée, statuée, et retirée** si confirmée orpheline. Cohérent avec l'esprit Lean « pas de stock dormant », et avec l'engagement utilisateur du commit 127f592 (« Ne pas garder de code mort en attendant »).

**Périmètre.**
- **Audit systématique** : croiser tous les `_rendreXxx()` du code avec les `data-entree=` du bandeau de nav et les appels `CM.App.ouvrirVueDuBandeau(...)` pour identifier les zones rendues sans entrée d'accès.
- **Cas connu n°1** : `_rendreQuestionnaire()` (VUE 3) + variable `QUESTIONS` + CSS `.questionnaire-intro` / `.resultat-zone` / `.resultat-titre` (lignes 467-484). À retirer si confirmé orphelin.
- **Cas connu n°2** : `_rendreCascade()` et `_rendreMaturite()` sont eux dans le bandeau (entrées « Cascade » et « Maturité ? »), donc pas concernés. Bandeau actuel à valeur de référence pour l'audit.
- **CSS associé** : retirer également les sélecteurs CSS qui ne sont consommés que par les zones inactives (analogie avec le commit `35bbc61` qui a retiré `.porte-statut`).

**Hors périmètre.**
- Le **traducteur orthodoxe** (`CM.AccueilUnifie._traduirePourReferentiel()`, doctrine `project_doctrine_traducteur_orthodoxe.md`) reste, même si certains chemins d'appel ont disparu en 23.f.
- Les **fonctions utilitaires** (`_basculerVue()`, `_cacherAccueils()`, etc.) restent tant qu'elles servent au moins une vue active.

**Méthode.**
1. Inventaire grep : toutes les fonctions `_rendreXxx()` + tous les `data-entree=` du bandeau + tous les `ouvrirVueDuBandeau(`.
2. Croisement pour produire la liste des « rendues sans entrée ».
3. Pour chaque cas : confirmer l'orphelinat (grep récursif d'aucune référence externe), retirer en commit atomique avec message identifiant la zone (CSS + HTML + JS + référentiels associés).
4. Smoke test interactif post-retrait pour vérifier qu'aucune fonction encore vivante ne s'appuyait silencieusement sur la zone retirée.

**Articulations.** Indépendant des chantiers 21, 13.bis, 24. Peut être enchaîné juste après le chantier 22 (les zones tutoyées en 22 grappes A/B/C l'ont été *avant* statut d'orphelinat — si confirmées orphelines, elles seront retirées avec leurs frères, le travail tutoiement n'aura pas été perdu mais aura été protégé contre une future réactivation involontaire).

**Effort estimé** : 2-4 h sur 1 séance pour le cas connu n°1 + audit complet.

## 26. Intégration et activation niveau 3 des fiches-questions *(📋 ouverte le 16/05/2026)*

**Origine.** Les 5 fiches-questions terrain (pastèque, pilotage-hebdo, amelioration-continue, resistance-transformation, cascade-objectifs) existent à ce jour comme **mockups HTML autonomes** — chacun avec sa propre palette CSS recopiée à l'identique dans `:root`, sa propre structure, sa propre matière éditoriale. La doctrine *« autonome = source unique »* a été actée le 07/05/2026 pour la **phase éditoriale exploratoire** (mockups jetables si la mécanique ne marchait pas). Cette phase est close — les 5 grammaires sont stabilisées (§ 4.3 / § 4.4 / § 4.6).

**Mandat (16/05/2026).** Lætitia demande deux choses simultanément : (a) **harmoniser visuellement** les 5 fiches sur le cadre visuel global du site (`doc-cadre-visuel.md`), (b) **activer les boutons de choix au niveau 3** (activation complète) — chaque clic recompose le trio cartographique selon le croisement Q1×Q2 sélectionné, et tous les croisements sont rédigés (~60 trios cumulés sur les 5 fiches, total exact à inventorier au jalon A).

**Décision architecturale (16/05/2026).** Bascule des **mockups autonomes** vers une **architecture intégrée** : un module `CM.FicheQuestion` consomme un schéma de données et formule la vue, suivant le patron `CM.AccueilUnifie` / `CM.Referentiel` et la doctrine `project_doctrine_traducteur_orthodoxe.md`. Trois raisons : (1) la doctrine *« autonome = source unique »* avait sa raison d'être pour la phase éditoriale et perd sa pertinence au passage niveau 3 ; (2) l'harmonisation « sur le reste du site » est strictement infaisable de manière durable en mode autonome (la palette `:root` déjà recopiée 5 fois serait 5 fois à modifier à chaque évolution du cadre visuel) ; (3) le patron est éprouvé dans le projet (chantier 14, chantier 23).

**Périmètre.**
- **5 fiches** : pastèque (§ 4.6), pilotage-hebdo (§ 4.3), amelioration-continue (§ 4.4), resistance-transformation (§ 4.4), cascade-objectifs (§ 4.4).
- **~60 croisements à rédiger** au total — détail confirmé au jalon A après inventaire fiche par fiche.
- **Module** : `CM.FicheQuestion` (port domaine + adapter vue + générateur de données depuis source markdown ou JSON, suivant le patron `outils/construire-*.js`).
- **Cibles visuelles** : palette, typographie, proportions, composants — alignés sur `doc-cadre-visuel.md` (8 axes), étalon précis à trancher au jalon A.

**Hors périmètre.**
- Aucune nouvelle fiche-question. MVP fermé à 5 fiches (décision 07/05/2026, garde-fou 16.2).
- Pas de mécanique d'ajout au panier depuis une fiche-question (réservé à un chantier ultérieur si l'usage le motive).
- Pas de refonte du moteur de filtrage ni du référentiel — le chantier reste cantonné aux fiches-questions et à leur intégration.

**Jalons.**
- **A — Cadrage et conception** (~3-4h, 1 séance). Audit doctrine visuelle, inventaire des croisements, conception du contrat de données et du module, document compagnon `doc-contrats-fiche-question.md` rédigé **avant** le code.
- **B — PoC sur la fiche pastèque** (~3-4h, 1 séance). Structure du module, migration de la pastèque vers le format source, câblage clic + recomposition, sentinelles de test, validation interactive côté Safari. Si ce jalon ne convainc pas, on rectifie avant d'engager les 4 autres fiches.
- **C — Migration des 4 autres fiches** (~12-15h, 3-4 séances). Une fiche par séance : pilotage-hebdo, amelioration-continue, resistance-transformation, cascade-objectifs. Rédaction des trios manquants.
- **D — Câblage final dans l'accueil + retrait mockups** (~2h). Liens accueil → route interne, archivage des 5 mockups autonomes, archivage de la doctrine 07/05/2026 dans le backlog avec sa raison d'être historique.
- **E — Tests E2E + smoke test final** (~2h). Sentinelles d'invariants pour `CM.FicheQuestion`, tests automatisés (patron `tests-accueil-unifie.html`), smoke test interactif, tag `mvp-chantier-26-livre`.

**Discipline de progression.** Un seul jalon par séance. Pas de big-bang. Tag de point de retour absolu `baseline-avant-chantier-26` à poser **avant le jalon B** (premier commit de code). Si un jalon dérape, arrêt et rectification avant d'avancer. Document compagnon `doc-contrats-fiche-question.md` rédigé avant code (cf. mémoire `project_document_compagnon_contrats.md`).

**Risques signalés.**
- *Éditorial.* Les ~60 trios demandent de convoquer les panels d'experts (Lean, Agile, Drucker, ADKAR, Lean Six Sigma) pour chaque fiche. Sollicitation forte de Lætitia pour les arbitrages au jalon C.
- *Doctrinal.* On archive une doctrine actée. Tracer dans le backlog la raison d'être historique au jalon D — sinon la prochaine reprise sera confuse.
- *Visuel.* Étalon « reste du site » à trancher au jalon A : accueil unifié (1240px, palette bleu nuit, mission deux étages) vs vues internes (composition différente). Choix de proportion + typographie + palette à valider avant le PoC.

**Effort estimé total** : 20-25h sur 5-7 séances.

### 26.h.coll Constats collatéraux du sous-chantier 26.h *(ouverts le 16/05/2026)*

Quatre items collatéraux levés pendant le sous-chantier 26.h (harmonisation cards). À traiter dans des séances futures, hors scope du chantier 26 en cours.

| Item | Description | Quand traiter |
|---|---|---|
| **26.h.coll.1** | **Métrique canonique « Sprint Commitment vs Delivery »** à créer ou identifier dans `CM.Referentiel`. Cellule pastèque declaratif × équipe en attente (actuellement `CADRES_A_VENIR`). Le concept est canonique au *Scrum Guide* (engagement de sprint). À discuter avec un panel Scrum/Agile. | Quand un manque utilisateur le motive |
| **26.h.coll.2** | **Métrique canonique « Feuille de route engagée vs réalisée »** à créer ou identifier dans `CM.Referentiel`. Cellule pastèque declaratif × programme en attente (actuellement `CADRES_A_VENIR`). Concept proche de la *Predictability Measure* SAFe. À discuter avec un panel SAFe/portfolio. | Quand un manque utilisateur le motive |
| **26.h.coll.3** | **Métrique canonique « Indice de friction programme »** à créer dans `CM.Referentiel`. Cellule pastèque humain × programme en attente (actuellement `CADRES_A_VENIR`, déjà documenté avant 26.h). Sondage transversal anonyme aux équipes du programme. À discuter avec un panel sécurité psychologique (Edmondson) / gestion du changement. | Quand un manque utilisateur le motive |
| **26.h.coll.4** | **Fiche cadre « triangulation déclaratif/objectif/humain »** à créer comme cadre canonique du référentiel (lien sortant patrimonial de la pastèque, actuellement `CADRES_A_VENIR`). | À l'occasion d'un chantier de cadres |
| **26.h.coll.5** *(dette latente)* | **Renommer l'identifiant technique `pasteque`** (id de fiche, route hash `#fiche-q=pasteque`, nom de fichier `mockup-fiche-question-pasteque.html`) — niveau 3 de la doctrine du mot pastèque. Pas de bénéfice utilisateur immédiat ; intervention de refactoring qui casserait des signets éventuels. Consigné comme dette latente. | Dette latente — ne pas traiter sans motif fort |

### 26.c1.coll Constats collatéraux du jalon C.1 *(ouverts le 20/05/2026)*

Items levés pendant le jalon C.1 (migration de `pilotage-hebdo`) et son smoke test. Hors scope du jalon en cours.

| Item | Description | Quand traiter |
|---|---|---|
| **26.c1.coll.1** *(dette éditoriale)* | **Espaces insécables absents du module `CM.FicheQuestion`.** La matière du module (pastèque § 4.6 et pilotage-hebdo § 4.3) utilise des espaces normales avant `;`, `:`, `%` et autour des guillemets `«` `»`, là où la typographie française demande une espace insécable. La fiche `pilotage-hebdo` C.1 a été alignée sur cette convention (espaces normales) pour rester cohérente avec la pastèque voisine, plutôt que d'introduire une divergence locale. À traiter comme un audit typographique global du module, sur le modèle du chantier 1.quater (référentiel). | À l'occasion d'un audit typographique du module fiche-question |

### 26.c2.coll Constats collatéraux du jalon C.2 *(ouverts le 20/05/2026)*

Items levés pendant le jalon C.2 (migration de `amelioration-continue`). Hors scope du jalon en cours.

| Item | Description | Quand traiter |
|---|---|---|
| **26.c2.coll.1** *(proposition de fiche-question, hors MVP)* | **Fiche-question candidate « pilotage stratégique d'une démarche d'amélioration ».** Origine : lors du cadrage C.2.a, deux compositions étaient possibles pour le trio organisation de `amelioration-continue`. L'option 1 (`s12` Écart de vérité stratégique · `s11` Coût de la non-qualité · `s6` Capacité d'absorption du changement) a été retenue car elle préserve le triptyque vitesse/qualité/capacité et la mécanique Q1 sur les trois niveaux. L'**option 2** écartée (`s11` Coût de la non-qualité · `s6` Capacité d'absorption du changement · `s4` OKR stratégiques) raconte une autre histoire, propre au board : une démarche d'amélioration s'y pilote par son **coût**, sa **soutenabilité culturelle** et son **ancrage stratégique**. Lætitia souhaite préserver cet angle dans une fiche-question dédiée plutôt que l'écraser dans `amelioration-continue`. Inspirations : Drucker (MBO, ancrage des objectifs individuels et organisationnels) et Lean (COPQ, culture kaizen durable). **Statut** : hors MVP — le doc compagnon du chantier 26 (§ 1) ferme le MVP à 5 fiches-questions. À statuer pour un chantier post-MVP. Question terrain à formuler avec Lætitia (non figée, pour ne pas extrapoler). | Chantier post-MVP, à statuer |
