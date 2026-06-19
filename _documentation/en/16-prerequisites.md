---
title: Check Prerequisites Before Publishing
description: Files and services to review before a child site goes live.
lang: en
ref: software_prerequisites
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- local-editors
- template-maintainers
section: Publish With GitHub
weight: 500
permalink: "/en/docs/prerequisites/"
nav_title: Prerequisites
---
Before publishing a child site, check the files that define the build environment and the public deployment path.

| Area | Files to inspect | Why it matters |
|---|---|---|
| Local development | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documents how contributors serve and compare profiles |
| Ruby dependencies | `Gemfile`, `Gemfile.lock` | Controls the `unaltraweb` version used by the child site |
| Site config | `_config.yml` | Defines URL, baseurl, languages, logos, enabled features and profile |
| Local publish | `Makefile`, generated `gh-pages` branch | Publishes with `make publish` without spending Actions minutes |
| GitHub Pages Actions | `.github/workflows/deploy.yml` | Calls the reusable deploy workflow manually when publishing on GitHub |
| Metrics | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Keeps publication metrics explicit and reviewable |

For the preferred GitHub Pages route, configure Pages to deploy from the `gh-pages` branch and `/` folder. If the site is not published through GitHub Pages, keep the local Docker and Makefile workflow but replace the final deploy step with the host-specific publication command.
