#!/usr/bin/env node
/**
 * outils/verifier-tout.js
 *
 * Patron : runner Node.js zéro-dépendance, script strict.
 * Filet qualité unique (règle Gesto « contrôles automatiques obligatoires ») :
 * lance, dans l'ordre, chaque test et chaque vérificateur déjà présents dans
 * outils/, puis s'arrête en échec si un seul d'entre eux échoue.
 * C'est ce script que GitHub lance avant toute publication.
 *
 * Usage :
 *   node outils/verifier-tout.js
 *
 * Exit codes :
 *   0 — tous les contrôles sont verts.
 *   1 — au moins un contrôle a échoué (le détail est affiché au-dessus).
 *
 * Pour ajouter un contrôle : l'ajouter à CONTROLES. Un contrôle est un
 * script Node de outils/ qui sort en code 0 si tout va bien.
 */

'use strict';

var path          = require('path');
var child_process = require('child_process');

var RACINE = path.resolve(__dirname, '..');

var CONTROLES = [
  { script: 'lancer-tests-requete-metriques.js',   role: 'Tests du cœur de requête (exécutés sans navigateur)' },
  { script: 'lancer-tests-accueil-unifie.js',      role: 'Harnais de l\'accueil unifié (régénération et syntaxe)' },
  { script: 'verifier-invariants-fiche-question.js', role: 'Invariants des fiches question' },
  { script: 'verifier-coherence-vocabulaire.js',   role: 'Vocabulaire du code identique au contrat (§10.3)' },
  { script: 'verifier-integrite-referentielle.js', role: 'Intégrité des renvois entre fiches' }
];

function lancer(controle) {
  console.log('\n══ ' + controle.role + ' (' + controle.script + ')');
  var resultat = child_process.spawnSync(
    process.execPath,
    [path.join(__dirname, controle.script)],
    { cwd: RACINE, stdio: 'inherit' }
  );
  return resultat.status === 0;
}

function principal() {
  var echecs = CONTROLES.filter(function (controle) { return !lancer(controle); });
  console.log('\n══ BILAN');
  if (echecs.length === 0) {
    console.log('  ✓ ' + CONTROLES.length + ' contrôles verts.');
    return 0;
  }
  echecs.forEach(function (controle) { console.log('  ✗ ' + controle.role + ' (' + controle.script + ')'); });
  return 1;
}

process.exit(principal());
