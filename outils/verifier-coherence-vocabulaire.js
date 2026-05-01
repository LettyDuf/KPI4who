#!/usr/bin/env node
/**
 * outils/verifier-coherence-vocabulaire.js
 *
 * Patron : vérificateur Node.js zéro-dépendance, script strict.
 * Sentinelle pour le constat collatéral n°6 (chantier 1.ter, 30/04/2026) :
 * VOCAB.cadres et CADRES{} dans le code avaient divergé de §10.3 du doc
 * compagnon, créant un bug runtime sur 27 % de la porte « Par mon cadre ».
 * Cet outil vérifie l'invariant qui aurait évité l'incident.
 *
 * Doctrine vérifiée — `project_document_compagnon_contrats` :
 *   §10.3 du doc compagnon est la SOURCE UNIQUE de vérité des vocabulaires
 *   du filtre. Le code doit s'y conformer, jamais l'inverse.
 *
 * Trois sources comparées :
 *   1. VOCAB dans cadre-indicateurs.html (~ligne 4531) — vocabulaires
 *      utilisés par CM.RequeteMetriques pour valider les filtres.
 *   2. CADRES{} dans cadre-indicateurs.html (~ligne 4061) — catalogue des
 *      cadres méthodologiques (ids = clés de l'objet).
 *   3. doc-contrats-chantier-14.md §10.3 — signature documentaire.
 *      tagsThematiques renvoie au §10.2 (liste numérotée des 14 libellés).
 *
 * Invariants vérifiés :
 *   - INVARIANT FORT (cadres) : VOCAB.cadres ⇔ Object.keys(CADRES) ⇔ §10.3.cadres
 *     Ces trois ensembles doivent être strictement égaux.
 *   - INVARIANT SIMPLE (autres) : pour X ∈ {niveau, branche, domaine, type,
 *     tags, tagsThematiques, fiabilite, maturite}, VOCAB.X ⇔ §10.3.X.
 *
 * Ce que l'outil NE fait PAS :
 *   - Vérifier que META[id].cadres ne référence que des ids de CADRES (audit
 *     éditorial, déjà fait au chantier 1.ter et présumé tenu par convention).
 *   - Vérifier les valeurs dans inventaire-schema-metriques.md §3 (transitif :
 *     §10.3 est documenté comme transcription stricte de §3, donc si §10.3
 *     dérive de §3, c'est §10.3 qu'on corrige).
 *
 * Usage :
 *   node outils/verifier-coherence-vocabulaire.js
 *
 * Exit codes :
 *   0 — tous les vocabulaires cohérents.
 *   1 — au moins une divergence détectée (rapport détaillé en stderr).
 *   2 — erreur d'extraction (fichier introuvable, regex désynchronisée, etc.).
 */

'use strict';

var fs   = require('fs');
var path = require('path');
var vm   = require('vm');

/* ─── Chemins ───────────────────────────────────────────────────── */
var RACINE = path.resolve(__dirname, '..');
var CODE   = path.join(RACINE, 'cadre-indicateurs.html');
var DOC    = path.join(RACINE, 'doc-contrats-chantier-14.md');

/* ─── Lecture ───────────────────────────────────────────────────── */
function lire(p) {
  try { return fs.readFileSync(p, 'utf-8'); }
  catch (e) {
    process.stderr.write('Erreur lecture ' + p + ' : ' + e.message + '\n');
    process.exit(2);
  }
}
var src = lire(CODE);
var doc = lire(DOC);

/* ─── Extraction VOCAB depuis le code ──────────────────────────────
   Stratégie : on extrait le bloc `var VOCAB = { ... };` via regex et on
   l'évalue dans un sandbox vm. Plus robuste qu'un parsing maison du
   tableau JS — toute évolution du formatage reste tolérée tant que le
   bloc reste syntaxiquement valide. */
function extraireBlocAffectation(source, nom) {
  var re = new RegExp('var\\s+' + nom + '\\s*=\\s*(\\{[\\s\\S]*?\\});', 'm');
  var m = re.exec(source);
  if (!m) {
    process.stderr.write('Bloc `var ' + nom + ' = {...}` introuvable dans cadre-indicateurs.html.\n');
    process.exit(2);
  }
  return m[1];
}

function evaluerObjet(litteral, nom) {
  try {
    var sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext('result = (' + litteral + ');', sandbox);
    return sandbox.result;
  } catch (e) {
    process.stderr.write('Évaluation de ' + nom + ' impossible : ' + e.message + '\n');
    process.exit(2);
  }
}

