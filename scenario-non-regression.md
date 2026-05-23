# Scénario de non-régression — accueil unifié (post-23.f)

Liste manuelle des clics à passer **avant** chaque évolution majeure de l'outil, et **après** chaque commit d'étape. Si un scénario ne donne plus exactement le même résultat qu'avant, on arrête, on diagnostique, et on rollback à l'étape précédente si besoin.

**Règle d'or.** On ne déplace pas un test pour le faire passer. Si un scénario change, c'est qu'on a changé le comportement — soit explicitement (et le scénario est mis à jour dans le même commit), soit par effet de bord (et c'est une régression à corriger).

**Méthode.** Ouvrir `cadre-indicateurs.html` dans un navigateur neuf (ou session privée pour ignorer le `localStorage`). Exécuter les scénarios dans l'ordre. Durée cible : ~10-15 minutes pour passer la liste complète, hors §11 (invariants à figer — exécution ponctuelle).

**Convention de notation.**

- `[ ]` = pas à exécuter et cocher.
- `⏸ skip` = pas gelé : décrit un comportement non livré aujourd'hui (chantier dédié au backlog). Ne pas exécuter, ne pas cocher.
- `✎ figer` = pas qui sert à *figer une valeur de référence*. À noter sur papier ou dans le journal d'étape.

**Historique.** Ce document a été entièrement réécrit au chantier 23.g-1 (08/05/2026) après la livraison du chantier 23.f qui a retiré les 4 portes du chantier 7.2a et la pyramide d'accueil. La version précédente (datée du 25/04/2026, posée pour le chantier 14) décrivait une architecture qui n'existe plus. Pour mémoire historique, voir les commits du chantier 14 (`baseline-avant-hexagonal` à `mvp-chantier-14-livre`).

---

## 1. Accueil unifié — affichage par défaut

- [ ] **A1 — Accueil par défaut.** Ouverture directe → la page **Choisir mes indicateurs** s'affiche : le bandeau du haut à 8 entrées en haut, l'en-tête réduit au h2 *Choisir mes indicateurs*, deux cartouches (compagnon *6 questions terrain ▾* en haut, compteur `N sur 104 indicateurs ▾` plus bas), bloc des 4 chips à combiner *Problème · Cadre · Niveau · Maturité* entre les deux cartouches, marqueur *« — ou — »* visible, largeur de la page bornée à 920px.
- [ ] **A2 — État initial des cartouches.** Les deux cartouches sont **repliées** à l'arrivée (chevron `▾`, libellé *Voir*). Aucune liste de fiches n'est affichée tant que la cartouche compteur n'est pas dépliée. La pyramide n'existe plus dans le DOM (`#accueil` retourne `null`).
- [ ] **A3 — Bouton « À propos ».** Clic sur l'entrée *À propos* du bandeau → ouvre la modale `apropos-overlay`. Croix ferme la modale, `aria-hidden` redevient `true`. Aucun bouton flottant *À propos* sur l'accueil (retiré en 23.b).

---

## 2. Chips — sélecteurs accordéon

- [ ] **B1 — Ouverture chip Niveau.** Clic sur la chip *Niveau* → la chip s'étend en accordéon en place (les 3 autres chips restent à leur place), 4 options s'affichent (Stratégique · Tactique · Programme · Opérationnel) avec **marqueurs ronds** (mono-sélection). Aucune option pré-sélectionnée à l'ouverture initiale.
- [ ] **B2 — Sélection mono Niveau.** Clic sur *Programme* → la chip se referme automatiquement en mode actif, libellé devient `✓ Niveau · Programme`. Le compteur de la cartouche compteur passe à un nombre `N sur 104` cohérent avec le filtre (à figer en §11 I2).
- [ ] **B3 — Modification Niveau.** Re-clic sur la chip *Niveau · Programme* → la chip se rouvre. Marqueur rond plein sur *Programme*. Clic sur *Stratégique* → bascule mono. Clic sur l'X de fermeture (ou re-clic sur l'option active) → désactive la chip, libellé revient à `Niveau`.
- [ ] **B4 — Multi-sélection Cadre.** Clic sur *Cadre* → la chip s'étend, les options affichent des **marqueurs carrés** (multi-sélection). Clic sur *DORA* puis sur *Lean* sans refermer → 2 options actives. Refermer → libellé `✓ Cadre · DORA · Lean` (ou `✓ Cadre · 2 actifs` selon design).
- [ ] **B5 — Marqueurs des chips.** Niveau + Maturité = marqueurs **ronds** (mono). Problème + Cadre = marqueurs **carrés** (multi). Vérifier visuellement.
- [ ] **B6 — Compteur live à chaque clic.** Le compteur `N sur 104 indicateurs` se met à jour en live à chaque sélection / désélection. Aucun bouton *Appliquer* n'est nécessaire.

