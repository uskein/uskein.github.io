/* Genera las imágenes promocionales SVG de los 10 productos + hero.
   Vectoriales, gratis, nítidos y sin dependencias. */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(ROOT, 'assets/img');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, 'assets/js/data.js'), 'utf8'), sandbox);
const { PRODUCTS } = sandbox.window.USKEIN_DATA;

function grid() {
  let s = '';
  for (let x = 0; x <= 1200; x += 48) s += `<line x1="${x}" y1="0" x2="${x}" y2="675" stroke="#C9C6BC" stroke-width="1" opacity=".45"/>`;
  for (let y = 0; y <= 675; y += 48) s += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#C9C6BC" stroke-width="1" opacity=".45"/>`;
  return s;
}

function uiMockup(accent, kind) {
  const a = accent;
  const base = `
    <rect x="640" y="120" width="440" height="440" fill="#F7F6F1" stroke="#14171C" stroke-width="2"/>
    <rect x="640" y="120" width="440" height="10" fill="${a}"/>
    <rect x="664" y="156" width="120" height="14" fill="#14171C"/>
    <rect x="664" y="180" width="220" height="8" fill="#9BA4B0"/>
    <line x1="664" y1="210" x2="1056" y2="210" stroke="#C9C6BC"/>`;
  const rows = (n, w = 300) => Array.from({ length: n }, (_, i) => `
    <rect x="664" y="${232 + i * 44}" width="18" height="18" fill="${i % 2 ? '#F7F6F1' : a}" stroke="${a}" stroke-width="2"/>
    <rect x="696" y="${235 + i * 44}" width="${w - 60 - (i % 3) * 40}" height="10" fill="#575C58" opacity=".8"/>
    <rect x="696" y="${253 + i * 44}" width="${w - 140 - (i % 2) * 30}" height="6" fill="#9BA4B0" opacity=".7"/>`).join('');
  const bars = Array.from({ length: 7 }, (_, i) => `
    <rect x="${664 + i * 56}" y="${450 - [90, 140, 110, 180, 130, 200, 160][i]}" width="34" height="${[90, 140, 110, 180, 130, 200, 160][i]}" fill="${i === 5 ? a : '#DFDCD2'}"/>`).join('');
  const graph = `
    <circle cx="860" cy="340" r="8" fill="${a}"/>
    <circle cx="760" cy="260" r="6" fill="#14171C"/>
    <circle cx="980" cy="250" r="6" fill="#14171C"/>
    <circle cx="930" cy="440" r="6" fill="#14171C"/>
    <circle cx="700" cy="430" r="6" fill="#14171C"/>
    <line x1="760" y1="260" x2="860" y2="340" stroke="${a}" stroke-width="2"/>
    <line x1="860" y1="340" x2="980" y2="250" stroke="${a}" stroke-width="2"/>
    <line x1="860" y1="340" x2="930" y2="440" stroke="#9BA4B0" stroke-width="2"/>
    <line x1="860" y1="340" x2="700" y2="430" stroke="#9BA4B0" stroke-width="2"/>`;
  const map = `
    <path d="M664 460 Q740 380 800 420 T1056 300" fill="none" stroke="${a}" stroke-width="4"/>
    <path d="M664 520 Q780 470 860 500 T1056 420" fill="none" stroke="#9BA4B0" stroke-width="2"/>
    <circle cx="800" cy="420" r="10" fill="${a}"/><circle cx="1056" cy="300" r="10" fill="#14171C"/>
    <rect x="664" y="140" width="392" height="100" fill="#F7F6F1" stroke="#14171C" stroke-width="2"/>
    <rect x="688" y="164" width="150" height="10" fill="#14171C"/>
    <rect x="688" y="188" width="260" height="8" fill="#9BA4B0"/>
    <rect x="688" y="210" width="200" height="8" fill="#9BA4B0"/>`;
  if (kind === 'map') return base + map;
  if (kind === 'graph') return base + graph + `<rect x="664" y="500" width="240" height="8" fill="${a}"/><rect x="664" y="520" width="320" height="6" fill="#DFDCD2"/>`;
  if (kind === 'chart') return base + bars + `<rect x="664" y="500" width="180" height="10" fill="${a}"/>`;
  return base + rows(5);
}