var VOCAB  = evaluerObjet(extraireBlocAffectation(src, 'VOCAB'),  'VOCAB');
var CADRES = evaluerObjet(extraireBlocAffectation(src, 'CADRES'), 'CADRES');

/* ─── Extraction §10.3 du doc compagnon ─────────────────────────────
   La signature documentaire est dans un bloc fenced ``` ... ``` qui suit
   immédiatement « ### 10.3 Signature `executer(filtre)` ». Chaque ligne
   de clause a la forme :
     niveau?:           Array<NiveauId>,        // descr...
   On capture la description après `//`, puis on extrait les valeurs
   quotées (single ou double). Pour `tagsThematiques`, la description
   pointe vers §10.2 — on parse alors §10.2 séparément. */
function extraireSection103(doc) {
  var i = doc.indexOf('### 10.3 Signature');
  if (i === -1) {
    process.stderr.write('§10.3 introuvable dans doc-contrats-chantier-14.md.\n');
    process.exit(2);
  }
  var fence = doc.indexOf('```', i);
  if (fence === -1) {
    process.stderr.write('Bloc fenced de §10.3 introuvable.\n');
    process.exit(2);
  }
  var fin = doc.indexOf('```', fence + 3);
  return doc.substring(fence + 3, fin);
}

function extraireValeursDeCommentaire(commentaire) {
  /* Récupère les chaînes quotées 'xxx' ou "xxx" de la portion utile du
     commentaire. Convention §10.3 : la liste de valeurs est suivie d'un
     tiret cadratin `—` ou d'une parenthèse `(...)` qui ouvre une
     explication ; tout ce qui est quoté APRÈS l'un de ces séparateurs
     est de l'explication, pas une valeur. Sans ce filtre, le parser
     prendrait par ex. 'operationnel' dans « pertinent uniquement sur
     les fiches niveau 'operationnel' » comme une valeur de `branche`. */
  var sep = commentaire.search(/\s—|\s\(/);
  var utile = sep === -1 ? commentaire : commentaire.slice(0, sep);
  var out = [];
  var re = /'([^']+)'|"([^"]+)"/g;
  var m;
  while ((m = re.exec(utile)) !== null) out.push(m[1] || m[2]);
  return out;
}

function parserSignature103(bloc) {
  /* Retourne { clause: [valeurs...], ... } pour chaque ligne de clause.
     Les clauses dont le commentaire ne liste pas de valeurs (ex. limite,
     tagsThematiques qui renvoie à §10.2) reçoivent null — à compléter
     par d'autres parseurs. */
  var out = {};
  var lignes = bloc.split('\n');
  for (var i = 0; i < lignes.length; i++) {
    var ligne = lignes[i];
    var m = /^\s*(\w+)\??:\s*[^,]*,?\s*\/\/\s*(.+)$/.exec(ligne);
    if (!m) continue;
    var nom = m[1];
    var commentaire = m[2];
    var valeurs = extraireValeursDeCommentaire(commentaire);
    out[nom] = valeurs.length > 0 ? valeurs : null;
  }
  return out;
}

