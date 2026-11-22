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
<html lang="es" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#EDEBE4">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230E1116'/%3E%3Crect x='10' y='10' width='12' height='12' fill='%23C8FF3D'/%3E%3C/svg%3E">
  <meta name="description" content="${p.name} — ${p.tagline}. Proyecto realizado por Uskein Studio, con demos en video.">
  <link rel="canonical" href="https://uskein.com/productos/${p.slug}/">
  <meta property="og:title" content="${p.name} — Uskein Studio">
  <meta property="og:description" content="${p.tagline}">
  <meta property="og:image" content="https://uskein.com/assets/img/moments/${p.slug}-poster.png">
  <meta property="og:url" content="https://uskein.com/productos/${p.slug}/">
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
      <a class="brand" href="../../index.html" aria-label="Uskein Studio, inicio"><span class="reg" aria-hidden="true"></span>USKEIN STUDIO</a>
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
      <div class="grid-bg" aria-hidden="true"></div>
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
