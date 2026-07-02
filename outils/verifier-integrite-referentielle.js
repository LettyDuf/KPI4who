#!/usr/bin/env node
/**
 * outils/verifier-integrite-referentielle.js
 *
 * Patron : vérificateur Node.js zéro-dépendance, script strict.
 * Sentinelle issue de l'audit code du 02/07/2026 (constat 27.3 du backlog) :
 * elle a validé les 104 fiches d'alors et est adoptée ici comme garde-fou
 * permanent d'intégrité référentielle.
 *
 * Cinq axes vérifiés dans cadre-indicateurs.html :
 *   1. Ids déclarés dans CM.Referentiel.ajouter — unicité (zéro doublon).
 *   2. Liens href="#fiche=ID" — chaque cible statique existe.
 *   3. Liens href="#fiche-q=ID" et champs ficheQCible — chaque cible
 *      existe dans CM.FicheQuestion.CATALOGUE (sentinelle CADRES_A_VENIR admise).
 *   4. Champs ficheRef — chaque valeur existe au référentiel
 *      (sentinelle CADRES_A_VENIR admise).
 *   5. Spans term-def — chacun porte sa définition inline en data-def.
 *
 * Les placeholders documentaires (#fiche=xxx dans les commentaires CSS/JS,
 * chantier 7.6) sont exclus par la liste PLACEHOLDERS_DOCUMENTAIRES.
 *
 * Usage : node outils/verifier-integrite-referentielle.js [chemin.html]
 * Exit 0 = propre, 1 = anomalies, 2 = erreur outil.
 */
'use strict';

var fs = require('fs');
var path = require('path');

/* Ids employés comme exemples dans des commentaires, jamais comme cibles
   réelles. Vérifié à l'audit du 02/07/2026 : 'xxx' n'apparaît que dans
   les commentaires du chantier 7.6 (style des liens et event delegation). */
var PLACEHOLDERS_DOCUMENTAIRES = { 'xxx': true };

var CHEMIN = process.argv[2] || path.join(__dirname, '..', 'cadre-indicateurs.html');

var src;
try {
  src = fs.readFileSync(CHEMIN, 'utf8');
} catch (e) {
  console.error('Impossible de lire ' + CHEMIN + ' : ' + e.message);
  process.exit(2);
}

/* ── Index offset → numéro de ligne ─────────────────────────────── */
var offsetsLignes = [0];
for (var i = 0; i < src.length; i++) {
  if (src.charCodeAt(i) === 10) offsetsLignes.push(i + 1);
}
function ligneDe(offset) {
  var lo = 0, hi = offsetsLignes.length - 1;
  while (lo < hi) {
    var mid = (lo + hi + 1) >> 1;
    if (offsetsLignes[mid] <= offset) lo = mid; else hi = mid - 1;
  }
  return lo + 1;
}

/* ── Trouver le crochet/accolade fermant apparié, en sautant chaînes
      et commentaires JS ──────────────────────────────────────────── */
function finBloc(depart, ouvrant, fermant) {
  var depth = 0;
  var n = src.length;
  for (var j = depart; j < n; j++) {
    var c = src[j];
    if (c === "'" || c === '"') {
      var q = c;
      j++;
      while (j < n && src[j] !== q) {
        if (src[j] === '\\') j++;
        j++;
      }
      continue;
    }
    if (c === '/' && src[j + 1] === '*') {
      j = src.indexOf('*/', j + 2);
      if (j === -1) return -1;
      j++;
      continue;
    }
    if (c === '/' && src[j + 1] === '/') {
      var nl = src.indexOf('\n', j);
      if (nl === -1) return -1;
      j = nl;
      continue;
    }
    if (c === ouvrant) depth++;
    else if (c === fermant) {
      depth--;
      if (depth === 0) return j;
    }
  }
  return -1;
}

var anomaliesTotales = 0;
function titre(t) { console.log('\n══ ' + t + ' ══'); }

