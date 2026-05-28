---
title: Matriz de funcionalidades por perfil
description: Una matriz basada en metadatos sobre lo que admite cada perfil preparado.
lang: es
ref: software_profile_checklist
profiles: [techdocs, software]
section: Conceptos
weight: 17
permalink: /es/docs/checklist-perfiles/
profile_feature_matrix:
  feature_label: Funcionalidad
  legend_label: Leyenda
  legend: "Símbolos usados en la matriz:"
  labels:
    "yes": Incluido
    config: Configurable
    "no": No forma parte de este perfil
  profiles:
    - key: personal
      label: unaltreselfie
    - key: project
      label: unaltreprojecte
    - key: manual
      label: unaltremanual
    - key: techdocs
      label: unaltredocs
  rows:
    - label: Inicio específico del perfil
      url: /es/docs/perfiles-sitio/#profile-specific-home
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Entradas de blog
      url: /es/docs/modelo-contenido/#blog-posts
      personal: yes
      project: config
      manual: no
      techdocs: no
    - label: Página de CV
      url: /es/docs/modelo-contenido/#cv-page
      personal: yes
      project: no
      manual: no
      techdocs: no
    - label: Página de publicaciones
      url: /es/docs/modelo-contenido/#publications-page
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Métricas de publicaciones
      url: /es/docs/metricas/#publication-metrics
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Página de equipo
      url: /es/docs/paginas-reutilizables/#team-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Recursos y resultados de proyecto
      url: /es/docs/outputs-investigacion/#project-resources-and-outputs
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Página de repositorios
      url: /es/docs/paginas-reutilizables/#repositories-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Libros y lecturas
      url: /es/docs/paginas-reutilizables/#books-and-readings
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Página de tesis
      url: /es/docs/paginas-reutilizables/#theses-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Capítulos tipo libro
      url: /es/docs/perfiles-sitio/#book-like-chapters
      personal: no
      project: no
      manual: yes
      techdocs: no
    - label: Barra lateral de documentación
      url: /es/docs/coleccion-documentacion/#documentation-sidebar
      personal: no
      project: no
      manual: no
      techdocs: yes
    - label: Enlaces anterior y siguiente
      url: /es/docs/modelo-contenido/#previous-and-next-links
      personal: config
      project: config
      manual: yes
      techdocs: yes
    - label: Acciones reutilizables de GitHub Actions
      url: /es/docs/github-actions/#reusable-workflows
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Previsualización local con Docker
      url: /es/docs/previsualizacion-perfiles/#local-docker-profile-preview
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
---

Usa los perfiles como puntos de partida, no como límites rígidos. La matriz se genera desde el front matter `profile_feature_matrix` de este documento: los datos quedan como metadatos de documentación y el renderizado vive en el include del núcleo.

{% include profile-feature-matrix.liquid %}

El perfil `techdocs` encaja mejor cuando la tarea principal es explicar cómo instalar, configurar, ejecutar, citar y mantener un producto de investigación reutilizable.
