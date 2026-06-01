---
title: Instal·lar i executar localment
description: El flux mínim per desenvolupar un lloc fill contra un checkout local del nucli.
lang: ca
ref: software_installation
profiles: [unaltredocs]
section: Construcció
weight: 20
permalink: /ca/docs/installacio/
---

La plantilla pot consumir un checkout local del nucli sense publicar una gem. Aquest és el bucle normal mentre es canvia `unaltraweb`.

```bash
make serve-unaltreselfie LOCAL_CORE=../unaltraweb
make serve-unaltreprojecte LOCAL_CORE=../unaltraweb
make serve-unaltremanual LOCAL_CORE=../unaltraweb
make serve-unaltredocs LOCAL_CORE=../unaltraweb
```

| Entrada | Significat |
|---|---|
| `LOCAL_CORE` | Ruta al checkout local de `unaltraweb` |
| `SITE_PROFILE` | Perfil seleccionat per l'overlay del Makefile |
| `tmp/_site.<profile>` | Directori d'eixida aïllat per a servidors concurrents |
