# Test utilisateur n°1 — retours et ventilation

Compte rendu du premier test utilisateur de `cadre-indicateurs.html`, rapporté par Lætitia le 24 mai 2026. Test mené sur une version récente de l'outil (autour du tag `mvp-chantier-26-livre`).

Ce document est la matière source de la séance. La décision de cadrage (option 1B) est de ventiler ces retours dans le backlog existant : enrichir les lignes déjà présentes qui recoupent un retour, créer seulement les lignes manquantes. La table de ventilation ci-dessous est une PROPOSITION, à valider avant toute édition du backlog.

## Méthode de lecture

26 observations, regroupées en 8 familles :

- A — Valeur et parcours
- B — Pédagogie des concepts
- C — Vocabulaire et glossaire
- D — Neutralité francophone
- E — Navigation et UX
- F — Cohérence éditoriale
- G — Coquilles
- H — Fonctionnalité

Pour chaque point : le retour, puis la ventilation proposée. RECOUPE signifie qu'une ligne du backlog traite déjà le sujet (citée verbatim). NOUVEAU signifie que rien n'existe, avec une section de destination proposée.

## Famille A — Valeur et parcours

**A1. Sur l'accueil, l'utilisateur ne comprend pas à quoi sert l'outil ni quelle valeur il apporte.**
Ventilation : NOUVEAU. Section §23 (refonte accueil) ou §4. Le « manifeste deux étages » déjà livré ne lève pas ce malentendu.

**A2. Le « OU » entre le mode « question terrain » et le mode « filtrage » n'est pas perçu sur l'accueil.**
Ventilation : RECOUPE partiel. Le « ou » existe par décision (cartouche « Par ma question », anti-chemin obscur). Sa non-perception est nouvelle : constat collatéral §23.

**A3. Outil jugé « pas intuitif » : la mécanique a dû être expliquée de vive voix.**
Ventilation : NOUVEAU. §23 ou §2. Recoupe partiellement la doctrine §16.1 « Parcours court comme juge de paix ».

**A4. Ajouter une phrase de contexte d'accueil : « je monte une nouvelle équipe, quels premiers indicateurs mettre en place selon différents axes (humain, performance, etc.) ».**
Ventilation : NOUVEAU. §23. Recoupe partiel le « Constat collatéral n°2 » du §23.

## Famille B — Pédagogie des concepts

**B1. Niveaux de confiance des indicateurs : besoin d'une explication directe de ce que cela signifie.**
Ventilation : RECOUPE. Chantier 12 « Chantier éditorial — Transparence des cotations Fiable / Précaution / Risquée » (ouvert).

**B2. Maturité des équipes : comment est-elle calculée ? Non compris.**
Ventilation : RECOUPE. Chantier 13 « Outil de diagnostic de maturité — pour l'onglet La maturité ? » (ouvert, priorité basse).

**B3. Tag « vigilance » : signification floue. L'utilisateur se demande si cela veut dire « indicateur mauvais », pourquoi être vigilant, et le lien avec les points de vigilance.**
Ventilation : NOUVEAU. §1.bis (dette éditoriale) ou §2. À arbitrer (voir plus bas).

**B4. Fréquence de mesure : est-ce la fréquence recommandée ? Pourquoi serait-ce la meilleure ?**
Ventilation : NOUVEAU. §2 ou §5.

**B5. Manque de conseils sur comment mettre en place les indicateurs.**
Ventilation : RECOUPE. Chantier 15 « Accompagnement post-choix — tenir les indicateurs vivants » (ouvert).

## Famille C — Vocabulaire et glossaire

**C1. Jargon agile non glosé, exemple « rétrospective » : terme spécifique à l'agile, pas accessible à tous.**
Ventilation : RECOUPE partiel. §1.bis « Dette éditoriale — acronymes secs », à élargir au jargon glosé, ou ligne neuve §1. Recoupe aussi le chantier 21 (Vue Lexique) en cours.

**C2. Libellé de carte « Une étape goulot connue » : incompris.**
Ventilation : NOUVEAU. §1 (revue métier des fiches).

**C3. Labels sur les cartes type « domaine de développement » : l'utilisateur se demande pourquoi ils sont là.**
Ventilation : NOUVEAU. §2 (UX). À localiser dans l'outil : le libellé exact ne sort pas au grep.

**C4. « KR » (key results) : acronyme anglophone opaque.**
Ventilation : RECOUPE. §1.bis liste déjà « KR (o6) » parmi les acronymes secs (axe Opérationnel TI, à faire).

**C5. « rituel creux » : expression sans sens pour l'utilisateur, qui demande ce que c'est et comment le repérer.**
Ventilation : NOUVEAU. §1.bis ou §1. Couvert aussi par le chantier 21 (Lexique).

**C6. OKR : pour des équipes en mode produit ou projet ? Applicable aux deux ?**
Ventilation : NOUVEAU. §1 (revue de la fiche OKR).

**C7. « SRE » dans les indicateurs MTTR : terme non expliqué.**
Ventilation : RECOUPE partiel. §1.bis (acronymes axe Opérationnel TI), ajouter « SRE » à gloser. Couvert aussi par le chantier 21 (Lexique).

## Famille D — Neutralité francophone

**D1. Vocabulaire franco-français ou nord-américain à neutraliser : exemple « board » pour conseil d'administration.**
Ventilation : RECOUPE partiel. « Constat collatéral n°2 » du §23 (audit vocabulaire) ; relève aussi de la doctrine anglicismes. Élargir le constat ou ligne neuve §1.bis. Note : le terme « CDD » cité par le testeur ne sort pas au grep, à localiser.

