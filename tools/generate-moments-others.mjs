/* Momentos de los 9 productos restantes, reconstruidos desde sus blueprints e identidades.
   Genera 4 SVG por producto en assets/img/moments/. */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/img/moments');
const F = "'Inter', Arial, sans-serif";
const D = "'Archivo Black', Arial, sans-serif";
const M = "'IBM Plex Mono', monospace";

const P = {
  inspector: { bg:'#0E1116', surface:'#0E1622', text:'#EAF2FF', muted:'#93A6BF', accent:'#C8FF3D', second:'#25E0F5', line:'#24344A', dark:true,
    moments:[
      { label:'Mapa con track', title:'Ruta del día', big:'8,4 km', items:['12 inspecciones','GPS con fix','Track grabando'] },
      { label:'Checklist RITG', title:'Checklist RITG', big:'18/18', items:['Llave general','Regulador','Fuga y ventilación'] },
      { label:'Firma del acta', title:'Acta firmada', big:'3 firmas', items:['Titular','Instalador','Inspector'] },
      { label:'Cola de sincronización', title:'Sincronización', big:'3 actas', items:['Store-and-forward','Último envío 09:41','Sin pérdida de datos'] }
    ]},
  monedero: { bg:'#F4EFE7', surface:'#FFFFFF', text:'#2B2B2B', muted:'#6B6B6B', accent:'#2F7D5B', second:'#D97757', line:'#E6E0D6', dark:false,
    moments:[
      { label:'Bóveda desbloqueada', title:'Bóveda', big:'Abierta', items:['Passphrase','Biometría','Bloqueo 5 min'] },
      { label:'Dashboard de balance', title:'Balance', big:'$ 2.480.500', items:['Ingresos +18%','Gastos -4%','Ahorro 32%'] },
      { label:'Presupuestos', title:'Presupuestos', big:'80%', items:['Mercado','Transporte','Ocio'] },
      { label:'Exportación cifrada', title:'Respaldo', big:'.monedero', items:['AES-256-GCM','SHA-256','Móvil ⇄ PWA'] }
    ]},
  biblioteca: { bg:'#14100C', surface:'#1E1812', text:'#F4EDE0', muted:'#A89B88', accent:'#E8A33D', second:'#7FA88B', line:'#3A2E22', dark:true,
    moments:[
      { label:'Estante', title:'Biblioteca', big:'1.248', items:['Ciencia','Novela','Ensayo'] },
      { label:'Lector sepia', title:'Leyendo', big:'Cap. 7', items:['Marcadores','Subrayados','Notas al margen'] },
      { label:'Grafo de notas', title:'Constelación', big:'342', items:['Backlinks','Grafo','Zettelkasten'] },
      { label:'Bibliografía', title:'Citas', big:'APA', items:['Página 142','Fuente verificada','MLA · Chicago · IEEE'] }
    ]},
  classdesk: { bg:'#EFF6FF', surface:'#FFFFFF', text:'#0F172A', muted:'#475569', accent:'#2563EB', second:'#38BDF8', line:'#DBEAFE', dark:false,
    moments:[
      { label:'Panel del dueño', title:'Panel', big:'14 clases', items:['Asistencia 92%','Cobros al día','Reportes'] },
      { label:'Asistencia en pista', title:'Asistencia', big:'18/20', items:['Natación · 10:00','Una mano','Sin señal'] },
      { label:'Agenda', title:'Agenda', big:'Lun 18', items:['09:00 Natación','11:00 Judo','17:00 Tenis'] },
      { label:'Caja y POS', title:'Caja', big:'$ 1.240.000', items:['24 ventas','12 productos','Stock por movimientos'] }
    ]},
  diario: { bg:'#FAF6F0', surface:'#FFFFFF', text:'#2B2622', muted:'#6B625A', accent:'#3E6B60', second:'#C67B5C', line:'#EAE2D8', dark:false,
    moments:[
      { label:'Hoy', title:'Hoy', big:'9 días', items:['Ánimo 4/5','Gratitud','Hábitos'] },
      { label:'Entrada del diario', title:'Diario', big:'Hoy', items:['Libre','Guiado','Rápido'] },
      { label:'Sesión en vivo', title:'Entrenamiento', big:'4 series', items:['60 kg × 8','RPE 7','PR detectado'] },
      { label:'Mi año', title:'Mi año', big:'365', items:['Mood','Volumen','Racha'] }
    ]},
  galeria: { bg:'#E9EAE6', surface:'#F4F5F2', text:'#17191A', muted:'#575C58', accent:'#1B44C8', second:'#8D9288', line:'#C9CBC5', dark:false,
    moments:[
      { label:'Muro de colección', title:'Colecciones', big:'24', items:['Anatomía','Historia','Idiomas'] },
      { label:'Video anotado', title:'Estudio', big:'08:42', items:['Nota en 02:14','Loop A–B','0,75×'] },
      { label:'Línea de tiempo', title:'Línea de tiempo', big:'142', items:['Fotos','Videos','Notas'] },
      { label:'Reporte PDF', title:'Reporte', big:'12 pág.', items:['Portada','Frames clave','Notas con timestamp'] }
    ]},
  lector: { bg:'#F6F1E7', surface:'#FFFCF6', text:'#17181A', muted:'#5B5F66', accent:'#C44B22', second:'#1F3A5F', line:'#E2DACB', dark:false,
    moments:[
      { label:'Biblioteca', title:'Biblioteca', big:'40', items:['Continuar leyendo','EPUB3','PDF'] },
      { label:'Lector sepia', title:'Leyendo', big:'Cap. 4', items:['Sepia','Literata','Modo calma'] },
      { label:'Anotaciones', title:'Anotaciones', big:'86', items:['Marcadores','Búsqueda','Centro'] },
      { label:'Descubrimiento', title:'Descubrir', big:'Curado', items:['Sin red','Colecciones','Novedades'] }
    ]},
  voynich: { bg:'#eee1c4', surface:'#f7efdb', text:'#2b2118', muted:'#6b5b45', accent:'#b8860b', second:'#1f6f4a', line:'#d8c9a5', dark:false,
    moments:[
      { label:'Grafo de mundo', title:'Aetheria', big:'142', items:['Personajes','Lugares','Eventos'] },
      { label:'Manuscrito', title:'Códice', big:'Cap. XII', items:['Borrador','Versiones','Notas'] },
      { label:'Línea de tiempo', title:'Cronología', big:'412–980', items:['Era primera','Era media','Era oscura'] },
      { label:'Personajes', title:'Personajes', big:'38', items:['Gran Escriba','Custodio','Bestiario'] }
    ]},
  estilos: { bg:'#EDEBE4', surface:'#F7F6F1', text:'#14171C', muted:'#575C58', accent:'#5A8F00', second:'#1B44C8', line:'#C9C6BC', dark:false,
    moments:[
      { label:'TOPO-HUD', title:'Cartografía eléctrica', big:'01', items:['#C8FF3D lima','#25E0F5 cian','Chakra Petch'] },
      { label:'ISO-SOLAR', title:'Facetas minerales', big:'02', items:['#FF6A2B solar','#E5007D magenta','Archivo Black'] },
      { label:'ATHENAEUM', title:'Biblioteca cálida', big:'03', items:['#E8A33D ámbar','#7FA88B laurel','Fraunces'] },
      { label:'AURORA CODEX', title:'Vidrio nocturno', big:'04', items:['#B98CFF violeta','#4FD6C9 teal','Instrument Serif'] }
    ]}
};

