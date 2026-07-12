# Contrats du chantier 28 — vue fiche-cadre pédagogique

*Document compagnon, patron du chantier 14 : les contrats s'écrivent avant les consommateurs, le document est la référence, le code s'y conforme.*

## 0. Pourquoi ce document

Le chantier 28 livre une vue pédagogique par cadre méthodologique : le cadre raconté (origine, philosophie, panel, anti-patterns), ses indicateurs signature en cards, ses limites. Le chantier est multi-séances et touche un module nouveau, une route nouvelle et deux points de câblage existants : sans contrat posé d'abord, chaque séance réinventerait les frontières.

## 1. Périmètre et décisions de cadrage (12/07/2026, séance 2)

- **Périmètre éditorial : les 16 cadres de `CADRES{}`** (hors `generique`, voir § 1.1), cible validée par Lætitia. Séquencement : le patron éditorial est validé sur un lot pilote de 3 cadres (DORA, OKR, Gestion du changement — trois familles différentes) avant industrialisation des 13 autres.
- **Fiches patrimoniales admises, statut à part** : la vue accepte des entrées hors `VOCAB.cadres` (première candidate : la triangulation, 26.h.coll.4). Une entrée patrimoniale porte `statut:'patrimonial'` : pas de filtre accueil associé, pas de chip cliquable qui y mène depuis les cards, la navigation s'y fait par liens éditoriaux.
- **Entrées de navigation retenues** : (a) les chips de cadre déjà affichées sur les cards deviennent cliquables vers la fiche-cadre ; (b) le sélecteur de la chip *Cadre* de l'accueil reçoit un lien discret « comprendre ce cadre » par option. L'onglet des cadres existant n'est pas touché par ce chantier.
- **28.q1 TRANCHÉE (Lætitia, 12/07/2026 séance 2) : oui.** Les liens *Aller plus loin* des fiches-questions (`cadreRef`, option légère du 02/07/2026) basculent de l'accueil filtré vers la fiche-cadre. L'accueil filtré reste accessible depuis la fiche-cadre (« voir ses N indicateurs »). Câblage au jalon D.

### 1.1 Cas `generique`

`generique` n'est pas un cadre, c'est l'absence assumée de cadre (doctrine d'exclusivité). Il ne reçoit pas de fiche-cadre ; sa chip sur les cards reste non cliquable. Si le besoin pédagogique émerge (« pourquoi certains indicateurs n'ont pas de cadre »), c'est une entrée de Lexique, pas une fiche-cadre.

## 2. Schéma éditorial d'une fiche-cadre

Chaque entrée du catalogue porte les champs suivants. Langue et typographie : standard éditorial 2026-04 (aucun caractère IA-typé, anglicismes traduits au premier emploi, une idée par paragraphe).

| Champ | Rôle | Contrainte |
|---|---|---|
| `id` | Clé technique | = clé de `CADRES{}` pour un cadre ; libre (kebab-case) pour une patrimoniale |
| `statut` | `'cadre'` ou `'patrimonial'` | pilote le câblage navigation et les sentinelles |
| `origine` | Qui, quand, quelle œuvre | HTML enrichi, `<span class="traduction">` pour les titres d'œuvres canoniques |
| `philosophie` | Ce que le cadre croit du monde, 2 à 3 paragraphes | enseigne, n'affirme pas ; pas de jargon non glosé |
| `panel` | Les voix qui font autorité | mêmes noms que les panels déjà cités dans les fiches d'indicateurs du cadre |
| `signatures` | 2 à 5 `ficheRef` ordonnés éditorialement : les indicateurs canoniques | chaque `ficheRef` doit porter le tag du cadre dans `META` (sentinelle) |
| `lecture` | Comment les signatures se lisent ensemble, jamais isolément | 1 paragraphe |
| `antiPatterns` | 2 à 4 dérives du cadre lui-même (pas des indicateurs) | noms en `<span class="term-def">`, double signal si bloc vigilance |
| `quandChoisir` | Contextes où le cadre excelle / où il déçoit | honnêteté d'abord : chaque cadre a un domaine de validité |
| `allerPlusLoin` | Œuvres sources, 1 à 3 références | titres seuls, pas de liens externes (outil hors-ligne) |

**Séparation matière / source canonique (doctrine D3 transposée).** La fiche-cadre ne duplique ni `label`, ni `icone`, ni `famille`, ni `description` : ils restent dans `CADRES{}` et la vue les y lit. Les indicateurs non-signature tagués du cadre ne sont pas listés dans la donnée : la vue les dérive de `META` à l'exécution (« et N autres indicateurs », lien vers l'accueil filtré). Le catalogue ne porte que ce qui n'existe nulle part ailleurs.

## 3. Contrat de données

Zone balisée `CM.FICHE-CADRE-DATA:BEGIN/END` dans `cadre-indicateurs.html`, alimentée depuis une source markdown `fiche-cadre-source.md` par un générateur Node `outils/generer-fiches-cadres.js` (patron outillage : source markdown + générateur zéro-dépendance + zone balisée ; script strict, module runtime tolérant).

```js
var CATALOGUE_CADRES = Object.freeze({
  dora: Object.freeze({
    statut: 'cadre',
    origine: '...', philosophie: '...', panel: '...',
    signatures: ['o1', 'o2', 'o3', 'o4'],
    lecture: '...', antiPatterns: '...', quandChoisir: '...',
    allerPlusLoin: '...'
  }),
  triangulation: Object.freeze({ statut: 'patrimonial', ... })
});
```

