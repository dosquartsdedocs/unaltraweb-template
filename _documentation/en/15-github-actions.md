---
title: Run GitHub Actions In A Child Site
description: How child repositories call reusable workflows from the core.
lang: en
ref: software_github_actions
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- template-maintainers
section: Publish With GitHub
weight: 510
permalink: "/en/docs/github-actions/"
nav_title: GitHub Actions
---
<h2 id="reusable-workflows">Reusable workflows</h2>

Child repositories should keep GitHub Actions thin and manual. The workflow file in the child site should declare `workflow_dispatch`, permissions and then call a reusable workflow from `dosquartsdedocs/unaltraweb`.

```yaml
on:
  workflow_dispatch:

jobs:
  deploy:
    uses: dosquartsdedocs/unaltraweb/.github/workflows/site-deploy.yml@main
```

This keeps fixes and improvements in one place without deploying on every push. Prefer `make publish` for low-cost local publishing; use manual workflows for GitHub-only teams and for expensive or network-dependent jobs such as publication metrics, Scimago updates or CodeQL scans.
