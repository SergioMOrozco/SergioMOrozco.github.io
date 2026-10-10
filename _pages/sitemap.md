---
layout: archive
title: "Sitemap"
permalink: /sitemap/
---

{% include base_path %}

A list of all the pages on this site. Robots can digest the [XML version]({{ base_path }}/sitemap.xml) instead.

<h2>Pages</h2>
<ul>
{% for p in site.pages %}{% if p.title and p.sitemap != false %}
  <li><a href="{{ base_path }}{{ p.url }}">{{ p.title }}</a></li>
{% endif %}{% endfor %}
</ul>

<h2>Publications</h2>
<ul>
{% for post in site.publications reversed %}{% include retro-item.html %}{% endfor %}
</ul>

