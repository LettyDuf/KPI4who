#!/usr/bin/env node
'use strict';
/*
 * extraire-term-def.js - outil d'audit du chantier 21 (jalon B).
 *
 * Extrait les balises <span class="term-def" data-def="...">...</span> de
 * cadre-indicateurs.html, dedoublonne par libelle, et produit :
 *   - un resume et un tableau compact sur stdout ;
 *   - un rapport detaille (toutes les definitions) dans
 *     inventaire-term-def-brut.md.
 *
 * Zero dependance (fs, path seulement). Codes de sortie :
 *   0 succes, 1 aucune balise trouvee, 2 erreur d'entree-sortie.
 */

const fs = require('fs');
const path = require('path');

const RACINE = path.join(__dirname, '..');
const CIBLE = path.join(RACINE, 'cadre-indicateurs.html');
const SORTIE_BRUT = path.join(RACINE, 'inventaire-term-def-brut.md');

function lire(fichier) {
  try {
    return fs.readFileSync(fichier, 'utf8');
  } catch (e) {
    console.error('Erreur lecture ' + fichier + ' : ' + e.message);
    process.exit(2);
  }
}

function extraire(html) {
  const re = /<span class="term-def"\s+data-def="([^"]*)">([^<]*)<\/span>/g;
  const parTerme = new Map();
  let m;
  let total = 0;
  while ((m = re.exec(html)) !== null) {
    total++;
    const def = m[1].replace(/\s+/g, ' ').trim();
    const terme = m[2].replace(/\s+/g, ' ').trim();
    if (!parTerme.has(terme)) {
      parTerme.set(terme, { occurrences: 0, definitions: [] });
    }
    const entree = parTerme.get(terme);
    entree.occurrences++;
    if (entree.definitions.indexOf(def) === -1) {
      entree.definitions.push(def);
    }
  }
  return { total, parTerme };
}

function trierTermes(parTerme) {
  return [...parTerme.keys()].sort(function (a, b) {
    return a.localeCompare(b, 'fr', { sensitivity: 'base' });
  });
}

function ecrireRapportBrut(termes, parTerme, total, divergents) {
  const lignes = [];
  lignes.push('# Inventaire brut des term-def');
  lignes.push('');
  lignes.push('Genere par outils/extraire-term-def.js. Ne pas editer a la main.');
  lignes.push('');
  lignes.push('- Balises term-def : ' + total);
  lignes.push('- Libelles distincts : ' + termes.length);
  lignes.push('- Libelles a definitions divergentes : ' + divergents.length);
  lignes.push('');
  termes.forEach(function (t) {
    const e = parTerme.get(t);
    lignes.push('## ' + t);
    lignes.push('');
    lignes.push('Occurrences : ' + e.occurrences + ' | definitions : ' + e.definitions.length);
    lignes.push('');
    e.definitions.forEach(function (d, i) {
      lignes.push((e.definitions.length > 1 ? '(' + (i + 1) + ') ' : '') + d);
      lignes.push('');
    });
  });
  try {
    fs.writeFileSync(SORTIE_BRUT, lignes.join('\n'));
  } catch (e) {
    console.error('Erreur ecriture ' + SORTIE_BRUT + ' : ' + e.message);
    process.exit(2);
  }
}

function imprimerTableauCompact(termes, parTerme, total, divergents) {
  const lignes = [];
  lignes.push('Balises term-def : ' + total);
  lignes.push('Libelles distincts : ' + termes.length);
  lignes.push('Libelles divergents : ' + divergents.length);
  lignes.push('');
  lignes.push('terme | occurrences | nb definitions');
  termes.forEach(function (t) {
    const e = parTerme.get(t);
    lignes.push(t + ' | ' + e.occurrences + ' | ' + e.definitions.length);
  });
  process.stdout.write(lignes.join('\n') + '\n');
}

function main() {
  const html = lire(CIBLE);
  const resultat = extraire(html);
  if (resultat.total === 0) {
    console.error('Aucune balise term-def trouvee.');
    process.exit(1);
  }
  const termes = trierTermes(resultat.parTerme);
  const divergents = termes.filter(function (t) {
    return resultat.parTerme.get(t).definitions.length > 1;
  });
  ecrireRapportBrut(termes, resultat.parTerme, resultat.total, divergents);
  imprimerTableauCompact(termes, resultat.parTerme, resultat.total, divergents);
  process.exit(0);
}

main();
