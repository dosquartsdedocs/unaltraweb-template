---
title: Previsualizar perfiles
description: Ejecutar varios perfiles a la vez sin compartir directorios de salida.
lang: es
ref: software_profile_preview
profiles: [unaltredocs]
section: Desarrolladores
weight: 310
permalink: /es/docs/previsualizacion-perfiles/
---

<h2 id="local-docker-profile-preview">Previsualización local con Docker</h2>

Cada servidor de perfil escribe una configuración temporal y un destino separado, así que las previsualizaciones concurrentes no se pisan entre sí.

```bash
make serve-allprofiles
```

| Perfil | Puerto | Destino |
|---|---|---|
| unaltreselfie | 4001 | `tmp/_site.unaltreselfie` |
| unaltreprojecte | 4002 | `tmp/_site.unaltreprojecte` |
| unaltremanual | 4003 | `tmp/_site.unaltremanual` |
| unaltredocs | 4004 | `tmp/_site.unaltredocs` |
