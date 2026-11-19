# Manual de agente — Uskein Studio

> Referencia rápida. La fuente completa es `manual-identidad-visual.md`.

## Reglas innegociables

1. Usar **solo** las variables de `assets/css/tokens.css`. Prohibido hardcodear HEX.
2. Radio de borde **0** en todo. Sin gradientes, glows ni blur decorativo.
3. Tipografía: Archivo Black (display), Archivo (UI), IBM Plex Mono (datos). Cifras `tabular-nums`.
4. Acento lima `#C8FF3D` con rareza: CTA, foco, señal activa, firma.
5. Firma: punto cuadrado de 8 px + `US-NN` en mono.
6. Copy: sentence case, sin exclamaciones, sin «moderno/limpio/premium/IA».
7. Iconos: un set (Lucide), 18 px, trazo 1,5, `currentColor`, nunca emojis.
8. Estados siempre con icono + texto + color.
9. Contraste AA; foco visible de 2 px; targets ≥ 44 px; `prefers-reduced-motion`.

## Componentes disponibles

`btn--primary` · `btn--secondary` · `btn--ghost` · `chip` · `product-card` · `placa` · `metric` · `value` · `plan` · `field` · `channel` · `toast` · `status--available|beta|soon` · `breadcrumb` · `product-nav` · `cta-band` · `grid-bg`.

## Cómo añadir un producto

1. Editar `assets/js/data.js` con un objeto `Producto` completo.
2. Ejecutar `npm run generate`.
3. Verificar que el número `US-NN` siga la secuencia y que el color de acento venga del design system del producto.
4. Actualizar el `<select>` de `index.html` y los contadores si procede.

## Cómo cambiar la identidad

Editar `manual-identidad-visual.md` → `assets/css/tokens.css` → regenerar showcases con `node tools/generate-showcases.mjs`.
