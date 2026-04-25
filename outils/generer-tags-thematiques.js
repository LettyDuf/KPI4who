#!/usr/bin/env node
/**
 * outils/generer-tags-thematiques.js
 *
 * Patron : générateur Node.js zéro-dépendance, script strict.
 *
 * Pourquoi : la matrice des tags thématiques (84 fiches × 14 tags) vit en
 * éditorial dans `inventaire-tags-thematiques.md` §6 — c'est la source
 * unique de vérité. Le code (`cadre-indicateurs.html`) en a besoin sous
 * forme JavaScript pour que CM.IndicateursMeta.tagsThematiquesDe(id)
 * puisse répondre. Réécrire la matrice à la main dans le HTML viole
 * l'unicité de source : ce générateur fait le pont à chaque exécution.
 *
 * Mécanique :
 *   1. Lit `inventaire-tags-thematiques.md`.
 *   2. Extrait la légende des colonnes (§6 « ### Légende des colonnes »)
 *      pour mapper abréviations → libellés complets des tags thématiques.
 *   3. Extrait la matrice (§6 « ### Matrice 84 × 14 ») entre l'entête et
 *      la fin de section.
 *   4. Pour chaque ligne : lit `id`, lit chaque colonne, retient les
 *      colonnes marquées `x`, traduit en libellés via la légende.
 *   5. Sérialise en `CM._tagsThematiquesData = { 'id1': [...], ... };`.
 *   6. Réécrit la zone balisée
 *      `/​* CM.TAGS-THEMATIQUES-DATA:BEGIN ... END *​/` dans
 *      `cadre-indicateurs.html`.
 *
 * Contrat — source unique de vérité :
 *   - La matrice markdown est la seule source autorisée.
 *   - Le bloc JS dans le HTML est régénéré à chaque exécution.
 *   - Aucune édition manuelle entre les marqueurs.
 *
 * Validation stricte (échoue à la première anomalie) :
 *   - légende : exactement 14 entrées, abréviations uniques.
 *   - matrice : entête présent, séparateur présent, lignes ≥ 1.
 *   - chaque cellule marquée doit pointer sur une abréviation connue.
 *   - chaque fiche doit recevoir ≥ 1 tag (règle 1-4 documentée §6).
 *   - chaque fiche doit recevoir ≤ 4 tags (règle 1-4 documentée §6).
 *
 * Usage :
 *   node outils/generer-tags-thematiques.js
 *
 * Exit codes :
 *   0 — succès, zone régénérée, total fiches affiché.
 *   1 — légende ou matrice manquante / mal formée.
 *   2 — règle 1-4 violée (orpheline ou >4 tags).
 *   3 — marqueurs absents ou mal appariés dans le HTML cible.
 *   4 — erreur d'E/S.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/* ─── Chemins (résolus depuis la racine du projet, pas depuis cwd) ─ */
var RACINE         = path.resolve(__dirname, '..');
var SOURCE_MATRICE = path.join(RACINE, 'inventaire-tags-thematiques.md');
var CIBLE_HTML     = path.join(RACINE, 'cadre-indicateurs.html');

/* ─── Marqueurs (doivent apparaître exactement une fois, chacun) ─── */
var BORNE_LEGENDE_DEB  = '### Légende des colonnes';
var BORNE_LEGENDE_FIN  = '### Matrice 84 × 14';
var BORNE_MATRICE_DEB  = '### Matrice 84 × 14';
var BORNE_MATRICE_FIN  = '## 7.';
var MARQ_DATA_BEGIN    = '/* CM.TAGS-THEMATIQUES-DATA:BEGIN';
var MARQ_DATA_END      = '/* CM.TAGS-THEMATIQUES-DATA:END */';

/* ═════════════════════════════════════════════════════════════════
   Parseurs purs — chaîne entrée → structure de données
   ═════════════════════════════════════════════════════════════════ */

function echec(code, message) {
  process.stderr.write('generer-tags-thematiques: ' + message + '\n');
  process.exit(code);
}

/**
 * Extrait un sous-bloc markdown délimité par deux titres.
 */
function extraireSection(source, debut, fin, nom) {
  var i = source.indexOf(debut);
  if (i < 0) echec(1, 'borne « ' + debut + ' » introuvable (section ' + nom + ').');
  var j = source.indexOf(fin, i + debut.length);
  if (j < 0) echec(1, 'borne « ' + fin + ' » introuvable après « ' + debut + ' » (section ' + nom + ').');
  return source.slice(i, j);
}

