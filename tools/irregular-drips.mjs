/* Ola irregular: bordes nivelados y chorreones de anchos/profundidades distintos. */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const TOP = 'M0,16 C50,4 110,26 170,14 C230,2 300,30 360,18 C420,6 470,28 520,14 C580,-2 640,24 700,12 C760,0 810,30 870,16 C930,2 990,26 1050,14 C1110,2 1170,28 1230,16 C1290,4 1350,26 1410,14 C1420,12 1430,14 1440,16';

const BOTTOM = 'L1440,20 C1400,20 1370,26 1358,28 C1356,48 1354,72 1352,88 C1350,102 1340,110 1324,110 C1308,110 1298,102 1296,88 C1294,72 1292,48 1290,28 C1270,24 1240,22 1200,22 C1160,22 1120,24 1070,26 C1068,42 1066,60 1064,72 C1062,84 1056,90 1044,90 C1032,90 1026,84 1024,72 C1022,60 1020,42 1018,26 C980,22 940,20 900,20 C860,20 830,26 806,28 C804,56 802,88 800,108 C798,124 788,132 770,132 C752,132 742,124 740,108 C738,88 736,56 734,28 C700,22 660,20 620,20 C580,20 540,24 496,26 C494,44 492,64 490,78 C488,92 480,100 466,100 C452,100 444,92 442,78 C440,64 438,44 436,26 C400,22 360,20 320,20 C270,20 240,26 220,28 C218,50 216,76 214,92 C212,108 202,116 186,116 C170,116 160,108 158,92 C156,76 154,50 152,28 C120,22 70,18 0,18 Z';

const LIGHT = 'M0,14 C50,2 110,24 170,12 C230,0 300,28 360,16 C420,4 470,26 520,12 C580,-4 640,22 700,10 C760,-2 810,28 870,14 C930,0 990,24 1050,12 C1110,0 1170,26 1230,14 C1290,2 1350,24 1410,12 C1420,10 1430,12 1440,14 L1440,24 C1430,22 1420,20 1410,22 C1350,34 1290,12 1230,24 C1170,36 1110,10 1050,22 C990,34 930,10 870,24 C810,38 760,8 700,20 C640,32 580,6 520,22 C470,36 420,14 360,26 C300,38 230,10 170,22 C110,34 50,12 0,24 Z';

const svg = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 144" preserveAspectRatio="none">
        <path class="paint-shadow" d="${TOP} ${BOTTOM}"/>
        <path class="paint-base" d="${TOP} ${BOTTOM}"/>
        <path class="paint-light" d="${LIGHT}"/>
        <circle class="paint-accent" cx="1380" cy="66" r="7"/>
        <circle class="paint-accent" cx="880" cy="84" r="5"/>
        <circle class="paint-accent" cx="560" cy="62" r="8"/>
        <circle class="paint-drop" cx="1150" cy="104" r="9"/>
        <circle class="paint-drop" cx="650" cy="120" r="6"/>
        <circle class="paint-drop" cx="300" cy="110" r="7"/>
        <circle class="paint-drop" cx="60" cy="72" r="4"/>
      </svg>
    </div>`;

for (const rel of ['index.html', 'promocion.html']) {
  const path = join(ROOT, rel);
  let html = await readFile(path, 'utf8');
  html = html.replace(/<div class="nav-paint"[\s\S]*?<\/div>\s*<\/header>/, svg + '\n  </header>');
  await writeFile(path, html, 'utf8');
  console.log('OK  ' + rel);
}

const genPath = join(ROOT, 'tools/generate.mjs');
let gen = await readFile(genPath, 'utf8');
gen = gen.replace(/const NAV_PAINT = `[\s\S]*?`;/, 'const NAV_PAINT = `' + svg + '`;');
await writeFile(genPath, gen, 'utf8');
console.log('OK  tools/generate.mjs');
