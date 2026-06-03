---
title: Perfil unaltreselfie
description: Llocs personals acadèmics amb identitat, publicacions, projectes, entrades, notícies i lectures.
lang: ca
ref: profile_unaltreselfie
profiles: [unaltredocs]
section: Perfils
weight: 110
permalink: /ca/docs/unaltreselfie/
---

![Primera vista d'unaltreselfie]({{ '/assets/img/screenshots/home-light-chromium.png' | relative_url }} "Primera vista d'unaltreselfie")

Usa `unaltreselfie` quan el lloc representa una persona: perfil acadèmic, investigador, professional o portafolis públic. La portada prioritza identitat, enllaços i activitat seleccionada, no una landing de projecte.

## Què Prioritza

- Barra lateral de perfil amb avatar, afiliació i enllaços socials.
- Notícies recents, entrades recents, publicacions seleccionades i projectes actius a la portada.
- Pàgines opcionals de CV, blog, notícies, projectes, lectures i publicacions.
- Pàgines multilingües que continuen sentint-se com un únic lloc personal.

## Forma Del Contingut

Comença amb `_pages/<lang>/index.md` usant el layout de perfil i afegeix només les seccions que la persona necessite realment. Notícies funciona bé per a premsa, entrevistes i aparicions públiques; les entrades continuen sent millors per a actualitzacions o assajos signats.

## Activar-lo

```yaml
unaltraweb:
  site_profile: unaltreselfie
```
