---
title: Configuració i perfils
description: Com es combinen defaults del nucli, configuració filla i overlays de perfil.
lang: ca
ref: software_configuration_profiles
profiles: [unaltredocs]
section: Desenvolupadors
weight: 320
permalink: /ca/docs/configuracio-perfils/
---

Els llocs `unaltraweb` es construeixen amb configuració per capes. El `_config.yml` del nucli aporta defaults compartits, el `_config.yml` fill aporta contingut i publicació, i el Makefile pot afegir un overlay temporal per previsualitzar perfils.

| Capa | Responsabilitat habitual |
|---|---|
| Config del nucli | Col·leccions, defaults, plugins compartits i convencions |
| Config filla | Títol, URL, idiomes, autories, actius i característiques actives |
| Overlay de perfil | `unaltraweb.site_profile`, títol i destinació temporals per a proves locals |

Mantén la configuració de producció en el `_config.yml` fill. Usa overlays només per a comparacions locals.

## Marca de unaltredocs

El perfil de documentació llig els seus logos des de `unaltraweb.documentation`:

```yaml
unaltraweb:
  documentation:
    logo: /assets/img/brand/dosquartsdedocs-logo.svg
    logo_inverse: /assets/img/brand/dosquartsdedocs-logo-white.svg
    logo_sepia: /assets/img/brand/dosquartsdedocs-logo.svg
```

Els idiomes actius continuen eixint de la llista global `languages`. El hero d'inici es canvia amb front matter de pàgina, o s'omet quan la documentació ha de ser més textual.
