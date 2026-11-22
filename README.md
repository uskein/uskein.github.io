# Uskein Studio — Brochure comercial

Brochure de **Uskein Studio**, agencia freelance que crea aplicaciones móviles, aplicaciones web y sistemas transaccionales a la medida. Sitio estático, sin backend y listo para publicar en GitHub Pages.

El enfoque comercial es **vender servicios**; los diez productos se presentan como **proyectos ya realizados** con demos en video (prueba del oficio), no como licencias.

Para promocionarlo: `PROMOCION.md` (plan de 14 días y copys por canal), `LINKEDIN.md` (perfil y primer post), carrusel en `assets/img/carrusel/` y enlaces UTM con `node tools/utm-links.mjs`.

Estructura del hub: hero de agencia → servicios → tecnologías → proceso → video → proyectos/demos (con doble filtro) → por qué → resultados verificables → formas de trabajar → calculadora → FAQ → contacto.

Incluye además: envío de formulario sin cuenta (Formsubmit), SEO (OG, schema.org, sitemap, robots), botón flotante de WhatsApp, pausa del video con `prefers-reduced-motion`, dominio propio configurable y media kit en PDF.

WhatsApp configurado: **+57 313 290 4451** (`CONFIG.whatsapp` en `assets/js/main.js`). Correo: `juansebastianp188@gmail.com`.

## Ver en local

**Puedes hacer doble clic en `index.html`** — funciona con `file://` sin servidor.
Los scripts son clásicos (no módulos ES) y los enlaces apuntan a `index.html` explícito,
así que las diez fichas se abren correctamente desde el explorador de archivos.

Si prefieres servidor:

```powershell
cd Uskein-Studio-Brochure
python -m http.server 8080
# http://localhost:8080
```

> Modo claro por defecto. El interruptor del header recuerda la preferencia en `localStorage`.

## Estructura

```
index.html                  Hub completo: servicios, demos, calculadora, FAQ, contacto
media-kit.html              Media kit de una página (impresión A4)
assets/USKEIN-STUDIO-Media-Kit.pdf  PDF generado desde media-kit.html
sitemap.xml / robots.txt    SEO
CNAME.example               Plantilla de dominio propio
productos/<slug>/           10 fichas de producto
assets/css/tokens.css       Design tokens (SSOT visual)
assets/css/site.css         Componentes y layout
assets/css/product.css      Detalles de fichas
assets/js/data.js           Catálogo: fuente única de contenido
assets/js/main.js           Tema, filtros, formulario, WhatsApp, email
assets/img/*.svg            Arte promocional vectorial (10 productos + hero)
assets/img/real-*.png       Capturas reales tomadas de los proyectos
assets/img/poster.png       Fotograma real del video promocional
assets/img/moments/*.svg   40 pantallas: 4 momentos × 10 productos
assets/img/moments/*-poster.png  Pósteres de los 10 demos
assets/video/hero-agencia.mp4  Video del hero (reemplaza la imagen del catálogo): 12 s en bucle
assets/video/promo.mp4      Video promocional de 14 s
assets/video/demo-*.mp4     10 demos de producto: 4 momentos, 16,2 s cada uno
video/                      Proyecto HyperFrames del video promocional
video-agencia/              Proyecto HyperFrames del video del hero
video-<slug>/               Proyectos HyperFrames de los 10 demos
tools/generate.mjs          Regenera las 10 fichas
tools/generate-images.mjs   Regenera las imágenes SVG
tools/generate-moments.mjs  Regenera los momentos de Pulse Clay
tools/generate-moments-others.mjs  Regenera los otros 36 momentos
tools/generate-demo-projects.mjs  Regenera los proyectos HyperFrames de los demos
tools/set-domain.mjs        Activa un dominio propio
tools/generate-showcases.mjs Regenera los 5 showcases visuales
.agents/skills/             Skills instaladas: HyperFrames + Remotion
Artefactos/documentacion/   Identidad, arquitectura, producto y flujos
```

## Configurar antes de publicar

Editar `assets/js/main.js`:

```js
var CONFIG = {
  formsubmitEmail: 'juansebastianp188@gmail.com', // funciona sin cuenta
  formspreeId: '',         // opcional: si lo tienes, se usa en vez de Formsubmit
  whatsapp: '573132904451',  // +57 313 290 4451
  email: 'juansebastianp188@gmail.com',
  analytics: { plausibleDomain: '', cloudflareToken: '' }
};
```