function imageFor(p) {
  const dark = ['US-02', 'US-04'].includes(p.id);
  const bg = dark ? '#0E1116' : '#EDEBE4';
  const ink = dark ? '#F0EFEA' : '#14171C';
  const muted = dark ? '#9BA4B0' : '#575C58';
  const line = dark ? '#2A323E' : '#C9C6BC';
  const kind = { 'US-01': 'rows', 'US-02': 'map', 'US-03': 'rows', 'US-04': 'graph',
    'US-05': 'rows', 'US-06': 'chart', 'US-07': 'graph', 'US-08': 'rows',
    'US-09': 'graph', 'US-10': 'rows' }[p.id];
  const name = p.name.length > 18 ? p.name.slice(0, 17) + '…' : p.name;
  const nameSize = name.length > 12 ? 62 : 84;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="Imagen promocional de ${p.name}">
  <rect width="1200" height="675" fill="${bg}"/>
  <g opacity="${dark ? '.3' : '.55'}">${grid().replace(/#C9C6BC/g, line)}</g>
  <rect x="56" y="56" width="12" height="12" fill="${p.accent}"/>
  <text x="84" y="70" fill="${muted}" font-family="monospace" font-size="16" letter-spacing="3">USKEIN STUDIO</text>
  <text x="56" y="212" fill="${ink}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="${nameSize}" letter-spacing="-3">${name}</text>
  <rect x="56" y="240" width="72" height="4" fill="${p.accent}"/>
  <foreignObject x="56" y="272" width="520" height="140">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:24px;line-height:1.35;color:${muted}">${p.tagline}</div>
  </foreignObject>
  <text x="56" y="600" fill="${p.accent}" font-family="monospace" font-size="22" letter-spacing="4">${p.id}</text>
  <text x="56" y="628" fill="${muted}" font-family="monospace" font-size="14" letter-spacing="2">${p.platform.toUpperCase()}</text>
  ${uiMockup(p.accent, kind)}
  <rect x="0" y="0" width="1200" height="675" fill="none" stroke="${line}" stroke-width="2"/>
</svg>`;
}

function heroImage() {
  const cells = PRODUCTS.map((p, i) => {
    const x = 56 + (i % 5) * 220, y = 150 + Math.floor(i / 5) * 240;
    return `<g>
      <rect x="${x}" y="${y}" width="196" height="212" fill="${['#F7F6F1','#F7F6F1','#F7F6F1','#F7F6F1','#F7F6F1'][i%5]}" stroke="#14171C" stroke-width="2"/>
      <rect x="${x}" y="${y}" width="196" height="6" fill="${p.accent}"/>
      <rect x="${x+18}" y="${y+28}" width="84" height="12" fill="#14171C"/>
      <rect x="${x+18}" y="${y+54}" width="140" height="8" fill="#9BA4B0"/>
      <rect x="${x+18}" y="${y+76}" width="110" height="8" fill="#9BA4B0" opacity=".6"/>
      <rect x="${x+18}" y="${y+112}" width="44" height="44" fill="${p.accent}" opacity=".85"/>
      <rect x="${x+72}" y="${y+112}" width="44" height="44" fill="#DFDCD2"/>
      <rect x="${x+126}" y="${y+112}" width="44" height="44" fill="#DFDCD2"/>
      <rect x="${x+18}" y="${y+176}" width="120" height="8" fill="${p.accent}"/>
      <text x="${x+18}" y="${y+202}" fill="#575C58" font-family="monospace" font-size="12">${p.id}</text>
    </g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="Los diez productos de Uskein Studio">
  <rect width="1200" height="675" fill="#EDEBE4"/>
  <rect x="56" y="56" width="12" height="12" fill="#C8FF3D"/>
  <text x="84" y="70" fill="#575C58" font-family="monospace" font-size="16" letter-spacing="3">USKEIN STUDIO · CATÁLOGO</text>
  <text x="56" y="128" fill="#14171C" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44" letter-spacing="-2">DIEZ PRODUCTOS, UNA MISMA IDEA</text>
  ${cells}
  <rect x="0" y="0" width="1200" height="675" fill="none" stroke="#C9C6BC" stroke-width="2"/>
</svg>`;
}

await mkdir(IMG, { recursive: true });
for (const p of PRODUCTS) {
  await writeFile(join(IMG, p.image.replace('.png', '.svg')), imageFor(p), 'utf8');
  console.log('OK  ' + p.image.replace('.png', '.svg'));
}
await writeFile(join(IMG, 'hero.svg'), heroImage(), 'utf8');
console.log('OK  hero.svg');
