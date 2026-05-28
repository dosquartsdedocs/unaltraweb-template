---
title: Pàgines i plantilles reutilitzables de perfil
description: D'on carreguen dades les pàgines d'equip, lectures, tesis, repositoris i publicacions.
lang: ca
ref: software_reusable_profile_pages
profiles: [techdocs, software]
section: Autoria
subsection: Model de contingut
weight: 44
permalink: /ca/docs/pagines-reutilitzables/
---

Les pàgines reutilitzables de perfil són fitxers Markdown normals en `_pages/<lang>/`. El front matter de la pàgina selecciona la plantilla de renderització i la font de contingut; el layout o include del nucli s'encarrega de repetir la presentació.

![Vista general de pàgines reutilitzables]({{ site.baseurl }}/assets/img/placeholders/reusable-profile-pages.svg "Captura esquemàtica de fitxers de dades alimentant pàgines reutilitzables de perfil.")

| Tipus de pàgina | Front matter de la pàgina | Font de dades |
|---|---|---|
| Equip | `layout: page` més `{% raw %}{% include team-grid.liquid %}{% endraw %}` | `_data/team.yml`; imatges en `assets/img/team/` |
| Llibres i lectures | `layout: book-shelf`, `collection: books` | Col·lecció `_books`, filtrada per `lang` i ordenada per data |
| Tesis | `layout: theses` | Col·lecció `_theses`, filtrada per `lang` i ordenada per `order` |
| Repositoris | `layout: repositories` | `_data/repositories.yml` amb `github_users` i `github_repos` |
| Resultats de projecte | `layout: outputs` | Col·lecció `_outputs`, filtrada per `lang` i ordenada per `importance` |
| Publicacions i mètriques | `layout: page` amb includes de bibliografia | `_bibliography/*.bib` i `_data/metrics.yml` |

La pàgina d'equip és l'exemple més directe. `_pages/ca/projecte-equip.md` conté el text i l'include `team-grid.liquid`, mentre que `_data/team.yml` guarda un registre per persona:

```yaml
- name: Alex
  lastname: Example
  position: Data infrastructure lead
  organization: unaltraweb Research Infrastructure Demo
  pic: user-placeholder.png
```

Usa `profiles: [project]` per a pàgines només de projecte, `profiles: [personal]` per a pàgines personals i `feature` quan una secció s'haja d'activar o ocultar mitjançant `unaltraweb.features`.

<h2 id="team-page">Pàgina d'equip</h2>

La pàgina d'equip renderitza `_data/team.yml` mitjançant `{% raw %}{% include team-grid.liquid %}{% endraw %}`. Cada registre pot definir nom, rol, organització, departament, imatge, correu i enllaços socials. Les imatges es llegeixen des de `assets/img/team/` llevat que el fitxer de dades indique una altra ruta.

<h2 id="books-and-readings">Llibres i lectures</h2>

Les prestatgeries de lectura usen `layout: book-shelf` i `collection: books`. Els elements viuen en `_books`, poden localitzar-se amb `lang` i incloure camps bibliogràfics com `author`, `year`, `status`, `isbn`, `olid`, `cover` i `resource_url`. Quan els elements defineixen `collection_name` o `series`, la prestatgeria els separa en seccions i afegeix un índex petit que salta a cada col·lecció.

<h3 id="calibre-libraries">Biblioteques Calibre</h3>

Una biblioteca Calibre pot alimentar la mateixa col·lecció `_books`. El mapatge útil és directe: títol, autoria, editorial, data de publicació, ISBN, sèrie, etiquetes, comentaris i portada de Calibre passen a camps de front matter i text de ressenya. Usa `collection_name` per a l'agrupació visible de la prestatgeria i conserva la `series` de Calibre com a alternativa quan no hi haja una col·lecció explícita. Les portades haurien de copiar-se a `assets/img/books/` i referenciar-se amb `cover: /assets/img/books/<slug>.jpg`; els fitxers de llibre electrònic han de quedar fora del repositori llevat que els drets de distribució siguen clars.

Per a un lloc personal, usa `profiles: [personal]` i les entrades apareixeran en `unaltreselfie`. Per a llistes de lectura de projecte, usa `profiles: [project]`. Les biblioteques virtuals, etiquetes o columnes personalitzades de Calibre poden convertir-se en `tags`, `status`, `collection_name` o pàgines generades separades, segons com estiga organitzada la biblioteca.

Per importar una biblioteca Calibre real necessitem tres decisions: la ruta de la biblioteca, quines col·leccions o etiquetes de Calibre es publiquen, i si cada element serà una nota pública de lectura, un esborrany privat omés del lloc o només una targeta de metadades amb portada i registre bibliogràfic.

<h2 id="theses-page">Pàgina de tesis</h2>

El layout de tesis llig `_theses`, filtra entrades per llengua i les ordena per `order`. Els registres de tesi poden portar títols, resums, estats, institució, direcció i una imatge opcional amb atribució de font.

<h2 id="repositories-page">Pàgina de repositoris</h2>

El layout de repositoris llig `_data/repositories.yml`. Usa `github_users` per a targetes de perfils i `github_repos` per a repositoris concrets. Així la pàgina visible queda declarativa i la lògica de renderització roman en el nucli.
