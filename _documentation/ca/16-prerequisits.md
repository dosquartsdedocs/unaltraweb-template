---
title: Prerequisits abans de publicar
description: Fitxers i serveis que cal revisar abans de publicar un lloc fill.
lang: ca
ref: software_prerequisites
profiles: [unaltredocs]
section: Construcció
weight: 22
permalink: /ca/docs/prerequisits/
---

Abans de publicar un lloc fill, revisa els fitxers que defineixen l'entorn de construcció i la ruta pública de desplegament.

| Àrea | Fitxers | Per què importa |
|---|---|---|
| Desenvolupament local | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documenta com servir i comparar perfils |
| Dependències Ruby | `Gemfile`, `Gemfile.lock` | Controla la versió d'`unaltraweb` usada pel lloc fill |
| Configuració | `_config.yml` | Defineix URL, baseurl, idiomes, logos, característiques i perfil |
| GitHub Pages | `.github/workflows/deploy.yml` | Crida el flux de treball reutilitzable de desplegament en GitHub |
| Mètriques | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Manté les mètriques explícites i revisables |

Si el lloc no es publica en GitHub Pages, conserva el flux local amb Docker i Makefile, però substitueix l'adaptador de desplegament pel pas específic de l'allotjament.
