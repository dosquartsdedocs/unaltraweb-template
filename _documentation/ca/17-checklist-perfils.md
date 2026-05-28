---
title: Matriu de funcionalitats per perfil
description: Una matriu basada en metadades sobre el que admet cada perfil preparat.
lang: ca
ref: software_profile_checklist
profiles: [techdocs, software]
section: Conceptes
weight: 17
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
    - key: personal
      label: unaltreselfie
    - key: project
      label: unaltreprojecte
    - key: manual
      label: unaltremanual
    - key: techdocs
      label: unaltredocs
  rows:
    - label: Inici específic del perfil
      url: /ca/docs/perfils-lloc/#profile-specific-home
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Entrades de blog
      url: /ca/docs/model-contingut/#blog-posts
      personal: yes
      project: config
      manual: no
      techdocs: no
    - label: Pàgina de CV
      url: /ca/docs/model-contingut/#cv-page
      personal: yes
      project: no
      manual: no
      techdocs: no
    - label: Pàgina de publicacions
      url: /ca/docs/model-contingut/#publications-page
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Mètriques de publicacions
      url: /ca/docs/metriques/#publication-metrics
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Pàgina d'equip
      url: /ca/docs/pagines-reutilitzables/#team-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Recursos i resultats de projecte
      url: /ca/docs/outputs-recerca/#project-resources-and-outputs
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Pàgina de repositoris
      url: /ca/docs/pagines-reutilitzables/#repositories-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Llibres i lectures
      url: /ca/docs/pagines-reutilitzables/#books-and-readings
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Pàgina de tesis
      url: /ca/docs/pagines-reutilitzables/#theses-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Capítols de tipus llibre
      url: /ca/docs/perfils-lloc/#book-like-chapters
      personal: no
      project: no
      manual: yes
      techdocs: no
    - label: Barra lateral de documentació
      url: /ca/docs/colleccio-documentacio/#documentation-sidebar
      personal: no
      project: no
      manual: no
      techdocs: yes
    - label: Enllaços anterior i següent
      url: /ca/docs/model-contingut/#previous-and-next-links
      personal: config
      project: config
      manual: yes
      techdocs: yes
    - label: Accions reutilitzables de GitHub Actions
      url: /ca/docs/github-actions/#reusable-workflows
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Previsualització local amb Docker
      url: /ca/docs/previsualitzacio-perfils/#local-docker-profile-preview
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
---

Usa els perfils com a punts de partida, no com a límits rígids. La matriu es genera des del front matter `profile_feature_matrix` d'aquest document: les dades queden com a metadades de documentació i el renderitzat viu en l'include del nucli.

{% include profile-feature-matrix.liquid %}

El perfil `techdocs` encaixa millor quan la tasca principal és explicar com instal·lar, configurar, executar, citar i mantenir un producte de recerca reutilitzable.