**D2. Valeurs monétaires affichées en euros : à neutraliser pour parler à tous les pays francophones (l'utilisatrice est au Canada).**
Ventilation : NOUVEAU. §1 ou §2. Le §1.bis cite « devises (EUR) » comme cas limite légitime, à revisiter.

## Famille E — Navigation et UX

**E1. Liens entre indicateurs recommandés : souhait d'ouvrir dans un nouvel onglet pour ne pas perdre l'indicateur consulté.**
Ventilation : RECOUPE. Historique chantier 7.6 « Cmd/Ctrl+clic = nouvel onglet ». L'ouverture par défaut est nouvelle : §7 ou §2. À arbitrer (voir plus bas).

**E2. Page « maturité des équipes » : indicateurs recommandés jugés déroutants, onglets de maturité peu visibles, navigation entre les critères des cartes peu claire.**
Ventilation : RECOUPE partiel. §13.bis « Sémantique des filtres maturité » (ouverte). Le reste est nouveau : §13 ou §2. À arbitrer (voir plus bas).

**E3. Bouton pour réinitialiser les filtres sur la page d'accueil.**
Ventilation : NOUVEAU. §23 ou §2.

**E4. Les filtres sélectionnés ne s'affichent plus : l'utilisateur ne se rappelle plus ce qu'il a choisi.**
Ventilation : NOUVEAU. §23 ou §2. La mécanique de chips livrée prévoyait l'affichage du choix actif, possible régression à vérifier.

## Famille F — Cohérence éditoriale

**F1. Niveau de détail des objectifs hétérogène : certains bien détaillés et appréciés, d'autres trop pauvres. Harmoniser vers le plus de détail.**
Ventilation : NOUVEAU. §1 (revue métier des fiches).

## Famille G — Coquilles

**G1. Accents circonflexes manquants à divers endroits.**
Ventilation : RECOUPE. §1.quater « Audit typographique du référentiel » (livré pour le référentiel). Les accents manquants hors référentiel (accueil, modules) sont nouveaux : réouverture ciblée §1.quater ou ligne §2.

**G2. Cascade : un mot manque dans la phrase explicative (autour de « cliquer pour visualiser »).**
Ventilation : NOUVEAU. §11 / §10 (Cascade) ou §1. À localiser dans l'outil : la phrase exacte ne sort pas au grep.

## Famille H — Fonctionnalité

**H1. Tableau de bord : remplacer la proposition d'impression par une exportation PDF.**
Ventilation : RECOUPE. Chantier 9, tranche 9.F (clôturée : bouton « Imprimer / PDF », pas d'export interne). Le retour relance ce point : réouverture §9 ou ligne §4. À arbitrer (voir plus bas).

## Six points qui ne s'appliquent pas tels quels

1. **Proposition de valeur (A1).** Le retour porte sur un chantier déjà livré (le « manifeste deux étages » du chantier 23). Le travail n'est pas d'inventer un message mais de faire monter à la surface celui que Lætitia a formulé au testeur : la pertinence d'un indicateur n'est pas garantie par sa notoriété, et des indicateurs cohérents et en nombre juste assainissent la culture en sortant des perceptions.

2. **Nouvel onglet (E1).** L'outil est un fichier HTML unique : un « nouvel onglet » rouvrirait tout l'outil sans état. Le vrai besoin est de ne pas perdre l'indicateur consulté. Réponse plus juste : fil d'Ariane, bouton retour, ou panneau latéral persistant.

3. **Retirer les indicateurs recommandés de la page maturité (E2).** Décision de design lourde. Diagnostiquer d'abord l'intention initiale de cette page : souvent, clarifier pourquoi un contenu est là suffit, sans le supprimer.

4. **Tag « vigilance » (B3).** Risque de contresens grave (« vigilance = mauvais indicateur »). Un indicateur sous vigilance demande une lecture prudente, pas un rejet. À arbitrer : garder le mot et le gloser partout, ou le changer.

5. **Export PDF (H1).** La tranche 9.F a été close sur « l'impression suffit ». Dans la plupart des cas, « Imprimer vers PDF » est l'export PDF. Le vrai besoin du testeur est de ne plus voir le mot « imprimer » et d'obtenir un PDF propre : relibeller le bouton et soigner le CSS d'impression peut suffire, sans moteur PDF lourd.

6. **Accents circonflexes (G1).** Le chantier 1.quater a balayé le référentiel, pas l'enveloppe d'interface. Ce n'est pas une régression, c'est une zone non couverte.

## Décision de cadrage

Option 1B retenue par Lætitia : ventiler les 26 retours dans le backlog existant, en enrichissant les lignes recoupées et en créant seulement les manquantes. Pas de chantier 27 dédié.

## Reste à faire

1. Valider la table de ventilation ci-dessus (chaque retour vers sa destination backlog).
2. Ventiler dans le backlog : enrichir les lignes RECOUPE, créer les lignes NOUVEAU.
3. Trancher l'ordre d'implémentation. Trois pistes proposées, non tranchées : finir le chantier 21 (Vue Lexique) d'abord, prioriser la proposition de valeur de l'accueil, ou faire une passe de corrections rapides (accents, mot de la cascade, bouton réinitialiser, libellés opaques).
4. Au moment de traiter les points concernés, localiser dans l'outil les éléments paraphrasés par le testeur : le libellé « domaine de développement », la phrase exacte de la cascade, le terme « CDD ».
