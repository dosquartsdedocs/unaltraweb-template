---
title: Métricas de publicaciones
description: Por qué las métricas se actualizan explícitamente y no durante la construcción de Jekyll.
lang: es
ref: software_metrics
profiles: [techdocs, software]
section: Operaciones
weight: 80
permalink: /es/docs/metricas/
---

<h2 id="publication-metrics">Métricas de publicaciones</h2>

Las construcciones normales de Jekyll siguen siendo estáticas. Las métricas de publicaciones se pueden refrescar localmente o mediante el flujo de trabajo manual `Update publication metrics`. Las cachés Scimago y diagnósticos generados quedan fuera de los pull requests; los resultados versionables se limitan a bibliografía y `_data/metrics.yml`.

```bash
make metrics-update LOCAL_CORE=../unaltraweb
make metrics-check LOCAL_CORE=../unaltraweb
```
