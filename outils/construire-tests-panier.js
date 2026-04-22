#!/usr/bin/env node
/**
 * outils/construire-tests-panier.js
 *
 * Patron : générateur Node.js zéro-dépendance, script strict.
 *
 * Pourquoi : en Chrome moderne sur file://, un iframe chargeant un autre
 * fichier local a une origine "null" distincte du parent, ce qui bloque
 * l'accès à `iframe.contentWindow`. Le harnais de tests ne peut donc
 * plus charger cadre-indicateurs.html pour aller y piocher `CM.Panier`.
 *
 * Mécanique : on extrait le bloc `CM.Panier` de cadre-indicateurs.html
 * (entre les marqueurs BEGIN/END posés à l'étape 9.A.3.a) et on l'inline
 * directement dans tests-panier.html (entre les marqueurs
 * CM.PANIER-INJECTION-BEGIN / END). Le harnais teste alors le module
 * dans sa propre page — même-origine garantie, plus de blocage.
 *
 * Contrat — source unique de vérité :
 *   - Le code testé reste écrit une seule fois, dans cadre-indicateurs.html.
 *   - Le générateur recopie ce code à chaque exécution. Pas de divergence
 *     possible tant qu'on régénère après chaque modif de `CM.Panier`.
 *
 * Usage :
 *   node outils/construire-tests-panier.js
 *
 * Exit codes :
 *   0 — succès, tests-panier.html régénéré.
 *   1 — marqueurs manquants ou mal appariés (source ou cible).
 *   2 — erreur d'E/S.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/* ─── Chemins (résolus depuis la racine du projet, pas depuis cwd) ─ */
var RACINE        = path.resolve(__dirname, '..');
var SOURCE_PROD   = path.join(RACINE, 'cadre-indicateurs.html');
var CIBLE_HARNAIS = path.join(RACINE, 'tests-panier.html');

/* ─── Marqueurs (doivent apparaître exactement une fois, chacun) ─── */
var MARQUEUR_SOURCE_BEGIN = '/* ══ CM.Panier — BEGIN';
var MARQUEUR_SOURCE_END   = '/* ══ CM.Panier — END ══ */';
var MARQUEUR_CIBLE_BEGIN  = '<!-- CM.PANIER-INJECTION-BEGIN -->';
var MARQUEUR_CIBLE_END    = '<!-- CM.PANIER-INJECTION-END -->';

/* ═════════════════════════════════════════════════════════════════
   Fonctions pures — extraction et injection
   ═════════════════════════════════════════════════════════════════ */

/**
 * Extrait le bloc de code entre les marqueurs BEGIN et END (inclus).
 * Retourne la chaîne, marqueurs compris, pour que le bloc injecté
 * soit lui-même auto-descriptif et repérable dans le harnais.
 *
 * @param {string} source      contenu complet du fichier source
 * @param {string} marqueurDeb ligne de début (première occurrence recherchée)
 * @param {string} marqueurFin ligne de fin (première occurrence après le début)
 * @param {string} nomFichier  pour les messages d'erreur
 * @returns {string} le bloc extrait, marqueurs compris
 * @throws {Error}  si les marqueurs sont absents ou mal appariés
 */
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
  /* On remonte jusqu'au début de la ligne du marqueur de début,
     on descend jusqu'à la fin de la ligne du marqueur de fin.
     Ainsi le bloc extrait garde son indentation et sa fin de ligne. */
  var debutLigne = source.lastIndexOf('\n', idxDeb) + 1;
  var finLigne   = source.indexOf('\n', idxFin + marqueurFin.length);
  if (finLigne === -1) finLigne = source.length;
  return source.substring(debutLigne, finLigne);
}

/**
 * Remplace le contenu entre les deux marqueurs de la cible par le bloc
 * fourni. Les marqueurs eux-mêmes sont préservés dans le résultat.
 *
 * @param {string} cible       contenu complet du fichier cible
 * @param {string} marqueurDeb marqueur HTML de début (préservé)
 * @param {string} marqueurFin marqueur HTML de fin (préservé)
 * @param {string} bloc        contenu à injecter entre les marqueurs
 * @param {string} nomFichier  pour les messages d'erreur
 * @returns {string} le contenu de la cible avec le bloc injecté
 * @throws {Error}  si les marqueurs sont absents ou mal appariés
 */
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
  var avant  = cible.substring(0, idxDeb + marqueurDeb.length);
  var apres  = cible.substring(idxFin);
  return avant + '\n' + bloc + '\n' + apres;
}

/* ═════════════════════════════════════════════════════════════════
   Orchestration
   ═════════════════════════════════════════════════════════════════ */

function main() {
  /* ─── 1. Lecture source ──────────────────────────────────────── */
  var source;
  try {
    source = fs.readFileSync(SOURCE_PROD, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur de lecture de ' + SOURCE_PROD + ' : ' + e.message + '\n');
    process.exit(2);
  }

  /* ─── 2. Lecture cible ───────────────────────────────────────── */
  var cible;
  try {
    cible = fs.readFileSync(CIBLE_HARNAIS, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur de lecture de ' + CIBLE_HARNAIS + ' : ' + e.message + '\n');
    process.exit(2);
  }

  /* ─── 3. Extraction ──────────────────────────────────────────── */
  var bloc;
  try {
    bloc = extraireBloc(
      source, MARQUEUR_SOURCE_BEGIN, MARQUEUR_SOURCE_END, 'cadre-indicateurs.html'
    );
  } catch (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  }

  /* ─── 4. Composition HTML (wrapper <script> + prélude CM) ───────
     La zone d'injection vit entre deux commentaires HTML dans le harnais,
     donc le bloc JS doit être enveloppé dans ses propres balises <script>.
     Le prélude déclare `window.CM` avant que le bloc ne pose `CM.Panier`. */
  var injection =
    '<script>window.CM = window.CM || {};</script>\n' +
    '<script>\n' + bloc + '\n</script>';

  /* ─── 5. Injection ───────────────────────────────────────────── */
  var resultat;
  try {
    resultat = injecterBloc(
      cible, MARQUEUR_CIBLE_BEGIN, MARQUEUR_CIBLE_END, injection, 'tests-panier.html'
    );
  } catch (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  }

  /* ─── 6. Écriture ────────────────────────────────────────────── */
  try {
    fs.writeFileSync(CIBLE_HARNAIS, resultat, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur d\'écriture sur ' + CIBLE_HARNAIS + ' : ' + e.message + '\n');
    process.exit(2);
  }

  /* ─── 7. Rapport ─────────────────────────────────────────────── */
  var lignes = bloc.split('\n').length;
  process.stdout.write(
    'OK — bloc CM.Panier injecté dans tests-panier.html (' + lignes + ' lignes, '
    + bloc.length + ' octets).\n'
  );
}

main();
