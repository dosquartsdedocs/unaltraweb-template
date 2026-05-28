---
title: GitHub Actions en llocs fills
description: Com els repositoris fills criden fluxos de treball reutilitzables del nucli.
lang: ca
ref: software_github_actions
profiles: [techdocs, software]
section: Automatització
subsection: GitHub Actions
weight: 72
permalink: /ca/docs/github-actions/
---

<h2 id="reusable-workflows">Fluxos de treball reutilitzables</h2>

Els repositoris fills han de mantenir GitHub Actions lleugers. El flux de treball del lloc fill sol declarar triggers i permisos, i després crida un flux de treball reutilitzable de `dosquartsdedocs/unaltraweb`.

```yaml
jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

Així les millores es corregeixen en un sol lloc. Usa fluxos de treball manuals per a treballs cars o dependents de xarxa, com mètriques, Scimago o CodeQL.
