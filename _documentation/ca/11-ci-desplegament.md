---
title: CI i desplegament
description: Les comprovacions automàtiques es mantenen lleugeres i els treballs pesats queden manuals.
lang: ca
ref: software_ci_deploy
profiles: [unaltredocs]
section: Desenvolupadors
weight: 350
permalink: /ca/docs/ci-desplegament/
---

El nucli manté la CI automàtica centrada en la publicació docs/web i la comprovació local d'enllaços. Les mètriques de publicacions i CodeQL estan disponibles com a fluxos de treball manuals. Els llocs fills poden cridar fluxos de treball reutilitzables del nucli en lloc de copiar tota la lògica.

Així les edicions comunes continuen sent ràpides i encara existeix una ruta explícita per a treball car o dependent de xarxa.
