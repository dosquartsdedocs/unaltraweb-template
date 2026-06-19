---
title: CI i desplegament
description: Els desplegaments són explícits per controlar els minuts de GitHub Actions.
lang: ca
ref: software_ci_deploy
profiles: [unaltredocs]
section: Desenvolupadors
weight: 350
permalink: /ca/docs/ci-desplegament/
---

Els llocs fills haurien de publicar localment amb `make publish` sempre que siga possible. Això compila el lloc en Docker, prepara una branca generada `gh-pages` i la puja amb les credencials git locals.

GitHub Actions continua disponible com a workflows manuals per a equips que editen només des de GitHub. Les mètriques de publicacions i CodeQL també són manuals. Així les edicions comunes continuen sent ràpides i eviten gastar minuts d'Actions en cada push o pull request de dependències.
