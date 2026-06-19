---
title: GitHub Actions en llocs fills
description: Com els repositoris fills criden fluxos de treball reutilitzables del nucli.
lang: ca
ref: software_github_actions
profiles: [unaltredocs]
section: Desenvolupadors
weight: 340
permalink: /ca/docs/github-actions/
---

<h2 id="reusable-workflows">Fluxos de treball reutilitzables</h2>

Els repositoris fills han de mantenir GitHub Actions lleugers i manuals. El flux de treball del lloc fill ha de declarar `workflow_dispatch`, permisos, i després cridar un flux de treball reutilitzable de `dosquartsdedocs/unaltraweb`.

```yaml
on:
  workflow_dispatch:

jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

Així les millores es corregeixen en un sol lloc sense desplegar en cada push. Prefereix `make publish` per a publicació local barata; usa workflows manuals per a equips que treballen només en GitHub i per a treballs cars o dependents de xarxa, com mètriques, Scimago o CodeQL.
