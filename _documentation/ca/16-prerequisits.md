---
title: Prerequisits abans de publicar
description: Fitxers i serveis que cal revisar abans de publicar un lloc fill.
lang: ca
ref: software_prerequisites
profiles: [unaltredocs]
section: Operacions
weight: 390
permalink: /ca/docs/prerequisits/
---

Abans de publicar un lloc fill, revisa els fitxers que defineixen l'entorn de construcció i la ruta pública de desplegament.

| Àrea | Fitxers | Per què importa |
|---|---|---|
| Desenvolupament local | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documenta com servir i comparar perfils |
| Dependències Ruby | `Gemfile`, `Gemfile.lock` | Controla la versió d'`unaltraweb` usada pel lloc fill |
| Configuració | `_config.yml` | Defineix URL, baseurl, idiomes, logos, característiques i perfil |
| Publicació local | `Makefile`, branca generada `gh-pages` | Publica amb `make publish` sense gastar minuts d'Actions |
| GitHub Pages Actions | `.github/workflows/deploy.yml` | Crida manualment el flux de treball reutilitzable de desplegament en GitHub |
| Mètriques | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Manté les mètriques explícites i revisables |

Per a la ruta recomanada amb GitHub Pages, configura Pages perquè publique des de la branca `gh-pages` i la carpeta `/`. Si el lloc no es publica en GitHub Pages, conserva el flux local amb Docker i Makefile, però substitueix el pas final de desplegament pel comandament específic de l'allotjament.