---

## 3. Cartouche compagnon — 5 questions terrain

- [ ] **Q1 — Déploiement cartouche question.** Clic sur l'en-tête de la cartouche *5 questions terrain ▾* → le panneau s'ouvre en accordéon, chevron passe à `▴`, libellé devient *Masquer*. La cartouche compteur reste à sa place.
- [ ] **Q2 — Index inline des 5 fiches.** Le panneau déployé liste 5 fiches-questions cliquables avec leurs emojis, titres seuls. Clic sur une fiche → ouverture de la fiche-question **intégrée** via la route `#fiche-q=` (et non plus un mockup autonome : les 5 mockups ont été retirés au jalon D du chantier 26).
- [ ] **Q3 — Repli.** Clic sur l'en-tête (ou *Masquer*) → la cartouche se replie, les 5 fiches disparaissent.

---

## 4. Cartouche compteur — N sur 104 indicateurs

- [ ] **R1 — Déploiement cartouche compteur.** Clic sur *N sur 104 indicateurs ▾* (ou clic sur l'en-tête) → le panneau s'ouvre, chevron passe à `▴`, libellé devient *Masquer*. **Aucune ligne bleue de séparation** entre l'en-tête et le panneau (fix 23.e-fix4).
- [ ] **R2 — Liste filtrée 2 colonnes.** Le panneau affiche les fiches filtrées en **grille 2 colonnes**, chaque carte fait ~412px de large à 920px de page (titre du type complet, définition à 3 lignes). Les cartes utilisent `htmlCarte()` réutilisé tel quel — format identique au reste du site (voir doctrine `project_accueil_unifie_v7.md`).
- [ ] **R3 — Couleur du nom de carte.** Le titre de chaque carte (`carte-nom`) est lisible — couleur sombre sur fond clair (fix 23.e-fix3 : la carte est blindée contre tout contexte parent à couleur héritée non foncée).
- [ ] **R4 — Ordre canonique.** Sans aucune chip active, les fiches sont affichées dans l'**ordre de déclaration de `CM.Referentiel.tous()`** (ordre éditorialement curé, stable, prévisible — cf. doc-contrats-chantier-14 §10.3).
- [ ] **R5 — État vide pédagogique.** Activer une combinaison de chips qui ne matche aucune fiche (ex : *Niveau · Stratégique* + *Cadre · Scrum*) → message éditorial *« Aucun indicateur ne correspond à votre sélection »* (à vérifier exactement). Pas de liste vide silencieuse, pas d'erreur console.
- [ ] **R6 — Repli.** Clic sur l'en-tête → la cartouche compteur se replie, la liste de fiches disparaît.

---

## 5. Bandeau du haut — 8 entrées

- [ ] **N1 — 8 entrées visibles.** Le bandeau du haut affiche dans l'ordre attendu (cf. `doc-contrats-navigation.md` §4.1) : *Accueil · Mon tableau de bord (N) · Par mes 4 axes · Par ma question · Cascade stratégique · La maturité ? · Lexique · À propos*.
- [ ] **N2 — État actif sur l'accueil.** À l'arrivée, l'entrée *Accueil* a la classe `actif` (fond pill `--niv-1-clair`). Les autres entrées sont neutres.
- [ ] **N3 — Compteur live tableau de bord.** Le libellé devient *Mon tableau de bord (N)* dès qu'au moins un indicateur est au panier. Span vide (rien d'écrit) quand le panier est vide. Mis à jour à chaque mutation via `CM.Panier.abonner` (fix 23.e-fix5).
- [ ] **N4 — Stub Lexique.** L'entrée *Lexique* a `aria-disabled="true"` et la classe `stub` — un clic n'ouvre rien. Comportement attendu (chantier 21 ouvert, vue Lexique pas encore livrée).

