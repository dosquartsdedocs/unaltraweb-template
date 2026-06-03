---
title: Perfils de lloc
description: Famílies de lloc preparades i seleccionades en temps de construcció.
lang: ca
ref: software_site_profiles
profiles: [unaltredocs]
section: Perfils
weight: 100
permalink: /ca/docs/perfils-lloc/
---

Els perfils són famílies de lloc d'alt nivell, no layouts de Jekyll. El perfil actiu se selecciona abans d'escriure el lloc i després les pàgines i documents es filtren pel seu front matter `profiles`.

Cada perfil té la seua pròpia pàgina perquè el model de contingut, la navegació i les prioritats visuals són diferents. Aquestes pàgines usen una sola captura inicial per perfil; les captures més profundes de render-smoke queden com a artefactes de prova i no com a soroll documental.

| Perfil | Ús |
|---|---|
| [`unaltreselfie`]({{ '/ca/docs/unaltreselfie/' | relative_url }}) | Lloc personal acadèmic o professional |
| [`unaltreprojecte`]({{ '/ca/docs/unaltreprojecte/' | relative_url }}) | Projecte de recerca o infraestructura pública |
| [`unaltremanual`]({{ '/ca/docs/unaltremanual/' | relative_url }}) | Manual tipus llibre o guia docent |
| [`unaltredocs`]({{ '/ca/docs/unaltredocs/' | relative_url }}) | Documentació tècnica amb índex esquerre |

<h2 id="profile-specific-home">Inici específic del perfil</h2>

Cada perfil pot mostrar una pàgina d'inici diferent encara que compartisca el mateix repositori. Col·loca la pàgina sota `_pages/<lang>/`, assigna el valor `profiles` corresponent i usa el permalink d'aquesta llengua. L'overlay de perfil del Makefile decideix quin conjunt es renderitza.

<h2 id="book-like-chapters">Capítols de tipus llibre</h2>

El perfil `unaltremanual` serveix per a material seqüencial: capítols, apunts docents o guies. Usa layouts de manual i navegació anterior/següent perquè el lloc es comporte més com un llibre que com una pàgina de projecte.
