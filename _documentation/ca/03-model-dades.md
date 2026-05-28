---
title: Pàgines, col·leccions i navegació
description: Com els llocs fills organitzen contingut sense editar plantilles del nucli.
lang: ca
ref: software_data_model
profiles: [techdocs, software]
section: Autoria
subsection: Model de contingut
weight: 40
permalink: /ca/docs/model-contingut/
---

La majoria de pàgines són fitxers Markdown normals sota `_pages`. Les col·leccions guarden contingut repetit com llibres, capítols, resultats, tesis i pàgines de documentació.

| Front matter | Ús |
|---|---|
| `profiles` | Limita una pàgina o document a un o més perfils |
| `nav` | Mostra la pàgina en la navegació superior |
| `nav_order` | Ordena els elements visibles de navegació |
| `nav_title` | Usa una etiqueta més curta en els menús |
| `feature` | Vincula la visibilitat a `unaltraweb.features` |

Els desplegables es defineixen en front matter amb `dropdown: true` i una llista `children`. Les barres laterals de documentació es generen des de metadades de col·lecció.

<h2 id="blog-posts">Entrades de blog</h2>

Les entrades de blog viuen en la col·lecció de posts i normalment s'activen en llocs personals. Els llocs de projecte poden mostrar-les quan les notícies o notes de versió són útils; els perfils de documentació i manual solen deixar-les fora.

<h2 id="cv-page">Pàgina de CV</h2>

La pàgina de CV pertany al perfil personal i sol recolzar-se en Markdown local, dades YAML o un layout específic. Guarda-la sota `_pages/<lang>/` amb `profiles: [personal]` perquè els builds de projecte i documentació no la renderitzen.

<h2 id="publications-page">Pàgina de publicacions</h2>

Les pàgines de publicacions combinen includes de bibliografia, cerca opcional i blocs de resum. Són útils en perfils personals i de projecte, i llegeixen bibliografia local sense contactar APIs externes durant la construcció de Jekyll.

<h2 id="previous-and-next-links">Enllaços anterior i següent</h2>

La navegació seqüencial és automàtica en capítols de manual i pàgines de documentació. Les pàgines normals poden activar-la amb front matter `previous_next` o `prev_next` quan convé una seqüència petita i curada.
