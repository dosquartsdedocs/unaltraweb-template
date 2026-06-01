---
title: Instalar y ejecutar localmente
description: El flujo mínimo para desarrollar un sitio hijo contra un checkout local del núcleo.
lang: es
ref: software_installation
profiles: [unaltredocs]
section: Construcción
weight: 20
permalink: /es/docs/instalacion/
---

La plantilla puede consumir un checkout local del núcleo sin publicar una gema. Este es el bucle normal mientras se cambia `unaltraweb`.

```bash
make serve-unaltreselfie LOCAL_CORE=../unaltraweb
make serve-unaltreprojecte LOCAL_CORE=../unaltraweb
make serve-unaltremanual LOCAL_CORE=../unaltraweb
make serve-unaltredocs LOCAL_CORE=../unaltraweb
```

| Entrada | Significado |
|---|---|
| `LOCAL_CORE` | Ruta al checkout local de `unaltraweb` |
| `SITE_PROFILE` | Perfil seleccionado por el overlay del Makefile |
| `tmp/_site.<profile>` | Directorio de salida aislado para servidores concurrentes |
