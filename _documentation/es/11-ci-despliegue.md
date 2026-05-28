---
title: CI y despliegue
description: Las comprobaciones automáticas se mantienen ligeras y los trabajos pesados quedan manuales.
lang: es
ref: software_ci_deploy
profiles: [techdocs, software]
section: Automatización
subsection: GitHub Actions
weight: 74
permalink: /es/docs/ci-despliegue/
---

El núcleo mantiene la CI automática centrada en la publicación docs/web y la comprobación local de enlaces. Las métricas de publicaciones y CodeQL están disponibles como flujos de trabajo manuales. Los sitios hijo pueden llamar flujos de trabajo reutilizables del núcleo en lugar de copiar toda la lógica.

Así las ediciones comunes siguen siendo rápidas y aún existe una ruta explícita para trabajo caro o dependiente de red.
