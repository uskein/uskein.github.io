/* ============================================================
   USKEIN STUDIO — Interacción del brochure (vanilla JS)
   ============================================================ */

var USKEIN_DATA = window.USKEIN_DATA || { CATEGORIES: [], PRODUCTS: [] };
var CATEGORIES = USKEIN_DATA.CATEGORIES;
var PRODUCTS = USKEIN_DATA.PRODUCTS;

/* CONFIGURACIÓN */
var CONFIG = {
  // Envío sin cuenta: Formsubmit.confirma el correo una sola vez. Formspree es opcional.
  formsubmitEmail: 'juansebastianp188@gmail.com',
  formspreeId: '',                     // Si lo tienes, se usa en vez de Formsubmit
  whatsapp: '573132904451',            // Colombia: 57 + 313 290 4451
  email: 'juansebastianp188@gmail.com',
  whatsappText: 'Hola Uskein Studio, quiero información sobre aplicaciones móviles, aplicaciones web o sistemas transaccionales a la medida.',
  analytics: { plausibleDomain: '', cloudflareToken: '' } // gratis; dejar vacío para no cargar nada
};
window.USKEIN_CONFIG = CONFIG;

/* ---------- Captura de UTM (para saber de dónde llega cada visita) ---------- */
var UTM = {};
try {
  var params = new URLSearchParams(location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
    if (params.get(k)) UTM[k] = params.get(k);
  });
  if (Object.keys(UTM).length) localStorage.setItem('uskein-utm', JSON.stringify(UTM));
} catch (err) { /* file:// o navegador sin localStorage */ }
window.USKEIN_UTM = UTM;

/* ---------- Tema ---------- */
const THEME_KEY = 'uskein-theme';
const root = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light'; // modo claro por defecto, según solicitud
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0E1116' : '#EDEBE4');
}

applyTheme(getPreferredTheme());

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- Menú móvil ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

/* ---------- Año en footer ---------- */
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Render del catálogo ---------- */
function renderCatalog() {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <a class="product-card reveal" href="productos/${p.slug}/index.html"
       data-category="${p.category}" data-services="${(p.services || []).join(' ')}" style="--card-accent:${p.accent}">
      <div class="product-card__media"><img src="assets/img/${p.image}" alt="Vista previa de ${p.name}" loading="lazy"></div>
      <div class="product-card__body">
        <div class="product-card__top">
          <span class="product-card__id">${p.id}</span>
          <span class="status status--${p.status}">${p.statusLabel}</span>
        </div>
        <h3 class="product-card__title">${p.name}</h3>
        <p class="product-card__tag">${p.tagline}</p>
        <div class="product-card__meta">
          <span class="chip chip--demo">Demo disponible</span>
          <span class="chip">${p.categoryLabel}</span>
          <span class="chip">${p.platform}</span>
        </div>
        <div class="product-card__foot">
          <span class="product-card__platform">${p.stack}</span>
          <span class="product-card__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </div>
    </a>`).join('');
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

var SERVICE_FILTERS = [
  { id: 'all', label: 'Todos los servicios' },
  { id: 'movil', label: 'Móvil' },
  { id: 'web', label: 'Web' },
  { id: 'sistema', label: 'Transaccional' }
];

function renderFilters() {
  const catBar = document.querySelector('#filters');
  if (catBar) catBar.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
  ).join('');
  const svcBar = document.querySelector('#service-filters');
  if (svcBar) svcBar.innerHTML = SERVICE_FILTERS.map((s, i) =>
    `<button class="chip" type="button" data-service-filter="${s.id}" aria-pressed="${i === 0}">${s.label}</button>`
  ).join('');
}

renderFilters();
renderCatalog();

/* ---------- Filtros combinados (categoría + servicio) ---------- */
var activeCategory = 'all';
var activeService = 'all';
function applyFilters() {
  document.querySelectorAll('.product-card[data-category]').forEach(function (card) {
    var catOk = activeCategory === 'all' || card.dataset.category === activeCategory;
    var svcOk = activeService === 'all' || (card.dataset.services || '').split(' ').indexOf(activeService) !== -1;
    card.hidden = !(catOk && svcOk);
  });
}
document.querySelectorAll('.chip[data-filter]').forEach(function (chip) {
  chip.addEventListener('click', function () {
    activeCategory = chip.dataset.filter;
    document.querySelectorAll('.chip[data-filter]').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
    applyFilters();
  });
});
document.querySelectorAll('.chip[data-service-filter]').forEach(function (chip) {
  chip.addEventListener('click', function () {
    activeService = chip.dataset.serviceFilter;
    document.querySelectorAll('.chip[data-service-filter]').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
    applyFilters();
  });
});

/* ---------- Toast ---------- */
function toast(message, type = 'ok') {
  const stack = document.querySelector('.toast-stack');
  if (!stack) return;
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'error' ? ' toast--error' : '');
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  const icon = type === 'error'
    ? '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/>'
    : '<path d="M20 6 9 17l-5-5"/>';
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><span></span>`;
  el.querySelector('span').textContent = message;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}

