/* Activa un dominio propio en GitHub Pages.
   Uso: node tools/set-domain.mjs uskein.dev
   Requiere además configurar el DNS del dominio apuntando a 185.199.108.153
   (y .109, .110, .111) o un CNAME a <usuario>.github.io. */
import { writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const domain = process.argv[2];

if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) {
  console.error('Uso: node tools/set-domain.mjs tu-dominio.com');
  process.exit(1);
}

await writeFile(join(ROOT, 'CNAME'), domain.trim() + '\n', 'utf8');

// Actualiza canonical, og:url y sitemap al dominio nuevo.
const indexPath = join(ROOT, 'index.html');
let html = await readFile(indexPath, 'utf8');
html = html.replace(/https:\/\/uskein\.github\.io\//g, `https://${domain}/`);
await writeFile(indexPath, html, 'utf8');

const mapPath = join(ROOT, 'sitemap.xml');
let map = await readFile(mapPath, 'utf8');
map = map.replace(/https:\/\/uskein\.github\.io\//g, `https://${domain}/`);
await writeFile(mapPath, map, 'utf8');

console.log(`Dominio ${domain} configurado. Haz commit y push; GitHub Pages lo activará en unos minutos.`);
