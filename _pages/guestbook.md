---
title: "Sign My Guestbook!!!"
permalink: /guestbook/
excerpt: "Sign Sergio's guestbook."
---

Thanx 4 stopping by! Leave a message below. &#9997;&#65039;

<form class="guestbook-form" data-guestbook-form data-repo="{{ site.repository }}">
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
  <p class="small">Signing opens a GitHub issue with your message. It shows up here once the webmaster approves it. No GitHub account? Say hi on <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn</a> instead.</p>
</form>

## Past Visitors

<div data-guestbook-entries data-repo="{{ site.repository }}" aria-live="polite">
  <p class="small guestbook-status">Loading entries from the guestbook server&hellip;</p>
</div>

<script src="{{ site.baseurl }}/assets/js/guestbook.js"></script>
