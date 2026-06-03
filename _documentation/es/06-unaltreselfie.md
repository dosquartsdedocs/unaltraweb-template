---
title: Perfil unaltreselfie
description: Sitios personales académicos con identidad, publicaciones, proyectos, entradas, noticias y lecturas.
lang: es
ref: profile_unaltreselfie
profiles: [unaltredocs]
section: Perfiles
weight: 110
permalink: /es/docs/unaltreselfie/
---

![Primera vista de unaltreselfie]({{ '/assets/img/screenshots/home-light-chromium.png' | relative_url }} "Primera vista de unaltreselfie")

Usa `unaltreselfie` cuando el sitio representa a una persona: perfil académico, investigador, profesional o portafolio público. La portada prioriza identidad, enlaces y actividad seleccionada, no una landing de proyecto.

## Qué Prioriza

- Barra lateral de perfil con avatar, afiliación y enlaces sociales.
- Noticias recientes, entradas recientes, publicaciones seleccionadas y proyectos activos en la portada.
- Páginas opcionales de CV, blog, noticias, proyectos, lecturas y publicaciones.
- Páginas multilingües que siguen sintiéndose como un único sitio personal.

## Forma Del Contenido

Empieza con `_pages/<lang>/index.md` usando el layout de perfil y añade solo las secciones que la persona necesite de verdad. Noticias funciona bien para prensa, entrevistas y apariciones públicas; las entradas siguen siendo mejores para actualizaciones o ensayos firmados.

## Activarlo

```yaml
unaltraweb:
  site_profile: unaltreselfie
```
