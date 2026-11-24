/* Banda gruesa con lóbulos anchos y chorreones colgantes, según la referencia. */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const L = 66; // altura de la banda

// [centro, semi-ancho del lóbulo, profundidad del lóbulo, y del bulbo (0 = sin chorreón)]
const lobes = [
  [1330, 72, 38, 0],
  [1160, 60, 34, 150],
  [1000, 80, 40, 0],
  [820, 62, 34, 160],
  [650, 78, 42, 0],
  [470, 64, 36, 150],
  [300, 76, 38, 0],
  [130, 68, 34, 155]
];

let bottom = `V${L} `;
let cursor = 1440;
for (const [c, w, depth, bulbY] of lobes) {
  const xR = c + w;
  const xL = c - w;
  const mid = (cursor + xR) / 2;
  bottom += `C${mid},${L + 4} ${xR - 18},${L} ${xR},${L} `;
  bottom += `C${xR},${L + depth * 0.72} ${c + w * 0.55},${L + depth} ${c},${L + depth} `;
  if (bulbY) {
    const nw = w * 0.22;
    const r = w * 0.4;
    bottom += `C${c + nw},${L + depth + 16} ${c + nw},${bulbY - r} ${c},${bulbY - r} `;
    bottom += `A${r},${r} 0 1 0 ${c},${bulbY + r} `;
    bottom += `A${r},${r} 0 1 0 ${c},${bulbY - r} `;
    bottom += `C${c - nw},${bulbY - r} ${c - nw},${L + depth + 16} ${c},${L + depth} `;
  }
  bottom += `C${c - w * 0.55},${L + depth} ${xL},${L + depth * 0.72} ${xL},${L} `;
  cursor = xL;
}
bottom += 'H0 Z';
const path = `M0,0 H1440 ${bottom}`;
const glossPath = 'M0,0 H1440 V14 C1360,22 1300,8 1240,18 C1180,28 1120,12 1060,22 C1000,32 940,16 880,26 C820,36 760,18 700,28 C640,38 580,20 520,30 C460,40 400,22 340,32 C280,42 220,24 160,34 C100,44 40,28 0,36 Z';

const svg = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="paintFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--paint-light)"/>
            <stop offset="0.55" stop-color="var(--paint)"/>
            <stop offset="1" stop-color="var(--paint-dark)"/>
          </linearGradient>
          <linearGradient id="paintGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--paint-light)" stop-opacity="0.9"/>
            <stop offset="1" stop-color="var(--paint-light)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="paint-shadow" d="${path}"/>
        <path class="paint-base" d="${path}"/>
        <path class="paint-light" d="${glossPath}"/>
      </svg>
    </div>`;

for (const rel of ['index.html', 'promocion.html']) {
  const p = join(ROOT, rel);
  let s = await readFile(p, 'utf8');
  s = s.replace(/<div class="nav-paint"[\s\S]*?<\/div>\s*<\/header>/, svg + '\n  </header>');
  await writeFile(p, s, 'utf8');
  console.log('OK  ' + rel);
}
const gp = join(ROOT, 'tools/generate.mjs');
let g = await readFile(gp, 'utf8');
g = g.replace(/const NAV_PAINT = `[\s\S]*?`;/, 'const NAV_PAINT = `' + svg + '`;');
await writeFile(gp, g, 'utf8');
console.log('OK  tools/generate.mjs');
