---
title: Páginas y plantillas reutilizables de perfil
description: De dónde cargan datos las páginas de equipo, lecturas, tesis, repositorios y publicaciones.
lang: es
ref: software_reusable_profile_pages
profiles: [techdocs, software]
section: Autoría
subsection: Modelo de contenido
weight: 44
permalink: /es/docs/paginas-reutilizables/
---

Las páginas reutilizables de perfil son archivos Markdown normales en `_pages/<lang>/`. El front matter de la página selecciona la plantilla de renderizado y la fuente de contenido; el layout o include del núcleo se encarga de repetir la presentación.

![Vista general de páginas reutilizables]({{ site.baseurl }}/assets/img/placeholders/reusable-profile-pages.svg "Captura esquemática de ficheros de datos alimentando páginas reutilizables de perfil.")

| Tipo de página | Front matter de la página | Fuente de datos |
|---|---|---|
| Equipo | `layout: page` más `{% raw %}{% include team-grid.liquid %}{% endraw %}` | `_data/team.yml`; imágenes en `assets/img/team/` |
| Libros y lecturas | `layout: book-shelf`, `collection: books` | Colección `_books`, filtrada por `lang` y ordenada por fecha |
| Tesis | `layout: theses` | Colección `_theses`, filtrada por `lang` y ordenada por `order` |
| Repositorios | `layout: repositories` | `_data/repositories.yml` con `github_users` y `github_repos` |
| Resultados de proyecto | `layout: outputs` | Colección `_outputs`, filtrada por `lang` y ordenada por `importance` |
| Publicaciones y métricas | `layout: page` con includes de bibliografía | `_bibliography/*.bib` y `_data/metrics.yml` |

La página de equipo es el ejemplo más directo. `_pages/es/proyecto-equipo.md` contiene el texto y el include `team-grid.liquid`, mientras que `_data/team.yml` guarda un registro por persona:

```yaml
- name: Alex
  lastname: Example
  position: Data infrastructure lead
  organization: unaltraweb Research Infrastructure Demo
  pic: user-placeholder.png
```

Usa `profiles: [project]` para páginas solo de proyecto, `profiles: [personal]` para páginas personales y `feature` cuando una sección deba activarse u ocultarse mediante `unaltraweb.features`.

<h2 id="team-page">Página de equipo</h2>

La página de equipo renderiza `_data/team.yml` mediante `{% raw %}{% include team-grid.liquid %}{% endraw %}`. Cada registro puede definir nombre, rol, organización, departamento, imagen, correo y enlaces sociales. Las imágenes se leen desde `assets/img/team/` salvo que el fichero de datos indique otra ruta.

<h2 id="books-and-readings">Libros y lecturas</h2>

Las estanterías de lectura usan `layout: book-shelf` y `collection: books`. Los elementos viven en `_books`, pueden localizarse con `lang` e incluir campos bibliográficos como `author`, `year`, `status`, `isbn`, `olid`, `cover` y `resource_url`. Cuando los elementos definen `collection_name` o `series`, la estantería los separa en secciones y añade un índice pequeño que salta a cada colección.

<h3 id="calibre-libraries">Bibliotecas Calibre</h3>

Una biblioteca Calibre puede alimentar la misma colección `_books`. El mapeo útil es directo: título, autoría, editorial, fecha de publicación, ISBN, serie, etiquetas, comentarios y portada de Calibre pasan a campos de front matter y texto de reseña. Usa `collection_name` para la agrupación visible de la estantería y conserva la `series` de Calibre como alternativa cuando no haya una colección explícita. Las portadas deberían copiarse a `assets/img/books/` y referenciarse con `cover: /assets/img/books/<slug>.jpg`; los archivos de libro electrónico deben quedarse fuera del repositorio salvo que los derechos de distribución estén claros.

Para un sitio personal, usa `profiles: [personal]` y las entradas aparecerán en `unaltreselfie`. Para listas de lectura de proyecto, usa `profiles: [project]`. Las bibliotecas virtuales, etiquetas o columnas personalizadas de Calibre pueden convertirse en `tags`, `status`, `collection_name` o páginas generadas separadas, según cómo esté organizada la biblioteca.

Para importar una biblioteca Calibre real necesitamos tres decisiones: la ruta de la biblioteca, qué colecciones o etiquetas de Calibre se publican, y si cada elemento será una nota pública de lectura, un borrador privado omitido del sitio o solo una tarjeta de metadatos con portada y registro bibliográfico.

<h2 id="theses-page">Página de tesis</h2>

El layout de tesis lee `_theses`, filtra entradas por lengua y las ordena por `order`. Los registros de tesis pueden llevar títulos, resúmenes, estados, institución, dirección y una imagen opcional con atribución de fuente.

<h2 id="repositories-page">Página de repositorios</h2>

El layout de repositorios lee `_data/repositories.yml`. Usa `github_users` para tarjetas de perfiles y `github_repos` para repositorios concretos. Así la página visible queda declarativa y la lógica de renderizado permanece en el núcleo.
