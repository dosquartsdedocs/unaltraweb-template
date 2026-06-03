---
title: Prerequisites before publishing
description: Files and services to review before a child site goes live.
lang: en
ref: software_prerequisites
profiles: [unaltredocs]
section: Operations
weight: 390
permalink: /en/docs/prerequisites/
---

Before publishing a child site, check the files that define the build environment and the public deployment path.

| Area | Files to inspect | Why it matters |
|---|---|---|
| Local development | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documents how contributors serve and compare profiles |
| Ruby dependencies | `Gemfile`, `Gemfile.lock` | Controls the `unaltraweb` version used by the child site |
| Site config | `_config.yml` | Defines URL, baseurl, languages, logos, enabled features and profile |
| GitHub Pages | `.github/workflows/deploy.yml` | Calls the reusable deploy workflow when publishing on GitHub |
| Metrics | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Keeps publication metrics explicit and reviewable |

If the site is not published through GitHub Pages, keep the local Docker and Makefile workflow but replace the deploy wrapper with the host-specific publication step.
