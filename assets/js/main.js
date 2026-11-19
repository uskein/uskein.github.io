/* ============================================================
   USKEIN STUDIO — Interacción del brochure (vanilla JS)
   ============================================================ */

var USKEIN_DATA = window.USKEIN_DATA || { CATEGORIES: [], PRODUCTS: [] };
var CATEGORIES = USKEIN_DATA.CATEGORIES;
var PRODUCTS = USKEIN_DATA.PRODUCTS;

/* CONFIGURAR ANTES DE PUBLICAR */
var CONFIG = {
  formspreeId: 'TU_FORM_ID',          // https://formspree.io → crear formulario gratis
  whatsapp: '573132904451',           // Colombia: 57 + 313 290 4451
  email: 'hola@uskein.dev',
  whatsappText: 'Hola Uskein Studio, quiero información sobre aplicaciones móviles, aplicaciones web o sistemas transaccionales a la medida.'
};
window.USKEIN_CONFIG = CONFIG;

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
       data-category="${p.category}" style="--card-accent:${p.accent}">
      <div class="product-card__media"><img src="assets/img/${p.image}" alt="Vista previa de ${p.name}" loading="lazy"></div>
      <div class="product-card__body">
        <div class="product-card__top">
          <span class="product-card__id">${p.id}</span>
          <span class="status status--${p.status}">${p.statusLabel}</span>
        </div>
        <h3 class="product-card__title">${p.name}</h3>
        <p class="product-card__tag">${p.tagline}</p>
        <div class="product-card__meta">
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

function renderFilters() {
  const bar = document.querySelector('#filters');
  if (!bar) return;
  bar.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
  ).join('');
}

renderFilters();
renderCatalog();

/* ---------- Filtros del catálogo ---------- */
const chips = document.querySelectorAll('.chip[data-filter]');
const cards = document.querySelectorAll('.product-card[data-category]');
chips.forEach(chip => chip.addEventListener('click', () => {
  const filter = chip.dataset.filter;
  chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
  });
}));

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
      if (!CONFIG.formspreeId || CONFIG.formspreeId.startsWith('TU_')) throw new Error('Formspree no configurado');
      const res = await fetch(`https://formspree.io/f/${CONFIG.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
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
