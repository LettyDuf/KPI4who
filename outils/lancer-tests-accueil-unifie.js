#!/usr/bin/env node
/**
 * outils/lancer-tests-accueil-unifie.js
 *
 * Patron : runner Node.js zéro-dépendance, script strict.
 * Cousin de outils/lancer-tests-requete-metriques.js, mais avec un
 * périmètre différent — voir la note ci-dessous.
 *
 * Trois actions séquentielles :
 *   1. Régénère tests-accueil-unifie.html via construire-tests-accueil-unifie.js
 *   2. Régénère tests-accueil-unifie-sentinelles.html via
 *      construire-tests-accueil-unifie-sentinelles.js
 *   3. Parse-check syntaxique des deux harnais (concatène les blocs
 *      <script> de chaque fichier et appelle `node --check` dessus).
 *
 * Pourquoi PAS d'exécution headless complète comme
 * lancer-tests-requete-metriques.js : CM.AccueilUnifie est un adaptateur
 * d'entrée (UI), pas un service de domaine pur. Il dépend lourdement du
 * DOM — querySelector, querySelectorAll, dataset, classList, addEventListener
 * sur événements clics. Mocker tout ça en CLI demanderait JSDOM (~16 Mo
 * de dépendances) ou ~200 lignes de mock home-made. Doctrine zéro-dépendance
 * du projet : on s'arrête au parse-check syntaxique côté CLI, et on délègue
 * la validation comportementale au smoke-test interactif dans Safari.
 *
 * Chemin de validation complet :
 *   1. node outils/lancer-tests-accueil-unifie.js   (régénère + parse)
 *   2. Ouvrir tests-accueil-unifie.html dans Safari → 23/23 verts attendus
 *   3. Ouvrir tests-accueil-unifie-sentinelles.html dans Safari → 9/9 verts
 *
 * Usage :
 *   node outils/lancer-tests-accueil-unifie.js
 *
 * Exit codes :
 *   0 — régénération + parse-check OK pour les deux harnais.
 *   1 — parse-check raté sur au moins un harnais.
 *   2 — erreur d'E/S ou échec de régénération (générateur sous-jacent
 *       qui sort en code != 0).
 */

'use strict';

var fs            = require('fs');
var path          = require('path');
var child_process = require('child_process');
var os            = require('os');

var RACINE = path.resolve(__dirname, '..');

var GENERATEURS = [
  {
    nom: 'tests-accueil-unifie.html',
    generateur: path.join(__dirname, 'construire-tests-accueil-unifie.js'),
    cible:      path.join(RACINE, 'tests-accueil-unifie.html')
  },
  {
    nom: 'tests-accueil-unifie-sentinelles.html',
    generateur: path.join(__dirname, 'construire-tests-accueil-unifie-sentinelles.js'),
    cible:      path.join(RACINE, 'tests-accueil-unifie-sentinelles.html')
  }
];

/* ─── Étape 1+2 : régénération ──────────────────────────────────── */

for (var i = 0; i < GENERATEURS.length; i++) {
  var g = GENERATEURS[i];
  process.stdout.write('▸ Régénération ' + g.nom + ' …\n');
  var res = child_process.spawnSync('node', [g.generateur], {
    stdio: ['ignore', 'inherit', 'inherit']
  });
  if (res.status !== 0) {
    process.stderr.write('✗ Échec du générateur ' + path.basename(g.generateur) + '\n');
    process.exit(2);
  }
}

/* ─── Étape 3 : parse-check syntaxique ──────────────────────────── */

function extraireScripts(html) {
  var scripts = [];
  var re = /<script>([\s\S]*?)<\/script>/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    scripts.push(m[1]);
  }
  return scripts;
}

/* Prélude qui stubbe juste assez de DOM pour que le parser n'aboie pas.
   Aucune intention d'exécuter — c'est un parse-check, pas un runtime. */
var PRELUDE_STUB =
  "'use strict';\n" +
  "var window = {};\n" +
  "var document = {\n" +
  "  addEventListener: function(){},\n" +
  "  getElementById: function(){ return { classList:{}, textContent:'', appendChild:function(){}, addEventListener:function(){}, innerHTML:'' }; },\n" +
  "  querySelector: function(){ return null; },\n" +
  "  querySelectorAll: function(){ return []; },\n" +
  "  readyState: 'complete',\n" +
  "  body: {}\n" +
  "};\n" +
  "var setTimeout = function(){};\n" +
  "var console = { warn: function(){}, log: function(){}, error: function(){} };\n";

var bilanPasse = true;
for (var j = 0; j < GENERATEURS.length; j++) {
  var harnais = GENERATEURS[j];
  process.stdout.write('▸ Parse-check ' + harnais.nom + ' …\n');
  var html;
  try {
    html = fs.readFileSync(harnais.cible, 'utf8');
  } catch (e) {
    process.stderr.write('✗ Erreur lecture ' + harnais.cible + ' : ' + e.message + '\n');
    process.exit(2);
  }
  var scripts = extraireScripts(html);
  var combine = PRELUDE_STUB + scripts.join('\n// === bloc suivant ===\n');
  var tmp = path.join(os.tmpdir(), 'lancer-tests-accueil-' + Date.now() + '-' + j + '.js');
  fs.writeFileSync(tmp, combine, 'utf8');
  var verif = child_process.spawnSync('node', ['--check', tmp]);
  fs.unlinkSync(tmp);
  if (verif.status !== 0) {
    process.stderr.write('✗ Parse-check raté sur ' + harnais.nom + ' :\n');
    process.stderr.write(verif.stderr.toString());
    bilanPasse = false;
  } else {
    process.stdout.write('  ✓ ' + scripts.length + ' blocs <script> parsés sans erreur\n');
  }
}

if (!bilanPasse) {
  process.exit(1);
}

/* ─── Rappel final ─────────────────────────────────────────────── */
process.stdout.write('\n');
process.stdout.write('═══════════════════════════════════════════════════════════\n');
process.stdout.write('Régénération + parse-check OK sur les deux harnais.\n');
process.stdout.write('Validation comportementale à faire dans Safari (zéro-dépendance) :\n');
process.stdout.write('  • tests-accueil-unifie.html             → 23/23 verts attendus\n');
process.stdout.write('  • tests-accueil-unifie-sentinelles.html →  9/9 verts attendus\n');
process.stdout.write('═══════════════════════════════════════════════════════════\n');
process.exit(0);
