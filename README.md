# Uskein Studio — Brochure comercial

Brochure de **Uskein Studio**, agencia freelance que crea aplicaciones móviles, aplicaciones web y sistemas transaccionales a la medida. Sitio estático, sin backend y listo para publicar en GitHub Pages.

El enfoque comercial es **vender servicios**; los diez productos se presentan como **proyectos ya realizados** con demos en video (prueba del oficio), no como licencias.

Estructura del hub: hero de agencia → servicios → proceso → video → proyectos/demos → por qué → formas de trabajar → contacto.

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
index.html                  Hub: hero, catálogo, por qué, licencias, contacto
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
assets/video/promo.mp4      Video promocional de 14 s
assets/video/demo-*.mp4     10 demos de producto: 4 momentos, 16,2 s cada uno
video/                      Proyecto HyperFrames del video promocional
video-<slug>/               Proyectos HyperFrames de los 10 demos
tools/generate.mjs          Regenera las 10 fichas
tools/generate-images.mjs   Regenera las imágenes SVG
tools/generate-showcases.mjs Regenera los 5 showcases visuales
video/                      Proyecto HyperFrames del video (index.html + assets)
.agents/skills/             Skills instaladas: HyperFrames + Remotion
Artefactos/documentacion/   Identidad, arquitectura, producto y flujos
```

## Configurar antes de publicar

Editar `assets/js/main.js`:

```js
var CONFIG = {
  formspreeId: 'TU_FORM_ID',   // Crear en https://formspree.io (plan gratis)
  whatsapp: '573132904451',    // Ya configurado: +57 313 290 4451
  email: 'juansebastianp188@gmail.com'
};
```

También revisar los importes orientativos de la sección `#precios` en `index.html`.

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
