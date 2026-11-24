/* Reemplaza la ola del navbar por una versión con chorreones gruesos y redondeados. */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const WAVE_TOP = 'M0,22 C60,10 120,30 180,20 C240,10 300,28 360,18 C420,8 480,26 540,16 C600,6 660,24 720,14 C780,4 840,22 900,12 C960,2 1020,20 1080,10 C1140,0 1200,18 1260,8 C1320,0 1380,14 1440,6';

const BOTTOM = 'L1440,24 C1400,24 1360,30 1314,30 C1310,30 1308,50 1306,74 C1304,90 1298,98 1282,98 C1266,98 1260,90 1258,74 C1256,50 1254,30 1250,30 C1200,30 1160,26 1120,26 C1070,26 1050,32 1020,34 C1016,54 1014,78 1012,92 C1010,106 1002,112 984,112 C966,112 958,106 956,92 C954,78 952,54 948,34 C920,30 890,26 850,26 C810,26 780,32 750,34 C746,54 744,78 742,92 C740,106 732,112 714,112 C696,112 688,106 686,92 C684,78 682,54 678,34 C650,30 620,26 580,26 C540,26 510,32 480,34 C476,54 474,78 472,92 C470,106 462,112 444,112 C426,112 418,106 416,92 C414,78 412,54 408,34 C380,30 350,26 310,26 C240,26 180,30 120,28 C80,26 40,30 0,30 Z';

const LIGHT = 'M0,18 C60,6 120,26 180,16 C240,6 300,24 360,14 C420,4 480,22 540,12 C600,2 660,20 720,10 C780,0 840,18 900,8 C960,-2 1020,16 1080,6 C1140,-4 1200,14 1260,4 C1320,-4 1380,10 1440,2 L1440,12 C1380,20 1320,6 1260,14 C1200,24 1140,6 1080,16 C1020,26 960,8 900,18 C840,28 780,10 720,20 C660,30 600,12 540,22 C480,32 420,14 360,24 C300,34 240,16 180,26 C120,36 60,16 0,28 Z';

const svg = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 128" preserveAspectRatio="none">
        <path class="paint-shadow" d="${WAVE_TOP} ${BOTTOM}"/>
        <path class="paint-base" d="${WAVE_TOP} ${BOTTOM}"/>
        <path class="paint-light" d="${LIGHT}"/>
        <circle class="paint-accent" cx="1350" cy="58" r="7"/>
        <circle class="paint-accent" cx="790" cy="72" r="6"/>
        <circle class="paint-accent" cx="350" cy="64" r="6.5"/>
        <circle class="paint-drop" cx="1150" cy="98" r="8"/>
        <circle class="paint-drop" cx="600" cy="104" r="7"/>
        <circle class="paint-drop" cx="170" cy="102" r="7.5"/>
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
