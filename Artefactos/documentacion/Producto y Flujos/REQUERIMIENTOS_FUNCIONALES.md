# Requerimientos funcionales — Brochure Uskein Studio

> Estado: aprobado · 2026-11-19 · Deriva de la dirección creativa aprobada y de la arquitectura estática.
> Showcase visual: `../Requerimientos/REQUERIMIENTOS_VISUAL.html`

## 1. Actores

| Actor | Objetivo | Frustración | Expertise |
|---|---|---|---|
| **Cliente individual** | Encontrar una herramienta concreta, probarla y comprar con confianza | No saber si funciona sin red ni qué datos recoge | Medio |
| **Pequeño equipo / academia** | Evaluar una licencia para varias personas o dispositivos | No entender alcance de licencia ni opciones multi-tenant | Medio-alto |
| **Propietario (Uskein)** | Publicar y mantener el catálogo sin coste ni backend | Depender de plugins, CMS o servidores | Alto |
| **Visitante de paso** | Entender la oferta en menos de 5 segundos | Texto genérico sin pruebas concretas | Bajo |

## 2. Épicas e historias de usuario

### E1 — Descubrimiento

- **HU-1.1** Como visitante, quiero ver la promesa del catálogo en el hero, para entender la oferta sin scrollear.
  - *Dado* que cargo el sitio, *cuando* veo el hero, *entonces* aparecen los cuatro números clave y un CTA primario.
  - El título usa una sola palabra en acento; sin exclamaciones.
- **HU-1.2** Como visitante, quiero filtrar por categoría, para llegar a mi producto en un toque.
  - *Dado* un filtro activo, *cuando* pulso otro, *entonces* `aria-pressed` cambia y las tarjetas se ocultan con `hidden`.
  - El filtro «Todos» está activo por defecto.
- **HU-1.3** Como visitante con lector de pantalla, quiero navegar con teclado, para no depender del ratón.
  - Skip-link, foco visible de 2 px y orden DOM igual al orden visual.

### E2 — Evaluación

- **HU-2.1** Como cliente, quiero abrir la ficha de un producto, para ver funcionalidades, métricas y estado real.
  - Cada ficha muestra `US-NN`, seis funcionalidades, tres métricas y el estado (`Disponible` / `Beta` / `En diseño`) con icono + texto + color.
- **HU-2.2** Como cliente, quiero alternar tema claro y oscuro, para leer cómodamente.
  - *Dado* un tema elegido, *cuando* recargo, *entonces* se conserva en `localStorage`.
  - Si no hay preferencia guardada, se respeta `prefers-color-scheme`.
- **HU-2.3** Como cliente, quiero ver productos vecinos, para seguir explorando sin volver al inicio.
  - Enlaces «Anterior» y «Siguiente» circulares entre las 10 fichas.

### E3 — Conversión

- **HU-3.1** Como cliente, quiero contactar por WhatsApp, email o formulario, para elegir el canal que prefiera.
  - Los enlaces `data-wa` y `data-mail` se construyen desde `CONFIG` en `main.js`.
- **HU-3.2** Como cliente, quiero que el formulario valide mis datos, para no enviar información incompleta.
  - Campos requeridos con mensaje inline; honeypot `website` para spam.
  - *Dado* un envío fallido, *cuando* Formspree no responde, *entonces* se abre `mailto:` con el mensaje prellenado.
- **HU-3.3** Como propietario, quiero precios orientativos visibles, para filtrar consultas poco serias.
  - Tres planes: Individual, Bundle y A medida. Los importes se marcan como orientativos en la propia sección.

### E4 — Publicación

- **HU-4.1** Como propietario, quiero publicar gratis en GitHub Pages, para no pagar hosting.
  - Sitio 100 % estático, `.nojekyll` presente, sin build obligatorio.
- **HU-4.2** Como propietario, quiero regenerar las fichas desde un solo archivo, para no editar diez HTML a mano.
  - `npm run generate` lee `assets/js/data.js` y reescribe `productos/*/index.html`.

### E5 — Servicios de desarrollo (propuesta comercial)

- **HU-5.1** Como cliente, quiero ver claramente qué desarrolla Uskein, para decidir si encaja con mi proyecto.
  - La sección `#servicios` presenta tres servicios: aplicaciones móviles, aplicaciones web y sistemas transaccionales a la medida, con sus alcances concretos.
  - El hero y la meta description declaran la misma propuesta.
- **HU-5.2** Como cliente, quiero contactar por WhatsApp con un mensaje ya contextualizado, para ahorrar una vuelta.
  - `CONFIG.whatsapp = 573132904451` (+57 313 290 4451). Todos los enlaces `data-wa` apuntan a `https://wa.me/573132904451`.
  - El mensaje por defecto menciona móvil, web y sistemas a la medida.

## 3. Criterios de aceptación transversales

- Contraste AA en ambos temas; foco visible; targets ≥ 44 px.
- Sin errores de consola; sin dependencias de pago.
- `prefers-reduced-motion` respetado.
- Copy sin palabras prohibidas por el manual de identidad.
- Todo componente usado existe en `manual-identidad-visual.md` (trazabilidad).
