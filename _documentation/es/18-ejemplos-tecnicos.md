---
title: Ejemplos técnicos
description: Flujos Mermaid, figuras indexadas y capturas de perfiles en páginas de documentación.
lang: es
ref: software_technical_examples
profiles: [techdocs, software]
section: Autoría
weight: 55
permalink: /es/docs/ejemplos-tecnicos/
mermaid:
  enabled: true
  zoomable: false
---

Las páginas de documentación pueden mezclar texto, diagramas, figuras indexadas y capturas. Esto sirve para documentación de paquetes, diccionarios de datos, flujos de trabajo y notas de versión.

```mermaid
flowchart LR
  core[núcleo unaltraweb] --> template[plantilla hija]
  template --> profiles{perfil}
  profiles --> personal[personal]
  profiles --> project[project]
  profiles --> manual[manual]
  profiles --> techdocs[techdocs]
```

![Captura placeholder del perfil manual]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura indexada placeholder de una página manual.")

![Tarjeta placeholder del perfil project]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Ilustración indexada placeholder de una página project.")

Usa pies de figura cuando una captura o diagrama forma parte del argumento. Deja las imágenes decorativas para el hero o el diseño de tarjetas.
