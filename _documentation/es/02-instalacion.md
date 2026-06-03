---
title: Instalar y ejecutar localmente
description: El flujo mínimo para previsualizar un sitio hijo con el núcleo empaquetado.
lang: es
ref: software_installation
profiles: [unaltredocs]
section: Guías de usuario
weight: 20
permalink: /es/docs/instalacion/
---

El flujo normal de un sitio hijo usa la dependencia `unaltraweb` declarada en `Gemfile`. No necesitas un checkout hermano `../unaltraweb` para previsualizar un sitio.

```bash
make bootstrap
make serve-unaltreselfie
make serve-unaltreprojecte
make serve-unaltremanual
make serve-unaltredocs
```

| Entrada | Significado |
|---|---|
| `SITE_PROFILE` | Perfil seleccionado por el overlay del Makefile |
| `tmp/_site.<profile>` | Directorio de salida aislado para servidores concurrentes |

Define `LOCAL_CORE=../unaltraweb` solo cuando estés editando activamente el núcleo y quieras que este sitio hijo consuma esos cambios locales antes de actualizar la dependencia de la gema.
