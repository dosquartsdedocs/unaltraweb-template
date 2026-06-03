---
title: Perfil unaltremanual
description: Manuals tipus llibre i guies docents amb capítols, navegació lateral i lectures seleccionades.
lang: ca
ref: profile_unaltremanual
profiles: [unaltredocs]
section: Perfils
weight: 130
permalink: /ca/docs/unaltremanual/
---

![Primera vista d'unaltremanual]({{ '/assets/img/screenshots/manual-home-chromium.png' | relative_url }} "Primera vista d'unaltremanual")

Usa `unaltremanual` per a materials docents seqüencials: manuals, guies de curs, pràctiques i apunts tipus llibre. Està pensat per llegir-se en ordre, no per navegar-se com un menú de lloc normal.

## Què Prioritza

- Portada, col·lecció de capítols i barra lateral persistent de continguts.
- Taula de continguts dreta per a capítols llargs.
- Índex de cerca acotat al manual.
- Bibliografia sense badges bibliomètrics, amb lectures seleccionades que poden enllaçar a ressenyes.

## Forma Del Contingut

Els capítols viuen en `_chapters/<lang>/` i poden usar figures, callouts, taules, blocs de codi i bibliografia local. El capítol de bibliografia forma part del flux de lectura del manual, no d'una pàgina genèrica de publicacions.

## Activar-lo

```yaml
unaltraweb:
  site_profile: unaltremanual
```
