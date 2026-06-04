---
title: Exemples tècnics
description: Fluxos Mermaid, figures indexades i exemples tècnics en pàgines de documentació.
lang: ca
ref: software_technical_examples
profiles: [unaltredocs]
section: Estàndards
weight: 250
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
  profiles --> unaltreselfie[unaltreselfie]
  profiles --> unaltreprojecte[unaltreprojecte]
  profiles --> unaltremanual[unaltremanual]
  profiles --> unaltredocs[unaltredocs]
```

![Figura placeholder del perfil unaltremanual]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Figura placeholder neutra d'una pàgina unaltremanual.")

![Targeta placeholder del perfil unaltreprojecte]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Il·lustració indexada placeholder d'una pàgina unaltreprojecte.")

Usa peus de figura quan una captura o diagrama forma part de l'argument. Deixa les imatges decoratives per al hero o el disseny de targetes.
