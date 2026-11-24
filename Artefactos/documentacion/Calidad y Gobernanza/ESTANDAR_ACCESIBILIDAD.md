# Estándar de accesibilidad — Brochure Uskein Studio

Auditoría aplicada al rediseño tecnológico (2026-11-24). Objeto: **WCAG 2.1 AA**.

## Reglas verificadas

| Criterio | Implementación | Resultado |
|---|---|---|
| Contraste texto normal ≥ 4,5:1 | `--text #F0EFEA` sobre `--bg #0E1116` (≈ 17:1); `--text-muted #9BA4B0` ≈ 7,3:1 | ✅ |
| Contraste acento ≥ 3:1 | `--accent #C8FF3D` sobre grafito ≈ 16:1; en claro se usa `#4E7C00` | ✅ |
| Foco visible | `outline: 2px solid var(--accent)` con `outline-offset: 2px` | ✅ |
| Navegación por teclado | Tarjetas con `role="button"`, `tabindex="0"` y activación por Enter/Espacio | ✅ |
| Modales accesibles | `<dialog>` nativo con `aria-labelledby`, botón de cierre con `aria-label`, Escape y cierre por backdrop | ✅ |
| Reduced motion | `prefers-reduced-motion: reduce` anula gotas, sello, reveal y transiciones | ✅ |
| Imágenes con texto alternativo | Todas las tarjetas y capturas tienen `alt` descriptivo | ✅ |
| Targets táctiles ≥ 44 px | Botones, chips, cierre de modal y WhatsApp flotante | ✅ |
| Estructura semántica | Un `h1` por página, `h2`/`h3` jerárquicos, `nav`, `main`, `footer` | ✅ |
| Idioma | `lang="es"` en todas las páginas | ✅ |
| Barra de desplazamiento | `scrollbar-color` y `::-webkit-scrollbar` con tokens de tema; pulgar ≥ 12 px | ✅ |
| Indicador de progreso | Barra superior `aria-hidden`, decorativa, sin anunciar a lectores de pantalla | ✅ |
| viewport y sin scroll horizontal | Verificado a 390 px | ✅ |
| Enlaces con propósito | CTA con texto explícito; `aria-label` en iconos | ✅ |

## Notas

- El video del hero mantiene autoplay silencioso con **botón de pausa visible**; es una decisión comercial explícita del usuario y el control compensa el movimiento.
- Las gotas de pintura son la única excepción documentada al radio 0 (3 px en la punta), registrada en el manual de identidad §3.1.

## Evidencia

Verificación con navegador real sobre `file://` y `https://uskein.github.io/`: 0 errores de consola y 0 peticiones fallidas en hub y fichas.
