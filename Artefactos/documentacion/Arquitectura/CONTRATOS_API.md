# Contratos de integración (sin API propia)

## Formulario de contacto — Formspree

```
POST https://formspree.io/f/{FORM_ID}
Content-Type: application/json
Accept: application/json
```

Request:
```json
{
  "nombre": "Ana García",
  "email": "ana@ejemplo.com",
  "interes": "US-01",
  "mensaje": "Quiero licencia para mi equipo",
  "website": ""
}
```

Respuestas: `200` éxito · `422` campos inválidos · `429` límite de plan alcanzado.
Manejo en cliente: éxito → toast `--ok`; error → toast `--bad` con texto + icono y se revela el fallback `mailto:`.

## Enlaces de contacto directo

| Canal | Formato | Uso |
|---|---|---|
| WhatsApp | `https://wa.me/{NUMERO}?text={TEXTO}` | CTA principal en móvil |
| Email | `mailto:{EMAIL}?subject={ASUNTO}` | Fallback y CTA secundario |
| Descarga | URL de Expo/artifacts por producto | Botón «Probar» en fichas |

> `{FORM_ID}`, `{NUMERO}` y `{EMAIL}` se configuran en `assets/js/main.js` dentro del objeto `CONFIG`. Revisar antes de publicar.
