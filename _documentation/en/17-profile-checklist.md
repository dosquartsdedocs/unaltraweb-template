---
title: Check Profile Features
description: A metadata-driven matrix of what each prepared site profile is designed
  to support.
lang: en
ref: software_profile_checklist
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- local-editors
- site-designers
- template-maintainers
section: Demo Profiles
subsection: Profile checks
weight: 350
permalink: "/en/docs/profile-checklist/"
profile_feature_matrix:
  feature_label: Feature
  legend_label: Legend
  legend: 'Symbols used in the matrix:'
  labels:
    'yes': Included
    config: Configurable
    'no': Not part of this profile
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
  - label: Profile-specific home
    url: "/en/docs/site-profiles/#profile-specific-home"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "yes"
    unaltredocs: "yes"
  - label: Blog posts
    url: "/en/docs/content-model/#blog-posts"
    unaltreselfie: "yes"
    unaltreprojecte: config
    unaltremanual: "no"
    unaltredocs: "no"
  - label: CV page
    url: "/en/docs/content-model/#cv-page"
    unaltreselfie: "yes"
    unaltreprojecte: "no"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Publications page
    url: "/en/docs/content-model/#publications-page"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Publication metrics
    url: "/en/docs/metrics/#publication-metrics"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Team page
    url: "/en/docs/reusable-profile-pages/#team-page"
    unaltreselfie: "no"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Project resources and outputs
    url: "/en/docs/research-outputs/#project-resources-and-outputs"
    unaltreselfie: "no"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Repositories page
    url: "/en/docs/reusable-profile-pages/#repositories-page"
    unaltreselfie: "no"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Books and readings
    url: "/en/docs/reusable-profile-pages/#books-and-readings"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Theses template
    url: "/en/docs/reusable-profile-pages/#theses-page"
    unaltreselfie: "no"
    unaltreprojecte: "yes"
    unaltremanual: "no"
    unaltredocs: "no"
  - label: Book-like chapters
    url: "/en/docs/site-profiles/#book-like-chapters"
    unaltreselfie: "no"
    unaltreprojecte: "no"
    unaltremanual: "yes"
    unaltredocs: "no"
  - label: Documentation sidebar
    url: "/en/docs/documentation-collection/#documentation-sidebar"
    unaltreselfie: "no"
    unaltreprojecte: "no"
    unaltremanual: "no"
    unaltredocs: "yes"
  - label: Previous and next links
    url: "/en/docs/content-model/#previous-and-next-links"
    unaltreselfie: config
    unaltreprojecte: config
    unaltremanual: "yes"
    unaltredocs: "yes"
  - label: GitHub Actions reusable workflows
    url: "/en/docs/github-actions/#reusable-workflows"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "yes"
    unaltredocs: "yes"
  - label: Local Docker profile preview
    url: "/en/docs/profile-preview/#local-docker-profile-preview"
    unaltreselfie: "yes"
    unaltreprojecte: "yes"
    unaltremanual: "yes"
    unaltredocs: "yes"
nav_title: Feature Checklist
---
Use profiles as starting points, not as hard limits. The matrix below is generated from this document's `profile_feature_matrix` front matter, so the data stays editable as documentation metadata while the table rendering stays in the core include.

{% include profile-feature-matrix.liquid %}

The `unaltredocs` profile is the best fit when the main task is explaining how to install, configure, run, cite and maintain a reusable research product.
