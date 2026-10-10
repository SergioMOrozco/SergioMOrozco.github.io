---
title: "Sign My Guestbook!!!"
permalink: /guestbook/
excerpt: "Sign Sergio's guestbook."
---

Thanx 4 stopping by! Leave a message below. &#9997;&#65039;

<form class="guestbook-form" data-guestbook>
  <label>Name / Handle
    <input name="handle" required maxlength="80" autocomplete="nickname">
  </label>
  <label>Your Homepage (optional)
    <input name="homepage" type="url" maxlength="200" placeholder="http://">
  </label>
  <label>Message
    <textarea name="message" rows="4" required maxlength="1000"></textarea>
  </label>
  <button class="btn95" type="submit">&#128221; Sign it!</button>
  <p class="small">Signing opens a GitHub issue with your message. No account? Say hi on <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn</a> instead.</p>
</form>

## Past Visitors

{% for entry in site.data.guestbook %}
<div class="guestbook-entry">
  <p class="guestbook-entry__who">{{ entry.name }} <span class="small">&mdash; {{ entry.from }}, {{ entry.date }}</span></p>
  <p>{{ entry.message }}</p>
</div>
{% endfor %}

<script>
  document.querySelector("[data-guestbook]").addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.target;
    var body = "**From:** " + form.handle.value + "\n" +
      (form.homepage.value ? "**Homepage:** " + form.homepage.value + "\n" : "") +
      "\n" + form.message.value;
    var url = "https://github.com/{{ site.repository }}/issues/new" +
      "?title=" + encodeURIComponent("Guestbook: " + form.handle.value) +
      "&body=" + encodeURIComponent(body);
    window.open(url, "_blank", "noopener");
  });
</script>