---

## 6. Mon tableau de bord — panier

- [ ] **T1 — Ouverture vue panier.** Clic sur *Mon tableau de bord* → bascule vers `#app`, l'accueil unifié est masqué. La nav interne `<nav class="onglets">` apparaît avec les 4 onglets *Mon tableau de bord · Cascade stratégique · Choisir mes indicateurs · Maturité & Recommandations*. Onglet *Mon tableau de bord* actif par défaut.
- [ ] **T2 — Vue panier vide.** Si aucun indicateur n'a été ajouté → message éditorial *« Votre tableau de bord est vide »*, pas d'erreur console.
- [ ] **T3 — Ajout au panier depuis l'accueil unifié.** Retour accueil (clic *Accueil*), déployer la cartouche compteur, sur une carte cliquer le bouton *✓ en place* (panier) → la carte montre l'état actif. Ouvrir *Mon tableau de bord* → l'indicateur est listé en colonne *En place*. Compteur du bandeau passe à `Mon tableau de bord (1)`.
- [ ] **T4 — Bouton « 💡 à envisager ».** Sur une autre carte, clic sur *💡 à envisager* → l'indicateur passe en colonne *À envisager* dans le tableau de bord.
- [ ] **T5 — Retrait du panier.** Dans *Mon tableau de bord*, bouton de retrait sur un indicateur → l'indicateur disparaît, compteur du bandeau décrémente.

---

## 7. Cascade stratégique / Maturité réflexive

- [ ] **K1 — Cascade stratégique.** Clic sur *Cascade stratégique* dans le bandeau → bascule vers `#app`, onglet *Cascade* actif, contenu rendu (vue déjà livrée avant 23.f).
- [ ] **K2 — La maturité ?** Clic sur *La maturité ?* dans le bandeau → bascule, onglet *Maturité & Recommandations* actif, contenu réflexif sur le panier (vue déjà livrée).

> ⏸ **skip — Cible chantier 10**. Les modes d'entrée parallèles *Par mes 4 axes* / *Par ma question* sont reportés au chantier 10 — actuellement gelés derrière MISSION.md. Voir mémoire `project_chantier_10_decisions_ouverture`.

---

## 8. Tiroir de fiche

- [ ] **F1 — Ouverture tiroir.** Clic sur le titre d'une carte (depuis l'accueil unifié, le panier ou ailleurs) → tiroir latéral s'ouvre avec le contenu des sections de la fiche (`rendreEnteteFiche`, `rendreCadreLecture`, anti-patterns, alternatives, repères industriels si présents, encart Gemba, etc.). Le hash URL passe à `#fiche=<id>`.
- [ ] **F2 — Fermeture tiroir.** Clic sur la croix du tiroir, sur le fond noir, ou touche `Escape` → tiroir se ferme, hash URL revient à l'état précédent.
- [ ] **F3 — Boutons panier dans le tiroir.** Le tiroir affiche les boutons *✓ en place* / *💡 à envisager* qui pilotent le panier (chantier 9.C).

---

## 9. Hash URLs et deep-linking