/* ═══ 1. Ids du référentiel (CM.Referentiel.ajouter) + doublons ═══ */
titre('1. Ids déclarés dans CM.Referentiel.ajouter');

var idsReferentiel = {};          /* id → [lignes] */
var nbFiches = 0, nbBlocsAjouter = 0;
var reAjouter = /CM\.Referentiel\.ajouter\(\[/g;
var m;
while ((m = reAjouter.exec(src)) !== null) {
  nbBlocsAjouter++;
  var debutTableau = m.index + m[0].length - 1; /* position du [ */
  var finTableau = finBloc(debutTableau, '[', ']');
  if (finTableau === -1) {
    console.error('  ERREUR : bloc ajouter non fermé à la ligne ' + ligneDe(m.index));
    process.exit(2);
  }
  var corps = src.slice(debutTableau, finTableau);
  var reId = /id\s*:\s*'([^']+)'/g;
  var mi;
  while ((mi = reId.exec(corps)) !== null) {
    nbFiches++;
    var id = mi[1];
    var lg = ligneDe(debutTableau + mi.index);
    if (!idsReferentiel[id]) idsReferentiel[id] = [];
    idsReferentiel[id].push(lg);
  }
}
var idsUniques = Object.keys(idsReferentiel);
console.log('  Blocs ajouter([...]) trouvés : ' + nbBlocsAjouter);
console.log('  Déclarations id: extraites  : ' + nbFiches);
console.log('  Ids uniques                 : ' + idsUniques.length);

var doublons = idsUniques.filter(function (id) { return idsReferentiel[id].length > 1; });
if (doublons.length === 0) {
  console.log('  Doublons : AUCUN');
} else {
  console.log('  Doublons : ' + doublons.length);
  doublons.forEach(function (id) {
    console.log('    - "' + id + '" déclaré aux lignes ' + idsReferentiel[id].join(', '));
    anomaliesTotales++;
  });
}

/* ═══ Registre CADRES_A_VENIR (tableau de cadres projetés) ═══ */
var idsCadresAVenir = {};
var posCAV = src.search(/var CADRES_A_VENIR\s*=\s*\[/);
if (posCAV !== -1) {
  var debCAV = src.indexOf('[', posCAV);
  var finCAV = finBloc(debCAV, '[', ']');
  var corpsCAV = src.slice(debCAV, finCAV);
  var reIdCAV = /id\s*:\s*'([^']+)'/g;
  var mc;
  while ((mc = reIdCAV.exec(corpsCAV)) !== null) {
    idsCadresAVenir[mc[1]] = ligneDe(debCAV + mc.index);
  }
}
console.log('  Registre CADRES_A_VENIR (tableau, ids de cadres) : ' +
  Object.keys(idsCadresAVenir).length + ' entrées [' + Object.keys(idsCadresAVenir).join(', ') + ']');

function existeCible(id) {
  return idsReferentiel.hasOwnProperty(id) || idsCadresAVenir.hasOwnProperty(id);
}

