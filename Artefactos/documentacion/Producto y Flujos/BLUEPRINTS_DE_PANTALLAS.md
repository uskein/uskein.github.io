# Blueprints de pantallas

Todas las pantallas contemplan los cuatro estados obligatorios. En un sitio estático los estados se materializan así:

| Estado | Hub | Ficha de producto | Formulario |
|---|---|---|---|
| **Loading** | Skeleton de retícula mientras carga `data.js` | Skeleton de placa | Botón deshabilitado con texto «Enviando…» |
| **Empty** | Mensaje «No hay productos en esta categoría» si un filtro no coincide | Bloque «Próximamente» para `status: soon` | Campos sin datos, etiquetas visibles |
| **Success** | Tarjetas renderizadas con acento por producto | Métricas, funciones y galería | Toast `--ok` y reset |
| **Error** | Aviso si falla la carga del módulo JS | Enlace de contacto alternativo | Toast `--bad` + fallback `mailto:` |

## BP-01 · Hub (index.html)

- **Propósito:** convertir a un visitante en lead en una sola pantalla de decisión.
- **Composición:** `grid-bg`, `hero__title`, `hero__stats`, `filters`, `product-card` × 10, `value`, `placa`, `plan`, `cta-band`, formulario.
- **Datos:** `PRODUCTS` y `CATEGORIES` de `data.js`. `CONFIG` de `main.js`.
- **Estados:** ver tabla. Foco visible en filtros y CTA.

## BP-02 · Ficha de producto (productos/<slug>/index.html)

- **Propósito:** responder «¿qué hace, para quién y cómo lo pruebo?».
- **Composición:** `breadcrumb`, `pdp-hero`, `pdp-art`, `placa`, `pdp-quote`, `feature-list` × 6, `shots` × 4, `audit-list`, `product-nav`, `cta-band`.
- **Datos:** objeto `Producto` por slug; `getAdjacent(slug)` para navegación.
- **Estados:** `soon` muestra «Solicitar acceso» y etiqueta ámbar; `available` muestra demo o «Hacer una pregunta».

## BP-03 · Formulario de contacto

- **Propósito:** captar leads sin backend propio.
- **Composición:** `field` × 4, honeypot, `btn--primary`, `channel` × 2, `toast`.
- **Datos:** `POST` a Formspree; fallback `mailto:`.
- **Estados:** ver tabla. Validación HTML5 + mensaje inline con icono y texto.
