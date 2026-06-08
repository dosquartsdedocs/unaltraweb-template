---
title: Reuse Profile Pages And Layouts
description: Where project team, readings, theses, repository and publication pages
  get their data.
lang: en
ref: software_reusable_profile_pages
profiles:
- unaltredocs
documentation_profiles:
- local-editors
- site-designers
- template-maintainers
section: Design The Site
weight: 410
permalink: "/en/docs/reusable-profile-pages/"
nav_title: Reusable Layouts
---
Reusable profile pages are ordinary Markdown files in `_pages/<lang>/`. The page front matter selects the renderer and the content source; the core layout or include does the repeated rendering.

![Reusable profile pages overview]({{ site.baseurl }}/assets/img/placeholders/reusable-profile-pages.svg "Schematic screenshot of data files feeding reusable profile pages.")

| Page type | Page front matter | Data source |
|---|---|---|
| Team | `layout: page` plus `{% raw %}{% include team-grid.liquid %}{% endraw %}` | `_data/team.yml`; images under `assets/img/team/` |
| Books and readings | `layout: book-shelf`, `collection: books` | `_books` collection, filtered by `lang` and sorted by date |
| Theses | `layout: theses` | `_theses` collection, filtered by `lang` and sorted by `order` |
| Repositories | `layout: repositories` | `_data/repositories.yml` with `github_users` and `github_repos` |
| Project outputs | `layout: outputs` | `_outputs` collection, filtered by `lang` and sorted by `importance` |
| Publications and metrics | `layout: page` with bibliography includes | `_bibliography/*.bib` and `_data/metrics.yml` |

The team page is the simplest example. `_pages/en/project-team.md` contains prose and the `team-grid.liquid` include, while `_data/team.yml` holds one record per person:

```yaml
- name: Alex
  lastname: Example
  position: Data infrastructure lead
  organization: unaltraweb Research Infrastructure Demo
  pic: user-placeholder.png
```

Use `profiles: [unaltreprojecte]` for project-only pages, `profiles: [unaltreselfie]` for personal pages and `feature` when a section should be enabled or hidden through `unaltraweb.features`.

<h2 id="team-page">Team page</h2>

The team page renders `_data/team.yml` through `{% raw %}{% include team-grid.liquid %}{% endraw %}`. Each record can define name, role, organisation, department, image, e-mail and social links. Images are read from `assets/img/team/` unless the data file points elsewhere.

<h2 id="books-and-readings">Books and readings</h2>

Reading shelves use `layout: book-shelf` and `collection: books`. Items live in `_books`, can be localized with `lang`, and can include bibliographic fields such as `author`, `year`, `status`, `isbn`, `olid`, `cover` and `resource_url`. When items define `collection_name` or `series`, the shelf separates them into sections and adds a small index that jumps to each collection.

<h3 id="calibre-libraries">Calibre libraries</h3>

A Calibre library can feed the same `_books` collection. The useful mapping is direct: Calibre title, authors, publisher, publication date, ISBN, series, tags, comments and cover become front matter fields and review text. Use `collection_name` for the visible shelf grouping and keep Calibre's `series` as a fallback when there is no explicit collection. Covers should be copied into `assets/img/books/` and referenced with `cover: /assets/img/books/<slug>.jpg`; ebook files should stay outside the repository unless distribution rights are clear.

For a personal site, use `profiles: [unaltreselfie]` so the entries appear in `unaltreselfie`. For project reading lists, use `profiles: [unaltreprojecte]`. Calibre virtual libraries, tags or custom columns can become `tags`, `status`, `collection_name` or separate generated pages, depending on how the library is organised.

To import a real Calibre library we need three decisions: the library path, which Calibre collections or tags to publish, and whether each item should be a public reading note, a private draft omitted from the site, or only a metadata card with cover and bibliographic record.

<h2 id="theses-page">Theses page</h2>

The theses layout reads `_theses`, filters entries by language and sorts them by `order`. Thesis records can carry localized titles, summaries, status labels, institution, supervisors and an optional image with source attribution.

<h2 id="repositories-page">Repositories page</h2>

The repositories layout reads `_data/repositories.yml`. Use `github_users` for profile cards and `github_repos` for individual repositories. This keeps the visible page declarative and leaves the rendering logic in the core.
