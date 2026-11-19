# Arquitectura de información

## Sitemap

```mermaid
flowchart TD
  HUB[index.html · Hub] --> CAT[#catalogo]
  HUB --> WHY[#por-que]
  HUB --> PRICE[#precios]
  HUB --> CONTACT[#contacto]
  CAT --> P01[US-01 Pulse Clay]
  CAT --> P02[US-02 INSPECTOR]
  CAT --> P03[US-03 Monedero]
  CAT --> P04[US-04 ATHENAEUM]
  CAT --> P05[US-05 ClassDesk]
  CAT --> P06[US-06 DiarioFit]
  CAT --> P07[US-07 Galería de Estudio]
  CAT --> P08[US-08 Lumen]
  CAT --> P09[US-09 Voynich Codex]
  CAT --> P10[US-10 Kit de Estilos]
  P01 <--> P02 <--> P03 <--> P04 <--> P05
  P06 <--> P07 <--> P08 <--> P09 <--> P10
```

## Reglas de navegación

| Elemento | Regla |
|---|---|
| Header | Sticky en todas las páginas; enlaces relativos `../../index.html#…` en fichas |
| Breadcrumb | `Inicio / Catálogo / US-NN`, solo en fichas |
| Filtros | Un nivel de profundidad; sin subcategorías |
| Product-nav | Circular: la última ficha enlaza a la primera y viceversa |
| Footer | Enlace al catálogo, cuatro productos destacados y contacto |
| CTA | Un CTA primario por pantalla; el secundario siempre es WhatsApp o correo |

## URL

- Hub: `/`
- Ficha: `/productos/<slug>/`
- Anclas del hub: `#catalogo`, `#por-que`, `#precios`, `#contacto`

> GitHub Pages sirve `productos/<slug>/index.html` como `/productos/<slug>/` sin configuración adicional.
