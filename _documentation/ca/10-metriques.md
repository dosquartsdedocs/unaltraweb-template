---
title: Mètriques de publicacions
description: Per què les mètriques s'actualitzen explícitament i no durant la construcció de Jekyll.
lang: ca
ref: software_metrics
profiles: [techdocs, software]
section: Operacions
weight: 80
permalink: /ca/docs/metriques/
---

<h2 id="publication-metrics">Mètriques de publicacions</h2>

Les construccions normals de Jekyll continuen sent estàtiques. Les mètriques de publicacions es poden refrescar localment o mitjançant el flux de treball manual `Update publication metrics`. Les memòries cau Scimago i diagnòstics generats queden fora dels pull requests; els resultats versionables es limiten a bibliografia i `_data/metrics.yml`.

```bash
make metrics-update LOCAL_CORE=../unaltraweb
make metrics-check LOCAL_CORE=../unaltraweb
```
