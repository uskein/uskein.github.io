/* Ola tipo banda de pintura: borde superior recto y chorreones juntos con bulbo redondo. */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// [centro, ancho del cuello, radio del bulbo, profundidad] — de derecha a izquierda
const drips = [
  [1330, 13, 25, 104],
  [1165, 11, 21, 88],
  [1010, 15, 29, 122],
  [850, 11, 20, 84],
  [700, 14, 26, 108],
  [545, 12, 23, 96],
  [390, 16, 31, 128],
  [235, 11, 21, 86],
  [95, 14, 26, 104]
];

let bottom = 'V22 ';
let cursor = 1440;
for (const [c, nw, r, depth] of drips) {
  const start = c + nw + 10;
  const end = c - nw - 10;
  const neckY = depth - r;
  const mid = (cursor + start) / 2;
  bottom += `C${mid},${26} ${start + 20},${18} ${start},22 `;
  bottom += `C${c + nw},22 ${c + nw},${neckY - 8} ${c + nw},${neckY} `;
  bottom += `C${c + nw},${neckY + r} ${c + r},${depth} ${c},${depth} `;
  bottom += `C${c - r},${depth} ${c - nw},${neckY + r} ${c - nw},${neckY} `;
  bottom += `C${c - nw},${neckY - 8} ${c - nw},22 ${end},22 `;
  cursor = end;
}
bottom += `H0 Z`;

const path = `M0,0 H1440 ${bottom}`;
const light = 'M0,0 H1440 V18 C1360,26 1300,12 1240,20 C1180,28 1120,14 1060,22 C1000,30 940,16 880,24 C820,32 760,18 700,26 C640,34 580,20 520,28 C460,36 400,22 340,30 C280,38 220,24 160,32 C100,40 40,26 0,30 Z';

const gloss = drips.map(([c, nw, r, depth]) =>
  `<ellipse class="paint-gloss" cx="${(c - r * 0.28).toFixed(1)}" cy="${(depth - r * 0.42).toFixed(1)}" rx="${(r * 0.42).toFixed(1)}" ry="${(r * 0.26).toFixed(1)}"/>`
).join('');

const svg = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 144" preserveAspectRatio="none">
        <defs>
          <linearGradient id="paintFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--paint-light)"/>
            <stop offset="0.42" stop-color="var(--paint)"/>
            <stop offset="1" stop-color="var(--paint-dark)"/>
          </linearGradient>
          <linearGradient id="paintGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--paint-light)" stop-opacity="0.95"/>
            <stop offset="1" stop-color="var(--paint-light)" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="paint-shadow" d="${path}"/>
        <path class="paint-base" d="${path}"/>
        <path class="paint-light" d="${light}"/>
        ${gloss}
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
