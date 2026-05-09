#!/usr/bin/env node
/**
 * outils/construire-tests-accueil-unifie-sentinelles.js
 *
 * Patron : générateur Node.js zéro-dépendance, script strict.
 * Cousin de outils/construire-tests-accueil-unifie.js, en plus complet :
 * il extrait CINQ zones de cadre-indicateurs.html au lieu d'une, parce
 * que les sentinelles I1-I6 doivent tourner sur le référentiel réel
 * (89 fiches, taggings réels) et pas sur des fiches synthétiques.
 *
 * Pourquoi : la section A (tests-accueil-unifie.html) teste la sémantique
 * du module en isolation, sur des stubs. Mais les invariants I1-I6 du
 * journal-invariants-23g.md sont calés sur le contenu éditorial (89
 * fiches, Programme = 9, DORA = 4, etc.). Pour les vérifier, il faut
 * monter le vrai référentiel et la vraie zone META.
 *
 * Mécanique : on extrait depuis cadre-indicateurs.html
 *   1. Le module CM.Referentiel        — délimité par les marqueurs JS
 *      « CM.Referentiel — BEGIN/END » (commentaires bloc autour du module)
 *   2. Le module CM.IndicateursMeta    — idem, marqueurs JS
 *   3. Les 15 blocs CM.Referentiel.ajouter([...]) qui peuplent les 89 fiches
 *      — délimités par les marqueurs HTML « CM.REFERENTIEL.DATA — BEGIN/END »
 *      (commentaires HTML englobants)
 *   4. Le module CM.RequeteMetriques   — marqueurs JS
 *   5. Le module CM.AccueilUnifie      — marqueurs JS
 *
 * Les 5 blocs sont concaténés dans cet ordre (Referentiel module → Meta
 * module → Données → RequeteMetriques → AccueilUnifie) puis injectés
 * en une seule passe entre les marqueurs <!-- CM.SENTINELLES-INJECTION-BEGIN/END -->
 * dans tests-accueil-unifie-sentinelles.html.
 *
 * Contrat — source unique de vérité :
 *   - Le code et les données restent écrits une seule fois, dans
 *     cadre-indicateurs.html.
 *   - Le générateur recopie tout à chaque exécution. Pas de divergence
 *     possible tant qu'on régénère après modification du référentiel
 *     ou d'un module.
 *   - Les ports CM.Preferences et CM.Composants sont montés en doubles
 *     de test (stubs in-memory) déclarés en dur dans le harnais, hors
 *     zone d'injection.
 *
 * Usage :
 *   node outils/construire-tests-accueil-unifie-sentinelles.js
 *
 * Exit codes :
 *   0 — succès, tests-accueil-unifie-sentinelles.html régénéré.
 *   1 — marqueurs manquants ou mal appariés.
 *   2 — erreur d'E/S.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

var RACINE        = path.resolve(__dirname, '..');
var SOURCE_PROD   = path.join(RACINE, 'cadre-indicateurs.html');
var CIBLE_HARNAIS = path.join(RACINE, 'tests-accueil-unifie-sentinelles.html');

/* Marqueurs source — paires (BEGIN, END) dans l'ordre d'extraction.
   Chaque entrée précise aussi si le bloc extrait doit être enveloppé
   dans <script>...</script> au moment de l'injection (cas des modules
   JS) ou inséré tel quel (cas des données qui contiennent déjà leurs
   <script>). */
