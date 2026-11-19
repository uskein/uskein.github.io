# Estructura de directorios

```text
Uskein-Studio-Brochure/
├── index.html                      # Hub: hero, catálogo, precios, contacto
├── productos/
│   ├── habitos/index.html          # Ficha: Pulse Clay
│   ├── inspector/index.html        # Ficha: INSPECTOR / TOPO-HUD
│   ├── monedero/index.html         # Ficha: Monedero
│   ├── biblioteca/index.html       # Ficha: Biblioteca Digital / ATHENAEUM
│   ├── classdesk/index.html        # Ficha: ClassDesk
│   ├── diario/index.html           # Ficha: Diario
│   ├── galeria/index.html          # Ficha: Galería de Vídeos
│   ├── lector/index.html           # Ficha: Lector
│   └── voynich/index.html          # Ficha: Voynich Local
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Variables de identidad (SSOT visual)
│   │   ├── site.css                # Componentes y layout del brochure
│   │   └── product.css             # Estilos compartidos de fichas
│   ├── js/
│   │   ├── main.js                 # Tema, menú, filtros, formulario, analytics
│   │   └── data.js                 # Catálogo de productos (fuente única de datos)
│   └── img/                        # SVG propios: retícula, firmas, capturas
├── Artefactos/documentacion/
│   ├── Diseno-Visual/              # manual-identidad-visual.md, showcase
│   ├── Prototipos/                 # prototipos de identidad
│   ├── Arquitectura/               # este documento y hermanos
│   ├── Producto y Flujos/          # requerimientos, sitemap, blueprints, flujos
│   ├── Requerimientos/             # REQUERIMIENTOS_VISUAL.html
│   ├── ArquitecturaInformacion/    # ARQUITECTURA_INFORMACION_VISUAL.html
│   ├── Blueprints/                 # BLUEPRINTS_VISUAL.html
│   ├── Flujos/                     # FLUJOS_VISUAL.html
│   ├── DocumentacionMaestra/       # PRODUCTO_VISUAL_HUB.html
│   └── Orquestador/                # PLAN_DE_SPRINTS.md
├── .nojekyll                       # Evita que GitHub Pages ignore archivos
├── README.md                       # Instrucciones de publicación
└── CNAME                           # (opcional) dominio propio gratuito
```

## Responsabilidades

- `assets/js/data.js`: array `PRODUCTS` con nombre, slug, categoría, plataforma, descripción, características, métricas, color de acento y enlaces. Tanto el hub como las fichas lo consumen para no duplicar contenido.
- `assets/css/tokens.css`: traduce el manual de identidad a variables CSS. **Prohibido hardcodear HEX** en otros archivos.
- `assets/css/site.css`: componentes (botones, tarjetas, placas, formulario) y layout responsive.
- `productos/<slug>/index.html`: incluye el mismo `<header>` y `<footer>` que el hub y resalta el producto con su `US-NN`.
