---
title: CI and deploy
description: Automatic checks stay light while heavier jobs remain manual.
lang: en
ref: software_ci_deploy
profiles: [techdocs, software]
section: Automation
subsection: GitHub Actions
weight: 74
permalink: /en/docs/ci-deploy/
---

The core keeps automatic CI focused on docs/web publication and local link checks. Publication metrics and CodeQL are available as manual workflows. Child sites can call reusable workflows from the core rather than copying full workflow logic.

This keeps common edits fast while preserving explicit paths for expensive or network-dependent work.
