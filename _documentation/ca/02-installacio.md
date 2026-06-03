---
title: Instal·lar i executar localment
description: El flux mínim per previsualitzar un lloc fill amb el nucli empaquetat.
lang: ca
ref: software_installation
profiles: [unaltredocs]
section: Guies d'usuari
weight: 20
permalink: /ca/docs/installacio/
---

El flux normal d'un lloc fill usa la dependència `unaltraweb` declarada en `Gemfile`. No necessites un checkout germà `../unaltraweb` per previsualitzar un lloc.

```bash
make bootstrap
make serve-unaltreselfie
make serve-unaltreprojecte
make serve-unaltremanual
make serve-unaltredocs
```

| Entrada | Significat |
|---|---|
| `SITE_PROFILE` | Perfil seleccionat per l'overlay del Makefile |
| `tmp/_site.<profile>` | Directori d'eixida aïllat per a servidors concurrents |

Defineix `LOCAL_CORE=../unaltraweb` només quan estigues editant activament el nucli i vulgues que aquest lloc fill consumisca eixos canvis locals abans d'actualitzar la dependència de la gem.
