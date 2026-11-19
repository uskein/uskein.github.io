# Manual de Identidad Visual — Uskein Studio

> **Single Source of Truth (SSOT)** de la identidad del brochure comercial de Uskein Studio.
> Toda decisión visual del sitio (hub, páginas de producto, formularios, CTA) debe consultar este
> documento. Si existe conflicto con otro artefacto, **prevalece este manual**.

| Meta | Valor |
|---|---|
| Marca | **USKEIN STUDIO** |
| Producto | Brochure comercial: hub + ficha de venta por producto |
| Plataforma | Web estática responsive (GitHub Pages, sin backend) |
| Estilo | **Bloque Grafito** con retícula **Neo-Suiza** — fusión de las rutas B+A aprobadas |
| Temas | Oscuro (grafito, nativo) + claro (papel) |
| Firma | Punto de registro cuadrado de 8 px + número de catálogo `US-NN` en mono |
| Versión | 1.0 · 2026-11-19 |

---

## 1. El Norte

| Eje | Definición |
|---|---|
| **Producto** | Catálogo vendible de los productos de software de Uskein: herramientas serias, privadas y offline-first, presentadas con fichas técnicas claras y una captación de contacto directa. |
| **Carácter** | Preciso, técnico, directo, con peso editorial. |
| **Mundo** | El banco de trabajo de un ingeniero de campo: plano milimetrado, chapa de aluminio, papel crudo y luz de taller. |
| **Momentos** | ① Hero del hub: tipografía masiva sobre retícula viva con puntos de señal por producto. ② Ficha de producto: placa técnica con número de catálogo, métricas tabulares e indicador de producto activo. |
| **Firma** | Punto de registro de 8 px + `US-NN` en IBM Plex Mono, presentes en cada producto y en cada sección. |

**Palabras prohibidas** en copy o discusión de diseño: *moderno, limpio, premium, minimalista, elegante, sleek, increíble, revolucionario, potencia IA*.

---

## 2. Tokens de diseño

### 2.1 Color — modo oscuro (nativo)

| Rol semántico | HEX | Uso |
|---|---|---|
| `--bg` | `#0E1116` | Fondo del sitio |
| `--bg-raised` | `#151A21` | Secciones alternas |
| `--surface` | `#1A2029` | Tarjetas, placas, paneles |
| `--surface-alt` | `#232B36` | Chips, hover, pozo |
| `--line` | `#2A323E` | Retícula y separadores de 1 px |
| `--line-strong` | `#3D4856` | Bordes estructurales |
| `--text` | `#F0EFEA` | Texto principal |
| `--text-muted` | `#9BA4B0` | Texto secundario (7,3:1 sobre `--bg`) |
| `--text-faint` | `#6E7886` | Iconos indicativos, deshabilitado |
| `--accent` | `#C8FF3D` | Lima: CTA, foco, señal activa, firma |
| `--accent-hover` | `#B4E82F` | Hover de CTA |
| `--accent-active` | `#A0D61F` | Estado presionado |
| `--accent-soft` | `#1F2A12` | Tinte de acento |
| `--on-accent` | `#0A0F08` | Texto sobre lima (16,5:1) |
| `--data` | `#7FA0FF` | Cobalto claro: datos, métricas, gráficos |
| `--ok` | `#2BD97C` | Éxito / disponible |
| `--warn` | `#FFB020` | Advertencia / próximamente |
| `--bad` | `#FF5A5A` | Error |

### 2.2 Color — modo claro («papel»)

| Rol | HEX | Uso |
|---|---|---|
| `--bg` | `#EDEBE4` | Fondo papel crudo |
| `--surface` | `#F7F6F1` | Tarjetas |
| `--surface-alt` | `#DFDCD2` | Pozo / hover |
| `--line` | `#C9C6BC` | Retícula 1 px |
| `--line-strong` | `#8D9288` | Borde estructural |
| `--text` | `#14171C` | Texto principal (14:1) |
| `--text-muted` | `#575C58` | Texto secundario (5,6:1) |
| `--accent` | `#5A8F00` | Lima oscurecida para contraste sobre papel (5,1:1) |
| `--on-accent` | `#FFFFFF` | Texto sobre acento |
| `--data` | `#1B44C8` | Cobalto (6,4:1) |

