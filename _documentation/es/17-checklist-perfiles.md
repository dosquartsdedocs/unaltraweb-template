---
title: Matriz de funcionalidades por perfil
description: Una matriz basada en metadatos sobre lo que admite cada perfil preparado.
lang: es
ref: software_profile_checklist
profiles: [unaltredocs]
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
    - key: unaltreselfie
      label: unaltreselfie
    - key: unaltreprojecte
      label: unaltreprojecte
    - key: unaltremanual
      label: unaltremanual
    - key: unaltredocs
      label: unaltredocs
  rows:
    - label: Inicio específico del perfil
      url: /es/docs/perfiles-sitio/#profile-specific-home
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
    - label: Entradas de blog
      url: /es/docs/modelo-contenido/#blog-posts
      unaltreselfie: yes
      unaltreprojecte: config
      unaltremanual: no
      unaltredocs: no
    - label: Página de CV
      url: /es/docs/modelo-contenido/#cv-page
      unaltreselfie: yes
      unaltreprojecte: no
      unaltremanual: no
      unaltredocs: no
    - label: Página de publicaciones
      url: /es/docs/modelo-contenido/#publications-page
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Métricas de publicaciones
      url: /es/docs/metricas/#publication-metrics
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Página de equipo
      url: /es/docs/paginas-reutilizables/#team-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Recursos y resultados de proyecto
      url: /es/docs/outputs-investigacion/#project-resources-and-outputs
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Página de repositorios
      url: /es/docs/paginas-reutilizables/#repositories-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Libros y lecturas
      url: /es/docs/paginas-reutilizables/#books-and-readings
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Página de tesis
      url: /es/docs/paginas-reutilizables/#theses-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Capítulos tipo libro
      url: /es/docs/perfiles-sitio/#book-like-chapters
      unaltreselfie: no
      unaltreprojecte: no
      unaltremanual: yes
      unaltredocs: no
    - label: Barra lateral de documentación
      url: /es/docs/coleccion-documentacion/#documentation-sidebar
      unaltreselfie: no
      unaltreprojecte: no
      unaltremanual: no
      unaltredocs: yes
    - label: Enlaces anterior y siguiente
      url: /es/docs/modelo-contenido/#previous-and-next-links
      unaltreselfie: config
      unaltreprojecte: config
      unaltremanual: yes
      unaltredocs: yes
    - label: Acciones reutilizables de GitHub Actions
      url: /es/docs/github-actions/#reusable-workflows
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
    - label: Previsualización local con Docker
      url: /es/docs/previsualizacion-perfiles/#local-docker-profile-preview
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
---

Usa los perfiles como puntos de partida, no como límites rígidos. La matriz se genera desde el front matter `profile_feature_matrix` de este documento: los datos quedan como metadatos de documentación y el renderizado vive en el include del núcleo.

{% include profile-feature-matrix.liquid %}

El perfil `unaltredocs` encaja mejor cuando la tarea principal es explicar cómo instalar, configurar, ejecutar, citar y mantener un producto de investigación reutilizable.
