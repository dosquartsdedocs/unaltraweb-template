---
title: Configure CI And Deploy
description: Automatic checks stay light while heavier jobs remain manual.
lang: en
ref: software_ci_deploy
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- template-maintainers
section: Publish With GitHub
weight: 530
permalink: "/en/docs/ci-deploy/"
nav_title: CI And Deploy
---
The core keeps automatic CI focused on docs/web publication and local link checks. Publication metrics and CodeQL are available as manual workflows. Child sites can call reusable workflows from the core rather than copying full workflow logic.

This keeps common edits fast while preserving explicit paths for expensive or network-dependent work.
