---
layout: archive
title: "Publications"
permalink: /publications/
---

{% if site.author.googlescholar %}
You can also find my articles on [my Google Scholar profile]({{ site.author.googlescholar }}).
{% endif %}

<ol class="pub-list">
{% for post in site.publications reversed %}
  {% include retro-pub.html %}
{% endfor %}
</ol>