/* ---------- Formulario de contacto ---------- */
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const ok = field.checkValidity();
      field.closest('.field')?.classList.toggle('field--invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { toast('Revisa los campos marcados', 'error'); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    const fallback = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Consulta desde Uskein Studio')}&body=${encodeURIComponent(`${data.nombre} (${data.email}) — ${data.interes}\n\n${data.mensaje}`)}`;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    try {
      var res;
      if (CONFIG.formspreeId) {
        res = await fetch('https://formspree.io/f/' + CONFIG.formspreeId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        // Formsubmit: sin cuenta. El primer envío requiere confirmar el correo una vez.
        res = await fetch('https://formsubmit.co/ajax/' + CONFIG.formsubmitEmail, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            nombre: data.nombre,
            email: data.email,
            interes: data.interes,
            mensaje: data.mensaje,
            website: data.website,
            _subject: 'Nueva consulta desde Uskein Studio',
            _template: 'table',
            _captcha: 'false'
          })
        });
      }
      if (!res.ok) throw new Error('Error al enviar');
      toast('Mensaje enviado. Te responderé pronto.');
      form.reset();
    } catch (err) {
      toast('No se pudo enviar. Abriendo tu correo como alternativa…', 'error');
      window.location.href = fallback;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
  });
}

/* ---------- Enlaces de contacto ---------- */
document.querySelectorAll('[data-wa]').forEach(el => {
  const text = el.dataset.wa || CONFIG.whatsappText;
  el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-mail]').forEach(el => {
  el.href = `mailto:${CONFIG.email}${el.dataset.mail ? '?subject=' + encodeURIComponent(el.dataset.mail) : ''}`;
});

/* ---------- Botón «volver arriba» ---------- */
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.to-top');
  if (btn) btn.classList.toggle('is-visible', window.scrollY > 600);
}, { passive: true });
document.querySelector('.to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Video del hero: bucle continuo + control de pausa ---------- */
(function () {
  var video = document.querySelector('.hero__media video');
  var btn = document.querySelector('#video-toggle');
  if (!video) return;

  video.loop = true;
  video.muted = true;
  video.play().catch(function () {}); // silencioso: lo permite la política de autoplay

  if (!btn) return;
  function sync() {
    var paused = video.paused;
    btn.setAttribute('aria-label', paused ? 'Reproducir video' : 'Pausar video');
    btn.setAttribute('aria-pressed', String(!paused));
    var pauseIcon = btn.querySelector('.icon-pause');
    var playIcon = btn.querySelector('.icon-play');
    if (pauseIcon) pauseIcon.style.display = paused ? 'none' : 'block';
    if (playIcon) playIcon.style.display = paused ? 'block' : 'none';
  }
  btn.addEventListener('click', function () {
    if (video.paused) video.play().catch(function () {});
    else video.pause();
    sync();
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  sync();
})();

/* ---------- Calculadora orientativa de presupuesto ---------- */
(function () {
  var tipo = document.querySelector('#calc-tipo');
  var alcance = document.querySelector('#calc-alcance');
  if (!tipo || !alcance) return;
  var base = { movil: 1200, web: 900, sistema: 1800 };
  var factor = { mvp: 1, completo: 1.8, multi: 3.2 };
  var etiqueta = { movil: 'app móvil', web: 'app web', sistema: 'sistema transaccional' };
  var alcanceTxt = { mvp: 'MVP', completo: 'versión completa', multi: 'multi-tenant / operación completa' };
  var result = document.querySelector('#calc-result');
  var wa = document.querySelector('#calc-wa');

  function fmt(n) { return Math.round(n / 100) * 100; }
  function update() {
    var t = tipo.value, a = alcance.value;
    var min = fmt(base[t] * factor[a]);
    var max = fmt(min * 1.4);
    var text = 'USD ' + min.toLocaleString('es-CO') + ' – ' + max.toLocaleString('es-CO');
    if (result) result.textContent = text;
    if (wa) {
      wa.dataset.wa = 'Hola Uskein Studio, quiero ' + etiqueta[t] + ' con ' + alcanceTxt[a] + '. Presupuesto orientativo: ' + text + '.';
      wa.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(wa.dataset.wa);
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
    }
  }
  tipo.addEventListener('change', update);
  alcance.addEventListener('change', update);
  update();
})();

/* ---------- Analítica opcional y sin cookies ---------- */
(function () {
  var a = CONFIG.analytics || {};
  if (a.plausibleDomain) {
    var p = document.createElement('script');
    p.defer = true;
    p.src = 'https://plausible.io/js/script.js';
    p.setAttribute('data-domain', a.plausibleDomain);
    document.head.appendChild(p);
  }
  if (a.cloudflareToken) {
    var c = document.createElement('script');
    c.defer = true;
    c.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    c.setAttribute('data-cf-beacon', JSON.stringify({ token: a.cloudflareToken }));
    document.head.appendChild(c);
  }
})();
