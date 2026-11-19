# Flujos de usuario

## F1 · Descubrimiento y filtrado (happy path)

```mermaid
sequenceDiagram
  actor V as Visitante
  participant H as Hub
  participant D as data.js
  V->>H: Carga index.html
  H->>D: import PRODUCTS
  D-->>H: 10 productos
  H->>V: Hero + tarjetas
  V->>H: Pulso filtro "Bienestar"
  H->>V: 2 tarjetas visibles, aria-pressed actualizado
```

## F2 · Evaluación de producto

```mermaid
flowchart LR
  A[Tarjeta] --> B[Ficha US-NN]
  B --> C{¿Estado?}
  C -- available --> D[Descargar / preguntar]
  C -- beta --> E[Solicitar acceso]
  C -- soon --> F[Solicitar acceso + aviso]
  D --> G[WhatsApp o correo]
  E --> G
  F --> G
```

## F3 · Contacto

```mermaid
flowchart TD
  A[Formulario] --> B{¿Válido?}
  B -- no --> C[Toast error + campos marcados]
  C --> A
  B -- sí --> D[POST Formspree]
  D -- 200 --> E[Toast ok + reset]
  D -- error --> F[Toast error + mailto con borrador]
```

## Flujos alternativos

| Situación | Comportamiento |
|---|---|
| Sin JavaScript | El contenido de las fichas no se renderiza; se muestra aviso. Mitigación: `noscript` añadido en el hub. |
| Formspree sin configurar | Se detecta `TU_FORM_ID` y se abre `mailto:` directamente. |
| Preferencia de movimiento reducido | Desactivar reveal, ping y transiciones. |
| Cambio de tema | Persistencia en `localStorage`; sin parpadeo porque se aplica antes del primer pintado. |
| Navegación circular | Última ficha → primera; primera → última. |
