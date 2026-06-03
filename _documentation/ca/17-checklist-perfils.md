---
title: Matriu de funcionalitats per perfil
description: Una matriu basada en metadades sobre el que admet cada perfil preparat.
lang: ca
ref: software_profile_checklist
profiles: [unaltredocs]
section: Perfils
weight: 150
permalink: /ca/docs/checklist-perfils/
profile_feature_matrix:
  feature_label: Funcionalitat
  legend_label: Llegenda
  legend: "Símbols usats en la matriu:"
  labels:
    "yes": Inclòs
    config: Configurable
    "no": No forma part d'aquest perfil
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
    - label: Inici específic del perfil
      url: /ca/docs/perfils-lloc/#profile-specific-home
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
    - label: Entrades de blog
      url: /ca/docs/model-contingut/#blog-posts
      unaltreselfie: yes
      unaltreprojecte: config
      unaltremanual: no
      unaltredocs: no
    - label: Pàgina de CV
      url: /ca/docs/model-contingut/#cv-page
      unaltreselfie: yes
      unaltreprojecte: no
      unaltremanual: no
      unaltredocs: no
    - label: Pàgina de publicacions
      url: /ca/docs/model-contingut/#publications-page
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Mètriques de publicacions
      url: /ca/docs/metriques/#publication-metrics
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Pàgina d'equip
      url: /ca/docs/pagines-reutilitzables/#team-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Recursos i resultats de projecte
      url: /ca/docs/outputs-recerca/#project-resources-and-outputs
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Pàgina de repositoris
      url: /ca/docs/pagines-reutilitzables/#repositories-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Llibres i lectures
      url: /ca/docs/pagines-reutilitzables/#books-and-readings
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Pàgina de tesis
      url: /ca/docs/pagines-reutilitzables/#theses-page
      unaltreselfie: no
      unaltreprojecte: yes
      unaltremanual: no
      unaltredocs: no
    - label: Capítols de tipus llibre
      url: /ca/docs/perfils-lloc/#book-like-chapters
      unaltreselfie: no
      unaltreprojecte: no
      unaltremanual: yes
      unaltredocs: no
    - label: Barra lateral de documentació
      url: /ca/docs/colleccio-documentacio/#documentation-sidebar
      unaltreselfie: no
      unaltreprojecte: no
      unaltremanual: no
      unaltredocs: yes
    - label: Enllaços anterior i següent
      url: /ca/docs/model-contingut/#previous-and-next-links
      unaltreselfie: config
      unaltreprojecte: config
      unaltremanual: yes
      unaltredocs: yes
    - label: Accions reutilitzables de GitHub Actions
      url: /ca/docs/github-actions/#reusable-workflows
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
    - label: Previsualització local amb Docker
      url: /ca/docs/previsualitzacio-perfils/#local-docker-profile-preview
      unaltreselfie: yes
      unaltreprojecte: yes
      unaltremanual: yes
      unaltredocs: yes
---

Usa els perfils com a punts de partida, no com a límits rígids. La matriu es genera des del front matter `profile_feature_matrix` d'aquest document: les dades queden com a metadades de documentació i el renderitzat viu en l'include del nucli.

{% include profile-feature-matrix.liquid %}

El perfil `unaltredocs` encaixa millor quan la tasca principal és explicar com instal·lar, configurar, executar, citar i mantenir un producte de recerca reutilitzable.
