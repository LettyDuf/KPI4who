#!/usr/bin/env node
/* Générateur de la zone CM.FICHE-CADRE-DATA de cadre-indicateurs.html
   depuis fiche-cadre-source.md (chantier 28, jalon B).

   Patron outillage du projet : source markdown + générateur zéro-dépendance
   + zone balisée. Le script est STRICT (toute anomalie = exit 1) ; le module
   runtime qui consomme la zone est tolérant.

   Usage : node outils/generer-fiches-cadres.js
   Exit codes : 0 OK, 1 anomalie de source, 2 erreur d'environnement. */

'use strict';
var fs = require('fs');
var path = require('path');

var RACINE = path.join(__dirname, '..');
var SOURCE = path.join(RACINE, 'fiche-cadre-source.md');
var CIBLE  = path.join(RACINE, 'cadre-indicateurs.html');
var BEGIN  = '/* CM.FICHE-CADRE-DATA:BEGIN — généré par outils/generer-fiches-cadres.js, ne pas éditer à la main */';
var END    = '/* CM.FICHE-CADRE-DATA:END */';

var CHAMPS = ['statut', 'origine', 'philosophie', 'panel', 'signatures',
              'lecture', 'antiPatterns', 'quandChoisir', 'quandSeMefier', 'allerPlusLoin'];
var STATUTS = ['cadre', 'patrimonial'];
var ID_VALIDE = /^[a-z0-9-]{1,20}$/;

function echec(msg) { console.error('ÉCHEC — ' + msg); process.exit(1); }

if (!fs.existsSync(SOURCE) || !fs.existsSync(CIBLE)) {
  console.error('Fichier source ou cible introuvable.'); process.exit(2);
}
var md = fs.readFileSync(SOURCE, 'utf8');
var html = fs.readFileSync(CIBLE, 'utf8');

/* ── Parse : sections "## id" puis champs "**champ** : valeur" ── */
var sections = md.split(/\n## /).slice(1);
if (sections.length === 0) echec('aucune entrée "## id" dans la source.');

var entrees = [];
sections.forEach(function(sec) {
  var lignes = sec.split('\n');
  var id = lignes[0].trim();
  if (!ID_VALIDE.test(id)) echec('id invalide : "' + id + '"');
  var corps = lignes.slice(1).join('\n');
  var entree = { id: id };
  /* Chaque champ court de son marqueur au marqueur suivant ou à la fin. */
  var re = /\*\*([a-zA-Z]+)\*\*\s*:\s*([\s\S]*?)(?=\n\*\*[a-zA-Z]+\*\*\s*:|$)/g;
  var m;
  while ((m = re.exec(corps)) !== null) {
    entree[m[1]] = m[2].trim().replace(/\n{2,}/g, '\n\n');
  }
  CHAMPS.forEach(function(c) {
    if (!entree[c]) echec(id + ' : champ manquant "' + c + '"');
  });
  if (STATUTS.indexOf(entree.statut) === -1) {
    echec(id + ' : statut inconnu "' + entree.statut + '"');
  }
  entree.signatures = entree.signatures.split(',').map(function(x) { return x.trim(); });
  if (entree.signatures.length < 2 || entree.signatures.length > 5) {
    echec(id + ' : ' + entree.signatures.length + ' signatures (contrat : 2 à 5).');
  }
  entree.signatures.forEach(function(f) {
    if (!ID_VALIDE.test(f)) echec(id + ' : ficheRef invalide "' + f + '"');
  });
  entrees.push(entree);
});

/* ── Validations croisées contre le HTML (script strict) ── */
/* 1. statut cadre → id présent dans CADRES{} ; 2. signature existe au
   référentiel ; 3. statut cadre → chaque signature porte le cadre en META. */
entrees.forEach(function(e) {
  if (e.statut === 'cadre') {
    var reCadre = new RegExp('^\\s{4}' + e.id + ':\\s*\\{', 'm');
    if (!reCadre.test(html)) echec(e.id + ' : statut cadre mais absent de CADRES{}.');
  }
  e.signatures.forEach(function(f) {
    if (html.indexOf("id:'" + f + "'") === -1) {
      echec(e.id + ' : signature "' + f + '" introuvable au référentiel.');
    }
    if (e.statut === 'cadre') {
      var reMeta = new RegExp("'" + f + "':\\s*\\{[^}]*cadres:\\[[^\\]]*'" + e.id + "'");
      if (!reMeta.test(html)) {
        echec(e.id + ' : la signature "' + f + '" ne porte pas le cadre dans META.');
      }
    }
  });
});

/* ── Émission de la zone ── */
function jsString(s) {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}
var lignesJs = ['var CATALOGUE_CADRES = Object.freeze({'];
entrees.forEach(function(e, i) {
  lignesJs.push("  '" + e.id + "': Object.freeze({");
  lignesJs.push("    statut: '" + e.statut + "',");
  ['origine', 'philosophie', 'panel'].forEach(function(c) {
    lignesJs.push('    ' + c + ': ' + jsString(e[c]) + ',');
  });
  lignesJs.push("    signatures: ['" + e.signatures.join("', '") + "'],");
  ['lecture', 'antiPatterns', 'quandChoisir', 'quandSeMefier', 'allerPlusLoin'].forEach(function(c, k) {
    lignesJs.push('    ' + c + ': ' + jsString(e[c]) + (k < 4 ? ',' : ''));
  });
  lignesJs.push('  })' + (i < entrees.length - 1 ? ',' : ''));
});
lignesJs.push('});');
var zone = BEGIN + '\n' + lignesJs.join('\n') + '\n' + END;

var iB = html.indexOf(BEGIN);
var iE = html.indexOf(END);
if (iB === -1 || iE === -1) echec('balises CM.FICHE-CADRE-DATA introuvables dans la cible.');
html = html.slice(0, iB) + zone + html.slice(iE + END.length);
fs.writeFileSync(CIBLE, html, 'utf8');

console.log('OK — ' + entrees.length + ' fiche(s)-cadre(s) injectée(s) dans CATALOGUE_CADRES (' +
  entrees.filter(function(e) { return e.statut === 'cadre'; }).length + ' cadre(s), ' +
  entrees.filter(function(e) { return e.statut === 'patrimonial'; }).length + ' patrimoniale(s)).');