function extraireTagsThematiques102(doc) {
  /* §10.2 — liste numérotée « 1. `xxx` — descr ». On capture le texte
     entre les premiers backticks de chaque ligne numérotée. */
  var i = doc.indexOf('### 10.2 Vocabulaire fermé des tags thématiques');
  if (i === -1) {
    process.stderr.write('§10.2 introuvable dans doc-contrats-chantier-14.md.\n');
    process.exit(2);
  }
  /* On scanne jusqu'au prochain titre `###` */
  var fin = doc.indexOf('\n### ', i + 1);
  var bloc = doc.substring(i, fin === -1 ? doc.length : fin);
  var out = [];
  var re = /^\d+\.\s+`([^`]+)`/gm;
  var m;
  while ((m = re.exec(bloc)) !== null) out.push(m[1]);
  if (out.length === 0) {
    process.stderr.write('Aucun tag thématique trouvé en §10.2.\n');
    process.exit(2);
  }
  return out;
}

var sig103 = parserSignature103(extraireSection103(doc));

/* tagsThematiques pointe vers §10.2 — on injecte la liste explicite. */
sig103.tagsThematiques = extraireTagsThematiques102(doc);

/* §10.3 nomme `fiabiliteMin` et `maturiteMin`, mais le code stocke
   `fiabilite` et `maturite` dans VOCAB. On normalise pour la comparaison. */
if (sig103.fiabiliteMin) { sig103.fiabilite = sig103.fiabiliteMin; delete sig103.fiabiliteMin; }
if (sig103.maturiteMin)  { sig103.maturite  = sig103.maturiteMin;  delete sig103.maturiteMin; }

/* ─── Comparaisons ───────────────────────────────────────────────── */
function trier(arr) { return arr.slice().sort(); }
function diff(a, b) {
  var sa = new Set(a), sb = new Set(b);
  var aSeul = a.filter(function (x) { return !sb.has(x); });
  var bSeul = b.filter(function (x) { return !sa.has(x); });
  return { aSeul: aSeul, bSeul: bSeul, ok: aSeul.length === 0 && bSeul.length === 0 };
}

var divergences = [];
var ok = [];

/* INVARIANT FORT — cadres : 3 sources */
var idsCadres = Object.keys(CADRES);
var dCV = diff(VOCAB.cadres,    idsCadres);
var dV3 = diff(VOCAB.cadres,    sig103.cadres || []);
var dC3 = diff(idsCadres,       sig103.cadres || []);
if (dCV.ok && dV3.ok && dC3.ok) {
  ok.push('cadres         : ' + VOCAB.cadres.length + ' valeurs alignées (VOCAB.cadres = CADRES{} = §10.3)');
} else {
  divergences.push({
    nom: 'cadres',
    detail: [
      '  VOCAB.cadres : ' + JSON.stringify(trier(VOCAB.cadres)),
      '  CADRES{}     : ' + JSON.stringify(trier(idsCadres)),
      '  §10.3        : ' + JSON.stringify(trier(sig103.cadres || [])),
      '  Δ VOCAB \\ CADRES{}  : ' + JSON.stringify(dCV.aSeul),
      '  Δ CADRES{} \\ VOCAB  : ' + JSON.stringify(dCV.bSeul),
      '  Δ VOCAB \\ §10.3     : ' + JSON.stringify(dV3.aSeul),
      '  Δ §10.3 \\ VOCAB     : ' + JSON.stringify(dV3.bSeul),
      '  Δ CADRES{} \\ §10.3  : ' + JSON.stringify(dC3.aSeul),
      '  Δ §10.3 \\ CADRES{}  : ' + JSON.stringify(dC3.bSeul)
    ].join('\n')
  });
}

/* INVARIANT SIMPLE — VOCAB.X ⇔ §10.3.X pour tous les autres */
var clauses = ['niveau', 'branche', 'domaine', 'type', 'tags', 'tagsThematiques', 'fiabilite', 'maturite'];
for (var j = 0; j < clauses.length; j++) {
  var c = clauses[j];
  var v = VOCAB[c] || [];
  var d = sig103[c] || [];
  if (d.length === 0) {
    /* Pas de référence documentaire trouvée — ce n'est pas une divergence,
       c'est juste un trou de couverture côté outil (par ex. limite). */
    continue;
  }
  var r = diff(v, d);
  if (r.ok) {
    ok.push((c + '              ').slice(0, 15) + ': ' + v.length + ' valeurs alignées (code = doc)');
  } else {
    divergences.push({
      nom: c,
      detail: [
        '  VOCAB.' + c + ' : ' + JSON.stringify(trier(v)),
        '  §10.3      : ' + JSON.stringify(trier(d)),
        '  Δ code \\ doc : ' + JSON.stringify(r.aSeul),
        '  Δ doc \\ code : ' + JSON.stringify(r.bSeul)
      ].join('\n')
    });
  }
}

/* ─── Rapport ───────────────────────────────────────────────────── */
process.stdout.write('Vérification cohérence vocabulaire — ' + new Date().toISOString().slice(0, 10) + '\n\n');
for (var k = 0; k < ok.length; k++) process.stdout.write('  ✓ ' + ok[k] + '\n');

if (divergences.length === 0) {
  process.stdout.write('\nTout est cohérent.\n');
  process.exit(0);
}

process.stderr.write('\n');
for (var l = 0; l < divergences.length; l++) {
  process.stderr.write('  ✗ ' + divergences[l].nom + ' : DIVERGENCE\n');
  process.stderr.write(divergences[l].detail + '\n\n');
}
process.stderr.write(divergences.length + ' divergence(s) détectée(s).\n');
process.exit(1);
