---
title: Perfil unaltremanual
description: Manuales tipo libro y guías docentes con capítulos, navegación lateral y lecturas seleccionadas.
lang: es
ref: profile_unaltremanual
profiles: [unaltredocs]
section: Perfiles
weight: 130
permalink: /es/docs/unaltremanual/
---

![Primera vista de unaltremanual]({{ '/assets/img/screenshots/manual-home-chromium.png' | relative_url }} "Primera vista de unaltremanual")

Usa `unaltremanual` para materiales docentes secuenciales: manuales, guías de curso, prácticas y apuntes tipo libro. Está pensado para leerse en orden, no para navegarse como un menú de sitio normal.

## Qué Prioriza

- Portada, colección de capítulos y barra lateral persistente de contenidos.
- Tabla de contenidos derecha para capítulos largos.
- Índice de búsqueda acotado al manual.
- Bibliografía sin badges bibliométricos, con lecturas seleccionadas que pueden enlazar a reseñas.

## Forma Del Contenido

Los capítulos viven en `_chapters/<lang>/` y pueden usar figuras, callouts, tablas, bloques de código y bibliografía local. El capítulo de bibliografía forma parte del flujo de lectura del manual, no de una página genérica de publicaciones.

## Activarlo

```yaml
unaltraweb:
  site_profile: unaltremanual
```
