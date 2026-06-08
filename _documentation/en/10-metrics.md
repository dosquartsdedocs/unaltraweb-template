---
title: Maintain Publication Metrics
description: Why metrics are updated explicitly instead of during the Jekyll build.
lang: en
ref: software_metrics
profiles:
- unaltredocs
documentation_profiles:
- template-maintainers
section: Maintain The Template
weight: 720
permalink: "/en/docs/metrics/"
nav_title: Publication Metrics
---
<h2 id="publication-metrics">Publication metrics</h2>

Normal Jekyll builds stay static. Publication metrics can be refreshed locally or through the manual `Update publication metrics` workflow. Generated Scimago caches and diagnostics stay out of pull requests; versionable outputs are limited to bibliography updates and `_data/metrics.yml`.

```bash
make metrics-update
make metrics-check
```