function shell(inner, title, dark) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 1688" width="780" height="1688" role="img" aria-label="${title}">
  <defs><filter id="clay" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${dark ? '#000000' : '#17122B'}" flood-opacity="${dark ? '.25' : '.08'}"/>
  </filter></defs>
  ${inner}
</svg>`;
}

function header(p, kicker, title) {
  return `<text x="44" y="64" fill="${p.text}" font-family="${F}" font-size="22" font-weight="700">9:41</text>
  <text x="44" y="130" fill="${p.muted}" font-family="${M}" font-size="20" letter-spacing="2">${kicker}</text>
  <text x="44" y="186" fill="${p.text}" font-family="${D}" font-size="46">${title}</text>
  <line x1="44" y1="212" x2="736" y2="212" stroke="${p.line}" stroke-width="2"/>`;
}

function tabbar(p, active) {
  const tabs = ['Inicio','Lista','Añadir','Ajustes'];
  return `<rect x="0" y="1560" width="780" height="128" fill="${p.surface}"/>
  <line x1="0" y1="1560" x2="780" y2="1560" stroke="${p.line}" stroke-width="2"/>
  ${tabs.map((t,i)=>`<circle cx="${130+i*175}" cy="1604" r="15" fill="none" stroke="${i===active?p.accent:p.muted}" stroke-width="4"/>
  <text x="${130+i*175}" y="1658" fill="${i===active?p.accent:p.muted}" font-family="${F}" font-size="18" text-anchor="middle">${t}</text>`).join('')}`;
}

function dashboard(p, m, i) {
  return `${header(p, 'RESUMEN', m.title)}
  <g filter="url(#clay)"><rect x="40" y="250" width="700" height="330" rx="34" fill="${p.accent}"/></g>
  <text x="76" y="320" fill="${p.dark ? '#0E1116' : '#FFFFFF'}" font-family="${M}" font-size="20" letter-spacing="3">VALOR PRINCIPAL</text>
  <text x="76" y="430" fill="${p.dark ? '#0E1116' : '#FFFFFF'}" font-family="${D}" font-size="62">${m.big}</text>
  <rect x="76" y="480" width="628" height="12" rx="6" fill="${p.dark ? '#0E1116' : '#FFFFFF'}" opacity=".35"/>
  <rect x="76" y="480" width="410" height="12" rx="6" fill="${p.dark ? '#0E1116' : '#FFFFFF'}" opacity=".9"/>
  ${m.items.map((it,k)=>`<g filter="url(#clay)"><rect x="40" y="${620+k*160}" width="700" height="130" rx="26" fill="${p.surface}"/></g>
  <rect x="66" y="${648+k*160}" width="74" height="74" rx="22" fill="${k===1?p.second:p.accent}" opacity=".85"/>
  <text x="166" y="${698+k*160}" fill="${p.text}" font-family="${F}" font-size="29" font-weight="700">${it}</text>
  <circle cx="690" cy="${685+k*160}" r="24" fill="none" stroke="${p.accent}" stroke-width="4"/>`).join('')}
  ${tabbar(p,i)}`;
}

function listScreen(p, m, i) {
  return `${header(p, 'DETALLE', m.title)}
  ${m.items.map((it,k)=>`<g filter="url(#clay)"><rect x="40" y="${258+k*170}" width="700" height="140" rx="28" fill="${p.surface}"/></g>
  <rect x="64" y="${286+k*170}" width="84" height="84" rx="24" fill="${k%2?p.second:p.accent}" opacity=".9"/>
  <text x="106" y="${342+k*170}" fill="${p.dark?'#0E1116':'#FFFFFF'}" font-family="${F}" font-size="32" text-anchor="middle">${k+1}</text>
  <text x="178" y="${330+k*170}" fill="${p.text}" font-family="${F}" font-size="30" font-weight="700">${it}</text>
  <text x="178" y="${370+k*170}" fill="${p.muted}" font-family="${M}" font-size="19">REGISTRO ${String(k+1).padStart(2,'0')}</text>
  <circle cx="690" cy="${328+k*170}" r="26" fill="${p.accent}"/>
  <path d="M678 ${328+k*170} l8 8 l16 -18" fill="none" stroke="${p.dark?'#0E1116':'#FFFFFF'}" stroke-width="6" stroke-linecap="round"/>`).join('')}
  <g filter="url(#clay)"><rect x="40" y="980" width="700" height="180" rx="30" fill="${p.surface}"/></g>
  <text x="76" y="1040" fill="${p.muted}" font-family="${M}" font-size="20">TOTAL</text>
  <text x="76" y="1108" fill="${p.accent}" font-family="${D}" font-size="54">${m.big}</text>
  ${tabbar(p,i)}`;
}

function visual(p, m, i) {
  const cols = [p.accent, p.second, p.muted, p.line];
  return `${header(p, 'COLECCIÓN', m.title)}
  <g filter="url(#clay)"><rect x="40" y="250" width="700" height="420" rx="36" fill="${p.accent}"/></g>
  <circle cx="600" cy="380" r="120" fill="#FFFFFF" opacity=".12"/>
  <text x="76" y="350" fill="${p.dark?'#0E1116':'#FFFFFF'}" font-family="${M}" font-size="20" letter-spacing="3">DESTAQUE</text>
  <text x="76" y="470" fill="${p.dark?'#0E1116':'#FFFFFF'}" font-family="${D}" font-size="62">${m.big}</text>
  <text x="76" y="620" fill="${p.dark?'#0E1116':'#FFFFFF'}" font-family="${F}" font-size="24">${m.items[0]}</text>
  ${m.items.slice(1).map((it,k)=>`<g filter="url(#clay)"><rect x="${40+(k%2)*358}" y="${710+Math.floor(k/2)*310}" width="342" height="280" rx="26" fill="${p.surface}"/></g>
  <rect x="${56+(k%2)*358}" y="${726+Math.floor(k/2)*310}" width="310" height="160" rx="18" fill="${cols[k%4]}" opacity=".85"/>
  <text x="${70+(k%2)*358}" y="${944+Math.floor(k/2)*310}" fill="${p.text}" font-family="${F}" font-size="23" font-weight="700">${it}</text>`).join('')}
  ${tabbar(p,i)}`;
}

function detail(p, m, i) {
  return `${header(p, 'ESTADO', m.title)}
  <g filter="url(#clay)"><rect x="40" y="250" width="700" height="290" rx="34" fill="${p.surface}"/></g>
  <text x="76" y="320" fill="${p.muted}" font-family="${M}" font-size="20" letter-spacing="3">MÉTRICA</text>
  <text x="76" y="470" fill="${p.accent}" font-family="${D}" font-size="96">${m.big}</text>
  <text x="44" y="610" fill="${p.text}" font-family="${D}" font-size="30">Secuencia</text>
  <g filter="url(#clay)"><rect x="40" y="640" width="700" height="150" rx="28" fill="${p.surface}"/></g>
  ${[0,1,2,3,4,5,6].map(k=>`<circle cx="${95+k*98}" cy="715" r="32" fill="${k<4?p.accent:p.line}"/>
  <text x="${95+k*98}" y="724" fill="${k<4?(p.dark?'#0E1116':'#FFFFFF'):p.muted}" font-family="${F}" font-size="21" text-anchor="middle">${k+1}</text>`).join('')}
  ${m.items.map((it,k)=>`<g filter="url(#clay)"><rect x="40" y="${830+k*190}" width="700" height="160" rx="26" fill="${p.surface}"/></g>
  <circle cx="100" cy="${910+k*190}" r="34" fill="${k===1?p.second:p.accent}" opacity=".9"/>
  <text x="164" y="${920+k*190}" fill="${p.text}" font-family="${F}" font-size="29" font-weight="700">${it}</text>`).join('')}
  ${tabbar(p,i)}`;
}

function stylesScreen(p, m, i) {
  const palettes = [
    ['#0E1116','#C8FF3D','#25E0F5'], ['#F4EFE7','#FF6A2B','#E5007D'],
    ['#14100C','#E8A33D','#7FA88B'], ['#0E0B1A','#B98CFF','#4FD6C9']
  ];
  const [bg, a1, a2] = palettes[i];
  return `${header(p, `SISTEMA ${i+1} DE 4`, m.title)}
  <g filter="url(#clay)"><rect x="40" y="250" width="700" height="700" rx="36" fill="${bg}"/></g>
  <text x="76" y="330" fill="${a1}" font-family="${D}" font-size="58">${m.big}</text>
  <rect x="76" y="380" width="628" height="120" fill="${a1}"/>
  <rect x="76" y="520" width="400" height="120" fill="${a2}"/>
  <rect x="76" y="680" width="628" height="8" fill="${a2}" opacity=".6"/>
  <rect x="76" y="720" width="300" height="60" fill="${a1}" opacity=".7"/>
  <text x="76" y="870" fill="${i===1?'#14171C':'#FFFFFF'}" font-family="${M}" font-size="22">${m.items.join(' · ')}</text>
  <g filter="url(#clay)"><rect x="40" y="1000" width="700" height="500" rx="30" fill="${p.surface}"/></g>
  ${m.items.map((it,k)=>`<text x="76" y="${1070+k*130}" fill="${p.text}" font-family="${F}" font-size="30" font-weight="700">${String(k+1).padStart(2,'0')} · ${it}</text>`).join('')}
  ${tabbar(p,i)}`;
}

await mkdir(OUT, { recursive: true });
for (const [slug, p] of Object.entries(P)) {
  for (let i = 0; i < 4; i++) {
    const m = p.moments[i];
    const fn = slug === 'estilos' ? stylesScreen : [dashboard, listScreen, visual, detail][i];
    const svg = shell(fn(p, m, i), `${slug} momento ${i+1}: ${m.label}`, p.dark);
    const name = `${slug}-${['hoy','plan','hitos','logros'][i]}.svg`;
    await writeFile(join(OUT, name), svg, 'utf8');
  }
  console.log('OK  ' + slug + ' · 4 momentos');
}
console.log('Total: ' + Object.keys(P).length * 4 + ' pantallas');
