---
title: Perfiles de sitio
description: Familias de sitio preparadas y seleccionadas en tiempo de construcción.
lang: es
ref: software_site_profiles
profiles: [unaltredocs]
section: Conceptos
weight: 15
permalink: /es/docs/perfiles-sitio/
---

Los perfiles son familias de sitio de alto nivel, no layouts de Jekyll. El perfil activo se selecciona antes de escribir el sitio y después las páginas y documentos se filtran por su front matter `profiles`.

| Perfil | Uso |
|---|---|
| `unaltreselfie` | Sitio personal académico o profesional |
| `unaltreprojecte` | Proyecto de investigación o infraestructura pública |
| `unaltremanual` | Manual tipo libro o guía docente |
| `unaltredocs` | Documentación técnica con índice izquierdo |

<h2 id="profile-specific-home">Inicio específico del perfil</h2>

Cada perfil puede mostrar una página de inicio distinta aunque comparta el mismo repositorio. Coloca la página bajo `_pages/<lang>/`, asigna el valor `profiles` correspondiente y usa el permalink de esa lengua. El overlay de perfil del Makefile decide qué conjunto se renderiza.

<h2 id="book-like-chapters">Capítulos tipo libro</h2>

El perfil `unaltremanual` sirve para material secuencial: capítulos, apuntes docentes o guías. Usa layouts de manual y navegación anterior/siguiente para que el sitio se comporte más como un libro que como una página de proyecto.
