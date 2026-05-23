#!/usr/bin/env node
'use strict';
/*
 * outils/verifier-invariants-fiche-question.js
 *
 * Sentinelle des invariants du catalogue CM.FicheQuestion (doc compagnon
 * doc-contrats-fiche-question.md §7). Verifie sur l'etat reel du catalogue,
 * pas sur des fiches synthetiques.
 *
 * Invariants verifies :
 *   I1 - toute fiche declare une variante valide (§4.3, §4.4, §4.6).
 *   I2 - toute card de trio (§4.4) ou cellule de matrice (§4.6) a un ficheRef
 *        qui existe dans CM.Referentiel, soit pointe explicitement CADRES_A_VENIR.
 *   I3 - toute option Q1 d'une fiche §4.4 a un cardEnTete egal a un id d'axe.
 *   I4 - toute option Q1 d'une fiche §4.6 a un axeEnTete egal a un id d'axe.
 *   I5 - aucune fiche ne melange les structures de deux variantes, et chaque
 *        fiche porte la structure attendue par sa variante.
 *
 * Patron : verifier-coherence-vocabulaire.js (verificateur node zero-dependance).
 * Exit codes : 0 succes, 1 invariant viole, 2 erreur d'extraction/E-S.
 */
var fs   = require('fs');
var path = require('path');
var CIBLE = path.join(__dirname, '..', 'cadre-indicateurs.html');

function echec(code, msg) {
  process.stderr.write('verifier-invariants-fiche-question: ' + msg + '\n');
  process.exit(code);
}

var html;
try { html = fs.readFileSync(CIBLE, 'utf-8'); }
catch (e) { echec(2, 'lecture de cadre-indicateurs.html : ' + e.message); }

/* Reconstruction de CM.Referentiel (module + blocs ajouter) et CM.FicheQuestion. */
global.CM = {};
global.document = { createElement: function () {
  return { style: {}, setAttribute: function () {}, appendChild: function () {} };
} };

function extraire(debut, finMarqueur) {
  var b = html.indexOf(debut);
  var e = html.indexOf(finMarqueur);
  if (b < 0 || e < 0) echec(2, 'bornes introuvables pour : ' + debut);
  return html.slice(b, e);
}
try {
  eval(extraire('CM.Referentiel = (function', '/* ══ CM.Referentiel — END'));
  var blocs = html.match(/CM\.Referentiel\.ajouter\(\[[\s\S]*?\n\]\);/g) || [];
  blocs.forEach(function (b) { eval(b); });
  eval(extraire('CM.FicheQuestion = (function', '/* ══ CM.FicheQuestion — END'));
} catch (e) { echec(2, 'evaluation des modules : ' + e.message); }

var fq  = global.CM.FicheQuestion;
var ref = global.CM.Referentiel;
if (!fq || !ref) echec(2, 'CM.FicheQuestion ou CM.Referentiel absent apres evaluation');

var VARIANTES = ['§4.3', '§4.4', '§4.6'];
function refExiste(id) { try { return !!ref.chercher(id); } catch (e) { return false; } }

var echecs = [];
function ko(fid, inv, msg) { echecs.push('  [' + fid + '] ' + inv + ' : ' + msg); }

var ids = fq.listerIds();
ids.forEach(function (fid) {
  var f = fq.obtenir(fid);

  /* I1 */
  if (VARIANTES.indexOf(f.variante) < 0) {
    ko(fid, 'I1', 'variante invalide : ' + f.variante);
    return; /* sans variante connue, les autres invariants n'ont pas de sens */
  }

  if (f.variante === '§4.4') {
    if (!f.trios || !f.axes || !f.q1) ko(fid, 'I5', 'fiche §4.4 incomplete (trios/axes/q1 manquant)');
    if (f.matrice) ko(fid, 'I5', 'fiche §4.4 portant aussi une matrice (§4.6)');
    var axes4 = (f.axes || []).map(function (a) { return a.id; });
    (f.q1 && f.q1.options || []).forEach(function (o) {
      if (axes4.indexOf(o.cardEnTete) < 0) ko(fid, 'I3', 'option Q1 "' + o.id + '" : cardEnTete inconnu "' + o.cardEnTete + '"');
    });
    Object.keys(f.trios || {}).forEach(function (niv) {
      (f.trios[niv] || []).forEach(function (card) {
        if (card.ficheRef !== 'CADRES_A_VENIR' && !refExiste(card.ficheRef))
          ko(fid, 'I2', 'trio ' + niv + ' / axe ' + card.id + ' : ficheRef inconnu "' + card.ficheRef + '"');
      });
    });
  }
  else if (f.variante === '§4.6') {
    if (!f.matrice || !f.axes || !f.q1) ko(fid, 'I5', 'fiche §4.6 incomplete (matrice/axes/q1 manquant)');
    if (f.trios) ko(fid, 'I5', 'fiche §4.6 portant aussi des trios (§4.4)');
    var axes6 = (f.axes || []).map(function (a) { return a.id; });
    (f.q1 && f.q1.options || []).forEach(function (o) {
      if (axes6.indexOf(o.axeEnTete) < 0) ko(fid, 'I4', 'option Q1 "' + o.id + '" : axeEnTete inconnu "' + o.axeEnTete + '"');
    });
    var m = f.matrice || {};
    Object.keys(m).forEach(function (axe) {
      Object.keys(m[axe] || {}).forEach(function (niv) {
        var cell = m[axe][niv];
        if (cell && cell.ficheRef !== 'CADRES_A_VENIR' && !refExiste(cell.ficheRef))
          ko(fid, 'I2', 'matrice ' + axe + ' / ' + niv + ' : ficheRef inconnu "' + cell.ficheRef + '"');
      });
    });
  }
  else { /* §4.3 */
    if (f.trios || f.matrice) ko(fid, 'I5', 'fiche §4.3 portant trios ou matrice');
    if (!f.colonnes) ko(fid, 'I5', 'fiche §4.3 sans colonnes');
  }
});

process.stdout.write('Invariants CM.FicheQuestion — ' + ids.length + ' fiches du catalogue (' + ids.join(', ') + ')\n\n');
if (echecs.length === 0) {
  process.stdout.write('  ✓ I1 variante valide\n');
  process.stdout.write('  ✓ I2 ficheRef reel dans CM.Referentiel ou CADRES_A_VENIR\n');
  process.stdout.write('  ✓ I3 cardEnTete des options Q1 (§4.4)\n');
  process.stdout.write('  ✓ I4 axeEnTete des options Q1 (§4.6)\n');
  process.stdout.write('  ✓ I5 structure coherente avec la variante\n\nTout est coherent.\n');
  process.exit(0);
} else {
  process.stdout.write('  ✗ ' + echecs.length + ' violation(s) :\n' + echecs.join('\n') + '\n');
  process.exit(1);
}
