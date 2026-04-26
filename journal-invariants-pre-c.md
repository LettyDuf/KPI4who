# Journal des invariants pré-(c) — chantier 14

Valeurs de référence figées **avant la bascule des portes sur `CM.RequeteMetriques.executer`** (étape (c) du chantier 14). Toute divergence après bascule = stop, diagnostic, rollback.

**HEAD de référence** : `2a61336` (= tag `mvp-etape-b-coeur-extrait`).
**Date de capture** : 25 avril 2026.
**Méthode** : test interactif côté Lætitia (Safari, session privée), captures d'écran archivées.

---

## Tableau des invariants

| # | Couple | Total fiches | Première fiche | Note |
|---|---|---:|---|---|
| **I1** | *Par mon problème* — Programme/Projet × Délais & prévisibilité | **1** recommandée + **6** en zone de délégation | *Taux d'avancement des jalons* (`p1`, ICP, Fiable, SAFe) | Couple éditorialement creux. Le `1` est la valeur réelle du référentiel — voir item 6.9 du backlog pour le diagnostic complet. |
| **I2** | *Par mon cadre* — DORA / DevOps × Opérationnel | **13** | *Fréquence de déploiement* (DORA, Performance DevOps, Fiable) | Couple densément peuplé. Les deux premières fiches sont toutes deux Fiable. |
| **I3** | Ordre par fiabilité (observation transverse à I1 et I2) | — | — | OK visuel sur les portions vues. À recontrôler après bascule en remontant la liste complète d'I2. |
| **I5** | *Par mon cadre* — Indicateur générique × Opérationnel | **33** | *(non noté à la capture initiale — à compléter au prochain passage)* | Sortie maximale observée. À utiliser comme témoin de capping potentiel. |
| **I7** | *Par mon niveau* — Développeur (Opérationnel TI) × Flux & goulots × DORA / DevOps | **7** | *Fréquence de déploiement* (DORA, Performance DevOps, Fiable) → *Délai de livraison des changements / Lead Time for Changes* (DORA, Fiable) → *Durée de cycle / Cycle Time* (FLUX, Fiable) | Triplet exerçant simultanément les trois axes du filtre (`niveau` × `tags` × `cadres`). Capture interactive Safari côté Lætitia, 26/04/2026. Sentinelle dédiée à (c.3) — la seule qui prouve la composition AND inter-clauses sur trois axes au lieu de deux. |

---

## Pas en skip

- **I4 — message éditorial sur triplet vide** : non atteignable depuis l'UI. `CM.DiagnosticProbleme.MATRICE_PERTINENCE` filtre dès l'étape 2 les couples non pertinents au niveau choisi ; le mapping `DELEGATION` est commenté comme « aujourd'hui impossible via l'UI ». Pas de scenario à figer aujourd'hui — à rouvrir si la matrice de pertinence est élargie.
- **I6 — intersection rôle × problème × cadre, porte niveau** : la porte *Par mon niveau* renvoie aujourd'hui sur la pyramide d'accueil (chantier 7.2a-code.3 non livré). Pas d'invariant à figer ici tant que cette porte n'est pas rebranchée.

---

## Justification I7 — ajout du 26/04/2026

I6 (intersection rôle × problème × cadre, porte niveau) avait été marqué *en skip* à la capture initiale parce que la porte renvoyait alors sur la pyramide d'accueil. Depuis, l'audit du code a confirmé que la porte est fonctionnelle (étapes B.1 à C.3 livrées en 7.2a-code.3, accessible via `CM.VuePorteNiveau.ouvrir()` en console — l'étape D « câblage tuile d'accueil » reste gelée derrière 14 mais ne bloque pas la mécanique de filtrage).

I7 figé sur HEAD `96855c0` (= post-commit docs §18, code identique à `894ab8a` = tag `mvp-etape-c2-porte-cadre-migree`). Capture interactive Safari par Lætitia (mode session privée recommandé). Sentinelle pré-bascule (c.3).

Critère de validation post-bascule : **identité chiffre par chiffre** sur le total (7) + les trois premiers titres (avec leur cadre et leur fiabilité). Toute divergence → rollback à `mvp-etape-c2-porte-cadre-migree`.

I7 remplace I6 dans la pratique : I6 reste documenté comme « cas non atteignable au moment de la capture initiale », I7 documente le cas réel devenu atteignable.

---

## Procédure à chaque bascule (c.1, c.2, c.3, c.4)

1. Repasser §1 → §9 du `scenario-non-regression.md` — tout doit être vert.
2. Repasser **chacun** des invariants ci-dessus selon le même mode opératoire que la capture initiale.
3. **Comparer chiffre par chiffre** avec ce tableau. Toute divergence — même +1 ou −1 — déclenche un stop. Le périmètre du chantier 14 est *iso-comportement strict* ; aucune dérive éditoriale ou sémantique n'est tolérée pendant la migration.
4. Si tout est identique, commit atomique de la bascule + tag `mvp-etape-cN-porte-X-migree`.
5. Si une valeur diverge : rollback à la baseline `5655b03` ou au tag d'étape précédent. Pas de patch en avant.

---

## Mises à jour autorisées de ce journal

Ce document est **lecture seule** pendant le chantier 14. Les seules mises à jour autorisées sont :

- Ajout d'une valeur manquante (cellule *à compléter*) sans toucher aux autres.
- Insertion d'un nouvel invariant `I7+` si un cas non prévu est identifié — accompagné d'une justification écrite.
- À la clôture du chantier 14, ré-archivage explicite avec le tag `mvp-chantier-14-livre`.

Toute modification d'une valeur figée demande une décision explicite de Lætitia, écrite ici en commentaire daté et signée. Pas de réécriture silencieuse.
