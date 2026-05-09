#!/usr/bin/env node
/**
 * outils/construire-tests-accueil-unifie.js
 *
 * Patron : générateur Node.js zéro-dépendance, script strict.
 * Calque strict de outils/construire-tests-requete-metriques.js.
 *
 * Pourquoi : en Chrome moderne sur file://, un iframe chargeant un autre
 * fichier local a une origine "null" distincte du parent, ce qui bloque
 * l'accès à `iframe.contentWindow`. Le harnais de tests ne peut donc
 * pas charger cadre-indicateurs.html pour aller y piocher CM.AccueilUnifie.
 *
 * Mécanique : on extrait le bloc CM.AccueilUnifie de cadre-indicateurs.html
 * (entre les marqueurs JS BEGIN/END qui existent déjà dans le module) et on
 * l'inline directement dans tests-accueil-unifie.html (entre les marqueurs
 * HTML CM.ACCUEIL-UNIFIE-INJECTION-BEGIN / END). Le harnais teste alors le
 * module dans sa propre page — même-origine garantie.
 *
 * Contrat — source unique de vérité :
 *   - Le code testé reste écrit une seule fois, dans cadre-indicateurs.html.
 *   - Le générateur recopie ce code à chaque exécution. Pas de divergence
 *     possible tant qu'on régénère après chaque modif de CM.AccueilUnifie.
 *   - Les ports CM.Preferences, CM.RequeteMetriques, CM.IndicateursMeta,
 *     CM.Composants et CM.Referentiel sont montés en doubles de test
 *     (stubs in-memory) déclarés en dur dans le harnais (hors zone
 *     d'injection) — ils ne sont pas régénérés.
 *
 * Usage :
 *   node outils/construire-tests-accueil-unifie.js
 *
 * Exit codes :
 *   0 — succès, tests-accueil-unifie.html régénéré.
 *   1 — marqueurs manquants ou mal appariés (source ou cible).
 *   2 — erreur d'E/S.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/* ─── Chemins (résolus depuis la racine du projet, pas depuis cwd) ─ */
var RACINE        = path.resolve(__dirname, '..');
var SOURCE_PROD   = path.join(RACINE, 'cadre-indicateurs.html');
var CIBLE_HARNAIS = path.join(RACINE, 'tests-accueil-unifie.html');

/* ─── Marqueurs (doivent apparaître exactement une fois, chacun) ─── */
var MARQUEUR_SOURCE_BEGIN = '/* ══ CM.AccueilUnifie — BEGIN';
var MARQUEUR_SOURCE_END   = '/* ══ CM.AccueilUnifie — END ══ */';
var MARQUEUR_CIBLE_BEGIN  = '<!-- CM.ACCUEIL-UNIFIE-INJECTION-BEGIN -->';
var MARQUEUR_CIBLE_END    = '<!-- CM.ACCUEIL-UNIFIE-INJECTION-END -->';

/* ═════════════════════════════════════════════════════════════════
   Fonctions pures — extraction et injection
   ═════════════════════════════════════════════════════════════════ */

function extraireBloc(source, marqueurDeb, marqueurFin, nomFichier) {
  var idxDeb = source.indexOf(marqueurDeb);
  if (idxDeb === -1) {
    throw new Error(
      'Marqueur de début introuvable dans ' + nomFichier + ' : "' + marqueurDeb + '"'
    );
  }
  var idxFin = source.indexOf(marqueurFin, idxDeb + marqueurDeb.length);
  if (idxFin === -1) {
    throw new Error(
      'Marqueur de fin introuvable après le début dans ' + nomFichier + ' : "' + marqueurFin + '"'
    );
  }
  var debutLigne = source.lastIndexOf('\n', idxDeb) + 1;
  var finLigne   = source.indexOf('\n', idxFin + marqueurFin.length);
  if (finLigne === -1) finLigne = source.length;
  return source.substring(debutLigne, finLigne);
}

function injecterBloc(cible, marqueurDeb, marqueurFin, bloc, nomFichier) {
  var idxDeb = cible.indexOf(marqueurDeb);
  if (idxDeb === -1) {
    throw new Error(
      'Marqueur de début introuvable dans ' + nomFichier + ' : "' + marqueurDeb + '"'
    );
  }
  var idxFin = cible.indexOf(marqueurFin, idxDeb + marqueurDeb.length);
  if (idxFin === -1) {
    throw new Error(
      'Marqueur de fin introuvable après le début dans ' + nomFichier + ' : "' + marqueurFin + '"'
    );
  }
  var avant = cible.substring(0, idxDeb + marqueurDeb.length);
  var apres = cible.substring(idxFin);
  return avant + '\n' + bloc + '\n' + apres;
}

/* ═════════════════════════════════════════════════════════════════
   Orchestration
   ═════════════════════════════════════════════════════════════════ */

function main() {
  var source;
  try {
    source = fs.readFileSync(SOURCE_PROD, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur de lecture de ' + SOURCE_PROD + ' : ' + e.message + '\n');
    process.exit(2);
  }

  var cible;
  try {
    cible = fs.readFileSync(CIBLE_HARNAIS, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur de lecture de ' + CIBLE_HARNAIS + ' : ' + e.message + '\n');
    process.exit(2);
  }

  var bloc;
  try {
    bloc = extraireBloc(
      source, MARQUEUR_SOURCE_BEGIN, MARQUEUR_SOURCE_END, 'cadre-indicateurs.html'
    );
  } catch (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  }

  var injection = '<script>\n' + bloc + '\n</script>';

  var resultat;
  try {
    resultat = injecterBloc(
      cible, MARQUEUR_CIBLE_BEGIN, MARQUEUR_CIBLE_END, injection, 'tests-accueil-unifie.html'
    );
  } catch (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  }

  try {
    fs.writeFileSync(CIBLE_HARNAIS, resultat, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur d\'écriture sur ' + CIBLE_HARNAIS + ' : ' + e.message + '\n');
    process.exit(2);
  }

  var lignes = bloc.split('\n').length;
  process.stdout.write(
    'OK — bloc CM.AccueilUnifie injecté dans tests-accueil-unifie.html ('
    + lignes + ' lignes, ' + bloc.length + ' octets).\n'
  );
}

main();