/**
 * Parse la légende `| abbr. | tag thématique |` → { 'tra': 'transversalité', ... }.
 */
function parserLegende(bloc) {
  var legende = {};
  var lignes = bloc.split(/\r?\n/);
  for (var i = 0; i < lignes.length; i++) {
    var l = lignes[i].trim();
    /* Skipper titre, entête tableau, séparateur, lignes vides. */
    if (!l.startsWith('|')) continue;
    if (l.startsWith('|---') || l.startsWith('| ---')) continue;
    if (l.indexOf('Abbr.') !== -1) continue;
    var cellules = decouperCellules(l);
    if (cellules.length !== 2) continue;
    var abbr = cellules[0];
    var libelle = cellules[1];
    if (!abbr || !libelle) continue;
    if (legende[abbr]) echec(1, "abréviation dupliquée dans la légende : '" + abbr + "'.");
    legende[abbr] = libelle;
  }
  if (Object.keys(legende).length !== 14) {
    echec(1, 'la légende doit contenir exactement 14 entrées, trouvé : ' +
          Object.keys(legende).length + '.');
  }
  return legende;
}

/**
 * Découpe `| a | b | c |` → ['a','b','c'] avec trim, sans cellules de bord vides.
 */
function decouperCellules(ligne) {
  var brut = ligne.split('|');
  /* Premier et dernier élément sont vides à cause des | de bord. */
  var cellules = brut.slice(1, brut.length - 1);
  return cellules.map(function(c) { return c.trim(); });
}

/**
 * Parse la matrice. Retourne { 'id': ['libellé1', 'libellé2', ...], ... }.
 */
function parserMatrice(bloc, legende) {
  var lignes = bloc.split(/\r?\n/);
  var enteteAbbr = null;       /* tableau d'abréviations dans l'ordre des colonnes */
  var resultat = {};
  var nbFiches = 0;

  for (var i = 0; i < lignes.length; i++) {
    var l = lignes[i].trim();
    if (!l.startsWith('|')) continue;
    if (l.startsWith('|---') || l.startsWith('| ---')) continue;

    var cellules = decouperCellules(l);
    if (cellules.length === 0) continue;

    /* Détection de l'entête : première ligne qui commence par 'id'. */
    if (enteteAbbr === null) {
      if (cellules[0].toLowerCase() !== 'id') continue;
      enteteAbbr = cellules.slice(2);    /* skip 'id', 'nom court' */
      for (var k = 0; k < enteteAbbr.length; k++) {
        if (!legende[enteteAbbr[k]]) {
          echec(1, "abréviation de colonne inconnue dans l'entête de la matrice : '" +
                enteteAbbr[k] + "'.");
        }
      }
      if (enteteAbbr.length !== 14) {
        echec(1, "l'entête de la matrice doit avoir 14 colonnes de tags, trouvé : " +
              enteteAbbr.length + '.');
      }
      continue;
    }

    /* Lignes de données : | id | nom court | x ou vide × 14 |. */
    var id = cellules[0];
    if (!id) continue;
    var marquees = cellules.slice(2);   /* skip id et nom court */
    if (marquees.length !== enteteAbbr.length) {
      echec(1, "fiche '" + id + "' : nombre de cellules de tags = " + marquees.length +
            " (attendu : " + enteteAbbr.length + ").");
    }
    var tagsFiche = [];
    for (var c = 0; c < marquees.length; c++) {
      var marque = marquees[c].toLowerCase();
      if (marque === '' ) continue;
      if (marque !== 'x') {
        echec(1, "fiche '" + id + "' colonne '" + enteteAbbr[c] +
              "' : valeur inattendue '" + marquees[c] + "' (attendu : '' ou 'x').");
      }
      tagsFiche.push(legende[enteteAbbr[c]]);
    }
    /* Règle 1-4 documentée §6 de l'inventaire. */
    if (tagsFiche.length === 0) {
      echec(2, "fiche '" + id + "' n'a aucun tag (règle minimale = 1).");
    }
    if (tagsFiche.length > 4) {
      echec(2, "fiche '" + id + "' a " + tagsFiche.length + " tags (règle maximale = 4).");
    }
    if (resultat[id]) {
      echec(1, "fiche dupliquée dans la matrice : '" + id + "'.");
    }
    resultat[id] = tagsFiche;
    nbFiches++;
  }

  if (nbFiches === 0) echec(1, 'matrice vide : aucune ligne de fiche détectée.');
  return resultat;
}

