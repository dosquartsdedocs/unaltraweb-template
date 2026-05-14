---
layout: page
title: Notícies
description: Actualitzacions i fites del projecte.
lang: ca
ref: project_news
profiles: [project]
permalink: /ca/noticies/
nav: true
nav_order: 8
---

<ul class="profile-post-list">
  {% assign recent_posts = site.posts | slice: 0, 5 %}
  {% for post in recent_posts %}
    <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
