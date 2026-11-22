/* Cuatro momentos de Pulse Clay reconstruidos desde sus blueprints y tokens reales.
   SVG 780x1688 (equivalente a 390x844 @2x). */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/img/moments');

const C = {
  primary: '#6D4BF5', primarySoft: '#8B78FF', track: '#DDD5FB',
  secondary: '#2EC4B6', streak: '#FF6B6B', award: '#F59E0B',
  bg: '#F7F5FF', surface: '#FFFFFF', surfaceAlt: '#EFEBFF',
  text: '#17122B', muted: '#67617E', border: '#E4DFF3', faded: '#9B95B5'
};

const font = "'Plus Jakarta Sans', Arial, sans-serif";
const display = "'Sora', Arial, sans-serif";

function frame(body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 1688" width="780" height="1688" role="img" aria-label="${title}">
  <defs>
    <filter id="clay" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#17122B" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="780" height="1688" fill="${C.bg}"/>
  ${body}
  <rect x="4" y="4" width="772" height="1680" rx="46" fill="none" stroke="${C.border}" stroke-width="4"/>
</svg>`;
}

function statusBar() {
  return `<text x="48" y="60" fill="${C.text}" font-family="${font}" font-size="24" font-weight="700">9:41</text>
  <rect x="620" y="38" width="38" height="20" rx="5" fill="none" stroke="${C.text}" stroke-width="3"/>
  <rect x="626" y="44" width="24" height="8" fill="${C.text}"/>
  <rect x="672" y="38" width="58" height="20" rx="6" fill="${C.text}"/>`;
}

function tabBar(active) {
  const tabs = [
    ['Hoy', 100], ['Plan', 265], ['Hitos', 430], ['Logros', 595], ['Perfil', 745]
  ];
  return `<rect x="0" y="1560" width="780" height="128" fill="${C.surface}"/>
  <line x1="0" y1="1560" x2="780" y2="1560" stroke="${C.border}" stroke-width="2"/>
  ${tabs.map(([t, x], i) => {
    const col = i === active ? C.primary : C.faded;
    return `<circle cx="${x}" cy="1604" r="16" fill="none" stroke="${col}" stroke-width="4"/>
    <text x="${x}" y="1660" fill="${col}" font-family="${font}" font-size="19" text-anchor="middle" font-weight="${i === active ? 700 : 500}">${t}</text>`;
  }).join('')}`;
}

function habitRow(y, name, sub, done, color) {
  return `<g filter="url(#clay)"><rect x="40" y="${y}" width="700" height="108" rx="28" fill="${C.surface}"/></g>
  <rect x="62" y="${y + 24}" width="60" height="60" rx="20" fill="${color}"/>
  <text x="92" y="${y + 64}" fill="#FFFFFF" font-family="${font}" font-size="28" text-anchor="middle">${name[0]}</text>
  <text x="148" y="${y + 48}" fill="${C.text}" font-family="${font}" font-size="27" font-weight="700">${name}</text>
  <text x="148" y="${y + 80}" fill="${C.muted}" font-family="${font}" font-size="20">${sub}</text>
  <circle cx="690" cy="${y + 54}" r="30" fill="${done ? C.primary : C.surfaceAlt}" stroke="${done ? C.primary : C.track}" stroke-width="4"/>
  ${done ? `<path d="M677 ${y + 54} l9 9 l18 -20" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
}

const hoy = frame(`
  ${statusBar()}
  <text x="44" y="130" fill="${C.muted}" font-family="${font}" font-size="24">Buenos días, Sebastián</text>
  <text x="44" y="180" fill="${C.text}" font-family="${display}" font-size="46" font-weight="800">Hoy</text>
  <circle cx="700" cy="150" r="42" fill="${C.primarySoft}"/>
  <text x="700" y="162" fill="#FFFFFF" font-family="${font}" font-size="30" text-anchor="middle">S</text>

  <g filter="url(#clay)"><rect x="40" y="224" width="700" height="236" rx="36" fill="${C.surface}"/></g>
  <text x="76" y="278" fill="${C.muted}" font-family="${font}" font-size="20" letter-spacing="2">RACHA ACTUAL</text>
  <text x="76" y="372" fill="${C.primary}" font-family="${display}" font-size="96" font-weight="800">12</text>
  <text x="210" y="368" fill="${C.streak}" font-family="${font}" font-size="52">▲</text>
  <rect x="520" y="288" width="180" height="52" rx="26" fill="${C.surfaceAlt}"/>
  <text x="610" y="322" fill="${C.primary}" font-family="${font}" font-size="22" text-anchor="middle" font-weight="700">Nivel 4</text>
  <text x="76" y="428" fill="${C.muted}" font-family="${font}" font-size="22">3 de 5 hábitos completados hoy</text>
  <rect x="76" y="450" width="628" height="8" rx="4" fill="${C.track}"/>
  <rect x="76" y="450" width="377" height="8" rx="4" fill="${C.primary}"/>

  ${habitRow(500, 'Lectura', '20 min · mañana', true, C.primary)}
  ${habitRow(630, 'Ejercicio', '30 min · tarde', true, C.secondary)}
  ${habitRow(760, 'Meditar', '10 min · noche', false, C.award)}
  ${habitRow(890, 'Agua', '8 vasos', true, C.streak)}

  <text x="44" y="1052" fill="${C.text}" font-family="${display}" font-size="30" font-weight="700">Check-in de bienestar</text>
  <g filter="url(#clay)"><rect x="40" y="1080" width="700" height="150" rx="32" fill="${C.surface}"/></g>
  <text x="76" y="1132" fill="${C.muted}" font-family="${font}" font-size="20">¿Cómo te sientes?</text>
  ${[0,1,2,3,4].map(i => `<circle cx="${120 + i * 135}" cy="1190" r="30" fill="${i === 3 ? C.secondary : C.surfaceAlt}"/>`).join('')}
  <text x="525" y="1198" fill="${C.muted}" font-family="${font}" font-size="18">ánimo</text>

  <circle cx="680" cy="1460" r="56" fill="${C.primary}"/>
  <path d="M680 1436 v48 M656 1460 h48" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
  ${tabBar(0)}
`, 'Momento 1: feed de hoy de Pulse Clay');

const plan = frame(`
  ${statusBar()}
  <text x="44" y="130" fill="${C.muted}" font-family="${font}" font-size="24">Tu plan</text>
  <text x="44" y="182" fill="${C.text}" font-family="${display}" font-size="46" font-weight="800">Plan y metas</text>
  <rect x="40" y="220" width="330" height="60" rx="30" fill="${C.primary}"/>
  <text x="205" y="260" fill="#FFFFFF" font-family="${font}" font-size="24" text-anchor="middle" font-weight="700">Hábitos</text>
  <rect x="390" y="220" width="350" height="60" rx="30" fill="${C.surfaceAlt}"/>
  <text x="565" y="260" fill="${C.muted}" font-family="${font}" font-size="24" text-anchor="middle">Metas</text>

  ${habitRow(320, 'Lectura', 'Diario · 20 min', true, C.primary)}
  ${habitRow(450, 'Ejercicio', 'Lun / Mié / Vie', false, C.secondary)}
  ${habitRow(580, 'Meditar', 'Diario · 10 min', true, C.award)}
  ${habitRow(710, 'Agua', '8 vasos al día', true, C.streak)}

  <text x="44" y="880" fill="${C.text}" font-family="${display}" font-size="30" font-weight="700">Metas activas</text>
  <g filter="url(#clay)"><rect x="40" y="910" width="700" height="250" rx="36" fill="${C.surface}"/></g>
  <text x="76" y="966" fill="${C.text}" font-family="${font}" font-size="30" font-weight="700">Leer 12 libros este año</text>
  <text x="76" y="1006" fill="${C.muted}" font-family="${font}" font-size="21">8 de 12 completados</text>
  <rect x="76" y="1040" width="628" height="16" rx="8" fill="${C.track}"/>
  <rect x="76" y="1040" width="419" height="16" rx="8" fill="${C.primary}"/>
  <text x="640" y="1010" fill="${C.primary}" font-family="${font}" font-size="28" font-weight="700" text-anchor="end">67%</text>
  <text x="76" y="1110" fill="${C.muted}" font-family="${font}" font-size="19">Ritmo: 2 libros al mes</text>

  <g filter="url(#clay)"><rect x="40" y="1190" width="700" height="180" rx="36" fill="${C.surface}"/></g>
  <text x="76" y="1248" fill="${C.text}" font-family="${font}" font-size="28" font-weight="700">Correr 10 km</text>
  <rect x="76" y="1280" width="628" height="14" rx="7" fill="${C.track}"/>
  <rect x="76" y="1280" width="314" height="14" rx="7" fill="${C.secondary}"/>
  <text x="640" y="1320" fill="${C.secondary}" font-family="${font}" font-size="26" font-weight="700" text-anchor="end">50%</text>

  <circle cx="680" cy="1460" r="56" fill="${C.primary}"/>
  <path d="M680 1436 v48 M656 1460 h48" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
  ${tabBar(1)}
`, 'Momento 2: plan y metas de Pulse Clay');

const hitos = frame(`
  ${statusBar()}
  <text x="44" y="130" fill="${C.muted}" font-family="${font}" font-size="24">Tu historia</text>
  <text x="44" y="182" fill="${C.text}" font-family="${display}" font-size="48" font-weight="800">Top hitos</text>

  <g filter="url(#clay)"><rect x="40" y="224" width="700" height="420" rx="40" fill="${C.primary}"/></g>
  <rect x="40" y="224" width="700" height="420" rx="40" fill="${C.primarySoft}" opacity="0.45"/>
  <circle cx="620" cy="320" r="70" fill="#FFFFFF" opacity="0.18"/>
  <circle cx="180" cy="560" r="110" fill="#FFFFFF" opacity="0.10"/>
  <rect x="76" y="268" width="150" height="46" rx="23" fill="${C.award}"/>
  <text x="151" y="298" fill="#FFFFFF" font-family="${font}" font-size="20" text-anchor="middle" font-weight="700">NUEVO</text>
  <text x="76" y="500" fill="#FFFFFF" font-family="${display}" font-size="44" font-weight="800">Primera semana</text>
  <text x="76" y="554" fill="#FFFFFF" font-family="${display}" font-size="44" font-weight="800">completa</text>
  <text x="76" y="608" fill="#FFFFFF" font-family="${font}" font-size="22" opacity="0.85">12 nov 2026 · 7 días seguidos</text>

  <text x="44" y="710" fill="${C.text}" font-family="${display}" font-size="30" font-weight="700">Todos los hitos</text>
  ${[
    [40, 750, C.secondary, 'Racha de 30 días'],
    [400, 750, C.award, 'Medalla de oro'],
    [40, 1090, C.streak, 'Primer 10K'],
    [400, 1090, C.primary, '100 sesiones']
  ].map(([x, y, col, label]) => `
    <g filter="url(#clay)"><rect x="${x}" y="${y}" width="340" height="310" rx="30" fill="${C.surface}"/></g>
    <rect x="${x + 14}" y="${y + 14}" width="312" height="180" rx="22" fill="${col}" opacity="0.85"/>
    <circle cx="${x + 170}" cy="${y + 104}" r="48" fill="#FFFFFF" opacity="0.28"/>
    <text x="${x + 24}" y="${y + 246}" fill="${C.text}" font-family="${font}" font-size="23" font-weight="700">${label}</text>
    <text x="${x + 24}" y="${y + 280}" fill="${C.muted}" font-family="${font}" font-size="19">Hito desbloqueado</text>
  `).join('')}
  ${tabBar(2)}
`, 'Momento 3: top hitos de Pulse Clay');

const logros = frame(`
  ${statusBar()}
  <text x="44" y="130" fill="${C.muted}" font-family="${font}" font-size="24">Tu vitrina</text>
  <text x="44" y="182" fill="${C.text}" font-family="${display}" font-size="48" font-weight="800">Logros</text>

  <g filter="url(#clay)"><rect x="40" y="224" width="700" height="280" rx="36" fill="${C.surface}"/></g>
  <text x="76" y="282" fill="${C.muted}" font-family="${font}" font-size="20" letter-spacing="2">NIVEL ACTUAL</text>
  <text x="76" y="372" fill="${C.primary}" font-family="${display}" font-size="88" font-weight="800">04</text>
  <text x="230" y="366" fill="${C.text}" font-family="${font}" font-size="28" font-weight="700">Constante</text>
  <text x="230" y="402" fill="${C.muted}" font-family="${font}" font-size="20">1.240 puntos de experiencia</text>
  <rect x="76" y="430" width="628" height="14" rx="7" fill="${C.track}"/>
  <rect x="76" y="430" width="440" height="14" rx="7" fill="${C.primary}"/>
  <rect x="520" y="262" width="185" height="52" rx="26" fill="${C.surfaceAlt}"/>
  <text x="612" y="296" fill="${C.primary}" font-family="${font}" font-size="20" text-anchor="middle" font-weight="700">FREEZE 2/2</text>

  <text x="44" y="568" fill="${C.text}" font-family="${display}" font-size="30" font-weight="700">Esta semana</text>
  <g filter="url(#clay)"><rect x="40" y="596" width="700" height="128" rx="28" fill="${C.surface}"/></g>
  ${['L','M','X','J','V','S','D'].map((d, i) => `
    <circle cx="${92 + i * 99}" cy="660" r="32" fill="${i < 5 ? C.secondary : C.surfaceAlt}"/>
    <text x="${92 + i * 99}" y="668" fill="${i < 5 ? '#FFFFFF' : C.faded}" font-family="${font}" font-size="22" text-anchor="middle">${d}</text>
  `).join('')}

  <text x="44" y="796" fill="${C.text}" font-family="${display}" font-size="30" font-weight="700">Medallas</text>
  ${[
    [40, 830, C.award, '7 días'], [400, 830, C.primary, '30 días'],
    [40, 1120, C.secondary, 'Salud'], [400, 1120, C.streak, 'Viajero']
  ].map(([x, y, col, label]) => `
    <g filter="url(#clay)"><rect x="${x}" y="${y}" width="340" height="260" rx="28" fill="${C.surface}"/></g>
    <circle cx="${x + 170}" cy="${y + 105}" r="66" fill="${col}" opacity="0.18"/>
    <circle cx="${x + 170}" cy="${y + 105}" r="48" fill="${col}"/>
    <path d="M${x + 170} ${y + 78} l10 20 l22 3 l-16 16 l4 22 l-20 -11 l-20 11 l4 -22 l-16 -16 l22 -3 z" fill="#FFFFFF" opacity="0.9"/>
    <text x="${x + 170}" y="${y + 212}" fill="${C.text}" font-family="${font}" font-size="23" font-weight="700" text-anchor="middle">${label}</text>
  `).join('')}
  ${tabBar(3)}
`, 'Momento 4: vitrina de logros de Pulse Clay');

await mkdir(OUT, { recursive: true });
for (const [name, svg] of Object.entries({ 'habitos-hoy.svg': hoy, 'habitos-plan.svg': plan, 'habitos-hitos.svg': hitos, 'habitos-logros.svg': logros })) {
  await writeFile(join(OUT, name), svg, 'utf8');
  console.log('OK  moments/' + name);
}
