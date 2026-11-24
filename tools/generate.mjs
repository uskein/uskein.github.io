/* Genera las fichas de producto a partir de assets/js/data.js */
import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// data.js es un script clásico: se evalúa en un sandbox con window.
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, 'assets/js/data.js'), 'utf8'), sandbox);
const { PRODUCTS, getAdjacent } = sandbox.window.USKEIN_DATA;
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const NAV_PAINT = `<div class="nav-paint" aria-hidden="true">
      <svg viewBox="0 0 1440 128" preserveAspectRatio="none">
        <path class="paint-shadow" d="M0,22 C60,10 120,30 180,20 C240,10 300,28 360,18 C420,8 480,26 540,16 C600,6 660,24 720,14 C780,4 840,22 900,12 C960,2 1020,20 1080,10 C1140,0 1200,18 1260,8 C1320,0 1380,14 1440,6 L1440,24 C1400,24 1360,30 1314,30 C1310,30 1308,50 1306,74 C1304,90 1298,98 1282,98 C1266,98 1260,90 1258,74 C1256,50 1254,30 1250,30 C1200,30 1160,26 1120,26 C1070,26 1050,32 1020,34 C1016,54 1014,78 1012,92 C1010,106 1002,112 984,112 C966,112 958,106 956,92 C954,78 952,54 948,34 C920,30 890,26 850,26 C810,26 780,32 750,34 C746,54 744,78 742,92 C740,106 732,112 714,112 C696,112 688,106 686,92 C684,78 682,54 678,34 C650,30 620,26 580,26 C540,26 510,32 480,34 C476,54 474,78 472,92 C470,106 462,112 444,112 C426,112 418,106 416,92 C414,78 412,54 408,34 C380,30 350,26 310,26 C240,26 180,30 120,28 C80,26 40,30 0,30 Z"/>
        <path class="paint-base" d="M0,22 C60,10 120,30 180,20 C240,10 300,28 360,18 C420,8 480,26 540,16 C600,6 660,24 720,14 C780,4 840,22 900,12 C960,2 1020,20 1080,10 C1140,0 1200,18 1260,8 C1320,0 1380,14 1440,6 L1440,24 C1400,24 1360,30 1314,30 C1310,30 1308,50 1306,74 C1304,90 1298,98 1282,98 C1266,98 1260,90 1258,74 C1256,50 1254,30 1250,30 C1200,30 1160,26 1120,26 C1070,26 1050,32 1020,34 C1016,54 1014,78 1012,92 C1010,106 1002,112 984,112 C966,112 958,106 956,92 C954,78 952,54 948,34 C920,30 890,26 850,26 C810,26 780,32 750,34 C746,54 744,78 742,92 C740,106 732,112 714,112 C696,112 688,106 686,92 C684,78 682,54 678,34 C650,30 620,26 580,26 C540,26 510,32 480,34 C476,54 474,78 472,92 C470,106 462,112 444,112 C426,112 418,106 416,92 C414,78 412,54 408,34 C380,30 350,26 310,26 C240,26 180,30 120,28 C80,26 40,30 0,30 Z"/>
        <path class="paint-light" d="M0,18 C60,6 120,26 180,16 C240,6 300,24 360,14 C420,4 480,22 540,12 C600,2 660,20 720,10 C780,0 840,18 900,8 C960,-2 1020,16 1080,6 C1140,-4 1200,14 1260,4 C1320,-4 1380,10 1440,2 L1440,12 C1380,20 1320,6 1260,14 C1200,24 1140,6 1080,16 C1020,26 960,8 900,18 C840,28 780,10 720,20 C660,30 600,12 540,22 C480,32 420,14 360,24 C300,34 240,16 180,26 C120,36 60,16 0,28 Z"/>
        <circle class="paint-accent" cx="1350" cy="58" r="7"/>
        <circle class="paint-accent" cx="790" cy="72" r="6"/>
        <circle class="paint-accent" cx="350" cy="64" r="6.5"/>
        <circle class="paint-drop" cx="1150" cy="98" r="8"/>
        <circle class="paint-drop" cx="600" cy="104" r="7"/>
        <circle class="paint-drop" cx="170" cy="102" r="7.5"/>
      </svg>
    </div>`;

