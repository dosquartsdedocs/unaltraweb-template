---
title: Perfil unaltredocs
description: Llocs de documentació tècnica amb col·lecció documental, índex esquerre i cerca local.
lang: ca
ref: profile_unaltredocs
profiles: [unaltredocs]
section: Perfils
weight: 140
permalink: /ca/docs/unaltredocs/
---

![Primera vista d'unaltredocs]({{ '/assets/img/screenshots/unaltredocs-home-chromium.png' | relative_url }} "Primera vista d'unaltredocs")

Usa `unaltredocs` quan el lloc és sobretot documentació per a una eina, flux de treball, paquet o plataforma reutilitzable. Dona prioritat a la col·lecció documental per damunt de la navegació de tipus blog.

## Què Prioritza

- Portada de documentació amb targetes generades des de `_documentation/`.
- Navegació esquerra agrupada per secció i subsecció.
- Cerca documental, enllaços anterior/següent i controls de lectura.
- Exemples tècnics que poden mesclar prosa, diagrames, callouts i codi.

## Forma Del Contingut

Les entrades de documentació viuen en `_documentation/<lang>/` i es filtren amb `profiles: [unaltredocs]`. Mantén les pàgines conceptuals separades de les guies operatives perquè la barra lateral continue sent útil quan la col·lecció cresca.

## Activar-lo

```yaml
unaltraweb:
  site_profile: unaltredocs
```
