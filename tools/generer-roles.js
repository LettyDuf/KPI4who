#!/usr/bin/env node
/**
 * generer-roles.js — générateur de la zone CM._rolesData.
 *
 * À lancer avec `node tools/generer-roles.js` à chaque fois que
 * l'inventaire éditorial change. Le script lit inventaire-roles-porte-niveau.md,
 * parse les 53 fiches de rôles, et remplace le contenu de la zone
 * balisée dans cadre-indicateurs.html.
 *
 * Contrat :
 *   - Source de vérité : inventaire-roles-porte-niveau.md
 *   - Cible :           cadre-indicateurs.html, entre les balises
 *                       /* CM.ROLES-DATA:BEGIN ... *\/
 *                       /* CM.ROLES-DATA:END *\/
 *   - Sortie :          la zone contient `CM._rolesData = [...]`
 *
 * Principes de conception (lisible pour non-développeuse) :
 *   - Tout le parsing est fait par expressions régulières simples, fiche par fiche.
 *   - Validation stricte : le script sort en erreur si une fiche manque un champ,
 *     si les axes sortent de la liste blanche, ou si un id est dupliqué.
 *   - Mise à jour conservative : seule la zone balisée est réécrite, tout le
 *     reste du HTML est préservé à l'octet près.
 *   - Zéro dépendance npm : on reste en `fs` natif de Node. Pas de package.json
 *     nécessaire.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RACINE = path.resolve(__dirname, '..');
const CHEMIN_MD = path.join(RACINE, 'inventaire-roles-porte-niveau.md');
const CHEMIN_HTML = path.join(RACINE, 'cadre-indicateurs.html');

/* Libellés de surface (porte niveau) ↔ canons (code interne). */
const MAPPING_LIBELLE_CANON = {
  'Opérationnel': 'équipe',
  'Tactique': 'programme',
  'Portefeuille': 'portefeuille',
  'Exécutif': 'entreprise'
};

const AXES_VALIDES = new Set(['humaine', 'projet', 'méthodologique', 'stratégique']);
const REGEX_ID = /^(op|ta|po|ex)-[a-z0-9-]+$/;
const NB_FICHES_ATTENDU = 53;

const BALISE_DEBUT = '/* CM.ROLES-DATA:BEGIN';
const BALISE_FIN = '/* CM.ROLES-DATA:END */';

/* ─── Parsing ───────────────────────────────────────────────────────────── */

/**
 * Parcourt ligne à ligne le markdown. Chaque section `## <Libellé> — strate`
 * bascule le niveau courant ; chaque `### N. Titre` ouvre une nouvelle fiche ;
 * les lignes `- **Champ** : valeur` remplissent la fiche courante.
 */
function parserMarkdown(texte) {
  const lignes = texte.split('\n');
  const roles = [];
  let niveauCourant = null;
  let fiche = null;

  const pousser = () => {
    if (fiche) {
      roles.push(fiche);
      fiche = null;
    }
  };

  for (const ligne of lignes) {
    const mNiveau = ligne.match(/^## (Opérationnel|Tactique|Portefeuille|Exécutif) — strate/);
    if (mNiveau) {
      pousser();
      niveauCourant = MAPPING_LIBELLE_CANON[mNiveau[1]];
      continue;
    }

    const mFiche = ligne.match(/^### \d+\. (.+)$/);
    if (mFiche && niveauCourant) {
      pousser();
      fiche = {
        niveau: niveauCourant,
        titre: mFiche[1].trim(),
        id: null,
        axes: null,
        source: null,
        descriptif: null
      };
      continue;
    }

    if (!fiche) continue;

    const mId = ligne.match(/^- \*\*Id\*\* : `([^`]+)`\s*$/);
    if (mId) { fiche.id = mId[1]; continue; }

    const mAxes = ligne.match(/^- \*\*Axes\*\* : (.+)$/);
    if (mAxes) {
      fiche.axes = mAxes[1].split(',').map(s => s.trim()).filter(Boolean);
      continue;
    }

    const mSource = ligne.match(/^- \*\*Source\*\* : (.+)$/);
    if (mSource) { fiche.source = mSource[1].trim(); continue; }

    const mDesc = ligne.match(/^- \*\*Descriptif orthodoxe\*\* : (.+)$/);
    if (mDesc) { fiche.descriptif = mDesc[1].trim(); continue; }
  }

  pousser();
  return roles;
}

/* ─── Validation ─────────────────────────────────────────────────────────── */

function valider(roles) {
  const erreurs = [];
  const idsVus = new Set();

  roles.forEach((r, i) => {
    const etiquette = r.id || r.titre || `fiche ${i + 1}`;
    if (!r.id) {
      erreurs.push(`${etiquette} : champ Id manquant`);
    } else if (!REGEX_ID.test(r.id)) {
      erreurs.push(`${r.id} : format d'id invalide (attendu : préfixe op-/ta-/po-/ex- + slug)`);
    }
    if (r.id && idsVus.has(r.id)) {
      erreurs.push(`${r.id} : id dupliqué`);
    }
    if (r.id) idsVus.add(r.id);
    if (!r.titre) erreurs.push(`${etiquette} : titre manquant`);
    if (!Array.isArray(r.axes) || r.axes.length === 0) {
      erreurs.push(`${etiquette} : axes manquants`);
    } else if (r.axes.length > 3) {
      erreurs.push(`${etiquette} : plus de 3 axes (${r.axes.join(', ')}) — règle D2 violée`);
    } else {
      r.axes.forEach(a => {
        if (!AXES_VALIDES.has(a)) erreurs.push(`${etiquette} : axe inconnu « ${a} »`);
      });
    }
    if (!r.source) erreurs.push(`${etiquette} : source manquante`);
    if (!r.descriptif) erreurs.push(`${etiquette} : descriptif manquant`);
  });

  return erreurs;
}

