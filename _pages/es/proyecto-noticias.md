---
layout: page
title: Noticias
description: Actualizaciones y hitos del proyecto.
lang: es
ref: project_news
profiles: [project]
permalink: /es/noticias/
nav: true
nav_order: 1
---

<ul class="profile-post-list">
  {% assign recent_posts = site.posts | slice: 0, 5 %}
  {% for post in recent_posts %}
    <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