function page(p) {
  const { prev, next } = getAdjacent(p.slug);
  const demoBtn = p.demo
    ? `<a class="btn btn--primary" href="${p.demo}" target="_blank" rel="noopener noreferrer">${p.demoLabel} ${arrow}</a>`
    : `<a class="btn btn--primary" data-wa="Quiero probar ${p.name}." href="#">Solicitar acceso ${arrow}</a>`;
  const codeBtn = p.code
    ? `<a class="btn btn--secondary" href="${p.code}" target="_blank" rel="noopener noreferrer">Ver código</a>`
    : `<a class="btn btn--secondary" href="../../index.html#contacto">Hacer una pregunta</a>`;
  const realShot = p.image.startsWith('real-')
    ? `<div class="shot shot--real"><img src="../../assets/img/${p.image}" alt="Captura real de ${p.name}" loading="lazy"></div>`
    : '';
  const demoSection = p.demoVideo ? `
    <section class="section">
      <div class="container">
        <p class="eyebrow reveal">03 · Demo en video</p>
        <h2 class="h2 reveal">Cuatro momentos, 17 segundos</h2>
        <p class="lede reveal">Recorrido por las pantallas reales del producto: hoy, plan, hitos y logros.</p>
        <div class="video-frame reveal" style="margin-top:var(--s-8)">
          <video controls preload="none" poster="../../assets/img/moments/${p.slug}-poster.png" aria-label="Video demo de ${p.name}">
            <source src="../../assets/video/${p.demoVideo}" type="video/mp4">
            Tu navegador no soporta video. <a href="../../assets/video/${p.demoVideo}">Descárgalo</a>.
          </video>
        </div>
      </div>
    </section>
` : '';

  return `<!doctype html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0E1116">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230E1116'/%3E%3Crect x='10' y='10' width='12' height='12' fill='%23C8FF3D'/%3E%3C/svg%3E">
  <meta name="description" content="${p.name} — ${p.tagline}. Proyecto realizado por Uskein Studio, con demos en video.">
  <link rel="canonical" href="https://uskein.github.io/productos/${p.slug}/">
  <meta property="og:title" content="${p.name} — Uskein Studio">
  <meta property="og:description" content="${p.tagline}">
  <meta property="og:image" content="https://uskein.github.io/assets/img/og-linkedin.png">
  <meta property="og:url" content="https://uskein.github.io/productos/${p.slug}/">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' https://plausible.io https://static.cloudflareinsights.com; img-src 'self' data:; media-src 'self'; connect-src 'self' https://formspree.io https://formsubmit.co https://plausible.io https://cloudflareinsights.com;">
  <title>${p.name} — Uskein Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/tokens.css">
  <link rel="stylesheet" href="../../assets/css/site.css">
  <link rel="stylesheet" href="../../assets/css/product.css">
  <script defer src="../../assets/js/data.js"></script>
  <script defer src="../../assets/js/main.js"></script>
</head>
<body style="--product:${p.accent}">
  <a class="skip-link" href="#main">Saltar al contenido</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="../../index.html" aria-label="Uskein Studio, inicio"><span class="reg" aria-hidden="true"></span><span class="header-seal" aria-hidden="true">US</span>USKEIN STUDIO</a>
      <nav class="nav" aria-label="Navegación principal">
        <a href="../../index.html#servicios">Servicios</a>
        <a href="../../index.html#catalogo">Catálogo</a>
        <a href="../../index.html#por-que">Por qué</a>
        <a href="../../index.html#precios">Licencias</a>
        <a href="../../index.html#contacto">Contacto</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" type="button" aria-label="Activar modo claro">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
        <a class="btn btn--primary btn--sm" href="../../index.html#contacto">Hablemos</a>
        <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    ${NAV_PAINT}
  </header>

  <main id="main">
    <div class="container">
      <nav class="breadcrumb" aria-label="Ruta de navegación">
        <a href="../../index.html">Inicio</a><span>/</span>
        <a href="../../index.html#catalogo">Proyectos</a><span>/</span>
        <span>${p.id}</span>
      </nav>
    </div>

    <section class="pdp-hero">
      <div class="container">
        <div>
          <p class="pdp-hero__id">${p.id} · Proyecto realizado · ${p.categoryLabel}</p>
          <h1>${p.name}</h1>
          <p class="pdp-hero__tag">${p.tagline}</p>
          <div class="pdp-hero__actions">
            ${demoBtn}
            ${codeBtn}
          </div>
        </div>
        <figure class="pdp-visual">
          <img src="../../assets/img/${p.image}" alt="Vista previa de ${p.name}" width="1200" height="675">
          <figcaption>${p.id} · ${p.platform}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="placa reveal">
          <div class="placa__metrics">
            ${p.metrics.map(m => `<div class="metric"><div class="metric__value">${m.value}</div><div class="metric__label">${m.label}</div></div>`).join('\n            ')}
          </div>
        </div>
        <div class="pdp-quote reveal">
          «${p.tagline}»
          <cite>${p.name} · Uskein Studio</cite>
        </div>
        <p class="lede reveal">${p.description}</p>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <p class="eyebrow reveal">01 · Funcionalidades</p>
        <h2 class="h2 reveal">Lo que hace cada día</h2>
        <div class="feature-list reveal" style="margin-top:var(--s-10)">
          ${p.features.map((f, i) => `<article class="feature-item">
            <span class="feature-item__num">${String(i + 1).padStart(2, '0')}</span>
            <div><h3>${f.title}</h3><p>${f.text}</p></div>
          </article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="eyebrow reveal">02 · La interfaz</p>
        <h2 class="h2 reveal">Cuatro momentos del producto</h2>
        <p class="lede reveal">Composiciones de retícula que anticipan la estructura real de la aplicación.</p>
        <div class="shots reveal" style="margin-top:var(--s-10)">
          ${realShot}
          ${p.momentImages
            ? p.momentImages.map((img, i) => `<div class="shot shot--moment"><img src="../../assets/img/moments/${img}" alt="${p.shots[i]}" loading="lazy"><span class="shot__label">${String(i + 1).padStart(2, '0')} · ${p.shots[i]}</span></div>`).join('\n          ')
            : p.shots.map((s, i) => `<div class="shot"><span class="shot__label">${String(i + 1).padStart(2, '0')} · ${s}</span></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    ${demoSection}
    <section class="section section--alt">
      <div class="container">
        <p class="eyebrow reveal">05 · Tu proyecto</p>
        <h2 class="h2 reveal">¿Quieres algo así para tu negocio?</h2>
        <div class="contact-grid reveal" style="margin-top:var(--s-10)">
          <div>
            <ul class="audit-list">
              ${p.bullets.map(b => `<li>${check}<span>${b}</span></li>`).join('\n              ')}
            </ul>
            <p class="lede" style="margin-top:var(--s-8)">Estado del proyecto: <strong>${p.statusLabel}</strong>. Plataforma: ${p.platform}. Construido con ${p.stack}. Este es uno de los diez proyectos ya realizados por Uskein Studio.</p>
          </div>
          <div>
            <h3 class="h3">Construimos algo parecido para ti</h3>
            <p class="lede" style="margin-top:var(--s-3)">Cuéntame tu operación y te propongo un alcance concreto: móvil, web o sistema transaccional.</p>
            <div class="hero__cta" style="margin-top:var(--s-6)">
              <a class="btn btn--primary" data-wa="Me gustaría un proyecto similar a ${p.name}." href="#">Pedir propuesta</a>
              <a class="btn btn--secondary" href="../../index.html#servicios">Ver servicios</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <nav class="product-nav" aria-label="Otros productos">
        <a href="${prev.slug}/index.html"><small>← Anterior · ${prev.id}</small><strong>${prev.name}</strong></a>
        <a href="${next.slug}/index.html"><small>Siguiente · ${next.id} →</small><strong>${next.name}</strong></a>
      </nav>
    </div>

    <section class="cta-band">
      <div class="container">
        <div>
          <p class="eyebrow">Tu próximo proyecto</p>
          <h2 class="h2">Cuéntame qué necesitas construir.</h2>
        </div>
        <a class="btn btn--secondary" data-wa="Hola Uskein Studio, quiero cotizar mi proyecto." href="#">Hablemos ${arrow}</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="../../index.html"><span class="reg" aria-hidden="true"></span>USKEIN STUDIO</a>
          <p>Software local-first para gente que necesita que las herramientas funcionen, aunque la red no.</p>
        </div>
        <div class="footer-col">
          <h4>Productos</h4>
          <a href="../../index.html#servicios">Servicios a la medida</a>
          <a href="../../index.html#catalogo">Catálogo completo</a>
          <a href="../habitos/index.html">Pulse Clay</a>
          <a href="../inspector/index.html">INSPECTOR</a>
          <a href="../monedero/index.html">Monedero</a>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <a data-wa="Hola Uskein Studio" href="#">WhatsApp</a>
          <a data-mail="Hola" href="#">Correo</a>
          <a href="../../index.html#contacto">Formulario</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> Uskein Studio</span>
        <span>${p.id} · Publicado en GitHub Pages</span>
      </div>
    </div>
  </footer>

  <a class="wa-float" data-wa="Hola Uskein Studio, quiero cotizar un proyecto similar a ${p.name}." href="#" aria-label="Hablar por WhatsApp">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.7 9.7 0 0 1-3-.5L3 21l1.6-5a8.4 8.4 0 1 1 16.4-4.5Z"/><path d="M9 9.5c.2 2.7 2.8 5.3 5.5 5.5l1.3-1.4 2 .9c.3.1.4.4.3.7-.6 1.5-2.3 2.3-4.4 1.9-3.4-.6-6.1-3.3-6.7-6.7-.4-2.1.4-3.8 1.9-4.4.3-.1.6 0 .7.3l.9 2L9 9.5Z"/></svg>
  </a>

  <div class="toast-stack" aria-live="polite"></div>
  <button class="to-top" type="button" aria-label="Volver arriba">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
  </button>
</body>
</html>
`;
}

for (const p of PRODUCTS) {
  const dir = join(ROOT, 'productos', p.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), page(p), 'utf8');
  console.log(`OK  ${p.id}  productos/${p.slug}/index.html`);
}
console.log(`\n${PRODUCTS.length} fichas generadas.`);