/* ═════════════════════════════════════════════════════════════════
   Sérialiseur — structure → JS pretty-printed
   ═════════════════════════════════════════════════════════════════ */

function sérialiser(data) {
  var ids = Object.keys(data);
  var lignes = [];
  /* Calcul largeur id pour alignement visuel propre. */
  var largeurId = 0;
  for (var i = 0; i < ids.length; i++) {
    if (ids[i].length > largeurId) largeurId = ids[i].length;
  }
  for (var j = 0; j < ids.length; j++) {
    var id = ids[j];
    var tags = data[id];
    var key = "'" + id + "':";
    while (key.length < largeurId + 4) key += ' ';
    var listeTags = tags.map(function(t) { return "'" + t + "'"; }).join(', ');
    var virgule = j < ids.length - 1 ? ',' : '';
    lignes.push('  ' + key + ' [' + listeTags + ']' + virgule);
  }
  return 'CM._tagsThematiquesData = {\n' + lignes.join('\n') + '\n};';
}

/* ═════════════════════════════════════════════════════════════════
   Injection — réécrit la zone balisée dans cadre-indicateurs.html
   ═════════════════════════════════════════════════════════════════ */

function injecter(htmlSource, blocJs) {
  var iDeb = htmlSource.indexOf(MARQ_DATA_BEGIN);
  if (iDeb < 0) echec(3, "marqueur BEGIN absent de cadre-indicateurs.html : " + MARQ_DATA_BEGIN);
  /* Cherche la fin de la ligne du marqueur (commentaire BEGIN). */
  var iFinLigneDeb = htmlSource.indexOf('\n', iDeb);
  if (iFinLigneDeb < 0) echec(3, "marqueur BEGIN sans fin de ligne.");

  var iFin = htmlSource.indexOf(MARQ_DATA_END, iFinLigneDeb);
  if (iFin < 0) echec(3, "marqueur END absent ou avant BEGIN : " + MARQ_DATA_END);

  /* Vérifie unicité — un second BEGIN après le premier END serait suspect. */
  var iSecondBegin = htmlSource.indexOf(MARQ_DATA_BEGIN, iFin);
  if (iSecondBegin > 0) echec(3, "marqueur BEGIN apparaît plusieurs fois — anomalie.");

  /* Reconstruit : tout avant la fin de ligne du BEGIN + bloc JS + marqueur END + reste. */
  var avant = htmlSource.slice(0, iFinLigneDeb + 1);
  var apres = htmlSource.slice(iFin);
  return avant + blocJs + '\n' + apres;
}

/* ═════════════════════════════════════════════════════════════════
   Pipeline principal
   ═════════════════════════════════════════════════════════════════ */

function principal() {
  var sourceMd;
  var cibleHtml;
  try {
    sourceMd = fs.readFileSync(SOURCE_MATRICE, 'utf-8');
  } catch (e) {
    echec(4, "lecture impossible de " + SOURCE_MATRICE + " : " + e.message);
  }
  try {
    cibleHtml = fs.readFileSync(CIBLE_HTML, 'utf-8');
  } catch (e) {
    echec(4, "lecture impossible de " + CIBLE_HTML + " : " + e.message);
  }

  var blocLegende = extraireSection(sourceMd, BORNE_LEGENDE_DEB, BORNE_LEGENDE_FIN, 'légende');
  var blocMatrice = extraireSection(sourceMd, BORNE_MATRICE_DEB, BORNE_MATRICE_FIN, 'matrice');

  var legende = parserLegende(blocLegende);
  var data    = parserMatrice(blocMatrice, legende);

  var blocJs = sérialiser(data);
  var nouvelHtml = injecter(cibleHtml, blocJs);

  try {
    fs.writeFileSync(CIBLE_HTML, nouvelHtml, 'utf-8');
  } catch (e) {
    echec(4, "écriture impossible de " + CIBLE_HTML + " : " + e.message);
  }

  /* Statistiques de contrôle. */
  var ids = Object.keys(data);
  var totalAssignations = 0;
  for (var i = 0; i < ids.length; i++) totalAssignations += data[ids[i]].length;
  var moyenne = (totalAssignations / ids.length).toFixed(2);

  process.stdout.write(
    'OK — ' + ids.length + ' fiches injectées dans CM._tagsThematiquesData ' +
    '(' + totalAssignations + ' assignations totales, moyenne ' + moyenne + ' tags/fiche).\n'
  );
}

principal();
