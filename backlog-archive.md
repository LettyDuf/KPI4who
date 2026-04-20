# Backlog — archive des chantiers majeurs livrés

Ce fichier conserve les sections sorties du backlog actif une fois leur livraison consolidée. Garder le backlog principal léger tout en préservant la traçabilité historique des grands chantiers et des commits associés.

Règle d'archivage : une section passe ici quand elle est **intégralement livrée** depuis plus d'une session et qu'aucun item résiduel n'y est encore ⏸ / ⏳ / 🟡. Les commits cités restent vérifiables via `git log <sha>`.

---

## Porte « Par mon problème » — v1 livrée

Archivée depuis `backlog.md` le **20 avril 2026** (était la section 0 du backlog actif).

Une première version de l'outil d'aide à la décision a été livrée en session précédente, sous la forme d'un **parcours en 3 étapes accessible depuis l'accueil 4 portes** : (1) je décris mon problème ressenti → (2) je choisis mon niveau de pilotage → (3) je reçois 3 à 5 indicateurs recommandés, triés par fiabilité décroissante.

| Item | État | Commits de référence |
|---|---|---|
| Squelette accueil 4 portes (conteneur DOM + styles) | ✅ | `a9c4851`, `3cb168f` |
| Bascule pyramide ↔ 4 portes au démarrage (pilotée par `CM.Preferences`) | ✅ | `af40025`, `01f8c86`, `34bd1ba` |
| Matrice de pertinence niveau × problème (anti-micromanagement) — `CM.DiagnosticProbleme` | ✅ | `c5834d3` |
| Vue stepper 1→2→3 — `CM.VuePorteProbleme` | ✅ | `d39355b` |
| Activation de la porte depuis l'accueil 4 portes | ✅ | `cbeda6b` |
| Tri des recommandations par fiabilité décroissante | ✅ | `601fd30` |
| Descriptions des problèmes accessibles aux non-experts | ✅ | `af00449` |
| Message pédagogique sur les paires niveau × problème vides | ✅ | `c6d4bdd` |
| Scroll vers le haut du parcours après chaque étape | ✅ | `23b7b7e` |
| Bouton « À propos » accessible depuis les 4 portes | ✅ | `5f5b882` |

**Distinction avec le brief projet.** Le brief évoquait un « outil d'aide à la décision (questionnaire 10-15 questions → 3-5 métriques suggérées) ». La v1 livrée est une version **plus simple et plus frugale** : 2 questions (problème ressenti + niveau de pilotage) → 3-5 indicateurs. Elle couvre le cas d'usage prioritaire (utilisateur en autonomie, diagnostic rapide) et reste un excellent socle. Une v2 enrichie reste envisagée dans la section 4 du backlog actif (*Évolutions produit envisagées*) si le besoin terrain le confirme.