> Regla: el modo claro **no es una inversión mecánica**. El lima se oscurece para conservar contraste. Nunca negro o blanco puro como superficie.

### 2.3 Espaciado — retícula de 4 px

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

El espacio interior de un grupo siempre menor que el espacio entre grupos.

### 2.4 Retícula y radios

- 12 columnas, gutter 24 px, margen 48 px escritorio / 20 px móvil. Máximo 1200 px.
- **Radio = 0** en todo: tarjetas, botones, chips, campos, modales. La geometría es facetada.
- Única excepción: ninguna. El punto de firma es cuadrado.
- Borde estructural de 1 px; sombra dura de 3 px desplazada (`3px 3px 0`) solo en CTA y tarjetas destacadas. Sin blur, sin glow, sin degradados.

### 2.5 Tipografía

| Rol | Familia | Pesos | Uso |
|---|---|---|---|
| Display | **Archivo Black** | 400 | Títulos de hero y cifras grandes |
| UI | **Archivo** | 400, 500, 600, 700 | Cuerpo, botones, navegación |
| Datos | **IBM Plex Mono** | 400, 500, 600 | `US-NN`, métricas, precios, fechas, código |

Escala: `clamp()` fluida. `tabular-nums` en toda cifra. Interlineado 1.05 en display, 1.55 en cuerpo. Sentence case en títulos cortos; sin punto final en etiquetas.

### 2.6 Movimiento

- Duración: 160–200 ms. Curva: `cubic-bezier(.2,.7,.2,1)`.
- Animar solo `opacity`, `transform`, `color`. Sin bucles decorativos.
- `prefers-reduced-motion: reduce` → cero animaciones.
- El punto de registro late 1.8 s (escala 1 → .65 → 1) solo en el hero; es señal, no adorno.

---

## 3. Componentes

| Componente | Regla |
|---|---|
| **Botón primario** | Fondo lima, texto `--on-accent`, 0 radio, 3 px sombra dura, alto 48 px. Hover: desplazamiento 2 px. |
| **Botón secundario** | Borde 1 px `--line-strong`, texto `--text`, fondo transparente. Hover: `--surface-alt`. |
| **Chip de producto** | Mono 11 px, 1 px borde, padding 4/8, sin radio. |
| **Tarjeta de producto** | Fondo `--surface`, borde 1 px `--line`, esquina superior con franja de acento del producto. Número `US-NN` en mono arriba. |
| **Placa técnica** | Bloque con retícula de fondo y 3 métricas tabulares. Sin sombra. |
| ** separating line** | 1 px `--line`, ocupa ancho completo. Nunca con degradado. |
| **Formulario** | Inputs sin radio, borde inferior 1 px, foco lima de 2 px. Etiqueta arriba en mono 11 px. Error en `--bad` con icono + texto. |
| **Alertas / toast** | Icono + texto + color. Nunca solo color. Fondo `--surface`, borde izquierdo 3 px del semántico. |

---

## 4. Accesibilidad

- Contraste AA verificado: texto ≥ 4,5:1, gráficos ≥ 3:1 en ambos temas.
- Foco visible siempre: outline 2 px lima con offset 2 px.
- Targets táctiles ≥ 44 px.
- El color nunca es el único portador de significado: icono + texto + color.
- `lang="es"`, `prefers-reduced-motion`, `prefers-contrast: more` respetados.
- Navegación por teclado completa; skip-link al contenido principal.

---

## 5. Prohibiciones explícitas

- Gradientes (de fondo, de texto, mesh), glows, blobs, sombras de color.
- Emojis como iconos, badges «New ✨» o «AI-Powered».
- Esquinas redondeadas, glassmorphism, tarjetas flotantes con blur.
- Exclamaciones y palabras de moda en copy.
- Mezclar sets de iconos o tamaños de trazo: un solo set (Lucide), 18 px, trazo 1,5, `currentColor`.
