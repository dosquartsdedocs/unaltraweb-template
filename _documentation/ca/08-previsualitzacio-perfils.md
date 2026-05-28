---
title: Previsualitzar perfils
description: Executar diversos perfils alhora sense compartir directoris d'eixida.
lang: ca
ref: software_profile_preview
profiles: [techdocs, software]
section: Construcció
weight: 25
permalink: /ca/docs/previsualitzacio-perfils/
---

<h2 id="local-docker-profile-preview">Previsualització local amb Docker</h2>

Cada servidor de perfil escriu una configuració temporal i una destinació separada, així que les previsualitzacions concurrents no se sobreescriuen.

```bash
make serve-allprofiles LOCAL_CORE=../unaltraweb
```

| Perfil | Port | Destinació |
|---|---|---|
| personal | 4001 | `tmp/_site.personal` |
| project | 4002 | `tmp/_site.project` |
| manual | 4003 | `tmp/_site.manual` |
| techdocs | 4004 | `tmp/_site.techdocs` |