/* ═══ Catalogue des fiches-questions (CM.FicheQuestion.CATALOGUE) ═══ */
var idsFichesQ = {};
var posCat = src.search(/var CATALOGUE\s*=\s*Object\.freeze\(\{/);
if (posCat !== -1) {
  var debCat = src.indexOf('{', posCat);
  var finCat = finBloc(debCat, '{', '}');
  var corpsCat = src.slice(debCat, finCat + 1);
  /* Clés de premier niveau : profondeur d'accolades = 1, motif clé: Object.freeze({ */
  var depth = 0;
  for (var k = 0; k < corpsCat.length; k++) {
    var ch = corpsCat[k];
    if (ch === "'" ) {
      k++;
      while (k < corpsCat.length && corpsCat[k] !== "'") { if (corpsCat[k] === '\\') k++; k++; }
      continue;
    }
    if (ch === '/' && corpsCat[k + 1] === '*') { k = corpsCat.indexOf('*/', k + 2) + 1; continue; }
    if (ch === '{') { depth++; continue; }
    if (ch === '}') { depth--; continue; }
    if (depth === 1) {
      var reste = corpsCat.slice(k);
      var mk = reste.match(/^\s*'?([A-Za-z0-9_-]+)'?\s*:\s*Object\.freeze\(\{/);
      if (mk) {
        idsFichesQ[mk[1]] = ligneDe(debCat + k);
        /* Se replacer juste avant le { ouvrant pour que la boucle le compte. */
        k += mk[0].length - 2;
      }
    }
  }
}

/* ═══ 2. Liens #fiche=ID ═══ */
titre('2. Liens href="#fiche=ID"');
var reFiche = /#fiche=([^"'\s&<\\)]+)/g;
var liensFiche = [];
while ((m = reFiche.exec(src)) !== null) {
  liensFiche.push({ id: m[1], ligne: ligneDe(m.index) });
}
var dynamiquesF = liensFiche.filter(function (l) { return !/^[A-Za-z0-9_-]+$/.test(l.id); });
var statiquesF = liensFiche.filter(function (l) {
  return /^[A-Za-z0-9_-]+$/.test(l.id) && !PLACEHOLDERS_DOCUMENTAIRES[l.id];
});
var cassesF = statiquesF.filter(function (l) { return !existeCible(l.id); });
console.log('  Occurrences #fiche= trouvées : ' + liensFiche.length +
  ' (statiques : ' + statiquesF.length + ', dynamiques/concaténées : ' + dynamiquesF.length + ')');
if (dynamiquesF.length) {
  dynamiquesF.forEach(function (l) {
    console.log('    [dynamique, non vérifiable] ligne ' + l.ligne + ' : #fiche=' + l.id.slice(0, 40));
  });
}
if (cassesF.length === 0) {
  console.log('  Cibles introuvables : AUCUNE');
} else {
  console.log('  Cibles introuvables : ' + cassesF.length);
  cassesF.forEach(function (l) {
    console.log('    - ligne ' + l.ligne + ' : #fiche=' + l.id);
    anomaliesTotales++;
  });
}

/* ═══ 3. Liens #fiche-q=ID vs catalogue CM.FicheQuestion ═══ */
titre('3. Liens href="#fiche-q=ID" vs CM.FicheQuestion.CATALOGUE');
console.log('  Fiches-questions déclarées : ' + Object.keys(idsFichesQ).length +
  ' [' + Object.keys(idsFichesQ).join(', ') + ']');
var reFicheQ = /#fiche-q=([^"'\s&<\\)]+)/g;
var liensFQ = [];
while ((m = reFicheQ.exec(src)) !== null) {
  liensFQ.push({ id: m[1], ligne: ligneDe(m.index) });
}
var dynFQ = liensFQ.filter(function (l) { return !/^[A-Za-z0-9_-]+$/.test(l.id); });
var statFQ = liensFQ.filter(function (l) {
  return /^[A-Za-z0-9_-]+$/.test(l.id) && !PLACEHOLDERS_DOCUMENTAIRES[l.id];
});
var cassesFQ = statFQ.filter(function (l) { return !idsFichesQ.hasOwnProperty(l.id); });
console.log('  Occurrences #fiche-q= : ' + liensFQ.length +
  ' (statiques : ' + statFQ.length + ', dynamiques : ' + dynFQ.length + ')');
dynFQ.forEach(function (l) {
  console.log('    [dynamique, non vérifiable] ligne ' + l.ligne + ' : #fiche-q=' + l.id.slice(0, 40));
});
if (cassesFQ.length === 0) {
  console.log('  Cibles introuvables : AUCUNE');
} else {
  console.log('  Cibles introuvables : ' + cassesFQ.length);
  cassesFQ.forEach(function (l) {
    console.log('    - ligne ' + l.ligne + ' : #fiche-q=' + l.id);
    anomaliesTotales++;
  });
}
/* ficheQCible : même famille de références */
var reFQC = /ficheQCible\s*:\s*'([^']+)'/g;
var fqc = [];
while ((m = reFQC.exec(src)) !== null) fqc.push({ id: m[1], ligne: ligneDe(m.index) });
var fqcCasses = fqc.filter(function (l) {
  return l.id !== 'CADRES_A_VENIR' && !idsFichesQ.hasOwnProperty(l.id);
});
console.log('  Champs ficheQCible : ' + fqc.length + ' (sentinelle CADRES_A_VENIR admise)');
if (fqcCasses.length === 0) {
  console.log('  ficheQCible invalides : AUCUN');
} else {
  console.log('  ficheQCible invalides : ' + fqcCasses.length);
  fqcCasses.forEach(function (l) {
    console.log('    - ligne ' + l.ligne + ' : ficheQCible \'' + l.id + '\'');
    anomaliesTotales++;
  });
}

/* ═══ 4. Champs ficheRef ═══ */
titre('4. Champs ficheRef');
var reFR = /ficheRef\s*:\s*'([^']+)'/g;
var refs = [];
while ((m = reFR.exec(src)) !== null) refs.push({ id: m[1], ligne: ligneDe(m.index) });
var refsCassees = refs.filter(function (l) {
  return l.id !== 'CADRES_A_VENIR' && !idsReferentiel.hasOwnProperty(l.id);
});
var nbSentinelles = refs.filter(function (l) { return l.id === 'CADRES_A_VENIR'; }).length;
console.log('  Champs ficheRef trouvés : ' + refs.length +
  ' (dont ' + nbSentinelles + ' sentinelles \'CADRES_A_VENIR\')');
