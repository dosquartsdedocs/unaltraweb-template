---
title: Publication metrics
description: Why metrics are updated explicitly instead of during the Jekyll build.
lang: en
ref: software_metrics
profiles: [unaltredocs]
section: Operations
weight: 80
permalink: /en/docs/metrics/
---

<h2 id="publication-metrics">Publication metrics</h2>

Normal Jekyll builds stay static. Publication metrics can be refreshed locally or through the manual `Update publication metrics` workflow. Generated Scimago caches and diagnostics stay out of pull requests; versionable outputs are limited to bibliography updates and `_data/metrics.yml`.

```bash
make metrics-update LOCAL_CORE=../unaltraweb
make metrics-check LOCAL_CORE=../unaltraweb
```
