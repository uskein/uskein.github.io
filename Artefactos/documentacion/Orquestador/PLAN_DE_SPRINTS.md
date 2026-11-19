# Plan de sprints — Brochure Uskein Studio

## Desglose y priorización

| Sprint | Módulo | Tareas | Complejidad | Estado |
|---|---|---|---|---|
| 0 | Contexto | Analizar 10 proyectos, elegir marca, ruta visual, hosting y canal de venta | Media | ✅ |
| 1 | Identidad | Dirección creativa, tokens, componentes, manual, brand book | Alta | ✅ |
| 2 | Arquitectura | ADR, estructura, modelo de datos, contratos, DevOps | Media | ✅ |
| 3 | Producto y flujos | Actores, épicas, sitemap, blueprints, flujos, showcases | Alta | ✅ |
| 4 | Base visual | `tokens.css`, `site.css`, `product.css` | Alta | ✅ |
| 5 | Datos | `data.js` con 10 productos y copy de venta | Media | ✅ |
| 6 | Hub | Hero, filtros, catálogo, por qué, precios, CTA, contacto | Alta | ✅ |
| 7 | Fichas | Generador `tools/generate.mjs` + 10 páginas | Media | ✅ |
| 8 | Interacción | Tema, menú, filtros, toast, formulario, WhatsApp/email | Media | ✅ |
| 9 | Publicación | GitHub Pages, CSP, `.nojekyll`, README, verificación | Baja | ⏳ |

## Decisiones registradas

1. Sitio 100 % estático, sin framework ni build obligatorio (ADR-001).
2. Formspree + `mailto:` + `wa.me` como mecanismo de venta (ADR-002).
3. Hub + una ficha por producto con fuente de datos única (ADR-003).
4. Marca paraguas: **Uskein Studio**.
5. Ruta visual: **Bloque Grafito + retícula Neo-Suiza**.
6. Diez entregas incluidas: nueve productos de software más el kit de estilos visuales.

## Bitácora

- 2026-11-19 · Fase de análisis completada; catálogo verificado contra READMEs y manuales de identidad de cada proyecto.
- 2026-11-19 · Identidad y arquitectura aprobadas; documentación y showcases generados en disco.
- 2026-11-19 · Hub, 10 fichas y 5 showcases generados; pendiente la verificación de renderizado y la publicación.