## 4. API du module `CM.FicheCadre`

Patron : `CM.FicheQuestion` (séparation domaine / vue, composeur pur, adapter HTML).

```js
CM.FicheCadre = {
  /* Ids du catalogue, ordre canonique = ordre de CADRES{} puis patrimoniales. */
  listerIds: function() {},

  /* Objet figé d'une entrée. Throws si id inconnu. */
  obtenir: function(id) {},

  /* État de présentation. Pure, testable sans DOM. Retourne :
     { identite: {label, icone, famille} (lu de CADRES{} si statut cadre),
       origine, philosophie, panel,
       signatures: [fiches résolues via CM.Referentiel.chercher],
       autresIndicateurs: {n, cadreId} (dérivé de META, 0 si patrimonial),
       lecture, antiPatterns, quandChoisir, allerPlusLoin } */
  composer: function(id) {},

  /* Rendu HTML pur. Le consommateur insère via innerHTML.
     Les signatures sont rendues par CM.Composants.htmlCarte (réemploi,
     pas de rendu de card parallèle). */
  htmlFicheCadre: function(id) {}
};
```

**Notes architecturales.** Le module n'importe ni `CM.Panier` ni `CM.AccueilUnifie`. Le lien « voir ses N indicateurs » émet la route d'accueil filtré (`#` + état chips cadre), il n'appelle pas l'accueil. Un traducteur formule, il ne post-filtre pas : `composer` résout les signatures et compte les autres, il n'applique aucun filtre de pertinence.

## 5. Route et navigation

- **Route** : `#cadre=<id>`, enregistrée auprès de `CM.Hash` (regex stricte sur l'id, mêmes trois règles de sécurité que `#fiche=`). Toujours doubler la délégation de clic d'un listener hashchange (leçon du viewer).
- **Rendu** : dans le tiroir latéral (cohérence avec `#fiche=`), pas de page dédiée. Cmd/Ctrl+clic = nouvel onglet.
- **Entrées** : chips de cadre des cards (statut `cadre` seulement) ; lien par option du sélecteur *Cadre* de l'accueil. 28.q1 (Aller plus loin) tranchera la troisième entrée.

## 6. Conventions visuelles

`doc-cadre-visuel.md` fait foi. La fiche-cadre reprend la grammaire de la fiche d'indicateur (fond blanc franc, note pédagogique crème) ; la teinte et le fond de la **famille** (`FAMILLES{}`) signent l'en-tête, comme dans l'accordéon de l'ancienne porte cadre. Mockup d'en-tête à valider au jalon B (une seule décision visuelle attendue : la place de la famille).

## 7. Jalons

- **A — Contrats** : le présent document. ✅ 12/07/2026.
- **B — Squelette** ✅ 12/07/2026 (`65ca53f` `e7b96fe` + mockup) : module `CM.FicheCadre`, route `#cadre=` (deep link + hashchange + délégation accueil filtré), générateur `outils/generer-fiches-cadres.js` + `fiche-cadre-source.md` (pilote DORA). Les validations du § 8 (signatures ⊂ META, statut, existence au référentiel) vivent dans le générateur strict, à la génération ; un vérificateur autonome pourra doubler au jalon E. Mockup d'en-tête à arbitrer (`mockup-entete-fiche-cadre.html`, variante 1 implémentée).
- **C — Lot pilote éditorial** : DORA, OKR, Gestion du changement rédigés, smoke test Lætitia, patron éditorial gelé.
- **D — Industrialisation** : les 13 autres cadres par lots de 3-4, plus la patrimoniale triangulation (matière § du backlog 28). Tranchage 28.q1 et câblage des entrées de navigation.
- **E — Clôture** : audit liens, invariants, backlog, tag.

## 8. Tests et sentinelles

- Sentinelle nouvelle dans `outils/verifier-invariants-fiche-question.js` ou outil dédié : chaque `signatures[i]` existe au référentiel ET porte le cadre dans `META.cadres` (statut `cadre` seulement) ; unicité des ids ; `statut` ∈ {cadre, patrimonial}.
- Test node du composeur (pure) : résolution des signatures, comptage `autresIndicateurs`, throw sur id inconnu.
- Parse-check des zones générées via les harnais existants.

## Journal du document

- **v0.3 — 12/07/2026 (séance 2, suite).** Jalon B livré : module, route, générateur, CSS, mockup d'en-tête (2 variantes, arbitrage Lætitia attendu). Smoke test : ouvrir `#cadre=dora`.
- **v0.2 — 12/07/2026 (séance 2, suite).** 28.q1 tranchée par Lætitia : oui, *Aller plus loin* ouvre la fiche-cadre (câblage jalon D). Jalon B engagé.
- **v0.1 — 12/07/2026 (séance 2).** Création. Décisions de cadrage Lætitia : 16 cadres (séquencés pilote puis lots), triangulation même vue statut à part, entrées navigation chips cards + sélecteur Cadre. 28.q1 tranchée le jour même : Aller plus loin ouvre la fiche-cadre. Rédigé avec Claude Fable 5 — arbitrage d'allocation : chantiers patronnés (Lexique B.2, ventilation test n°1) délégués à des séances Sonnet/Opus.
