# Plan de promoción — Brochure Uskein Studio

> Enlace base: **https://uskein.github.io/**
> Genera enlaces con seguimiento: `node tools/utm-links.mjs`
> Los UTM se guardan en `localStorage` como `uskein-utm` y están disponibles en `window.USKEIN_UTM`.

## Mensaje central (no lo cambies)

**Agencia freelance que crea aplicaciones móviles, aplicaciones web y sistemas transaccionales a la medida.** Los diez productos son proyectos ya realizados: pruebas, no catálogo de licencias.

---

## Recursos listos para publicar

| Recurso | Ruta | Uso |
|---|---|---|
| Imagen de vista previa | `assets/img/og-linkedin.png` | LinkedIn, X, WhatsApp (la lee el sitio automáticamente) |
| Carrusel de 5 slides | `assets/img/carrusel/slide-1..5.png` | Publicación carrusel de LinkedIn |
| Media kit PDF | `assets/USKEIN-STUDIO-Media-Kit.pdf` | Adjuntar en correo o DM |
| Video del hero | `assets/video/hero-agencia.mp4` | Video nativo en LinkedIn |
| 10 demos de producto | `assets/video/demo-*.mp4` | Recortes para Reels / shorts |
| Textos de perfil | `LINKEDIN.md` | Perfil y primer post |

---

## Calendario de 14 días

| Día | Acción | Canal |
|---|---|---|
| 1 | Actualizar titular, About e Info destacada | LinkedIn |
| 1 | Publicar post de anuncio + fijarlo | LinkedIn |
| 2 | Publicar carrusel de 5 slides | LinkedIn |
| 3 | Enviar 10 DM a contactos afines (plantilla abajo) | LinkedIn |
| 4 | Estado de WhatsApp con el video del hero | WhatsApp |
| 5 | Post en X con el demo de un producto | X |
| 6 | Comentar 5 publicaciones de emprendedores con un aporte real | LinkedIn |
| 7 | Enviar correo a 15 contactos con el media kit | Email |
| 8 | Post: «cómo trabajo» (proceso en 4 pasos) | LinkedIn |
| 9 | Publicar demo de ClassDesk o Monedero | LinkedIn / X |
| 10 | Compartir en 2 comunidades (Reddit/Indie Hackers) | Comunidades |
| 11 | Crear perfil en Product Hunt y compartir el brochure | Directorios |
| 12 | Post con la calculadora de presupuesto | LinkedIn |
| 13 | Segundo DM a quienes vieron pero no respondieron | LinkedIn |
| 14 | Resumen: métricas + proyecto destacado del mes | LinkedIn |

---

## Copys por canal

### LinkedIn — carrusel (slides en orden)

Texto que acompaña al carrusel:

```
No vendo plantillas. Construyo software para la operación real de cada negocio.

En este carrusel:
1️⃣ Qué es Uskein Studio
2️⃣ Los tres servicios (móvil, web y transaccional)
3️⃣ Diez proyectos ya entregados
4️⃣ Resultados verificables
5️⃣ Cómo empezar

Si tienes una idea pospuesta, dime qué es y te devuelvo un alcance concreto.

🔗 https://uskein.github.io/

#Freelance #DesarrolloDeSoftware #AppsMoviles #SoftwareALaMedida
```

### LinkedIn — post del proceso

```
La mayoría de los proyectos no fallan por código. Fallan porque nadie definió bien el problema.

Mi proceso en cuatro pasos:

1. Descubrimiento: entendemos el problema y cerramos alcance con criterios medibles.
2. Diseño: identidad y flujos aprobados antes de programar.
3. Desarrollo: entregas por módulos con pruebas y estados revisables.
4. Entrega: build, despliegue y documentación. El código es tuyo.

Así evitamos sorpresas de alcance y de precio.

Brochure con ejemplos reales 👇 https://uskein.github.io/
```

### LinkedIn — post de la calculadora

```
Añadí una calculadora al brochure: eliges servicio y alcance, y obtienes un rango orientativo en segundos. El resultado se envía al WhatsApp ya redactado.

Sirve para dos cosas: que tú sepas más o menos cuánto cuesta, y que yo reciba una consulta con contexto.

Pruébala aquí 👇 https://uskein.github.io/

#Freelance #Presupuestos #DesarrolloWeb
```

### WhatsApp — estado / difusión

```
Hola 👋 Soy Juan Sebastián. Construyo apps móviles, apps web y sistemas transaccionales a la medida.

Dejé mis diez proyectos con demos en video en un solo lugar:

https://uskein.github.io/

Si conoces a alguien que necesite algo así, te agradezco el paso. 🙌
```

### X / Twitter

```
Diez proyectos reales. Tres servicios. Cero plantillas.

Apps móviles, web y sistemas transaccionales a la medida — con demos en video.

https://uskein.github.io/

#freelance #buildinpublic
```

### Correo — prospección

Asunto: `Brochure de servicios — Uskein Studio`

```
Hola [nombre],

Soy Juan Sebastián, desarrollo software freelance desde Colombia.

Construyo aplicaciones móviles, aplicaciones web y sistemas transaccionales a la medida: pagos, reservas, inventario, asistencia y reportes, con el código y los datos en manos del cliente.

Te dejo el brochure con diez proyectos ya entregados y un demo en video de cada uno, por si algún caso se parece al tuyo:

https://uskein.github.io/

Adjunto también un media kit de una página. Si quieres, hablamos 10 minutos y vemos si hay encaje.

Un saludo,
Juan Sebastián Patiño
WhatsApp +57 313 290 4451
```

### Comunidades (Reddit / Indie Hackers)

```
No soy fan de los posts de "míralo todo". Pero llevo tiempo construyendo herramientas offline-first y decidí documentarlas.

Diez proyectos, cada uno con sus momentos y un demo en video: https://uskein.github.io/

Si te interesa el enfoque local-first, SQLite o el diseño de sistemas transaccionales, puedo contar cómo lo resolví. Feliz de responder preguntas.
```

> Regla: en comunidades, aporta primero y enlaza después. Si el post solo es el link, lo eliminan.

### Product Hunt

- Nombre: **Uskein Studio — Software a la medida**
- Tagline: *Apps móviles, web y sistemas transaccionales para negocios reales*
- Descripción: una versión corta del About de `LINKEDIN.md`.
- Primer comentario del maker: cuenta qué construiste y por qué.

---

## Cómo medir sin pagar nada

1. Usa siempre los enlaces de `node tools/utm-links.mjs`.
2. El sitio guarda el origen en `localStorage`: abre la consola y escribe `USKEIN_UTM` para verlo.
3. Si activas Plausible o Cloudflare Web Analytics (gratis), configura `CONFIG.analytics` en `main.js` y verás visitas por canal.
4. Cuenta conversions a mano: cada WhatsApp que llegue con «vine desde LinkedIn/X/…» es una conversion.

## Reglas

- No publiques el mismo texto exacto en todos lados: adapta el primer línea.
- Un CTA por publicación.
- Responde los comentarios en las primeras 2 horas: multiplica el alcance.
- Fija el post de anuncio y actualiza Info destacada cada vez que haya novedades.
