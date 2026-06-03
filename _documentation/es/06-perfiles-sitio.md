---
title: Perfiles de sitio
description: Familias de sitio preparadas y seleccionadas en tiempo de construcción.
lang: es
ref: software_site_profiles
profiles: [unaltredocs]
section: Perfiles
weight: 100
permalink: /es/docs/perfiles-sitio/
---

Los perfiles son familias de sitio de alto nivel, no layouts de Jekyll. El perfil activo se selecciona antes de escribir el sitio y después las páginas y documentos se filtran por su front matter `profiles`.

Cada perfil tiene su propia página porque el modelo de contenido, la navegación y las prioridades visuales son distintas. Esas páginas usan una sola captura inicial por perfil; las capturas más profundas de render-smoke quedan como artefactos de prueba y no como ruido documental.

| Perfil | Uso |
|---|---|
| [`unaltreselfie`]({{ '/es/docs/unaltreselfie/' | relative_url }}) | Sitio personal académico o profesional |
| [`unaltreprojecte`]({{ '/es/docs/unaltreprojecte/' | relative_url }}) | Proyecto de investigación o infraestructura pública |
| [`unaltremanual`]({{ '/es/docs/unaltremanual/' | relative_url }}) | Manual tipo libro o guía docente |
| [`unaltredocs`]({{ '/es/docs/unaltredocs/' | relative_url }}) | Documentación técnica con índice izquierdo |

<h2 id="profile-specific-home">Inicio específico del perfil</h2>

Cada perfil puede mostrar una página de inicio distinta aunque comparta el mismo repositorio. Coloca la página bajo `_pages/<lang>/`, asigna el valor `profiles` correspondiente y usa el permalink de esa lengua. El overlay de perfil del Makefile decide qué conjunto se renderiza.

<h2 id="book-like-chapters">Capítulos tipo libro</h2>

El perfil `unaltremanual` sirve para material secuencial: capítulos, apuntes docentes o guías. Usa layouts de manual y navegación anterior/siguiente para que el sitio se comporte más como un libro que como una página de proyecto.
