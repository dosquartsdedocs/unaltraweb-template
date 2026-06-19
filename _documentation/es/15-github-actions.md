---
title: GitHub Actions en sitios hijo
description: Cómo los repositorios hijo llaman flujos de trabajo reutilizables del núcleo.
lang: es
ref: software_github_actions
profiles: [unaltredocs]
section: Desarrolladores
weight: 340
permalink: /es/docs/github-actions/
---

<h2 id="reusable-workflows">Flujos de trabajo reutilizables</h2>

Los repositorios hijo deben mantener GitHub Actions ligeros y manuales. El flujo de trabajo del sitio hijo debe declarar `workflow_dispatch`, permisos, y después llamar un flujo de trabajo reutilizable de `dosquartsdedocs/unaltraweb`.

```yaml
on:
  workflow_dispatch:

jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

Así las mejoras se corrigen en un solo lugar sin desplegar en cada push. Prefiere `make publish` para publicación local barata; usa workflows manuales para equipos que trabajan solo en GitHub y para trabajos caros o dependientes de red, como métricas, Scimago o CodeQL.
