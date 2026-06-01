---
title: Previsualizar perfiles
description: Ejecutar varios perfiles a la vez sin compartir directorios de salida.
lang: es
ref: software_profile_preview
profiles: [unaltredocs]
section: Construcción
weight: 25
permalink: /es/docs/previsualizacion-perfiles/
---

<h2 id="local-docker-profile-preview">Previsualización local con Docker</h2>

Cada servidor de perfil escribe una configuración temporal y un destino separado, así que las previsualizaciones concurrentes no se pisan entre sí.

```bash
make serve-allprofiles LOCAL_CORE=../unaltraweb
```

| Perfil | Puerto | Destino |
|---|---|---|
| personal | 4001 | `tmp/_site.personal` |
| project | 4002 | `tmp/_site.project` |
| manual | 4003 | `tmp/_site.manual` |
| unaltredocs | 4004 | `tmp/_site.unaltredocs` |
