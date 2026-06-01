---
title: GitHub Actions in child sites
description: How child repositories call reusable workflows from the core.
lang: en
ref: software_github_actions
profiles: [unaltredocs]
section: Automation
subsection: GitHub Actions
weight: 72
permalink: /en/docs/github-actions/
---

<h2 id="reusable-workflows">Reusable workflows</h2>

Child repositories should keep GitHub Actions thin. The workflow file in the child site usually declares triggers and permissions, then calls a reusable workflow from `dosquartsdedocs/unaltraweb`.

```yaml
jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

This keeps fixes and improvements in one place. Use manual workflows for expensive or network-dependent jobs such as publication metrics, Scimago updates or CodeQL scans.