**Formulario:** con `formspreeId` vacío se usa `formsubmit.co/ajax/<email>`, gratis y sin cuenta. La **primera vez** que alguien envía, Formsubmit envía un correo de confirmación al destinatario; haz clic ahí una sola vez para activarlo. Si prefieres Formspree, crea el formulario y pega su ID.

**Analítica:** deja los campos vacíos para no cargar nada. Para activar, crea una cuenta gratis en Plausible o Cloudflare Web Analytics y pega el dominio/token.

**Dominio propio (pendiente):** `uskein.com` **no está registrado** (WHOIS/RDAP devuelven disponible). El `CNAME` se retiró temporalmente para que el sitio siga funcionando en `https://uskein.github.io/`.

Cuando compres `uskein.com` en cualquier registrador, añade estos registros DNS:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

(O un único **CNAME** `www` → `uskein.github.io` si solo quieres `www.uskein.com`). En Cloudflare deja el proxy en **DNS only** (nube gris) durante la configuración. Luego activa **Enforce HTTPS** en GitHub → Settings → Pages.

Para activar el dominio en el sitio: `node tools/set-domain.mjs uskein.com` (crea `CNAME` y actualiza canonical/OG/sitemap). Plantilla disponible en `CNAME.example`.

**Media kit:** para regenerar el PDF, abre `media-kit.html` en el navegador y usa el script `Artefactos/qa/make-pdf.mjs` (o imprime a PDF con `preferCSSPageSize`).

También revisar los importes orientativos de `#precios` y los de la calculadora en `main.js`.

## Cambiar contenido

1. Editar un objeto en `assets/js/data.js`.
2. `npm run generate` → reescribe las 10 fichas.
3. Si cambia el número de productos, actualizar los contadores del hero y las opciones del `<select>` en `index.html`.

## Publicar en GitHub Pages (gratis)

1. Crear repositorio público `<usuario>.github.io`.
2. Copiar **todo el contenido** de esta carpeta a la raíz del repo (incluido `.nojekyll`).
3. GitHub → Settings → Pages → Source: **Deploy from a branch** → `main` / `root` → Save.
4. En 1–2 minutos: `https://<usuario>.github.io/`.

Si el repo no es `<usuario>.github.io`, la URL será `https://<usuario>.github.io/<repo>/` y habrá que ajustar los enlaces absolutos del header.

## Video y skills instaladas

El video promocional se construyó con **HyperFrames** (HTML + GSAP → MP4 determinista).
Las skills quedaron en `.agents/skills/` (9 de HyperFrames + 13 de Remotion), listas para
usar en esta carpeta:

- Editar el video: `cd video`, modifica `video/index.html`
- Verificar: `node ..\.agents\skills\hyperframes\scripts\plugin-cli.mjs check --json`
- Renderizar: el mismo comando con `render`
- Regenerar imágenes: `node tools/generate-images.mjs`
- Regenerar momentos: `node tools/generate-moments.mjs` (Pulse Clay) y `node tools/generate-moments-others.mjs` (9 restantes)
- Regenerar los proyectos de demo: `node tools/generate-demo-projects.mjs`
- Demo de cada producto: `video-<slug>/index.html` → mismo launcher con `render`

> Las imágenes promocionales son SVG propios porque la generación por IA no tenía créditos
> disponibles. Son vectoriales, nítidas y no añaden dependencias ni peso al sitio.

## Verificación previa

- [ ] Hub y 10 fichas cargan sin 404
- [ ] Filtros, tema y menú móvil funcionan
- [ ] Formulario: éxito y fallback `mailto:`
- [ ] Enlaces de WhatsApp y correo con datos reales
- [ ] Sin errores en consola
- [ ] Contraste AA en ambos temas

## Documentación del proceso

| Área | Archivo |
|---|---|
| Identidad | `Artefactos/documentacion/Diseno-Visual/manual-identidad-visual.md` |
| Brand book | `Artefactos/documentacion/Diseno-Visual/showcase-identidad.html` |
| Arquitectura | `Artefactos/documentacion/Arquitectura/README_ARQUITECTURA.md` |
| Producto y flujos | `Artefactos/documentacion/Producto y Flujos/REQUERIMIENTOS_FUNCIONALES.md` |
| Hub visual | `Artefactos/documentacion/DocumentacionMaestra/PRODUCTO_VISUAL_HUB.html` |
| Plan | `Artefactos/documentacion/Orquestador/PLAN_DE_SPRINTS.md` |
