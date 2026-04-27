#!/usr/bin/env node
/**
 * outils/construire-tests-porte-niveau.js
 *
 * Patron : générateur Node.js zéro-dépendance, script strict.
 *
 * Pourquoi : en Chrome moderne sur file://, un iframe chargeant un autre
 * fichier local a une origine "null" distincte du parent, ce qui bloque
 * l'accès à `iframe.contentWindow`. Le harnais de tests ne peut donc
 * plus charger cadre-indicateurs.html pour aller y piocher CM.*.
 *
 * Différence avec construire-tests-panier.js : la porte niveau dépend de
 * 22 modules CM.* (Config, Roles, IndicateursMeta, RequeteMetriques,
 * DiagnosticProbleme, Composants, Stepper, VuePorteCadre, VuePorteNiveau,
 * etc.). On extrait donc une zone large entre les marqueurs
 * ZONE-TESTS-PORTE-NIVEAU — BEGIN/END, qui contient plusieurs blocs
 * <script>...</script>. Le générateur les fusionne en un seul mégascript
 * pour que le harnais l'inline dans son propre <script>.
 *
 * Mécanique :
 *   1. Lire cadre-indicateurs.html
 *   2. Extraire le bloc entre ZONE-TESTS-PORTE-NIVEAU BEGIN/END
 *   3. Retirer toutes les balises <script> et </script> du bloc
 *      (elles seraient parsées par le navigateur et casseraient le harnais)
 *   4. Convertir les commentaires HTML <!-- ... --> en commentaires JS
 *      pour préserver les en-têtes de modules dans le bloc fusionné
 *   5. Lire tests-porte-niveau.html
 *   6. Injecter entre les marqueurs TESTS-PORTE-NIVEAU-INJECTION BEGIN/END
 *
 * Contrat — source unique de vérité :
 *   - Le code testé reste écrit une seule fois, dans cadre-indicateurs.html.
 *   - Le générateur recopie ce code à chaque exécution. Pas de divergence
 *     possible tant qu'on régénère après chaque modif d'un module CM.*.
 *
 * Usage :
 *   node outils/construire-tests-porte-niveau.js
 *
 * Exit codes :
 *   0 — succès, tests-porte-niveau.html régénéré.
 *   1 — marqueurs manquants ou mal appariés (source ou cible).
 *   2 — erreur d'E/S.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/* ─── Chemins (résolus depuis la racine du projet, pas depuis cwd) ─ */
var RACINE        = path.resolve(__dirname, '..');
var SOURCE_PROD   = path.join(RACINE, 'cadre-indicateurs.html');
var CIBLE_HARNAIS = path.join(RACINE, 'tests-porte-niveau.html');

/* ─── Marqueurs source (commentaires HTML — bloc large, multi-modules) ─ */
var MARQUEUR_SOURCE_BEGIN = '<!-- ══ ZONE-TESTS-PORTE-NIVEAU — BEGIN';
var MARQUEUR_SOURCE_END   = '<!-- ══ ZONE-TESTS-PORTE-NIVEAU — END ══ -->';

/* ─── Marqueurs cible (commentaires HTML dans le harnais) ─────────── */
var MARQUEUR_CIBLE_BEGIN  = '<!-- TESTS-PORTE-NIVEAU-INJECTION-BEGIN -->';
var MARQUEUR_CIBLE_END    = '<!-- TESTS-PORTE-NIVEAU-INJECTION-END -->';

/* ═════════════════════════════════════════════════════════════════
   Fonctions pures — extraction, normalisation, injection
   ═════════════════════════════════════════════════════════════════ */

/**
 * Extrait le bloc de code entre les marqueurs BEGIN et END (inclus).
 * Retourne la chaîne, marqueurs compris, pour que le bloc injecté
 * soit lui-même auto-descriptif et repérable dans le harnais.
 *
 * @param {string} source      contenu complet du fichier source
 * @param {string} marqueurDeb fragment de ligne de début (recherche par indexOf)
 * @param {string} marqueurFin ligne complète de fin
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
 * Convertit le bloc source (HTML mêlé de <script>) en JavaScript pur
 * valide, fusionné en un seul mégascript :
 *   - retire les balises <script ...> et </script>
 *   - convertit les commentaires HTML <!-- ... --> en commentaires JS
 *   - préserve la structure (sauts de ligne, indentation, modules)
 *
 * @param {string} bloc bloc HTML extrait entre les marqueurs source
 * @returns {string} JavaScript valide à insérer dans un seul <script>
 */
function fusionnerScripts(bloc) {
  /* 1. Retirer toutes les balises <script ...> et </script>.
        Les regex sont écrites simples : on n'attend pas d'attributs
        complexes dans la zone source. */
  var sansScript = bloc
    .replace(/<script[^>]*>/g, '')
    .replace(/<\/script>/g, '');

  /* 2. Convertir les commentaires HTML en commentaires JS pour qu'ils
        ne cassent pas le parsing JavaScript (en JS, <!-- est un
        commentaire de ligne en mode "annex B" du navigateur, mais
        --> ne l'est qu'en début de ligne — comportement fragile,
        on préfère convertir en /* ... *\/ explicite). */
  var sansHtmlComments = sansScript.replace(
    /<!--([\s\S]*?)-->/g,
    function(_match, contenu) { return '/*' + contenu + '*/'; }
  );

  return sansHtmlComments;
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
  var avant = cible.substring(0, idxDeb + marqueurDeb.length);
  var apres = cible.substring(idxFin);
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

  /* ─── 4. Fusion <script> multiples → JS unique ────────────────── */
  var blocJs = fusionnerScripts(bloc);

  /* ─── 5. Composition HTML (wrapper <script> unique) ───────────── */
  var injection =
    '<script>\n' + blocJs + '\n</script>';

  /* ─── 6. Injection ───────────────────────────────────────────── */
  var resultat;
  try {
    resultat = injecterBloc(
      cible, MARQUEUR_CIBLE_BEGIN, MARQUEUR_CIBLE_END, injection,
      'tests-porte-niveau.html'
    );
  } catch (e) {
    process.stderr.write(e.message + '\n');
    process.exit(1);
  }

  /* ─── 7. Écriture ────────────────────────────────────────────── */
  try {
    fs.writeFileSync(CIBLE_HARNAIS, resultat, 'utf8');
  } catch (e) {
    process.stderr.write('Erreur d\'écriture sur ' + CIBLE_HARNAIS + ' : ' + e.message + '\n');
    process.exit(2);
  }

  /* ─── 8. Rapport ─────────────────────────────────────────────── */
  var lignesSource = bloc.split('\n').length;
  var lignesJs     = blocJs.split('\n').length;
  process.stdout.write(
    'OK — zone-tests-porte-niveau injectée dans tests-porte-niveau.html '
    + '(' + lignesSource + ' lignes source → ' + lignesJs + ' lignes JS, '
    + blocJs.length + ' octets).\n'
  );
}

main();