if (refsCassees.length === 0) {
  console.log('  ficheRef invalides : AUCUN');
} else {
  console.log('  ficheRef invalides : ' + refsCassees.length);
  refsCassees.forEach(function (l) {
    console.log('    - ligne ' + l.ligne + ' : ficheRef \'' + l.id + '\'' +
      (idsCadresAVenir.hasOwnProperty(l.id) ? ' (id présent dans le tableau CADRES_A_VENIR des cadres, pas du référentiel)' : ''));
    anomaliesTotales++;
  });
}

/* ═══ 5. Spans term-def et attributs data-* ═══ */
titre('5. Spans term-def : mécanisme de ciblage');
var reTD = /<span\s+class=(?:\\?")term-def[^>]*>/g;
var spans = [];
while ((m = reTD.exec(src)) !== null) spans.push({ tag: m[0], ligne: ligneDe(m.index) });
console.log('  Spans term-def trouvés : ' + spans.length);
var attrsVus = {};
var sansDataDef = [];
spans.forEach(function (s) {
  var reAttr = /data-([a-z0-9-]+)=/g;
  var ma, aDataDef = false;
  while ((ma = reAttr.exec(s.tag)) !== null) {
    attrsVus['data-' + ma[1]] = (attrsVus['data-' + ma[1]] || 0) + 1;
    if (ma[1] === 'def') aDataDef = true;
  }
  if (!aDataDef) sansDataDef.push(s);
});
console.log('  Attributs data-* observés : ' +
  (Object.keys(attrsVus).length ? Object.keys(attrsVus).map(function (a) { return a + ' (' + attrsVus[a] + ')'; }).join(', ') : 'aucun'));
if (sansDataDef.length) {
  console.log('  Spans term-def SANS data-def : ' + sansDataDef.length);
  sansDataDef.forEach(function (s) {
    console.log('    - ligne ' + s.ligne + ' : ' + s.tag.slice(0, 90));
    anomaliesTotales++;
  });
} else {
  console.log('  Tous les spans portent data-def (définition inline, pas de référence par id).');
}

/* ═══ Bilan ═══ */
titre('BILAN');
console.log('  Anomalies totales : ' + anomaliesTotales);
process.exit(anomaliesTotales === 0 ? 0 : 1);
