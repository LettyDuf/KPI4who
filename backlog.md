# Backlog — cadre-indicateurs.html

Liste consultable des améliorations réfléchies mais non encore appliquées.
Dernière mise à jour : **18 avril 2026** (après revue p5, extraction rendreFicheHtml, refonte libellés types et accents).

Légende : 🔴 priorité haute · 🟡 moyenne · 🟢 basse · ⚪ à décider · ✅ fait · ⏳ en cours

---

## 1. Revue métier des fiches (cohérence output/outcome + anti-patterns)

Règle appliquée : chaque fiche doit distinguer **ce qu'elle mesure** (output) de **ce qu'elle prétend mesurer** (outcome), et nommer explicitement 2 à 4 anti-patterns connus. Croisement systématique Lean + Agile + DORA.

| Fiche | Niveau / Type | Sujet | État | Anti-patterns à nommer |
|---|---|---|---|---|
| p5 | Programme / FLUX | Débit d'initiatives livrées | ✅ | Splitting, phantom delivery, confusion output/outcome, comparaison inter-programmes — **révisée le 18/04/2026** |
| t4 | Portefeuille / FLUX | Efficacité de flux (ratio temps actif / lead time) | 🔴 | Usage en évaluation individuelle, optimisation locale, moyenne trompeuse |
| af-c2 | Affaires / FLUX | (à identifier lors de la revue) | 🟡 | — |
| af-m3 | Affaires / FLUX | (à identifier lors de la revue) | 🟡 | — |
| af-sc5 | Affaires / FLUX | (à identifier lors de la revue) | 🟡 | — |

Fiches déjà revues à ce standard : o1 (Fréquence de déploiement), o2 (Lead Time), o3 (Change Failure Rate), o5 (MTTR), et les fiches du portefeuille revues précédemment.

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

---

## 3. Refactoring progressif (greffé sur les corrections fonctionnelles)

À appliquer **en même temps** qu'une modification fonctionnelle, pas en phases isolées. Suivi des 7 jalons de convergence.

| Jalon | État | Déclencheur opportuniste |
|---|---|---|
| CM.Html.escape() créé et utilisé partout | ☐ 🟡 | À la prochaine concaténation HTML touchée |
| Tous les mappings métier dans CM.Config | ☐ 🟡 | Quand je touche CM.Composants (NIVEAU_VERS_POSITION, FIABILITE_VERS_NIVEAU) |
| ouvrirTiroir() < 50 lignes | ✅ (11 lignes — 18/04/2026) | Réalisé en greffe sur la revue p5 — `rendreFicheHtml(ind)` extrait |
| Zéro style inline en JS | ☐ 🟢 | À chaque nouvelle chaîne HTML ajoutée |
| CM.Referentiel.valider() + console.warn au boot | ☐ 🟡 | Quand j'ajoute un nouveau champ ou type d'indicateur |
| Module CM.FicheViewModel créé | ☐ 🟡 | Juste après l'extraction de rendreFicheHtml |
| ARCHITECTURE.md (1 page) dans le dossier | ☐ 🟢 | Après la création de CM.Html et CM.FicheViewModel |

Audit actuel : **6/10 clean code, 4/10 hexagonal-light**. Cible à 5 itérations : **8/10 et 7/10**.

---

## 4. Évolutions produit envisagées (non priorisées)

| Évolution | Valeur attendue | État |
|---|---|---|
| Version condensée / aide-mémoire imprimable (1 page) | Support d'atelier, d'onboarding manager | ⚪ |
| Export d'un sous-ensemble d'indicateurs filtré (CSV ou markdown) | Partage avec une équipe ciblée | ⚪ |
| Mode "facilitation atelier" (typo +20 %, pastilles agrandies, fond sombre) | Projection en salle, lisibilité 6 m | ⚪ |
| Outil d'aide à la décision (questionnaire 10-15 questions → 3-5 métriques suggérées) | Mentionné dans le brief projet, **pas encore démarré** | ⚪ 🔴 |
| Visualisation des liens KGI → KPI → KBI entre niveaux | Montrer la traçabilité stratégie → exécution | ⚪ |
| Mode sombre | Confort de lecture prolongée | ⚪ 🟢 |
| Impression PDF propre d'une fiche | Partage hors outil | ⚪ 🟢 |

---

## 5. Dette documentaire

| Item | Pourquoi | État |
|---|---|---|
| Lexique central des anti-patterns (deploy theater, Goodhart, splitting, phantom delivery, local optimum…) | Aujourd'hui dispersé dans les `term-def` des fiches | ⚪ 🟡 |
| Note "Comment lire une fiche" (Niveau / Maturité / Fiabilité / Terrain) | Accessibilité pour un nouveau lecteur | ⚪ 🟢 |
| Pied de page avec date de dernière révision et numéro de version | Traçabilité | ⚪ 🟢 |

---

## Prochaine action recommandée

**t4 — Efficacité de flux portefeuille**. Greffe opportuniste possible : décomposer `rendreFicheHtml(ind)` (138 lignes, monobloc) en sous-fonctions par section (header, cadre, exemples, vigilance, contexte). Premier pas vers le module `CM.FicheViewModel`.

Note : la Règle 1 (CM.Html.escape) reste différée tant qu'aucune donnée externe n'arrive dans le pipeline. À déclencher si on ajoute une importation CSV ou une saisie utilisateur.
