---
title: Preguntes freqüents
description: Respostes curtes sobre perfils, builds, previsualitzacions locals i responsabilitat de la documentació.
lang: ca
ref: documentation_faq
profiles: [unaltredocs]
section: Preguntes freqüents
weight: 500
permalink: /ca/docs/preguntes-frequents/
---

## Un perfil és el mateix que un layout?

No. Un perfil és la família de lloc seleccionada en temps de construcció per al lloc fill. Els layouts continuen sent layouts normals de Jekyll usats dins d'eixe perfil.

## Un lloc fill pot reanomenar les seccions de la barra lateral?

Sí. La barra lateral llig els noms des del front matter `section` de cada pàgina de documentació, així que un lloc fill pot usar etiquetes com `Guies d'usuari`, `Suport`, `Desenvolupadors` o el seu propi vocabulari.

## Convindria barrejar guies d'usuari i notes de desenvolupament?

Millor no. Mantén la documentació orientada a visitants en `Guies d'usuari` i els detalls de manteniment o construcció en `Desenvolupadors` o `Operacions` perquè cada lector trobe el seu recorregut ràpidament.

## D'on ixen les dades de cerca?

L'índex de cerca de documentació es genera durant el build de Jekyll a partir de la col·lecció de documentació. No crida serveis externs en temps de construcció.
