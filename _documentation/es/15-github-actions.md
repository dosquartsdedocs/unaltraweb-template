---
title: GitHub Actions en sitios hijo
description: Cómo los repositorios hijo llaman flujos de trabajo reutilizables del núcleo.
lang: es
ref: software_github_actions
profiles: [unaltredocs]
section: Automatización
subsection: GitHub Actions
weight: 72
permalink: /es/docs/github-actions/
---

<h2 id="reusable-workflows">Flujos de trabajo reutilizables</h2>

Los repositorios hijo deben mantener GitHub Actions ligeros. El flujo de trabajo del sitio hijo suele declarar triggers y permisos, y después llama un flujo de trabajo reutilizable de `dosquartsdedocs/unaltraweb`.

```yaml
jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

Así las mejoras se corrigen en un solo lugar. Usa flujos de trabajo manuales para trabajos caros o dependientes de red, como métricas, Scimago o CodeQL.
