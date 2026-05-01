#!/usr/bin/env node
/**
 * outils/lancer-tests-requete-metriques.js
 *
 * Patron : runner Node.js zéro-dépendance, script strict.
 * Pendant côté exécution du générateur outils/construire-tests-requete-metriques.js
 * (qui produit le harnais ; ce runner l'exécute en headless).
 *
 * Pourquoi : le harnais tests-requete-metriques.html est conçu pour s'ouvrir
 * dans un navigateur (file://). Pour pouvoir le lancer en CLI ou avant un
 * commit qui touche au cœur, on extrait ses blocs `<script>` et on les
 * exécute dans un contexte vm Node, avec un mock DOM minimal — juste assez
 * pour que le framework de test maison (describe/it/expect/rendreRapport)
 * tourne sans planter.
 *
 * Le mock DOM se limite à :
 *   - document.readyState = 'complete' (déclenche `demarrer()` immédiatement)
 *   - document.getElementById renvoie un objet stub avec innerHTML/textContent/className
 *   - document.addEventListener no-op (pas de DOMContentLoaded à attendre)
 * Aucune dépendance JSDOM ou autre. Le harnais ne fait pas d'appel DOM
 * sophistiqué — il écrit son rapport dans deux div (`#resume` et
 * `#resultats`), c'est tout.
 *
 * Contrat — source unique de vérité :
 *   - Le code exécuté est celui du harnais HTML, sans modification.
 *   - Si le harnais évolue (ajout d'un bloc <script>, dépendance DOM
 *     nouvelle), ce runner peut nécessiter un ajustement du mock.
 *   - Le décompte de tests est extrait de l'élément `#resume` après
 *     exécution. Format attendu : « ✓ N tests — tous verts » ou
 *     « ✗ N1 / N2 tests — K échecs ».
 *
 * Usage :
 *   node outils/lancer-tests-requete-metriques.js
 *
 * Exit codes :
 *   0 — tous les tests verts.
 *   1 — au moins un test rouge, ou format de résumé inattendu.
 *   2 — erreur d'exécution (script jeté, harnais introuvable, etc.).
 */

'use strict';

var fs   = require('fs');
var path = require('path');
var vm   = require('vm');

/* ─── Chemins (résolus depuis la racine du projet, pas depuis cwd) ─ */
var RACINE   = path.resolve(__dirname, '..');
var HARNAIS  = path.join(RACINE, 'tests-requete-metriques.html');

/* ─── Lecture du harnais ─────────────────────────────────────────── */
var html;
try {
  html = fs.readFileSync(HARNAIS, 'utf-8');
} catch (e) {
  process.stderr.write('Erreur lecture ' + HARNAIS + ' : ' + e.message + '\n');
  process.exit(2);
}

/* ─── Extraction des blocs <script> dans l'ordre ──────────────────
   Regex non-stricte mais suffisante pour ce harnais : pas de scripts
   externes (`<script src=...>`) ni d'attributs sur la balise. Si le
   harnais évolue vers ce genre de patron, adapter ici. */
var scripts = [];
var re = /<script>([\s\S]*?)<\/script>/g;
var m;
while ((m = re.exec(html)) !== null) {
  scripts.push(m[1]);
}
if (scripts.length === 0) {
  process.stderr.write('Aucun bloc <script> trouvé dans le harnais.\n');
  process.exit(2);
}

/* ─── Mock DOM minimal ────────────────────────────────────────────
   Stub par id, créé à la demande, persistant. Le harnais écrit
   son résumé dans #resume et le détail dans #resultats. Tout autre
   id appelé recevra le même type de stub vide. */
var elements = Object.create(null);
function ensureElement(id) {
  if (!elements[id]) {
    elements[id] = {
      innerHTML:    '',
      textContent:  '',
      className:    '',
      appendChild:  function () {},
      addEventListener: function () {}
    };
  }
  return elements[id];
}

var sandbox = {
  console:      console,
  setTimeout:   setTimeout,
  clearTimeout: clearTimeout,
  document:     {
    readyState:   'complete',
    getElementById:  ensureElement,
    addEventListener: function () {},
    body:          { appendChild: function () {} },
    createElement: function () {
      return { innerHTML: '', appendChild: function () {}, setAttribute: function () {} };
    }
  }
};
sandbox.window = sandbox;

vm.createContext(sandbox);

/* ─── Exécution séquentielle des scripts ────────────────────────── */
for (var i = 0; i < scripts.length; i++) {
  try {
    vm.runInContext(scripts[i], sandbox, { filename: 'tests-requete-metriques.html#script[' + i + ']' });
  } catch (e) {
    process.stderr.write('Erreur d\'exécution dans le bloc <script> #' + i + ' :\n');
    process.stderr.write((e && e.stack) ? e.stack + '\n' : String(e) + '\n');
    process.exit(2);
  }
}

/* ─── Lecture du résumé et report ────────────────────────────────
   Le harnais écrit dans #resume.textContent l'une de ces deux
   formes : « ✓ N tests — tous verts » ou « ✗ N1 / N2 tests — K échecs »
   (pour le détail, ouvrir le harnais dans un navigateur). */
var resume = elements.resume || { textContent: '', className: '' };
var texte  = (resume.textContent || '').trim();
var classe = (resume.className   || '').trim();

process.stdout.write(texte + '\n');

if (classe.indexOf('ok') !== -1 && /^✓\s+\d+\s+tests?\b/.test(texte)) {
  process.exit(0);
}
if (classe.indexOf('ko') !== -1 || /^✗/.test(texte)) {
  process.stderr.write('\nAu moins un test a échoué. Ouvrir tests-requete-metriques.html\n');
  process.stderr.write('dans un navigateur pour le détail visuel.\n');
  process.exit(1);
}
process.stderr.write('\nFormat de résumé inattendu (className=' + JSON.stringify(classe) + ').\n');
process.exit(1);
