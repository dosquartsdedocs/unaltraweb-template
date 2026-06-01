---
title: Col·lecció de documentació
description: El model de contingut usat pel perfil unaltredocs.
lang: ca
ref: software_documentation_collection
profiles: [unaltredocs]
section: Autoria
subsection: Model de contingut
weight: 45
permalink: /ca/docs/colleccio-documentacio/
---

La barra lateral unaltredocs es genera des de la col·lecció `_documentation`. Cada document pot pertànyer directament a una secció o estar dins d'una subsecció.

<h2 id="documentation-sidebar">Barra lateral de documentació</h2>

La barra lateral agrupa documents per `section`, després per `subsection` opcional, i ordena cada grup per `weight`. La branca activa s'obri automàticament, mentre la persona lectora pot plegar o desplegar altres branques sense canviar el model de contingut.

```yaml
title: Instal·lar i executar localment
section: Construcció
subsection: Entorn local
weight: 20
profiles: [unaltredocs]
```

Usa rangs de `weight` per mantenir seccions relacionades juntes. Per exemple, `10-19` per a conceptes, `20-29` per a entorn local i `80-89` per a manteniment.
