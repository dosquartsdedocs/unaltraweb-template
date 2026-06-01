---
title: Flux de construcció
description: Com les edicions locals passen per overlays de perfil, Jekyll i desplegament.
lang: ca
ref: software_workflow
profiles: [unaltredocs]
section: Guies
weight: 70
permalink: /ca/docs/flux/
mermaid:
  enabled: true
  zoomable: false
---

Els diagrames Mermaid funcionen dins de les pàgines de documentació, de manera que els fluxos tècnics poden viure al costat del text.

```mermaid
sequenceDiagram
  participant Editor
  participant Plantilla
  participant Nucli
  participant Jekyll
  Editor->>Plantilla: editar pàgines i configuració
  Plantilla->>Nucli: carregar layouts i plugins compartits
  Plantilla->>Plantilla: escriure overlay de perfil
  Nucli-->>Jekyll: aportar comportament reutilitzable
  Jekyll->>Plantilla: escriure tmp/_site.<profile>
```
