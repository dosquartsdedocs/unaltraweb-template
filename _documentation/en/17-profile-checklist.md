---
title: Profile feature checklist
description: A metadata-driven matrix of what each prepared site profile is designed to support.
lang: en
ref: software_profile_checklist
profiles: [techdocs, software]
section: Concepts
weight: 17
permalink: /en/docs/profile-checklist/
profile_feature_matrix:
  feature_label: Feature
  legend_label: Legend
  legend: "Symbols used in the matrix:"
  labels:
    "yes": Included
    config: Configurable
    "no": Not part of this profile
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
    - label: Profile-specific home
      url: /en/docs/site-profiles/#profile-specific-home
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Blog posts
      url: /en/docs/content-model/#blog-posts
      personal: yes
      project: config
      manual: no
      techdocs: no
    - label: CV page
      url: /en/docs/content-model/#cv-page
      personal: yes
      project: no
      manual: no
      techdocs: no
    - label: Publications page
      url: /en/docs/content-model/#publications-page
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Publication metrics
      url: /en/docs/metrics/#publication-metrics
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Team page
      url: /en/docs/reusable-profile-pages/#team-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Project resources and outputs
      url: /en/docs/research-outputs/#project-resources-and-outputs
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Repositories page
      url: /en/docs/reusable-profile-pages/#repositories-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Books and readings
      url: /en/docs/reusable-profile-pages/#books-and-readings
      personal: yes
      project: yes
      manual: no
      techdocs: no
    - label: Theses template
      url: /en/docs/reusable-profile-pages/#theses-page
      personal: no
      project: yes
      manual: no
      techdocs: no
    - label: Book-like chapters
      url: /en/docs/site-profiles/#book-like-chapters
      personal: no
      project: no
      manual: yes
      techdocs: no
    - label: Documentation sidebar
      url: /en/docs/documentation-collection/#documentation-sidebar
      personal: no
      project: no
      manual: no
      techdocs: yes
    - label: Previous and next links
      url: /en/docs/content-model/#previous-and-next-links
      personal: config
      project: config
      manual: yes
      techdocs: yes
    - label: GitHub Actions reusable workflows
      url: /en/docs/github-actions/#reusable-workflows
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
    - label: Local Docker profile preview
      url: /en/docs/profile-preview/#local-docker-profile-preview
      personal: yes
      project: yes
      manual: yes
      techdocs: yes
---

Use profiles as starting points, not as hard limits. The matrix below is generated from this document's `profile_feature_matrix` front matter, so the data stays editable as documentation metadata while the table rendering stays in the core include.

{% include profile-feature-matrix.liquid %}

The `techdocs` profile is the best fit when the main task is explaining how to install, configure, run, cite and maintain a reusable research product.
