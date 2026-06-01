---
title: Exemples tècnics
description: Fluxos Mermaid, figures indexades i captures de perfils en pàgines de documentació.
lang: ca
ref: software_technical_examples
profiles: [unaltredocs]
section: Autoria
weight: 55
permalink: /ca/docs/exemples-tecnics/
mermaid:
  enabled: true
  zoomable: false
---

Les pàgines de documentació poden barrejar text, diagrames, figures indexades i captures. Això serveix per a documentació de paquets, diccionaris de dades, fluxos de treball i notes de versió.

```mermaid
flowchart LR
  core[nucli unaltraweb] --> template[plantilla filla]
  template --> profiles{perfil}
  profiles --> personal[personal]
  profiles --> project[project]
  profiles --> manual[manual]
  profiles --> unaltredocs[unaltredocs]
```

![Captura placeholder del perfil manual]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura indexada placeholder d'una pàgina manual.")

![Targeta placeholder del perfil project]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Il·lustració indexada placeholder d'una pàgina project.")

Usa peus de figura quan una captura o diagrama forma part de l'argument. Deixa les imatges decoratives per al hero o el disseny de targetes.
