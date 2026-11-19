# Guía de DevOps y seguridad

## Entorno local

No hay build. Para previsualizar:

```powershell
cd Uskein-Studio-Brochure
python -m http.server 8080
# abrir http://localhost:8080
```

## Publicación en GitHub Pages (gratis)

1. Crear repositorio público `<usuario>.github.io` (o un repo cualquiera y activate Pages).
2. Copiar el contenido de esta carpeta a la raíz del repo.
3. Confirmar que existe `.nojekyll` (evita que Jekyll ignore carpetas con guion bajo).
4. En el repo: **Settings → Pages → Source: Deploy from a branch → main / root**.
5. Esperar 1–2 min. URL: `https://<usuario>.github.io/`.
6. Si se usa repo secundario: `https://<usuario>.github.io/<repo>/` y fijar `base` en los enlaces relativos.

## Configuración antes de publicar

Editar `assets/js/main.js`:

```js
export const CONFIG = {
  formspreeId: 'TU_FORM_ID',
  whatsapp: '521XXXXXXXXXX',
  email: 'tu@correo.com'
};
```

## CSP recomendada (meta en HTML)

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src https://fonts.gstatic.com;
               script-src 'self';
               img-src 'self' data:;
               connect-src https://formspree.io;">
```

## Seguridad

- Sin secretos en el cliente; Formspree es público por diseño.
- Honeypot `website` + validación HTML5 para reducir spam.
- HTTPS forzado por GitHub Pages.
- Sin cookies de terceros ni analytics con datos personales.
- Revisar que no queden tokens de API reales en el código antes de cada push.

## Verificación previa al despliegue

- [ ] `index.html` y las 9 fichas cargan sin 404
- [ ] Foco visible y navegación por teclado
- [ ] Contraste AA en ambos temas
- [ ] Formulario con y sin conexión
- [ ] Enlaces de WhatsApp y email con datos reales
- [ ] Sin errores en consola