var ZONES = [
  {
    nom: 'CM.Referentiel (module)',
    debut: '/* ══ CM.Referentiel — BEGIN',
    fin:   '/* ══ CM.Referentiel — END ══ */',
    envelopperEnScript: true
  },
  {
    nom: 'CM.IndicateursMeta (module)',
    debut: '/* ══ CM.IndicateursMeta — BEGIN',
    fin:   '/* ══ CM.IndicateursMeta — END ══ */',
    envelopperEnScript: true
  },
  {
    nom: 'CM.Referentiel.ajouter (15 blocs de données)',
    debut: '<!-- CM.REFERENTIEL.DATA — BEGIN',
    fin:   '<!-- CM.REFERENTIEL.DATA — END -->',
    envelopperEnScript: false
  },
  {
    nom: 'CM.RequeteMetriques (module)',
    debut: '/* ══ CM.RequeteMetriques — BEGIN',
    fin:   '/* ══ CM.RequeteMetriques — END ══ */',
    envelopperEnScript: true
  },
  {
    nom: 'CM.AccueilUnifie (module)',
    debut: '/* ══ CM.AccueilUnifie — BEGIN',
    fin:   '/* ══ CM.AccueilUnifie — END ══ */',
    envelopperEnScript: true
  }
];

var MARQUEUR_CIBLE_BEGIN = '<!-- CM.SENTINELLES-INJECTION-BEGIN -->';
var MARQUEUR_CIBLE_END   = '<!-- CM.SENTINELLES-INJECTION-END -->';

function extraireBloc(source, marqueurDeb, marqueurFin, nomZone) {
  var idxDeb = source.indexOf(marqueurDeb);
  if (idxDeb === -1) {
    throw new Error('Marqueur de début introuvable pour ' + nomZone + ' : "' + marqueurDeb + '"');
  }
  var idxFin = source.indexOf(marqueurFin, idxDeb + marqueurDeb.length);
  if (idxFin === -1) {
    throw new Error('Marqueur de fin introuvable pour ' + nomZone + ' : "' + marqueurFin + '"');
  }
  var debutLigne = source.lastIndexOf('\n', idxDeb) + 1;
  var finLigne   = source.indexOf('\n', idxFin + marqueurFin.length);
  if (finLigne === -1) finLigne = source.length;
  return source.substring(debutLigne, finLigne);
}

function injecterBloc(cible, marqueurDeb, marqueurFin, bloc, nomFichier) {
  var idxDeb = cible.indexOf(marqueurDeb);
  if (idxDeb === -1) {
    throw new Error('Marqueur de début introuvable dans ' + nomFichier + ' : "' + marqueurDeb + '"');
  }
  var idxFin = cible.indexOf(marqueurFin, idxDeb + marqueurDeb.length);
  if (idxFin === -1) {
    throw new Error('Marqueur de fin introuvable après le début dans ' + nomFichier + ' : "' + marqueurFin + '"');
  }
  var avant = cible.substring(0, idxDeb + marqueurDeb.length);
  var apres = cible.substring(idxFin);
  return avant + '\n' + bloc + '\n' + apres;
}

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

  /* Extraction et concaténation des 5 zones dans l'ordre. */
  var morceaux = [];
  var rapportTailles = [];
  for (var i = 0; i < ZONES.length; i++) {
    var z = ZONES[i];
    var bloc;
    try {
      bloc = extraireBloc(source, z.debut, z.fin, z.nom);
    } catch (e) {
      process.stderr.write(e.message + '\n');
      process.exit(1);
    }
    var lignes = bloc.split('\n').length;
    rapportTailles.push('  · ' + z.nom + ' : ' + lignes + ' l.');
    if (z.envelopperEnScript) {
      morceaux.push('<script>\n' + bloc + '\n</script>');
    } else {
      morceaux.push(bloc);
    }
  }
  var injection = morceaux.join('\n\n');

  /* Injection. */
  var resultat;
  try {
    resultat = injecterBloc(
      cible, MARQUEUR_CIBLE_BEGIN, MARQUEUR_CIBLE_END, injection,
      'tests-accueil-unifie-sentinelles.html'
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

  process.stdout.write('OK — 5 zones injectées dans tests-accueil-unifie-sentinelles.html :\n');
  process.stdout.write(rapportTailles.join('\n') + '\n');
  process.stdout.write('  Total injection : ' + injection.length + ' octets, ' +
                       injection.split('\n').length + ' lignes.\n');
}

main();
