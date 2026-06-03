---
title: Previsualitzar perfils
description: Executar diversos perfils alhora sense compartir directoris d'eixida.
lang: ca
ref: software_profile_preview
profiles: [unaltredocs]
section: Desenvolupadors
weight: 310
permalink: /ca/docs/previsualitzacio-perfils/
---

<h2 id="local-docker-profile-preview">Previsualització local amb Docker</h2>

Cada servidor de perfil escriu una configuració temporal i una destinació separada, així que les previsualitzacions concurrents no se sobreescriuen.

```bash
make serve-allprofiles
```

| Perfil | Port | Destinació |
|---|---|---|
| unaltreselfie | 4001 | `tmp/_site.unaltreselfie` |
| unaltreprojecte | 4002 | `tmp/_site.unaltreprojecte` |
| unaltremanual | 4003 | `tmp/_site.unaltremanual` |
| unaltredocs | 4004 | `tmp/_site.unaltredocs` |
