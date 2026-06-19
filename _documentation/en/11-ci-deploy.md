---
title: Configure CI And Deploy
description: Deploys are explicit so GitHub Actions minutes stay under control.
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
Child sites should publish locally with `make publish` when possible. This builds the site in Docker, prepares a generated `gh-pages` branch and pushes it with the local git credentials.

GitHub Actions remain available as manual workflows for teams that edit only through GitHub. Publication metrics and CodeQL are also manual. This keeps common edits fast and avoids spending Actions minutes on every push or dependency pull request.