/* ─── Formatage JS ──────────────────────────────────────────────────────── */

/**
 * Produit la portion `CM._rolesData = [...]` proprement indentée.
 * Utilise JSON.stringify sur chaque champ — gère les accents, les apostrophes,
 * les caractères Unicode sans risque d'injection.
 */
function formaterJS(roles) {
  const lignes = ['CM._rolesData = ['];
  roles.forEach((r, i) => {
    const virgule = i === roles.length - 1 ? '' : ',';
    lignes.push('  {');
    lignes.push(`    id: ${JSON.stringify(r.id)},`);
    lignes.push(`    niveau: ${JSON.stringify(r.niveau)},`);
    lignes.push(`    titre: ${JSON.stringify(r.titre)},`);
    lignes.push(`    axes: ${JSON.stringify(r.axes)},`);
    lignes.push(`    source: ${JSON.stringify(r.source)},`);
    lignes.push(`    descriptif: ${JSON.stringify(r.descriptif)}`);
    lignes.push(`  }${virgule}`);
  });
  lignes.push('];');
  return lignes.join('\n');
}

/* ─── Injection dans le HTML ───────────────────────────────────────────── */

/**
 * Remplace tout ce qui est entre la ligne de balise DEBUT et la balise FIN
 * par `nouveauContenu`. Préserve les lignes de balise elles-mêmes.
 */
function injecter(htmlTexte, nouveauContenu) {
  const debut = htmlTexte.indexOf(BALISE_DEBUT);
  const fin = htmlTexte.indexOf(BALISE_FIN);
  if (debut === -1 || fin === -1) {
    throw new Error(
      `Balises introuvables dans ${CHEMIN_HTML}.\n` +
      `Assurer la présence de « ${BALISE_DEBUT} » et « ${BALISE_FIN} » dans le fichier.`
    );
  }
  if (fin < debut) {
    throw new Error('Balise FIN avant DEBUT — structure corrompue.');
  }
  const finLigneDebut = htmlTexte.indexOf('\n', debut);
  if (finLigneDebut === -1) {
    throw new Error('Pas de saut de ligne après la balise DEBUT.');
  }
  return (
    htmlTexte.substring(0, finLigneDebut + 1) +
    nouveauContenu + '\n' +
    htmlTexte.substring(fin)
  );
}

/* ─── Orchestration ─────────────────────────────────────────────────────── */

function main() {
  const md = fs.readFileSync(CHEMIN_MD, 'utf8');
  const roles = parserMarkdown(md);

  if (roles.length !== NB_FICHES_ATTENDU) {
    console.error(
      `Nombre de fiches incorrect : attendu ${NB_FICHES_ATTENDU}, trouvé ${roles.length}.\n` +
      `Vérifier que le markdown contient bien ${NB_FICHES_ATTENDU} sections « ### N. ».`
    );
    process.exit(1);
  }

  const erreurs = valider(roles);
  if (erreurs.length) {
    console.error('Validation échouée :');
    erreurs.forEach(e => console.error('  · ' + e));
    process.exit(1);
  }

  const bloc = formaterJS(roles);
  const html = fs.readFileSync(CHEMIN_HTML, 'utf8');
  const nouveau = injecter(html, bloc);
  fs.writeFileSync(CHEMIN_HTML, nouveau, 'utf8');

  const repartition = roles.reduce((acc, r) => {
    acc[r.niveau] = (acc[r.niveau] || 0) + 1;
    return acc;
  }, {});

  console.log(`OK — ${roles.length} rôles injectés dans cadre-indicateurs.html`);
  console.log('Répartition :');
  Object.keys(repartition).forEach(n => {
    console.log(`  · ${n} : ${repartition[n]}`);
  });
}

main();
