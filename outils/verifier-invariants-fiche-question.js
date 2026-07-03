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
 *        qui existe dans CM.Referentiel, soit pointe explicitement CADRES_A_VENIR ;
 *        les surcharges parSignal des cellules (contrat v2) sont verifiees
 *        de meme, et leurs cles doivent etre des ids d'options Q1.
 *   I3 - toute option Q1 d'une fiche §4.4 a un cardEnTete egal a un id d'axe.
 *   I4 - toute option Q1 d'une fiche §4.6 a un axeEnTete egal a un id d'axe.
 *   I5 - aucune fiche ne melange les structures de deux variantes, et chaque
 *        fiche porte la structure attendue par sa variante.
 *   I6 - tout lien sortant (lienSortantPatrimonial, liensSortantsParNiveau)
 *        portant un cadreRef reference un cadre de VOCAB.cadres, et ne
 *        cumule pas cadreRef et ficheRef (garde-fou 28.gf.1, 02/07/2026 :
 *        un cadreRef inconnu ferait lever executer() au clic).
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

/* VOCAB.cadres — extraction statique (meme source que le filtre executer). */
var mVocab = html.match(/var VOCAB = \{[\s\S]*?cadres:\s*\[([^\]]+)\]/);
if (!mVocab) echec(2, 'VOCAB.cadres introuvable dans le HTML');
var cadresValides = (mVocab[1].match(/'([^']+)'/g) || []).map(function (c) { return c.slice(1, -1); });
if (!cadresValides.length) echec(2, 'VOCAB.cadres vide apres extraction');

function verifierLienSortant(fid, contexte, lien) {
  if (!lien) return;
  if (lien.cadreRef && lien.ficheRef)
    ko(fid, 'I6', contexte + ' : cadreRef et ficheRef cumules (contrat : cadreRef prioritaire, exclusif)');
  if (lien.cadreRef && cadresValides.indexOf(lien.cadreRef) < 0)
    ko(fid, 'I6', contexte + ' : cadreRef inconnu "' + lien.cadreRef + '" (absent de VOCAB.cadres)');
}

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
    var idsQ1 = (f.q1 && f.q1.options || []).map(function (o) { return o.id; });
    Object.keys(m).forEach(function (axe) {
      Object.keys(m[axe] || {}).forEach(function (niv) {
        var cell = m[axe][niv];
        if (cell && cell.ficheRef !== 'CADRES_A_VENIR' && !refExiste(cell.ficheRef))
          ko(fid, 'I2', 'matrice ' + axe + ' / ' + niv + ' : ficheRef inconnu "' + cell.ficheRef + '"');
        /* Surcharges par signal (contrat v2, 02/07/2026) : memes exigences
           que la cellule de base + cle = id d'option Q1 de la fiche. */
        Object.keys(cell && cell.parSignal || {}).forEach(function (sig) {
          if (idsQ1.indexOf(sig) < 0)
            ko(fid, 'I2', 'matrice ' + axe + ' / ' + niv + ' : parSignal cle inconnue "' + sig + '" (pas une option Q1)');
          var sur = cell.parSignal[sig];
          if (sur && sur.ficheRef !== 'CADRES_A_VENIR' && !refExiste(sur.ficheRef))
            ko(fid, 'I2', 'matrice ' + axe + ' / ' + niv + ' / parSignal.' + sig + ' : ficheRef inconnu "' + sur.ficheRef + '"');
        });
      });
    });
  }
  else { /* §4.3 */
    if (f.trios || f.matrice) ko(fid, 'I5', 'fiche §4.3 portant trios ou matrice');
    if (!f.colonnes) ko(fid, 'I5', 'fiche §4.3 sans colonnes');
  }

  /* I6 — liens sortants a cadreRef, communs aux variantes. */
  verifierLienSortant(fid, 'lienSortantPatrimonial', f.lienSortantPatrimonial);
  Object.keys(f.liensSortantsParNiveau || {}).forEach(function (niv) {
    verifierLienSortant(fid, 'liensSortantsParNiveau.' + niv, f.liensSortantsParNiveau[niv]);
  });
});

process.stdout.write('Invariants CM.FicheQuestion — ' + ids.length + ' fiches du catalogue (' + ids.join(', ') + ')\n\n');
if (echecs.length === 0) {
  process.stdout.write('  ✓ I1 variante valide\n');
  process.stdout.write('  ✓ I2 ficheRef reel dans CM.Referentiel ou CADRES_A_VENIR\n');
  process.stdout.write('  ✓ I3 cardEnTete des options Q1 (§4.4)\n');
  process.stdout.write('  ✓ I4 axeEnTete des options Q1 (§4.6)\n');
  process.stdout.write('  ✓ I5 structure coherente avec la variante\n');
  process.stdout.write('  ✓ I6 cadreRef des liens sortants dans VOCAB.cadres\n\nTout est coherent.\n');
  process.exit(0);
} else {
  process.stdout.write('  ✗ ' + echecs.length + ' violation(s) :\n' + echecs.join('\n') + '\n');
  process.exit(1);
}
