---
title: Repositorios núcleo y plantilla
description: Por qué el comportamiento reutilizable vive en el núcleo y el contenido local vive en sitios hijo.
lang: es
ref: software_core_template
profiles: [unaltredocs]
section: Conceptos
weight: 18
permalink: /es/docs/nucleo-plantilla/
---

`unaltraweb` debe contener comportamiento compartido. Un sitio hijo debe contener contenido, configuración y activos. Esta separación mantiene las actualizaciones pequeñas y permite probar el núcleo desde un repositorio consumidor realista.

```text
unaltraweb
  layouts, includes, estilos, scripts, workflows

unaltraweb-template
  _config.yml, páginas, colecciones, bibliografía, assets
```
