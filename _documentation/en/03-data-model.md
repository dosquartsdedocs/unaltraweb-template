---
title: Pages, collections and navigation
description: How child sites organise content without editing core templates.
lang: en
ref: software_data_model
profiles: [unaltredocs]
section: Authoring
subsection: Content model
weight: 40
permalink: /en/docs/content-model/
---

Most pages are ordinary Markdown files under `_pages`. Collections hold repeated content such as books, chapters, outputs, theses and documentation pages.

| Front matter | Use |
|---|---|
| `profiles` | Limit a page or document to one or more profiles |
| `nav` | Show the page in the top navigation |
| `nav_order` | Sort visible navigation items |
| `nav_title` | Use a shorter label in menus |
| `feature` | Tie visibility to `unaltraweb.features` |

Dropdowns are defined in page front matter with `dropdown: true` and a `children` list. Documentation sidebars are generated from collection metadata instead.

<h2 id="blog-posts">Blog posts</h2>

Blog entries live in the posts collection and are normally enabled for personal sites. Project sites can expose them when news or release notes are useful; documentation and manual profiles usually keep this content out of scope.

<h2 id="cv-page">CV page</h2>

The CV page is a personal-profile page, usually backed by local Markdown, YAML data or a selected layout. Keep it under `_pages/<lang>/` with `profiles: [unaltreselfie]` so project and documentation builds do not render it.

<h2 id="publications-page">Publications page</h2>

Publication pages combine bibliography includes, optional search and summary blocks. They are useful in personal and project profiles, and they read local bibliography files instead of contacting external APIs during the Jekyll build.

<h2 id="previous-and-next-links">Previous and next links</h2>

Sequential navigation is automatic in manual chapters and documentation pages. Ordinary pages can opt in with `previous_next` or `prev_next` front matter when a small curated sequence is useful.
