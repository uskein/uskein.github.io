/* Crea un proyecto HyperFrames por producto (excepto habitos, que ya existe). */
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MOMENTS = ['hoy','plan','hitos','logros'];

const V = {
  inspector: { id:'US-02', name:'INSPECTOR', tagline:'Campo que no depende de la señal', accent:'#C8FF3D', bg:'#0E1116', text:'#F0EFEA', muted:'#93A6BF', dark:true,
    desc:['Ruta del día con GPS con fix, track activo y doce inspecciones descargadas.','Checklist RITG de dieciocho puntos con motor de reglas que bloquea la aprobación.','Acta con tres firmas: titular, instalador e inspector, con comprobante inmediato.','Tres actas en cola, store-and-forward y sin pérdida de datos en sótanos.'] },
  monedero: { id:'US-03', name:'Monedero', tagline:'Tus cuentas, cifradas y en tu bolsillo', accent:'#2F7D5B', bg:'#F4EFE7', text:'#14171C', muted:'#67617E', dark:false,
    desc:['Bóveda cifrada con passphrase, biometría y bloqueo automático por inactividad.','Balance de $2.480.500 con ingresos, gastos y ahorro en un vistazo.','Presupuestos con umbral al 80 %: mercado, transporte y ocio sin alarmas rojas.','Respaldo .monedero con AES-256-GCM y SHA-256 entre móvil y PWA.'] },
  biblioteca: { id:'US-04', name:'ATHENAEUM', tagline:'Una biblioteca que recuerda contigo', accent:'#E8A33D', bg:'#14100C', text:'#F4EDE0', muted:'#A89B88', dark:true,
    desc:['Mil doscientas cuarenta y ocho obras organizadas en colecciones propias.','Lector sepia con marcadores, subrayados y notas al margen por página.','Grafo de 342 notas con backlinks: ninguna idea queda desconectada.','Citas con página exacta y bibliografías APA, MLA, Chicago e IEEE.'] },
  classdesk: { id:'US-05', name:'ClassDesk', tagline:'De la pista a la caja, sin perder un dato', accent:'#2563EB', bg:'#EFF6FF', text:'#0F172A', muted:'#475569', dark:false,
    desc:['Panel del dueño con catorce clases, asistencia del 92 % y cobros al día.','Asistencia en pista de dieciocho de veinte alumnos, con una mano y sin señal.','Agenda de clases: natación, judo y tenis en un solo calendario.','Caja y POS con ventas, productos y stock por movimientos.'] },
  diario: { id:'US-06', name:'DiarioFit', tagline:'El día y el entrenamiento, juntos', accent:'#3E6B60', bg:'#FAF6F0', text:'#2B2622', muted:'#6B625A', dark:false,
    desc:['Racha de nueve días con ánimo, gratitud y hábitos en la pantalla de hoy.','Entrada única por fecha en tres modos: libre, guiado y rápido.','Sesión en vivo con series, RPE y detección automática de récords.','Mi año: trescientos sesenta y cinco días en un mosaico de ánimo.'] },
  galeria: { id:'US-07', name:'Galería de Estudio', tagline:'Tu archivo visual, anotado al segundo', accent:'#1B44C8', bg:'#E9EAE6', text:'#17191A', muted:'#575C58', dark:false,
    desc:['Veinticuatro colecciones con portada, número de catálogo y muro propio.','Video con una nota en 02:14, bucle A–B y velocidad 0,75× con tono preservado.','Línea de tiempo con 142 assets entre fotos, videos y notas.','Reporte PDF de doce páginas con fotogramas clave y timestamps.'] },
  lector: { id:'US-08', name:'Lumen', tagline:'Tu biblioteca, en calma', accent:'#C44B22', bg:'#F6F1E7', text:'#17181A', muted:'#5B5F66', dark:false,
    desc:['Cuarenta libros en la biblioteca, con «Continuar leyendo» siempre a mano.','Lector sepia con Literata y modo calma: solo el libro en pantalla.','Centro de anotaciones con 86 notas, marcadores y búsqueda dentro del libro.','Descubrimiento offline con catálogo curado y colecciones personales.'] },
  voynich: { id:'US-09', name:'Voynich Codex', tagline:'World-building sin salir de tu equipo', accent:'#b8860b', bg:'#eee1c4', text:'#2b2118', muted:'#6b5b45', dark:false,
    desc:['Aetheria con 142 entidades conectadas en un grafo editable.','Códice con capítulos, borradores, versiones y notas con trazabilidad.','Cronología de 412 a 980 con era primera, media y oscura.','Treinta y ocho fichas de personajes, bestiario y árbol genealógico.'] },
  estilos: { id:'US-10', name:'Kit de Estilos', tagline:'Cuatro sistemas listos para aplicar', accent:'#5A8F00', bg:'#EDEBE4', text:'#14171C', muted:'#575C58', dark:false,
    desc:['TOPO-HUD: cartografía eléctrica con lima y cian sobre grafito.','ISO-SOLAR: facetas minerales con naranja solar y sombras duras de 3 px.','ATHENAEUM: biblioteca editorial cálida con ámbar y laurel.','AURORA CODEX: vidrio nocturno con violeta, teal y rosa.'] }
};

