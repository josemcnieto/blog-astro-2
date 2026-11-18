# El blog de Arquitectura

Blog personal sobre arquitectura, ciudad y sostenibilidad, construido con [Astro](https://astro.build/).

## Características

- Entradas en Markdown y MDX gestionadas con content collections.
- Feed RSS, sitemap y metadatos para redes sociales.
- Fuentes locales y optimización de imágenes con Sharp.
- Despliegue automático en GitHub Pages mediante GitHub Actions.

## Estructura del proyecto

```text
public/                  Recursos estáticos (favicon, etc.)
src/
├── assets/              Imágenes y fuentes
├── components/          Cabecera, pie, metadatos, fechas...
├── content/blog/        Entradas del blog (Markdown y MDX)
├── layouts/             Plantillas de página y de entrada
├── pages/               Rutas del sitio (inicio, blog, about, RSS)
├── consts.ts            Datos globales y helper de rutas
└── content.config.ts    Esquema de las content collections
astro.config.mjs         Configuración de Astro
```

## Comandos

| Comando           | Acción                                             |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Instala las dependencias                           |
| `npm run dev`     | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Genera el sitio en `./dist/`                       |
| `npm run preview` | Previsualiza el resultado del build                |
| `npm run astro ...` | Ejecuta comandos de la CLI de Astro              |

## Añadir una entrada

Crea un archivo `.md` o `.mdx` en `src/content/blog/` con este frontmatter:

```markdown
---
title: 'Título de la entrada'
description: 'Resumen breve'
pubDate: '2026-10-12'
heroImage: '../../assets/blog-placeholder-1.jpg'
---
```

El campo `heroImage` es opcional. Las fechas se ordenan de más reciente a más antigua.

## Despliegue en GitHub Pages

El sitio se publica en `https://josemcnieto.github.io/blog-astro-2/`.

- `astro.config.mjs` define `site` con la URL de GitHub Pages y `base: '/blog-astro-2'`.
- Los enlaces internos usan el helper `withBase()` de `src/consts.ts` para incluir la ruta base.
- `.github/workflows/deploy.yml` compila y publica el contenido de `dist/` en cada push a `main` o `master`.
- En el repositorio hay que ir a **Settings → Pages → Source** y elegir **GitHub Actions**.

Si en el futuro se usa un dominio propio, añade un archivo `CNAME` en `public/`, cambia `site` por el
dominio nuevo y elimina `base`.
