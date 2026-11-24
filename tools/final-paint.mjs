/* Pintura plana con lóbulos irregulares y gotas de cuello largo (referencia). */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const B = 58; // altura de la banda

// [x derecha, x izquierda, profundidad, desplazamiento del fondo, gota: [yBulbo, radio] | null]
const lobes = [
  [1440, 1300, 34, 10, null],
  [1300, 1140, 56, -14, [156, 21]],
  [1140, 1020, 26, 8, null],
  [1020, 840, 64, 16, [176, 24]],
  [840, 720, 30, -10, null],
  [720, 560, 52, 6, null],
  [560, 430, 28, -8, [150, 18]],
  [430, 250, 60, 14, null],
  [250, 0, 38, -6, null]
];

let d = `M0,0 H1440 V${B} `;
for (const [xR, xL, depth, skew, drip] of lobes) {
  const xb = xR - (xR - xL) * 0.46 + skew;
  d += `C${xR - 26},${B + depth * 0.74} ${xb + 22},${B + depth} ${xb},${B + depth} `;
  if (drip) {
    const [bulbY, r] = drip;
    const nw = 7;
    d += `C${xb + nw},${B + depth + 24} ${xb + nw},${bulbY - r - 14} ${xb},${bulbY - r} `;
    d += `A${r},${r} 0 1 0 ${xb},${bulbY + r} `;
    d += `A${r},${r} 0 1 0 ${xb},${bulbY - r} `;
    d += `C${xb - nw},${bulbY - r - 14} ${xb - nw},${B + depth + 24} ${xb},${B + depth} `;
  }
  d += `C${xb - 22},${B + depth} ${xL + 26},${B + depth * 0.74} ${xL},${B} `;
}
d += 'H0 Z';

const svg = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 210" preserveAspectRatio="none">
        <path class="paint-shadow" d="${d}"/>
        <path class="paint-base" d="${d}"/>
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