- [ ] **D1 — Hash `#portes`.** `cadre-indicateurs.html#portes` au chargement → l'accueil unifié s'affiche directement (l'id DOM `accueil-portes` est conservé pour rétro-compat — chantier 23.f-7.4).
- [ ] **D2 — Hash `#pyramide` ignoré.** `cadre-indicateurs.html#pyramide` au chargement → l'accueil unifié s'affiche quand même (le mapping `'pyramide'` a été retiré de `CM.Preferences.HASH_VERS_PREFERENCE` au commit 23.f-7.3 `7963402`). Pas d'erreur console.
- [ ] **D3 — Hash `#fiche=<id>`.** `cadre-indicateurs.html#fiche=p5` au chargement → le tiroir s'ouvre directement sur la fiche `p5`. Le hash est mis à jour quand on ouvre/ferme une fiche depuis l'UI.

---

## 10. Console et santé technique

- [ ] **S1 — Console propre.** Aucune erreur rouge dans la console DevTools au chargement initial ni en navigant entre l'accueil unifié, le tableau de bord, la cascade et la maturité réflexive.
- [ ] **S2 — Tests panier verts.** Ouvrir `tests-panier.html` → tous les tests verts.
- [ ] **S3 — Tests requête métriques verts.** Ouvrir `tests-requete-metriques.html` → tous les tests verts (cible : ce que le harnais annonce dans son rapport — voir bloc État courant du backlog pour la valeur de référence).

> ⏸ **skip — Tests porte niveau.** Le harnais `tests-porte-niveau.html` a été retiré au chantier 23.f-6 (option C tranchée). Le générateur `outils/construire-tests-porte-niveau.js` aussi.

---

## 11. Invariants à figer

> Ces pas sont à exécuter **une fois** (ou lors d'une mise à jour majeure du catalogue) pour figer des valeurs de référence. Après une évolution architecturale majeure, repasser ces mêmes pas et confronter les valeurs : iso-comportement strict.

- ✎ **I1 — Accueil sans chip — total et premier id.** Sans aucune chip active, déployer la cartouche compteur. Noter : (a) le **compteur affiché** (doit être `104 sur 104 indicateurs`), (b) l'**identifiant de la première fiche** dans la grille 2 colonnes.
- ✎ **I2 — Niveau Programme seul.** Activer chip *Niveau · Programme*. Noter : (a) le compteur `N sur 104`, (b) l'id de la première fiche affichée. C'est la référence d'iso-comportement pour les évolutions futures du filtre par niveau.
- ✎ **I3 — Cadre DORA seul.** Sans niveau actif, activer chip *Cadre · DORA*. Noter : (a) le compteur `N sur 104`, (b) l'id de la première fiche affichée. Référence pour les évolutions du filtre par cadre.
- ✎ **I4 — Combinaison Niveau Programme + Cadre DORA.** Activer les 2 chips simultanément. Noter le compteur. Vérifier que c'est l'**intersection** (AND) des deux filtres précédents — cohérent avec le contrat §10.3 de doc-contrats-chantier-14 (intersection inter-clauses).
- ✎ **I5 — Tri par fiabilité — vérification visuelle.** Sur la sortie I2, vérifier que l'**ordre des fiches** suit la fiabilité décroissante (`fiable` avant `precaution` avant `risque`). Si plusieurs fiches partagent la même fiabilité, l'ordre secondaire doit être stable d'une exécution à l'autre — figer cet ordre dans le journal.
- ✎ **I6 — Combinaison vide — message éditorial.** Choisir une combinaison sans correspondance (ex : *Niveau · Stratégique* + *Cadre · Scrum*). **Copier le texte exact** du message éditorial affiché — c'est lui qui doit être préservé après toute évolution.

### Harnais automatisés (chantier 23.g-4)

Depuis le chantier 23.g-4, les invariants I1-I6 ne se vérifient plus uniquement à la main : deux harnais HTML autonomes les exercent automatiquement.

- ✎ **Smoke-test section A — sémantique du module en isolation.** Ouvrir `tests-accueil-unifie.html` dans Safari. Attendu : **✓ 21 / 21 tests passent.** Couvre la mécanique de `CM.AccueilUnifie` sur stubs synthétiques (sélection/désélection chips, persistance via Preferences, libellé d'axes actifs sur 4 patterns français, libellé canonique vide, comportements limites, pub/sub).
- ✎ **Smoke-test section B — sentinelles I1-I6 sur référentiel réel.** Ouvrir `tests-accueil-unifie-sentinelles.html` dans Safari. Attendu : **✓ 9 / 9 sentinelles passent.** Reproduit les invariants I1-I6 du `journal-invariants-23g.md` en assertions automatiques + 3 cas adjacents qui exercent la façade publique. Doctrine : **une sentinelle rouge n'est pas un bug à étouffer, c'est un signal d'évolution du référentiel** — ouvrir le journal, acter le changement, mettre à jour le test.
- ✎ **Outil compagnon CLI.** Avant un commit qui touche à `CM.AccueilUnifie`, `CM.Referentiel`, `CM.IndicateursMeta`, ou `CM.RequeteMetriques`, lancer : `node outils/lancer-tests-accueil-unifie.js`. Régénère les deux harnais (extraction des zones depuis `cadre-indicateurs.html`) et fait un parse-check syntaxique. Ne dispense pas du smoke-test Safari — la validation comportementale reste manuelle (les modules sont DOM-dépendants, doctrine zéro-dépendance du projet ne porte pas JSDOM).

---

## 12. Fiches-questions intégrées

Les 5 fiches-questions terrain sont intégrées au catalogue `CM.FicheQuestion` (chantier 26). Accès direct par la route `#fiche-q=<id>`.

- [ ] **F1 — Ouverture des 5 fiches.** Ouvrir tour à tour `#fiche-q=pasteque`, `#fiche-q=pilotage-hebdo`, `#fiche-q=amelioration-continue`, `#fiche-q=resistance-transformation`, `#fiche-q=cascade-objectifs`. Chaque fiche s'affiche sans erreur console.
- [ ] **F2 — Mécanique Q1 / Q2.** Sur `resistance-transformation` ou `cascade-objectifs` (§ 4.4) : cliquer différentes options de Q1 réordonne le trio, changer le niveau (Q2) change le trio entier. Sur `pasteque` (§ 4.6), Q1 réordonne les 3 axes.
- [ ] **F3 — Cartes réelles.** Les cartes des trios affichent de vraies fiches d'indicateurs cliquables, plus aucune mention « en cours de constitution » (les 5 fiches sont entièrement adossées au référentiel depuis le mini-chantier du constat n°10).
- [ ] **F4 — Variante § 4.3.** `pilotage-hebdo` affiche la double colonne cliquable, sans mécanique Q1 / Q2.
- ✎ **Sentinelle automatisée.** `node outils/verifier-invariants-fiche-question.js` vérifie les invariants I1-I5 du catalogue (variante valide, `ficheRef` réel ou `CADRES_A_VENIR`, `cardEnTete` / `axeEnTete`, structure cohérente). Attendu : 5 fiches, tout cohérent, exit 0.

---

## Procédure avant/après une évolution majeure

**Avant l'évolution** :

1. Passer §1 → §10 en intégralité. Toute divergence par rapport à l'attendu = stop, diagnostic.
2. Si on n'a pas encore figé §11, le faire maintenant et reporter les valeurs dans le commit ou dans le journal d'étape.
3. Si tout est vert et §11 est figé, poser un tag git si pertinent (ex : `mvp-avant-chantier-XX` sur le commit courant).

**Après chaque commit d'étape** :

1. Repasser §1 → §10 + repasser §11 et **comparer chaque valeur figée**.
2. Si un scénario rouge ou une valeur diverge : *stop*. Pas de commit suivant. Soit on corrige sans quitter l'étape, soit on rollback au tag pré-étape.
3. Si tout vert et toutes valeurs identiques, commit atomique avec message clair. Tag git sur les jalons majeurs.

---

*Document évolutif. À enrichir si un bug est découvert en cours de chantier (nouveau scénario ajouté pour ne plus le rater). À ne pas élaguer sans décision explicite. Toute mise à jour doit refléter l'**état réel du code**, pas une cible non livrée — sinon le scenario ne valide plus l'iso-comportement.*