function page(p, slug) {
  const scenes = MOMENTS.map((mo, i) => `
      <div id="s-${mo}" class="clip" data-start="${2.6 + i * 2.8}" data-duration="2.8" data-track-index="0">
        <div class="scene">
          <div class="phone-wrap"><img id="${mo}-img" src="assets/moments/${slug}-${mo}.svg" alt="Pantalla ${mo}" /></div>
          <div class="info">
            <div class="num" id="${mo}-num">0${i+1} / ${p.name}</div>
            <h2 id="${mo}-title">${p.tagline}</h2>
            <p class="desc" id="${mo}-desc">${p.desc[i]}</p>
            <div class="tags" id="${mo}-tags"><span class="tag tag--on">${['Resumen','Lista','Colección','Estado'][i]}</span><span class="tag">${MOMENTS[i]}</span><span class="tag">${p.id}</span></div>
          </div>
        </div>
      </div>`).join('');

  const anims = MOMENTS.map((mo, i) => {
    const t = 2.6 + i * 2.8;
    return `.fromTo('#${mo}-img', {opacity:0, x:-50}, {opacity:1, x:0, duration:.4, ease:er}, ${t})
        .fromTo('#${mo}-num', {opacity:0, y:18}, {opacity:1, y:0, duration:.3, ease:er}, ${t+.1})
        .fromTo('#${mo}-title', {opacity:0, y:28}, {opacity:1, y:0, duration:.35, ease:er}, ${t+.2})
        .fromTo('#${mo}-desc', {opacity:0, y:20}, {opacity:1, y:0, duration:.35, ease:er}, ${t+.35})
        .fromTo('#${mo}-tags', {opacity:0, y:16}, {opacity:1, y:0, duration:.35, ease:er}, ${t+.5})`;
  }).join('\n        ');

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      :root { --bg:${p.bg}; --surface:${p.dark ? (p.bg === '#14100C' ? '#1E1812' : '#0E1622') : '#FFFFFF'}; --ink:${p.text}; --muted:${p.muted}; --accent:${p.accent}; --line:${p.dark ? '#2A323E' : '#C9C6BC'}; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { margin:0; width:1920px; height:1080px; overflow:hidden; background:var(--bg); }
      #root { position:relative; width:100%; height:100%; font-family:'Inter', sans-serif; }
      .clip { position:absolute; inset:0; }
      .gridlines { position:absolute; inset:0; pointer-events:none; opacity:.35;
        background-image:linear-gradient(to right,var(--line) 1px,transparent 1px),linear-gradient(to bottom,var(--line) 1px,transparent 1px);
        background-size:48px 48px; }
      .mark0 { position:absolute; left:130px; top:96px; width:16px; height:16px; background:var(--accent); }
      .intro { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; padding:0 150px; }
      .kicker { font-family:'IBM Plex Mono', monospace; font-size:30px; letter-spacing:.18em; color:var(--accent); text-transform:uppercase; }
      h1 { font-family:'Archivo Black', sans-serif; font-size:112px; line-height:1.02; letter-spacing:-.04em; color:var(--ink); margin-top:30px; text-transform:uppercase; }
      .intro-rule { width:150px; height:6px; background:var(--accent); margin-top:46px; }
      .phone-wrap { position:absolute; left:250px; top:70px; width:440px; height:940px; border:3px solid var(--line); background:var(--surface); overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,.14); }
      .phone-wrap img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
      .info { position:absolute; left:790px; top:210px; width:960px; }
      .info .num { font-family:'IBM Plex Mono', monospace; font-size:30px; color:var(--accent); letter-spacing:.14em; }
      .info h2 { font-family:'Archivo Black', sans-serif; font-size:74px; line-height:1.05; letter-spacing:-.03em; color:var(--ink); margin-top:22px; text-transform:uppercase; }
      .info .desc { font-size:34px; line-height:1.4; color:var(--muted); margin-top:30px; max-width:900px; }
      .info .tags { display:flex; gap:14px; margin-top:38px; flex-wrap:wrap; }
      .info .tag { font-family:'IBM Plex Mono', monospace; font-size:24px; padding:12px 20px; border:2px solid var(--line); color:var(--muted); }
      .info .tag--on { border-color:var(--accent); color:var(--accent); }
      .end { position:absolute; inset:0; background:var(--accent); display:flex; flex-direction:column; justify-content:center; padding:0 150px; }
      .end .mark { width:44px; height:44px; background:${p.dark ? '#0E1116' : '#FFFFFF'}; }
      .end h2 { font-family:'Archivo Black', sans-serif; font-size:130px; line-height:.95; letter-spacing:-.05em; color:${p.dark ? '#0E1116' : '#FFFFFF'}; margin-top:34px; text-transform:uppercase; }
      .end p { font-family:'IBM Plex Mono', monospace; font-size:30px; color:${p.dark ? '#0E1116' : '#FFFFFF'}; margin-top:40px; letter-spacing:.06em; }
      .end small { font-family:'IBM Plex Mono', monospace; font-size:26px; color:${p.dark ? '#0E1116' : '#FFFFFF'}; opacity:.8; margin-top:18px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="16.2" data-width="1920" data-height="1080">
      <div class="gridlines" data-layout-ignore></div>
      <div class="mark0" data-layout-ignore></div>

      <div id="intro" class="clip" data-start="0" data-duration="2.6" data-track-index="0">
        <div class="intro">
          <p class="kicker" id="intro-kicker">${p.id} · ${p.name} · Demo</p>
          <h1 id="intro-title">${p.tagline}</h1>
          <div class="intro-rule" id="intro-rule"></div>
        </div>
      </div>
${scenes}
      <div id="end" class="clip" data-start="13.8" data-duration="2.4" data-track-index="0">
        <div class="end">
          <div class="mark" id="end-mark"></div>
          <h2 id="end-title">${p.name}</h2>
          <p id="end-cta">DEMO DISPONIBLE · WHATSAPP +57 313 290 4451</p>
          <small id="end-sub">USKEIN STUDIO · SOFTWARE LOCAL-FIRST</small>
        </div>
      </div>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const er = 'power3.out';
      tl.fromTo('#intro-kicker', {opacity:0, y:20}, {opacity:1, y:0, duration:.3, ease:er}, 0)
        .fromTo('#intro-title', {opacity:0, y:44}, {opacity:1, y:0, duration:.45, ease:er}, .12)
        .fromTo('#intro-rule', {scaleX:0, transformOrigin:'left center'}, {scaleX:1, duration:.35, ease:er}, .45)
        ${anims}
        .fromTo('#end-mark', {scale:0, transformOrigin:'center'}, {scale:1, duration:.35, ease:er}, 13.8)
        .fromTo('#end-title', {opacity:0, y:40}, {opacity:1, y:0, duration:.4, ease:er}, 13.95)
        .fromTo('#end-cta', {opacity:0, y:20}, {opacity:1, y:0, duration:.35, ease:er}, 14.15)
        .fromTo('#end-sub', {opacity:0, y:16}, {opacity:1, y:0, duration:.35, ease:er}, 14.35);
      window.__timelines['main'] = tl;
      tl.seek(0);
    </script>
  </body>
</html>`;
}

for (const [slug, p] of Object.entries(V)) {
  const dir = join(ROOT, 'video-' + slug);
  await mkdir(join(dir, 'assets/moments'), { recursive: true });
  await writeFile(join(dir, 'index.html'), page(p, slug), 'utf8');
  for (const mo of MOMENTS) {
    await copyFile(join(ROOT, 'assets/img/moments', `${slug}-${mo}.svg`), join(dir, 'assets/moments', `${slug}-${mo}.svg`));
  }
  await writeFile(join(dir, 'meta.json'), JSON.stringify({ id: `video-${slug}`, name: `${p.name} Demo` }, null, 2));
  await writeFile(join(dir, 'package.json'), JSON.stringify({ name: `video-${slug}`, private: true, type: 'module', scripts: { check: 'node check.mjs', render: 'node render.mjs' } }, null, 2));
  console.log('OK  video-' + slug);
}
console.log('Total: ' + Object.keys(V).length + ' proyectos');
