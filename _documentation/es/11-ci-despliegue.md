---
title: CI y despliegue
description: Los despliegues son explícitos para controlar los minutos de GitHub Actions.
lang: es
ref: software_ci_deploy
profiles: [unaltredocs]
section: Desarrolladores
weight: 350
permalink: /es/docs/ci-despliegue/
---

Los sitios hijo deberían publicar localmente con `make publish` siempre que sea posible. Esto compila el sitio en Docker, prepara una rama generada `gh-pages` y la sube con las credenciales git locales.

GitHub Actions sigue disponible como workflows manuales para equipos que editan solo desde GitHub. Las métricas de publicaciones y CodeQL también son manuales. Así las ediciones comunes siguen siendo rápidas y evitan gastar minutos de Actions en cada push o pull request de dependencias.
