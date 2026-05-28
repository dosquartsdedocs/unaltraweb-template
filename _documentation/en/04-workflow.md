---
title: Build workflow
description: How local edits move through profile overlays, Jekyll and deployment.
lang: en
ref: software_workflow
profiles: [techdocs, software]
section: Guides
weight: 70
permalink: /en/docs/workflow/
mermaid:
  enabled: true
  zoomable: false
---

Mermaid diagrams work inside documentation pages, so technical workflows can stay close to the text.

```mermaid
sequenceDiagram
  participant Editor
  participant Template
  participant Core
  participant Jekyll
  Editor->>Template: edit pages and config
  Template->>Core: load shared layouts and plugins
  Template->>Template: write profile overlay
  Core-->>Jekyll: provide reusable theme behaviour
  Jekyll->>Template: write tmp/_site.<profile>
```
