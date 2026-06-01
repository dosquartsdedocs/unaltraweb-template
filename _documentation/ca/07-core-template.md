---
title: Repositoris nucli i plantilla
description: Per què el comportament reutilitzable viu al nucli i el contingut local viu en llocs fills.
lang: ca
ref: software_core_template
profiles: [unaltredocs]
section: Conceptes
weight: 18
permalink: /ca/docs/nucli-plantilla/
---

`unaltraweb` ha de contenir comportament compartit. Un lloc fill ha de contenir contingut, configuració i actius. Aquesta separació manté les actualitzacions petites i permet provar el nucli des d'un repositori consumidor realista.

```text
unaltraweb
  layouts, includes, estils, scripts, workflows

unaltraweb-template
  _config.yml, pàgines, col·leccions, bibliografia, assets
```
