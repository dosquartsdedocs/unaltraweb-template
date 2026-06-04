---
title: Ejemplos técnicos
description: Flujos Mermaid, figuras indexadas y ejemplos técnicos en páginas de documentación.
lang: es
ref: software_technical_examples
profiles: [unaltredocs]
section: Estándares
weight: 250
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
  profiles --> unaltreselfie[unaltreselfie]
  profiles --> unaltreprojecte[unaltreprojecte]
  profiles --> unaltremanual[unaltremanual]
  profiles --> unaltredocs[unaltredocs]
```

![Figura placeholder del perfil unaltremanual]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Figura placeholder neutra de una página unaltremanual.")

![Tarjeta placeholder del perfil unaltreprojecte]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Ilustración indexada placeholder de una página unaltreprojecte.")

Usa pies de figura cuando una captura o diagrama forma parte del argumento. Deja las imágenes decorativas para el hero o el diseño de tarjetas.
